//Created by wangshuyi on 2019-07-07.


'use strict';
const { BaseRouter, logger} = require('dolphin-framework-server');
const curUser = undefined;
const shortId = require('shortid');

class LoginRouter extends BaseRouter{
    constructor(){
        super();

        this.routerMap.get.push('autoLogin_$token', 'logout', 'loginByWorkWeChat_$code');
        this.routerMap.post.push('__base', 'forgetPassword');
    }

    //帐号密码登录
    __base(req){
        return $ServiceMap.system.auth.UserService.check(curUser, req.body.username, req.body.password).then(user => {
            return $ServiceMap.system.auth.UserService.login(user, 'user', req.ip);
        });
    }

    //token自动登录
    autoLogin_$token(req){
        let token = req.params.token;
        return $ServiceMap.system.auth.UserService.findById(curUser, token, {populate: $ServiceMap.system.auth.UserService.loginPopulate}).then(user => {
            if(user && user.state === 1){
                return $ServiceMap.system.auth.UserService.login(user, 'auto', req.ip);
            }else{
                throw {message: '无效的token'};
            }
        });
    }
}

module.exports = new LoginRouter().__getRouter();