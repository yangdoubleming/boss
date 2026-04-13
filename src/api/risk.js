import request from '../utils/request.js';

//资方风控规则分页查询
export function riskRuleList(params) {
    return request({
        url: `/lending/lender/risk/rule/page`,
        method: 'get',
        params
    });
}

//资方获取资方列表
export function lenderList(params) {
    return request({
        url: `/lending/lender/list`,
        method: 'get',
        params
    });
}

//获取资方下的风控规则
export function ruleList(params) {
    return request({
        url: `/lending/lender/risk/rule/list`,
        method: 'get',
        params
    });
}

//新增资方风控规则
export function saveRiskRule(data) {
    return request({
        url: `/lending/lender/risk/rule/save`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data) // 将数字转换为 JSON 格式
    });
}

//修改风控规则
// 导出一个函数，用于更新风险规则
export function updateRiskRule(data) {
    // 发送一个post请求，请求的url为/lending/lender/risk/rule/update/batch，请求的数据为data
    return request({
        url: `/lending/lender/risk/rule/update/batch`,
        method: 'post',
        data
    });
}

//获取资方下的风控规则
export function ruleLenderList(params) {
    return request({
        url: `/lending/lender/risk/rule/listByLenderId`,
        method: 'get',
        params
    });
}
//新增配置
export function ruleLenderAdd(data) {
    return request({
        url: `/lending/lender/risk/rule/addRuleIds`,
        method: 'post',
        data
    });
}
//黑名单列表
export function getBlackList(params) {
    return request({
        url: `/lending/blacklist/page`,
        method: 'get',
        params
    });
}
//灰名单列表
export function getGrayList(params) {
    return request({
        url: `/lending/greylist/page`,
        method: 'get',
        params
    });
}
//灰名单新增
export function getAddGrayList(data) {
    return request({
        url: `/lending/greylist`,
        method: 'post',
        data
    });
}
//黑名单新增
export function getAddBlackList(data) {
    return request({
        url: `/lending/blacklist`,
        method: 'post',
        data
    });
}
//反欺诈列表
export function getBlackRuleList(params) {
    return request({
        url: `/lending/black-rule/page`,
        method: 'get',
        params
    });
}
//预警列表
export function getWarningList(params) {
    return request({
        url: `/lending/warning-customer/page`,
        method: 'get',
        params
    });
}
//黑名单停用
export function getStopBlackList(data) {
    return request({
        url: `/lending/blacklist/${data.id}`,
        method: 'put',
        data
    });
}
//灰名单停用
export function getStopGreyList(data) {
    return request({
        url: `/lending/greylist/${data.id}`,
        method: 'put',
        data
    });
}
//反欺诈规则停用
export function getStopBlackRuleList(data) {
    return request({
        url: `/lending/black-rule/${data.id}`,
        method: 'put',
        data
    });
}
//反欺诈规则停用
export function getStopWarnRuleList(data) {
    return request({
        url: `/lending/warning-customer/${data.id}`,
        method: 'put',
        data
    });
}