/**
* Created on 9/29/2020, 10:53:13 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/order/DeliveryOrderLineModel");

class DeliveryOrderLineService extends BaseService{
    constructor(){
        super();
        this.name = "DeliveryOrderLineService";
        this.model = Model;
    }
}

module.exports = new DeliveryOrderLineService();


