/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 数据字典
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');
const Schema = DBUtil.mongoose.Schema;

const optionSchema = new Schema({
    code : { type: String, label: '编码'},                         //编码
    text : {type: String, label: '描述'},                          //文本
});

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_Dict';
    }

    extendFields(){
        super.extendFields({
            options: [optionSchema],                //选项
        });
    }
}

module.exports = new Model().getModel();