/**
* Created on 5/22/2020, 9:34:07 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/log/InterfaceLogService");

class InterfaceLogRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'InterfaceLog';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new InterfaceLogRouter().__getRouter();
