"use strict"


console.log('NODE_ENV =', process.env.NODE_ENV);

var env;
(process.env.NODE_ENV == 'production' && process.env.NODE_ENV !== undefined)? env = "production" : env = "development" ;

console.log(env);

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  "development": {
    entry: {
      bundle: path.join(__dirname, '/frontend/main.js'),
      filter: path.join(__dirname, '/frontend/filter.js')
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },
    module: {
        loaders: [
              {
                test   : /\.css$/,
                loaders: ['style', 'css', 'resolve-url']
              }, 
              {
                test   : /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: "file?name=img/[name].[ext]"
              } 
        ]
    },

    devServer: {
      port: 8080,
      hot: true,
      contentBase: __dirname + "/public"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css")
    ]
},

"production": {
      entry: {
        bundle: path.join(__dirname, '/frontend/entry.js'),
        filter: path.join(__dirname, '/frontend/filter.js')
      },
      output: {
          path: __dirname + "/public",
          filename: "[name].js",
          publicPath: './'
      },
      module: {
          loaders: [
                {
                  test   : /\.css$/,
                  loaders: ['style', 'css', 'resolve-url']
                }, 
                {
                  test   : /\.scss$/,
                  loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
                },
                {
                  test: /\.(jpe?g|png|gif|svg)$/,
                  loader: "file?name=img/[name].[ext]"
                } 
          ]
      },

      plugins: [
          new ExtractTextPlugin("[name].css"),
          new webpack.optimize.UglifyJsPlugin({
              minimize: true,
              output: {
                comments: false
              },
              compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
              }
          }),
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          })
      ]
  }
}

console.log(config[env]);



module.exports = config[env];