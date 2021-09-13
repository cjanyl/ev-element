'use strict';
const mailer = require('nodemailer');

class NodeMailer {
    constructor(param) {
        this.opts = Object.assign({}, this.opts, param);
        this.transporter = null;

        this.init();
    }

    init(){
        this.transporter = mailer.createTransport(this.opts);
    }

    /**
     * 发送邮件
     * @param options Object {to, subject, content, cc, bcc, attachments}
     * @return {Promise}
     */
    sendMail(options){
        return new Promise((resolve, reject) => {
            let mailOption = Object.assign({}, options, {
                from: this.opts.sendUser || this.opts.auth.user, // sender address
                html: options.content,
            });

            this.transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(info);
                }
            });
        });
    }
}

module.exports = NodeMailer;