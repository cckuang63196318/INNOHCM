<template>
    <div class="editForm">
      <div style="display: flex; align-items: center;">
        <n-icon id="leaveIconID" style="cursor: pointer;" :component="ArrowBackCircleOutline" :size="30" @click="emits('formLeave')" />
        <span class="subject">{{ `[ ${t(`action.${action.value}`)} ]` }}</span>
      </div>
      <myForm01 :action="action" :value="props.formValue" 
        @update="formUpdate" @start="emits('formStart')" @end="emits('formEnd')" 
      />
    </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { appStore } from '@/stores'
  import { ArrowBackCircleOutline } from "@vicons/ionicons5"
  import myForm01 from '../basics/forms/myForm01.vue'

  const { t } = useI18n()
  const dialog = useDialog()
  const warringAction = ['delete']

  const props = defineProps(['buttonsValue', 'switchValue', 'formValue', 'action', 'editMode'])
  const emits = defineEmits(['buttonClick', 'formUpdate', 'switchUpdate', 'formStart', 'formEnd', 'formLeave'])
  const action = props.action
  const editFormBackColor = appStore.theme === 'lightTheme' ? 'rgb(200, 200, 200)' : 'rgb(60, 60, 60)'

  console.log('editMode:', props.editMode)

  function formUpdate(key, value) {
    emits('formUpdate', key, value)
  }
  function switchUpdate(value) {
    emits('switchUpdate', value)
  }
  function buttonClick(actionStr, lastAction){
    if(actionStr === 'save' && warringAction.indexOf(lastAction) > -1) {
        dialog.warning({
          title: t('resultInfo.warring'),
          content: `${t('action.confirm')} [ ${t(`action.${lastAction}`)} ] ?`,
          positiveText: t('action.confirm'),
          negativeText: t('action.cancel'),
          onPositiveClick: () => {
            emits('buttonClick', actionStr, lastAction)
          },
          onNegativeClick: () => {
            return
          }
        })
    } else {
        if(['cancel','delete'].indexOf(actionStr) > -1) {
          action.value = 'view'
        } else {
          action.value = actionStr
        }
        emits('buttonClick', actionStr, lastAction)
    }
  }
</script>

<style scoped>
.editForm {
  position: relative; 
  margin-top: 10px;
  color: DodgerBlue;
}
.subject {
  margin-left: 3px;
  font-size: 1.1rem;
  font-weight: bold;
}

#leaveIconID:hover {
  color: tomato;
}
</style>