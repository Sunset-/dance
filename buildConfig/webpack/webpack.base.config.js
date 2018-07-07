const webpack = require("webpack");
const path = require("path");
const {
    VueLoaderPlugin
} = require("vue-loader");

const config = {
    plugins: [new VueLoaderPlugin()],
    module: {
        rules: [{
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                use: "babel-loader"
            },
            {
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                use: "url-loader?limit=10000&name=./images/[name].[ext]"
            }
        ]
    },
    externals: {
        $: "window.jQuery",
        jQuery: "window.jQuery",
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.js",
            jquery: "jquery/dist/jquery.min.js",
            src: path.resolve(__dirname, "../../src"),
            components: path.resolve(__dirname, "../../src/components"),
            modules: path.resolve(__dirname, "../../src/modules"),
            asserts: path.resolve(__dirname, "../../build/assets")
        },
        extensions: [".js", ".vue", ".coffee", ".html", ".css", ".scss"]
    }
};

module.exports = config;