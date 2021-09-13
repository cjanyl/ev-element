/**
* Created on 9/29/2020, 10:51:42 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/baseData/WarehouseModel");

class WarehouseService extends BaseService{
    constructor(){
        super();
        this.name = "WarehouseService";
        this.model = Model;
    }
}

module.exports = new WarehouseService();


