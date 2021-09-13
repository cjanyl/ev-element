/**
 * Created on 2020-10-23 5:48:13 ├F10: PM┤.
 */

'use strict';

const {BaseService} = require('dolphin-framework-server');
const Model = require("../../module/count/factoryBucketCountModel");

class FactoryBucketCountService extends BaseService {
  constructor() {
    super();
    this.name = "FactoryBucketCountService";
    this.model = Model;
  }

  async statistics(curUser) {
    let statisticsData = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: {status: {$in: ['finished', 'tagMiss', 'outing']},}},
      {$group: {_id: {factory: '$factory', status: '$status'}, total: {$sum: 1}},},
    ]);
    let backBucketData = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: {status: {$in: ['finished', 'tagMiss']},backFactory:{$ne: null}}},
      {$group: {_id: '$backFactory', total: {$sum: 1}},},
    ])
    let averageDaysOfRecoveryData = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: {status: {$in: ['finished', 'tagMiss', 'outing']},}},
      {$group: {_id: '$factory', averageOutTime: {$avg: 1}},},
    ]);
    let list = [];
    //待回收
    statisticsData.filter(sd => sd._id.status === 'outing').reduce((obj, val) => {
      let i = obj.findIndex(l => l.factory === val._id.factory);
      if (i !== -1) {
        obj[i].toBeRecycled = val.total;
      } else {
        obj.push({
          factory: val._id.factory,
          toBeRecycled: val.total,
        })
      }
      return obj;
    }, list);
    //累计发送
    statisticsData.reduce((obj, val) => {
      let i = obj.findIndex(l => l.factory === val._id.factory);
      if (i !== -1) {
        obj[i].alreadySent ? obj[i].alreadySent += val.total : obj[i].alreadySent = val.total;
      } else {
        obj.push({
          factory: val._id.factory,
          alreadySent: val.total,
        })
      }
      return obj;
    }, list);
    //累计已回收
    backBucketData.reduce((obj, val) => {
      let i = obj.findIndex(l => l.factory === val._id);
      if (i !== -1) {
        obj[i].reclaimed ? (obj[i].reclaimed += val.total) : (obj[i].reclaimed = val.total);
      } else {
        obj.push({
          factory: val._id,
          reclaimed: val.total,
        })
      }
      return obj;
    }, list);
    //回收平均天数
    averageDaysOfRecoveryData.reduce((obj, val) => {
      let i = obj.findIndex(l => l.factory === val._id);
      if (i !== -1) {
        obj[i].averageDaysOfRecovery = val.averageOutTime;
      } else {
        obj.push({
          factory: val._id,
          averageDaysOfRecovery: val.averageOutTime,
        })
      }
      return obj;
    }, list)
    //代回收数量
    let forNumberOfRecycling = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: {nonFactory: true}},
      {$group: {_id: '$factory', total: {$sum: 1}},},
    ])
    forNumberOfRecycling.reduce((obj, val) => {
      let i = obj.findIndex(l => l.factory === val._id);
      if (i !== -1) {
        obj[i].forNumberOfRecycling ? obj[i].forNumberOfRecycling += val.total : obj[i].forNumberOfRecycling = val.total;
      } else {
        obj.push({
          factory: val._id,
          forNumberOfRecycling: val.total,
        })
      }
      return obj;
    }, list);
    for(let data of list){
      await super.updateOne(curUser, {factory: data.factory},data, {upsert: true})
    }
    return {message: '成功'};
  }
}

module.exports = new FactoryBucketCountService();


