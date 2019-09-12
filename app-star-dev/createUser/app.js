const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1')
const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

const createNewUser = async (userName) => {
  const newUser = {
    id: uuidv1(),
    name: userName,
    createdAt: new Date().getTime(),
  }

  await dynamodb.put({
    TableName: process.env.USER_TABLE_NAME,
    Item: {
      id: newUser.id,
      name: newUser.name,
      createdAt: `${newUser.createdAt}`
    },
  }).promise()

  return newUser
}

exports.createUser = async (event, context, callback) => {
  const newUserName = JSON.parse(event.body).userName
  try {
    const newUser = await createNewUser(newUserName)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ data: newUser }),
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
