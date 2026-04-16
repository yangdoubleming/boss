<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page @onExport="onExport" :tableData="tableData" :showFilterRadio="true" :tableOperate="tableOperate"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" @conditional-query="handleColumnsFilter"
            :current='currentPage' @conditional-reset="handleConditionalReset" :applicationStatus="applicationStatus"
            @changeStatus="changeStatus" @page-change="handlePageChange" :detailTable="true" />


    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { minecraftList } from '../../../api/index';
export default {
    name: 'minecraft',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            filterStatus: [
                {
                    label: this.$t('status_all'),
                    value: '',
                },
                {
                    label: this.$t('status_create'),
                    value: 'CREATED',
                },
                {
                    label: this.$t('status_submitted'),
                    value: 'SUBMITTED',
                },
                {
                    label: this.$t('status_first'),
                    value: 'RECEIVED_1ST',
                },
                {
                    label: this.$t('status_sercond'),
                    value: 'RECEIVED_2ND',
                },
                {
                    label: this.$t('status_approved'),
                    value: 'APPROVED',
                },
                {
                    label: this.$t('status_rejected'),
                    value: 'REJECTED',
                },
                {
                    label: this.$t('status_issued'),
                    value: 'DISBURSED',
                },
                {
                    label: this.$t('status_abandoned'),
                    value: 'ABANDONED',
                },
                {
                    label: this.$t('status_closed'),
                    value: 'CLOSED',
                }
            ],
            form: {
                bName: '',
                bPhoneNumber: '',
                bIDCard: '',
                bAddress: '',
                bEmail: '',
                bCardFrontPath: '',
                bCardBackPath: '',
                bsName: '',
                bsCardId: '',
                bEducationLevel: '',
                bLiveStatus: '',
                bcName: '',
                bcCreditcode: '',
                bcAddress: '',
                bcLegalperson: '',
                lenderId: '',
                lenderProductId: '',
                applicationTime: '',
                paymentCode: '',
            },
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            dialogFormVisible: false,
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
            tableOperate: [],

            loanAmountSum: '',
            loanNumberSum: '',
            onLoanAmountSum: '',
            applicationStatus: '',
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_name'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('home_zjffb'),
                    filterable: true,
                    options: [
                        {
                            label: "默放保理-跨易赊-天木物流",
                            value: 48
                        },
                        {
                            label: "默放保理-跨易赊",
                            value: 43
                        },
                        {
                            label: "默放保理-跨易赊-飞书",
                            value: 59
                        },
                    ]
                },

                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: [this.$t('loan_search_sqkssj'), this.$t('loan_search_sqjssj')],
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    color: '#409EFF',
                    width: 230
                },

                {
                    label: this.$t('loan_search_zhucename'),
                    prop: 'realName',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: this.$t('loan_search_zhucephone'),
                    prop: 'account',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bName',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: this.$t('loan_search_jkrsjh'),
                    prop: 'bPhoneNumber',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    color: '#409EFF',
                    width: 150
                },

                {
                    label: this.$t('home_dps'),
                    prop: 'bindShopCount',
                    width: 140
                },
                {
                    label: this.$t('loan_search_saled'),
                    prop: 'bindShopGmv12m',
                    width: 150
                },

                {
                    label: this.$t('loan_search_amount'),
                    prop: 'creditAmount',
                    width: 150
                },
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'applicationTime',
                    width: 200
                },
                {
                    label: this.$t('loan_search_sxrq'),
                    prop: 'creditTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_status'),
                    prop: 'applicationStatus'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('common_see'),
                            type: 'primary',
                            code: 'LOOK_DETAIL'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            baseUrl: process.env.VUE_APP_BASE_URL,
            productsList: []
        };
    },
    created() {
        this._getList();
    },
    activated() {
        this._getList();
    },
    methods: {
        onExport() {
            let that = this;

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: this.filterOptions[3].value.length
                    ? `${this.baseUrl}/lending/application/export?applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[1].value}&bPhoneNumber=${this.filterOptions[2].value}&lenderId=28&applicationTimeStart=${this.filterOptions[3].value[0]}&applicationTimeEnd=${this.filterOptions[3].value[1]}`
                    : `${this.baseUrl}/lending/application/export?applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[1].value}&bPhoneNumber=${this.filterOptions[2].value}&lenderId=28`,
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
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        changeStatus(val) {
            this.applicationStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        _getList() {
            let data = {
                current: this.currentPage,
                size: 10,
                userId: this.$route.query.userId,
            }
            minecraftList(data).then((res) => {
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        // 转状态
                        item.applicationStatus = this.orderStatus.indexOf(item.applicationStatus).toString()
                            ? this.orderStatusStr[this.orderStatus.indexOf(item.applicationStatus)]
                            : '';
                    });
                }
                this.loanAmountSum = (res.data.currentLoanAmountSum / 10000).toFixed(2);
                this.onLoanAmountSum = (res.data.currentOnLoanAmountSum / 10000).toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum;
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/multiple-detail',
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.productName,
                    creditAmount: val.creditAmount,
                    applicationStatus: val.applicationStatus,
                    account: val.account,
                    userId: val.userId,
                    lenderId: val.lenderId
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
/* 谷歌 */
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
    -webkit-appearance: normal !important;
    appearance: normal !important;
}

/* 火狐 */
/deep/input {
    -moz-appearance: normal !important;
}

/deep/.el-upload--text {
    width: 360px !important;
    height: 178px !important;
    display: block !important;
    border: 1px dashed #CED1D5;
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
    width: 360px !important;
    height: 178px !important;
    display: block !important;
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