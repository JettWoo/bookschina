const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
       /*  app: './src/index.js',
        print: './src/print.js', */
        main: './src/scripts/main.js',
        /* login: "./src/scripts/login.js",
        register: './src/scripts/registry.js',
        detail: './src/scripts/detail.js',
        cartList: './src/scripts/cartList.js' */
    },
    /* devtool: 'inline-source-map', */
    output: {
        /* filename: 'bundle.js', */
        filename: 'bundle.js',
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
            filename: './html/index.html',
            minify:{
                    removeComments: true,//删除注释
                    collapseWhitespace:true//删除空格
            },
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: './html/header.html',
            template: './src/static/header.html',
        }), 
        new HtmlWebpackPlugin({
            filename: './html/footer.html',
            template: './src/static/footer.html',
        }),
        new HtmlWebpackPlugin({
            filename: './html/detail.html',
            template: './src/html/detail.html',
        }),
        new HtmlWebpackPlugin({
          filename: './html/cartlist.html',
          template: './src/html/cartlist.html',
        }),
        new HtmlWebpackPlugin({
            filename: './html/login.html',
            template: './src/html/login.html',
        }), 
        new HtmlWebpackPlugin({
          filename: './html/registry.html',
          template: './src/html/registry.html',
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
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '../images/[name].[ext]'
                        }
                    }
                ]
            },
            /* { //配置图片文件的包
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }, */
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
           /*  {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                        }
                }
            } */
        ]
    }
}