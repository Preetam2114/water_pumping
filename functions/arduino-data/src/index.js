const sdk = require("node-appwrite");
const { v4: uuidv4 } = require("uuid");
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();
  console.log("hello world");
  console.log("req is", req);
  console.log(req.payload);
  const { moisture, pump_status, water_intake } = JSON.parse(req.payload);
  console.log(moisture, pump_status, water_intake);

  // You can remove services you don't use
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("648826a88cadbb1a59d5")
    .setKey(
      "9dfeba777ec0831e2eca697c89d82f4a8e7db61ee2f444e4157f4244d05e1619e8a4b9325fea3336f425dbc75b00ba814f65f3f46120c26e3235c98061cfd4b354396d8eb4ff3fbf88d251719cdb986e716e67597db4ba9cb64be11e427469b05445760cf8e89fd74db3e10003f417d69818d41ba4d632e2f8899dac361634e9"
    )
    .setSelfSigned(true);
  // if (!req.variables["APPWRITE_FUNCTION_ENDPOINT"] || !req.variables["APPWRITE_FUNCTION_API_KEY"]) {
  //   console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  // } else {
  //   client
  //     .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
  //     .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
  //     .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
  //     .setSelfSigned(true);
  // }

  const saveData = await database.createDocument(
    "6488522930f583a33d5c",
    "64885246482c3298bfb5",
    uuidv4(),
    {
      moisture,
      pump_status,
      water_intake
    }
  );

  console.log(saveData);

  res.json(saveData);
};
