const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'assets/src/js/index'),
    output: {
        path: path.join(__dirname, 'assets/dist'),
        filename: '[name]-[hash].js'
    },
    resolve: {
        extensions: ['.js', '*']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ExtractText.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
        ],
    },
    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: 'webpack-stats.json'
        }),
        new ExtractText({
            filename: '[name]-[hash].css'
        }),
    ],
}