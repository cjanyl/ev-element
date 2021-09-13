/**
* Created on 5/19/2020, 7:53:06 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/system/DictModel");

class DictService extends BaseService{
    constructor(){
        super();
        this.name = "DictService";
        this.model = Model;
    }

    getOptions(curUser, code){
        return this.findOne(curUser, {code}).then(dict => {
            if(!dict){
                throw {message: `此数据字典【${code}】不存在`}
            }
            return dict.options;
        })
    }

    getOptionsMap(curUser, code){
        return this.findOne(curUser, {code}).then(dict => {
            if(!dict){
                throw {message: `此数据字典【${code}】不存在`}
            }
            let map = {};
            dict.options.forEach(o => map[o.code] = o.text);

            return map;
        })
    }
}

module.exports = new DictService();


