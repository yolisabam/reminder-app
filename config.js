const twillioKeys = require("./keys.js");

const config = {};

config.twilioAccountSid = twillioKeys.twilioAccountSid;
config.twilioAuthToken = twillioKeys.twilioAuthToken;
config.twilioPhoneNumber = twillioKeys.twilioPhoneNumber;

module.exports = config;