const path = require('path');

module.exports = {
    outputDir: 'assemble',
    publicPath: './',
    devServer: {
        port: '8088', // 代理端口
        open: true, // 项目启动时是否自动打开浏览器
        proxy: {
            '/': {
                target: 'http://localhost:9988',
                changOrigin: true
            }
        }
    },
    // 为了避免每次使用时都需要单独引入一遍变量样式的问题，若项目不需要可删除
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/styles/public.less')]
        }
    },
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
                importLoaders: 1
            },
            less: {
                // 这里的选项会传递给 postcss-loader
                importLoaders: 1
            }
        }
    }
};
