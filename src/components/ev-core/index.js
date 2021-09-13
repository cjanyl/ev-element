
'use strict';

import core from './core/Ev-core'
import ajax from './ajax/Ev-ajax'

export default {
  install(Vue) {
    Vue.prototype.$EvCore = core;
    Vue.prototype.$ajax = ajax;
  }
}
