/**
* Created on 5/21/2020, 4:04:48 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/MessageModel");

class MessageService extends BaseService{
    constructor(){
        super();
        this.name = "MessageService";
        this.model = Model;
    }
}

module.exports = new MessageService();


