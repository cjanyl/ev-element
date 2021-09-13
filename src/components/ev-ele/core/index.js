
'use strict';
import EvBoolean from "./Ev-boolean";
import directive from "./directive/Ev-directive";

export default {
  install: function(Vue){
    Vue.component('ev-boolean',EvBoolean);
    directive.forEach(d => Vue.directive(d.name, d.options));
  }
}

