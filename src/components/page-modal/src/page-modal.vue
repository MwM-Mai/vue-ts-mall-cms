<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <mwm-form v-bind="modalConfig" v-model="fromData"></mwm-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import MwmForm from '../../../base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      defaukt: () => ({})
    }
  },
  components: {
    MwmForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const fromData = ref<any>({})

    const store = useStore()

    // 因为 props.defaultInfo 的值是在点击后变化的 监听值变化 获取最新的值
    // 监听某个数据 所有要用函数
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          fromData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 判断 是新建还是编辑 如果是新建的话 props.defaultInfo 为{}
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...fromData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...fromData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      fromData,

      handleConfirmClick
    }
  }
})
</script>

<style scoped>
</style>
