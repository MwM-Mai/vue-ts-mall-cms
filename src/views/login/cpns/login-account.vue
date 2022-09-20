<template>
  <div class="login-account">
    <!-- 账号登录区域 -->
    <el-form ref="formRef" label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="account.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import localCache from '../../../utils/cache'

export default defineComponent({
  setup() {
    // 使用 stroe
    const stroe = useStore()

    // 双向绑定数据
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 表单的ref
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 登录操作
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          // 执行登录逻辑
          // 1.判断是否需要记录密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          stroe.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      // 验证规则
      rules,
      formRef,
      // 登录操作
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
</style>
