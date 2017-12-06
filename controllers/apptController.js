const express = require("express");
const db = require("../models");

//define methods for userController
module.exports = {
  create : function(req, res) {
    console.log("the server received the post request!!!");
    console.log(req.body);
    db.Appointment.create(req.body)
      .then(dbAppt => {
        console.log(dbAppt);
        //if appt is created successfully, find the user and and push the new appt's _id to the user's appointments array 
        return db.User.findOneAndUpdate({}, { $push : { appointments : dbAppt._id }}, { new : true });
        //res.json(dbAppt)
      })
      .then(dbUser => 
        //if the user is updated successfully, send it back to the client
        res.json(dbUser)
        )
      .catch(err => res.status(422).json(err));
  },  
  get: function(req, res) {
    console.log("I am trying to get my appointments");
    const userId = req.param('userid');

    db.User.find({ _id : userId})
      .populate("appointments")
      .then(dbUserAppts => 
        //console.log(dbUserAppts)
        res.json(dbUserAppts)
      );
  },
  update: function (req, res) {
    const id = req.param('id');
    db.Appointment.findOne({ _id: id })
      .then(dbAppt => {
        if (dbAppt) {
          // update
          console.log('Updating appointment');
          dbAppt.appointmentName = req.body.appointmentName;
          dbAppt.date = req.body.date;
          dbAppt.time = req.body.time;
          dbAppt.notification = req.body.notification;
          dbAppt.appointmentNumber = req.body.appointmentNumber;
          dbAppt.notificationLabel = req.body.notificationLabel;
          dbAppt.save((err, dbAppt) => {
            if (err) console.error(err);
            res.json(dbAppt);
          });
        }
      });
  },
  remove: function (req, res) {
    const appointmentId = req.param('id');
    db.Appointment.remove({ _id: appointmentId })
      .then(dbAppt =>
        res.json(dbAppt)
      );
  }
};