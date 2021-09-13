
'use strict';
import evForm from './Ev-form.vue'
import evFormDialog from './Ev-form-dialog.vue'
import evFormItem from './Ev-form-item.vue'

// 这里是重点
const EvFormIndex = {
  install: function(Vue){
    Vue.component('ev-form-item',evFormItem);
    Vue.component('ev-form',evForm);
    Vue.component('ev-form-dialog',evFormDialog);
  }
}

// 导出组件
export default EvFormIndex
