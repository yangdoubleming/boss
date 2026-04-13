//统计
import request from '../utils/request.js';
// const BASE_URL = 'https://toufang.dowsure.com'
// const BASE_URL = 'http://192.168.10.254:8011/Api'
const BASE_URL = `${process.env.VUE_APP_TOUFANG_URL}`
var qs = require('qs')




export function itemsBanner(gatewayCode, page) { // 项目banner管理
  return request({
    url: BASE_URL + `/dowsureBannel/groupList?type=&gatewayCode=${gatewayCode}&rows=${10}&page=${page}`,
    method: 'get',
  })
}

export function createBanner(data) { // 创建banner
  return request({
    url: BASE_URL + `/dowsureBannel`,
    method: 'PATCH',
    data
  })
}
export function addOrUpdateEmail(data) { // 新增 修改邮箱
  return request({
    url: BASE_URL + `/dowsureMail`,
    method: 'PUT',
    data
  })
}

export function deleteEmail(ids) { //删除
  return request({
    url: BASE_URL + `/dowsureMail?ids=${ids}`,
    method: 'DELETE',
  })
}

export function popupList(data) { // 弹窗列表
  return request({
    url: BASE_URL + `/dowsurePopup`,
    method: 'post',
    data
  })
}
export function emailList(data) { // 邮箱配置
  return request({
    url: BASE_URL + `/dowsureMail`,
    method: 'post',
    data
  })
}

export function addOrUpdatePopup(data) { // 新增 修改弹窗
  return request({
    url: BASE_URL + `/dowsurePopup`,
    method: 'PUT',
    data
  })
}

export function deletePopup(ids) { //删除
  return request({
    url: BASE_URL + `/dowsurePopup?ids=${ids}`,
    method: 'DELETE',
  })
}

export function bannerList(data) { // banner列表
  return request({
    url: BASE_URL + `/dowsureBannel`,
    method: 'post',
    data
  })
}
export function deleteBanner(ids) { // 删除banner
  return request({
    url: BASE_URL + `/dowsureBannel?ids=${ids}`,
    method: 'DELETE',
  })
}



export function userPage(data) { // 用户列表
  return request({
    url: BASE_URL + `/sendPoint/searchKey`,
    method: 'post',
    data
  })
}
export function addPlatform(data) { // 新增渠道
  return request({
    url: BASE_URL + `/boss/platform/addPlatform`,
    method: 'post',
    data
  })
}

export function activityList(data) { // 活动列表
  return request({
    url: BASE_URL + `/boss/event/getChannelEventList`,
    method: 'post',
    data
  })
}
export function throwList(data) { // 投放列表
  return request({
    url: BASE_URL + `/boss/platform/getPlatformList`,
    method: 'post',
    data
  })
}

export function createActivity(data) { // 创建活动
  return request({
    url: BASE_URL + `/boss/event/addChannelEvent`,
    method: 'post',
    data
  })
}
export function getPlatformIsEnableList(data) { // 获取活动下所有的渠道和启用状态
  return request({
    url: BASE_URL + `/boss/platformEnable/getPlatformIsEnableList`,
    method: 'post',
    data
  })
}
export function enablePlatform(data) { // 活动投放启用
  return request({
    url: BASE_URL + `/boss/platformEnable/enablePlatform`,
    method: 'post',
    data
  })
}

export function getPlatformList(data) { // 渠道管理列表
  return request({
    url: BASE_URL + `/boss/platform/getList`,
    method: 'post',
    data
  })
}
export function getEvent(data) { // 活动详情
  return request({
    url: BASE_URL + `/boss/event/getEvent`,
    method: 'post',
    data
  })
}



export function getMerchant(data) { // 渠道商管理
  return request({
    url: BASE_URL + `/boss/merchant/getMerchant`,
    method: 'post',
    data
  })
}
export function getMerchantDetail(id) { // 渠道商管理详情
  return request({
    url: BASE_URL + `/boss/merchant/getMerchant/${id}`,
    method: 'get',

  })
}

export function createOrEditDetail(data, postMethods) { // 新增喝修改渠道商
  return request({
    url: BASE_URL + `/boss/merchant/submit`,
    method: postMethods,
    data
  })
}
export function getPlatfrom(type,) { // 获取贷款或者保险的类目 
  return request({
    url: BASE_URL + `/boss/merchant/getPlatfrom?type=${type}`,
    method: 'get',

  })
}



export function createDetail(data) { // 保存渠道商
  return request({
    url: BASE_URL + `/boss/merchant/create`,
    method: 'PUT',
    data
  })
}
export function approve(id, bossName) { // 审批
  return request({
    url: BASE_URL + `/boss/merchant/approve/${id}?bossName=${bossName}`,
    method: 'PATCH',
  })
}

export function settlement(data) { // 获取渠道商运营数据列表 
  return request({
    url: BASE_URL + `/boss/settlement`,
    method: 'post',
    data
  })
}
export function returnApprove(id, bossNmae) { // 驳回 
  return request({
    url: BASE_URL + `/boss/merchant/submit/${id}?bossName=${bossNmae}`,
    method: 'post',
  })
}


export function changePaymentStatus(ids) { // 付款 
  return request({
    url: BASE_URL + `/boss/settlement?ids=${ids}`,
    method: 'PATCH',
  })
}

export function getDataInfo(periodsNumber, merchantCode, rows, page) { // 结算明细 
  return request({
    url: BASE_URL + `/boss/settlement/insurance?periodsNumber=${periodsNumber}&merchantCode=${merchantCode}&rows=${rows}&page=${page}`,
    method: 'get',
  })
}

export function getServiceFeeList(params) { // 收费管理列表
  return request({
    url: `/lending/service/fee/page`,
    method: 'get',
    params
  })
}

export function generateProtocol(data) { // 生成协议 
  return request({
    url: `/lending/service/fee/generate/protocol`,
    method: 'post',
    data
  })
}

export function confirmReceipt(data) { // 确认收款 
  return request({
    url: `/lending/service/fee/confirm/receipt`,
    method: 'post',
    data
  })
}

export function fileSave(data) { // 新增文件绑定 
  return request({
    url: `/lending/file/save`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function fileList(params) { // 根据文件类型和绑定id查询文件 
  return request({
    url: `/lending/file/list`,
    method: 'get',
    params
  })
}

export function getCouponFaceUrl(params) { // 生成签约url 
  return request({
    url: `${process.env.VUE_APP_SHOPEE}/lending/couponfadada/getCouponFaceUrl`,
    method: 'get',
    params
  })
}

export function getSignUrl(params) { // 根据授信单号查询签约链接 
  return request({
    url: `${process.env.VUE_APP_SHOPEE}/lending/couponfadada/getSignUrl`,
    method: 'get',
    params
  })
}

export function getCouponUrl(params) { // 根据申请单号查询协议url
  return request({
    url: `${process.env.VUE_APP_SHOPEE}/lending/couponfadada/getContractUrl`,
    method: 'get',
    params
  })
}

export function getReceivableRate(params) { // 获取费率
  return request({
    url: `/lending/service/fee/getReceivableRate`,
    method: 'get',
    params
  })
}

export function getReceivableAmount(params) { // 获取应收金额
  return request({
    url: `/lending/service/fee/getReceivableAmount`,
    method: 'get',
    params
  })
}

export function getProductName(params) { // 获取应收金额
  return request({
    url: `/lending/service/fee/getName`,
    method: 'get',
    params
  })
}

export function addServiceFee(params) { // 获取应收金额
  return request({
    url: `/lending/service/fee/addServiceFee`,
    method: 'get',
    params
  })
}


export function pageQueryOverdue(params) { // 逾期管理页面
  return request({
    url: `/lending/loan/page/overdue`,
    method: 'get',
    params
  })
}

export function getOverdueLoanVo(params) { // 逾期管理页面统计数据
  return request({
    url: `/lending/loan/query/overdue`,
    method: 'get',
    params
  })
}

export function getOverdueNoteCount(params) { // 根据贷款单号获取跟进记录数
  return request({
    url: `/lending/overdue/note/count`,
    method: 'get',
    params
  })
}

export function overdueNoteSave(data) { // 新增跟进记录
  return request({
    url: `/lending/overdue/note/save`,
    method: 'post',
    data
  })
}

export function overdueNoteUpdate(data) { // 修改跟进记录
  return request({
    url: `/lending/overdue/note/update`,
    method: 'post',
    data
  })
}

export function overdueNoteDelete(params) { // 删除跟进记录
  return request({
    url: `/lending/overdue/note/delete?id=${params}`,
    method: 'delete',
  })
}

export function getOverdueNoteList(params) { // 根据贷款单号获取跟进记录
  return request({
    url: `/lending/overdue/note/list?loanCode=${params}`,
    method: 'get',
  })
}

export function getPaymentLoanList(params) { // 根据贷款单号获取支付公司传数信息
  return request({
    url: `/lending/payment/loan/list?loanCode=${params}`,
    method: 'get',
  })
}

export function getOverdueDeductionRecordList(params) { // 根据贷款单号获取强制划扣记录
  return request({
    url: `/lending/overdue/deduction/record/list?loanCode=${params}`,
    method: 'get',
  })
}

export function serviceFeeSave(data) { // 服务费线下录单
  return request({
    url: `/lending/service/fee/save`,
    method: 'post',
    data
  })
}

export function serviceFeeUpdate(data) { // 修改服务费
  return request({
    url: `/lending/service/fee/update`,
    method: 'post',
    data
  })
}

export function loanChannelList(params) { // 贷款渠道列表
  return request({
    url: `${process.env.VUE_APP_CHANNEL}/channel-market/loan-merchant/page`,
    method: 'get',
    params
  })
}

export function addMarketChannel(data) { // 添加贷款渠道
  return request({
    url: `${process.env.VUE_APP_CHANNEL}/channel-market/loan-merchant`,
    method: 'post',
    data
  })
}

export function editMarketChannel(data) { // 添加贷款渠道
  return request({
    url: `${process.env.VUE_APP_CHANNEL}/channel-market/loan-merchant/${data.id}`,
    method: 'put',
    data
  })
}

export function sourceList(data) { // 分页查询
  return request({
    url: `/lending/sourceType/getAll`,
    method: 'post',
    data
  })
}

export function levelList(params) { // 新增弹窗获取所有级别
  return request({
    url: `/lending/sourceType/getAllLevel`,
    method: 'get',
    params
  })
}

export function levelSecondList(params) { // 新增弹窗根据父级获取级别
  return request({
    url: `/lending/sourceType/getSourceByLevel`,
    method: 'get',
    params
  })
}

export function levelByInfo(params) { // 筛选根据父级获取级别
  return request({
    url: `/lending/sourceType/getInfoByLevel`,
    method: 'get',
    params
  })
}

export function addSource(data) { // 筛选根据父级获取级别
  return request({
    url: `/lending/sourceType/add`,
    method: 'post',
    data
  })
}

export function loanList(data) { // 贷款渠道列表
  return request({
    url: `/lending/merchant/getAll`,
    method: 'post',
    data
  })
}

export function loanPCUrl(params) { //PC链接
  return request({
    url: `/lending/merchant/getPcUrl`,
    method: 'get',
    params
  })
}
export function loanMiniUrl(params) { // 小程序链接
  return request({
    url: `/lending/merchant/getMiniUrl`,
    method: 'get',
    params
  })
}
export function allSource(params) { // 所有来源
  return request({
    url: `/lending/sourceType/getInfo`,
    method: 'get',
    params
  })
}

export function addNewSource(data) { // 新增来源
  return request({
    url: `/lending/merchant/add`,
    method: 'post',
    data
  })
}

export function updateNewSource(data) { // 修改来源
  return request({
    url: `/lending/merchant/update`,
    method: 'post',
    data
  })
}

export function saveOffline(data) { // 修改来源
  return request({
    url: `/lending/service/fee/save/offline`,
    method: 'post',
    data
  })
}

export function serviceFeeDetails(params) { // 根据贷款单号获取强制划扣记录
  return request({
    url: `/lending/service/fee/detail`,
    method: 'get',
    params
  })
}

export function serviceFeeApprove(data) { // 豆费审批
  return request({
    url: `/lending/service/fee/approval`,
    method: 'post',
    data
  })
}

export function serviceFeeStatusUpdate(data) { // 修改服务费
  return request({
    url: `/lending/service/fee/update/invoice/status`,
    method: 'post',
    data
  })
}