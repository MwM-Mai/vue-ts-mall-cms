<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="" class="img" />
      <span class="title" v-if="!collapse">Vue3+Ts</span>
    </div>
    <!-- 菜单区域 -->
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="defaultValue"
          class="el-menu-vertical"
          background-color="#0c2135"
          text-color="#b7bdc3"
          active-text-color="#0a60bd"
          unique-opened
          :collapse="collapse"
        >
          <div v-for="item in userMenus" :key="item.id">
            <!-- 二级菜单 -->
            <div v-if="item.type === 1">
              <!-- 二级菜单展开的标题 -->
              <el-submenu :index="item.url">
                <template #title>
                  <i v-if="item.icon" :class="item.icon"></i>
                  <span v-if="!collapse">{{ item.name }}</span>
                </template>
                <!-- 遍历里面的Item -->
                <el-menu-item
                  v-for="subItem in item.children"
                  :key="subItem.id"
                  :index="subItem.url"
                  @click="handleMenuItemClick(subItem)"
                >
                  <i v-if="subItem.icon" :class="subItem.icon"></i>
                  <span>{{ subItem.name }}</span>
                </el-menu-item>
              </el-submenu>
            </div>
            <!-- 一级菜单 -->
            <div v-else-if="item.type === 2">
              <el-menu-item :index="item.url">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useStore } from '../../../store'

// import LocalCache from '@/utils/cache'
import { pathMapToMenu } from '../../../utils/map-menus'

export default defineComponent({
  name: 'navMenuView',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    // 菜单列表数据
    const userMenus = computed(() => store.state.login.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    // 默认打开的菜单
    // 当前二级菜单的子菜单高亮 实现方案 1
    // const defaultValue = ref(LocalCache.getCache('routePath'))

    // 当前二级菜单的子菜单高亮 实现方案 2
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.url)

    // 点击路由跳转
    const handleMenuItemClick = (item: any) => {
      router.push(item.url ?? '')
      // LocalCache.setCache('routePath', item.url) // 当前二级菜单的子菜单高亮 实现方案1
      // defaultValue.value = LocalCache.getCache('routePath') // 当前二级菜单的子菜单高亮 实现方案1
    }
    return {
      userMenus,
      defaultValue,

      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 15px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.el-icon-arrow-right:before {
  content: none;
}
</style>
