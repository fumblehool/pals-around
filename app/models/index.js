var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PalsAroundSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String,
        Required: true,
        index: { unique: true }
    },
    password:{
        type: String,
        Required: true
    },
    email:{
        type: String,
        Required: true
    },
    follows:[
        {
            username: String
        }
    ],
    posts: [
        {
            text: String,
            date: Date 
        }
    ],
});


module.exports = mongoose.model('db', PalsAroundSchema);