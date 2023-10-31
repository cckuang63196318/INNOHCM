const form = {
    PA0000_PERNR: { 
        value: '', type: 'text', 
        required: true, 
        disableds: {view: false, add: true, copy: true, edit: true},
        col: 2, blockEnd: true
    },
    PA0000_INFTY: { 
        value: '', type: 'select', 
        required: true, 
        disableds: {view: false, add: true, copy: true, edit: true},
        options: [],
        col: 2, blockEnd: true,
    },  
    PA0000_BEGDA: { 
        value: new Date().toISOString().substring(0, 10), type: 'date', 
        disableds: {view: false, add: true, copy: true, edit: true},
        required: true,
        col: 2, blockEnd: true,
        attribute: { }
    },
    PA0000_ENDDA: { 
        value: '9999-12-31', type: 'date', 
        disableds: {view: false, add: true, copy: true, edit: true},
        required: true,
        col: 2, blockEnd: true,
        attribute: { }
    },  
    PA0001_PERSG: { 
        value: null, type: 'text', 
        required: false, 
        disableds: {view: true, add: true, copy: true, edit: true},
        col: 2, blockEnd: false,
        comment: '台灣正式員工'
    },
    PA0001_PERSK: { 
        value: null, type: 'text', 
        required: false, 
        disableds: {view: true, add: true, copy: true, edit: true},
        col: 2, blockEnd: true,
        comment: '非派外IDL'
    },
    PA0001_PERSA: { 
        value: null, type: 'text', 
        required: false, 
        disableds: {view: true, add: true, copy: true, edit: true},
        col: 2, blockEnd: false,
        comment: '南科'
    },
    PAPRG_KEEP: { 
        value: null, type: 'text', 
        required: false, 
        disableds: {view: true, add: true, copy: true, edit: true},
        col: 2, blockEnd: true,
        comment: '玻璃與表面技術開發部'
    }
}

const PA30 = {
    mainForm: {
        form: form
    }
}

export default PA30