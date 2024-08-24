import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  user_id: z.string(),
  listing_id: z.string(),
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: result.error.errors }, { status: 400 });
  }

  const { user_id, listing_id } = result.data;

  if ( !listing_id) {
    return NextResponse.json({ message: 'Either report_id or listing_id must be provided' }, { status: 400 });
  }

  try {
    const query = supabase
      .from('user_reports')
      .select('*')
      .eq('user_id', user_id);
      query.eq('listing_id', listing_id);

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching record:', error);
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});