import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  // 初始化echarts
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 开启关闭菜单栏时候 可视化图表的变化 可以在点击关闭/点击开启侧边栏后调用函数
  const upDataResize = () => {
    echartInstance.resize()
  }

  // 可视化图表响应式 随着窗口的变化而变化
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    upDataResize
  }
}
