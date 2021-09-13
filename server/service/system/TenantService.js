/**
* Created on 5/20/2020, 3:41:10 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/system/TenantModel");

class TenantService extends BaseService{
    constructor(){
        super();
        this.name = "TenantService";
        this.model = Model;
    }
}

module.exports = new TenantService();


