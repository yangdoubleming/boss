<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="padding-top:30px;background:#fff">
            <table-page :detailTable="true" @changeTime='_changeTime' :productsOptions='productsOptions'
                @export='_export' @changeProducts='_changeProducts' :isExporting='isExporting' :isExport2='true'
                :showFilterRadio="false" :tableData="tableData" :tableOperate="tableOperate"
                :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" @page-change="changeFilter"
                :current="currentPage" :lenderOptions="lenderOptions" @changeLender="_changeLender" />
        </div>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getProducts, guaranteeInfo, lenderList } from '../../../api/index';
export default {
    name: 'day-report',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            dates: ['', ''],
            lenderOptions: [],
            productsOptions: [],
            isExporting: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [],
            productsId: '',
            statusList: [
                {
                    label: this.$t('status_create'),
                    value: 'CREATED',
                },
                {
                    label: this.$t('status_successful'),
                    value: 'DISBURSE_SUCESS',
                },
                {
                    label: this.$t('status_failed'),
                    value: 'DISBURSE_FAILED',
                },
                {
                    label: this.$t('status_past'),
                    value: 'OVERDUE',
                },
                {
                    label: this.$t('status_Repayment'),
                    value: 'REPAYMENT',
                },
                {
                    label: this.$t('status_closed'),
                    value: 'CLOSED',
                },
                {
                    label: this.$t('status_cleared'),
                    value: 'CLEAR',
                }
            ],
            columns: [

                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: 120
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: 120
                },
                {
                    label: this.$t('loan_search_dkzt'),
                    prop: 'loanStatus',
                    width: '120'
                },
                {
                    label: '贷款金额(万元/万美元)',
                    prop: 'loanAmount',
                    width: '120'
                },
                {
                    label: '借款利率',
                    prop: 'apr',
                    width: '120'
                },
                {
                    label: '借款期限（月）',
                    prop: 'loanPeriod',
                    width: '140'
                },

                {
                    label: '保证金比例',
                    prop: 'guarantorFeeRate',
                    width: '130'
                },
                {
                    label: '保证金总额(元)',
                    prop: 'guarantorFee',
                    width: 150
                },
                {
                    label: '提还借据保证金占用额(元)',
                    prop: 'payBackGuaranteeFee',
                    width: '180'
                },
                {
                    label: '贷款支用日期',
                    prop: 'loanStartDate',
                    width: '200'
                },

                {
                    label: '贷款结束日期',
                    prop: 'loanEndDate',
                    width: '200'
                },
                {
                    label: '贷款结清日期',
                    prop: 'loanClearDate',
                    width: '200'
                },



                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '120',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: '更新',
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    },
    created() {
        lenderList().then((res) => {
            this.lenderOptions = res.data;
        });
        this._getProducts()
        this.changeFilter()
    },
    methods: {
        _changeLender(val) {
            this.tableData = []
            this.lenderId = val == '全部' ? '' : val
            this._getProducts(val == '全部' ? '' : val)
            this.changeFilter()
        },
        _getProducts(val) {
            getProducts(val || '').then(res => {
                this.productsOptions = res.data
            })
        },
        _changeTime(val) {
            this.dates = val
            console.log(val);
            this.changeFilter()
        },
        _changeProducts(val) {
            this.currentPage = 1
            this.productsId = val
            this.changeFilter()
        },
        _export() {
            let fileName = '保证金明细'
            this.isExporting = true
            let that = this
            const axios = require('axios');
            let params = {
                lenderId: this.lenderId,
                loanApplyDateBegin: this.dates[0],
                loanApplyDateEnd: this.dates[1] ? this.dates[1].replace(/00:00:00/, '23:59:59') : "",
                lenderProductId: this.productsId,
                loanStatus: 'CLEAR'
            }
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/loan/export/guarantee/fee/info`,
                params: params,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                var blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = `${fileName}.xlsx`;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                that.isExporting = false;

            })
                .catch(error => {
                    that.isExporting = false;
                })

        },
        changeFilter(val) {
            this.currentPage = val ? val : this.currentPage
            let params = {
                current: this.currentPage,
                lenderId: this.lenderId,
                loanApplyDateBegin: this.dates[0],
                loanApplyDateEnd: this.dates[1] ? this.dates[1].replace(/00:00:00/, '23:59:59') : "",
                lenderProductId: this.productsId,
                loanStatus: 'CLEAR'
            }
            guaranteeInfo(params).then((res) => {
                res.data.records.forEach(element => {
                    this.statusList.forEach(item => {
                        if (element.loanStatus = item.value) {
                            element.loanStatus = item.label
                        }
                    })
                })
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        _getList() {

        },

    }
};
</script>

<style>
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