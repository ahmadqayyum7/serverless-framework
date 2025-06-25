module.exports.handler = async () => {
  console.log("Warming up receiver...");
  return { statusCode: 200, body: "Warmed!" };
};
