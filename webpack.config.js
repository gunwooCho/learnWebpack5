const path = require('path');
const webpack = require('webpack');

const dotenv = require('dotenv');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const envConfig = dotenv.config();
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const jsRegex = /\.(js|jsx|ts|tsx)$/i;
const cssRegex = /\.css$/i;
const imageRegex = /\.(png|svg|jpe?g|gif)$/i;
const webfontRegex = /\.(woff|woff2|eot|ttf|otf)$/i;

module.exports = (
  env, // { WEBPACK_SERVE },
  args,
) => {
  const param = args;
  param.mode = args.mode || 'development';

  const isEnvProduction = param.mode === 'production';

  /** @type {webpack.Configuration} */
  const result = {
    mode: param.mode,

    bail: isEnvProduction,

    entry: {
      index: path.resolve(__dirname, 'src', 'index.jsx'),
    },

    devtool: isEnvProduction
      ? 'cheap-module-source-map'
      : 'source-map',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[contenthash:8].js',

      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',

      // https://webpack.kr/guides/output-management/#cleaning-up-the-dist-folder
      clean: true, // dist clean 여부
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // import or require 시 extention 생략 가능한 확장자 목록
      modules: [path.resolve(__dirname, 'src'), 'node_modules'], // default is ['node_modules'],
    },

    module: {
      parser: {
        javascript: {
          exportsPresence: 'error',
        },
      },

      rules: [
        {
          test: jsRegex,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: cssRegex,
          use: [
            {
              loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1, // 1 => postcss-loader;
                sourceMap: isEnvProduction,
              },
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
                    },
                  },
                  sourceMap: isEnvProduction,
                },
              },
            },
          ],
        },
        {
          test: imageRegex,
          type: 'asset/resource', // file-loader
        },
        {
          test: webfontRegex,
          type: 'asset/resource', // file-loader
        },
      ],
    },

    plugins: [
      // new webpack.ProgressPlugin(),

      new ESLintWebpackPlugin({
        // emitError: true,
        emitWarning: false,
        // failOnWarning: false,
        // failOnError: true,
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),

      new webpack.DefinePlugin({
        'process.env': Object.keys(envConfig.parsed).reduce((acc, key) => {
          const env = acc;
          env[key] = JSON.stringify(envConfig.parsed[key]);
          return env;
        }, {}),
      }),

      isEnvProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),

      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
      }),
    ].filter((plugins) => plugins),

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
  };

  if (param.mode === 'development') {
    /** @type {import('webpack-dev-server').Configuration} */
    const devServer = {
      server: process.env.HTTPS === 'true' ? 'https' : 'http',
      host: process.env.HOST || '0.0.0.0',
      port: parseInt(process.env.PORT, 10) || 3000, // 포트 번호 설정
      hot: true, // 핫 모듈 교체(HMR) 활성화 설정
      compress: true, // gzip 압축 활성화
      historyApiFallback: true, // History 라우팅 대체 사용 설정
      open: true, // 개발 서버 자동 실행 설정
    };
    result.devServer = devServer;
  }

  return result;
};
