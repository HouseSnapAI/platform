import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { ChatHistoryType } from '@/utils/types';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '',
  },
});

type BodyPayloadType = {
    formObject: {
        Budget: number[],
        Description: string[],
        locations: string[],
        beds_bath: number[],
        size_of_house: number[],
        query: string
    };
  };

//   Form object:
// {Budget: [],
//     Description: [],
//     locations: [],
//     beds_bath: [],
//     size_of_house:[],
//     query: ""}
export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { formObject } = (await req.json()) as BodyPayloadType;


  try {
    

    return NextResponse.json({message: 'sup'}, { status: 200 });
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});
