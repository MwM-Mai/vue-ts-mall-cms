export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: string
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}
