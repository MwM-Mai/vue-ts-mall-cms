<template>
  <div class="category">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
      <template #oldPrice="scope">
        <span>￥{{ scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>￥{{ scope.row.newPrice }}</span>
      </template>
      <!-- 状态插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启动' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'categoryView',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
