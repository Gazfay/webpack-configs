var webpack = require('webpack');
var path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
   entry: ['babel-polyfill', 'es6-promise', './frontend/main.js', './frontend/styles/styles.scss'],
	
   output: {
      path: path.resolve(__dirname, "./public"),
      filename: 'index.js',
      publicPath: '/'
   },
	
   devServer: {
      inline: true,
      port: 8080,
      contentBase: __dirname + '/public'
   },
	
   module: {
      loaders: [
         // {
         //    test: /\.jsx?$/,
         //    exclude: /node_modules/,
         //    loader: 'babel',
				
         //    query: {
         //       presets: ['es2015', 'react']
         //    }
         // },
         {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!resolve-url!sass?sourceMap')
         },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: "file?name=img/[name].[ext]"
          } 

      ]
   },
   plugins: [
       new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true,
          exclude: /node_modules/,
       }),
      new webpack.DefinePlugin({
         'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production'),
         }
      }),
      new ExtractTextPlugin('styles.css')
   ]
}

module.exports = config;