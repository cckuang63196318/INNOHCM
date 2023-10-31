<template>
    <n-layout-header id="headerID" >
      <div class="head1">
        <div v-if="!appStore.titleMenuIconDisable" style="display: flex; align-items: center; cursor: pointer;">
          <n-icon size="40" :component="Menu" @click="menuActive = true" />
        </div>
        <div v-else style="display: flex; align-items: center;">
          <n-image
              width="120" height="30" :preview-disabled="true"
              src="/img/logo_noName_b.png"
          />
        </div>
          
        <div class="trxid">
          <trxid @handle-SearchUpdate="handleSearchUpdate" />
        </div>

        <div style="display: flex; align-items: center;">
          <div style="display: flex; align-items: center; margin-right: 10px; cursor: pointer;" @click="bellActive = true">
              <n-badge :color="undefined" :offset="appStore.badgeShift" :dot="appStore.bellList.length > 0">
                  <n-icon size="40" :component="NotificationsOutline" />                              
              </n-badge>            
          </div>
          <div style="display: flex; align-items: center;" @click="personalActive = true">
              <n-button color="rgb(205, 14, 218)" type="primary" size="large" circle>
                  <span style="font-size: 1.5rem; color:white">{{ usrStore.name[0] }}</span>
              </n-button>
          </div>
        </div>
      </div>
      <div class="head2">
        <span v-if="appStore.currTrxID === 'HOME'">{{ `交易程式代碼 : ${appStore.currTrxID} - ${t('HCMPRG.PRGLABEL.HOME')}` }}</span>
        <span v-else>{{ `交易程式代碼 : ${appStore.currTrxID} - ${t(`${appStore.currTrxID.substring(0,2)}PRG.PRGLABEL.${appStore.currTrxID}`)}` }}</span>
        <n-icon style="margin-left: 10px;" size="20">
            <HeartSharp v-if="menuList[0].indexOf(appStore.currTrxID) > -1" color="red" />
            <n-popselect v-else :options="menuList[1]" trigger="click" :on-update:value="addFile">
              <HeartOutline  style="cursor: pointer;" color="red" />
            </n-popselect> 
        </n-icon>
      </div>
    </n-layout-header>


    <!--功能選單-->
    <n-drawer v-model:show="menuActive" 
      to="#headerID"
      display-directive="show"
      placement="left" width="80%"
    >
      <n-drawer-content closable>
        <template #header>
            <span class="drawerTitle">功能選單</span>
        </template>
        <menu01 />
      </n-drawer-content>
    </n-drawer>

    <!--通知小鈴鐺-->
    <n-drawer v-model:show="bellActive" :on-after-leave="bellClose" 
      to="#headerID"
      placement="right" width="80%">
      <n-drawer-content closable>
        <template #header>
          <div style="display: flex; align-items: center;">
            <span class="drawerTitle" style="margin-right: 10px;">通知</span>
            <n-button type="error" size="tiny" @click="bellClear" ghost>
              {{ t('action.delete') }}
            </n-button>
          </div>
        </template>
        <div v-for="item in appStore.bellList">
          {{ item.message }}
        </div>
      </n-drawer-content>
    </n-drawer>

    <!--個人化設定-->
    <n-drawer v-model:show="personalActive" 
      to="#headerID"
      placement="right" width="80%">
      <n-drawer-content closable>
        <template #header>
            <span class="drawerTitle">個人化設定</span>
        </template>
        <n-collapse :accordion="true">
            <n-collapse-item name="1">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <PersonOutline />
                    </n-icon>
                    <span>
                        {{ t('appInfo.personalProfile') }}
                    </span>
                </template>
                <div>
                    <p>姓名: {{ usrStore.name }}</p>
                    <p>帳號: {{ usrStore.ad }}</p>
                    <p>姓名: {{ usrStore.id }}</p>
                    <p>角色: {{ usrStore.roles }}</p>
                </div>                
            </n-collapse-item>
            <n-collapse-item name="token">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <KeyOutline />
                    </n-icon>
                    <span>
                        {{ t('appInfo.authrization') }}
                    </span>
                </template>
                <div>
                    <p>帳號: {{ usrStore.ad }}</p>
                    <span style="margin-right: 10px;">{{ t('msgInfo.reauthrization') }}</span>
                    <n-button type="primary" size="tiny" ghost>
                      {{ t('action.submit') }}
                    </n-button>
                </div>                
            </n-collapse-item>
            <n-collapse-item name="2">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <Language />
                    </n-icon>
                    <span>
                        {{ t('appInfo.language') }}
                    </span>
                </template>
                <div>
                    <span>{{ locale === 'zhTW' ? 'Chinese' : '中文' }}</span>
                    <n-switch style="margin: 0px 10px;" v-model:value="appStore.language" 
                    checked-value="enUS" unchecked-value="zhTW" @update:value="value => { valueSwitchType = 'language'; handleUpdateValue(value) }">
                    </n-switch>
                    <span>{{ locale === 'zhTW' ? 'English' : '英文' }}</span>
                </div>
            </n-collapse-item>
            <n-collapse-item name="3">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <Contrast />
                    </n-icon>
                    <span>
                        {{ t('appInfo.theme') }}
                    </span>
                </template>
                <div>
                    <span>{{ t('msgInfo.light') }}</span>
                    <n-switch style="margin: 0px 10px;" v-model:value="appStore.theme" 
                    checked-value="darkTheme" unchecked-value="lightTheme" @update:value="value => { valueSwitchType = 'theme'; handleUpdateValue(value) }">
                    </n-switch>
                    <span>{{ t('msgInfo.dark') }}</span>
                </div>
            </n-collapse-item>
            <n-collapse-item v-if="appStore.titleMenuIconDisable" name="4">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <LockClosedOutline />
                    </n-icon>
                    <span>
                        {{ t('appInfo.sider') }}
                    </span>
                </template>
                <div>
                    <span>{{ t('msgInfo.floating') }}</span>
                    <n-switch style="margin: 0px 10px;" 
                    v-model:value="appStore.siderFixed" 
                    @update:value="value => { valueSwitchType = 'sider'; handleUpdateValue(value) }">
                    </n-switch>
                    <span>{{ t('msgInfo.locked') }}</span>
                </div>
            </n-collapse-item>
            <n-collapse-item name="5" @click="logout">
                <template #header>
                    <n-icon style="margin-right: 10px;" size="30">
                        <LogOutOutline />
                    </n-icon>
                    <span>
                        {{ t('appInfo.logout') }}
                    </span>
                </template>
            </n-collapse-item>
        </n-collapse>
      </n-drawer-content>
    </n-drawer>
</template>

<script setup>
// vue, frontEndPlatform 主要套件使用
import { ref, watch, onMounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon, useMessage, NBadge} from 'naive-ui'
import { useI18n } from 'vue-i18n'
// 左邊選單使用
import { Menu, NotificationsOutline, PersonOutline, Language, Contrast, 
  LockClosedOutline, LogOutOutline, HeartOutline, HeartSharp, KeyOutline } from '@vicons/ionicons5'
// store, language, utility use
import { appStore, usrStore } from '@/stores'
import { menuStore, addSubMenu } from '@/stores/menu'
import menu01 from '@/components/siders/menus/menu01.vue'
import trxid from '@/components/siders/menus/trxid.vue'

// menu drawer open, close使用 
const menuActive = ref(false)

// bell notification使用
const bellActive = ref(false)

// 個人化設定值使用
const personalActive = ref(false)
const valueSwitchType = ref('')

// content use
const headerHeight = `${appStore.headerHeight}px`
const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const message = useMessage()

const valueFile = ref(null)
provide('valueFile', valueFile)

onBeforeMount(() => {
  usrStore.name = gMain.myUserInfo.MemName
})

watch(() => appStore.titleMenuIconDisable, (menudisable) => {
  if(menudisable) {
    menuActive.value = false
  }
})

// bell message clear
function bellClose() {
  //bellList.value.length = 0
}

function bellClear() {
  appStore.bellList.length = 0
  bellActive.value = false
}

// 更改個人化設定內容
function handleUpdateValue(value) {
  let type = valueSwitchType.value
  let msg = ''
  console.log('handleUpdateValue1:', value)
  console.log('handleUpdateValue2:', valueSwitchType.value)
  if(type === 'language') {
    appStore.language = value
    localStorage.setItem('language', appStore.language)  
    locale.value = appStore.language 
    document.title = t(`appInfo.name['${appStore.id}']`)

    // language顯示的訊息剛好跟local現在的值相反
    if(appStore.language === 'enUS') {
      msg = 'Language Switch Success'
    } else {
      msg = '語言切換成功'
    }
  } else if(type === 'theme') {
    appStore.theme = value
    localStorage.setItem('theme', appStore.theme)  
    msg = msg + ' ' + t('action.switch') + ' ' + t('resultInfo.success')  
  } else if(type === 'sider') {
    appStore.siderFixed = value
    localStorage.setItem('sider', appStore.siderFixed)  
    msg = msg + ' ' + t('action.switch') + ' ' + t('resultInfo.success')  
  } else {
    console.error(`handleUpdateValue not define [${type}]`)
    return
  }

  message.success(
    `${msg}`,
    { duration: 2000 }
  )
}

function logout() {
    usrStore.id_token = ''
    //router.push('login')
    InxMSO.logout(`${window.location.protocol}//${window.location.host}/${import.meta.env.VITE_APP_NAME}/`, true, import.meta.env.VITE_APP_NAME)
}

function handleSearchUpdate(value, option) {

  if(!value) {
    return
  }
  router.push({name: value})
}

const menuList = computed(() => {
  let listFile = []
  let listFolder = []
  searchNode(menuStore.menuOptions, listFile, listFolder)
  return [listFile, listFolder]
})

function searchNode(node, listFile, listFolder) {
  Object.values(node).forEach( item => {
    if(item.type === 'file') {
      listFile.push(item.trxid)
    }else{
      listFolder.push({label: item.label, value: item.key, node: item})
      if(item.children?.length > 0) {
        searchNode(item.children, listFile, listFolder)
      }
    }    
  })
  return [listFile, listFolder]
}

function addFile(folderid) {
  const node = menuList.value[1].find(item => { return item.value === folderid }).node
  addSubMenu(
      {
        label: `${appStore.currTrxID} - ${t(`${appStore.currTrxID.substring(0,2)}PRG.PRGLABEL.${appStore.currTrxID}`)}`, 
        trxid: appStore.currTrxID,
        type: 'file'
      }
      , node)
  console.log('addFile:', node)
}
</script>

<style scoped>
.head1 {
  display: flex; 
  padding: 10px 20px; 
  align-items: center; 
  justify-content: space-between;
  border-bottom: 1px solid var(--n-border-color);
}
.head2 {
  display: flex; 
  align-items: center; 
  padding-left: 20px;
  padding-top: 5px;
  color: red;
}

.trxid {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 300px;
}
.n-icon:hover {
  color: #18A058FF !important;  
}
.n-icon{
    color: var(--n-text-color);
}

.drawerTitle {
    font-size: 1.2rem;
    color: red;
}
</style>
