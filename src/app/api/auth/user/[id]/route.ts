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
  const encodedEmail = req.url.split('/').pop()?.split('?')[0];
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;

  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  if (!email) {
    return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
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