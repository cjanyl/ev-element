/**
* Created on 5/10/2020, 3:13:25 PM.
*/

'use strict';

const { BaseTreeService } = require('dolphin-framework-server');
const Model = require("../../../module/system/auth/OrgModel");

class OrgService extends BaseTreeService{
    constructor(){
        super();
        this.name = "OrgService";
        this.model = Model;
    }
}

module.exports = new OrgService();


