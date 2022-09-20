import mwmRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return mwmRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: string) {
  return mwmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    isShowLoading: false
  })
}

export function requestUserMenusByRoleId(id: string) {
  return mwmRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + 'menu',
    isShowLoading: false
  })
}
