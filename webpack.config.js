var path = require('path');
var webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app/static/js/dev/'),
    build: path.join(__dirname, 'app/static/js/build')
};

module.exports = {
    entry: './app/static/js/dev/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: 'babel-loader',
                query: {
                    presets: ['react','es2015']
                },
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.min.js'
    }
};