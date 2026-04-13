<template>
    <div v-if="showPage">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
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
                            <span class="grid-num3" v-if="titData.creditAmount">{{ creditAmountTop }}万</span>
                            <el-tag effect="plain" class="el-tag">{{ applicationStatus }}</el-tag>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 24px">
                <el-card shadow="hover" :body-style="{ padding: '0px', height: '60px' }">
                    <div class="grid-content grid-con-1" style="display: flex">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" style="width: 92%" mode="horizontal"
                            @select="handleSelect" active-text-color="#fe1964">
                            <el-menu-item index="1">{{ $t('loan_detail_gl') }}</el-menu-item>
                            <el-menu-item index="2">{{ $t('loan_detail_sqxx') }}</el-menu-item>
                            <el-menu-item index="5">{{ $t('loan_detail_dpxx') }}</el-menu-item>
                            <el-menu-item index="3">{{ $t('loan_detail_dqpl') }}</el-menu-item>
                            <el-menu-item index="6">{{ $t('loan_detail_dzjk') }}</el-menu-item>
                            <el-menu-item index="7" v-if="pageData.lenderName.includes('浦发')">{{ $t('loan_detail_zfbg')
                                }}</el-menu-item>
                            <el-menu-item index="8" v-if="$route.query.lenderId === '25'">{{ $t('loan_detail_xpdp')
                                }}</el-menu-item>
                            <!-- <el-menu-item index="4" v-if="scoringData && scoringData.length ">浦发模型报告</el-menu-item> -->
                        </el-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div v-loading="checkTabLoading">
            <overview :pageData="pageData" @toAchievement="toAchievement" :shopreportData="shopreportData"
                v-if="activeIndex == 1" @refreshDetail="_getDetail" @toLoanning="_toLoanning" />
            <!-- <applyinfo :pageInfo='pageInfo'  v-show="activeIndex==2" /> -->
            <applyinfo :pageInfo="pageInfo" v-if="activeIndex == 2" @refreshDetail="_getDetail" :bankInfo="bankInfo" />
            <shopInfo :pageData="shopData" v-show="activeIndex == 5" @refreshDetail="_getDetail"
                :amazonData="amazonData" @openCreditInfo="dialogFormVisible = true" :userId="$route.query.userId" />
            <achievementData v-if="activeIndex == 3" :sanplData="sanplData" />
            <div v-loading="loaningLoading">
                <loaning :allweekLineChartData="allweekLineChartData" v-show="activeIndex == 6" :sanplData="loaningData"
                    :shopData="pageData.applicationOfferVoList" :defaultOffer="defaultOffer" />
            </div>
            <shopeeShop :pageData="shopeeShopData" v-if="activeIndex == 8" />
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
                <el-form-item label="授信金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.creditAmount" type="number" autocomplete="off" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="利率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.interestRate" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="form.creditStatus" label="ACTIVE">生效中</el-radio>
                    <el-radio v-model="form.creditStatus" label="CLOSED">已失效</el-radio>
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
                    <el-date-picker v-model="form2.dates" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="贷款时间" style="margin-right: 30px" prop="loanApplyDate" v-else>
                    <el-date-picker v-model="form2.loanStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款期限" style="margin-right: 30px" prop="loanPeriod">
                    <el-input v-model="form2.loanPeriod" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">月</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="贷款金额" style="margin-right: 30px" prop="loanAmount">
                    <el-input v-model="form2.loanAmount" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="利率" style="margin-right: 30px" prop="apr">
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
                    <el-select v-model="form2.guarantorCompanyId" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in companyList" :key="item.id" :label="item.gcName" :value="item.id">
                        </el-option>
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

        <div class="end">版权所有© 2021 豆沙包科技有限公司 沪ICP备15015443号-1</div>
    </div>
</template>

<script>
import overview from '../../common/detail-components/overview.vue';
import applyinfo from '../../common/detail-components/applyInfo.vue';
import achievementData from '../../common/detail-components/achievementData.vue';
import PFscoring from '../../common/detail-components/PFscoring.vue';
import shopInfo from '../../common/detail-components/shopInfo.vue';
import loaning from '../../common/detail-components/loaning.vue';
import pfDataModel from '../../common/detail-components/pfDataModel.vue';
import shopeeShop from '../../common/detail-components/shopee-shop.vue';

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
    sentShopeeCredit
} from '../../../api/index';
import { creditBefore, creditAfter, credits, getPfDataModel, shopreport } from '../../../api/boss1';
export default {
    name: 'minecraft-detail',
    components: {
        overview,
        applyinfo,
        achievementData,
        PFscoring,
        shopInfo,
        loaning,
        pfDataModel,
        shopeeShop
    },
    data() {
        return {
            creditAmountTop: '', //金额
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
                loanAmount: '',
                apr: '',
                contractNumber: '',
                guarantorFeeRate: '',
                guarantorFee: '',
                guarantorCompanyId: '',
                dates: []
            },
            allweekLineChartData: {}, //给贷中用的最近六周数据
            form: {
                creditApprovalTime: '',
                creditStartDate: '',
                creditExpireDate: '',
                creditAmount: '',
                interestRate: '',
                creditStatus: '',
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
            ]
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
            this.activeIndex = '1';
            this.pageData = {};
            this.shopData = [];
            this.sanplData = [];
            this.loaningData = [];
            this._getDetail();
            this.amazonData = [];
        }
    },
    methods: {
        _toLoanning(offer) {
            this.activeIndex = '6';
            this.loaningLoading = true;
            latestQuery3plList(this.$route.query.loanNumber).then((res) => {
                this.loaningData = res.data;
                res.data.forEach((item, index) => {
                    if (item.offerId == offer) {
                        // this.defaultOffer = item;
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
                    loanNumber: this.$route.query.loanNumber
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
        // 2
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
                    item.paymentLockStatus =
                        item.paymentLockStatus == 'DOUBLE_LOCK' ? '双锁' : item.paymentLockStatus == 'LOCK' ? '单锁' : '无锁';
                });

                credits(this.$route.query.loanNumber).then((re) => {
                    re.data.forEach((it) => {
                        it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                        var appCode = this.$route.query.loanNumber;
                        var appPreCode = appCode.substr(0, 2);
                        var currency = '¥';
                        if (appPreCode === 'US') {
                            currency = '$';
                        }

                        this.creditAmountTop = currency + Number(it.resourceAmount);

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
            applicationDetail(this.$route.query.loanNumber).then((res) => {
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
                console.log(res.data.loanVoList);
                this.pageData = res.data;
                if (this.pageData.lenderName != '惠民保理') {
                    this.rules2.loanApplyDate[0].required = true;
                } else {
                    this.rules2.loanApplyDate[0].required = false;
                }
                // 接口返回数据后再显示
                this.showPage = true;
            });
        },
        //创建贷款
        _createLoan() {
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
                    let formD = new FormData();
                    Object.keys(this.form).forEach((key) => {
                        formD.append(key, this.form[key]);
                    });
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
                            item.paymentLockStatus =
                                item.paymentLockStatus == 'DOUBLE_LOCK' ? '双锁' : item.paymentLockStatus == 'LOCK' ? '单锁' : '无锁';
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
            } else if (this.activeIndex == 8) {
                getShopeeList({ userId: this.$route.query.userId })
                    .then((res) => {
                        this.shopeeShopData = res.data;
                        this.checkTabLoading = false;
                    })
                    .catch((error) => {
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
