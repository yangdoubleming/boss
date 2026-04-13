
import request from '../utils/request.js';

export function account(BName,BPhoneNumber,current) {
  return request({
    url: `/lending/pfrepayment/account/info?BName=${BName}&BPhoneNumber=${BPhoneNumber}&size=10&current=${current}`,
    method: 'get',
  })
}
export function balance(userId) {
  return request({
    url: `/lending/pfrepayment/account/balance?userId=${userId}`,
    method: 'get',
  })
}
export function pfrepayment() {
  return request({
    url: `/lending/pfrepayment/refresh/balance`,
    method: 'get',
  })
}
export function diff() {
  return request({
    url: `/lending/pfrepayment/diff/find`,
    method: 'get',
  })
}


