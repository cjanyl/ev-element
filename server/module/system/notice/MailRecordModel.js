/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 邮件管理
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_MailRecord';
    }

    extendFields(){
        super.extendFields({
            from : { type: String, label: '发送方' },
            to : { type: String, label: '接收方' },
            cc : { type: String, label: '抄送' },
            bcc : { type: String, label: '密送' },
            subject : { type: String, label: '标题' },
            content : { type: String, label: '内容', inputType: 'Textarea' },
            attachments : { type: String, label: '文件' },
            status : { type : String, label: '状态', default: 'padding' },
            result : {type: Object, label: '结果'},

            type : { type : String, label: '业务类型'},
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('createTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();
