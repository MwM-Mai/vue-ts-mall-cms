// network 统一出口

import MWMRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const mwmRequest = new MWMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器 每个实例对象的拦截器内容可能不一样 所以 当作参数传给 MWMRquest
  // 由于 参数的类型是 AxiosRequestConfig 类型 里面并没有 interceptors 所以需要在 request文件的index.ts 定义接口重新声明类型
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('某个实例对象的请求拦截器,请求成功')
      return config
    },
    requestInterceptorCatch: (error) => {
      // console.log('某个实例对象的请求拦截器,请求失败')
      return error
    },
    responseInterceptor: (res) => {
      // console.log('某个实例对象的响应拦截器,响应成功')
      return res
    },
    responseInterceptorCatch: (error) => {
      // console.log('某个实例对象的响应拦截器,响应失败')
      return error
    }
  }
})

export default mwmRequest
