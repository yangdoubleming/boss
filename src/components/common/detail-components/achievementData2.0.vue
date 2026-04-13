<template>
    <div style="margin-top:24px;padding-bottom:24px;width:100%" v-if="showPage">
        <el-card shadow="hover" style="width:100%;height:1250px">
            <div style="display:flex;">
                <div style="display:block;margin-bottom:30px;width:48%;">
                    <p style="margin-bottom:15px;font-size:18px;font-weight:bold">最新数据</p>
                    <!-- <div class="box" style="justify-content: space-between;">
                        <div
                            class="content1"
                            style="border-right:none;background:#fff;width:170px;"
                        >
                          
                            销售评级
                            <span class="font-bold">{{tableData.salesStabilityScore}}</span>
                        </div>
                        <div
                            class="content1"
                            style="background:#fff;padding-right:15px;width:170px"
                        >
                            报告日期
                            <span
                                style="padding-left:15px;font-style: italic; text-decoration:underline "
                            >{{tableData.reportCardDataDate}}</span>
                        </div>
                    </div>

                    <div class="box" style="justify-content: space-between;">
                       
                        <div class="content1" style="border-right:none;background:#fff;width:25%">
                            店铺评分
                            <span
                                class="font-bold"
                                style="padding-left:15px"
                            >{{tableData.calcScore}}</span>
                        </div>
                        <div class="content1" style="border-right:none;background:#fff;width:25%">
                            订单数
                            <span
                                class="font-bold"
                                style="padding-left:15px"
                            >{{tableData.ttmOrders}}</span>
                        </div>
                        <div
                            class="content1"
                            style="border-right:none;background:#fff;padding-right:15px;width:25%"
                        >
                            年销售额
                            <span class="font-bold">${{tableData.year1SalesValue}}</span>
                        </div>
                        <div class="content1" style="background:#fff;width:25%">
                            年回款额
                            <span class="font-bold">${{tableData.year1DisbursementsValue}}</span>
                        </div>
                    </div>

                    <div class="box" style="justify-content: space-between;">
                        <div class="content1 pink">评论数</div>
                        <div class="content2 pink">{{tableData.ttmFeedback}}</div>
                        <div class="content1 yellow">警告次数</div>
                        <div class="content2 yellow">{{tableData.ttmSellerWarnings}}</div>
                        <div class="content1 blue">FBA库存</div>
                        <div class="content2 blue">{{tableData.last3MonthFbaInventoryValue}}</div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">差评数</div>
                        <div class="content2 pink">{{tableData.ttmNegativeFeedback}}</div>
                        <div class="content1 yellow">瑕疵订单</div>
                        <div class="content2 yellow">{{tableData.ttmOrderDefects}}</div>
                        <div class="content1 blue">FBA比率</div>
                        <div class="content2 blue">{{tableData.last13WeekFbaRate}}%</div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">退货数</div>
                        <div class="content2 pink">{{tableData.ttmReturns}}</div>
                        <div class="content1 yellow">迟发次数</div>
                        <div class="content2 yellow">{{tableData.ttmLateShipments}}</div>
                        <div class="content1" style="border-right:none;background:#fff"></div>
                        <div class="content2"></div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">退货率</div>
                        <div
                            class="content2 pink"
                        >{{(tableData.ttmReturns/tableData.ttmOrders*100).toFixed(2)}}%</div>
                        <div class="content1 yellow">取消次数</div>
                        <div class="content2 yellow">{{tableData.ttmCancellations}}</div>
                        <div class="content1" style="border-right:none;background:#fff"></div>
                        <div class="content2"></div>
                    </div>
                    <div class="box">
                        <div class="content1">主营业务</div>
                        <div
                            class="content2"
                            style="width:485px"
                        >{{tableData.primaryProductCategory}}</div>
                        <div class="content1">年限</div>
                        <div class="content2">{{tableData.amazonTenure}}天</div>
                    </div>-->

                    <div class="box" style="justify-content: space-between;border-right:1px solid #52575b">
                        <div class="content1" style="background:#fff;width:100%;border-right:none">风控报告</div>
                    </div>

                    <div class="box" style="justify-content: space-between;height:81px">
                        <div class="box"
                            style="justify-content: space-between;flex-direction:column;border-top:none;border-left:none;width:50%;">
                            <div style="display:flex;">
                                <div class="content1">报告日期</div>
                                <div class="content2" style="width:243px">{{ tableData.reportDate }}</div>
                            </div>
                            <div style="display:flex;">
                                <div class="content1">销售评级</div>
                                <div class="content2">{{ tableData.salesStabilityScore || '-' }}</div>
                            </div>
                        </div>
                        <!-- <div
                            class="box"
                            style="justify-content: space-between;height:80px;border-top:none;border-left:none;width:382px;border-left:none"
                        >
                            <div
                                class="content1"
                                style="height:80px;line-height:80px;border-bottom:none;"
                            >店铺评分</div>
                            <div
                                class="content2"
                                style="height:80px;line-height:80px;border-bottom:none;"
                            >{{tableData.shopScore}}</div>
                        </div> -->
                        <div class="box"
                            style="justify-content: space-between;flex-direction:column;border-top:none;border-left:none;width:50%;">
                            <div style="display:flex;">
                                <div class="content1">店铺评分</div>
                                <div class="content2" style="width:243px">{{ tableData.shopScore }}</div>
                            </div>
                            <div style="display:flex;">
                                <div class="content1">行业</div>
                                <div class="content2">{{ tableData.offerDataSetInfo.primaryProductCategory }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="box">
                        <div class="content1">年限</div>
                        <div class="content2">{{ tableData.amazonTenure }}天</div>
                        <div class="content1">订单数</div>
                        <div class="content2">{{ tableData.orderNumber }}</div>
                    </div>
                    <div class="box">
                        <div class="content1">评论数</div>
                        <div class="content2">{{ tableData.commentNumber }}</div>
                        <div class="content1">差评率</div>
                        <div class="content2">{{ (tableData.negativeCommentRate * 100).toFixed(2) }}%</div>
                    </div>
                    <div class="box">
                        <div class="content1">每千次订单的警告次数</div>
                        <div class="content2">{{ (tableData.per1000OrderWarning) }}</div>
                        <div class="content1">延迟配送订单比例</div>
                        <div class="content2">{{ (tableData.lateShipmentOrderRate * 100).toFixed(2) }}%</div>
                    </div>

                    <div class="box">
                        <div class="content1">每千次订单的差评数</div>
                        <div class="content2">{{ (tableData.per1000OrderNegativeComment) }}</div>
                        <div class="content1">每千次订单的好评数</div>
                        <div class="content2">{{ (tableData.per1000OrderNiceComment) }}</div>
                    </div>
                    <div class="box">
                        <div class="content1">低于3星的评价数</div>
                        <div class="content2">{{ tableData.ttmNegativeFeedback || '-' }}</div>
                        <div class="content1">瑕疵品订单比</div>
                        <div class="content2">{{ tableData.defectOrderRate ?
        (tableData.defectOrderRate * 100).toFixed(2) + '%' : '-' }}</div>
                    </div>
                    <div class="box">
                        <div class="content1">取消订单比例</div>
                        <div class="content2">{{ tableData.cancellationOrderRate ? (
        tableData.cancellationOrderRate * 100).toFixed(2) + '%' : '-' }}</div>
                        <div class="content1">周转率</div>
                        <div class="content2">{{ (tableData.turnoverRate * 100).toFixed(2) }}%</div>
                    </div>
                    <div class="box">
                        <div class="content1">过去13周FBA发货比例</div>
                        <div class="content2">{{ tableData.last13WeekFbaRate }}%</div>
                        <div class="content1">最新 FBA 库存价值({{ moneyClass }})</div>
                        <div class="content2">{{ tableData.latestFbaInventoryValue }}</div>
                    </div>
                    <div class="box">
                        <div class="content1">年销售额({{ moneyClass }})</div>
                        <div class="content2">{{ tableData.year1SalesAmount }}</div>
                        <div class="content1">年回款额({{ moneyClass }})</div>
                        <div class="content2">{{ tableData.y1DisbursementValue }}</div>
                    </div>
                    <div class="box">
                        <div class="content1">销售额年同比</div>
                        <div class="content2">{{ (tableData.salesRate * 100).toFixed(2) }}%</div>
                        <div class="content1">回款年同比</div>
                        <div class="content2">{{ (tableData.disbursementRate * 100).toFixed(2) }}%</div>
                    </div>
                </div>

                <div style="margin-left:20px;height:100%;width:50%">
                    <p style="margin-bottom:15px;font-size:18px;font-weight:bold">综合评分</p>
                    <div style="font-size:126px;font-weight:bold;text-align:center;height:326px;width:100%;align-items:center;line-height:300px;"
                        :style="{ color: Number(score.toFixed(2)) >= 60 ? '#9EEA6A' : '#ff0404' }">{{ score.toFixed(2)
                        }}</div>
                </div>
            </div>
            <div style="text-align:right">
                <el-select v-model="value" placeholder="请选择店铺offerId" style="width:600px" @change="changeSelect">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </div>

            <div class="eCharts-box" style="width:100%">
                <div style="width:50%">
                    <div id="myChart" style="width:100%;height:600px"></div>
                </div>
                <div style="margin-left:20px;width:50%">
                    <div id="myChart2" style="width:100%;height:600px"></div>
                </div>
            </div>
        </el-card>
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>卖家业绩数据</span>
            </div>
            <xtable :columns="columns" @edit="getInfo" :detailTable="true" :tableData="achievementData" />
        </el-card>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';
export default {
    components: {
        xtable
    },
    props: {
        sanplData: {
            type: Array,
            default: []
        }
    },
    watch: {
        sanplData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                if (!newV.length) return;

                let total = 0;
                this.score = 0;

                this.moneyClassArr.forEach((item) => {
                    if (item.value == newV[0].currency) {
                        this.moneyClass = item.label;
                    }
                });

                this.options = [];
                newV.forEach((item) => {
                    this.options.push({
                        value: item.offerId,
                        label: item.offerId
                    });
                });
                this.value = newV[0].offerId;

                this.showPage = true;
                this.$nextTick(() => {
                    this.changeSelect(this.value);
                    let dom = document.getElementById('myChart');
                    let myChart = this.$echarts.init(dom);
                    myChart.setOption(this.option);
                    let dom2 = document.getElementById('myChart2');
                    let myChart2 = this.$echarts.init(dom2);
                    myChart2.setOption(this.option2);
                });
            }
        }
    },
    mounted() { },
    methods: {
        getBeforeDate(n) {
            var d = new Date(this.tableData.reportDate);

            var s = '';
            var n = n;
            var year = d.getFullYear();
            var mon = d.getMonth() + 1;
            var day = d.getDate();
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;
                } else {
                    year = year - 1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate() - n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();
            s = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
            return s;
        },
        getPreMonth(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数  
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },
        getInfo(val1, data) {
            // console.log(val1, data);
        },
        changeSelect(value) {
            this.sanplData.forEach((item) => {
                if (item.offerId.includes(value)) {
                    this.score = Number(item.shopScore);

                    this.moneyClassArr.forEach((it) => {
                        console.log(it.value, item.currency);
                        if (it.value == item.currency) {
                            this.moneyClass = it.label;
                            console.log(it.value, item.currency);
                        }
                        if (it.value == item.offerDataSetInfo.marketplaceCountry) {
                            this.option.legend.data[0] = `销售金额(${it.label})`;
                            this.option.series[0].name = `销售金额(${it.label})`;
                            this.option.legend.data[1] = `回款金额(${it.label})`;
                            this.option.series[1].name = `回款金额(${it.label})`;

                            this.option2.legend.data[0] = `销售金额(${it.label})`;
                            this.option2.series[0].name = `销售金额(${it.label})`;
                            this.option2.legend.data[1] = `回款金额(${it.label})`;
                            this.option2.series[1].name = `回款金额(${it.label})`;

                        }
                    });

                    this.option.series[0].data = [];
                    this.option.xAxis.data = []
                    this.option2.xAxis.data = []
                    this.option.series[1].data = [];
                    this.option2.series[0].data = [];
                    this.option2.series[1].data = [];
                    this.tableData = item;
                    for (let i = 1; i < 7; i++) {
                        this.option.xAxis.data.unshift(this.getBeforeDate(i * 7));
                    }
                    let lastMoney = this.tableData.reportDate

                    for (let i = 1; i < 13; i++) {
                        this.option2.xAxis.data.unshift(this.getPreMonth(lastMoney));
                        lastMoney = this.getPreMonth(lastMoney)
                    }



                    this.achievementData = [];
                    this.achievementData.push(item.offerDataSetInfo);

                    this.weeksSales.forEach((key) => {
                        this.option.series[0].data.push(item.offerDataSetInfo[key]);
                    });
                    this.weeksDisbursements.forEach((key) => {
                        this.option.series[1].data.push(item.offerDataSetInfo[key]);
                    });
                    this.monthsSales.forEach((key) => {
                        this.option2.series[0].data.push(item.offerDataSetInfo[key]);
                    });
                    this.monthsDisbursements.forEach((key) => {
                        this.option2.series[1].data.push(item.offerDataSetInfo[key]);
                    });
                    this.$nextTick(() => {
                        let dom = document.getElementById('myChart');
                        let myChart = this.$echarts.init(dom);
                        myChart.setOption(this.option);
                        let dom2 = document.getElementById('myChart2');
                        let myChart2 = this.$echarts.init(dom2);
                        myChart2.setOption(this.option2);
                    });
                }
            });
        }
    },

    data() {
        return {
            moneyClass: '',
            achievementData: [],
            moneyClassArr: [
                {
                    value: 'CNY',
                    label: '人民币'
                },
                {
                    value: 'US',
                    label: '美元'
                },
                {
                    value: 'DE',
                    label: '欧元'
                }
            ],
            score: 0,
            tableData: {},
            weeksSales: ['week6SalesValue', 'week5SalesValue', 'week4SalesValue', 'week3SalesValue', 'week2SalesValue', 'week1SalesValue'],
            weeksDisbursements: [
                'week6DisbursementsValue',
                'week5DisbursementsValue',
                'week4DisbursementsValue',
                'week3DisbursementsValue',
                'week2DisbursementsValue',
                'week1DisbursementsValue'
            ],

            monthsSales: [
                'month12SalesValue',
                'month11SalesValue',
                'month10SalesValue',
                'month9SalesValue',
                'month8SalesValue',
                'month7SalesValue',
                'month6SalesValue',
                'month5SalesValue',
                'month4SalesValue',
                'month3SalesValue',
                'month2SalesValue',
                'month1SalesValue'
            ],
            monthsDisbursements: [
                'month12DisbursementsValue',
                'month11DisbursementsValue',
                'month10DisbursementsValue',
                'month9DisbursementsValue',
                'month8DisbursementsValue',
                'month7DisbursementsValue',
                'month6DisbursementsValue',
                'month5DisbursementsValue',
                'month4DisbursementsValue',
                'month3DisbursementsValue',
                'month2DisbursementsValue',
                'month1DisbursementsValue'
            ],
            options: [],
            option: {
                title: {
                    text: '最近6周销售与回款趋势'
                },
                color: ['#619FD6', '#ED8037'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['销售金额', '回款金额']
                },
                grid: {
                    left: '0%',
                    right: '5%',
                    bottom: '4%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: [
                    {
                        type: 'value'
                    },
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '销售金额',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '回款金额',
                        type: 'line',
                        data: []
                    }
                ]
            },
            option2: {
                title: {
                    text: '最近12月销售与回款趋势'
                },
                color: ['#619FD6', '#ED8037'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['销售金额', '回款金额']
                },
                grid: {
                    left: '0%',
                    right: '3%',
                    bottom: '0%',
                    containLabel: true
                },

                xAxis: {
                    axisLabel: {
                        interval: 0,
                        formatter: function (value) {
                            let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 7);
                            // console.log( val);
                            return val;
                        }
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: [
                    {
                        type: 'value',
                        name: ''
                    },
                    {
                        type: 'value',
                        name: ''
                        // max: 300000,
                        // interval: 50000
                    }
                ],
                series: [
                    {
                        name: '销售金额',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '回款金额',
                        type: 'line',
                        data: []
                    }
                ]
            },
            value: '',
            dataList: [],
            showPage: false,
            columns: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: '350',
                    infoTable: 1
                },
                {
                    label: '期限',
                    prop: 'amazonTenure',
                    width: '100'
                },
                {
                    label: this.$t('loan_detail_gqotzfba'),
                    prop: 'last13WeekFbaRate',
                    width: '150'
                },

                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'marketplaceCountry',
                    width: '100'
                },

                {
                    label: '最新 FBA 库存价值',
                    prop: 'latestFbaInventoryValue',
                    width: '150'
                },

                {
                    label: '报告日期',
                    prop: 'reportCardDataDate',
                    width: '220'
                },

                {
                    label: this.$t('loan_detail_dpzt'),
                    prop: 'sellerStatus',
                    width: '110'
                },

                {
                    label: '客户反馈总数',
                    prop: 'ttmFeedback',
                    width: '110'
                },

                {
                    label: '低于3星的评价数',
                    prop: 'ttmNegativeFeedback',
                    width: '130'
                },

                {
                    label: '过去12个月的总订单数',
                    prop: 'ttmOrders',
                    width: '155'
                },
                {
                    label: '过去12个月卖家警告总次数',
                    prop: 'ttmSellerWarnings',
                    width: '175'
                },
                {
                    label: '总退款订单数',
                    prop: 'ttmReturns',
                    width: '110'
                },

                {
                    label: '1年销售额',
                    prop: 'year1SalesValue',
                    width: '110'
                },
                {
                    label: '2年销售额',
                    prop: 'year2SalesValue',
                    width: '110'
                },
                {
                    label: '1年的回款额',
                    prop: 'year1DisbursementsValue',
                    width: '110'
                },
                {
                    label: '2年的回款额',
                    prop: 'year2DisbursementsValue',
                    width: '110'
                }
            ]
        };
    }
};
</script>

<style lang='less' scope>
.eCharts-box {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.pink {
    background-color: #fce4d6 !important;
}

.yellow {
    background-color: #fff2cc !important;
}

.blue {
    background-color: #ddebf7 !important;
}

.font-bold {
    font-weight: bold;
    color: #ff0404;
    padding-left: 30px;
}

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
        width: 100%;
        height: 40px;
        display: flex;
        border-left: 1px solid #52575b;
        border-top: 1px solid #52575b;

        .content1 {
            width: 215px !important;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-right: 1px solid #52575b;
            border-bottom: 1px solid #52575b;
            color: #333;
            font-size: 14px;
            font-weight: 600;
        }

        .content2 {
            width: 243px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #52575b;
            border-bottom: 1px solid #52575b;
            // color: #b0b0b2;
            font-size: 14px;
            font-weight: 600;
        }
    }
}
</style>