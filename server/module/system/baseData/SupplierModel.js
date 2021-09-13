/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 供应商
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Supplier';
    }

    extendFields(fields = {}) {
        super.extendFields({
        });
    }
}

module.exports = new Model().getModel();