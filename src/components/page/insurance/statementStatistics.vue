<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">报表统计</span>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" style="padding: 30px 0px 20px 5px">
                        <el-row style="display: flex">
                            <div class="condition">
                                <a v-for="(item, index) in data" :key="item"
                                    :class="isactive == index ? 'addclass' : ''" @click="onclick(index)"
                                    style="cursor: pointer">{{ item }}</a>
                            </div>
                            <el-form-item label="统计日期：" class="timeC">
                                <el-date-picker v-model="dateTime" type="monthrange" range-separator="至"
                                    start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM"
                                    :clearable="false">
                                </el-date-picker>

                                <el-tooltip class="item" effect="dark" content="此处按照订单支付时间统计" placement="top-start">
                                    <i class="el-icon-warning-outline" style="margin-left: 10px"></i>>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="渠道分类：" v-if="isactive === 1">
                                <el-select v-model="ruleForm.channelClass" :placeholder="$t('loan_detail_choose')"
                                    style="width: 100%">
                                    <el-option label="全部渠道" value=""></el-option>
                                    <el-option label="市场渠道" value="market"></el-option>
                                    <el-option label="销售渠道" value="sale"></el-option>
                                    <el-option label="大地渠道" value="dadi"></el-option>
                                    <el-option label="IS渠道" value="is"></el-option>
                                    <el-option label="保险部门" value="insuran"></el-option>
                                    <el-option label="其他渠道" value="other"></el-option>
                                    <!-- <el-option label="IS渠道" value="is"></el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item label="渠道名/码：" v-if="isactive === 1">
                                <el-input v-model="ruleForm.channelName"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row style="display: flex; padding: 0px 15px">
                            <el-button type="primary" @click="searchData"
                                style="width: 85px; height: 27px; line-height: 10px">搜索</el-button>
                            <el-button @click="reset" style="
                                    margin-left: 20px;
                                    border: 1px solid #fe1964;
                                    color: #fe1964;
                                    width: 85px;
                                    height: 27px;
                                    line-height: 10px;
                                ">重置</el-button>
                            <el-button type="primary" @click="exportExcel"
                                style="margin-left: 20px; width: 85px; height: 27px; line-height: 10px">导出</el-button>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <!-- 按保司 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0" v-if="isactive === 0">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="title">
                    <div class="left">报表统计列表</div>
                    <div class="right">
                        <span>订单数：{{ orderCount }}</span>
                        <span>保费：{{ amount }}{{ $t('common_yuan2') }}</span>
                        <span>返佣金额：{{ rebateAmount }}{{ $t('common_yuan2') }}</span>
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="companyName" label="保险公司" align="center"> </el-table-column>
                    <el-table-column prop="orderCount" label="订单数" align="center"> </el-table-column>
                    <el-table-column prop="premium" label="保费/元" align="center"> </el-table-column>

                    <el-table-column prop="commission" label="返佣比例" align="center"> </el-table-column>
                    <el-table-column prop="commissionAmount" label="返佣收入/元" align="center"> </el-table-column>
                    <el-table-column prop="marketAmount" label="市场渠道费用/元" align="center"> </el-table-column>
                    <el-table-column prop="saleAmount" label="销售渠道费用/元" align="center"> </el-table-column>
                    <el-table-column prop="dadiAmount" label="大地渠道费用/元" align="center"> </el-table-column>
                    <el-table-column prop="isamount" label="IS渠道佣金（元）" align="center"> </el-table-column>
                    <el-table-column prop="partnerAmount" label="合伙人返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="grossProfit" align="center">
                        <template slot-scope="scope" slot="header">
                            <span>
                                毛利/元
                                <el-tooltip :aa="scope" class="item" effect="dark" content="此毛利未扣除内部激励提成"
                                    placement="top-start">
                                    <i class="el-icon-warning-outline" style="margin-left: 10px"></i>>
                                </el-tooltip>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="compensateOrder" label="理赔订单数" align="center"> </el-table-column>
                    <el-table-column prop="compensateAmount" label="理赔金额/元" align="center"> </el-table-column>
                </el-table>
                <!-- <div style="font-size: 14px; color: red; margin-left: 25px; margin-top: 20px">
                    <i class="el-icon-warning-outline" style="color: #666; margin-right: 10px"></i>
                    注意：平安财险返佣比例从2022.4.24起调整为25%，历史比例仍为20%
                </div> -->
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="ruleForm.size"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-card>
        </el-row>
        <!-- 按渠道 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0" v-else>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="title">
                    <div class="left">报表统计列表</div>
                    <div class="right">
                        <span>订单数：{{ orderCount1 }}</span>
                        <span>保费：{{ amount1 }}{{ $t('common_yuan2') }}</span>
                        <span>返佣金额：{{ rebateAmount1 }}{{ $t('common_yuan2') }}</span>
                    </div>
                </div>
                <el-table :data="tableData1" style="width: 100%; font-size: 14px">
                    <el-table-column prop="channelClass" label="渠道分类" align="center"> </el-table-column>
                    <el-table-column prop="channelName" label="渠道名" align="center"> </el-table-column>
                    <el-table-column prop="channelCode" label="渠道码" align="center"> </el-table-column>
                    <el-table-column prop="orderCount" label="订单数" align="center"> </el-table-column>
                    <el-table-column prop="premium" label="保费/元" align="center"> </el-table-column>
                    <el-table-column prop="rebate" label="返佣比例" align="center">
                        <!-- <div>1</div>
                        <template slot-scope="scope">
                            {{ scope.row.channelClass + '%' }}
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="rebateAmount" label="返佣金额/元" align="center"> </el-table-column>
                    <el-table-column prop="compensateOrder" label="理赔订单数" align="center"> </el-table-column>
                    <el-table-column prop="compensateAmount" label="理赔金额/元" align="center"> </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total1" :page-size="ruleForm.size"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { companyPage, channelPage } from '@/api/insur';
export default {
    name: 'statementStatistics',
    data() {
        return {
            ruleForm: {
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                current: 1,
                size: 10,
                method: '',
                channelClass: '', // 渠道分类
                channelName: '' // 渠道名
            },
            isactive: 0,
            dateTime: [],
            tableData: [],
            tableData1: [],
            total: 0,
            amount: '',
            orderCount: '',
            rebateAmount: '',
            total1: 0,
            orderCount1: '',
            amount1: '',
            rebateAmount1: '',
            count: '',
            data: ['按保司', '按渠道'],
            baseUrl: process.env.VUE_APP_BASE_URL,
            baseChannelUrl: process.env.VUE_APP_CHANNEL
        };
    },
    created() {
        this.getDataList(this.ruleForm);
        this.getTime();
        this.ruleForm.startTime = this.dateTime[0] + '-01';
        this.ruleForm.endTime = this.dateTime[1] + '-31';
        if (this.isactive === 0) {
            this.ruleForm.method = 'company';
        } else {
            this.ruleForm.method = 'channel';
        }
    },
    methods: {
        searchData() {
            this.ruleForm.current = 1;
            this.total1 = 0;
            this.ruleForm.startTime = this.dateTime[0] + '-01';
            this.ruleForm.endTime = this.dateTime[1] + '-31';
            this.getDataList(this.ruleForm);
        },
        reset() {
            this.dateTime = [];
            this.ruleForm.startTime = '';
            this.ruleForm.endTime = '';
            this.ruleForm.channelClass = '';
            this.ruleForm.channelName = '';
        },
        getDataList(paramer) {
            if (this.isactive === 0) {
                companyPage(paramer).then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data.records;
                        this.total = res.data.total;
                        this.rebateAmount = res.data.rebateAmount;
                        this.amount = res.data.amount;
                        this.orderCount = res.data.orderCount;
                    }
                });
            } else {
                channelPage(paramer).then((res) => {
                    if (res.code === 200) {
                        // console.log(res.data);
                        this.tableData1 = res.data.records;
                        this.total1 = res.data.total;
                        this.rebateAmount1 = res.data.rebateAmount;
                        this.amount1 = res.data.amount;
                        this.orderCount1 = res.data.orderCount;
                    }
                });
            }
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        onclick(index) {
            //将点击的元素的索引赋值给变量
            this.isactive = index;
            this.ruleForm.current = 1;
            this.getDataList(this.ruleForm);
            if (this.isactive === 0) {
                this.ruleForm.method = 'company';
            } else {
                this.ruleForm.method = 'channel';
            }
        },
        //获取时间
        getTime() {
            var getNowDate = new Date();
            //获取当前日期时间
            const nowYear = getNowDate.getFullYear();
            let nowMonth = getNowDate.getMonth() + 1;
            let nowDay = getNowDate.getDate();
            if (nowMonth >= 1 && nowMonth <= 9) {
                nowMonth = '0' + nowMonth;
            }
            if (nowDay >= 1 && nowDay <= 9) {
                nowDay = '0' + nowDay;
            } else if (nowDay == 1) {
                nowDay = 30;
                nowMonth -= 1;
            }
            var nowDate = nowYear + '-' + nowMonth

            //获取一个月前时间
            getNowDate.setMonth(getNowDate.getMonth() - 1);
            var thirtyYear = getNowDate.getFullYear();
            var thirtyMonth = getNowDate.getMonth() + 1;
            var thirtyDay = getNowDate.getDate();
            if (thirtyMonth >= 1 && thirtyMonth <= 9) {
                thirtyMonth = '0' + thirtyMonth;
            }
            if (thirtyDay >= 1 && thirtyDay <= 9) {
                thirtyDay = '0' + thirtyDay;
            }
            var monthDate = thirtyYear + '-' + thirtyMonth
            // 获取三年时间
            this.ruleForm.startTime = monthDate;
            this.ruleForm.endTime = nowDate;
            this.dateTime[0] = nowDate;
            this.dateTime[1] = nowDate;
        },
        // 导出excel
        exportExcel() {
            this.ruleForm.startTime = this.dateTime[0] + '-01';
            this.ruleForm.endTime = this.dateTime[1] + '-31';

            const axios = require('axios');
            let that = this;
            axios({
                method: 'post',
                responseType: 'blob',
                // url: `${this.baseChannelUrl}/channel-insurance/report/exportExcel`,
                url: `${this.baseChannelUrl}/channel-insurance/report/exportChannelExcel`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;

                    if (that.ruleForm.startTime && that.ruleForm.endTime) {
                        downloadElement.download = `责任险报表统计${that.ruleForm.startTime}-${that.ruleForm.endTime}.xlsx`;
                    } else {
                        downloadElement.download = `责任险报表统计.xlsx`;
                    }
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error);
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
    .condition {
        width: 200px;
        line-height: 32px;
        padding: 0 15px;

        a {
            padding: 5px 20px;
            border: 1px solid #e71d5d;
            color: #e71d5d;
            font-size: 13px;
        }

        a:nth-child(2) {
            border-left: none;
        }

        .addclass {
            background-color: #e71d5d;
            color: #fff;
            border: 1px solid #e71d5d;
        }
    }

    .el-form-item {
        // width: 28%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
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

.title {
    display: flex;
    margin: 20px 15px 30px;

    .left {
        flex: 1;
        font-size: 16px;
        color: #666;
        font-weight: 700;
    }

    .right {
        // width: 30%;
        font-size: 14px;
        color: #666;

        span {
            margin-right: 20px;
        }
    }
}
</style>