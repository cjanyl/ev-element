/**
* Created on 5/21/2020, 4:33:27 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/SmsRecordModel");

const AliSMS = require("../../../util/notice/AliSMS");

class SmsRecordService extends BaseService{
    constructor(){
        super();
        this.name = "SmsRecordService";
        this.model = Model;
    }

    send(curUser, phone, params, templateId, smsCode){
        let recordData = {
            phone : phone,
            template : templateId,
            smsCode : smsCode,
            params : params,
        };

        return $ServiceMap.system.SystemConfigService.getConfig(curUser, 'sms').then(option => {
            let smsUtil = new AliSMS(option.name, option.signName, option.key, option.secret);
            recordData.sender = option.name;

            return smsUtil.sendMsg(phone, recordData.smsCode, params).then(result => {
                recordData.success = true;
                recordData.result = result;
                return this.save(curUser, recordData)
            }).catch(e => {
                recordData.success = false;
                if(e.message){
                    recordData.result = {errorMessage: e.message};
                }else{
                    recordData.result = e;
                }

                return this.save(curUser, recordData).then(() => {
                    throw e;
                });
            });
        });
    }
}

module.exports = new SmsRecordService();


