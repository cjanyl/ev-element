/**
* Created on 9/29/2020, 10:50:51 AM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../../module/system/baseData/FactoryModel");

class FactoryService extends BaseService{
    constructor(){
        super();
        this.name = "FactoryService";
        this.model = Model;
    }
    async findCondition(curUser, condition) {
        if (curUser.role.find(r => r === 'admin') || curUser.role.find(r => r === 'system_admin') || curUser.role.find(r => r === 'cso')) {
            return Object.assign({state: 1}, condition);
        } else {
            let warehouse = {};
            if(curUser.warehouse){
                warehouse = await $ServiceMap.system.baseData.WarehouseService.findById(curUser, curUser.warehouse, {fields:{factory: 1}});
            }
            return {$and: [Object.assign({state: 1}, condition), {_id: warehouse.factory ||　''}]};
        }
    }
}

module.exports = new FactoryService();


