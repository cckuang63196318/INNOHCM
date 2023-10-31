export const menuRoutes = [
    {
        path: 'PA/PA30',
        name: 'PA30',
        meta: {
          //label: '維護 HR 主檔資料',
          freeAuth: false,
          // define which infotype can read for everyone
          inftyList: ['PA0001', 'PA0000']
        },
        components: {
          default: () => import('@/views/HCM/PA/PA30.vue'),
          LeftSideComponent: () => import('@/components/siders/components/pernr.vue')
        }
    },
    {
        path: 'PA/PAINFO01',
        name: 'PAINFO01',
        meta: {
          label: '人事主檔',
          freeAuth: null
        },
        component: () => import('@/views/HCM/PA/PAINFO01.vue')
    },
    {
      path: 'PA/PAACTN01',
      name: 'PAACTN01',
      meta: {
        label: '人事異動作業',
        freeAuth: null
      },
      component: () => import('@/views/HCM/PA/PAACTN01.vue')
    },
]