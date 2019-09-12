const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


exports.getUser = async (event) => {
  const userId = event.pathParameters.id
  try {
    const user = await dynamodb.get({
      TableName: process.env.USER_TABLE_NAME,
      Key: {
        id: userId,
      },
    }).promise()

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ user: user.Item })
    }
  } catch(err) {
     console.log(err, err.stack);
     return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(err),
    }
  }
};
