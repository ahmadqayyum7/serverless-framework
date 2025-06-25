const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const client = new SQSClient();
const QUEUE_URL = process.env.QUEUE_URL;

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(body)
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Message sent to SQS" })
  };
};
