/**
* Created on 5/21/2020, 3:15:59 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/tool/IdentifyingCodeService");

class IdentifyingCodeRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'IdentifyingCode';
        this.service = service;

        this.routerMap.get.push('get');
        this.routerMap.post.push('generate');

        this.commonPopulate = '';
    }

    //生成验证码
    generate(req){
        let data = req.body;

        return this.service.generate(req.curUser, data).then(data => {
            return {data};
        });
    }
    //获取验证码
    get(req, res, next){
        return service.get(req.curUser).then(data => {
            req.session.identifyingCode = data;
            return Promise.resolve({data: data.img});
        });
    }
}

module.exports = new IdentifyingCodeRouter().__getRouter();
