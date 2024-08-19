import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { z } from 'zod';

// Initialize the SQS client
const sqsClient = new SQSClient({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_AWS_SECRET_KEY!,
    },
  });

// Define the Zod schema
const payloadSchema = z.object({
  listing: z.object({
    id: z.string(),
    mls: z.string().optional(),
    mls_id: z.string().optional(),
    status: z.enum(['FOR_SALE', 'PENDING', 'SOLD', '', '-1']),
    property_type: z.enum(['LAND', 'APARTMENT', 'MOBILE', 'OTHER', 'TOWNHOMES', 'CONDOS', 'CONDO_TOWNHOME_ROWHOME_COOP', 'MULTI_FAMILY', 'SINGLE_FAMILY', 'COOP', 'FARM', 'DUPLEX_TRIPLEX', '', '-1']),
    full_street_line: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    unit: z.string(),
    zip_code: z.string(),
    list_price: z.number(),
    beds: z.number(),
    days_on_mls: z.number().optional(),
    full_baths: z.number(),
    half_baths: z.number().optional(),
    sqft: z.number(),
    year_built: z.number().optional(),
    list_date: z.string().optional(),
    sold_price: z.number().optional(),
    last_sold_date: z.string().optional(),
    assessed_value: z.number().optional(),
    estimated_value: z.number().optional(),
    lot_sqft: z.number().optional(),
    price_per_sqft: z.number().optional(),
    latitude: z.number(),
    longitude: z.number(),
    neighborhoods: z.array(z.string()).optional(),
    county: z.string().optional(),
    fips_code: z.string().optional(),
    stories: z.string().optional(),
    hoa_fee: z.number().optional(),
    parking_garage: z.string().optional(),
    agent: z.string().optional(),
    agent_email: z.string().optional(),
    agent_phones: z.any().optional(),
    broker: z.string().optional(),
    broker_phone: z.string().optional(),
    broker_website: z.string().optional(),
    nearby_schools: z.array(z.string()).optional(),
    primary_photo: z.string().optional(),
    alt_photos: z.array(z.string()).optional(),
  }),
  report_id: z.string(),
});

async function sendMessageToSQS(payload: object) {
  const params = {
    QueueUrl: process.env.AWS_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(payload), // Keep this as stringified JSON for SQS
    MessageAttributes: {
      'Content-Type': {
        DataType: 'String',
        StringValue: 'application/json'
      }
    }
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. Response:", data);
    
    // Check the status of the response
    if (data.$metadata.httpStatusCode === 200) {
      return { success: true, data };
    } else {
      return { success: false, error: "Failed to send message to SQS" };
    }
  } catch (err) {
    console.error("Error", err);
    return { success: false, error: "Failed to send message to SQS" };
  }
}

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();

  // Validate the request body
  const result = payloadSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ 
      error: "Invalid payload", 
      details: result.error.errors 
    }, { status: 400 });
  }

  const { listing, report_id } = result.data;

  try {
    const payload = { report_id, listing };
    const response = await sendMessageToSQS(payload);
    
    if (response.success) {
      return NextResponse.json({ message: "Message sent to SQS successfully", data: response.data }, { status: 200 });
    } else {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to send message to SQS" }, { status: 500 });
  }
});