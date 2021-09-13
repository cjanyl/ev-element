//Created by wangshuyi on 2020-05-07.

'use strict';
const {BaseListRouter} = require('dolphin-framework-server');
const service = require("../../service/system/TestService");

class TestRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'TestRouter';
        this.service = service;

        this.routerMap.get.push('hello');
    }

    hello(req){
        return Promise.resolve({data: req.query.code});
    }
}

module.exports = new TestRouter().__getRouter();