import { IBreadcrumb } from './../base-ui/breadcrumb/types/index'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

// 动态路由
export function mapMenusRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 先去加载默认所有的toutes
  const allRoutes: RouteRecordRaw[] = []
  // require.context(某个文件夹, 是否递归查找, 正则表达式(查找匹配到的文件)) 加载某个文件夹
  const routesFiles = require.context('../router/main', true, /\.ts/) // 在 main 文件夹里面 匹配所有以.ts结尾的文件
  // routesFiles.keys() 所有文件的路径
  routesFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // console.log(allRoutes)

  // 2. 根据菜单获取需要添加的routes
  // 递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 查询 请求过来的数据里面的路由和所有路由是否有相等
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        // 如果有 生成动态路由
        if (route) {
          routes.push(route)
        }
        // 保留第一个路由，打开url为main 的时候 默认打开 第一个子菜单
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 获取当前的路径 实现二级菜单的子菜单高亮功能
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 获取 二级菜单的 面包屑
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })

        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 封装面包屑的函数 通过当前的 route 获取 name/path 和父级的 name/path 通过递归获取
export function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []
  const _recurseGetpermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetpermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetpermission(userMenus)

  return permission
}

// 递归函数 编辑时处理渲染树状控件的选中状态
export function getMenuLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  // 递归函数
  const _recurseGetLeft = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeft(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeft(menuList)

  return leftKeys
}

export { firstMenu }
