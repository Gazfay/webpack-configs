const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
   entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './frontend/main.js', './frontend/styles/styles.scss'],
	
   output: {
      path: __dirname + "/public",
      publicPath: '/',
      filename: 'index.js'
   },

  devServer: {
    contentBase: __dirname + '/public',
    hot: true
  },

	
   module: {
      loaders: [
         {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!resolve-url!sass?sourceMap')
         },
         {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: "file?name=[path][name].[ext]"
        } 

      ]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('styles.css')
   ]

}

module.exports = config;