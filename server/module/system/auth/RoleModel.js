//Created by wangshuyi on 2018/11/15.

'use strict';
const { BaseModel } = require('dolphin-framework-server');

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Role';
    }

    extendFields(){
        super.extendFields({
            _id: {type: String, default: ''},                               //角色编码
            menus: [{ type: String, label: '可见菜单', ref:'M_Menu' }],                        //可见菜单
        });
    }
}

module.exports = new Model().getModel();