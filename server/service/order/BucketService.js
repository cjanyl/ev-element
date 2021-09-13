/**
* Created on 9/29/2020, 10:52:58 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/order/BucketModel");

class BucketService extends BaseService{
    constructor(){
        super();
        this.name = "BucketService";
        this.model = Model;
    }
    // async findCondition(curUser, condition) {
    //     if (curUser.role.find(r => r === 'admin') || curUser.role.find(r => r === 'system_admin') || curUser.role.find(r => r === 'cso')) {
    //         return Object.assign({state: 1}, condition);
    //     } else {
    //         return {$and: [Object.assign({state: 1}, condition), {warehouse: curUser.warehouse}]};
    //     }
    // }

    async save(curUser, data = {}) {
        //如果此标签已存在新入库、备货中、外出状态的库，那禁止入库并提示
        let bucket = await super.findOne(curUser, {tag: data.tag, status:{$in:['created', 'picking', 'outing']}});
        if(bucket){
            throw {message: `已存在标签为${data.tag}的桶`};
        }
        return super.save(curUser, data);
    }
}

module.exports = new BucketService();


