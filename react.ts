import { OpenAI } from "langchain/llms/openai";
import { DynamicTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import {
  BaseCallbackHandler,
  CallbackManager,
  ConsoleCallbackHandler,
} from "langchain/callbacks";
import { AgentAction, AgentFinish, ChainValues } from "langchain/schema";
import { RetrievalQAChain } from "langchain/chains";
import { setVectorStore, vs } from "./zero_shot_question";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

let executor: AgentExecutor;
let describeItem: DynamicTool;

const initReact = async (model: OpenAI) => {
  if (!vs) {
    const vs = await HNSWLib.load("./items.hnsw", new OpenAIEmbeddings());
    setVectorStore(vs);
  }

  const describeItemChain = RetrievalQAChain.fromLLM(model, vs.asRetriever());

  describeItem = new DynamicTool({
    name: "Describe Item",
    description:
      "Describes an item in Risk of Rain. Queries can be for the name, the function tags, or the description of the item.",
    func: async (input: string) => {
      const result = await describeItemChain.call({
        query:
          `Provider a description of the item best described by the following: "${input}". Make sure to mention any numbers or percentages found in the document.`,
      });
      console.log("describe item result", result);
      return result.text;
    },
  });

  const tools = [new Calculator(), describeItem];

  executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    returnIntermediateSteps: true,
  });
};

const runReact = async (text: string) => {
  const callbackManager = new CallbackManager();

  callbackManager.addHandler(new ConsoleCallbackHandler());

  const result = await executor.call({ input: text }, callbackManager);
  console.log(result);
  return result;
};

export { initReact, runReact };
