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

const outputBuildPaths = {
  path: path.resolve(__dirname, 'build'),
  js: 'static/js',
  css: 'static/css',
  assets: 'static/resources',
};

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
      path: outputBuildPaths.path,

      filename: [outputBuildPaths.js, '[name].[contenthash:8].js'].join('/'),

      chunkFilename: isEnvProduction
        ? [outputBuildPaths.js, '[name].[contenthash:8].chunk.js'].join('/')
        : [outputBuildPaths.js, '[name].chunk.js'].join('/'),


      assetModuleFilename: [outputBuildPaths.assets, '[hash][ext][query]'].join('/'),
      // https://webpack.kr/guides/output-management/#cleaning-up-the-dist-folder
      clean: true, // dist clean 여부
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // import or require 시 extention 생략 가능한 확장자 목록
      modules: [path.resolve(__dirname, 'src'), 'node_modules'], // default is ['node_modules'],
    },

    module: {
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
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
      }),

      new webpack.DefinePlugin({
        'process.env': Object.keys(envConfig.parsed).reduce((acc, key) => {
          const env = acc;
          env[key] = JSON.stringify(envConfig.parsed[key]);
          return env;
        }, {}),
      }),

      isEnvProduction && new MiniCssExtractPlugin({
        filename: [outputBuildPaths.css, '[name].[contenthash:8].css'].join('/'),
        chunkFilename: [outputBuildPaths.css, '[name].[contenthash:8].chunk.css'].join('/'),
      }),

      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
    ],

    optimization: {
      runtimeChunk: 'single',
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
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
