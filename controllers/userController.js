const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

//define methods for userController
module.exports = {
  //method for finding one user
  findOne : function(req, res) {
    console.log(req.body.email);
    db.User
      .findOne({
        email : req.body.email
      })
      .then(dbUser => {
        console.log(dbUser);
        //if the user doesn't exist in the db
        !dbUser ?  
          res.json({
            isValidEmail : false  
          })
        
        //else check if the user matches db
        : 
          bcrypt.compare(req.body.password, dbUser.password, function(error, response) {
            if (response) {
              res.json({
                isValidEmail : true,
                isValidPassword : true,
                userId : dbUser._id
              });
            } else {
              res.json({isValidPassword : false});
            }
          }) 
      }
      )
      .catch(err => res.status(422).json(err));
  },
  create : function(req, res) {
    console.log(req.body);
    db.User
      .findOne({
        email : req.body.email
      })
      .then(dbUser => {
        //if no existing email address is found, we can add user
        if (!dbUser)  {
          console.log("We can add this user to DB!!!");
          
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            console.log("this the hash : " + hash);
            db.User.create({
              firstName : req.body.firstName,
              lastName : req.body.lastName,
              email : req.body.email,
              password : hash,
              mobileNumber : req.body.mobileNumber
            })
            // .then(result => res.json( {isEmailUnique : true } ))
            // .catch(err => res.status(422).json(err));
          }); 
          res.json({isEmailUnique : true });   
        } else {
          res.json({ isEmailUnique : false }) 
        }
      })
      .catch(err => res.status(422).json(err));
  }
};