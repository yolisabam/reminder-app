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
  create : function(req, res) {
    console.log("the server received the post request");
    const user = req.param('userid');
    db.Appointment.create({ ...req.body, user })
      .then(dbAppt => 
        res.json(dbAppt)
      )
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    const userid = req.param('userid');
    db.Appointment.findAll(userid)
      .then(dbAppt =>
        res.json(dbAppt)
      );
  },
  remove: function (req, res) {
    const appointmentId = req.param('id');
    db.Appointment.remove({ _id: appointmentId })
      .then(dbAppt =>
        res.json(dbAppt)
      );
  },
};