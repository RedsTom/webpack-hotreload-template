/* eslint-disable */
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV === 'dev';

const cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 1,
    },
}

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                ["autoprefixer", {}]
            ]
        }
    }
}

const config = {
    entry: {
        app: './src/index.js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@css': path.resolve(__dirname, 'src/css/'),
            '@assets': path.resolve(__dirname, 'public/assets/'),
        }
    },
    mode: dev ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'public/build/'),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    devtool: dev ? 'cheap-module-source-map' : false,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'eslint-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssLoader,
                    postcssLoader,
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssLoader,
                    postcssLoader,
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve('./public/'),
        }
    }
};

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: false
    }));
}

module.exports = config;