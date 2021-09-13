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
        this.tableName = 'T_BalanceOrder';
    }

    extendFields(fields = {}) {
        super.extendFields({
            code: {type: String, label: '平帐单号', fieldType: 'String', default(){return 'H' + $moment().format('YYMMDD') + BaseUtil.random(6)}},
            backOrder: {type: String, ref: 'T_BackOrder', label: '回收单', fieldType: 'Ref', refUrl:'order.backOrder', condition: true},
            customer: {type: String, ref: 'M_Customer', label: '购货方', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
            shipTo: {type: String, ref: 'M_ShipTo', label: '收货方', fieldType: 'Ref', refUrl:'system.baseData.shipTo', condition: true},
            factory: {type: String, ref: 'M_Factory', label: '回收工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},

            bucketType: {type: String, label: '桶类型', fieldType: 'Dict', dictCode:'bucketType', condition: true},
            type: {type: String, label: '平帐类型', fieldType: 'Dict', dictCode:'balanceType', condition: true},
            process: {type: Boolean ,default: false},

            number: {type: Number, label: '数量', fieldType: 'Number', condition: true},
            missResult: {type: String, label: '处理结果', fieldType: 'Dict', dictCode:'missResult', condition: true},
        });
    }
    extendFormatFields() {
    }
}

module.exports = new Model().getModel();
