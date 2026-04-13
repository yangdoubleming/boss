import request from '../utils/request.js';
const BASE_URL = '/insurance';
// const BASE_URL2 = process.env.VUE_APP_CHANNEL
const TEXT_URL = process.env.VUE_APP_LTEXT_URL;
const TEXT_URL2 =process.env.VUE_APP_BASE_URL2;
// const TEXT_URL = 'http://10.127.59.11:9013/liebian'
// const BASE_URL = process.env.VUE_APP_INSUR_URL
const BASE_URL2 = process.env.VUE_APP_CHANNEL;
const BASE_URL3 = process.env.VUE_APP_SHOPEE;
const BASE_URL4 = process.env.VUE_APP_INSURE

export function userPage(data) {
    // 用户列表
    return request({
        url: BASE_URL + `/user/page`,
        method: 'post',
        data
    });
}

export function orderDetail(data) {
    // 保单详情
    return request({
        url: BASE_URL2 + `/channel-insurance/policy/orderDetail`,
        method: 'post',
        data
    });
}

export function count(data) {
    // 订单列表总和
    return request({
        url: BASE_URL + `/policy/count`,
        method: 'post',
        data
    });
}

export function orderPage(data) {
    // 订单列表
    return request({
        url: BASE_URL + `/policy/orderPage`,
        method: 'post',
        data
    });
}

export function downloadExcel(data) {
    // 批量模板下载
    return request({
        url: BASE_URL + `/excel/template/download`,
        method: 'get',
        data
    });
}

export function supplePage(data) {
    // 补录列表
    return request({
        url: BASE_URL + `/supple/page`,
        method: 'post',
        data
    });
}

export function detailPage(data) {
    // 补录列表详情
    return request({
        url: BASE_URL + `/supple/detailPage`,
        method: 'post',
        data
    });
}
export function dataBoard(data) {
    // 累计数据
    return request({
        url: BASE_URL + `/board/PolicyCount`,
        method: 'post',
        data
    });
}
export function boardRealTime(data) {
    // 实时数据
    return request({
        url: BASE_URL + `/board/realTime`,
        method: 'post',
        data
    });
}

export function boardCompany(data) {
    // 各保司饼图
    return request({
        url: BASE_URL + `/board/company`,
        method: 'post',
        data
    });
}
export function boardChannel(data) {
    // 订单规模分布
    return request({
        url: BASE_URL + `/board/channel`,
        method: 'post',
        data
    });
}
export function boardOrderTrend(data) {
    // 订单趋势
    return request({
        url: BASE_URL + `/board/orderTrend`,
        method: 'post',
        data
    });
}

export function boardProvince() {
    // 用户区域分布
    return request({
        url: BASE_URL + `/board/province`,
        method: 'post'
    });
}

export function business(data) {
    // 业务数据统计
    return request({
        url: BASE_URL + `/board/business`,
        method: 'post',
        data
    });
}

export function businessClass(data) {
    // 业务分类数据
    return request({
        url: BASE_URL + `/board/businessClass`,
        method: 'post',
        data
    });
}

export function companyPage(data) {
    // 报表统计
    return request({
        url: BASE_URL2 + `/channel-insurance/report/companyPage`,
        method: 'post',
        data
    });
}

export function channelPage(data) {
    //渠道统计
    return request({
        url: BASE_URL2 + `/channel-insurance/report/channelPage`,
        method: 'post',
        data
    });
}

// =================================================  裂变接口  =====================================================

export function getAmountSum(userId) {
    // 合伙人管理总返佣
    return request({
        url: TEXT_URL + `/admin/getAmountSum?userId=${userId}`,
        method: 'get'
    });
}
export function getAmountSumInsurance(userId) {
    // 合伙人管理保险返佣
    return request({
        url: TEXT_URL + `/admin/getAmountSumInsurance`,
        method: 'get'
    });
}

export function getAmountSumLoan(userId) {
    // 合伙人管理贷款返佣
    return request({
        url: TEXT_URL + `/admin/getAmountSumLoan`,
        method: 'get'
    });
}


export function getlistAll() {
    //获取渠道等级列表
    return request({
        url:  `/lending/channel/config/listAll`,
        method: 'get',
        
    });
}


export function updateLevel(data) {
    console.log(data);
    //修改合伙人等级信息
    return request({
        url:  TEXT_URL +  `/user/updateLevel?id=${data.id}&channelLevel=${data.channelLevel}`,
        method: 'get',
       
    });
}

export function updateCoefficient(data) {
    
    //修改渠道配置系数
    return request({
        url:   `/lending/channel/config/update`,
        method: 'post',
        data
    });
}

export function getHistory(channelConfigId) {
    
    //获取产品配置历史信息
    return request({
        url:   `/lending//channel/config/history/listByConfigId?channelConfigId=${channelConfigId}`,
        method: 'get',
        
    });
}



export function getTotalRegisterAmountList(data) {
    // 合伙人管理列表
    return request({
        url: TEXT_URL + `/admin/getRegisterAmountList`,
        method: 'post',
        data
    });
}

export function getLoanRegisterAmountList(data) {
    // 贷款合伙人管理列表
    return request({
        // url: TEXT_URL + `/admin/Loan/getRegisterAmountList`,
        url: TEXT_URL + `/admin/Loan/loanCommissionPage`,
        method: 'post',
        data
    });
}

// export function getRegisetrCount() { // 合伙人总数
//   return request({
//     url: TEXT_URL + `/admin/getRegisterCount`,
//     method: 'get',
//   })
// }

export function ensurePass(data) {
    return request({
        url: TEXT_URL + `/admin/Loan/amountApprove`,
        method: 'post',
        data
    });
}

export function ensureRefuse(data) {
    return request({
        url: TEXT_URL + `/admin/Loan/amountReject`,
        method: 'post',
        data
    });
}

export function getRebateDetailsList(data) {
    // 合伙人返佣明细
    // console.log(data);
    return request({
        url: TEXT_URL + `/admin${data.path}`,
        method: 'post',
        data: data.data
    });
}

export function getUserSettlement(userId, path) {
    // 待结算
    return request({
        url: TEXT_URL + `/admin${path || '/getUserSettlement'}?userId=${userId}`,
        method: 'get'
    });
}

export function getUserSettlementList(userId, page, rows, path) {
    // 结算记录
    return request({
        url: TEXT_URL + `/admin${path || '/getUserSettlementList'}?userId=${userId}&page=${page}&rows=${rows}`,
        method: 'get'
    });
}

export function UserLiquidation(data) {
    // 结算佣金
    return request({
        url: TEXT_URL + `/admin/Insure/UserLiquidation`,
        method: 'post',
        data
    });
}

export function getUserAmountLogList(data) {
    // 返佣流水
    return request({
        url: TEXT_URL + `/admin/getUserAmountLogList`,
        method: 'post',
        data
    });
}

export function getLoanRegisterCount(userId) {
    // 贷款总用户
    return request({
        url: TEXT_URL + `/admin/Loan/getRegisterCount`,
        method: 'get'
    });
}
export function getLoanAmountSumLoan(userId) {
    // 贷款返佣
    return request({
        url: TEXT_URL + `/admin/Loan/getAmountSum`,
        method: 'get'
    });
}

export function downloadList(data) {
    // 返佣明细
    return request({
        url: TEXT_URL + `/download/getUserAmountLogList`,
        method: 'post',
        data
    });
}

export function getTotalRegisterCount(userId) {
    // 总用户
    return request({
        url: TEXT_URL + `/admin/getRegisterCount`,
        method: 'get'
    });
}
export function getAmountSumApi(userId, path) {
    // 返佣
    return request({
        url: TEXT_URL + `/admin${path}?userId=${userId || ''}`,
        method: 'get'
    });
}

export function getStatisticsAmount(userId, tabType, pageType) {
    // 合伙人管理总返佣
    return request({
        url: TEXT_URL + `/admin/getStatisticsAmount?userId=${userId}&tabType=${tabType}&pageType=${pageType}`,
        method: 'get'
    });
}

export function getInsuranceRegisterCount(userId) {
    // 保险总用户
    return request({
        url: TEXT_URL + `/admin/Insure/getRegisterCount`,
        method: 'get'
    });
}
export function newGetAmountSumInsurance(userId) {
    // baox返佣
    return request({
        url: TEXT_URL + `/admin/Insure/getAmountSumInsurance`,
        method: 'get'
    });
}

export function getRegisterAmountList(data) {
    // 保险合伙人管理列表
    return request({
        url: TEXT_URL + `/admin/Insure/getRegisterAmountList`,
        method: 'post',
        data
    });
}

export function getRebateDetailsListPeriods(id) {
    // 贷款单明细
    return request({
        url: TEXT_URL + `admin/Loan/getRebateDetailsListPeriods?loanCode=${id}`,
        method: 'get'
    });
}

export function liebianJoinLoan(data) {
    // 关联新客户
    return request({
        url: TEXT_URL + `admin/Loan/liebianJoinLoan`,
        method: 'PUT',
        data
    });
}

export function getLoanUserList(data) {
    // 贷款客户
    return request({
        // url: TEXT_URL + `/admin/Loan/getLoanUser`,
        url: TEXT_URL + `/admin/Loan/getLoanUserList`,
        method: 'post',
        data
    });
}

export function batchsettlement(userIds, bossName) {
    // 批量结算
    return request({
        url: TEXT_URL + `/admin/Loan/batchsettlement?userIds=${userIds}&bossName=${bossName}`,
        method: 'PUT'
    });
}

export function getLoanUserCount(userId) {
    return request({
        url: TEXT_URL + `/admin/Loan/getLoanUserCount?userId=${userId}`,
        method: 'get'
    });
}

export function insuCommissionPage(data) {
    // 保险佣金结算列表
    return request({
        url: TEXT_URL + `/admin/Insure/insuCommissionPage`,
        method: 'post',
        data
    });
}

export function queySettleRecord(data) {
    // 保险结算记录
    return request({
        url: TEXT_URL + `/admin/queySettleRecord`,
        method: 'post',
        data
    });
}

export function settleable(data) {
    // 可结算佣金
    return request({
        url: TEXT_URL + `/admin/settleable`,
        method: 'post',
        data
    });
}

export function batchUserLiquidation(data) {
    // 批量结算
    return request({
        url: TEXT_URL + `/admin/batchUserLiquidation`,
        method: 'post',
        data
    });
}

export function queySettleDetailRecord(data) {
    // 结算详情
    return request({
        url: TEXT_URL + `/admin/queySettleDetailRecord`,
        method: 'post',
        data
    });
}

export function activity(data) {
    // 数据统计 活动效果
    return request({
        url: TEXT_URL + `/statistics/activity	`,
        method: 'post',
        data
    });
}

export function rebate(data) {
    // 数据统计 保险返佣
    return request({
        url: TEXT_URL + `/statistics/rebate	`,
        method: 'post',
        data
    });
}

export function statisticsOrder(data) {
    // 数据统计 订单趋势
    return request({
        url: TEXT_URL + `/statistics/order`,
        method: 'post',
        data
    });
}

export function statisticsParent(data) {
    // 数据统计 合伙人趋势
    return request({
        url: TEXT_URL + `/statistics/parent`,
        method: 'post',
        data
    });
}

export function updateMoneyInterestRate(data) {
    // 返佣系数修改
    return request({
        url: TEXT_URL + `/user/updateRate`,
        method: 'post',
        data
    });
}

export function getCommissionProvider() {
    // 返佣系数资方数据
    return request({
        url: TEXT_URL2 + `/lending/lender/list`,
        method: 'get',
    });
}
export function addCommissionProvider(data) {
    // 添加返佣资方
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/save`,
        method: 'post',
        data
    });
}
export function getCommissionProviderList() {
    // 获取资方列表
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/list`,
        method: 'get',
    });
}
export function getProductByProvider(data) {
    // 获取产品配置表信息
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/listByLenderId?lenderId=${data.lenderId}`,
        method: 'get'
    });
}
export function updateCommissionRate(data) {
    // 修改佣金系数比例
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/update`,
        method: 'post',
        data
    });
}
export function updateHistoryCommissionRate(data) {
    // 修改历史佣金系数比例
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/history/update`,
        method: 'post',
        data
    });
}

export function getProductHistoryByProvider(data) {
    // 获取产品配置表历史信息
    return request({
        url: TEXT_URL2 + `/lending/lender/product/config/history/listByConfigId?lenderProductConfigId=${data.lenderProductConfigId}`,
        method: 'get'
    });
}
// /lender/product/config/history/listByConfigId
// =================================================== 保司管理 =========================================================
export function companyPageList(data) {
    // 保司列表
    return request({
        url: BASE_URL2 + `/channel-insurance/company/companyPage`,
        method: 'post',
        data
    });
}

export function addAndUpdate(data, companyId) {
    // 保司管理新增
    return request({
        url: BASE_URL2 + `/channel-insurance/company/addAndUpdate`,
        method: 'post',
        data,
        headers: {
            companyId
        }
    });
}

export function productPage(data) {
    // 保司产品管理
    return request({
        url: BASE_URL2 + `/channel-insurance/company/productPage`,
        method: 'post',
        data
    });
}

export function detailCompany(data) {
    // 保司详情协议和信息
    return request({
        url: BASE_URL2 + `/channel-insurance/company/detailCompany`,
        method: 'post',
        data
    });
}

export function addAndUpdateByProduct(data, productId) {
    // 新增产品
    return request({
        url: BASE_URL2 + `/channel-insurance/company/addAndUpdateByProduct`,
        method: 'post',
        data,
        headers: {
            productId
        }
    });
}

export function orderList(data) {
    // 新订单列表
    return request({
        url: BASE_URL2 + `/channel-insurance/policy/boss/orderPage`,
        method: 'post',
        data
    });
}

export function auditList(data) {
    // 新订单列表
    return request({
        url: BASE_URL + `/audit/list`,
        method: 'post',
        data
    });
}

export function approveOrder(data) {
    // 新订单列表
    return request({
        url: BASE_URL + `/audit/approveOrder`,
        method: 'post',
        data
    });
}

export function addInsuranceAudit(data) {
    // 保司管理新增
    return request({
        url: BASE_URL + `/audit/add`,
        method: 'post',
        data
    });
}

export function orderList2(data) {
    // 新订单列表
    return request({
        url: BASE_URL2 + `/channel-insurance/policy/orderTypePage`,
        method: 'post',
        data
    });
}
export function productDetail(data) {
    // 编辑产品
    return request({
        url: BASE_URL2 + `/channel-insurance/company/productDetail`,
        method: 'post',
        data
    });
}
export function platformList2() {
    // 渠道分类2
    return request({
        url: BASE_URL2 + `/channel-market/platform/boss/page`,
        method: 'get'
    });
}
export function platformList() {
    // 渠道分类
    return request({
        url: BASE_URL2 + `/channel-market/platform/page`,
        method: 'get'
    });
}
export function getStatusList(type) {
    // 渠道 状态
    return request({
        url: BASE_URL2 + `/channel-market/merchant/getStatus?type=${type}`,
        method: 'get'
    });
}
export function getChannelList(params) {
    // 渠道 列表
    return request({
        url: BASE_URL2 + `/channel-market/merchant/page`,
        method: 'get',
        params
    });
}

export function getInsurancelList(params) {
    // 保司流水 列表
    return request({
        url: BASE_URL2 + `/channel-market/insurance-amount/page`,
        method: 'get',
        params
    });
}
export function saveChannel(data) {
    // 渠道 保存
    return request({
        url: BASE_URL2 + `/channel-market/merchant/save`,
        method: 'post',
        data
    });
}

export function channelDetail(id) {
    // 渠道 详情
    return request({
        url: BASE_URL2 + `/channel-market/merchant/getMerchantById?id=${id}`,
        method: 'get'
    });
}
export function channelCommissionList(params) {
    // 渠道返佣流水
    return request({
        url: BASE_URL2 + `/channel-market/user-amount/page`,
        method: 'get',
        params
    });
}
export function getTotal(params) {
    // 查询保司总的佣金接口
    return request({
        url: BASE_URL2 + `/channel-market/insurance-amount/total/commission`,
        method: 'get',
        params
    });
}
export function updateChannel(data) {
    // 渠道 修改
    return request({
        url: BASE_URL2 + `/channel-market/merchant/update`,
        method: 'post',
        data
    });
}

export function rejectedChannel(data) {
    //审批驳回
    return request({
        url: BASE_URL2 + `/channel-market/merchant/rejected`,
        method: 'post',
        data
    });
}
export function approvedChannel(data) {
    //审批通过
    return request({
        url: BASE_URL2 + `/channel-market/merchant/approved`,
        method: 'post',
        data
    });
}

export function listOperator(params) {
    //渠道运营列表
    return request({
        url: BASE_URL2 + `/channel-market/user-amount/listOperator`,
        method: 'get',
        params
    });
}
export function logList(params) {
    //变更记录
    return request({
        url: BASE_URL2 + `/channel-market/merchant-log/page`,
        method: 'get',
        params
    });
}

export function isRegister(iphone) {
    // 是否有密码
    return request({
        url: BASE_URL2 + `/channel-user/channel-sysuser/getPwd?iphone=${iphone}`,
        method: 'get'
    });
}

export function createUser(params) {
    // 生成账户
    return request({
        url: BASE_URL2 + `/channel-user/channel-sysuser/save`,
        method: 'get',
        params
    });
}

export function productDetele(data) {
    // 删除产品
    return request({
        url: BASE_URL + `/company/productDetele`,
        method: 'post',
        data
    });
}
export function channelTableData(data) {
    // 渠道统计表哥
    return request({
        url: BASE_URL2 + `/channel-market/report/channel`,
        method: 'post',
        data
    });
}
export function renewTableData(data) {
    // 续保表格
    return request({
        url: BASE_URL2 + `/channel-market/report/channel/renew/insurance`,
        method: 'post',
        data
    });
}


export function getChannelCode(params) {
    // 根据手机号获取渠道码
    return request({
        url: BASE_URL3 + `/dowsure-merchant/partner/v7/getChannelCode`,
        method: 'get',
        params
    });
}

export function getNameByPhone(params) {
    // 根据手机号获取姓名
    return request({
        url: BASE_URL3 + `/dowsure-merchant/partner/v7/getNameByPhone`,
        method: 'get',
        params
    });
}

export function bindChannelCode(params) {
    // 绑定客户和合伙人
    return request({
        url: BASE_URL3 + `/dowsure-merchant/partner/v7/bindChannelCode`,
        method: 'get',
        params
    });
}


export function unbindLoanUser(params) {
    //解绑客户和合伙人
    return request({
        url: BASE_URL3 + `/dowsure-merchant/partner/v7/unbundleChannelCode`,
        method: 'get',
        params
    });
}

export function getInsureByOrderNo(params) {
    // 列表
    return request({
        url: BASE_URL4 + `/dadiLine/policy-batch/getInsureByOrderNo`,
        method: 'get',
        params
    });
}
export function updateInsureByOrderNo(data) {
    // 保单修改
    return request({
        url: BASE_URL4 + `/dadiLine/dadi-zrx/updateIns`,
        method: 'post',
        data
    });
}
export function updateInsureByOrderNoHistory(params) {
    // 保单修改记录
    return request({
        url: BASE_URL4 + `/dadiLine/policy-batch/page`,
        method: 'get',
        params
    });
}