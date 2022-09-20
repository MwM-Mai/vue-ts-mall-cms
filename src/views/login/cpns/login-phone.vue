<template>
  <div>
    <el-form ref="refForm" label-width="80px" :rules="rules" :model="mobile">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="mobile.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="verification">
        <div class="verification-container">
          <el-input v-model="mobile.verification" autocomplete="off" />
          <el-button class="get-verification" type="primary"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/account-phone'

export default defineComponent({
  setup() {
    // 手机登录
    const mobile = reactive({
      phone: '',
      verification: ''
    })

    // 表单的元素
    const refForm = ref<InstanceType<typeof ElForm>>()

    // 使用 vuex
    const store = useStore()

    // 点击立即登录(手机登录)
    const phoneAction = () => {
      refForm.value?.validate((valid: boolean) => {
        store.dispatch('login/phoneLoginAction')
      })
    }

    return {
      // 手机信息
      mobile,
      rules,
      refForm,

      phoneAction
    }
  }
})
</script>

<style scoped lang="less">
.verification-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .get-verification {
    margin-left: 5px;
  }
}
</style>
