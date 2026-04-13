
import request from '../utils/request.js';
var qs = require('qs')


//基本信息管理


// 人员信息查询
export function salesList(params) {
    return request({
        url: '/lending/sales/page',
        method: 'get',
        params
    })
}

// 新增人员
export function salesSave(data) {
    return request({
        url: `/lending/sales/save`,
        method: 'post',
        data
    });
}

// 修改人员信息
export function salesUpdate(data) {
    return request({
        url: `/lending/sales/update`,
        method: 'post',
        data
    });
}

//按ID查询组别
export function salesGroupById(params) {
    return request({
        url: `/lending/sales/group/selectById?id=${params.id}`,
        method: 'get',
    })
}

//组别查询
export function salesGroupList(params) {
    return request({
        url: `/lending/sales/group/page?current=${params.current}&size=${params.size}`,
        method: 'get',
    })
}
export function salesAllGroupList(params) {
    return request({
        url: `/lending/sales/group/list`,
        method: 'get',
    })
}

//新增组别
export function saveGroup(data) {
    return request({
        url: '/lending/sales/group/save',
        method: 'post',
        data
    })
}

//更新组别
export function updateGroup(data) {
    return request({
        url: '/lending/sales/group/update',
        method: 'post',
        data
    })
}

//删除组别
export function deleteGroup(params) {
    return request({
        url: '/lending/sales/group/delete',
        method: 'delete',
        params
    });
}

//级别查询
export function salesLevelList(params) {
    return request({
        url: '/lending/sales/level/page',
        method: 'get',
        params
    })
}

//查询所有级别
export function salesAllLevelList(params) {
    return request({
        url: '/lending/sales/level/list',
        method: 'get',
        params
    })
}

//新增当月职级
export function saveOrUpdate(data) {
    return request({
        url: '/lending/sales/level/history/saveOrUpdate',
        method: 'post',
        data
    })
}

//新增级别
export function saveLevel(data) {
    return request({
        url: '/lending/sales/level/save',
        method: 'post',
        data
    })
}

//更新级别
export function updateLevel(data) {
    return request({
        url: '/lending/sales/level/update',
        method: 'post',
        data
    })
}

//删除级别
export function deleteLevel(params) {
    return request({
        url: '/lending/sales/level/delete',
        method: 'delete',
        params
    });
}

//查询销售信息
export function getLevelUsers(params) {
    return request({
        url: '/lending/sales/list',
        method: 'get',
        params
    })
}

//查询所有组别
export function getLevelRecords(params) {
    return request({
        url: '/lending/sales/level/record/list',
        method: 'get',
        params
    })
}

//查询适用于特殊提成政策的销售
export function getSpecialRuleUsers(params) {
    return request({
        url: '/lending/sales/level/record/specialRule',
        method: 'get',
        params
    })
}


//获取未设置人员
export function unassignedUsers(params) {
    return request({
        url: '/lending/sales/level/record/unassigned',
        method: 'get',
        params
    })
}

// 批量修改信息
export function upDateBatchLevel(data) {
    return request({
        url: `/lending/sales/level/record/update/batch`,
        method: 'post',
        data
    });
}

// 批量删除人员
export function deleteBatchLevel(data) {
    return request({
        url: `/lending/sales/level/record/delete/batch`,
        method: 'delete',
        data
    });
}

export function upDateLevel(data) {
    return request({
        url: `/lending/sales/level/update`,
        method: 'post',
        data
    });
}

// 新增组别
export function salesGroupSave(data) {
    return request({
        url: `/lending/sales/group/save`,
        method: 'post',
        data
    });
}




//利润目标修改

// 批量修改组别利润
export function profitBatchUpdate(data) {
    return request({
        url: `/lending/sales/group/profit/update/batch`,
        method: 'post',
        data
    });
}


// 批量修改销售利润目标
export function updateSalesProfit(data) {
    return request({
        url: `/lending/sales/profit/update/batch`,
        method: 'post',
        data
    });
}

// 新增销售利润目标
export function saveProfit(data) {
    return request({
        url: `/lending/sales/profit/save`,
        method: 'post',
        data
    });
}

// 个人目标利润列表
export function profitList(params) {
    return request({
        url: '/lending/sales/profit/list',
        method: 'get',
        params
    })
}




//每月目标管理


// 利润目标查询
export function pmProfitList(params) {
    return request({
        url: '/lending/sales/group/profit/page',
        method: 'get',
        params
    })
}

// 各组别利润目标查询
export function groupProfitList(params) {
    return request({
        url: '/lending/sales/group/profit/list',
        method: 'get',
        params
    })
}


// 新增利润目标信息
export function profitSave(data) {
    return request({
        url: `/lending/sales/group/profit/save`,
        method: 'post',
        data
    });
}

// 根据销售ID查询对应表格
export function sheetList(params) {
    return request({
        url: '/lending/sales/sheet/list',
        method: 'get',
        params
    })
}

// 新增拜访记录链接
export function saveSheet(data) {
    return request({
        url: `/lending/sales/sheet/save`,
        method: 'post',
        data
    });
}

// 修改拜访记录链接
export function updateSheet(data) {
    return request({
        url: `/lending/sales/sheet/update`,
        method: 'post',
        data
    });
}

// 删除拜访记录
export function deleteSheet(params) {
    return request({
        url: `/lending/sales/sheet/delete`,
        method: 'delete',
        params
    });
}
