/**
 * Created on 9/29/2020, 10:52:15 AM.
 */

'use strict';

const {BaseService} = require('dolphin-framework-server');
const Model = require("../../module/order/BackOrderModel");

class BackOrderService extends BaseService {
  constructor() {
    super();
    this.name = "BackOrderService";
    this.model = Model;
  }

  // async findCondition(curUser, condition) {
  //     if (curUser.role.find(r => r === 'admin') || curUser.role.find(r => r === 'system_admin') || curUser.role.find(r => r === 'cso')) {
  //         return Object.assign({state: 1}, condition);
  //     } else {
  //         return {$and: [Object.assign({state: 1}, condition), {warehouse: curUser.warehouse}]};
  //     }
  // }
  findForPage(curUser, condition, options) {
    return super.findForPage(curUser, condition, options).then(({rows, total}) => {
      let findOrderLinePromise = [];
      rows.forEach(order => {
        let query = $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: order._id}, {populate: 'deliveryOrder bucket'}).then(orderLine => {
          order._doc.orderLine = orderLine;
        });
        let balanceOrder = $ServiceMap.order.BalanceOrderService.find(curUser, {backOrder: order._id}).then(balanceOrder => {
          order._doc.balanceOrder = balanceOrder;
        });

        findOrderLinePromise.push(query);
        findOrderLinePromise.push(balanceOrder);
      });

      return Promise.all(findOrderLinePromise).then(() => {
        return {rows, total};
      });
    })
  }

  async orderAndLineList(curUser, condition = {}, options = {}) {
    let list = await super.findForPage(curUser, condition, options);
    let idList = [];
    list.rows.forEach(l => {
      idList.push(l._id)
    })
    let lineList = await $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: {$in: idList}}) || [];
    let balanceOrderList = await $ServiceMap.order.BalanceOrderService.find(curUser, {
      backOrder: {$in: idList},
      type: {$in: ['missPadding', 'tagBroken']}
    }, {populate: 'bucket'}) || [];
    list.rows.map(r => {
      r._doc.line = lineList.filter(ll => ll.backOrder === r._id) || [];
      r._doc.missPadding = balanceOrderList.find(bo => bo.backOrder === r._id && bo.type === 'missPadding') || null;
      r._doc.tagBroken = balanceOrderList.find(bo => bo.backOrder === r._id && bo.type === 'tagBroken') || null;
    })
    return list;
  }


  //手机端扫码添加回收单行
  async addLine(curUser, orderInfo, tag) {
    let bucketCondition = {tag, status: {$in: ['outing', 'tagMiss', 'bucketMiss']}}, updateBucketId,
      updateData = {status: 'finished', backFactory:orderInfo.factory};
    let bucketInfo = await $ServiceMap.order.BucketService.findOne(curUser, bucketCondition, {field: 'tag'});
    updateBucketId = bucketInfo._id;
    if (bucketInfo) {
      if (!(bucketInfo.status === 'outing')) {
        //如果搜索到的桶不是外出状态,需要找到外出时间最久的桶,改为当前桶的状态。
        let data = await $ServiceMap.order.BucketService.findForPage(curUser, {
          factory: orderInfo.factory,
          customer: orderInfo.customer,
          status: 'outing'
        }, {pageSize: 1, sort: {lastSendTime: 1}, fields: {_id: 1}});
        if (data.rows.length) {
          updateBucketId = data.rows[0]._id;
          updateData.status = bucketInfo.status;
        } else {
          //todo 需要处理查询不到数据的情况
        }
      }
      if (bucketInfo.factory !== orderInfo.factory) {
        updateData.nonFactory = true;
      }
      await $ServiceMap.order.BucketService.updateById(curUser, updateBucketId, updateData);
    } else {
      let bucketData = {
        tag,
        type: orderInfo.type,

        factory: orderInfo.factory,
        customer: orderInfo.customer,
        shipTo: orderInfo.shipTo,
        backFactory: orderInfo.factory,

        supplier: orderInfo.supplier,
        status: 'finished',
      };
      bucketInfo = await $ServiceMap.order.BucketService.save(curUser, bucketData);
    }

    let backOrderLineData = {
      backOrder: orderInfo._id,
      bucket: bucketInfo._id,
      status: 'finished',
    };
    await this.updateById(curUser, orderInfo._id, {status: 'backing'});
    return await $ServiceMap.order.BackOrderLineService.save(curUser, backOrderLineData);
  }

  async removeLine(curUser, id) {
    let BackOrderLineInfo = await $ServiceMap.order.BackOrderLineService.findById(curUser, id, {populate: 'bucket'});
    if (BackOrderLineInfo.bucket.warehouse) {
      await $ServiceMap.order.BucketService.updateById(curUser, BackOrderLineInfo.bucket._id, {status: 'outing'});
    } else {
      //todo 删除桶

      // await $ServiceMap.order.BucketService.removeById(curUser, BackOrderLineInfo.bucket._id);
    }
    return await $ServiceMap.order.BackOrderLineService.removeById(curUser, id);
  }

  //提交订单
  async submitOrder(curUser, orderId, orderData) {
    let updateOrderData = Object.assign({status: 'finished'}, orderData);
    let bucketList = await $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: orderId}, {fields: {bucket: 1}});
    bucketList = bucketList.map(b => b.bucket);
    let bucket, averageOutTime;
    for (let id of bucketList) {
      bucket = await $ServiceMap.order.BucketService.findById(curUser, id, {
        fields: {
          _id: 1,
          averageOutTime: 1,
          lastSendTime: 1
        }
      });
      averageOutTime = global.$moment().diff(global.$moment(bucket.lastSendTime), "days") || 0;
      await $ServiceMap.order.BucketService.updateById(curUser, id, {
        backOrderTime: new Date(),
        averageOutTime: averageOutTime
      })
    }
    return await this.updateById(curUser, orderId, updateOrderData);
  }

  //各种带订单行的查询方法
  async findWithOrderLine(curUser, condition, option) {
    let orderList = await this.find(curUser, condition, option);
    return await this.findOrderLineInfo(curUser, orderList);
  }

  async findPageWithOrderLine(curUser, condition, option) {
    let {rows, total} = await this.findForPage(curUser, condition, option);
    await this.findOrderLineInfo(curUser, rows);

    return {rows, total};
  }

  async findByIdWithOrderLine(curUser, id, option) {
    let orderInfo = await this.findById(curUser, id, option);
    await this.findOrderLineInfo(curUser, [orderInfo]);

    return orderInfo;
  }

  async findOrderLineInfo(curUser, orderList) {
    let orderIds = [], orderMap = {};
    orderList.forEach(o => {
      orderIds.push(o._id);
      orderMap[o._id] = o;
    });
    let orderLineList = await $ServiceMap.order.BackOrderLineService.find(curUser, orderIds, {populate: 'bucket'});

    orderLineList.forEach(ol => {
      if (!orderMap[ol.deliveryOrder]._doc.orderLine) {
        orderMap[ol.deliveryOrder]._doc.orderLine = [];
      }
      orderMap[ol.deliveryOrder]._doc.orderLine.push(ol);
    });

    return orderList;
  }

  async findOrderAndLine(curUser, id, option) {
    let orderMap = {};
    let orderInfo = await this.findById(curUser, id, option);
    let orderLineList = await $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: id}, {populate: 'bucket'}) || [];
    orderMap.order = orderInfo;
    let balanceOrderList = await $ServiceMap.order.BalanceOrderService.find(curUser, {backOrder: id}, {populate: 'bucket'}) || [];

    orderMap[orderInfo.type] = [];
    [...orderLineList, ...balanceOrderList].forEach(ol => {
      if (!orderMap[ol.bucket && ol.bucket.type || ol.bucketType]) {
        orderMap[ol.bucket && ol.bucket.type || ol.bucketType] = [];
      }
      orderMap[ol.bucket && ol.bucket.type || ol.bucketType].push(ol);
    });
    return orderMap;
  }

  async getBackOrder(curUser, id) {
    let populate = 'customer shipTo factory supplier images ';
    let order = await this.findById(curUser, id, {populate});
    let orderLineList = await $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: id}, {populate: 'bucket'});
    let balanceOrderList = await $ServiceMap.order.BalanceOrderService.find(curUser, {backOrder: id}, {populate: ''});

    return {order, orderLine: orderLineList, balanceOrder: balanceOrderList};
  }

  async sendNotice(curUser, orderId, body) {
    //发送通知

    //修改订单状态
    await $ServiceMap.order.BackOrderService.updateById(curUser, orderId, Object.assign({status: 'delivery'}, body));
    let backOrderLineInfo = await $ServiceMap.order.BackOrderLineService.find(curUser, {backOrder: orderId}, {fields: 'bucket'});
    let bucketIds = [];
    backOrderLineInfo.forEach(ol => bucketIds.push(ol.bucket));

    await $ServiceMap.order.BackOrderLineService.updateMany(curUser, {backOrder: orderId}, {status: 'delivery'});
    await $ServiceMap.order.BucketService.updateMany(curUser, {_id: {$in: bucketIds}}, {status: 'backing'});

    return {};
  }

  async resendNotice(curUser, orderId, body) {
    //发送通知

    //修改订单状态
    await $ServiceMap.order.BackOrderService.updateById(curUser, orderId, {$push: {email: body.email}});

    return {};
  }

  async removeImg(curUser, images, orderId, imgId) {
    let data = await this.updateById(curUser, orderId, {images});
    await $ServiceMap.system.tool.FileService.removeById(curUser, imgId);
    return {data};
  }

  async missForm(curUser, orderId, body) {
    let {missPadding, missForm} = body;

    if (missForm.number === missPadding.number) {
      await $ServiceMap.order.BalanceOrderService.updateById(curUser, missPadding._id, missForm);
    } else {
      await $ServiceMap.order.BalanceOrderService.updateOne(curUser, {
        backOrder: missForm.backOrder,
        type: missForm.type,
        bucketType: missForm.bucketType,
        factory: missForm.factory
      }, {$inc: {number: missForm.number}}).then(async data => {
        if (data.n === 0) {
          await $ServiceMap.order.BalanceOrderService.save(curUser, missForm);
        }
      });
      await $ServiceMap.order.BalanceOrderService.updateById(curUser, missPadding._id, {$inc: {number: missForm.number * -1}});
    }

    return {};
  };
}

module.exports = new BackOrderService();


