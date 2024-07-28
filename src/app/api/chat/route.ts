import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { OpenAI } from '@langchain/openai';
import { ChatHistoryType } from '@/utils/types';

type BodyPayloadType = {
  prompt: string;
  chatHistory: ChatHistoryType;
  userInfo: any
};

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const { prompt, chatHistory, userInfo } = (await req.json()) as BodyPayloadType;

    if (!prompt || !chatHistory || !userInfo) {
      return NextResponse.json({ message: 'Missing Fields' }, { status: 400 });
    }

    const generationModel = new OpenAI({
      model: 'gpt-3.5-turbo-instruct',
      apiKey: process.env.OPENAI_API_KEY,
      maxTokens: 150,
    });


    const formattedHistory: string = chatHistory.messages?.L.map((entry) => {
      return `${entry.M.role.S}: ${entry.M.content.S}`;
    }).join('\n');

    let generationPromptTemplate = `You are an AI realtor assistant. You have a database of listings. Given the user information, conversation history, and user question, generate a response to the user question which is based on the conversation history and user information. Always be polite. Keep your responses short and concise.`;
    

    generationPromptTemplate += `\n\nConversation History: """ ${formattedHistory} """
    User Question: """ ${prompt} """
    User Information: """ ${JSON.stringify(userInfo)} 
    assistant:"""`;

    const response = await generationModel.invoke(generationPromptTemplate);

    return NextResponse.json({role: "assistant", content: response}, { status: 200 });
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});