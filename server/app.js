const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
//设置moment环境为中文
const moment = require('moment');
moment.locale('zh-cn');
global.$moment = moment;

//dolphin-framework-server 初始化
const {configure, InitRouter, ResUtil, DBUtil} = require('dolphin-framework-server');
const config = require('./config/config');
global.$config = config;
configure(config);
DBUtil.connect();
DBUtil.initData(require('./config/initData/initDataConfig'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json({"limit":"10000kb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(log4js.connectLogger(logger, {level:'info', format:':method | :status | :response-time ms | :url '}));

logger.debug('/----------------------- services ---------------------/');
global.$ServiceMap = require('./service/ServiceMap');
logger.debug('///////////////////////// services //////////////////////');

logger.debug('/----------------------- routes ---------------------/');
InitRouter(app, path.join(__dirname, 'routes'), {index: ''});
logger.debug('///////////////////////// routes //////////////////////');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let resData = {
    message: err.message,
    error: err
  };
  logger.error(req.originalUrl, err.message);
  res.status(err.status || 500);
  res.send(ResUtil.error(resData));
});

process.on('uncaughtException', err => {
  // logger.error('uncaughtException', err);
  logger.error('uncaughtException', err.message);
});

console.log(' ');
console.log(' ');
logger.info('Your server is running here: ', config.path.hostname)

module.exports = app;
