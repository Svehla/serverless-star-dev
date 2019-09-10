const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
// const lol = require('../util')
// console.log(lol)

exports.starDevGetUsers = async (event) => {
  // TODO: add pagination
  try {
    const data = await dynamodb.scan({ TableName: process.env.USER_TABLE_NAME }).promise()
    // console.log(data)
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
      body: JSON.stringify({ users })
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
