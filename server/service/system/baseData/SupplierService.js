/**
* Created on 9/29/2020, 10:51:26 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/baseData/SupplierModel");

class SupplierService extends BaseService{
    constructor(){
        super();
        this.name = "SupplierService";
        this.model = Model;
    }
}

module.exports = new SupplierService();


