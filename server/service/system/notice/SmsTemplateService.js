/**
* Created on 5/21/2020, 4:33:08 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/SmsTemplateModel");

class SmsTemplateService extends BaseService{
    constructor(){
        super();
        this.name = "SmsTemplateService";
        this.model = Model;
    }
}

module.exports = new SmsTemplateService();


