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
        xl: 6, // ????????????1920px ??????4???
        lg: 8, //
        md: 12, //
        sm: 24, //
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // ????????? ???????????????????????? ????????????????????? ??????????????? ??????????????????????????????
    // ?????????????????????????????? ?????????????????????????????????????????? ???????????????????????????????????????value??????????????????????????? ???????????????value
    // const formData = ref({ ...props.modelValue })

    // // ?????? formData ???????????? ???????????? ???????????????
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //     console.log(formData.value)
    //   },
    //   //{deep: true} ????????????
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


