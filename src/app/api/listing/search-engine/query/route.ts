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

    // Create a string representation of the user object
    const userString = JSON.stringify({
      location: user.location,
      property_types: user.property_types,
      beds: user.beds,
      baths: user.baths,
      min_budget: user.min_budget,
      max_budget: user.max_budget,
      min_size_of_house: user.min_size_of_house,
      max_size_of_house: user.max_size_of_house,
      house_description: user.house_description
    });

    //@ts-ignore
    const classifier = await PipelineSingleton.getInstance();
    const userEmbeddingObj = await classifier(userString);

    // Ensure the embedding is the correct size
    const userEmbedding = Array.from(userEmbeddingObj.data).slice(0, 384);
    if (userEmbedding.length !== 384) {
      throw new Error('Invalid embedding size');
    }

    // Perform vector search in Supabase
    const { data: similarListings, error } = await supabase.rpc('match_listings', {
      query_embedding: userEmbedding,
      match_threshold: 0.7,
      match_count: 20
    });

    if (error) {
      console.error('Error performing vector search:', error);
      return NextResponse.json({ message: 'Error performing vector search' }, { status: 500 });
    }

    if (!similarListings || similarListings.length === 0) {
      return NextResponse.json({ message: 'No similar listings found' }, { status: 404 });
    }

    return NextResponse.json({ listings: similarListings }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
})