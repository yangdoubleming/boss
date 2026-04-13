import request from '../utils/request.js';
let base = 'http://192.168.10.160:8300';
const merchantUrl = process.env.VUE_APP_BOSS_MODULE;
const BWInfoUrl = process.env.VUE_APP_BW;
const url = process.env.VUE_APP_BASE_URL;

//录入豆服结算价
export function settlementPrice(params) {
    return request({
        url: `/lending/loan/add/SettlementPrice`,
        method: 'get',
        params
    });
}
//录入服务商服务费
export function SettlementBrokeragePrice(data) {
    return request({
        url: `/lending/loan/add/SettlementBrokeragePrice`,
        method: 'post',
        data
    });
}

//给银行传流水
export function sendBank(data) {
    return request({
        url: `/lending/loan/payment/voucher/save`,
        method: 'post',
        data
    });
}

//给汇丰传数据
export function sendHuiFeng(data) {
    return request({
        url: `/lending/offer/lender/data/send/hkhf`,
        method: 'post',
        data
    });
}

//获取风控模型
export function getModel(params) {
    return request({
        url: `/lending/risk/model/data/getRiskData`,
        method: 'get',
        params
    });
}

//获取最新风控模型
export function getNewModel(params) {
    return request({
        url: `/lending/risk/model/data/reqRiskModel`,
        method: 'get',
        params
    });
}

//线下上传协议

export function upMore(data) {
    return request({
        url: `/lending/fdd/contract/offlineUpload`,
        method: 'post',
        data
    });
}
//获取企查查
export function getQCC(params) {
    return request({
        url: `${BWInfoUrl}/qcc/risk/getRiskControlInfoDetail`,
        method: 'get',
        params
    });
}

//获取企查查
export function checkQCC(params) {
    return request({
        url: `${url}/lending/qcc/getRiskControlInfo`,
        method: 'get',
        params
    });
}

//获取百维
export function getBW(data) {
    return request({
        url: `${url}/lending/bw/fintech/getStrategy`,
        method: 'post',
        data
    });
}
//测试百维
export function checkBW(data) {
    return request({
        url: `${BWInfoUrl}/bw-fintech-client/getStrategy/history`,
        method: 'post',
        data
    });
}

export function getAll(data) {
    return request({
        url: `${merchantUrl}/dowsure-qichacha/br-client/allReq`,
        method: 'post',
        data
    });
}

//获取借据
export function getLoanIncome(params) {
    return request({
        url: `${merchantUrl}/lending/data-loan-total/page`,
        method: 'get',
        params
    });
}

//获取担保链接
export function getLink(params) {
    return request({
        url: `${merchantUrl}/dowsure-merchant/esign/getEsignPaymentContractUrl`,
        method: 'get',
        params
    });
}

//汇丰人民币 账号锁定
export function hsbcOfferLocks(params) {
    return request({
        url: `${merchantUrl}/dowsure-merchant//hsbc/offerLocks`,
        method: 'get',
        params
    });
}

export function getBaiRong(params) {
    return request({
        url: `/lending/risk/control/list`,
        method: 'get',
        params
    });
}

export function getShopByOfferId(params) {
    return request({
        url: `/lending/offer/getOldDataByOfferId`,
        method: 'get',
        params
    });
}
export function getShopByOfferIdLoan(params) {
    return request({
        url: `/lending/offer/getDataByOfferId`,
        method: 'get',
        params
    });
}

export function getLenderList(params) {
    return request({
        url: `/lending/lender/getLenderList`,
        method: 'get',
        params
    });
}

export function isparentChild(params) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/psp/shop/payment/authentication/parentChildAccount?applicationCode=${params.applicationCode}&offerId=${params.offerId}`,
        method: 'get'
    });
}

export function offerVerify(data) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/shop/offer/verify`,
        method: 'post',
        data
    });
}
export function saveBatch(data) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/file/save/batch`,
        method: 'post',
        data
    });
}

export function deletMes(params) {
    return request({
        url: `/lending/loan/fund/delete`,
        method: 'delete',
        params
    });
}

export function addMes(data) {
    return request({
        url: `/lending/loan/fund/save/offline`,
        method: 'post',
        data
    });
}

export function bindFiles(data) {
    // 美元贷批量添加接口
    return request({
        url: `/lending/file/save/batch`,
        method: 'post',
        data
    });
}
export function saveOrderFile(data) {
    return request({
        url: `/lending/file/save`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function lianlianRepayment(data) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lending-ll/lianlian/offline/offline/repayment`,
        method: 'post',
        data
    });
}

export function getRepaymentSum(loanCode) {
    return request({
        url: `/lending/repayment/record/repayment/sum?loanCode=${loanCode}`,
        method: 'get'
    });
}
export function getDlqdisburseForm(loanCode) {
    return request({
        url: `/lending/loan/domestic/disburse/info?loanCode=${loanCode}`,
        method: 'get'
    });
}

export function getTodayLoan(params) {
    return request({
        url: `/lending/loan/today`,
        method: 'get',
        params
    });
}
export function getDlqdisburseSubmit(data) {
    return request({
        url: `/lending/loan/domestic/disburse/dollar`,
        method: 'post',
        data
    });
}

export function getShopeedisburseSubmit(data) {
    return request({
        url: `/lending/loan/domestic/disburse/dollar/shopee`,
        method: 'post',
        data
    });
}

export function getLoanUserList(params) {
    return request({
        url: `/lending/user/page`,
        method: 'get',
        params
    });
}

export function getLoanUserListNew(params) {
    return request({
        url: `/lending/customer/page`,
        method: 'get',
        params
    });
}
export function getLoanUserLoanDetail(params) {
    return request({
        url: `/lending/user/loan/detail`,
        method: 'get',
        params
    });
}

export function getMultipleInvestorApplyDetail(params) {
    return request({
        url: `/lending/offer/select/user`,
        method: 'get',
        params
    });
}

export function getApplicationInfo(params) {
    return request({
        url: `/lending/user/product/detail`,
        method: 'get',
        params
    });
}
export function getUserOfferNum(params) {
    return request({
        url: `/lending/user/offer/detail`,
        method: 'get',
        params
    });
}
export function getUserOfferInfo(data) {
    return request({
        url: `/lending/usermanagerment/userdetail/bindoffer`,
        method: 'post',
        data
    });
}

export function minecraftList(params) {
    return request({
        url: `/lending/application/page`,
        method: 'get',
        params
    });
}
export function lenderList(params) {
    return request({
        url: `/lending/lender/list`,
        method: 'get',
        params
    });
}
export function lenderNameList(params) {
    return request({
        url: `/lending/lender/getLenderName`,
        method: 'get',
        params
    });
}
export function lenderType(lenderType) {
    return request({
        url: `/lending/lender/type?lenderType=${lenderType}`,
        method: 'get'
    });
}
export function statSum(data) {
    return request({
        url: `/lending/application/stat/sum`,
        method: 'get',
        data
    });
}
export function applicationDetail(number) {
    return request({
        url: `/lending/application/detail/overview?applicationCode=${number}`, //概览
        method: 'get'
    });
}
export function applicationInfo(number) {
    return request({
        url: `/lending/application/detail/applicationInfo?loanNumber=${number}`, //详情tab页面
        method: 'get'
    });
}

export function applicationInfoUs(number) {
    return request({
        url: `/lending/application/detail/applicationInfo/usd?applicationCode=${number}`, //详情tab页面
        method: 'get'
    });
}
export function query3plList(number) {
    return request({
        url: `/lending/offer/query/3pl?applicationCode=${number}`, //3pl数据
        method: 'get'
    });
}

export function scoring(number) {
    return request({
        url: `/lending/pfdatamodel/scoring?applicationCode=${number}`, //3pl数据
        method: 'get'
    });
}
export function daysChart() {
    return request({
        url: `/lending/loan/days?days=${30}`, //首页echarts
        method: 'get'
    });
}
export function monthChart() {
    return request({
        url: `/lending/loan/month?month=${6}`, //首页echarts
        method: 'get'
    });
}
var qs = require('qs');
export function newOrder(data) {
    return request({
        url: `/lending/application/create`, //新建申请单
        method: 'post',
        data
    });
}
export function getProducts(lenderId) {
    return request({
        url: `/lending/lender/product/list?lenderId=${lenderId}`, //产品列表
        method: 'get'
    });
}
export function createApplicationUsd(data) {
    return request({
        url: `/lending/application/create/usd`, //新建申请单
        method: 'post',
        data
    });
}
export function createLoanUsd(data) {
    return request({
        url: `/lending/application/create/loan/usd`, //新建贷款单
        method: 'post',
        data
    });
}
export function approve(data) {
    return request({
        url: `/lending/application/approve`, //审批通过
        method: 'post',
        data
    });
}
export function createLoan(data) {
    return request({
        url: `/lending/application/create/loan`, //创建贷款
        method: 'post',
        data
    });
}
export function getProduct(lenderId) {
    return request({
        url: `/lending/application/getProduct?lenderId=${lenderId}`, //创建贷款
        method: 'get'
    });
}
export function drbCreateLoan(data) {
    return request({
        url: `/lending/loan/save/send/mail`, //店融宝创建贷款
        method: 'post',
        data
    });
}
export function summaryPage(current, lenderId) {
    return request({
        url: `/lending/monthly/summary/page?size=${10}&current=${current}&lenderId=${lenderId}`, //月度汇总
        method: 'get'
    });
}
export function exportApi(lenderId) {
    return request({
        url: `/lending/monthly/summary/export?lenderId=${lenderId}`, //月度汇总导出
        method: 'get'
    });
}

export function balancePage(current, beginTime, endTime, lenderProductId) {
    return request({
        url: `/lending/daily/balance/page?current=${current}&size=${10}&beginTime=${beginTime}&endTime=${endTime}&lenderProductId=${lenderProductId}`, //每日余额
        method: 'get'
    });
}
export function companyAll() {
    return request({
        url: `/lending/guarantor/company/all`, //担保公司列表
        method: 'get'
    });
}

export function conversion(current, registerUserType, date) {
    return request({
        url: `/lending/loan/conversion/page?size=${1}&current=${current}&registerUserType=${registerUserType}&date=${date}`, //贷款客户转化率管理列表
        method: 'get'
    });
}
export function loanPageWithUserId(
    current,
    userId,
    applicationCode,
    loanCode,
    loanApplyDateBegin,
    loanApplyDateEnd,
    lenderId,
    loanStatus,
    loanClearDateBegin,
    loanClearDateEnd,
    applicationOrderType,
    loanEndDateBegin,
    loanEndDateEnd,
    bName,
    bPhoneNumber,
    lenderProduct,
    lenderNameShort
) {
    return request({
        url: `/lending/loan/page?size=${10}&current=${current}&userId=${userId || ''}&applicationCode=${applicationCode || ''}&loanCode=${loanCode || ''
            }&loanApplyDateBegin=${loanApplyDateBegin || ''}&loanApplyDateEnd=${loanApplyDateEnd || ''}&lenderId=${lenderId || ''}&loanStatus=${loanStatus || ''
            }&loanClearDateBegin=${loanClearDateBegin || ''}&loanClearDateEnd=${loanClearDateEnd || ''}&applicationOrderType=${applicationOrderType || ''
            }&loanEndDateBegin=${loanEndDateBegin || ''}&loanEndDateEnd=${loanEndDateEnd || ''}&bName=${bName || ''}&bPhoneNumber=${bPhoneNumber || ''
            }&lenderProduct=${lenderProduct || ''}&lenderNameShort=${lenderNameShort || ''}`, //贷款管理列表
        method: 'get'
    });
}

export function loanPage(
    current,
    applicationCode,
    loanCode,
    loanApplyDateBegin,
    loanApplyDateEnd,
    lenderId,
    loanStatus,
    loanClearDateBegin,
    loanClearDateEnd,
    applicationOrderType,
    loanEndDateBegin,
    loanEndDateEnd,
    bName,
    bPhoneNumber,
    lenderProduct,
    lenderNameShort
) {
    return request({
        url: `/lending/loan/page?size=${10}&current=${current}&applicationCode=${applicationCode || ''}&loanCode=${loanCode || ''
            }&loanApplyDateBegin=${loanApplyDateBegin || ''}&loanApplyDateEnd=${loanApplyDateEnd || ''}&lenderId=${lenderId || ''}&loanStatus=${loanStatus || ''
            }&loanClearDateBegin=${loanClearDateBegin || ''}&loanClearDateEnd=${loanClearDateEnd || ''}&applicationOrderType=${applicationOrderType || ''
            }&loanEndDateBegin=${loanEndDateBegin || ''}&loanEndDateEnd=${loanEndDateEnd || ''}&bName=${bName || ''}&bPhoneNumber=${bPhoneNumber || ''
            }&lenderProduct=${lenderProduct || ''}&lenderNameShort=${lenderNameShort || ''}`, //贷款管理列表
        method: 'get'
    });
}

export function countConversion() {
    return request({
        url: `/lending/offer/count/conversion?days=${30}`, //每日转化店铺
        method: 'get'
    });
}
export function newCount() {
    return request({
        url: `/lending/offer/count/new?days=${30}`, //每日新增店铺
        method: 'get'
    });
}
export function userCount() {
    return request({
        url: `/lending/user/count?days=${30}`, //每日新增用户
        method: 'get'
    });
}
export function repaymentPlan(loanCode) {
    return request({
        url: `/lending/repayment/plan/dollar?loanCode=${loanCode}`, //还款计划
        method: 'get'
    });
}
export function shopInfoF(applicationCode) {
    return request({
        url: `/lending/offer/shop/info?applicationCode=${applicationCode}`, //店铺信息
        method: 'get'
    });
}
export function pushApplication(data) {
    return request({
        url: `/lending/application/submit`, //提交申请单
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function received1st(data) {
    return request({
        url: `/lending/application/received1st`, //初核
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function received2nd(data) {
    return request({
        url: `/lending/application/received2nd`, //复核
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function clearLoan(loanId, loanClearDate) {
    return request({
        url: `/lending/loan/clear?id=${loanId}&loanClearDate=${loanClearDate}`, //结清贷款单
        method: 'get'
    });
}
export function closeOrder(data) {
    return request({
        url: `/lending/application/close`, //关闭申请单
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function borrower(data) {
    return request({
        url: `/lending/application/update/borrower`, //
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
// export function creditList(creditApprovalTimeBegin, creditApprovalTimeEnd, current, lenderId, applicationCode, creditCode, applicationOrderType, creditStatus) {
export function creditList(params) {
    return request({
        url: `/lending/credit/page`, //授信列表
        method: 'get',
        params
    });
}
export function creditUpdate(data) {
    return request({
        url: `/lending/credit/update`, //修改授信单
        method: 'post',
        data
    });
}
export function creditClose(id) {
    return request({
        url: `/lending/credit/close?id=${id}`, //关闭授信
        method: 'get'
    });
}
export function loanUpdate(data) {
    return request({
        url: `/lending/loan/update`, //修改贷款单
        method: 'post',
        data
    });
}

export function loanSave(data) {
    return request({
        url: `/lending/loan/save`, //新增贷款单
        method: 'post',
        data
    });
}
export function adminDataBlock() {
    return request({
        url: `/lending/loan/data/sum`, //管理员看板
        method: 'get'
    });
}

export function deleteLoan(id) {
    return request({
        url: `/lending/loan/delete?id=${id}`, //删除贷款单
        method: 'DELETE'
    });
}
export function deleteHistory(id) {
    return request({
        url: `/lending/repayment/record/delete?id=${id}`, //删除还款记录
        method: 'DELETE'
    });
}

export function monthlyRedis(id) {
    return request({
        url: `/lending/monthly/summary/select/redis?lenderId=${id}`, //  查询线下汇总数据
        method: 'get'
    });
}
export function refreshRedis(lenderId) {
    return request({
        url: `/lending/monthly/summary/refresh?lenderId=${lenderId}`, //  手动刷新redis数据
        method: 'get'
    });
}

export function paymentHistory(params) {
    return request({
        url: `/lending/repayment/record/page`, //还款记录
        method: 'get',
        params
    });
}

export function recordList(loanCode) {
    return request({
        url: `/lending/repayment/record/list?loanCode=${loanCode}`, //  根据单号查还款记录
        method: 'get'
    });
}

export function allotCredit(applicationCode) {
    return request({
        url: `/lending/quota/allot/credit?applicationCode=${applicationCode}`, //  通过申请单号查询授信分配额度
        method: 'get'
    });
}

export function offerrRceived(data) {
    return request({
        url: `/lending/shop/offer/received`, //  收到申请
        method: 'post',
        data
    });
}

export function allotLoan(loanCode) {
    return request({
        url: `/lending/quota/allot/loan?loanCode=${loanCode}`, //  通过申请单号查询授信分配额度
        method: 'get'
    });
}

export function splitedCreateLoan(data) {
    return request({
        url: `/lending/shop/offer/create/loan`, //  收到申请
        method: 'post',
        data
    });
}

export function countWeeks(weeks) {
    return request({
        url: `/lending/offer/count/weeks?weeks=${weeks}`, //  周上周六到本周五店铺数量
        method: 'get'
    });
}

export function userWeeks(weeks) {
    return request({
        url: `/lending/user/count/weeks?weeks=${weeks}`, //  周上周六到本周五用户数量
        method: 'get'
    });
}

export function latestQuery3plList(number) {
    return request({
        url: `/lending/offer/query/3pl/latest?applicationCode=${number}`, //贷中3pl数据
        method: 'get'
    });
}

export function abnormal() {
    return request({
        url: `/lending/offer/abnormal`, //异常店铺信息查询
        method: 'get'
    });
}

export function selectLoan(loanCode) {
    return request({
        url: `/lending/quota/allot/select/loan?loanCode=${loanCode}`, //通过贷款单号查询保存分配的贷款金额
        method: 'get'
    });
}

export function submitDollar(applicationCode) {
    return request({
        url: `/lending/application/submit/usd?applicationCode=${applicationCode}`, //美元贷提交审批
        method: 'get'
    });
}
export function activeDollar(data) {
    return request({
        url: `/lending/credit/active/dollar`, //激活授信
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function approveDollar(data) {
    return request({
        url: `/lending/application/approve/usd`, //授信审批
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function paymentInfo(userId) {
    return request({
        url: `/lending/application/select/payment/dollar?userId=${userId}`, //美元贷提交审批
        method: 'get'
    });
}

export function latestQuery3plListNew(data) {
    return request({
        url: `/lending/offer/query/3pl/latest/offerids`, //贷中3pl数据
        method: 'post',
        data
    });
}

export function userBank(userId) {
    return request({
        url: `/lending/bank/select/user/id?userId=${userId}`, //用户银行账户
        method: 'get'
    });
}

export function updatePaymentInfo(data) {
    return request({
        url: `/lending/application/update/payment/dollar`, //修改支付信息
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function getNewApplicationsInfo(params) {
    return request({
        url: `/lending/multiLenderQuota/dclQuota`, //  获取申请单信息
        method: 'get',
        params
    });
}

export function updateUsdApplicationInfo(data) {
    return request({
        url: `/lending/application/update/applicationInfo/usd`, //编辑修改客户资料
        method: 'post',
        data: data
    });
}

export function getUsdApplicationInfo(params) {
    return request({
        url: `/lending/application/detail/applicationInfo/usd/v2`, //跨商宝美元申请单客户资料展示
        method: 'get',
        params
    });
}

export function createBank(data) {
    return request({
        url: `/lending/bank/create/dollar`, //用户id创建银行信息
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function disburseInfo(loanCode) {
    return request({
        url: `/lending/loan/disburse/info?loanCode=${loanCode}`, //确认收款信息
        method: 'get'
    });
}

export function pushDisburse(data) {
    return request({
        url: `/lending/loan/disburse/dollar`, //确认放款
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function providerSelect(loanCode) {
    return request({
        url: `/lending/payment/provider/select/all`, //支付公司下拉框
        method: 'get'
    });
}

export function addRepaymentHistory(data) {
    return request({
        url: `/lending/repayment/record/create/loan/code`, //创建还款记录
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function drbAddRepaymentHistory(data) {
    return request({
        url: `/lending/repayment/record/save/drb`, //创建还款记录
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function saveFileUrl(data) {
    return request({
        url: `/lending/dollar/file/create`, //上传文件地址
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function send3plData(data) {
    return request({
        url: `/lending/application/send/mail`, //发送3pl数据邮件
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function searchStoreNew(params) {
    return request({
        url: `/lending/offer/getValidOffer`, //查询店铺新接口
        method: 'get',
        params
    });
}

export function offerList(params) {
    return request({
        url: `/lending/offer/page`, // 店铺列表
        method: 'get',
        params
    });
}

export function offerDetail(offerId, current) {
    return request({
        url: `/lending/offer/detail?offerId=${offerId}&current=${current}`, // 店铺详情
        method: 'get'
    });
}

export function getMonthLoan(beginDate, endDate, lenderId) {
    return request({
        url: `/lending/loan/select/lender?beginDate=${beginDate}&endDate=${endDate}&lenderId=${lenderId}`, //获取指定月份结清贷款单
        method: 'get'
    });
}
export function exportMonthLoan(beginDate, endDate, lenderId) {
    return request({
        url: `/lending/loan/export/lender?beginDate=${beginDate}&endDate=${endDate}&lenderId=${lenderId}`, //导出指定月份结清贷款单
        method: 'get'
    });
}

export function saveShopOffer(data) {
    return request({
        url: `/lending/shop/offer/save/batch`, //新增店铺
        method: 'post',
        data
    });
}

export function deleteOffer(id) {
    return request({
        url: `/lending/shop/offer/delete?id=${id}`, //删除店铺
        method: 'DELETE'
    });
}

export function loanDataStatistics(beginTime, endTime) {
    return request({
        url: `/lending/loan/date/stat?beginTime=${beginTime}&endTime=${endTime}`, //贷款数据统计
        method: 'get'
    });
}

export function boardCategorical(beginTime, endTime, lenderType, lenderId) {
    return request({
        url: `/lending/data/board/categorical?beginTime=${beginTime}&endTime=${endTime}&lenderType=${lenderType}&lenderId=${lenderId}`, //贷款业务分类数据
        method: 'get'
    });
}
// export function lenderType(lenderType) {
//   return request({
//     url: `/lending/lender/type?lenderType=${lenderType}`,//资金方类型
//     method: 'get',
//   })
// }

export function leadList(current, totalTimeBegin, totalTimeEnd) {
    return request({
        url: `/lending/lead/page?current=${current}&totalTimeBegin=${totalTimeBegin}&totalTimeEnd=${totalTimeEnd}`, //线索列表
        method: 'get'
    });
}

export function addLead(data) {
    return request({
        url: `/lending/lead/save`, //新增线索
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function usRepayment(data) {
    return request({
        url: `/lending/loan/repayment/dollar`, //美元代还款
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function paymentUserList(current, legalName, paymentSubjectName) {
    return request({
        url: `/lending/payment/user/page?size=10&current=${current}&legalName=${legalName}&paymentSubjectName=${paymentSubjectName}`,
        method: 'get'
    });
}

export function getLoanPlan(loanCode) {
    //根据贷款单号获取还款计划
    return request({
        url: `/lending/repayment/plan/select/loan/code?loanCode=${loanCode}`,
        method: 'get'
    });
}

export function getProductAll(loanCode) {
    //获取当前所有产品类目
    return request({
        url: `/lending/lender/product/category`,
        method: 'post',
        data: {
            lenderType: 'API锁定'
        }
    });
}

export function getProductList(lenderId, lenderProduct, cooperationType, referralCode, current) {
    //产品管理
    return request({
        url: `/lending/lender/product/page?lenderType=API锁定&lenderName=${lenderId}&lenderProduct=${lenderProduct}&cooperationType=${cooperationType}&referralCode=${referralCode}&current=${current}`,
        method: 'GET'
    });
}

export function createProduct(data) {
    //创建产品
    return request({
        url: `/lending/lender/product/save`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}
export function editProduct(data) {
    //编辑产品
    return request({
        url: `/lending/lender/product/update`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function getLoanCloud(
    lenderId,
    lenderProduct,
    loanStatus,
    loanCode,
    BName,
    BPhoneNumber,
    loanStartDateBegin,
    loanStartDateEnd,
    current
) {
    //贷款管理
    return request({
        url: `/lending/loan/page/api?lenderType=API锁定&lenderName=${lenderId}&productName=${lenderProduct}&loanStatus=${loanStatus}&loanCode=${loanCode}&BName=${BName}&BPhoneNumber=${BPhoneNumber}&loanStartDateBegin=${loanStartDateBegin}&loanStartDateEnd=${loanStartDateEnd}&current=${current}&size=10`,
        method: 'GET'
    });
}

export function getBankInfo(userId) {
    //根据userId查询店融宝银行账号
    return request({
        url: `/lending/bank/info/drb?userId=${userId}`,
        method: 'GET'
    });
}

export function guaranteeInfo(params) {
    return request({
        url: `/lending/loan/guarantee/info`, //保证金明细
        method: 'get',
        params
    });
}

export function guaranteeSummary(params) {
    return request({
        url: `/lending/guarantee/summary/page`, //保证金汇总
        method: 'get',
        params
    });
}

export function addGuarantee(data) {
    return request({
        url: `/lending/guarantee/summary/save`, //新增保证金
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function updateGuarantee(data) {
    return request({
        url: `/lending/guarantee/summary/update/fee`, //修改保证金
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function getShopeeList(params) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/shopeelending/shopee-shop-data/info`, //虾皮店铺列表
        method: 'get',
        params
    });
}

export function sentShopeeLoan(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-shopee-api/shopee-client/loan`, //推送虾皮贷款
        method: 'get',
        params
    });
}

export function sentShopeeCredit(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-shopee-api/shopee-client/credit`, //推送虾皮授信
        method: 'get',
        params
    });
}

export function sentShopeeRepayment(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-shopee-api/shopee-client/repayment`, //推送虾皮还款
        method: 'get',
        params
    });
}

export function YuShangVerify(data) {
    return request({
        url: `${process.env.VUE_APP_XF_CLOUD_URL}/lending/application/automatic/automaticCalculationByOfferID`, // 宇商核额(预授信额度)计算
        method: 'post',
        data
    });
}

export function UCSVerify(data) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/v1/ksb/getPreCreditAmountV3`, // ucs核额(预授信额度)计算
        method: 'post',
        data
    });
}
export function getTraderAcctQuery() {
    return request({
        url: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-instant-pay/instant/api/v1/traderAcctQuery`, //
        method: 'post'
    });
}
export function paymentUserShop(params) {
    return request({
        url: `/lending/payment/user/shop`,
        method: 'get',
        params
    });
}

export function paymentUserVerify(data) {
    return request({
        url: `/lending/payment/user/verify`,
        method: 'post',
        data
    });
}

export function paymentUserShopUSD(params) {
    return request({
        url: `/lending/payment/user/shop/usd`,
        method: 'get',
        params
    });
}
export function applicationPhone(params) {
    return request({
        url: `/lending/application/phone`,
        method: 'get',
        params
    });
}

export function paymentLock(data) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/lending/salesManualOperation/pspShopLock`,
        method: 'post',
        data
    });
}

export function getCalculateData(params) {
    return request({
        url: `/lending/loan/repayment/calculate/dollar`,
        method: 'get',
        params
    });
}

export function getPlan(params) {
    return request({
        url: `/lending/loan/repayment/plan/dollar`,
        method: 'get',
        params
    });
}
export function usRepaymentV2(data) {
    return request({
        url: `/lending/loan/repayment/v2/dollar`,
        method: 'post',
        data
    });
}
export function getHf(applicationCode) {
    return request({
        url: `/lending/hf/history/getRisk?applicationCode=${applicationCode}`,
        method: 'get'
    });
}
export function metaLoan(data) {
    return request({
        url: `/lending/loan/disburse/meta`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function getProductInfo() {
    return request({
        url: `/lending/dict/product/info?dictType=CREDIT_PRODUCT_INFO`,
        method: 'get'
    });
}
export function getSeedList(data) {
    return request({
        url: `/lending/offer/offer-info/page`,
        method: 'post',
        data
    });
}
export function getSeedOnlineList(params) {
    return request({
        url: `/lending/auto/offer/page`,
        method: 'get',
        params
    });
}
export function sendOfferApi(data) {
    return request({
        url: `/lending/auto/offer/send`,
        method: 'post',
        data
    });
}
export function getOfferInfoDetail(applicationCode) {
    return request({
        url: `/lending/offer/offer-info/detail?applicationCode=${applicationCode}`,
        method: 'get'
    });
}
export function handleOffer(applicationCode) {
    return request({
        url: `/lending/offer/offer-info/handle?applicationCode=${applicationCode}`,
        method: 'get'
    });
}
export function seedOffer(data) {
    return request({
        url: `/lending/offer/offer-shop/handle`,
        method: 'post',
        data
    });
}
export function getZBX(businessLicense) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/lending/zbx-risk/getZbxRiskVOByNo?businessLicense=${businessLicense}`,
        method: 'get'
    });
}
export function ksbDisburse(loanCode) {
    return request({
        url: `/lending/loan/disburse/ksb?loanCode=${loanCode}`,
        method: 'get'
    });
}

export function pfDisburse(loanCode) {
    return request({
        url: `/lending/loan/disburse/pf?loanCode=${loanCode}`,
        method: 'get'
    });
}

export function sendEmail(params) {
    return request({
        url: `/lending/application/gf/enterprise/data/sendEmail`,
        method: 'get',
        params
    });
}

export function Unbind(data) {
    return request({
        url: `/lending/offer/unbind?offerId=${data}`,
        method: 'get',
        data
    });
}

export function unbindBatch(data) {
    return request({
        url: `/lending/offer/unbind/batch`,
        method: 'post',
        data
    });
}

export function getFund(params) {
    //资金列表卡数据
    return request({
        url: `/lending/fund/source/query/fund`,
        method: 'get',
        params
    });
}

export function getPage(params) {
    //资金列表
    return request({
        url: `/lending/fund/source/page`,
        method: 'get',
        params
    });
}
export function getOne(params) {
    return request({
        url: `/lending/fund/source/getOne`,
        method: 'get',
        params
    });
}
export function fundSave(data) {
    //新增资金
    return request({
        url: `/lending/fund/source/save`,
        method: 'post',
        data
    });
}

export function editSave(data) {
    //修改资金
    return request({
        url: `/lending/fund/source/update`,
        method: 'post',
        data
    });
}

export function detailSave(params) {
    //详情数据
    return request({
        url: `/lending/fund/source/loan/list`,
        method: 'get',
        params
    });
}

export function getSoure(params) {
    //获取资金来源信息
    return request({
        url: `/lending/dict/fund/source`,
        method: 'get',
        params
    });
}

export function zxAccessRule(data) {
    //征信准入规则
    return request({
        url: `/lending/zx/access/rule`,
        method: 'post',
        data
    });
}

export function zxScoreCard(data) {
    //征信评分卡
    return request({
        url: `/lending/zx/scoreCard/v1`,
        method: 'post',
        data
    });
}

export function jrManagement(params) {
    //金融云机构管理
    return request({
        url: `/lending/institutions/page`,
        method: 'get',
        params
    });
}

export function updataManagement(data) {
    //修改机构合作信息
    return request({
        url: `/lending/institutions/update`,
        method: 'post',
        data
    });
}

export function increaseManagement(data) {
    //新增机构合作信息
    return request({
        url: `/lending/institutions/save`,
        method: 'post',
        data
    });
}

export function detailManagement(params) {
    //机构详情信息
    return request({
        url: `/lending/institutions/detail`,
        method: 'get',
        params
    });
}

export function paymentList(params) {
    //收费记录详情信息
    return request({
        url: `/lending/institutions/payment/record/list`,
        method: 'get',
        params
    });
}

export function increaseMoney(data) {
    //收费记录增加
    return request({
        url: `/lending/institutions/payment/record/save`,
        method: 'post',
        data
    });
}

export function listCharge(params) {
    //财务模块统一展示收入
    return request({
        url: `/lending/institutions/payment/record/listCharge`,
        method: 'get',
        params
    });
}

export function IdList(params) {
    //收费记录增加
    return request({
        url: `/sysuser/ext/user/list`,
        method: 'get',
        params
    });
}

export function fddContractList(params) {
    //根据申请单号查询签约合同
    return request({
        url: `/lending/fdd/contract/list`,
        method: 'get',
        params
    });
}

export function ksbRiskPricing(params) {
    //跨商宝利率风险定价
    return request({
        url: `/lending/credit/ksbRiskPricing`,
        method: 'get',
        params
    });
}

export function signInfoTemplate(params) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/v1/ksb/merge/usd/signInfoTemplate`,
        method: 'get',
        params
    });
}

export function loanSignInfoTemplate(params) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/v1/ksb/merge/usd/loanSignInfoTemplate`,
        method: 'get',
        params
    });
}

export function dollarLoanSure(data) {
    //美元贷确认放款
    return request({
        url: `/lending/loan/disburse/us`,
        method: 'post',
        data
    });
}


export function getSignContractByResourceCode(params) {
    //根据申请单号查询ca签约合同
    return request({
        url: `/lending/ca/getSignContractByResourceCode`,
        method: 'get',
        params
    });
}

export function creditHistoryList(params) {
    //根据申请单号查询ca签约合同
    return request({
        url: `/lending/credit/history/list`,
        method: 'get',
        params
    });
}

export function getChargeList(params) {
    //收费管理分页查询
    return request({
        url: `/warehouse/fact/charge/page`,
        method: 'get',
        params
    });
}

export function baofooBindCards(params) {
    //宝付绑卡查询
    return request({
        url: `/lending/financial/card/list`,
        method: 'get',
        params
    });
}

export function paymentClear(data) {
    return request({
        url: `/lending/psp/shop/payment/clear`, //  清除支付
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function paymentAuthentication(params) {
    return request({
        url: `/lending/psp/shop/payment/authentication`, //  支付认证
        method: 'get',
        params
    });
}

export function verifyShop(data) {
    return request({
        url: `${process.env.VUE_APP_CENTER_URL}/dowsure-merchant/shopOffer/verify-shop`,
        method: 'post',
        data
    });
}

export function repaymentWipeFlowList(params) {
    return request({
        url: `/lending/repayment/wipe/flow/page`, //  还款核销分页查询
        method: 'get',
        params
    });
}
export function repaymentWipeFlowUpdateStatus(data) {
    return request({
        url: `/lending/repayment/wipe/flow/update/status`, //  还款核销修改核销状态
        method: 'post',
        data
    });
}
export function repaymentPlansByLoanCode(data) {
    return request({
        url: `/lending/repayment/plan/getRepaymentPlanAmount`, //  还款核销修改核销状态
        method: 'post',
        data
    });
}

export function repaymentPlansByClearSum(data) {
    return request({
        url: `/lending/repayment/plan/getRepaymentPlanAmountClearSum`, //  还款获取信息
        method: 'post',
        data
    });
}

export function repaymentWipeFlowWriteOff(data) {
    return request({
        url: `/lending/repayment/wipe/flow/write/off`, //  还款核销修改核销状态
        method: 'post',
        data
    });
}

export function getRepaymentPlanAmount(data) {
    return request({
        url: `/lending/repayment/plan/getRepaymentPlanAmount`, //  正常还款试算(美元)
        method: 'post',
        data
    });
}

export function getRepaymentPlanAmountClearOffline(data) {
    return request({
        url: `/lending/repayment/plan/getRepaymentPlanAmountClearOffline`, //  提前结清-线下还款试算(美元)
        method: 'post',
        data
    });
}
export function repaymentOffline(data) {
    return request({
        url: `/lending/repayment/record/repayment/offline`, //  线下还款(美元)
        method: 'post',
        data
    });
}

export function updatePlan(data) {
    return request({
        url: `/lending/repayment/plan/updatePlan`, //  修改展期还款计划
        method: 'post',
        data
    });
}

export function extensionPlan(data) {
    return request({
        url: `/lending/repayment/plan/extensionPlan`, //  查看展期还款计划
        method: 'post',
        data
    });
}

export function updateAdjustmentPlan(data) {
    return request({
        url: `/lending/repayment/plan/updateAdjustmentPlan`, //  修改展期还款计划
        method: 'post',
        data
    });
}

export function adjustmentPlan(data) {
    return request({
        url: `/lending/repayment/plan/adjustmentPlan`, //  查看展期还款计划
        method: 'post',
        data
    });
}

export function isWalmart(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-merchant/split-loan/isWalmartLoan`, //是否显示walmart
        method: 'get',
        params
    });
}
export function getDfEdu(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-merchant/v2/bnpl/amount/boss`, //是否显示walmart
        method: 'get',
        params
    });
}
export function getWalmart(params) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-merchant/split-loan/listWalmartLoan`, //显示walmart信息
        method: 'get',
        params
    });
}

export function updateCustomer(data) {
    return request({
        url: `/lending/application/updateCustomerReport`, //  更新客户报告
        method: 'post',
        data
    });
}

export function saveOrUpdateUsdLoan(data) {
    return request({
        url: `/lending/borrower/company/saveOrUpdateUsdLoan`,
        method: 'post',
        data
    });
} //  收到申请
export function getCircle(data) {
    return request({
        url: `/lending/shopDetail/getSummaryInformation`, //  获取店铺报告的饼图
        method: 'post',
        data
    });
}
export function getInfo(data) {
    return request({
        url: `/lending/shopDetail/offerHistory/offerDataSetList`, //  获取各类信息
        method: 'post',
        data
    });
}
export function getRiskData(data) {
    return request({
        url: `/lending/shopDetail/getDeclineRating`, //  获取风险评分
        method: 'post',
        data
    });
}
export function getShopDesc(data) {
    return request({
        url: `/lending/shopDetail/getShopName`, //  获取店铺名称
        method: 'post',
        data
    });
}

export function costPage(params) {
    return request({
        url: `/boss-lending/data/cost/page`, //  成本列表
        method: 'get',
        params
    });
}

export function costDetail(params) {
    return request({
        url: `/boss-lending/data/cost/getListCostByMonth`, //  成本详情
        method: 'get',
        params
    });
}

export function costAdd(params) {
    return request({
        url: `/boss-lending/data/cost/addCost`, //  成本新增
        method: 'get',
        params
    });
}

export function costUpdata(data) {
    return request({
        url: `/boss-lending/data/cost/updateListCost`, //  成本新增
        method: 'post',
        data
    });
}
export function getEvaluation(data) {
    return request({
        url: `/lending/shopDetail/getEvaluation`, //  获取宏观评价
        method: 'post',
        data
    });
}

export function gfStoreinfoV2(data) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/gf/cops/storeinfoV2`, //kyc信息推送
        method: 'post',
        data
    });
}
export function getRefundRate(data) {
    return request({
        url: `/lending/shopDetail/getRefundRate`, //  获取退货率
        method: 'post',
        data
    });
}

export function getAllRegionCode(params) {
    return request({
        url: `/lending/region/code/getAll`, //  获取全部地区码
        method: 'get',
        params
    });
}
export function getUsc(data) {
    return request({
        url: `/lending/shopDetail/getUcsAmout`, //  获取UCS
        method: 'post',
        data
    });
}
export function getShopRecode(data) {
    return request({
        url: `/lending/shopDetail/getShopScore`, //  获取店铺评分
        method: 'post',
        data
    });
}
export function ksbUsCreateLoanPageDetail(params) {
    return request({
        url: `/lending/loan/createLoanPageDetail`, //  获取产品信息和还款方式
        method: 'get',
        params
    });
}
export function ksbUsCreateLoan(data) {
    return request({
        url: `/lending/loan/createLoan`, //  创建贷款
        method: 'post',
        data
    });
}

export function singleTransfer(params) {
    return request({
        url: `/lending/loan/singleTransfer`, //  豆服线下打款
        method: 'get',
        params
    });
}

export function getEsignDowfuContractUrl(params) {
    return request({
        url: `${merchantUrl}/dowsure-merchant/esign/getEsignDowfuContractUrl`, //  获取签约链接
        method: 'post',
        params
    });
}

export function getPfRiskModelDetail(params) {
    return request({
        url: `/lending/pf/credit/risk/model/detail/getRiskModelDetail`, //  根据申请单号获取风控模型详情
        method: 'get',
        params
    });
}

export function updatePfRiskModel(data) {
    return request({
        url: `/lending/pf/credit/risk/model/detail/update`, //  修改模型详情
        method: 'post',
        data
    });
}

export function replaceOffer(data) {
    // offer替换
    return request({
        url: `${merchantUrl}/lending/salesManualOperation/replaceOffer`,
        method: "post",
        data,
    });
}

export function chooseTag(params) {
    return request({
        url: `/lending/application/addSellerType`, //选择大卖有约的标签
        method: 'get',
        params
    });
}

export function editQuotaAllocation(data) {
    // 修改额度配置
    return request({
        url: `/lending/multiLenderQuota/quotaAllocation`,
        method: "post",
        data,
    });
}

export function getInfoQuotaAllocation(params) {
    return request({
        url: `/lending/multiLenderQuota/quotaAllocation`, //查询客户额度配置信息
        method: 'get',
        params
    });
}

export function getApplicationRecords(params) {
    return request({
        url: `/lending/customer/applicationRecords`, //申请记录
        method: 'get',
        params
    });
}

// 导出一个函数，用于查询汇丰水位
export function getHfWater(data) {
    // 发送post请求，请求地址为/lending/offer/gethsbcAmount，请求参数为data
    return request({
        url: `/lending/offer/gethsbcAmount`, //汇丰水位查询
        method: 'post',
        data
    });
}
export function isShowBtn(data) {
    return request({
        url: `/lending/psp/shop/offline/payment/email/display`,
        method: 'post',
        data
    });
}
export function getDigitalReport(params) {
    return request({
        url: `${url}/lending/v1/report`,
        method: 'get',
        params
    });
}

export function crmLoanPageBySales(params) {
    return request({
        url: `/lending/loan/pageBySales`, //销售贷款管理分页查询
        method: 'get',
        params
    });
}

export function crmLoanDetails(params) {
    return request({
        url: `/lending/user/application/detail`, //用户详情-贷款列表信息
        method: 'get',
        params
    });
}

export function pspAuthFileList(params) {
    return request({
        url: `/lending/psp/authFile/query/fileStatus`, //查询授权文件上传状态
        method: 'get',
        params
    });
}

export function deletePspAuthFile(data) {
    return request({
        url: `/lending/psp/authFile/delete/file/${data.id}`, //上传授权文件
        method: 'post',
        data
    });
}

export function getAutoEmailDetail(data) {
    return request({
        url: `/lending/psp/shop/offline/payment/autoEmailDetail`, //获取邮件详情
        method: 'post',
        data
    });
}


export function sendEmailWithFile(data) {
    return request({
        url: `/lending/psp/shop/offline/payment/sendEmailWithFile`, //发送邮件
        method: 'post',
        data
    });
}

export function emaildraft(data) {
    return request({
        url: `/lending/psp/shop/offline/payment/emaildraft`,
        method: 'post',
        data
    });
}

//删除offerId
export function deleteForOverview(offerId,applicationCode) {
    return request({
        url: `/lending/shop/offer/deleteForOverview?offerId=${offerId}&applicationCode=${applicationCode}`,
        method: 'get',
    });
}
//白名单加白指标
export function getShopWhitelist(params) {
    return request({
        url: `/lending/operation/whitelist/index`,
        method: 'get',
        params
    });
}
export function getHrzxData(params) {
    return request({
        url: `/lending/v1/hrzx/data`, //  根据申请单号获取风控模型详情
        method: 'get',
        params
    });
}

export function getUserApplications(params) {
    return request({
        url: `/lending/customer/userApplications`, //  获取申请单信息
        method: 'get',
        params
    });
}
export function updateNewApplicationsInfo(data) {
    return request({
        url: `/lending/multiLenderQuota/dclQuota/update`, //  获取申请单信息
        method: 'post',
        data
    });
}

export function calculateShopLevel(params) {
    return request({
        url: `${url}/lending/api/rating/calculate`,
        method: 'get',
        params
    });
}

export function providerPage(params) {
    return request({
        url: `/lending/api/provider/page`,
        method: 'get',
        params
    });
}

export function addProviderPage(data) {
    return request({
        url: `/lending/api/provider`,
        method: 'post',
        data
    });
}

export function providerPageDetails(params) {
    return request({
        url: `/lending/api/provider/${params.id}`,
        method: 'get',
        params
    });
}

export function providerPageDict(params) {
    return request({
        url: `/lending/api/provider/dict`,
        method: 'get',
        params
    });
}

export function providerAddTemp(data) {
    return request({
        url: `lending/file/provider/local`,
        method: 'post',
        data
    });
}

export function providerSave(data) {
    return request({
        url: `/lending/api/provider/${data.id}`,
        method: 'post',
        data
    });
}

export function certificatesOrc(imageUrl) {
    // OCR识别---营业执照
    return request({
        url: `https://lendingapi.dowsure.com/dowsure-ocr/aliyun/ocr/certificatesOcr?imageUrl=${imageUrl}`,
        method: "get",
    });
}

export function idcardOrc(params) {
    //  OCR识别--身份证正面
    return request({
        url: `https://lendingapi.dowsure.com/dowsure-ocr/aliyun/ocr/idcardOcr`,
        method: "get",
        params,
    });
}