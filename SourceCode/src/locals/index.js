import { createI18n } from 'vue-i18n'
import zhTW from '@/views/HCM/CONFIG/language/hcmTW'
import enUS from '@/views/HCM/CONFIG/language/hcmUS'
import { appStore } from '../stores'

const messages = {
  enUS,
  zhTW,
}

// language priority: localStorage > browser, default is browser
let language = ''
if(localStorage.getItem('language')) {
  language = localStorage.getItem('language')
} else {
  const languageBrowser = navigator.language.toLocaleLowerCase().split('-')[0]
  if(languageBrowser === 'zh') {
    language = 'zhTW'
  } else {
    language = 'enUS'
  } 
}
appStore.language = language

const i18n = createI18n({
  legacy: false,
  locale: language, 
  fallbackLocale: 'enUS', 
  messages, 
})

export default i18n