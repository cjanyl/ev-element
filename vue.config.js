'use strict';
//配置信息
const { webTitle, contextPath, apiPath, publicPath} = require('./ev.config');
//---------------------------------------------------

const staticPath = 'static';
const SERVER_PORT = 52450;

const fs = require('fs');
const path = require('path');

//router
// let routerFile = path.join(__dirname, 'src', 'router', 'index.js');
// let routerStr = fs.readFileSync(routerFile, 'utf8');
// routerStr = routerStr.replace(/const contextPath = '(\/|\w|\d|_|-)*';/, `const contextPath = '${contextPath}';`);
// fs.writeFileSync(routerFile, routerStr, 'utf8');

//store
// let storeFile = path.join(__dirname, 'src', 'store', 'index.js');
// let storeStr = fs.readFileSync(storeFile, 'utf8');
// storeStr = storeStr.replace(/const cookieName = '(\/|\w|\d|_|-)*';/, `const cookieName = '${basePath}_back';`);
// fs.writeFileSync(storeFile, storeStr, 'utf8');

let configFile = path.join(__dirname, 'src', 'components', 'config.js');
let configStr = fs.readFileSync(configFile, 'utf8');
configStr = configStr.replace(
    /const contextPath = '(\/|\w|\d|_|-)*';/,
    `const contextPath = '${contextPath}';`);
configStr = configStr.replace(
    /const apiPath = '(\/|\w|\d|_|-)*';/,
    `const apiPath = '${apiPath}';`);
configStr = configStr.replace(
    /const publicPath = '(\/|\w|\d|_|-)*';/,
    `const publicPath = '${publicPath}';`);
//TODO 关于web-socket的配置
fs.writeFileSync(configFile, configStr, 'utf8');

module.exports = {
    assetsDir: staticPath,
    publicPath: contextPath + '/',
    devServer: {
        port: SERVER_PORT + 1,
        proxy: {
            [apiPath]: {
                target: `http://localhost:${SERVER_PORT}/`,
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    ['^' + apiPath + '/']: '/'
                }
            }
        },
        disableHostCheck: true
    },

    configureWebpack: config => {
        config.plugins.forEach((val) => {
            // 修改webTitle
            if (val['__pluginConstructorName'] === 'HtmlWebpackPlugin') {
                val.options.title = webTitle;
            }
        })
    },
    runtimeCompiler: true,
};
