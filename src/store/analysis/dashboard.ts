import { Module } from 'vuex'

import { IRootState } from './../type'
import { IDashboardState } from './types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/network/mian/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsfavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  actions: {
    async getDashboardDataActions({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      // console.log(categoryCountResult)
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      // console.log(categorySaleResult)
      commit('changeCategoryGoodsSale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      // console.log(categoryFavorResult)
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      const addressSaleResult = await getAddressGoodsSale()
      // console.log(addressSaleResult)
      commit('changeaddressSale', addressSaleResult.data)
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsfavor = list
    },
    changeaddressSale(state, list) {
      state.addressGoodsSale = list
    }
  }
}

export default dashboardModule
