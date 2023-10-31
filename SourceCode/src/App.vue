<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { RouterView } from 'vue-router'
import { zhTW, dateZhTW, enUS, dateEnUS,
  NWatermark, NMessageProvider, NDialogProvider,
  NConfigProvider, darkTheme, lightTheme, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore, usrStore } from '@/stores'
import { themeDarkOverrides, themeLightOverrides, darkThemeConfig, lightThemeConfig } from '@/stores/theme'

const { t, locale } = useI18n()
var themeOverrides = ref()

const theme = computed(() => {
  console.log(`Theme: ${appStore.theme}`)
  themeOverrides.value = appStore.theme === 'darkTheme' ? themeDarkOverrides : themeLightOverrides
  myTheme()
  return appStore.theme === 'darkTheme' ? darkTheme : lightTheme
})

onBeforeMount(() => {
  // document setup
  document.title = t(`appInfo.name['${appStore.id}']`)
  appStore.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : appStore.theme

  // for RWD conten layer height, menu icon disable monitor
  resize()
  window.onresize = () => {
    resize()
  }

  // initial custormise element gloable style
  myTheme()

  // check sider layer if expand
  let fixFlg = null
  fixFlg = localStorage.getItem('sider') ? localStorage.getItem('sider') : false
  if(fixFlg && fixFlg === 'true') {
    fixFlg = true    
  } else {
    fixFlg = false
  }
  appStore.siderFixed = fixFlg

})

function resize() {
  appStore.contentHeight = window.innerHeight - appStore.headerHeight
  appStore.innerHeight = window.innerHeight

  console.log('innerWidth', window.innerWidth, appStore.mobileBreak01, appStore.mobileBreak02)

  if(window.innerWidth >= appStore.mobileBreak02) {
    appStore.breakpointCols = 3
  } else if(window.innerWidth >= appStore.mobileBreak01) {
    appStore.breakpointCols = 2
  } else {
    appStore.breakpointCols = 1
  }

  let flg = appStore.breakpointCols <=2
  appStore.siderDisable = flg
  appStore.titleMenuIconDisable = !flg
  
  console.log(`bk: ${appStore.breakpointCols}`)
}

// set customize element gloable style
const myBlockColor = ref('')
function myTheme() {
  myBlockColor.value = appStore.theme === 'darkTheme' ? darkThemeConfig.borderColor : lightThemeConfig.borderColor
}

</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides"  
    :locale="appStore.language === 'zhTW' ? zhTW : enUS" :date-locale="appStore.language === 'zhTW' ? dateZhTW : dateEnUS" 
    :breakpoints="appStore.breakpoints"
  >
    <n-watermark
      v-if="appStore.watermark"
      :content="`${usrStore.name} ${usrStore.id} ${usrStore.company}`"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
    />

    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
    
  </n-config-provider>
</template>

<style>
div.myBlock {
  color: v-bind(myBlockColor);
}
</style>

