const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event)); // Debugging log

  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : {};
  const id = method === 'GET'
    ? event.queryStringParameters?.id
    : event.pathParameters?.id || body.id;

  if (!id) {
    return response(400, { error: "Missing 'id'" });
  }

  try {
    switch (method) {
      case 'GET':
        const getCommand = new GetItemCommand({
          TableName: TABLE_NAME,
          Key: { id: { S: id } }
        });
        const getResult = await client.send(getCommand);
        return response(200, { item: getResult.Item || null });

      case 'PUT':
        const updateCommand = new UpdateItemCommand({
          TableName: TABLE_NAME,
          Key: { id: { S: id } },
          UpdateExpression: 'SET name = :n, email = :e',
          ExpressionAttributeValues: {
            ':n': { S: body.name },
            ':e': { S: body.email }
          }
        });
        await client.send(updateCommand);
        return response(200, { message: "Item updated" });

      case 'DELETE':
        const deleteCommand = new DeleteItemCommand({
          TableName: TABLE_NAME,
          Key: { id: { S: id } }
        });
        await client.send(deleteCommand);
        return response(200, { message: "Item deleted" });

      default:
        return response(405, { error: 'Method not allowed' });
    }
  } catch (err) {
    console.error("Handler error:", err);
    return response(500, { error: 'Server error', details: err.message });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
