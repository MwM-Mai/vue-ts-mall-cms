import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/login/login'
import localCache from '@/utils/cache'

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
      token: localCache.getCache('token') ?? '',
      userInfo: localCache.getCache('userInfo') ?? {},
      userMenus: localCache.getCache('userMenus') ?? []
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
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
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
    },

    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction')
    }
  },
  getters: {}
}

export default loginMudule
