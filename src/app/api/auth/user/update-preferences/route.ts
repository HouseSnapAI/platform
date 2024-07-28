import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { UserPreferencesType } from '@/utils/types';

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

  const userPreferences = await req.json() as UserPreferencesType;

  if (!userPreferences || !userPreferences.email) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    const updateParams: any = {
      TableName: process.env.PREFERENCES_TABLE!,
      Key: {
        user_id: { S: userPreferences.user_id.S },
        email: { S: userPreferences.email.S },
      },
      UpdateExpression: '',
      ExpressionAttributeValues: {},
    };

    const updateExpressions: string[] = [];
    const expressionAttributeValues: any = {};

    if (userPreferences.budget) {
      updateExpressions.push('budget = :budget');
      expressionAttributeValues[':budget'] = { L: userPreferences.budget.L.map((item: any) => ({ N: item.N.toString() })) };
    }
    if (userPreferences.locations) {
      updateExpressions.push('locations = :locations');
      expressionAttributeValues[':locations'] = { L: userPreferences.locations.L };
    }
    if (userPreferences.house_descriptions) {
      updateExpressions.push('house_descriptions = :house_descriptions');
      expressionAttributeValues[':house_descriptions'] = { S: userPreferences.house_descriptions.S };
    }
    if (userPreferences.size_of_house) {
      updateExpressions.push('size_of_house = :size_of_house');
      expressionAttributeValues[':size_of_house'] = { L: userPreferences.size_of_house.L.map((item: any) => ({ N: item.N.toString() })) };
    }
    if (userPreferences.beds_baths) {
      updateExpressions.push('beds_baths = :beds_baths');
      expressionAttributeValues[':beds_baths'] = { L: userPreferences.beds_baths.L.map((item: any) => ({ N: item.N.toString() })) };
    }
    if (userPreferences.property_types) {
      updateExpressions.push('property_types = :property_types');
      expressionAttributeValues[':property_types'] = { L: userPreferences.property_types.L };
    }

    if (updateExpressions.length > 0) {
      updateParams.UpdateExpression = 'SET ' + updateExpressions.join(', ');
      updateParams.ExpressionAttributeValues = expressionAttributeValues;

      //@ts-ignore
      await dynamoDBClient.send(new UpdateItemCommand(updateParams));
      return NextResponse.json({ message: 'User preferences updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No valid fields to update' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating user preferences in DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});