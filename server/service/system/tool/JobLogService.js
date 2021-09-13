/**
* Created on 5/21/2020, 9:57:52 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/tool/JobLogModel");

class JobLogService extends BaseService{
    constructor(){
        super();
        this.name = "JobLogService";
        this.model = Model;
    }
}

module.exports = new JobLogService();


