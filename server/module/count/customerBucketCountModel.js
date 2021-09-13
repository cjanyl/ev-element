'use strict';

/**
 * 客户桶数统计
 */
const {BaseModel, CONSTANT} = require('dolphin-framework-server');

class Model extends BaseModel {
  constructor() {
    super();
    this.tableName = 'T_CustomerBucketCount';
  }

  extendFields(fields = {}) {
    super.extendFields({
      customer: {type: String, ref: 'M_Customer', label: '客户', fieldType: 'Ref', refUrl:'system.baseData.customer', condition: true},
      toBeRecycled: {type: Number, label: '待回收', fieldType: 'Number', condition: true, default: 0},
      reclaimed: {type: Number, label: '累计回收',fieldType: 'Number', default: 0},
      alreadySent: {type: Number, label: '累计发送',fieldType: 'Number', default: 0},
      lostPending:{type: Number, label:'丢失待处理', fieldType: 'Number', condition: true, default: 0},
      compensated:{type: Number, label:'累计赔偿',fieldType: 'Number', default: 0},
      averageNumberOfDaysOut:{type: Number, label:'外出平均天数', fieldType: 'Number', condition: true, default: 0},
      averageDaysOfRecovery:{type: Number, label:'回收平均天数', fieldType: 'Number', condition: true, default: 0},
    });
  }
  extendFormatFields() {
    super.extendFormatFields({
      updateTime: {type: 'Date', format: CONSTANT.DATE_FORMAT_YMD_HMS},
    });
  }
}

module.exports = new Model().getModel();
