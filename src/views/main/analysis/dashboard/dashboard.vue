<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <mwm-card title="分类商品数量(饼图)">
          <!-- <base-echart :options="pieOptions"></base-echart> -->
          <pie-echart :pieData="catetgoryGoodsCount"></pie-echart>
        </mwm-card>
      </el-col>
      <el-col :span="10">
        <mwm-card title="不同城市商品销售量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </mwm-card>
      </el-col>
      <el-col :span="7">
        <mwm-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="catetgoryGoodsCount"></rose-echart>
        </mwm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <mwm-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </mwm-card>
      </el-col>
      <el-col :span="12">
        <mwm-card title="商品分类的收藏">
          <bar-Echart v-bind="categoryGoodsfavor"></bar-Echart>
        </mwm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from 'vuex'

import MwmCard from '@/base-ui/card'
// import BaseEchart from '@/base-ui/echart'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboardVies',
  components: {
    MwmCard,
    // BaseEchart,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataActions')

    // 获取数据
    const catetgoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLabels, values }
    })

    const categoryGoodsfavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsfavor = store.state.dashboard.categoryGoodsfavor
      for (const item of categoryGoodsfavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      // options
      catetgoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsfavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
