
module.exports = function(app) {
    var Controllers = require('../controllers');

    //Routes
    app.route('/api/users/')
        .post(Controllers.create_a_user);
    
    app.route('/api/users/:uid')
        .get(Controllers.get_a_user);

    app.route('/api/posts/:id')
        .get(Controllers.get_a_post);
    
    app.route('/api/posts')
        .post(Controllers.create_a_post);

    app.route('/api/timeline')
        .get(Controllers.get_timeline);

    app.route('/api/follow/:uid')
        .get(Controllers.follow_a_user)
        .delete(Controllers.unfollow_a_user)
};
