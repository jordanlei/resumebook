var express = require('express');
var router = express.Router();
require('dotenv').config();

// import the Person class from Person.js
var Person = require('../schemas/Person.js');


router.post('/createperson', function(req, res, next) {
  // construct the Person from the form data which is in the request body
  var person = new Person({
    name: req.body.name,
    age: req.body.age
  });
  console.log("Person Created")
  // save the person to the database
  person.save(err => {
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

router.get('/findallpersons', function(req, res, next) {
    // find all of the policymakers
    Person.find((err, persons) => {
      if (err) {
        res.type('html').status(200);
        console.log('uh oh' + err);
        res.write(err);
      } else if (!persons) {
        res.type('html').status(400);
        res.write('No records are available at this time.');
        res.end();
      } else {
        res.json(persons);
      }
    });
  });


module.exports = router;