<template>
  <div class="page-search">
    <mwm-from v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button icon="el-icon-refresh-right" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </mwm-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MwmFrom from '../../../base-ui/form'

export default defineComponent({
  name: 'pageSearchView',
  components: {
    MwmFrom
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的feild决定的
    // 1. 优化一 formData中的属性应该动态来决定的
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    // 这个双向绑定的的属性是死的
    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // })

    const formData = ref(formOriginData)

    // 优化二： 当用户点击重置
    const handleResetClick = () => {
      // 这个是直接修改value 在form组件中的 formData 是通过浅拷贝出来的 所以修改这里的value并不会对浅拷贝的值修改
      // formData.value = formOriginData

      // 因此 需要重置value属性的的所有属性值
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // console.log(formData)
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 优化三 点击搜索查询
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
