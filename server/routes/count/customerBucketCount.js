/**
 * Created on 2020-10-23 1:17:31 ├F10: PM┤.
 */

'use strict';
const {BaseListRouter} = require('dolphin-framework-server');
const service = require("../../service/count/customerBucketCountService");

class CustomerBucketCountRouter extends BaseListRouter {
  constructor() {
    super();
    this.name = 'CustomerBucketCount';
    this.service = service;
    this.routerMap.post.push('statistics')

    this.commonPopulate = 'customer ';
  }

  statistics(req) {
    return this.service.statistics(req.curUser);
  }
}

module.exports = new CustomerBucketCountRouter().__getRouter();
