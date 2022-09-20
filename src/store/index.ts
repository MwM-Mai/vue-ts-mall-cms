import { createStore } from 'vuex'

// 接口类型
import { IRootState } from './type'

// 导入模块
import login from './login/login'

export default createStore<IRootState>({
  state: () => {
    return {}
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { login }
})
