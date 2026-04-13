<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">贷款列表</span>
        </div>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content-crm-list grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总贷款金额</span>
                                    <span class="grid-num2">￥：{{ currentLoanAmountSum }} 万元</span>
                                    <span class="grid-num2">$：{{ currentLoanAmountUSDSum }} 万元</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content-crm-list grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总贷款笔数</span>
                                    <span class="grid-num2">￥：{{ currentLoanNumberSum }}</span>
                                    <span class="grid-num2">$：{{ currentLoanNumberUSDSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content-crm-list grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总在贷金额</span>
                                    <span class="grid-num2">￥：{{ currentOnLoanAmountSum }} 万元</span>
                                    <span class="grid-num2">$：{{ currentOnLoanAmountUSDSum }} 万元</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content-crm-list grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总结清金额</span>
                                    <span class="grid-num2">￥：{{ currentClearAmountSum }} 万元</span>
                                    <span class="grid-num2">$：{{ currentClearAmountUSDSum }} 万元</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page @clickCell="clickCell" @onExport="onExport" @filter-item-change="changeRoleSearchSelect"
            :tableData="tableData" :showFilterRadio="true" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset"
            @changeStatus="changeStatus" @page-change="handlePageChange" :filterStatus="filterStatus"
            :exportBtn="false" />
        <!-- ====================================================客户文档========================================================= -->
        <el-dialog center title="客户报告" width="500px" :visible.sync="customDialog" :before-close="customCancel">
            <el-form ref="form" :model="customForm" label-width="80px">
                <el-form-item label="文档链接">
                    <el-input v-model="customForm.customerReport"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="customSubmit">确认</el-button>
                <el-button @click="customCancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    updateCustomer,
    crmLoanPageBySales,
    getLenderList,
    lenderList,
    lenderNameList,
    statSum,
    newOrder,
    getProducts,
    providerSelect
} from '../../../api/index';
export default {
    name: 'minecraft',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            customDialog: false,
            customForm: {},
            customerReportTxt: '查看报告',
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
            imageUrl: process.env.VUE_APP_IMGS_BASE_URL,
            loanAmountSum: '',
            loanNumberSum: '',
            onLoanAmountSum: '',
            loanStatus: '',
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '贷款编号',
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
                    placeholder: this.$t('loan_search_zf'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('loan_search_zfcp'),
                    filterable: true,
                    options: []
                },

                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: ['放款开始时间', '放款结束时间'],
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: '贷款编号',
                    prop: 'loanCode',
                    color: '#fe1964',
                    width: 230
                },

                {
                    label: '用户ID',
                    prop: 'userId',
                    color: '#fe1964',
                    width: 150
                },
                {
                    label: '资金方',
                    prop: 'lenderName',
                    color: '#fe1964',
                },
                {
                    label: '产品名称',
                    prop: 'productName',
                    color: '#fe1964',
                },
                {
                    label: '借款人姓名',
                    prop: 'bname',
                    color: '#fe1964',
                    width: 200
                },
                {
                    label: '手机号',
                    prop: 'bphoneNumber',
                    color: '#fe1964',
                    width: 200
                },
                {
                    label: '贷款金额/万',
                    prop: 'loanAmountM',
                    color: '#fe1964',
                    width: 120
                },
                {
                    label: '在贷金额/万',
                    prop: 'loanBalanceM',
                    color: '#fe1964',
                },
                {
                    label: '贷款状态',
                    prop: 'loanStatusTxt',
                    color: '#fe1964',
                    width: 100
                },
                {
                    label: '申请日期',
                    prop: 'loanApplyDate',
                    color: '#fe1964',
                    width: 160
                },
                {
                    label: '放款时间',
                    prop: 'loanStartDate',
                    width: 160
                },
                {
                    label: '贷款结束时间',
                    prop: 'loanEndDate',
                    width: 160
                },
                {
                    label: '贷款结清时间',
                    prop: 'loanClearDate',
                    width: 160
                },
            ],
            baseUrl: process.env.VUE_APP_BASE_URL,
            productsList: [],
            applyLender: [],
            currentLoanAmountSum: 0,
            currentLoanAmountUSDSum: 0,
            currentOnLoanAmountSum: 0,
            currentOnLoanAmountUSDSum: 0,
            currentLoanNumberSum: 0,
            currentLoanNumberUSDSum: 0,
            currentClearAmountSum: 0,
            currentClearAmountUSDSum: 0,
            statusTxt: {
                CREATED: '创建',
                DISBURSE_SUCESS: '放款成功',
                DISBURSE_FAILED: '放款失败',
                OVERDUE: '已逾期',
                REPAYMENT: '还款中',
                CLOSED: '已关闭',
                CREATED: '创建',
                DISBURSE_SUCESS: '放款成功',
                DISBURSE_FAILED: '放款失败',
                OVERDUE: '已逾期',
                REPAYMENT: '还款中',
                CLOSED: '已关闭',
                CLEAR:'已结清'
            }
        };
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.applyLender = res.data;
        });
        lenderNameList().then((res) => {
            let option = [];
            res.data.forEach((item) => {
                let obj = {};
                obj.label = item;
                obj.value = item;
                item = obj;
                option.push(obj);
            });
            this.filterOptions[4].options = option;
        });
    },
    methods: {
        customSubmit() {
            if (!this.customForm.customerReport) {
                this.$message.error('请上传客户报告');
                return;
            }
            updateCustomer(this.customForm).then((res) => {
                this.customDialog = false;
                this.$message.success('上传成功');
                this.customForm = {};
                this._getList();
            });
        },
        customCancel() {
            (this.customDialog = false), (this.customForm = {});
        },
        clickCell(row) {
            if (row.column.columnKey == '客户报告') {
                if (row.row.customerReport) {
                    window.open(row.row.customerReport, '_blank');
                } else {
                    this.customForm.id = row.row.id;
                    this.customDialog = true;
                }
            }
        },
        changeRoleSearchSelect(val) {
            if (typeof val != 'number') {
                getLenderList({ lenderNameShort: this.filterOptions[4].value }).then((res) => {
                    res.data.forEach((item) => {
                        item.label = item.lenderName;
                        item.value = item.id;
                    });
                    this.filterOptions[5].options = res.data;
                });
            }
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
                url: this.filterOptions[6].value.length
                    ? `${this.baseUrl}/lending/application/export?loanStatus=${this.loanStatus}&loanCode=${this.filterOptions[1].value}&bName=${this.filterOptions[2].value}&bPhoneNumber=${this.filterOptions[3].value}&lenderId=${this.filterOptions[5].value}&loanApplyDateBegin=${this.filterOptions[6].value[0]}&loanApplyDateEnd=${this.filterOptions[6].value[1]}`
                    : `${this.baseUrl}/lending/application/export?loanStatus=${this.loanStatus}&loanCode=${this.filterOptions[1].value}&bName=${this.filterOptions[2].value}&bPhoneNumber=${this.filterOptions[3].value}&lenderId=${this.filterOptions[5].value}`,
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
            this.form.bCardFrontPath = res.data.filePath;
        },
        // 图片上传
        handleAvatarSuccess2(res, file) {
            this.form.bCardBackPath = res.data.filePath;
        },
        changeStatus(val) {
            this.loanStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        _getList() {
            if (!/^\d+$/.test(this.filterOptions[0].value) && this.filterOptions[0].value !== '') {
                this.$message.error('用户ID必须为数字');
                return;
            }
            let data = {
                sysUserName: localStorage.getItem('userName'),
                current: this.currentPage,
                size: 10,
                userId: this.filterOptions[0].value,
                loanCode: this.filterOptions[1].value,
                bName: this.filterOptions[2].value,
                bPhoneNumber: this.filterOptions[3].value,
                lenderId: this.filterOptions[5].value,
                lenderName: this.filterOptions[4].value,
                loanStatus: this.loanStatus, 
                loanApplyDateBegin: this.filterOptions[6].value.length ? this.filterOptions[6].value[0]+ ' 00:00:00' : '',
                loanApplyDateEnd: this.filterOptions[6].value.length ? this.filterOptions[6].value[1]+ ' 00:00:00' : '',
            };
            crmLoanPageBySales(data).then((res) => {
                this.currentLoanAmountSum = (res.data.currentLoanAmountSum).toFixed(2);
                this.currentLoanAmountUSDSum = (res.data.currentLoanAmountUSDSum).toFixed(2);

                this.currentOnLoanAmountSum = (res.data.currentOnLoanAmountSum).toFixed(2);
                this.currentOnLoanAmountUSDSum = (res.data.currentOnLoanAmountUSDSum).toFixed(2);

                this.currentLoanNumberSum = res.data.currentLoanNumberSum
                this.currentLoanNumberUSDSum = res.data.currentLoanNumberUSDSum

                this.currentClearAmountSum = (res.data.currentClearAmountSum).toFixed(2);
                this.currentClearAmountUSDSum = (res.data.currentClearAmountUSDSum).toFixed(2);

                this.tableData = res.data.records || [];
                if (this.tableData.length > 0) {
                    this.tableData.forEach((item) => {
                        item.loanStatusTxt = item.loanStatus ? this.statusTxt[item.loanStatus] : '-'
                        if (item.currency == 'USD') {
                            item.loanAmountM = String(item.loanAmount) ? '$' + item.loanAmount : ''
                            item.loanBalanceM = String(item.loanBalance) ? '$' + item.loanBalance : ''
                        } else {
                            item.loanAmountM = String(item.loanAmount) ? '￥' + item.loanAmount : ''
                            item.loanBalanceM = String(item.loanBalance) ? '￥' + item.loanBalance : ''
                        }
                    })
                }
                this.totalSize = res.data.total || 0;
            });
        },
        showCustomerReport(val) {
            if (val.customerReport) {
                window.open(val.customerReport, '_blank');
            } else {
                this.$message.error('客户报告为空,请确认！');
            }
        },
        toDetail(val) {
            console.log(val);
            this.$router.push({
                path: '/loanUser-detail',
                query: {
                    userId: val.userId,
                    account: val.bPhoneNumber
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

.grid-content-crm-list {
    display: flex;
    padding: 24px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 6px;
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
