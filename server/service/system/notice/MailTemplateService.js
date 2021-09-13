/**
* Created on 5/21/2020, 5:36:57 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/MailTemplateModel");

class MailTemplateService extends BaseService{
    constructor(){
        super();
        this.name = "MailTemplateService";
        this.model = Model;
    }
}

module.exports = new MailTemplateService();


