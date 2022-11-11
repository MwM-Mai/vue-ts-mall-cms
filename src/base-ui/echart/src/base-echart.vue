<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

// 导入 echarts
// import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义props withDefaults()方法是默认值 defineProps()方法是定义props
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

// 初始化 echarts
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less">
</style>
