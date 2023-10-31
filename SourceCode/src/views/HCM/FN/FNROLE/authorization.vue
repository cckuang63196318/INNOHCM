<template>
    <n-tree
        block-line
        expand-on-click
        :data="pRoleData"
        :node-props="nodeProps"
        :on-update:expanded-keys="updatePrefixWithExpaned"
    />
    <div v-if="subMenu.visible" hoverable :style="{top: subMenu.y + 'px', left: subMenu.x + 'px'}" class="subMenu">
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
            <n-button>插入文件夾</n-button>
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
import { NIcon } from "naive-ui"
import { Folder, FolderOpenOutline, FileTrayFullOutline } from "@vicons/ionicons5"
import { inject, onBeforeMount, reactive, watch } from "vue";

const message = useMessage()

// 子元件互通變數
const pRoleID = inject('pRoleID', null)
const pRoleData = inject('pRoleData', [])

const subMenu = reactive({ visible: false, x:0, y:0, option: null })
const showFolderModify = ref(false)
const showFolder = ref(false)
const showFile = ref(false)
const showDelete = ref(false)
const valueFolder = ref(null)
const valueFile = ref(null)

function updatePrefixWithExpaned(_keys, _option, meta){
      if (!meta.node)
        return;
      switch (meta.action) {
        case "expand":
          meta.node.prefix = () => h(NIcon, null, {
            default: () => h(FolderOpenOutline)
          });
          break;
        case "collapse":
          meta.node.prefix = () => h(NIcon, null, {
            default: () => h(Folder)
          });
          break;
      }
    }

function nodeProps({ option }){
      return {
        onClick() {
          if (!option.children && !option.disabled) {
            message.info("[Click] " + `${option.label}:${option.value}`);
          }
        },
        oncontextmenu(e) {
            e.preventDefault()
            subMenu.option = option
            subMenu.visible = true
            subMenu.y = e.pageY + 10
            subMenu.x = e.pageX
        }
      };
    }

    function handlePositiveClick(action ,type, option) { 
  closePop()

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
.subMenu {
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 5px;
  width: 150px;
  height: 300px;
  padding: 10px 10px;
  border-style: solid;
  border-color: var(--n-border-color);
  border-width: 1px;
  border-radius: 5px;
  z-index: 2;
  background-color: var(--n-color);
}
</style>