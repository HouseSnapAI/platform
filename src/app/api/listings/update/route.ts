import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, UpdateItemCommand, GetItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || '',
  },
});


// TODO: once supabase has listings replace
export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { listings_detail_label, zipcode, viewed, clicked, email } = await req.json();

  if (!listings_detail_label || !zipcode || viewed === undefined || clicked === undefined || !email) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  let updateExpression = 'SET num_views = num_views + :increment';
  const expressionAttributeValues: any = {
    ':increment': { N: '1' },
  };

  if (clicked) {
    updateExpression += ', num_clicks = num_clicks + :increment';
  }

  const params = {
    TableName: process.env.LISTINGS_TABLE!,
    Key: {
      listings_detail_label: { S: listings_detail_label },
      zipcode: { S: zipcode },
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };

    return NextResponse.json({ message: 'Listing updated successfully' }, { status: 200 });
});