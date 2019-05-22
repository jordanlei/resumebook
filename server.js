const express = require('express');
const next = require('next');
const path = require('path');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');


const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const apiRouter= require('./server/routes/api.js')
require('dotenv').config();

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const nextApp = next({ dir: '.', dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare()
    .then(() => {
      const server = express();
      

      if (!dev) {
        // Enforce SSL & HSTS in production
        server.use(function(req, res, next) {
          var proto = req.headers["x-forwarded-proto"];
          if (proto === "https") {
            res.set({
              'Strict-Transport-Security': 'max-age=31557600' // one-year
            });
            return next();
          }
          res.redirect("https://" + req.headers.host + req.url);
        });
      }

      // view engine setup
      server.set('views', path.join(__dirname, 'views'));
      server.set('view engine', 'jade');

      server.use(logger('dev'));
      server.use(express.json());
      server.use(express.urlencoded({ extended: false }));
      server.use(cookieParser());
      server.use(express.static(path.join(__dirname, 'public')));
      server.use(cors());
      server.use("/api", apiRouter); // NEW
      


      // Static files
      // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
      server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
      }));

      // route for creating a new user
      // this is the action of the "create new user" form
      server.use('/create', (req, res) => {
          // construct the User from the form data which is in the request body
          var newUser = new User ({
          name: req.body.name,
          age: req.body.age,
          });

          // save the user to the database
          newUser.save( (err) => {
          if (err) {
            res.type('html').status(200);
            res.write('uh oh: ' + err);
            console.log(err);
            res.end();
          }
          else {
            // display the "successfull created" page using EJS
            res.render('created', {user : newUser});
          }
          } );
      });

    
      // Example server-side routing
      server.get('/a', (req, res) => {
        return nextApp.render(req, res, '/b', req.query)
      })

      // Example server-side routing
      server.get('/b', (req, res) => {
        return nextApp.render(req, res, '/a', req.query)
      })

      server.get('/p/:id', (req, res) => {
        const actualPage = '/post'
        const queryParams = { id: req.params.id }
        nextApp.render(req, res, actualPage, queryParams)
      })

      server.get('/view/:id', (req, res) => {
        const actualPage = '/people-viewall'
        const queryParams = { id: req.params.id }
        nextApp.render(req, res, actualPage, queryParams)
      })

      // Default catch-all renders Next app
      server.get('*', (req, res) => {
        // res.set({
        //   'Cache-Control': 'public, max-age=3600'
        // });
        const parsedUrl = url.parse(req.url, true);
        nextHandler(req, res, parsedUrl);
      });

      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${port}`);
      });
    });
}
