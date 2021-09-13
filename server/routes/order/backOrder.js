/**
 * Created on 9/29/2020, 10:52:15 AM.
 */

'use strict';
const {BaseListRouter, ReqUtil} = require('dolphin-framework-server');
const service = require("../../service/order/BackOrderService");
const path = require("path");

class BackOrderRouter extends BaseListRouter {
  constructor() {
    super();
    this.name = 'BackOrder';
    this.service = service;

    this.commonPopulate = 'customer shipTo factory supplier images ';

    this.routerMap.post.push('removeImg','saveImg','resendNotice_$id','missForm_$id','sendNotice_$id', 'orderAndLineList', 'addLine', 'submitOrder_$id', 'findWithOrderLine', 'findPageWithOrderLine', 'removeLine', 'findOrderAndLine');
    this.routerMap.get.push('getBackOrder_$id', 'findByIdWithOrderLine_$id');
  }

  async orderAndLineList(req) {
    let {curUser, query, body} = req;
    return this.formatCondition(curUser, body, 'list').then(body => {
      let condition = ReqUtil.formatCondition(body);

      let sort = undefined;
      if (query['sortField'] && query['sortOrder']) {
        sort = {};
        sort[query['sortField']] = query['sortOrder'] === 'ascend' ? 1 : -1;
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

  async getBackOrder_$id(req) {
    let {curUser, params} = req;
    let {id} = params;

    return {data: await this.service.getBackOrder(curUser, id)};
  }

  sendNotice_$id(req) {
    let {curUser, params, body} = req;
    let {id} = params;

    return this.service.sendNotice(curUser, id, body);
  }
  resendNotice_$id(req) {
    let {curUser, params, body} = req;
    let {id} = params;

    return this.service.resendNotice(curUser, id, body);
  }
  missForm_$id(req) {
    let {curUser, params, body} = req;
    let {id} = params;

    return this.service.missForm(curUser, id, body);
  }

  async saveImg(req, res, next){
    let id = req.query.id;
    let {fields, files, basePath} = await this.parseFile(req, res, next);
    let data = {}, file;
    file = files.media;

    data.name = file.name;
    data.filePath = basePath + '/'+ path.basename(file.path);
    data.fileSize = file.size;
    data.fileType = file.type;
    data.type = req.query.type;
    data.lastModifiedDate = file.lastModifiedDate;

    data = await $ServiceMap.system.tool.FileService.save(req.curUser, data);
    let backOrder = await this.service.findById(req.curUser, id, {fields:{images: 1}});
    let images = backOrder.images || [];
    data = this.service.updateById(req.curUser, id, {images:[...images,data._id]});
    return {data};
  }

  removeImg(req){
    let {images, orderId, imgId} = req.body;
    return this.service.removeImg(req.curUser, images, orderId, imgId);
  }
}

module.exports = new BackOrderRouter().__getRouter();
