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
                            <el-link class="grid-num" @click="toLoanPage">{{ titData.loanNumber }}</el-link>
                            <!-- <span
                  class="grid-num"
                  style="padding-left:25px;font-size:26px"
                  v-if="titData.productName"
              >{{titData.productName}}</span>-->
                            <span class="grid-num3" v-if="titData.creditAmount">¥{{ titData.creditAmount }}万</span>
                            <el-tag effect="plain" class="el-tag">{{ applicationStatus }}</el-tag>
                        </div>
                        <div class="right">
                            <el-button type="success" @click="pushOrder"
                                v-if="applicationStatus === '已创建' && $showBtn('SUBMIT_LOAN_ASS')">{{ $t('common_submit')
                                }}</el-button>
                            <el-button type="success" @click="_received1st"
                                v-if="applicationStatus === '已提交' && $showBtn('RECEIVED1ST_ASS')">{{
                                    $t('loan_detail_chtg') }}</el-button>
                            <el-button type="success" @click="_received2nd"
                                v-if="applicationStatus === '已初核' && $showBtn('RECEIVED2ST')">{{ $t('loan_detail_fhtg')
                                }}</el-button>
                            <el-button type="success" @click="_openApprove"
                                v-if="applicationStatus === '已复核' && $showBtn('EXAMINE_ASS')">{{ $t('loan_detail_sp')
                                }}</el-button>
                            <el-button type="warning" @click="dialogFormVisible2 = true"
                                v-if="(applicationStatus === '已批准' || applicationStatus === '已放款') && $showBtn('CREATE_LOAN_ASS')">{{
                                    $t('loan_detail_cjdk') }}</el-button>

                            <!-- <el-button plain type="danger" icon="el-icon-back">退回</el-button>
              <el-button plain type="info" icon="el-icon-close">拒绝</el-button>-->
                            <el-button type="danger" @click="_closeOrder" v-if="$showBtn('SUBMIT_LOAN_ASS')">{{
                                $t('loan_detail_gbsqd')
                                }}</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 24px">
                <el-card shadow="hover" :body-style="{ padding: '0px', height: '60px' }">
                    <div class="grid-content grid-con-1" style="display: flex">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" style="width: 92%" mode="horizontal"
                            @select="handleSelect" active-text-color="#fe1964">
                            <el-menu-item index="1" v-if="!['25', '48'].includes($route.query.lenderId)">{{
                                $t('loan_detail_gl')
                                }}</el-menu-item>
                            <el-menu-item index="2">{{ $t('loan_detail_sqxx') }}</el-menu-item>
                            <!-- <el-menu-item index="20" v-if="$route.query.isSupple">{{ $t('loan_detail_supple') }}</el-menu-item> -->
                            <el-menu-item index="5" v-if="!['25', '48', '59'].includes($route.query.lenderId)">{{
                                $t('loan_detail_dpxx')
                                }}</el-menu-item>
                            <el-menu-item index="3" v-if="!['25', '48'].includes($route.query.lenderId)">{{
                                $t('loan_detail_sxbg')
                                }}</el-menu-item>
                            <el-menu-item index="6" v-if="!['25', '48'].includes($route.query.lenderId)">{{
                                $t('loan_detail_jkbg')
                                }}</el-menu-item>
                            <el-menu-item index="7" v-if="pageData.lenderName.includes('浦发')">{{ $t('loan_detail_zfbg')
                            }}</el-menu-item>
                            <el-menu-item index="8" v-if="$route.query.lenderId === '25'">{{ $t('loan_detail_xpdp')
                            }}</el-menu-item>
                            <el-menu-item index="9" v-if="
                                $route.query.lenderId === '28' ||
                                $route.query.lenderId === '42' ||
                                $route.query.lenderId === '25' ||
                                $route.query.lenderId === '43' ||
                                $route.query.lenderId === '48' ||
                                $route.query.lenderId === '59' ||
                                $route.query.lenderId === '57' ||
                                $route.query.lenderId === '55' ||
                                $route.query.lenderId === '9'
                            ">{{ $t('loan_detail_fkzb') }}</el-menu-item>
                            <el-menu-item index="10">{{ $t('loan_detail_htxy') }}</el-menu-item>
                            <el-menu-item index="11" v-if="!['48', '59'].includes($route.query.lenderId)">{{
                                $t('loan_detail_bfbk')
                                }}</el-menu-item>
                            <el-menu-item index="12" v-if="['57'].includes($route.query.lenderId)">{{
                                $t('loan_detail_shxx')
                                }}</el-menu-item>
                            <el-menu-item index="13"
                                v-if="['57', '55', '9'].includes($route.query.lenderId)">风控模型</el-menu-item>
                            <!-- <el-menu-item index="4" v-if="scoringData && scoringData.length ">浦发模型报告</el-menu-item> -->
                            <el-menu-item index="14" v-if="['57'].includes($route.query.lenderId)">物流账单</el-menu-item>
                            <el-menu-item index="15"> 数字化尽调报告 </el-menu-item>
                        </el-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div v-loading="checkTabLoading">
            <overview :pageData="pageData" @toAchievement="toAchievement" :shopreportData="shopreportData"
                v-if="activeIndex == 1" @refreshDetail="_getDetail" @toLoanning="_toLoanning" />
            <!-- <applyinfo :pageInfo='pageInfo'  v-show="activeIndex==2" /> -->
            <applyinfo :pageInfo="pageInfo" v-if="activeIndex == 2" :additionalInformation="additionalInformation"
                @refreshDetail="_getDetail" :bankInfo="bankInfo" />
            <!-- 店铺详情 -->
            <shopInfo :pageData="shopData" :creditAmount="pageData.creditAmount" v-if="activeIndex == 5"
                @refreshDetail="_getDetail" :amazonData="amazonData" :userId="this.$route.query.userId"
                @openCreditInfo="dialogFormVisible = true" @upShopData="upShopData" />
            <achievementData v-if="activeIndex == 3" :sanplData="sanplData" :defaultOffer="{}" />
            <hf v-if="activeIndex == 9" :businessLicense="pageInfo.companyVo.bcCreditcode" />
            <div v-loading="loaningLoading">
                <loaning v-if="activeIndex == 6" :sanplData="loaningData" :shopData="pageData.applicationOfferVoList"
                    :defaultOffer="defaultOffer" :allweekLineChartData="allweekLineChartData" />
            </div>
            <shopeeShop :pageData="shopeeShopData" v-if="activeIndex == 8" />
            <fddContract :applicationCode="titData.loanNumber" v-if="activeIndex == 10" />
            <financialBindCard :idCard="pageInfo.companyBorrowerVo.bCardId" :userId="pageInfo.companyBorrowerVo.userId"
                v-if="activeIndex == 11" />


        </div>

        <el-dialog title="授信信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <el-form-item label="授信批复时间" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="form.creditApprovalTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="授信时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker v-model="form.dates" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="期限" style="margin-right: 30px" prop="creditTerm">
                    <el-input v-model="form.creditTerm" autocomplete="off" type="number" style="width: 200px">
                        <!-- <el-button slot="append" icon="el-icon-lx-lock">月</el-button> -->
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="dateDefaultValue" @change="changeSelectValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="授信金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.creditAmount" type="number" autocomplete="off" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">{{ currencyType }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="年利率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.interestRate" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="form.creditStatus" label="ACTIVE">生效中</el-radio>
                    <el-radio v-model="form.creditStatus" label="CLOSED">已失效</el-radio>
                </el-form-item>
                <el-form-item label="币种" style="margin-right: 30px" prop="currency">
                    <el-select v-model="form.currency" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label"
                            :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approve" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="创建贷款" :visible.sync="dialogFormVisible2" width="50%" v-loading="loanLoading">
            <el-form :inline="true" :model="form2" :rules="rules2" ref="form2" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <el-form-item label="贷款支用申请时间" style="margin-right: 30px" prop="loanApplyDate"
                    v-if="pageData.lenderName != '惠民保理'">
                    <el-date-picker v-model="form2.loanApplyDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款时间" style="margin-right: 30px" prop="dates" v-if="pageData.lenderName != '惠民保理'">
                    <el-date-picker v-model="form2.dates" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="贷款时间" style="margin-right: 30px" prop="loanApplyDate" v-else>
                    <el-date-picker v-model="form2.loanStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款期限" style="margin-right: 30px" prop="loanPeriod">
                    <el-input v-model="form2.loanPeriod" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="dateDefaultValue" @change="changeSelectValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="贷款产品" style="margin-right: 30px" prop="lenderProductId">
                    <el-select v-model="form2.lenderProductId" :placeholder="$t('loan_detail_choose')" clearable
                        style="width: 200px">
                        <el-option v-for="item in titData.product" :key="item.id"
                            :label="item.id + '-' + item.productName" :value="item.id"></el-option>
                    </el-select>
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
                <el-form-item label="合同编号" style="margin-right: 30px" prop="contractNumber">
                    <el-input v-model="form2.contractNumber" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="担保费率" style="margin-right: 30px" type="number" prop="guarantorFeeRate">
                    <el-input v-model="form2.guarantorFeeRate" autocomplete="off" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保费用" style="margin-right: 30px" prop="guarantorFee">
                    <el-input v-model="form2.guarantorFee" guarantorFee="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保公司" style="margin-right: 30px" prop="guarantorCompanyId">
                    <el-select v-model="form2.guarantorCompanyId" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in companyList" :key="item.id" :label="item.gcName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="币种" style="margin-right: 30px" prop="currency">
                    <el-select v-model="form2.currency" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label"
                            :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible2 = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_createLoan" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <PFscoring v-if="activeIndex == 4 && scoringData && scoringData.length" :scoringData="scoringData" />
        <pfDataModel v-if="activeIndex == 7" :pageData="pfData" />
        <riskDetail v-if="activeIndex == 12"></riskDetail>
        <newDetail v-if="activeIndex == 13"></newDetail>
        <LogisticsInvoice v-if="activeIndex == 14"></LogisticsInvoice>
        <DigitalReport v-if="activeIndex == 15 && this.pageInfo.companyVo.bcName && this.titData.loanNumber"
            :loanNumber="this.titData.loanNumber" :bcName="this.pageInfo.companyVo.bcName"></DigitalReport>
        <div class="end">版权所有© 2021 豆沙包科技有限公司 沪ICP备15015443号-1</div>
    </div>
</template>

<script>
import riskDetail from '../../common/detail-components/riskDetail.vue';
import overview from '../../common/detail-components/overview.vue';
import applyinfo from '../../common/detail-components/applyInfo.vue';
import achievementData from '../../common/detail-components/achievementData.vue';
import PFscoring from '../../common/detail-components/PFscoring.vue';
import shopInfo from '../../common/detail-components/shopInfo.vue';
import loaning from '../../common/detail-components/loaning.vue';
import hf from '../../common/detail-components/hf.vue';
import pfDataModel from '../../common/detail-components/pfDataModel.vue';
import shopeeShop from '../../common/detail-components/shopee-shop.vue';
import fddContract from '../../common/detail-components/fdd-contract.vue';
import financialBindCard from '../../common/detail-components/financial-bind-card.vue';
import newDetail from '../../common/detail-components/newDetail.vue';
import LogisticsInvoice from '../../common/detail-components/logisticsInvoice.vue';
import DigitalReport from '../../common/detail-components/digitalReport.vue';
import {
    getBankInfo,
    applicationDetail,
    applicationInfo,
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
    send3plData,
    drbCreateLoan,
    getShopeeList,
    sentShopeeLoan,
    sentShopeeCredit,
    getProduct,
    ksbRiskPricing
} from '../../../api/index';
import { creditBefore, creditAfter, credits, getPfDataModel, shopreport } from '../../../api/boss1';
import { findAdditionalInformation } from '@/api/examine';

export default {
    name: 'loanAssitance-detail',
    components: {
        overview,
        riskDetail,
        applyinfo,
        achievementData,
        PFscoring,
        shopInfo,
        loaning,
        pfDataModel,
        shopeeShop,
        hf,
        fddContract,
        financialBindCard,
        newDetail,
        LogisticsInvoice,
        DigitalReport,
        // suppleInfo
    },
    data() {
        return {
            currencyType: '万元',
            bankInfo: {},
            checkTabLoading: false,
            loaningLoading: false,
            shopData: [],
            applicationStatus: '',
            dialogFormVisible: false, //授信审批
            dialogFormVisible2: false, //创建贷款
            rules: {
                creditApprovalTime: [{ required: true, message: '请选择授信批复时间', trigger: 'change' }],
                dates: [{ required: true, message: '请选择授信开始时间', trigger: 'change' }],
                creditAmount: [{ required: true, message: '请填写授信金额', trigger: 'blur' }],
                interestRate: [{ required: true, message: '请填写利率', trigger: 'blur' }],
                creditStatus: [{ required: true, message: '请选择状态', trigger: 'change' }]
            },
            rules2: {
                loanApplyDate: [{ required: true, message: '请选择时间', trigger: 'change' }],
                dates: [{ required: true, message: '请选择时间', trigger: 'change' }],
                loanPeriod: [{ required: true, message: '请填写期限', trigger: 'blur' }],
                loanAmount: [{ required: true, message: '请填写金额', trigger: 'blur' }],
                lenderProductId: [{ required: true, message: '请选择产品', trigger: 'blur' }],
                apr: [{ required: true, message: '请填写利率', trigger: 'blur' }],
                contractNumber: [{ required: false, message: '请填写合同编号', trigger: 'blur' }],
                guarantorFeeRate: [{ required: false, message: '请填写担保费率', trigger: 'blur' }],
                guarantorFee: [{ required: false, message: '请填写担保费用', trigger: 'blur' }],
                guarantorCompanyId: [{ required: false, message: '请选择担保公司', trigger: 'change' }]
            },
            form2: {
                loanApplyDate: '',
                loanStartDate: '',
                loanEndDate: '',
                loanPeriod: '',
                periodUnit: '',
                loanAmount: '',
                apr: '',
                contractNumber: '',
                guarantorFeeRate: '',
                guarantorFee: '',
                guarantorCompanyId: '',
                currency: '',
                dates: [],
                lenderProductId: ''
            },
            allweekLineChartData: {}, //给贷中用的最近六周数据
            form: {
                creditApprovalTime: '',
                creditStartDate: '',
                creditExpireDate: '',
                creditAmount: '',
                interestRate: '',
                creditStatus: '',
                currency: '',
                creditTerm: '',
                creditTermUnit: 'M',
                dates: []
            },
            loanLoading: false,
            showPage: false,
            activeIndex: '1',
            pageData: {},
            pfData: {},
            sanplData: [],
            shopreportData: {},
            loaningData: [],
            defaultOffer: {}, //传给 loanning组件 默认展示的offer
            pageInfo: {},
            scoringData: {},
            amazonData: [], // shopinfo 组件中 查询出来的offer数据
            titData: {},
            companyList: [],
            shopeeShopData: [], // 虾皮店铺数据
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
            currencyOptions: [
                {
                    value: 'CNY',
                    label: '人民币'
                },
                {
                    value: 'USD',
                    label: '美元'
                }
            ],
            dateDefaultValue: 'M',
            additionalInformation: [],
            paymentLockStatusTxt: {
                DOUBLE_LOCK: '双锁',
                LOCK: '单锁',
                UNLOCK: '无锁',
                AUTOMATED_REPAYMENTS: '自动扣款',
                null: '未知状态',
                '': '未知状态'
            }
        };
    },
    // watch:{
    //如果是直接改url单号访问
    //     '$route.query.loanNumber'(newV){
    //         this._getDetail()
    //     },
    // },
    mounted() {
        console.log(this.titData);
        console.log(this.$route.query, 'query');

    },
    watch: {
        'form.currency': {
            handler(newValue, oldValue) {
                if (newValue == 'USD') {
                    this.currencyType = '万美元';
                } else {
                    this.currencyType = '万元';
                }
            },
            deep: true
        },
        'form2.currency': {
            handler(newValue, oldValue) {
                if (newValue == 'USD') {
                    this.currencyType = '万美元';
                } else {
                    this.currencyType = '万元';
                }
            },
            deep: true
        }
    },
    activated() {
        if (this.titData.loanNumber !== this.$route.query.loanNumber) {
            this.activeIndex = '1';
            this.pageData = {};
            this.shopData = [];
            this.sanplData = [];
            this.loaningData = [];
            this._getDetail();
            this.amazonData = [];
        }

        if (['25', '48'].includes(this.$route.query.lenderId)) {
            this.activeIndex = '2';
        }
        if (this.$route.query.tag) {
            this.activeIndex = '15';
        }
        this.getAdditionalInformation()
    },
    methods: {
        //补充资料
        getAdditionalInformation() {
            findAdditionalInformation(this.$route.query.loanNumber).then((res) => {
                this.additionalInformation = res.data;
            });
        },
        changeSelectValue(v) {
            console.log(121111, v);
        },
        ksbRiskPricing() {
            ksbRiskPricing({ applicationCode: this.$route.query.loanNumber }).then((res) => {
                this.form.interestRate = res.data;
            });
        },
        _openApprove() {
            if (this.$route.query.lenderId == 25) {
                this.form.creditAmount = this.titData.creditAmount;
                //this.form.interestRate =15
                this.ksbRiskPricing();
            }
            if (this.$route.query.lenderId == 42) {
                this.form.creditAmount = this.titData.creditAmount;
                this.ksbRiskPricing();
            }

            this.dialogFormVisible = true;
        },
        _toLoanning(offer) {
            this.activeIndex = '6';
            this.loaningLoading = true;
            latestQuery3plList(this.$route.query.loanNumber).then((res) => {
                this.loaningData = res.data;
                console.log(this.loaningData, 'loaningData', 'loaningData');
                res.data.forEach((item, index) => {
                    if (item.offerId == offer) {
                        this.defaultOffer = item;
                        item.tabIndex = index;
                    }
                });
                this.loaningLoading = false;
            });
        },
        toLoanPage() {
            this.$router.push({
                path: '/loanPage',
                query: {
                    loanNumber: this.$route.query.loanNumber,
                    userId: this.$route.query.userId
                }
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
        _received1st() {
            this.$confirm('是否确定初核通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'primary'
            }).then(() => {
                received1st({
                    applicationId: this.$route.query.id
                }).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '初核通过!'
                    });
                    this._getDetail();
                });
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
                pushApplication({
                    applicationId: this.$route.query.id
                }).then((res) => {
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
                this.companyList = res.data;
                shopreport(this.$route.query.loanNumber).then((re) => {
                    this.shopreportData = re.data.riskReportV3ShopScore || {};
                    this.allweekLineChartData = re.data || {};
                });
            });

            applicationInfo(this.$route.query.loanNumber).then((res) => {
                localStorage.setItem('bcCreditcode', res.data.companyVo.bcCreditcode);
                localStorage.setItem('bPhoneNumber', res.data.companyBorrowerVo.bPhoneNumber);
                localStorage.setItem('bCardId', res.data.companyBorrowerVo.bCardId);
                localStorage.setItem('bcName', res.data.companyVo.bcName);
                localStorage.setItem('bcName', res.data.companyVo.bcName);
                localStorage.setItem('bName', res.data.companyBorrowerVo.bName);
                this.pageInfo = JSON.parse(JSON.stringify(res.data));
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
                    item.paymentLockStatus = this.paymentLockStatusTxt[item.paymentLockStatus]
                });

                credits(this.$route.query.loanNumber).then((re) => {
                    re.data.forEach((it) => {
                        it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                        res.data.forEach((item) => {
                            it.applicationStatus = it.offerId == item.offerId ? item.applicationStatus : it.applicationStatus;
                            it.accountLockStatus = it.offerId == item.offerId ? item.accountLockStatus : it.accountLockStatus;
                        });
                    });
                    // console.log(re.data);
                    // console.log(res.data);
                    this.amazonData = re.data;
                });
                this.shopData = res.data;
            });
            this.form.applicationId = this.$route.query.id;
            this.form2.applicationId = this.$route.query.id;
            this.titData = this.$route.query;
            console.log(this.titData, 'titData');
            applicationDetail(this.$route.query.loanNumber).then((res) => {
                console.log('惠民保理', '惠民保理');
                if (res.data.lenderName == '惠民保理') {
                    getBankInfo(this.$route.query.userId).then((res) => {
                        this.bankInfo = res.data;
                    });
                } else {
                    this.bankInfo = {};
                }
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
                if (this.pageData.lenderName != '惠民保理') {
                    this.rules2.loanApplyDate[0].required = true;
                } else {
                    this.rules2.loanApplyDate[0].required = false;
                }
                // 接口返回数据后再显示
                this.showPage = true;
            });
            getProduct(this.titData.lenderId).then((res) => {
                this.titData.product = res.data;
            });
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
                    item.paymentLockStatus = this.paymentLockStatusTxt[item.paymentLockStatus]
                });

                credits(this.$route.query.loanNumber).then((re) => {
                    re.data.forEach((it) => {
                        it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                        res.data.forEach((item) => {
                            it.applicationStatus = it.offerId == item.offerId ? item.applicationStatus : it.applicationStatus;
                            it.accountLockStatus = it.offerId == item.offerId ? item.accountLockStatus : it.accountLockStatus;
                        });
                    });
                    // console.log(re.data);
                    // console.log(res.data);
                    this.amazonData = re.data;
                });
                this.shopData = res.data;
            });
        },
        //创建贷款
        _createLoan() {
            console.log(11122233, this.dateDefaultValue);
            if (this.form2.loanAmount > 5000) {
                return this.$message.error('贷款金额不能大于5000万,请确认金额是否正确');
            }
            this.$refs.form2.validate((valid) => {
                if (valid) {
                    // this.form.creditAmount=Number(this.form.creditAmount)
                    if (this.pageData.lenderName != '惠民保理') {
                        this.form2.loanStartDate = this.form2.dates[0];
                        this.form2.loanEndDate = this.form2.dates[1];
                    }

                    this.form2.applicationCode = this.$route.query.loanNumber;
                    this.form2.periodUnit = this.dateDefaultValue;
                    let formD = new FormData();
                    Object.keys(this.form2).forEach((key) => {
                        if (key == 'loanAmount' && this.pageData.lenderName == '惠民保理') {
                            formD.append('loanAmount', this.form2.loanAmount * 10000);
                        } else {
                            formD.append(key, this.form2[key]);
                        }
                    });
                    this.loanLoading = true;
                    if (this.pageData.lenderName == '惠民保理') {
                        formD.append('periodUnit', 'M');
                        formD.append('lenderProductId', 72);

                        drbCreateLoan(formD)
                            .then((res) => {
                                this.$message.success('提交成功');
                                this.dialogFormVisible2 = false;
                                this._getDetail();
                                this.loanLoading = false;
                            })
                            .catch((err) => {
                                this.loanLoading = false;
                            });
                    } else {
                        createLoan(formD)
                            .then((res) => {
                                this.$message.success('提交成功');
                                // 虾皮推送
                                if (this.$route.query.lenderId === '25') {
                                    sentShopeeLoan({ userId: this.$route.query.userId, loanCode: res.data.loanCode }).then((_) => { });
                                }
                                this.dialogFormVisible2 = false;
                                this._getDetail();
                                this.loanLoading = false;
                            })
                            .catch((err) => {
                                this.loanLoading = false;
                            });
                    }
                } else {
                    return false;
                }
            });
        },
        // 授信审批
        _approve() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.creditAmount = Number(this.form.creditAmount);
                    this.form.interestRate = Number(this.form.interestRate);
                    this.form.creditStartDate = this.form.dates[0];
                    this.form.creditExpireDate = this.form.dates[1];
                    this.form.creditTermUnit = this.dateDefaultValue;

                    let formD = new FormData();
                    Object.keys(this.form).forEach((key) => {
                        formD.append(key, this.form[key]);
                    });

                    console.log(333, this.form.creditTermUnit);
                    approve(formD).then((res) => {
                        this.$message.success('提交成功');
                        // 虾皮推送
                        if (this.$route.query.lenderId === '25') {
                            sentShopeeCredit({ userId: this.$route.query.userId }).then((_) => { });
                        }
                        this.dialogFormVisible = false;
                        this._getDetail();
                    });
                } else {
                    return false;
                }
            });
        },
        handleSelect(key, keypath) {
            this.checkTabLoading = true;
            this.activeIndex = keypath[0];
            if (this.activeIndex == 3) {
                // 业绩数据 3PL
                creditBefore(this.$route.query.loanNumber)
                    .then((res) => {
                        this.sanplData = res.data;
                        console.log(sanplData, 'sanplData', 'sanplData');
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
                        this.checkTabLoading = false;
                    });
            } else if (this.activeIndex == 4) {
                // 浦发模型
                scoring(this.$route.query.loanNumber)
                    .then((res) => {
                        this.scoringData = res.data;
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
                        this.checkTabLoading = false;
                    });
            } else if (this.activeIndex == 5) {
                shopInfoF(this.$route.query.loanNumber)
                    .then((res) => {
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
                            item.paymentLockStatus = this.paymentLockStatusTxt[item.paymentLockStatus]
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
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
                        this.checkTabLoading = false;
                    });
            } else if (this.activeIndex == 6) {
                latestQuery3plList(this.$route.query.loanNumber)
                    .then((res) => {
                        this.loaningData = res.data;
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
                        this.checkTabLoading = false;
                    });
            } else if (this.activeIndex == 7) {
                getPfDataModel(this.$route.query.loanNumber)
                    .then((res) => {
                        this.pfData = res.data;
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
                        this.pfData = {};
                        this.checkTabLoading = false;
                    });
            } else {
                this.checkTabLoading = false;
            }
        },
        toAchievement() {
            // 业绩数据 3PL
            this.activeIndex = 3;
            query3plList(this.$route.query.loanNumber).then((res) => {
                this.sanplData = res.data;
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
