import items from "./items";
import { writeFileSync, readFileSync } from "fs";
import dotenv from "dotenv";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

dotenv.config();

const jsonItems = () => {
  const data = items.map((item) => ({
    name: item.name,
    tags: item.tags,
    description: item.description,
    unlock: item.unlock ?? "",
  }));

  writeFileSync("./items.json", JSON.stringify(data, null, 2));
};

// jsonItems();

const ingest = async () => {
  // ingest the json file into a hnsw index

  const data = readFileSync("./items.json", "utf8");
  
  const items = JSON.parse(data);

  const vectorStore = await HNSWLib.fromTexts(
    items.map((item) => JSON.stringify(item)),
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings()
  );

  // save the hnsw index to a file
  vectorStore.save("./items.hnsw");
};

ingest();
