
var mongoose = require('mongoose'),
Model = mongoose.model('db');

Model.collection.dropIndexes();

exports.get_a_user = function(req,res){
    Model.findById(req.params.uid, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  }); 
};

exports.create_a_user = function(req,res){
    var new_user = new Model(req.body);
    new_user.save(function(err, user){
        if (err){
            res.send(err);
        }
        res.json(user);
    })
};

exports.get_a_post = function(req,res){
    res.send("get post");
};
exports.create_a_post = function(req,res){
    res.send("create post")
};

exports.get_timeline = function(req,res){
    res.send("get_timeline");
};

exports.follow_a_user = function(req,res){
    res.send("follow a user");
};

exports.unfollow_a_user = function(req,res){
    res.send("unfollow a user");    
};