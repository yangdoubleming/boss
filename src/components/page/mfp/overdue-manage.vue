<template>
    <div>
        <!-- 逾期管理 -->
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 0px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.loanCode" placeholder="贷款明细编号" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.loanDetailCode" placeholder="借据单号" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.offerId" placeholder="Offer Id" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.sellerId" placeholder="Seller ID" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.orderType" placeholder="请选择订单状态" style="width:180px">
                                    <el-option v-for="item in orderOptions" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.loanStatus" placeholder="请选择贷款状态" style="width:180px">
                                    <el-option v-for="item in loanOptions" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row style="display: flex;margin-top:12px;">
                            <el-form-item>
                                <el-select v-model="ruleForm.canSettleNextTime" placeholder="请选择下次能否结清"
                                    style="width:180px">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker style="border-radius:8px" v-model="timeArray" :clearable="false"
                                    type="daterange" range-separator="—" value-format='yyyy-MM-dd'
                                    start-placeholder="支出开始时间" end-placeholder="支出结束时间" />
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.salesInternalName" placeholder="归属人（内部）" clearable
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :data="tableData" row-key="id" style="width: 100%; font-size: 14px"
                    v-loading="loading" element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center" width="120"> </el-table-column>
                    <el-table-column prop="shopName" label="店铺名" align="center" width="150"> </el-table-column>
                    <el-table-column prop="offerId" label="Offer ID" align="center" width="190"> </el-table-column>
                    <el-table-column prop="sellerId" label="Seller ID" align="center" width="190"> </el-table-column>
                    <el-table-column prop="loanCode" label="贷款明细编号" align="center" width="150"> </el-table-column>
                    <el-table-column prop="loanDetailCode" label="借据单号" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="orderTypeName" label="订单类型" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="extractAmount" label="放款金额" align="center" width="120">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.extractAmount) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="extractTime" label="贷款开始时间" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="loanBalance" label="贷款余额" align="center" width="120">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.loanBalance) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="unpaidInterest" label="应还利息" align="center" width="150">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.unpaidInterest) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="currency" label="币种" align="center"> </el-table-column>
                    <el-table-column prop="repaidPrincipal" label="已还本金" align="center" width="150">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.repaidPrincipal) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="repaidInterest" label="已还利息" align="center" width="150">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.repaidInterest) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="usageDays" label="截至当前已用款天数" align="center" width="180">
                    </el-table-column>
                    <el-table-column prop="loanStatus" label="贷款状态" width="150"> </el-table-column>
                    <el-table-column prop="overdueAmount" label="逾期金额" align="center" width="150">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.overdueAmount) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="overdueInterest" label="逾期利息" align="center">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.overdueInterest) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="overdueDays" label="逾期天数" width="150"> </el-table-column>
                    <el-table-column prop="lastSettlementTime" label="上次结算时间" width="150"> </el-table-column>
                    <el-table-column prop="lastDeductionTime" label="上次扣款时间" width="150"> </el-table-column>
                    <el-table-column prop="nextEstimatedSettlementTime" label="预估下次结算时间" width="150"> </el-table-column>
                    <el-table-column prop="nextEstimatedSettlementAmount" label="预估下次结算金额" width="150">
                        <template slot-scope="scope">
                            {{ formatMoney(scope.row.nextEstimatedSettlementAmount) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="canSettleNextTime" label="下次能否结清" width="150"> </el-table-column>
                    <el-table-column prop="salesInternalName" label="归属人（内部名）" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="apr" label="年利率" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.apr }}%
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="ruleForm.size" layout="sizes, prev, pager, next"
                    :total="total" :current-page.sync="ruleForm.current" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>

    </div>
</template>

<script>
import { getloandisbursement } from '@/api/mfp'; //导入文件
export default {
    name: 'authorized-store',
    data() {
        return {
            currentAccountId: '',
            accountNameIsEditing: false,
            loading: false,
            loanOptions: [
                { label: '还款中', value: 'PAYMENT' },
                { label: '已结清', value: 'REPAYMENT' },
                { label: '已逾期', value: 'OVERDUE' },
            ],
            orderOptions: [
                { label: '标准订单', value: '1' },
                { label: '延迟订单', value: '2' },
            ],
            ruleForm: {
                userId: '',
                loanCode: '',
                loanDetailCode: '',
                offerId: '',
                sellerId: '',
                orderType: '',
                loanStatus: '',
                canSettleNextTime: '',
                salesInternalName: '',
                current: 1,
                size: 10,
                startDate: '',
                endDate: '',
            },
            tableData: [],
            total: 0,
            disabled: false,
            timeArray: [],
            totalAmount: 0,
            totalsAll: {}
        };
    },
    created() {
        this.getDataList();
    },

    methods: {
        //时间转换
        getData(n) {
            let now = new Date(n),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        },

        changeAccountName() {
            this.accountNameIsEditing = false;
            updateAccount({
                id: this.currentAccountId,
                accountName: this.currentAccountInfo.borrowerName,
                phone: this.currentAccountInfo.borrowerPhone
            }).then((res) => {
                this.getDataList();
            });
        },


        searchData() {
            this.ruleForm.current = 1;
            this.getDataList();
        },
        getDataList() {
            this.loading = true;

            if (this.timeArray.length > 1) {
                Object.assign(this.ruleForm, {
                    startDate: this.timeArray[0],
                    endDate: this.timeArray[1],
                })
            }
            this.ruleForm.userName = this.userName;
            getloandisbursement(this.ruleForm).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.totalsAll = res.data.totals;
                } else {
                    this.tableData = []
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            console.log(val);
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm = {
                userId: '',
                loanCode: '',
                loanDetailCode: '',
                shopId: '',
                orderType: '',
                loanStatus: '',
                canSettleNextTime: '',
                salesInternalName: '',
                current: 1,
                size: 10,
                startDate: '',
                endDate: '',
            }
            this.timeArray = []
            this.getDataList();
        },
        formatMoney(num) {
            if (!num) return '--'
            return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },

    },
    computed: {
        userName() {
            let username = localStorage.getItem('userName');
            return username ? username : '';
        }
    },
};
</script>

<style scoped>
.el-tree.filter-tree::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-tree.filter-tree::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 2px;
}

.el-tree.filter-tree::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}

.el-timeline::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-timeline::-webkit-scrollbar-track {
    background: #dddddd;
    border-radius: 2px;
}

.el-timeline::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}
</style>
<style lang="less" scoped>
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

.drawerFrom {
    color: #747b8b;

    .drawer-main {
        padding: 20px;
        border-top: 1px solid #a4a4a4;

        .drawer-card {
            padding: 20px 0;
            border-bottom: 1px solid #a4a4a4;

            .drawer-card-left {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .drawer-card-right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: #000000;
            }
        }
    }
}

::v-deep .el-drawer__header {
    margin-bottom: 0;
}

.searchForm {
    .el-form-item {
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button {

        // width: 300px;
        .el-button {
            width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    background-color: #fff;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }
}

.totals {
    margin: 20px 20px 0;
    width: 96%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .money {
        padding: 0 20px;

    }
}
</style>
