<template>
    <div v-loading="loading">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <el-row style="margin-bottom: 0px;" :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">逾期客户数</span>
                                    <span class="grid-num2">{{ overdueUserCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">逾期贷款笔数</span>
                                    <span class="grid-num2">{{ overdueLoanCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总贷款金额</span>
                                    <span class="grid-num2">{{ loanAmountSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总逾期本金</span>
                                    <span class="grid-num2">{{ overduePrincipalSum }}{{ $t('common_yuan2') }} </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总逾期利息</span>
                                    <span class="grid-num2">{{ overdueInterestSum }}{{ $t('common_yuan2') }} </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总逾期金额</span>
                                    <span class="grid-num2">{{ overdueAmountSum }}{{ $t('common_yuan2') }} </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总在贷余额</span>
                                    <span class="grid-num2">{{ loanBalanceSum }}{{ $t('common_yuan2') }} </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <!-- 新增跟进记录 -->
        <el-dialog title="新增跟进记录" :visible.sync="dialogFollow" width="600px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="时间" prop="">
                    <el-date-picker v-model="ruleForm.followTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="跟进内容" prop="">
                    <el-input v-model="ruleForm.followContent" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFollow = false">取消</el-button>
                    <el-button type="primary" @click="_followRecords(ruleForm)">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- <div v-if="$showBtn('APPLICATION_EXPORTOVERDUE')" style="display: flex;flex-direction: row-reverse;
    margin-bottom: 10px;"> <el-button @click="onApplicationCodeExport" type="primary"
                :loading="isApplicationExporting">申请单导出</el-button>
        </div> -->
        <div style="  font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;">当前页面数据每小时更新一次, 由于部分线下和第三方资金方传递结果有问题，目前仅统计了部分线上产品逾期信息(浦发双锁, 浦发协议锁定, 跨商宝-美元, 跨商宝-通用版, 跨商宝-虾皮, 订单宝)
        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @cellChange='_getLenderList'
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @followRecords="_showRecords" @toLoanning="toLoanning"
            @onExport="beforeOnExport" :exportBtn="true" :isExporting="isExporting"
            @filter-item-cascader="changeCascader" />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getOverdueLoanVo, pageQueryOverdue, overdueNoteSave } from '../../../api/statistics';
import { lenderList, getProducts, managerAll } from '../../../api/index';
export default {
    name: 'overdue-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            loading: false,
            dialogFollow: false,
            tableOperate: [],
            tableData: [],
            loanAmountSum: 0,
            overduePrincipalSum: 0,
            overdueInterestSum: 0,
            overdueAmountSum: 0,
            loanBalanceSum: 0,
            overdueLoanCount: 0,
            overdueUserCount: 0,
            overdueNoteCount: 0,
            isExporting: false,
            isApplicationExporting: false,
            baseUrl: process.env.VUE_APP_BASE_URL,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户id',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '申请单号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '贷款单号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: "管户人",
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: this.$t('home_zjffb'),
                    filterable: true,
                    selectType: "lenderId"
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '产品名称',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '借款人姓名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_jkrsjh'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'datetimerange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: ['贷款时间开始', '贷款时间结束'],
                    options: []
                },
                {
                    type: 'datetimerange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: ['逾期时间开始', '逾期时间结束'],
                    options: []
                },
                {
                    type: 'cascader',
                    value: '',
                    placeholder: '排序',
                    clearable: true,
                    options: [
                        {
                            value: 'overdueDays',
                            label: '逾期天数',
                            children: [
                                {
                                    value: 'asc',
                                    label: '升序',
                                },
                                {
                                    value: 'desc',
                                    label: '降序',
                                },
                            ]
                        },
                        {
                            value: 'overdueDate',
                            label: '逾期时间',
                            children: [
                                {
                                    value: 'asc',
                                    label: '升序',
                                },
                                {
                                    value: 'desc',
                                    label: '降序',
                                },
                            ]
                        }
                    ]
                },
                {
                    type: 'select',
                    value: 'APPLICATION',
                    options: [],
                    placeholder: '维度',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '逾期阶段',
                    filterable: true
                },
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: 230,
                },
                {
                    label: '贷款单号',
                    prop: 'loanCode',
                    width: 220
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: 150
                },
                {
                    label: '产品名称',
                    prop: 'productName',
                    width: 210
                },
                {
                    label: '借款人名称',
                    prop: 'bname',
                    width: 200
                },

                {
                    label: this.$t('loan_search_jkrsjh'),
                    prop: 'bphoneNumber',
                    width: 150,
                },
                {
                    label: '贷款金额(万元)',
                    prop: 'loanAmount',
                    width: 150
                },

                {
                    label: '贷款开始时间',
                    prop: 'loanStartDate',
                    width: 150,
                },
                {
                    label: '逾期开始时间',
                    prop: 'overdueDateBegin',
                    width: 140,
                },
                {
                    label: '首次逾期日期',
                    prop: 'firstOverdue',
                    width: 140,
                },
                {
                    label: '当前逾期期数',
                    prop: 'nowCurrentTerm',
                    width: 140,
                },
                {
                    label: '逾期本金(万元)',
                    prop: 'overdueAmount',
                    width: '140'
                },

                {
                    label: '逾期利息(万元)',
                    prop: 'overdueInterest',
                    width: '140'
                },
                {
                    label: '剩余应还总金额(万元)',
                    prop: 'overdueAmountSum',
                    width: '140'
                },
                {
                    label: '在贷余额(万元)',
                    prop: 'loanBalance',
                    width: '140'
                },
                {
                    label: '已还本金(万元)',
                    prop: 'paymentPrincipal',
                    width: '140'
                },
                {
                    label: '已还利息(万元)',
                    prop: 'paymentInterest',
                    width: '140'
                },
                {
                    label: '逾期金额比例(%)',
                    prop: 'overdueRate',
                    width: '140'
                },
                {
                    label: '五级分类',
                    prop: 'fiveLevelClassification',
                    width: '140'
                },
                {
                    label: '最后一次还款日期',
                    prop: 'lastRepaymentDate',
                    width: 150
                },
                {
                    label: '逾期天数',
                    prop: 'overdueDays',
                    width: 120
                },
                {
                    label: '逾期阶段',
                    prop: 'overdueType',
                    width: 100,
                },
                {
                    label: '强制措施',
                    prop: 'coerciveMeasures',
                    width: 100,
                },

                {
                    label: '所属销售',
                    prop: 'sales',

                },
                {
                    label: '管户人',
                    prop: 'postLoanManager',

                },
                {
                    label: '跟进记录数',
                    prop: 'overdueNoteCount',
                    width: 140,
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'toLoanning',
                            text: this.$t('common_see'),
                            type: 'primary'
                        },
                        {
                            event: 'followRecords',
                            text: '跟进记录',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            ruleForm: {
                loanCode: '',
                followTime: '',
                followContent: ''
            },

        };
    },
    created() {
        this._getLenderList()
        this._getProducts()
        this._getmanagerAll()
    },
    methods: {
        //重置重写
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                item.value = '';
            });
            this.currentPage = 1;
            this._getList();
            this._getProducts()

        },
        changeRoleSearchSelect(val, prop) {
            if (prop.selectType) {
                getProducts(this.filterOptions[4].value).then((res) => {
                    res.data.forEach((item) => {
                        item.label = item.productName;
                        item.value = item.id;
                    });
                    this.filterOptions[5].options = res.data;
                });
            }
        },
        // 获取产品
        _getProducts(value) {
            getProducts('').then((res) => {
                res.data.forEach(item => {
                    item.value = item.id,
                        item.label = item.productName
                })
                this.filterOptions[5].options = res.data;
            });
        },
        // 获取资金方
        _getLenderList(value) {
            lenderList().then((res) => {
                res.data.forEach((item) => {
                    item.label = item.lenderName;
                    item.value = item.id;
                });
                this.filterOptions[4].options = res.data;
                this.filterOptions[11].options = [
                    {
                        label: '申请单维度',
                        value: 'APPLICATION'
                    },
                    {
                        label: '贷款单维度',
                        value: 'LOAN'
                    }
                ]
                this.filterOptions[12].options = [
                    {
                        label: 'M1',
                        value: 'M1'
                    },
                    {
                        label: 'M2',
                        value: 'M2'
                    },
                    {
                        label: 'M3',
                        value: 'M3'
                    },
                    {
                        label: 'M3+',
                        value: 'M4'
                    },
                ]
            });
        },
        //获取贷后经理
        _getmanagerAll() {
            managerAll().then((res) => {
                res.data.forEach((item) => {
                    item.label = item.name;
                    item.value = item.id;
                });
                this.filterOptions[3].options = res.data;
            });
        },
        // 获取列表
        _getList() {
            this._getOverdueSum();
            this.loading = true
            pageQueryOverdue({
                current: this.currentPage,
                size: 10,
                userId: this.filterOptions[0].value,
                applicationCode: this.filterOptions[1].value,
                loanCode: this.filterOptions[2].value,
                postLoanManagerId: this.filterOptions[3].value,
                lenderId: this.filterOptions[4].value,
                lenderProductId: this.filterOptions[5].value,
                bName: this.filterOptions[6].value,
                bPhoneNumber: this.filterOptions[7].value,
                loanApplyDateBegin: this.filterOptions[8].value[0] ? this.filterOptions[8].value[0] : '',
                loanApplyDateEnd: this.filterOptions[8].value[1] ? this.filterOptions[8].value[1].replace(/00:00:00/g, "23:59:59") : '',
                overdueDateBegin: this.filterOptions[9].value[0] ? this.filterOptions[9].value[0] : '',
                overdueDateEnd: this.filterOptions[9].value[1] ? this.filterOptions[9].value[1].replace(/00:00:00/g, "23:59:59") : '',
                sortField: this.filterOptions[10].value[0] ? this.filterOptions[10].value[0] : '',
                sortOrder: this.filterOptions[10].value[1] ? this.filterOptions[10].value[1] : '',
                applyType: this.filterOptions[11].value,
                overdueType: this.filterOptions[12].value,
            }).then((res) => {
                this.tableData = res.data.records.map(x => {
                    x.coerciveMeasures = x.coerciveMeasures ? x.coerciveMeasures : false;
                    switch (x.coerciveMeasures) {
                        case false:
                            x.coerciveMeasures = '关闭';
                            break;
                        case true:
                            x.coerciveMeasures = '开启';
                            break;
                    }
                    x.loanStartDate = x.loanStartDate ? x.loanStartDate.substring(0, 10) : "-"
                })

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
                
            });
        },

        // 获取列表
        _getOverdueSum() {
            this.loading = true
            getOverdueLoanVo({
                current: 1,
                size: 10,
                userId: this.filterOptions[0].value,
                applicationCode: this.filterOptions[1].value,
                loanCode: this.filterOptions[2].value,
                postLoanManagerId: this.filterOptions[3].value,
                lenderId: this.filterOptions[4].value,
                lenderProductId: this.filterOptions[5].value,
                bName: this.filterOptions[6].value,
                bPhoneNumber: this.filterOptions[7].value,
                loanApplyDateBegin: this.filterOptions[8].value[0] ? this.filterOptions[8].value[0] : '',
                loanApplyDateEnd: this.filterOptions[8].value[1] ? this.filterOptions[8].value[1].replace(/00:00:00/g, "23:59:59") : '',
                overdueDateBegin: this.filterOptions[9].value[0] ? this.filterOptions[9].value[0] : '',
                overdueDateEnd: this.filterOptions[9].value[1] ? this.filterOptions[9].value[1].replace(/00:00:00/g, "23:59:59") : '',
                sortField: this.filterOptions[10].value[0] ? this.filterOptions[10].value[0] : '',
                sortOrder: this.filterOptions[10].value[1] ? this.filterOptions[10].value[1] : '',
                applyType: this.filterOptions[11].value,
                overdueType: this.filterOptions[12].value,
            }).then((res) => {
                this.loanAmountSum = res.data.loanAmountSum
                this.overduePrincipalSum = res.data.overduePrincipalSum
                this.overdueInterestSum = res.data.overdueInterestSum
                this.overdueAmountSum = res.data.overdueAmountSum
                this.loanBalanceSum = res.data.loanBalanceSum
                this.overdueLoanCount = res.data.overdueLoanCount
                this.overdueUserCount = res.data.overdueUserCount
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })
                ;
        },
        //获取筛选框
        changeCascader(val, prop) {


        },

        toLoanning(val) {
            this.$router.push({
                path: '/overdue-info',
                query: {
                    loanCode: val.loanCode,
                    bname: val.bname,
                    bphoneNumber: val.bphoneNumber,
                    lenderId: val.lenderId
                }
            });
        },
        _showRecords(val) {
            this.ruleForm.loanCode = val.loanCode
            this.dialogFollow = true
        },
        _followRecords(val) {
            overdueNoteSave({
                loanCode: val.loanCode,
                followTime: val.followTime,
                followContent: val.followContent,
            }).then(res => {
                this.$message.success('操作成功')
                this.dialogFollow = false
                this._getList()
            })
        },
        beforeOnExport() {
            if (this.filterOptions[11].value == 'APPLICATION') {
                // 申请单导出
                this.onApplicationCodeExport()
            } else {
                // 贷款单导出
                this.onExport()
            }
        },
        // 贷款单导出
        onExport() {
            const loading = this.$loading({
                lock: true,
                text: '正在导出数据...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let that = this;
            let fileName = '逾期信息表';
            this.isExporting = true;
            const axios = require('axios');
            console.log(window.location);
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/loan/export/overdue`,
                params: {
                    userId: this.filterOptions[0].value,
                    applicationCode: this.filterOptions[1].value,
                    loanCode: this.filterOptions[2].value,
                    postLoanManagerId: this.filterOptions[3].value,
                    lenderId: this.filterOptions[4].value,
                    lenderProductId: this.filterOptions[5].value,
                    bName: this.filterOptions[6].value,
                    bPhoneNumber: this.filterOptions[7].value,
                    loanApplyDateBegin: this.filterOptions[8].value[0] ? this.filterOptions[8].value[0] : '',
                    loanApplyDateEnd: this.filterOptions[8].value[1] ? this.filterOptions[8].value[1].replace(/00:00:00/g, "23:59:59") : '',
                    overdueDateBegin: this.filterOptions[9].value[0] ? this.filterOptions[9].value[0] : '',
                    overdueDateEnd: this.filterOptions[9].value[1] ? this.filterOptions[9].value[1].replace(/00:00:00/g, "23:59:59") : '',
                    sortField: this.filterOptions[10].value[0] ? this.filterOptions[10].value[0] : '',
                    sortOrder: this.filterOptions[10].value[1] ? this.filterOptions[10].value[1] : '',
                    applyType: this.filterOptions[11].value,
                    overdueType: this.filterOptions[12].value,
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                loading.close();
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
            }).catch((error) => {
                console.log(error.data);
            });
        },
        // 导出
        onApplicationCodeExport() {
            const loading = this.$loading({
                lock: true,
                text: '正在导出数据...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let that = this;
            let fileName = '逾期信息表';
            this.isApplicationExporting = true;
            const axios = require('axios');
            console.log(window.location);
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/loan/export/overdue/user`,
                params: {
                    userId: this.filterOptions[0].value,
                    applicationCode: this.filterOptions[1].value,
                    loanCode: this.filterOptions[2].value,
                    postLoanManagerId: this.filterOptions[3].value,
                    lenderId: this.filterOptions[4].value,
                    lenderProductId: this.filterOptions[5].value,
                    bName: this.filterOptions[6].value,
                    bPhoneNumber: this.filterOptions[7].value,
                    loanApplyDateBegin: this.filterOptions[8].value[0] ? this.filterOptions[8].value[0] : '',
                    loanApplyDateEnd: this.filterOptions[8].value[1] ? this.filterOptions[8].value[1].replace(/00:00:00/g, "23:59:59") : '',
                    overdueDateBegin: this.filterOptions[9].value[0] ? this.filterOptions[9].value[0] : '',
                    overdueDateEnd: this.filterOptions[9].value[1] ? this.filterOptions[9].value[1].replace(/00:00:00/g, "23:59:59") : '',
                    sortField: this.filterOptions[10].value[0] ? this.filterOptions[10].value[0] : '',
                    sortOrder: this.filterOptions[10].value[1] ? this.filterOptions[10].value[1] : '',
                    applyType: this.filterOptions[11].value,
                    overdueType: this.filterOptions[12].value,
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                loading.close();
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
                that.isApplicationExporting = false;
            }).catch((error) => {
                console.log(error.data);
                that.isApplicationExporting = false;
            });
        }
    }
}
</script>
<style>
.el-upload--text {
    height: 34px;
    border: none;
    width: 110px;
}
</style>
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