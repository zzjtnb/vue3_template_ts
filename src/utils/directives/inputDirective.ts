import { type App, nextTick } from 'vue'
// 根据el获取input
const getInput = (el: HTMLElement): HTMLInputElement | null => (el instanceof HTMLInputElement ? el : el.querySelector('input'))
export default {
  install(app: App) {
    // v-focus 自动聚焦。对于非文本框聚焦使用 v-focus:1
    app.directive('focus', {
      mounted: async (el: HTMLElement, { arg }) => {
        // 为了防止数据未即使更新。
        await nextTick()
        // 对于非文本框聚焦（使用了 contenteditable ）的直接聚焦即可
        if (arg) el.focus?.()
        else getInput(el)?.focus()
      },
    })

    // v-select 自动选中。对于非文本框请使用 v-select:1
    app.directive('select', {
      mounted: async (el: HTMLElement, { arg }) => {
        // 为了防止数据未即使更新。
        await nextTick()
        if (arg) el = arg
        // elementplus的文本框。是嵌套了一个文本框。。
        getInput(el)?.select()
      },
    })

    let inputHandler = () => {
      // do nothing.
    }
    // 限制input框，仅能输入数字。默认限制两位，可以通过传参设置小数位数
    // v-number=2 限制两位小数\
    app.directive('number', {
      mounted(el: HTMLElement, { value = 2 }) {
        const input: HTMLInputElement = <HTMLInputElement>getInput(el)
        if (input) {
          // 小数正则
          const decimal: string = value ? `(\\.\\d{0,${value}})?` : ''
          // 整数正则
          const integer = '\\d*'
          const regExp = new RegExp(integer + decimal, 'g')
          inputHandler = () => {
            // 替换所有的非数字项
            // 如果输入的数字不符合正则表达式，则替换为''
            input.value
              = input.value
                .toString()
                .trim()
                .replace(/[^\d.]/g, '')
                ?.match?.(regExp)?.[0] ?? ''
          }
          // 在文本框输入的时候触发
          input.addEventListener('input', inputHandler, true)
        }
      },
      unmounted(el: HTMLElement) {
        // 解除绑定的时候去除事件
        const input: HTMLInputElement = <HTMLInputElement>getInput(el)
        input.removeEventListener('input', inputHandler, true)
      },
    })
  },
}
