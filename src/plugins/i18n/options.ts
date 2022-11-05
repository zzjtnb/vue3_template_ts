import { getLanguage, loadLanguages } from '@/utils/language'

const store = JSON.parse(localStorage.getItem('user') || '{}')
const context = import.meta.glob('./locales/*.ts', { eager: true })
const messages = loadLanguages(context)

// import {useLocaleStore} from '../../store/local';
// console.log(useLocaleStore().locale);

const options = {
  // you must set `false`, to use Composition API
  legacy: false,
  // 隐含注入的属性和函数
  globalInjection: true,
  // 设置地区
  locale: store.locale ?? getLanguage(messages),
  // 回退本地化(选择首选语言缺少翻译时要使用的语言)
  fallbackLocale: 'en-US',
  // 设置地区信息
  messages,
  datetimeFormats: {
    'zh-CN': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timezone: 'Asia/Shanghai',
      },
    },
    'en-US': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timezone: 'Asia/Shanghai',
      },
    },
  },
  numberFormats: {
    'zh-CN': {
      currency: {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'RMB',
      },
    },
    'en-US': {
      currency: {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'RMB',
      },
    },
  },
}

export default options
