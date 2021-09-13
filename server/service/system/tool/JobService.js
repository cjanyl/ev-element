/**
* Created on 5/21/2020, 9:47:52 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/tool/JobModel");

class JobService extends BaseService{
    constructor(){
        super();
        this.name = "JobService";
        this.model = Model;

        this.defaultSort = {name: 1};
    }
}

module.exports = new JobService();


