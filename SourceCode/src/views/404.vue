<template>
<n-result status="404" title="404 資源不存在" description="請確認連結URL網址" class="resultClass">
    <template #footer>
        <n-button @click="router.push({name: 'HOME'})">回首頁吧</n-button>
    </template>
</n-result>
</template>

<script setup>
import { NResult, NButton } from 'naive-ui'
import router from '@/router'

</script>

<style scoped>
.resultClass {
    background-color: black;
    height: 100vh;
    padding: 20px;
}
</style>