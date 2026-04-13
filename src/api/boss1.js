import request from '../utils/request.js';

const BASE_URL = `${process.env.VUE_APP_BOSS_MODULE}/dowsure-lendingcore`;
const BASE_URL2 = `${process.env.VUE_APP_BOSS_MODULE2}`;
// const BASE_URL =`http://192.168.10.158:8009/dowsure-lendingcore`

export function approveLoan(params) {
    return request({
        url: `/lending/loan/riskControlLoanApproval`, //人工审批
        method: 'get',
        params
    });
}

export function overdue(data) {
    return request({
        url: `/lending/loan/overdue`, //逾期
        method: 'post',
        data
    });
}
export function searchStatusLL(contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/ll/result?contractNumber=${contractNumber}`, //ll
        method: 'get'
    });
}
export function searchStatusPP(contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/pp/result?contractNumber=${contractNumber}`, //pp
        method: 'get'
    });
}
export function searchStatusWY(contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/wy/result?contractNumber=${contractNumber}`, //wy
        method: 'get'
    });
}
export function wy(amount, contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/wy?amount=${amount}&contractNumber=${contractNumber}`, //wy划扣
        method: 'get'
    });
}
export function pp(amount, contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/pp?amount=${amount}&contractNumber=${contractNumber}`, //pp划扣
        method: 'get'
    });
}
export function ll(amount, contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/ll?amount=${amount}&contractNumber=${contractNumber}`, //连连划扣
        method: 'get'
    });
}
export function kzyh(params) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/airwallex/freeze`, //空中云汇冻结
        method: 'get',
        params
    });
}
export function wyCancel(contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/wy/cancel?contractNumber=${contractNumber}`, //wy取消划扣
        method: 'get'
    });
}
export function llCancel(contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/ll/cancel?contractNumber=${contractNumber}`, //连连取消划扣
        method: 'get'
    });
}
export function ppWithdrawLimit(amount, contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/pp/withdrawLimit?amount=${amount}&contractNumber=${contractNumber}`, //pp冻结接口
        method: 'get'
    });
}
export function ppWithdrawLimitCancel(amount, contractNumber) {
    return request({
        url: `${BASE_URL2}/lending/payment-loan/pp/withdrawLimitCancel?amount=${amount}&contractNumber=${contractNumber}`, //pp解冻接口
        method: 'get'
    });
}

export function shopreport(applicationCode) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lendingcore/api/v1/shopreport/creditAfter?applicationCode=${applicationCode}`, //
        method: 'get'
    });
}

export function shopreportNew(data) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lendingcore/api/v1/shopreport/creditAfter/offerIds`, //
        method: 'post',
        data
    });
}

export function creditAfterWeekDataV2(userId) {
    return request({
        url: `${process.env.VUE_APP_DATA_WAREHOUSE_USER}/dowsure-lendingcore/api/v1/shopreport/creditAfterV2?userId=${userId}`, //
        method: 'get'
    });
}

export function getPfDataModel(applicationCode) {
    return request({
        url: `${BASE_URL2}/lending/pfDataModel/${applicationCode}`, //资方报告
        method: 'get'
    });
}

export function creditAfter(applicationCode) {
    return request({
        url: `${BASE_URL}/api/v1/shopreport/creditAfter?applicationCode=${applicationCode}`, //贷前
        method: 'get'
    });
}

export function creditBeforeWeekData(applicationCode) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lendingcore/api/v1/shopreport/creditBefore?applicationCode=${applicationCode}`, //贷前
        method: 'get'
    });
}

export function creditBefore(applicationCode) {
    return request({
        url: `/lending/offer/query/3pl/old?applicationCode=${applicationCode}`, //贷前
        method: 'get'
    });
}

export function received(data) {
    return request({
        url: `/lending/shop/offer/received`, //收到申请
        method: 'post',
        data
    });
}
export function dhfqReceived(data) {
    return request({
        url: `/lending/shop/offer/received/dh`, //收到申请
        method: 'post',
        data
    });
}

export function approved(data) {
    return request({
        url: `/lending/shop/offer/approved`, //通过申请锁典
        method: 'post',
        data
    });
}
export function dhfqApproved(data) {
    return request({
        url: `/lending/shop/offer/approved/dh`, //通过申请锁典
        method: 'post',
        data
    });
}
export function approvedUnlock(data) {
    return request({
        url: `/lending/shop/offer/approved/unlock`, //通过申请不锁典
        method: 'post',
        data
    });
}

export function resetAl(offerId) {
    return request({
        url: `/lending/shop/offer/reset/al?offerId=${offerId}`, //重置al
        method: 'get'
    });
}

export function lock(data) {
    return request({
        url: `/lending/shop/offer/lock`, //确认锁卡
        method: 'post',
        data
    });
}
export function unlock(data) {
    return request({
        url: `/lending/shop/offer/un/lock`, //解锁卡
        method: 'post',
        data
    });
}
export function approval(data) {
    return request({
        url: `/lending/shop/offer/create/approval`, //创建授信
        method: 'post',
        data
    });
}
export function updateApproval(data) {
    return request({
        url: `/lending/shop/offer/update/approval`, //修改授信
        method: 'post',
        data
    });
}
export function dhfqApproval(data) {
    return request({
        url: `/lending/shop/offer/create/approval/dh`, //创建授信
        method: 'post',
        data
    });
}
export function createLoan(data) {
    return request({
        url: `/lending/shop/offer/create/loan`, //创建贷款
        method: 'post',
        data
    });
}

export function repayment(data) {
    return request({
        url: `/lending/shop/offer/update/loan`, //还款
        method: 'post',
        data
    });
}
export function closeLoan(offerId) {
    return request({
        url: `/lending/shop/offer/close/loan?offerId=${offerId}`, //关闭贷款
        method: 'get'
    });
}

export function closeCredit(offerId) {
    return request({
        url: `/lending/shop/offer/close/credit?offerId=${offerId}`, //关闭贷款
        method: 'get'
    });
}

export function creditSingle(offerId, applicationCode) {
    return request({
        url: `/lending/quota/allot/credit/single?offerId=${offerId}&applicationCode=${applicationCode}`, //通过申请单号, offerId查询授信分配额度
        method: 'get'
    });
}
export function dhfqCredits(applicationCode) {
    return request({
        url: `/lending/quota/allot/application?applicationCode=${applicationCode}`, //通过申请单号, offerId查询授信分配额度  多个
        method: 'get'
    });
}
export function refreshAccountLockStatusUS() {
    return request({
        url: `/lending/shop/offer/lock/refresh/us`, //刷新锁卡状态  美国
        method: 'get'
    });
}

export function refreshAccountLockStatusDE() {
    return request({
        url: `/lending/shop/offer/lock/refresh/de`, //刷新锁卡状态 德国
        method: 'get'
    });
}

export function calculation(data) {
    return request({
        url: `/lending/quota/allot/automatic/calculation`, //自动计算
        method: 'post',
        data
    });
}

export function ALGVerify(offerIds) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lendingcore/api/shop/usdLoanShopAmountByOfferIds?offerIds=${offerIds}`, //
        method: 'get'
    });
}

export function amazonReview(current, size, bName, resourceCode, reviewStatus) {
    return request({
        url: `/lending/amazon/review/page?current=${current}&size=${size}&bName=${bName}&resourceCode=${resourceCode}&reviewStatus=${reviewStatus}`, //审批
        method: 'get'
    });
}
var qs = require('qs');
export function reviewApproval(data) {
    return request({
        url: `/lending/amazon/review/approval`, //审批
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    });
}

export function whiteListPass(params) {
    return request({
        url: `/lending/operation/whitelist/whiteListPass`, //刷新锁卡状态 德国
        method: 'get',
        params
    });
}

export function credits(applicationCode) {
    return request({
        url: `/lending/quota/allot/credit?applicationCode=${applicationCode}`, //通过申请单号, offerId查询授信分配额度  多个
        method: 'get'
    });
}

export function shopLoanInfo(applicationCode) {
    return request({
        url: `/lending/credit/shopLoanInfo?applicationCode=${applicationCode}`, //查询客户店铺在其他产品的在贷额度
        method: 'get'
    });
}

export function ksbUsdAuditInfo(applicationCode) {
    return request({
        url: `/lending/credit/ksbUsdAuditInfo?applicationCode=${applicationCode}`, //跨商宝美元boss系统审核信息查询
        method: 'get'
    });
}

export function creditAudit(data) {
    return request({
        url: `/lending/credit/ksb/usd/creditAudit`, //提交跨商宝美元授信结果接口
        method: 'post',
        data
    });
}

export function logisticsBillDetails(params) {
    return request({
        url: `lending/df-bill-detail/billDetails`, //物流账单-查询账单明细
        method: 'get',
        params
    });
}

export function logisticsConfirmBillDetail(data) {
    return request({
        url: `/lending/df-bill-detail/confirmBillDetail`, //物流账单-运营确认
        method: 'post',
        data
    });
}

export function logisticsUpdateBillDetail(data) {
    return request({
        url: `/lending/df-bill-detail/updateBillDetail`, //物流账单-修改价格
        method: 'post',
        data
    });
}

export function logisticsUploadBillFile(data) {
    return request({
        url: `/lending/df-bill-detail/uploadBillFile`, //物流账单-账单上传接口
        method: 'post',
        data
    });
}

export function postRepaymentTest(data) {
    return request({
        url: `/lending/repayment/plan/calculation`, //还款测算接口
        method: 'post',
        data
    });
}

export function postRepaymentInAccount(data) {
    return request({
        url: `/lending/repayment/record/process`, //还款入账接口
        method: 'post',
        data
    });
}
// 渣打信息
export function getZhaDaApplyMsg(params) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/application/flowMsgQuery`,
        method: 'get',
        params
    });
}
export function updateZhaDaApplyMsg(data) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/application/updateFlowMsg`,
        method: 'post',
        data
    });
}
export function upLoadZhaDa(params) {
    return request({
        url: `${process.env.VUE_APP_BASE_URL}/lending/application/downloadZipByApplicationCode`,
        method: 'get',
        params
    })
}

export function approvalInfoCmc(params) {
    return request({
        url: `/lending/cmc-approval/info`,
        method: 'get',
        params
    })
}