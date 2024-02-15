const path = require('path');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonWebpackConfig = require('@packages/common-env/webpack.config');

module.exports = (
  env,
  args,
) => {
  const defaultConfig = commonWebpackConfig(env, args);

  const result = merge(defaultConfig, {
    entry: {
      index: './src/index.jsx',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
      }),
    ]
  });

  return result;
}