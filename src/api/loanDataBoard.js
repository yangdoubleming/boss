import request from '../utils/request.js';
export function boardDate(dateType) {
    return request({
        url: `/lending/data/board/date?dateType=${dateType}`,
        method: 'get'
    });
}
export function distributed() {
    return request({
        url: `/lending/data/board/distributed`,
        method: 'get'
    });
}

export function boardTrend(beginDate, endDate, dateType) {
    return request({
        url: `/lending/data/board/trend?beginDate=${beginDate}&endDate=${endDate}&dateType=${dateType}`,
        method: 'get'
    });
}

export function boardPolyline(beginDate, endDate, dateType) {
    return request({
        url: `/lending/data/board/polyline?beginDate=${beginDate}&endDate=${endDate}&dateType=${dateType}`,
        method: 'get'
    });
}

export function boardColumnar(beginDate, endDate, dateType) {
    return request({
        url: `/lending/data/board/columnar?beginDate=${beginDate}&endDate=${endDate}&dateType=${dateType}`,
        method: 'get'
    });
}

export function getLoan(params) {
    //获取放款情况1
    return request({
        url: `/warehouse/data/board/loan`,
        method: 'get',
        params
    });
}

export function getLoanX(params) {
    //获取放款情况1
    return request({
        url: `/lending/data/board/loan/statistics`,
        method: 'get',
        params
    });
}

export function getCount(params) {
    //累计用户数据1
    return request({
        url: `/warehouse/data/board/user/count`,
        method: 'get',
        params
    });
}

export function getUser(params) {
    //用户数据 1
    return request({
        url: `/warehouse/data/board/user`,
        method: 'get',
        params
    });
}

export function getProduct(params) {
    //金融产品1
    return request({
        url: `/warehouse/data/board/loan/product`,
        method: 'get',
        params
    });
}

export function getProductX(params) {
    //金融产品1
    return request({
        url: `/lending/data/board/loan/financial/product`,
        method: 'get',
        params
    });
}

export function getInsurance(params) {
    //投保
    return request({
        url: `/warehouse/data/board/insurance`,
        method: 'get',
        params
    });
}

export function getLoans(params) {
    //放款
    return request({
        url: `/warehouse/data/board/dow/loan`,
        method: 'get',
        params
    });
}

export function creditGmv() {
    //授信gmv
    return request({
        url: `/warehouse/credit/gmv`,
        method: 'get'
    });
}
export function searchFinancialProducts(params) {
    //金融产品查询
    return request({
        url: `/lending/institutions/barChart`,
        method: 'get',
        params
    });
}

export function getfangkuanqingkuang(params) {
    //放款情况
    return request({
        url: `/warehouse/data/board/loan`,
        method: 'get',
        params
    });
}
export function getuserData() {
    //数据看板的用户数据
    return request({
        url: `/warehouse/data/board/user`,
        method: 'get'
    });
}
//保险详情
export function getInsuranceDetail(params) {
    return request({
        url: `/warehouse/data/board/insurance/details`,
        method: 'get',
        params
    });
}
//保险详情获取所有保司名
export function getAllCompany(params) {
    return request({
        url: `/warehouse/insurance/company/list`,
        method: 'get',
        params
    });
}
//累计用户详情
export function getUserCard(params) {
    return request({
        url: `/warehouse/data/board/user`,
        method: 'get',
        params
    });
}

export function ProductList() {
    //获取产品列表
    return request({
        url: `/warehouse/lender/product/list`,
        method: 'get'
    });
}

export function ReadBoardFinancialProduct() {
    //数据看板-金融产品
    return request({
        url: `/warehouse/data/board/loan/product`,
        method: 'get'
    });
}

export function searchLoan() {
    //数据看板-按照支付公司查询贷款金额
    return request({
        url: `/warehouse/data/board/loan/payment`,
        method: 'get'
    });
}

export function searchTag() {
    //数据看板-按照产品标签查询贷款金额
    return request({
        url: `/warehouse/data/board/product/tag`,
        method: 'get'
    });
}
export function search1P3P() {
    //数据看板-按照1p,3p查询贷款金额
    return request({
        url: `/warehouse/data/board/loan/model`,
        method: 'get'
    });
}

export function getUseList(params) {
    //用户查询用户列表数据
    return request({
        url: `/warehouse/user/page`,
        method: 'get',
        params
    });
}

export function getUseDetail(params) {
    //获取用户得详细信息
    return request({
        url: `/warehouse/user/info`,
        method: 'get',
        params
    });
}
export function getUserLoan(params) {
    //用户贷款业务
    return request({
        url: `/warehouse/user/loan`,
        method: 'get',
        params
    });
}
export function getUsreInsurance(params) {
    //用户保险业务
    return request({
        url: `/warehouse/user/insurance`,
        method: 'get',
        params
    });
}
export function getUserShop(params) {
    //用户店铺业务
    return request({
        url: `${process.env.VUE_APP_DATA_WAREHOUSE_BOSS_USER}/lending/offer/query/3pl/latest/user`,
        method: 'get',
        params
    });
}
export function creditAfterWeekDataV2(userId) {
    return request({
        url: `${process.env.VUE_APP_SHOPEE}/dowsure-lendingcore/api/v1/shopreport/creditAfterV2?userId=${userId}`, //贷前
        method: 'get'
    });
}
export function getTechnology(params) {
    //首页科技产品
    return request({
        url: `/lending/institutions/technology/product`,
        method: 'get',
        params
    });
}


export function getGlobalCount(params) {
    //全球放款数目
    return request({
        url: `/warehouse/data/board/country`,
        method: 'get',
        params
    });
}

export function getDowfu(params) {
    //豆费数据
    return request({
        url: `/warehouse/data/board/dowfee`,
        method: 'get',
        params
    });
}
