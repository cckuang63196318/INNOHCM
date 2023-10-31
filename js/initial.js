
var gMain = {}
gMain.myName = 'initial'
try {
    if(window.location.href.indexOf('/500') < 0) {
        InxMSO.getUserInfo(setUserInfo, false, 'INNOHCM')
    }    
} catch(err) {
    console.log('getUserInfo:', err)
    window.location.replace('./500');
}


function setUserInfo(userinfo) {
    gMain.myUserInfo = userinfo
    console.log('setUserInfo:', userinfo)
}
      