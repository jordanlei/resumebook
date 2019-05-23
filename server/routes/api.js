var express = require('express');
var router = express.Router();
require('dotenv').config();

// import the User class from User.js
var User = require('../schemas/User.js');


router.post('/createuser', function(req, res, next) {
  // construct the User from the form data which is in the request body
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age
  });
  console.log("User Created")
  // save the user to the database
  user.save(err => {
    if (err) {
      res.type('html').status(400);
      res.write('uh oh: ' + err);
      console.log(err);
      res.end();
    } else {
      // send back succesful
      res.type('html').status(200);
      res.json(req.body);
    }
  });
});

router.post('/finduser', function(req, res, next) {
  var searchname = req.body.username;
  // find the policymaker
  console.log("Finding Username")
  User.findOne({ username: searchname }, (err, user) => {
    if (err) {
      res.type('html').status(200);
      console.log('uh oh' + err);
      res.write(err);
    } else if (!user) {
      res.type('html').status(400);
      res.write('There are no users with that name');
      res.end();
    } else {
      res.type('html').status(200);
      console.log(user);
      res.json(user);
    }
  });
});

router.get('/findallusers', function(req, res, next) {
    // find all of the policymakers
    User.find((err, users) => {
      if (err) {
        res.type('html').status(200);
        console.log('uh oh' + err);
        res.write(err);
      } else if (!users) {
        res.type('html').status(400);
        res.write('No records are available at this time.');
        res.end();
      } else {
        res.json(users);
      }
    });
  });


module.exports = router;