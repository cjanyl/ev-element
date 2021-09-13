//Created by wangshuyi on 2020/5/21.

'use strict';

/**
 * 语音模板
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');
const ShortID = require('shortid');
const Schema = DBUtil.mongoose.Schema;

const paramSchema = new Schema({
    field : { type: String, label: '参数字段'},                         //编码
    label : { type: String, label: '字段名称'},                         //编码
    code : {type: String, label: '变量编码'},                          //文本
});

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_VoiceTemplate';
    }

    extendFields(fields) {
        super.extendFields({
            code: { type: String, default: ShortID.generate },             //编码
            thirdCode: {type: String, label: '模板编码'},
            template: {type: String, label: '模板内容', fieldType: 'Textarea'},
            params: [paramSchema],
        });
    }
}

module.exports = new Model().getModel();

