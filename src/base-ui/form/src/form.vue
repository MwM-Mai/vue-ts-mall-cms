<template>
  <div class="mwm-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form ref="form" :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout" v-for="item in formItems" :key="item.label">
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handelValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                style="width: 80%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handelValueChange($event, item.field)"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                type="date"
                :placeholder="item.placeholder"
                style="width: 80%"
                v-bind="item.otherOptions"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handelValueChange($event, item.field)"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  name: 'fromView',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // 屏幕大于1920px 显示4个
        lg: 8, //
        md: 12, //
        sm: 24, //
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 浅拷贝 父组件传过来的值 在组件修改的是 浅拷贝的值 并不会违法单项数据流
    // 但是在点击重置的时候 修改的并不是浅拷贝的这个地址 所以在点击重置的时候要修改value属性的某一个属性值 并不是修改value
    // const formData = ref({ ...props.modelValue })

    // // 监听 formData 数据变化 发送事件 传给父组件
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //     console.log(formData.value)
    //   },
    //   //{deep: true} 深度监听
    //   { deep: true }
    // )

    const handelValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      // formData
      handelValueChange
    }
  }
})
</script>

<style scoped lang='less'>
.mwm-form {
  padding-top: 22px;
}
</style>


