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

let executor: AgentExecutor;

const initReact = async (model: OpenAI) => {
  const tools = [new Calculator()];

  executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    returnIntermediateSteps: true,
  });
};

export class MyCallbackHandler extends BaseCallbackHandler {
  name = "MyCallbackHandler";

  async handleChainStart(chain: { name: string }) {
    console.log(`Entering new ${chain.name} chain...`);
  }

  async handleChainEnd(_output: ChainValues) {
    console.log("Finished chain.");
  }

  async handleAgentAction(action: AgentAction) {
    console.log(action.log);
  }

  async handleToolEnd(output: string) {
    console.log(output);
  }

  async handleText(text: string) {
    console.log(text);
  }

  async handleAgentEnd(action: AgentFinish) {
    console.log(action.log);
  }
}

const runReact = async (text: string) => {
  const callbackManager = new CallbackManager();

  callbackManager.addHandler(new ConsoleCallbackHandler());

  const result = await executor.call({ input: text }, callbackManager);
  console.log(result);
  return result;
};

export { initReact, runReact };
