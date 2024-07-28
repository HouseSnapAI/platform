import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, UpdateItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { ChatHistoryType } from '@/utils/types';

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

  const { chatObject, email } = await req.json() as { chatObject: ChatHistoryType, email: string };

  if (!chatObject || !chatObject.chatId || !email) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const formattedChatObject = {
    chat_id: { S: chatObject.chatId.S },
    email: { S: email },
    messages: {
      L: chatObject.messages.L.map((msg: any) => (msg))
    }
  };

  const params = {
    TableName: process.env.CHATS_TABLE!,
    Key: {
      chat_id: { S: chatObject.chatId.S },
      email: { S: email },
    },
    UpdateExpression: 'SET messages = :messages',
    ExpressionAttributeValues: {
      ':messages': { L: formattedChatObject.messages.L }, // Ensure the correct format
    },
  };

  try {
    //@ts-ignore
    const command = new UpdateItemCommand(params);
    await dynamoDBClient.send(command);

    // Scan to get the primary key (id) using the secondary key (email)
    const scanUserParams = {
      TableName: process.env.USER_TABLE!,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
    };

    const scanResult = await dynamoDBClient.send(new ScanCommand(scanUserParams));
    if (scanResult.Items && scanResult.Items.length > 0) {
      const userId = scanResult.Items[0].user_id.S;
      const chats = scanResult.Items[0].chats.L;

      // Find the chat to update
      const chatIndex = chats?.findIndex((chat: any) => chat.M.chat_id.S === chatObject.chatId.S);
      if (chatIndex !== undefined && chatIndex !== -1 && chats) {
        //@ts-ignore
        chats[chatIndex].M.updated.S = new Date().toISOString();
      }

      const updateUserParams = {
        TableName: process.env.USER_TABLE!,
        Key: {
          user_id: { S: userId },
          email: { S: email },
        },
        UpdateExpression: 'SET chats = :chats',
        ExpressionAttributeValues: {
          ':chats': { L: chats },
        },
      };

      //@ts-ignore
      await dynamoDBClient.send(new UpdateItemCommand(updateUserParams));
      return NextResponse.json({ message: 'Chat history and user updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating chat history in DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});