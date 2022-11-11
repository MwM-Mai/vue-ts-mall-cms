import mwmRequest from '@/network'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return mwmRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return mwmRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return mwmRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return mwmRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
