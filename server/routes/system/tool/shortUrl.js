/**
* Created on 5/21/2020, 10:48:12 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/tool/ShortUrlService");

class ShortUrlRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'ShortUrl';
        this.service = service;

        this.commonPopulate = '';
    }
}

module.exports = new ShortUrlRouter().__getRouter();
