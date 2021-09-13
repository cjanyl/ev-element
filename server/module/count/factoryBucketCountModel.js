'use strict';

/**
 * 工厂桶数统计
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');

class Model extends BaseModel {
  constructor() {
    super();
    this.tableName = 'T_FactoryBucketCount';
  }

  extendFields(fields = {}) {
    super.extendFields({
      factory: {type: String, ref: 'M_Factory', label: '回收工厂', fieldType: 'Ref', refUrl:'system.baseData.factory', condition: true},
      toBeRecycled: {type: Number, label: '待回收', fieldType: 'Number', condition: true, default: 0},
      reclaimed: {type: Number, label: '累计回收', fieldType: 'Number', default: 0},
      alreadySent: {type: Number, label: '累计发送', fieldType: 'Number', default: 0},
      averageNumberOfDaysOut:{type: Number, label:'外出平均天数', fieldType: 'Number', condition: true, default: 0},
      forNumberOfRecycling:{type: Number, label:'代回收数量', fieldType: 'Number', condition: true, default: 0},
    });
  }
  extendFormatFields() {
    super.extendFormatFields({
      updateTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS},
    });
  }
}

module.exports = new Model().getModel();
