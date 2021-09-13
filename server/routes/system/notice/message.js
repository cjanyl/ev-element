/**
* Created on 5/21/2020, 4:04:48 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/notice/MessageService");

class MessageRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Message';
        this.service = service;

        this.commonPopulate = 'owner';
    }
}

module.exports = new MessageRouter().__getRouter();
