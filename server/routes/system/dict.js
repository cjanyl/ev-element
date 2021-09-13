/**
* Created on 5/19/2020, 7:54:14 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/system/DictService");

class DictRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Dict';
        this.service = service;

        this.commonPopulate = '';

        this.routerMap.get.push('options_$code');
    }

    //获取数据项
    options_$code(req, res, next){
        let { code } = req.params;
        let { curUser } = req;

        return this.service.getOptions(curUser, code).then(rows => {
            return {rows};
        });
    }
}

module.exports = new DictRouter().__getRouter();
