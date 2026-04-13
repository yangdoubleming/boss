import request from '../utils/request.js';
export function passList(params) {
    return request({
        url: `/lending/credit/extra/page`,
        method: 'get',
        params
    });
}

export function creditPass(data) {
    return request({
        url: `/lending/credit/extra/approve`,
        method: 'post',
        data
    });
}

export function pfCreditPassList(params) {
    return request({
        url: `lending/pf/approval/page`,
        method: 'get',
        params
    });
}

export function pfCreditPass(data) {
    return request({
        url: `lending/pf/approval`,
        method: 'post',
        data
    });
}

export function xinwangCreditPassList(params) {
    return request({
        url: `lending/xw/approval/page`,
        method: 'get',
        params
    });
}

export function xinwangCreditPass(data) {
    return request({
        url: `lending/xw/approval`,
        method: 'post',
        data
    });
}

export function historyList(params) {
    return request({
        url: `/lending/credit/extra/list`,
        method: 'get',
        params
    });
}
export function historyOverdueList(params) {
    return request({
        url: `/lending/loan/overdue/record`,
        method: 'get',
        params
    });
}
//获取支付凭证
export function loanFile(params) {
    return request({
        url: `/lending/loan/listLoanFile`,
        method: 'get',
        params
    });
}
export function getLoanMonitoringList(data) {
    return request({
        url: `/lending/risk/customer/bs/page`,
        method: 'post',
        data
    });
}
export function getLoanWarningHandle(params) {
    return request({
        url: `/lending/warningHandle/list`,
        method: 'get',
        params
    });
}
export function getRiskWarningUpdate(data) {
    return request({
        url: `/lending/risk/customer/warning/update`,
        method: 'post',
        data
    });
}
export function getRiskMoreWarningUpdate(data) {
    return request({
        url: `/lending/risk/customer/warning/batch/update`,
        method: 'post',
        data
    });
}
export function getLoanWarningTotal(params) {
    return request({
        url: `/lending/risk/customer/bs/total`,
        method: 'get',
        params
    });
}
export function getLoanWarningLenderGroup(params) {
    return request({
        url: `/lending/risk/customer/bs/lender/group`,
        method: 'get',
        params
    });
}
export function getLoanWarningProductGroup(params) {
    return request({
        url: `/lending/risk/customer/bs/product/group`,
        method: 'get',
        params
    });
}


