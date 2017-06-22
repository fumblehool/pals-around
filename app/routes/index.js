// routes/index.js

//export all the required routes
module.exports = function(app) {
    var Controllers = require('../controllers');

    //Routes
    app.route('/api/users/')
        .post(Controllers.create_user);
    
    app.route('/api/users/:uid')
        .get(Controllers.get_user);

    app.route('/api/posts/:id')
        .get(Controllers.get_post);
    
    app.route('/api/posts')
        .post(Controllers.create_post);

    app.route('/api/database')
        .get(Controllers.get_data);

    app.route('/api/follow/')
        .post(Controllers.follow_user)
        .delete(Controllers.unfollow_user);

    app.route('/')
        .get(Controllers.home);

    app.route('/api/login/')
        .post(Controllers.login_user);

    app.route('/login/')
        .get(Controllers.get_login_page);

    app.route('/logout/')
        .get(Controllers.logout_user);


    app.route('/timeline/')
        .get(Controllers.get_timeline);

    app.route('/signup/')
        .get(Controllers.get_signup_page);

    app.route('/user/:uid')
        .get(Controllers.user_profile)

    app.route('/pals')
        .get(Controllers.get_pals_list);

    app.route('/profile')
        .get(Controllers.get_user_profile)
};
