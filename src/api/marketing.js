import request from '../utils/request.js';

/**
 * 营销活动相关接口
 */

// 使用相对路径，让系统根据环境自动切换域名
const BASE_URL = `/lending`;

/**
 * 获取营销活动列表（分页查询）
 * @param {Object} params - 查询参数
 * @param {number} params.current - 当前页码
 * @param {number} params.size - 每页数量
 * @param {number} params.id - 主键ID（可选，默认0）
 * @param {string} params.name - 活动名称
 * @param {string} params.code - 活动编号
 * @param {string} params.productType - 产品类型
 * @param {string} params.productName - 产品名称
 * @param {string} params.startTimeBegin - 活动开始时间-开始
 * @param {string} params.startTimeEnd - 活动开始时间-结束
 * @param {string} params.endTimeBegin - 活动结束时间-开始
 * @param {string} params.endTimeEnd - 活动结束时间-结束
 * @param {string} params.discountTarget - 优惠对象
 * @param {string} params.status - 活动状态
 * @param {string} params.creator - 创建人
 * @param {Array} params.lenderIds - 放贷机构IDs（数组）
 * @returns {Promise}
 */
export function getMarketingActivityList(params) {
    return request({
        url: BASE_URL + '/coupon/template/page',
        method: 'post',
        data: params // POST请求使用data而不是params
    });
}

/**
 * 创建营销活动
 * @param {Object} data - 活动数据
 * @returns {Promise}
 */
export function createMarketingActivity(data) {
    return request({
        url: BASE_URL + '/coupon/template',
        method: 'post',
        data: data
    });
}

/**
 * 更新营销活动
 * @param {Object} data - 活动数据
 * @returns {Promise}
 */
export function updateMarketingActivity(data) {
    return request({
        url: BASE_URL + '/coupon/template',
        method: 'put',
        data: data
    });
}

/**
 * 删除营销活动
 * @param {number} id - 活动ID
 * @returns {Promise}
 */
export function deleteMarketingActivity(id) {
    return request({
        url: BASE_URL + `/coupon/template/${id}`,
        method: 'delete'
    });
}

/**
 * 获取营销活动详情
 * @param {number} id - 活动ID
 * @returns {Promise}
 */
export function getMarketingActivityDetail(id) {
    return request({
        url: BASE_URL + `/coupon/template/detail/${id}`,
        method: 'get'
    });
}

/**
 * 营销活动上线
 * @param {number} id - 活动ID
 * @returns {Promise}
 */
export function onlineMarketingActivity(id) {
    return request({
        url: BASE_URL + `/coupon/template/${id}/online`,
        method: 'post'
    });
}

/**
 * 营销活动下线
 * @param {number} id - 活动ID
 * @returns {Promise}
 */
export function offlineMarketingActivity(id) {
    return request({
        url: BASE_URL + `/coupon/template/${id}/offline`,
        method: 'post'
    });
}

/**
 * 获取放贷机构列表
 * @returns {Promise}
 */
export function getLenderList() {
    return request({
        url: BASE_URL + '/lender/list',
        method: 'get'
    });
}

/**
 * 创建/更新营销活动 - 保存和完成操作
 * @param {Object} data - 活动数据
 * @returns {Promise}
 */
export function operateMarketingActivity(data) {
    return request({
        url: BASE_URL + '/coupon/template/operate',
        method: 'post',
        data: data
    });
}

/**
 * 创建领取池
 * @param {number} templateId - 模板ID（活动ID）
 * @param {number} totalQuantity - 总数量
 * @returns {Promise}
 */
export function createPool(templateId, totalQuantity) {
    return request({
        url: BASE_URL + '/coupon/issue/create-pool',
        method: 'post',
        params: {
            templateId: templateId,
            totalQuantity: totalQuantity
        }
    });
}

/**
 * 获取发放记录列表
 * @param {number} templateId - 模板ID（活动ID）
 * @returns {Promise}
 */
export function getDistributionList(templateId) {
    return request({
        url: BASE_URL + '/coupon/issue/list',
        method: 'get',
        params: {
            templateId: templateId
        }
    });
}

/**
 * 运营批量发放
 * @param {number} templateId - 模板ID（活动ID）
 * @returns {Promise}
 */
export function batchIssue(templateId) {
    return request({
        url: BASE_URL + '/coupon/issue/batch-issue',
        method: 'post',
        params: {
            templateId: templateId
        }
    });
}
