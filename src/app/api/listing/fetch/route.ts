import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/supabase/client';
import { ListingType } from '@/utils/types';

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const schema = z.object({
  ids: z.array(z.string().regex(uuidRegex, 'Invalid UUID format')),
});

const BATCH_SIZE = 50; // Adjust the batch size as needed

export const POST = withApiAuthRequired(async function handler(
  req: NextRequest
) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { ids } = schema.parse(body);

    let allListings: Partial<ListingType>[] = [];
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batchIds = ids.slice(i, i + BATCH_SIZE);
      const { data: listings, error: listingError } = await supabase
        .from('listings')
        .select('latitude, longitude, id, primary_photo, full_street_line, beds, full_baths, half_baths, sqft, list_price')
        .in('id', batchIds);

      if (listingError) {
        console.error('Error fetching listings:', listingError);
        return NextResponse.json({ message: 'Error fetching listings' }, { status: 500 });
      }

      // Filter out any null or undefined listings
      const foundListings = listings?.filter(listing => listing !== null && listing !== undefined) || [];
      allListings = allListings.concat(foundListings);
    }

    return NextResponse.json(allListings, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});