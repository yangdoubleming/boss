<template>
    <div class='service'>
        <div style='display:flex; align-items: center;padding:18px'>
            <div style='color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;'>
                <img src='../../../../public/img/favicon.png' style='width:17px;height:17px;margin-right:5px' alt />豆沙包
                /
            </div>

            <span style='color:rgba(0,0,0,.65);font-size:14px;padding-left:5px'>{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <el-form :model='formData' ref='ruleForm' label-width='180px' style='width: 1410px;' inline>
                <div>
                    <div class='block'>
                        <div class='line'></div>
                        服务商信息
                    </div>
                    <div class='row'>
                        <el-form-item label='服务商名称'>
                            <span class='text'>{{ detailData.serviceProviderName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='备注名称' prop='bcName'>
                            <span class='text'>{{ detailData.noteName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='服务商状态' prop='bcName'>
                            <span class='text'>{{ detailData.approvedStatus || '-' }}</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class='block'>
                        <div class='line'></div>
                        服务商银行账户<span class='note'></span>
                    </div>
                    <div class='row'>
                        <el-form-item label='银行所在地区：'>
                            <span class='text'>{{ detailData.bankArea }}</span>
                        </el-form-item>
                        <el-form-item label='开户银行：' prop='bcName'>
                            <span class='text'>{{ detailData.bankName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='支行名称：' prop='bcName'>
                            <span class='text'>{{ detailData.bankBranchName || '-' }}</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class='row'>
                        <el-form-item label='收款人名称：' prop='bcName'>
                            <span class='text'>{{ detailData.accountName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='银行账号' prop='bcName'>
                            <span class='text'>{{ detailData.accountNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='币种：'>
                            <span class='text'>{{ detailData.currency }}</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class='block'>
                        <div class='line'></div>
                        付款信息
                    </div>
                    <div class='row'>
                        <el-form-item label='付款金额：'>
                    <span class='text' style='color:#E52D6D'>{{ detailData.currency === 'CNY' ? '￥' : '$' + (Number(detailData.loanAmount)).toLocaleString()
                        }}</span>
                        </el-form-item>
                        <el-form-item label='付款凭证号：'>
                            <span class='text'>{{ detailData.paymentVoucherNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='付款备注：' prop='bcName'>
                            <span class='text'>{{ detailData.paymentNote || '-' }}</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class='block'>
                        <div class='line'></div>
                        分期账单信息
                    </div>
                    <div class='row'>
                        <el-form-item label='贷款编号：'>
                            <span class='text'>{{ detailData.loanCode || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='分期金额：' prop='bcName'>
                            <span class='text'> {{ detailData.currency === 'CNY' ? '￥' : '$' + (Number(detailData.loanAmount)).toLocaleString() }} </span>
                        </el-form-item>
                        <el-form-item label='状态：' prop='bcName'>
                            <span class='text'>{{ detailData.loanStatus || '-' }}</span>
                        </el-form-item>
                    </div>
                    <div class='row'>
                        <el-form-item label='授信主体名称：'>
                            <span class='text'>{{ detailData.bcName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='资方名称：' prop='bcName'>
                            <span class='text'>{{ detailData.lenderName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='产品名称：' prop='bcName'>
                            <span class='text'>{{ detailData.lenderProduct || '-' }}</span>
                        </el-form-item>
                    </div>
                    <!--                <el-form-item label="服务费：" prop="bcName">-->
                    <!--                    <span class="text">¥ {{ (Number(serveAmount)).toFixed(2) || '-' }}</span>-->
                    <!--                </el-form-item>-->
                    <div class='row'>
                        <el-form-item label='客户费率：' prop='bcName'>
                            <span class='text'>  {{ detailData.customerRate }} </span>
                        </el-form-item>
                        <el-form-item label='服务商补贴费率：' prop='bcName'>
                            <span class='text'>  {{ detailData.serviceProviderRate }} </span>
                        </el-form-item>
                        <el-form-item label='平台补贴费率：' prop='bcName'>
                            <span class='text'>  {{ detailData.platformRate }} </span>
                        </el-form-item>
                        <br />
                    </div>
                    <div class='row'>
                        <el-form-item label='客户服务费金额：' prop='bcName'>
                            <span class='text'>{{ detailData.customerRateAmount !== '-' ? (detailData.currency === 'CNY' ? '￥' : '$' + detailData.customerRateAmount) : '-' }} </span>
                        </el-form-item>
                        <el-form-item label='服务商补贴费金额：' prop='bcName'>
                            <span class='text'>{{ detailData.serviceProviderRateAmount !== '-' ? (detailData.currency === 'CNY' ? '￥' : '$' + detailData.serviceProviderRateAmount) : '-' }} </span>
                        </el-form-item>
                        <el-form-item label='平台补贴费金额：' prop='bcName'>
                            <span class='text'>{{ detailData.platformRateAmount !== '-' ? (detailData.currency === 'CNY' ? '￥' : '$' + detailData.platformRateAmount) : '-' }} </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label='申请时间：' prop='bcName'>
                            <span class='text'>{{ detailData.createTime || '-' }}</span>
                        </el-form-item>
                        <el-form-item label='付款时间：' prop='bcName'>
                            <span class='text'>{{ detailData.loanStartDate || '-' }}</span>
                        </el-form-item>
                    </div>

                    <div style='width:100%' v-if='paymentFile'>
                        <el-form-item label='客户付款凭证：' prop='bcName'>
                            <el-button type='primary' @click='_getLoanFile(paymentFile)'>打开文件</el-button>
                        </el-form-item>
                    </div>
                    <div style='width:100%' v-if='loanFile'>
                        <el-form-item label='财务放款凭证：' prop='bcName'>
                            <el-button type='primary' @click='_getLoanFile(loanFile)'>打开文件</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class='block'>
                <div class='line'></div>
                还款计划
            </div>
            <el-table :data='billData' header-align='center'
                      style='width:1200px; margin-left: 100px;margin-bottom: 100px;'>
                <el-table-column prop='currentTerm' label='期数' width='' align='center'></el-table-column>
                <el-table-column prop='repaymentDate' label='还款日期' width='' align='center'>
                </el-table-column>
                <el-table-column prop='repaymentAmount' label='还款金额' width='' align='center'>
                    <template slot-scope='scope'>
                        {{ detailData.currency === 'CNY' ? '￥' : '$' + Number(Number(scope.row.currentPrincipal) + Number(scope.row.currentInterest)).toFixed(2) }}
                        （含手续费{{ detailData.currency === 'CNY' ? '￥' : '$' + Number(scope.row.currentInterest).toFixed(2) }}）
                    </template>
                </el-table-column>
                <el-table-column prop='repaymentAmount' label='待还总金额' width='' align='center'>
                    <template slot-scope='scope'>
                        {{ detailData.currency === 'CNY' ? '￥' : '$' + Number(scope.row.currentRepaymentAmount).toFixed(2) }}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
import { serveList, getBankForLoan, getLoanFile, repaymentPlan, getLoanDetail } from '../../../api/dhfq';

export default {
    data() {
        return {
            detailData: {},
            billData: [],
            formData: {},
            currentPage: 1,
            totalSize: 10,
            tableData: [],
            bankInfo: {},
            serveInfo: {},
            serveAmount: 0,
            value: '',
            paymentFile: '',
            loanFile: '',
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            loanDetailData: {}
        };
    },
    created() {
        repaymentPlan(this.$route.query.loanCode).then(res => {
            res.data.forEach(item => {
                this.serveAmount = this.serveAmount + Number(item.currentInterest);
            });
            this.billData = res.data;
        });
        getLoanFile(this.$route.query.loanCode).then(res => {
            res.data.forEach(item => {
                if (item.type == 'account') {
                    this.loanFile = this.imgsBaseUrl + item.fileUrl;
                }
                if (item.type == 'user') {
                    this.paymentFile = this.imgsBaseUrl + item.fileUrl;
                }
            });
        });

        this.getDetail();
    },
    methods: {
        _getLoanFile(url) {
            window.open(url);
        },
        getDetail() {
            getLoanDetail(this.$route.query.loanCode).then(res => {
                res.data['customerRateAmount'] = res.data.customerRate ? (res.data.customerRate * res.data.loanAmount * 0.01).toFixed(2) : '-';
                res.data['platformRateAmount'] = res.data.platformRate ? (res.data.platformRate * res.data.loanAmount * 0.01).toFixed(2) : '-';
                res.data['serviceProviderRateAmount'] = res.data.serviceProviderRate ? (res.data.serviceProviderRate * res.data.loanAmount * 0.01).toFixed(2) : '-';
                console.log(res.data.customerRate);
                res.data.customerRate = res.data.customerRate ? res.data.customerRate + '%' : '-';
                res.data.platformRate = res.data.platformRate ? res.data.platformRate + '%' : '-';
                res.data.serviceProviderRate = res.data.serviceProviderRate ? res.data.serviceProviderRate + '%' : '-';
                switch (res.data.loanStatus) {
                    case 'CREATED':
                        res.data.loanStatus = '创建';
                        break;
                    case 'DISBURSE_SUCESS':
                        res.data.loanStatus = '放款成功';
                        break;
                    case 'DISBURSE_FAILED':
                        res.data.loanStatus = '放款失败';
                        break;
                    case 'OVERDUE':
                        res.data.loanStatus = '已逾期';
                        break;
                    case 'REPAYMENT':
                        res.data.loanStatus = '还款中';
                        break;
                    case 'CLOSED':
                        res.data.loanStatus = '已关闭';
                        break;
                    case 'CLEAR':
                        res.data.loanStatus = '已结清';
                        break;
                }
                switch (res.data.approvedStatus) {
                    case 'CREATED':
                        res.data.approvedStatus = '待审核';
                        break;
                    case 'ENABLED':
                        res.data.approvedStatus = '审核通过';
                        break;
                    case 'REJECTED':
                        res.data.approvedStatus = '审核拒绝';
                        break;
                }
                this.detailData = res.data;
            });
        }
    }
};
</script>

<style lang='less'>
.service {
    .text {
        width: 280px;
        display: block;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .row {
        display: flex;
        justify-content: space-between;
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
