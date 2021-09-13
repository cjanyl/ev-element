/**
* Created on 9/29/2020, 10:52:58 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../service/order/BucketService");

class BucketRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Bucket';
        this.service = service;
        this.routerMap.post.push('updateMany');

        this.commonPopulate = 'factory warehouse customer shipTo supplier backFactory';
    }

    save(req){
        if(req.body.warehousingTime){
            req.body.warehousingTime = new Date();
        }
        return super.save(req)
    }

    updateMany(req){
        let {condition, data} = req.body;
        return $ServiceMap.order.BucketService.updateMany(req.curUser, condition, data);
    }
}

module.exports = new BucketRouter().__getRouter();
