const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.updateUser = async (event, context, callback) => {
  const userId = event.pathParameters.id
  const newName = JSON.parse(event.body).newName

  try {
    const data = await dynamodb.update({
      TableName: process.env.USER_TABLE_NAME,
      ExpressionAttributeNames: { "#NM": "name" },
      ExpressionAttributeValues: { ":name": newName },
      Key: { id: userId },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #NM = :name"
    }).promise()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        updatedUser: data.Attributes
      }),
    }
  } catch(err) {
    console.log(err, err.stack);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(err),
    }
  }
};
