<template>
    <div class="service">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                贷款单
            </div>
            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="第三方贷款单编号" prop="bcName">
                    <span class="text">{{ loanInfo.extLoanOrderId || '-' }}</span>
                </el-form-item>
                <el-form-item label="贷款编号">
                    <span class="text">{{ loanInfo.loanCode || '-' }}</span>
                </el-form-item>
                <el-form-item label="借款申请时间" prop="bcName">
                    <span class="text">{{ loanInfo.loanApplyDate || '-' }}</span>
                </el-form-item>
                <el-form-item label="用户编号" prop="bcName">
                    <span class="text">{{ $route.query.userId || '-' }}</span>
                </el-form-item>
                <el-form-item label="第三方用户号" prop="bcName">
                    <span class="text">{{ $route.query.extUserId || '-' }}</span>
                </el-form-item>
                <el-form-item label="用户名称" prop="bcName">
                    <span class="text">{{ $route.query.bname || '-' }}</span>
                </el-form-item>
                <el-form-item label="借款状态" prop="bcName">
                    <span class="text">{{ $route.query.loanStatus || '-' }}</span>
                </el-form-item>
                <el-form-item label="借款金额" prop="bcName">
                    <span class="text">{{ loanInfo.loanAmount || '-' }}</span>
                </el-form-item>
                <el-form-item label="起息日" prop="bcName">
                    <span class="text">{{ loanInfo.valueDate || '-' }}</span>
                </el-form-item>
                <el-form-item label="到期日" prop="bcName">
                    <span class="text">{{ loanInfo.loanEndDate || '-' }}</span>
                </el-form-item>
                <el-form-item label="逾期日" prop="bcName">
                    <span class="text">{{ loanInfo.loanEndDate ? getNextDate(loanInfo.loanEndDate.split(' ')[0], 1) :
                '-'
                        }}</span>
                </el-form-item>
                <el-form-item label="借款期限" prop="bcName">
                    <span class="text"> 90天 </span>
                </el-form-item>
                <el-form-item label="还款方式" prop="bcName">
                    <span class="text">资金到账自动扣款</span>
                </el-form-item>
                <el-form-item label="创建时间" prop="bcName">
                    <span class="text">{{ loanInfo.createTime || '-' }}</span>
                </el-form-item>
                <el-form-item label="日利率" prop="bcName">
                    <span class="text">{{ (Number(loanInfo.borrowingDayRate) * 100).toFixed(2) + '%' || '-' }}</span>
                </el-form-item>
                <!-- <el-form-item label="用户签约协议编号" prop="bcName">
                    <span class="text">{{ loanInfo.noteName || '-' }}</span>
                </el-form-item> -->
                <!-- <div class="block">
                    <div class="line"></div>
                    放款单<span class="note"></span>
                </div>
                <el-form-item label="第三方支付单号">
                    <span class="text">{{ $route.query.paymentNo || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款人姓名">
                    <span class="text">{{ loanRecod.userName || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款人银行名称">
                    <span class="text" style="color:#E52D6D">{{ loanRecod.bankName || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款人类型" prop="bcName">
                    <span class="text">{{ loanRecod.userType || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款银行卡号" prop="bcName">
                    <span class="text">{{ loanRecod.bankNo || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款银行大额行号" prop="bcName">
                    <span class="text">{{ loanRecod.prcptcd || '-' }}</span>
                </el-form-item>
                <el-form-item label="收款银行编码" prop="bcName">
                    <span class="text">{{ loanRecod.openBank || '-' }}</span>
                </el-form-item>
                <el-form-item label="放款状态" prop="bcName">
                    <span class="text">{{ $route.query.loanStatus || '-' }}</span>
                </el-form-item>
                <el-form-item label="创建时间" prop="bcName">
                    <span class="text">{{ loanRecod.createTime || '-' }}</span>
                </el-form-item> -->

                <div class="block">
                    <div class="line"></div>
                    放款单
                </div>
                <el-table :data="loanRecod" header-align="center"
                    style="width:1450px; margin-left: 100px;margin-bottom: 100px;">
                    <el-table-column label="第三方支付单号" width="" align="center">
                        <template slot-scope="scope">
                            {{ $route.query.paymentNo }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="userName" label="收款人姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="bankName" label="收款人银行名称" width="" align="center"></el-table-column>
                    <el-table-column prop="userType" label="收款人类型" width="" align="center">

                        <template slot-scope="scope">
                            {{ scope.row.flagCard == '0' ? '对私' : '对公' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="bankNo" label="收款银行卡号" width="" align="center"></el-table-column>
                    <el-table-column prop="prcptcd" label="收款银行大额行号" width="" align="center"></el-table-column>
                    <el-table-column prop="openBank" label="收款银行编码" width="" align="center"></el-table-column>
                    <el-table-column prop="loanStatus" label="放款状态" width="" align="center"></el-table-column>
                    <el-table-column prop="paymentTime" label="放款时间" width="" align="center"></el-table-column>

                </el-table>

            </el-form>
            <div class="block">
                <div class="line"></div>
                还款计划
            </div>
            <el-table :data="repaymentPlan" header-align="center"
                style="width:1450px; margin-left: 100px;margin-bottom: 100px;">
                <el-table-column label="还款金额" width="" align="center">
                    <template slot-scope="scope">
                        ¥{{ $route.query.loanAmount }}
                    </template>
                </el-table-column>

                <el-table-column prop="currentPrincipal" label="待还本金" width="" align="center"></el-table-column>
                <el-table-column prop="remainInterestAmount" label="待还利息" width="" align="center"></el-table-column>
                <el-table-column prop="remainPenaltyAmount" label="待还罚息" width="" align="center"></el-table-column>
                <el-table-column prop="currentRepaymentAmount" label="待还总额" width="" align="center"></el-table-column>
                <el-table-column prop="paymentPrincipal" label="已还本金" width="" align="center"></el-table-column>
                <el-table-column prop="paymentInterest" label="已还利息" width="" align="center"></el-table-column>
                <el-table-column prop="paymentPenaltyInterest" label="已还罚息" width="" align="center"></el-table-column>
                <el-table-column prop="dealAmount" label="已还总额" width="" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="" align="center"></el-table-column>
                <!-- <el-table-column prop="repaymentAmount" label="还款金额" width="" align="center">
                    <template slot-scope="scope">
                        ¥{{ scope.row.currentPrincipal }}
                        （含手续费¥{{ scope.row.currentInterest }}）
                    </template>
                </el-table-column>
                <el-table-column prop="repaymentAmount" label="待还总金额" width="" align="center">
                    <template slot-scope="scope">
                        ¥{{ scope.row.currentRepaymentAmount }}
                    </template>
                </el-table-column> -->
            </el-table>
        </el-card>

    </div>
</template>

<script>
import { serveList, getBankForLoan, getLoanFile, repaymentPlan, getLoanDetail } from '../../../api/dhfq'
import { getLoanInfo, getLoanRecod, getRepaymentPlan } from '../../../api/ddb'
export default {
    data() {
        return {
            repaymentPlan: [],
            loanInfo: {},
            billData: [],
            formData: {},
            fileList: [],
            dialogFormVisible: true,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '手机号码',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '资方名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '类型',
                    filterable: true,
                    options: [
                        {
                            label: '物流',
                            value: '物流',
                        },
                        {
                            label: '广告/推广',
                            value: '广告/推广',
                        },
                        {
                            label: '货物采购',
                            value: '货物采购',
                        },
                        {
                            label: '仓储',
                            value: '仓储',
                        },
                        {
                            label: '代运营',
                            value: '代运营',
                        },
                        {
                            label: '其他',
                            value: '其他',
                        },
                    ]
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '状态',
                    filterable: true,
                    options: [
                        {
                            label: '待审核',
                            value: '待审核',
                        },
                        {
                            label: '审核通过',
                            value: '审核通过',
                        },
                        {
                            label: '审核拒绝',
                            value: '审核拒绝',
                        },
                    ]
                },],
            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],
            bankInfo: {},
            serveInfo: {},
            serveAmount: 0,
            value: '',
            paymentFile: '',
            loanFile: '',
            loanRecod: {},
            columns: [
                {
                    label: '用户编号',
                    prop: 'rulesumName'
                },
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'linkProduct'
                },
                {
                    label: '产品名称',
                    prop: 'step'
                },
                {
                    label: '资方名称',
                    prop: 'rulesumType'
                },
                {
                    label: '手机号码',
                    prop: 'createTime'
                },
                {
                    label: '用户名称',
                    prop: 'createTime'
                },
                {
                    label: '授信额度',
                    prop: 'createTime'
                },
                {
                    label: '可用额度    ',
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '240',
                    operates: [
                        {
                            event: 'seeRules',
                            text: '查看规则',
                            type: 'primary'
                        },
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            loanDetailData: {},
        };
    },
    created() {
        getLoanInfo(this.$route.query.loanCode).then(res => {
            this.loanInfo = res.data
            console.log(this.loanInfo);
        })
        getLoanRecod(this.$route.query.loanCode).then(res => {
            res.data.forEach(item => {
                item.loanStatus = item.loanStatus == 'SUCCESS' ? '放款成功' : '放款失败'
            })
            this.loanRecod = res.data
            console.log(this.loanRecod);
        })
        getRepaymentPlan(this.$route.query.loanCode).then(res => {
            this.repaymentPlan = res.data
            console.log(this.repaymentPlan);
        })
    },
    methods: {
        getNextDate(date, day) {
            var dd = new Date(date);
            dd.setDate(dd.getDate() + day);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
            return y + "-" + m + "-" + d;
        },
        _getLoanFile(url) {
            window.open(url)
        },
        _getList() {

        },


    }
};
</script>

<style lang="less">
.service {
    .text {
        width: 280px;
        display: block;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .block {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        width: 100%;
        padding-left: 32px;
        margin: 24px 0;
        font-size: 18px;
        color: #323232;
        letter-spacing: 0;
        text-align: justify;
        line-height: 26px;
        font-weight: 500;

        .note {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #646566;
            letter-spacing: 0;
            text-align: justify;
            line-height: 26px;
            font-weight: 400;
            padding-left: 12px;
        }

        .line {
            width: 4px;
            height: 16px;
            background: #E52D6D;
            margin-right: 8px;


        }
    }

}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>