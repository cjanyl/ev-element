/**
 * Created on 9/29/2020, 1:52:18 PM.
 */

'use strict';
const {BaseListRouter, ReqUtil} = require('dolphin-framework-server');
const service = require("../../service/order/DeliveryOrderService");

class DeliveryOrderRouter extends BaseListRouter {
  constructor() {
    super();
    this.name = 'DeliveryOrder';
    this.service = service;

    this.commonPopulate = 'factory warehouse customer shipTo ';

    this.routerMap.post.push('orderAndLineList','addLine', 'removeLine', 'submitOrder_$id', 'findWithOrderLine', 'findPageWithOrderLine', 'postCount', 'findOrderAndLine');
    this.routerMap.get.push('findByIdWithOrderLine_$id');
  }

  async orderAndLineList(req){
    let { curUser, query, body } = req;
    return this.formatCondition(curUser, body, 'list').then(body => {
      let condition = ReqUtil.formatCondition(body);

      let sort = undefined;
      if(query['sortField'] && query['sortOrder']){
        sort = {};
        sort[query['sortField']] = query['sortOrder'] === 'ascend'?1:-1;
      }

      return this.service.orderAndLineList(curUser, condition, {
        pageSize: query.pageSize,
        pageNumber: query.pageNumber,
        populate: this.listPopulate || this.commonPopulate,
        sort
      });
    });
  }
  //手机端扫码添加订单行
  async addLine(req) {
    let {curUser, body} = req;
    let {orderInfo, tag} = body;

    let data = await this.service.addLine(curUser, orderInfo, tag);
    return {data};
  }

  //删除订单行
  async removeLine(req) {
    let {curUser, body} = req;
    let {id} = body;

    let data = await this.service.removeLine(curUser, id);
    return {data};
  }

  //提交订单
  async submitOrder_$id(req) {
    let {curUser, body, params} = req;
    let {id} = params;

    let data = await this.service.submitOrder(curUser, id, body);
    return {data};
  }

  //各种带订单行的查询方法
  async findWithOrderLine(req) {
    let {curUser, body} = req;
    let condition = ReqUtil.formatCondition(body);

    return {rows: this.service.findWithOrderLine(curUser, condition, {populate: this.commonPopulate})};
  }

  async findPageWithOrderLine(req) {
    let {curUser, body} = req;
    let condition = ReqUtil.formatCondition(body);

    return this.service.findPageWithOrderLine(curUser, condition, {populate: this.commonPopulate});
  }

  async findByIdWithOrderLine_$id(req) {
    let {curUser, params} = req;
    let {id} = params;

    return {rows: this.service.findByIdWithOrderLine(curUser, id, {populate: this.commonPopulate})};
  }

  async findOrderAndLine(req) {
    let {curUser, body} = req;
    let condition = ReqUtil.formatCondition(body);

    return {data: await this.service.findOrderAndLine(curUser, condition.id, {populate: this.commonPopulate})};
  }

  async postCount(req) {
    let {curUser, body} = req;
    let count = await this.service.count(curUser, body);
    return {data: count}
  }
}

module.exports = new DeliveryOrderRouter().__getRouter();
