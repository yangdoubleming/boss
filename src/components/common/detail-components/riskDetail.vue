<template>
    <div style="margin-top: 24px; padding-bottom: 24px">
        <div>
            <div class="table-title">历史审批记录:</div>
            <table-page :showPagination="false" :tableData="tableData" :columns="columnsList"></table-page>
        </div>

        <div>
            <div class="table-title">历史逾期记录:</div>
            <table-page :showPagination="false" :tableData="tableDataOverdue"
                :columns="columnsOverdueList"></table-page>
        </div>
    </div>
</template>
<script>
import tablePage from '../../common/tablePage.vue';
import { tableMixin } from '../../../utils/mixin';
import { historyList, historyOverdueList } from '../../../api/ksb';
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            totalSize: 2,
            nowCreditCode: this.$route.query.creditCode,
            nowapplicationCode: this.$route.query.loanNumber,
            tableData: [],
            tableDataOverdue: [],
            columnsList: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '220'
                },
                {
                    label: '审批编号',
                    prop: 'creditApproveCode',
                    width: '220'
                },

                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },
                {
                    label: '产品名称',
                    prop: 'lenderName',
                    width: '200'
                },
                {
                    label: '已授信额度',
                    prop: 'creditAmountTotal',
                    width: '150'
                },
                {
                    label: '待审批额度',
                    prop: 'creditAmountBefore',
                    width: '150'
                },

                {
                    label: '实际审批额度',
                    prop: 'creditAmountActual',
                    width: '150'
                },
                {
                    label: '币种',
                    prop: 'currency',
                    width: '150'
                },

                {
                    label: '审批状态',
                    prop: 'approveStatus',
                    width: '150'
                },
                {
                    label: '审批人',
                    prop: 'approveMan',
                    width: '150'
                },

                {
                    label: '审批时间',
                    prop: 'approveTime',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_sqsj'),
                    prop: 'createTime',
                    width: '220'
                }
            ],
            columnsOverdueList: [
                {
                    label: '申请单',
                    prop: 'applicationCode'
                },
                {
                    label: '贷款单',
                    prop: 'loanCode'
                },
                {
                    label: '期数',
                    prop: 'currentTerm'
                },
                {
                    label: '逾期总金额',
                    prop: 'totalAmount'
                },
                {
                    label: '逾期本金',
                    prop: 'overduePrincipal'
                },

                {
                    label: '逾期利息',
                    prop: 'oweInterestAmount'
                },
                {
                    label: '逾期日期',
                    prop: 'tranDate'
                }
            ]
        };
    },
    methods: {
        _getList() {
            //历史审批记录
            historyList({ creditCode: this.nowCreditCode }).then((res) => {
                if (res.code == 200) {
                    res.data.forEach((item) => {
                        if (item.approveStatus == 'PENDING') {
                            item.approveStatus = '待处理';
                        } else if (item.approveStatus == 'PROCESSED') {
                            item.approveStatus = '已处理';
                        }
                        item.creditAmountTotal = Number(item.creditAmountTotal).toFixed(2) + '万';
                        item.creditAmountBefore = Number(item.creditAmountBefore).toFixed(2) + '万';
                        item.creditAmountActual = Number(item.creditAmountActual).toFixed(2) + '万';
                    });
                    this.tableData = res.data;
                }
            });
            //历史逾期记录
            historyOverdueList({ applicationCode: this.nowapplicationCode }).then((res) => {
                if (res.code == 200) {
                    res.data.forEach((item) => {
                        item.totalAmount = item.totalAmount + '元';
                        item.oweInterestAmount = item.oweInterestAmount + '元';
                        item.overduePrincipal = item.overduePrincipal + '元';
                    });
                    this.tableDataOverdue = res.data;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.table-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #999;
    margin-left: 10px;
}
</style>
