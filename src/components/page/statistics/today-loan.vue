<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{
                        $t('common_dsb')
                    }}
                /
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
                                    <span class="grid-num">{{ $t('loan_search_tjzdk') }}</span>
                                    <span class="grid-num2">{{ loanAmountSum.toLocaleString() }}{{ $t('common_wy')
                                        }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_tjbs') }}</span>
                                    <span class="grid-num2">{{ loanNumberSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <table-page @onExport="onExport" :tableData="tableData" :showFilterRadio="true"
            @goApplicationDetail="_goApplicationDetail" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" :applicationStatus="applicationStatus"
            @changeStatus="changeStatus" @page-change="handlePageChange" :filterStatus="filterStatus"
            :detailTable="true" />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import moment from 'moment'; //导入文件
import tablePage from '../../common/tablePage.vue';
import { getLoanList, uploadFile, getCalculate } from '../../../api/ddb';
import { lenderList, statSum, newOrder, getProducts, providerSelect, getTodayLoan } from '../../../api/index';
export default {
    name: 'today-loan',
    components: {
        tablePage
    },
    data() {
        return {
            loanAmountSum: 0,
            loanNumberSum: 0,
            currentPage: 1, //页码
            totalSize: 0, //数据总条数
            tableData: [],
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
            rules: {
                bName: [{ required: true, message: '请填写借款人姓名', trigger: 'blur' }],
                bPhoneNumber: [{ required: true, message: '请填写借款人手机号', trigger: 'blur' }],
                bcName: [{ required: true, message: '请填写借款人公司名', trigger: 'blur' }],
                bcLegalperson: [{ required: true, message: '请填写公司法人', trigger: 'blur' }],
                bcCreditcode: [{ required: true, message: '请填写统一社会信用代码', trigger: 'blur' }],
                lenderId: [{ required: true, message: '请选择资金方', trigger: 'change' }],
                lenderProductId: [{ required: true, message: '请选择产品', trigger: 'change' }],
                paymentCode: [{ required: true, message: '请选择支付公司', trigger: 'change' }],
                applicationTime: [{ required: true, message: '请选择申请时间', trigger: 'change' }]
            },
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
                paymentCode: ''
            },
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            dialogFormVisible: false,

            tableOperate: [],

            payCompany: [],
            applicationStatus: '',
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_dkbh'),
                    filterable: true,
                    options: []
                },

                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('loan_search_zjf'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('loan_search_cpmc'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_jkrxm'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: [this.$t('loan_search_sqkssj'), this.$t('loan_search_sqjssj')],
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: [this.$t('loan_search_fkkssj'), this.$t('loan_search_fkjssj')],
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户ID',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    color: '#fe1964',
                    width: 230,
                    cellEdit: 'click',
                    clickEvent: true
                },
                {
                    label: '用户ID',
                    prop: 'userId'
                },
                {
                    label: this.$t('loan_search_zjf'),
                    prop: 'lenderName'
                },
                {
                    label: this.$t('loan_search_cpmc'),
                    prop: 'productName',
                    width: '150'
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname'
                },
                {
                    label: this.$t('loan_search_je'),
                    prop: 'loanAmount'
                },

                {
                    label: this.$t('loan_search_dkzt'),
                    prop: 'loanStatus'
                },
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'createTime',
                    width: 175
                },
                {
                    label: this.$t('loan_search_fksj'),
                    prop: 'loanStartDate',
                    width: 175
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '150',
                    operates: [
                        {
                            event: 'goApplicationDetail',
                            text: this.$t('common_see'),
                            type: 'primary'
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
        if (this.$route.query.isToday) {
            this.filterOptions[5].value[0] = this.getCurentTime(false);
            this.filterOptions[5].value[1] = this.getCurentTime(false);
        }
        if (this.$route.query.isTomonth) {
            this.filterOptions[5].value[0] = moment(new Date()).startOf('month').format('YYYY-MM-DD');
            this.filterOptions[5].value[1] = moment().format('YYYY-MM-DD');
        }
        this._getList();
        getProducts('').then((res) => {
            res.data.forEach((item) => {
                (item.value = item.id), (item.label = item.productName);
            });
            this.filterOptions[2].options = res.data;
        });

        providerSelect().then((res) => {
            this.payCompany = res.data;
        });
        statSum().then((res) => {
            this.offerCount = res.data.offerCount;
        });
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[1].options = res.data;
        });
    },
    methods: {
        _goApplicationDetail(row) {
            console.log('asdasdasdasdasd');
            if (!row.applicationCode) {
                return this.$message.warning('无申请单编号');
            }
            if (row.lenderProduct == 85) {
                getLoanList({
                    current: 1,
                    size: 10,
                    loanCode: row.loanCode
                }).then((res) => {
                    this.$router.push({
                        path: '/ddb-orderInfo',
                        query: {
                            loanCode: res.data.records[0].loanCode,
                            lenderProductId: res.data.records[0].lenderProductId,
                            loanPeriod: res.data.records[0].loanPeriod,
                            loanAmount: res.data.records[0].loanAmount,
                            createTime: res.data.records[0].createTime,
                            loanStatus: res.data.records[0].loanStatus,
                            loanStartDate: res.data.records[0].loanStartDate,
                            userId: res.data.records[0].userId,
                            extUserId: res.data.records[0].extUserId,
                            bname: res.data.records[0].bname,
                            paymentNo: res.data.records[0].paymentNo
                        }
                    });
                });
            } else {
                this.$router.push({
                    path: '/unified-applicationDetail',
                    query: {
                        id: row.applicationId,
                        loanNumber: row.applicationCode,
                        creditAmount: Number(row.creditAmount / 10000).toFixed(2),
                        applicationStatus: row.applicationStatus,
                        lenderId: row.lenderId,
                        userId: row.userId,
                    }
                });
            }
        },
        getCurentTime(isTime = true) {
            var now = new Date();
            var clock = '';
            var year = now.getFullYear(); // 年
            clock += year + '-';
            var month = now.getMonth() + 1; // 月
            if (month < 10) {
                clock += '0';
            }
            clock += month + '-';
            var day = now.getDate(); // 日
            if (day < 10) {
                clock += '0';
            }
            if (isTime == true) {
                clock += day + ' ';
                var hh = now.getHours(); // 时
                if (hh < 10) {
                    clock += '0';
                }

                clock += hh + ':';
                var mm = now.getMinutes(); // 分
                if (mm < 10) {
                    clock += '0';
                }
                clock += mm + ':';
                var ss = now.getSeconds(); // 秒
                if (ss < 10) {
                    clock += '0';
                }
                clock += ss;
            }
            if (isTime == false) {
                clock += day;
            }
            return clock;
        },
        resetForm() {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = '';
            });
            this.productsList = [];
        },
        onExport() {
            let that = this;

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: this.filterOptions[4].value.length
                    ? `${this.baseUrl}/lending/application/export?applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[1].value}&bPhoneNumber=${this.filterOptions[2].value}&lenderId=${this.filterOptions[3].value}&applicationTimeStart=${this.filterOptions[4].value[0]}&applicationTimeEnd=${this.filterOptions[4].value[1]}&userId=${this.filterOptions[6].value}`
                    : `${this.baseUrl}/lending/application/export?applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[1].value}&bPhoneNumber=${this.filterOptions[2].value}&lenderId=${this.filterOptions[3].value}&userId=${this.filterOptions[6].value}`,
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
        changeLender(val) {
            getProducts(val).then((res) => {
                this.productsList = res.data;
                this.form.lenderProductId = '';
            });
        },
        // 创建申请单
        _newOrder() {
            console.log(this.form);
            this.form.lenderId = this.form.lenderId.toString() ? Number(this.form.lenderId) : '';
            this.form.lenderProductId = this.form.lenderProductId.toString() ? Number(this.form.lenderProductId) : '';
            let formD = new FormData();
            Object.keys(this.form).forEach((key) => {
                formD.append(key, this.form[key]);
            });

            this.$refs.form.validate((valid) => {
                if (valid) {
                    newOrder(formD).then((res) => {
                        this.dialogFormVisible = false;
                        this.$message.success('提交成功');
                        this._getList();
                        Object.keys(this.form).forEach((key) => {
                            this.form[key] = '';
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        // 图片上传
        handleAvatarSuccess1(res, file) {
            this.form.bCardFrontPath = res.data.fullFilePath;
        },
        // 图片上传
        handleAvatarSuccess2(res, file) {
            this.form.bCardBackPath = res.data.fullFilePath;
        },
        changeStatus(val) {
            this.applicationStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        _getList() {
            let starTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[0] + ' 00:00:00' : '';
            let endTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[1] + ' 23:59:59' : '';
            let starTime2 = this.filterOptions[5].value.length ? this.filterOptions[5].value[0] + ' 00:00:00' : '';
            let endTime2 = this.filterOptions[5].value.length ? this.filterOptions[5].value[1] + ' 23:59:59' : '';
            getTodayLoan({
                loanCode: this.filterOptions[0].value,
                loanStatus: this.applicationStatus,
                lenderId: this.filterOptions[1].value,
                lenderProductId: this.filterOptions[2].value,
                bName: this.filterOptions[3].value,
                current: this.currentPage,
                size: 10,
                loanApplyDateBegin: starTime,
                loanApplyDateEnd: endTime,
                loanStartDateBegin: starTime2,
                loanStartDateEnd: endTime2,
                userId: this.filterOptions[6].value
            }).then((res) => {
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        // 转状态
                        item.applicationStatus = status.indexOf(item.applicationStatus).toString()
                            ? statusStr[status.indexOf(item.applicationStatus)]
                            : '';
                        var appCode = item.applicationCode;
                        var appPreCode = appCode.substr(0, 2);
                        var currency = '¥';
                        if (appPreCode === 'US') {
                            currency = '$';
                        }

                        item.loanAmount = currency + item.loanAmount;

                    });
                }
                this.loanAmountSum = (res.data.currentLoanAmountSum / 10000).toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum || 0;
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },
        handleConditionalQuery() {
            this._getListFirstPage();
        },
        //重置
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                item.value = '';
            });
            this._getListFirstPage();
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage = 1;

            this._getList();
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList();
        },
        //     formatJson(filterVal, jsonData) {
        //       return jsonData.map(v => filterVal.map(j => {
        //         return v[j]
        //       }))
        //     },
        _getListFirstPage() {
            this.currentPage = 1;

            this._getList();
        },
        toDetail(val) {
            this.$router.push({
                path: '/minecraft-detail',
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

<style lang="less" scoped>
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
    border: 1px dashed #ced1d5;
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
