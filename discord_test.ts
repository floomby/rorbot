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
  callInformModeSwitchCommand,
  createContainsQuestion,
  createInformModeSwitchCommand,
  createIsModeSwitchCommand,
  getQueryChainForUser,
  queryQueryChain,
} from "./zero_shot_question";
import { init, playText } from "./text_to_speech";
import { characters } from "./data";
import items from "./items";
import { botName } from "./config";
import { initReact, runReact } from "./react";

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

const { TOKEN } = process.env;

const recentCalls = new Map<string, number>();

const isRecentDuplicate = (text: string) => {
  const now = Date.now();
  const lastCall = recentCalls.get(text);
  if (lastCall && now - lastCall < 1000 * 30) {
    return true;
  }
  recentCalls.set(text, now);
  return false;
};

enum OperationMode {
  Conversation = "conversation",
  React = "react",
}

const operationModesForUser = new Map<string, OperationMode>();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

init();

client.on("ready", () => {
  console.log("Ready!");

  // initialize langchain stuff
  const model = new OpenAI({ temperature: 0.0 });
  const creativeModel = new OpenAI({ temperature: 0.7 });

  initReact(model);

  const chain = createContainsQuestion(model);
  const callChain = async (utterances: string[]) =>
    callContainsQuestion(chain, utterances);

  const commandChain = createIsModeSwitchCommand(model);
  const callCommandChain = async (utterances: string[]) =>
    commandChain.call({ utterance: utterances.join(" ") });

  const informChain = createInformModeSwitchCommand(creativeModel);
  const callInformChain = async (mode: string, username: string) =>
    callInformModeSwitchCommand(informChain, mode, username);

  // list all channels
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
    // guild.channels.cache.forEach((channel) => {
    //   console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    // });
    for (const [channelID, channel] of guild.channels.cache) {
      if (channel.type === ChannelType.GuildVoice) {
        console.log(` - ${channel.name} ${channel.type} ${channel.id}`);

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

          const encoder = new OpusEncoder(48000, 1);
          receiver.speaking.on("start", async (userID) => {
            const operationMode =
              operationModesForUser.get(userID) ?? OperationMode.React;
            operationModesForUser.set(userID, operationMode);
            const queryChain = await getQueryChainForUser(userID);

            // Create the google speech client stream
            const speechClient = new speech.SpeechClient();

            // Create a recognize stream
            const recognizeStream = speechClient
              .streamingRecognize({
                config: {
                  encoding: "LINEAR16",
                  sampleRateHertz: 48000,
                  languageCode: "en-US",
                  speechContexts: [
                    {
                      phrases: characters,
                      boost: 5.0,
                    },
                    {
                      phrases: items.map((item) => item.name),
                      boost: 3.0,
                    },
                    {
                      phrases: [botName],
                      boost: 8.0,
                    },
                    {
                      phrases: ["conversation", "react", "mode"],
                      boost: 2.0,
                    },
                  ],
                },
                interimResults: false,
              })
              .on("error", console.error)
              .on("data", async (data) => {
                const result = data.results[0]?.alternatives[0]?.transcript;
                if (!result) {
                  console.log("speech transcription timeout or empty");
                  return;
                }
                console.log(`Transcription: ${result}`);

                if (isRecentDuplicate(result)) {
                  console.log("duplicate");
                  return;
                }

                addUtterance(userID, result);

                // callChain(getUtterances(userID)).then(async (response) => {
                //   if (/yes/gi.test(response.text)) {
                //     console.log("yes");
                // clear the utterances
                if (
                  result.toLowerCase().includes(botName.toLocaleLowerCase())
                ) {
                  // We are a query to the bot
                  const commandResponse = await callCommandChain(
                    getUtterances(userID)
                  );

                  const oldMode =
                    operationModesForUser.get(userID) ??
                    OperationMode.React;
                  
                  if (/(react)|(conversation)/gi.test(commandResponse.text)) {
                    console.log("Command detected");

                    const mode = commandResponse.text
                      .toLowerCase()
                      .includes("react")
                      ? OperationMode.React
                      : OperationMode.Conversation;

                    // clear the utterances
                    userUtterances.set(userID, []);

                    if (mode === oldMode) {
                      return;
                    }

                    operationModesForUser.set(userID, mode);

                    const user = await client.users.fetch(userID);

                    const informResponse = await callInformChain(
                      mode,
                      user.username
                    );

                    console.log(informResponse.text);
                    const { player, resource } = await playText(
                      informResponse.text
                    );

                    connection.subscribe(player);
                    player.play(resource);

                    return;
                  } else {
                    console.log("Query detected");
                  }

                  if (oldMode === OperationMode.React) {

                    const removeBotNameRegex = new RegExp(`(hey )?${botName}`, "gi");

                    // const text = getUtterances(userID).map((utterance) => {
                    //   utterance.replace(removeBotNameRegex, "");
                    //   return utterance;
                    // }).join(" ");

                    const utterances = getUtterances(userID);
                    const lastUtterance = utterances[utterances.length - 1];
                    const text = lastUtterance.replace(removeBotNameRegex, "");
                    
                    console.log("Got input", text);

                    const answer = await runReact(text);
                    userUtterances.set(userID, []);

                    const { player, resource } = await playText(answer.output);

                    connection.subscribe(player);
                    player.play(resource);

                    return;
                  }

                  const answer = await queryQueryChain(queryChain, result);

                  userUtterances.set(userID, []);

                  const { player, resource } = await playText(answer.text);

                  connection.subscribe(player);
                  player.play(resource);
                }
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

            audio.on("error", console.error);
            audio.on("finish", () => {
              console.log("audio stream finished");
              recognizeStream.end();
            });
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
