import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/supabase/client';
import { ListingType } from '@/utils/types';

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const schema = z.object({
  id: z.string().regex(uuidRegex, 'Invalid UUID format'),
});

export const POST = async function handler(
  req: NextRequest
) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { id } = schema.parse(body);

    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select(`
        id, property_url, mls, mls_id, status, text, property_type, full_street_line, street, city, state, unit, zip_code, list_price, beds, days_on_mls, full_baths, half_baths, sqft, year_built, list_date, sold_price, last_sold_date, assessed_value, estimated_value, lot_sqft, price_per_sqft, latitude, longitude, neighborhoods, county, fips_code, stories, hoa_fee, parking_garage, agent, agent_email, agent_phones, broker, broker_phone, broker_website, nearby_schools, primary_photo, alt_photos, num_clicks, num_views, num_saved
      `)
      .eq('id', id)
      .single();

    if (listingError) {
      console.error('Error fetching listing:', listingError);
      return NextResponse.json({ message: 'Error fetching listing' }, { status: 500 });
    }

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
// withApiAuthRequired();