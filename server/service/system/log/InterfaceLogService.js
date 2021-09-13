/**
* Created on 5/22/2020, 9:34:07 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/log/InterfaceLogModel");

class InterfaceLogService extends BaseService{
    constructor(){
        super();
        this.name = "InterfaceLogService";
        this.model = Model;
    }
}

module.exports = new InterfaceLogService();


