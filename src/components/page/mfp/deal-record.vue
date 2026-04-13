<template>
    <div>
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
                    <el-radio-group v-model="tabType" style="margin: 10px 0 0 20px;" @change="tabChange">
                        <el-radio-button label="income">支用列表</el-radio-button>
                        <el-radio-button label="payout">提现列表</el-radio-button>
                        <el-radio-button label="repayment">还款列表</el-radio-button>
                        <el-radio-button label="withhold">亚马逊扣款列表</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.offerId" placeholder="店铺ID "
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker style="border-radius:8px" v-model="timeArray" :clearable="false"
                                    type="daterange" range-separator="—" value-format='yyyy-MM-dd'
                                    start-placeholder="支出开始时间" end-placeholder="支出结束时间" />
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.salesName" placeholder="归属人（内部）"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.userPhone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <!-- <div>已选中：{{ multipleSelection.length }}项</div> -->
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading"
                    element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="userId" label="用户ID" align="center" width="120"> </el-table-column>
                    <el-table-column v-for="column in dynamicColumns" :key="column.prop" :prop="column.prop"
                        :label="column.label" align="center" :width="column.width">
                        <template slot-scope="scope">
                            <template
                                v-if="['amount', 'extractAmount', 'feeAmount', 'repaymentAmount', 'repaidPrincipal', 'repaidInterest'].includes(column.prop)">
                                {{ formatMoney(scope.row[column.prop]) }}
                            </template>
                            <template v-else-if="column.prop == 'apr'">
                                {{ scope.row.apr || '0' }}%
                            </template>
                            <template v-else-if="column.prop == 'feeRate'">
                                {{ formatFeeRate(scope.row.feeRate) }}
                            </template>
                            <template v-else-if="column.prop == 'isDeduction'">
                                {{ scope.row.isDeduction ? '是' : '否' }}
                            </template>
                            <template v-else>
                                {{ scope.row[column.prop] }}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salesName" label="归属人（内部名）" align="center" width="150"> </el-table-column>
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
import { getMfpWalletIncome, getMfpWalletPayout, getMfpWalletRepayment, getMfpWalletDeduction } from '@/api/crm'; //导入文件
export default {
    name: 'deal-record',
    data() {
        return {
            tabType: 'income',

            loading: false,
            ruleForm: {
                userId: '',
                userPhone: '',
                offerId: '',
                salesName: '',
                startDate: '',
                endDate: '',
                userName: '',
                current: 1,
                size: 10
            },
            tableData: [],
            total: 0,
            pageSize: 10,
            multipleSelection: [],
            disabled: false,
            ids: [],
            totalAmount: 0,
            pickerOptions: {
                disabledDate(time) {
                    let t = new Date().getDate();
                    if (t >= 25) {
                        // 返回上个月的日期
                        return time.getTime() > Date.now() - 8.64e7 * t;
                    } else {
                        const day = 60 * 24 * 3600 * 1000;
                        // 返回小于两个月前的日期
                        return time.getTime() > Date.now() - day;
                    }
                }
            },
            timeArray: []
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        formatMoney(num) {
            if (!num) return '--'
            return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        formatFeeRate(rate) {
            if (!rate) return rate
            return (Number(rate) * 100).toFixed(2) + '%'
        },
        getRowKey(row) {
            return row.id;
        },
        searchData() {
            this.ruleForm.current = 1;
            this.getDataList();
        },
        tabChange() {
            this.ruleForm.current = 1;
            this.ruleForm.size = 10;
            this.getDataList();
        },
        async getDataList() {
            try {
                this.loading = true
                let res = null;
                this.ruleForm.userName = this.userName;
                console.log('timeArray', this.timeArray, this.tabType)
                if (this.timeArray.length > 1) {
                    Object.assign(this.ruleForm, {
                        startDate: this.timeArray[0],
                        endDate: this.timeArray[1],
                    })
                }
                switch (this.tabType) {
                    case "income":
                        res = await getMfpWalletIncome(this.ruleForm)
                        break;
                    case "payout":
                        res = await getMfpWalletPayout(this.ruleForm)
                        break
                    case "repayment":
                        res = await getMfpWalletRepayment(this.ruleForm)
                        break;
                    case "withhold":
                        res = await getMfpWalletDeduction(this.ruleForm)
                        break
                }
                if (res.code === 200) {
                    this.tableData = res.data.records || [];
                    this.total = res.data.total;
                } else {
                    this.tableData = [];
                }
                this.loading = false
            } catch (err) {
                this.loading = false
                console.error(err)
            }

        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm = {
                userId: '',
                userPhone: '',
                offerId: '',
                salesName: '',
                startDate: '',
                endDate: '',
                userName: '',
                current: 1,
                size: 10
            };
            this.timeArray = []
            this.getDataList();
        },
    },
    computed: {
        userName() {
            let username = localStorage.getItem('userName');
            return username ? username : '';
        },
        dynamicColumns() {
            const columnsMap = {
                income: [
                    { prop: 'loanDetailCode', label: '贷款明细编号' },
                    { prop: 'offerId', label: '店铺ID', width: '190' },
                    { prop: 'shopName', label: '店铺名称' },
                    { prop: 'orderTypeName', label: '订单类型', width: '150' },
                    { prop: 'createTime', label: '回款日期', width: '150' },
                    { prop: 'isDeduction', label: '是否传还款计划', width: '130', slot: true },
                    { prop: 'extractAmount', label: '回款金额', width: '150', slot: true },
                    { prop: 'currency', label: '币种' },
                    { prop: 'extractStatusName', label: '状态' },
                    { prop: 'apr', label: '年利率', slot: true },
                ],
                payout: [
                    { prop: 'accountName', label: '账户名' },
                    { prop: 'payoutDate', label: '提现日期', width: '150' },
                    { prop: 'amount', label: '提现金额', width: '150', slot: true },
                    { prop: 'currency', label: '币种' },
                    { prop: 'feeRate', label: '手续费费率', slot: true },
                    { prop: 'feeAmount', label: '手续费金额', slot: true },
                    { prop: 'statusName', label: '状态' },
                ],
                repayment: [
                    { prop: 'repaymentAccount', label: '还款账户名' },
                    { prop: 'shopName', label: '店铺名称' },
                    { prop: 'offerId', label: 'offerID', width: '190' },
                    { prop: 'repaymentDate', label: '还款日期' },
                    { prop: 'repaymentAmount', label: '还款金额', slot: true },
                    { prop: 'currency', label: '币种' },
                    { prop: 'repaidPrincipal', label: '已还本金', slot: true },
                    { prop: 'repaidInterest', label: '已还利息', slot: true },
                    { prop: 'statusName', label: '状态' },
                ],
                withhold: [
                    { prop: 'shopName', label: '店铺名称' },
                    { prop: 'sellerId', label: 'Seller Id', width: '190' },
                    { prop: 'createTime', label: '扣款时间' },
                    { prop: 'amount', label: '扣款金额', slot: true },
                ]
            };
            return columnsMap[this.tabType] || [];
        }
    },
    watch: {
        tableData: {
            handler() {
                // 强制更新表格
                this.$nextTick(() => {
                    this.$refs.multipleTable.doLayout();
                });
            },
            deep: true
        }
    }
};
</script>
 
<style lang="less" scoped>
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
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }
}
</style>
