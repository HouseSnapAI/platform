import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export const POST = (async (req: NextRequest) => {
    try {

        const { prompt, userFilters } = await req.json();

        console.log(prompt);
        console.log(userFilters);
        
        const UserFilters = z.object({
            beds: z.number(),
            baths: z.number(),
            house_description: z.string(),
            locations: z.array(z.string()),
            min_budget: z.number(),
            max_budget: z.number(),
            min_size_of_house: z.number(),
            max_size_of_house: z.number(),
            property_types: z.array(z.enum(["SINGLE_FAMILY", "APARTMENT", "CONDOS", "CONDO_TOWNHOME_ROWHOME_COOP", "COOP", "DUPLEX_TRIPLEX", "FARM", "LAND", "MULTI_FAMILY", "MOBILE", "OTHER", "TOWNHOMES"])),
        })
        
        
        const client = new OpenAI();
        
        const completion = await client.beta.chat.completions.parse({
            model: 'gpt-4o-2024-08-06',
            messages: [
                {
                    "role": "system",
                    "content": "You are an AI realtor assistant. Given the user information, conversation history, user question, and relevant listings, generate a response to the user question. Always be polite, helpful, and concise.",
                },
                { "role": "user", "content": prompt },
            ],
            response_format: zodResponseFormat(UserFilters, 'userFilters'),
        });
        
        const message = completion.choices[0]?.message;
        if (message?.parsed) {
            console.log(message.parsed);
        } else {
            console.log(message.refusal);
        }
  
      
      return NextResponse.json(message.parsed, { status: 200 });
    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  });