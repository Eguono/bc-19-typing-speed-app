'use strict';
//Requiring module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');

//initialize express app
var app = express();
var route = express.Router();

//setting up static directory
app.use(express.static('public'));

//setting up twig view engine
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'twig');

//creating port for app
var port = process.env.PORT || 3000;

//routing for web app
app.route('/')
    .get(function (req, res) {
        res.send('Home Page');
    });

app.route('/register')
    .get(function (req, res) {
        res.send('Register Page');
    });

app.route('/login')
    .get(function (req, res) {
        res.send('Login Page');
    });

app.route('/dashboard')
    .get(function (req, res) {
        res.send('Dashboard Page');
    });

app.route('/history')
    .get(function (req, res) {
        res.send('History Page');
    });

app.route('/test')
    .get(function (req, res) {
        res.send('Typing test page');
    });

//listening for app on port 3000
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});