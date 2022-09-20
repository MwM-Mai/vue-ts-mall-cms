<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 登录区域 -->
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTabs">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <!-- 账号登录组件 -->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <!-- 手机登录组件 -->
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  setup() {
    // 是否记住密码
    const isKeepPassword = ref(true)

    // 用户登录的元素组件 <InstanceType<typeof LoginAccount>> 是获取 组件对象的实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    // 当前选中的标签页
    let currentTabs = ref<string>('account')

    // 点击登录
    const handleLoginClick = () => {
      if (currentTabs.value === 'account') {
        // 因为 accountRef = ref 刚刚开始的时候是空的 所以判断是否为空 在执行
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.phoneAction()
      }
    }

    return {
      // 是否记住密码
      isKeepPassword,
      // 用户登录元素
      accountRef,
      // 手机登录
      phoneRef,
      // 选中的标签页
      currentTabs,

      // 处理点击登录
      handleLoginClick
    }
  },
  components: {
    LoginAccount,
    LoginPhone
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
