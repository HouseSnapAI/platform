import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';
import { CrimeDataType } from '@/utils/types';

const schema = z.object({
  listing_id: z.string(),
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
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
      .from('listings')
      .select('county')
      .eq('id', listing_id)

      if (error || data == null) {
        console.error('Error fetching env data', error);
        return NextResponse.json({ message: 'Error fetching env data' }, { status: 500 });
      }

      const county = data[0].county;

      let envData;

      try {
        const { data, error } = await supabase
        .from('ca_env_factors_final')
        .select('*')
        .eq('county', county)

        if (error || data == null) {
          console.error('Error fetching crime data', error);
          return NextResponse.json({ message: 'Error fetching env data' }, { status: 500 });
        }

        envData = data[0];

      } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }

    return NextResponse.json(envData, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});