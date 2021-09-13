/**
* Created on 9/29/2020, 10:51:26 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/baseData/SupplierService");

class SupplierRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Supplier';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new SupplierRouter().__getRouter();
