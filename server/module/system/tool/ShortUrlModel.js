/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 短地址管理
 */
const {BaseModel} = require('dolphin-framework-server');
const ShortID = require('shortid');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_ShortUrl';
    }

    extendFields(){
        super.extendFields({
            code : { type: String, label: '短地址', default: ShortID.generate },
            langUrl : { type: String, label: '长地址' },
            count : { type: Number, label: '访问次数', default: 0 },
        });
    }
}

module.exports = new Model().getModel();