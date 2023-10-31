<template>
    <n-result status="403" title="403 禁止訪問" description="認證、授權異常" class="resultClass">
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