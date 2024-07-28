import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserType, UserPreferencesType } from '@/utils/types';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION || '', 
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || '', 
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '', 
  },
});


const schema = z.object({
  email: z.string().email(),
});

export const POST = withApiAuthRequired(async function handler(
  req: NextRequest
) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { email } = parseResult.data;

  const params = {
    TableName: process.env.USER_TABLE!,
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': { S: email },
    },
  };

  const preferencesParams = {
    TableName: process.env.PREFERENCES_TABLE!,
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': { S: email },
    },
  };

  try {
    const command = new ScanCommand(params);
    const result = await dynamoDBClient.send(command);

    const preferencesCommand = new ScanCommand(preferencesParams);
    const preferencesResult = await dynamoDBClient.send(preferencesCommand);
    if (result.Items?.length === 0 || preferencesResult.Items?.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json([result.Items![0] as unknown as UserType, preferencesResult.Items![0] as unknown as UserPreferencesType], { status: 200 });
  
} catch (error) {
    console.error('Error querying DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});