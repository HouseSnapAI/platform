/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
//@ts-ignore
const AWS = require('aws-sdk');
//@ts-ignore
const { v4: uuidv4 } = require('uuid');

//@ts-ignore
exports.onExecutePostLogin = async (event, api) => {


  // Configure AWS SDK
  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: event.secrets.REGION,
    accessKeyId: event.secrets.AWS_ACCESS,
    secretAccessKey: event.secrets.AWS_SECRET
  });

  const searchParams = {
    TableName: event.secrets.TABLE_NAME,
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email'
    },
    ExpressionAttributeValues: {
      ':email': event.user.email
    }
  };

  try {
    const result = await dynamoDB.scan(searchParams).promise();
    console.log(result.Items[0])
    if (result.Items.length <= 0) {    

  const userId = uuidv4();
  const user = {
    user_id: userId,
    email: event.user.email,
    name: event.user.name || undefined,
    chats: [],
    geoip: event?.request?.geoip || undefined,
    ip: event?.request?.ip || undefined
  };

  const params = {
    TableName: event.secrets.TABLE_NAME,
    Item: user
  };

  const userPreferences = {
    user_id: userId,
    email: event.user.email,
    budget: [],
    locations: [],
    house_descriptions: "",
    size_of_house:[],
    beds_baths: [],
    property_types: [],
    clicked:[],
    viewed:[],
    saved: []
  }

  const paramsTwo = {
    TableName: event.secrets.TABLE_NAME_TWO,
    Item: userPreferences
  }

  try {
    await dynamoDB.put(params).promise();
    await dynamoDB.put(paramsTwo).promise()
  } catch (error) {
    console.error('Error adding user to DynamoDB:', error);
  }
  } else {
      console.log('Email found in the database:', event.user.email);
      const updateParams = {
        TableName: event.secrets.TABLE_NAME,
        Key: {
          'user_id': result.Items[0].user_id,
          'email': event.user.email
        },
        UpdateExpression: 'set geoip = :geoip, ip = :ip',
        ExpressionAttributeValues: {
          ':geoip': event?.request?.geoip || undefined,
          ':ip': event?.request?.ip || undefined
        }
      };

      try {
        await dynamoDB.update(updateParams).promise();
        console.log('User IP and geoip updated successfully');
      } catch (error) {
        console.error('Error updating user in DynamoDB:', error);
      }
    }
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
  }
};