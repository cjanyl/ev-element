'use strict';

//配置信息
import plugin from "./common/common";
import API from "@/components/common/apiConfig";

const contextPath = '/ev-ele-manager'; // 启动时自动生成，无需手工配置
const apiPath = '/ev-ele-api'; // 启动时自动生成，无需手工配置
const publicPath = '/ev-ele-api/uploadFiles'; // 启动时自动生成，无需手工配置
//---------------------------------------------------

function formatApi(API){
  let _format = (API, parents) => {
    for(let key in API){
      if(key === '@extend'){
        let basePath = '/' + parents.join('/');
        if(API[key] === 'list'){
          API['list'] = basePath + '/list';
          API['remove'] = basePath + '/remove';
        }else if(API[key] === 'tree'){
          API['tree'] = basePath + '/tree';
          API['getChildrenLength'] = basePath + '/getChildrenLength/{id}';
        }
        API['find'] = basePath + '/find';
        API['removeOne'] = basePath + '/remove/{id}';
        API['save'] = basePath + '/save/{id}';
        API['detail'] = basePath + '/detail/{id}';

        delete API[key];
      }else{
        if(typeof API[key] === 'string'){
          if(/^@/.test(API[key])){
            API[key] = '/' + parents.join('/') + API[key].replace('@', '');
          }
        } else {
          let _parents = parents.concat([key]);
          _format(API[key], _parents);
        }
      }
    }
  };

  _format(API, []);

  return API;
}

export default {
  install(Vue){
    Vue.prototype.$common = plugin;
    Vue.prototype.$api = formatApi(API);

    Vue.prototype.$EvCore.path.contextPath = contextPath;
    Vue.prototype.$EvCore.path.apiPath = apiPath;
    Vue.prototype.$EvCore.path.publicPath = publicPath;
  }
};
