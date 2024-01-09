const webpack = require('webpack');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const jsRegex = /\.(js|jsx|ts|tsx)$/i;
const cssRegex = /\.css$/i;
const imageRegex = /\.(png|svg|jpe?g|gif)$/i;
const webfontRegex = /\.(woff|woff2|eot|ttf|otf)$/i;

module.exports = (overwriteData) => {
  const isEnvProduction = overwriteData.mode === 'production';

  const result = merge({
    mode: 'production',

    bail: isEnvProduction,

    entry: './src/index.jsx',

    devtool: isEnvProduction
      ? 'cheap-module-source-map'
      : 'source-map',

    output: {
      filename: 'static/js/[name].[contenthash:8].js',

      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',

      // https://webpack.kr/guides/output-management/#cleaning-up-the-dist-folder
      clean: true, // dist clean 여부
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // import 시 extention 생략 가능한 대상
    },

    module: {
      parser: {
        javascript: {
          exportsPresence: 'error',
        }
      },

      rules: [
        // React using *.js(x) or *.ts(x)
        {
          test: jsRegex,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },

        // *.css
        {
          test: cssRegex,
          use: [
            {
              loader: isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1, // 1 => postcss-loader;
                sourceMap: isEnvProduction
              }
            },
            // [postcss-loader](https://nukw0n-dev.tistory.com/27)
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: {
                    'postcss-flexbugs-fixes': {}, // fixed bug in IE
                    'postcss-preset-env': {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }
                  },
                  sourceMap: isEnvProduction,
                },
              },
            },
          ],
        },

        // images
        {
          test: imageRegex,
          type: 'asset/resource', // file-loader
        },

        // web-fonts
        {
          test: webfontRegex,
          type: 'asset/resource', // file-loader
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: false,
      }),

      new webpack.DefinePlugin({}),

      isEnvProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),

      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
      }),
    ].filter(plugins => plugins),

    optimization: {
      runtimeChunk: 'single',
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            sourceMap: shouldUseSourceMap,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
  }, overwriteData);

  return result;
};
