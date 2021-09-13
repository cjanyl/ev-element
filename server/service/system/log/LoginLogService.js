/**
* Created on 5/21/2020, 3:26:41 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/log/LoginLogModel");

class LoginLogService extends BaseService{
    constructor(){
        super();
        this.name = "LoginLogService";
        this.model = Model;
    }
}

module.exports = new LoginLogService();


