const express = require("express");
const db = require("../models");

const router = express.Router();

//define methods for userController
module.exports = {
  create : function(req, res) {
    console.log(req.body);

    db.Appointment
      .create({
        appointmentName : req.body.appointmentName,
        date : req.body.date,
        time : req.body.time,
        appointmentNumber : req.body.appointmentNumber,
        notification : 
      })
  }
}