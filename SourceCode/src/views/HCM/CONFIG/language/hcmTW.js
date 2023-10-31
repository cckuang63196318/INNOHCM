import fnTW from "@/views/HCM/CONFIG/language/fnTW"
import omTW from "@/views/HCM/CONFIG/language/omTW"
import paTW from "@/views/HCM/CONFIG/language/paTW"
import ptTW from "@/views/HCM/CONFIG/language/ptTW"
import pyTW from "@/views/HCM/CONFIG/language/pyTW"
import tTW from "@/views/HCM/CONFIG/language/tTW"

export default Object.assign({
    HCMPRG: {
        KEEP: "保留", 
        PRGLABEL: {
            HOME: '首頁',
        }
    },
    appInfo: {
        version: '版本',
        name: {
            'sys0001' : 'Innolux HCM'
        },
        language: 'Language',
        theme: '主題',
        sider: '側邊導覽',
        personalProfile: '個人訊息',
        login: '登入',
        logout: '登出',
        authrization: '認證',
    },

    action: {
        search: '查詢',
        switch: '切換',
        submit: '送出',
        import: '匯入',
        export: '匯出',
        view: '檢視',
        add: '新增',
        delete: '刪除',
        edit: '編輯',
        copy: '複製',
        confirm: '確認',
        cancel: '取消',
        save: '儲存',
        open: '開啟',
        close: '關閉',
        print: '列印',
        preprint: '預覽',
    },

    resultInfo: {
        success: '成功',
        fail: '失敗',
        error: '異常',
        warring: '警告',
        information: '通知',

        error_authorizationW: '無修改資料權限',
        error_lockObject_null: '尚未選擇鎖定資料',
        error_lock: '切換鎖定失敗',
    },

    msgInfo: {
        select: '選擇',
        language: '語言',
        zh: '中文',
        en: '英文',
        light: '淺色',
        dark: '深色',
        fixed: '固定',
        locked: '鎖定',
        floating: '浮動',
        reauthrization: '重新取得認證',
        role: '角色',
        description: '描述',
        description2: '描述2',
        description3: '描述3',
        orangeAssign: '組織指派',
        PERSA: '人事範圍',
        PERNR: '工號',
    },
}, fnTW, omTW, paTW, ptTW, pyTW, tTW)