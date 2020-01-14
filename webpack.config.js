const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
       /*  app: './src/index.js',
        print: './src/print.js', */
        app: './src/scripts/main.js',
    },
    devtool: 'inline-source-map',
    output: {
        /* filename: 'bundle.js', */
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/html/index1.html',
            filename: 'index.html',
            minify:{
                    removeComments: true,//删除注释
                    collapseWhitespace:true//删除空格
                // 
            }
        }),
       
        new HtmlWebpackPlugin({
            filename: 'header.html',
            template: './src/static/header.html',
            //thunks: ['common', 'list']
        }), 
        new HtmlWebpackPlugin({
            filename: 'footer.html',
            template: './src/static/footer.html',
            //thunks: ['common', 'list']
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: './src/html/detail.html',
            //thunks: ['common', 'list']
        }),

        new HtmlWebpackPlugin({
          filename: 'cartlist.html',
          template: './src/html/cartlist.html',
           //thunks: ['common', 'detail']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            //thunks: ['common', 'list']
        }), 
        new HtmlWebpackPlugin({
          filename: 'registry.html',
          template: './src/html/registry.html',
          //thunks: ['common', 'detail']
        }),



        new CopyWebpackPlugin([{
            from: __dirname+"/src/images",
            to: __dirname + "/dist/images"
        }
        ]),
        new CleanWebpackPlugin(),
       /*  new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin() */
    ],
    module: { 
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?url=false&name=images/[hash:8].[name].[ext]',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                        }
                }
            }
        ]
    }
}