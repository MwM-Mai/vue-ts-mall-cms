import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/login/login'
import localCache from '@/utils/cache'
import { mapMenusRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

// 模块login接口类型
import { ILoginSate } from './type'
// 根state的接口类型
import { IRootState } from '../type'
// 登录网络请求的类型
import { IAccount } from '@/network/login/type'

const loginMudule: Module<ILoginSate, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },

    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },

    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus 映射到 routes 里面 来生成 动态路由
      const routes = mapMenusRoutes(state.userMenus)
      // console.log(routes)

      // 将 routes 添加到 router.main.children
      // 动态添加路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      // console.log(permissions)

      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 请求用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 请求用户菜单
      const userMenusReslut = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusReslut.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')

      // 发送初始化请求(完整的role/department)
      // dispatch('getInitialDataAction', null, { root: true })
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    },

    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction')
    }
  },
  getters: {}
}

export default loginMudule
