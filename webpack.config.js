'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {fallback: path.join(__dirname, "node_modules")},
    resolveLoader: {fallback: path.join(__dirname, "node_modules")},
    entry: {
        background: __dirname + '/app/scripts/background',
        options: __dirname + '/app/scripts/options',
        main: __dirname + '/app/scripts/main'
    },
    output: {
        path: path.resolve(__dirname + '/public/scripts'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),

        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: []
        }),
        new CopyWebpackPlugin([
                {
                    from: __dirname + '/node_modules/jquery/dist/jquery.min.js',
                    to: __dirname + '/public/scripts/vendors/jquery.min.js'
                },
                {from: __dirname + '/app/icons/icon.png', to: __dirname + '/public/icons/icon.png'},
                {from: __dirname + '/app/manifest.json', to: __dirname + '/public/manifest.json'},
                {from: __dirname + '/app/options.html', to: __dirname + '/public/options.html'},
                {from: __dirname + '/app/popup.html', to: __dirname + '/public/popup.html'}]
        )

    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    watch: NODE_ENV == 'development',
    devtool: NODE_ENV == 'development' ? 'source-map' : null
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                unsafe: true
            }
        })
    );
}