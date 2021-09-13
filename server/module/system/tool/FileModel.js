/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 文件管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_File';
    }

    extendFields(){
        super.extendFields({
            filePath : { type: String, label: '存储地址' },                    //存储地址
            fileSize : { type: Number, label: '文件大小', fieldType: 'Number' },                    //文件大小
            fileType : { type: String, label: '文件类型' },                    //文件类型
            lastModifiedDate : { type: String, label: '最后更新时间' },                  //最后更新使用
            lastUseTime : { type: Date, label: '最后使用时间', default: Date.now },            //最后使用时间
            locked : {type: Number, label: '是否锁定', default: 0},            //是否锁定

            type : { type : String, label: '业务类型', fieldType: 'Dict', dictCode:'fileType'},                        //业务类型
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('lastUseTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();