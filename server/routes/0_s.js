//Created by wangshuyi on 2019-07-07.


'use strict';
const { BaseRouter } = require('dolphin-framework-server');
const curUser = undefined;

class ShortUrlRouter extends BaseRouter{
    constructor(){
        super();

        this.routerMap.get.push('$code');
    }

    $code(req, res, next){
        let {code} = req.params;
        $ServiceMap.system.tool.ShortUrlService.findOne(curUser, {code}, {fields: 'langUrl'}).then(data => {
            if(data){
                $ServiceMap.system.tool.ShortUrlService.updateById(curUser, data._id, {$inc: {count: 1}}).then(() => {}).catch(e => {
                    this.loggerError('$code', 'update request count failed', e);
                });
                res.redirect(data.langUrl);
            }else{
                next();
            }
        });
    }
}

module.exports = new ShortUrlRouter().__getRouter();