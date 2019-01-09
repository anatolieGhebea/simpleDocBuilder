'use strict';

// pullin required dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var http = require('http');
// var fs = require('fs');
var path = require('path');
// var util = require('util');
// var os = require('os');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// dev only part
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// get the api routes from routes.js
require('./routes.js')(app);

// set up a static file server that points to the "$folder" directory
// app.use(express.static(path.join(__dirname, '../dist')));

// let fold = path.join(__dirname, '../../frontend/dist');
// console.log(fold);
// app.use(express.static(fold));

// app.use(express.static(path.join(__dirname, '../../docitWebpackApp/dist')));

// server port 
var port = 9092;

// start the server
app.listen(port, function(){
    console.log('Live! running on port: '+port);
});  
 