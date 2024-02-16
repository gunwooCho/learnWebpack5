const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const commonWebpackConfig = require('@my-monorepo/webpack-config');

module.exports = (
  env,
  args,
) => {
  /** @type {webpack.Configuration} */
  const result = {
    extends: require.resolve('@my-monorepo/webpack-config'),
    entry: {
      index: './src/index.jsx',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
      }),
    ]
  };

  return result;
}