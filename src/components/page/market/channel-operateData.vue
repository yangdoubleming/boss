<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 市场管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">渠道商运营数据</span>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-form ref="ruleForm" :model="ruleForm" label-width="120px"
                style="padding: 20px; background-color: #fff; margin: 0 12px 0 12px">
                <el-row style="display: flex">
                    <el-form-item label="统计日期" class="timeC">
                        <el-date-picker v-model="dateTime" type="monthrange" range-separator="-"
                            start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="渠道名/码">
                        <el-input v-model="ruleForm.channelCode"></el-input>
                    </el-form-item>
                    <div class="actionButton">
                        <el-button type="primary" @click="searchCase" style="margin-left: 12px">搜索</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-button type="primary" @click="exportExcel">导出excel</el-button>
                    </div>
                </el-row>
            </el-form>
        </el-row>
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div class="title">
                <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">市场渠道运营数据列表</div>
                <div style="font-size: 14px; color: #666">
                    订单数：
                    <span style="padding-right:20px">{{ totaolData.totalOrderNum }}</span>
                    保费：
                    <span style="padding-right:20px">{{ totaolData.totalAmount }}{{ $t('common_yuan2') }}</span>
                    返佣金额：
                    <span>{{ totaolData.totalCommission }}</span> 元
                </div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData" v-loading="loading"
                    element-loading-text="加载中，请稍后" style="width: 100%; font-size: 14px">
                    <el-table-column prop="channelName" label="渠道名" align="center" width="160px"></el-table-column>
                    <el-table-column prop="channelCode" label="渠道码" align="center" width="80px"></el-table-column>
                    <el-table-column prop="orderNum" label="订单数" align="center" width="150px"></el-table-column>
                    <el-table-column prop="amount" label="保费(元)" align="center"></el-table-column>
                    <el-table-column prop="rate" label="佣金比例" align="center"></el-table-column>
                    <el-table-column prop="commission" label="佣金收益(元)" align="center"></el-table-column>
                    <el-table-column prop="claimsNum" label="理赔订单数" align="center"></el-table-column>
                    <el-table-column prop="claimsAmount" label="理赔金额(元)" align="center"></el-table-column>
                </el-table>
                <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-size="pageSize"
                    :page-sizes="[10, 20, 50]" @current-change="currentChange" @size-change="handleSizeChange"
                    style="text-align: right; margin: 40px 20px" :current-page.sync="currentPage"
                    v-if="total > 0"></el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { channelCommissionList, platformList, getInsurancelList, getTotal, listOperator } from '@/api/insur';
import tablePage from '../../common/tablePage.vue';
import { Message } from 'element-ui';
import moment from 'moment'; //导入文件
// const uploadUrl = 'http://114.116.249.242:9050';
const state = [
    { id: 2, dictValue: '待审核', label: 'underwriting' },
    { id: 3, dictValue: '待付款', label: 'unpaid' },
    { id: 4, dictValue: '已付款', label: 'paid' },
    { id: 5, dictValue: '已生效', label: 'effective' },
    { id: 6, dictValue: '已过期', label: 'expired' },
    { id: 7, dictValue: '拒保', label: 'reject' },
    { id: 8, dictValue: '退保', label: 'surrender' },
    { id: 9, dictValue: '订单取消', label: 'cancel' }
];

export default {
    name: 'insurance',
    components: {
        tablePage
    },
    data() {
        return {
            totaolData: {},
            options: [],
            ruleForm: {
                platform: '',
                insuranceName: '',
                channelCode: '',
                orderNo: '',
                rewardRulesId: '',
                payStartTime: '',
                payEndTime: '',
                orderStartTime: '',
                orderEndTime: '',
                current: 1,
                size: 10
            },
            sumData: {},
            dateTime: [],
            payTime: [],
            giveTime: [],
            state,
            tableData: [],
            total: 0,
            pageSize: 10,
            policyAmout: 0, // 总保费
            dialogVisible: false,
            rules: {
                upload: [{ type: 'date', required: true, message: '请选择文件', trigger: 'change' }]
            },
            loadData: {
                file: ''
            },
            uploadUrl: '',
            errorInsure: false,
            errorMsg: [],
            fileList: [],
            headers: {
                token: ''
            },
            baseUrl: process.env.VUE_APP_CHANNEL,
            disabled: false,
            multipleSelection: [],
            loading: false,
            ids: [],
            currentPage: 1,
            disabledDown: false
        };
    },
    created() {
        console.log();
        this.dateTime = [this.getDay(0), this.getDay(0)];

        platformList().then(res => {
            this.options = res.data.records;
        });
        this.uploadUrl = this.baseUrl + '/insurance/excel';
        this.headers.token = localStorage.getItem('token');
        this.getDataList(this.ruleForm);
    },
    methods: {
        getDay(day) {
            var today = new Date();
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = this.doHandleMonth(tMonth + 1);
            tDate = this.doHandleMonth(tDate);
            return tYear + '-' + tMonth;
            // return tYear + '-' + tMonth + '-' + tDate;
        },
        doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = '0' + month;
            }
            return m;
        },
        goUrl(url) {
            window.open(url);
        },
        getLastDay(year, month) {
            var lastDate = new Date(year, month, 0).getDate(); //获取当月最后一日
            month = month < 10 ? '0' + month : month; //月份补 0
            return [year, Number(month), lastDate].join('-');
        },

        getNowFormatDate() {
            var date = new Date();
            var seperator1 = '';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getRowKey(row) {
            return row.orderNo;
        },
        setLoading() {
            this.loading = false;
            console.log(this.multipleSelection.length);
        },

        searchCase() {
            this.multipleSelection = [];
            this.ruleForm.payStartTime = this.dateTime[0] || '';
            this.ruleForm.payEndTime = this.dateTime[1] || '';

            this.ruleForm.current = 1;
            this.total = 0;
            this.getDataList(this.ruleForm);
        },
        // 重置
        reset() {
            Object.keys(this.ruleForm).forEach(key => {
                this.ruleForm[key] = '';
            });
            this.ruleForm.size = 10;
            this.ruleForm.current = 1;
            this.dateTime = [];
            this.giveTime = [];

            this.getDataList(this.ruleForm);
        },
        getDataList(paramer) {
            let obj = JSON.parse(JSON.stringify(paramer));
            obj.payStartTime = obj.payStartTime + '-01';
            obj.payEndTime = this.getLastDay(obj.payEndTime.split('-')[0], obj.payEndTime.split('-')[1]);
            getTotal(obj).then(res => {
                this.policyAmout = res.data;
            });
            listOperator(obj).then(res => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.totaolData = res.data;
                    this.tableData = res.data.records;
                    this.total = res.data.total;

                    res.data.records.forEach(i => {
                        i.moneyInterestRate = Number(i.moneyInterestRate) * 100 + '%';
                        i.rewardRulesId = i.rewardRulesId == 1 ? '正常返佣' : i.rewardRulesId == 2 ? '补充返佣' : '扣除返佣';
                    });
                } else {
                    this.$message.error(res.msg);
                }
                //回显
                this.multipleSelection.forEach(val => {
                    this.tableData.forEach(row => {
                        if (row.orderNo == val.orderNo) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                });
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        //修改页数
        handleSizeChange(size) {
            this.ruleForm.size = size;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList(this.ruleForm);
        },
        handleView(scope) {
            // console.log(scope);
            if (scope.comanyName === '史带') {
                this.$router.push({
                    path: '/insurance-detail-starr',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            } else if (scope.comanyName === '人保') {
                this.$router.push({
                    path: '/insurance-detail-pn',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            } else {
                this.$router.push({
                    path: '/insurance-detail-pn',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            }
        },

        // 导出excel
        exportExcel() {
            this.ruleForm.payStartTime = this.dateTime[0] || '';
            this.ruleForm.payEndTime = this.dateTime[1] || '';
            let obj = JSON.parse(JSON.stringify(this.ruleForm));
            obj.payStartTime = obj.payStartTime + '-01';
            obj.payEndTime = this.getLastDay(obj.payEndTime.split('-')[0], obj.payEndTime.split('-')[1]);
            const axios = require('axios');
            let that = this;
            axios({
                method: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/channel-market/report/listOperator/checkExcel?channelCode=${obj.channelCode}&payStartTime=${obj.payStartTime}&payEndTime=${obj.payEndTime}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;

                    if (that.ruleForm.placeTime && that.ruleForm.placeEnd) {
                        downloadElement.download = `${that.ruleForm.placeTime}-${that.ruleForm.placeEnd}责任险订单.xlsx`;
                    } else {
                        downloadElement.download = `责任险订单.xlsx`;
                    }
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }

    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }

    .el-select {
        width: 100%;
    }

    .product {
        a {
            padding: 6px 10px;
            border: 1px solid #ccc;
            font-size: 12px;
        }

        a:nth-child(2) {
            border-left: none;
        }

        a:nth-child(3) {
            padding: 6px 22px;
            border-left: none;
        }

        .addclass {
            background-color: #fff;
            color: #e71d5d;
            border: 1px solid #e71d5d;
        }
    }

    /deep/.el-range__close-icon {
        display: none;
    }

    .actionButton {
        .el-button {
            width: 105px;
            margin-right: 20px;
        }

        .el-button:nth-child(2) {
            border: 1px solid #e71d5d;
            color: #e71d5d;
        }
    }

    .el-row {
        margin-bottom: 10px;
    }

    /deep/.el-form-item__label {
        padding: 0 5px 0 0;
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    .title {
        display: flex;
        justify-content: space-between;
    }

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        // td:nth-child(1) {
        //     .cell {
        //         color: #fe1964;
        //     }
        // }
    }
}

.dialog {
    /deep/.el-dialog__header {
        padding: 30px 20px 10px;
        font-weight: 700;
    }

    /deep/.el-dialog__body {
        padding: 20px 35px 10px;
    }

    .down {
        color: #409eff;
        cursor: pointer;
    }

    .upload-demo {
        display: flex;

        /deep/.el-upload-list__item:first-child {
            margin-top: 5px;
        }

        /deep/.el-upload-list__item-name {
            color: #fe1964;
        }

        /deep/.el-icon-document {
            color: #fe1964;
        }
    }

    /deep/.el-upload--text {
        border: none;
        width: 90px;
        height: 35px;

        .el-button {
            padding: 5px 20px;
            color: #fe1964;
            background-color: #fff;
        }
    }

    /deep/.el-upload-list {
        overflow: hidden;
        margin-left: 10px;
    }

    .dialog-footer {
        padding: 0px 20px 35px;

        button {
            padding: 5px 30px;
        }
    }
}

.errorTip {
    .el-dialog__body {
        padding: 20px;

        .title {
            color: #000;
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 15px;

            /deep/.el-icon-circle-close {
                color: #b92626;
                font-size: 22px;
                font-weight: 700;
            }
        }
    }
}
</style>