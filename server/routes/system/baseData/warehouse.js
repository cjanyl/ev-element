/**
* Created on 9/29/2020, 10:51:42 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/baseData/WarehouseService");

class WarehouseRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Warehouse';
        this.service = service;

        this.commonPopulate = 'supplier factory ';
    }
}

module.exports = new WarehouseRouter().__getRouter();
