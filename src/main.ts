import { createApp } from 'vue'
import App from './App.vue'

import '@/router/permission' // permission control
import '@/assets/styles/scss/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
// import {ElMessage} from 'element-plus';
// app.use(ElMessage);

// 将pinia实例传递给app实例,在此之后使用useStore钩子会自动注入pinia实例,否则需要在useStore中手动注入
import { pinia } from '@/store'
import i18n from '@/plugins/i18n'
import router from '@/router'

import directives from '@/utils/directives'

const app = createApp(App)
app.use(pinia).use(i18n).use(router)
app.use(directives)

app.mount('#app')

// import useUserStore from '@/store/modules/user'
// const l = useUserStore()
// l.$subscribe((_: any, state) => {
//   console.info(state, 'main.js')
//   // i18n.global.locale = state.locale;
// })
