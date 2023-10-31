<template>
  <mainForm01 
    :action="mainFormAction"
    :buttons-value="toolBarButtonsInitial" @button-click="clickToolBarButton"
    :switch-value="toolBarSwitchInitial" @switch-update="switchUpdate" 
    :form-value="form" @form-update="formUpdate"
  />

  <dataTable01 :value="initialTable" @button-click="buttonClick" @page-click="pageClick" :selection="true" />

  <editForm01 v-if="editFormVisible.value"
    :action="editFormAction"
    :edit-mode="editMode"
    :buttons-value="toolBarButtonsInitial2" @button-click="clickToolBarButton2" 
    :form-value="form2" @form-update="formUpdate2"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { sendAPI } from '@/apis'
import { usrStore } from '../../../stores'
import { tableToForm } from '@/utilitys/common'
import mainForm01 from '../COMMON/shares/mainForm01.vue'
import dataTable01 from '../COMMON/basics/tables/myDataTable01.vue'
import editForm01 from '../COMMON/shares/editForm01.vue'
import { onBeforeMount, reactive } from 'vue';

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

const props = defineProps(['columnInvisible', 'dataFilter'])
console.log('props:', props.columnInvisible)

const editMode = reactive({value: false})
const editFormVisible = reactive({value: false})

onBeforeMount(async () => {
  try {
    let response = await sendAPI('/INNOHCM/FN/FNROLES/getData', {AD: usrStore.ad})
    let optionsList = []
    console.log('onBeforeMount:', response)
    
    response.data.forEach(item => {
      console.log('', item['FN0000_INFOTYPE'])
      if(item['FN0000_INFOTYPE'] !== undefined) {
        item['FN0000_INFOTYPE'].forEach(info => {
          optionsList.push({value: info, label: info})
        })   
      }
    })
    form.FN0000_INFOTYPE.options = optionsList
    
  } catch(err) {
    message.error(err.message)
  }
})

// initial mainForm's toolBar
const mainFormAction = reactive({value: 'view'})
const toolBarButtonsInitial = {
  search: {},
}

const toolBarSwitchInitial = reactive({
  value: {value: false},
  setLockObject: setLockObject
})

async function clickToolBarButton(action, lastAction) {
  if(action === 'search') {
    try {
      let response = await sendAPI('/INNOHCM/FN/FNSUBJECT/getData', {Action: action})
      console.log('subject:', response.DATA)
      initialTable.value.length = 0 //先清成0, 不能重新assign []，否則會更新table失敗
      response.DATA.forEach(item => {
        initialTable.value.push(item)
      })
      console.log('initialTable:', initialTable)
    } catch(err) {
      message.error(err.message)
    }
  }
}

function setLockObject() {
  if(form.FN0000_PERNR.value?.length > 0) {
    return { mainItem: form.FN0000_PERNR.value, subItem: '' }
  } else {
    return null
  }
}

function switchUpdate(lockValue) {
  //form.FN0000_role.disabled = lockValue
  mainFormAction.value = 'edit'
  initialTable.editMode.value = lockValue
  editMode.value = lockValue
}

// initial mainForm's
const form = reactive({
  FN0000_PERNR: { 
    value: null, type: 'text', 
    required: true, 
    disableds: {view: false, add: true, copy: true, edit: true},
    col: 2, blockEnd: true,
    //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
  },
  FN0000_INFOTYPE: { 
    value: null, type: 'select', 
    required: true, 
    disableds: {view: false, add: true, copy: true, edit: true},
    options: [{value: '異動', label: '異動'}, {value: '薪資狀態', label: '薪資狀態'}],
    col: 2, blockEnd: true,
    //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
  },
  FN0000_description: { 
    value: '', type: 'text', 
    //handleFunction:(value) => {console.log('input:', value)},
    disableds: {view: true, add: true, copy: true, edit: true},
    col: 2, blockEnd: true
  },
  span02: { 
    type: 'span', value: 'end', 
    disableds: {view: true, add: true, copy: true, edit: true},
    col: 2, blockEnd: true 
  }
})

async function formUpdate(key, value) {
  console.log('formUpdate:', key, value)
  if(key === 'FN0000_role') {
    let option = form.FN0000_role.options.find( item => {return item.value === value})
    console.log('option:', option)
    form.FN0000_description.value = option?.label
    try {
      let response = await sendAPI('/INNOHCM/FN/FNSUBJECT/getData', {ROLE: value})
      console.log('subject:', response.DATA)
      initialTable.value.length = 0 //先清成0, 不能重新assign []，否則會更新table失敗
      response.DATA.forEach(item => {
        /*
        Object.entries(item).forEach(obj => {
          if(Array.isArray(obj[1])) {
            item[obj[0]] = obj[1].toString()
          }
        })*/
        initialTable.value.push(item)
      })
      //initialTable.value = response.DATA
      console.log('initialTable:', initialTable)
    } catch(err) {
      message.error(err.message)
    }
  }
}

// initial edit Form
const editFormAction = reactive({value: 'view'})
const toolBarButtonsInitial2 = {
  add: {},
  copy: {},
  edit: {},
  delete: {},
  close: {},
  save: {},
  cancel: {}
}

function clickToolBarButton2(action, lastAction) {
  console.log('clickToolBarButton2', action, lastAction)
  if(['save', 'close'].indexOf(action) > -1 || (action === 'cancel' &&  ['add', ''].indexOf(lastAction) > -1)) {
    editFormVisible.value = false
  }
}

function selectCallBackFunction(action, show) {
  console.log('selectCallBackFunction', action, show)
  if(show) {
    if(action === 'FN0000_role') {
      form2.FN0000_role.options = [ {label: 'XX1', value: 'xx1'}, {label: 'XX2', value: 'xx2'} ]
    }
  }
}

const form2 = reactive({
  FN0000_SUBJECTID: { 
    value: '', type: 'text', 
    disableds: {view: true, add: false, copy: false, edit: true},
    required: true,
    col: 1, blockEnd: true
  },
  span01: { 
    type: 'span', value: 'end', 
    disableds: {view: true, add: true, copy: true, edit: true},
    col: 3, blockEnd: true 
  },
  FN0000_SDATE: { 
    value: '', type: 'date', 
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 2, blockEnd: false,
    attribute: { min: '2023-02-10', max: '2023-02-25' }
  },
  FN0000_EDATE: { 
    value: '', type: 'date', 
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 2, blockEnd: true,
    attribute: { min: '2023-03-02', max: '2023-03-29' }
  },
  label1: { 
    value: '這是測試的文字說明01', type: 'label', 
    disableds: {view: true, add: false, copy: true, edit: false},
    required: false,
    col: 2, blockEnd: true, 
    attribute: { align: 'top' }
  },
  FN0000_SUBJECTDESC: { 
    value: '', type: 'text', 
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 3, blockEnd: true
  },
  label2: { 
    value: '這是測試的文字說明02', type: 'label', 
    disableds: {view: true, add: false, copy: true, edit: false},
    required: false,
    col: 1, blockEnd: true, 
  },
  FN0000_orangeAssign: { 
    value: '業務區塊', type: 'divider',  
    disableds: {view: false, add: false, copy: false, edit: false},
    col: 4, blockEnd: true, 
  },
  FN0000_PARAMATER: { 
    value: [], type: 'texts', 
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 2, blockEnd: true,
    attribute: { max: 4 }
  },
  FN0000_RADIO: { 
    value: null, type: 'radio', 
    options: [{value: 'TN', label: '台南'}, {value: 'JN', label: '竹南'}],
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 2, blockEnd: true,
    attribute: { max: 4 }
  },
  span04: { 
    type: 'span', value: 'start', 
    disableds: {view: true, add: true, copy: true, edit: true},
    col: 2, blockEnd: true 
  },
  FN0000_SITE: { 
    value: 'TN', type: 'checkbox', 
    options: [{value: 'TN', label: '台南'}, {value: 'JN', label: '竹南'}, {value: 'NB', label: '寧波'}, {value: 'FS', label: '佛山'}, {value: 'NJ', label: '南京'}],
    disableds: {view: true, add: false, copy: false, edit: false},
    required: true,
    col: 2, blockEnd: true,
    attribute: { max: 4 }
  },
  FN0000_SELECT: { 
    value: null, type: 'select', 
    required: true, 
    disableds: {view: true, add: true, copy: true, edit: true},
    options: [{value: 'SEL1', label: 'S1'}, {value: 'SEL2', label: 'S2'}],
    col: 2, blockEnd: true,
    //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
  },
  FN0000_SELECTS: { 
    value: null, type: 'select', 
    required: true, 
    disableds: {view: true, add: false, copy: false, edit: false},
    options: [{value: 'SEL1', label: 'S1'}, {value: 'SEL2', label: 'S2'}],
    col: 2, blockEnd: true,
    attribute: { multiple: true }
    //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
  },
})

function formUpdate2(key, value) {
  console.log('formUpdate2:', key, value)
}

// initial dataTable
const initialTable = reactive({
  key: "ID",
  value: [],
  columns: [
    {
      title: "FN0000_SUBJECTID",
      key: "FN0000_SUBJECTID",
      fixed: "left",
      sorter: true
    },
    {
      title: "FN0000_SDATE",
      key: "FN0000_SDATE"
    },
    {
      title: "FN0000_SUBJECTDESC",
      key: "FN0000_SUBJECTDESC"
    },
    {
      title: "FN0000_SITE",
      key: "FN0000_SITE"
    },
    props.columnInvisible?.indexOf('FN0000_PARAMATER') > -1 ? 
      null : 
      {
        title: "FN0000_PARAMATER",
        key: "FN0000_PARAMATER"
      },
  ],
  editMode: { value: false}
})

function buttonClick(action, row) {
  if(['view', 'add'].indexOf(action > -1)) {
    editFormVisible.value = true
    if(action === 'view') {
      form2.FN0000_SUBJECTID.value = row.FN0000_SUBJECTID
      form2.FN0000_SDATE.value = row.FN0000_SDATE
      form2.FN0000_SUBJECTDESC.value = row.FN0000_SUBJECTDESC
    }
  } 
  console.log('buttonClick', action, row?.name)
  tableToForm(form2, row)
  console.log('form2:', form2)
  editFormAction.value = action
}

function pageClick(page) {
  console.log('pageClick', page)
}
</script>

<style scoped>


</style>