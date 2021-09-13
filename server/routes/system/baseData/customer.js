/**
* Created on 9/29/2020, 10:50:32 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/baseData/CustomerService");

class CustomerRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Customer';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new CustomerRouter().__getRouter();
