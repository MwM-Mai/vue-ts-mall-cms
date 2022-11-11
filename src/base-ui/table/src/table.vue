<template>
  <div class="mwm-table">
    <!-- 页头 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="handlerHandler"> </slot>
        </div>
      </slot>
    </div>

    <!--  -->
    <el-table
      :data="userList"
      border
      v-bind="childrenProps"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        show-overflow-tooltip
        type="selection"
        align="center"
        label="label"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        show-overflow-tooltip
        type="index"
        label="序号"
        align="center"
        width="60"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          :prop="propItem.prop"
          show-overflow-tooltip
          :label="propItem.label"
          :min-width="propItem.minWidth"
          align="center"
        >
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">
              {{ row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[1, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MwmTableView',
  props: {
    userList: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      // console.log(pageSize)
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      // console.log(currentPage)
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px 5px 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
