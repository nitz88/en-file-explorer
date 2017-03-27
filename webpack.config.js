var webpack = require("webpack");

module.exports = {
    context: __dirname + "/app",
    entry: {
        app: "./app.js",
        vendor: ["jquery","angular"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map"
    },
    devServer:{
        contentBase: __dirname + "/dist",
        inline: true
    },
    module:{
        loaders:[
            { 
                test: /\.html$/,
                loader: ["raw-loader"],
                exclude: [/node_modules/]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins:[               
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false
        })
    ]
}