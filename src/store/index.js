import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'
// import VuexPersist from 'vuex-persist';
// const vuexLocal = new VuexPersist({
//   storage: window.sessionStorage  // 可选，sessionStorage/indexDB
// })

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
  },
  getters,
  // plugins: [vuexLocal.plugin]
})

export default store
