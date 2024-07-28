import { generateChatTitle } from '@/utils/db';
import { chatStarter } from '@/utils/vars';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, PutItemCommand, UpdateItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from '@langchain/openai';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '',
  },
});

type ChatCreateRequestBody = {
  email: string;
  chat_uuid: string;
  initialMessage: string;
}

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { email, chat_uuid, initialMessage } = await req.json() as ChatCreateRequestBody;

  if (!email || !chat_uuid || !initialMessage) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }


  const chatItem = {
    TableName: process.env.CHATS_TABLE!,
    Item: {
      chat_id: { S: chat_uuid },
      email: { S: email },
      messages: { L: [{M: chatStarter}, {M: {role: {S: "user"}, content: {S: initialMessage}}}] },
      createdAt: { S: new Date().toISOString() },
    },
  };

  const titleModel = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-3.5-turbo',
    maxTokens: 7,
});

  const title = await generateChatTitle(initialMessage, titleModel);


  // Scan to get the primary key (id) using the secondary key (email)
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

      const updateUserParams = {
        TableName: process.env.USER_TABLE!,
        Key: {
          user_id: { S: userId },
          email: { S: email },
        },
        UpdateExpression: 'SET chats = list_append(if_not_exists(chats, :empty_list), :chats)',
        ExpressionAttributeValues: {
          ':chats': { L: [{ M: {chat_id: {S: chat_uuid},title: {S: title}, updated: {S: new Date().toISOString()}} }] },
          ':empty_list': { L: [] },
        },
      };

      //@ts-ignore
      await dynamoDBClient.send(new UpdateItemCommand(updateUserParams));
      return NextResponse.json({ message: 'Chat created and user updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error interacting with DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});