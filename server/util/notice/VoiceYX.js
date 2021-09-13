//Created by wangshuyi on 2020-03-29.

'use strict';

const ThirdUtil = require('../ThirdUtil');
const md5 = require('md5');
const host = 'https://101.37.133.245:11008';
const api = {
    voice: '/voice/1.0.0/notify',
};

class VoiceYX extends ThirdUtil {
    constructor(param) {
        super(param);

        this.opts.account = param.account;
        this.opts.token = param.token;
        this.defaultVoiceParams = {
            replayTimes: param.replayTimes || 3,
            "displayNumber": param.displayNumber || "",
            "callRec": param.callRec || "",
            "recordButton": param.recordButton || "",
            "callbackUrl": param.callbackUrl || ""
        };
        this.proxy = param.proxy || null;
    }

    voice(calleeNumber, templateId, templateArgs, params = {}) {
        let now = new Date().getTime();
        let sign = md5(this.opts.account + this.opts.token + now);
        let url = `${host}${api.voice}/${this.opts.account}/${sign}`;
        let authorization = Buffer.from(this.opts.account + ':' + now).toString('base64');
        let data = Object.assign({}, this.defaultVoiceParams, {calleeNumber, templateId, templateArgs}, params);

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        let options = {
            url,
            method: 'post',
            headers: {
                Authorization: authorization
            },
            data
        };
        if(this.proxy){
            options.proxy = this.proxy
        }
        return this.request(options);
    }
}

module.exports = VoiceYX;