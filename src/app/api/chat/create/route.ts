import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from '@langchain/openai';
import { supabase } from '@/supabase/client';
import { generateChatTitle } from '@/utils/db';
import { initChat } from '@/utils/vars';
import { Message } from '@/utils/types';

type ChatCreateRequestBody = {
  id: string;
  initialMessage: string;
}

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { id, initialMessage } = await req.json() as ChatCreateRequestBody;

  if (!id || !initialMessage) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  } 


  const titleModel = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini-2024-07-18',
    maxTokens: 7,
  });

  const title = await generateChatTitle(initialMessage, titleModel);

  const chatHistory: Message[] = [
    initChat,
    { role: "user", content: initialMessage }
  ];

  try {
    const { data: newChat, error } = await supabase
      .from('Chats')
      .insert({
        user_id: id,
        title: title,
        chat_history: chatHistory,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating chat:', error);
      return NextResponse.json({ message: 'Error creating chat' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Chat created successfully', chat: newChat }, { status: 200 });
  } catch (error) {
    console.error('Error interacting with Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});