<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{ $t('common_dsb') }} /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">贷款金额</span>
                                    <span class="grid-num2">{{ loanData.loanAmount ?
                                        loanData.loanAmount.toFixed(2).toLocaleString() : 0
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">在贷金额</span>
                                    <span class="grid-num2">{{ loanData.loanBalance ?
                                        loanData.loanBalance.toFixed(2).toLocaleString() : 0
                                        }}{{ $t('common_yuan2') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">在贷笔数</span>
                                    <span class="grid-num2">{{ loanData.loanCount ?
                                        loanData.loanCount.toLocaleString() : 0
                                        }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">银通账户余额</span>
                                    <span class="grid-num2">{{ amt_balance }}{{ $t('common_yuan2') }} </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page :detailTable="true" :tableData="tableData" :showFilterRadio="false" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @toOrderInfo="toOrderInfo" @confirmDisburse="_confirmDisburse"
            :exportBtn="true" @onExport='_export' @uploadFile='_uploadFile' @repayment="_repayment" />



        <el-dialog title="确认放款" :visible.sync="showDisburse" width="40%">
            <el-form :inline="false" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="贷款金额：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.currency == 'USD' ? '$' : "¥" }} {{
                        (Number(disburseForm.loanAmount).toLocaleString())
                        }} </span>
                </el-form-item>
                <el-form-item label="收款人名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.accountName }}</span>
                </el-form-item>
                <el-form-item label="收款人银行账户：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.accountNo }}</span>
                </el-form-item>
                <el-form-item label="收款人开户行名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bankName }}</span>
                </el-form-item>
                <el-form-item label="收款人开户行地址：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bankBranchName }}</span>
                </el-form-item>
                <el-form-item label="起息时间：" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="loanForm.disburseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="loanForm.loanStatus" label="REPAYMENT">成功</el-radio>
                    <el-radio v-model="loanForm.loanStatus" label="DISBURSE_FAILED">失败</el-radio>
                </el-form-item>
                <el-form-item label="放款凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(payMentFile)"
                            v-if="payMentFile">查看凭证</el-button>

                        <el-upload style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl" :on-success="handlePreview" :show-file-list="false">
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDisburse = false">取 消</el-button>
                <el-button type="primary" @click="_pushDisburse">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="还款确认" :visible.sync="showRePayment" width="40%">
            <el-form v-loading="calculateLoading" :inline="false" :model="form" ref="form" style="padding-left: 20px"
                label-width="150px" label-position="left">

                <div>
                    <el-form-item label="还款时间：" style="margin-right: 30px" prop="creditApprovalTime">
                        <el-date-picker v-model="rePaymentData.loanEndDate" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('loan_detail_xzrqsj')"
                            @change="changeDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="还款金额：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentData.principal" type="number" style="width: 220px"></el-input>
                        <el-button type="primary" style="margin-left:5px" @click="_calculation">确认</el-button>
                    </el-form-item>
                    <el-form-item label="实还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>¥{{ numFormat(rePaymentData.actualPrincipal) }}</span>
                    </el-form-item>
                    <el-form-item label="实还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>¥{{ numFormat(rePaymentData.actualInterest) }}</span>
                    </el-form-item>
                    <el-form-item label="实还罚息：" style="margin-right: 30px" prop="creditAmount">
                        <span>¥{{ numFormat(rePaymentData.actualOverdue) }}</span>
                    </el-form-item>

                </div>



                <el-form-item label="流水凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(rePaymentFile)"
                            v-if="rePaymentFile">查看凭证</el-button>

                        <el-upload style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl" :on-success="handlePreview2" :show-file-list="false">
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRePayment = false">取 消</el-button>
                <el-button type="primary" @click="_pushRepayment">确 定</el-button>
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
    usRepayment,
    getRepaymentSum,
    saveOrderFile,
    lianlianRepayment
} from '../../../api/index';
import { getBankForLoan, activateLoan, setLoanFile, getLoanFile, repaymentPlan, removeFile } from '../../../api/dhfq'
import { getLoanList, uploadFile, getCalculate } from '../../../api/ddb'
import { number } from 'echarts';
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
            rePaymentData: {
                loanEndDate: '',
                principal: '',
                loanAmount: 0,
                interest: 0,
                actualOverdue: 0,
                actualPrincipal: 0,
                actualInterest: 0
            },
            loanData: {},
            fileId: '',
            amt_balance: 0,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            showRePayment: false,
            payMentFile: '',
            loanForm: {
                disburseDate: '',
                loanStatus: ''
            },

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
            loanAmount: '',
            loanSplit: false,
            dialogVisible3: false,

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
                    placeholder: '第三方贷款编号',
                },

                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_dkbh'),



                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '第三方用户编号',

                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名称',

                },


                {
                    type: 'select',
                    value: '',
                    placeholder: '贷款状态',
                    options: [
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
                    ]
                },
                {
                    type: 'datetimerange',
                    value: '',
                    placeholder: '创建时间',

                },

            ],

            columns: [
                {
                    label: '第三方贷款单编号',
                    prop: 'extLoanOrderId',
                    width: 230
                },
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: 230
                },
                {
                    label: '第三方支付单号',
                    prop: 'paymentNo',
                    width: 200
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 150
                },
                // {
                //     label: '创建时间开始',
                //     prop: 'beginTime',
                //     width: 150
                // },
                //  {
                //     label: '创建时间结束',
                //     prop: 'endTime',
                //     width: 150
                // },
                {
                    label: '用户编号',
                    prop: 'userId'
                },
                {
                    label: '第三方用户号',
                    prop: 'extUserId',
                    width: 150
                },
                {
                    label: '用户名称',
                    prop: 'bname'
                },
                {
                    label: '借款状态',
                    prop: 'loanStatus'
                },

                {
                    label: '借款金额',
                    prop: 'loanAmount',
                    width: '100'
                },



                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'repayment',
                            text: '还款确认',
                            type: 'primary',
                            popover: true,
                        },
                        {
                            event: 'toOrderInfo',
                            text: '贷款详情',
                            type: 'primary',
                            popover: true,
                        },
                        {
                            event: 'uploadFile',
                            text: '下载合同',
                            type: 'primary',
                            popover: true,
                        },


                    ],
                    fixed: 'right'
                }
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
            calculateLoading: false,
            repaymentSumData: {},//已还
        };
    },
    mounted() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[0].options = res.data;
        });
    },
    methods: {
        _calculation() {
            this.calculateLoading = true
            getCalculate({
                dealAmount: this.rePaymentData.principal,
                dealDate: this.rePaymentData.loanEndDate,
                loanCode: this.chooseRow.loanCode
            }).then(res => {
                this.rePaymentData.actualOverdue = res.data.paymentPenaltyInterest || 0
                this.rePaymentData.actualInterest = res.data.paymentInterest || 0
                this.rePaymentData.actualPrincipal = res.data.paymentPrincipal || 0
                this.calculateLoading = false
            }).catch(err => {
                this.calculateLoading = false
            })
        },
        jinwei(sum) {
            let str = sum.toString();
            //截取最后一位  大于3进1 ， sum自带小数点后三位 return时截取掉最后一位
            let n = Number(str.substr(str.length - 1, 1));
            let r = Number(n) > 3 ? Number(Number(sum) + 0.01).toFixed(3) : Number(sum).toFixed(3)
            console.log(sum, r);
            return r.toString().substr(0, r.toString().length - 1)
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
        _repayment(row) {
            this.chooseRow = JSON.parse(JSON.stringify(row))
            // console.log(this.chooseRow);
            getRepaymentSum(row.loanCode).then(res => {
                res.data.borrowingDayRate = res.data.borrowingDayRate ? res.data.borrowingDayRate : 0
                res.data.paymentPrincipal = res.data.paymentPrincipal ? res.data.paymentPrincipal : 0
                res.data.paymentInterest = res.data.paymentInterest ? res.data.paymentInterest : 0
                res.data.paymentPenaltyInterest = res.data.paymentPenaltyInterest ? res.data.paymentPenaltyInterest : 0
                this.repaymentSumData = res.data
                this.rePaymentData.loanEndDate = this.getCurentTime(true)
                this.rePaymentData.principal = ''
                this.rePaymentData.actualPrincipal = 0
                this.rePaymentData.actualInterest = 0
                this.rePaymentData.actualOverdue = 0
                this.rePaymentFile = ''
                this.showRePayment = true
            })
        },
        numFormat(num) {
            if (!num) return num;
            num = Number(num);
            var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },
        changeDate() {
            // type == 1  如果选择日期不是90天内 既不是提前还款*+
            // console.log(this.chooseRow.loanStartDate);
            // console.log(this.rePaymentData.loanEndDate);



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
        _uploadFile(row) {
            uploadFile(row.loanCode).then(res => {
                if (!res.data) {
                    return this.$message.warning('暂无合同！')
                }
                window.open(res.data)
            })
        },
        getCurentTime(isTime = true) {
            var now = new Date();
            var clock = "";
            var year = now.getFullYear();       // 年
            clock += year + "-";
            var month = now.getMonth() + 1;     // 月
            if (month < 10) {
                clock += "0";
            }
            clock += month + "-";
            var day = now.getDate();            // 日
            if (day < 10) {
                clock += "0";
            }
            if (isTime == true) {
                clock += day + " ";
                var hh = now.getHours();            // 时
                if (hh < 10) {
                    clock += "0";
                }

                clock += hh + ":";
                var mm = now.getMinutes();     // 分
                if (mm < 10) {
                    clock += '0';
                }
                clock += mm + ":";
                var ss = now.getSeconds();     // 秒
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
        _export() {
            let starTime = this.filterOptions[5].value.length ? this.filterOptions[5].value[0] : '';
            let endTime = this.filterOptions[5].value.length ? this.filterOptions[5].value[1] : '';
            this.$export(`/LlianOrder/export?extLoanOrderId=${this.filterOptions[0].value}&loanCode=${this.filterOptions[1].value}&extUserId=${this.filterOptions[2].value}&bcName=${this.filterOptions[3].value}&loanStatus=${this.filterOptions[4].value}&beginTime=${starTime}&endTime=${endTime}`)
        },
        _pushRepayment() {
            if (!this.rePaymentFile) {
                return this.$message.info('请上传流水凭证！');
            }

            lianlianRepayment({
                dealDate: this.rePaymentData.loanEndDate,
                dealAmount: this.rePaymentData.principal,
                loanCode: this.chooseRow.loanCode,
            }).then((res) => {
                saveOrderFile({
                    fileUrl: this.rePaymentFile,
                    fileType: 'REPAYMENT',
                    resourceId: this.chooseRow.id
                }).then((res) => {
                    this.$message.success('操作成功！');
                    this.showRePayment = false;
                    this._getList();
                });
            });
        },

        handlePreview(res, file) {
            if (this.payMentFile) {
                removeFile(this.fileId).then(re => {
                    this.payMentFile = res.data.filePath;
                    setLoanFile(this.loanCode, {
                        fileUrl: res.data.filePath,
                        fileName: '放款凭证',
                    }).then((res) => {
                        this.fileId = re.data

                    });
                })
            } else {
                this.payMentFile = res.data.filePath;
                setLoanFile(this.loanCode, {
                    fileUrl: this.payMentFile,
                    fileName: '放款凭证',
                }).then((res) => {
                    this.fileId = res.data

                });
            }

        },
        handlePreview2(res, file) {
            // console.log(res);
            this.rePaymentFile = res.data.filePath;
        },
        openFile(file) {
            window.open(this.imgsBaseUrl + file);
        },

        _confirmDisburse(val) {
            this.payMentFile = ''
            this.fileId = ''
            this.loanCode = val.loanCode;
            getBankForLoan(val.loanCode).then((res) => {
                getLoanFile(val.loanCode).then(re => {
                    re.data.forEach(item => {
                        if (item.type == 'account') {
                            this.payMentFile = item.fileUrl
                            this.fileId = item.loanfileId
                        }
                    })
                    this.disburseForm = res.data[0];
                    this.disburseForm.loanAmount = val.loanAmount
                    this.showDisburse = true;
                })

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
                path: '/ddb-orderInfo',
                query: {
                    loanCode: val.loanCode,
                    lenderProductId: val.lenderProductId,
                    loanPeriod: val.loanPeriod,
                    loanAmount: val.loanAmount,
                    createTime: val.createTime,
                    loanStatus: val.loanStatus,
                    loanStartDate: val.loanStartDate,
                    userId: val.userId,
                    extUserId: val.extUserId,
                    bname: val.bname,
                    paymentNo: val.paymentNo,
                }
            });
        },

        _getList() {
            let starTime = this.filterOptions[5].value.length ? this.filterOptions[5].value[0] : '';
            let endTime = this.filterOptions[5].value.length ? this.filterOptions[5].value[1] : '';

            getLoanList(
                {

                    current: this.currentPage,
                    size: 10,
                    extLoanOrderId: this.filterOptions[0].value,
                    loanCode: this.filterOptions[1].value,
                    extUserId: this.filterOptions[2].value,
                    bcName: this.filterOptions[3].value,
                    loanStatus: this.filterOptions[4].value,
                    beginTime: starTime,
                    endTime: endTime
                }
            ).then((res) => {
                // this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(3);
                // this.loanNumberSum = res.data.currentLoanNumberSum;
                this.loanData = res.data
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        this.filterOptions[4].options.forEach(it => {
                            if (item.loanStatus == it.value) { item.loanStatus = it.label }
                        })
                        item.hiddenBtn = '';
                        // item.hiddenBtn = item.loanStatus == '还款中' ? item.hiddenBtn : (item.hiddenBtn += '还款确认');

                    });
                }

                this.tableData = res.data.records || [];
                this.totalSize = res.data.total;
            });
        },

    }
};
</script>

<style lang='less' scope>
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