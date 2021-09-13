/**
* Created on 5/20/2020, 4:16:03 PM.
*/

'use strict';
const { BaseListRouter, ResUtil } = require('dolphin-framework-server');
const path = require("path");

const service = require("../../../service/system/tool/FileService");
const config = require("../../../config/config");

class FileRouter extends BaseListRouter{
    constructor(){
        super();
        this.name = 'File';
        this.service = service;

        this.commonPopulate = '';

        this.routerMap.get.push('get_$id', 'download_$id');
        this.routerMap.post.push('base64');
    }

    save(req, res, next){
        return this.parseFile(req, res, next).then(({fields, files, basePath}) => {
            let data = {}, file;
            file = files.media;

            data.name = file.name;
            data.filePath = basePath + '/'+ path.basename(file.path);
            data.fileSize = file.size;
            data.fileType = file.type;
            data.type = req.query.type;
            data.lastModifiedDate = file.lastModifiedDate;

            return this.service.save(req.curUser, data).then(data => {
                return {data};
            });
        });
    }

    //base64格式的图片
    base64(req, res, next){
        let base64 = req.body.media;
        let type = req.query.type;

        return this.service.saveBufferFile(req.curUser, base64, type).then(data => {
            return {data};
        });
    }

    //获取文件
    get_$id(req, res, next){
        let {id} = req.params;

        this.service.updateById(req.curUser, id, {lastUseTime: new Date()})
            .then(file => res.sendFile(path.join(config.path.uploadPath + file.filePath)))
            .catch(err => res.send(ResUtil.error({message: '文件未找到'})));

        return false;
    }

    //下载文件
    download_$id(req, res, next){
        let {id} = req.params;

        this.service.updateById(req.curUser, id, {lastUseTime: new Date()})
            .then(file => res.download(path.join(config.path.uploadPath + file.filePath)))
            .catch(err => res.send(ResUtil.error({message: '文件未找到'})));

        return false;
    }
}

module.exports = new FileRouter().__getRouter();
