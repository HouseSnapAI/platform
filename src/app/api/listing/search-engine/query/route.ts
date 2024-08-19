import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { User } from '@/utils/types';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

//@ts-ignore
import PipelineSingleton from './pipline.js';

const ZipCodeResponse = z.object({
    zip_codes: z.array(z.string()),
});

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

    const userEmbedding = Array.from(userEmbeddingObj.data).slice(0, 384);
    if (userEmbedding.length !== 384) {
      throw new Error('Invalid embedding size');
    }

    const queryObj: any = {
      min_budget: user.min_budget,
      max_budget: user.max_budget,
      min_size_of_house: user.min_size_of_house,
      max_size_of_house: user.max_size_of_house,
      user_embedding: userEmbedding,
      match_threshold: 0.5,
      match_number: 50
    };

    if (user.property_types && user.property_types.length > 0) {
      queryObj.property_types = user.property_types;
    }

    if (Array.isArray(user.location) && user.location.length > 0) {
        const locationQuery = user.location.join(', '); 

        const client = new OpenAI();

        // Query OpenAI for relevant zip codes
        const completion = await client.beta.chat.completions.parse({
            model: 'gpt-4o-2024-08-06',
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful assistant. Provide relevant zip codes in a structured JSON format, given all cities are from California USA.",
                },
                { "role": "user", "content": `Provide relevant zip codes for the following locations: ${locationQuery}` },
            ],
            response_format: zodResponseFormat(ZipCodeResponse, 'zipCodeResponse'),
        });

        const message = completion.choices[0]?.message;
        if (message?.parsed) {
            const zipCodes = message.parsed.zip_codes;
            console.log("Retrieved Zip Codes:", zipCodes); 

            // Add zip codes to queryObj
            queryObj.zip_codes = zipCodes;
        } else {
            console.error("Error retrieving zip codes:", message.refusal); 
        }
    }

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