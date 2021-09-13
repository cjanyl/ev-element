//Created by wangshuyi on 2019-06-27.

'use strict';
const moment = require('moment');
const curUser = undefined;
const axios = require('axios');

const defaultParams = {
    name : '',                       //第三方类型
    appKey : '',                       //第三方类型
    appSecret : '',                       //第三方类型
    thirdType : '',                       //第三方类型
};

class ThirdUtil {
    constructor(param){
        this.opts = Object.assign({}, defaultParams, param);
    }

    request(opts){
        return axios(opts).then(data => {
            return data.data;
        });
    }

    /**
     * 获取token，并缓存。支持同一第三方多种token
     * @param tokenType
     * @param _getTokenFun
     * @param activeTime
     * @return {Promise<any>}
     */
    getToken(tokenType = 'token', _getTokenFun = '_getToken', activeTime = 7000){
        let now = new Date();
        let condition = {
            appKey : this.opts.appKey,
            appSecret : this.opts.appSecret,
            tokenType : tokenType,
        };
        return $ServiceMap.system.tool.ThirdTokenService.findOne(curUser, condition).then(tokenObj => {
            if(tokenObj){
                if(now > tokenObj._doc.expiredTime){
                    return this[_getTokenFun]().then(token => {
                        return $ServiceMap.system.tool.ThirdTokenService.update(curUser, condition, {
                            token : token,
                            expiredTime : moment().add(activeTime, 'second').toDate()
                        }).then(() => token);
                    });
                }else{
                    return tokenObj.token;
                }
            }else{
                return this[_getTokenFun]().then(token => {
                    return this.saveToken(token, tokenType, moment().add(activeTime, 'second').toDate()).then(() => token);
                });
            }
        });
    }
    saveToken(token, type, time){
        return $ServiceMap.system.tool.ThirdTokenService.save(curUser, {
            name: this.opts.name,
            appKey : this.opts.appKey,
            appSecret : this.opts.appSecret,
            thirdType : this.opts.thirdType,
            tokenType : type,
            token : token,
            expiredTime : time
        });
    }

    /**
     * 实际从第三方获取Token的方法，需每个自己实现
     * @return {Promise<number>}
     * @private
     */
    _getToken(){
        return Promise.resolve(Math.random());
    }
}

module.exports = ThirdUtil;