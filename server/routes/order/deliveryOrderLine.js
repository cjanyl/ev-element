/**
* Created on 9/29/2020, 10:53:13 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/order/DeliveryOrderLineService");

class DeliveryOrderLineRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'DeliveryOrderLine';
        this.service = service;

        this.commonPopulate = 'deliveryOrder bucket ';
    }
}

module.exports = new DeliveryOrderLineRouter().__getRouter();
