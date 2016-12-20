const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./../webpack.config.js');


module.exports = {
	install: (app)=>{
		const compiler = webpack(webpackConfig);
		const middleware = webpackMiddleware(compiler, {
		  publicPath: "/",
		  stats: {
		    colors: true
		  }
		});

		app.use(middleware);
		app.use(webpackHotMiddleware(compiler));
	}
}

