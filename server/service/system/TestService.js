//Created by wangshuyi on 2020-05-07.

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/system/TestModel");

class TestService extends BaseService{
    constructor(){
        super();
        this.name = 'TestService';
        this.model = Model;
    }
}

module.exports = new TestService();