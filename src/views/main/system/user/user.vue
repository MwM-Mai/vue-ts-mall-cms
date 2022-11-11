<template>
  <div class="user">
    <!-- 搜索框区域 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>

    <!-- 内容区域 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
      ref="pageContentRef"
    >
      <!-- 状态插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启动' : '禁用' }}
        </el-button>
      </template>
    </page-content>

    <!-- 对话框区域 -->
    <page-modal
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import PageSearch from '../../../../components/page-search'
import PageContent from '../../../../components/page-content'
import PageModal from '../../../../components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '../../../../hooks/use-page-search'
import { usePageModal } from '../../../../hooks/use-modal'

export default defineComponent({
  name: 'userView',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    // 1. pageModal相关的hook逻辑

    // 点击新建时候 显示密码输入框
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    // 点击隐藏的时候不显示 密码输入框
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2. 动态添加部门和角色列表

    // 因为setup API 如同生命周期函数 只执行一次 vuex 数据是异步请求 有可能没有请求下来 store.state.entireDepartment: [] 所有需要 利用可响应式 添加 列表

    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )

      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { label: item.name, value: item.id }
        }
      )

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )

      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { label: item.name, value: item.id }
      })

      return modalConfig
    })

    // 3. 调用hook获取公共的变量和函数
    const [defaultInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,

      pageContentRef,
      pageModalRef,

      defaultInfo,

      handleQueryClick,
      handleResetClick,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less">
</style>
