// 环境变量
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  TIME_OUT = 10000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 10000
} else {
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 10000
}

export { BASE_URL, TIME_OUT }
