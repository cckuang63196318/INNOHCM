<template>
  <n-card content-style="display: flex; flex-direction: column; padding-top:5px; padding-bottom: 5px;" hoverable>
    <toolBar01 v-if="tooBarDisplay" 
      :action="props.action.value" :action-sequence="props.actionSequence"
      :buttons-value="props.buttonsValue" @button-click="buttonClick"
      :switch-value="props.switchValue" @switch-update="switchUpdate"
    />
    <n-divider v-if="tooBarDisplay" style="margin-top: 5px; margin-bottom: 10px;" />
    <myForm01 :action="props.action" :value="props.formValue" @update="formUpdate" 
    @start="emits('formStart')" @end="emits('formEnd')" />
  </n-card>
</template>
  
<script setup>
  import toolBar01 from './toolBar01.vue'
  import myForm01 from '../basics/forms/myForm01.vue'  

  const props = defineProps(['action', 'buttonsValue', 'switchValue', 'formValue', 'actionSequence'])
  const emits = defineEmits(['buttonClick', 'formUpdate', 'switchUpdate', 'formStart', 'formEnd'])

  const tooBarDisplay = props.buttonsValue === undefined && props.switchValue === undefined ? false : true

  function formUpdate(key, value) {
    emits('formUpdate', key, value)
  }
  function switchUpdate(value) {
    emits('switchUpdate', value)
  }
  function buttonClick(action, lastAction){
    emits('buttonClick', action, lastAction)
  }
</script>
  
<style scoped>
  
</style>