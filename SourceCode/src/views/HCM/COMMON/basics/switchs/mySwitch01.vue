<template>
    <n-switch v-model:value="actionValue.value" @update:value="value => emits('update', value)" :size="actionSize">
      <template #checked-icon>
        <n-icon :component="checkIcon" />
      </template>
      <template #unchecked-icon>
        <n-icon :component="uncheckIcon" />
      </template>
    </n-switch>
</template>

<script setup>
import { LockClosedOutline, LockOpenOutline } from '@vicons/ionicons5'

const props = defineProps(['action', 'size', 'value'])
const emits = defineEmits(['update'])

const actionName = props.action
const actionValue = props.value
const actionSize = props.size ? props.size : 'large'
var checkIcon = null
var uncheckIcon = null

if(actionName === 'lock') {
  checkIcon = LockClosedOutline, 
  uncheckIcon = LockOpenOutline 
}
</script>