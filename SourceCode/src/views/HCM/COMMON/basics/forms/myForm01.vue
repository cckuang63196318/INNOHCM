<template>
    <n-form
    :rules="rules"
    :model="form"
    :show-feedback="false"
    label-width="auto"
    label-placement="left"
    require-mark-placement="right-hanging"
    >
        <n-grid :cols="appStore.gridCols" :x-gap="appStore.gridXGap" :y-gap="appStore.gridYGap" responsive="screen">
            <template v-for="block in blocks" :key="`Block_${block.key}`">
                <n-gi v-if="block.type !== 'span'" :key="`NotSpan_${block.key}`" :span="block.col">
                    <template v-for="item in block.items" key="item[0]">

                        <n-form-item v-if="item[1].type === 'select'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-select  
                                :style="item[1].comment !== undefined ? 'width: 50%;' : ''"                                                            
                                v-model:value="item[1].value"
                                filterable
                                clearable
                                :tag="item[1].attribute?.edit ? true : false"
                                :multiple="item[1].attribute?.multiple ? true : false"
                                :remote="item[1].attribute?.remote?.value"
                                :placeholder="`${t('msgInfo.select')} ${t(item[0].replace('_', '.'))}`"
                                :options="item[1].options"
                                :disabled="disabledList[item[0]]" 
                                :loading="loading[item[0]]"
                                @update:value="value => emits('update', item[0], value)"
                                @update:show="value => item[1].attribute?.remote?.callbackFunction(item[0], value)"
                            />
                            <n-ellipsis v-if="item[1].comment !== undefined" style="margin-left: 5px;">{{ item[1].comment }}</n-ellipsis>
                        </n-form-item>

                        <n-form-item v-else-if="item[1].type === 'text'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-input  
                                :style="item[1].comment !== undefined ? 'width: 50%;' : ''"                               
                                v-model:value="item[1].value" placeholder="" 
                                :disabled="disabledList[item[0]]" 
                                @change="value => emits('update', item[0], value)"
                            />
                            <n-ellipsis v-if="item[1].comment !== undefined" style="margin-left: 5px;">{{ item[1].comment }}</n-ellipsis>
                        </n-form-item>

                        <n-form-item v-else-if="item[1].type === 'date'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-date-picker value-format="yyyy-MM-dd" type="date" :clearable="!item[1].required"  
                                style="width: 100%;"
                                :actions="[null]"    
                                :is-date-disabled="value => dateDisabled(value, item[1])"                         
                                v-model:formatted-value="item[1].value" placeholder="" 
                                :disabled="disabledList[item[0]]" 
                                @update:formatted-value="value => emits('update', item[0], value)"
                            />
                        </n-form-item>

                        <n-form-item v-else-if="item[1].type === 'texts'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-dynamic-tags                                 
                                v-model:value="item[1].value" 
                                :disabled="disabledList[item[0]]" 
                                :max="item[1].attribute?.max"
                                :render-tag="(tag, index) => renderTag(tag, index, item[0], item[1])"
                                @create="label => createTag(label, item[0], item[1])"
                            />
                        </n-form-item>

                        <n-form-item v-else-if="item[1].type === 'checkbox'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-checkbox-group                                 
                                v-model:value="item[1].value" 
                                :disabled="disabledList[item[0]]" 
                                @update:value="value => {emits('update', item[0], value)}"
                            >
                                <n-space item-style="display: flex;">
                                    <n-checkbox v-for="checkItem in item[1].options" :key="checkItem.value"
                                    :value="checkItem.value" :label="checkItem.label"                                     
                                    />
                                </n-space>
                            </n-checkbox-group>
                        </n-form-item>

                        <n-form-item v-else-if="item[1].type === 'radio'" :label="t(item[0].replace('_', '.'))" 
                        :path="item[0]" size="small"
                            :style="{marginTop: item[1].blockStart ? '0px' : appStore.gridYGap + 'px'}">
                            <n-radio-group                                 
                                v-model:value="item[1].value" 
                                :disabled="disabledList[item[0]]" 
                                @update:value="value => {emits('update', item[0], value)}"
                            >
                                <n-space item-style="display: flex;">
                                    <n-radio v-for="checkItem in item[1].options"                                     
                                    :key="checkItem.value" :value="checkItem.value">
                                        {{ checkItem.label }}
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>

                        <!--follow are special type-->
                        <div v-else-if="item[1].type === 'label'"
                            :style="{display: 'flex', alignItems: item[1].attribute?.align ? item[1].attribute?.align : 'center', height: '100%'}">
                            <n-ellipsis>{{ item[1].value }}</n-ellipsis>
                        </div>                                                 

                        <n-divider v-else-if="item[1].type === 'divider'" title-placement="left" 
                            style="margin-top: 5px; margin-bottom: 5px;">
                            <template #default>
                                <span style="font-weight: bold; color: DodgerBlue;">{{ item[1].value }}</span>
                            </template>                            
                        </n-divider>

                    </template>
                </n-gi>
                <n-gi v-else-if="block.type === 'span'" :key="`Span_${block.key}`" :span="block.value === 'end' ?
                                        appStore.breakpointCols === 1 ? 0 : 
                                                                    appStore.breakpointCols === 2 ? block.beforeBlockCol === 1 ? 1 : 0
                                                                                                        : block.col
                                        :
                                        appStore.breakpointCols === 1 ? 0 : 
                                                                    appStore.breakpointCols === 2 ? block.col >= 1 ? 1 : 0
                                                                                                        : block.col
                                                                    ">
                </n-gi>
                <!--
                <n-gi v-else :key="`Span_${block.key}`" :span="block.value === 'end' ?
                                        appStore.breakpointCols === 1 ? 0 : 
                                                                    appStore.breakpointCols === 2 ? block.beforeBlockCol >= 3 ? 0 : block.col >= 3 ?
                                                                                                        block.col-3 : block.col
                                                                                                        : block.col
                                        :
                                        appStore.breakpointCols === 1 ? 0 : 
                                                                    appStore.breakpointCols === 2 ? block.col >= 3 ? 0 : block.col
                                                                    : block.col
                                                                    ">
                </n-gi>
                -->
            </template>
        </n-grid>
    </n-form>
</template>
  
<script setup>
import { NTag } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/stores'
import { DateToString } from '@/utilitys/common'
import { computed, onBeforeMount, onBeforeUnmount, reactive } from 'vue';

const { t } = useI18n()
const props = defineProps(['action', 'value'])
const emits = defineEmits(['update', 'start', 'end'])

const form = props.value
const action = props.action
const rules = {}
const blocks = []

const loading = reactive({})

if(form === null) {
    console.error('myForm Data is null')
}

const disabledList = ref({}) 

watch(() => action.value, () => {
    let rtn = {}
    Object.entries(form).forEach(item => {
        rtn[item[0]] = item[1].disableds[action.value]
        if(action.value === 'add') {
            if(!item[1].disableds[action.value]) {
                let itemValue = item[1].value
                if(Array.isArray(itemValue)) {
                    item[1].value.length = 0
                } else if(typeof obj === 'object') {
                    item[1].value = {}
                } else if(item[1].type === 'date') {
                    item[1].value = new Date().toISOString().substring(0, 10)
                    if(/ENDDA$/g.test(item[0])) {
                        item[1].value = '9999-12-31'
                    }
                } else {
                    item[1].value = null
                }      
            }
        }
    })
    disabledList.value = rtn
}, { immediate: true })

var block = []
var blockNumber = 0
var blockCol = 0
var beforeBlockCol = 0 //for span use
Object.entries(form).forEach(item => {
    rules[item[0]] = {
        required: item[1].required !== undefined ? item[1].required : false,        
        disabled: item[1].disableds[action.value] !== undefined ? item[1].disableds[action.value] : false,
    }
    
    loading[item[0]] = false

    if(blockNumber === 0) {
        item[1]['blockStart'] = true
    }
    block.push(item)
    blockNumber ++
    if(item[1].col > blockCol) {
        blockCol = item[1].col
    }
    if(item[1].blockEnd) {
        const newBlock = [...block]
        if(item[1].type !== 'null') {
            blocks.push({type: item[1].type, key:item[0], value: item[1].value, items: newBlock, col: blockCol, beforeBlockCol: beforeBlockCol})
        }        
        block = []
        beforeBlockCol = blockCol
        blockCol = 0
        blockNumber = 0
    }
})

onBeforeMount(() => {
    emits('start')
})

onBeforeUnmount(() => {
    emits('end')
})

function dateDisabled(value, item) {
    let disable = false
    const dt = DateToString(new Date(value))
    if(item.attribute?.min) {
        disable = dt < item.attribute.min
    }
    if(!disable && item.attribute?.max) {
        disable = dt >= item.attribute.max
    }    
    return disable
}

function renderTag(tag, index, key, item) {
    return h(
        NTag,
        {
        //type: "success",
        disabled: item.disableds[action.value],
        closable: true,
        onClose: () => {
            item.value.splice(index, 1)
            emits('update', key, item.value)
        }
        },
        {
        default: () => tag
        }
    )
}

function createTag(label, key, item) {
    item.value.push(label)
    emits('update', key, item.value)
    return label
}
</script>

<style scoped>

</style>