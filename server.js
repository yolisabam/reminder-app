require('dotenv').config();

//declare dependencies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes"); //all the routes will be in this directory
const app = express();
const router = require("express").Router();
const PORT = process.env.PORT || 3001;

const scheduler = require("./scheduler");

//configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve us static assets
app.use(express.static("client/build"));

//add the routes to be used by our app
app.use(routes);

//let react-router handles the route on client side
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//set up promises with Mongoose
mongoose.Promise = global.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reminderApp",
  {
    useMongoClient: true
  }
);

const db = mongoose.connection;

//show any mongoose errors
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

//once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//run the appointment notification scheduler
scheduler.start();

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
