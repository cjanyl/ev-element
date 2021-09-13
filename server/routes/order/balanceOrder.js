/**
 * Created on 9/29/2020, 10:52:46 AM.
 */

'use strict';
const {BaseListRouter} = require('dolphin-framework-server');
const service = require("../../service/order/BalanceOrderService");

class BalanceOrderRouter extends BaseListRouter {
  constructor() {
    super();
    this.name = 'BalanceOrder';
    this.service = service;

    this.commonPopulate = 'backOrder customer shipTo factory ';

    this.routerMap.post.push('updateBalanceOrder');
  }

  async updateBalanceOrder(req) {
    let {curUser, body} = req;
    if (Number(body.number) === 0) {
      await this.service.removeOne(curUser, {
        bucketType: body.bucketType,
        backOrder: body.backOrder._id,
        type: body.type
      })
    } else {
      let updateOneData = await this.service.updateOne(curUser, {
        bucketType: body.bucketType,
        backOrder: body.backOrder._id,
        type: body.type
      }, body);
      if (updateOneData.n === 0) {
        await this.service.save(curUser, {
          ...body,
          backOrder: body.backOrder._id,
          customer: body.backOrder.customer && (body.backOrder.customer._id || body.backOrder.customer),
          shipTo: body.backOrder.shipTo && (body.backOrder.shipTo._id || body.shipTo.customer),
          factory: body.backOrder.factory && (body.backOrder.factory._id || body.factory.customer),
        });
      }
    }
    return {message: '成功'};
  }
}

module.exports = new BalanceOrderRouter().__getRouter();
