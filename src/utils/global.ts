import useUserStore from '@/store/modules/user'
import { Login } from '@/apis/test'
export default function () {
  const { proxy } = getCurrentInstance() as any
  const store = useUserStore()

  function login() {
    Login().then(({ data }) => {
      if (!data.success) return proxy.$message.error(data.message || '登陆失败')
      store.$patch({ token: data.token })
    })
  }

  return {
    login,
  }
}
