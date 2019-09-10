const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
 
const deleteUser = userId => 
  dynamodb.deleteItem({
    TableName: process.env.USER_TABLE_NAME,
    Key: {
      id: {
        S: userId
      },
    }, 
  }).promise()

exports.deleteUser = async (event) => {
  const userIdToDelete = event.pathParameters.id
  try {
    await deleteUser(userIdToDelete)
    return {
      statusCode: "200",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userIdToDelete }),
    }
  } catch(err) {
    console.log(err, err.stack);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(err)
    }
  }
};
