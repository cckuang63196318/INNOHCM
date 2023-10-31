import { h } from 'vue'
import { NIcon, NImage } from 'naive-ui'

const passType = ['divider', 'label', 'span']

export function renderIcon(icon) {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon)
      })
    }
}

// props is json format
export function renderImg(props) {
    return () => {
      return h(NImage, props)
    }
}

export function DateToString(inDate, timestampFlg = false) {
  let dtDate
  if(typeof inDate === 'string') {
    dtDate = new Date(inDate.replace(/-/g,'/')); //for iOS & Android Date Format yyyy/mm/dd  
  } else {
    dtDate = new Date(inDate);
  }
  const m = (dtDate.getMonth()+1) < 10 ? '0' + (dtDate.getMonth()+1) : '' + (dtDate.getMonth()+1);
  const d = dtDate.getDate() < 10 ? '0' + dtDate.getDate() : '' + dtDate.getDate();
  let rtn = `${dtDate.getFullYear()}-${m}-${d}`;
  if(timestampFlg === true) {
      const hh = dtDate.getHours() < 10 ? '0' + dtDate.getHours() : '' + dtDate.getHours();
      const mm = dtDate.getMinutes() < 10 ? '0' + dtDate.getMinutes() : '' + dtDate.getMinutes();
      const ss = dtDate.getSeconds() < 10 ? '0' + dtDate.getSeconds() : '' + dtDate.getSeconds();
      rtn = `${rtn} ${hh}:${mm}:${ss}`
  }
  return rtn;
}

export function initialForm(form) {
  
  Object.values(form).forEach(item => {
    if(passType.indexOf(item.type) > -1) {
      return
    }

    if(item.value != undefined) {
      if(Array.isArray(item.value)) {
        item.value.length = 0
      } else {
        item.value = null
      }
    }
  })
}

export function tableToForm(form, row) {
  if(row === undefined || row === null) {
    return
  }
  let obj = null
  initialForm(form)
  Object.entries(form).forEach(item => {
    if(passType.indexOf(item[1].type) > -1) {
      return
    }
    obj = row[item[0]]
    if(obj != undefined) {
      if(Array.isArray(obj)) {
        item[1].value = [...obj]
      } else if(typeof obj === 'object') {
        item[1].value = JSON.parse(JSON.stringify(obj))
      } else {
        item[1].value = obj
      }      
    }
  })
}


