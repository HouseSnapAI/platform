import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { User } from '@/utils/types';

//@ts-ignore
import PipelineSingleton from './pipline.js';

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { user } = await req.json() as { user: User };

    if (!user) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    //@ts-ignore
    const classifier = await PipelineSingleton.getInstance();
    const userEmbeddingObj = await classifier(JSON.stringify({
      description: user.house_description,
      baths: user.baths,
      beds: user.beds,
      location: user.location
    }));

    // Ensure the embedding is the correct size
    const userEmbedding = Array.from(userEmbeddingObj.data).slice(0, 384);
    if (userEmbedding.length !== 384) {
      throw new Error('Invalid embedding size');
    }

    const queryObj = {
      min_budget: user.min_budget,
      max_budget: user.max_budget,
      min_size_of_house: user.min_size_of_house,
      max_size_of_house: user.max_size_of_house,
      property_types: user.property_types,
      zip_codes: user.location,
      user_embedding: userEmbedding,
      match_threshold: 0.8,
      match_number: 20
    };

    console.log("queryObj", queryObj);

    // Perform vector search in Supabase using the new function
    const { data: similarListings, error } = await supabase.rpc('filter_listings', queryObj);

    if (error) {
      console.error('Error performing vector search:', error);
      return NextResponse.json({ message: 'Error performing vector search' }, { status: 500 });
    }

    if (!similarListings || similarListings.length === 0) {
      console.log("No similar listings found", similarListings);
      return NextResponse.json({ message: 'No similar listings found' }, { status: 404 });
    }

    return NextResponse.json({ listings: similarListings }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});