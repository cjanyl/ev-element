/**
* Created on 5/21/2020, 4:33:08 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/SmsTemplateService");

class SmsTemplateRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'SmsTemplate';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new SmsTemplateRouter().__getRouter();
