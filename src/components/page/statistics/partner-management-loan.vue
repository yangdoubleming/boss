<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">合伙人总数</span>
                            <span class="grid-num2">{{ totalUser }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">总返佣</span>
                            <span class="grid-num2">{{ amountSum.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">已结算</span>
                            <span class="grid-num2">{{ amountSum.settlementAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待结算</span>
                            <span class="grid-num2">{{
                (amountSum.totalRebateAmount - amountSum.settlementAmount).toFixed(2)
            }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待生效</span>
                            <span class="grid-num2">{{ amountSum.inEffectAmount }}{{ $t('common_yuan2') }}</span>
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
                                <el-select v-model="ruleForm.level" placeholder="合伙人类型" style="width: 100%">
                                    <el-option label="一级合伙人" value="1"></el-option>
                                    <el-option label="二级合伙人" value="2"></el-option>
                                </el-select>
                            </el-form-item>

                            <!-- <el-form-item>
                                <el-select v-model="ruleForm.registerType" placeholder="注册类型" style="width: 100%">
                                    <el-option label="贷款" value="LOAN"></el-option>
                                    <el-option label="保险" value="INSURANCE"></el-option>
                                </el-select>
                            </el-form-item> -->

                            <el-form-item>
                                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.code" placeholder="邀请码"></el-input>
                            </el-form-item>
                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">合伙人管理列表</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="userParentType" label="合伙人类型" align="center"> </el-table-column>
                    <el-table-column prop="userRegisterTypeName" label="注册类型" align="center"> </el-table-column>
                    <el-table-column prop="userName" :label="$t('loan_search_name')" align="center"> </el-table-column>
                    <el-table-column prop="userIphone" :label="$t('loan_serch_phone')" align="center" width="150px">
                    </el-table-column>
                    <el-table-column prop="userParentName" label="邀请人" align="center"> </el-table-column>
                    <el-table-column prop="userIsScrmDpartmentName" label="所属部门" align="center"> </el-table-column>
                    <el-table-column prop="userInvitationCode" label="邀请码" align="center"> </el-table-column>
                    <el-table-column prop="agentNum" label="代理数" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="点击查看代理详情" placement="top">
                                <a @click="clickNum(scope.row)" style="color: #fe1964; cursor: pointer">{{
                scope.row.agentNum }}</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="总返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="waitAmount" label="待结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="settlementAmount" label="已结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="inEffectAmount" label="待生效金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center" width="180px"> </el-table-column>

                    <el-table-column prop="action" label="操作" align="center" width="290px">
                        <template slot-scope="scope">
                            <a @click="rebateDetail(scope.row)"
                                style="color: #fe1964; cursor: pointer; margin-right: 30px">返佣明细</a>
                            <a @click="loanJump(scope.row)" style="color: #fe1964; cursor: pointer; margin-right: 30px"
                                v-if="scope.row.userRegisterTypeName === '贷款'">贷款客户</a>
                            <a @click="(dialogVisible = true), (chooseRow = scope.row)"
                                style="color: #fe1964; cursor: pointer"
                                v-if="scope.row.userRegisterTypeName === '贷款'">关联新客户</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="关联新客户" :visible.sync="dialogVisible" width="30%" class="dialogClass">
            <div style="display: flex; line-height: 30px; margin: 30px">
                <span style="width: 35%; margin: 0px 10px 0px 30px">合伙人手机号</span>
                <el-input v-model="dialogForm.userIphone" :placeholder="$t('loan_detail_qsrnr')"></el-input>
            </div>
            <div>
                <div class="title">| 关联新客户信息</div>
                <el-form ref="dialogForm" :model="dialogForm" label-width="120px">
                    <el-form-item label="新客户手机号">
                        <el-input v-model="dialogForm.loanTel"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false"
                    style="width: 100px; color: #fe1964; margin-right: 40px; border-color: #fe1964">取 消</el-button>
                <el-button type="primary" @click="_relevance" style="width: 100px">确 定</el-button>
                <div style="margin-top: 30px; color: #fe1964; font-size: 15px">
                    *点击确定后此客户贷款的返佣将划扣到当前合伙人下，请谨慎操作。
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getLoanRegisterAmountList, getAmountSum, getLoanRegisterCount, getLoanAmountSumLoan, liebianJoinLoan } from '@/api/insur';
export default {
    name: 'partner-management-loan',
    data() {
        return {
            totalUser: 0,
            chooseRow: {},
            ruleForm: {
                name: '', // 手机号
                code: '', // 渠道名
                phone: '',
                level: '',
                registerType: '', // 注册类型
                page: 1,
                rows: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,

            amountSum: {},
            dialogVisible: false,
            input: '',
            dialogForm: {
                userIphone: '',
                loanTel: '',
                bossName: ''
            }
        };
    },
    created() {
        getLoanRegisterCount().then((res) => {
            this.totalUser = res.data;
        });
        this.getDataList();
        getLoanAmountSumLoan('').then((res) => {
            if (res.code === '200') {
                this.amountSum = res.data;
            }
        });
    },
    methods: {
        clickNum(scope) {
            if (scope.agentNum == '-' || scope.agentNum == '0') {
                this.$message.error('当前暂无代理详情');
            } else {
                this.ruleForm.userId = scope.id;
                this.loading = true;
                this.ruleForm.name = '';
                this.ruleForm.code = '';
                this.ruleForm.phone = '';
                this.ruleForm.level = '';
                this.ruleForm.registerType = '';
                this.ruleForm.page = 1;
                this.dateTime = [];
                this.getDataList();
            }
        },
        _relevance() {
            this.dialogForm.bossName = localStorage.getItem('userName');
            liebianJoinLoan(this.dialogForm).then((res) => {
                this.$message.success('操作成功！');
                this.dialogVisible = false;
                for (let k in this.dialogForm) {
                    this.dialogForm[k] = '';
                }
            });
        },
        searchData() {
            this.ruleForm.page = 1;
            this.getDataList();
        },

        reset() {
            this.ruleForm.name = '';
            this.ruleForm.code = '';
            this.ruleForm.phone = '';
            this.ruleForm.level = '';
            this.ruleForm.registerType = '';
        },
        getDataList() {
            getLoanRegisterAmountList(this.ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    res.data.page.records.forEach(item => {
                        item.waitAmount = (item.totalRebateAmount - item.settlementAmount).toFixed(2)
                    });
                    this.tableData = res.data.page.records;
                    this.total = res.data.page.total;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        // 返佣明细
        rebateDetail(scope) {
            console.log(scope);
            this.$router.push({
                path: '/rebate-detail',
                query: {
                    userParentType: scope.userParentType,
                    userIphone: scope.userIphone,
                    userName: scope.userName,
                    userId: scope.id,
                    orderType: 1 //1贷款  2保险
                }
            });
        },
        // 贷款客户
        loanJump(scope) {

            this.$router.push({
                path: '/loan-customer',
                query: {
                    id: scope.id
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
        width: 20%;
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
        height: 65px;

        td:nth-child(8) {
            .cell {
                color: #fe1964;
            }
        }

        // td:nth-child(3) {
        //     .cell {
        //         color: #fe1964;
        //     }
        // }
    }
}

.dialogClass {
    /deep/.el-dialog__body {
        padding: 0px 50px;
    }

    .title {
        margin: 20px 0;
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }

    .el-form {
        margin: 0 30px;
        margin-top: 30px;
    }

    .el-select {
        width: 100%;
    }

    /deep/.el-dialog__header {
        text-align: center;
        padding-top: 40px;

        /deep/.el-dialog__title {
            font-size: 24px;
        }
    }

    /deep/.el-dialog__footer {
        text-align: center;
        padding: 20px;
        padding-bottom: 50px;
    }
}
</style>