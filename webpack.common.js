const webpack = require("webpack")
const path = require("path")
const dotenv = require("dotenv")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = function(baseEnv) {
  const isDev = !!baseEnv.development
  const dotenvPath = isDev
    ? path.join(__dirname, "/development.env")
    : path.join(__dirname, "/production.env")
  const env = dotenv.config({ path: dotenvPath }).parsed
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  console.log({ baseEnv, env, envKeys })
  return {
    devServer: {
      port: 3010
    },
    devtool: 'inline-source-map',
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.s?css?/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "/public/index.html")
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components"),
        "~pages": path.resolve(__dirname, "src/pages")
      }
    }
  }
}