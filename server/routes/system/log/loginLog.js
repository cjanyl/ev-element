/**
* Created on 5/21/2020, 3:26:41 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/log/LoginLogService");

class LoginLogRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'LoginLog';
        this.service = service;

        this.commonPopulate = 'user';
    }
}

module.exports = new LoginLogRouter().__getRouter();
