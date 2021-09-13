//Created by wangshuyi on 2018/11/15.

'use strict';
const { BaseModel } = require('dolphin-framework-server');
const shortId = require('shortid');

class Model extends BaseModel {
    constructor() {
        super();
        this.tableName = 'M_User';
    }

    extendFields() {
        super.extendFields({
            password: {type: String, label: '密码', default: shortId.generate},

            phone: {type: Number, label: '手机号', fieldType: 'Number'},
            gender: {type: String, label: '性别', fieldType: 'Dict', dictCode: 'gender'},
            email: {type: String, label: '邮箱'},
            image: {type: String, label: '头像', ref: 'U_File', fieldType: 'Image'},
            org: [{type: String, label: '所属组织', ref: "M_Org", fieldType: 'Ref', refUrl: 'system.auth.org'}],
            role: [{type: String, label: '所属角色', ref: "M_Role", fieldType: 'Ref', refUrl: 'system.auth.role'}],
            cardID: {type: String, label: '身份证号'},
            staffCode: {type: String, label: '员工编号'},
            type: {type: String, label: '类型', default: 'staff', fieldType: 'Dict', dictCode: 'userType'},
            warehouse: {type: String, ref: 'M_Warehouse', label: '仓库', fieldType: 'Ref', refUrl:'system.baseData.warehouse'},

            openID: {type: String, label: '公众号openID'},
            appID: {type: String, label: '小程序openID'},
            unionID: {type: String, label: '微信unionID'},
            weChatID: {type: String, label: '微信ID'},

            changePasswordFlag: {type: Boolean, label: '初始密码', default: true, fieldType: 'Boolean'},
            source: {type: String, label: '数据来源', default: 'plate', fieldType: 'Dict', dictCode: 'dataSource'},
        });
    }

    getSchema() {
        super.getSchema();

        return this.schema;
    }
}

module.exports = new Model().getModel();
