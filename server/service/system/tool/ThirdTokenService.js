/**
* Created on 5/21/2020, 12:07:52 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/tool/ThirdTokenModel");

class ThirdTokenService extends BaseService{
    constructor(){
        super();
        this.name = "ThirdTokenService";
        this.model = Model;
    }
}

module.exports = new ThirdTokenService();


