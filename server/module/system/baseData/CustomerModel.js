/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 购货方
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Customer';
    }

    extendFields(fields = {}) {
        super.extendFields({
            defaultFlag: {type: Boolean, label: '默认项', fieldType: 'Boolean'},
        });
    }
}

module.exports = new Model().getModel();