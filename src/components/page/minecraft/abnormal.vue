<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>


        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" />



    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { abnormal } from '../../../api/index';
export default {
    name: 'abnormal',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {


            tableOperate: [],
            tableData: [],
            filterOptions: [
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '借款人',
                //     filterable: true,
                //     options: []
                // },
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: this.$t('loan_serch_phone'),
                //     filterable: true,
                //     options: []
                // },
                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '贷款资金方',
                //     filterable: true,
                //     options: []
                // },
                // {
                //     type: 'daterange',
                //     value: [],
                //     placeholder: '时间',
                //     filterable: true,
                //     options: []
                // }
            ],
            orderStatus: [
                'CREATED',
                'SUBMITTED',
                'RECEIVED_1ST',
                'RECEIVED_2ND',
                'APPROVED',
                'ENABLED',
                'REJECTED',
                'ABANDONED',
                'WITHDRAWED',
                'DISBURSED',
                'OVERDUE',
                'CLOSED'
            ],
            orderStatusStr: [
                '已创建',
                '已提交',
                '已初核',
                '已复核',
                '已批准',
                '已启用',
                '已拒绝',
                '已放弃',
                '已提款',
                '已放款',
                '已逾期',
                '已关闭'
            ],
            columns: [
                {
                    label: '店铺id',
                    prop: 'offerId',
                    width: 350
                },

                {
                    label: '用户名',
                    prop: 'userName',
                    width: 100
                },
                {
                    label: '用户手机号',
                    prop: 'phoneNumber',
                    width: 120
                },

                {
                    label: '卖家状态',
                    prop: 'sellerStatus',
                    width: '100'
                },
                {
                    label: '最近1周销售额(美元)',
                    prop: 'week1SalesValue',
                    width: 170
                },

                {
                    label: '申请单状态',
                    prop: 'applicationStatus',
                    width: 140
                },


                {
                    label: '异常等级',
                    prop: 'level',
                    width: 140
                },
                {
                    label: '最近2周销售额(美元)',
                    prop: 'week2SalesValue',
                    width: 180
                },
                {
                    label: 'fba库存价值(美元)',
                    prop: 'latestFbaInventoryValue',
                    width: 160
                },
                {
                    label: '销售业绩评分',
                    prop: 'salesStabilityScore',
                    width: 160
                },
                {
                    label: '近60天回款额(美元)',
                    prop: 'day60DisbursementsValue',
                    width: 170
                },
                {
                    label: '在贷余额(人民币)',
                    prop: 'loanBalance',
                    width: 160
                },

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '180',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: this.$t('common_see'),
                //             type: 'primary'
                //         },
                //          {
                //             event: '22',
                //             text: '冻结',
                //             type: 'danger'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ],
        };
    },
    created() {

    },
    methods: {




        _getList() {

            abnormal().then((res) => {
                res.data.records.forEach((item) => {
                    // 转状态
                    item.applicationStatus = this.orderStatus.indexOf(item.applicationStatus).toString()
                        ? this.orderStatusStr[this.orderStatus.indexOf(item.applicationStatus)]
                        : '';


                    item.level = item.level == 'ATTENTION' ? '关注' : item.level == 'WARNING' ? '预警' : ''
                });
                this.tableData = res.data;
                this.totalSize = 0;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/loaned-detail',
                query: {
                    id: val.id,
                }
            });
        }
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