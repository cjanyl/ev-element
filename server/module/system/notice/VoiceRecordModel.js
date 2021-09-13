//Created by wangshuyi on 2020/5/21.

'use strict';

/**
 * 短信发送记录
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');
const moment = require('moment');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'U_VoiceRecord';
    }

    extendFields(){
        super.extendFields({
            sender : { type: String, label: '发送方' },
            phone : { type: String, label: '发送手机' },
            template : { type: String, ref: 'U_VoiceTemplate', label: '语音模板' },
            voiceCode : { type: String, label: '语音编码' },
            voiceContent : { type: String, label: '语音内容' },
            callId : { type: String, label: '第三方业务ID' },
            params : { type: Object, label: '语音参数', default: () => {return {}} },
            status : { type: String, label: '发送状态', fieldType: 'Dict', default: 'created' },
            result : { type: Object, label: '返回日志' },
            voiceResult : { type: Object, label: '通知日志' },
        });
    }

    getSchema(){
        let schema = super.getSchema();
        schema.path('createTime').get(v => v && moment(v).format(CONSTANT.DATE_FORMAT_YMD_HMS));

        return schema;
    }
}

module.exports = new Model().getModel();


