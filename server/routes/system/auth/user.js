/**
* Created on 5/10/2020, 3:14:04 PM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/auth/UserService");

class UserRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'User';
        this.service = service;

        this.commonPopulate = 'org role';

        this.routerMap.post.push('changePwd');
    }

    changePwd(req) {
        let { curUser, body } = req;

        return this.service.findById(curUser, curUser._id).then(user => {
            if(user.password !== body.oldPassword){
                throw {message: '旧密码输入不正确'};
            }

            return this.service.updateById(curUser, curUser._id, {password: body.newPassword})
        }).then(data => {
            return {data};
        });
    }
}

module.exports = new UserRouter().__getRouter();
