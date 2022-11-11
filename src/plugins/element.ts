import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubmenu,
  ElDropdown,
  elDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus'

import {
  UserFilled,
  Iphone,
  Expand,
  Fold,
  RefreshRight,
  Search
} from '@element-plus/icons'

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
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElRow,
  ElCol,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDropdown,
  elDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]

// 图标
const IconComponents = [UserFilled, Iphone, Expand, Fold, RefreshRight, Search]

export default (app: any): void => {
  for (const component of components) {
    app.use(component)
  }
  // 注册图标
  for (const IconComponent of IconComponents) {
    app.component(IconComponent.name, IconComponent)
  }
}
