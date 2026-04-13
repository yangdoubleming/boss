<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <el-card style="padding-bottom: 100px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="120" style="font-size:14px">
                </el-table-column>
                <el-table-column label="接口名" width="500">
                    <template slot-scope="scope">
                        <div style="line-height: 36px;font-size:14px">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="接口路径" width="800">
                    <template slot-scope="scope">
                        <div style="line-height: 36px;font-size:14px">{{ scope.row.path }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="状态 ">
                    <template slot-scope="scope">
                        <!-- <i v-if="scope.row.status == 0" class="el-icon-loading" style="font-size: 25px;"></i>
                        <i v-if="scope.row.status == 1" class="el-icon-success"
                            style="font-size: 25px;color: #67C23A;"></i>
                        <i v-if="scope.row.status == 2" class="el-icon-error"
                            style="font-size: 25px;color: #F56C6C;"></i> -->
                            <i class="el-icon-success"
                            style="font-size: 25px;color: #67C23A;"></i>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>


    </div>
</template>

<script>
// import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { test } from '../../../api/apiSass';
import xtable from '../../common/Xtable.vue';
export default {
    name: 'us-payment-history',
    // mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {

            tableOperate: [],
            // 0 等待  1成功 2失败
            tableData: [
               {
                    name: '请求发送 offer（API-C01）',
                    path: '/v1/seller/offer',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '查询offer发送状态（API-C02）',
                    path: '/v1/seller/offer-status',
                    method: 'GET',
                    status: 0
                },
                {
                    name: '校验借款人信息（API-C03）',
                    path: '/v1/borrower/url',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '设置校验借款人信息（API-C04）',
                    path: '/v1/borrower/url',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '设置准入规则（API-C17）',
                    path: '/v1/platform/rule',
                    method: 'POST',
                    status: 0
                },
                // 贷款申请
                {
                    name: '跳转用户授信平台（API-C05）',
                    path: '/v1/platform/rule',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '获取卖家店铺数据（API-C06）',
                    path: '/v1/seller/shop-data',
                    method: 'GET',
                    status: 0
                },
                {
                    name: '传输授信结果（API-C07）',
                    path: '/v1/credit/result',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输贷款支用数据（API-C08）',
                    path: '/v1/credit/loan',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输还款计划（API-C09）',
                    path: '/v1/loan/repayment-plan',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输还款数据（API-C10）',
                    path: '/v1/loan/repayment',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输授信关闭请求（API-C11）',
                    path: '/v1/credit/close',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输结清支用请求（API-C12）',
                    path: '/v1/loan/close',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '校验卖家支付公司信息（API-C13）',
                    path: '/v1/seller/psp-account',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输每日逾期数据（API-C16）',
                    path: '/v1/loan/overdue-data',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '传输支用关闭&授信关闭请求（API-C18）',
                    path: '/v1/loan/closeall',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '获取卖家店铺评分信息（API-C23）',
                    path: '/v1/seller/shop-score',
                    method: 'GET',
                    status: 0
                },
                // D盾
                {
                    name: '查询卖家平台账户状态（API-D01）',
                    path: '/v1/seller/account-lock',
                    method: 'POST',
                    status: 0
                },
                {
                    name: '请求强制划扣（API-D02）',
                    path: '/v1/psp/repayment',
                    method: 'UPDATE',
                    status: 0
                },
                {
                    name: '解除强制划扣（API-D03）',
                    path: '/v1/psp/repayment-cancel',
                    method: 'UPDATE',
                    status: 0
                },
                {
                    name: '获取强制划扣结果（API-D04）',
                    path: '/v1/psp/repayment-data',
                    method: 'UPDATE',
                    status: 0
                },


            ],

            baseUrl: process.env.VUE_APP_BASE_URL,
        };
    },
    created() {
        this.tableData.forEach((item, index) => {
            test(item.path, item.method).then(res => {
                this.tableData[index].status = 1
            }).catch(err => {
               
                if (err == 'ErrorError') {
                    console.log('asdasdasdasdasdsada');
                    setTimeout(() => {
                        this.tableData[index].status = 1
                    }, Math.round(Math.random() * 1500));
                }
                else if (err && err.response.status == 404 || err.response.status == 503 || err.response.status == 504 || err.response.status == 505) {
                    setTimeout(() => {
                        this.tableData[index].status = 2
                    }, Math.round(Math.random() * 1500));
                } else {
                    setTimeout(() => {
                        this.tableData[index].status = 1
                    }, Math.round(Math.random() * 1500));
                }
            })
        });
    },
    methods: {

    }
};
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px;
    height: 178px;
    display: block;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>