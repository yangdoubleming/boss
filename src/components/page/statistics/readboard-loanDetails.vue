<template>
    <div class="readboard-loanDetails">
        <!-- 页面头部标题 -->
        <div style="display: flex; align-items: center; padding: 5px 18px; padding-bottom: 5px">
            <div style="color: #9a9a9a; font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{
                        $t('common_dsb')
                    }}
                /首页/贷款详情
            </div>
        </div>
        <!-- 折线图 -->
        <div class="row">
            <div class="col-12">
                <card type="chart" style="background: rgb(39, 41, 61); width: 97.5%">
                    <template slot="header">
                        <div class="zhexiantu">
                            <div class="zhexiantu-top">
                                <div v-if="activeIndex2 == 0">贷款GMV（万元）</div>
                                <div v-else-if="activeIndex2 == 1">贷款笔数（笔）</div>
                                <div v-else-if="activeIndex2 == 2">在贷余额（万元）</div>
                                <div v-else-if="activeIndex2 == 3">逾期率(%)</div>
                                <div v-else-if="activeIndex2 == 4">不良率(%)</div>
                                <!-- 按钮组1 -->
                                <div class="btn-group btn-group-toggle btnz1" data-toggle="buttons">
                                    <label v-for="item in bigLineChartCategories" :key="item.id"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: activeIndex === item.id }" :id="item.type">
                                        <input type="radio" @click="initBigChartLeft(item.type, item.id)" name="options"
                                            autocomplete="off" />
                                        {{ item.option }}
                                    </label>
                                </div>
                                <el-select class="select" v-model="value" placeholder="所有产品" @change="changProduct">
                                    <el-option v-for="(item, index) in options" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <div class="showTime">
                                    <el-date-picker v-model="query.beginTime" type="month" placeholder="选择日期"
                                        value-format="yyyy-MM-dd" @change="fisrtTopInit()">
                                    </el-date-picker>
                                    <div>-</div>
                                    <el-date-picker v-model="query.endTime" type="month" placeholder="选择日期"
                                        value-format="yyyy-MM-dd" @change="fisrtTopInit()">
                                    </el-date-picker>
                                </div>
                                <!-- 按钮组2 -->
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label v-for="(option, index) in bigLineChartCategories2" :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: activeIndex2 === index }" :id="index">
                                        <input type="radio" @click="initBigChart(index)" name="options"
                                            autocomplete="off" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%; width: 98%" ref="bigChart" chart-id="big-line-chart"
                            :chart-data="bigLineChart.chartData" :gradient-colors="bigLineChart.gradientColors"
                            :gradient-stops="bigLineChart.gradientStops" :extra-options="bigLineChart.extraOptions">
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
                        <div>累计贷款用户</div>
                        <div class="item1-T-L_number">{{ userdataTotal }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_item1">今日注册： {{ userdataTodayregister }}</div>
                        <div class="item1-T-R_item1">今日申请： {{ userdataTodayapply }}</div>
                        <div class="item1-T-R_item1">今日成交： {{ userdataTodayreach }}</div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>日活数： {{ userdataDailyActiveUserCount }}</div>
                    <div>月活数： {{ userdataMonthActiveUserCount }}</div>
                    <div>转化率： {{ parseFloat(Number(allzhexianruData.conversionRate * 100).toFixed(2)) }}%</div>
                    <!-- <div>转化率： {{allzhexianruData.conversionRate }}</div> -->
                </div>
            </div>
            <!-- 第二个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>累计放款金额（万元）</div>
                        <div class="item1-T-L_number">{{ (Number(allzhexianruData.loanAmount) / 10000).toFixed(2) }}
                        </div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_item1">
                            <div>今日新增：{{ (Number(allzhexianruData.loanAmountDay) / 10000).toFixed(2) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本月新增：{{ (Number(allzhexianruData.loanAmountMonth) / 10000).toFixed(2) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本季新增： {{ (Number(allzhexianruData.loanAmountQuarter) / 10000).toFixed(2) }}</div>
                            <!-- <div> </div> -->
                        </div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>件均:{{ (Number(allzhexianruData.loanAmountAvg) / 10000).toFixed(2) }}</div>
                    <!-- <div>平均利率：{{ fangkuanAverageRate}}</div> -->
                    <div>平均利率：{{ parseFloat(Number(allzhexianruData.loanAprAvg * 100)).toFixed(1) }}%</div>
                    <div>平均期限：{{ Number(allzhexianruData.loanPeriodAvg).toFixed(1) }}月</div>
                </div>
            </div>
            <!-- 第三个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>在贷余额（万元）</div>
                        <div class="item1-T-L_number">{{ (Number(allzhexianruData.loanBalance) / 10000).toFixed(2) }}
                        </div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_item1">
                            <div>今日新增：{{ (Number(allzhexianruData.loanAmountDay) / 10000).toFixed(2) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本月新增：{{ (Number(allzhexianruData.loanAmountMonth) / 10000).toFixed(2) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本季新增: {{ (Number(allzhexianruData.loanAmountQuarter) / 10000).toFixed(2) }}</div>
                            <!-- <div> </div> -->
                        </div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>贷款NDR:{{ parseFloat(Number(allzhexianruData.renewalRate * 100).toFixed(2)) }}%</div>
                    <div>M1逾期率:{{ parseFloat(Number(allzhexianruData.m1OverdueRate * 100).toFixed(2)) }}%</div>
                    <div>M3不良率:{{ parseFloat(Number(allzhexianruData.m3DefectiveRate * 100).toFixed(2)) }}%</div>
                </div>
            </div>
            <!-- 第四个 -->
            <div class="item1">
                <div class="item1-T">
                    <div class="item1-T-L">
                        <div>累计放款笔数</div>
                        <div class="item1-T-L_number">{{ allzhexianruData.loanCount }}</div>
                    </div>
                    <div class="item1-T-R">
                        <div class="item1-T-R_item1">
                            <div>今日新增：{{ Number(allzhexianruData.loanCountDay).toFixed(0) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本月新增：{{ Number(allzhexianruData.loanCountMonth).toFixed(0) }}</div>
                            <!-- <div></div> -->
                        </div>
                        <div class="item1-T-R_item1">
                            <div>本季新增: {{ Number(allzhexianruData.loanCountQuarter).toFixed(0) }}</div>
                            <!-- <div> </div> -->
                        </div>
                    </div>
                </div>
                <div class="item1-B">
                    <div>累计申请用户数： {{ fangkuan4applicationUserCountSum }}</div>
                    <div>累计成交用户数： {{ fangkuan4dealUserCountSum }}</div>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 98.7%" :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }">
            <el-table-column prop="index" label="序号" width="80"> </el-table-column>
            <!-- <el-table-column prop="name" label="LOGO" width="100">
      </el-table-column> -->
            <el-table-column prop="productName" :label="$t('loan_search_cpmc')" min-width="8%"> </el-table-column>
            <el-table-column prop="modelName" label="产品分类" min-width="8%"> </el-table-column>
            <el-table-column prop="productTag" label="产品属性" min-width="8%"> </el-table-column>
            <el-table-column prop="loanAmount" label="累计放款（万元）" width="135px"> </el-table-column>
            <el-table-column prop="loanAmountMonth" label="本月放款（万元）" width="120px"> </el-table-column>
            <el-table-column prop="loanBalance" label="在贷余额（万元）" width="120px"> </el-table-column>
            <el-table-column prop="applicationUserCount" label="用户数" min-width="8%"> </el-table-column>
            <el-table-column prop="loanUserCount" label="客户数" min-width="8%"> </el-table-column>
            <el-table-column prop="loanAmountAvg" label="件均（万元）" min-width="8%"> </el-table-column>
            <el-table-column prop="avgPeriod" label="平均使用周期（月）" width="135px"> </el-table-column>
            <!-- <el-table-column prop="date" label="转化率" width="100">
      </el-table-column> -->
            <el-table-column prop="overdueRate" label="逾期率" min-width="8%" :formatter="formatter"> </el-table-column>
            <!-- <el-table-column prop="address" label="不良率" width="100">
      </el-table-column> -->
        </el-table>

        <!-- 饼图1 -->
        <div class="bingtu">
            <div class="bingtu-top">
                <div class="bingtu-top-wenzi">金融产品占比情况</div>
                <!-- <div class="showTime2">
                    <el-date-picker v-model="value3" type="date" placeholder="选择日期"> </el-date-picker>
                    <div>-</div>
                    <el-date-picker v-model="value4" type="date" placeholder="选择日期"> </el-date-picker>
                </div> -->
                <!-- 按钮组3 -->
                <div class="btn-group btn-group-toggle btnz3" data-toggle="buttons">
                    <label v-for="(item, index) in bigLineChartCategories3" :key="index"
                        class="btn btn-sm btn-primary btn-simple" :class="{ active: activeIndex3 === index }"
                        :id="index">
                        <input type="radio" @click="initBigChart3(index)" name="options" autocomplete="off"
                            :checked="bigLineChart.activeIndex === index" />
                        {{ item }}
                    </label>
                </div>
            </div>
            <div class="bingtu1">
                <div style="width: 600px">
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
        </div>
        <!-- 圆环图1和圆环图2 -->
        <div class="yuanhuan12">
            <div class="yuanhuan1">
                <div class="yuanhuan-title">创新金融/数字科技(万元)</div>
                <div class="main3-wai">
                    <canvas id="myChart3"></canvas>
                </div>
            </div>
            <div class="yuanhuan2">
                <div class="yuanhuan-title">1P/3P（万元）</div>
                <div class="main3-wai">
                    <canvas id="myChart4"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    ProductList,
    getfangkuanqingkuang,
    getuserData,
    ReadBoardFinancialProduct,
    searchLoan,
    searchTag,
    search1P3P
} from '@/api/loanDataBoard';
import LineChart from '../../Charts/LineChart';
import BarChart from '../../Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import moment from 'moment';

export default {
    components: {
        LineChart,
        BarChart
    },
    data() {
        return {
            SecondyuanhuanData: {
                data: [],
                labels: ['Red', 'Blue', 'Yellow'],
                backgroundColor: [
                    'rgba(217, 117, 89,0.6)',
                    'rgba(228, 196, 119,0.6)',
                    'rgba(255, 49, 132,0.6)',
                    'rgba(54, 162, 235,0.6)',
                    'rgba(255, 205, 86,0.6)',
                    'rgba(105, 255, 186,0.6)',
                    'rgba(255, 255, 36,0.6)',
                    'rgba(255, 25, 96,0.6)',
                    'rgba(255, 255, 186,0.6)',
                    'rgba(145, 125, 86,0.6)',
                    'rgba(205, 125, 86,0.6)',
                    'rgba(45, 125, 86,0.6)',
                    'rgba(155, 125, 86 ,0.6)',
                    'rgba(45, 125, 16 ,0.6)',
                    'rgba(155, 129, 132 ,0.6)',
                    'rgba(200, 19, 132 ,0.6)',
                    'rgba(201, 55, 236 ,0.6)',
                    'rgba(155, 225, 136 ,0.6)',
                    'rgba(95, 155, 136,0.6)',
                    'rgba(25, 25, 32,0.6)'
                ]
            }, //第二个圆环图数据
            firstyuanhuanData: {
                data: [],
                labels: ['Red', 'Blue', 'Yellow'],
                backgroundColor: [
                    'rgba(80, 135, 236,0.6)',
                    'rgba(104, 187, 196,0.6)',
                    'rgba(255, 49, 132,,0.6)',
                    'rgba(54, 162, 235,0.6)',
                    'rgba(255, 205, 86,0.6)',
                    'rgba(105, 255, 186,0.6)',
                    'rgba(255, 255, 36,0.6)',
                    'rgba(255, 25, 96,0.6)',
                    'rgba(255, 255, 186,0.6)',
                    'rgb(145, 125, 86,0.6)',
                    'rgba(205, 125, 86,0.6)',
                    'rgba(45, 125, 86,0.6)',
                    'rgba(155, 125, 86,0.6)',
                    'rgba(45, 125, 16,0.6)',
                    'rgba(155, 129, 132,0.6)',
                    'rgba(200, 19, 132,0.6)',
                    'rgba(201, 55, 236,0.6)',
                    'rgba(155, 225, 136,0.6)',
                    'rgba(95, 155, 136,0.6)',
                    'rgba(25, 25, 32,0.6)'
                ]
            }, //第一个圆环图数据
            firstbingtuData: {
                data: [],
                labels: ['Red', 'Blue', 'Yellow'],
                backgroundColor: [
                    'rgba(80, 135, 236,0.6)',
                    'rgba(104, 187, 196,0.6)',
                    'rgba(88, 165, 92,0.6)',
                    'rgba(242, 189, 66,0.6)',
                    'rgba(238, 117, 47,0.6)',
                    'rgba(217, 80, 64,0.6)',
                    'rgba(255, 255, 36,0.6)',
                    'rgba(255, 25, 96,0.6)',
                    'rgba(255, 255, 186,0.6)',
                    'rgba(145, 125, 86,0.6)',
                    'rgba(205, 125, 86,0.6)',
                    'rgba(45, 125, 86,0.6)',
                    'rgba(155, 125, 86,0.6)',
                    'rgba(45, 125, 16,0.6)',
                    'rgba(155, 129, 132,0.6)',
                    'rgba(200, 19, 132,0.6)',
                    'rgba(201, 55, 236,0.6)',
                    'rgba(155, 225, 136,0.6)',
                    'rgba(95, 155, 136,0.6)',
                    'rgba(25, 25, 32,0.6)'
                ]
            }, //第一个饼图数据
            zhexiantuData: '', //渲染折线图的数据
            timeItem: 'MONTH', //第一个按钮组选中的字段
            productlistItem: '', //产品列表选中的字段
            productlist: '', //产品列表
            userData: '', //用户数据
            userdataTotal: '', //用户数据-累计用户数
            userdataTodayregister: '', //用户数据-今日注册
            userdataTodayapply: '', //用户数据-今日申请
            userdataTodayreach: '', //用户数据-今日成交
            userdataDailyActiveUserCount: '', //用户数据-日活跃数
            userdataMonthActiveUserCount: '', //用户数据-月活跃数
            fangkuan4applicationUserCountSum: '', //第四个方块-累计申请用户数
            fangkuan4dealUserCountSum: '', //第四个方块-累计成交用户数

            allzhexianruData: '', //全部折线图数据
            AllLoanUserCount: '', //贷款累计用户数
            bigLineChartCategories: [
                { type: 'MONTH', option: '按月', id: 11 },
                { type: 'QUARTER', option: '按季度', id: 22 },
                { type: 'YEAR', option: '按年', id: 33 }
            ],
            bigLineChartCategories2: ['GMV', '笔数', '在贷余额', '逾期率', '不良率'],
            bigLineChartCategories3: ['按GMV', '按笔数', '按在贷余额', '按用户数'],
            activeIndex: 11,
            activeIndex2: 0,
            activeIndex3: 0,
            // 贷款情况图表
            bigLineChart: {
                chartData: {
                    datasets: [{}],
                    labels: ''
                },
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
            },
            // 表格数据
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            // 时间选择器数据
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            options: [
                {
                    value: '',
                    label: '所有产品'
                }
            ],
            //请求参数
            query: {
                dateType: '', // 类型
                productName: '', // 产品名
                beginTime: '', // 开始时间
                endTime: '' // 结束时间
            },
            value: ''
        };
    },
    methods: {
        formatter(row, colum) {
            return parseFloat(Number(row.overdueRate * 100).toFixed(2)) + '%';
        },
        getAllyuanhuantu2() {
            search1P3P().then((res) => {
                var DataList2 = res.data;
                console.log('DataList2', DataList2);
                this.SecondyuanhuanData.data = DataList2.map(function (item) {
                    return item['loanAmount'];
                });
                this.SecondyuanhuanData.labels = DataList2.map(function (item) {
                    return item['modelName'];
                });
                this.getyuanhuantu2();
            });
        },
        getAllyuanhuantu1() {
            searchTag().then((res) => {
                var DataList2 = res.data;
                console.log('DataList2', DataList2);
                this.firstyuanhuanData.data = DataList2.map(function (item) {
                    return item['loanAmount'];
                });
                this.firstyuanhuanData.labels = DataList2.map(function (item) {
                    return item['productTag'];
                });
                this.getyuanhuantu1();
            });
        },
        getTableData() {
            ReadBoardFinancialProduct().then((res) => {
                // console.log("表格res",res.data)
                this.tableData = res.data;
                // 给表格数据添加下标
                this.tableData.forEach((item, index) => {
                    item.loanAmount = (Number(item.loanAmount) / 10000).toFixed(2);
                    item.loanAmountMonth = (Number(item.loanAmountMonth) / 10000).toFixed(2);
                    item.loanBalance = (Number(item.loanBalance) / 10000).toFixed(2);
                    item.loanAmountAvg = (Number(item.loanAmountAvg) / 10000).toFixed(2);
                    item.index = index + 1;
                });
                this.firstbingtuData.data = this.tableData.map(function (item) {
                    return item['loanAmount'];
                });
                this.firstbingtuData.labels = this.tableData.map(function (item) {
                    return item['productName'];
                });
                this.getbingtu();
            });
        },
        //改变产品名
        changProduct(value) {
            this.query.productName = value;

            this.fisrtTopInit();
        },
        //获取产品名
        getProductList() {
            ProductList().then((res) => {
                res.data.forEach((item) => {
                    let obj = {};
                    obj.label = item;
                    obj.value = item;
                    this.options.push(obj);
                });
            });
        },
        // 第一个方块数据
        getUserData() {
            getuserData().then((res) => {
                this.userData = res.data;
                this.userdataTotal = res.data[0].userCount;
                this.userdataTodayregister = res.data[0].registerUserCount;
                this.userdataTodayapply = res.data[0].applicationUserCount;
                this.userdataTodayreach = res.data[0].dealUserCount;
                this.userdataDailyActiveUserCount = res.data[0].dailyActiveUserCount;
                this.userdataMonthActiveUserCount = res.data[0].monthActiveUserCount;
                // 第四个方块的一些数据
                this.fangkuan4applicationUserCountSum = res.data[0].applicationUserCountSum;
                this.fangkuan4dealUserCountSum = res.data[0].dealUserCountSum;
            });
        },
        // 初始化折线图的各种信息
        fisrtTopInit(nowIndex) {
            getfangkuanqingkuang(this.query).then((res) => {
                this.allzhexianruData = res.data;
                console.log(nowIndex, 'nowIndex');
                // 设置按钮2为第一个按钮
                // this.zhexiantuData = this.allzhexianruData.loanAmountDateMap;
                // let labelsdata = Object.keys(this.zhexiantuData);
                // let valuesdata = Object.values(this.zhexiantuData);
                // valuesdata.forEach((item, index) => {
                //     valuesdata[index] = parseInt(valuesdata[index]);
                // })
                if (nowIndex) {
                    this.initBigChart(2);
                } else {
                    this.initBigChart(0);
                }
            });
        },
        //GMV和订单数系列按钮折线图切换
        initBigChart(index) {
            this.activeIndex2 = index;
            let lineShowData = [];
            let lineShowLabel = [];
            let months = moment(this.query.endTime).diff(moment(this.query.beginTime), 'month');
            if (index == 0) {
                lineShowData = Object.values(this.allzhexianruData.loanAmountDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                lineShowLabel = Object.keys(this.allzhexianruData.loanAmountDateMap);
            }
            if (index == 1) {
                lineShowData = Object.values(this.allzhexianruData.loanCountDateMap);
                lineShowLabel = Object.keys(this.allzhexianruData.loanCountDateMap);
            }
            if (index == 2) {
                lineShowData = Object.values(this.allzhexianruData.loanBalanceDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                lineShowLabel = Object.keys(this.allzhexianruData.loanBalanceDateMap);
            }
            if (index == 3) {
                lineShowData = Object.values(this.allzhexianruData.m1OverdueRateMap).map((item) => {
                    return (item = (Number(item) * 100).toFixed(2));
                });
                lineShowLabel = Object.keys(this.allzhexianruData.m1OverdueRateMap);
            }
            if (index == 4) {
                lineShowData = Object.values(this.allzhexianruData.m3DefectiveRateMap).map((item, index) => {
                    return (item = (Number(item) * 100).toFixed(2));
                });
                lineShowLabel = Object.keys(this.allzhexianruData.m3DefectiveRateMap);
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
        },
        //按月按年去切换
        initBigChartLeft(type, index) {
            this.activeIndex = index;
            this.query.dateType = type;
            this.fisrtTopInit();
        },
        getTime1() {
            this.value1 = moment(new Date(this.value1)).format('YYYY-MM-DD');
            console.log('this.zhexiantuData', this.zhexiantuData);
            console.log('value1', this.value1);
        },
        getTime2() {
            this.value2 = moment(new Date(this.value2)).format('YYYY-MM-DD');
            console.log('value2', this.value2);
        },
        getyuanhuantu2() {
            //圆环图2准备工作
            const ctx = document.getElementById('myChart4');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.SecondyuanhuanData.labels,
                    datasets: [
                        {
                            label: 'My First Dataset',
                            data: this.SecondyuanhuanData.data,
                            borderColor: this.SecondyuanhuanData.backgroundColor,
                            backgroundColor: this.SecondyuanhuanData.backgroundColor,
                            hoverOffset: 4
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        // position: 'left',
                        labels: {
                            fontColor: 'rgb(189, 184, 184)' //改变图例颜色
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        getyuanhuantu1() {
            //圆环图1准备工作
            // 先销毁再新建
            // if( window.OldChart !== undefined){
            //     window.OldChart.destroy();
            // }
            const ctx = document.getElementById('myChart3');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.firstyuanhuanData.labels,
                    legend: {
                        position: 'right',
                        orient: 'vertical', //设置图例的方向
                        right: 5,
                        top: 'center',
                        itemGap: 5 //设置图例的间距
                    },
                    datasets: [
                        {
                            label: 'My First Dataset',
                            data: this.firstyuanhuanData.data,
                            backgroundColor: this.firstyuanhuanData.backgroundColor,
                            hoverOffset: 4,
                            borderColor: this.firstyuanhuanData.backgroundColor
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        // position: 'left',
                        labels: {
                            fontColor: 'rgb(189, 184, 184)' //改变图例颜色
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        getbingtu() {
            //饼图准备工作
            // 先销毁再新建
            if (window.OldChart !== undefined) {
                window.OldChart.destroy();
            }
            const ctx = document.getElementById('myChart2');
            window.OldChart = new Chart(ctx, {
                type: 'pie',

                data: {
                    labels: this.firstbingtuData.labels,
                    datasets: [
                        {
                            label: 'My First Dataset',
                            data: this.firstbingtuData.data,
                            borderColor: this.firstbingtuData.backgroundColor,
                            backgroundColor: this.firstbingtuData.backgroundColor,
                            hoverOffset: 4
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'left',
                        labels: {
                            fontColor: 'rgb(189, 184, 184)' //改变图例颜色
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        initBigChart2(index) {
            if (index == 0) {
                let params = {
                    dateType: this.timeItem,
                    productName: this.roductlistItem
                };
                getfangkuanqingkuang(params).then((res) => {
                    this.zhexiantuData = res.data.loanAmountDateMap;
                    let labelsdata = Object.keys(this.zhexiantuData);
                    let valuesdata = Object.values(this.zhexiantuData);
                    valuesdata.forEach((item, index) => {
                        valuesdata[index] = parseInt(valuesdata[index]);
                    });
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
                                data: valuesdata
                            }
                        ],
                        labels: labelsdata
                    };
                    this.$refs.bigChart.updateGradients(chartData);
                    this.bigLineChart.chartData = chartData;
                });
            }
            if (index == 1) {
                let params = {
                    dateType: this.timeItem,
                    productName: this.roductlistItem
                };
                getfangkuanqingkuang(params).then((res) => {
                    this.zhexiantuData = res.data.loanCountDateMap;
                    let labelsdata = Object.keys(this.zhexiantuData);
                    let valuesdata = Object.values(this.zhexiantuData);
                    valuesdata.forEach((item, index) => {
                        valuesdata[index] = parseInt(valuesdata[index]);
                    });
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
                                data: valuesdata
                            }
                        ],
                        labels: labelsdata
                    };
                    this.$refs.bigChart.updateGradients(chartData);
                    this.bigLineChart.chartData = chartData;
                });
            }
            if (index == 2) {
                let params = {
                    dateType: this.timeItem,
                    productName: this.roductlistItem
                };
                getfangkuanqingkuang(params).then((res) => {
                    this.zhexiantuData = res.data.loanBalanceDateMap;
                    let labelsdata = Object.keys(this.zhexiantuData);
                    let valuesdata = Object.values(this.zhexiantuData);
                    valuesdata.forEach((item, index) => {
                        valuesdata[index] = parseInt(valuesdata[index]);
                    });
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
                                data: valuesdata
                            }
                        ],
                        labels: labelsdata
                    };
                    this.$refs.bigChart.updateGradients(chartData);
                    this.bigLineChart.chartData = chartData;
                });
            }
            if (index == 3) {
                let params = {
                    dateType: this.timeItem,
                    productName: this.roductlistItem
                };
                getfangkuanqingkuang(params).then((res) => {
                    this.zhexiantuData = res.data.m1OverdueRateMap;
                    let labelsdata = Object.keys(this.zhexiantuData);
                    let valuesdata = Object.values(this.zhexiantuData);
                    valuesdata.forEach((item, index) => {
                        valuesdata[index] = parseInt(valuesdata[index]);
                    });
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
                                data: valuesdata
                            }
                        ],
                        labels: labelsdata
                    };
                    this.$refs.bigChart.updateGradients(chartData);
                    this.bigLineChart.chartData = chartData;
                });
            }
            if (index == 4) {
                let params = {
                    dateType: this.timeItem,
                    productName: this.roductlistItem
                };
                getfangkuanqingkuang(params).then((res) => {
                    this.zhexiantuData = res.data.m3DefectiveRateMap;
                    let labelsdata = Object.keys(this.zhexiantuData);
                    let valuesdata = Object.values(this.zhexiantuData);
                    valuesdata.forEach((item, index) => {
                        valuesdata[index] = parseInt(valuesdata[index]);
                    });
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
                                data: valuesdata
                            }
                        ],
                        labels: labelsdata
                    };
                    this.$refs.bigChart.updateGradients(chartData);
                    this.bigLineChart.chartData = chartData;
                });
            }
            this.activeIndex2 = index;
        },
        initBigChart3(index) {
            if (index == 0) {
                ReadBoardFinancialProduct().then((res) => {
                    //   this.tableData = res.data
                    //   this.tableData.forEach((item, index) => {
                    //   item.index = index + 1
                    // })
                    this.firstbingtuData.data = this.tableData.map(function (item) {
                        return item['loanAmount'];
                    });
                    this.firstbingtuData.labels = this.tableData.map(function (item) {
                        return item['productName'];
                    });
                    this.getbingtu();
                });
            }
            if (index == 1) {
                ReadBoardFinancialProduct().then((res) => {
                    //   this.tableData = res.data
                    //   this.tableData.forEach((item, index) => {
                    //   item.index = index + 1
                    // })
                    this.firstbingtuData.data = this.tableData.map(function (item) {
                        return item['count'];
                    });
                    this.firstbingtuData.labels = this.tableData.map(function (item) {
                        return item['productName'];
                    });
                    this.getbingtu();
                });
            }
            if (index == 2) {
                ReadBoardFinancialProduct().then((res) => {
                    //   this.tableData = res.data
                    //   this.tableData.forEach((item, index) => {
                    //   item.index = index + 1
                    // })
                    this.firstbingtuData.data = this.tableData.map(function (item) {
                        return item['loanBalance'];
                    });
                    this.firstbingtuData.labels = this.tableData.map(function (item) {
                        return item['productName'];
                    });
                    this.getbingtu();
                });
            }
            if (index == 3) {
                ReadBoardFinancialProduct().then((res) => {
                    //   this.tableData = res.data
                    //   this.tableData.forEach((item, index) => {
                    //   item.index = index + 1
                    // })
                    this.firstbingtuData.data = this.tableData.map(function (item) {
                        return item['applicationUserCount'];
                    });
                    this.firstbingtuData.labels = this.tableData.map(function (item) {
                        return item['productName'];
                    });
                    this.getbingtu();
                });
            }
            if (index == 4) {
                searchLoan().then((res) => {
                    var DataList2 = res.data;
                    this.firstbingtuData.data = DataList2.map(function (item) {
                        return item['loanAmount'];
                    });
                    this.firstbingtuData.labels = DataList2.map(function (item) {
                        return item['paymentName'];
                    });
                    this.getbingtu();
                });
            }
            this.activeIndex3 = index;
        }
    },
    watch: {},
    cteated() { },
    mounted() {
        console.log(this.$route.path, '路由理由');
        document.querySelector('.content').setAttribute('style', 'background:rgb(30, 30, 46)');
        this.getbingtu();
        if (this.$route.query.nowIndex) {
            this.fisrtTopInit(2);
        } else {
            this.fisrtTopInit();
        }
        this.getUserData();
        this.getProductList();
        this.getTableData();
        this.getAllyuanhuantu1();
        this.getAllyuanhuantu2();
    },
    computed: {},
    beforeDestroy() {
        document.querySelector('.content').removeAttribute('style');
    }
};
</script>
<style lang="scss" scoped>
.readboard-loanDetails {
    color: #9a9a9a;

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

    // 鼠标悬浮按钮上移
    .btn:hover {
        transform: translateY(-1px);
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
                }
            }

            .item1-T-R {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100%;
                width: 50%;
                padding-top: 0px;

                // border: 1px solid blue;
                .item1-T-R_item1 {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
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
        // height: 45%;
        // width: 45%;
        // margin-top: 50px;
        // margin-left: 320px;
        padding-right: 16%;
        display: flex;
        justify-content: center;
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

    .showTime2 {
        // border: 1px solid red;
        margin-right: 20px;
        display: flex;
    }

    .bingtu {
        padding-bottom: 20px;
        height: 500px;
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
            // padding-right: 20px;
            background-color: rgb(39, 41, 61);
            // border: 1px solid red;
            width: 100%;
            height: 50px;
            display: flex;
            // align-items: center;
            justify-content: flex-end;

            .but-wai2 {
                display: flex;
                margin-left: 20px;
            }
        }
    }

    .showTime2 {
        margin-right: 20px;
        display: flex;
    }

    .bingtu-top-wenzi {
        display: flex;
        margin-right: 360px;
        font-size: 20px;
        color: #fff;
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

    .yuanhuan12 {
        height: 400px;
        justify-content: space-between;
        background-color: rgb(30, 30, 46);
        width: 98.7%;
        margin-left: 10px;
        margin-top: 30px;
        display: flex;
        // border: 1px solid red;
        margin-bottom: 70px;

        .yuanhuan1 {
            background-color: rgb(39, 41, 61);
            justify-content: center;
            width: 48%;
            // border: 1px solid red;
            display: flex;
            flex-direction: column;
        }

        .yuanhuan2 {
            background-color: rgb(39, 41, 61);

            width: 48%;
            justify-content: center;
            flex-direction: column;
            // border: 1px solid red;
            display: flex;
        }
    }

    .yuanhuan-title {
        color: white;
        font-size: 20px;
        margin-top: 30px;
        // border: 1px solid red;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
    }

    .main3-wai {
        width: 500px;
        height: 500px;
        margin-top: 30px;
        margin-left: 150px;
    }

    .zhexiantu {
        display: flex;
        width: 100%;
    }

    .zhexiantu-top {
        align-items: center;
        height: 40px;
        // border: 1px solid red;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .showTime {
        display: flex;
        align-items: center;
        position: absolute;
        left: 590px;
    }

    .chart-area {
        // border: 1px solid red;
        height: 350px;
    }

    .btnz1 {
        position: absolute;
        left: 140px;
    }

    .select {
        position: absolute;
        left: 450px;
    }

    .btnz3 {
        margin-right: 20px;
    }

    .row {
        margin-left: -4px;
    }
}
</style>
<style lang="scss">
.readboard-loanDetails {
    .el-select .el-input__inner {
        height: 25px !important;
    }

    .el-input--prefix .el-input__inner {
        height: 25px !important;
    }

    .el-input__suffix .el-input__inner {
        height: 25px !important;
    }

    .el-select .el-input__inner {
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

    .el-input--prefix .el-input__inner {
        height: 25px !important;
    }

    .el-input__suffix .el-input__inner {
        height: 25px !important;
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

    // 修改表格颜色
    .el-table thead tr>th {
        border: none !important;
        border-bottom: 1px solid rgb(61, 63, 81) !important;
    }

    .el-table tbody tr>td {
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
    .el-table thead tr>th {
        background-color: rgb(39, 41, 61) !important;
        border: 1px solid rgb(61, 63, 81);
        color: rgb(154, 154, 154);
    }

    // 更改表格每行背景颜色
    .el-table tbody tr>td {
        background-color: rgb(39, 41, 61);
        border: 1px solid rgb(61, 63, 81);
    }

    // 设置鼠标经过时背景颜色
    .el-table tbody tr:hover>td {
        background-color: rgb(39, 41, 61) !important;
    }
}
</style>
