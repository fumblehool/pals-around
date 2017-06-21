
var mongoose = require('mongoose'),
Model = mongoose.model('db');
Post = mongoose.model('post')
// Model.collection.dropIndexes();

exports.get_user = function(req,res){
    Model.findById(req.params.uid, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  }); 
};

exports.create_user = function(req,res){
    var new_user = new Model(req.body);
    new_user.save(function(err, user){
        if (err){
            res.send(err);
        }
        res.json(user);
    })
};

exports.get_post = function(req,res){
    var id = req.params.id;
    Model.findOne({'posts._id': id}, function(err, data){
        if (err) return err;
        res.send(data);
    })
};
exports.create_post = function(req,res){
    var uid = req.body;
    Model.findByIdAndUpdate(uid, {$push:{"posts":req.body}},
        {safe: true, upsert: true},
        function(err, model){
            res.json(req.body);
        });
};

exports.get_timeline = function(req,res){
    Model.find({'name': 'Daman'},function(err, user){
        res.json(user);
    });
};

exports.follow_user = function(req,res){
    var uid = req.params.uid;
    Model.findByIdAndUpdate('594958845d260e7c7d08fbf5', {$push: {'follows': uid}},
        {safe: true, upsert: true},
        function(err, model){
            res.send(req.user);
        });   
};

exports.unfollow_user = function(req,res){
    res.send("unfollow a user");    
};

exports.login_user = function(req, res){
    res.send("login user");
};

exports.home = function(req, res){
    res.send("home");
};