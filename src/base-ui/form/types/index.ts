type IformTyep = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IformTyep
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的熟悉
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
