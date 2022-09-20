import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
// import './network/axios-demo'

import 'normalize.css'
import './assets/css/index.less'

import installElementPlus from './plugins/element'

import mwmRequest from './network'

const app = createApp(App)

installElementPlus(app)

app.use(store).use(router).mount('#app')

// console.log(process.env)

// mwmRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('同一个实例不同的单独请求')
//       return config
//     },
//     responseInterceptor: (config) => {
//       console.log('同一个实例不同的单独响应')

//       return config
//     }
//   }
// })

// interface DateType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// mwmRequest.request<DateType>({
//   url: '/home/multidata',
//   method: 'GET',
//   isShowLoading: false
// })
