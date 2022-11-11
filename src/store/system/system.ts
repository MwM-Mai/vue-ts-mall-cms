import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from './../type'

import {
  getPageListData,
  deletePageDataById,
  createPageData,
  editPageData
} from '@/network/mian/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },

    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },

    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },

    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },

    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    // 获取系统管理区域的所有数据
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName
      // const pageUrl = `${pageName}/list`
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = 'users/list'
          break
        case 'role':
          pageUrl = 'role/list'
          break
        case 'goods':
          pageUrl = 'goods/list'
          break
        case 'menu':
          pageUrl = 'menu/list'
      }

      // 获取 页面的数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 将数据存储到state中
      const { list, totalCount } = pageResult.data
      commit(
        `change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`,
        list
      )
      commit(
        `change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}Count`,
        totalCount
      )
    },

    // 删除操作
    async deletePageDataAction(context, payload: any) {
      // 1. 获取paheName和id

      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2. 调用删除网络请求
      await deletePageDataById(pageUrl)

      // 3.重新请求数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建数据
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}/`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
