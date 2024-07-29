import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
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

  const result = await req.json();

  try {
    const updateParams: any = {
        TableName: process.env.PREFERENCES_TABLE!,
        Key: {
            user_id: { S: result.user_id },
            email: { S: result.email }
        },
        UpdateExpression: 'SET saved = list_append(if_not_exists(saved, :empty_list), :saved)',
        ExpressionAttributeValues: {
            ":saved": { L: [{ S: result.address }] },
            ':empty_list': { L: [] }
        },
      };
  
    //@ts-ignore
    await dynamoDBClient.send(new UpdateItemCommand(updateParams));
    return NextResponse.json({ message: 'Saved Houses updated successfully' }, { status: 200 });
  
} catch (error) {
    console.error('Error querying DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});