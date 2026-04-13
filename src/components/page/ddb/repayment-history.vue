<template>
    <div>
        <div style='display:flex; align-items: center;padding:18px'>
            <div style='color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;'>
                <img src='../../../../public/img/favicon.png' style='width:17px;height:17px;margin-right:5px' alt />豆沙包
                /
            </div>

            <span style='color:rgba(0,0,0,.65);font-size:14px;padding-left:5px'>{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter='24'>
            <el-col :span='24'>
                <el-row :gutter='24' class='mgb20'>
                    <el-col :span='4'>
                        <el-card shadow='hover' :body-style="{ padding: '0px' }">
                            <div class='grid-content grid-con-1'>
                                <div class='grid-cont-right'>
                                    <span class='grid-num'>还款笔数</span>
                                    <span class='grid-num2'>{{ cartData.total }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span='4'>
                        <el-card shadow='hover' :body-style="{ padding: '0px' }">
                            <div class='grid-content grid-con-1'>
                                <div class='grid-cont-right'>
                                    <span class='grid-num'>还款金额</span>
                                    <span class='grid-num2'>{{ cartData.dealAmount.toFixed(2)
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span='4'>
                        <el-card shadow='hover' :body-style="{ padding: '0px' }">
                            <div class='grid-content grid-con-1'>
                                <div class='grid-cont-right'>
                                    <span class='grid-num'>还款本金</span>
                                    <span class='grid-num2'>{{ cartData.paymentPrincipal.toFixed(2)
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span='4'>
                        <el-card shadow='hover' :body-style="{ padding: '0px' }">
                            <div class='grid-content grid-con-1'>
                                <div class='grid-cont-right'>
                                    <span class='grid-num'>还款利息</span>
                                    <span class='grid-num2'>{{ cartData.paymentInterest.toFixed(2)
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span='4'>
                        <el-card shadow='hover' :body-style="{ padding: '0px' }">
                            <div class='grid-content grid-con-1'>
                                <div class='grid-cont-right'>
                                    <span class='grid-num'>还款罚息</span>
                                    <span class='grid-num2'>{{ cartData.paymentPenaltyInterest.toFixed(2)
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page @onExport='onExport' :tableData='tableData' :tableOperate='tableOperate'
            :filterOptions='filterOptions' :columns='columns' :totalSize='totalSize' :detailTable='true'
            :exportBtn='true' @conditional-query='handleColumnsFilter' :current='currentPage'
            @conditional-reset='handleConditionalReset' @page-change='handlePageChange' />


    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { paymentHistory, recordList, lenderList } from '../../../api/index';
import xtable from '../../common/Xtable.vue';
import { getRepaymentCard, getRepaymentList } from '../../../api/ddb';

export default {
    name: 'us-payment-history',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {

            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    placeholder: '第三方贷款编号',
                    value: ''
                },
                {
                    type: 'input',
                    placeholder: this.$t('loan_search_dkbh'),
                    value: '',
                    options: []
                },
                {
                    type: 'input',
                    placeholder: '用户编号',
                    value: '',
                    options: []
                },
                {
                    type: 'input',
                    placeholder: '第三方用户编号',
                    value: '',
                    options: []
                },
                {
                    type: 'input',
                    placeholder: '还款单号',
                    value: ''
                },
                {
                    type: 'input',
                    placeholder: '用户名称',
                    value: ''
                },
                {
                    type: 'select',
                    placeholder: '还款状态',
                    value: '',
                    options: [
                        {
                            label: this.$t('status_Repayment'),
                            value: 'REPAYMENT'
                        },
                        {
                            label: '还款成功',
                            value: 'SUCCESS'
                        },
                        {
                            label: '还款失败',
                            value: 'FAILURE'
                        }


                    ]
                },
                {
                    type: 'select',
                    placeholder: '还款来源',
                    value: '',
                    options: [
                        {
                            label: '快捷',
                            value: '1'
                        },
                        {
                            label: '网银',
                            value: '2'
                        },
                        {
                            label: '银行卡代扣',
                            value: '3'
                        },
                        {
                            label: '账户扣款',
                            value: '4'
                        },
                        {
                            label: '线下',
                            value: '5'
                        }


                    ]
                },

                {
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholder: '时间',

                    placeholderArr: ['创建开始时间 ', '创建结束时间'],
                    options: []
                }

            ],
            columns: [
                {
                    label: '还款编号',
                    prop: 'serialNo',
                    width: 230
                },

                {
                    label: '第三方收款单号',
                    prop: 'paymentNo',
                    width: 200
                },
                {
                    label: '第三方贷款单编号',
                    prop: 'extLoanOrderId',
                    width: 200
                },

                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: 220
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },

                {
                    label: '用户编号',
                    prop: 'userId',
                    width: 120
                },
                {
                    label: '第三方用户号',
                    prop: 'extUserId',
                    width: 200
                },
                {
                    label: '用户名称',
                    prop: 'bName',
                    width: 120
                },

                {
                    label: '还款状态',
                    prop: 'status',
                    width: 120
                },
                {
                    label: '还款来源',
                    prop: 'repaymentSource',
                    width: 120
                },
                {
                    label: '还款金额',
                    prop: 'dealAmount',
                    width: 120
                },
                {
                    label: '还款本金',
                    prop: 'paymentPrincipal',
                    width: 120
                },
                {
                    label: '还款利息',
                    prop: 'paymentInterest',
                    width: 120
                },
                {
                    label: '还款罚息',
                    prop: 'paymentPenaltyInterest',
                    width: 120
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '180',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text:this.$t('loan_detail_fkjl'),
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ],
            cartData: {
                total: {
                    title: '还款笔数',
                    value: 0
                },
                dealAmount: {
                    title: '还款金额',
                    value: 0
                },
                paymentPrincipal: {
                    title: '还款本金',
                    value: 0
                },
                paymentInterest: {
                    title: '还款利息',
                    value: 0
                }
                ,
                paymentPenaltyInterest: {
                    title: '还款罚息',
                    value: 0
                }
            },
            baseUrl: process.env.VUE_APP_BASE_URL
        }
            ;
    },
    created() {
        lenderList().then(res => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[0].options = res.data;
        });
    },
    methods: {

        onExport() {
            let that = this;
            let data = {
                "extLoanOrderId": this.filterOptions[0].value,
                "loanCode": this.filterOptions[1].value,
                "userId": this.filterOptions[2].value,
                "extUserId": this.filterOptions[3].value,
                "serialNo": this.filterOptions[4].value,
                "bcName": this.filterOptions[5].value,
                "status": this.filterOptions[6].value,
                "repaymentSource": this.filterOptions[7].value,
                "beginTime": this.filterOptions[8].value[0],
                "endTime": this.filterOptions[8].value[1],
                "lenderId": 15,
                "applicationOrderType": "SELF_SUPPORT",
                "size": 500,
                "current": 1
            }
            const axios = require('axios');
            axios({
                method: 'POST',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/LlianOrder/repaymentRecord/export`,
                data: data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                });
        },

        _getList() {
            let starTime = this.filterOptions[8].value && this.filterOptions[8].value.length ? this.filterOptions[8].value[0] : '';
            let endTime = this.filterOptions[8].value && this.filterOptions[8].value.length ? this.filterOptions[8].value[1] : '';
            getRepaymentList({
                extLoanOrderId: this.filterOptions[0].value,
                loanCode: this.filterOptions[1].value,
                userId: this.filterOptions[2].value,
                extUserId: this.filterOptions[3].value,
                serialNo: this.filterOptions[4].value,
                bcName: this.filterOptions[5].value,
                status: this.filterOptions[6].value,
                repaymentSource: this.filterOptions[7].value,
                beginTime: starTime,
                endTime: endTime,
                size: 10,
                current: this.currentPage
            }).then((res) => {
                res.data.records.forEach((item) => {
                    this.filterOptions[6].options.forEach(it => {
                        if (item.status == it.value) {
                            item.status = it.label;
                        }
                    });
                    this.filterOptions[7].options.forEach(it => {
                        if (item.repaymentSource == it.value) {
                            item.repaymentSource = it.label;
                        }
                    });

                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
                this.getCardData();
                // this.cartData = {
                //     total: {
                //         title: '还款笔数',
                //         value: 0
                //     },
                //     dealAmount: {
                //         title: '还款金额',
                //         value: 0
                //     },
                //     paymentPrincipal: {
                //         title: '还款本金',
                //         value: 0
                //     },
                //     paymentInterest: {
                //         title: '还款利息',
                //         value: 0
                //     }
                //     ,
                //     paymentPenaltyInterest: {
                //         title: '还款罚息',
                //         value: 0
                //     }
                // }
                // this.cartData.total.value = res.data.total;
                // res.data.records.forEach(x=>{
                //     this.cartData.dealAmount.value += (x.dealAmount ? Number(x.dealAmount):0)
                //     this.cartData.paymentPrincipal.value += (x.paymentPrincipal ? Number(x.paymentPrincipal):0)
                //     this.cartData.paymentInterest.value += (x.paymentInterest ? Number(x.paymentInterest):0)
                //     this.cartData.paymentPenaltyInterest.value += (x.paymentPenaltyInterest ? Number(x.paymentPenaltyInterest):0)
                // })
            });
        },

        getCardData() {
            let starTime = this.filterOptions[8].value && this.filterOptions[8].value.length ? this.filterOptions[8].value[0] : '';
            let endTime = this.filterOptions[8].value && this.filterOptions[8].value.length ? this.filterOptions[8].value[1] : '';
            getRepaymentCard({
                extLoanOrderId: this.filterOptions[0].value,
                loanCode: this.filterOptions[1].value,
                userId: this.filterOptions[2].value,
                extUserId: this.filterOptions[3].value,
                serialNo: this.filterOptions[4].value,
                bcName: this.filterOptions[5].value,
                status: this.filterOptions[6].value,
                repaymentSource: this.filterOptions[7].value,
                beginTime: starTime,
                endTime: endTime,
                size: 500,
                current: 1
            }).then(res => {
                this.cartData = res.data
            })
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

/deep/ .el-form-item .form-margin .el-form-item--small .form-margin {
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