<template>
  <n-layout-sider

  :native-scrollbar="false"
  :collapsed="collapsedMobile && !appStore.siderFixed"
  collapse-mode="width"
  :collapsed-width="120"
  :width="340"
  :show-trigger="!appStore.siderFixed"
  :content-style="siderPadding"
  bordered
  @collapse="collapsed = true"
  @expand="collapsed = false"
  >
    <menu01 /> 
    <router-view name="LeftSideComponent"></router-view>
  </n-layout-sider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NLayoutSider } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/stores'
import menu01 from './menus/menu01.vue'

const { t, locale } = useI18n()
const collapsed = ref(true)

const collapsedMobile = computed(() => {
  return collapsed.value && appStore.titleMenuIconDisable
})

const siderPadding = computed(() => {
  if(appStore.breakpointCols === 1) {
    return 'padding: 10px 0px 10px 25px;'
  } else {
    return 'padding: 10px 10px;'
  }
})
</script>

<style scoped>

</style>