const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = merge(baseConfig, {
	mode: "production",
	//入口
	entry: {
		main: path.resolve(__dirname, "../../src/main.js")
	},
	//出口
	output: {
		filename: "[name].js",
		// filename: "bundle.js",
		path: path.resolve(__dirname, "../../dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunks: ["main"],
			template: path.resolve(__dirname, "../../src/index.html"),
			hash: true // 会在打包好的bundle.js后面加上hash串
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: loader => [require("autoprefixer")()]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					"vue-style-loader",
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: loader => [require("autoprefixer")()]
						}
					},
					"sass-loader"
				]
			},
			{
				test: /\.less$/,
				use: [
					"vue-style-loader",
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: loader => [require("autoprefixer")()]
						}
					},
					"less-loader"
				]
			}
		]
	}
});

module.exports = config;
