/**
* Created on 5/20/2020, 7:41:02 PM.
*/

'use strict';

const { BaseService } = require('dolphin-framework-server');
const Model = require("../../module/system/SystemConfigModel");

const SystemConfigCache = {};

class SystemConfigService extends BaseService{
    constructor(){
        super();
        this.name = "SystemConfigService";
        this.model = Model;
    }

    getConfig(curUser, code, tenant){
        let cacheCode = code + (tenant || '');
        if(SystemConfigCache[cacheCode]){
            return Promise.resolve(SystemConfigCache[cacheCode]);
        }else{
            return this.getConfigFromDB(curUser, code, tenant);
        }
    }
    getConfigFromDB(curUser, code, _tenant){
        let tenant = _tenant || (curUser && curUser.tenant) || null;
        return this.findOne(curUser, {code:code, tenant}).then(config => {
            if(config){
                return config;
            }else{
                return this.findOne(curUser, {code});
            }
        }).then(config => {
            if(!config){
                throw {message: '系统配置未找到'}
            }
            let option = SystemConfigService.getMap(config);

            SystemConfigService.updateCache(config, option);

            return option;
        });
    }

    save(curUser, data) {
        return super.save(curUser, data).then(config => {
            SystemConfigService.updateCache(config);

            return config;
        });
    }

    updateById(curUser, id, data, options) {
        return super.updateById(curUser, id, data, options).then(config => {
            SystemConfigService.updateCache(config);

            return config;
        });
    }

    static getMap(config){
        let option = {};
        config.params.forEach(param => {
            if(/\./.test(param.key)){
                let keyArr = param.key.split('.');
                let parent = option;
                keyArr.forEach((k, i) => {
                    if(i === keyArr.length - 1){
                        switch (param.value) {
                            case 'true': parent[k] = true; break;
                            case 'false': parent[k] = false; break;
                            case 'null': parent[k] = null; break;
                            default: parent[k] = param.value;
                        }
                    }else{
                        if(!parent[k]){
                            parent[k] = {};
                        }
                        parent = parent[k];
                    }
                });
            }else{
                switch (param.value) {
                    case 'true': option[param.key] = true; break;
                    case 'false': option[param.key] = false; break;
                    case 'null': option[param.key] = null; break;
                    default: option[param.key] = param.value;
                }
            }
        });

        return option;
    }
    static updateCache(config, option){
        if(config.cache){
            SystemConfigCache[config.code + (config.tenant || '')] = option || SystemConfigService.getMap(config);
        }else{
            delete SystemConfigCache[config.code + (config.tenant || '')];
        }
    }
}

module.exports = new SystemConfigService();


