import request from '../utils/request.js';

const BASE_URL = `${process.env.VUE_APP_DOUFU}`

export function getTag(params) {
    return request({
        url: `${BASE_URL}/market/getTag`,
        method: 'get',
        params
    })
}
export function getInsertServiceCard(data) {
    return request({
        url: `${BASE_URL}/market/insertResidentAgentAndSub`,
        method: 'post',
        data
    })
}
export function gerAddServiceCard(data) {
    return request({
        url: `${BASE_URL}/market/addServiceCard`,
        method: 'post',
        data
    })
}
export function getUpdateResidentAgentDesc(data) {
    return request({
        url: `${BASE_URL}/market/updateResidentAgentDesc`,
        method: 'post',
        data
    })
}
export function getUpdateResidentAgents(data) {
    return request({
        url: `${BASE_URL}/market/updateResidentAgents`,
        method: 'post',
        data
    })
}
export function getAddTag(data) {
    return request({
        url: `${BASE_URL}/market/addTag`,
        method: 'post',
        data
    })
}
export function getShowParentId(data) {
    return request({
        url: `${BASE_URL}/market/srvs`,
        method: 'post',
        data
    })
}
export function getSelectServiceCardTag(params) {
    return request({
        url: `${BASE_URL}/market/selectServiceCardTag`,
        method: 'get',
        params
    })
}
export function getSelectAgentsDescAndCard(params) {
    return request({
        url: `${BASE_URL}/market/selectAgentsDescAndCard`,
        method: 'get',
        params
    })
}
export function getAddServiceCardTag(data) {
    return request({
        url: `${BASE_URL}/market/addServiceCardTag`,
        method: 'post',
        data
    })
}

export function getUpdateServiceCard(data) {
    return request({
        url: `${BASE_URL}/market/updateServiceCard`,
        method: 'post',
        data
    })
}
export function getDeleteServiceCard(data) {
    return request({
        url: `${BASE_URL}/market/deleteServiceCard`,
        method: 'post',
        data
    })
}
export function getDeleteResidentAgentsAll(data) {
    return request({
        url: `${BASE_URL}/market/deleteResidentAgentsAll`,
        method: 'post',
        data
    })
}