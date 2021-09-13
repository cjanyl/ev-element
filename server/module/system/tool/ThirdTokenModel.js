/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 第三方接口管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_ThirdToken';
    }

    extendFields(){
        super.extendFields({
            name : { type: String, label: '名称' },
            appKey : { type: String, label: 'Key' },
            appSecret : { type: String, label: 'Secret' },
            thirdType : { type: String, label: '第三方类型' },
            tokenType : { type: String, label: 'Token类型' },
            token : { type: String, label: 'Token' },
            expiredTime : { type: Date, label: '过期时间', fieldType: 'DateTime' },
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('expiredTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();