import { ConversationalRetrievalQAChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { characters } from "./data";
import items from "./items";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { formatHistory, makeChain } from "./chain";

const createContainsQuestion = (model: OpenAI) => {
//   const template = `Risk of Rain is a video game about surviving and fighting monsters.
// Risk of Rain has the following characters: ${characters.join(", ")}.
// Risk of Rain has the following items: ${items.map((item) => item.name).join(", ")}.

// Presented with a series of statements from a text to speech api.
// Determine if the following statements are about risk of rain. Answer with one word: "yes" or "no".

// {utterances}
// `;
const template = `Risk of Rain has the following characters: ${characters.join(", ")}.
Risk of Rain has the following items: ${items.map((item) => item.name).join(", ")}.

Determine if the statements are about any of the items or characters in Risk of Rain. Do your best to understand the statements.
Answer with one word: "yes" or "no". If you are unsure, answer "yes".

=========
{utterances}
=========
`;
  const classify = new PromptTemplate({
    template,
    inputVariables: ["utterances"],
  });

  const chain = new LLMChain({ llm: model, prompt: classify });
  return chain;
};

const callContainsQuestion = async (chain: LLMChain, utterances: string[]) => {
  const response = await chain.call({ utterances: utterances.join("\n") });
  console.log(response);
  return response;
};

let vs: HNSWLib;

type QueryChainState = {
  chatHistory: [string, string][];
  chain: ConversationalRetrievalQAChain;
};

const queryChains = new Map<string, QueryChainState>();

const newQueryChainForUser = async (userId: string) => {
    if (!vs) {
      vs = await HNSWLib.load("./items.hnsw", new OpenAIEmbeddings());
    }
    const chain = makeChain(vs);
    queryChains.set(userId, {
      chatHistory: [],
      chain,
    });
};

const getQueryChainForUser = async (userId: string, newChain = false) => {
  if (newChain) {
    await newQueryChainForUser(userId);
  }
  const chain = queryChains.get(userId);
  if (chain) {
    return chain;
  }
  await newQueryChainForUser(userId);
  return queryChains.get(userId);
};

const queryQueryChain = async (chain: QueryChainState, query: string) => {
  const history = formatHistory(chain.chatHistory);
  console.log(history);
  const response = await chain.chain.call({ question: query, chat_history: history });
  chain.chatHistory.push([query, response.text]);
  console.log(response);
  return response;
};


export { createContainsQuestion, callContainsQuestion, getQueryChainForUser, newQueryChainForUser, queryQueryChain };
