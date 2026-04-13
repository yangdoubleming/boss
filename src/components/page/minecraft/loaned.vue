<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">逾期金额</span>
                                    <span class="grid-num2">{{ loanAmountSum }}万</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">逾期笔数</span>
                                    <span class="grid-num2">{{ loanNumberSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page :detailTable="true" :tableData="tableData" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @quote="toDetail" />

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xform from '../../common/Xform.vue';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { repayment } from '../../../api/boss1';
import {
    loanPage,
    repaymentPlan,
    clearLoan,
    loanUpdate,
    deleteLoan,
    lenderList,
    recordList,
    allotLoan,
    splitedCreateLoan,
    selectLoan,
    addRepaymentHistory,
    deleteHistory,
    getLoanPlan,
    drbAddRepaymentHistory
} from '../../../api/index';
export default {
    name: 'loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable,
        xform
    },
    data() {
        return {




            loanAmount: '',



            filterStatus: [
                {
                    label: this.$t('status_all'),
                    value: ''
                },
                {
                    label: this.$t('status_create'),
                    value: 'CREATED'
                },
                {
                    label: this.$t('status_successful'),
                    value: 'DISBURSE_SUCESS'
                },
                {
                    label: this.$t('status_failed'),
                    value: 'DISBURSE_FAILED'
                },
                {
                    label: this.$t('status_past'),
                    value: 'OVERDUE'
                },

                {
                    label: this.$t('status_Repayment'),
                    value: 'REPAYMENT'
                },
                {
                    label: this.$t('status_closed'),
                    value: 'CLOSED'
                },
                {
                    label: this.$t('status_cleared'),
                    value: 'CLEAR'
                }
            ],
            loanAmountSum: '',
            loanNumberSum: '',
            dates: [],

            uploadUrl: 'http://114.116.249.242:8009/dowsure-file/file-upload/uploadImg/upload',
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_dkbh'),
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: this.$t('home_zjffb'),
                    filterable: true
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholderArr: ['支用开始时间 ', '支用结束时间']
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholder: '贷款结束时间',
                    placeholderArr: ['贷款结束时间开始 ', '贷款结束时间结束'],
                    filterable: true
                }

                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '状态',
                //     filterable: true,
                //     options: [
                //         {
                //              label: this.$t('status_create'),
                //             value: 'CREATED'
                //         },
                //         {
                //              label: this.$t('status_successful'),
                //             value: 'DISBURSE_SUCESS'
                //         },
                //         {
                //              label: this.$t('status_failed'),
                //             value: 'DISBURSE_FAILED'
                //         },
                //         {
                //             label: this.$t('status_past'),
                //             value: 'OVERDUE'
                //         },
                //         {
                //             label: this.$t('status_Repayment'),
                //             value: 'REPAYMENT'
                //         },
                //         {
                //              label: this.$t('status_closed'),
                //             value: 'CLOSED'
                //         },
                //     ]
                // },
                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '锁定',
                //     filterable: true,
                //     options: [
                //         {
                //             label: '未锁定',
                //             value: 'UNLOCK'
                //         },
                //         {
                //             label: '锁定',
                //             value: 'LOCK'
                //         },

                //     ]
                // }
            ],

            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: 225
                },
                {
                    label: '贷款编号',
                    prop: 'loanCode',
                    width: 225
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: 210
                },
                {
                    label: '借款人',
                    prop: 'bname',
                    width: 110
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: 110
                },

                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus',
                    width: 100
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr',
                    width: 100
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 210
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: 210
                },
                // {
                //     label: '存款账户',
                //     prop: 'depositAccount'
                // },
                // {
                //     label: '存款账户银行',
                //     prop: 'depositAccountBank',
                //     width: '120'
                // },

                // {
                //     label: '存款账户用户名',
                //     prop: 'depositAccountUsername',
                //     width: '120'
                // },
                {
                    label: this.$t('loan_detail_htxy'),
                    prop: 'guarantorFee',
                    width: 130
                },
                {
                    label: this.$t('loan_detail_dbfl'),
                    prop: 'guarantorFeeRate',
                    width: 130
                },
                {
                    label: this.$t('loan_detail_dkedw'),
                    prop: 'loanAmount',
                    width: 130
                },

                {
                    label: this.$t('loan_detail_dkzysqrq'),
                    prop: 'loanApplyDate',
                    width: 210
                },
                {
                    label: this.$t('loan_detail_dkzyksrq'),
                    prop: 'loanStartDate',
                    width: 210
                },
                {
                    label: this.$t('loan_detail_dkzyjsrq'),
                    prop: 'loanEndDate',
                    width: 210
                },

                {
                    label: this.$t('loan_detail_zqy'),
                    prop: 'loanPeriod',
                    width: 120
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '160'
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentMethod',
                    width: '260'
                },

                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '200'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('common_see'),
                            type: 'primary',

                        },

                    ],
                    fixed: 'right'
                }
            ],
            productsList: [],
            row: {},
            dialogVisible2: false,
            endDate: '',
            loanStatus: '',
            repaymentAmount: 0,
            dealAmountSum: 0,
            totalMoney: 0,
            rePaymentData: [],
            chooseDatas: [],
            showAddHistory: false,
            selectRowData: []
        };
    },
    activated() {
        // console.log(this.$route);
        if (this.$route.query.loanNumber) {
            setTimeout(() => {
                this.filterOptions[0].value = this.$route.query.loanNumber;
                this._getList();
                this.$route.query.loanNumber = '';
            }, 0);
        }
        this.selectRowData = [];
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[2].options = res.data;
        });
    },

    methods: {
        toDetail(val) {
            this.$router.push({
                path: '/loaned-detail',
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.productName,
                    creditAmount: val.creditAmount,
                    applicationStatus: val.applicationStatus,
                    account: val.account,
                    userId: val.userId,
                    loanCode: val.loanCode
                }
            });
        },


        _getList() {
            if (!this.filterOptions[3].value && !this.filterOptions[3].value.length) {
                this.filterOptions[3].value = ['', ''];
            }
            if (!this.filterOptions[4].value && !this.filterOptions[4].value.length) {
                this.filterOptions[4].value = ['', ''];
            }
            loanPage(
                this.currentPage,
                this.filterOptions[0].value,
                this.filterOptions[1].value,
                this.filterOptions[3].value[0],
                this.filterOptions[3].value[1],
                this.filterOptions[2].value,
                'OVERDUE',
                '',
                '',
                'JOINT_VENTURE',
                this.filterOptions[4].value[0],
                this.filterOptions[4].value[1]
            ).then((res) => {
                this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum;
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        item.guarantorFeeRate = (item.guarantorFeeRate * 100).toFixed(2);
                        item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                        item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
                        item.hiddenBtn = '';
                        item.hiddenBtn =
                            item.lenderProductId == 33 || item.lenderProductId == 34
                                ? (item.hiddenBtn += '结清,删除，修改')
                                : item.hiddenBtn;
                    });
                }

                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
                if (this.$route.query.loanNumber) {
                    this.filterOptions[0].value = this.$route.query.loanNumber;
                    this._getList();
                    this.$route.query.loanNumber = '';

                    return false;
                }
            });
        }
    }
};
</script>

<style lang='less' scope>
/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

/* 火狐 */
input {
    -moz-appearance: textfield;
}

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