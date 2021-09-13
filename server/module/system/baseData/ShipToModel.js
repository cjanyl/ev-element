/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 收货方
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_ShipTo';
    }

    extendFields(fields = {}) {
        super.extendFields({
            customer: {type: String, ref: 'M_Customer', label: '购货方', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
            sort: {type: Number, label: '排序'},
            contactPerson:{type: String, label: '联系人'},
            phone:{type: String, label: '联系电话'},

        });
    }
}

module.exports = new Model().getModel();
