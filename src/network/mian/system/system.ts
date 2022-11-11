import mwmRequest from '@/network'

import { IDataType } from '@/network/login/type'

// 获取 角色管理的数据
export function getPageListData(url: string, queryInfo: any) {
  return mwmRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除数据
export function deletePageDataById(url: string) {
  return mwmRequest.delete<IDataType>({
    url: url
  })
}

// 新增数据

export function createPageData(url: string, newData: any) {
  return mwmRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑数据
export function editPageData(url: string, editData: any) {
  return mwmRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
