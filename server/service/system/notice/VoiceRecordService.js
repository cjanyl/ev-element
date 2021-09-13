/**
* Created on 5/21/2020, 8:04:10 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/VoiceRecordModel");
const VoiceYX = require("../../../util/notice/VoiceYX");

class VoiceRecordService extends BaseService{
    constructor(){
        super();
        this.name = "VoiceRecordService";
        this.model = Model;
    }

    send(curUser, phone, params, templateId, voiceCode, _tenant){
        let tenant = _tenant || curUser.tenant;
        let recordData = {
            phone : phone,
            template : templateId,
            voiceCode : voiceCode,
            params : params,
            tenant : tenant,
        };

        return $ServiceMap.system.SystemConfigService.getConfig(curUser, 'voiceYX', tenant).then(option => {
            let voiceYX = new VoiceYX(option);
            recordData.sender = option.name;

            return voiceYX.voice(phone, voiceCode, params);
        }).then(result => {
            if(result.callId){
                recordData.status = 'waiting';
                recordData.callId = result.callId;
            }else{
                recordData.status = 'failed';
            }
            recordData.result = result;

            return this.save(curUser, recordData);
        }).catch(e => {
            recordData.status = 'failed';
            recordData.result = e;
            return this.save(curUser, recordData).then(() => {
                throw e;
            });
        });
    }
}

module.exports = new VoiceRecordService();


