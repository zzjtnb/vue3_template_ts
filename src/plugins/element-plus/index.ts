import type { App, Component, ComputedOptions, MethodOptions } from 'vue'
import {
  // 指令
  ElInfiniteScroll,
  ElLoading,

  ElMessage,
} from 'element-plus'

const components: Component<unknown, unknown, unknown, ComputedOptions, MethodOptions>[] = []

// Directives
const plugins = [ElLoading, ElInfiniteScroll, ElMessage]

export default {
  install: (app: App) => {
    // Plugin code goes here
    if (components.length) {
      // 注册组件
      components.forEach((component: Component) => {
        app.component(component.name || '', component)
      })
    }
    if (plugins.length) {
      // 注册指令
      plugins.forEach((plugin) => {
        app.use(plugin)
      })
    }
  },
}
