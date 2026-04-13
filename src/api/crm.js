import request from '../utils/request.js';

//基本信息管理

// 查询销售分组信息
export function listByGroup(params) {
    return request({
        url: `/lending/sales/listByGroup`,
        method: 'get',
        params
    });
}

// 获取客户经理名下的客户名单
export function listUserInfo(params) {
    return request({
        url: `/lending/neocrm/account/listUserInfo`,
        method: 'get',
        params
    });
}

// 分页查询客户名单
export function listUserInfoPage(params) {
    return request({
        url: `/lending/neocrm/account/page`,
        method: 'get',
        params
    });
}
// 分页查询我的客户名单
export function listOwnerPage(params) {
    return request({
        url: `/lending/neocrm/account/page/sales`,
        method: 'get',
        params
    });
}

// 分页查询我的客户名单-分组客户
export function listGroupPage(params) {
    return request({
        url: `/lending/neocrm/account/page/sales/group`,
        method: 'get',
        params
    });
}


// 转移归属人
export function transferOwner(data) {
    return request({
        url: '/lending/neocrm/account/transferOwner',
        method: 'post',
        data
    });
}

// 转移归属人2
export function transferOwner2(data) {
    return request({
        url: '/lending/neocrm/account/transferOwner/noPermissionCheck',
        method: 'post',
        data
    });
}

// 修改CRM客户信息
export function updateAccount(data) {
    return request({
        url: '/lending/neocrm/account/update',
        method: 'post',
        data
    });
}

// 查询单个客户详情以及转移记录
export function accountInfo(params) {
    return request({
        url: `/lending/neocrm/account/getByAccount`,
        method: 'get',
        params
    });
}
// 我的客户-查询单个客户详情以及转移记录
export function accountInfoOwn(params) {
    return request({
        url: `/lending/neocrm/account/sales/getByAccount`,
        method: 'get',
        params
    });
}

//新建我的客户
export function addOwner(data) {
    return request({
        url: '/lending/feishu/crm/application/savecrm',
        method: 'post',
        data
    });
}

//编辑我的客户
export function editOwner(data) {
    return request({
        url: '/lending/neocrm/account/sales/update',
        method: 'post',
        data
    });
}


//获取客户跟进记录
export function getFollow(data) {
    return request({
        url: '/lending/neocrm/account/sales/activityrecord/list',
        method: 'post',
        data
    });
}
//保存客户跟进记录
export function saveFollow(data) {
    return request({
        url: '/lending/neocrm/account/sales/activityrecord/save',
        method: 'post',
        data
    });
}
//根据级别获取分类信息
export function getSourceByLevel(params) {
    return request({
        url: '/lending/sourceType/getSourceByLevel',
        method: 'get',
        params
    });
}

//获取标签信息
export function getLabelList(params) {
    return request({
        url: 'lending/label/list',
        method: 'get',
        params
    });
}

//查询客户有没有归属
export function ownershipStatus(params) {
    return request({
        url: `lending/neocrm/account/sales/tool/ownershipStatus`,
        method: "get",
        params,
    });
}


//crm中跨商产品申请列表
export function getTableListForCrm(data) {
    return request({
        url: `/lending/initiate-approval/pageForCRM?current=${data.current}&size=${data.size}&initiateStatus=${data.initiateStatus}&applicationCode=${data.applicationCode}&approvalType=${data.approvalType}&borrowerMobilePhone=${data.borrowerMobilePhone}&borrowerName=${data.borrowerName}&startTime=${data.startTime}&endTime=${data.endTime}&lenderProductName=${data.lenderProductName}&userId=${data.userId}&lenderName=${data.lenderName}`,
        method: "get",

    });
}

//保存或更新实控人近1个月征信报告url
export function saveControllerCreditReport(data) {
    return request({
        url: `lending/initiate-approval/saveControllerCreditReport`,
        method: "post",
        data
    });
}

//保存客户跟进记录
export function changeToLam(data) {
    return request({
        url: '/lending/neocrm/account/transferOtherOwner',
        method: 'post',
        data
    });
}

//根据initiateCode查询审批时间
export function findApprovalTime(initiateCode) {
    return request({
        url: `lending/initiate-approval/findApprovalTime?initiateCode=${initiateCode}`,
        method: "get",
    });
}

//保存或更新借款企业近1个月征信报告url
export function saveEnterpriseCreditReport(data) {
    return request({
        url: `lending/initiate-approval/saveEnterpriseCreditReport`,
        method: "post",
        data
    });
}

//保存或更新借款人国内企业上一年度审计报告url
export function saveEnterpriseAuditReport(data) {
    return request({
        url: `lending/initiate-approval/saveEnterpriseAuditReport`,
        method: "post",
        data
    });
}

//保存或更新其他补充材料url
export function saveAdditionalMaterials(data) {
    return request({
        url: `lending/initiate-approval/saveAdditionalMaterials`,
        method: "post",
        data
    });
}

//保存或更新客户情况描述
export function saveCustomerDesc(data) {
    return request({
        url: `lending/initiate-approval/saveCustomerDesc`,
        method: "post",
        data
    });
}

//保存或更新入账凭证url
export function saveReceiptVoucher(data) {
    return request({
        url: `lending/initiate-approval/saveReceiptVoucher`,
        method: "post",
        data
    });
}

//保存或更新入账凭证时间
export function saveReceiptVoucherDate(data) {
    return request({
        url: `lending/initiate-approval/saveReceiptVoucherDate`,
        method: "post",
        data
    });
}

//贷款场景列表
export function getLoanSceneList(params) {
    return request({
        url: 'lending/operation/whitelist/getLoanSceneList',
        method: 'get',
        params
    });
}


//获取标签信息
export function getThreeSource(params) {
    return request({
        url: 'lending/merchant/getThreeSource',
        method: 'get',
        params
    });
}

//公海池-分页查询
export function getPoolPage(params) {
    return request({
        url: 'lending/customer/pool/page',
        method: 'get',
        params
    });
}

//公海池-分配客户
export function poolAllocateCustomers(data) {
    return request({
        url: 'lending/customer/pool/assign',
        method: 'post',
        data
    });
}

//公海池-导入客户
export function poolImportCustomers(data) {
    return request({
        url: 'lending/customer/pool/import',
        method: 'post',
        data
    });
}

//公海池-操作记录列表
export function poolLogList(params) {
    return request({
        url: 'lending/customer/pool/operation/log/list',
        method: 'get',
        params
    });
}

//公海池-认领记录列表
export function poolClaimRecordList(params) {
    return request({
        url: 'lending/customer/claim/record/list',
        method: 'get',
        params
    });
}

//公海池-认领客户
export function toGetPoolCustomer(data) {
    return request({
        url: 'lending/customer/pool/claimed',
        method: 'post',
        data
    });
}

//公海池-导出客户
export function poolExportCustomer(params) {
    return request({
        url: 'lending/customer/pool/export',
        method: 'get',
        params
    });
}

//公海池-释放客户
export function liberatePoolCustomer(data) {
    return request({
        url: 'lending/customer/pool/liberate',
        method: 'post',
        data
    });
}

//获取MFP支用记录接口
export function getMfpWalletIncome(params){
    return request({
        url:'lending/mfp/wallet/income',
        method:'get',
        params
    })
}

//获取MFP提现记录接口
export function getMfpWalletPayout(params){
    return request({
        url:'lending/mfp/wallet/payout',
        method:'get',
        params
    })
}

//获取MFP还款记录接口
export function getMfpWalletRepayment(params){
    return request({
        url:'lending/mfp/wallet/repayment',
        method:'get',
        params
    })
}

//获取MFP授信店铺接口
export function getMfpShopList(params){
    return request({
        url:'lending/mfp/creditShopList',
        method:'get',
        params
    })
}

//获取MFP亚马逊划扣列表
export function getMfpWalletDeduction(params){
    return request({
        url:'lending/mfp/wallet/deduction',
        method:'get',
        params
    })
}

//获取MFP白名单列表
export function getMfpFeeConfig(params){
    return request({
        url:'lending/mfp/feeConfig',
        method:'get',
        params
    })
}