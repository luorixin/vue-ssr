const path = require('path')
const webpack= require('webpack')
const projectRoot = path.resolve(__dirname,'..')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
	target: 'node',
	entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-server.js')],
	// 对 bundle renderer 提供 source map 支持
  	devtool: 'source-map',
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(projectRoot, 'dist'),
		filename: 'bundle.server.js'
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		},{
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/,
            options: {
                presets: ['es2015']
            }
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
	},
	// 这是将服务器的整个输出
	  // 构建为单个 JSON 文件的插件。
	  // 默认文件名为 `vue-ssr-server-bundle.json`
	  plugins: [
	    new VueSSRServerPlugin()
	  ],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.runtime.esm.js'
		}
	}
}