import fnUS from "@/views/HCM/CONFIG/language/fnUS"
import omUS from "@/views/HCM/CONFIG/language/omUS"
import paUS from "@/views/HCM/CONFIG/language/paUS"
import ptUS from "@/views/HCM/CONFIG/language/ptUS"
import pyUS from "@/views/HCM/CONFIG/language/pyUS"
import tUS from "@/views/HCM/CONFIG/language/tUS"

export default Object.assign({
    HCMPRG: {
        KEEP: "KEEP",
        PRGLABEL: {
            HOME: 'HOME',
        }
    },
    appInfo: {
        version: 'Version',
        name: {
            'sys0001' : 'Innolux HCM'
        },
        language: '語言',
        theme: 'Theme',
        sider: 'Sider Bar',
        personalProfile: 'Profile',
        login: 'Login',
        logout: 'Logout',
        authrization: 'Authrization',
    },

    action: {
        search: 'Search',
        switch: 'Switch',
        submit: 'Submit',
        import: 'Import',
        export: 'Export',
        view: 'View',
        add: 'Add',
        delete: 'Delete',
        edit: 'Edit',
        copy: 'Copy',
        confirm: 'Confirm',
        cancel: 'Cancel',
        save: 'Save',
        open: 'Open',
        close: 'Close',
        print: 'Print',
        preprint: 'View',
    },

    resultInfo: {
        success: 'Success',
        fail: 'Fail',
        error: 'Error',
        warring: 'Warring',
        information: 'Information',

        error_authorizationW: 'No Edit Data Authorization',
        error_lockObject_null: 'Lock Data is Nll',
        error_lock: 'Switch Lock Error',
    },

    msgInfo: {
        select: 'Select',
        language: 'Language',
        zh: 'Chinese',
        en: 'English',
        light: 'Light',
        dark: 'Dark',
        fixed: 'Fixed',
        locked: 'Lock',
        floating: 'Floating',
        reauthrization: 'Get New Authrization',
        role: 'Role',
        description: 'Description',
        description2: 'Description2',
        description3: 'Description3',
        orangeAssign: 'Orange Assign',
        PERSA: 'PERSA',
        PERNR: 'PERNR',
    },
}, fnUS, omUS, paUS, ptUS, pyUS, tUS)