/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 验证码管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_IdentifyingCode';
    }

    extendFields(){
        super.extendFields({
            type : { type: String, label: '测试时间' },
            user: {type: String, label: '相关用户'},
            value : { type: String, label: '测试时间' },
            img : { type: String, label: '测试时间' },
            expiredTime : { type: Date, label: '测试时间', fieldType: 'DateTime' },
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('expiredTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();