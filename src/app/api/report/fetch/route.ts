import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  listing_id: z.string(),
});

export const POST = async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: parseResult.error.errors }, { status: 400 });
  }

  const { listing_id } = parseResult.data;

  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('listing_id', listing_id)
      .single();

    if (error) {
      console.error('Error fetching report:', error);
      return NextResponse.json({ message: 'Error fetching report' }, { status: 500 });
    }

      return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
// withApiAuthRequired();