/**
* Created on 5/10/2020, 3:13:25 PM.
*/

'use strict';
const { BaseTreeRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/auth/OrgService");

class OrgRouter extends BaseTreeRouter{
    constructor(){
        super();
        this.name = 'Org';
        this.service = service;

        this.commonPopulate = 'parent';
    }
}

module.exports = new OrgRouter().__getRouter();