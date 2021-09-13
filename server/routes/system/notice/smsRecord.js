/**
* Created on 5/21/2020, 4:33:27 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/SmsRecordService");

class SmsRecordRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'SmsRecord';
        this.service = service;

        this.routerMap.post.push('send');

        this.commonPopulate = 'template';
    }

    send(req){
        let {curUser, body} = req;
        return this.service.send(curUser, body.phone, body.params, body.template, body.smsCode).then(data => {
            return {data};
        });
    }
}

module.exports = new SmsRecordRouter().__getRouter();
