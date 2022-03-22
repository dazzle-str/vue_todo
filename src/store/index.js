import Vue from 'vue'
import Vuex from 'vuex'
import cloudbase from '@cloudbase/js-sdk'

Vue.use(Vuex)

const app = cloudbase.init({
  env: 'todo-cloudbase-6gckd6o70bc11317',
  region: 'ap-guangzhou'
})

export default new Vuex.Store({
  state: {
    app
  }
})
