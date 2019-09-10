const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.updateUser = async (event, context, callback) => {
  const userId = event.pathParameters.id
  const newName = JSON.parse(event.body).newName

  try {
    const data = await dynamodb.updateItem({
      TableName: process.env.USER_TABLE_NAME,
      ExpressionAttributeNames: {
        "#NM": "name",
      },
      ExpressionAttributeValues: {
        ":name": {
          S: newName
        },
      },
      Key: {
        "id": {
          S: userId
        },
      },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #NM = :name"
    }).promise()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        updatedUser: {
          id: data.Attributes.id.S,
          name: data.Attributes.name.S,
          createdAt: data.Attributes.createdAt.N,
        },
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
