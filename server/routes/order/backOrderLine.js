/**
* Created on 9/15/2020, 3:49:41 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/order/BackOrderLineService");

class BackOrderLineRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'BackOrderLine';
        this.service = service;

        this.commonPopulate = 'backOrder bucket ';
    }
}

module.exports = new BackOrderLineRouter().__getRouter();
