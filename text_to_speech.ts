// Imports the Google Cloud client library
import { createAudioPlayer, createAudioResource } from "@discordjs/voice";
import textToSpeech from "@google-cloud/text-to-speech";

// Import other required libraries
import fs from "fs";
import util from "util";

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const init = () => {
  // make an empty directory for the outputs called "outputs"
  if (!fs.existsSync("outputs")) {
    fs.mkdirSync("outputs");
  }
  // remove all files from the outputs directory
  fs.readdir("outputs", (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(`outputs/${file}`, (err) => {
        if (err) throw err;
      });
    }
  });
};

let id = 0;

// TODO Convert this to a stream if googles api supports it
const playText = async (text: string) => {
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech({
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", name: "en-US-Studio-O" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  });
  // Write the binary audio content to a local file
  const fileId = id++;

  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`outputs/${fileId}.mp3`, response.audioContent, "binary");

  const player = createAudioPlayer();

  const resource = createAudioResource(`outputs/${fileId}.mp3`, {
    metadata: {
      title: "text to speech response",
    },
  });

  resource.playStream.on("error", (error) => {
    console.error(
      "Error:",
      error.message,
      "with track",
      resource.metadata.title
    );
  });

  return { player, resource };
};

export { init, playText };
