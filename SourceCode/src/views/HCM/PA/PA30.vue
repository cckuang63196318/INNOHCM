<template>
  <mainForm01 
    :action="mainFormAction" :action-sequence="mainFormActionSequence"
    :switch-value="toolBarSwitch" @switch-update="switchUpdate"
    :buttons-value="mainFormToolBarButtons" @button-click="mainFormToolBarButtonClick"
    :form-value="mainForm" @form-update="mainFormUpdate"
  />

  <KeepAlive>
    <dataTable01 :key="dataTableKey" v-if="!editFormDisplay.value"
      :value="dataTable" :page-size="pageSize" :edit-mode="editMode" :checked-row-keys="checkedRowKeys" 
      :selection="true" :display-add="false" 
      @button-click="dataTableButtonClick" @page-click="dataTablePageClick" 
    />
  </KeepAlive>

  <Transition name="slide-fade">
    <editForm01 :key="editFormKey" v-if="editFormDisplay.value"
      :action="editFormAction" :edit-mode="editMode"
      :buttons-value="editFormToolBarButtons" @button-click="editFormToolBarButtonClick" 
      :form-value="editForm"
      @form-update="editFormUpdate" @form-start="editFormStart" @form-end="editFormEnd" @form-leave="editFormLeave"
    />
  </Transition>
</template>
  
<script setup>
  import { menuRoutes } from '@/config'
  import { useI18n } from 'vue-i18n'
  import { appStore, usrStore } from '@/stores'
  import { sendAPI } from '@/apis'
  import { tableToForm } from '@/utilitys/common'
  import mainForm01 from '../COMMON/shares/mainForm01.vue'
  import dataTable01 from '../COMMON/basics/tables/myDataTable01.vue'
  import editForm01 from '../COMMON/shares/editForm01.vue'
  import PA30 from './PA30/PA30'
  import PA0000 from './PA30/PA0000'
  import PA0001 from './PA30/PA0001'
  
  const { t } = useI18n()
  const message = useMessage()
  const dialog = useDialog()

  const editFormModuleList = {PA0000: PA0000, PA0001: PA0001}
  const pageSize = 15
  const checkedRowKeys = reactive({value: []})
  const selectedItem = {INFTY: '', PERNR: '', BEGDA: '', ENDDA: ''}
  var enabledSwitch = false

  // initial mainForm's toolBar
  const mainFormAction = reactive({value: 'view'})
  const mainFormActionSequence = reactive({value: ''}) //beforeLock, Lock, editSelect, edit, editComplete, editSelect... 
  const toolBarSwitch = reactive({
    value: {value: false},
    setLockObject: setLockObject
  })
  const mainFormToolBarButtons = {
    search: {},
    add: {}, copy: {}, edit: {}, delete: {},
    save: {}, cancel: {}
  } 
  const mainForm = reactive(PA30.mainForm.form)

  // initial dataTable
  const dataTableKey = ref('PA0000_DataTable_Initial')
  var dataTable =  reactive({
    value: [],
    columns: [{key: "PAPRG_INFTYDATA", sorter: false}],
  })

  // initial editForm
  const editFormKey = ref('PA0000_EditForm_Initial')
  const editMode = reactive({value: false})
  const editFormDisplay = reactive({value: false})
  const editFormAction = reactive({value: 'view'})
  const editFormToolBarButtons = {}
  var editForm = {} //reactive(PA0000.editForm.form)

  
  onBeforeMount(async () => {
    mainForm.PA0000_INFTY.value = ''
    mainForm.PA0000_PERNR.value = ''
    enabledSwitch = false
    if(usrStore.inftys.length === 0) {
      try {
        mainForm.PA0000_INFTY.options.length = 0
        menuRoutes.forEach(item => {
          if(item.name === 'PA30') {
            item.meta.inftyList.forEach(info => {
              let labelLanguage = `PAPRG.INFTYLIST.${info}`
              //mainForm.PA0000_INFTY.options.push({value: info, label: `${info} - ${t(labelLanguage)}`})
              usrStore.inftys.push({value: info, label: `${info} - ${t(labelLanguage)}`, level: '*'})
            })        
          }
        })    
      
        let response = await sendAPI('/INNOHCM/FN/FNROLEPARAMATER/getData', {AD: usrStore.ad, SUBSYSTEM: 'PA'})

        console.log('onBeforeMount:', response)      
        response.data.INFTYR.forEach(item => {
          let matchFlg = false
          Object.values(usrStore.inftys).forEach(infty => {
            if(infty.value === item) {
              infty.level = 'R'
              matchFlg = true
              return
            }
          })
          if(!matchFlg) {
            let labelLanguage = `PAPRG.INFTYLIST.${item}`
            usrStore.inftys.push({value: item, label: `${item} - ${t(labelLanguage)}`, level: 'R'})
          }
        })

        response.data.INFTYW.forEach(item => {
          let matchFlg = false
          Object.values(usrStore.inftys).forEach(infty => {
            if(infty.value === item) {
              infty.level = 'W'
              matchFlg = true
              return
            }
          })
          if(!matchFlg) {
            let labelLanguage = `PAPRG.INFTYLIST.${item}`
            usrStore.inftys.push({value: item, label: `${item} - ${t(labelLanguage)}`, level: 'W'})
          }
        })

        //mainForm.PA0000_INFTY.options = Object.values(usrStore.inftys)
        //mainForm.PA0000_INFTY.options = 
        usrStore.inftys.sort((a, b) => {
          return a.value.localeCompare(b.value)
        })
        mainForm.PA0000_INFTY.options = Object.values(usrStore.inftys)
        console.log('usrStore.inftys:', usrStore.inftys)       
      } catch(error) {
        let msg = `Load Infotype Error: ${error.message}`
        errorMessageLog(msg)
      }
    } else {
      mainForm.PA0000_INFTY.options = Object.values(usrStore.inftys)
    }
  })

  onMounted(() => {
    selectedItem.INFTY = mainForm.PA0000_INFTY.value
    selectedItem.PERNR = mainForm.PA0000_PERNR.value
    selectedItem.BEGDA = mainForm.PA0000_BEGDA.value
    selectedItem.ENDDA = mainForm.PA0000_ENDDA.value
  })
  
  // mainForm event handle
  async function mainFormUpdate(key, value) {
    if(key === 'PA0000_INFTY') {
      if(value === selectedItem.INFTY) {
        return
      } else {
        selectedItem.INFTY = value
      }
    } else if (key === 'PA0000_PERNR') {
      if(value === selectedItem.PERNR) {
        console.log('mainFormUpdate:', key, '尚待優化')
        return
      } else {
        selectedItem.PERNR = value
      }
    } else if (key === 'PA0000_BEGDA') {
      if(value === selectedItem.BEGDA) {
        return
      } else {
        selectedItem.BEGDA = value
      }
    } else if (key === 'PA0000_ENDDA') {
      if(value === selectedItem.ENDDA) {
        return
      } else {
        selectedItem.ENDDA = value
      }
    } else {
      return
    }

    enabledSwitch = false
    
    if(selectedItem.INFTY.length > 0) {
      newInfotypeInitial(selectedItem.INFTY)
    }
  }

  async function mainFormToolBarButtonClick(action, lastAction) {
    if(['add', 'copy', 'edit', 'delete'].indexOf(action) > -1) {
      editFormAction.value = action
    } else if(action === 'cancel') {
      let row = {}
      console.log('editForm:', editForm, dataTable.key)
      dataTable.value.forEach(item => {
        console.log('new item:', item, item[dataTable.key], editForm[dataTable.key])
        if(item[dataTable.key] === editForm[dataTable.key].value) {
          row = item
        }
      })
      console.log('new form:', row)
      tableToForm(editForm, row)
      editFormAction.value = 'view'     
    } else if(action === 'save') {
      editFormDisplay.value = false
      mainFormActionSequence.value = 'lock'
      await editFormModuleList[selectedItem.INFTY].editForm.functions.buttonClick(action)
      console.log('editForm.functions.buttonClick 尚待優化')    
    }
    
    if(action === 'search') {
      if(mainForm.PA0000_PERNR.value.length === 0 || mainForm.PA0000_INFTY.value.length === 0) {
        let msg = 'PERNR or INFTY Can Not Empty'
        errorMessageLog(msg)
        return
      } else if(mainForm.PA0000_BEGDA.value >= mainForm.PA0000_ENDDA.value) {
        let msg = 'BEGDA Can Not >= ENDDA'
        errorMessageLog(msg)
        return
      }

      editFormDisplay.value = false
      dataTable.value.length = 0
      try {
        let response = await sendAPI('/INNOHCM/PA/PA0000/getData', {Action: action})        
        response.DATA.forEach(item => {
          dataTable.value.push(item)
        })
        enabledSwitch = true
      } catch(error) {
        let msg = `/INNOHCM/PA/PA0000/getData Error: ${error.message}`
        message.error(msg)
      }
    }
  }

  function setLockObject() {
    let inftyValue = selectedItem.INFTY
    let pernrValue = selectedItem.PERNR
    let infty = null
    let lockReply = {mainItem: null, subItem: null, message: ''}
    if(!enabledSwitch) {
      let msg = `Infotype [ ${inftyValue} - ${pernrValue} ] Has Not Selected & Query`
      errorMessageLog(msg)
      lockReply.message = msg
      return lockReply
    }

    usrStore.inftys.forEach(item => {
      if(item.value === inftyValue) {
        infty = item
      }
    })
    if(infty === null || infty.level !== 'W') {
      let msg = `Infotype [ ${infty.label} ] Has Not Write Authonization`
      errorMessageLog(msg)
      lockReply.message = msg
      return lockReply
    }

    return { mainItem: inftyValue, subItem: pernrValue }    
  }
 
  function switchUpdate(lockValue) {
    editMode.value = lockValue
    if(lockValue) {
      mainFormAction.value = 'edit'
      if(editFormDisplay.value) {
        mainFormActionSequence.value = 'editSelect'
      }
    } else {
      mainFormAction.value = 'view'
      editFormAction.value = 'view'
      editFormDisplay.value = false
    }
  }
  
  // dataTable event handle
  function dataTableButtonClick(action, row) {
    tableToForm(editForm, row)    
    editFormAction.value = 'view'
    mainFormActionSequence.value = 'editSelect'
    editFormDisplay.value = true
  }
  
  function dataTablePageClick(page) {
    console.log('dataTablePageClick', page, pageSize)
  }

  // editForm event handle
  async function editFormStart() {
    console.log('editFormStart', selectedItem.INFTY)
    await editFormModuleList[selectedItem.INFTY].editForm.functions.formStart()
  }

  // not use in this case, editForm not display any button
  async function editFormToolBarButtonClick(action, lastAction) {
    console.log('editFormToolBarButtonClick', action, lastAction)
  }
  
  async function editFormUpdate(key, value) {
    console.log('editFormUpdate:', key, value)
    await editFormModuleList[selectedItem.INFTY].editForm.functions.formUpdate(key, value)
  }

  async function editFormEnd() {
    console.log('editFormEnd')
    await editFormModuleList[selectedItem.INFTY].editForm.functions.formEnd()
  }

  async function editFormLeave() {
    console.log('editFormLeave')
    editFormDisplay.value = false
  }
  
  // ------------------- function define by self(Start)
  function newInfotypeInitial(infotype) {
    try {
      editForm = reactive(editFormModuleList[infotype].editForm.form)
      editFormModuleList[infotype].editForm.form = editForm
      editFormKey.value = `PA0000_EditForm_${infotype}`
      editFormDisplay.value = false

      dataTable = reactive(Object.assign({}, editFormModuleList[infotype].dataTable))
      dataTable.value.length = 0
      checkedRowKeys.value.length = 0
      dataTableKey.value = `PA0000_DataTable_${infotype}`
      console.log('dataTable:', dataTable)
    } catch(error) {
      let msg = `Load Infotype [ ${infotype} ] Error : ${error.message}`
      errorMessageLog(msg)
    }

  }

  function errorMessageLog(msg) {
    appStore.bellList.unshift({message: msg})
    message.error(msg)
    console.error(msg)
  }
  // ------------------- function define by self(End)
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease-in;
  }
  .slide-fade-leave-active {
    transition: all 0.0s ease-out;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
