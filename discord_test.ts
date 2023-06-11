// https://discord.com/oauth2/authorize?client_id=1105129835480756386&permissions=35186522721280&scope=bot

import { EndBehaviorType, VoiceConnectionStatus } from "@discordjs/voice";
import {
  Client,
  GatewayIntentBits,
  ChannelType,
  REST,
  Routes,
  TextChannel,
} from "discord.js";
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

const { TOKEN, CLIENT_ID } = process.env;

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

const debugEnabledForUser = new Map<string, boolean>();

// Initialize temporary file store (TODO replace this with streaming)
init();

const debugChannelForGuild = new Map<string, string>();

const commands = [
  {
    name: "setdebugchannel",
    description: "Set the debug channel",
    options: [
      {
        name: "channel",
        description: "The channel to set",
        type: 7,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

// setup the commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "setdebugchannel") {
    const channel = options.getChannel("channel", true);
    if (channel.type !== ChannelType.GuildText) {
      await interaction.reply({
        content: "Channel must be a text channel",
        ephemeral: true,
      });
      return;
    }
    debugChannelForGuild.set(interaction.guildId!, channel.id);
    await interaction.reply({
      content: `Debug channel set to ${channel.name}`,
      ephemeral: true,
    });
  }
});

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
            const user = await client.users.fetch(userID);

            const writeDebug = (message: string) => {
              const debugChannelID = debugChannelForGuild.get(guild.id);
              if (debugChannelID) {
                const debugChannel = guild.channels.cache.get(
                  debugChannelID
                ) as TextChannel;
                debugChannel.send(`\`${user.username}\`: ${message}`);
              }
            };

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

                if (
                  result.toLowerCase().includes(botName.toLocaleLowerCase())
                ) {
                  // We are a query to the bot
                  const commandResponse = await callCommandChain(
                    getUtterances(userID)
                  );

                  const oldMode =
                    operationModesForUser.get(userID) ?? OperationMode.React;

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
                    const removeBotNameRegex = new RegExp(
                      `(hey )?${botName}`,
                      "gi"
                    );

                    const utterances = getUtterances(userID);
                    const lastUtterance = utterances[utterances.length - 1];
                    const text = lastUtterance.replace(removeBotNameRegex, "");

                    console.log("Got input", text);

                    const answer = await runReact(text, writeDebug);
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
