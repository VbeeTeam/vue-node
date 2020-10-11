module.exports={
    //应用指向路径
    publicPath: './',
    //打包文件名
    outputDir: 'dist',
    //放置静态资源文件
    assetsDir: 'static',
    // 是否开启eslint保存检测
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: '8080',
        open: true,
        overlay: {
            warning: false,
            error: true
        }
    }
}