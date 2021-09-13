/**
 * Created by wangshuyi on 2017/1/18.
 */

'use strict';
const config = require('../../config/config');

const schedule = require('node-schedule');
const {BaseUtil} = require('dolphin-framework-server');

const JobUtil = {
    init:null,
    method: null,
    schedule: {},

    start: null,
    stop: null,
    run: null,
};

JobUtil.init = function () {
    if(config.job.run){
        $ServiceMap.system.tool.JobService.find(undefined).then(jobList => {
            jobList.forEach(job => {
                if(job.status === 'running'){
                    this.start(job);
                }
            });
        });
    }
};

JobUtil.start = function (job) {
    let thisJob = this;
    let options = {};
    options.rule = job.schedule;

    thisJob.schedule[job._id] = schedule.scheduleJob(options, () => {
        thisJob.run(job);
    });
};
JobUtil.stop = function (job) {
    let thisJob = this;
    thisJob.schedule[job._id] && thisJob.schedule[job._id].cancel();
};
JobUtil.run = function (job) {
    if(JobUtil.method[job.func]){
        let param = {};
        job.param.forEach(p => param[p.key] = p.value);
        let startTime = new Date();
        JobUtil.method[job.func](param).then(success => {
            let endTime = new Date();
            let time = BaseUtil.timeDiff(startTime, endTime);
            return $ServiceMap.system.tool.JobLogService.save(undefined, {
                job: job._id,
                result: 1,
                message: success.message + '\n' + '耗时：' + time
            });
        }, err => {
            let endTime = new Date();
            let time = BaseUtil.timeDiff(startTime, endTime);
            return $ServiceMap.system.tool.JobLogService.save(undefined, {
                job: job._id,
                result: 0,
                message: err.message + '\n' + '耗时：' + time
            });
        }).then(() => {
            console.log(job.func + '任务执行结束');
        });

        return Promise.resolve({message: '任务后台运行中，请稍候在任务日志中查看结果'});
    }else{
        return $ServiceMap.system.tool.JobLogService.save(undefined, {
            job: job._id,
            result: 0,
            message: 'Not Found function'
        }).then(() => {
            throw {message: 'Not Found function'};
        })
    }
};

JobUtil.method = require('./JobMethod');

module.exports = JobUtil;