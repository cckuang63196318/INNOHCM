// 1.config editForm, dataTable
const form = {
    PA0000_ID: { 
        value: '', type: 'null', 
        disableds: {add: true, edit: true, view: true, copy: true},
        col: 4, blockEnd: true,
    },
    PA0000_BEGDA: { 
        value: '', type: 'date', 
        disableds: {add: false, edit: false, view: true, copy: false},
        required: true,
        col: 1, blockEnd: true,
        attribute: { min: '1970-01-01', max: '9999-12-31' }
    },
    PA0000_AEDTM: { 
        value: '', type: 'date', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 1, blockEnd: true,
        attribute: { }
    },
    PA0000_UNAME: { 
        value: '', type: 'text', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 1, blockEnd: true
    },
    divider_PA0000_UNAME: { 
        value: '人事活動', type: 'divider', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 4, blockEnd: true, 
    },
    T529A_MNTXT: { 
        value: null, type: 'select', 
        required: true, 
        disableds: {add: false, edit: true, view: true, copy: true},
        options: [{value: 'SEL1', label: '部門異動一'}, {value: 'SEL2', label: '部門異動二'}],
        col: 2, blockEnd: true,
        //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
    },
    span_T529A_MNTXT: { 
        type: 'span', value: 'end', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 2, blockEnd: true 
    },
    PA0000_MASSG: { 
        value: '', type: 'text', 
        disableds: {add: false, edit: false, view: true, copy: false},
        required: true,
        col: 3, blockEnd: true,
        comment: '公司指派'
    },
    span_PA0000_MASSG: { 
        type: 'span', value: 'end', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 1, blockEnd: true 
    },
    divider_PA0000_MASSG: { 
        value: '狀態', type: 'divider', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 4, blockEnd: true, 
    },
    PA0000_STAT2: { 
        value: null, type: 'select', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,         
        col: 2, blockEnd: true,
        options: [{value: 'SEL1', label: '在職中一'}, {value: 'SEL2', label: '在職中二'}],
        //attribute: { remote: {value: true, callbackFunction: selectCallBackFunction} }
    },
    span_PA0000_STAT2: { 
        type: 'span', value: 'end', 
        disableds: {add: true, edit: true, view: true, copy: true},
        col: 2, blockEnd: true 
    },
    divider_PA0000_STAT2: { 
        value: '組織指派', type: 'divider', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 4, blockEnd: true
    },
    PA0001_PLANS: { 
        value: '', type: 'text', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 2, blockEnd: true
    },
    span_PA0001_PLANS: { 
        type: 'span', value: 'end', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 2, blockEnd: true 
    },
    PA0001_PERSA: { 
        value: '', type: 'text', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 2, blockEnd: true,
        comment: '南京'
    },
    span_PA0001_PERSA: { 
        type: 'span', value: 'end', 
        disableds: {add: true, edit: true, view: true, copy: true},
        col: 2, blockEnd: true 
    },
    PA0001_PERSG: { 
        value: '', type: 'text', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 2, blockEnd: true,
        comment: '海外派遣員工'
    },
    span_PA0001_PERSG: { 
        type: 'span', value: 'end', 
        disableds: {view: true, add: true, copy: true, edit: true},
        required: false,
        col: 2, blockEnd: true 
    },
    PA0001_PERSK: { 
        value: '', type: 'text', 
        disableds: {view: true, add: true, copy: true, edit: true},
        required: false,
        col: 2, blockEnd: true,
        comment: '非派外DL'
    },
    span_PA0001_PERSK: { 
        type: 'span', value: 'end', 
        disableds: {view: true, add: true, copy: true, edit: true},
        required: false,
        col: 2, blockEnd: true 
    },
    divider_PA0001_PERSK: { 
        value: '其他作業', type: 'divider', 
        disableds: {add: true, edit: true, view: true, copy: true},
        required: false,
        col: 4, blockEnd: true
    },
}

const PA0000 = {
    dataTable : {
        key: "PA0000_ID",
        value: [],
        columns: [
          {
            key: "PA0000_BEGDA",
            //sorter: true
          },
          {
            key: "PA0000_MASSN",
          },
          {
            key: "T529A_MNTXT",
          },
          {
            key: "PA0000_MASSG",
          },
          {
            key: "T530_MGTXT",
          },
          {
            key: "PA0000_STAT2",
          }
        ],
    },
    editForm: {
        form: form,
        functions: {            
            formStart: formStart,
            formSelect: formSelect,
            formUpdate: formUpdate,
            formEnd: formEnd,
            buttonClick: buttonClick
        }
    }
}

// 2. editForm event handle
function formStart() {
    console.log('PA0000 formStart')
}

function formSelect(key) {
    console.log('PA0000 formSelect:', key)
}

function formUpdate(key, value) { 
    console.log('PA0000 formUpdate:', key, value) 
}

function buttonClick(action) {
    console.log('PA0000 buttonClick:', action)
}

function formEnd() {
    console.log('PA0000 formEnd')
}


export default PA0000