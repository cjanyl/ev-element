/**
 * Created on 9/29/2020, 1:52:18 PM.
 */

'use strict';

const {BaseService} = require('dolphin-framework-server');
const Model = require("../../module/order/DeliveryOrderModel");

class DeliveryOrderService extends BaseService {
  constructor() {
    super();
    this.name = "DeliveryOrderService";
    this.model = Model;
  }

  async findCondition(curUser, condition) {
    if (curUser.role.find(r => r === 'admin') || curUser.role.find(r => r === 'system_admin') || curUser.role.find(r => r === 'cso')) {
      return Object.assign({state: 1}, condition);
    } else {
      return {$and: [Object.assign({state: 1}, condition), {warehouse: curUser.warehouse}]};
    }
  }

  findForPage(curUser, condition, options) {
    return super.findForPage(curUser, condition, options).then(({rows, total}) => {
      let findOrderLinePromise = [];
      rows.forEach(order => {
        let query = $ServiceMap.order.DeliveryOrderLineService.find(curUser, {deliveryOrder: order._id}, {populate: 'deliveryOrder bucket'}).then(orderLine => {
          order._doc.orderLine = orderLine;
          return order;
        });
        findOrderLinePromise.push(query)
      });

      return Promise.all(findOrderLinePromise).then(() => {
        return {rows, total};
      });
    })
  }

  async save(curUser, data = {}) {
    data.orderTime = global.$moment();
    return super.save(curUser, data);
  }

  async orderAndLineList(curUser, condition = {}, options = {}) {
    let list = await super.findForPage(curUser, condition, options);
    let idList = [];
    list.rows.forEach(l => {
      idList.push(l._id)
    })
    let lineList = await $ServiceMap.order.DeliveryOrderLineService.find(curUser, {deliveryOrder: {$in: idList}}) || [];
    list.rows.map(r => {
      r._doc.line = lineList.filter(ll => ll.deliveryOrder === r._id) || [];
    })
    return list;
  }

  //手机端扫码添加订单行
  async addLine(curUser, orderInfo, tag) {
    //如果此标签存在备货中、已发出状态的桶，那禁止备货并提示
    let bucketCondition = {tag, status: {$in: ['picking', 'outing', 'created']}};
    let bucket = await $ServiceMap.order.BucketService.findOne(curUser, bucketCondition, {field: 'tag'});
    if (!bucket) {
      //     throw {message: '该标签号已存在'};
      // }else {
      // throw {message: '该标签号不存在, 请前往添加'};
      let bucketData = {
        tag,
        type: orderInfo.type, //TODO 根据标签规则处理
        status:'picking',

        factory: orderInfo.factory,
        warehouse: orderInfo.warehouse,
        customer: orderInfo.customer,
        shipTo: orderInfo.shipTo,

        supplier: null, //TODO 根据标签规则处理
        lastSendTime: null, //TODO 提交订单时修改
      };
      bucket = await $ServiceMap.order.BucketService.save(curUser, bucketData);
    } else {
      if (bucket.status === 'picking') {
        throw {message: '添加失败，当前桶是备货状态'}
      }
      if (bucket.status === 'outing') {
        throw {message: '添加失败，当前桶是外出状态'}
      }
      bucket = await $ServiceMap.order.BucketService.updateById(curUser, bucket._id, {
        customer: orderInfo.customer,
        shipTo: orderInfo.shipTo,
        status:'picking',
      })
    }


    let deliveryOrderLineData = {
      deliveryOrder: orderInfo._id,
      type: bucket.type,
      bucket: bucket._id,
      status: 'picking',
    };
    await this.updateById(curUser, orderInfo._id, {status: 'picking'});
    return await $ServiceMap.order.DeliveryOrderLineService.save(curUser, deliveryOrderLineData);
  }

  async removeLine(curUser, id) {
    let line = await $ServiceMap.order.DeliveryOrderLineService.findById(curUser, id);
    if (line) {
      await $ServiceMap.order.DeliveryOrderLineService.removeById(curUser, id);
      await $ServiceMap.order.BucketService.removeById(curUser, line.bucket);
      return Promise.resolve({message: '删除成功'});
    } else {
      return Promise.reject({message: '未查询到需删除的订单行'});
    }
  }

  //提交订单
  async submitOrder(curUser, orderId, orderData) {
    await $ServiceMap.order.DeliveryOrderLineService.updateMany(curUser, {deliveryOrder: orderId}, {status: 'outing'});
    let orderLineList = await $ServiceMap.order.DeliveryOrderLineService.find(curUser, {deliveryOrder: orderId}, {fields: 'bucket'});
    let bucketIds = [];
    orderLineList.forEach(ol => bucketIds.push(ol.bucket));

    await $ServiceMap.order.BucketService.updateMany(curUser, {_id: {$in: bucketIds}}, {
      status: 'outing',
      lastSendTime: new Date()
    });
    let updateOrderData = Object.assign({status: 'outing'}, orderData);
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
    let orderLineList = await $ServiceMap.order.DeliveryOrderLineService.find(curUser, orderIds, {populate: 'bucket'});

    orderLineList.forEach(ol => {
      if (!orderMap[ol.deliveryOrder]._doc[ol.type]) {
        orderMap[ol.deliveryOrder]._doc['recycle'] = [];
        orderMap[ol.deliveryOrder]._doc['foldable'] = [];
      }
      orderMap[ol.deliveryOrder]._doc[ol.type].push(ol);
    });

    return orderList;
  }

  async findOrderAndLine(curUser, id, option) {
    let orderMap = {};
    let orderInfo = await this.findById(curUser, id, option);
    let orderLineList = await $ServiceMap.order.DeliveryOrderLineService.find(curUser, {deliveryOrder: id}, {populate: 'bucket'});
    orderMap.order = orderInfo;

    orderMap['recycle'] = [];
    orderMap['foldable'] = [];
    orderLineList.forEach(ol => {
      if (!orderMap[ol.type]) {
        orderMap[ol.type] = [];
      }
      orderMap[ol.type].push(ol);
    });
    return orderMap;
  }
}

module.exports = new DeliveryOrderService();


