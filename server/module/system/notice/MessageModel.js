/**
 * Created by wangshuyi on 2020/05/21.
 */

'use strict';

/**
 * 站内信管理
 */
const {BaseModel} = require('dolphin-framework-server');

class MessageModel extends BaseModel{
    constructor(){
        super();
        this.tableName = 'N_Message';
    }

    extendFields(){
        super.extendFields({
            title : { type: String, label: '标题' },
            content : { type: String, label: '内容', fieldType: 'Textarea' },
            link : {type : String, label: '链接'},
            type : {type : String, label: '类型'},
            owner : {type : String, label: '收件人', ref : "M_User", fieldType: 'Ref', refUrl:'system.auth.user'},
            readFlag : {type : Boolean, label: '已读标记', fieldType: 'Boolean'},
        });
    }
}

module.exports = new MessageModel().getModel();
