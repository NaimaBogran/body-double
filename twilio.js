// // // Download the helper library from https://www.twilio.com/docs/node/install
// // const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// // // Find your Account SID and Auth Token at twilio.com/console
// // // and set the environment variables. See http://twil.io/secure
// require("dotenv").config();
// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// console.log("SID:", accountSid);
// console.log("TOKEN:", authToken);

// const client = twilio(accountSid, authToken);

// async function fetchTurnConfig() {
//   try {
//     const token = await client.tokens.create();
//     console.log("TURN Response:\n", JSON.stringify(token, null, 2));
//   } catch (error) {
//     console.error("ERROR fetching TURN token:", error);
//   }
// }

// fetchTurnConfig();
