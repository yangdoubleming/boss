<template>
    <div v-if="showPage">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                     alt />{{ $t('common_dsb') }}
                /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="title-box" style="align-items: center">
                        <div class="left">
                            <span class="grid-num">{{ titData.loanNumber }}</span>
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
                                       v-if="applicationStatus === '已创建' && $showBtn('US_SUBMIT_LOAN')">{{ $t('common_submit')
                                }}</el-button>

                            <el-button type="success" @click="openActive" v-if="applicationStatus === '已提交'">审批
                            </el-button>
                            <el-button type="success" @click="openFile" v-if="pageData.creditContractPath">查看文件
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 24px">
                <el-card shadow="hover" :body-style="{ padding: '0px', height: '60px' }">
                    <div class="grid-content grid-con-1">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                                 @select="handleSelect" active-text-color="#409EFF">
                            <el-menu-item index="1" v-if="!['48', '59'].includes($route.query.lenderId)">{{
                                    $t('loan_detail_gl')
                                }}</el-menu-item>
                            <el-menu-item index="2">{{ $t('loan_detail_sqxx') }}</el-menu-item>
                            <el-menu-item index="5" v-if="!['48', '59'].includes($route.query.lenderId)">{{
                                    $t('loan_detail_dpxx')
                                }}</el-menu-item>
                            <el-menu-item index="3" v-if="!['48', '59'].includes($route.query.lenderId)">{{
                                    $t('loan_detail_dqpl')
                                }}</el-menu-item>
                            <el-menu-item index="6" v-if="!['48', '59'].includes($route.query.lenderId)">{{
                                    $t('loan_detail_dzjk')
                                }}</el-menu-item>
                            <!-- <el-menu-item index="4" v-if="scoringData && scoringData.length ">浦发模型报告</el-menu-item> -->
                        </el-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <usoverview :pageData="pageData" @toAchievement="toAchievement" v-if="activeIndex == 1"
                    @refreshDetail="_getDetail" @toLoanning="_toLoanning" :shopreportData="shopreportData" />

        <kys-applyInfo :reEditBank="reEditBank" :pageInfo="pageInfo" v-if="activeIndex == 2" @refreshDetail="_getDetail"
                       :bInfo="pageData" :userAndCompanyInfo="userAndCompanyInfo" />
        <shopInfo @refreshDetail="_getDetail" :pageData="shopData" v-if="activeIndex == 5" :amazonData="amazonData"
                  :lenderDataReturnType="pageData.lenderDataReturnType" />
        <usAchievementData v-if="activeIndex == 3" :sanplData="sanplData" :defaultOffer="{}" />
        <div v-loading="loaningLoading">
            <usLoaning v-if="activeIndex == 6" :allweekLineChartData="allweekLineChartData" :sanplData="loaningData"
                       :shopData="pageData.applicationOfferVoList" :defaultOffer="{}" />
        </div>

        <el-dialog title="审批" :visible.sync="dialogFormVisible2" width="30%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                     label-position="left">
                <el-form-item label="授信起始日期" style="margin-right: 30px" prop="dates">
                    <el-date-picker v-model="activeTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审批结果" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="creadit" label="APPROVED">通过</el-radio>
                    <el-radio v-model="creadit" label="REJECTED">拒绝</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible2 = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_active" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>

        <PFscoring v-if="activeIndex == 4 && scoringData && scoringData.length" :scoringData="scoringData" />
    </div>
</template>

<script>
import usoverview from '../../common/detail-components/us-overview.vue';
import kysApplyInfo from '../../common/detail-components/kys-applyInfo.vue';
import usAchievementData from '../../common/detail-components/us-achievementData.vue';
import PFscoring from '../../common/detail-components/PFscoring.vue';
import shopInfo from '../../common/detail-components/us-shopInfo.vue';
import usLoaning from '../../common/detail-components/us-loaning.vue';
import { creditBefore, creditAfter, dhfqCredits, shopreport, credits } from '../../../api/boss1';
import { activateCredit } from '../../../api/dhfq';
import {
    paymentInfo,
    approveDollar,
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
    submitDollar,
    activeDollar,
    userBank,
    saveFileUrl
} from '../../../api/index';

export default {
    name: 'minecraft-detail',
    components: {
        usoverview,
        kysApplyInfo,
        usAchievementData,
        PFscoring,
        shopInfo,
        usLoaning
    },
    data() {
        return {
            allweekLineChartData: {},
            creadit: '',
            pdfFile: '',
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            reEditBank: false,
            activeTime: '',
            shopreportData: {},
            shopData: [],
            applicationStatus: '',
            dialogFormVisible: false, //授信审批
            dialogFormVisible2: false, // 激活授信

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
            defaultOffer: {}
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
            this.activeTime = '';
            this.creadit = '';
        }
        if (['25', '48', '59'].includes(this.$route.query.lenderId)) {
            this.activeIndex = '2';
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
        // _approve() {
        //     this.form.applicationCode = this.$route.query.loanNumber;
        //     approveDollar(this.form).then((res) => {
        //         this.$message.success('操作成功！');
        //         this.dialogFormVisible = false;
        //         this._getDetail()
        //     });
        // },
        // _approveDollar() {
        //     this.dialogFormVisible = true;
        // },
        openActive() {
            this.dialogFormVisible2 = true;
        },

        _active() {
            if (!this.activeTime) {
                this.$message.warning('请选择时间');
                return;
            }
            if (!this.creadit) {
                this.$message.warning('请选择审批结果');
                return;
            }
            activateCredit({
                applicationCode: this.$route.query.loanNumber,
                creditStartDate: this.activeTime,
                applicationStatus: this.creadit
            }).then((res) => {
                this.$message.success('操作成功！');
                this.dialogFormVisible2 = false;
                this._getDetail();
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

            applicationInfo(this.$route.query.loanNumber).then((res) => {
                this.userAndCompanyInfo = JSON.parse(JSON.stringify(res.data));
                paymentInfo(res.data.companyBorrowerVo.userId).then((res2) => {
                    userBank(res.data.companyBorrowerVo.userId).then((res3) => {
                        res3.data.userId = res.data.companyBorrowerVo.userId;
                        this.reEditBank = res3.data.bankName ? true : false;
                        this.pageInfo = JSON.parse(JSON.stringify(Object.assign(res2.data, res3.data)));
                    });
                });
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
                    if (item.availableStatus) {
                        if (item.availableStatus == 'AVAILABLE') {
                            item.availableStatus = '已激活';
                        } else {
                            item.availableStatus = '未激活';
                        }
                    }
                });
                if (this.pageData.lenderDataReturnType == 'BEFORE_CREDIT') {
                    dhfqCredits(this.$route.query.loanNumber).then((re) => {
                        re.data.forEach((it) => {
                            it.year1SalesValue = (it.year1SalesValue / 10000).toFixed(2);
                            res.data.forEach((item) => {
                                it.applicationStatus = it.offerId == item.offerId ? item.applicationStatus : it.applicationStatus;
                                it.accountLockStatus = it.offerId == item.offerId ? item.accountLockStatus : it.accountLockStatus;
                            });
                        });

                        this.amazonData = re.data;
                    });
                } else {
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
                }
                this.shopData = res.data;
            });

            this.form2.applicationId = this.$route.query.id;
            this.titData = this.$route.query;
            applicationDetail(this.$route.query.loanNumber).then((res) => {
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
        }
    }
};
</script>

<style lang="less" scoped>
.end {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
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
            color: #409EFF;
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
