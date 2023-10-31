import { menuRoutes as menuRoutesFN } from '@/views/HCM/CONFIG/functions/fnFunction'
import { menuRoutes as menuRoutesOM } from '@/views/HCM/CONFIG/functions/omFunction'
import { menuRoutes as menuRoutesPA } from '@/views/HCM/CONFIG/functions/paFunction'
import { menuRoutes as menuRoutesPT } from '@/views/HCM/CONFIG/functions/ptFunction'
import { menuRoutes as menuRoutesPY } from '@/views/HCM/CONFIG/functions/pyFunction'

// 1.預先設立的選單，基本上不用改。
export const menuList = [
    {
        seq: [1],
        type: 'file',
        label: '首頁',
        trxid: 'HOME',
        key: '1',
        delete: 'false',
    },
    {
      seq: [2],
      type: 'folder',
      label: '我的最愛',
      key: '2',
      delete: 'false',
      children: [
        {
          seq: [2,1],
          type: 'folder',
          label: 'PA',
          key: '2-1'
        },
        {
          seq: [2,2],
          type: 'folder',
          label: 'PT',
          delete: 'false',
          key: '2-2'
        },
        {
          seq: [2,3],
          type: 'folder',
          label: 'PY',
          key: '2-3'
        },
        {
          seq: [2,4],
          type: 'folder',
          label: 'OM',
          key: '2-4'
        },
      ]
    },
    {
      seq: [3],
      type: 'folder',
      label: '系統功能',
      key: '3',
      delete: 'false',
      children: [

      ]
    },
]

// 2.彙總各模塊的功能名稱、路徑。
export const menuRoutes = menuRoutesFN.concat(menuRoutesOM, menuRoutesPA, menuRoutesPT, menuRoutesPY)