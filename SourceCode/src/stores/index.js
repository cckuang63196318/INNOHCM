import { reactive } from 'vue'

// 以ipad min 直橫為基準
const mobileBreak01Const = 768
const mobileBreak02Const = 1024

export const appStore = reactive({
    id: 'sys0001',
    version: 'V1.00',
    versionYear: '2023',
    versionDate: '2023/08/07',
    watermark: true,
    theme: 'darkTheme', // darkTheme | lightTheme
    language: '', // from i18n zhTW | enUS

    // for RWD grid use
    mobileBreak01: mobileBreak01Const,
    mobileBreak02: mobileBreak02Const,
    breakpoints: { xs: 0, s: mobileBreak01Const, m: 960, l: mobileBreak02Const, xl: 1536, xxl: 1920 }, //native grid use
    breakpointCols: 0,
    gridCols: '1 s:2 l:4',
    gridXGap: 10,
    gridYGap: 5,

    // for layout use
    innerWidth: 0,
    headerHeight: 60,
    contentHeight: 0,
    siderDisableWidth: mobileBreak01Const,
    siderDisable: false,
    siderFixed: false,
    titleMenuIconDisable: true,

    // for n-badge use
    badgeShift: [-8, 2],

    // for title Trx Info use
    currTrxID: '',
    currTrxLabel: '',

    // 小鈴鐺訊息內容
    bellList : [], //[{message: 'GA1'}, {message: 'GA2'}, ...]
})

export const usrStore = reactive({
    id: '',
    name: '',
    ad: '',
    company: 'Innolux',
    email: '',
    access_token: '',
    sso_token: '',
    apim_tokem: '',
    id_token: '',
    roles: null,
    functions: null, // data format [{name: 'xxx', label: 'yyy'},...]
    functionsR: null, // data format [xxx1, xxx2,...]
    functionsW: null, // data format [xxx2, xxx3,...]

    inftys: [], // data format [{value: 'PA0000', level: '*|R|W'}]
})
