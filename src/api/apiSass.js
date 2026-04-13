import request from '../utils/request.js';


const BASE_URL =`/saasapi`
export function test(path,method) {
  return request({
    url: `https://prod-api.dowsure.com${BASE_URL}${path}`, 
    method: `${method}`,
    headers:{
        clientid:'f4527684987a4d48aaf191a03d8a3176',
        apisass:'true',
    },
  })
}