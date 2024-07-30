import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { OpenAI } from '@langchain/openai';
import { Chat, User } from '@/utils/types';
import { supabase } from '@/supabase/client';

type BodyPayloadType = {
  prompt: string;
  chat: Chat;
  user: User;
};

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const { prompt, chat, user } = (await req.json()) as BodyPayloadType;

    if (!prompt || !chat || !user) {
      return NextResponse.json({ message: 'Missing Fields' }, { status: 400 });
    }

    const generationModel = new OpenAI({
      model: 'gpt-3.5-turbo-instruct',
      apiKey: process.env.OPENAI_API_KEY,
      maxTokens: 300,
    });

    const formattedHistory: string = chat.chat_history.map((entry) => {
      return `${entry.role}: ${entry.content}`;
    }).join('\n');

    // Fetch relevant listings from Supabase TODO

    const userInfo = {
        geoip: user.geoip,
        name: user.name,
        beds: user.beds,
        baths: user.baths,
        min_size_of_house: user.min_size_of_house,
        max_size_of_house: user.max_size_of_house,
        min_budget: user.min_budget,
        max_budget: user.max_budget,
        location: user.location,
        property_types: user.property_types,
        house_description: user.house_description
    }
    
    let generationPromptTemplate = `You are an AI realtor assistant. Given the user information, conversation history, user question, and relevant listings, generate a response to the user question. Always be polite, helpful, and concise.`;

    generationPromptTemplate += `\n\nConversation History: """ ${formattedHistory} """
    User Question: """ ${prompt} """
    User Information: """ ${JSON.stringify({userInfo})} """
    assistant:"""`;

    const response = await generationModel.invoke(generationPromptTemplate);

    
    return NextResponse.json({role: "assistant", content: response, listings:[]}, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});
