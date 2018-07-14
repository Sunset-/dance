const path = require("path");

module.exports = {
    contentBase: "build",
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 9999,
    disableHostCheck: true,
    proxy: {
        "/gateway/*": {
            target: "http://192.168.60.203/",
            // target: "http://15.128.21.104/",徐汇图解
            // target: "http://172.16.164.143:8080/",
            // target: 'http://172.16.163.124/',
            // pathRewrite: {http://172.16.163.124
            //     '^/service': '/'
            // },
            secure: false,
            changeOrigin: true
        },
        "/dance": {
            target: "http://47.97.122.35:8008",
            // target: "http://172.16.164.143:8080/",
            // secure: false,
            // changeOrigin: true,
            pathRewrite: {
                '^/dance': '/'
            }
        },
        "/npgisdataservice/*": {
            target: "http://192.168.60.203",
            // target: 'http://172.16.163.124',
            // target: "http://172.16.164.143:8080/",
            secure: false,
            changeOrigin: true
                // pathRewrite: {
                //     '^/npgisdataservice': '/'
                // }
        },
        "/pvdservice/*": {
            target: "http://15.144.19.111:8887",
            // target: 'http://172.16.163.124',
            // target: "http://172.16.164.143:8080/",
            secure: false,
            changeOrigin: true
                // pathRewrite: {
                //     '^/npgisdataservice': '/'
                // }
        },
        "/rbsp/*": {
            target: "http://15.144.19.111:8887",
            // target: 'http://172.16.163.124',
            // target: "http://172.16.164.143:8080/",
            secure: false,
            changeOrigin: true
                // pathRewrite: {
                //     '^/npgisdataservice': '/'
                // }
        }
        // '/test-upload/*': {
        //     target: 'http://192.168.0.114:9120/',
        //     secure: false,
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/test-upload': '/'
        //     }
        // }
    }
};