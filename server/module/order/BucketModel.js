/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * IBC桶
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_Bucket';
    }

    extendFields(fields = {}) {
        super.extendFields({
            tag: {type: String, label: '标签', condition: true},
            type: {type: String, label: '类型', fieldType: 'Dict', dictCode:'bucketType', condition: true},
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'bucketStatus', condition: true, default: 'picking'},

            factory: {type: String, ref: 'M_Factory', label: '发货工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},
            warehouse: {type: String, ref: 'M_Warehouse', label: '发货仓库', fieldType: 'Ref', refUrl:'system.baseData.warehouse', condition: true},
            customer: {type: String, ref: 'M_Customer', label: '购货方', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
            shipTo: {type: String, ref: 'M_ShipTo', label: '收货方', fieldType: 'Ref', refUrl:'system.baseData.shipTo', condition: true},

            supplier: {type: String, ref: 'M_Supplier', label: '供应商', fieldType: 'Ref', refUrl:'system.baseData.supplier'},
            warehousingTime: {type: Date, label: '入库时间', fieldType: 'DateTime', condition: true},
            lastSendTime: {type: Date, label: '最后运出时间', fieldType: 'DateTime', condition: true},
            backOrderTime: {type: Date, label: '最后回收时间', fieldType: 'DateTime', condition: true},
            averageOutTime: {type: Number, label: '平均外出时间'},

            backFactory:{type: String, ref: 'M_Factory', label: '回收工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},
            nonFactory: {type: Boolean, label: '非本工厂桶'},
        });
    }
    extendFormatFields() {
        super.extendFormatFields({
            warehousingTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS},
            lastSendTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS},
            backOrderTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS},
        });
    }
}

module.exports = new Model().getModel();
