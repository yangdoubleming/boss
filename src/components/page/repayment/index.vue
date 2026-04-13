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
            <el-button style="float:right" type="primary" icon="el-icon-document-copy" @click="_add">还款确认</el-button>
        </div>
        <div style="padding-top:30px;background:#fff">
            <table-page :showFilterRadio="false" :tableData="tableData" :tableOperate="tableOperate"
                :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
                @conditional-query="handleColumnsFilter" :current="currentPage"
                @conditional-reset="handleConditionalReset" @quote="searchEvent" @page-change="handlePageChange"
                :shuaxin="true" @refreshAll="refresh" @needReturned="_diff" @onExport="onExport"
                :isExportin="isExporting" />
        </div>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { account, balance, pfrepayment, diff } from '../../../api/repayment';
export default {
    name: 'repayment',
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
                    placeholder: '用户名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: this.$t('loan_search_zhucephone'),
                    prop: 'account',
                    width: 150
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'borrowerName',
                    width: 180
                },
                {
                    label: this.$t('loan_search_jkrsjh'),
                    prop: 'borrowerPhone',
                    width: 150
                },

                {
                    label: '本期应还金额/元',
                    prop: 'repaymentAmount',
                    width: 150
                },
                {
                    label: '用户余额/元',
                    prop: 'accountBalance'
                },

                {
                    label: '逾期金额/元',
                    prop: 'overdueAmount'
                },

                {
                    label: '待充值金额/元',
                    prop: 'difference',
                    cellEdit: 'repayment',
                    width: 130
                },
                {
                    label: '还款总金额/元',
                    prop: 'repaymentAmountSum',
                    width: 130
                },
                {
                    label: '应还日期',
                    prop: 'repaymentDate'
                },
                {
                    label: '最后查询时间',
                    prop: 'lastQueryTime',
                    width: '150'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'quote',
                            text: '更新',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            isExporting: false,
            baseUrl: process.env.VUE_APP_BASE_URL
        };
    },
    created() { },
    methods: {
        onExport() {
            console.log('qwewqe');
            this.isExporting = true;
            let that = this;

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/pfrepayment/export`,
                // url: `http://boss.dowsure.com/v3/api/lending/pfrepayment/export`,
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
                    downloadElement.download = `待还款.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    that.isExporting = false;
                });
        },
        refresh() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            });

            pfrepayment().then((res) => {
                this._getList();
                setTimeout(() => {
                    loading.close();
                }, 1000);
            });
        },
        _diff() {
            diff().then((res) => {
                if (res.data.records && res.data.records.length) {
                    res.data.records.forEach((item) => {
                        item.colorStyle = Number(item.difference) > 0 ? true : false;
                    });
                }
                this.tableData = res.data.records;
                this.totalSize = 0;
            });
        },
        _getList() {
            account(this.filterOptions[0].value, this.filterOptions[1].value, this.currentPage).then((res) => {
                //如果差额是正数  字体颜色改红色
                if (res.data.records && res.data.records.length) {
                    res.data.records.forEach((item) => {
                        item.colorStyle = Number(item.difference) > 0 ? true : false;
                    });
                }
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        searchEvent(val, index) {
            // 更新余额接口  直接用返回数据替换掉老数据
            balance(val.userId).then((res) => {
                //    console.log(res);
                res.data.colorStyle = Number(res.data.difference) > 0 ? true : false;
                res.data.userId = val.userId;
                let obj = this.tableData[index];
                obj.repaymentAmountSum = res.data.repaymentAmountSum;
                obj.repaymentAmount = res.data.repaymentAmount;
                obj.overdueAmount = res.data.overdueAmount;
                obj.lastQueryTime = res.data.lastQueryTime;
                obj.difference = res.data.difference;
                obj.accountBalance = res.data.accountBalance;
                obj.repaymentDate = res.data.repaymentDate;
                this.tableData.splice(index, 1, obj);

                this.$notify({
                    title: '提示',
                    message: '更新余额成功！',
                    type: 'success'
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
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