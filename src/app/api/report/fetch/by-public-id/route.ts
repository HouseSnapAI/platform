import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/supabase/client';
import { ListingType } from '@/utils/types';

const schema = z.object({
  public_id: z.string(),
});

export const POST = async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: parseResult.error.errors }, { status: 400 });
  }

  const { public_id } = parseResult.data;

  try {
    const { data: reportData, error: reportError } = await supabase
      .from('reports')
      .select('*')
      .eq('public_id', public_id)
      .single();

    if (reportError) {
      console.error('Error fetching report:', reportError);
      return NextResponse.json({ message: 'Error fetching report' }, { status: 500 });
    }
    
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};