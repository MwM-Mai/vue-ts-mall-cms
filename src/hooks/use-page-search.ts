import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  // <InstanceType<typeof PageContent>> 获取到某个构造函数实例的类型
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  return [pageContentRef, handleQueryClick, handleResetClick]
}
