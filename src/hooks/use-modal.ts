import { ref } from 'vue'

import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  // 处理新建数据
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }

  // 处理修改数据
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }

  return [defaultInfo, pageModalRef, handleNewData, handleEditData]
}
