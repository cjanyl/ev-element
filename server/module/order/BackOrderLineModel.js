/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 回收单行
 */
const {BaseModel} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_BackOrderLine';
    }

    extendFields(fields = {}) {
        super.extendFields({
            backOrder: {type: String, ref: 'T_BackOrder', label: '回收单', fieldType: 'Ref', refUrl:'order.backOrder', condition: true},
            bucket: {type: String, ref: 'T_Bucket', label: 'IBC桶', fieldType: 'Ref', refUrl:'order.bucket'},
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'backOrderLineStatus', condition: true},
        });
    }
}

module.exports = new Model().getModel();