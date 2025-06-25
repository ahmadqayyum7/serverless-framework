const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const ddb = new DynamoDBClient();
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);

    const item = {
      id: { S: message.userId },
      name: { S: message.name },
      email: { S: message.email }
    };

    const putCommand = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: item
    });

    await ddb.send(putCommand);
  }

  return { statusCode: 200, body: "Processed messages" };
};
