//Created by wangshuyi on 2019-09-11.

'use strict';

/**
 * 邮件模板
 */
const {BaseModel} = require('dolphin-framework-server');
const shortID = require('shortid');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_MailTemplate';
    }

    extendFields(fields) {
        super.extendFields({
            code: {type: String, label: '编码', default: shortID.generate()},
            subject : { type: String, label: '标题模板', fieldType: 'String' },
            content : { type: String, label: '内容模板', fieldType: 'Textarea' },
            type : { type: String, label: '类型', fieldType: 'String' },
        });
    }
}

module.exports = new Model().getModel();