'use strict';

import core from './Ev-core'

export default {
  install(Vue){
    Vue.prototype.$EvCore = core;
  }
};
