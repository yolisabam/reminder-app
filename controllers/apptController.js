const express = require("express");
const db = require("../models");

//define methods for userController
module.exports = {
  get: function(req, res) {
    const userid = req.param('userid');
    db.Appointment.find({ user: userid })
      .then(dbAppt => 
        res.json(dbAppt)
      );
  },
  create: function(req, res) {
    // TODO: implement update here as well
    console.log("the server received the post request");
    const userid = req.param('userid');
    db.Appointment.create({ ...req.body, user: userid })
      .then(dbAppt =>
        res.json(dbAppt)
      )
      .catch(err => res.status(422).json(err));
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
  },
};