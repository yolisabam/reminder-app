const express = require("express");
const db = require("../models");

//define methods for userController
module.exports = {
  create : function(req, res) {
    console.log("the server received the post request");
    //console.log(req.body);
    db.Appointment.create(req.body)
      .then(dbAppt => {
        //if appt is created successfully, find the user and and push the new appt's _id to the user's appointments array 
        return db.User.findOneAndUpdate({}, { $push : { appointments : dbAppt._id }}, { new : true });
        //res.json(dbAppt)
      })
      .then(dbUser => 
        //if the user is updated successfully, send it back to the client
        res.json(dbUser)
        )
      .catch(err => res.status(422).json(err));
  }
};