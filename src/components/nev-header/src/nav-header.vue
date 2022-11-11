<template>
  <div class="nav-header">
    <el-icon @click="handleFoldclick" v-if="isFlod" class="fold"
      ><Expand
    /></el-icon>
    <el-icon v-else class="fold" @click="handleFoldclick"><Fold /></el-icon>
    <div class="content">
      <!-- 面包屑 -->
      <div>
        <mwm-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <!-- 用户信息 -->
      <div class="use-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              :size="15"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span>{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExitClick"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item divided>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '../../../store'
import { useRoute, useRouter } from 'vue-router'

import MwmBreadcrumb, { IBreadcrumb } from '../../../base-ui/breadcrumb'
import { pathMapBreadcrumb } from '../../../utils/map-menus'
import LocalCache from '../../../utils/cache'

export default defineComponent({
  name: 'navHeaderView',
  emits: ['foldChange'],
  components: {
    MwmBreadcrumb
  },
  setup(props, { emit }) {
    const isFlod = ref(false)

    const store = useStore()
    const router = useRouter()

    const name = computed(() => {
      return store.state.login.userInfo.name
    })

    // 面包屑的数据： [{name, path},{}] (响应式)

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumb(userMenus, currentPath)
    })

    // 点击切换图标
    const handleFoldclick = () => {
      isFlod.value = !isFlod.value
      emit('foldChange', isFlod.value)
    }

    // 退出登录
    const handleExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/login')
    }

    return {
      isFlod,
      name,
      breadcrumbs,
      handleFoldclick,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    font-size: 20px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
