import {createPinia} from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export {pinia};

import useCommonStore from './modules/common';
import useUserStore from './modules/user';

// 统一导出useStore方法
export default function useStore() {
  return {
    common: useCommonStore(),
    user: useUserStore(),
  };
}
