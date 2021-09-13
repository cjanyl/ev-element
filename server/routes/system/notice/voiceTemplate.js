/**
* Created on 5/21/2020, 7:57:17 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/VoiceTemplateService");

class VoiceTemplateRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'VoiceTemplate';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new VoiceTemplateRouter().__getRouter();
