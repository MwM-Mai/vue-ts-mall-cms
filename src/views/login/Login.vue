<template>
  <!-- 背景区域 -->
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  name: 'loginView',
  components: {
    LoginPanel
  }
})
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/login-bg.svg');
}
</style>
