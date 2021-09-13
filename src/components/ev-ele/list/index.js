
'use strict';
import EvList from './Ev-list.vue'
import EvListDialog from './Ev-list-dialog.vue'

export default {
  install: function(Vue){
    Vue.component('ev-list',EvList);
    Vue.component('ev-list-dialog',EvListDialog);
  }
}

