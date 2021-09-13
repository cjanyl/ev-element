'use strict';
import axios from 'axios'

const defaultParam = {
  forceUrl: false,
  showMessage: true,
};

const ajax = function (params) {
  let param = Object.assign({}, defaultParam, params);
  if (!param.forceUrl && !new RegExp(`^${this.$EvCore.path.apiPath}`).test(param.url)) {
    param.url = this.$EvCore.path.apiPath + param.url;
  }
  if (param.pathData) {
    for (let key in param.pathData) {
      param.url = param.url.replace(`{${key}}`, param.pathData[key]);
    }
  }

  let token = this.$store && this.$store.state.token;
  let showLoadingTimeout;
  if (param.loading && typeof this.$store.state.loading === 'boolean') {
    showLoadingTimeout = setTimeout(() => {
      this.$store.commit('setLoading', true);
    }, 500);
  }

  param.headers = Object.assign({
    token: token,
    locale: this.$i18n?this.$i18n.locale:'zh',
  }, param.headers);

  return axios.request(param).then(reData => {
    if (param.loading && this.$store && typeof this.$store.state.loading === 'boolean') {
      if(showLoadingTimeout){
        clearTimeout(showLoadingTimeout);
      }
      this.$store.commit('setLoading', false);
    }
    if (reData.data && reData.data.success) {
      return reData.data;
    } else {
      throw reData.data;
    }
  }).catch(e => {
    if (param.loading && this.$store && typeof this.$store.state.loading === 'boolean') {
      if(showLoadingTimeout){
        clearTimeout(showLoadingTimeout);
      }
      this.$store.commit('setLoading', false);
    }
    if (param.showMessage) {
      // alert(e.message);
      // alert(params.url);
      this ? this.$message.info(e.message) : alert(e.message);
    }
    throw e;
  });
};

export default ajax;
