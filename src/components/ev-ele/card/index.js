
'use strict';
import evCard from './Ev-card.vue'

// 这里是重点
const EvCardIndex = {
  install: function(Vue){
    Vue.component('ev-card',evCard);
  }
}

// 导出组件
export default EvCardIndex
