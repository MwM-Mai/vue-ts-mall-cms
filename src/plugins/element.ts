import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
} from 'element-plus'

import { UserFilled, Iphone } from '@element-plus/icons'

// element 组件
const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink
]

// 图标
const IconComponents = [UserFilled, Iphone]

export default (app: any): void => {
  for (const component of components) {
    app.use(component)
  }
  // 注册图标
  for (const IconComponent of IconComponents) {
    app.component(IconComponent.name, IconComponent)
  }
}
