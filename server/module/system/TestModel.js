/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 测试模块
 */
const {BaseModel, BaseTreeModel, DBUtil} = require('dolphin-framework-server');
const Schema = DBUtil.mongoose.Schema;

const optionSchema = new Schema({
    code : { type: String, label: '编码' },                         //编码
    text : { type: String, label: '文本' },                          //文本
});

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'T_Test';
    }

    extendFields(fields = {}) {
        super.extendFields({
            testNumber: {type: String, label: '测试数字', fieldType: 'Number', condition: true},
            testDict: {type: String, label: '测试枚举', fieldType: 'Dict', dictCode:'gender'},
            testDate: {type: Date, label: '测试日期', fieldType: 'Date'},
            testDateTime: {type: Date, label: '测试时间', fieldType: 'DateTime'},
            testTextarea: {type: Date, label: '测试大文本', fieldType: 'Textarea'},
            testBoolean: {type: Boolean, label: '测试布尔', fieldType: 'Boolean'},
            testRef: {type: String, label: '测试关联', ref: 'M_User', fieldType: 'Ref', refUrl:'system.auth.user'},
            testImage: {type: String, label: '测试图片', ref: 'U_File', fieldType: 'Image'},
            testSchema: [optionSchema],
        });
    }
}

module.exports = new Model().getModel();