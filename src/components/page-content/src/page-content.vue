<template>
  <div class="page-content">
    <mwm-table
      :userList="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #handlerHandler>
        <el-button
          v-if="isCreate"
          @click="handlerNewClick"
          size="medium"
          type="primary"
          >新建数据</el-button
        >
        <el-button icon="el-icon-refresh" size="medium"></el-button>
      </template>

      <!-- 列中的插槽 -->

      <!-- 创建日期的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <!-- 修改日期的插槽 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 处理某一行数据的插槽 -->
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中插入不是公共部分剩余的插槽 -->

      <!-- #[item.slotName]="scope" 是对应 mwm-table 组件中的 插槽 获取具体某个插槽的数据 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 判断是否有插槽 -->
        <template v-if="item.slotName">
          <!-- 作用域插槽 -->
          <slot :name="item.slotName" :row="scope.row"> </slot>
        </template>
      </template>
    </mwm-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

import MwmTable from '../../../base-ui/table'

import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    MwmTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    // 1. 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听双向绑定的pageInfo的值 发起网络请求
    watch(pageInfo, () => getPageData())

    // 2. 发起网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 3. 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 4. 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (
          item.slotName !== 'createAt' &&
          item.slotName !== 'updateAt' &&
          item.slotName !== 'handler'
        ) {
          return true
        }
      }
    )

    // 5. 删除操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    // 6. 编辑操作
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    // 新增操作
    const handlerNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,

      getPageData,
      handlerNewClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .handler-btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
