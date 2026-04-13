import request from '../utils/request.js';

const BASE_URL = `${process.env.VUE_APP_BASE_URL}`

export function getTableList(data) {
  return request({
    url: `/lending/initiate-approval/page?current=${data.current}&size=${data.size}&applicationCode=${data.applicationCode}&lenderName=${data.lenderName}&approvalType=${data.approvalType}&borrowerMobilePhone=${data.borrowerMobilePhone}&borrowerName=${data.borrowerName}&startTime=${data.startTime}&endTime=${data.endTime}&lenderProductName=${data.lenderProductName}&userId=${data.userId}`,
    method: 'get',
  })
}

//待审批列表接口
export function getApprovalTableList(data) {
  return request({
    url: `/lending/initiate-approval/page/approval?current=${data.current}&size=${data.size}&applicationCode=${data.applicationCode}&lenderName=${data.lenderName}&approvalType=${data.approvalType}&borrowerMobilePhone=${data.borrowerMobilePhone}&borrowerName=${data.borrowerName}&startTime=${data.startTime}&endTime=${data.endTime}&lenderProductName=${data.lenderProductName}&userId=${data.userId}&loginId=${data.loginId}`,
    method: 'get',
  })
}


//查看详情
export function getDetail(id) {
  return request({
    url: `/lending/initiate-approval/getById?id=${id}`,
    method: 'get',
  })
}


//风控拒绝
export function approvalReject(data) {
  return request({
    url: `/lending/initiate-approval/reject`,
    method: 'post',
    data
  })
}

//风控初审通过
export function getApproval_1st(data) {
  return request({
    url: `/lending/initiate-approval/approval/approval_1st`,
    method: 'post',
    data
  })
}

//风控复审通过
export function getApproval_2nd(data) {
  return request({
    url: `/lending/initiate-approval/approval/approval_2nd?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//风控终审通过
export function getApproval_3ep(data) {
  return request({
    url: `/lending/initiate-approval/approval/approval_3ep?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}


//支用详情
export function getLoanInfoById(id) {
  return request({
    url: `/lending/initiate-approval/getLoanInfoById?id=${id}`,
    method: 'get',
  })
}


//支用拒绝
export function loanReject(data) {
  return request({
    url: `/lending/initiate-approval/reject/loan`,
    method: 'post',
    data
  })
}

//支用风控初审通过接口
export function loan_approval_1st(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_1st`,
    method: 'post',
    data
  })
}


//支用风控复核通过接口
export function loan_approval_2nd(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_2nd?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}


//支用风控复核通过接口
export function loan_operation(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_operation?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}&loanFiles=${data.loanFiles}`,
    method: 'get',
  })
}

//支用财务头寸审核通过接口
export function finance_operation(data) {
  return request({
    url: `/lending/initiate-approval/approval/finance_operation?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//支用财务上传放款凭证接口
export function finance_operation_upload(data) {
  return request({
    url: `/lending/initiate-approval/approval/finance_operation_upload?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}&financialDisbursementVoucherUrl=${data.financialDisbursementVoucherUrl}&initiateStatus=${data.initiateStatus}`,
    method: 'get',
  })
}



//支用ceo审批接口
export function loan_approval_ceo(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_ceo?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//支用班委1审批接口
export function loan_approval_3ep1(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_3ep1?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//支用班委2审批接口
export function loan_approval_3ep2(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_3ep2?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//支用班委3审批接口
export function loan_approval_3ep3(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_3ep3?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}

//支用班委4审批接口
export function loan_approval_3ep4(data) {
  return request({
    url: `/lending/initiate-approval/approval/loan_approval_3ep4?id=${data.id}&approvalOpinion=${data.approvalOpinion}&loginId=${data.loginId}`,
    method: 'get',
  })
}


//审批记录
export function getRecordList(data) {
  return request({
    url: `/lending/approval-record/list?initiateCode=${data.initiateCode}&approvalType=${data.approvalType}`,
    method: 'get',
  })
}

//获取所有补充资料
export function findAdditionalInformation(applicationCode) {
  return request({
    url: `/lending/initiate-approval/findAdditionalInformation?applicationCode=${applicationCode}`,
    method: 'get',
  })
}
//查出入账凭证相关信息
export function findReceiptInfo(applicationCode,loanCode) {
  return request({
    url: `/lending/initiate-approval/findReceiptInfo?applicationCode=${applicationCode}&loanCode=${loanCode}`,
    method: 'get',
  })
}




//还款方式
export function getProductByLenderId(lenderId) {
  return request({
    url: `/lending/initiate-approval/getProductByLenderId?lenderId=${lenderId}`,
    method: 'get',
  })
}

//判断是否 显示续贷
export function getLoanStatusById(params) {
  return request({
    url: `/lending/initiate-approval/getLoanStatusById`,
    method: 'get',
    params
  })
}

//CMC审批通过接口
export function cmcApprovalPass(data) {
  return request({
    url: `/lending/cmc-approval/pass`,
    method: 'post',
    data
  })
}

export function getIdMes(params) {
    // 获取资方信息
    return request({
        url: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-lendingcore/dict/listDictByCode`,
        method: "get",
        params
    })
}