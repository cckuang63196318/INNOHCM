<template>
    <n-result status="500" title="500 登入系統異常" description="請聯繫系統管理員" class="resultClass">
        <template #footer>
            <n-button @click="router.push({name: 'HOME'})">回首頁吧</n-button>
        </template>
    </n-result>
</template>

<script setup>
import { NResult, NButton } from 'naive-ui'

function handleClick() {
    let url = window.location.href.replace(/500/, '')
    window.location.replace(url)
}

</script>

<style scoped>
.resultClass {
    background-color: black;
    height: 100vh;
    padding: 20px;
}
</style>