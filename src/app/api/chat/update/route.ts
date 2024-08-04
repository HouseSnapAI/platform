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

    return NextResponse.json({ message: 'Chat history and user updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating chat history in Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});