//Created by wangshuyi on 2018/11/15.

'use strict';
const { BaseTreeModel } = require('dolphin-framework-server');

class Model extends BaseTreeModel {
    constructor() {
        super();
        this.tableName = 'M_Org';
    }

    extendFields() {
        super.extendFields({
            type: {type : String},                       //组织类型
            source: {type : String, label: '数据来源', default: 'plate', fieldType: 'Dict', dictCode: 'dataSource'},   //数据来源
        });
    }
}

module.exports = new Model().getModel();