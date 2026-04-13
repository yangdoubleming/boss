<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <el-card class="box-card">
            <div style="font-size:13px;margin:10px">贷款单详情</div>
            <div style="display:block;margin-bottom:30px;width:680px">
                <div class="box">
                    <div class="content1">授信编号</div>
                    <div class="content1">{{ loanDetail.creditCode }}</div>
                    <div class="content1">合同编号</div>
                    <div class="content1">{{ loanDetail.contractNumber }}</div>
                </div>
                <div class="box">
                    <div class="content1">创建时间</div>
                    <div class="content1">{{ loanDetail.createTime }}</div>
                    <div class="content1">利率</div>
                    <div class="content1">{{ loanDetail.apr }}%</div>
                </div>

                <div class="box">
                    <div class="content1">用户号</div>
                    <div class="content1">{{ loanDetail.userId }}</div>
                    <div class="content1">借款主体</div>
                    <div class="content1">{{ loanDetail.bcNameHk }}</div>
                </div>

                <div class="box">
                    <div class="content1">贷款金额</div>
                    <div class="content1">{{ loanDetail.loanAmount }}万美元</div>
                    <div class="content1">币种</div>
                    <div class="content1">$</div>
                </div>
                <div class="box">
                    <div class="content1">起息日</div>
                    <div class="content1">{{ loanDetail.loanStartDate }}</div>
                    <div class="content1">到期日</div>
                    <div class="content1">{{ loanDetail.loanEndDate }}</div>
                </div>

                <div class="box">
                    <div class="content1">还款方式</div>
                    <div class="content1">{{ loanDetail.repaymentMethod }}</div>
                    <div class="content1">状态</div>
                    <div class="content1">{{ loanDetail.loanStatus }}</div>
                </div>
                <div class="box">
                    <div class="content1">
                        借款期限（单位：{{ loanDetail.periodUnit === 'Y' ? '年' : loanDetail.periodUnit === 'M' ? '月' :
                loanDetail.periodUnit === 'D' ? '日' : '' }}）
                    </div>
                    <div class="content1">{{ loanDetail.loanPeriod }}</div>
                </div>
            </div>

            <div style="font-size:13px;margin:10px">还款计划</div>
            <div style="display:block;margin-bottom:30px;width:680px">
                <div class="box">
                    <div class="content1">贷款金额（美元）</div>
                    <div class="content1">{{ loanDetail.loanAmount * 10000 }}</div>
                    <div class="content1">贷款利率</div>
                    <div class="content1">{{ planData.interestRate }}</div>
                </div>

                <div class="box">
                    <div class="content1">起息日</div>
                    <div class="content1">{{ planData.loanStartDate }}</div>
                    <div class="content1">到期日</div>
                    <div class="content1">{{ planData.loanEndDate }}</div>
                </div>
                <div class="box">
                    <div class="content1">贷款币种</div>
                    <div class="content1">美元</div>
                    <div class="content1">应还本金（美元）</div>
                    <div class="content1">{{ planData.currentPrincipal }}</div>
                </div>


                <div class="box">

                    <div class="content1">实还本金（美元）</div>
                    <div class="content1">{{ planData.paymentPrincipal }}</div>

                    <div class="content1">应还利息（美元）</div>
                    <div class="content1">{{ planData.currentInterest }}</div>
                </div>
                <div class="box">
                    <div class="content1">应还逾期费用（美元）</div>
                    <div class="content1">{{ overdue }}</div>
                    <div class="content1">实还逾期费用（美元）</div>
                    <div class="content1">{{ planData.paymentPenaltyInterest }}</div>
                </div>
                <div class="box">
                    <div class="content1">应还违约费用（美元）</div>
                    <div class="content1">{{ violate }}</div>
                    <div class="content1">实还违约费用（美元）</div>
                    <div class="content1">{{ planData.paymentDefaultInterest }}</div>
                </div>
                <div class="box">

                    <div class="content1">结清日期 </div>
                    <div class="content1">{{ planData.loanClearDate }}</div>

                </div>
            </div>
            <div style="font-size:13px;margin:10px">还款单</div>
            <xtable :tableData="historyData" :columns="columns" :detailTable="true" @edit='tableEvent'></xtable>
            <div style="font-size:13px;margin:10px">到账凭证</div>
            <el-button type="primary" @click="openFile">查看详情</el-button>
            <div style="height:100px"></div>
        </el-card>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';
import { loanPage, repaymentPlan, recordList } from '../../../api/index';
export default {
    name: 'us-orderInfo',
    components: {
        xtable
    },
    data() {
        return {
            loanDetail: {},

            columns: [
                {
                    label: '借据号',
                    prop: 'duebillNo',
                    width: '170'
                },
                {
                    label: '流水号',
                    prop: 'serialNo',
                    width: 200
                },

                {
                    label: '当前还款期数',
                    prop: 'currentTerm',
                    width: '120'
                },

                {
                    label: '交易日期',
                    prop: 'dealDate'
                },
                {
                    label: '交易金额',
                    prop: 'dealAmount'
                },
                {
                    label: '还本金额',
                    prop: 'paymentPrincipal'
                },
                {
                    label: '还息金额',
                    prop: 'paymentInterest'
                },
                {
                    label: '还逾期罚息金额',
                    prop: 'paymentPenaltyInterest',
                    width: 120
                },
                {
                    label: '还违约罚息金额',
                    prop: 'paymentDefaultInterest',
                    width: 120
                },
                {
                    label: '提前结清手续费',
                    prop: 'handlingFee',
                    width: 120
                },

                {
                    label: '剩余待还本金金额',
                    prop: 'surplusPrincipal',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '160'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [

                        {
                            event: 'repaymentFile',
                            text: '流水凭证',
                            type: 'primary',

                        },

                    ],
                    fixed: 'right'
                }
            ],
            planData: {},
            historyData: [],
            overdue: 0, //逾期
            violate: 0 //违约
        };
    },
    activated() {
        recordList(this.$route.query.loanCode).then(res => {
            this.historyData = res.data.repaymentRecordVoList || [];

        });

        loanPage(1, '', this.$route.query.loanCode, '', '', '', '', '', '', 'SELF_SUPPORT').then(res => {
            let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'];
            let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'];
            res.data.records.forEach(item => {
                item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
            });
            this.loanDetail = res.data.records[0] || {};

            repaymentPlan(this.$route.query.loanCode).then(res => {
                this.planData = res.data;
                var date = new Date();
                date = date.toLocaleDateString().split('/').join('-'); //获取当前日期
                //   let star =this.$route.query.lenderProductId=='48'?this.getNewData(this.planData.startDate)
                let wd =
                    Number(
                        this.getDaysBetween(this.planData.loanEndDate, this.planData.loanClearDate || date)
                    ) - 30;
                wd = wd > 0 ? wd : 0;

                // 逾期天数
                let d =
                    this.getDaysBetween(this.planData.loanEndDate, this.planData.loanClearDate || date) > 30
                        ? 30
                        : this.getDaysBetween(this.planData.loanEndDate, this.planData.loanClearDate || date)
                console.log(date);

                this.overdue = (this.loanDetail.loanAmount * 10000 * 0.0002 * Math.round(d)).toFixed(2);
                this.violate = (this.loanDetail.loanAmount * 10000 * 0.0004 * wd).toFixed(2);
            });
        });
    },
    methods: {
        getNewData(dateTemp, days) {
            // console.log(dateTemp);
            var dateTemp = dateTemp.split('-');
            var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式

            var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000;
            var rDate = new Date(millSeconds);
            var year = rDate.getFullYear();
            var month = rDate.getMonth() + 1;
            if (month < 10) month = '0' + month;
            var date = rDate.getDate();
            if (date < 10) date = '0' + date;
            return year + '-' + month + '-' + date;
        },
        tableEvent(t, r) {
            if (!r.repaymentBillPath) return this.$message.info('凭证为空')
            window.open(r.repaymentBillPath)
        },
        openFile() {
            window.open(this.loanDetail.arrivalVoucherPath)
        },
        numFormat(num) {
            if (!num) return num;

            var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },
        getDaysBetween(dateString1, dateString2) {
            var startDate = Date.parse(dateString1);
            var endDate = Date.parse(dateString2);
            if (startDate > endDate) {
                return 0;
            }
            if (startDate == endDate) {
                return 0;
            }
            var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
            console.log();
            return days;
        }
    }
};
</script>

<style lang='less' scope>
.btm {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
}

#app {
    // width: 70%;
    min-height: 100vh;
    box-sizing: border-box;

    // padding: 50px;
    .box {
        width: 1000px;
        height: 40px;
        display: flex;
        border-left: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;

        .content1 {
            width: 1000px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fafafa;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            font-size: 13px;
            color: #333;
        }

        .content2 {
            width: 1000px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            // color: #b0b0b2;
            font-size: 13px;
        }
    }
}

/deep/.el-collapse-item__header {
    padding-left: 20px !important;
}

.eCharts-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
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
    font-size: 18px;
}

.grid-num2 {
    font-size: 18px;
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

.user-avator {
    height: 120px;
    border-radius: 50%;
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

.schart {
    width: 100%;
    height: 300px;
}
</style>