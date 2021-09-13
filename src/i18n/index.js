'use strict';
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import en from './local/en'
import zh from './local/zh'

const i18n = new VueI18n({
  locale: 'zh',
  messages:{en, zh}
});

export default i18n;
