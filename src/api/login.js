import request from '../utils/request.js';



  var qs = require('qs')

export function login(data) {
  return request({
    // eslint-disable-next-line no-undef
    url: `/sign_in`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


export function loginOut() {
  return request({
    url: `/sign_up`,
    method: 'post',
  })
}

