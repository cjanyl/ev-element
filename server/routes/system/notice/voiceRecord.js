/**
* Created on 5/21/2020, 8:04:10 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/VoiceRecordService");

class VoiceRecordRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'VoiceRecord';
        this.service = service;

        this.routerMap.post.push('send');

        this.commonPopulate = '';
    }

    send(req){
        let curUser = req.curUser, data = req.body;
        return this.service.send(curUser, data.phone, data.params, data.template, data.voiceCode).then(data => {
            return {data};
        });
    }
}

module.exports = new VoiceRecordRouter().__getRouter();
