<template>
    <div style="position: relative;">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div class="us-payment-history-title">
            <span>交易金额：{{ dealAmount }}</span>
            <span>交易本金：{{ paymentPrincipal }}</span>
            <span>交易利息：{{ paymentInterest }}</span>
        </div>
        <table-page @filter-item-change='changeRoleSearchSelect' @onExport="onExport" :tableData="tableData" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :exportBtn="true" :detailTable="true" />

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { paymentHistory, recordList, lenderList, lenderNameList, getLenderList } from '../../../api/index';
import xtable from '../../common/Xtable.vue';
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
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: ['创建开始时间 ', '创建结束时间'],
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '资方',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '产品名称',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: 230
                },

                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: 230
                },
                {
                    label: '当前还款期数',
                    prop: 'currentTerm',
                    width: 130
                },

                {
                    label: '交易金额',
                    prop: 'dealAmount',
                    width: 160
                },
                {
                    label: '交易日期',
                    prop: 'dealDate',
                    width: 120
                },

                {
                    label: '借据号',
                    prop: 'duebillNo',
                    width: 165
                },
                {
                    label: '贷款单号',
                    prop: 'loanCode',
                    width: 230
                },

                {
                    label: '资方',
                    prop: 'lenderName',
                    width: 165
                },
                {
                    label: '产品',
                    prop: 'lenderProduct',
                    width: 165
                },

                {
                    label: '还息金额',
                    prop: 'paymentInterest',
                    width: 120
                },

                {
                    label: '还逾期利息金额',
                    prop: 'paymentOverdueInterest',
                    width: 140
                },
                {
                    label: '还逾期本金金额',
                    prop: 'paymentOverduePrincipal',
                    width: 140
                },
                {
                    label: '还本金额',
                    prop: 'paymentPrincipal',
                    width: 140
                },
                {
                    label: '流水号',
                    prop: 'serialNo',
                    width: 230
                },
                {
                    label: '剩余待还本金金额',
                    prop: 'surplusPrincipal',
                    width: 160
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '200'
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
            baseUrl: process.env.VUE_APP_BASE_URL,
            paymentPrincipal: '',
            paymentInterest: '',
            dealAmount: '',
        };
    },
    created() {
        lenderList().then(res => {
            res.data.forEach(item => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[2].options = res.data;
        });
        lenderNameList({
            lenderType: '境外'
        }).then(res => {
            let option = []
            res.data.forEach((item) => {
                let obj = {}
                obj.label = item;
                obj.value = item
                item = obj
                option.push(obj)
            });
            this.filterOptions[1].options = option;
        })
    },
    methods: {
        onExport() {
            let that = this;

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: this.filterOptions[0].value.length
                    ? `${this.baseUrl}/lending/repayment/record/export?lenderNameShort=${this.filterOptions[1].value}&lenderId=${this.filterOptions[2].value}&applicationOrderType=SELF_SUPPORT&createTimeBegin=${this.filterOptions[0].value[0]}&createTimeEnd=${this.filterOptions[0].value[1]}`
                    : `${this.baseUrl}/lending/repayment/record/export?lenderNameShort=${this.filterOptions[1].value}&lenderId=${this.filterOptions[2].value}&applicationOrderType=SELF_SUPPORT`,
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
                downloadElement.download = `report.xlsx`;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                that.isExporting = false;
            });
        },

        _getList() {
            let starTime = this.filterOptions[0].value.length ? this.filterOptions[0].value[0] : '';
            let endTime = this.filterOptions[0].value.length ? this.filterOptions[0].value[1] : '';
            paymentHistory({
                createTimeBegin: starTime,
                createTimeEnd: endTime,
                lenderId: this.filterOptions[2].value,
                lenderNameShort: this.filterOptions[1].value,
                applicationOrderType:'SELF_SUPPORT',
                size: 10,
                current: this.currentPage
            }).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
                this.paymentPrincipal = res.data.paymentPrincipal || '-'
                this.paymentInterest = res.data.paymentInterest || '-'
                this.dealAmount = res.data.dealAmount || '-'
            });
        },
        changeRoleSearchSelect(val) {
            if (typeof val != 'number') {
                getLenderList({ lenderNameShort: this.filterOptions[1].value }).then(res => {
                    res.data.forEach((item) => {
                        item.label = item.lenderName;
                        item.value = item.id;
                    });
                    this.filterOptions[2].options = res.data;
                })
            }
        },
    }
};
</script>

<style lang='less' scoped>
.us-payment-history-title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 140px;
    right: 15px;

    span {
        margin: 0 10px;
    }
}
</style>