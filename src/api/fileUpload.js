import request from '../utils/request.js';

const baseUrl = `${process.env.VUE_APP_FILE_MANAGEMENT}`

export function uploadImageFile(data) {
  return request({
    url: `${baseUrl}/images/upload`,
    method: 'post',
    data
  })
}

export function updateImageFile(data) {
  return request({
    url: `${baseUrl}/images/update`,
    method: 'post',
    data
  })
}

export function getImageFileList(params = { page: 0, rows: 10 }) {
  return request({
    url: `${baseUrl}/images/list`,
    method: 'get',
    params,
  })
}

export function getResourcetagList(params = { page: 0, rows: 10 }) {
  return request({
    url: `${baseUrl}/images/resource-tag-list`,
    method: 'get',
    params,
  })
}

export function deleteImageById(data) {
  return request({
    url: `${baseUrl}/images/delete`,
    method: 'post',
    data,
  })
}

export function queryImage(params) {
  return request({
    url: `${baseUrl}/images/query`,
    method: 'get',
    params,
  })
}