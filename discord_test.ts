import { EndBehaviorType, VoiceConnectionStatus } from "@discordjs/voice";
import { Client, GatewayIntentBits, ChannelType } from "discord.js";
import dotenv from "dotenv";

import { joinVoiceChannel } from "@discordjs/voice";
import { OpusEncoder } from "@discordjs/opus";
import { Transform } from "stream";

import { v1p1beta1 as speech } from "@google-cloud/speech";
import { OpenAI } from "langchain/llms/openai";
import {
  callContainsQuestion,
  createContainsQuestion,
} from "./zero_shot_question";
import { init, playText } from "./text_to_speech";
import { characters } from "./data";

dotenv.config();

const userUtterances = new Map<string, string[]>();
const userUtteranceCount = 15;

const addUtterance = (userId: string, utterance: string) => {
  const utterances = userUtterances.get(userId) ?? [];
  utterances.push(utterance);
  if (utterances.length > userUtteranceCount) {
    utterances.shift();
  }
  userUtterances.set(userId, utterances);
};

const getUtterances = (userId: string) => {
  return userUtterances.get(userId) ?? [];
};

const userResponses = new Map<string, string[]>();
const userResponseCount = 15;

const addResponse = (userId: string, response: string) => {
  const responses = userResponses.get(userId) ?? [];
  responses.push(response);
  if (responses.length > userResponseCount) {
    responses.shift();
  }
  userResponses.set(userId, responses);
};

const getResponses = (userId: string) => {
  return userResponses.get(userId) ?? [];
};

const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

init();

client.on("ready", () => {
  console.log("Ready!");

  // initialize langchain stuff
  const model = new OpenAI({ temperature: 0.0 });
  const chain = createContainsQuestion(model);

  const callChain = async (utterances: string[]) => {
    const response = await callContainsQuestion(chain, utterances);
    return response;
  };

  // list all channels
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
    // guild.channels.cache.forEach((channel) => {
    //   console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    // });
    for (const [channelID, channel] of guild.channels.cache) {
      if (channel.type === ChannelType.GuildVoice) {
        console.log(` - ${channel.name} ${channel.type} ${channel.id}`);

        // join the voice channel
        const connection = joinVoiceChannel({
          channelId: channelID,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfDeaf: false,
        });

        connection.once(VoiceConnectionStatus.Disconnected, () =>
          connection?.destroy()
        );

        connection.on("error", (error: any) => {
          console.error(error);
        });

        connection.on("debug", (message: string) => {
          console.log(message);
        });

        const { receiver } = connection;

        connection.on(VoiceConnectionStatus.Ready, () => {
          console.log("audio connection ready");

          // connection.subscribe(player);
          // player.play(resource);

          const encoder = new OpusEncoder(48000, 1);
          receiver.speaking.on("start", async (userID) => {
            // Create the google speech client stream
            const client = new speech.SpeechClient();

            // Create a recognize stream
            const recognizeStream = client
              .streamingRecognize({
                config: {
                  encoding: "LINEAR16",
                  sampleRateHertz: 48000,
                  languageCode: "en-US",
                  speechContexts: [
                    {
                      phrases: characters,
                      boost: 3.0,
                    },
                  ],
                },
                interimResults: false, // If you want interim results, set this to true
              })
              .on("error", console.error)
              .on("data", (data) => {
                const result = data.results[0]?.alternatives[0]?.transcript;
                if (!result) {
                  console.log("speech transcription timeout or empty");
                  return;
                }
                console.log(`Transcription: ${result}`);
                addUtterance(userID, result);
                callChain(getUtterances(userID)).then(async (response) => {
                  if (/yes/gi.test(response.text)) {
                    console.log("yes");
                    // clear the utterances
                    userUtterances.set(userID, []);


                    const { player, resource } = await playText(result);

                    connection.subscribe(player);
                    player.play(resource);
                  } else {
                    console.log("no");
                  }
                });
              });
            const audio = receiver
              .subscribe(userID, {
                end: {
                  behavior: EndBehaviorType.AfterSilence,
                  duration: 3000,
                },
                // end: {
                //   behavior: EndBehaviorType.Manual,
                // },
              })
              .pipe(new OpusDecodingStream({}, encoder))
              .pipe(recognizeStream);
          });
        });
        break;
      }
    }
  });
});

client.login(TOKEN);

class OpusDecodingStream extends Transform {
  encoder: OpusEncoder;

  constructor(options, encoder: OpusEncoder) {
    super(options);
    this.encoder = encoder;
  }

  _transform(data, encoding, callback) {
    this.push(this.encoder.decode(data));
    callback();
  }
}
