/**
* Created on 5/10/2020, 3:43:49 PM.
*/

'use strict';

const { BaseTreeService } = require('dolphin-framework-server');
const Model = require("../../module/system/MenuModel");

class MenuService extends BaseTreeService{
    constructor(){
        super();
        this.name = "MenuService";
        this.model = Model;
    }
}

module.exports = new MenuService();


