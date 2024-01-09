const common = require('./webpack.config.js');

module.exports = common({
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 9878,
    static: './dist',
    hot: true,
    open: true,
    hot: true,
  },
});