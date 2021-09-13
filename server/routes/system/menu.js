/**
* Created on 5/10/2020, 3:43:49 PM.
*/

'use strict';
const { BaseTreeRouter } = require('dolphin-framework-server');
const service = require("../../service/system/MenuService");

class MenuRouter extends BaseTreeRouter{
    constructor(){
        super();
        this.name = 'Menu';
        this.service = service;

        this.commonPopulate = 'parent';
    }
}

module.exports = new MenuRouter().__getRouter();