/**
* Created on 5/21/2020, 9:57:52 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/tool/JobLogService");

class JobLogRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'JobLog';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new JobLogRouter().__getRouter();
