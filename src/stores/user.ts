//src/store/user.ts
import { useAppStore } from './app';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三',
    };
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰';
    },
  },
  actions: {
    updateName(name:string) {
      this.name = name;
    },
    async login(account:string, pwd:string) {
      account = account.trim()+'b';
      pwd = pwd.trim()+'a';
      // const {data} = await api.login(account, pwd);
      const data={account,pwd}
      this.setData(data); // 调用另一个 action 的方法
      const appStore = useAppStore();
      appStore.setData(data); // 调用 app store 里的 action 方法
      return data;
    },
    setData(data:object) {
      console.log(data);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //自定义key
        key: 'my_user',
        // 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key
        storage: localStorage,
        // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化
        paths: ['name'],
      },
    ],
  },
});