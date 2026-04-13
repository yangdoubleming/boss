<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
        </div>
        <!--<div style="margin-bottom: 5px">
            已收款金额：{{ paymentAmount }}，未收款金额：{{ unPaymentAmount }}&nbsp;&nbsp;&nbsp;&nbsp;<el-button
            type="primary"
            @click="dialogSave = true" 
            >添加收费</el-button>
        </div>-->
        <el-row :gutter="24">
            <el-col :span="24">
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <span class="grid-num"> 已收款金额</span>
                                <span class="grid-num2">{{ paymentAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <span class="grid-num">未收款金额</span>
                                <span class="grid-num2">{{ unPaymentAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="12">
                    <div style="display:flex; align-items:flex-end;height:100px;;width:100%; justify-content: flex-end">
                        <el-button style="float:right" type="primary" icon="el-icon-document-copy"
                            @click="dialogSave = true">添加收费</el-button>
                    </div>
                </el-col>
            </el-col>


        </el-row>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :isExport3="true" :detailTable="true" :isExporting="isExporting"
            @export="_export" @conditional-query="handleColumnsFilter" :current="currentPage"
            @conditional-reset="handleConditionalReset" @page-change="handlePageChange" @agreement="_showAgreement"
            @copyLink="_copyLink" @seeContract="_seeContract" @payment="_showPayment" @paymentDetails="_paymentDetails"
            @showUpdate="_showUpdate" @upOffline="_upOffline" @seeDetails="_seeDetails" @changeInvoiceStatus="_changeInvoiceStatus"/>

        <!-- 生成协议弹窗 -->
        <el-dialog title="生成协议" :visible.sync="dialogAgreement" width="600px" v-loading="agreeLoading">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <!--//<el-form-item label="授信编号" prop="">
                //    <el-input v-model="ruleForm.creditCode" :readonly="true"></el-input>
                //</el-form-item>-->
                <el-form-item label="收费编号" prop="">
                    <el-input v-model="ruleForm.applicationCode" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="收款对象" prop="">
                    <el-input v-model="ruleForm.borrowerName"></el-input>
                </el-form-item>
                <el-form-item label="法定代表人" prop="">
                    <el-input v-model="ruleForm.legalperson"></el-input> </el-form-item>
                <el-form-item :label="$t('loan_serch_phone')" prop="borrowerPhone">
                    <el-input v-model="ruleForm.borrowerPhone"></el-input>
                </el-form-item>
                <el-form-item label="服务费率" prop="">
                    <el-input v-model="ruleForm.serviceRate" @change="_getReceivableAmount">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="应收金额" prop="receivableAmount">
                    <el-input v-model="ruleForm.receivableAmount" @change="_getReceivableRate">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">生成协议</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 确认收款弹窗 -->
        <el-dialog title="确认收款" :visible.sync="dialogPayment" width="600px" :before-close="handleClosePayment">
            <el-form :model="ruleFormPayment" :rules="rulesPayment" ref="ruleFormPayment" label-width="120px"
                class="demo-ruleForm">
                <!-- <el-form-item label="授信编号" prop="">
                    <el-input v-model="ruleFormPayment.creditCode" :readonly="true"></el-input>
                </el-form-item> -->
                <el-form-item label="收费编号" prop="">
                    <el-input v-model="ruleFormPayment.applicationCode" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="收款对象" prop="">
                    <el-input v-model="ruleFormPayment.borrowerName" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="法定代表人" prop="">
                    <el-input v-model="ruleFormPayment.legalperson" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="服务费率" prop="">
                    <el-input v-model="ruleFormPayment.serviceRate" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="应收金额" prop="">
                    <el-input v-model="ruleFormPayment.receivableAmount" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="收款金额（元）" prop="actualAmount">
                    <el-input v-model="ruleFormPayment.actualAmount" :readonly="showPaymentDetails"></el-input>
                </el-form-item>
                <el-form-item label="交易时间:" prop="dealDate" class="list" required>
                    <el-date-picker class="inp" v-model="ruleFormPayment.dealDate" type="date"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="付款凭证" prop="">
                    <el-upload :limit="50" :on-exceed="onExceed" v-show="!showPaymentDetails" class="upload-demo"
                        :show-file-list="false" :action="uploadUrl" :on-success="handlePreview">
                        <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                    </el-upload>
                    <a v-for="(item, index) in fileList" :key="index" :href="item.fullFilePath" target="_blank"
                        style="display: block">{{
                            item.fileName
                        }}</a>
                </el-form-item>
                <el-form-item v-show="!showPaymentDetails">
                    <el-button type="primary" @click="submitFormPayment('ruleFormPayment')">确定</el-button>
                    <el-button type="primary" @click="dialogPayment = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 新增弹窗 -->
        <el-dialog title="添加收费" :visible.sync="dialogAdd" width="600px" v-loading="agreeLoading"
            :before-close="_defultRadio">
            <el-form :model="ruleFormx" :rules="rulesx" ref="ruleFormx" label-width="100px" class="demo-ruleForm">
                <el-form-item label="生成方式:">
                    <el-radio v-model="radio" label="1" @input="_changeRadio">手动添加</el-radio>
                    <el-radio v-model="radio" label="2" @input="_changeRadio">自动生成</el-radio>
                </el-form-item>
                <el-form-item label="申请单号" prop="applicationCode">
                    <el-input v-model="ruleFormx.applicationCode" @change="_getProductName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('loan_search_cpmc')" prop="name">
                    <el-select v-model="ruleFormx.name" :placeholder="$t('loan_detail_choose')" style="width:100%">
                        <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitFormx('ruleFormx')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 新增弹窗 -->
        <el-dialog width="600px" title="添加收费" :visible.sync="dialogSave" v-loading="agreeLoading"
            :before-close="_defultRadio">
            <el-form ref="ruleFormY" :model="ruleFormY" label-width="100px" class="demo-ruleForm">
                <el-form-item label="生成方式:">
                    <el-radio v-model="radio" label="1" @input="_changeRadio">手动添加</el-radio>
                    <el-radio v-model="radio" label="2" @input="_changeRadio">自动生成</el-radio>
                </el-form-item>
                <el-form-item label="收款对象:" prop="borrowerName">
                    <el-input v-model="ruleFormY.borrowerName" class="list"></el-input>
                </el-form-item>
                <el-form-item label="费用类型:" prop="expenseType" class="list">
                    <el-select v-model="ruleFormY.expenseType" :placeholder="$t('loan_detail_choose')">
                        <el-option label="订阅费" value="SAAS_SUBSCRIBE_FEE"></el-option>
                        <el-option label="技术服务费" value="DOW_SERVICE_CHARGE"></el-option>
                        <el-option label="豆服平台会员费" value="MEMBERSHIP_BENEFITS_FEE"></el-option>
                        <el-option label="开户服务费" value="ACCOUNT_OPENING_SERVICE_FEE"></el-option>
                        <!-- <el-option label="豆服平台会员费" value="PUFA_MEMBERSHIP_BENEFITS_FEE"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="收款金额:" prop="actualAmount" class="list">
                    <el-input v-model="ruleFormY.actualAmount"></el-input>
                </el-form-item>
                <el-form-item label="收款日期:" prop="paymentDate" class="list">
                    <el-date-picker class="inp" v-model="ruleFormY.paymentDate" type="date"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="归属人:" prop="sales" class="list">
                    <el-input v-model="ruleFormY.sales"></el-input>
                </el-form-item>
                <el-form-item label="付款凭证:" prop="photo">
                    <el-upload :limit="50" :on-exceed="onExceed" v-show="!showPaymentDetails" class="upload-demo"
                        :show-file-list="false" :action="uploadUrl" :on-success="handlePreviewY">
                        <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                    </el-upload>
                    <a v-for="(item, index) in fileListY" :key="index" :href="item.fullFilePath" target="_blank"
                        style="display: block">{{
                            item.fileName
                        }}</a>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="_submitFormY('ruleFormY')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 修改服务费 -->
        <el-dialog width="600px" title="修改服务费" :visible.sync="dialogUpdate" v-loading="agreeLoading">
            <el-form ref="ruleFormUpdate" :model="ruleFormUpdate" label-width="100px" class="demo-ruleForm">
                <el-form-item label="收款日期:" prop="paymentDate" class="list">
                    <el-date-picker class="inp" v-model="ruleFormUpdate.paymentDate" type="date"
                                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="实收金额:" prop="actualAmount">
                    <el-input v-model="ruleFormUpdate.actualAmount" class="list"></el-input>
                </el-form-item>
                <el-form-item label="收款状态:" prop="paymentStatus" class="list">
                    <el-select v-model="ruleFormUpdate.paymentStatus" :placeholder="$t('loan_detail_choose')">
                        <el-option label="已收款" value="PAY"></el-option>
                        <el-option label="未收款" value="UN_PAY"></el-option>
                        <el-option label="已退费" value="REFUNDED"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属人:" prop="sales">
                    <el-input v-model="ruleFormUpdate.sales" class="list"></el-input>
                </el-form-item>

                <!-- <el-form-item label="确认收款时间:">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="ruleFormUpdate.dealDate" type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交易时间:">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="ruleFormUpdate.paymentDate"
                        type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="_updateServiceFee">确认</el-button>
                    <el-button type="primary" @click="dialogUpdate = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 修改开票状态 -->
        <el-dialog width="600px" title="修改开票状态" :visible.sync="dialogInvoiceStatus" >
            <el-form ref="ruleFormUpdate" :model="InvoiceStatusForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="开票状态:" prop="invoiceStatus" class="list">
                    <el-select v-model="InvoiceStatusForm.invoiceStatus" placeholder="请选择开票状态">
                        <el-option
                            v-for="item in invoiceStatusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="_InvoiceStatus">确认</el-button>
                    <el-button type="primary" @click="dialogInvoiceStatus = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 上传线下服务费协议 -->
        <el-dialog :before-close="offReset" width="400px" title="上传线下服务费协议" :visible.sync="dialogOffUpload">
            <el-upload class="upOffLineDialog" name="files" :action="uploadMorePdf" :headers="uploadHeaders"
                :on-remove="handleRemoveUp" :on-exceed="handleExceedOff" :file-list="fileListOffList" :limit="1"
                :on-success="handleOfflineSuccess">
                <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
            <div style="margin-top: 20px ;display: flex;justify-content: flex-end;">
                <el-button type="primary" :loading="offLoading" @click="ensureUpoffline">确定上传协议</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    getServiceFeeList,
    generateProtocol,
    confirmReceipt,
    fileSave,
    fileList,
    getCouponFaceUrl,
    getSignUrl,
    getCouponUrl,
    getReceivableRate,
    getReceivableAmount,
    getProductName,
    addServiceFee,
    serviceFeeSave,
    serviceFeeUpdate,
    saveOffline, serviceFeeStatusUpdate
} from '../../../api/statistics';
import { getFddDetail } from '../../../api/ca';
export default {
    name: 'throw-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            invoiceStatusOptions:[
                { value: 'PENDING', label: '未开票' },
                { value: 'APPROVED', label: '已开票' },
            ],
            InvoiceStatusForm:{
                id:null,
                invoiceStatus:null,
            },
            dialogInvoiceStatus:false,
            offLoading: false,
            chooseUpoffline: '',
            dialogOffUpload: false,
            fileListOffList: [],
            uploadHeaders: { token: localStorage.getItem('token') },
            uploadMorePdf: process.env.VUE_APP_MORE,
            radio: "1",
            expenseType: [],
            options: [],
            fileList: [],
            fileListY: [],
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            dialogAgreement: false,
            dialogPayment: false,
            dialogSave: false,
            dialogSaveFee: false,
            dialogUpdate: false,
            tableOperate: [],
            tableData: [],
            isExporting: false,
            agreeLoading: false,
            baseUrl: process.env.VUE_APP_BASE_URL,
            paymentAmount: 0,
            unPaymentAmount: 0,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '收费编号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '收款对象',
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
                    type: 'daterange',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    value: '',
                    filterable: true,
                    placeholderArr: ['确认收款时间开始', '确认收款时间结束'],
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '收款状态',
                    filterable: true,
                    options: [
                        {
                            value: 'PAY',
                            label: '已收款'
                        },
                        {
                            value: 'UN_PAY',
                            label: '未收款'
                        },
                        {
                            value: 'REFUNDED',
                            label: '已退费'
                        }
                    ]
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '费用类型',
                    filterable: true,
                    options: [
                        {
                            value: 'SAAS_SUBSCRIBE_FEE',
                            label: '订阅费'
                        },
                        {
                            value: 'DOW_SERVICE_CHARGE',
                            label: '技术服务费'
                        },
                        {
                            value: 'MEMBERSHIP_BENEFITS_FEE',
                            label: '豆服平台会员费'
                        },
                        {
                            value: 'ACCOUNT_OPENING_SERVICE_FEE',
                            label: '开户服务费'
                        },
                        // {
                        //     value: 'PUFA_MEMBERSHIP_BENEFITS_FEE',
                        //     label: '豆服平台会员费'
                        // }
                    ]
                },
                {
                    type: 'daterange',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    value: '',
                    filterable: true,
                    placeholderArr: ['交易时间开始', '交易时间结束'],
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
                    label: '收费编号',
                    prop: 'applicationCode',
                    width: 230
                },
                {
                    label: '用户ID',
                    prop: 'userId',
                    width: 100
                },
                {
                    label: '收款对象',
                    prop: 'borrowerName',
                    width: 250
                },
                {
                    label: '手机号',
                    prop: 'borrowerPhone',
                    width: 150
                },
                {
                    label: '所属项目',
                    prop: 'projectType',
                    width: 160
                },
                {
                    label: '收入类型',
                    prop: 'incomeType',
                    width: 160
                },
                {
                    label: '费用类型',
                    prop: 'expenseType',
                    width: 160
                },
                {
                    label: '客户来源',
                    prop: 'lenderProductName',
                    width: 160
                },

                {
                    label: '授信金额',
                    prop: 'creditAmount',
                    width: 140
                },
                {
                    label: '服务费率（%）',
                    prop: 'serviceRate',
                    width: 140
                },
                {
                    label: '协议状态',
                    prop: 'agreementStatus',
                    width: 140
                },

                {
                    label: '应收金额',
                    prop: 'receivableAmount',
                    width: 140
                },

                {
                    label: '收款金额',
                    prop: 'actualAmount',
                    width: 140
                },
                {
                    label: '收款状态',
                    prop: 'paymentStatus',
                    width: 140
                },
                {
                    label: '归属人',
                    prop: 'sales',
                    width: 150
                },

                {
                    label: '确认收款时间',
                    prop: 'paymentDate',
                    width: 160
                },
                {
                    label: '交易时间',
                    prop: 'dealDate',
                    width: 160
                },

                {
                    label: '确认收款人',
                    prop: 'payee',
                    width: 150
                },
                {
                    label: '开票状态',
                    prop: 'invoiceStatusCn',
                    width: 150
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '80',
                    operates: [
                        {
                            event: 'seeDetails',
                            text: '查看详情',
                            popover: true,
                            type: 'primary'
                        },
                        {
                            event: 'agreement',
                            text: '生成协议',
                            popover: true,
                            type: 'primary'
                        },
                        {
                            event: 'agreement',
                            text: '更新协议',
                            popover: true,
                            type: 'primary'
                        },
                        {
                            event: 'copyLink',
                            text: '复制协议链接',
                            popover: true,
                            type: 'primary'
                        },
                        {
                            event: 'payment',
                            text: '确认收款',
                            popover: true,
                            type: 'danger'
                        },
                        {
                            event: 'paymentDetails',
                            text: '收款详情',
                            popover: true,
                            type: 'danger'
                        },
                        {
                            event: 'seeContract',
                            text: '查看协议',
                            popover: true,
                            type: 'danger'
                        },
                        {
                            event: 'showUpdate',
                            text: this.$t('loan_detail_xg'),
                            popover: true,
                            type: 'primary'
                        },
                        {
                            event: 'changeInvoiceStatus',
                            text: '修改开票状态',
                            popover: true,
                            type: 'danger'
                        },
                        {
                            event: 'upOffline',
                            text: '上传线下服务费协议',
                            popover: true,
                            type: 'danger'
                        },

                    ],
                    fixed: 'right'
                }
            ],
            ruleFormx: {
                applicationCode: '',
                name: ''
            },
            ruleFormY: {
                id: '',
                borrowerName: '',
                incomeType: '',
                expenseType: '',
                actualAmount: '',
                paymentDate: '',
                sales: '',
            },
            ruleFormUpdate: {
                id: '',
                actualAmount: '',
                paymentStatus: '',
                sales: '',
                dealDate: '',
                paymentDate: '',
            },
            ruleForm: {
                id: '',
                applicationCode: '',
                creditCode: '',
                borrowerName: '',
                legalperson: '',
                borrowerPhone: '',
                serviceRate: '',
                receivableAmount: ''
            },
            rules: {
                borrowerPhone: [{ pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }],

            },
            rulesx: {},
            ruleFormPayment: {
                id: '',
                receivableAmount: '',
                borrowerName: '',
                legalperson: '',
                borrowerPhone: '',
                serviceRate: '',
                actualAmount: '',
                dealDate: '',
            },
            rulesPayment: {
                actualAmount: [{ required: true, message: '收款金额不为空', trigger: 'blur' }],
                dealDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
            },
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            showPaymentDetails: false,
            dialogAdd: false,
        };
    },
    created() { },
    methods: {
        handleExceedOff() {
            this.$message.warning(
                `当前限制选择 1 个文件`
            );
        }
        ,
        offReset() {
            this.fileListOffList = []
            this.chooseUpoffline = ''
            this.dialogOffUpload = false
        },
        ensureUpoffline() {
            if (!this.fileListOffList.length) {
                return this.$message.warning('请上传文件')
            }
            this.offLoading = true
            saveOffline({ viewpdfUrl: this.fileListOffList[0].viewpdfUrl, id: this.chooseUpoffline }).then(res => {
                this.$message.success('上传成功')
                this.offLoading = false
                this.offReset()

            }).catch(err => {
                this.offLoading = false
            })
        },
        handleOfflineSuccess(res, file,) {
            let obj = {}
            obj.name = file.name
            obj.viewpdfUrl = file.response.data[0].fullPath
            this.fileListOffList.push(obj)
        },
        handleRemoveUp(file) {
            this.fileListOffList = this.fileListOffList.filter((item) => {
                return item.viewpdfUrl != file.viewpdfUrl;
            });
        },
        _upOffline(row) {
            this.chooseUpoffline = row.id
            this.dialogOffUpload = true
        },
        _showUpdate(row) {
            this.dialogUpdate = true;
            this.ruleFormUpdate.id = row.id;
            this.ruleFormUpdate.actualAmount = row.actualAmount === "-" ? "" : row.actualAmount;
            this.ruleFormUpdate.paymentStatus = row.paymentStatus;
            this.ruleFormUpdate.sales = row.sales;
            this.ruleFormUpdate.dealDate = row.dealDate;
            this.ruleFormUpdate.paymentDate = row.paymentDate;
        },
        // 修改开票状态
        _changeInvoiceStatus(row){
            this.InvoiceStatusForm.invoiceStatus = row.invoiceStatus
            this.InvoiceStatusForm.id = row.id
            this.dialogInvoiceStatus=true
            console.log(this.InvoiceStatusForm.invoiceStatus)
        },
        _InvoiceStatus(row){
            serviceFeeStatusUpdate({
                id: this.InvoiceStatusForm.id,
                invoiceStatus:this.InvoiceStatusForm.invoiceStatus,
            }).then(res => {
                if(res.code == 200){
                    this.$message.success('修改成功！')
                    this.dialogInvoiceStatus=false
                    this._getList()
                }
            })
        },
        _updateServiceFee() {
            if (this.ruleFormUpdate.paymentStatus == '已收款') {
                this.ruleFormUpdate.paymentStatus = 'PAY'
            } else if (this.ruleFormUpdate.paymentStatus == '未收款') {
                this.ruleFormUpdate.paymentStatus = 'UN_PAY'
            } else if (this.ruleFormUpdate.paymentStatus == '已退费') {
                this.ruleFormUpdate.paymentStatus = 'REFUNDED'
            }
            this.dialogUpdate = false;
            console.log(this.ruleFormUpdate)

            serviceFeeUpdate(this.ruleFormUpdate).then(res => {
                this.$message.success('操作成功');
                this.ruleFormUpdate = {
                    id: '',
                    actualAmount: '',
                    paymentStatus: '',
                    sales: '',
                    dealDate: '',
                    paymentDate: '',
                }
                this._getList();
            })
        },
        _defultRadio() {
            this.radio = '1'
            this.dialogSave = false;
            this.dialogAdd = false;
        },
        _changeRadio(value) {
            if (value == 1) {
                this.dialogSave = true;
                this.dialogAdd = false;
            } else if (value == 2) {
                this.dialogSave = false;
                this.dialogAdd = true;
            }
        },
        //获取产品
        _getProductName() {
            getProductName({ applicationCode: this.ruleFormx.applicationCode }).then(res => {
                this.options = [res.data]
            })
        },
        // 获取费率
        _getReceivableRate() {
            getReceivableRate({
                creditCode: this.ruleForm.creditCode,
                applicationCode: this.ruleForm.applicationCode,
                receivableAmount: this.ruleForm.receivableAmount
            }).then((res) => {
                this.ruleForm.serviceRate = res.data;
            });
        },
        // 获取应收金额
        _getReceivableAmount() {
            getReceivableAmount({
                creditCode: this.ruleForm.creditCode,
                applicationCode: this.ruleForm.applicationCode,
                serviceRate: this.ruleForm.serviceRate
            }).then((res) => {
                this.ruleForm.receivableAmount = res.data;
            });
        },
        //复制协议链接
        _copyLink(val) {
            getSignUrl({ creditCode: val.creditCode }).then((res) => {
                let _this = this;
                this.$copyText(res.data).then(
                    function (e) {
                        _this.$message.success('复制成功!');
                    },
                    function (e) {
                        console.log('copy arguments e:', e);
                        _this.$message.warning('复制失败!');
                    }
                );
            });
        },
        _seeDetails(val) {
            this.$router.push({
                name: 'serviceCharge-details',
                query: {
                    id: val.id
                }
            });
        },
        //查看签署协议链接
        //查看签署协议链接
        _seeContract(val) {
            if (val.viewpdfUrl == null) {
                getCouponUrl({ applicationCode: val.applicationCode }).then((res) => {
                    let _this = this;
                    this.$copyText(res.data).then(
                        function (e) {
                            window.open(res.data);
                            //_this.$message.success('复制成功!')
                        },
                        function (e) {
                            console.log('copy arguments e:', e);
                            _this.$message.warning('复制失败!');
                        }
                    );
                });
            } else {
                console.log(val.viewpdfUrl);
                window.open(val.viewpdfUrl);
            }

        },
        // 上传图片
        handlePreview(res, file) {
            this.fileList.push(res.data);
            this._fileSave(res.data);
        },
        // 上传图片接口
        _fileSave(obj) {
            let submitObj = {
                fileType: 'SERVICE_FEE_PAYMENT_CERTIFICATE',
                fileUrl: obj.filePath,
                resourceId: this.ruleFormPayment.id,
                fileName: obj.fileName
            };
            fileSave(submitObj).then((res) => {
                this._fileList();
            });
        },
        // 上传图片
        handlePreviewY(res, file) {
            this.fileListY.push(res.data);
            console.log(this.fileListY)
        },
        // 上传图片接口
        _fileSaveY(obj) {
            let submitObj = {
                fileType: 'SERVICE_FEE_PAYMENT_CERTIFICATE',
                fileUrl: obj.filePath,
                resourceId: this.ruleFormY.id,
                fileName: obj.fileName
            };
            fileSave(submitObj).then((res) => {
                this._fileList();
            });
        },
        // 获取图片列表
        _fileList() {
            fileList({
                fileType: 'SERVICE_FEE_PAYMENT_CERTIFICATE',
                resourceId: this.ruleFormPayment.id
            }).then((res) => {
                if (res.data && res.data.length > 0) {
                    this.fileList = res.data.map((item) => {
                        return {
                            fullFilePath: this.imgsBaseUrl + item.fileUrl,
                            fileName: item.fileName
                        };
                    });
                }
            });
        },
        onExceed() {
            return this.$message.warning('最多只能上传5张');
        },
        // 生成协议
        _showAgreement(val) {
            this.dialogAgreement = true;
            for (let k in this.ruleForm) {
                this.ruleForm[k] = val[k];
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('您确认生成协议吗，请仔细核对内容', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            // 生成协议
                            this._agreement();
                        })
                        .catch(() => { });
                } else {
                    return false;
                }
            });
        },
        submitFormx() {
            addServiceFee({ applicationCode: this.ruleFormx.applicationCode }).then(res => {
                this.dialogAdd = false
                this.ruleFormx = {
                    applicationCode: '',
                    name: ''
                }
                this.$message.success('操作成功');
                this._defultRadio()
                this._getList();
            })
        },
        _submitFormY() {
            if (this.fileListY.length <= 0) {
                return this.$message.warning('请上传用款凭证');
            }
            serviceFeeSave(this.ruleFormY).then(res => {
                this.dialogSave = false;
                this.ruleFormY.id = res.data;
                this.fileListY.forEach(element => {
                    this._fileSaveY(element);
                });
                this.$message.success('操作成功');
                this.ruleFormY = {
                    id: '',
                    borrowerName: '',
                    incomeType: '',
                    expenseType: '',
                    actualAmount: '',
                    paymentDate: '',
                    sales: '',
                },
                    this.fileListY = [];
                this._defultRadio()

                this._getList();
            })
        },
        // 生成协议
        _agreement() {
            this.ruleForm.serviceRate = Number(this.ruleForm.serviceRate) / 100;
            this.agreeLoading = true;
            generateProtocol(this.ruleForm)
                .then((res) => {
                    this._getCouponFaceUrl();
                })
                .catch((err) => {
                    this.ruleForm.serviceRate = Number(this.ruleForm.serviceRate) * 100;
                    this.$message.error(err.message);
                    this.agreeLoading = false;
                });
        },
        // 权益-生成协议
        _getCouponFaceUrl() {
            getCouponFaceUrl({
                creditCode: this.ruleForm.creditCode,
                returnUrl: 'https://lendingpf.dowsure.com/signsuccess?type=signxy',
                mobileSignType: '2',
                signVerifyWay: '1'
            })
                .then((res) => {
                    this.agreeLoading = false;
                    this.$message.success('操作成功');
                    this._getList();
                    this.ruleForm.serviceRate = Number(this.ruleForm.serviceRate) * 100;
                    this.dialogAgreement = false;
                })
                .catch((err) => {
                    this.ruleForm.serviceRate = Number(this.ruleForm.serviceRate) * 100;
                    this.agreeLoading = false;
                });

        },

        // 确认收款
        _showPayment(val) {
            this.dialogPayment = true;
            this.ruleFormPayment = Object.assign(this.ruleFormPayment, val);
            this.ruleFormPayment.actualAmount = '';
            this._fileList();
        },
        // 收款详情
        _paymentDetails(val) {
            this.dialogPayment = true;
            this.showPaymentDetails = true;
            this.ruleFormPayment = Object.assign(this.ruleFormPayment, val);
            this._fileList();
        },
        // 关闭还款弹窗
        handleClosePayment() {
            this.dialogPayment = false;
            this.showPaymentDetails = false;
            this.fileList = [];
        },
        submitFormPayment(formName) {
            if (this.fileList.length <= 0) {
                return this.$message.warning('请上传用款凭证');
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (Number(this.ruleFormPayment.actualAmount) < Number(this.ruleFormPayment.receivableAmount)) {
                        this.$confirm('您输入的收款金额小于应收金额，确认要提交吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                            .then(() => {
                                // 确认收款
                                this._payment();
                            })
                            .catch(() => { });
                    } else {
                        // 确认收款
                        this._payment();
                    }
                } else {
                    return false;
                }
            });
        },
        _payment() {
            confirmReceipt({
                id: this.ruleFormPayment.id,
                actualAmount: this.ruleFormPayment.actualAmount,
                dealDate: this.ruleFormPayment.dealDate
            }).then((res) => {
                this.$message.success('操作成功');
                this.handleClosePayment();
                this._getList();
            });
        },
        // 获取列表
        _getList() {
            getServiceFeeList({
                current: this.currentPage,
                size: 10,
                borrowerPhone: this.filterOptions[2].value,
                borrowerName: this.filterOptions[1].value,
                creditCode: this.filterOptions[0].value,
                paymentDateBegin: this.filterOptions[3].value ? this.filterOptions[3].value[0] : '',
                paymentDateEnd: this.filterOptions[3].value ? this.filterOptions[3].value[1].replace(/00:00:00/g, '23:59:59') : '',
                paymentStatus: this.filterOptions[4].value,
                expenseType: this.filterOptions[5].value,
                dealDateBegin: this.filterOptions[6].value ? this.filterOptions[6].value[0] : '',
                dealDateEnd: this.filterOptions[6].value ? this.filterOptions[6].value[1].replace(/00:00:00/g, '23:59:59') : '',
                userId: this.filterOptions[7].value,
            }).then((res) => {
                this.tableData = res.data.records.map((x) => {
                    x.borrowerPhone ? x.borrowerPhone : (x.borrowerPhone = '-');
                    x.actualAmount ? x.actualAmount : (x.actualAmount = '-');
                    x.creditAmount
                        ? (x.creditAmount = (x.currency == 'USD' ? '￥' : '￥') + Number(x.creditAmount).toLocaleString())
                        : (x.creditAmount = '-');
                    switch (x.paymentStatus) {
                        case 'PAY':
                            x.paymentStatus = '已收款';
                            break;
                        case 'UN_PAY':
                            x.paymentStatus = '未收款';
                            break;
                        case 'REFUNDED':
                            x.paymentStatus = '已退费';
                            break;
                    }
                    switch (x.invoiceStatus) {
                        case 'APPROVED':
                            x.invoiceStatusCn = '已开票';
                            break;
                        case 'PENDING':
                            x.invoiceStatusCn = '未开票';
                            break;
                    }
                    switch (x.projectType) {
                        case 'CREDIT_CLOUD':
                            x.projectType = '信贷云';
                            break;
                        case 'COLLECTION_CLOUD':
                            x.projectType = '收款云';
                            break;
                        case 'INSURANCE_CLOUD':
                            x.projectType = '保险云';
                            break;
                        case 'DOW_CLOUD':
                            x.projectType = 'Dow+云';
                            break;
                        case 'SELLER_CLOUD':
                            x.projectType = '豆服平台会员';
                            break;
                    }
                    switch (x.incomeType) {
                        case 'FINANCIAL_CLOUD_SUBSCRIBE_FEE':
                            x.incomeType = '金融云订阅收入';
                            break;
                        case 'INSURANCE_CLOUD_SUBSCRIBE_FEE':
                            x.incomeType = '保险云订阅收入';
                            break;
                        case 'DOW_SAAS_SUBSCRIBE_FEE':
                            x.incomeType = 'Dow+SaaS订阅收入';
                            break;
                        case 'DOW_3P_FEE':
                            x.incomeType = '3P DOW+收入';
                            break;
                        case 'SELLER_CLOUD_SERVICE_FEE':
                            x.incomeType = '豆服平台会员费收入';
                            break;
                    }
                    switch (x.expenseType) {
                        case 'SAAS_SUBSCRIBE_FEE':
                            x.expenseType = '订阅费';
                            break;
                        case 'DOW_SERVICE_CHARGE':
                            x.expenseType = '技术服务费';
                            break;
                        case 'MEMBERSHIP_BENEFITS_FEE':
                            x.expenseType = '豆服平台会员费';
                            break;
                        case 'ACCOUNT_OPENING_SERVICE_FEE':
                            x.expenseType = '开户服务费';
                            break;
                        case 'PUFA_MEMBERSHIP_BENEFITS_FEE':
                            x.expenseType = '豆服平台会员费';

                    }

                    switch (x.agreementStatus) {
                        case 'UN_GENERATED':
                            x.agreementStatus = '未生成';
                            break;
                        case 'GENERATED':
                            x.agreementStatus = '已生成';
                            break;
                        case 'SIGNED':
                            x.agreementStatus = '已签署';
                            break;
                    }
                    x.serviceRate = (Number(x.serviceRate) * 100).toFixed(2);
                    x.hiddenBtn = '';
                    x.hiddenBtn = x.agreementStatus == '已生成' ? x.hiddenBtn : (x.hiddenBtn += '复制协议链接');
                    x.hiddenBtn = x.agreementStatus == '已生成' ? x.hiddenBtn : (x.hiddenBtn += '更新协议');
                    x.hiddenBtn = x.agreementStatus == '未生成' ? x.hiddenBtn : (x.hiddenBtn += '生成协议');
                    x.hiddenBtn = x.paymentStatus == '已收款' ? x.hiddenBtn : (x.hiddenBtn += '收款详情');
                    x.hiddenBtn = x.agreementStatus == '已签署' ? x.hiddenBtn : (x.hiddenBtn += '查看协议');
                    x.hiddenBtn = x.paymentStatus == '未收款' && x.agreementStatus == '已签署' ? x.hiddenBtn : (x.hiddenBtn += '确认收款');
                });
                this.paymentAmount = res.data.paymentAmount;
                this.unPaymentAmount = res.data.unPaymentAmount;
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        // 导出
        _export() {
            let that = this;
            let fileName = '收费管理表';
            this.isExporting = true;
            const axios = require('axios');
            console.log(window.location);
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/service/fee/export`,
                params: {
                    borrowerPhone: this.filterOptions[2].value,
                    borrowerName: this.filterOptions[1].value,
                    creditCode: this.filterOptions[0].value,
                    paymentDateBegin: this.filterOptions[3].value ? this.filterOptions[3].value[0] : '',
                    paymentDateEnd: this.filterOptions[3].value ? this.filterOptions[3].value[1].replace(/00:00:00/g, '23:59:59') : '',
                    paymentStatus: this.filterOptions[4].value,
                    expenseType: this.filterOptions[5].value,
                    dealDateBegin: this.filterOptions[6].value ? this.filterOptions[6].value[0] : '',
                    dealDateEnd: this.filterOptions[6].value ? this.filterOptions[6].value[1].replace(/00:00:00/g, '23:59:59') : '',
                    userId: this.filterOptions[7].value,
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
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
                })
                .catch((error) => {
                    console.log(error.data);
                });
        }
    }
};
</script>
<style>
.el-upload--text {
    height: 34px;
    border: none;
    width: 110px;
}
</style>
<style lang='less' scoped>
/deep/ .upOffLineDialog .el-upload-list__item .el-icon-close {
    top: 0px;
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


.list {
    /deep/.el-input__inner {
        width: 300px !important;
    }

    /deep/.el-form-item__content {
        width: 260px;
    }

}
</style>