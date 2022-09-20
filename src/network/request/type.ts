import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 给 interceptors 参数 定义接口
export interface MWMRequestIntercptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 定义接口 继承 AxiosRequestConfig 扩展类型
export interface MWMRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  // 给 interceptors 设置类型
  interceptors?: MWMRequestIntercptors<T>
  isShowLoading?: boolean
}
