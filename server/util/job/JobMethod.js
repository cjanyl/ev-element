/**
 * Created by wangshuyi on 2017/1/18.
 */
'use strict';
const moment = require('moment');
const JobMethod = {};
const curUser = undefined;

JobMethod.test = function (param) {
    return new Promise((resolve, reject) => {
        let data = new Date();
        console.log(data);
        resolve({message: `当前时间：${data.toLocaleString()}`});
    });
};
JobMethod.testParam = function (param) {
    return new Promise((resolve, reject) => {
        resolve({message: JSON.stringify(param)});
    });
};
JobMethod.clearLog = function (param) {
    let amount = Number(param.amount) || 30;
    let unit = param.unit || 'day';
    let condition = {
        createTime: {$lte: moment().subtract(amount, unit).toDate()}
    };
    let clearPromise = [];
    clearPromise.push($ServiceMap.system.log.LoginLogService.remove(curUser, condition));

    return Promise.all(clearPromise).then(countList => {
        let message = '共清除：';
        message += `${countList[0].n}条登录日志；`;

        return {message};
    });
};

// TODO 微信对接
// JobMethod.syncWorkWeChat = require('./syncWorkWeChat');

module.exports = JobMethod;