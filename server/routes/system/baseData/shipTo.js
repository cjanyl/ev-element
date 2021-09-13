/**
* Created on 9/29/2020, 1:23:22 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/baseData/ShipToService");

class ShipToRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'ShipTo';
        this.service = service;

        this.commonPopulate = 'customer ';
    }
}

module.exports = new ShipToRouter().__getRouter();
