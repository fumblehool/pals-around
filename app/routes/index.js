
module.exports = function(app, db){
    app.post('/api/users/', (req, res) => {
    console.log(req.body)
    res.send('Hello')
    });
    
    app.get('/api/users/:uid', (req, res) => {
        var id = req.params.id;
        res.send("hello from /test" + uid);
    });

    app.get('/api/posts/:id', (req, res) => {
        var id = req.params.id;
        res.send("id is" + id);
    });

    app.post('/api/posts', (req, res) => {
        console.log("posts POST data");
        res.send("Post a status");
    });

    app.get('/api/timeline', (req, res) => {
        res.send("timeline data");
    });

    app.get('/api/follow/:uid', (req, res) => {
        res.send("follow user:" + req.params.uid);
    });

    app.get('/api/unfollow/:uid', (req, res) => {
        res.send("unfollow user:" + req.params.uid);
    });
}