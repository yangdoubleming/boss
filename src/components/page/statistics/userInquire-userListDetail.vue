<template>
    <!-- 用户查询-用户列表详情 -->
    <div class="userInquire-userListDetail">
        <!-- <div class="top">
            <div class="top-L">
                <img src="../../../assets/top-L.png" />
            </div>
            <div class="top-R">
                <img src="../../../assets/top-R.png" />
            </div>
        </div> -->
        <!-- 页面头部标题 -->
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: #9a9a9a; font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png"
                    style="width: 17px; height: 17px; margin-right: 5px; margin-left: 20px" alt />{{ $t('common_dsb') }}
                /<span style="color: black">查询管理/用户详情</span>
            </div>
        </div>
        <!-- 客户名称 -->
        <div class="username">客户名称：{{ allUserDetail.userName }}</div>
        <!-- tabs栏 -->
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
                <!-- 基本信息页面 -->
                <div class="kongxi"></div>
                <div class="main">
                    <div class="main-hang1">个人信息</div>
                    <!-- 第二行到第四行的信息 -->
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">名称：</div>
                            <div class="main-hang2-L-2">{{ allUserDetail.userName }}</div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">邮箱：</div>
                            <div class="main-hang2-R-2">{{ allUserDetail.email }}</div>
                        </div>
                    </div>
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">身份证号：</div>
                            <div class="main-hang2-L-2">{{ allUserDetail.idCard }}</div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">地址：</div>
                            <div class="main-hang2-R-2">{{ allUserDetail.address }}</div>
                        </div>
                    </div>
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">手机号：</div>
                            <div class="main-hang2-L-2">{{ allUserDetail.phone }}</div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">婚姻情况：</div>
                            <div class="main-hang2-R-2">{{ allUserDetail.marriage }}</div>
                        </div>
                    </div>
                    <!-- 第五行 -->
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">身份证正面照：</div>
                            <div class="main-hang2-L-2">
                                <el-link type="primary" v-if="allUserDetail.idCardFrontPath"
                                    @click="openImg(allUserDetail.idCardFrontPath)" style="margin-right: 30px">{{
                        $t('loan_detail_zmtp') }}</el-link>
                                <!-- <img :src="allUserDetail.idCardFrontPath" /> -->
                            </div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">身份证背面照：</div>
                            <!-- <div class="main-hang5-R-1 ">身份证背面照：</div> -->
                            <div class="main-hang2-R-2">
                                <!-- <img :src="allUserDetail.idCardBackPath" /> -->
                                <el-link type="primary" v-if="allUserDetail.idCardBackPath"
                                    @click="openImg(allUserDetail.idCardBackPath)"
                                    style="margin-right: 30px">背面图片.png</el-link>
                            </div>
                        </div>
                    </div>
                    <!-- 第六行之后的信息 -->
                    <div class="main-hang1">企业信息</div>
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">企业名称：</div>
                            <div class="main-hang2-L-2">{{ allUserDetail.companyName }}</div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">{{ $t('loan_detail_qyfr') }}：</div>
                            <div class="main-hang2-R-2">{{ allUserDetail.legalPerson }}</div>
                        </div>
                    </div>
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">{{ $t('loan_detail_tyshxydm') }}：</div>
                            <div class="main-hang2-L-2">{{ allUserDetail.creditCode }}</div>
                        </div>
                        <div class="main-hang2-R">
                            <div class="main-hang2-R-1">地址：</div>
                            <div class="main-hang2-R-2">{{ allUserDetail.companyAddress }}</div>
                        </div>
                    </div>
                    <div class="main-hang2">
                        <div class="main-hang2-L">
                            <div class="main-hang2-L-1">营业执照：</div>
                            <div class="main-hang2-L-2">
                                <!-- <img :src="allUserDetail.businesslicensePath" /> -->
                                <el-link type="primary" v-if="allUserDetail.businesslicensePath"
                                    @click="openImg(allUserDetail.businesslicensePath)"
                                    style="margin-right: 30px">营业执照图片.png</el-link>
                            </div>
                        </div>
                        <!-- <div class="main-hang5-R">
                            <div class="main-hang5-R-1"></div> -->
                        <!-- <div class="main-hang5-R-2">
                <img src="../../../assets/top-R.png">
              </div> -->
                        <!-- </div> -->
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="贷款业务" name="second">
                <!-- 贷款业务界面 -->
                <div class="kongxi"></div>
                <div class="daikuanyewu-item1">
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">累计放款GMV</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.loanAmountSum }}万</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">有效授信额度</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.creditAmount }}万</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">件均</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.loanAmountAvg }}万</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">可支用余额</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.availableAmount }}万</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">在贷金额</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.loanBalance }}万</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">在贷笔数</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.loanCount }}笔</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">是否逾期</div>
                        <div class="daikuanyewu-item1-1-B">{{ allLoanDetail.overdue }}</div>
                    </div>
                </div>
                <div class="daikuanyewu-title">授信列表</div>
                <!-- 授信列表表格 -->
                <div class="daikuanyewu-table">
                    <el-table :data="allLoanDetail.creditVoList" style="width: 97.5%"
                        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
                        <el-table-column v-if="false" prop="applicationCode" label="申请单号" min-width="10%">
                        </el-table-column>
                        <el-table-column v-if="false" prop="creditApprovalTime" label="授信通过时间" min-width="10%">
                        </el-table-column>
                        <el-table-column v-if="false" prop="contractNumber" label="合同编号" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="creditCode" label="授信编号" min-width="10%"> </el-table-column>
                        <el-table-column prop="creditDate" label="授信日期" min-width="10%"> </el-table-column>
                        <el-table-column prop="lenderName" label="资方" min-width="10%"> </el-table-column>
                        <el-table-column prop="creditAmount" label="授信金额/万" min-width="10%"> </el-table-column>
                        <el-table-column prop="interestRate" label="利率%" min-width="10%"> </el-table-column>
                        <el-table-column prop="creditStatus" label="授信状态" min-width="10%"> </el-table-column>
                        <el-table-column prop="creditStartDate" label="授信开始时间" min-width="10%"> </el-table-column>
                        <el-table-column prop="creditEndDate" label="授信结束日期" min-width="10%"> </el-table-column>
                        <el-table-column prop="name" label="操作" min-width="10%">
                            <template slot-scope="scope">
                                <el-button class="table-button" @click="goCredit(scope.row)"
                                    type="info">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="daikuanyewu-title">贷款列表</div>
                <!-- 贷款列表表格 -->
                <div class="daikuanyewu-table">
                    <el-table :data="allLoanDetail.loanVoList" style="width: 97.5%"
                        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
                        <el-table-column prop="loanCode" label="贷款编号" min-width="10%"> </el-table-column>
                        <el-table-column prop="loanDate" label="贷款日期" min-width="10%"> </el-table-column>
                        <el-table-column prop="lenderName" label="资方" min-width="10%"> </el-table-column>
                        <el-table-column prop="productName" label="产品" min-width="10%"> </el-table-column>
                        <el-table-column prop="loanAmount" label="贷款金额/万" min-width="10%"> </el-table-column>
                        <el-table-column prop="interestRate" label="利率%" min-width="10%"> </el-table-column>
                        <el-table-column prop="term" label="期限" min-width="10%"> </el-table-column>
                        <el-table-column prop="loanStatus" label="贷款状态" min-width="10%"> </el-table-column>
                        <el-table-column prop="loanStartDate" label="贷款开始日期" min-width="10%"> </el-table-column>
                        <el-table-column prop="loanEndDate" label="贷款结束日期" min-width="10%"> </el-table-column>
                        <el-table-column v-if="false" prop="applicationCode" label="申请单号" min-width="10%">
                        </el-table-column>
                        <el-table-column v-if="false" prop="contractNumber" label="合同编号" min-width="10%">
                        </el-table-column>
                        <el-table-column v-if="false" prop="loanApplyDate" label="贷款通过时间" min-width="10%">
                        </el-table-column>
                        <el-table-column v-if="false" prop="loanClearDate" label="贷款结清时间" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="name" label="操作" min-width="10%">
                            <template slot-scope="scope">
                                <el-button class="table-button" @click="goLoan(scope.row)" type="info">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="保险业务" name="third">
                <!-- 保险业务界面 -->
                <div class="kongxi"></div>
                <div class="daikuanyewu-item1">
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">累计投保GMV</div>
                        <div class="daikuanyewu-item1-1-B">{{ allInsureDetail.insuranceAmountSum }}</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">在保金额</div>
                        <div class="daikuanyewu-item1-1-B">{{ allInsureDetail.insuranceAmount }}</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">在保笔数</div>
                        <div class="daikuanyewu-item1-1-B">{{ allInsureDetail.insuranceCount }}</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">保费件均</div>
                        <div class="daikuanyewu-item1-1-B">{{ allInsureDetail.insuranceAmountAvg }}</div>
                    </div>
                    <div class="daikuanyewu-item1-1">
                        <div class="daikuanyewu-item1-1-T">投保状态</div>
                        <div class="daikuanyewu-item1-1-B">{{ allInsureDetail.insuranceStatus }}</div>
                    </div>
                </div>
                <div class="daikuanyewu-title">投保记录</div>
                <!-- 投保记录表格 -->
                <div class="daikuanyewu-table">
                    <el-table :data="allInsureDetail.insuranceVoList" style="width: 97.5%"
                        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
                        <el-table-column prop="orderNo" label="订单编号" min-width="10%"> </el-table-column>
                        <el-table-column prop="orderSource" label="订单来源" min-width="10%"> </el-table-column>
                        <el-table-column prop="platform" label="电商平台" min-width="10%"> </el-table-column>
                        <el-table-column prop="insuranceCompanyName" label="保险公司" min-width="10%"> </el-table-column>
                        <el-table-column prop="insuranceEnterprise" label="被保企业" min-width="10%"> </el-table-column>
                        <el-table-column prop="insuranceAmount" label="保费/元" min-width="10%"> </el-table-column>
                        <el-table-column prop="insuranceDate" label="保险起期" min-width="10%"> </el-table-column>
                        <el-table-column prop="orderMode" label="出单模式" min-width="10%"> </el-table-column>
                        <el-table-column prop="policyStatus" label="保单状态" min-width="10%"> </el-table-column>
                        <el-table-column prop="orderDate" label="下单时间" min-width="10%"> </el-table-column>
                        <el-table-column prop="insuranceRenewal" label="是否续保" min-width="10%"> </el-table-column>
                        <el-table-column prop="name" label="操作" min-width="10%">
                            <template slot-scope="scope">
                                <el-button class="table-button" @click="goDetail(scope.row)"
                                    type="info">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="店铺情况" name="fourth">
                <!-- 店铺情况界面 -->
                <!-- 按钮组 -->
                <div v-if="activeName == 'fourth'">
                    <achievementData :sanplData="sanplData" :defaultOffer="defaultOffer"
                        :allweekLineChartData="allweekLineChartData" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { getUseDetail, getUserLoan, getUsreInsurance, getUserShop } from '../../../api/loanDataBoard';
import achievementData from '../../common/detail-components/achievementData3.0.vue';
import { creditAfterWeekDataV2 } from '@/api/boss1';
export default {
    components: {
        achievementData
    },
    data() {
        return {
            allweekLineChartData: {}, //给贷中用的最近六周数据
            defaultOffer: {},
            allUserDetail: {}, //基本信息
            allLoanDetail: {}, //贷款业务
            allInsureDetail: {}, //保险业务
            sanplData: [],
            activeName: 'first',
            // 按钮变色
            currentIndex: 0, //当前按钮
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL
            // 各个按钮文字内容
            //用户{{$t('loan_detail_sqxx') }}
        };
    },
    mounted() {
        this.getUserDetail();
        this.getUserDetailData();
        this.getUserInsureDetailData();
        this.getUserShopData();
    },
    methods: {
        openImg(url) {
            if (url.includes('http')) {
                window.open(url);
            } else {
                window.open(this.imgsBaseUrl + url);
            }
        },
        //获取{{$t('loan_detail_sqxx') }}
        getUserShopData() {
            getUserShop({ userId: this.$route.query.userId }).then((res) => {
                this.sanplData = res.data;
            });
            creditAfterWeekDataV2(this.$route.query.userId).then((res) => {
                this.allweekLineChartData = res.data || {};
            });
        },
        //获取用户详情信息1
        getUserDetail() {
            let userId = this.$route.query.userId;
            getUseDetail({ userId }).then((res) => {
                if (res.data) {
                    res.data.idCardFrontPath = ' https://lendingapi.dowsure.com/dowsure-file' + res.data.idCardFrontPath;
                    res.data.idCardBackPath = ' https://lendingapi.dowsure.com/dowsure-file' + res.data.idCardBackPath;
                    res.data.businesslicensePath = ' https://lendingapi.dowsure.com/dowsure-file' + res.data.businesslicensePath;
                    this.allUserDetail = res.data;
                }
            });
            console.log(this.allUserDetail, 'ffgr');
        },
        //获取用户贷款信息
        getUserDetailData() {
            let userId = this.$route.query.userId;
            getUserLoan({ userId }).then((res) => {
                if (res.data) {
                    this.allLoanDetail = res.data;
                    if (this.allLoanDetail.overdue == false) {
                        this.allLoanDetail.overdue = '否';
                    } else if (this.allLoanDetail.overdue == true) {
                        this.allLoanDetail.overdue = '是';
                    }

                    this.allLoanDetail.creditVoList.forEach((item, index) => {
                        item.creditDate = item.creditDate.split(' ')[0];
                        item.creditEndDate = item.creditEndDate.split(' ')[0];
                        item.creditStartDate = item.creditStartDate.split(' ')[0];
                    });
                    this.allLoanDetail.loanVoList.forEach((item, index) => {
                        item.loanDate = item.loanDate.split(' ')[0];
                        item.loanStartDate = item.loanStartDate.split(' ')[0];
                        item.loanEndDate = item.loanEndDate.split(' ')[0];
                    });
                }
            });
        },
        //获取用户保险业务
        getUserInsureDetailData() {
            let account = this.$route.query.phone;
            getUsreInsurance({ account }).then((res) => {
                if (res.data) {
                    this.allInsureDetail = res.data;
                }
            });
        },
        //去授信列表的查看详情
        goCredit(row) {
            row.creditExpireDate = row.creditEndDate;
            row.creditCode = row.creditCode;
            row.creditApprovalTime = row.creditApprovalTime.split(' ')[0];
            this.$router.push({
                path: '/credit-detail',
                query: {
                    //携带参数
                    data: row
                }
            });
        },
        //去贷款列表的查看详情
        goLoan(row) {
            row.apr = row.interestRate;
            row.loanPeriod = row.term;
            // row.loanStartDate = row.loanStartDate.split(' ')[0];
            // row.loanApplyDate = row.loanApplyDate.split(' ')[0];
            // row.loanClearDate = row.loanClearDate.split(' ')[0];
            // row.loanEndDate = row.loanEndDate.split(' ')[0];
            this.$router.push({
                path: '/loan-detail',
                query: {
                    //携带参数
                    data: row
                }
            });
        }
    },

    watch: {},
    cteated() { },

    computed: {}
};
</script>
<style lang="scss" scoped>
.userInquire-userListDetail {
    .top {
        padding-right: 20px;
        display: flex;
        background-color: white;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // border: 1px solid red;
        height: 40px;
    }

    .username {
        height: 60px;
        font-size: 15px;
        font-weight: 600;
        width: 95.7%;
        border: 1px solid rgb(199, 199, 199);
        background-color: white;
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-left: 25px;
    }

    .el-tabs {
        width: 97%;
        margin-top: 20px;
        margin-left: 25px;
        background-color: white;
    }

    .kongxi {
        width: 100%;
        height: 20px;
        background-color: rgb(238, 238, 238);
    }

    .main {
        color: black;
        height: auto;
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding-bottom: 50px;
        // padding-right: 200px;
        // border: 1px solid red;
    }

    .main-hang1 {
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .main-hang2 {
        display: flex;
        margin-bottom: 40px;
        width: 100%;
        // border: 1px solid red;
    }

    .main-hang2-L {
        width: 600px;
        display: flex;

        .main-hang2-L-1 {
            width: 40%;
            display: flex;
            justify-content: flex-end;
            // border: 1px solid red;
        }

        .main-hang2-L-2 {
            width: 60%;
            display: flex;
            // border: 1px solid red;
            padding-left: 50px;
        }
    }

    .main-hang2-R {
        width: 600px;
        display: flex;

        .main-hang2-R-1 {
            width: 40%;
            display: flex;
            justify-content: flex-end;
            // border: 1px solid red;
        }

        .main-hang2-R-2 {
            width: 60%;
            display: flex;
            // border: 1px solid red;
            padding-left: 50px;
        }
    }

    .main-hang5 {
        width: 100%;
        display: flex;
    }

    .main-hang5-L {
        // border: 1px solid red;
        width: 600px;
        display: flex;

        .main-hang5-L-1 {
            // border: 1px solid red;
            padding-right: 20px;
            // width: 270px;
            width: 37%;
            display: flex;
            justify-content: flex-end;
        }

        .main-hang5-L-2 {
            margin-left: 29px;
            // border: 1px solid red;
            width: 150px;
            height: 100px;
            display: flex;
            padding-left: 50px;

            img {
                transform: rotateZ(270deg);
                width: 101px;
                height: 200px;
                margin-top: -50px;
            }
        }
    }

    .main-hang5-R {
        // border: 1px solid red;
        width: 700px;
        display: flex;
        margin-left: 200px;

        .main-hang5-R-1 {
            width: 270px;
            display: flex;
            justify-content: flex-end;
            // border: 1px solid red;
        }

        .main-hang5-R-2 {
            margin-left: 50px;
            width: 150px;
            height: 100px;
            display: flex;

            padding-left: 50px;

            img {
                transform: rotateZ(270deg);
                width: 101px;
                height: 200px;
                margin-top: -50px;
            }
        }
    }

    .daikuanyewu-item1 {
        color: black;
        width: 100%;
        height: 80px;
        background-color: white;
        display: flex;
        align-items: center;

        .daikuanyewu-item1-1 {
            // border: 1px solid red;
            margin-left: 80px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;

            .daikuanyewu-item1-1-T {
                margin-bottom: 10px;
                display: flex;
                justify-content: center;
            }

            .daikuanyewu-item1-1-B {
                display: flex;
                justify-content: center;
            }
        }
    }

    .goleft {
        margin-left: -250px;
    }

    .table-button {
        border: none;
        background: transparent;
        color: rgb(254, 25, 100);
    }

    .daikuanyewu-title {
        padding-left: 20px;
        // border: 1px solid red;
        color: black;
        display: flex;
        align-items: center;
        height: 60px;
        width: 100%;
        background-color: rgb(238, 238, 238);
    }

    .daikuanyewu-table {
        padding-right: 20px;
        height: auto;
        width: 100%;
        background-color: white;
        padding-bottom: 20px;
    }

    .el-table {
        margin-left: 20px;
        margin-top: 20px;
    }

    // 按钮点击后的颜色
    .active {
        color: #ffffff;
        background: rgb(254, 25, 100);
    }

    // 按钮没点击的颜色
    .deactive {
        color: rgb(254, 25, 100);
        background: white;
    }

    // 按钮样式
    .btn {
        border: 1px solid rgb(254, 25, 100);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 30px;
        font-weight: 400;
        font-size: 6px;
        line-height: 20px;
        border-radius: 4px;
        margin-top: 1px;
    }

    .btn:hover {
        transform: translateY(-1px);
    }

    .but-wai {
        display: flex;
    }

    .dianpuqingkuang-item1 {
        color: black;
        display: flex;
        background-color: rgb(238, 238, 238);
        height: 200px;

        .dianpuqingkuang-item1-L {
            display: flex;
            height: 100%;
            background-color: white;
            border-radius: 10px;
            width: 60%;
            margin-right: 20px;

            .dianpuqingkuang-item1-L-L {
                padding-left: 20px;
                height: 100%;
                // border: 1px solid red;
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .dianpuqingkuang-item1-L-L-item1 {
                    margin-left: 10px;
                    display: flex;
                    align-items: center;
                    margin-top: -15px;

                    .dian {
                        border: 1px solid red;
                        height: 10px;
                        margin-right: 10px;
                    }

                    .dianpuqingkuang-item1-L-L-wenzi1 {
                        font-weight: 600;
                    }

                    .dianpuqingkuang-item1-L-L-wenzi2 {
                        font-size: 30px;
                        font-weight: 600;
                    }
                }
            }

            .dianpuqingkuang-item1-L-R {
                margin-top: 5px;
                align-items: center;
                // padding-right: 200px;
                width: 43%;
                height: 100%;
                // border: 1px solid blue;
                display: flex;
                flex-wrap: wrap;

                .dianpuqingkuang-item1-L-R-item1 {
                    background-color: rgb(245, 243, 243);

                    margin-right: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    width: 170px;
                    height: 45%;
                    border-radius: 10px;

                    .dianpuqingkuang-item1-L-R-item1-L {
                        margin-top: 20px;
                        margin-left: 20px;
                        width: 25%;
                        justify-content: center;

                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    .dianpuqingkuang-item1-L-R-item1-R {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                        .dianpuqingkuang-item1-L-L-wenzi5 {
                            font-size: 20px;
                            color: rgb(254, 25, 100);
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }

        .dianpuqingkuang-item1-R {
            padding-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            width: 40%;
            border-radius: 10px;
        }
    }

    .dianpuqingkuang-item1-L-L-wenzi4 {
        font-weight: 600;
        margin-top: 30px;
    }

    .dianpuqingkuang-item2 {
        justify-content: space-between;
        display: flex;
        color: black;
        background-color: white;
        width: 100%;
        height: 250px;
        background-color: rgb(238, 238, 238);

        .dianpuqingkuang-item2-L {
            border-radius: 10px;
            height: 100%;
            width: 49.2%;
            display: flex;
            flex-direction: column;
            background-color: white;

            .dianpuqingkuang-item2-L-hang1 {
                display: flex;
                width: 100%;
                height: 30px;
                align-items: center;
                padding-left: 20px;
                padding-top: 10px;

                .dian {
                    border: 1px solid red;
                    height: 10px;
                    margin-right: 10px;
                }

                .dianpuqingkuang-item2-hang1-wenzi {
                    display: flex;
                    align-items: center;
                }
            }

            .dianpuqingkuang-item2-L-hang2 {
                display: flex;
                width: 100%;
                height: 100%;
            }
        }

        .dianpuqingkuang-item2-R {
            flex-direction: column;
            border-radius: 10px;
            height: 100%;
            width: 49.2%;
            display: flex;
            background-color: white;

            .dianpuqingkuang-item2-R-hang1 {
                display: flex;
                width: 100%;
                height: 30px;
                align-items: center;
                padding-left: 20px;
                padding-top: 10px;

                .dian {
                    border: 1px solid red;
                    height: 10px;
                    margin-right: 10px;
                }

                .dianpuqingkuang-item2-hang1-wenzi {
                    display: flex;
                    align-items: center;
                }
            }

            .dianpuqingkuang-item2-R-hang2 {
                // border: 1px solid red;
                display: flex;
                width: 100%;
                height: 100%;
            }
        }
    }

    .dianpuqingkuang-item3 {
        // border: 1px solid red;
        background-color: white;
        height: 250px;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 10px;

        .dianpuqingkuang-item3-hang1 {
            display: flex;
            width: 100%;
            height: 30px;
            align-items: center;
            padding-left: 20px;
            padding-top: 10px;

            .dian {
                border: 1px solid red;
                height: 10px;
                margin-right: 10px;
            }

            .dianpuqingkuang-item3-hang1-wenzi {
                display: flex;
                align-items: center;
            }
        }
    }

    .dianpuqingkuang-item3-wai {
        background-color: rgb(238, 238, 238);
    }

    .dianpuqingkuang-item3-hang2 {
        padding-right: 10px;
    }

    .tips-icon:hover {
        color: #fe1964 !important;
    }

    .loaning {

        ::v-deep .el-table .cell,
        .el-table--border td:first-child .cell,
        .el-table--border th:first-child .cell {
            text-align: center !important;
        }

        .shops {
            margin-top: 10px;

            ::v-deep .el-card__body {
                padding: 0;
            }

            ::v-deep .el-radio-button__inner {
                padding: 15px 30px;
            }
        }

        .tips {
            margin-top: 10px;
            width: 100%;
            height: 50px;
            background: rgb(229, 232, 234);
            border-radius: 7px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #fa1c64;
            line-height: 50px;
            display: flex;
            align-items: center;

            .tips-icon {
                width: 32px;
                height: 24px;
                margin-right: 17px;
                margin-left: 21px;
            }
        }

        .card4 {
            width: 66%;

            ::v-deep .el-card__body {}
        }

        .card3 {
            border-radius: 10px;
            padding-left: 20px;
            margin-top: 20px;

            .data {
                display: flex;

                .data-item {
                    width: 257px;
                    height: 115px;
                    background: #ffffff;
                    box-shadow: 0px 5px 11px 0px rgba(7, 1, 2, 0.14);
                    border-radius: 13px;
                    padding: 14px 28px;
                    box-sizing: border-box;
                    margin-right: 13px;

                    .item-bottom {
                        margin-top: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .item-icon {
                            width: 21px;
                            height: 15px;
                        }

                        .item-num {
                            font-size: 34px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #333333;
                        }
                    }

                    .item-title {
                        font-size: 17px;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        color: #333333;
                    }
                }
            }
        }

        .card2 {
            padding-left: 20px;
            width: 49.4%;
            margin-top: 20px;
            height: 288px;
            border-radius: 10px;

            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;

            .pay-info {
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #333333;
                line-height: 33px;
                margin-top: 30px;
                display: block;
            }

            .order-info {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;

                .info {
                    padding-left: 40px;
                    border-left: 1px solid #999;
                    width: 55%;
                    display: flex;
                    flex-direction: column;

                    .info-item {
                        font-size: 15px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #999999;
                        line-height: 21px;
                    }
                }

                .money {
                    display: flex;
                    flex-direction: column;

                    .money-num {
                        font-size: 22px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #ec1c5f;
                        line-height: 19 px;
                    }

                    .money-title {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 19px;
                        margin-bottom: 5px;
                    }
                }
            }
        }

        .score-title {
            margin-bottom: 58px;
            height: 16px;
            font-size: 18px;
            display: block;
            line-height: 16px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;
            padding-left: 9px;
            border-left: 3px solid #fe0255;
        }

        .card1 {
            width: 49.4%;
            margin-top: 20px;

            height: 288px;
            border-radius: 10px;
            padding-left: 20px;
            box-sizing: border-box;
            position: relative;

            .shop-info-box {
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .shop-info-item {
                    width: 207px;
                    // width: 237px;
                    height: 113px;
                    background: #f5f3f3;
                    border-radius: 13px;
                    margin-left: 21px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    .info-item-num {
                        font-size: 24px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #fa1c64;
                        padding-top: 20px;
                    }

                    .info-item-title {
                        font-size: 17px;
                        font-family: Source Han Sans CN;
                        font-weight: 600;
                        color: #333333;
                    }

                    .info-item-icon {
                        width: 21px;
                        height: 21px;
                        position: absolute;
                        left: 5px;
                        top: 23px;
                    }
                }
            }

            .score-box {
                display: flex;
                justify-content: space-between;

                .score-info {
                    margin-right: 20px;

                    .score-time {
                        position: absolute;
                        bottom: 34px;
                        left: 43px;
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 25px;
                    }

                    .score-num {
                        display: flex;
                        align-items: center;

                        .history-score {
                            font-size: 18px;
                            font-family: Source Han Sans CN;
                            font-weight: bold;
                            color: #ec1c5f;
                            padding-top: 16px;
                            padding-left: 2px;
                        }

                        .score {
                            font-size: 48px;
                            font-family: Source Han Sans CN;
                            font-weight: bold;
                            color: #333333;
                            line-height: 25px;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.userInquire-userListDetail {
    .el-tabs__header {
        margin: 0 0 0px;
    }

    .el-tabs__nav-scroll {
        padding-left: 20px;
    }

    .el-tabs__nav-wrap {
        border: 1px solid rgb(205, 205, 205);
    }

    .el-tabs__nav-wrap {
        margin-bottom: -1px;
    }

    .el-tabs__nav-wrap::after {
        background-color: white;
    }
}
</style>
