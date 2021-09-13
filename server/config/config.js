//Created by wangshuyi on 2020-05-07.

'use strict';
const path = require('path');

let config = {};

//服务器基础信息
config.port = 52450;

//服务器路径配置
config.path = {};
config.path.hostname = 'http://localhost:' + config.port;
config.path.contextPath = '';
config.path.publicPath = path.join(__dirname, '..', 'public');
config.path.uploadPath = path.join(config.path.publicPath, 'uploadFiles');
config.path.exportExcelPath = path.join(config.path.publicPath, 'exportExcel');
config.path.publicExportPath = '/exportExcel';


//系统日志 log4js
config.log = {
    pm2: true,
    appenders: {
        out: { type: 'console' },
        // file: { type: 'file', filename: 'log/application'+Math.round(Math.random() * 10000)+'.log' }
    },
    categories: {
        default: { appenders: [ 'out' ], level: 'debug' }
    }
};

//数据库配置
config.db = {
    host : 'localhost',
    port : '27017',
    database : "Cyan",
    username : 'admin',
    password : '1qaz@WSX',
    options : {
        poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};
config.dbUser = {
    robot: {
        _id : "f07ffe71-7235-4231-8246-d64aaaadcc14",
        name : "系统自动",
        code : "robot",
        role : ["robot"]
    },
};

//定时任务
config.job = {
    run: false
};

//web socket
config.socket = {
    open: false,
};

module.exports = config;