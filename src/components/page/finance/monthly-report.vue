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
            <table-page :detailTable="true" :lenderOptions="lenderOptions" @export="_export"
                @changeLender="_changeLender" :isExporting="isExporting" :isExport="true" :showFilterRadio="false"
                :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions" :columns="columns"
                :totalSize="totalSize" @page-change="changeFilter" :current="currentPage" @refreshRedis="refreshRedis"
                :isRefresh="isRefresh" @quote="openLoanList" />
        </div>
        <el-dialog title="结清贷款单" :visible.sync="dialogVisible" width="85%">
            <div v-if="loanData.length" style="margin-bottom:10px">
                <el-button :loading="isExporting3" type="primary" @click="exportRepaymentHistoty"
                    style="display:inline-block;float:right;margin-bottom:10px"
                    icon="el-icon-printer">导出还款记录</el-button>
                <el-button :loading="isExporting2" type="primary" @click="onExport"
                    style="display:inline-block;float:right;margin: 0 20px;" icon="el-icon-printer">导出结清贷款单</el-button>
            </div>
            <xtable :columns="columns2" :detailTable="true" @edit='quote' :tableData="loanData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="还款记录" :visible.sync="dialogVisible3" width="76%">

            <xtable :columns="columns3" :detailTable="true" :tableData="recordData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xtable from '../../common/Xtable.vue';
import tablePage from '../../common/tablePage.vue';
import { summaryPage, lenderList, exportApi, monthlyRedis, refreshRedis, getMonthLoan, exportMonthLoan, recordList } from '../../../api/index';
export default {
    name: 'monthly-report',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            dialogVisible3: false,
            historyData: '',
            isExporting: false,
            dialogVisible: false,
            lenderOptions: [],
            isExporting2: false,
            tableOperate: [],
            tableData: [],
            loanData: [],
            isExporting3: false,
            columns2: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '160'
                },
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: '160'
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: '160'
                },
                {
                    label: '用户名称',
                    prop: 'realName'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '100'
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '160'
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
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_dbfl'),
                    prop: 'guarantorFeeRate',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_dkedw'),
                    prop: 'loanAmount',
                    width: '110'
                },

                {
                    label: this.$t('loan_detail_dkzysqrq'),
                    prop: 'loanApplyDate',
                    width: '160'
                },
                {
                    label: this.$t('loan_detail_dkzyksrq'),
                    prop: 'loanStartDate',
                    width: '160'
                },
                {
                    label: this.$t('loan_detail_dkzyjsrq'),
                    prop: 'loanEndDate',
                    width: '160'
                },

                {
                    label: this.$t('loan_detail_zqy'),
                    prop: 'loanPeriod'
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '160'
                },

                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '160'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_fkjl'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            filterOptions: [
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '用户名',
                //     filterable: true,
                //     options: []
                // },
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: this.$t('loan_serch_phone'),
                //     filterable: true,
                //     options: []
                // }
            ],
            selectRow: {},
            isRefresh: false,
            columns3: [
                {
                    label: '借据号',
                    prop: 'duebillNo',
                    width: '170'
                },
                {
                    label: '交易金额',
                    prop: 'dealAmount'
                },
                {
                    label: '当前还款期数',
                    prop: 'currentTerm',
                    width: '120'
                },

                {
                    label: '交易日期',
                    prop: 'dealDate'
                },

                {
                    label: '还息金额',
                    prop: 'paymentInterest'
                },

                {
                    label: '还逾期利息金额',
                    prop: 'paymentOverdueInterest',
                    width: 120
                },
                {
                    label: '还逾期本金金额',
                    prop: 'paymentOverduePrincipal',
                    width: 120
                },
                {
                    label: '还本金额',
                    prop: 'paymentPrincipal'
                },
                {
                    label: '流水号',
                    prop: 'serialNo'
                },
                {
                    label: '剩余待还本金金额',
                    prop: 'surplusPrincipal',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '160'
                }
            ],
            lenderId: '',
            recordData: [],
            baseUrl: process.env.VUE_APP_BASE_URL,
            columns: [
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },
                {
                    label: '当月授信笔数',
                    prop: 'creditCount',
                    width: 140
                },
                {
                    label: '当月授信额度/元',
                    prop: 'creditAmount',
                    width: 150
                },
                {
                    label: '当月放款/元',
                    prop: 'loanAmount',
                    width: '130'
                },
                {
                    label: '支用率/%',
                    prop: 'loanRate',
                    width: 130
                },

                {
                    label: '当月正常还款',
                    prop: 'repaymentAmount',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_htxy'),
                    prop: 'guarantorFee',
                    width: 160
                },

                {
                    label: '当月正常还息/元',
                    prop: 'interest',
                    width: 150
                },

                {
                    label: '逾期还款/元',
                    prop: 'overdueRepayment',
                    width: 130
                },
                {
                    label: '逾期还息/元',
                    prop: 'overdueInterest',
                    width: 130
                },
                {
                    label: '当月还本/元',
                    prop: 'repaymentPrincipal',
                    width: 130
                },
                {
                    label: '当月还息/元',
                    prop: 'repaymentInterest',
                    width: 130
                },
                {
                    label: '当月还款本息/元',
                    prop: 'repaymentSum',
                    width: 150
                },
                {
                    label: '放款笔数',
                    prop: 'loanCount',
                    width: 130
                },
                {
                    label: '还款笔数',
                    prop: 'repaymentCount',
                    width: 130
                },
                {
                    label: '当月余额变化/元',
                    prop: 'changesBalance',
                    width: 160
                },
                {
                    label: '月底在贷余额/元',
                    prop: 'loanBalance',
                    width: 160
                },
                {
                    label: ' 当月结清笔数',
                    prop: 'settleCount',
                    width: 140
                },
                {
                    label: ' 在贷客户数',
                    prop: 'loanUserCount',
                    width: 150
                },
                {
                    label: ' 在贷笔数',
                    prop: 'currentLoanCount',
                    width: 150
                },


                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'quote',
                            text: '结清列表',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() {
        lenderList().then((res) => {
            this.lenderOptions = res.data;
        });
    },
    methods: {
        exportRepaymentHistoty() {
            let arr = []
            this.loanData.forEach(item => {
                arr.push(item.loanCode)
            })
            this.isExporting3 = true
            let that = this;
            let fileName = '';
            this.lenderOptions.forEach((item) => {
                if (item.id == this.lenderId) {
                    fileName = item.lenderName;
                }
            });
            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/repayment/record/export/loan/code?loanCodeList=${arr}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `${fileName}还款记录.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);

                    that.isExporting3 = false;
                })
                .catch((error) => {
                    this.$message.info('暂无数据')
                    that.isExporting3 = false;
                });

        },
        quote(text, row) {
            recordList(row.loanCode).then(res => {
                this.dialogVisible3 = true
                this.recordData = res.data.repaymentRecordVoList
            })
        },
        onExport() {
            this.isExporting2 = true
            let that = this;
            let fileName = '';
            this.lenderOptions.forEach((item) => {
                if (item.id == this.lenderId) {
                    fileName = item.lenderName;
                }
            });
            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/loan/export/lender?beginDate=${this.setDate(this.selectRow.createTime.split('-'))[0] + ' 23:59:59'}&endDate=${this.setDate(this.selectRow.createTime.split('-'))[1] + ' 23:59:59'}&lenderId=${this.lenderId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
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

                    that.isExporting2 = false;
                })
                .catch((error) => {
                    this.$message.info('暂无数据')
                    that.isExporting2 = false;
                });
        },
        openLoanList(row) {
            this.selectRow = row
            getMonthLoan(this.setDate(row.createTime.split('-'))[0] + ' 00:00:00', this.setDate(row.createTime.split('-'))[1] + ' 23:59:59', this.lenderId).then(res => {
                this.dialogVisible = true
                this.loanData = res.data
            })
        },
        setDate(date) {
            let curDate = new Date();
            let y = date[0]
            let m = date[1] //本身就得+1才等于当前月份，然而我要计算下一个月，所以直接+2
            if (m > 12) {
                m = 1;
                y++;
            }
            let monthLastDay = new Date(y, m, 0).getDate();
            let arr = []
            arr[0] = y + '-' + m + '-' + '01';
            arr[1] = y + '-' + m + '-' + (monthLastDay < 10 ? '0' + monthLastDay : monthLastDay);
            return arr
        },
        refreshRedis() {
            if (!this.lenderId.toString()) {
                this.$message.info('请先选择资金方');
                return;
            }
            this.isRefresh = true;
            if (this.lenderId.toString() && this.lenderId != 9) {
                refreshRedis(this.lenderId).then((res) => {
                    this._changeLender(this.lenderId);
                    this.isRefresh = false;
                    this.$message.success('刷新成功！');
                });
            }
            this.isRefresh = false;
        },
        _changeLender(val) {
            this.currentPage = 1;
            this.lenderId = val;
            if (val == 9) {
                this.changeFilter();
            } else {
                monthlyRedis(val).then((res) => {
                    res.data.records.forEach(item => {
                        // item.creditAmount=(item.creditAmount/10000).toFixed(2)
                        // item.loanAmount=(item.loanAmount/10000).toFixed(2)
                        item.loanRate = (item.loanRate * 100).toFixed(3)
                    })
                    this.tableData = res.data.records;
                    this.totalSize = 0;
                });
            }
        },
        _export() {
            if (!this.lenderId) {
                this.$message.info('请先选择资金方');
                return;
            }
            let that = this;
            let fileName = '';
            this.lenderOptions.forEach((item) => {
                if (item.id == this.lenderId) {
                    fileName = item.lenderName;
                }
            });

            this.isExporting = true;
            const axios = require('axios');
            console.log(window.location);
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/monthly/summary/export?lenderId=${this.lenderId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
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
                .catch((error) => {
                    console.log(error.data);
                });

            // window.open(`http://114.116.249.242:9050/lending/monthly/summary/export?lenderId=${this.lenderId}`);
        },
        changeFilter(val) {
            this.currentPage = val ? val : this.currentPage;
            summaryPage(this.currentPage, this.lenderId).then((res) => {
                res.data.records.forEach(item => {
                    // item.creditAmount=(item.creditAmount/10000).toFixed(2)
                    // item.loanAmount=(item.loanAmount/10000).toFixed(2)
                    item.loanRate = (item.loanRate * 100).toFixed(3)
                })
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        _getList() { }
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