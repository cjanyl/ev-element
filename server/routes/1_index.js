
'use strict';
const { BaseRouter, BaseUtil, ResUtil } = require('dolphin-framework-server');
const { dbUser } = require('../config/config');
const curUser = undefined;

class IndexRouter extends BaseRouter{
    constructor(){
        super();
        this.name = 'IndexRouter';

        this.routerMap.use.push('__all');
    }

    __all(req, res, next){
        let lang = req.headers["accept-language"] && req.headers["accept-language"].substr(0, 2);
        req.locale = req.headers.locale || lang || 'zh';
        req.endType = BaseUtil.endType(req.headers['user-agent']);

        // 强制登录
        let passUrl = /dict|\/system\/tool\/qrcode/;
        //免登录规则
        let notLogin = /system/;

        Promise.resolve().then(() => {
            let token = req.headers.token || req.query.token;
            if(!token){
                throw {message: '无访问权限', errorCode: 403};
            }

            delete req.query.token;
            delete req.headers.token;
            return $ServiceMap.system.auth.UserService.findById(curUser, token).then(user => {
                if(user && user.state === 1){
                    return user
                }else{
                    throw { message: '无效的token', errorCode: 403 };
                }
            })
        }).then(user => {
            req.curUser = user;
            next();
        }).catch(e => {
            if(notLogin.test(req.baseUrl)){
                req.curUser = dbUser.robot;
                next();
            }else
                if(passUrl.test(req.baseUrl)){
                req.curUser = dbUser.robot;
                next();
            }else{
                res.send(ResUtil.error(e));
            }
        });
    }
}

module.exports = new IndexRouter().__getRouter();
