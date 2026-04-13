<template>
    <div class="dh">
        <div style='display: flex; align-items: center; padding: 18px'>
            <div style='color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center'>
                <img src='../../../../public/img/favicon.png' style='width: 17px; height: 17px; margin-right: 5px'
                    alt />豆沙包 /
            </div>

            <span style='color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px'>{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_zfkje') }}</span>
                                    <span class="grid-num2">{{ loanAmountSum }}万</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_zfkbs') }}</span>
                                    <span class="grid-num2">{{ loanNumberSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('home_zdye') }}</span>

                                    <span class="grid-num2">{{ onLoanAmountSum }}万</span>

                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <table-page :exportBtn='$showBtn("LOAN_EXPORT")' :detailTable='true' :tableData='tableData'
            :showFilterRadio='false' :tableOperate='tableOperate' :filterOptions='filterOptions' :columns='columns'
            :totalSize='totalSize' @conditional-query='handleColumnsFilter' :current='currentPage'
            @conditional-reset='handleConditionalReset' @page-change='handlePageChange' @update='update'
            @clearLoan='_clearLoan' @removeLoan='removeLoan' @changeStatus='changeStatus'
            @paymentHistory='_paymentHistory' @toOrderInfo='toOrderInfo' @confirmDisburse='_confirmDisburse'
            @rePayment='_rePayment' @onExport='onExport' :filterStatus="filterStatus" />

        <el-dialog title='结清' :visible.sync='dialogVisible2' width='14%' style='margin-top: 20vh'
            @closed='removeEndDate'>
            <el-date-picker v-model='endDate' type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='请选择结清日期'>
            </el-date-picker>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='dialogVisible2 = false'>取 消</el-button>
                <el-button type='primary' @click='_clearLoanF'>确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync='showExportVisible' width='30%' title='导出'>
            <el-date-picker :clearable='false' v-model='exportTime' type='daterange' range-separator='—'
                value-format='yyyy-MM-dd HH:mm:ss' start-placeholder='开始时间' end-placeholder='结束时间' />
            <span slot='footer' class='dialog-footer'>
                <el-button @click='showExportVisible = false'>取 消</el-button>
                <el-button type='primary' @click='exportLoan'>确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title='确认放款' :visible.sync='showDisburse' width='40%'>
            <el-form :inline='false' :model='form' ref='form' style='padding-left: 20px' label-width='150px'
                label-position='left'>
                <el-form-item label='贷款金额：' style='margin-right: 30px' prop='creditAmount'>
                    <span>{{ disburseForm.loanAmount }} </span>
                </el-form-item>
                <el-form-item label='收款人名称：' style='margin-right: 30px' prop='creditAmount'>
                    <span>{{ disburseForm.accountName }}</span>
                </el-form-item>
                <el-form-item label='收款人银行账户：' style='margin-right: 30px' prop='creditAmount'>
                    <span>{{ disburseForm.accountNo }}</span>
                </el-form-item>
                <el-form-item label='收款人开户行名称：' style='margin-right: 30px' prop='creditAmount'>
                    <span>{{ disburseForm.bankName }}</span>
                </el-form-item>
                <el-form-item label='收款人开户行地址：' style='margin-right: 30px' prop='creditAmount'>
                    <span>{{ disburseForm.bankArea === '大陆' ? disburseForm.bankBranchName : disburseForm.bankAddress
                        }}</span>
                </el-form-item>
                <el-form-item label='起息时间：' style='margin-right: 30px' prop='creditApprovalTime'>
                    <el-date-picker v-model='loanForm.disburseDate' type='datetime' value-format='yyyy-MM-dd HH:mm:ss'
                        placeholder='选择日期时间'></el-date-picker>
                </el-form-item>
                <el-form-item label='状态' style='margin-right: 30px' prop='creditStatus'>
                    <el-radio v-model='loanForm.loanStatus' label='REPAYMENT'>成功</el-radio>
                    <el-radio v-model='loanForm.loanStatus' label='DISBURSE_FAILED'>失败</el-radio>
                </el-form-item>
                <el-form-item label='放款凭证' style='margin-right: 30px' prop='dates'>
                    <div style='display: flex; align-items: center'>
                        <el-button style='margin-right: 15px' type='success' @click='openFile(payMentFile)'
                            v-if='payMentFile'>查看凭证
                        </el-button>

                        <el-upload style='margin-right: 30px; height: 32px; width: 110px; overflow: hidden'
                            :action='uploadUrl' :on-success='handlePreview' :show-file-list='false'>
                            <el-button size='small' type='primary' style='float: left'>点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>

            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='showDisburse = false'>取 消</el-button>
                <el-button type='primary' @click='_pushDisburse'>确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title='结清' :visible.sync='dialogVisible2' width='14%' style='margin-top: 20vh'
            @closed='removeEndDate'>
            <el-date-picker v-model='endDate' type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='请选择结清日期'>
            </el-date-picker>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='dialogVisible2 = fasle'>取 消</el-button>
                <el-button type='primary' @click='_clearLoanF'>确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title='贷款单信息' :visible.sync='dialogFormVisible' width='40%'>
            <el-form :inline='true' :model='form' ref='form' style='padding-left: 20px' label-width='150px'
                label-position='left'>
                <el-form-item label='贷款通过时间' style='margin-right: 30px' prop='creditApprovalTime'>
                    <el-date-picker v-model='form.loanApplyDate' type='datetime' value-format='yyyy-MM-dd HH:mm:ss'
                        placeholder='选择日期时间'></el-date-picker>
                </el-form-item>
                <el-form-item label='起止时间' style='margin-right: 30px' prop='dates'>
                    <el-date-picker v-model='dates' type='datetimerange' range-separator='至' start-placeholder='开始日期'
                        end-placeholder='结束日期' value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                </el-form-item>
                <el-form-item label='合同编号' style='margin-right: 30px' prop='creditAmount'>
                    <el-input v-model='form.contractNumber' autocomplete='off' style='width: 200px'></el-input>
                </el-form-item>
                <el-form-item label='期限' style='margin-right: 30px' prop='creditAmount'>
                    <el-input v-model='form.loanPeriod' autocomplete='off' style='width: 200px' type='number'>
                        <el-button slot='append' icon='el-icon-lx-lock'>月</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label='贷款金额' style='margin-right: 30px' prop='creditAmount'>
                    <el-input v-model='form.loanAmount' autocomplete='off' type='number' style='width: 200px'>
                        <el-button slot='append' icon='el-icon-lx-lock'>万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='利率' style='margin-right: 30px' prop='interestRate'>
                    <el-input v-model='form.apr' autocomplete='off' type='number' style='width: 200px'>
                        <el-button slot='append' icon='el-icon-lx-lock'>%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='担保费' style='margin-right: 30px' prop='interestRate'>
                    <el-input v-model='form.guarantorFee' type='number' autocomplete='off' style='width: 200px'>
                        <el-button slot='append' icon='el-icon-lx-lock'>元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='担保费率' style='margin-right: 30px' prop='interestRate'>
                    <el-input v-model='form.guarantorFeeRate' type='number' autocomplete='off' style='width: 200px'>
                        <el-button slot='append' icon='el-icon-lx-lock'>%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='贷款结清日期' style='margin-right: 30px' prop='creditApprovalTime'>
                    <el-date-picker v-model='form.loanClearDate' type='datetime' value-format='yyyy-MM-dd HH:mm:ss'
                        placeholder='选择日期时间'></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer' style='text-align: center'>
                <el-button @click='dialogFormVisible = false' style='width: 80px; height: 35px'>取 消</el-button>
                <el-button type='primary' @click='_loanUpdate' style='width: 80px; height: 35px'>确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title='还款记录' :visible.sync='dialogVisible3' width='85%'>
            <div style='margin-bottom: 10px'>
                <!-- <span>已还金额：{{dealAmountSum }}</span>
                <span style="padding-left:50px">待还本金：{{repaymentAmount}}</span>-->
            </div>
            <xtable :columns='columns3' :detailTable='true' :tableData='historyData' />
            <span slot='footer' class='dialog-footer'>
                <el-button @click='dialogVisible = false'>关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title='还款确认' :visible.sync='showRePayment' width='40%'>
            <el-form :inline='false' :model='form' ref='form' style='padding-left: 20px' label-width='150px'
                label-position='left'>
                <el-form-item label='还款类型：' style='margin-right: 30px' prop='creditAmount'>
                    <el-radio-group v-model='rePaymentData.type' @change='changeType'>
                        <el-radio :label='1'>提前还款</el-radio>
                        <el-radio :label='2'>到期还款</el-radio>
                        <el-radio :label='3'>逾期还款</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if='rePaymentData.type == 1'>
                    <el-form-item label='还款时间：' style='margin-right: 30px' prop='creditApprovalTime'>
                        <el-date-picker v-model='rePaymentData.loanEndDate' type='datetime'
                            value-format='yyyy-MM-dd HH:mm:ss' placeholder='选择日期时间' @change='changeDate'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label='还款金额：' style='margin-right: 30px' prop='creditAmount'>
                        <el-input v-model='rePaymentData.principal' type='number' style='width: 220px'></el-input>
                        <!-- <el-button type="primary" style="margin-left:5px" @click="_calculation">确认</el-button> -->
                    </el-form-item>
                    <el-form-item label='应还本金：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(chooseRow.loanAmount) }}</span>
                    </el-form-item>
                    <el-form-item label='应还利息：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.interest) }}</span>
                    </el-form-item>
                    <el-form-item label='提前还款费用：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.advance) }}</span>
                    </el-form-item>
                    <el-form-item label='应还总额：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{
                numFormat(
                    Number(
                        (
                            Number(chooseRow.loanAmount) +
                            Number(rePaymentData.interest) +
                            Number(rePaymentData.advance)
                        ).toFixed(2)
                    )
                )
            }}</span>
                    </el-form-item>
                </div>

                <div v-if='rePaymentData.type == 2'>
                    <el-form-item label='还款时间：' style='margin-right: 30px' prop='creditAmount'>
                        <span>{{ rePaymentData.loanEndDate }}</span>
                    </el-form-item>
                    <el-form-item label='应还本金：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.shouldPrincipal) }}</span>
                    </el-form-item>
                    <el-form-item label='应还利息：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.interest) }}</span>
                    </el-form-item>
                    <el-form-item label='应还总额：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.total) }}</span>
                    </el-form-item>
                    <el-form-item label='还款金额：' style='margin-right: 30px' prop='creditAmount'>
                        <el-input v-model='rePaymentData.principal' type='number' style='width: 220px'></el-input>
                        <el-button type='primary' style='margin-left: 5px' @click='_calculation'>确认</el-button>
                    </el-form-item>
                    <el-form-item label='实还本金：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualPrincipal > 0 ? rePaymentData.actualPrincipal : 0)
                            }}</span>
                    </el-form-item>
                    <el-form-item label='实还利息：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualInterest) }}</span>
                    </el-form-item>
                    <el-form-item label='实还总额：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualTotal) }}</span>
                    </el-form-item>
                </div>

                <div v-if='rePaymentData.type == 3'>
                    <el-form-item label='还款时间：' style='margin-right: 30px' prop='creditApprovalTime'>
                        <el-date-picker v-model='rePaymentData.loanEndDate' type='datetime'
                            value-format='yyyy-MM-dd HH:mm:ss' placeholder='选择日期时间'></el-date-picker>
                    </el-form-item>
                    <el-form-item label='还款金额：' style='margin-right: 30px' prop='creditAmount'>
                        <el-input v-model='rePaymentData.principal' type='number' style='width: 220px'></el-input>
                        <el-button type='primary' style='margin-left: 5px' @click='_calculation'>确认</el-button>
                    </el-form-item>
                    <el-form-item label='实还违约费用：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualViolate) }}</span>
                    </el-form-item>
                    <el-form-item label='实还逾期费用：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualOverdue) }}</span>
                    </el-form-item>
                    <el-form-item label='实还利息：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualInterest) }}</span>
                    </el-form-item>
                    <el-form-item label='实还本金：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualPrincipal) }}</span>
                    </el-form-item>

                    <el-form-item label='实还总额：' style='margin-right: 30px' prop='creditAmount'>
                        <span>${{ numFormat(rePaymentData.actualTotal) }}</span>
                    </el-form-item>
                </div>

                <el-form-item label='流水凭证' style='margin-right: 30px' prop='dates'>
                    <div style='display: flex; align-items: center'>
                        <el-button style='margin-right: 15px' type='success' @click='openFile(rePaymentFile)'
                            v-if='rePaymentFile'>查看凭证
                        </el-button>

                        <el-upload style='margin-right: 30px; height: 32px; width: 110px; overflow: hidden'
                            :action='uploadUrl' :on-success='handlePreview2' :show-file-list='false'>
                            <el-button size='small' type='primary' style='float: left'>点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='showRePayment = false'>取 消</el-button>
                <el-button type='primary' @click='_pushRepayment'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xform from '../../common/Xform.vue';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { repayment } from '../../../api/boss1';
import {
    disburseInfo,
    loanPage,
    clearLoan,
    loanUpdate,
    deleteLoan,
    lenderList,
    recordList,
    allotLoan,
    splitedCreateLoan,
    selectLoan,
    pushDisburse,
    saveFileUrl,
    usRepayment
} from '../../../api/index';
import {
    getBankForLoan,
    activateLoan,
    setLoanFile,
    getLoanFile,
    repaymentPlan,
    getLoanList,
    removeFile,
    exportLoan
} from '../../../api/dhfq';
import { number } from 'echarts';
// import axios from '_axios@0.18.1@axios';

export default {
    name: 'us-loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable,
        xform
    },
    data() {
        return {
            lenderProduct: '',
            fileId: '',
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            showRePayment: false,
            payMentFile: '',
            loanForm: {
                disburseDate: '',
                loanStatus: ''
            },
            showExportVisible: false,
            showDisburse: false,
            splitColumns: [
                {
                    label: 'offerId',
                    prop: 'offerId'
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue'
                },
                {
                    label: '授信额度/万',
                    prop: 'resourceAmount',
                    cellEdit: 'input'
                }
            ],
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
            loanAmount: '',
            loanSplit: false,
            dialogVisible3: false,
            columns3: [
                {
                    label: '借据号',
                    prop: 'duebillNo',
                    width: '170'
                },
                {
                    label: '交易金额',
                    prop: 'dealAmount'
                },
                {
                    label: '当前还款期数',
                    prop: 'currentTerm',
                    width: '120'
                },

                {
                    label: '交易日期',
                    prop: 'dealDate'
                },

                {
                    label: '还息金额',
                    prop: 'paymentInterest'
                },

                {
                    label: '还逾期利息金额',
                    prop: 'paymentOverdueInterest',
                    width: 120
                },
                {
                    label: '还逾期本金金额',
                    prop: 'paymentOverduePrincipal',
                    width: 120
                },
                {
                    label: '还本金额',
                    prop: 'paymentPrincipal'
                },
                {
                    label: '流水号',
                    prop: 'serialNo'
                },
                {
                    label: '剩余待还本金金额',
                    prop: 'surplusPrincipal',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '160'
                }
            ],
            historyData: [],
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
            loanAmountSum: '',
            loanNumberSum: '',

            onLoanAmountSum: "",

            dates: [],
            form: {
                id: '',
                loanPeriod: '',
                apr: '',
                loanApplyDate: '',
                loanStartDate: '',
                loanEndDate: '',
                loanAmount: '',
                guarantorFee: '',
                guarantorFeeRate: '',
                contractNumber: '',
                loanClearDate: ''
            },
            dialogFormVisible: false,
            dialogVisible: false,
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            tableOperate: [],
            tableData: [],
            rePaymentFile: '',
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_dkbh'),
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [{
                        label: "默放保理-跨易赊-天木物流",
                        value: 48
                    },
                    {
                        label: "默放保理-跨易赊",
                        value: 43
                    },
                    {
                        label: "默放保理-跨易赊-飞书",
                        value: 59
                    },],
                    placeholder: '产品名称',
                    filterable: true
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholderArr: [this.$t('loan_detail_zykssj'), this.$t('loan_detail_zyjssj')]
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholder: '贷款结束时间',
                    placeholderArr: [this.$t('loan_detail_dkjssjks'), this.$t('loan_detail_dkjssjjs')],
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_jkrmc'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_jkrsjh'),
                    filterable: true
                },

                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '状态',
                //     filterable: true,
                //     options: [
                //         {
                //              label: this.$t('status_create'),
                //             value: 'CREATED'
                //         },
                //         {
                //              label: this.$t('status_successful'),
                //             value: 'DISBURSE_SUCESS'
                //         },
                //         {
                //              label: this.$t('status_failed'),
                //             value: 'DISBURSE_FAILED'
                //         },
                //         {
                //             label: this.$t('status_past'),
                //             value: 'OVERDUE'
                //         },
                //         {
                //             label: this.$t('status_Repayment'),
                //             value: 'REPAYMENT'
                //         },
                //         {
                //              label: this.$t('status_closed'),
                //             value: 'CLOSED'
                //         },
                //     ]
                // },
                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '锁定',
                //     filterable: true,
                //     options: [
                //         {
                //             label: '未锁定',
                //             value: 'UNLOCK'
                //         },
                //         {
                //             label: '锁定',
                //             value: 'LOCK'
                //         },

                //     ]
                // }
            ],

            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: '190'
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: '90'
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: '160'
                },
                {
                    label: '产品名称',
                    prop: 'productName',
                    width: 180
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr',
                    width: '100'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },
                // {
                //     label: '存款账户',
                //     prop: 'depositAccount'
                // },
                // {
                //     label: '存款账户银行',
                //     prop: 'depositAccountBank',
                //     width: '120'
                // },

                // {
                //     label: '存款账户用户名',
                //     prop: 'depositAccountUsername',
                //     width: '120'
                // },
                {
                    label: this.$t('loan_detail_htxy'),
                    prop: 'guarantorFee',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_dbfl'),
                    prop: 'guarantorFeeRate',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_dkedw'),
                    prop: 'loanAmount',
                    width: '130'
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
                    label: this.$t('loan_detail_dkzyjsrq'),
                    prop: 'loanEndDate',
                    width: '200'
                },

                {
                    label: this.$t('loan_detail_zq'),
                    prop: 'loanPeriod'
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentMethod',
                    width: '260'
                },

                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '200'
                },



                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '100',
                //     operates: [
                //         // {
                //         //     event: 'quote',
                //         //     text:this.$t('loan_detail_hkjh'),
                //         //     type: 'success',
                //         //     popover:true,
                //         // },

                //         // {
                //         //     event: 'paymentHistory',
                //         //     text:this.$t('loan_detail_fkjl'),
                //         //     type: 'warning',
                //         //     popover:true,
                //         // },
                //         // {
                //         //     event: 'clearLoan',
                //         //     text:this.$t('status_table_cleared'),
                //         //     type: 'primary',
                //         //     popover:true,
                //         // },
                //         // {
                //         //     event: 'toOrderInfo',
                //         //     text: '贷款详情',
                //         //     type: 'primary',
                //         //     popover: true
                //         // },
                //         // {
                //         //     event: 'confirmDisburse',
                //         //     text:this.$t('loan_detail_qrfk'),
                //         //     type: 'primary',
                //         //     popover: true
                //         // }
                //         // {
                //         //     event: 'rePayment',
                //         //     text: '还款确认',
                //         //     type: 'primary',
                //         //     popover:true,
                //         // }

                //         // {
                //         //     event: 'update',
                //         //     text: this.$t('loan_detail_xg'),
                //         //     type: '',
                //         //     popover:true,
                //         // },

                //         // {
                //         //     event: 'removeLoan',
                //         //     text:this.$t('loan_detail_delete'),
                //         //     type: 'danger',
                //         //     popover:true,
                //         // }
                //     ],
                //     fixed: 'right'
                // }
            ],
            productsList: [],
            row: {},
            dialogVisible2: false,
            endDate: '',
            loanStatus: '',
            repaymentAmount: 0,
            dealAmountSum: 0,
            totalMoney: 0,
            chooseDatas: [],
            disburseForm: {},
            loanCode: '',
            chooseRow: {},
            rePaymentData: {
                type: 1,
                loanEndDate: '', //时间
                principal: '', //还款金额
                advance: 0, //提前还款费用
                total: 0, // 总额
                interest: 0, //利息
                actualPrincipal: 0, //实还本金
                actualInterest: 0, //实还利息
                actualTotal: 0, //实还总额
                actualViolate: 0, //实际违约费用
                actualOverdue: 0, //实际逾期费用
                shouldPrincipal: 0 //应还本金
            },
            exportTime: '',
            baseUrl: process.env.VUE_APP_CENTER_URL + '/dowsure-merchant/'
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
        onExport() {
            this.showExportVisible = true;
        },
        exportLoan() {
            let that = this;
            let data = {
                applicationStartTime: this.exportTime[0],
                applicationEndTime: this.exportTime[1],
                current: 1,
                size: 9999,
                lenderId: this.filterOptions[0].value,
                bPhoneNumber: this.filterOptions[1].value,
                bName: this.filterOptions[2].value,
                serviceType: this.filterOptions[3].value,
                loanStatus: this.filterOptions[4].value,
                approvedStatus: this.filterOptions[5].value,
                applicationOrderType: 'SELF_SUPPORT_DOUHUA'
            };
            let axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}dhBoss/serviceMerchant/loan/export`,
                params: data,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                let blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob);
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
        changeDate() {
            // type == 1  如果选择日期不是90天内 既不是提前还款*+
            let num = this.getDaysBetween(this.chooseRow.loanStartDate.split(' ')[0], this.rePaymentData.loanEndDate.split(' ')[0]);
            if (num < this.chooseRow.loanPeriod) {
                this.rePaymentData.interest = (
                    ((Number(this.chooseRow.loanAmount) * (this.chooseRow.apr / 100)) / 360) *
                    Number(num)
                ).toFixed(3);

                let str = this.rePaymentData.interest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.interest =
                    Number(n) > 0 ? Number(this.rePaymentData.interest) + 0.01 : this.rePaymentData.interest;
                this.rePaymentData.interest = Math.floor(Number(this.rePaymentData.interest) * 100) / 100;
                this.rePaymentData.advance = this.chooseRow.loanPeriod == 14 ? 0 : (this.chooseRow.loanAmount * 0.01).toFixed(2);
            } else {
                this.$message.info('选择日期不属于提前还款!');
                this.rePaymentData.loanEndDate = '';
                this.rePaymentData.advance = 0;
                this.rePaymentData.interest = 0;
            }
        },
        _pushRepayment() {
            if (!this.rePaymentFile) {
                return this.$message.info('请上传流水凭证！');
            }
            let date = this.rePaymentData.loanEndDate;
            if (this.rePaymentData.type == 2) {
                date += ' 00:00:00';
            }
            usRepayment({
                loanEndDate: date,
                loanAmount: this.rePaymentData.principal,
                loanCode: this.chooseRow.loanCode,
                repaymentType: this.chooseRow.loanPeriod == 14 ? 'ZHANGYU_LOAN' : 'MORFIN'
            }).then((res) => {
                saveFileUrl(this.chooseRow.loanCode, {
                    path: this.rePaymentFile
                }).then((res) => {
                    this.$message.success('操作成功！');
                    this.showRePayment = false;
                    this._getList();
                });
            });
        },
        _calculation() {
            if (this.rePaymentData.type == 1) {
                // this.rePaymentData.advance = (this.rePaymentData.principal * 0.01).toFixed(2);
                // this.rePaymentData.total = (Number(this.rePaymentData.advance) + Number(this.rePaymentData.principal)).toFixed(2);
                //  if (Number(this.rePaymentData.principal) > Number(this.rePaymentData.advance)) {
                //     this.rePaymentData.actualInterest = this.rePaymentData.interest;
                // } else {
                //     this.rePaymentData.actualInterest = this.rePaymentData.principal;
                // }
            } else if (this.rePaymentData.type == 2) {
                this.rePaymentData.actualPrincipal = this.rePaymentData.principal - this.rePaymentData.interest;
                if (Number(this.rePaymentData.principal) > Number(this.rePaymentData.interest)) {
                    this.rePaymentData.actualInterest = this.rePaymentData.interest;
                } else {
                    this.rePaymentData.actualInterest = this.rePaymentData.principal;
                }
                let str = this.rePaymentData.actualInterest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.actualInterest =
                    Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;
                this.rePaymentData.actualPrincipal = this.rePaymentData.actualPrincipal > 0 ? this.rePaymentData.actualPrincipal : 0;
                this.rePaymentData.actualTotal = (
                    Number(this.rePaymentData.actualInterest) + Number(this.rePaymentData.actualPrincipal)
                ).toFixed(2);
            } else if (this.rePaymentData.type == 3) {
                // if(this.chooseRow.lenderProductId=='48'){
                //     this.chooseRow.loanPeriod=30
                // }
                this.rePaymentData.actualViolate = 0;
                this.rePaymentData.actualOverdue = 0;
                this.rePaymentData.interest = 0;

                if (!this.rePaymentData.loanEndDate) return this.$message.info('请选择日期');
                // console.log('asd', this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod ),);
                // 违约天数
                let wd =
                    Number(
                        this.getDaysBetween(
                            this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                            this.rePaymentData.loanEndDate.split(' ')[0]
                        )
                    ) - 30;
                wd = wd > 0 ? wd : 0;

                // 逾期天数
                let d =
                    this.getDaysBetween(
                        this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                        this.rePaymentData.loanEndDate.split(' ')[0]
                    ) > 30
                        ? 30
                        : this.getDaysBetween(
                            this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                            this.rePaymentData.loanEndDate.split(' ')[0]
                        );

                let y = Number((this.chooseRow.loanAmount * 0.0002 * d).toFixed(2));
                let w = Number((this.chooseRow.loanAmount * 0.0004 * wd).toFixed(2));
                // let userD = this.getDaysBetween(
                //     this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod - 1),
                //     this.rePaymentData.loanEndDate.split(' ')[0]
                // );

                let l =
                    ((this.chooseRow.loanAmount * (this.chooseRow.apr / 100)) / 360) *
                    this.getDaysBetween(this.chooseRow.loanStartDate.split(' ')[0], this.rePaymentData.loanEndDate.split(' ')[0]);

                // console.log('l', l);
                // console.log(this.chooseRow.loanAmount);
                //核销违约费用
                if (Number(this.rePaymentData.principal) > Number(w)) {
                    this.rePaymentData.actualViolate = w.toFixed(2);
                    //核销逾期
                    if (Number(this.rePaymentData.principal) > Number(y) + Number(w)) {
                        this.rePaymentData.actualOverdue = y.toFixed(2);
                        // 核销利息
                        if (Number(this.rePaymentData.principal) > Number(y) + Number(w) + l) {
                            console.log(1);
                            this.rePaymentData.actualInterest = l.toFixed(3);
                            let str = this.rePaymentData.actualInterest.toString();
                            let n = str.substr(str.length - 1, 1);
                            this.rePaymentData.actualInterest =
                                Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                            this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;

                            // 核销本金
                            if (Number(this.rePaymentData.principal) > Number(y) + Number(w) + l + Number(this.chooseRow.loanAmount)) {
                                this.rePaymentData.actualPrincipal = Number(this.chooseRow.loanAmount).toFixed(2);
                            } else {
                                this.rePaymentData.actualPrincipal = (
                                    Number(this.rePaymentData.principal) -
                                    Number(w) -
                                    Number(y) -
                                    l
                                ).toFixed(2);
                            }
                        } else {
                            this.rePaymentData.actualInterest = (Number(this.rePaymentData.principal) - Number(w) - Number(y)).toFixed(3);
                            let str = this.rePaymentData.actualInterest.toString();
                            let n = str.substr(str.length - 1, 1);
                            this.rePaymentData.actualInterest =
                                Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                            this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;
                        }
                    } else {
                        this.rePaymentData.actualOverdue = (Number(this.rePaymentData.principal) - Number(w)).toFixed(2);
                    }
                } else {
                    this.rePaymentData.actualViolate = this.rePaymentData.principal.toFixed(2);
                }
                // 计算总额
                this.rePaymentData.actualTotal =
                    Number(this.rePaymentData.actualViolate) +
                    Number(this.rePaymentData.actualOverdue) +
                    Number(this.rePaymentData.actualInterest) +
                    Number(this.rePaymentData.actualPrincipal);
            }
        },
        changeType(type) {
            let t = type;
            Object.keys(this.rePaymentData).forEach((key) => {
                this.rePaymentData[key] = 0;
            });
            this.rePaymentData.type = t;
            this.rePaymentData.loanEndDate = '';
            this.rePaymentData.principal = '';
            if (this.rePaymentData.type == 2) {
                this.rePaymentData.shouldPrincipal = this.chooseRow.loanAmount;
                this.rePaymentData.interest =
                    ((this.rePaymentData.shouldPrincipal * (this.chooseRow.apr / 100)) / 360) * this.chooseRow.loanPeriod;
                let str = this.rePaymentData.interest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.interest =
                    Number(n) > 0 ? Number(this.rePaymentData.interest) + 0.01 : this.rePaymentData.interest;
                this.rePaymentData.interest = Math.floor(Number(this.rePaymentData.interest) * 100) / 100;
                this.rePaymentData.total = (Number(this.rePaymentData.shouldPrincipal) + Number(this.rePaymentData.interest)).toFixed(2);
                this.rePaymentData.loanEndDate = this.getNewData(
                    this.chooseRow.loanStartDate.split(' ')[0],
                    Number(this.chooseRow.loanPeriod)
                );
            }
        },
        numFormat(num) {
            if (!num) return num;
            num = Number(num);
            var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },
        getDaysBetween(dateString1, dateString2) {
            var startDate = Date.parse(dateString1);
            var endDate = Date.parse(dateString2);
            if (startDate > endDate) {
                return 0;
            }
            if (startDate == endDate) {
                return 0;
            }
            var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
            return days;
        },
        handlePreview(res, file) {
            if (this.payMentFile) {
                removeFile(this.fileId).then(re => {
                    this.payMentFile = res.data.filePath;
                    setLoanFile(this.loanCode, {
                        fileUrl: res.data.filePath,
                        fileName: '放款凭证'
                    }).then((res) => {
                        this.fileId = re.data;

                    });
                });
            } else {
                this.payMentFile = res.data.filePath;
                setLoanFile(this.loanCode, {
                    fileUrl: this.payMentFile,
                    fileName: '放款凭证'
                }).then((res) => {
                    this.fileId = res.data;

                });
            }

        },
        handlePreview2(res, file) {
            console.log(res);
            this.rePaymentFile = res.data.filePath;
        },
        openFile(file) {
            window.open(this.imgsBaseUrl + file);
        },
        getNewData(dateTemp, days) {
            // console.log(dateTemp);
            var dateTemp = dateTemp.split('-');
            var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式

            var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000;
            var rDate = new Date(millSeconds);
            var year = rDate.getFullYear();
            var month = rDate.getMonth() + 1;
            if (month < 10) month = '0' + month;
            var date = rDate.getDate();
            if (date < 10) date = '0' + date;
            return year + '-' + month + '-' + date;
        },
        _confirmDisburse(val) {
            this.payMentFile = '';
            this.fileId = '';
            this.loanCode = val.loanCode;
            getBankForLoan(val.loanCode).then((res) => {
                getLoanFile(val.loanCode).then(re => {
                    re.data.forEach(item => {
                        if (item.type == 'account') {
                            this.payMentFile = item.fileUrl;
                            this.fileId = item.loanfileId;
                        }
                    });
                    this.disburseForm = res.data[0];
                    this.disburseForm.loanAmount = val.loanAmount;
                    this.showDisburse = true;
                });

            });
        },
        _pushDisburse() {
            if (!this.loanForm.disburseDate) {
                return this.$message.info('请选择时间');
            }
            if (!this.loanForm.loanStatus) {
                return this.$message.info('请选择状态');
            }
            if (!this.payMentFile && this.loanForm.loanStatus == 'REPAYMENT') {
                return this.$message.info('请上传凭证');
            }
            activateLoan(this.loanCode, {
                status: this.loanForm.loanStatus,
                loanStartDate: this.loanForm.disburseDate
            }
            ).then((res) => {
                this.$message.success('操作成功！');
                this.showDisburse = false;
                this.loanForm.loanStatus = '';
                this.loanForm.disburseDate = '';
                this._getList();
                this.payMentFile = '';


            });
        },
        toOrderInfo(val) {
            this.$router.push({
                path: '/dhfq-orderInfo',
                query: {
                    loanCode: val.loanCode,
                    lenderProductId: val.lenderProductId,
                    loanPeriod: val.loanPeriod,
                    loanAmount: val.loanAmount,
                    createTime: val.createTime,
                    loanStatus: val.loanStatus,
                    loanStartDate: val.loanStartDate
                }
            });
        },
        _rePayment(row) {
            this.rePaymentFile = '';
            this.chooseRow = JSON.parse(JSON.stringify(row));
            this.chooseRow.loanAmount = Number(this.chooseRow.loanAmount * 10000);

            this.showRePayment = true;
            Object.keys(this.rePaymentData).forEach((key) => {
                this.rePaymentData[key] = 0;
            });
            this.rePaymentData.type = 1;
            this.rePaymentData.loanEndDate = '';
            this.rePaymentData.principal = '';
        },

        _offerrRceived() {
            splitedCreateLoan(this.splitData).then((res) => {
                this.$message.success('提交成功！');
                this.loanSplit = false;
            });
        },

        _paymentHistory(row) {
            this.dialogVisible3 = true;
            this.historyData = [];
            this.repaymentAmount = '';
            this.dealAmountSum = '';
            recordList(row.loanCode).then((res) => {
                this.historyData = res.data.repaymentRecordVoList || [];
                this.dealAmountSum = res.data.dealAmountSum; //待还本金
                this.repaymentAmount = res.data.repaymentAmount; //已还金额
            });
        },
        changeStatus(val) {
            this.loanStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        removeEndDate() {
            this.endDate = '';
        },
        removeLoan(row) {
            this.$confirm('请确定是否删除该贷款单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteLoan(row.id).then((res) => {
                    this.$message.success('删除成功！');
                    this._getList();
                });
            });
        },
        _loanUpdate() {
            this.form.loanStartDate = this.dates && this.dates[0] ? this.dates[0] : '';
            this.form.loanEndDate = this.dates && this.dates[1] ? this.dates[1] : '';
            this.form.loanClearDate = this.form.loanClearDate || '';
            let formData = new FormData();
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key]);
            });

            loanUpdate(formData).then((res) => {
                this._getList();
                this.$message.success('修改成功！');
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
                this.dates = [];
                this.dialogFormVisible = false;
            });
        },
        update(row) {
            // this.form=row
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
            this.dates = [];
            this.dates.push(row.loanStartDate);
            this.dates.push(row.loanEndDate);
            this.dialogFormVisible = true;
        },
        _clearLoanF() {
            clearLoan(this.row.id, this.endDate).then((res) => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.row = {};
                this.$emit('refreshDetail');
            });
        },
        _clearLoan(row) {
            this.row = row;
            this.dialogVisible2 = true;
        },
        _getList() {
            if (!this.filterOptions[3].value && !this.filterOptions[3].value.length) {
                this.filterOptions[3].value = ['', ''];
            }
            if (!this.filterOptions[4].value && !this.filterOptions[4].value.length) {
                this.filterOptions[4].value = ['', ''];
            }
            loanPage(
                this.currentPage,
                this.filterOptions[0].value,
                this.filterOptions[1].value,
                this.filterOptions[3].value[0],
                this.filterOptions[3].value[1],
                this.filterOptions[2].value,
                this.loanStatus,
                '',
                '',
                '',
                this.filterOptions[4].value[0],
                this.filterOptions[4].value[1],
                this.filterOptions[5].value,
                this.filterOptions[6].value,
                this.lenderProduct = '跨易赊'
            ).then(res => {
                this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(2);

                this.onLoanAmountSum = res.data.currentOnLoanAmountSum.toFixed(2);

                this.loanNumberSum = res.data.currentLoanNumberSum;
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
                if (res.data.records) {
                    res.data.records.forEach(item => {
                        item.loanPeriod = item.loanPeriod
                            ? item.loanPeriod +
                            (item.periodUnit == 'D' ? '天' : item.periodUnit == 'M' ? '月' : item.periodUnit == 'Y' ? '年' : '')
                            : '';
                        item.guarantorFeeRate = (item.guarantorFeeRate * 100).toFixed(2);
                        item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                        item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
                        item.hiddenBtn = '';
                        item.hiddenBtn =
                            item.lenderProductId == 33 || item.lenderProductId == 34
                                ? (item.hiddenBtn += '结清,删除，修改')
                                : item.hiddenBtn;
                        item.hiddenBtn = item.loanStatus == '创建' ? item.hiddenBtn : (item.hiddenBtn += ',确认放款');
                    });
                }

                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
                if (this.$route.query.loanNumber) {
                    this.filterOptions[0].value = this.$route.query.loanNumber;
                    this._getList();
                    this.$route.query.loanNumber = '';

                    return false;
                }
            });
        }
    }
};
</script>

<style lang='less' scope>
.dh {

    /* 谷歌 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }

    /* 火狐 */
    input {
        -moz-appearance: textfield;
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
        width: 360px;
        height: 178px;
        display: block;
    }

    .clearfix {
        font-size: 18px;
        // padding-left: 18px;
        padding-bottom: 20px;
    }

    /deep/ .el-form-item .form-margin .el-form-item--small .form-margin {
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

    .el-dialog .el-dialog__body {
        text-align: center;
    }
}
</style>