'use strict';

const DirectiveList = [
  {
    name: 'auth',
    options: {
      update(el, binding){
        let vue = window.rootVue;
        const powerInfo = vue
          && vue.$store
          && vue.$store.getters
          && vue.$store.getters.powerInfo;
        if(powerInfo.size && !(powerInfo instanceof Set
          && powerInfo.has(binding.value))
        ){
          el.remove();
        }
      }
    }
  }
];

export default DirectiveList;
