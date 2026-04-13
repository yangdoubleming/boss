
import request from '../utils/request.js';



const BASE_URL =`${process.env.VUE_APP_ADD_WHITE}`
// const BASE_URL =`${process.env.VUE_APP_ADD}`

export function addWhiteList(data) {
    return request({
      url: `${BASE_URL}/wflending/lending/offer/pageList?page=${data.page}&rows=${data.rows}`, //加白列表
      method: 'post',
      data
    })
  }
  
export function addWhite(data) {
    return request({
      url: `${BASE_URL}/wflending/lending/wfSyncAmazon/wfApi7/sendWhite`, //加白
      method: 'post',
      data
    })
  }

  export function sendOffer(data) {
    return request({
      url: `${BASE_URL}/wflending/lending/wfSyncAmazon/wfApi7/sendOffer`, //发offer
      method: 'post',
      data
    })
  }
// 批量导出汇丰（香港）
  export function piliangdaochu(data) {
    return request({
      url: `${process.env.VUE_APP_BASE_URL}/lending/offer/lender/data/export/hkhf2`, //发offer
      method: 'post',
      data
    })
  }

