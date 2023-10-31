<template>
    <n-button attr-type="button" :size="btnAttibute.size" :type="btnAttibute.type" @click="buttonClick">
        <template #icon>
            <component :is="btnAttibute.icon"></component>
        </template>
        <span v-if="appStore.breakpointCols !== 1 && !btnAttibute.iconOnly">
            {{ t(`action.${btnAttibute.action}`) }}
        </span>
    </n-button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { AddOutline, CloseOutline, CheckmarkCircleOutline, CopyOutline,
         TrashOutline, CreateOutline, SearchOutline, SaveOutline, PrintOutline,
         DownloadOutline, ShareOutline, DocumentTextOutline, CloseCircleOutline, 
         OpenOutline, EyeOutline        
        } from "@vicons/ionicons5"
import { appStore } from '@/stores'

const { t } = useI18n()

const props = defineProps(['action', 'size', 'iconOnly'])
const emits = defineEmits(['click'])
const btnAttibute = {action: '', size: '', icon: null, iconOnly: null}
const btnIcons = {
    search: SearchOutline,
    open: OpenOutline,
    view: EyeOutline,

    add: AddOutline,
    copy: CopyOutline,
    edit: CreateOutline,
    delete: TrashOutline,
    import: ShareOutline,
    export: DownloadOutline,
    preprint: DocumentTextOutline,
    
    save: SaveOutline,
    cancel: CloseOutline,
    print: PrintOutline,

    confirm: CheckmarkCircleOutline,
    close: CloseCircleOutline  
}
const errorType = ['delete', 'cancel', 'close'] //btn' error type, it will display other background-color

btnAttibute.action = props.action
btnAttibute.size = props.size ? props.size : 'small'
btnAttibute.type = errorType.indexOf(btnAttibute.action) > -1 ? 'error' : 'primary'
btnAttibute.icon = btnIcons[btnAttibute.action]
btnAttibute.iconOnly = props.iconOnly !== undefined ? props.iconOnly : false

function buttonClick() {
    emits('click', btnAttibute.action)
}
</script>