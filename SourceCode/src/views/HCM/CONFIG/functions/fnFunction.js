export const menuRoutes = [
    {
        path: '',
        name: 'HOME',
        meta: {
            label: '首頁',
            freeAuth: true
        },
        component: () => import('@/views/HCM/index.vue')
    },
    {
        path: 'FN/FNROLE',
        name: 'FNROLE',
        meta: {
            label: '角色權限設定',
            freeAuth: null
        },
        component: () => import('@/views/HCM/FN/FNROLE.vue'),
    }
]