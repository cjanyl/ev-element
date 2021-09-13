/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 菜单管理
 */
const { BaseTreeModel } = require('dolphin-framework-server');

class Model extends BaseTreeModel{
    constructor(){
        super();
        this.tableName = 'M_Menu';
    }

    extendFields(){
        super.extendFields({
            link: {type: String },                          //链接
            icon: {type: String },                          //图标
            sort : { type: Number },                        //排序
        });
    }
}

module.exports = new Model().getModel();