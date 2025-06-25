const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient();
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.handler = async (event) => {
  const userId = event.queryStringParameters && event.queryStringParameters.id;

  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: { id: { S: userId } }
  });

  const response = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ item: response.Item || null })
  };
};
