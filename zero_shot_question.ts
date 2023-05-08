import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { characters } from "./data";
import items from "./items";

const createContainsQuestion = (model: OpenAI) => {
  const template = `Risk of Rain is a video game about surviving and fighting monsters.
Risk of Rain has the following characters: ${characters.join(", ")}.
Risk of Rain has the following items: ${items.map((item) => item.name).join(", ")}.
Presented with a series of statements from a text to speech api. They may have repeated and redundant sections.
Determine if they are about the video game Risk of Rain. Answer with one word: "yes" or "no". If you are not sure answer with "yes".

{utterances}
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

export { createContainsQuestion, callContainsQuestion };
