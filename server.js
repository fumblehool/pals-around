var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("We're live on port no." + port)
});