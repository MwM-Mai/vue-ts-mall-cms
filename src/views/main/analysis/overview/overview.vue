<template>
  <div class="overview">
    <h2>overview</h2>
    <div class="iaa">
      <img
        src="https://tse3-mm.cn.bing.net/th/id/OIP-C.nagH2-m_TdHDYwzkPE2L-gHaKi?w=129&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overviewView',
  setup() {
    document.onkeydown = (e: any) => {
      console.log(e.key)
    }
    return {}
  }
})
</script>

<style scoped lang="less">
.iaa {
  width: 600px;
  height: 900px;
  border: 1px solid red;

  img {
    width: 100%;
    height: 100%;
    // background-position: center;
    object-fit: cover;
    // background-size: cover;
  }
}
</style>
