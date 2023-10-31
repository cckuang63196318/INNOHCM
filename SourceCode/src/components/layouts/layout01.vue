<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <sider01 v-show="!appStore.siderDisable" style="height: 100vh; z-index: 3;"/>     
      <n-layout>
        <header01 />
        <n-layout-content :content-style="contentStyle">
          <router-view :key="`RouterViewKey_${route.name}`"></router-view>   
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup>
import { computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NLayout, NLayoutContent, NSpace } from 'naive-ui'
import { appStore } from '@/stores'
// layout's header, sider選擇
import header01 from '@/components/headers/header01.vue'
import sider01 from '@/components/siders/sider01.vue'

const route = useRoute()

// monitor layout's content RWD and style setup
var contentStyle = computed(() => {
  return `padding: 10px 20px;`
})
</script>