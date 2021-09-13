//Created by wangshuyi on 2020/9/29.

'use strict';

const {BaseRouter} = require('dolphin-framework-server');

class ReportRouter extends BaseRouter {
  constructor() {
    super();
    this.name = 'ReportRouter';

    this.routerMap.get.push('bucketGroupType', 'customerOutingTop', 'indexTotal');
    this.routerMap.post.push('customerTotal');
  }

  async customerTotal(req) {
    let {curUser, body, query} = req;
    let {pageSize = 10, pageNumber = 0} = query;
    let condition = body;

    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);

    //查询出总数
    let customerGroupTotal = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: condition},
      {$group: {_id: '$customer'}},
    ]);
    let total = customerGroupTotal.length;

    let customerGroup = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: condition},
      {$group: {_id: '$customer', total: {$sum: 1}}},
      {$skip: pageSize * pageNumber},
      {$limit: pageSize},
    ]);
    let customerIds = [], rows = [], customerMap = {};
    customerGroup.forEach(c => {
      customerIds.push(c._id);
      customerMap[c._id] = {
        _id: c._id,
        customer: c._id,
        bucket: {total: c.total, outing: 0, ready: 0, finished: 0},
        balance: {miss: 0, pay: 0, missPadding: 0, tagBroken: 0, more: 0},
        averageOutTime: 0,
        num: 0,
      };
      rows.push(customerMap[c._id]);
    });

    let customerCondition = {customer: {$in: customerIds}};
    let bucketGroup = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: customerCondition},
      {
        $group: {
          _id: {customer: '$customer', status: '$status'},
          count: {$sum: 1},
          averageOutTime: {$avg: '$averageOutTime'}
        }
      },
    ]);
    bucketGroup.forEach(bg => {
      if (customerMap[bg._id.customer]) {
        customerMap[bg._id.customer].bucket[bg._id.status] += bg.count;
        customerMap[bg._id.customer].averageOutTime += (bg.averageOutTime || 0);
        customerMap[bg._id.customer].num++;
      }
    });

    let balanceGroup = await $ServiceMap.order.BalanceOrderService.aggregate(curUser, [
      {$match: customerCondition},
      {$group: {_id: {customer: '$customer', type: '$type'}, count: {$sum: '$number'}}},
    ]);
    balanceGroup.forEach(bg => {
      if (customerMap[bg._id.customer]) {
        customerMap[bg._id.customer].balance[bg._id.type] += bg.count;
      }
    });

    await $ServiceMap.system.baseData.CustomerService.populate(curUser, rows, {path: 'customer'});

    return {total, rows};
  }

  async bucketGroupType(req) {
    let {curUser} = req;
    let result = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$group: {_id: '$type', count: {$sum: 1}}},
    ]);

    let groupMap = {};
    result.forEach(r => groupMap[r._id] = r.count);

    return {data: groupMap};
  }

  async customerOutingTop(req) {
    let {curUser, query: condition} = req;

    let pageSize = 10;

    let bucketCondition = Object.assign({status: 'outing'}, condition);
    let customerGroup = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$match: bucketCondition},
      {$group: {_id: '$customer', total: {$sum: 1}}},
      {$sort: {total: -1}},
      {$limit: pageSize},
    ]);

    await $ServiceMap.system.baseData.CustomerService.populate(curUser, customerGroup, {path: '_id'});

    return {rows: customerGroup};
  }

  async indexTotal(req) {
    let {curUser, body, query} = req;

    let total = await $ServiceMap.order.BucketService.count(curUser);
    let outing = await $ServiceMap.order.BucketService.count(curUser, {status: 'outing'});
    let picking = await $ServiceMap.order.BucketService.count(curUser, {status: 'picking'});
    let averageOutTime = await $ServiceMap.order.BucketService.aggregate(curUser, [
      {$group: {_id: '', averageOutTime: {$avg: '$averageOutTime'}}}
    ]);
    averageOutTime =(averageOutTime[0] ? averageOutTime[0].averageOutTime : 0).toFixed(2);
    let tagBrokenResult = await $ServiceMap.order.BalanceOrderService.aggregate(curUser, [
      {$match: {type: 'tagBroken'}},
      {$group: {_id: '', total: {$sum: '$number'}}}
    ]);
    let tagBroken = tagBrokenResult[0] ? tagBrokenResult[0].total : 0;
    let missResult = await $ServiceMap.order.BalanceOrderService.aggregate(curUser, [
      {$match: {type: 'missPadding'}},
      {$group: {_id: '', total: {$sum: '$number'}}}
    ]);
    let miss = missResult[0] ? missResult[0].total : 0;

    return {data: {total, outing, picking, tagBroken, miss, averageOutTime}};
  }
}

module.exports = new ReportRouter().__getRouter();
