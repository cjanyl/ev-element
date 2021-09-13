/**
* Created on 9/29/2020, 10:52:46 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/order/BalanceOrderModel");

class BalanceOrderService extends BaseService{
    constructor(){
        super();
        this.name = "BalanceOrderService";
        this.model = Model;
    }
}

module.exports = new BalanceOrderService();


