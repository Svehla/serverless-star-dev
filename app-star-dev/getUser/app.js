const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


exports.getUser = async (event) => {
  const userId = event.pathParameters.id
  try {
    const data = await dynamodb.query({
      TableName: process.env.USER_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
          ":id": { S: userId },
      },
    }).promise()

    const users = data.Items.map(item => ({
      id: item.id.S,
      name: item.name.S,
      createdAt: item.createdAt.N,
    }))
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ user: users[0] })
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
