<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">

        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange" />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getLoanIncome } from '../../../api/index';
export default {

    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '借据编号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'date',
                    value: '',
                    placeholder: '结算日期',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: '借据编号',
                    prop: 'loanCode',
                    width: 160
                },
                {
                    label: '资方名称',
                    prop: 'lenderName',
                    width: 160
                },

                {
                    label: '产品名称',
                    prop: 'lenderProductName',
                },

                {
                    label: '结算日期',
                    prop: 'dayDate',
                    width: 160
                },
                {
                    label: '融资金额(元)',
                    prop: 'amount',
                    width: 120
                },

                {
                    label: '币种',
                    prop: 'currency',
                },
                {
                    label: '贷款开始日期',
                    prop: 'loanStartTime',
                    width: 160
                },
                {
                    label: '贷款结束日期',
                    prop: 'loanEndTime',
                    width: 160

                },
                {
                    label: '年利率',
                    prop: 'apr'
                },

                {
                    label: '期限',
                    prop: 'term',
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentType',
                },
                {
                    label: '所属销售',
                    prop: 'saleName',
                },

                {
                    label: '利息收入(元)',
                    prop: 'income',
                    width: 120
                },

                {
                    label: '豆服会员收入(元)',
                    prop: 'costMember',
                    width: 120
                },

                {
                    label: '销售提成(元)',
                    prop: 'costEmployee',
                    width: 120
                },
                {
                    label: '渠道佣金(元)',
                    prop: 'costChannel',
                    width: 120
                },
                {
                    label: '支付成本(元)',
                    prop: 'costPayment',
                    width: 120
                },
                {
                    label: '平台成本(元)',
                    prop: 'costPlatform',
                    width: 120
                },
                {
                    label: '资金成本(元)',
                    prop: 'costOfCapital',
                    width: 120
                },
                {
                    label: '分润成本(元)',
                    prop: 'costShareProfit',
                    width: 120
                },
                {
                    label: '担保成本(元)',
                    prop: 'costGuarantee',
                    width: 120
                },
                {
                    label: '风险成本(元)',
                    prop: 'costRisk',
                    width: 120
                },


            ],
            miI: 1
        };
    },
    created() {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        this.filterOptions[1].value = yesterday.toISOString().slice(0, 10);
        this._getList()
    },

    methods: {
        _getList() {
            getLoanIncome({
                current: this.currentPage,
                size: 10,
                loanCode: this.filterOptions[0].value,
                dayDate: this.filterOptions[1].value ? this.filterOptions[1].value : "",

            }).then(res => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            })
        }
    }
}
</script>