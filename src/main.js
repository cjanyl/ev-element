import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import i18n from './i18n'

// 个人组件
import EvEle from './components/ev-ele'
import EvCore from './components/ev-core'
Vue.use(EvEle);
Vue.use(EvCore);
import Directive from './components/directive'
Vue.use(Directive);

//common js
import config from './components/config'
Vue.use(config);

Vue.config.productionTip = false

window.$Ev = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
