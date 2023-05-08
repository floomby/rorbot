import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  LLMChain,
  ConversationalRetrievalQAChain,
  loadQAStuffChain,
} from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { CallbackManager } from "langchain/callbacks";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";

const formatHistory = (history: [string, string][]) =>
  history.flatMap(([q, a]) => [new HumanChatMessage(q), new AIChatMessage(a)]);

const CONDENSE_PROMPT = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `Given the following conversation between a user and an assistant, rephrase the last question from the user to be a standalone question.`
  ),
  new MessagesPlaceholder("chat_history"),
  HumanMessagePromptTemplate.fromTemplate(`Last question: {question}`),
]);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `You answer questions about the video game Risk of Rain.
You are given the following documents and text which may contain a question for you. Provide a conversational answer.
If you don't know the answer, just say "Hmm, I'm not sure."
Question: {question}
=========
{context}
=========
`
);

export const makeChain = (
  vectorstore: HNSWLib,
  onTokenStream?: (token: string) => Promise<void>
) => {
  const questionGenerator = new LLMChain({
    llm: new ChatOpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAStuffChain(
    new ChatOpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: onTokenStream,
      }),
    }),
    { prompt: QA_PROMPT }
  );

  return new ConversationalRetrievalQAChain({
    retriever: vectorstore.asRetriever(),
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
};

export { formatHistory };
