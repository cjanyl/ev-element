/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 备货单
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_DeliveryOrder';
    }

    extendFields(fields = {}) {
        super.extendFields({
            businessNo: {type: String, label: '发货单号', condition: true},
            orderTime: {type: Date, label: '下单时间', fieldType: 'DateTime', condition: true},
            status: {type: String, label: '状态', fieldType: 'Dict', dictCode:'deliveryOrderStatus', condition: true},
            type: {type: String, label: '类型', fieldType: 'Dict', dictCode:'deliveryOrderType', condition: true},

            createType: {type: String, label: '创建类型', fieldType: 'Dict', dictCode:'createType', condition: true, default: 'auto'},

            factory: {type: String, ref: 'M_Factory', label: '发货工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},
            warehouse: {type: String, ref: 'M_Warehouse', label: '发货仓库', fieldType: 'Ref', refUrl:'system.baseData.warehouse', condition: true},
            customer: {type: String, ref: 'M_Customer', label: '购货方', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
            shipTo: {type: String, ref: 'M_ShipTo', label: '收货方', fieldType: 'Ref', refUrl:'system.baseData.shipTo', condition: true},

            createFactory: {type: String, ref: 'M_Factory', label: '创单工厂', fieldType: 'Ref', refUrl:'system.baseData.factory'},

            bucketTotal: {type: Number, label: '总桶数'},
        });
    }
    extendFormatFields() {
        super.extendFormatFields({
            orderTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS}
        });
    }
}

module.exports = new Model().getModel();