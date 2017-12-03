const express = require("express");
const db = require("../models");

//define methods for userController
module.exports = {
  create : function(req, res) {
    console.log("the server received the post request");
    //console.log(req.body);
    db.Appointment.create(req.body)
      .then(dbAppt => 
        res.json(dbAppt)
        )
      .catch(err => res.status(422).json(err));
  }
};