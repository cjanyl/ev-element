'use strict';

import EvList from './list'
import EvButton from "./button";
import EvCard from "./card";
import EvCore from "./core";
import EvForm from "./form";
import dict from './dict/dict'
import moment from 'moment';
import './icon/ev-icon.less'

export default {
  install(Vue){
    Vue.prototype.$dict = dict;
    Vue.prototype.$moment = moment;
    Vue.use(EvCore);
    Vue.use(EvCard);
    Vue.use(EvButton);
    Vue.use(EvForm);
    Vue.use(EvList);
  }
}
