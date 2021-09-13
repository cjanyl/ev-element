/**
 * Created on 2020-10-23 1:17:31 ├F10: PM┤.
 */

'use strict';

const {BaseService} = require('dolphin-framework-server');
const Model = require("../../module/count/customerBucketCountModel");

class CustomerBucketCountService extends BaseService {
  constructor() {
    super();
    this.name = "CustomerBucketCountService";
    this.model = Model;
  }

  async statistics(curUser) {
    let statisticsData = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match:{status: {$in: ['finished', 'tagMiss', 'outing']},}},
      {$group: {_id: {customer: '$customer', status: '$status'}, total: {$sum: 1}},},
    ]),
      averageDaysOfRecoveryData = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match:{status: {$in: ['finished', 'tagMiss', 'outing']},}},
      {$group: {_id: '$customer', averageOutTime: {$avg: 1}},},
    ]),
      balanceOrderData = await $ServiceMap.order.BalanceOrderService.aggregate(curUser, [
      {$match: {type: {$in: ['missPadding','pay']}}},
      {$group: {_id: {customer:'$customer', type:'$type'}, total: {$sum: '$number'}}}
    ]),
      list = [];
    //回收平均天数
    averageDaysOfRecoveryData.reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id);
      if(i !== -1){
        obj[i].averageDaysOfRecovery = val.averageOutTime;
      }else {
        obj.push({
          customer: val._id,
          averageDaysOfRecovery: val.averageOutTime,
        })
      }
      return obj;
    },list)
    //累计发送
    statisticsData.reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id.customer);
      if(i !== -1){
        obj[i].alreadySent?obj[i].alreadySent += val.total : obj[i].alreadySent = val.total;
      }else {
        obj.push({
          customer: val._id.customer,
          alreadySent: val.total,
        })
      }
      return obj;
    },list);
    //待回收
    statisticsData.filter(sd=>sd._id.status === 'outing').reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id.customer);
      if(i !== -1){
        obj[i].toBeRecycled = val.total;
      }else {
        obj.push({
          customer: val._id.customer,
          toBeRecycled: val.total,
        })
      }
      return obj;
    },list);
    //累计已回收
    statisticsData.filter(sd=>sd._id.status !== 'outing').reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id.customer);
      if(i !== -1){
        obj[i].reclaimed? (obj[i].reclaimed += val.total): (obj[i].reclaimed = val.total);
      }else {
        obj.push({
          customer: val._id.customer,
          reclaimed: val.total,
        })
      }
      return obj;
    },list);
    //丢失待处理
    balanceOrderData.filter(bo=>bo._id.type === '$customer').reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id.customer);
      if(i !== -1){
        obj[i].lostPending = val.total;
      }else {
        obj.push({
          customer: val._id.customer,
          lostPending: val.total,
        })
      }
      return obj;
    },list);
    //累计赔偿
    balanceOrderData.filter(bo=>bo._id.type === 'pay').reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id.customer);
      if(i !== -1){
        obj[i].compensated = val.total;
      }else {
        obj.push({
          customer: val._id.customer,
          compensated: val.total,
        })
      }
      return obj;
    },list);
    //当前在外的桶外出平均天数
    let bucketList = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: {status: 'outing'}},
      {$group: {_id: '$customer', lastSendTime: {$push: '$lastSendTime'}}}
    ])
    bucketList.forEach((bl, i) => {
      let time = 0, size = bl.lastSendTime.length;
      bl.lastSendTime.forEach(ls => {
        time += global.$moment().diff(global.$moment(ls), "days")
      })
      bucketList[i].lastSendTime = (time / (size || 1)).toFixed(2);
    })
    bucketList.reduce((obj,val)=>{
      let i = obj.findIndex(l=>l.customer === val._id);
      if(i !== -1){
        obj[i].averageNumberOfDaysOut = val.lastSendTime;
      }else {
        obj.push({
          customer: val.customer,
          averageNumberOfDaysOut: val.lastSendTime,
        })
      }
      return obj;
    },list);
    for(let data of list){
      await super.updateOne(curUser, {customer: data.customer},data, {upsert: true})
    }
    return {message: '成功'};
  }
}

module.exports = new CustomerBucketCountService();


