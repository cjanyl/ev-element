//Created by wangshuyi on 2020/5/21.

'use strict';

const { BaseRouter } = require('dolphin-framework-server');
const curUser = undefined;

class ApiRouter extends BaseRouter{
    constructor(params){
        super(params);
        this.name = 'apiRouter';

        this.routerMap.use.push('voiceCallBack');
    }

    voiceCallBack(req){
        let body = req.body;

        // logger.warn('body', body);

        let condition = {callId: body.callId};
        let data = {voiceResult: body};
        if(body['callState'] === 0){
            data.status = 'success';
        }else{
            data.status = 'failed';
        }

        $ServiceMap.system.notice.VoiceRecordService.updateOne(curUser, condition, data).then(result => {
            if(result.n !== 1){
                this.loggerWarn('【voiceCallBack】', 'update voice record failed', body);
            }
        }).catch(e => {
            this.loggerError( '【voiceCallBack】', 'update voice record error', e);
        });

        return Promise.resolve({});
    }
}

module.exports = new ApiRouter().__getRouter();