const path = require('path')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname,'..');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
      entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-client.js')],
      output: {
            path: path.join(projectRoot, 'dist'),
            filename: 'bundle.client.js',
      },
      module: {
            rules: [{
                        test: /\.vue$/,
                        loader: 'vue-loader'
                  },
                  {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: projectRoot,
                        exclude: /node_modules/,
                        options: {
                              presets: ['es2015']
                        }
                  }
            ]
      },
      plugins: [
            // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
          // 以便可以在之后正确注入异步 chunk。
          // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
            new webpack.optimize.CommonsChunkPlugin({
                  name: 'manifest',
                  minChunks: Infinity
            }),
            new VueSSRClientPlugin()
      ],
      resolve: {
            alias: {
                  'vue$': 'vue/dist/vue.runtime.esm.js'
            }
      }
};