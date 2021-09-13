/**
* Created on 5/21/2020, 12:07:52 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/tool/ThirdTokenService");

class ThirdTokenRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'ThirdToken';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new ThirdTokenRouter().__getRouter();
