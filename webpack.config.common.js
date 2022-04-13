const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	context: path.resolve(__dirname, "assets"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "assets/dist"),
	},
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								ident: "postcss",
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.glsl$/,
				use: [
					{
						loader: 'webpack-glsl-loader'
					}
				]
			}
		],
	},
};
