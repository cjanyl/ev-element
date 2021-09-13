/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 定时任务管理
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');
const Schema = DBUtil.mongoose.Schema;

const paramSchema = new Schema({
    key : { type: String},                                  //key
    value : {type: String},                                 //value
});

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_Job';
    }

    extendFields(){
        super.extendFields({
            func : { type: String },                        //任务方法
            param : [paramSchema],                          //任务参数
            status : { type: String, default: 'stopped' },  //任务状态
            schedule : {type: String},                      //调度时间
        });
    }

    getSchema(){
        let schema = super.getSchema();

        return schema;
    }
}

module.exports = new Model().getModel();
