/**
* Created on 5/10/2020, 3:14:24 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/auth/RoleService");

class RoleRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Role';
        this.service = service;

        this.commonPopulate = 'menus';
    }
}

module.exports = new RoleRouter().__getRouter();
