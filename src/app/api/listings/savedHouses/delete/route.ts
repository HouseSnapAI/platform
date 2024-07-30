import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
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

  const params = {
    TableName: process.env.PREFERENCES_TABLE!,
    Key: {
        user_id: { S: result.user_id },
        email: { S: result.email }
    },
    ProjectExpression: 'saved'
  };

  const res = await dynamoDBClient.send(new GetItemCommand(params));
  const obj = res.Item?.saved.L;
  const ind = obj?.findIndex(i => i.S == result.address);

  try {
    const updateParams: any = {
        TableName: process.env.PREFERENCES_TABLE!,
        Key: {
            user_id: { S: result.user_id },
            email: { S: result.email }
        },
        UpdateExpression: `REMOVE saved[${ind}]`,
      };
  
    //@ts-ignore
    await dynamoDBClient.send(new UpdateItemCommand(updateParams));
    return NextResponse.json({ message: 'Saved House Deleted successfully' }, { status: 200 });
  
} catch (error) {
    console.error('Error querying DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});