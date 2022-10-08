// IMPORTS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  entry:{
    main:path.join(process.cwd(), 'src', 'index.js'),
    car:path.join(process.cwd(), 'src', 'car.js')
  },
  output: {
    filename:'[name].[contenthash].js', 
    assetModuleFilename:"assets/[hash][ext][query]",
    clean:true
  },
  devtool:'source-map',

  optimization:{
    splitChunks:{
        chunks:"all"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contanthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "src", "index.pug"),
    }),
  ],
  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
        {
            test:/\.pug$/i,
            loader:"pug-loader",
            exclude:/(node_modules|bower_components)/
        },
        {
            test:/\.(|woff|woff2|eot|ttf|otf)ss$/i,
            type: "asset/resource",
        },
      {
        test: /\.(png|svg|jpg|git|tift)ss$/i,
        type: "asset/resource",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
