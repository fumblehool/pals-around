var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Posts = new Schema({
    text:{
        type: String,
        length: 140
    },
    date:{
        type: Date,
        default: Date.now
    }
});

var PalsAroundSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String,
        Required: true,
        index: { unique: true },
    },
    password:{
        type: String,
        Required: true
    },
    email:{
        type: String,
        Required: true,
        index: { unique: true }
    },
    follows:[],
    posts: [Posts],
});


module.exports = mongoose.model('db', PalsAroundSchema);
module.exports = mongoose.model('post', Posts);