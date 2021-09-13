/**
* Created on 9/29/2020, 10:50:32 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/baseData/CustomerModel");

class CustomerService extends BaseService{
    constructor(){
        super();
        this.name = "CustomerService";
        this.model = Model;
    }
}

module.exports = new CustomerService();


