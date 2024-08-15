import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { OpenAI } from '@langchain/openai';
import { Chat, User, ListingType } from '@/utils/types';
import { supabase } from '@/supabase/client';

type BodyPayloadType = {
  prompt: string;
  chat: Chat;
  user: User;
  listing: ListingType;
};

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const { prompt, chat, user, listing } = (await req.json()) as BodyPayloadType;

    if (!prompt || !chat || !user || !listing) {
      return NextResponse.json({ message: 'Missing Fields' }, { status: 400 });
    }

    const generationModel = new OpenAI({
      model: 'gpt-4o-mini-2024-07-18',
      apiKey: process.env.OPENAI_API_KEY,
      maxTokens: 300,
    });

    const formattedHistory: string = chat.chat_history.map((entry) => {
      return `${entry.role}: ${entry.content}`;
    }).join('\n');

    const userInfo = {
      geoip: user.geoip,
      name: user.name,
      beds: user.beds,
      baths: user.baths,
      min_size_of_house: user.min_size_of_house,
      max_size_of_house: user.max_size_of_house,
      min_budget: user.min_budget,
      max_budget: user.max_budget,
      location: user.location,
      property_types: user.property_types,
      house_description: user.house_description
    };

    const listingInfo = {
      id: listing.id,
      full_street_line: listing.full_street_line,
      city: listing.city,
      state: listing.state,
      zip_code: listing.zip_code,
      list_price: listing.list_price,
      beds: listing.beds,
      full_baths: listing.full_baths,
      half_baths: listing.half_baths,
      sqft: listing.sqft,
      property_type: listing.property_type,
      status: listing.status,
      primary_photo: listing.primary_photo,
      description: listing.text,
      year_built: listing.year_built
// TODO: ADD MORE FIELDS
    };

    let generationPromptTemplate = `You are an AI realtor assistant. Given the user information, conversation history, user question, and relevant listings, generate a response to the user question. Always be polite, helpful, and concise.`;

    generationPromptTemplate += `\n\nConversation History: """ ${formattedHistory} """
    User Question: """ ${prompt} """
    User Information: """ ${JSON.stringify(userInfo)} """
    Listing Information: """ ${JSON.stringify(listingInfo)} """
    assistant:"""`;

    const response = await generationModel.invoke(generationPromptTemplate);

    return NextResponse.json({ role: "assistant", content: response, listing: listingInfo }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});