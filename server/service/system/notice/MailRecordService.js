/**
* Created on 5/21/2020, 5:39:18 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/notice/MailRecordModel");
const NodeMailer = require("../../../util/notice/NodeMailer");

class MailRecordService extends BaseService{
    constructor(){
        super();
        this.name = "MailRecordService";
        this.model = Model;
    }

    sendMail(curUser, data){
        let mail, mailData;
        return $ServiceMap.system.SystemConfigService.getConfig(curUser, 'systemEmail').then(systemEmail => {
            mail = new NodeMailer(systemEmail);

            data.status = 'sending';
            data.from = mail.opts.auth.user;

            return this.save(curUser, data);
        }).then(_mailData => {
            mailData = _mailData;
            return mail.sendMail(data)
        }).then(sendResult => {
            return { status: 'success', result: sendResult.response, };
        }).catch(e => {
            return { status: 'failed', result: e.message, };
        }).then(updateData => {
            if(mailData){
                return this.updateById(curUser, mailData._id, updateData)
            }else{
                throw {message: updateData.result};
            }
        }).then(resultData => {
            if(resultData.status === 'success'){
                return resultData;
            }else{
                throw {message: resultData.result};
            }
        });
    }
}

module.exports = new MailRecordService();


