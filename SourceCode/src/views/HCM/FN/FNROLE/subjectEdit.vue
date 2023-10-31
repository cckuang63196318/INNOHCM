<template>
    <toolBar01 style="margin-bottom: 10px;"
        :text="props.text" 
        :initial-button-list="toolBarButtonInitial" 
        :click-function="clickToolBarButton" 
    />
</template>

<script setup>
import toolBar01 from '../../COMMON/shares/toolBar01.vue'

const props = defineProps(['text'])

const toolBarButtonInitial = { 
  save: {visible: true, disabled: false},
  cancel: {visible: true, disabled: false}
}

function clickToolBarButton(action, lastAction) {
  console.log(`${action}:${lastAction}`)
}
</script>