//Created by wangshuyi on 2019-09-11.

'use strict';

/**
 * 短信模板
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');
const shortID = require('shortid');
const Schema = DBUtil.mongoose.Schema;

const paramSchema = new Schema({
    label : { type: String, label: '参数名称'},                         //编码
    code : {type: String, label: '参数编码'},                          //文本
});

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_SmsTemplate';
    }

    extendFields(fields) {
        super.extendFields({
            code: {type: String, label: '编码', default: shortID.generate()},
            thirdCode: {type: String, label: '模板编码'},
            template: {type: String, label: '模板内容', fieldType: 'Textarea'},
            params: [paramSchema],
        });
    }
}

module.exports = new Model().getModel();