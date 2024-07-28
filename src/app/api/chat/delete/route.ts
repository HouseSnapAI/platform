import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, UpdateItemCommand, ScanCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
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

  const { email, chat_id } = await req.json();

  if (!email || !chat_id) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const scanUserParams = {
    TableName: process.env.USER_TABLE!,
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': { S: email },
    },
  };

  try {
    const scanResult = await dynamoDBClient.send(new ScanCommand(scanUserParams));
    if (scanResult.Items && scanResult.Items.length > 0) {
      const userId = scanResult.Items[0].user_id.S;
      const userChats = scanResult.Items[0].chats.L;

      // Find the index of the chat_id to remove
      const chatIndex = userChats?.findIndex(chat => chat?.M?.chat_id?.S === chat_id);

      if (chatIndex === -1) {
        return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
      }

      const updateUserParams = {
        TableName: process.env.USER_TABLE!,
        Key: {
          user_id: { S: userId },
          email: { S: email },
        },
        UpdateExpression: `REMOVE chats[${chatIndex}]`,
      };

      // @ts-ignore
      await dynamoDBClient.send(new UpdateItemCommand(updateUserParams));
      return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error interacting with DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});