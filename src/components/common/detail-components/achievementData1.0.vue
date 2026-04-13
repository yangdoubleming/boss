<template>
    <div style="margin-top:24px;padding-bottom:24px;width:100%" v-if="showPage">
        <el-card shadow="hover" style="width:100%;height:1100px">
            <div style="display:flex;">
                <div style="display:block;margin-bottom:30px;width:48%;">
                    <p style="margin-bottom:15px;font-size:18px;font-weight:bold">最新数据</p>
                    <div class="box" style="justify-content: space-between;">
                        <div class="content1" style="border-right:none;background:#fff;width:170px;">
                            <!-- 综合评分
                            <span class="font-bold" :style="{color:Number(score.toFixed(2))>=60?'#333':'#ff0404'}">{{score.toFixed(2)}}</span>-->
                            销售评级
                            <span class="font-bold">{{ tableData.salesStabilityScore || '-' }}</span>
                        </div>
                        <div class="content1" style="background:#fff;padding-right:15px;width:170px">
                            报告日期
                            <span style="padding-left:15px;font-style: italic; text-decoration:underline ">{{
                                tableData.reportCardDataDate }}</span>
                        </div>
                    </div>

                    <div class="box" style="justify-content: space-between;">
                        <!-- <div class="content1" style="border-right:none;background:#fff;width:25%">
                        销售评级
                        <span class="font-bold">{{tableData.salesStabilityScore}}</span>
                        </div>-->
                        <div class="content1" style="border-right:none;background:#fff;width:25%">
                            店铺评分
                            <span class="font-bold" style="padding-left:15px">{{ tableData.calcScore }}</span>
                        </div>
                        <div class="content1" style="border-right:none;background:#fff;width:25%">
                            订单数
                            <span class="font-bold" style="padding-left:15px">{{ tableData.ttmOrders }}</span>
                        </div>
                        <div class="content1" style="border-right:none;background:#fff;padding-right:15px;width:25%">
                            年销售额
                            <span class="font-bold">${{ tableData.year1SalesValue }}</span>
                        </div>
                        <div class="content1" style="background:#fff;width:25%">
                            年回款额
                            <span class="font-bold">${{ tableData.year1DisbursementsValue }}</span>
                        </div>
                    </div>

                    <div class="box" style="justify-content: space-between;">
                        <div class="content1 pink">评论数</div>
                        <div class="content2 pink">{{ tableData.ttmFeedback }}</div>
                        <div class="content1 yellow">警告次数</div>
                        <div class="content2 yellow">{{ tableData.ttmSellerWarnings }}</div>
                        <div class="content1 blue">FBA库存</div>
                        <div class="content2 blue">{{ tableData.last3MonthFbaInventoryValue }}</div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">差评数</div>
                        <div class="content2 pink">{{ tableData.ttmNegativeFeedback }}</div>
                        <div class="content1 yellow">瑕疵订单</div>
                        <div class="content2 yellow">{{ tableData.ttmOrderDefects }}</div>
                        <div class="content1 blue">FBA比率</div>
                        <div class="content2 blue">{{ tableData.last13WeekFbaRate }}%</div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">退货数</div>
                        <div class="content2 pink">{{ tableData.ttmReturns }}</div>
                        <div class="content1 yellow">迟发次数</div>
                        <div class="content2 yellow">{{ tableData.ttmLateShipments }}</div>
                        <div class="content1" style="border-right:none;background:#fff"></div>
                        <div class="content2"></div>
                    </div>
                    <div class="box">
                        <div class="content1 pink">退货率</div>
                        <div class="content2 pink">{{ (tableData.ttmReturns / tableData.ttmOrders * 100).toFixed(2) }}%
                        </div>
                        <div class="content1 yellow">取消次数</div>
                        <div class="content2 yellow">{{ tableData.ttmCancellations }}</div>
                        <div class="content1" style="border-right:none;background:#fff"></div>
                        <div class="content2"></div>
                    </div>
                    <div class="box">
                        <div class="content1">主营业务</div>
                        <div class="content2" style="width:485px">{{ tableData.primaryProductCategory }}</div>
                        <div class="content1">年限</div>
                        <div class="content2">{{ tableData.amazonTenure }}天</div>
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
            <xtable :columns="columns" @edit="getInfo" :detailTable="true" :tableData="sanplData" />
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
                newV.forEach((item) => {
                    total = total + Number(item.year1SalesValue);
                });

                newV.forEach((item, index) => {
                    if (index == 1) {
                        this.score = this.score + (Number(item.calcScore) * Number(item.year1SalesValue)) / total;
                    } else {
                        this.score = this.score + Number(item.calcScore) * (Number(item.year1SalesValue) / total);
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
        getInfo(val1, data) {
            // console.log(val1, data);
        },
        changeSelect(value) {
            this.sanplData.forEach((item) => {
                if (item.offerId.includes(value)) {
                    this.option.xAxis.data = [];
                    this.option2.xAxis.data = [];
                    this.option.series[0].data = [];
                    this.option.series[1].data = [];
                    this.option2.series[0].data = [];
                    this.option2.series[1].data = [];
                    this.tableData = item;
                    Object.keys(item.weekMap).forEach((key) => {
                        this.option.xAxis.data.push(item.weekMap[key]);
                    });
                    Object.keys(item.monthMap).forEach((key) => {
                        this.option2.xAxis.data.push(item.monthMap[key]);
                    });
                    this.weeksSales.forEach((key) => {
                        this.option.series[0].data.push(item[key]);
                    });
                    this.weeksDisbursements.forEach((key) => {
                        this.option.series[1].data.push(item[key]);
                    });
                    this.monthsSales.forEach((key) => {
                        this.option2.series[0].data.push(item[key]);
                    });
                    this.monthsDisbursements.forEach((key) => {
                        this.option2.series[1].data.push(item[key]);
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
                    bottom: '0%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [1, 2, 3, 4, 5, 6]
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
                    text: '最近12月销售与回款趋势',
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
                            let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 8);
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
                    width: '110'
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
            width: 140px;
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
            width: 170px;
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