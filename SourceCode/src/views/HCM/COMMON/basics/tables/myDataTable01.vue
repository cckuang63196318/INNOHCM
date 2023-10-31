<template>
  <div style="position: relative; margin-top: 10px;">
    <div ref="tableRef" style="height: 100%;">
      <n-data-table
        v-model:checked-row-keys="checkedRowKeys.value"
        :row-key="row => row[props.value.key]"
        :render-cell="(value, rowData, column) => {return value !== undefine ? value.toString() : ''}"
        size="small"
        style="padding-top: 0px; padding-bottom: 0px;"
        :columns="columns"
        :data="data"
        :pagination="{pageSize: props.pageSize}"
        :max-height="tableHeight"
        :min-height="tableHeight"
        :scroll-x="200"
        striped 
        @update:page = "pageClick"
        @update:checked-row-keys="rowSelected"
      />
    </div>
    <div>
      <myButton01 v-if="props.displayAdd === true && props.editMode.value === true" 
        style="position:absolute ; top:10px; left:10px; z-index: 3;" 
        action="add" :iconOnly="true" @click="addButtonClick" size="tiny" circle 
      />
    </div>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import myButton01 from '../buttons/myButton01.vue'

const { t } = useI18n()

const props = defineProps(['value', 'selection', 'editMode', 'displayAdd', 'pageSize', 'checkedRowKeys'])
const emits = defineEmits(['buttonClick', 'pageClick'])
const data = props.value.value
const checkedRowKeys = props.checkedRowKeys
const columns = newColumns()

const tableRef = ref(null)
const tableHeight = ref(0)

onMounted(() => {
  tableHeight.value = window.innerHeight - tableRef.value.getBoundingClientRect().top - 95
})

onActivated(() => {
  console.log('onActivated:', checkedRowKeys.value)
})

function newColumns() {
  let orgCols = [...props.value.columns]
  let newCols = []
  orgCols.forEach(item => {
    if(item === undefined || item === null) {
      return null
    }
    item.title = h( 'span',{style: 'font-weight: bold; color: DodgerBlue;'}, t(item.key.replace('_', '.')) )
    item.resizable = item.resizable !== undefined ? item.resizable : true
    item.sorter =  item.sorter === true ? 'default' : undefined
    item.ellipsis = item.ellipsis === undefined || item.ellipsis === true ? true : false
    newCols.push(item)
  })

  if(props.selection === true) {
    let selectionCols = 
    {
      type: 'selection',
      multiple: false
    }
    newCols.unshift(selectionCols)
  }
  return newCols
}

function pageClick(page) {
  emits('pageClick', page)
}

function rowSelected(key, row) {
  emits('buttonClick','view', row[0])
}

function addButtonClick(){
  emits('buttonClick','add', null)
}

console.log('myDataTable Load')
</script>

<style scoped>
:deep(.n-data-table-th) {
  padding-top: 5px;
  padding-bottom: 5px;
}
:deep(.n-data-table-td) {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>