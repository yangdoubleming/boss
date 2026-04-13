<template>
    <div v-if="showPage">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{
                        $t('common_dsb')
                    }}
                /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('common_shopdetail')
                }}</span>
        </div>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="title-box" style="align-items: center">
                        <div class="left">
                            <span class="grid-num">{{ titData.loanNumber }}</span>
                            <span class="grid-num3" v-if="titData.creditAmount">${{ titData.creditAmount }}万</span>
                            <el-tag effect="plain" class="el-tag">{{ applicationStatus }}</el-tag>
                        </div>
                        <div class="right">
                            <el-button type="success" @click="pushOrder"
                                v-if="applicationStatus === '已创建' && $showBtn('US_SUBMIT_LOAN')">提 交</el-button>

                            <!-- <el-button
                                type="success"
                                @click="openActive"
                                v-if="
                                    applicationStatus === '已批准' &&
                                    !pageData.creditContractPath &&
                                    pageData.creditCode &&
                                    $showBtn('US_ACTIVE_CREDIT')
                                "
                            >
                                激活授信</el-button
                            > -->
                            <el-button type="success" @click="openFile" v-if="pageData.creditContractPath">查看文件
                            </el-button>
                            <el-button type="success" @click="_approveDollar"
                                v-if="(applicationStatus === '已提交' || (applicationStatus === '已初核' && $route.query.lenderId == '46') || applicationStatus === '已复核') && $showBtn('US_EXAMINE')">授信{{
                                $t('loan_detail_sp') }}</el-button>
                            <!--                            <el-button-->
                            <!--                                type="success"-->
                            <!--                                @click="openCreateLoan"-->
                            <!--                                v-if="(applicationStatus === '已批准' || applicationStatus === '已放款') && $route.query.lenderId !== '15'"-->
                            <!--                                >{{ $t('loan_detail_cjdk') }}</el-button-->
                            <!--                            >-->
                            <el-button type="danger" @click="_closeOrder" v-if="$showBtn('SUBMIT_LOAN_ASS')">{{
                                $t('loan_detail_gbsqd')
                                }}</el-button>
                            <!-- 统一创建贷款 -->
                            <UsKsbRepayDialog />
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 24px">
                <el-card shadow="hover" :body-style="{ padding: '0px', height: '60px' }">
                    <div class="grid-content grid-con-1">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                            @select="handleSelect" active-text-color="#fe1964">
                            <el-menu-item index="1">{{ $t('loan_detail_gl') }}</el-menu-item>
                            <el-menu-item index="2">{{ $t('loan_detail_sqxx') }}</el-menu-item>

                            <el-menu-item index="5">{{ $t('loan_detail_dpxx') }}</el-menu-item>
                            <el-menu-item index="3">{{ $t('loan_detail_dqpl') }}</el-menu-item>
                            <el-menu-item index="6">{{ $t('loan_detail_dzjk') }}</el-menu-item>
                            <el-menu-item index="9" v-if="$route.query.lenderId === '15'">{{ $t('loan_detail_khhx')
                                }}</el-menu-item>
                            <el-menu-item index="10">{{ $t('loan_detail_htxy') }}</el-menu-item>
                            <el-menu-item index="11">{{ $t('loan_detail_szjdhbg') }}</el-menu-item>
                            <!-- <el-menu-item index="4" v-if="scoringData && scoringData.length ">浦发模型报告</el-menu-item> -->
                        </el-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <usoverview :pageData="pageData" @toAchievement="toAchievement" v-if="activeIndex == 1"
            @refreshDetail="_getDetail" @toLoanning="_toLoanning" :shopreportData="shopreportData" />
        <!-- 汇丰美元特殊处理 -->
        <usHsbcApplyinfo :reEditBank="reEditBank" :pageInfo="pageInfo"
            v-if="activeIndex == 2 && $route.query.lenderId == '46'" @refreshDetail="_getDetail" :bInfo="pageData"
            :userAndCompanyInfo="userAndCompanyInfo" />
        <us-applyinfo :reEditBank="reEditBank" :pageInfo="pageInfo" :additionalInformation="additionalInformation"
            :receiptInfo="receiptInfo" v-if="activeIndex == 2 && $route.query.lenderId != '46'"
            @refreshDetail="_getDetail" :bInfo="pageData" :userAndCompanyInfo="userAndCompanyInfo"
            :usdApplicationInfo="usdApplicationInfo" />
        <shopInfo @refreshDetail="_getDetail" :pageData="shopData" v-if="activeIndex == 5" :amazonData="amazonData"
            :userId="this.$route.query.userId" @upShopData="upShopData" />
        <usAchievementData v-if="activeIndex == 3" :sanplData="sanplData" :defaultOffer="{}" />
        <div v-loading="loaningLoading">
            <usLoaning :allweekLineChartData="allweekLineChartData" v-if="activeIndex == 6" :sanplData="loaningData"
                :shopData="pageData.applicationOfferVoList" :defaultOffer="defaultOffer" />
        </div>
        <caContract :applicationCode="titData.loanNumber" v-if="activeIndex == 10" />
        <DigitalReport
            v-if="activeIndex == 11 && ($route.query.lenderId == '15' || $route.query.lenderId == '74') && this.usdApplicationInfo.domesticBusinessEntity"
            :loanNumber="this.titData.loanNumber" :bcName="this.usdApplicationInfo.domesticBusinessEntity">
        </DigitalReport>

        <el-dialog title="授信审批" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="formSp" :rules="rulesSp" ref="formSp" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <el-form-item label="授信开始时间" style="margin-right: 30px" prop="creditStartDate">
                    <el-date-picker v-model="formSp.creditStartDate" type="datetime" style="width: 200px"
                        value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="授信金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="formSp.creditAmount" autocomplete="off" style="width: 200px">
                        <template slot="append">{{ $t('common_wy') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="利率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="formSp.interestRate" autocomplete="off" style="width: 200px">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="审批是否通过" style="margin-right: 30px" prop="result">
                    <el-select v-model="formSp.result" :placeholder="$t('loan_detail_choose')">
                        <el-option label="通过" :value="true" />
                        <el-option label="拒绝" :value="false" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approve" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="授信审批" :visible.sync="dialogFormVisible4" width="60%">
            <el-table :data="shopLoanInfoList" header-align="center">
                <el-table-column prop="productName" label="产品名称" width="" align="center"></el-table-column>
                <el-table-column prop="currency" label="币种" width="" align="center"></el-table-column>
                <el-table-column prop="creditAmount" label="授信额度（万）" width="" align="center"></el-table-column>
                <el-table-column prop="availableAmount" label="可用额度（万）" width="" align="center"></el-table-column>
                <el-table-column prop="loanBalance" label="在贷额度（万）" width="" align="center"></el-table-column>
            </el-table>
            <el-card style="margin-top: 20px">
                <el-form :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                    <el-form-item label="授信额度" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="creditAuditForm.creditAmount" style="width: 200px" type="number"> </el-input>
                        <span style="margin-left: 10px">美元</span>
                    </el-form-item>
                    <el-form-item label="利率" style="margin-right: 30px" prop="interestRate">
                        <el-input v-model="creditAuditForm.interestRate" autocomplete="off" style="width: 200px"
                            type="number">
                            <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="可提现额度" style="margin-right: 30px" prop="creditStatus">
                        <el-select v-model="repaymentTypeVOSIndex" placeholder="选择月份及还款方式"
                            style="width: 200px; margin-right: 20px" @change="changeRepaymentTypeList">
                            <el-option v-for="(item, index) in ksbUsdAuditInfo.repaymentTypeVOS" :key="index"
                                :label="item.period + '-' + item.type" :value="index"></el-option>
                        </el-select>
                        <el-input v-model="creditAuditForm.repaymentTypeList[0].selfWithdrawalAmount"
                            style="width: 200px" type="number">
                        </el-input><span style="margin-left: 10px">美元</span>
                    </el-form-item>
                </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="primary" @click="subCreditAudit('ACTIVE')" style="width: 80px; height: 35px">通
                    过</el-button>
                <el-button @click="subCreditAudit('REJECTED')" style="width: 80px; height: 35px">拒 绝</el-button>
            </div>
        </el-dialog>

        <el-dialog title="激活授信" :visible.sync="dialogFormVisible2" width="20%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker v-model="activeTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="授信合同文件" style="margin-right:30px" prop="dates">
                    <div style="display:flex;align-items:center">
                        <div style="height:50px">
                            <el-button type="success" @click="openFile" v-if="pdfFile">查看文件</el-button>
                        </div>
                        <el-upload style="margin-right:30px;height:50px" :action="uploadUrl" :on-success="handlePreview"
                            :show-file-list="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible2 = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_active" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="创建贷款" :visible.sync="dialogFormVisible3" width="50%" v-loading="loanLoading">
            <el-form :inline="true" :model="form2" :rules="rules2" ref="form2" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <el-form-item label="支用申请时间" style="margin-right: 30px" prop="loanApplyDate"
                    v-if="pageData.lenderName != '惠民保理'">
                    <el-date-picker v-model="form2.loanApplyDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')" style="width: 200px"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款期限" style="margin-right: 30px" prop="loanPeriod">
                    <el-input v-model="form2.loanPeriod" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 50px">
                            <el-select v-model="dateDefaultValue" @change="changeSelectValue" placeholder="日">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="贷款金额" style="margin-right: 30px" prop="loanAmount">
                    <el-input v-model="form2.loanAmount" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">{{ currencyType }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="年利率" style="margin-right: 30px" prop="apr">
                    <el-input v-model="form2.apr" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible3 = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_createLoan" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>

        <PFscoring v-if="activeIndex == 4 && scoringData && scoringData.length" :scoringData="scoringData" />
        <div class="end">版权所有© 2021 豆沙包科技有限公司 沪ICP备15015443号-1</div>
    </div>
</template>

<script>
import usoverview from '../../common/detail-components/us-overview.vue';
import usApplyinfo from '../../common/detail-components/us-applyInfo.vue';
import usHsbcApplyinfo from '../../common/detail-components/us-hsbc-applyInfo.vue';
import usAchievementData from '../../common/detail-components/us-achievementData.vue';
import PFscoring from '../../common/detail-components/PFscoring.vue';
import shopInfo from '../../common/detail-components/us-shopInfo.vue';
import usLoaning from '../../common/detail-components/us-loaning.vue';
import UsKsbRepayDialog from './components/usKsbRepayDialog.vue';
import { creditBefore, creditAfter, credits, shopreport, shopLoanInfo, ksbUsdAuditInfo, creditAudit } from '../../../api/boss1';
import caContract from '../../common/detail-components/ca-contract.vue';

import {
    paymentInfo,
    approveDollar,
    applicationDetail,
    applicationInfoUs,
    query3plList,
    scoring,
    approve,
    createLoan,
    companyAll,
    shopInfoF,
    pushApplication,
    received1st,
    received2nd,
    closeOrder,
    latestQuery3plList,
    submitDollar,
    activeDollar,
    userBank,
    saveFileUrl,
    createLoanUsd,
    getUsdApplicationInfo
} from '../../../api/index';
import DigitalReport from '@/components/common/detail-components/digitalReport.vue';
import { findAdditionalInformation, findReceiptInfo } from '@/api/examine';

export default {
    name: 'minecraft-detail',
    components: {
        DigitalReport,
        usoverview,
        usApplyinfo,
        usAchievementData,
        PFscoring,
        shopInfo,
        usLoaning,
        caContract,
        usHsbcApplyinfo,
        UsKsbRepayDialog
    },
    data() {
        return {
            shopLoanInfoList: [],
            ksbUsdAuditInfo: {
                creditAmount: '',
                interestRate: '',
                repaymentTypeVOS: ''
            },
            currencyType: '万美元',
            allweekLineChartData: {},
            pdfFile: '',
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            reEditBank: false,
            activeTime: '',
            shopreportData: {},
            shopData: [],
            applicationStatus: '',
            dialogFormVisible: false, //授信审批
            dialogFormVisible2: false, // 激活授信
            dialogFormVisible3: false, // 创建贷款
            dialogFormVisible4: false, // 已复核授信审批
            loanLoading: false,

            rules2: {
                loanApplyDate: [{ required: true, message: '请选择时间', trigger: 'change' }],
                loanPeriod: [{ required: true, message: '请填写期限', trigger: 'blur' }],
                loanAmount: [{ required: true, message: '请填写金额', trigger: 'blur' }],
                apr: [{ required: true, message: '请填写利率', trigger: 'blur' }]
            },
            form2: {
                applicationCode: '',
                loanApplyDate: '',
                loanPeriod: '',
                loanAmount: '',
                periodUnit: '',
                apr: ''
            },
            creditAuditForm: {
                applicationCode: '',
                userId: '',
                currency: '',
                creditAmount: '',
                interestRate: '',
                selfWithdrawalAmount: '',
                creditStatus: '',
                creditStartDate: '',
                term: '12个月',
                repaymentTypeList: [
                    {
                        productId: '',
                        interestRate: '',
                        selfWithdrawalAmount: '',
                        totalAmount: ''
                    }
                ]
            },
            form: {
                applicationCode: '',
                result: '',
                interestRate: ''
            },
            showPage: false,
            activeIndex: '1',
            pageData: {},
            sanplData: [],
            loaningData: [],
            pageInfo: {},
            scoringData: {},
            titData: {},
            companyList: [],
            userAndCompanyInfo: {},
            usdApplicationInfo: {},
            loanStatus: ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'],
            loanStatusStr: ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'],
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
            amazonData: [],
            loaningLoading: false,
            defaultOffer: {},
            dateOptions: [
                {
                    value: 'D',
                    label: '日'
                },
                {
                    value: 'M',
                    label: '月'
                },
                {
                    value: 'Y',
                    label: '年'
                }
            ],
            dateDefaultValue: 'D',
            repaymentTypeVOSIndex: '',
            rulesSp: {
                creditAmount: [{ required: true, message: '请填写授信金额', trigger: 'blur' }],
                creditStartDate: [{ required: true, message: '请填写授信开始时间', trigger: 'blur' }],
                interestRate: [{ required: true, message: '请填写利率', trigger: 'blur' }],
                result: [{ required: true, message: '请填写审批是否通过', trigger: 'blur' }]
            },
            formSp: {
                creditStartDate: '',
                result: '',
                interestRate: '',
                creditAmount: ''
            },
            additionalInformation: [],
            receiptInfo: []
        };
    },
    // watch:{
    //如果是直接改url单号访问
    //     '$route.query.loanNumber'(newV){
    //         this._getDetail()
    //     },
    // },
    activated() {
        // console.log(this.$route);
        if (this.titData.loanNumber !== this.$route.query.loanNumber) {
            this.pdfFile = '';
            this.activeIndex = '1';
            this.pageData = {};
            this.shopData = [];
            this.sanplData = [];
            this.loaningData = [];
            this.amazonData = [];
            this._getDetail();
        }
        if (this.$route.query.tag) {
            this.activeIndex = '11';
        }

        this.getAdditionalInformation();
    },

    methods: {
        //补充资料
        getAdditionalInformation() {
            findAdditionalInformation(this.$route.query.loanNumber).then((res) => {
                this.additionalInformation = res.data;
            });
            if (this.$route.query.loanCode) {
                findReceiptInfo(this.$route.query.loanNumber, this.$route.query.loanCode).then((res) => {
                    this.receiptInfo = res.data;
                });
            }
        },
        //店铺列表刷新
        upShopData() {
            shopInfoF(this.$route.query.loanNumber).then((res) => {
                res.data.forEach((item) => {
                    item.creditAmount = item.creditAmount / 10000;
                    if (item.lockStatus) {
                        if (item.lockStatus == 'LOCK') {
                            item.lockStatus = '已锁定';
                        } else if (item.lockStatus == 'UNLOCK') {
                            item.lockStatus = '未锁定';
                        }
                    }
                });
                credits(this.$route.query.loanNumber).then((re) => {
                    re.data.forEach((it) => {
                        it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                        res.data.forEach((item) => {
                            it.applicationStatus = it.offerId == item.offerId ? item.applicationStatus : it.applicationStatus;
                            it.accountLockStatus = it.offerId == item.offerId ? item.accountLockStatus : it.accountLockStatus;
                        });
                    });

                    this.amazonData = re.data;
                });
                this.shopData = res.data;
            });
        },
        subCreditAudit(creditStatus) {
            this.creditAuditForm.creditStatus = creditStatus;
            this.creditAuditForm.creditAmount = this.creditAuditForm.creditAmount.toString();
            this.creditAuditForm.selfWithdrawalAmount = this.creditAuditForm.creditAmount;
            if (!this.creditAuditForm.currency) {
                this.creditAuditForm.currency = 'USD';
            }
            if (!this.creditAuditForm.repaymentTypeList[0].productId) {
                this.$message.warning('请先选择月份及还款方式！');
                return;
            }
            creditAudit(this.creditAuditForm).then((res) => {
                this.$message.success('操作成功！');
                this.dialogFormVisible4 = false;
                this._getDetail();
            });
        },
        changeRepaymentTypeList() {
            const obj = this.ksbUsdAuditInfo.repaymentTypeVOS[this.repaymentTypeVOSIndex];
            this.creditAuditForm.repaymentTypeList = [
                {
                    productId: obj.productId.toString(),
                    interestRate: obj.interestRate,
                    selfWithdrawalAmount: obj.remainSelfWithdrawalAmount,
                    totalAmount: ''
                }
            ];
        },
        openCredit() {
            shopLoanInfo(this.$route.query.loanNumber).then((res) => {
                this.shopLoanInfoList = res.data.details || [];
                this.creditAuditForm.currency = res.data.currency;

                this.shopLoanInfoList.push({
                    availableAmount: res.data.totalAvailableAmount || 0,
                    creditAmount: res.data.totalCreditAmount || 0,
                    currency: res.data.currency || 'USD',
                    loanBalance: res.data.totalLoanBalance || 0,
                    productName: '合计'
                });
            });
            ksbUsdAuditInfo(this.$route.query.loanNumber).then((res) => {
                this.ksbUsdAuditInfo = res.data;
                this.creditAuditForm.creditStartDate = new Date().toISOString().split('T')[0];
                this.creditAuditForm.applicationCode = this.$route.query.loanNumber;
                this.creditAuditForm.userId = this.$route.query.userId;
                this.creditAuditForm.creditAmount = this.ksbUsdAuditInfo.creditAmount;
                this.creditAuditForm.interestRate = this.ksbUsdAuditInfo.interestRate;
                this.dialogFormVisible4 = true;
            });
        },
        _closeOrder() {
            this.$confirm('此操作将关闭该申请单, 是否确定', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'primary'
            }).then(() => {
                closeOrder({
                    applicationId: this.$route.query.id
                }).then((res) => {
                    this.$message.success('操作成功！');
                });
            });
        },
        changeSelectValue(v) {
            console.log(121111, v);
        },
        _toLoanning(offer) {
            this.activeIndex = '6';
            this.loaningLoading = true;
            latestQuery3plList(this.$route.query.loanNumber).then((res) => {
                this.loaningData = res.data;
                res.data.forEach((item, index) => {
                    if (item.offerId == offer) {
                        this.defaultOffer = item;
                        item.tabIndex = index;
                    }
                });
                this.loaningLoading = false;
            });
        },
        openFile() {
            window.open(this.pageData.creditContractPath || this.pdfFile);
        },
        handlePreview(res, file) {
            console.log(res);
            this.pdfFile = res.data.fullFilePath;
        },
        _approve() {
            this.formSp.applicationCode = this.$route.query.loanNumber;
            this.formSp.userId = this.$route.query.id;
            approveDollar(this.formSp).then((res) => {
                this.$message.success('操作成功！');
                this.dialogFormVisible = false;
                this._getDetail();
            });
        },
        _approveDollar() {
            this.dialogFormVisible = true;
        },
        openActive() {
            this.dialogFormVisible2 = true;
        },
        openCreateLoan() {
            this.dialogFormVisible3 = true;
        },

        _active() {
            // if (!this.pdfFile) {
            //     return this.$message.info('请上传授信合同！');
            // }
            activeDollar({
                applicationCode: this.$route.query.loanNumber,
                creditStartDate: this.activeTime
            }).then((res) => {
                // saveFileUrl({
                //     path: this.pdfFile,
                //     resourceCode: this.pageData.creditCode,
                //     resourceType: 'CREDIT'
                // }).then((res) => {
                this.$message({
                    type: 'success',
                    message: '激活授信成功!'
                });
                this.dialogFormVisible2 = false;
                this._getDetail();
                // });
            });
        },
        _received2nd() {
            this.$confirm('是否确定复核通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'primary'
            }).then(() => {
                received2nd({
                    applicationId: this.$route.query.id
                }).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '复核通过!'
                    });
                    this._getDetail();
                });
            });
        },
        pushOrder() {
            this.$confirm('是否提交该申请单?', '提示', {
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                type: 'primary'
            }).then(() => {
                submitDollar(this.$route.query.loanNumber).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '提交成功!'
                    });
                    this._getDetail();
                });
            });
        },
        _getDetail() {
            //{{$t('loan_detail_gl') }}
            companyAll().then((res) => {
                shopreport(this.$route.query.loanNumber).then((re) => {
                    this.companyList = res.data;
                    this.shopreportData = re.data.riskReportV3ShopScore || {};
                    this.allweekLineChartData = re.data || {};
                });
            });

            applicationInfoUs(this.$route.query.loanNumber).then((res) => {
                this.userAndCompanyInfo = JSON.parse(JSON.stringify(res.data));

                paymentInfo(res.data.userId).then((res2) => {
                    userBank(res.data.userId).then((res3) => {
                        res3.data.userId = res.data.userId;
                        this.reEditBank = res3.data.bankName ? true : false;
                        this.pageInfo = JSON.parse(JSON.stringify(Object.assign(res2.data, res3.data)));
                    });
                });
            });

            getUsdApplicationInfo({ applicationCode: this.$route.query.loanNumber }).then((res) => {
                this.usdApplicationInfo = JSON.parse(JSON.stringify(res.data));
                console.log(this.usdApplicationInfo.domesticBusinessEntity);
            });

            shopInfoF(this.$route.query.loanNumber).then((res) => {
                res.data.forEach((item) => {
                    item.creditAmount = item.creditAmount / 10000;
                    if (item.lockStatus) {
                        if (item.lockStatus == 'LOCK') {
                            item.lockStatus = '已锁定';
                        } else if (item.lockStatus == 'UNLOCK') {
                            item.lockStatus = '未锁定';
                        }
                    }
                });
                credits(this.$route.query.loanNumber).then((re) => {
                    re.data.forEach((it) => {
                        it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                        res.data.forEach((item) => {
                            it.applicationStatus = it.offerId == item.offerId ? item.applicationStatus : it.applicationStatus;
                            it.accountLockStatus = it.offerId == item.offerId ? item.accountLockStatus : it.accountLockStatus;
                        });
                    });

                    this.amazonData = re.data;
                });
                this.shopData = res.data;
            });

            this.titData = this.$route.query;
            applicationDetail(this.$route.query.loanNumber).then((res) => {
                localStorage.setItem('customerId', res.data.userId);
                this.applicationStatus = this.orderStatusStr[this.orderStatus.indexOf(res.data.applicationStatus)];
                if (res.data.loanVoList && res.data.loanVoList.length) {
                    res.data.loanVoList.forEach((item) => {
                        // 转状态
                        item.loanStatus = item.loanStatus ? this.loanStatusStr[this.loanStatus.indexOf(item.loanStatus)] : '';
                        item.hiddenBtn = '';
                        item.hiddenBtn = item.loanStatus.includes('已结清') ? (item.hiddenBtn += '结清') : item.hiddenBtn;
                    });
                }
                this.pageData = res.data;
                // 接口返回数据后再显示
                this.showPage = true;
            });
        },

        handleSelect(key, keypath) {
            this.activeIndex = keypath[0];
            if (this.activeIndex == 3) {
                // 业绩数据 3PL
                creditBefore(this.$route.query.loanNumber).then((res) => {
                    // res.data.forEach((item) => {
                    //     item.year1SalesAmount = (item.year1SalesAmount / res.data.exchangeRates[0].exchangeRate).toFixed(2);
                    //     item.y1DisbursementValue = (item.y1DisbursementValue / res.data.exchangeRates[0].exchangeRate).toFixed(2);
                    //     item.latestFbaInventoryValue = (item.latestFbaInventoryValue / res.data.exchangeRates[0].exchangeRate).toFixed(2);
                    // });
                    this.sanplData = res.data;
                });
            } else if (this.activeIndex == 4) {
                // 浦发模型
                scoring(this.$route.query.loanNumber).then((res) => {
                    this.scoringData = res.data;
                });
            } else if (this.activeIndex == 5) {
                shopInfoF(this.$route.query.loanNumber).then((res) => {
                    res.data.forEach((item) => {
                        item.creditAmount = item.creditAmount / 10000;
                        if (item.lockStatus) {
                            if (item.lockStatus == 'LOCK') {
                                item.lockStatus = '已锁定';
                            } else if (item.lockStatus == 'UNLOCK') {
                                item.lockStatus = '未锁定';
                            }
                        }
                        if (item.availableStatus) {
                            if (item.availableStatus == 'AVAILABLE') {
                                item.availableStatus = '已激活';
                            } else {
                                item.availableStatus = '未激活';
                            }
                        }
                    });
                    this.shopData = res.data;
                });
            } else if (this.activeIndex == 6) {
                latestQuery3plList(this.$route.query.loanNumber).then((res) => {
                    this.loaningData = res.data;
                });
            }
        },
        toAchievement() {
            // 业绩数据 3PL
            this.activeIndex = 3;
            query3plList(this.$route.query.loanNumber).then((res) => {
                this.sanplData = res.data;
            });
        },
        //创建贷款
        _createLoan() {
            if (this.form2.loanAmount > 5000) {
                return this.$message.error('贷款金额不能大于5000万,请确认金额是否正确');
            }
            this.$refs.form2.validate((valid) => {
                if (valid) {
                    this.form2.applicationCode = this.$route.query.loanNumber;
                    this.form2.periodUnit = this.dateDefaultValue;
                    let formD = new FormData();
                    Object.keys(this.form2).forEach((key) => {
                        formD.append(key, this.form2[key]);
                    });
                    this.loanLoading = true;
                    createLoanUsd(formD)
                        .then((res) => {
                            this.$message.success('提交成功');
                            this.dialogFormVisible3 = false;
                            this._getDetail();
                            this.loanLoading = false;
                        })
                        .catch((err) => {
                            this.loanLoading = false;
                        });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.end {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14;
    text-align: center;
    margin-top: 20px;
}

.el-menu-item {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}

.title-box {
    display: flex;
    align-items: center;
    padding: 15px 24px;
    justify-content: space-between;

    .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .el-button {
            width: 100px;
            border-radius: 3px;
        }
    }

    .left {
        display: flex;
        align-items: center;

        .grid-num {
            font-size: 28px;
            line-height: 35px;
        }

        .grid-num3 {
            font-size: 28px;
            color: #fe1964;
            padding-left: 25px;
        }

        .el-tag--small {
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 25px;
        }
    }
}
</style>
