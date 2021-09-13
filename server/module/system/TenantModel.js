/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 租户管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Tenant';
    }

    extendFields(fields = {}) {
        super.extendFields({
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'tenantStatus'},       //测试字段
            activeDate: {type: Date, label: '生效时间', fieldType: 'Date'},       //生效时间
            expiredDate: {type: Date, label: '失效时间', fieldType: 'Date'},       //失效时间

            address: {type: String, label: '地址'},

            primaryColor: {type: String, label: '主题色'},
            third: {type: String, label: '关键标识'},
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('activeDate').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD));
        schema.path('expiredDate').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD));

        return schema;
    }
}

module.exports = new Model().getModel();