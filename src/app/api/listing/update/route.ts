import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  property_url: z.string().optional(),
  mls: z.string().optional(),
  mls_id: z.string().optional(),
  status: z.enum(['for_sale', 'pending', 'sold', '']).optional(),
  text: z.string().optional(),
  property_type: z.enum(['LAND', 'APARTMENT', 'MOBILE', 'OTHER', 'TOWNHOMES', 'CONDOS', 'CONDO_TOWNHOME_ROWHOME_COOP', 'MULTI_FAMILY', 'SINGLE_FAMILY', 'COOP', 'FARM', 'DUPLEX_TRIPLEX']).optional(),
  full_street_line: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  list_price: z.number().optional(),
  beds: z.number().optional(),
  days_on_mls: z.number().optional(),
  full_baths: z.number().optional(),
  half_baths: z.number().optional(),
  sqft: z.number().optional(),
  year_built: z.number().optional(),
  list_date: z.string().optional(),
  sold_price: z.number().optional(),
  last_sold_date: z.string().optional(),
  assessed_value: z.number().optional(),
  estimated_vale: z.number().optional(),
  lot_sqft: z.number().optional(),
  price_per_sqft: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  neighborhoods: z.array(z.string()).optional(),
  county: z.string().optional(),
  fips_code: z.string().optional(),
  stories: z.string().optional(),
  hoa_fee: z.number().optional(),
  parking_garage: z.string().optional(),
  agent: z.string().optional(),
  agent_email: z.string().email().optional(),
  agent_phones: z.any().optional(),
  broker: z.string().optional(),
  broker_phone: z.string().optional(),
  broker_website: z.string().url().optional(),
  nearby_schools: z.array(z.string()).optional(),
  primary_photo: z.string().url().optional(),
  alt_photos: z.array(z.string().url()).optional(),
  updated_at: z.string().optional(),
  num_clicks: z.number().optional(),
  num_views: z.number().optional(),
  num_saved: z.number().optional(),
});

export const PATCH = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: parseResult.error.errors }, { status: 400 });
  }

  const { id, ...updateFields } = parseResult.data;

  try {
    const { data, error } = await supabase
      .from('Listings')
      .update(updateFields)
      .eq('id', id);

    if (error) {
      console.error('Error updating listing:', error);
      return NextResponse.json({ message: 'Error updating listing' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Listing updated successfully', data }, { status: 200 });
  } catch (error) { 
    console.error('Error updating listing:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});