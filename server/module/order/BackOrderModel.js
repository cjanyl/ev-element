/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 回收单
 */
const {BaseModel, CONSTANT, BaseUtil} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_BackOrder';
    }

    extendFields(fields = {}) {
        super.extendFields({
            orderType: {type: String, label: '回收单类型', fieldType: 'Dict', dictCode:'backOrderType', condition: true},
            code: {type: String, label: '出库单号', fieldType: 'String', default(){return 'B' + $moment().format('YYMMDD') + BaseUtil.random(6)}},
            type: {type: String, label: '桶类型', fieldType: 'Dict', dictCode:'bucketType', condition: true},
            orderTime: {type: Date, label: '下单时间', fieldType: 'DateTime', condition: true, default: Date.now},
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'backOrderStatus', condition: true},

            factory: {type: String, ref: 'M_Factory', label: '回收工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},
            POCode: {type: String, label: 'SAP PO'},
            address: {type: String, label: '收货地址'},
            customer: {type: String, ref: 'M_Customer', label: '购货方', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
            shipTo: {type: String, ref: 'M_ShipTo', label: '收货方', fieldType: 'Ref', refUrl:'system.baseData.shipTo', condition: true},

            supplier: {type: String, ref: 'M_Supplier', label: '供应商', fieldType: 'Ref', refUrl:'system.baseData.supplier'},

            bucketTotal: {type: Number, label: '总桶数'},

            images: [{type: String, label: '材料', ref: 'U_File', fieldType: 'Image'}],
            checkFlag: {type: Boolean, label: 'CSO确认', fieldType: 'Boolean'},
            remarkCSO: {type: String, label: 'CSO备注'},

            email: [{type: String, label: '发送邮箱'}],
        });
    }
    extendFormatFields() {
        super.extendFormatFields({
            orderTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS}
        });
    }
}

module.exports = new Model().getModel();
