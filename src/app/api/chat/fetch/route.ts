import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '',
  },
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { chat_uuid, email } = await req.json();

  if (!chat_uuid || !email) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const params = {
    TableName: process.env.CHATS_TABLE!,
    Key: {
      chat_id: { S: chat_uuid },
      email: { S: email },
    },
  };

  try {
    const command = new GetItemCommand(params);
    const result = await dynamoDBClient.send(command);

    if (!result.Item) {
      return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(result.Item, { status: 200 });
  } catch (error) {
    console.error('Error fetching chat history from DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});
