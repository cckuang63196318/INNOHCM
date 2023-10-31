<template>
    <n-divider title-placement="left" style="margin-bottom: 10px;">
        <span style="color:DodgerBlue;">物件選擇</span>
    </n-divider>
    <n-collapse>
        <template #header-extra>
            <n-icon :size="20">
                <people-outline />
            </n-icon>
        </template>
        <n-collapse-item title="人員" name="1">
        <div>
            <n-data-table
                v-model:checked-row-keys="checkedRowKeys"
                :row-key="row => row['PA0002_PERNR']"
                :render-cell="(value, rowData, column) => {return value !== undefine ? value.toString() : ''}"
                size="small"
                style="padding-top: 0px; padding-bottom: 0px;"
                :columns="columns"
                :data="data"
                :pagination="{pageSize: pageSize}"
                striped 
                @update:checked-row-keys="rowSelected"
                @update:filters="handleFiltersChange"
            />
        </div>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { PeopleOutline } from "@vicons/ionicons5"
const pageSize = 15
var checkedRowKeys = ref([])
const columns = [
    {
      type: 'selection',
      multiple: false
    },
    {
    key: "PA0002_PERNR",
    title: '工號',
    width: 90,
    ellipsis: true,
    sorter: 'default'
    },
    {
    key: "PA0002_NACHN_VORNA",
    title: '姓名',
    ellipsis: true,
    sorter: 'default',
    filter: true,
    filterOptionValue: ''
    }
]
const data = ref([{PA0002_PERNR: '17015166', PA0002_NACHN_VORNA: '金京光'}, {PA0002_PERNR: '10040486', PA0002_NACHN_VORNA: '吳俊宏'}])

function rowSelected(row) {

}

function handleFiltersChange (filters) {
}
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