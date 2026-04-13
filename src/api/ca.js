import request from '../utils/request.js';

export function getList(data) {
  return request({
    url: `/lending/ca/page`,
    method: 'post',
    data
  })
}
export function createCA(data) {
    return request({
      url: `/lending/ca/save`,
      method: 'post',
      data
    })
  }
  export function getDetail(applicationCode) {
    return request({
      url: `/lending/ca/detail?applicationCode=${applicationCode}`,
      method: 'get',
      
    })
  }
  export function getSignContractAttachment(applicationCode) {
    return request({
      url: `/lending/ca/getSignContractAttachment?applicationCode=${applicationCode}`,
      method: 'get',
      
    })
  }
export function getFddPageList(data) {
    return request({
        url: `lending/fdd_general/page`,
        method: 'post',
        data
    });
}

export function getFddLenderList() {
    return request({
        url: `/lending/lender/list`,
        method: 'get'
    });
}
export function getFddLenderCompanyAuthSign() {
    return request({
        url: `/lending/fdd_general/queryCompanyAuthSign`,
        method: 'get'
    });
}

export function saveFddSign(data) {
    return request({
        url: `/lending/fdd_general/save`,
        method: 'post',
        data
    })
}
export function getFddDetail(applicationCode) {
    return request({
        url: `/lending/fdd_general/detail?applicationCode=${applicationCode}`,
        method: 'get',
    })
}
export function refreshFddAuthUrl(applicationId) {
    return request({
        url: `/lending/fdd_general/refreshFddAuthUrl?applicationId=${applicationId}`,
        method: 'get',
    })
}
export function refreshSignContractUrl(applicationId) {
    return request({
        url: `/lending/fdd_general/refreshSignContractUrl?applicationId=${applicationId}`,
        method: 'get',
    })
}
export function getFddSignContractAttachment(applicationCode) {
    return request({
        url: `/lending/fdd_general/getSignContractAttachment?applicationCode=${applicationCode}`,
        method: 'get',
    })
}
