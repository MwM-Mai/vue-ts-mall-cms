/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus'

declare module 'element-plus'

// 由于 ts 不识别 .josn 文件 所有要声明 .josn 文件
declare module '*.json' {
  const value: any
  export default value
}
