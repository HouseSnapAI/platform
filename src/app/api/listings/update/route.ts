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

async function fetchUser(email: string) {

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

  const command = new ScanCommand(params);
  const result = await dynamoDBClient.send(command);

  if (result.Items?.length === 0) {
    throw new Error('User not found');
  }

  return result.Items![0];
}

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

  try {
    const command = new UpdateItemCommand(params);
    await dynamoDBClient.send(command);

    // Fetch user using DynamoDB
    const user = await fetchUser(email);
    const user_id = user.user_id.S; 

    const updateUserParams = {
      TableName: process.env.PREFERENCES_TABLE!,
      Key: {
        user_id: { S: user_id },
        email: { S: email },
      },
      UpdateExpression: '',
      ExpressionAttributeValues: {},
    };
    if (clicked) {
      updateUserParams.UpdateExpression = 'SET viewed = list_append(if_not_exists(viewed, :empty_list), :viewed), clicked = list_append(if_not_exists(clicked, :empty_list), :clicked)';
      updateUserParams.ExpressionAttributeValues = {
        ':viewed': { L: [{ S: listings_detail_label }] },
        ':clicked': { L: [{ S: listings_detail_label }] },
        ':empty_list': { L: [] },
      };
    } else if (viewed) {
      updateUserParams.UpdateExpression = 'SET viewed = list_append(if_not_exists(viewed, :empty_list), :viewed)';
      updateUserParams.ExpressionAttributeValues = {
        ':viewed': { L: [{ S: listings_detail_label }] },
        ':empty_list': { L: [] },
      };
    }

    // @ts-ignore
    await dynamoDBClient.send(new UpdateItemCommand(updateUserParams));

    return NextResponse.json({ message: 'Listing and user preferences updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating listing or user preferences in DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});