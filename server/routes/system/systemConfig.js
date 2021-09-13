/**
* Created on 5/20/2020, 7:41:02 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/system/SystemConfigService");

class SystemConfigRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'SystemConfig';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new SystemConfigRouter().__getRouter();
