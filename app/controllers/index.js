
var mongoose = require('mongoose'),
Model = mongoose.model('db');
Post = mongoose.model('post')


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
        res.render("signup.ejs",{user: null,error:"Invalid details!"});
    }
    else{
        var test = {'username': req.body.username,
                    'email': req.body.password};
        Model.find(test, function(err, user){
            if (err) res.send(err);
            
            if(!user.length){
                var new_user = new Model(req.body);
                new_user.save(function(err, user){
                    if (err){
                        res.send(err);
                    }
                    var id = user['_id']
                    console.log(id);
                    res.render('home.ejs', {user: id});
                })
            }
            else {
                console.log("user exists");
                res.send(user);
            }
        })
    }   
};

exports.get_post = function(req,res){
    var id = req.params.id;
    Model.find({'posts._id': id}, function(err, data){
        if (err) return err;
        console.log(data[0].posts);
        Post.find({'_id': id}, function(err, data){
            console.log(data);
        })
        res.send(data);
    })
};
exports.create_post = function(req,res){
    var uid = req.body;
    Model.findByIdAndUpdate(req.session.uid, {$push:{"posts":req.body}},
        {safe: true, upsert: true},
        function(err, model){
            console.log(model);
            res.render("timeline", {user: req.session.uid});
        });
};

exports.get_timeline = function(req,res){
    if (req.session.uid){
        Model.find({'_id': req.session.uid},function(err, user){
            res.json(user);
        });
    }
    else{
        res.redirect("/");
    }
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
        res.render("login.ejs", {user: null,error:"Invalid details!"});
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
                console.log(id);
                res.redirect('/timeline');
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
    if(req.session.uid){
        res.render('home.ejs', {user: req.session.uid});
    }
    res.render('home.ejs', {user: null});
};

exports.get_login_page = function(req, res){
    res.render('login.ejs', { user: null,error: null,});
};

exports.get_signup_page = function(req, res){
    res.render('signup.ejs', {user: null, error: null});
};

exports.get_timeline = function(req, res){
    if(!req.session.uid){
        res.redirect("/");
    }
    res.render('timeline.ejs', {user: req.session.uid});
};

exports.user_profile = function(req, res){
    res.render("profile.ejs", {user: req.session.uid});
};