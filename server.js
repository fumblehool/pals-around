var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./app/config/db');
var schema = require('./app/models');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: "qweazxc1123a@$cas@#F(734C"}));

var port = process.env.PORT || 3000

mongoose.Promise = global.Promise;
mongoose.connect(db.url, (err, database) => {
    if (err){
        return console.log(err);
    }
    else{
        var routes = require('./app/routes/');
        routes(app);
        
        app.listen(port, () => {
            console.log("We're live on port no." + port)
        });

        app.use(function(req, res) {
            res.status(404).send({url: req.originalUrl + ' not found'})
        });
    }
});