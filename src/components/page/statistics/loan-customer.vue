<template>
    <div>
        <div>
            <div style="display: flex; align-items: center; padding: 18px">
                <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                    <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                        alt />保险后台 /
                    运营管理 / 裂变活动 / 合伙人管理 /
                </div>
                <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px; width: 60px">{{
                    $route.meta.title }}</span>
                <div style="width: 75%; text-align: right">
                    <el-button style="padding: 8px 40px; font-size: 14px; color: #409EFF; border-color: #409EFF"
                        @click="$router.go(-1)">返回</el-button>
                </div>
            </div>
        </div>

        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">已推荐客户</span>
                            <span class="grid-num2">{{ LoanUserCount.totalNum }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">已申请贷款客户</span>
                            <span class="grid-num2">{{ LoanUserCount.loanNum }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">已支用客户</span>
                            <span class="grid-num2">{{ LoanUserCount.disburseNum }}</span>
                        </div>
                        <!-- <div class="grid-cont-right">
                            <span class="grid-num">总返佣（预计）</span>
                            <span class="grid-num2">{{ amountSum.totalRebateAmount }}{{$t('common_yuan2')}}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">已结算</span>
                            <span class="grid-num2">{{ amountSum.settlementAmount }}{{$t('common_yuan2')}}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待结算</span>
                            <span class="grid-num2">{{ (amountSum.totalRebateAmount - amountSum.settlementAmount).toFixed(2)
                            }}{{$t('common_yuan2')}}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待生效</span>
                            <span class="grid-num2">{{ amountSum.inEffectAmount }}{{$t('common_yuan2')}}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">{{ $t('home_zdye') }}</span>
                            <span class="grid-num2">{{ amountSum.inEffectAmount }}{{$t('common_yuan2')}}</span>
                        </div> -->
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="12">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.loanTel" placeholder="客户手机号"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                            </div>
                        </el-row>

                    </el-form>

                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="customerForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="customerForm.phone" placeholder="客户手机号"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary" @click="handleBind" style="margin-left: 20px">绑定</el-button>
                            </div>
                        </el-row>

                    </el-form>

                </el-card>
            </el-col>

        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-size: 15px">
                <span style="font-weight: 700; margin-right: 20px; color: #666">邀请贷款客户</span>

                <span>【当前{{ content.userParentType }}：<span style="color: #409EFF">{{ content.userName }} {{
                    content.userIphone }}</span>】</span>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="customerName" label="客户姓名" align="center"> </el-table-column>
                    <el-table-column prop="customerTel" label="客户手机号" align="center"> </el-table-column>
                    <!-- <el-table-column prop="scrmName" label="销售经理" align="center"> </el-table-column> -->
                    <!-- <el-table-column prop="loanSpent" label="当前在贷余额/元" align="center"> </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="总返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="settlementAmount" label="已结算返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="beSettleAmount" label="待结算返佣额/元" align="center"> </el-table-column>
                    <el-table-column prop="inEffectAmount" label="待生效返佣/元" align="center"> </el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleRelieve(scope.row)" type="text" size="small">解绑</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
        <!-- 解绑 -->
        <el-dialog center custom-class="releve-dialog" title="请核对信息" :visible.sync="relieveShow" width="20%">
            <el-descriptions :column="1">
                <el-descriptions-item label="合伙人姓名">{{ detailObj.partnerName }}</el-descriptions-item>
                <el-descriptions-item label="合伙人手机号">{{ content.userIphone }}</el-descriptions-item>
                <el-descriptions-item label="客户姓名">{{ detailObj.customerName }}</el-descriptions-item>
                <el-descriptions-item label="客户手机号">{{ detailObj.customerTel }}</el-descriptions-item>
            </el-descriptions>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ensureRelieve">解 绑</el-button>
            </div>
        </el-dialog>
        <!------------------------------ 绑定---------------------->
        <el-dialog center title="请核对信息" :visible.sync="bindShow" width="20%">
            <el-descriptions :column="1">
                <el-descriptions-item :labelStyle="{ 'font-size': '16px' }" :contentStyle="{ 'font-size': '16px' }"
                    label="合伙人姓名">{{
                        content.userName
                    }}</el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'font-size': '16px' }" :contentStyle="{ 'font-size': '16px' }"
                    label="合伙人手机号">{{ content.userIphone }}</el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'font-size': '16px' }" :contentStyle="{ 'font-size': '16px' }"
                    label="客户姓名">{{ customerObj.name }}</el-descriptions-item>
                <el-descriptions-item :labelStyle="{ 'font-size': '16px' }" :contentStyle="{ 'font-size': '16px' }"
                    label="客户手机号">{{ customerForm.phone }}</el-descriptions-item>

            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ensureBind">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getLoanUserList, getNameByPhone, bindChannelCode, unbindLoanUser } from '@/api/insur';
export default {
    name: 'loan-customer',
    data() {
        return {
            bindShow: false,
            customerForm: {},
            detailObj: {},
            relieveShow: false,
            ruleForm: {
                loanTel: '', //
                page: 1,
                rows: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            LoanUserCount: {},
            amountSum: {},
            content: {},
            customerObj: {},
        };
    },
    created() {
        this.ruleForm.userId = this.$route.query.id;
        this.content = this.$route.query;
        this.getDataList();
    },
    methods: {
        handleBind() {
            if (!this.customerForm.phone) {
                return this.$message.warning('请输入客户手机号')
            }
            getNameByPhone(this.customerForm).then(res => {
                this.customerObj.name = res.data
                this.bindShow = true
            })
        },
        ensureBind() {
            bindChannelCode({
                hhrPhone: this.content.userIphone,
                phone: this.customerForm.phone,
                channelCode: this.content.channelCode
            }).then(res => {
                if (res.code == 200) {
                    this.$message.success('绑定成功')
                    this.bindShow = false
                    this.getDataList()
                }
            })
        },
        //确定解绑
        ensureRelieve() {
            this.relieveShow = false;
            unbindLoanUser({
                phone: this.detailObj.customerTel,
                hhrPhone: this.content.userIphone,
                channelCode: this.content.channelCode
            }).then((res) => {
                if (res.code == '200') {
                    this.$message.success('解绑成功');
                    this.getDataList();
                }
            })
        },
        //解绑
        handleRelieve(row) {
            this.detailObj = row
            console.log(row, 1111);
            this.relieveShow = true
        },
        searchData() {
            this.ruleForm.page = 1;
            this.getDataList();
        },

        reset() {
            this.ruleForm.loanTel = '';
        },
        getDataList() {
            getLoanUserList(this.ruleForm).then((res) => {
                if (res.code === '200') {
                    this.tableData = res.data.clients;
                    this.total = res.data.total;
                    this.LoanUserCount = res.data.statistics;
                    this.amountSum = res.data.userSettlement;
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
/deep/ .releve-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
    line-height: 1;
}

/deep/ .releve-dialog .el-descriptions__body table {
    font-size: 15px;
}

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
        width: 35%;
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

        td:nth-child(6) {
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
</style>