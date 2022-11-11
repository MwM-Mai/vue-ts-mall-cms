<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="pageModalRef"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'

import { ElTree } from 'element-plus'
import PageContent from '../../../../components/page-content'
import PageSearch from '../../../../components/page-search'
import PageModal from '../../../../components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '../../../../hooks/use-modal'

import { getMenuLeafKeys } from '../../../../utils/map-menus'

export default defineComponent({
  name: 'roleView',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    const editCallback = (item: any) => {
      const letfKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value.setCheckedKeys(letfKeys, false)
      })
    }

    const [defaultInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()

    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})

    // 处理树状控件的勾选
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,

      defaultInfo,

      menus,
      otherInfo,

      pageModalRef,
      elTreeRef,

      handleNewData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 30px;
}
</style>
