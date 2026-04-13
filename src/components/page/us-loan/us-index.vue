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

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('loan_search_dklb')
                }}</span>
        </div>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_tjzdk') }}</span>
                                    <span class="grid-num2">{{ loanAmountSum }}{{ $t('common_wy') }}</span>
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

                    <el-col :span="12">
                        <div
                            style="display: flex; align-items: flex-end; height: 100px; width: 100%; justify-content: flex-end">
                            <el-button style="float: right" type="primary" icon="el-icon-document-copy"
                                @click="dialogFormVisible = true">{{
                                    $t('loan_add_new')
                                }}</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page @filter-item-change="changeRoleSearchSelect" @onExport="onExport" :tableData="tableData"
            :showFilterRadio="true" :tableOperate="tableOperate" :filterOptions="filterOptions" :columns="columns"
            :totalSize="totalSize" :detailTable="true" @quote="toDetail" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" :applicationStatus="applicationStatus"
            @changeStatus="changeStatus" @page-change="handlePageChange" :filterStatus="filterStatus"
            :exportBtn="true" />
        <!-- ====================================================新建申请单========================================================= -->
        <el-drawer size="62%" :title="$t('loan_detail_xjsq')" :visible.sync="dialogFormVisible" direction="rtl">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <div class="clearfix" style="margin-top: 30px">{{ $t('loan_detail_sqdxx') }}</div>
                <el-form-item label="注册手机号" style="margin-right: 30px" prop="account">
                    <el-input v-model="form.account" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="资金方" style="margin-right: 30px" prop="lenderId">
                    <el-select v-model="form.lenderId" :placeholder="$t('loan_detail_choose')">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in applyLender"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间" style="margin-right: 30px" prop="applicationTime">
                    <el-date-picker v-model="form.applicationTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.creditAmount" autocomplete="off" style="width: 200px">
                        <template slot="append">{{ $t('common_wy') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="申请主体类型" style="margin-right: 30px" prop="applicationType">
                    <el-select v-model="form.applicationType" :placeholder="$t('loan_detail_choose')">
                        <el-option label="个人" value="PERSONAL" />
                        <el-option label="企业" value="COMPANY" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" style="text-align: center; margin-top: 50px">
                <el-button @click="dialogFormVisible = false" style="">{{ $t('common_cancle') }}</el-button>
                <el-button type="primary" @click="_newOrder" icon="el-icon-document-checked" style="">{{
                    $t('common_submit')
                }}</el-button>
                <el-button type="info" @click="resetForm" style="" icon="el-icon-delete">{{ $t('home_cz') }}</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import BaseInfo from './baseInfo.vue';

import { minecraftList, getLenderList, lenderList, statSum, createApplicationUsd, getProducts, lenderNameList } from '../../../api/index';
export default {
    name: 'us-index',
    mixins: [tableMixin],
    components: {
        tablePage,
        BaseInfo
    },
    data() {
        return {
            applyLender: [],
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
                    label: this.$t('status_submitted'),
                    value: 'SUBMITTED'
                },
                {
                    label: this.$t('status_first'),
                    value: 'RECEIVED_1ST'
                },
                {
                    label: this.$t('status_sercond'),
                    value: 'RECEIVED_2ND'
                },
                {
                    label: this.$t('status_approved'),
                    value: 'APPROVED'
                },
                {
                    label: this.$t('status_rejected'),
                    value: 'REJECTED'
                },
                {
                    label: this.$t('status_issued'),
                    value: 'DISBURSED'
                },
                {
                    label: this.$t('status_abandoned'),
                    value: 'ABANDONED'
                },
                {
                    label: this.$t('status_closed'),
                    value: 'CLOSED'
                }
            ],
            rules: {
                account: [{ required: true, message: '请填写注册手机号', trigger: 'blur' }],
                lenderId: [{ required: true, message: '请选择贷款产品', trigger: 'blur' }],
                applicationTime: [{ required: true, message: '请填写申请时间', trigger: 'blur' }],
                creditAmount: [{ required: true, message: '请填写预授信金额', trigger: 'blur' }],
                applicationType: [{ required: true, message: '请填写申请主体类型', trigger: 'blur' }]
            },
            form: {
                account: '',
                lenderId: '',
                applicationType: '',
                applicationTime: '',
                creditAmount: '',
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

            loanAmountSum: '',
            loanNumberSum: '',
            applicationStatus: '',
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
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: "借款企业名称",
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
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: [this.$t('loan_search_sqkssj'), this.$t('loan_search_sqjssj')],
                    options: []
                },

            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    color: '#fe1964',
                    width: 230
                },
                {
                    label: this.$t('loan_detail_yhid'),
                    prop: 'userId',
                    color: '#fe1964',
                    width: 230
                },
                {
                    label: this.$t('loan_search_zhucename'),
                    prop: 'realName',
                    color: '#fe1964',
                    width: 160
                },
                {
                    label: this.$t('loan_search_zhucephone'),
                    prop: 'account',
                    color: '#fe1964',
                    width: '160'
                },
                {
                    label: "实控人姓名",
                    prop: 'actualController',
                    color: '#fe1964',
                    width: 180
                },
                {
                    label: this.$t('loan_search_jkrwymc'),
                    prop: 'bCompanyName',
                    color: '#fe1964',
                    width: 190
                },
                {
                    label: '大陆企业名称',
                    prop: 'mainlandBusinessName',
                    color: '#fe1964',
                    width: 190
                },
                {
                    label: this.$t('loan_search_jkrsjh'),
                    prop: 'bPhoneNumber',
                    color: '#fe1964',
                    width: 180
                },
                {
                    label: this.$t('loan_search_zfmc'),
                    prop: 'lenderName',
                    color: '#fe1964',
                    width: 180
                },
                {
                    label: this.$t('loan_search_shopcount'),
                    prop: 'bindShopCount',
                    width: '130'
                },
                {
                    label: this.$t('loan_search_saled'),
                    prop: 'bindShopGmv12m',
                    width: '140'
                },

                {
                    label: this.$t('loan_search_amount'),
                    prop: 'creditAmount',
                    width: '160'
                },
                {
                    label: this.$t('loan_search_loan'),
                    prop: 'loanBalance',
                    width: 120
                },
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'applicationTime',
                    width: 200
                },
                {
                    label: this.$t('loan_search_sxrq'),
                    prop: 'creditTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_status'),
                    prop: 'applicationStatus'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('common_see'),
                            type: 'primary',
                            code: 'US_LOOK_DETAIL'
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
        // getProducts(this.form.lenderId).then((res) => {
        //     this.productsList = res.data;
        // });
        statSum().then((res) => {
            this.offerCount = res.data.offerCount;
        });
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.applyLender = res.data;
        });
        lenderNameList({
            lenderType: '境外'
        }).then((res) => {
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
        // 接受ocr回显
        // getOcrObj(ocrObj) {
        //     this.creditForm = Object.assign(this.creditForm, ocrObj);
        // },
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
            this.$refs.baseInfo.resetForm();
        },
        onExport() {
            let that = this;

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: this.filterOptions[6].value.length
                    ? `${this.baseUrl}/lending/application/export?userId=${this.filterOptions[0].value}&applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[2].value}&bPhoneNumber=${this.filterOptions[3].value}&lenderId=${this.filterOptions[4].value}&applicationTimeStart=${this.filterOptions[6].value[0]}&applicationTimeEnd=${this.filterOptions[6].value[1]}`
                    : `${this.baseUrl}/lending/application/export?userId=${this.filterOptions[0].value}&applicationStatus=${this.applicationStatus}&bName=${this.filterOptions[2].value}&bPhoneNumber=${this.filterOptions[3].value}&lenderId=${this.filterOptions[4].value}`,
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
            this.form.lenderId = this.form.lenderId.toString() ? Number(this.form.lenderId) : '';
            let formD = new FormData();
            Object.keys(this.form).forEach((key) => {
                formD.append(key, this.form[key]);
            });

            this.$refs.form.validate((valid) => {
                if (valid) {
                    createApplicationUsd(formD).then((res) => {
                        this.$message.success('提交成功');
                        this.dialogFormVisible = false
                        this.resetForm();
                    });
                } else {
                    return false;
                }
            });
        },
        //信息上传完成后收尾
        finishUpload() {
            this.dialogFormVisible = false;
            this.$message.success('提交成功');
            this._getList();
            Object.keys(this.form).forEach((key) => {
                this.form[key] = '';
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
            let data = {
                current: this.currentPage,
                size: 10,
                applicationCode: this.filterOptions[1].value,
                bName: this.filterOptions[2].value,
                bPhoneNumber: this.filterOptions[3].value,
                // lenderId: this.filterOptions[4].value,
                lenderName: this.filterOptions[4].value,
                applicationStatus: this.applicationStatus,
                applicationTimeStart: this.filterOptions[6].value.length ? this.filterOptions[6].value[0] : '',
                applicationTimeEnd: this.filterOptions[6].value.length ? this.filterOptions[6].value[1] : '',
                userId: this.filterOptions[0].value,
                applicationOrderType: 'SELF_SUPPORT'
            };
            minecraftList(data).then((res) => {
                res.data.records.forEach((item) => {
                    // 转状态
                    item.applicationStatus = this.orderStatus.indexOf(item.applicationStatus).toString()
                        ? this.orderStatusStr[this.orderStatus.indexOf(item.applicationStatus)]
                        : '';
                });
                this.loanAmountSum = (res.data.currentLoanAmountSum / 10000).toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum;
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/us-detail',
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.productName,
                    creditAmount: val.creditAmount,
                    lenderId: val.lenderId,
                    applicationStatus: val.applicationStatus,
                    account: val.account,
                    userId: val.userId,
                    productId: val.productId
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
    border: none;
    height: auto !important;
}

/deep/ .el-button:hover {
    background-color: transparent !important;
    border-color: transparent !important;
}

/deep/ .el-upload--text .el-icon-upload {
    margin-left: 5px !important;
    width: 14px !important;
    height: 14px !important;
    font-size: 16px;
    margin: 0 !important;
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
