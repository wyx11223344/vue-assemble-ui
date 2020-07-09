const path = require('path');

module.exports = {
    outputDir: 'assemble',
    publicPath: './',
    // 为了避免每次使用时都需要单独引入一遍变量样式的问题，若项目不需要可删除
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/styles/public.less')]
        }
    }
};
