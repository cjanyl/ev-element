/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 备货单行
 */
const {BaseModel} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_DeliveryOrderLine';
    }

    extendFields(fields = {}) {
        super.extendFields({
            deliveryOrder: {type: String, ref: 'T_DeliveryOrder', label: '备货单', fieldType: 'Ref', refUrl:'order.deliveryOrder', condition: true},
            type: {type: String, label: '类型', fieldType: 'Dict', dictCode:'bucketType', condition: true},
            bucket: {type: String, ref: 'T_Bucket', label: 'IBC桶', fieldType: 'Ref', refUrl:'order.bucket'},
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'deliveryOrderLineStatus', condition: true},
        });
    }
}

module.exports = new Model().getModel();