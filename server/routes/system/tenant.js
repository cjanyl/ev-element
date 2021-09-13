/**
* Created on 5/20/2020, 3:41:10 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/system/TenantService");

class TenantRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Tenant';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new TenantRouter().__getRouter();
