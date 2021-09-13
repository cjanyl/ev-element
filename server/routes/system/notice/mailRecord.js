/**
* Created on 5/21/2020, 5:39:18 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/MailRecordService");

class MailRecordRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'MailRecord';
        this.service = service;

        this.routerMap.post.push('send');

        this.commonPopulate = '';
    }
    send(req){
        let data = req.body;

        return service.sendMail(req.curUser, data)
            .then(data => Promise.resolve({data}));
    }
}

module.exports = new MailRecordRouter().__getRouter();
