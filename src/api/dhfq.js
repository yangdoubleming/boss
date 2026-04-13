import request from '../utils/request.js';


// const BASE_URL =`http://357r14972r.51vip.biz/`
const BASE_URL = `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/`
const DOW_FW = `${process.env.VUE_APP_DOUFW}`

export function serveList(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/list`, //
    method: 'post',
    data
  })
}
export function upstatus(id, status) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/upstatus?id=${id}&status=${status}`, //服务商审批
    method: 'post',

  })
}
export function fileList(ids) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/file?ids=${ids}`, //get文件
    method: 'get',

  })
}
export function getBank(userServiceProviderId) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/bank?userServiceProviderId=${userServiceProviderId}`, //获取银行信息
    method: 'get',

  })
}
export function getBankForLoan(loan) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/bank/${loan}`, //获取银行信息
    method: 'get',

  })
}
export function activateCredit(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/activate/credit`, //通过授信
    method: 'post',
    data
  })
}
export function activateLoan(loanCode, data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/activate/loan/${loanCode}`, //确认放款
    method: 'post',
    data
  })
}
export function getLoanFile(loanCode) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/loan/file/${loanCode}`, //放款凭证
    method: 'get',

  })
}
export function setLoanFile(loanCode, data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/loan/file/${loanCode}`, //上传 贷款单号的 付款凭证
    method: 'post',
    data
  })
}

export function repaymentPlan(loanCode) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/repaymentPlan/${loanCode}`, //还款计划
    method: 'get',

  })
}
export function getLoanDetail(loanCode) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/getBossLoanDetail?loanCode=${loanCode}`, //获取详情
    method: 'get',
  })
}

export function getLoanList(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/loan/list`, //获取列表
    method: 'post',
    data
  })
}

export function exportLoan(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/loan/list`,
    method: 'get',
    params: data
  })
}
export function removeFile(id) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/loan/loanfile/${id}`, //作废图片
    method: 'post',

  })
}

export function getProviderApprove(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/page`,
    method: 'get',
    params: data
  })
}

export function getProviderApproveCondition() {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/providerApproveCondition`,
    method: 'get',
  })
}
export function getProviderApproveDetail(id) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/providerApproveDetail?id=${id}`,
    method: 'get',
  })
}

export function approve(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/approveProvider`,
    method: 'put',
    params: data
  })
}

export function cancel(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/cancelApproveProvider`,
    method: 'put',
    params: data
  })
}

export function uploadCooperationAgreement(data) {
  return request({
    url: `${BASE_URL}dhBoss/serviceMerchant/uploadCooperationAgreement`,
    method: 'put',
    params: data
  })
}

export function dowfuUp(data) {
  return request({
    url: `${DOW_FW}`,
    method: 'post',
    data
  })
}