//Created by wangshuyi on 2020/5/21.

'use strict';
const Core = require('@alicloud/pop-core');

class AliSMS {
    constructor(name, signName, accessKeyId, secretAccessKey){
        this.name = name;
        this.signName = signName;
        this.client = new Core({
            accessKeyId: accessKeyId,
            accessKeySecret: secretAccessKey,
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
    }

    /**
     * 发送短信
     * @param phone
     * @param templateCode
     * @param params
     * @returns {Promise<Object>}
     */
    sendMsg(phone, templateCode, params){
        let option = {
            "PhoneNumbers": phone,
            "SignName": this.signName,
            "TemplateCode": templateCode,
            TemplateParam: JSON.stringify(params)
        };

        let requestOption = {
            method: 'POST'
        };

        return this.client.request('SendSms', option, requestOption)
    }
}

module.exports = AliSMS;