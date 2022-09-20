import axios from 'axios'

// axios的实例对象
axios.create({
  baseURL: 'http://123.207.32.32:8000/home/multidate',
  timeout: 2000
})
