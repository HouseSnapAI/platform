import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { Chat, ChatHistoryType } from '@/utils/types';

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { chat } = await req.json() as { chat: Chat };

  if (!chat) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    // Update chat messages
    const { error: chatUpdateError } = await supabase
      .from('Chats')
      .update({
        ...chat,
        updated_at: new Date().toISOString()
      })
      .eq('id', chat.id)
      .eq('user_id', chat.user_id);

    if (chatUpdateError) {
      throw chatUpdateError;
    }

    // Fetch user
    const { data: userData, error: userFetchError } = await supabase
      .from('User')
      .select('*')
      .eq('id', chat.user_id)
      .single();

    if (userFetchError) {
      throw userFetchError;
    }

    // Update user's chat
    const updatedChats = userData.chats ? userData.chats.map((existingChat: any) => {
      if (existingChat.id === chat.id) {
        return { ...existingChat, updated_at: new Date().toISOString() };
      }
      return existingChat;
    }) : [{ ...chat, updated_at: new Date().toISOString() }];

    const { error: userUpdateError } = await supabase
      .from('User')
      .update({ chats: updatedChats })
      .eq('id', userData.id);

    if (userUpdateError) {
      throw userUpdateError;
    }

    return NextResponse.json({ message: 'Chat history and user updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating chat history in Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});