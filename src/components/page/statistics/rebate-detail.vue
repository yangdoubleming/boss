<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 运营管理 /
                合伙人管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <div style="width: 80%; text-align: right">
                <el-button style="padding: 8px 40px; font-size: 14px; color: #e71d5d; border-color: #e71d5d"
                    @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <el-radio-group v-model="orderType" style="margin-bottom: 10px; margin-left: 10px" size="medium"
            @change="checkType">
            <el-radio-button :label="2">保险返佣</el-radio-button>
            <el-radio-button :label="1">贷款返佣</el-radio-button>
        </el-radio-group>
        <div v-if="orderType == 1">
            <el-row :gutter="24" class="topSum">
                <el-col :span="24">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <span class="grid-num">贷款返佣总金额</span>
                                <span class="grid-num2">{{ amountSum.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                            <div class="grid-cont-right">
                                <span class="grid-num">已结算</span>
                                <span class="grid-num2">{{ amountSum.settlementAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                            <div class="grid-cont-right">
                                <span class="grid-num">待结算</span>
                                <span class="grid-num2">{{ amountSum.beSettlementAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                            <div class="grid-cont-right">
                                <span class="grid-num">待生效</span>
                                <span class="grid-num2">{{ amountSum.beEffectiveAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <el-form ref="loanForm" :model="loanForm" style="padding: 30px 20px 30px 20px">
                            <el-row style="display: flex">
                                <el-form-item>
                                    <el-input v-model="loanForm.phone" placeholder="客户手机号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="loanForm.orderNo" placeholder="贷款编号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-select v-model="loanForm.state" placeholder="当前状态" style="width: 100%">
                                        <el-option label="已还款" value="1"></el-option>
                                        <el-option label="代理返佣" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-select v-model="loanForm.productType" placeholder="返佣类型" style="width: 100%">
                                        <el-option label="推荐返佣" value="1"></el-option>
                                        <el-option label="代理返佣" value="4"></el-option>
                                        <el-option label="补充返佣" value="5"></el-option>
                                    </el-select>
                                </el-form-item>

                                <div class="button">
                                    <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索
                                    </el-button>
                                    <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置
                                    </el-button>
                                </div>
                            </el-row>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0" v-if="orderType == 1">
                <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">
                    合伙人返佣明细列表
                    <span style="font-weight: normal; color: #000; margin-left: 20px">【当前{{ scope.userParentType }}：
                        <span style="color: #fe1964">{{ scope.userName }}&nbsp;&nbsp;{{ scope.userIphone
                            }}</span>】</span>
                </div>
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-table :data="tableData" style="width: 100%; font-size: 14px">
                        <el-table-column prop="activityName" label="活动" align="center" width="140">
                            <!-- <template slot-scope="scope"> 
                                全民营销贷款
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="userName" label="客户姓名" align="center"> </el-table-column>
                        <el-table-column prop="userIphone" label="客户手机号" align="center" width="120"> </el-table-column>
                        <el-table-column prop="customerOrderNumber" label="贷款单号" align="center" width="200">
                        </el-table-column>
                        <el-table-column prop="lenderProductName" label="客户贷款产品" align="center"> </el-table-column>
                        <el-table-column prop="loanAmount" label="支用金额/万" align="center"> </el-table-column>
                        <el-table-column prop="loanStartDate" label="支用时间" align="center"> </el-table-column>
                        <!-- <el-table-column prop="lenderProductTenure" label="还款期数" align="center"> </el-table-column> -->
                        <el-table-column prop="repaymentMethod" label="还款方式" align="center"> </el-table-column>
                        <el-table-column prop="loanStatus" label="当前状态" align="center"> </el-table-column>
                        <el-table-column prop="loanBalance" label="当前在贷余额/万" width="150" align="center">
                        </el-table-column>
                        <el-table-column prop="moneyOrderAmount" label="历史结算佣金/元" width="150" align="center">
                        </el-table-column>
                        <el-table-column label="上月待结算/元" prop="lastMonthAmount" align="center"
                            width="150"></el-table-column>
                        <el-table-column label="本月累计佣金/元 " prop="monthAmount" align="center"
                            width="150"></el-table-column>
                        <el-table-column prop="productType" label="返佣类型" align="center"> </el-table-column>
                        <el-table-column prop="createTime" label="返佣时间" align="center" width="100"> </el-table-column>
                        <!-- <el-table-column prop="action" label="操作" align="center" width="180px">
                            <template slot-scope="scope">
                                <a @click="openRepaymentHistroy(scope.row)" style="color: #fe1964; cursor: pointer; margin-right: 30px"
                                    >明细</a
                                >
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                        @current-change="currentChange" style="text-align: right; margin: 40px 20px"
                        hide-on-single-page>
                    </el-pagination>
                </el-card>
            </el-row>
        </div>
        <div v-if="orderType == 2 || !orderType">
            <el-row :gutter="24" class="topSum">
                <el-col :span="24">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content grid-con-1">
                            <div class="grid-cont-right">
                                <span class="grid-num">返佣总金额</span>
                                <span class="grid-num2">{{ amountSum.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                            <el-row style="display: flex">
                                <el-form-item>
                                    <el-input v-model="ruleForm.orderNumber" placeholder="订单编号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-select v-model="ruleForm.rewardType" placeholder="返佣类型" style="width: 100%">
                                        <el-option label="推荐返佣" value="1"></el-option>
                                        <el-option label="代理返佣" value="2"></el-option>
                                    </el-select>
                                </el-form-item>

                                <div class="button">
                                    <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索
                                    </el-button>
                                    <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置
                                    </el-button>
                                </div>
                            </el-row>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">
                    合伙人返佣明细列表
                    <span style="font-weight: normal; color: #000; margin-left: 20px">【当前{{ scope.userParentType }}：
                        <span style="color: #fe1964">{{ scope.userName }}&nbsp;&nbsp;{{ scope.userIphone
                            }}</span>】</span>
                </div>
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-table :data="tableData" style="width: 100%; font-size: 14px">
                        <el-table-column prop="productTypeName" label="活动" align="center"> </el-table-column>
                        <el-table-column prop="userName" label="二级合伙人" align="center"
                            v-if="$route.query.userParentType == '一级合伙人'">
                        </el-table-column>
                        <el-table-column prop="customerOrderNumber" label="订单编号" align="center"> </el-table-column>
                        <el-table-column prop="customerName" label="客户姓名" align="center"> </el-table-column>
                        <el-table-column prop="customerIphone" label="客户手机号" align="center"> </el-table-column>
                        <el-table-column prop="rewardTypeName" label="返佣类型" align="center"> </el-table-column>
                        <el-table-column prop="customerOrderAmount" label="保费/元" align="center"> </el-table-column>
                        <el-table-column prop="moneyOrderAmount" label="返佣金额/元" align="left" class="special">
                        </el-table-column>
                        <el-table-column prop="createTime" label="返佣时间" align="center"> </el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                        @current-change="currentChange" style="text-align: right; margin: 40px 20px"
                        hide-on-single-page>
                    </el-pagination>
                </el-card>
            </el-row>
        </div>
        <el-dialog title="还款记录" :visible.sync="showRepaymentHistroy" width="40%">
            <xtable :columns="historyColumns" :detailTable="true" :tableData="historyData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRepaymentHistroy = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';
import { getRebateDetailsList, getRebateDetailsListPeriods, getStatisticsAmount } from '@/api/insur';
import M from 'minimatch';
export default {
    name: 'rebate-detail',
    components: {
        xtable
    },
    data() {
        return {
            orderType: 1,
            historyColumns: [
                {
                    label: '当前期数',
                    prop: 'loanRepaymentRecordPeriods'
                },
                {
                    label: '收益金额',
                    prop: 'moneyOrderAmount'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'moneyOperationType'
                }
            ],
            historyData: [],
            showRepaymentHistroy: false,
            ruleForm: {
                userId: '',
                orderNumber: '', // 订单编号
                rewardType: '', // 返佣类型
                page: 1,
                rows: 10
            },
            loanForm: {
                phone: '',
                orderNo: '',
                state: '',
                productType: ''
            },
            tableData: [],
            total: 0,
            pageSize: 10,
            amountSum: {},
            loanData: {},
            path: '',
            scope: {
                userParentType: '',
                userIphone: '',
                userName: '',
                userId: ''
            },
            activeName: 'first',
            tabType: ''
        };
    },
    created() {
        this.ruleForm.userId = this.$route.query.userId;
        // this.getDataList();
        this.scope = this.$route.query;
        this.orderType = this.$route.query.orderType || 2;
        this.checkType(this.orderType);
    },
    methods: {
        checkType(type) {
            this.path = type == 1 ? '/Loan/getRebateDetailsList' : '/Insure/getNewRebateDetailsList';

            if (type == 1) {
                this.tabType = 'LOAN';
                this.getDataList();
            } else {
                this.tabType = 'INSURE';
                this.getDataList();
            }
            this.path2 = type == 1
                ? '/Loan/getRebateDetailsList'
                : '/Insure/getNewRebateDetailsList';
            this.getDataList()
        },
        openRepaymentHistroy(row) {
            this.showRepaymentHistroy = true;
            getRebateDetailsListPeriods(row.customerOrderNumber).then((res) => {
                res.data.forEach((item) => {
                    item.moneyOperationType =
                        item.moneyOperationType == 0 ? '生效中' : item.moneyOperationType == 1 ? '待结算' : '预计收益';
                });
                this.historyData = res.data;
            });
        },
        searchData() {
            this.ruleForm.page = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm.orderNumber = '';
            this.ruleForm.rewardType = '';
        },
        getDataList() {
            getRebateDetailsList({ data: this.ruleForm, path: this.path }).then((res) => {
                if (res.code === '200') {
                    this.tableData = res.data.records;
                    this.tableData.forEach((item) => {
                        item.productType =
                            item.productType == '1'
                                ? '推荐返佣'
                                : item.productType == '4'
                                    ? '代理返佣'
                                    : item.productType == '5'
                                        ? '补充返佣'
                                        : '';
                    });
                    this.total = res.data.total;
                }
            });

            getStatisticsAmount(this.scope.userId, this.tabType, '').then((res) => {
                if (res.code === '200') {
                    this.amountSum = res.data;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        }
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }

    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button {
        width: 300px;

        .el-button {
            width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.is-left {
        color: #fe1964;
        text-align: center;
    }
}
</style>