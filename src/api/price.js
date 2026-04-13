import request from '../utils/request.js';
const BASE_URL = `${process.env.VUE_APP_BOSS_MODULE}`
//获取主产品的表格数据
export function getMainData(params) {
    return request({
        url: `/lending/data-config/page`,
        method: 'get',
        params
    });
}

//获销售提成的数据
export function getSaleRate(params) {
    return request({
        url: `${BASE_URL}/lending/data-config/getValueById`,
        method: 'get',
        params
    });
}
//获取核算的数据
export function getAllData(params) {
    return request({
        url: `${BASE_URL}/lending/data-config/listDataById`,
        method: 'get',
        params
    });
}

//确认试算
export function ensureCount(data) {
  return request({
    url: `${BASE_URL}/lending/data-config/getPriceByIds`,
    method: "post",
    data,
  });
}

//删除主产品的表格数据
export function deleteData(params) {
    return request({
        url: `/lending/data-config/${params.id}`,
        method: 'delete',
        params: params.data
    });
}

//删除政策
export function deleteAdjust(params) {
    return request({
        url: `${BASE_URL}/lending/data-price-adjust/${params.id}`,
        method: 'delete',
        params: params.data
    });
}
//确认生效
export function ensureUse(data) {
  return request({
    url: `/lending/data-config/updateById`,
    method: "post",
    data,
  });
}

//添加配置
export function addNewUse(data) {
  return request({
    url: `/lending/data-config/save`,
    method: "post",
    data
  }
  )
}
//获取下拉
export function getSelectData(params) { 
    return request({
        url: `/lending/data-config/listByLevel`,
        method: 'get',
        params
    });
}

//获取政策的数据
export function getPriceData(params) {
    return request({
        url: `${BASE_URL}/lending/data-price-adjust/page`,
        method: 'get',
        params
    });
}
//添加政策
export function addPrice(data) {
  return request({
    url: `${BASE_URL}/lending/data-price-adjust`,
    method: "post",
    data,
  });
}

//修改配置
export function changeAdjust(data) {
  return request({
    url: `${BASE_URL}/lending/data-price-adjust/${data.id}`,
    method: "put",
    data:data.data
  }
  )
}
//修改成本
export function changeIncome(data) {
  return request({
    url: `${BASE_URL}/lending/data-config/${data.id}`,
    method: "put",
    data:data.data
  }
  )
}