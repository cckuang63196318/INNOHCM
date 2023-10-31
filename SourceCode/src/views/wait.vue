<template>
    <n-spin :size="100" class="resultClass">
        <template #icon>
            <n-icon>
                <Reload />
            </n-icon>
        </template>
        <template #description>
            <div class="spinClass">
                <p>登入出現問題</p>
                <n-button @click="router.push('/')">回首頁吧</n-button>
            </div>
        </template>     
    </n-spin>
</template>

<script setup>
import { ref ,defineComponent } from "vue";
import router from '@/router'
import { Reload } from "@vicons/ionicons5";

</script>

<style scoped>
.resultClass {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
    height: 100vh;
    padding: 20px;
}
.spinClass {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>