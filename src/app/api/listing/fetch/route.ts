import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/supabase/client';

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const schema = z.object({
  ids: z.array(z.string().regex(uuidRegex, 'Invalid UUID format')),
});

export const POST = withApiAuthRequired(async function handler(
  req: NextRequest
) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { ids } = schema.parse(body);

    const { data: listings, error: listingError } = await supabase
      .from('listings')
      .select('*')
      .in('id', ids);

    if (listingError) {
      console.error('Error fetching listings:', listingError);
      return NextResponse.json({ message: 'Error fetching listings' }, { status: 500 });
    }

    // Filter out any null or undefined listings
    const foundListings = listings?.filter(listing => listing !== null && listing !== undefined) || [];

    return NextResponse.json(foundListings, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});