<template>
    <div class="readboard-insureDetails">
        <!-- 页面头部标题 -->
        <div style="display: flex; align-items: center; padding: 5px 18px">
            <div style="color: #9a9a9a; font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />{{
                    $t('common_dsb')
                }}
                /首页/保险详情
            </div>
        </div>

        <!-- 折线图 -->
        <div class="row">
            <div class="col-12">
                <card type="chart" style="background: rgb(39, 41, 61); width: 97.5%">
                    <template slot="header">
                        <div class="zhexiantu">
                            <div class="zhexiantu-top">
                                <div class="zhexiantu-top-wenzi" v-if="bigLineChart.activeIndex2 == 1">笔数（笔）</div>
                                <div class="zhexiantu-top-wenzi" v-else-if="bigLineChart.activeIndex2 == 3">用户数（个）</div>
                                <div class="zhexiantu-top-wenzi" v-else-if="bigLineChart.activeIndex2 == 4">保费（元）</div>

                                <div class="zhexiantu-top-wenzi" v-else>保费（万元）</div>
                                <!-- 按钮组1 -->
                                <div class="btn-group btn-group-toggle btnz1" data-toggle="buttons">
                                    <label
                                        v-for="item in bigLineChartCategories"
                                        :key="item.option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: bigLineChart.activeIndex === item.id }"
                                        :id="item.type"
                                    >
                                        <input
                                            type="radio"
                                            @click="initBigChartLeft(item.type, item.id)"
                                            name="options"
                                            autocomplete="off"
                                        />
                                        {{ item.option }}
                                    </label>
                                </div>
                                <el-select class="select" v-model="value" placeholder="所有保司" @change="getLabel">
                                    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <div class="showTime">
                                    <el-date-picker
                                        v-model="query.beginTime"
                                        type="month"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        @change="fisrtTopInit"
                                    >
                                    </el-date-picker>
                                    <el-date-picker
                                        v-model="query.endTime"
                                        type="month"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        @change="fisrtTopInit"
                                    >
                                    </el-date-picker>
                                </div>
                                <!-- 按钮组2 -->
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label
                                        v-for="(option, index) in bigLineChartCategories2"
                                        :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: bigLineChart.activeIndex2 == index }"
                                        :id="index"
                                    >
                                        <input type="radio" @click="initBigChart(index)" name="options" autocomplete="off" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart
                            style="height: 100%; width: 98%"
                            ref="bigChart"
                            chart-id="big-line-chart"
                            :chart-data="bigLineChart.chartData"
                            :gradient-colors="bigLineChart.gradientColors"
                            :gradient-stops="bigLineChart.gradientStops"
                            :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>
                    </div>
                </card>
            </div>
        </div>
        <div class="item">
            <!-- 第一个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>累计投保用户</div>
                        <div class="item1-T-L_number">{{ userCard.userCount }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_first">今日注册：{{ userCard.registerUserCount }}</div>
                        <div>今日申请：{{ userCard.applicationUserCount }}</div>
                        <div>今日成交： {{ userCard.dealUserCount }}</div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>日活数： {{ userCard.dailyActiveUserCount }}</div>
                    <div>月活数： {{ userCard.monthActiveUserCount }}</div>
                </div>
            </div>
            <!-- 第二个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>累计保费金额（万元）</div>
                        <div class="item1-T-L_number">{{ (Number(allInsureDatas.insuranceAmount) / 10000).toFixed(2) }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_first">今日新增： {{ (Number(allInsureDatas.insuranceAmountDay) / 10000).toFixed(2) }}</div>
                        <div>本月新增： {{ (Number(allInsureDatas.insuranceAmountMonth) / 10000).toFixed(2) }}</div>
                        <div>本季新增： {{ (Number(allInsureDatas.insuranceAmountQuarter) / 10000).toFixed(2) }}</div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>件均： {{ (Number(allInsureDatas.insuranceAmountAvg) / 10000).toFixed(2) }}</div>
                    <div>保险NDR： {{ (allInsureDatas.renewalRate * 100).toFixed(2) + '%' }}</div>
                </div>
            </div>
            <!-- 第三个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>在保余额（万元）</div>
                        <div class="item1-T-L_number">{{ (Number(allInsureDatas.insuranceBalance) / 10000).toFixed(2) }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_first">今日新增： {{ (Number(allInsureDatas.insuranceAmountDay) / 10000).toFixed(2) }}</div>
                        <div>本月新增： {{ (Number(allInsureDatas.insuranceAmountMonth) / 10000).toFixed(2) }}</div>
                        <div>本季新增： {{ (Number(allInsureDatas.insuranceAmountQuarter) / 10000).toFixed(2) }}</div>
                    </div>
                </div>
                <div class="item1-B"></div>
            </div>
            <!-- 第四个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>累计投保笔数</div>
                        <div class="item1-T-L_number">{{ allInsureDatas.insuranceCount }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_first">今日新增： {{ allInsureDatas.insuranceCountDay }}</div>
                        <div>本月新增： {{ allInsureDatas.insuranceCountMonth }}</div>
                        <div>本季新增： {{ allInsureDatas.insuranceCountQuarter }}</div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>累计申请用户数： {{ userCard.applicationUserCountSum }}</div>
                    <div>累计成交用户数： {{ userCard.dealUserCountSum }}</div>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <el-table
            :data="allInsureDatas.insuranceDistributionVoList"
            style="width: 98.7%"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }"
        >
            <el-table-column prop="index" label="序号" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceName" label="保险公司" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceCount" label="订单数" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceAmount" label="保费（万元）" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceApplicationUserCount" label="申请用户数" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceUserCount" label="成交用户数" min-width="8.3%"> </el-table-column>
            <el-table-column prop="insuranceAmountAvg" label="件均（元）" min-width="8.3%"> </el-table-column>
            <el-table-column prop="dailyActiceCount" label="日活数" min-width="8.3%"> </el-table-column>
            <el-table-column prop="monthActiveCount" label="月活数" min-width="8.3%"> </el-table-column>
        </el-table>
        <!-- 饼图1 -->
        <div class="bingtu">
            <div class="bingtu-top">
                <div class="bingtu-top-wenzi">保司占比情况</div>

                <!-- 按钮组3 -->
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label
                        v-for="item in bigLineChartCategories3"
                        :key="item.id"
                        class="btn btn-sm btn-primary btn-simple"
                        :class="{ active: bigLineChart.activeIndex3 === item.id }"
                        :id="item.id"
                    >
                        <input
                            type="radio"
                            @click="getPiedData(item.id)"
                            name="options"
                            autocomplete="off"
                            :checked="bigLineChart.activeIndex3 === item.id"
                        />
                        {{ item.option }}
                    </label>
                </div>
            </div>
            <div class="bingtu1">
                <pie-chart
                    style="height: 85%"
                    ref="pieChar"
                    chart-id="pie-line-chart"
                    :chart-data="pieChart.chartData"
                    :gradient-stops="pieChart.gradientStops"
                    :extra-options="pieChart.extraOptions"
                >
                </pie-chart>
            </div>
        </div>
    </div>
</template>
<script>
import LineChart from '../../Charts/LineChart';
import BarChart from '../../Charts/BarChart';
import PieChart from '../../Charts/PieChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import '../../../assets/china';
import moment from 'moment';

import {
    getInsuranceDetail, //保险图表详情
    getAllCompany,
    getUserCard,
    getProduct,
    getInsurance,
    getLoans
} from '../../../api/loanDataBoard';
import { Bar } from 'vue-chartjs';
import { login } from '../../../api/login';
export default {
    components: {
        LineChart,
        BarChart,
        PieChart
    },
    data() {
        return {
            allInsureDatas: [], //保险页面获取的所有值
            userCard: {}, //四张卡片的数据
            bigLineChartCategories: [
                { type: 'MONTH', option: '按月', id: 11 },
                { type: 'QUARTER', option: '按季度', id: 22 },
                { type: 'YEAR', option: '按年', id: 33 }
            ], //图表左侧按钮
            bigLineChartCategories2: ['GMV', '订单数', '在保余额', '用户数', '件均'],
            bigLineChartCategories3: [
                { option: '按GMV', id: 44 },
                { option: '按笔数', id: 55 },
                { option: '按在贷余额', id: 66 },

                { option: '按用户数', id: 77 }
            ],
            // 保险情况图表
            bigLineChart: {
                activeIndex: 11,
                activeIndex2: 0,
                activeIndex3: 44,
                chartData: {
                    datasets: [{}],
                    labels: ''
                },
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
            },
            // 下拉框数据
            options: [
                {
                    label: '所有保司',
                    value: ''
                }
            ],
            //请求参数
            query: {
                dateType: '', // 类型
                insuranceName: '', // 公司
                beginTime: '', // 开始时间
                endTime: '' // 结束时间
            },
            //饼图数据
            pieChart: {
                extraOptions: chartConfigs.pieChartOptions,
                chartData: {
                    labels: [],
                    datasets: [
                        {
                            backgroundColor: ['#32cc77', '#19c4ca', '#1942ca', '#dbd814', '#c22942', '#9620b9'],
                            data: []
                        }
                    ],

                    fill: false,
                    borderColor: config.colors.primary,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: config.colors.primary,
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: config.colors.primary,
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.2, 0]
            },
            // 时间选择器数据
            times: [],
            value2: '',
            value3: '',
            value4: '',

            value: ''
        };
    },
    mounted() {
        document.querySelector('.content').setAttribute('style', 'background:rgb(30, 30, 46)');
        this.fisrtTopInit();
        this.getAllCompanyName();
        this.getUserData();
        this.getPiedData();
        this.getPiedData(44);
    },
    methods: {
        //最上方折线图初始化
        fisrtTopInit() {
            getInsuranceDetail(this.query).then((res) => {
                this.allInsureDatas = res.data;
                this.allInsureDatas.insuranceDistributionVoList.forEach((item, index) => {
                    item.insuranceAmount = (Number(item.insuranceAmount) / 10000).toFixed(2);
                    item.index = index + 1;
                });
                this.initBigChart(0);
            });
        },
        //GMV和订单数系列按钮折线图切换
        initBigChart(index) {
            let lineShowData = [];
            let lineShowLabel = [];
            let months = moment(this.query.endTime).diff(moment(this.query.beginTime), 'month');
            if (index == 0) {
                lineShowData = Object.values(this.allInsureDatas.insuranceAmountDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });

                lineShowLabel = Object.keys(this.allInsureDatas.insuranceAmountDateMap);
            } else if (index == 1) {
                lineShowData = Object.values(this.allInsureDatas.insuranceCountDateMap);
                lineShowLabel = Object.keys(this.allInsureDatas.insuranceCountDateMap);
            } else if (index == 2) {
                lineShowData = Object.values(this.allInsureDatas.insuranceBalanceDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                lineShowLabel = Object.keys(this.allInsureDatas.insuranceBalanceDateMap);
            } else if (index == 3) {
                lineShowData = Object.values(this.allInsureDatas.insuranceUserCountMap);
                lineShowLabel = Object.keys(this.allInsureDatas.insuranceUserCountMap);
            } else if (index == 4) {
                lineShowData = Object.values(this.allInsureDatas.insuranceAmountAvgMap);
                lineShowLabel = Object.keys(this.allInsureDatas.insuranceAmountAvgMap);
            }
            if (isNaN(months)) {
                if (lineShowData.length > 12) {
                    lineShowData = lineShowData.slice(-12);
                    lineShowLabel = lineShowLabel.slice(-12);
                }
            } else {
                if (lineShowData.length > 12 && months < 12) {
                    lineShowData = lineShowData.slice(-12);
                    lineShowLabel = lineShowLabel.slice(-12);
                }
            }

            let chartData = {
                datasets: [
                    {
                        fill: true,
                        borderColor: config.colors.primary,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: config.colors.primary,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: config.colors.primary,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: lineShowData
                    }
                ],
                labels: lineShowLabel
            };
            this.$refs.bigChart.updateGradients(chartData);
            this.bigLineChart.chartData = chartData;
            this.bigLineChart.activeIndex2 = index;
        },
        //按月按年去切换
        initBigChartLeft(type, index) {
            this.bigLineChart.activeIndex = index;
            this.query.dateType = type;
            this.fisrtTopInit();
        },
        //获取selct选择器的值
        getLabel(value) {
            this.query.insuranceName = value;
            this.fisrtTopInit();
        },
        //获取所有保司名
        getAllCompanyName() {
            getAllCompany().then((res) => {
                res.data.forEach((item) => {
                    let obj = {};
                    obj.label = item;
                    obj.value = item;
                    this.options.push(obj);
                });
            });
        },
        //获取下面卡片的累计用户信息
        getUserData() {
            getUserCard().then((res) => {
                this.userCard = res.data[1];
            });
        },
        //饼图的数据获取
        getPiedData(id) {
            let pieShowData = [];
            let pieShowLabel = [];
            this.bigLineChart.activeIndex3 = id;
            getInsuranceDetail().then((res) => {
                if (res.code == 200) {
                    res.data.insuranceDistributionVoList.forEach((item) => {
                        pieShowLabel.push(item.insuranceName);
                        if (id == 44) {
                            pieShowData.push(Number(item.insuranceAmount));
                        } else if (id == 55) {
                            pieShowData.push(item.insuranceCount);
                        } else if (id == 66) {
                            pieShowData.push(Number(item.insuranceBalance));
                        } else {
                            pieShowData.push(item.insuranceUserCount);
                        }
                    });
                    pieShowLabel = Array.from(pieShowLabel);
                    let chartData = {
                        labels: pieShowLabel,
                        datasets: [
                            {
                                borderColor: [
                                    'rgba(74,58,218,0.7)',
                                    'rgba(156,221,95,0.7)',
                                    'rgba(25,66,202,0.7)',
                                    'rgba(219,216,20,0.7)',
                                    'rgba(194,41,66,0.7)',
                                    'rgba(226,131,212,0.7)'
                                ],
                                fill: true,
                                backgroundColor: [
                                    'rgba(74,58,218,0.7)',
                                    'rgba(156,221,95,0.7)',
                                    'rgba(25,66,202,0.7)',
                                    'rgba(219,216,20,0.7)',
                                    'rgba(194,41,66,0.7)',
                                    'rgba(226,131,212,0.7)'
                                ],
                                data: pieShowData
                            }
                        ]
                    };
                    // this.$refs.pieChar.updateGradients(chartData);
                    this.pieChart.chartData = chartData;
                }
            });
        }
    },
    watch: {},
    cteated() {},

    computed: {},

    beforeDestroy() {
        document.querySelector('.content').removeAttribute('style');
    }
};
</script>
<style lang="scss" scoped>
.readboard-insureDetails {
    color: #9a9a9a;

    .zhexiantu {
        margin-left: 10px;
        width: 98.7%;
        background: rgb(39, 41, 61);
        padding-top: 20px;
    }

    .zhexiantu_top {
        // border: 1px solid red;
        display: flex;
        height: 20px;

        .title {
            // border: 1px solid red;
            color: white;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            margin-left: 60px;
            margin-right: 20px;
            width: 120px;
        }

        .el-select {
            margin-left: 20px;
            // color: #32cc77;
        }

        .showTime {
            margin-left: 20px;
            display: flex;
            margin-right: 180px;

            .showTime1 {
                width: 70px;
                border: 1px solid rgb(203, 203, 203);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1px;
            }
        }

        .but-wai {
            display: flex;
        }
    }

    // 按钮点击后的颜色
    .active {
        color: #ffffff;
        background: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca) !important;
    }

    // 按钮没点击的颜色
    .deactive {
        color: #e14eca;
        background: rgb(39, 41, 61);
    }

    // 按钮样式
    .btn {
        border: 1px solid #e14eca;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 70px;
        height: 15px;
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        border-radius: 4px;
    }

    .btn:hover {
        transform: translateY(-1px);
    }

    .item {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .item {
        display: flex;
        width: 100%;
        justify-content: space-around;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
    }

    .item1 {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        height: 200px;
        // border: 1px solid white;
        width: 22.5%;
        background: rgb(39, 41, 61);
        padding-left: 10px;
        padding-right: 10px;

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
                .item1-T-L_number {
                    color: white;
                    margin-bottom: 40px;
                    font-size: 20px;
                    color: #fff;
                }
            }

            .item1-T-R {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100%;
                width: 50%;

                // border: 1px solid blue;
                .item1-T-R_first {
                    margin-top: 20px;
                }
            }
        }

        .item1-B {
            padding-top: 5px;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid;
            // border: 1px solid red;
            height: 20%;
        }
    }

    .el-table {
        margin-left: 10px;
        margin-top: 40px;
        background: rgb(30, 30, 46);
        color: rgb(154, 154, 154);
        border-bottom: none;
    }

    .bingtu1 {
        height: 30%;
        width: 30%;
        margin: 20px auto 0px;
        // display: flex;
        // justify-content: center;
        height: 400px;
        // margin-top: 50px;
        // border: 1px solid red;
        background-color: rgb(39, 41, 61);
    }

    //取消表格下发白线
    .el-table::before {
        height: 0;
    }

    #main2 {
        margin-left: 300px;
    }

    .zhexiantu-top {
        justify-content: space-between;
        align-items: center;
        // border: 1px solid red;
        width: 100%;
        height: 40px;
        display: flex;
    }

    .zhexiantu-top-wenzi {
        display: flex;
    }

    .btnz1 {
        display: flex;
    }

    .showTime2 {
        // border: 1px solid red;
        margin-right: 20px;
        display: flex;
    }

    .bingtu {
        height: 400px;
        padding-top: 20px;
        width: 98.7%;
        position: relative;
        margin-top: 40px;
        margin-left: 10px;
        // border: 1px solid red;
        display: flex;
        background-color: rgb(39, 41, 61);
        flex-direction: column;

        .bingtu-top {
            background-color: rgb(39, 41, 61);
            // border: 1px solid red;
            width: 50%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: right;
            margin: 0 auto;
            margin-right: 144px;

            .but-wai2 {
                display: flex;
                margin-left: 20px;
            }
        }
    }

    .bingtu-top-wenzi {
        display: flex;
        // border: 1px solid red;
        margin-right: 183px;
        font-size: 20px;
        color: white;
    }

    .shuoming {
        position: absolute;
        top: 200px;
        right: 200px;
        display: flex;
        flex-direction: column;

        .shuoming-hang1 {
            display: flex;
            align-items: center;

            .shuoming-hang1-L {
                display: flex;
                justify-content: flex-end;
                width: 100px;
            }

            .shuoming-hang1-R {
                margin-left: 10px;
                height: 15px;
                width: 30px;
                border: 1px solid red;
            }
        }
    }

    .showTime {
        display: flex;
        align-items: center;
        position: absolute;
        left: 630px;
    }

    .chart-area {
        // border: 1px solid red;
        height: 350px;
    }

    .btnz1 {
        position: absolute;
        left: 150px;
    }

    .select {
        position: absolute;
        left: 480px;
    }
    .row {
        margin-left: -4px;
    }
}
</style>
<style lang="scss">
.readboard-insureDetails {
    .el-select .el-input__inner {
        height: 25px !important;
    }
    .el-input--prefix .el-input__inner {
        height: 25px !important;
    }
    .el-input__suffix .el-input__inner {
        height: 25px !important;
    }
    // 修改输入框鼠标悬浮时的边框颜色
    .el-select:hover .el-input__inner {
        border-color: #e14eca;
    }

    // 修改输入框点击时的边框颜色
    .el-select .el-input__inner:focus {
        border-color: #e14eca;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border-color: #e14eca;
    }

    // 修改输入框之前的文字颜色
    input:-moz-placeholder {
        color: #e14eca;
    }

    input:-ms-input-placeholder {
        color: #e14eca;
    }

    input::-webkit-input-placeholder {
        color: #e14eca;
    }

    .el-select .el-input .el-select__caret {
        color: #e14eca;
    }

    .el-input__inner {
        background-color: rgb(39, 41, 61);
        border: 1px solid #e14eca;
        color: #e14eca;
    }

    .el-table thead tr > th {
        border: none !important;
        border-bottom: 1px solid rgb(61, 63, 81) !important;
    }

    .el-table tbody tr > td {
        border: none !important;
        border-bottom: 1px solid rgb(61, 63, 81) !important;
    }

    .el-input--small .el-input__inner {
        display: flex;
        height: 20px;
        width: 120px;
    }

    .el-input--small .el-input__icon {
        line-height: 20px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 110px;
        margin-right: 10px;
    }

    .el-input--prefix .el-input__inner {
        padding-left: 10px;
    }

    .el-input__prefix {
        display: none;
    }

    // 更改表头背景颜色
    .el-table thead tr > th {
        background-color: rgb(39, 41, 61) !important;
        border: 1px solid rgb(61, 63, 81);
        color: rgb(154, 154, 154);
    }

    // 更改表格每行背景颜色
    .el-table tbody tr > td {
        background-color: rgb(39, 41, 61);
        border: 1px solid rgb(61, 63, 81);
    }

    // 设置鼠标经过时背景颜色
    .el-table tbody tr:hover > td {
        background-color: rgb(39, 41, 61) !important;
    }
}
</style>
