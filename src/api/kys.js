import request from '../utils/request.js';

const BASE_URL =`${process.env.VUE_APP_DOWJIA}/dowjia/`

export function dowpodsServiceInfoSave(data) {
  return request({
    url: `${BASE_URL}dowpods/service/info/save`, //
    method: 'post',
    data
  })
}

export function dowpodsServiceInfoApproval(data) {
  return request({
    url: `${BASE_URL}dowpods/service/info/approval`, //
    method: 'post',
    data
  })
}

export function dowpodsServiceInfoPage(data) {
  return request({
    url: `${BASE_URL}dowpods/service/info/page`, //获取详情
    method: 'get',
    params: data
  })
}  

export function getQccRiskInfo(creditCode) {
  return request({
    url: `${BASE_URL}qcc/risk/getQccRiskInfo?creditCode=${creditCode}`,
    method: 'get',
  })
}
  
export function dowpodsServiceInfoSelectOne(serviceId) {
  return request({
    url: `${BASE_URL}dowpods/service/info/selectOne?serviceId=${serviceId}`,
    method: 'get',
  })
}
  
export function dowpodsServiceInfoSelectFile(serviceId) {
  return request({
    url: `${BASE_URL}dowpods/service/info/selectFile?serviceId=${serviceId}`,
    method: 'get',
  })
}
export function getdfnew(data) {
  return request({
    url: `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/dhBoss/serviceMerchant/listUserService`, //
    method: 'post',
    data
  })
}