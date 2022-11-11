import { useStore } from 'vuex'

export function usePermission(
  pageName: string | undefined,
  handleName: string
) {
  const store = useStore()
  const permission = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // console.log(verifyPermission)
  // console.log(store.state)

  return Boolean(permission.find((item: any) => item === verifyPermission))
}
