/**
* Created on 5/20/2020, 4:16:03 PM.
*/

'use strict';

const { BaseService, CONSTANT } = require('dolphin-framework-server');
const fs = require('fs');
const moment = require('moment');
const uuid = require('uuid');
const JimP = require('jimp');
const Model = require("../../../module/system/tool/FileModel");
const config = require("../../../config/config");

class FileService extends BaseService{
    constructor(){
        super();
        this.name = "FileService";
        this.model = Model;
    }

    static initFolder(type){
        let folderPath = '';

        let todayFolder = moment().format(CONSTANT.DATE_FORMAT_YMD);
        folderPath += '/' + todayFolder;
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }

        if(type){
            folderPath += '/' + type;
            if(!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath);
            }
        }

        return folderPath;
    }

    removeById(curUser, id){
        return this.findById(curUser, id, {fields: 'filePath'}).then(file => {
            if(!file){
                throw {message: 'ID不存在'};
            }
            let filePath = config.path.uploadPath + file.filePath;
            fs.unlink(filePath, err => {});

            return super.removeById(curUser, id);
        });
    }
    remove(curUser, condition, option){
        return this.find(curUser, condition, {fields: 'filePath'}).then(files => {
            files.forEach(file => {
                let filePath = config.path.uploadPath + file.filePath;
                fs.unlink(filePath, err => {});
            });

            return super.remove(curUser, condition, option);
        });
    }

    saveBufferFile(curUser, buffer, type, options){
        let {bufferType = 'base64'} = options;
        let folderPath = FileService.initFolder(type);

        let fileBuffer = new Buffer(buffer, bufferType); //把base64码转成buffer对象
        let fileName =  uuid.v4() + '.png';
        let filePath = folderPath + fileName;
        return new Promise((resolve, reject) => {
            fs.writeFile(config.path.uploadPath + filePath, fileBuffer, (err) => {//用fs写入文件
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        }).then(() => {
            let data = {};
            data.name = fileName;
            data.filePath = filePath;
            data.fileType = 'image/png';
            data.type = type;
            data.fileSize = buffer.length;          //TODO hex的图片，文件大小可能不对

            return this.save(curUser, data);
        })
    }

    getBufferImage(curUser, id, options = {}){
        let {maxSize, bufferType = 'base64'} = options;
        return this.findById(curUser, id).then(image => {
            if(!image){
                throw {message: `数据【${id}】未找到。`}
            }

            return new Promise((resolve, reject) => {
                let filePath = config.path.uploadPath + image.filePath;
                fs.readFile(filePath, (err, data) => {
                    if(err){
                        reject({message: `图片未找到，【${err.message}】`});
                    }else{
                        resolve(data);
                    }
                });
            }).then(buffer => {
                if(maxSize && buffer.length > maxSize * 1024){
                    return JimP.read(buffer).then(image => {
                        let quality = Math.floor(maxSize * 1024 / buffer.length * 100);
                        image.resize(image.getWidth() * quality / 100, image.getHeight() * quality / 100);
                        image.quality(quality);
                        return image.getBufferAsync(JimP.MIME_JPEG)
                    })
                }else{
                    return buffer;
                }
            }).then(buffer => {
                return buffer.toString(bufferType);
            });
        })
    }
}

module.exports = new FileService();


