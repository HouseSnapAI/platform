import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  user_id: z.string(),
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: parseResult.error.errors }, { status: 400 });
  }

  const { user_id } = parseResult.data;

  // console.log(user_id)

  try {
    const { data, error } = await supabase
      .from('user_reports')
      .select('listing_id')
      .eq('user_id', user_id)

    if (error) {
      console.error('Error fetching report:', error);
      return NextResponse.json({ message: 'Error fetching report' }, { status: 500 });
    } 

    if(data.length == 0) {
        return NextResponse.json(null, { status: 200 });
    }

    // Fetch all reports
    let reports: any[]  = [];

    for (let listingId of data) {
        try {
            const { data, error } = await supabase
                .from('reports')
                .select('listing_id, created_at, updated_at')
                .eq('listing_id', listingId.listing_id)
                .single();
            
            reports.push(data);

        } catch (error) {
            console.error('Error getting User report:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});