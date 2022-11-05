import { ElMessage } from 'element-plus'
import router from './index'
import { t } from '@/plugins/i18n'

// 引入在axios暴露出的clearPending函数
import { clearPending } from '@/utils/http/request'

import useUserStore from '@/store/modules/user'

router.beforeEach((to, from, next) => {
  clearPending() // 在跳转路由之前,先清除所有的请求
  document.title = to.meta.title as string
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // ✅ 这样做是可行的,因为路由器在安装完之后就会开始导航。
    // Pinia 也将被安装
    const store = useUserStore()
    if (!store.token || store.expires < Math.round(new Date().getTime())) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      })
      store.token = ''
      store.expires = 0
      ElMessage.error(t('message.token'))
    }
    else {
      next()
    }
    // next();
  }
  else {
    next() // 确保一定要调用 next()
  }
})
