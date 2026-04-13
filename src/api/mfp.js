import request from '../utils/request.js';

// 盖帽白名单分页查询
export function getBlockWhiteList(params) {
    return request({
        url: `/lending/credit/limit/page`,
        method: 'get',
        params
    });
}

// 停用额度
export function deactivateQuota(data) {
    return request({
        url: `/lending/credit/limit/deactivate`,
        method: 'post',
        data
    });
}
//获取MFP逾期列表
export function getloandisbursement(data){
    return request({
        url:'lending/mfp/loan/disbursement',
        method:'post',
        data
    })
}

export function getOfferWhitelistList(params){
    return request({
        url:'lending/mfp/offer/whitelist/list',
        method:'get',
        params
    })
}

export function expireOfferWhitelist(data){
    return request({
        url:'lending/mfp/offer/whitelist/expire',
        method:'post',
        data
    })
}

//  调价列表
export function priceAdjustConfigPage(params) {
    return request({
        url: `/lending/mca/price-adjust-config/page`,
        method: 'get',
        params
    });
}

//  手动失效
export function priceAdjustConfigInvalidate(data) {
    return request({
        url: `/lending/mca/price-adjust-config/invalidate`,
        method: 'post',
        data
    });
}

//  客户申请列表
export function customerFeePage(params) {
    return request({
        url: `/lending/mca/customer-fee/page`,
        method: 'get',
        params
    });
}

//  调价列表
export function roleList(params) {
    return request({
        url: `/boss-user/role/list`,
        method: 'get',
        params
    });
}
