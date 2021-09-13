/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 系统配置
 */
const {BaseModel, DBUtil} = require('dolphin-framework-server');
const shortID = require('shortid');
const Schema = DBUtil.mongoose.Schema;

const paramsSchema = new Schema({
    key : { type: String, label: 'Key'},                         //编码
    value : {type: String, label: 'Value'},                          //文本
});
paramsSchema.name = '参数';

class Model extends BaseModel{
    constructor(){
        super();
        this.tableName = 'M_SystemConfig';
    }

    extendFields(){
        super.extendFields({
            code: {type: String, label: '编码', default: shortID.generate},
            params: [paramsSchema],                //选项
            cache: {type: Boolean, label: '是否缓存', default: false, fieldType: 'Boolean'},
        });
    }
}

module.exports = new Model().getModel();