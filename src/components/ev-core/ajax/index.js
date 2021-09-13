'use strict';

import ajax from './Ev-ajax'

export default {
  install(Vue){
    Vue.prototype.$ajax = ajax;
  }
};
