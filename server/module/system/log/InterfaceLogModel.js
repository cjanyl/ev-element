//Created by silence on 2019/11/10.

'use strict';
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel {
    constructor() {
        super();
        this.tableName = 'L_InterfaceLog';
    }

    extendFields() {
        super.extendFields({
            type: {type: String, label: '类型'},
            source: {type: String, label: '请求者'},
            target: {type: String, label: '访问者'},
            requestTime: {type: Date, label: '请求时间', default: Date.now},
            responseTime: {type: Date, label: '返回时间'},
            protocol: {type: String, label: '协议'},
            requestBody: {type: String, label: '请求体'},
            requestParams: {type: String, label: '请求参数'},
            responseBody: {type: String, label: '返回数据'},
            result: {type: Boolean, label: '结果'},
            address: {type: String, label: '地址'},
            method: {type: String, label: '请求方式'},
            bizId: {type: String, label: '业务ID'},
            userName: {type: String, label: '操作人'},
            userCode: {type: String, label: '操作人编码'},
        });
    }

    getSchema() {
        let schema = super.getSchema();
        schema.path('requestTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));
        schema.path('responseTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));
        return schema;
    }
}

module.exports = new Model().getModel();