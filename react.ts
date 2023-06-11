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
        query: `Provider a description of the item best described by the following: "${input}". Make sure to mention any numbers or percentages found in the document.`,
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

export class DebugCallbackHandler extends BaseCallbackHandler {
  name = "DebugCallbackHandler";

  writer: (message: string) => void;

  constructor(writeDebug: (message: string) => void) {
    super();
    this.writer = writeDebug;
  }

  async handleChainStart(chain: { name: string }) {
    this.writer(`Entering new ${chain.name} chain...`);
  }

  async handleChainEnd(_output: ChainValues) {
    this.writer("Finished chain.");
  }

  async handleAgentAction(action: AgentAction) {
    this.writer(action.log);
  }

  async handleToolEnd(output: string) {
    this.writer(output);
  }

  async handleText(text: string) {
    this.writer(text);
  }

  async handleAgentEnd(action: AgentFinish) {
    this.writer(action.log);
  }
}

const runReact = async (
  text: string,
  writeDebug: (message: string) => void
) => {
  const callbackManager = new CallbackManager();

  callbackManager.addHandler(new DebugCallbackHandler(writeDebug));

  const result = await executor.call({ input: text }, callbackManager);
  console.log(result);
  return result;
};

export { initReact, runReact };
