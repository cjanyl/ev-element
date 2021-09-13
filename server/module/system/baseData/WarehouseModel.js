/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 仓库
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Warehouse';
    }

    extendFields(fields = {}) {
        super.extendFields({
            type: {type: String, label: '类型', fieldType: 'Dict', dictCode:'factoryType', condition: true},
            address: {type: String, label: '地址'},
            supplier: {type: String, ref: 'M_Supplier', label: '供应商', fieldType: 'Ref', refUrl:'system.baseData.supplier'},
            factory: {type: String, ref: 'M_Factory', label: '归属工厂', fieldType: 'Ref', refUrl:'system.baseData.factory'},
        });
    }
}

module.exports = new Model().getModel();
