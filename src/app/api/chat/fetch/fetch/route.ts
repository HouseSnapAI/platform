import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { chat_id, user_id } = await req.json();

  if (!chat_id || !user_id) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('Chats')
      .select('*')
      .eq('id', chat_id)
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Error fetching chat from Supabase:', error);
      return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching chat history from Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});