const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
	entry: {
		bootstrap: "./bootstrap.js",
		tabled: { import: "./modules/tabled.js", filename: "modules/[name].js" },
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bootstrap.js",
	},
	mode: "development",
	plugins: [
		new CopyWebpackPlugin(['index.html', 'main.css']),
	],
	experiments: {
		asyncWebAssembly: true,
		syncWebAssembly: true,
	},
};
