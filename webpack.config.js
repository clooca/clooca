const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        client: './src/client/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'clooca.js'
        /*
        library: 'clooca',
        libraryTarget: 'umd'
        */
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js[x]?$/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2017']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Version= ' + require('./package.json').version,
            raw: false, entryOnly: true,
        })
    ]
};

