import request from '@/utilitys/request'

export function getIdToken(body) {
  const routeid = '/apiServer'
  const url_tmp = `${routeid}/Auth/Authotication/Token/getData`
  return request({
    url: url_tmp,
    method: 'get',
    data: body
  })
}

export function sendAPI(path, body) {
  let routeid = ''
  const subFunction = path.split('/')[2]
  if(subFunction === 'FN') {
    routeid = import.meta.env.VITE_FN_ROUTE
  } else if(subFunction === 'OM') {
    routeid = import.meta.env.VITE_OM_ROUTE
  } else if(subFunction === 'PA') {
    routeid = import.meta.env.VITE_PA_ROUTE
  } else if(subFunction === 'PY') {
    routeid = import.meta.env.VITE_PY_ROUTE
  } else if(subFunction === 'PT') {
    routeid = import.meta.env.VITE_PT_ROUTE
  }

  const url_tmp = `${routeid}${path}`
  return request({
    url: url_tmp,
    method: 'get',
    data: body
  })
}
