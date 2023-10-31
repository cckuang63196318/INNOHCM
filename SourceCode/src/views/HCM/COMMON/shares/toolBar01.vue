<template>
    <div class="toolBar">
        <div class="toolBar" style="width: 20%;">
            <mySwitch01 v-if="props.switchValue !== undefined" 
                action="lock" :value="switchValue" @update="switchUpdate" :disabled="switchDisabled"
            />
        </div>
        <div class="toolBar" style="width: 80%; justify-content: end;">
            <myButton01 v-for="(value, key) in buttonList" :action="key" size="small"
            @click="buttonClick" 
            :style="{display: value.visible ? 'inline-flex' : 'none'}" :disabled="value.disabled"           
            />
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { appStore, usrStore } from '@/stores'
import { sendAPI } from '@/apis/index'
import mySwitch01 from '../basics/switchs/mySwitch01.vue'
import myButton01 from '../basics/buttons/myButton01.vue'

const route = useRoute() 
const { t } = useI18n()
const message = useMessage()

const beforeEditButtons = ['search', 'import', 'open']
const onEditButtons = ['add', 'edit', 'copy', 'delete', 'close', 'preprint'] 
const afterEditButtons = ['save',' print', 'export', 'cancel'] 
const routePath = route.path.split('/')
const moduleName = routePath[1]
const functionName = routePath[2]

const props = defineProps(['buttonsValue', 'switchValue', 'action', 'actionSequence'])
const emits = defineEmits(['buttonClick', 'switchUpdate'])
var switchValue = props.switchValue === undefined ? {value: false} : props.switchValue.value
const actionSequence = props.actionSequence
const buttonList = ref({})
const switchDisabled = ref(true)
var lockObject = null //lock前需要先選定lock的物件 or Data
var lastAction = ''
var hasBeforeEditButton = false
var hasOnEditButton = false
var hasAfterEditButton = false

// 檢查是否有W權限
if(usrStore.functionsW.indexOf(functionName) > -1) {
    switchDisabled.value = false
}

// 決定button順序及顯示
if(props.buttonsValue) {
    beforeEditButtons.forEach(key => {
        const item = props.buttonsValue[key]
        if(item) {
            hasBeforeEditButton = true
            buttonList.value[key] = {visible: true, disabled: false}
        }
    })
    onEditButtons.forEach(key => {
        const item = props.buttonsValue[key]
        if(item) {
            hasOnEditButton = true
            buttonList.value[key] = {visible: false, disabled: false}
        }
    })
    afterEditButtons.forEach(key => {
        const item = props.buttonsValue[key]
        if(item) {
            hasAfterEditButton = true
            buttonList.value[key] = {visible: hasOnEditButton ? false : true, disabled: false}
        }
    })
}

if(props.action !== undefined && onEditButtons.indexOf(props.action) > -1) {
    setButtonsVisible('afterEditButtons', true)
}
else if(hasBeforeEditButton) {
    setButtonsVisible('beforeEditButtons', true)
} else {
    if(hasOnEditButton) {
        setButtonsVisible('onEditButtons', true)
    } else {
        setButtonsVisible('afterEditButtons', true)
    }
}

// actionSequence: editSelect, lock(clear all buttons for wait editSelect)
watch(actionSequence, (newValue, oldValue) => {
    if(newValue.value.length === 0) {
        return
    }

    if(!switchValue.value) {
        actionSequence.value = ''
        return
    }

    if(newValue.value === 'editSelect') {
        setButtonsVisible('onEditButtons', true)
    } else if (newValue.value === 'lock') {
        setButtonsVisible('lock', true)
    }

    actionSequence.value = '' //for next triger
})

onBeforeUnmount(() => {
    if(switchValue.value) {
        let warring = false
        Object.entries(buttonList.value).forEach(item => {
            if(afterEditButtons.indexOf(item[0]) > -1 && item[1].visible) {
                warring = true
            }
        })
        if(warring) {
            let msg = `${functionName} is Leave Before Edite...`
            appStore.bellList.unshift({message: msg})
        }
    }
})

function buttonClick(action) {
    emits('buttonClick', action, lastAction)
    lastAction = action
    clickFunction(action)
}

async function switchUpdate(value) {
    // get lock object data
    lockObject = props.switchValue.setLockObject()
    if(lockObject === undefined || lockObject === null || !lockObject.mainItem) {
        switchValue.value = !value
        if(lockObject.message?.length > 0) {
            console.error('switchUpdate: ', lockObject.message)
        } else {
            message.error(t('resultInfo.error_lockObject_null'))
        }      
        return
    }
    // check W auth
    if(usrStore.functionsW.indexOf(functionName) < 0){
        switchValue.value = !value
        message.error(t('resultInfo.error_authorizationW'))
        return
    }
    
    const lockInfo = {
        module: moduleName,
        function: functionName,
        mainItem: lockObject.mainItem,
        subItem: lockObject.subItem ? lockObject.subItem : '',
        action: value ? 'lock' : 'unlock'
    }

    let response = null
    try {
        response = await sendAPI('/INNOHCM/FN/FNLOCK/modifyData', JSON.stringify(lockInfo))            
    } catch(err) {
        console.log('lock switch exception: ', err)
        switchValue.value = !value
        message.error(`${t('resultInfo.error_lock')} [${err.message}]`)
        return
    }
    
    if(response.status === 'OK') {
        emits('switchUpdate', value)
        // onEditButtons/beforeButtons visible is true/false when lock change
        if(value) {
            setButtonsVisible('lock', true)
        } else {
            setButtonsVisible('beforeEditButtons', true)
        }         
    } else {
        switchValue.value = !value
        message.error(`${t('resultInfo.error_lock')} [ ${response.message} ]`)
        return
    }   
}

function clickFunction(action) {
    if(onEditButtons.indexOf(action) > -1 && hasAfterEditButton) {
        setButtonsVisible('afterEditButtons', true)
    } else if(afterEditButtons.indexOf(action) > -1) {
        if(hasOnEditButton) {
            setButtonsVisible('onEditButtons', true)
        }
    }
}

function setButtonsVisible(type, visible) {
    let visibleBeforeButtons = type === 'beforeEditButtons' ? visible : !visible
    let visibleOnButtons = type === 'onEditButtons' ? visible : !visible
    let visibleAfterButtons = type === 'afterEditButtons' ? visible : !visible

    Object.entries(buttonList.value).forEach(item => {
        if(beforeEditButtons.indexOf(item[0]) > -1) {
            item[1].visible = visibleBeforeButtons
        }
        else if(onEditButtons.indexOf(item[0]) > -1) {
            item[1].visible = visibleOnButtons
        }
        else if(afterEditButtons.indexOf(item[0]) > -1) {
            item[1].visible = visibleAfterButtons
        }
    })
}
</script>

<style scoped>
.toolBar {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>