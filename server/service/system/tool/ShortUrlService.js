/**
* Created on 5/21/2020, 10:48:12 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/tool/ShortUrlModel");

class ShortUrlService extends BaseService{
    constructor(){
        super();
        this.name = "ShortUrlService";
        this.model = Model;
    }

    generateUrl(curUser, langUrl){
        return this.findOne(curUser, {langUrl}).then(data => {
            if(data){
                return data;
            }else{
                return this.save(curUser, {langUrl});
            }
        })
    }
}

module.exports = new ShortUrlService();


