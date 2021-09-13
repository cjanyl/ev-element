/**
* Created on 5/10/2020, 3:14:24 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/auth/RoleModel");

class RoleService extends BaseService{
    constructor(){
        super();
        this.name = "RoleService";
        this.model = Model;
    }
}

module.exports = new RoleService();


