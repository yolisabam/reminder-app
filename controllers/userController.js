const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

//define methods for userController
module.exports = {
  //method for finding one user
  findOne : function(req, res) {
    db.user
      .findOne({
        where : {
          email : req.body.email
        }
      })
      .then(dbUser => 
        //if the user doesn't exist in the db
        !dbUser ?  
          res.json({
            isValidEmail : false  
          })
        
        //else check if the user matches db
        : 
          bcrypt.compare(req.body.password, dbUser.password, function(err, res) {
            if (response) {
              res.json({
                isValidEmail : true,
                isValidPassword : true,
                userId : dbUser.dataValues.id
              });
            } else {
              res.json({isValidPassword : false});
            }
          })
        
      )
      .catch(err => res.status(422).json(err));
  }
  ,
  // create : function(req, res) {
  //   db.user
  //     .findOne(req.body)
  //     .then(dbUser =>)
  //     .catch(err => res.status(422).json(err));
  // }
};