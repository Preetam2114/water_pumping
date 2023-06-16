const sdk = require("node-appwrite");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
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

  const { moisture, pump_status, water_intake } = JSON.parse(req.payload);

  // You can remove services you don't use
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);

  client
    .setEndpoint(process.env.CLIENT_ENDPOINT)
    .setProject(process.env.PROJECT_ID)
    .setKey(process.env.API_KEY)
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
    // todo: replace with your database id
    "6488522930f583a33d5c",
    // todo: replace with your collection id
    "64885246482c3298bfb5",
    uuidv4(),
    {
      moisture,
      pump_status,
      water_intake
    }
  );

  res.json(saveData);
};
