/**
* Created on 5/21/2020, 7:57:17 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/VoiceTemplateModel");

class VoiceTemplateService extends BaseService{
    constructor(){
        super();
        this.name = "VoiceTemplateService";
        this.model = Model;
    }

    getTemplate(curUser, code, _tenant){
        let tenant = _tenant || curUser.tenant || null;

        return this.findOne(curUser, {code, tenant}).then(template => {
            if(template){
                return template;
            }else{
                return this.findOne(curUser, {code, tenant: null});
            }
        }).then(template => {
            if(!template){
                throw {message: `语音模板【${code}】未找到`}
            }

            return template;
        });
    }
}

module.exports = new VoiceTemplateService();


