'use strict';
//Requiring module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('./initialize/firebaseInit');
var config = require('dotenv').config()
var routes = require('./routes/index.js');

//initialize express app
var app = express();
var route = express.Router();

//setting up twig view engine
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'twig');

//setting up static directory
app.use(express.static('public'));


//using bodyParser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating port for app
var port = process.env.PORT || 3000;

//routing for user interface
routes(app, route);

//listening for app on port 3000
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});