<template>
  <div @click.self="subMenu.visible = false" style="width: 100%;">
    <n-menu
        v-model:value="selectedKey"
        :collapsed-width="100"
        :collapsed-icon-size="22"
        :indent="30"
        :options="menuStore.menuOptions"
        :render-label="menuStore.renderMenuLabel"
        :render-icon="menuStore.renderMenuIcon"
        :expand-icon="menuStore.expandIcon"
        @update:value="handleContentSelect"
    />
  </div>
    <div v-if="subMenu.visible" 
      :style="{top: subMenu.y + 'px', left: subMenu.x + 'px', 
      height: subMenuHeightStr}" 
      class="menu">
      <div><span style="color: tomato; font-weight: bold;">編輯我的最愛</span></div>
      <n-divider style="margin-top: 5px; margin-bottom: 5px;" />

      <n-popconfirm v-model:show="showFolderModify"
        @positive-click="handlePositiveClick('modify', 'folder', subMenu.option)"
        @negative-click="handleNegativeClick"
      >
        <template #trigger>
          <n-button :disabled="subMenu.option.type === 'file' || subMenu.option.delete === 'false'">修改名稱</n-button>
        </template>
          <span>名稱</span>
          <n-input class="menuItem" v-model:value="valueFolder" type="text" placeholder="文件夾名稱" />
      </n-popconfirm>
      
      <n-popconfirm v-model:show="showFolder"
        @positive-click="handlePositiveClick('add', 'folder', subMenu.option)"
        @negative-click="handleNegativeClick"
      >
        <template #trigger>
          <n-button :disabled="subMenu.option.seq.length > 2" >插入文件夾</n-button>
        </template>
          <span>名稱</span>
          <n-input class="menuItem" v-model:value="valueFolder" type="text" placeholder="文件夾名稱" />
      </n-popconfirm>

      <n-popconfirm v-model:show="showFile"
        @positive-click="handlePositiveClick('add', 'file', subMenu.option)"
        @negative-click="handleNegativeClick"
      >
        <template #trigger>
          <n-button>插入交易</n-button>
        </template>
          <span>交易碼</span>
          <trxid class="menuItem" />
      </n-popconfirm>

      <n-popconfirm v-model:show="showDelete"
        @positive-click="handlePositiveClick('delete', '', subMenu.option)"
        @negative-click="handleNegativeClick"
      >
        <template #trigger>
          <n-button :disabled="subMenu.option.delete === 'false'">從我的最愛移除</n-button>
        </template>
          <span class="menuItem" style="margin-left: 0px;">確定要移除嗎?</span>
      </n-popconfirm>

      <div><n-button type="primary" @click="subMenu.visible = false" style="bottom: 0px;width: 100%; margin-top: 5px;">關閉</n-button></div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { NMenu, NButton, NPopconfirm } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore, usrStore } from '@/stores'
import { menuStore, subMenu, subMenuHeight, addSubMenu, deleteSubMenu, modifySubMenu } from '@/stores/menu'
import { menuRoutes } from '@/config'
import trxid from './trxid.vue'

const { t, locale } = useI18n()
const router = useRouter()

const selectedKey = ref('1')

const subMenuHeightStr = `${subMenuHeight}px`
const showFolderModify = ref(false)
const showFolder = ref(false)
const showFile = ref(false)
const showDelete = ref(false)
const valueFolder = ref(null)
const valueFile = ref(null)
provide('valueFile', valueFile)
const loading = ref(false)

function handleContentSelect (key, option) {

  if(option.type === 'folder') {
    return
  }


  if(option.trxid === 'HOME') {
    router.push({path: '/'})
  } else {
    router.push({name: option.trxid})
  }
}

function handlePositiveClick(action ,type, option) {
  if(action === 'add') {
    let label = ''
    let trxid = ''
    if(type === 'file') {
      if(!valueFile.value) {
        return
      }
      const first = usrStore.functions.find(item => item.name === valueFile.value)
      if(first) {
        label = `${first.name} - ${first.label}`
        trxid = first.name
        console.log('first:', trxid, label)
      }
    } else {
      if(!valueFolder.value) {
        return
      }
      label = valueFolder.value
      trxid = valueFolder.value
    }

    addSubMenu(
      {
        label: label, 
        trxid: trxid,
        type: type
      }
      , option)

      console.log('menu:', JSON.stringify(menuStore.menuOptions))
  } else if(action === 'modify') {
    if(!valueFolder.value) {
      return
    }
    modifySubMenu(valueFolder.value, option)
  } else if(action === 'delete') {
    deleteSubMenu(option)
  }  
  closePop()
  selectedKey.value = ''
}

function handleNegativeClick() {
  closePop()
}

function closePop() {
  showFile.value = false
  showFolder.value = false
  showFolderModify.value = false
  showDelete.value = false
} 
</script>

<style scoped>
.menu {
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 5px;
  width: 150px;
  padding: 10px 10px;
  border-style: solid;
  border-color: var(--n-border-color);
  border-width: 1px;
  border-radius: 5px;
  z-index: 2;
  background-color: var(--n-color);
}

.menuItem {
  width: 200px; 
  margin-left: 10px;
}
</style>