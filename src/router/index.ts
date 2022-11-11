import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue')
    // children:[] -> 根据userMenus来决定 children
  },
  // 输入不存在的路径自动跳转到 not-fount 页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-fount/not-fount.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    // console.log(token)
    if (!token) {
      return '/login'
    }
  }

  // 判断路径是否为 mian 如果是 默认打开 二级菜单的第一个子菜单
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
