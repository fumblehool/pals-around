
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
    if(!req.body.name ||
       !req.body.username || 
       !req.body.password ||
       !req.body.email){
        res.status("400");
        res.send("Invalid details!");
    }
    else{
        var test = {'username': req.body.username,
                    'email': req.body.password};
        Model.find(test, function(err, user){
            if (err) res.send(err);
            else if (user != null){
                console.log("user exists");
                res.send(user);
            }
            else{
                var new_user = new Model(req.body);
                new_user.save(function(err, user){
                    if (err){
                        res.send(err);
                    }
                    res.json(user);
                })
            }
        })
    }   
};

exports.get_post = function(req,res){
    var id = req.params.id;
    Model.find({'posts':{'_id': id}}, function(err, data){
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
    if(!req.body.username || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
    }
    else{
        var test = {
            'username': req.body.username,
            'password': req.body.password
        }

        Model.find(test, function(err, user){
            if(err) res.send(err);
            if(user){
                var id = user[0]['_id'];
                req.session.uid = id;
                res.send(req.session.uid);
            }
            else{
                res.status("400");
                res.send("user not found.");
            }

        });
    }
};

exports.logout_user = function(req, res){
    req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
};

exports.home = function(req, res){
    res.render('index.html', {});
};

