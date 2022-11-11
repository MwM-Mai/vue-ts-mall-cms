import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  // 定义一个全局属性 格式化时间 可以在任意地方用到
  app.config.globalProperties.$filters = {
    // 格式化时间
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
