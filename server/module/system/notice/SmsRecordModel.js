/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 短信发送记录
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_SmsRecord';
    }

    extendFields(){
        super.extendFields({
            sender : { type: String, label: '发送方' },
            phone : { type: String, label: '发送手机' },
            template : { type: String, ref: 'N_SmsTemplate', label: '短信模板' },
            smsCode : { type: String, label: '模板编码' },
            smsContent : { type: String, label: '短信内容', fieldType: 'Textarea' },
            params : { type: Object, label: '短信参数', default: () => {return {}} },
            success : { type: Boolean, label: '发送状态', fieldType: 'Boolean' },
            result : { type: Object, label: '返回日志' },
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('createTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();
