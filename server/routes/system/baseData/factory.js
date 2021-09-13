/**
* Created on 9/29/2020, 10:50:51 AM.
*/

'use strict';
const { BaseListRouter } = require('dolphin-framework-server');
const service = require("../../../service/system/baseData/FactoryService");

class FactoryRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'Factory';
        this.service = service;
        this.routerMap.post.push('findRelatedFactoryById');

        this.commonPopulate = 'supplier factory ';
    }

    findRelatedFactoryById(req){
        let con = req.body;
        let id = req.query.id;
        return this.service.findById(req.curUser, id, {populate: {path: 'factory', populate: this.commonPopulate}}).then(data=>{
            if(con.name_like){
                data.factory = data.factory.filter(f=>f.name.indexOf(con.name_like) > -1)
            }
            return Promise.resolve({rows: data.factory});
        })
    }
}

module.exports = new FactoryRouter().__getRouter();
