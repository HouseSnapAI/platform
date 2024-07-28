/**
* Handler that will be called during the execution of a PostUserRegistration flow.
*
* @param {Event} event - Details about the context and user that has registered.
* @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
*/

//@ts-ignore
const AWS = require('aws-sdk');
//@ts-ignore
const { v4: uuidv4 } = require('uuid');

/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 */

//@ts-ignore
exports.onExecutePostUserRegistration = async (event, api) => {

  // Configure AWS SDK
  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: event.secrets.REGION,
    accessKeyId: event.secrets.AWS_ACCESS,
    secretAccessKey: event.secrets.AWS_SECRET
  });

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
    saved:[]
  }

  const paramsTwo = {
    TableName: event.secrets.TABLE_NAME_TWO,
    Item: userPreferences
  }

  try {
    await dynamoDB.put(params).promise();
    console.log('User added to DynamoDB:', user);
    await dynamoDB.put(paramsTwo).promise()
    console.log('UserPreferences added to DynamoDB:', userPreferences)
  } catch (error) {
    console.error('Error adding user to DynamoDB:', error);
  }
};
