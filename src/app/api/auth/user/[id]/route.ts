import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/supabase/client';

const schema = z.object({
  id: z.string(),
});

export const GET =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
  // im too lazy to figure out dynamic routing rn 
  const id = req.url.split('/').pop()?.split('?')[0]; 
  console.log("id", id)
  // const id = "4f8a4146-7ca7-4cdd-b537-a60fe7d236b9"
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  if (!id) {
    return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('id', id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});