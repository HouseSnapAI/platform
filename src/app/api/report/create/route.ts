import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const recordCreateSchema = z.object({
  user_id: z.string(),
  listing_id: z.string(),
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const result = recordCreateSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: result.error.errors }, { status: 400 });
  }

  const { user_id, listing_id } = result.data;

  const {data: reports_remaining, error: reports_remaining_error} = await supabase
       .from('User')
       .select('reports_remaining')
       .eq('id', user_id)
       .single();

  if (reports_remaining_error ) {
    console.error('Error creating record:', reports_remaining_error);
    return NextResponse.json({ message: 'Error creating record' }, { status: 500 });  
  }

  if (reports_remaining.reports_remaining <= 0) {
    return NextResponse.json({ message: 'No reports remaining' }, { status: 400 });
  }


  

  try {
    const { data: newRecord, error } = await supabase
      .from('reports')
      .insert({
        listing_id: listing_id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating record:', error);
      return NextResponse.json({ message: 'Error creating record' }, { status: 500 });
    }

    
    const { data: userRecordAssociation, error: ascError } = await supabase
      .from('user_reports')
      .insert({
        user_id: user_id,
        report_id: newRecord.id,
        listing_id: listing_id
      })
      .select()
      .single();

      if (ascError) {
        console.error('Error creating record:', ascError);
        return NextResponse.json({ message: 'Error creating record' }, { status: 500 });
      }

      await supabase.from('User').update({reports_remaining: reports_remaining.reports_remaining - 1}).eq('id', user_id);

    return NextResponse.json({ message: 'Record created successfully', report: newRecord }, { status: 200 });
  } catch (error) {
    console.error('Error interacting with Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}); // Added semicolon here