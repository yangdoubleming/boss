<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
                合伙人管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <div style="width: 80%; text-align: right">
                <el-button style="padding: 8px 40px; font-size: 14px; color: #e71d5d; border-color: #e71d5d"
                    @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">待结算金额</span>
                            <span class="grid-num2">{{ (accounData.totalRebateAmount -
                accounData.settlementAmount).toFixed(2) }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">上月待结算金额</span>
                            <span class="grid-num2">{{ (accounData.effectAmount -
                accounData.settlementAmount).toFixed(2) }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">可结算金额</span>
                            <span class="grid-num2">{{ accounData.billableAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div style="line-height: 100px">
                            <el-button type="primary" @click="dialogVisible = true">结算佣金</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px; display: flex">
                合伙人结算记录
                <span style="font-weight: normal; color: #000; margin-left: 20px">【当前{{ scope.userParentType }}：
                    <span style="color: #409EFF">{{ scope.userName }}&nbsp;&nbsp;{{ scope.userIphone }}</span>】</span>
                <div style="width: 70%; text-align: right">已结算总金额：{{ accounData.settlementAmount
                    }}{{ $t('common_yuan2') }}</div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="moneyOrderAmount" label="结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="结算时间" align="center"> </el-table-column>
                    <el-table-column prop="bossAdminName" label="操作人" align="center"> </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="结算佣金" :visible.sync="dialogVisible" width="30%" class="dialog">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="合伙人姓名">
                    <el-input v-model="form.userName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.userIphone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="结算金额">
                    <el-input v-model="form.amount">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="color: #409EFF; font-size: 15px">*点击确定表示您已线下结算佣金给合伙人，请谨慎操作。</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false"
                    style="padding: 8px 25px; border-color: #409EFF; color: #409EFF">取
                    消</el-button>
                <el-button type="primary" @click="closeAccount" style="padding: 8px 25px">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserSettlement, getUserSettlementList, UserLiquidation, getAmountSumApi } from '@/api/insur';
export default {
    name: 'settlement-records-detail',
    data() {
        return {
            form: {
                userName: '',
                userIphone: '',
                amount: ''
            },
            tableData: [],
            total: 0,
            pageSize: 10,
            amountSum: '',
            scope: {
                userParentType: '',
                userIphone: '',
                userName: ''
            },
            dialogVisible: false,
            page: 1,
            rows: 10,
            accounData: {},
            data: {
                amount: '',
                bossName: '',
                userId: ''
            },
            path: '',
            path2: ''
        };
    },
    created() {
        this.path = !this.$route.query.orderType
            ? '/getUserSettlementList'
            : this.$route.query.orderType == 1
                ? '/Loan/getUserSettlementList'
                : '/Insure/getUserSettlementList';

        this.path2 = !this.$route.query.orderType
            ? '/getAmountSum'
            : this.$route.query.orderType == 1
                ? '/Loan/getAmountSum'
                : '/Insure/getAmountSum';

        this.getDataList();
        this.scope = this.$route.query;
        this.form.userIphone = this.scope.userIphone;
        this.form.userName = this.scope.userName;
    },
    methods: {
        getDataList() {
            getAmountSumApi(this.$route.query.id, this.path2).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    this.accounData = res.data;
                }
            });
            getUserSettlementList(this.$route.query.id, this.page, this.rows, this.path).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    this.tableData = res.data.records;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.page = index;
            this.getDataList(this.ruleForm);
        },
        closeAccount() {
            this.data.amount = this.form.amount;
            this.data.bossName = localStorage.getItem('userName');
            this.data.userId = this.$route.query.id;
            // if (this.data.amount > this.accounData.sum3) {
            //     this.$message.error('结算金额不可大于当前可结算金额');
            //     return false;
            // }
            UserLiquidation(this.data).then((res) => {
                // console.log(res.data);
                if (res.code == '200') {
                    this.$message.success(res.msg);
                    this.getDataList()
                    this.dialogVisible = false;
                }
            });
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

    /deep/.el-table__row {
        td:nth-child(1) {
            .cell {
                color: #409EFF;
            }
        }

        // td:nth-child(3) {
        //     .cell {
        //         color: #409EFF;
        //     }
        // }
    }
}

.dialog {
    /deep/.el-dialog__header {
        text-align: center;
    }

    /deep/.el-dialog__body {
        padding: 40px 80px;
    }

    /deep/.el-form-item {
        margin-bottom: 22px;
    }

    /deep/.el-dialog__footer {
        text-align: center;
    }
}
</style>