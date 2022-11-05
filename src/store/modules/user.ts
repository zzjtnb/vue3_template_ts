import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const user = JSON.parse(localStorage.getItem('user') || '{}')

export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    locale: user.locale ?? navigator.language,
    token: user.token ?? null,
    expires: 0,
    name: '',
    list: [],
  }),
  getters: {
    getToken(): any {
      return `Bearer ${this.token}`
    },
  },
  actions: {
    TOGGLE_NAME(name: string) {
      this.name = name
      ElMessage.info(name)
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        /* default:store.$id */
        // key: 'user',

        /* default:sessionStorage */
        storage: localStorage,

        /**
         * [] means no state is persisted
         * undefined or null means the whole state is persisted
         */
        paths: ['locale', 'token'],
      },
    ],
  },
})
export default useUserStore
// Need to be used outside the setup
// 这里的pinia 即为通过createPinia()生成并在入口处传递给app实例的pinia实例,在此手动注入并暴露
// import {pinia} from '@/store';
// export function useUserStoreHook() {
//   return useUserStore(pinia);
// }
