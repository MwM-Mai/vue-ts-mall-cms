<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.name"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IBreadcrumb } from '../types'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  name: 'breadcrumbView',
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>
