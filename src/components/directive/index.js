import dialogDrag from './dialogDrag'
// 自定义指令
const directives = {
  dialogDrag
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}