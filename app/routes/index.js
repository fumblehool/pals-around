
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

    app.route('/api/timeline')
        .get(Controllers.get_timeline);

    app.route('/api/follow/:uid')
        .post(Controllers.follow_user)
        .delete(Controllers.unfollow_user)

    app.route('/')
        .get(Controllers.home);

    app.route('/login/')
        .get(Controllers.login_user);

};
