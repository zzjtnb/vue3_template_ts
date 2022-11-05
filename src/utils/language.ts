export function loadLanguages(context: Record<string, any>) {
  const languages: Record<string | number | symbol, any> = {}
  const langs = Object.keys(context)
  for (const key of langs) {
    const lang = context[key].default
    const name = key.replace(/(\.\/locales\/|\.ts)/g, '')
    languages[name] = lang
  }
  return languages
}
export function getLanguage(messages: Record<string, unknown>) {
  // if has not choose language
  const language = navigator.language
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale))
      return locale
  }
  return 'en-US'
}
