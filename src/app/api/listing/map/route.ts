import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { min_latitude, max_latitude, min_longitude, max_longitude } = await req.json();

    const { data: listingIds, error } = await supabase.rpc('get_listing_ids_within_bounds', {
      min_latitude,
      max_latitude,
      min_longitude,
      max_longitude
    });

    if (error) {
      console.error('Error fetching listing IDs:', error);
      return NextResponse.json({ message: 'Error fetching listing IDs' }, { status: 500 });
    }

    return NextResponse.json(listingIds, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});