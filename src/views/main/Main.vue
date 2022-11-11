<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '50px' : '210px'" ref="">
        <!-- 左侧菜单栏 -->
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <!-- 面包屑 -->
          <nav-header @foldChange="foldeChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nev-header'

export default defineComponent({
  name: 'mainView',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)

    // 修改左侧菜单宽度
    const foldeChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      isCollapse,
      foldeChange
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 48px);
  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 48px !important;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.el-icon-monitor {
  margin-right: 15px;
  .page-info {
    background-color: white;
    border-radius: 5px;
  }
}
</style>
