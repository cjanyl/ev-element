/**
* Created on 5/21/2020, 3:15:59 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/tool/IdentifyingCodeModel");

const svgCaptcha = require('svg-captcha');
const moment = require('moment');

const activeTime = 30; //分钟

class IdentifyingCodeService extends BaseService{
    constructor(){
        super();
        this.name = "IdentifyingCodeService";
        this.model = Model;
    }
    generate(curUser, data){
        let code = svgCaptcha.create();
        data.value = code.text;
        data.img = code.data;
        data.expiredTime = moment().add(activeTime, 'minute').toDate();

        return this.save(curUser, data);
    }
    get(curUser){
        let code = svgCaptcha.create();
        let data = {
            value : code.text,
            img : code.data,
            expiryTime : moment().add(activeTime, 'minute').toDate()
        };

        return this.save(curUser, data);
    }

    check(curUser, code){
        return this.findOne(curUser, {value: code, expiredTime: {$lte: moment().toDate()}}).then(flag => {
            if(flag){
                return true;
            }else{
                throw {message: '无效的验证码'};
            }
        });
    }
}

module.exports = new IdentifyingCodeService();


