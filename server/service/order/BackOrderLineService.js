/**
* Created on 9/15/2020, 3:49:41 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/order/BackOrderLineModel");

class BackOrderLineService extends BaseService{
    constructor(){
        super();
        this.name = "BackOrderLineService";
        this.model = Model;
    }
}

module.exports = new BackOrderLineService();


