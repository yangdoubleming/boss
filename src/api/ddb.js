import request from '../utils/request.js';

const BASE_URL = `https://boss-sit.dowsure.com`;
// const BASE_URL =`http://357r14972r.51vip.biz/`


export function getCalculate(params) {
    return request({
        url: `/lending/LlianOrder/calculate`, //
        method: 'get',
        params
    });
}
export function uploadFile(loanCode) {
    return request({
        url: `/lending/LlianOrder/download/contract?loanCode=${loanCode}`, //
        method: 'get',
        
    });
}

export function getUserList(data) {
    return request({
        url: `/lending/LlianOrder/user/page`, //
        method: 'post',
        data
    });
}

export function getLoanList(data) {
    return request({
        url: `/lending/LlianOrder/loan/page`, //
        method: 'post',
        data
    });
}

export function getRepaymentList(data) {
    return request({
        url: `/lending/LlianOrder/repaymentRecord/page`, //
        method: 'post',
        data
    });
}
export function getRepaymentCard(data) {
    return request({
        url: `/lending/LlianOrder/repaymentRecord/card`, //
        method: 'post',
        data
    });
}
export function getLoanInfo(code) {
    return request({
        url: `/lending/LlianOrder/loan/details/${code}`, //
        method: 'get',
        
    });
}

export function getLoanRecod(code) {
    return request({
        url: `/lending/LlianOrder/loan/recod/${code}`, //
        method: 'get',
        
    });
}
export function getRepaymentPlan(code) {
    return request({
        url: `/lending/LlianOrder/loan/repaymentPlan/${code}`, //
        method: 'get',
        
    });
}

