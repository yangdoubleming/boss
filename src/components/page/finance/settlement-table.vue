<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px"></div>
        <table-page :exportBtn='true' :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @onExport='_onExport' />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { lenderList, loanPage } from '../../../api/index';
export default {
    name: 'settlement-table',
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
                    type: 'select',
                    value: '',
                    placeholder: this.$t('home_zjffb'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholder: '',
                    filterable: true,
                    options: []
                }
            ],
            exportDate: [],
            columns: [

                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: '220'
                },


                {
                    label: '资方名称',
                    prop: 'lenderName',
                    width: '220'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_htxy'),
                    prop: 'guarantorFee',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_dbfl'),
                    prop: 'guarantorFeeRate',
                    width: '140'
                },


                {
                    label: '贷款额度/万元',
                    prop: 'loanAmount',
                    width: '150'
                },
                {
                    label: this.$t('loan_detail_dkzysqrq'),
                    prop: 'loanApplyDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_dkzyksrq'),
                    prop: 'loanStartDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '200'
                },

                {
                    label: '存款账户',
                    prop: 'depositAccount',
                    width: 140
                },


                {
                    label: this.$t('loan_detail_dkzyjsrq'),
                    prop: 'loanEndDate',
                    width: '200'
                },

                {
                    label: this.$t('loan_detail_zq'),
                    prop: 'loanPeriod'
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
            ]
        };
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[0].options = res.data;
        });
    },
    methods: {
        _onExport() {
            this.$export(`/loan/export/clear?loanStatus=CLEAR&loanClearDateBegin=${this.exportDate[0]}&loanClearDateEnd=${this.exportDate[1]}&lenderId=${this.filterOptions[0].value}`)
        },
        _getList() {


            let star = this.filterOptions[1].value && this.filterOptions[1].value.length ? this.filterOptions[1].value[0] + ' 00:00:00' : ''
            let end = this.filterOptions[1].value && this.filterOptions[1].value.length ? this.filterOptions[1].value[1] + ' 23:59:59' : ''

            this.exportDate = [star, end]
            loanPage(this.currentPage, '', '', '', '', this.filterOptions[0].value, 'CLEAR', star, end, '').then((res) => {
                this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum;
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
                res.data.records.forEach((item) => {
                    item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                    item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
                    item.loanPeriod = item.loanPeriod += item.periodUnit == 'Y' ? '年' : item.periodUnit == 'M' ? '月' : item.periodUnit == 'D' ? '日' : ''
                    item.guarantorFeeRate = (item.guarantorFeeRate * 100).toFixed(2)
                });

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/activity-detail',
                query: {
                    id: val.id || ''
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