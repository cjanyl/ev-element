/**
* Created on 5/21/2020, 9:47:52 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/tool/JobService");
const JobUtil = require("../../../util/job/JobUtil");
const JobMethod = require("../../../util/job/JobMethod");

JobUtil.init();

class JobRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Job';
        this.service = service;

        this.routerMap.get.push('getJobList', 'start_$id', 'stop_$id', 'run_$id', 'clearLog_$id');

        this.commonPopulate = '';
    }

    //获取任务列表
    getJobList(){
        let jobList = [];
        JobMethod.__forEach((fun, key) =>  jobList.push({_id:key, name: key}));

        return Promise.resolve({rows: jobList});
    }

    //启动
    start_$id(req, res, next){
        let _id = req.params.id;

        return this.service.updateById(req.curUser, _id, {status: 'running'}).then(data => {
            JobUtil.start(data);
            return Promise.resolve({data})
        });
    }
    //暂停
    stop_$id(req, res, next){
        let _id = req.params.id;

        return this.service.updateById(req.curUser, _id, {status: 'stopped'}).then(data => {
            JobUtil.stop(data);
            return Promise.resolve({data})
        });
    }
    //立即执行
    run_$id(req, res, next){
        let _id = req.params.id;

        return this.service.findById(req.curUser, _id).then(job => {
            return JobUtil.run(job).then(result => Promise.resolve(result));
        });
    }

    clearLog_$id(req){
        let {id} = req.params;
        return $ServiceMap.system.tool.JobLogService.remove(req.curUser, {job: id}).then(data => {
            return {data};
        });
    }
}

module.exports = new JobRouter().__getRouter();
