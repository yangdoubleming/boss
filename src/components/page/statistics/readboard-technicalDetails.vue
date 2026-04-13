<template>
    <div class="readboard-technicalDetails">
        <!-- 页面头部标题 -->
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: #9a9a9a; font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />{{
                    $t('common_dsb')
                }}
                /首页
            </div>
        </div>
        <!-- 按钮组1 -->
        <div class="btn-group btn-group-toggle btn-d" data-toggle="buttons">
            <label
                v-for="(option, index) in bigLineChartCategories"
                :key="option"
                class="btn btn-sm btn-primary btn-simple"
                :class="{ active: blueBarChart.activeIndex === index }"
                :id="index"
            >
                <input
                    type="radio"
                    @click="initBigChart(index)"
                    name="options"
                    autocomplete="off"
                    :checked="blueBarChart.activeIndex === index"
                />
                {{ option }}
            </label>
        </div>
        <div class="item">
            <!-- 第一个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div class="item1-T-L-wenzi">总机构数（个）</div>
                        <div class="item1-T-L_number">{{ countSum }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_first">本月新增： {{ countMonth }}</div>
                        <div class="item1-T-R_two">本年新增： {{ countYear }}</div>
                        <!-- <div>今日成交： 32</div> -->
                    </div>
                </div>
                <div class="item1-B-left">
                    <div>日活： {{ dailyActivityCount }}</div>
                    <div>月活： {{ monthlyActivityCount }}</div>
                    <!-- <div>转化率： 902</div> -->
                </div>
            </div>
            <!-- 第二个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div class="item1-T-L-wenzi">累计GMV（万元）</div>
                        <div class="item1-T-L_number">{{ amountSum }}</div>
                    </div>
                    <div class="two">
                        <div class="item1-T-R_first">本月新增： {{ amountMonth }}</div>
                        <div class="item1-T-R_two">本年新增： {{ amountYear }}</div>
                        <!-- <div>本季新增： 32</div> -->
                    </div>
                </div>
                <div class="item1-B">
                    <div>ARR年收入: {{ alldata.arr }}</div>
                    <!-- <div>平均利率： 902</div> -->
                    <div>机构用户： {{ userCountSum }}</div>
                </div>
            </div>
        </div>
        <!-- 柱状图 -->
        <div class="row">
            <div class="col-12">
                <card type="chart" style="background: rgb(39, 41, 61); width: 97.5%">
                    <template slot="header">
                        <div class="zhexiantu">
                            <div class="zhexiantu-top">
                                <!-- 按钮组2 -->
                                <div class="btn-group btn-group-toggle btnz1" data-toggle="buttons">
                                    <label
                                        v-for="(option, index) in bigLineChartCategories2"
                                        :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: blueBarChart.activeIndex2 === index }"
                                        :id="index"
                                    >
                                        <input
                                            type="radio"
                                            @click="initBigChart2(index)"
                                            name="options"
                                            autocomplete="off"
                                            :checked="blueBarChart.activeIndex2 === index"
                                        />
                                        {{ option }}
                                    </label>
                                </div>
                                <!-- 按钮组3 -->
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label
                                        v-for="(option, index) in bigLineChartCategories3"
                                        :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: blueBarChart.activeIndex3 === index }"
                                        :id="index"
                                    >
                                        <input
                                            type="radio"
                                            @click="initBigChart3(index)"
                                            name="options"
                                            autocomplete="off"
                                            :checked="blueBarChart.activeIndex3 === index"
                                        />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                            <div class="zhexiantu-top-wenzi" v-if="blueBarChart.activeIndex3 == 0">GMV（单位：万元）</div>
                            <div class="zhexiantu-top-wenzi" v-if="blueBarChart.activeIndex3 == 1">用户数（单位：个）</div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <bar-chart
                            style="height: 30%"
                            ref="DowAcount"
                            chart-id="blue-bar-chart"
                            :chart-data="blueBarChart.chartData"
                            :gradient-stops="blueBarChart.gradientStops"
                            :extra-options="blueBarChart.extraOptions"
                        >
                        </bar-chart>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
import { searchFinancialProducts } from '@/api/loanDataBoard';
import LineChart from '../../Charts/LineChart';
import BarChart from '../../Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import '../../../assets/china';
import { boardDate, distributed } from '../../../api/loanDataBoard';
import moment from 'moment';

import { getLoan, getCount, getUser, getProduct, getInsurance, getLoans } from '../../../api/loanDataBoard';
import { Bar } from 'vue-chartjs';
export default {
    components: {
        LineChart,
        BarChart
    },
    data() {
        return {
            type: '',
            dateType: '',
            alldata: '', //返回的全部数据
            countSum: '', //总机构数
            countMonth: '', //本月新增机构数
            countYear: '', //本年新增机构数
            dailyActivityCount: '', //日活机构数
            monthlyActivityCount: '', //月活机构数
            amountSum: '', //累计GMV
            amountMonth: '', //本月新增GMv
            amountYear: '', //本年新增GMV
            userCountSum: '', //机构用户数
            // 柱状图数据
            blueBarChart: {
                extraOptions: chartConfigs.barChartOptions,
                activeIndex: 0,
                activeIndex2: 0,
                activeIndex3: 0,
                chartData: {
                    labels: ['2022-01'],
                    datasets: [
                        {
                            label: 'Countries',
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: [50, 50, 50, 50, 50, 50]
                        }
                    ]
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0]
            },
            bigLineChartCategories: ['金融云', '保险云', 'Dow+云', '豆服会员'],
            bigLineChartCategories2: ['按月', '按季度', '按年'],
            bigLineChartCategories3: ['按GMV', '按用户数量']
        };
    },
    methods: {
        // 页面初始化
        initAll() {
            // 按钮组1的初始按钮是1
            this.type = 'CREDIT_CLOUD';
            this.dateType = 'MONTH';
            let params = {
                Type: this.type,
                dateType: this.dateType
            };
            searchFinancialProducts(params).then((res) => {
                this.alldata = res.data;
                this.countSum = res.data.countSum;
                this.countMonth = res.data.countMonth;
                this.countYear = res.data.countYear;
                this.dailyActivityCount = res.data.dailyActivityCount;
                this.monthlyActivityCount = res.data.monthlyActivityCount;
                this.amountSum = res.data.amountSum;
                this.amountMonth = res.data.amountMonth;
                this.amountYear = res.data.amountYear;
                this.userCountSum = res.data.userCountSum;
                // 按钮组2的初始按钮是1
                var xydata = [];
                xydata = this.alldata.amountMap;
                let labelsdata = Object.keys(xydata);
                let valuesdata = Object.values(xydata);
                if (valuesdata.length > 12) {
                    valuesdata = valuesdata.slice(-12);
                    labelsdata = labelsdata.slice(-12);
                }
                // console.log("valuesdata",valuesdata)
                let chartData = {
                    labels: labelsdata,
                    datasets: [
                        {
                            label: 'Countries',
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: valuesdata
                        }
                    ]
                };
                this.$refs.DowAcount.updateGradients(chartData), (this.blueBarChart.chartData = chartData);
            });
        },
        initBigChart(index) {
            if (index == 0) {
                // console.log("index", index)
                this.type = 'CREDIT_CLOUD';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            if (index == 1) {
                // console.log("index", index)
                this.type = 'INSURANCE_CLOUD';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            if (index == 2) {
                // console.log("index", index)
                this.type = 'DOW_CLOUD';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            if (index == 3) {
                // console.log("index", index)
                this.type = 'SELLER_CLOUD';
                this.dateType = 'MONTH';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            this.blueBarChart.activeIndex = index;
        },
        initBigChart2(index) {
            if (index == 0) {
                this.dateType = 'MONTH';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            if (index == 1) {
                this.dateType = 'QUARTER';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            if (index == 2) {
                this.dateType = 'YEAR';
                let params = {
                    Type: this.type,
                    dateType: this.dateType
                };
                this.getzhuzhuangtu(params);
            }
            this.blueBarChart.activeIndex2 = index;
        },
        initBigChart3(index) {
            if (index == 0) {
                var xydata = [];
                xydata = this.alldata.amountMap;
                let labelsdata = Object.keys(xydata);
                let valuesdata = Object.values(xydata);
                if (valuesdata.length > 12) {
                    valuesdata = valuesdata.slice(-12);
                    labelsdata = labelsdata.slice(-12);
                }
                let chartData = {
                    labels: labelsdata,
                    datasets: [
                        {
                            label: 'Countries',
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: valuesdata
                        }
                    ]
                };
                this.$refs.DowAcount.updateGradients(chartData), (this.blueBarChart.chartData = chartData);
            }
            if (index == 1) {
                var xydata = [];
                xydata = this.alldata.userCountMap;
                let labelsdata = Object.keys(xydata);
                let valuesdata = Object.values(xydata);
                if (valuesdata.length > 12) {
                    valuesdata = valuesdata.slice(-12);
                    labelsdata = labelsdata.slice(-12);
                }
                let chartData = {
                    labels: labelsdata,
                    datasets: [
                        {
                            label: 'Countries',
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: valuesdata
                        }
                    ]
                };
                this.$refs.DowAcount.updateGradients(chartData), (this.blueBarChart.chartData = chartData);
            }
            this.blueBarChart.activeIndex3 = index;
        },
        getzhuzhuangtu(chuanrudata) {
            searchFinancialProducts(chuanrudata).then((res) => {
                console.log('res', res);
                this.alldata = res.data;
                this.countSum = res.data.countSum;
                this.countMonth = res.data.countMonth;
                this.countYear = res.data.countYear;
                this.dailyActivityCount = res.data.dailyActivityCount;
                this.monthlyActivityCount = res.data.monthlyActivityCount;
                this.amountSum = res.data.amountSum;
                this.amountMonth = res.data.amountMonth;
                this.amountYear = res.data.amountYear;
                this.userCountSum = res.data.userCountSum;
                this.initBigChart3(this.blueBarChart.activeIndex3);
            });
            // console.log("this.blueBarChart.activeIndex3",this.blueBarChart.activeIndex3)
        }
    },
    watch: {},
    cteated() {},
    mounted() {
        document.querySelector('.content').setAttribute('style', 'background:rgb(30, 30, 46)');
        this.initAll();
    },
    computed: {},
    beforeDestroy() {
        document.querySelector('.content').removeAttribute('style');
    }
};
</script>
<style lang="scss" scoped>
.readboard-technicalDetails {
    .but-wai {
        margin-left: 30px;
        display: flex;
    }
    .btn-d {
        margin-left: 56px;
    }
    // 按钮点击后的颜色
    .active {
        color: #ffffff;
        background: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca) !important;
    }

    // 按钮没点击的颜色
    .deactive {
        color: #e14eca;
        // background: rgb(30, 30, 46);
    }

    // 按钮样式
    .btn {
        border: 1px solid #e14eca;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 70px;
        height: 20px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        border-radius: 4px;
    }
    .btn-d {
        margin-left: 56px;
    }
    .btn:hover {
        transform: translateY(-1px);
    }

    .item {
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        margin-left: 40px;
        display: flex;
        width: 90%;
        justify-content: space-between;
    }
    .btn-d {
        margin-left: 56px;
    }

    .item1 {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        height: 200px;
        // border: 1px solid white;
        width: 43%;
        background: rgb(39, 41, 61);
        padding-left: 10px;
        padding-right: 10px;
        font-family: SourceHanSansSC-regular;

        .item1-T {
            height: 80%;
            display: flex;

            .item1-T-L {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100%;
                width: 50%;

                // border: 1px solid blue;
                .item1-T-L-wenzi {
                    margin-left: 40px;
                    font-size: 18px;
                    font-family: SourceHanSansSC-regular;
                }

                .item1-T-L_number {
                    color: #ffffff;
                    margin-bottom: 40px;
                    font-size: 20px;
                }
            }

            .item1-T-R {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100%;
                width: 50%;
                padding: 0 0 0 135px;

                // border: 1px solid blue;
                .item1-T-R_first {
                    margin-top: 20px;
                    text-align: start;
                    width: 50%;
                }
                .item1-T-R_two {
                    text-align: start;
                    width: 50%;
                }
            }
            .two {
                width: 50%;
                display: flex;
                flex-direction: column;
                text-align: start;
                justify-content: space-around;
                padding: 20px 0 0 217px;
            }
        }

        .item1-B {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid;
            // border: 1px solid red;
            height: 20%;
            padding: 10px 69px 0;
            padding-right: 124px;
        }
        .item1-B-left {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid;
            // border: 1px solid red;
            height: 20%;
            padding: 10px 69px 0;
            padding-right: 137px;
        }
    }

    .zhuzhuangtu {
        // border: 1px solid red;
        padding-top: 30px;
        background: rgb(39, 41, 61);
        align-items: center;
        position: relative;
        width: 90%;
        margin-top: 40px;
        display: flex;
        margin-left: 37px;
        flex-direction: column;

        .zhuzhuangtu-top {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .zhuzhuangtu-top2 {
            width: 100%;
            // border: 1px solid red;
            display: flex;
            margin-top: 40px;
            margin-left: 70px;
            color: white;
            margin-bottom: -30px;
            padding-left: 100px;
            justify-content: flex-start;
        }
    }

    .but-wai2 {
        display: flex;
        margin-right: 120px;
    }

    .big {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 30px;
    }

    .zhuzhuangtu-wai {
        width: 100%;
        // border: 1px solid red;
    }

    .xian {
        bottom: 56px;
        position: absolute;
        display: flex;
        width: 80%;
        margin-left: 0px;
        border: 3px solid rgb(39, 41, 61);
        // border: 3px solid red;
    }

    .zhexiantu-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .row {
        margin-left: 25px;
        width: 92.5%;
        margin-top: 50px;
    }

    .chart-area {
        height: auto;
    }
}
</style>
