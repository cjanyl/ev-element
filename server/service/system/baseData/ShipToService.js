/**
* Created on 9/29/2020, 1:23:22 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/baseData/ShipToModel");

class ShipToService extends BaseService{
    constructor(){
        super();
        this.name = "ShipToService";
        this.model = Model;

        this.defaultSort = {sort : 1};
    }
}

module.exports = new ShipToService();


