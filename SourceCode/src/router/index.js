import { createRouter, createWebHistory } from 'vue-router'
import {sendAPI} from '@/apis/index'
import { usrStore } from '@/stores'
import { menuStore } from '@/stores/menu'
import Layout01 from '@/components/layouts/layout01.vue'
import { menuRoutes } from '@/config'
import { appStore } from '../stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'ROOT',
      label: 'LAYOUT01',
      component: Layout01,
      children: menuRoutes
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/403.vue')
    },    
    {
      path: '/500',
      name: '500',
      component: () => import('../views/500.vue')
    },
    {
      path: '/wait',
      name: 'wait',
      component: () => import('../views/wait.vue')
    },
    {
      path: "/:catchAll(.*)",
      name: '404',
      component: () => import('../views/404.vue')
    },
  ]
})

router.beforeEach(async (to, from) => {

  appStore.currTrxID = to.name

  if(['403', '404', '500'].indexOf(to.name) > -1) {
    console.log('router return:', to.name)
    return true
  } else if(usrStore.functions !== null) {
    console.log('chk', usrStore.functions, to.name)
    if(!usrStore.functions.find(item => item.name === to.name))
    {
      return { name: '403' }
    }
  }
  /*
  if(to.name !== 'wait' && !usrStore.ad) {
    gMain.myName = 'initial'
    try {
        if(window.location.href.indexOf('/500') < 0) {
            await InxMSO.getUserInfo(setUserInfo, false, 'INNOHCM')
        }    
    } catch(err) {
        console.log('getUserInfo:', err)
        window.location.replace('./500');
    }

    if(!usrStore.ad) {
      console.log('wait page')
      return { name: 'wait' }
    }
  }*/
  setUserInfo({MemName: '金京光', AD: 'CHINGKUANG.CHIN', MemID: '17015166', IDToken: 'iiii-dddd-tttt'})
  
  if(usrStore.functions === null) {

    // get self authorization functions
    let response = null
    usrStore.functions = []
    usrStore.functionsR = []
    usrStore.functionsW = []
    try {
        response = await sendAPI('/INNOHCM/FN/FNROLEAUTH/getData', JSON.stringify({IDTOKEN: usrStore.id_token}))
    } catch(err) {
        console.log('get auth functions exception: ', err)
        return { name: '500' }
    }

    if(response.data.ROLES.length === 0) {
      return { name: '403' }
    } else {
      usrStore.roles = response.data.ROLES
      usrStore.functionsR = response.data.FUNCTIONSR
      usrStore.functionsW = response.data.FUNCTIONSW

      menuRoutes.forEach(item => {
        if(response.data.FUNCTIONSR?.indexOf(item.name) > -1 || response.data.FUNCTIONSW?.indexOf(item.name) > -1 || item.meta.freeAuth) {
          usrStore.functions.push( {name: item.name, label: item.meta.label} )
        }
      })
      usrStore.functions.sort( (a, b) => {
        if(a.name < b.name) {
          return -1
        } else if(a.name > b.name) {
          return 1
        } else {
          return 0
        }
      })
    }

    // get self menu
    try {
        response = await sendAPI('/INNOHCM/FN/FNUSRMENU/getData', JSON.stringify({IDTOKEN: usrStore.id_token}))
    } catch(err) {
        console.log('get menu functions exception: ', err)
        return { name: '500' }
    }

    if(response.data?.length > 0) {
      menuStore.menuOptions = response.data
    }
  }

  //appStore.currTrxLabel = t(`${appStore.currTrxID.substring(0,2)}PRG.PRGLABEL.${appStore.currTrxID}`)
  //usrStore.functions.find(item => { return item.name === appStore.currTrxID}).label

})

function setUserInfo(userinfo) {
  gMain.myUserInfo = userinfo
  usrStore.id = gMain.myUserInfo.MemID
  usrStore.name = gMain.myUserInfo.MemName
  usrStore.ad = gMain.myUserInfo.AD
  usrStore.access_token = ''
  usrStore.sso_token = gMain.myUserInfo.SSOToken
  usrStore.apim_tokem = gMain.myUserInfo.APIMToken
  usrStore.id_token = gMain.myUserInfo.IDToken
  console.log('get UserInfo:', userinfo)
  //router.push({name: 'home'})
}

export default router
