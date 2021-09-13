/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 定时任务日志管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_JobLog';
    }

    extendFields(){
        super.extendFields({
            job : { type: String, ref : "U_Job" },          //任务
            result : { type: Number, default : "1" },       //任务结果
            message : { type: String },                     //日志
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('createTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();