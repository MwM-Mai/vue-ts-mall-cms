import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { MWMRequestConfig, MWMRequestIntercptors } from './type'

import { ElLoading } from 'element-plus'

import localCache from '@/utils/cache'

class MWMRequest {
  instance: AxiosInstance
  interceptors?: MWMRequestIntercptors
  loading: any
  isShowLoading: boolean

  // 由于 MWMRequestConfig 类型继承 AxiosRequestConfig 所以 可以设置 config 类型为  MWMRequestConfig
  constructor(config: MWMRequestConfig<any>) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.isShowLoading = config.isShowLoading ?? true
    // 保存参数 interceptors
    this.interceptors = config.interceptors

    // 使用拦截器

    // 拦截器逻辑代码 某个实例对象对应的拦截器
    // 设置请求头 请求成功或失败
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 设置响应头 响应成功或者失败
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所以实例对象 的拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //loading 效果
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            Lock: true,
            text: '正在请求数据......',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        // token
        const token = localCache.getCache('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // console.log('所以实例对象相同的请求拦截器,请求成功')
        return config
      },
      (error) => {
        // console.log('所以实例对象相同的请求拦截器,请求失败')
        return error
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        if (this.isShowLoading) {
          // 关闭loading效果
          this.loading.close()
        }

        // console.log('所以实例对象相同的响应拦截器,响应成功')
        return res.data
      },
      (error) => {
        if (this.isShowLoading) {
          // 关闭loading效果
          this.loading.close()
        }

        // console.log('所以实例对象相同的响应拦截器,响应失败')
        return error
      }
    )
  }

  request<T = any>(config: MWMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果 同一个实例不同请求有单独的 请求拦截 对数据处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 单个请求 是否需要显示 loading
      if (config.isShowLoading === false) {
        this.isShowLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果 同一个实例不同有单独的 响应拦截 对数据处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 无论是否显示loading 都需要 改回默认值
          this.isShowLoading = true
          // console.log(res)

          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 无论是否显示loading 都需要 改回默认值
          this.isShowLoading = true
          return err
        })
    })
  }

  get<T = any>(config: MWMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: MWMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MWMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MWMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MWMRequest
