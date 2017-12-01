//declare dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes"); //all the routes will be in this directory
const app = express();
const router = require("express").Router();
const PORT = process.env.PORT || 3001;

//configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve us static assets
app.use(express.static("client/build"));

//add the routes to be used by our app
app.use(routes);

//set up promises with Mongoose
mongoose.Promise = global.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/user",
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

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
