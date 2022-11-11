import { createStore, Store, useStore as useVuexStore } from 'vuex'

// 接口类型
import { IRootState, IStoreType } from './type'

import { getPageListData } from '@/network/mian/system/system'

// 导入模块
import login from './login/login'
import system from './system/system'
import dashboard from './analysis/dashboard'

const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }, payload) {
      // 1. 获取部门/角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })

      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })

      const { list: roleList } = roleResult.data

      // 2. 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)

      // 获取角色管理权限数据
      const menuResult = await getPageListData('/menu/list', {})

      const { list: menuList } = menuResult.data

      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 自己封装一个useStore来解决vuex和tyscript兼容性差问题
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
