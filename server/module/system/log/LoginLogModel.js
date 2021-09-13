//Created by wangshuyi on 2018/11/15.

'use strict';
const { BaseModel, CONSTANT } = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel {
    constructor() {
        super();
        this.tableName = 'L_LoginLog';
    }

    extendFields(){
        super.extendFields({
            user: {type: String, ref: 'M_User', label: '登录人', fieldType: 'Ref', refUrl:'system.auth.user'},
            type: {type: String, label: '登录方式', fieldType: 'Dict', dictCode:'loginType'},
            ip: {type: String, label: '登录ip'},
        });
    }

    getSchema() {
        super.getSchema();
        this.schema.path('createTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return this.schema;
    }
}

module.exports = new Model().getModel();