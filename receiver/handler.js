const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const client = new SQSClient();
const QUEUE_URL = process.env.QUEUE_URL;

module.exports.handler = async (event) => {
  try {
    console.log("Received event:", event);

    const body = JSON.parse(event.body);
    console.log("Parsed body:", body);

    const command = new SendMessageCommand({
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(body)
    });

    console.log("Sending message to SQS...");
    const response = await client.send(command);
    console.log("Message sent. SQS response:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent to SQS" })
    };

  } catch (err) {
    console.error("Error in receiver Lambda:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", details: err.message })
    };
  }
};
