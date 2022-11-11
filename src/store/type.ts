import { ISystemState } from './system/types'
import { ILoginSate } from './login/type'
import { IDashboardState } from './analysis/types'

export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginSate
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
