const webpack = require('webpack');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  // 모드에 따라 웹팩에서 내장 최적화 제공
  mode: prod ? 'production' : 'development',

  // 소스 맵 생성 여부 및 방법 설정
  devtool: prod ? 'hidden-soure-map' : 'eval',

  // 번들링을 시작할 파일
  entry: './src/index.js',

  // 번들링 된 파일이 생성될 위치 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },

  // 다양한 모듈들(js, image, css 등)을 처리하는 방법 결정
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
};
