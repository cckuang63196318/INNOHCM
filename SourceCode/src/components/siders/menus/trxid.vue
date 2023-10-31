<template>
    <n-select
            v-model:value="valueFile"
            filterable
            placeholder="搜索交易"
            :options="fileOptions"
            :loading="loading"
            clearable
            remote
            @search="handleSearch"
            @update:value="handleSearchUpdate"
    >
        <template #arrow>
            <SearchSharp />
        </template>

    </n-select>
</template>

<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { NSelect } from 'naive-ui'
import { SearchSharp } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import { menuRoutes } from '@/config'
import { usrStore } from '../../../stores'

const { t, locale } = useI18n()
const emit = defineEmits(['handleSearchUpdate'])

const valueFile = inject('valueFile')
const loading = ref(false)
var fileOptionsLabelInitial = []
const fileOptions = ref([])

onBeforeMount(() => {
  usrStore.functions.forEach(item => {
    if(item.name !== 'HOME') {
      fileOptionsLabelInitial.push({name: item.name, label: t(`${item.name.substring(0,2)}PRG.PRGLABEL.${item.name}`)})
    }    
  })
})

function handleSearch(query) {
  if (!query.length) {
    fileOptions.value = [];
    return;
  }
  loading.value = true;
  fileOptions.value = fileOptionsLabelInitial.filter(
    (item) => (~item.name.indexOf(query) || ~item.label.indexOf(query)) && item.name !== 'HOME'
  ).map( (item) => { return {label: `${item.name} - ${item.label}`, value: item.name} })
  loading.value = false 
}

function handleSearchUpdate(value, option) {
  emit('handleSearchUpdate', valueFile.value, option)
}
</script>

<style scoped>

</style>