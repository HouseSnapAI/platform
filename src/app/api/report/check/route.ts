import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  user_id: z.string(),
  report_id: z.string(),
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

  const { user_id, report_id } = result.data;

  try {
    const { data, error } = await supabase
      .from('user_reports')
      .select('*')
      .eq('user_id', user_id)
      .eq('report_id', report_id)
      .single();

    if (error) {
      console.error('Error fetching report:', error);
      return NextResponse.json({ message: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Report found', data }, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});