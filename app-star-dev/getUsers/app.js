const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.getUsers = async (event) => {
  try {
    const users = await dynamodb.scan({ TableName: process.env.USER_TABLE_NAME }).promise()

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ users: users.Items })
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
