 const config = {};

if (process.env.PORT ) {
  //const config = {};
  config.twilioAccountSid = process.env.twilioAccountSid;
  config.twilioAuthToken = process.env.twilioAuthToken;
  config.twilioPhoneNumber = process.env.twilioPhoneNumber;
} else {
  
  const twillioKeys = require("./keys.js");
  //const config = {};

  config.twilioAccountSid = twillioKeys.twilioAccountSid;
  config.twilioAuthToken = twillioKeys.twilioAuthToken;
  config.twilioPhoneNumber = twillioKeys.twilioPhoneNumber;
  }

  module.exports = config;


