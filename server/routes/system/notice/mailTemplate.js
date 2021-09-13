/**
* Created on 5/21/2020, 5:36:57 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/MailTemplateService");

class MailTemplateRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'MailTemplate';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new MailTemplateRouter().__getRouter();
