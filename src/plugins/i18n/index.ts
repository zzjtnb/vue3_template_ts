import { createI18n } from 'vue-i18n'
import type { Composer, I18nOptions, Locale, VueI18n } from 'vue-i18n'

import options from './options'
const i18n = createI18n(options as I18nOptions)

export const setLocale = (locale: Locale): void => {
  if (i18n.mode === 'legacy')
    (i18n.global as unknown as VueI18n).locale = locale
  else
    (i18n.global as unknown as Composer).locale.value = locale
}
export const setI18nLanguage = (locale: Locale) => {
  setLocale(locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', locale)
}
export const t = (msg: string) => {
  return i18n.mode === 'legacy' ? (i18n.global as unknown as VueI18n).t(msg) : (i18n.global as unknown as Composer).t(msg)
}
export default i18n
