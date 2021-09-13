/**
 * Created on 2020-10-23 5:48:13 ├F10: PM┤.
 */

'use strict';
const {BaseListRouter} = require('dolphin-framework-server');
const service = require("../../service/count/factoryBucketCountService");

class FactoryBucketCountRouter extends BaseListRouter {
  constructor() {
    super();
    this.name = 'FactoryBucketCount';
    this.service = service;
    this.routerMap.post.push('statistics')

    this.commonPopulate = 'factory ';
  }

  statistics(req) {
    return this.service.statistics(req.curUser);
  }
}

module.exports = new FactoryBucketCountRouter().__getRouter();
