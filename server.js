// server.js

//Node.js path module for handling and transforming file paths
var path = require('path');
//express module
var express = require('express');
//mongoose for Database
var mongoose = require('mongoose');
//node js body parsing middleware
var bodyParser = require('body-parser');
//database credentials from app/config/db.js
var db = require('./app/config/db');
//database schema from app/models/index.js
var schema = require('./app/models');
//cookie-parser to use cookies
var cookieParser = require('cookie-parser');
//express-session to use session for storing variables
var session = require('express-session');
//puts new Express application inside the app variable 
var app = express();

//using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting up templating engine
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

//using cookieparser middleware and session middleware
app.use(cookieParser());
app.use(session({secret: "qweazxc1123a@$cas@#F(734C"}));

//determining the port 
var port = process.env.PORT || 3000

//try to connect to database
mongoose.Promise = global.Promise;
mongoose.connect(db.url, (err, database) => {
    if (err){
        return console.log(err);
    }
    else{
        //routes from app/routes/
        var routes = require('./app/routes/');
        routes(app);

        //listen app on port specified
        app.listen(port, () => {
            console.log("We're live on port no." + port)
        });

        //a custom middleware to handle undefined routes
        app.use(function(req, res) {
            res.status(404).send({url: req.originalUrl + ' not found'})
        });
    }
});