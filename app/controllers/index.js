// controllers/index.js

//import mongoose and required schemas
var mongoose = require('mongoose'),
Model = mongoose.model('db');
Post = mongoose.model('post')

//handle get_user
exports.get_user = function(req,res){
    Model.findById(req.params.uid, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  }); 
};

//handle create_user
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
                    'email': req.body.email};
        Model.find({username: req.body.username}, function(err, user){
            if (err){
                console.log("user exists");
                res.render("signup.ejs",{user: null,error:"User exists"});
            }
            if(user.length) {
                console.log("user exists");
                res.render("signup.ejs",{user: null,error:"User exists"});
            }

            else{
                var new_user = new Model(req.body);
                new_user.save(function(err, user){
                    if (err){
                        res.send(err);
                    }
                    console.log(user)
                    var id = user['_id']
                    console.log(id);
                    req.session.uid = id;
                    req.session.username = user['username']
                    res.redirect('/timeline');
                })
            }
            
        })
    }   
};

//handle get_post
exports.get_post = function(req,res){
    var id = req.params.id;
    Model.find({'posts._id': id}, function(err, data){
        if (err) return err;
        res.send(data);
    })
};


//handle create_post
exports.create_post = function(req,res){
    if (req.body.text.length>0 &&req.session.uid
        && req.body.text.length<140){
        console.log(req.body);
        var uid = req.body;
        Model.findByIdAndUpdate(req.session.uid, {$push:{"posts":req.body}},
        {safe: true, upsert: true},
        function(err, model){
            console.log(model);
            res.redirect("/timeline");
        });
    }
    else{
        if(req.body.text.length == 0){
            res.redirect("/timeline");
        }
        else{
            res.redirect("/login");
        }
    }
};

//handle get_data
exports.get_data = function(req,res){
    if (req.session.uid){
        Model.find({},function(err, user){
            res.send(user);
            // res.send("timeline");
        });
    }
    else{
        res.redirect("/");
    }
};

exports.follow_user = function(req,res){
    var uid = req.body.uid;
    if(req.session.uid){
        Model.findByIdAndUpdate(req.session.uid, {$push: {'follows': uid}},
            {safe: true, upsert: true},
            function(err, model){
                console.log(model);
                res.redirect("/pals");
            });
    }
    else{
        res.redirect("/");
    }   
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
            if(user.length){
                var id = user[0]['_id'];
                req.session.uid = id;
                req.session.username = user[0]['username']
                console.log(id);
                console.log(req.session.username);
                res.redirect('/timeline');
            }
            else{
                res.status("400");
                res.render("login.ejs", {user: null,error:"user not found!"});
            }

        });
    }
};

exports.logout_user = function(req, res){
    console.log(req.session.username);
    req.session.destroy(function(){
      console.log("user logged out.")
      
   });
   res.redirect('/');
};

exports.home = function(req, res){
    if(req.session.uid){
        res.render('home.ejs', {user: req.session.uid});
    }
    else{
        res.render('home.ejs', {user: null});
    }
};


//handle GET request for login page
exports.get_login_page = function(req, res){
    if(!req.session.uid){
        res.render('login.ejs', { user: null,error: null,});
    }
    else{
        res.redirect("/");
    }
};

//handle GET request for signup page template
exports.get_signup_page = function(req, res){
    res.render('signup.ejs', {user: null, error: null});
};

//handle request for user timeline
exports.get_timeline = function(req, res){
    if(!req.session.uid){
        res.redirect("/login");
    }
    else{
        Model.find({'_id': req.session.uid}, function(err, data){
        if (err) return err;
        var follow_list = data[0]['follows'];

          Model.find({'_id': follow_list},function(err, user){
                res.render('timeline.ejs', {user: req.session.uid,
                                    username: req.session.username,
                                    data: user});
            });
        })
    }
};

//handle request for user profile
exports.user_profile = function(req, res){
    res.render("profile.ejs", {user: req.session.uid});
};

//handle get request for pals list
exports.get_pals_list = function(req, res){
    if(req.session.uid){
        Model.find({}, function(err, list){
            if (err) res.send(err);
            if (!list.length){
                res.render("pals", {list: null, user: req.session.uid});
            }
            else{
                res.render("pals", {list: list, user: req.session.uid});
            }
        });
    }
    else{
        res.redirect("/login");
    }
};

//handle get user account - show user's posts
exports.get_user_profile = function(req, res){
    if(req.session.uid){
        Model.find({_id: req.session.uid}, function(err, list){
            if (err) res.send(err);
            if (!list.length){
                res.render("myposts", {list: null, user: req.session.uid});
            }
            else{
                res.render("myposts", {list: list, user: req.session.uid});
            }
        });
    }
    else{
        res.redirect("/login");
    }
}