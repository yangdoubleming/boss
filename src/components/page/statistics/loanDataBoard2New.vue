<template>
    <div class="boxTwo" v-loading.fullscreen.lock="loadingShow">

        <!-- 顶部地图 -->
        <div class="card footer" style="background: #1e1e2f">
            <div class="card-body" style="padding-top: 0;">
                <div class="row" style="justify-content: space-between;gap: 30px;">
                    <!-- 地图 -->
                    <div style="width: 70%; background: #27293d;">
                        <el-col :span="24">
                            <div style=" height: 660px; text-align: center">
                                <div class="map-title"> <span class="map-title-span">累计放款用户分布</span>
                                    <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                                        <label style="min-width: 100px;" v-for="(option, index) in mapShow"
                                            :key="option" class="btn btn-sm btn-primary btn-simple"
                                            :class="{ active: mapShowIndex === index }" :id="index">
                                            <input type="radio" @click="initMapChart(index)" name="options"
                                                autocomplete="off" :checked="mapShowIndex === index" />
                                            {{ option }}
                                        </label>
                                    </div>
                                </div>
                                <div style="width: 100%; display: flex; height: 100%">
                                    <div class="wai-top-box" style="width: 100%; height: 100%">
                                        <div id="mapChart" style="width: 100%; height: 100%" v-show="mapShowIndex == 0">
                                        </div>
                                        <div id="worldmap" style="width: 97%; height: 97%" v-if="mapShowIndex == 1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </div>
                    <div style="flex:1">
                        <!-- tab栏 -->
                        <div class="malldel">
                            <div class="card-stats">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7-show">
                                            <div class="info-icon text-center icon-primary" style="
                                    background: #ff8d72;
                                    background-image: linear-gradient(to bottom left, #ff8d72, #ff6491, #ff8d72);
                                    background-size: 210% 210%;
                                    background-position: 100% 0;
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                ">
                                                <i class="tim-icons icon-chat-33"></i>
                                            </div>
                                            <div class="numbers">
                                                <p class="card-category">累计放款金额(万元)</p>
                                                <h3 class="card-title">{{ Loan.loanAmount }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!---->
                                <div class="card-footer">
                                    <hr />
                                    <div class="stats">
                                        <span><i class="tim-icons icon-watch-time"></i>累放笔数：{{ Loan.loanCount }}笔</span>
                                        <span>件均：{{ Loan.loanAmountAvg }}万</span>
                                        <span>平均利率：{{ Loan.loanAprAvg }}%</span>
                                    </div>
                                </div>
                            </div>

                            <div class=" card-stats">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7-show">
                                            <div class="info-icon text-center icon-primary" style="
                                    background: #e14eca;
                                    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                    background-size: 210% 210%;
                                    background-position: 100% 0;
                                ">
                                                <i class="tim-icons icon-shape-star"></i>
                                            </div>
                                            <div class="numbers">
                                                <p class="card-category">在贷余额(万元)</p>
                                                <h3 class="card-title">{{ Loan.loanBalance }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!---->
                                <div class="card-footer">
                                    <hr />
                                    <div class="stats">
                                        <span><i class="tim-icons icon-sound-wave"></i>在贷笔数：{{ Loan.currLoanCount
                                        }}笔</span>

                                    </div>
                                </div>
                            </div>

                            <div class=" card-stats">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7-show">
                                            <div class="info-icon text-center icon-primary" style="
                                    background: #1d8cf8;
                                    background-image: linear-gradient(to bottom left, #1d8cf8, #3358f4, #1d8cf8);
                                    background-size: 210% 210%;
                                    background-position: 100% 0;
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                ">
                                                <i class="tim-icons icon-single-02"></i>
                                            </div>
                                            <div class="numbers">
                                                <p class="card-category">今日新增(万元)</p>
                                                <h3 class="card-title">{{ Loan.loanAmountDay }}
                                                </h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <!---->
                                <div class="card-footer">
                                    <hr />
                                    <div class="stats">
                                        <div><i class="tim-icons icon-trophy"></i>今日新增笔数：{{ Loan.loanCountDay }}笔</div>
                                        <div>昨日新增笔数：{{ Loan.loanCountYesterday }}笔</div>
                                        <div>昨日新增放款：{{ Loan.loanAmountYesterday }}万元</div>
                                    </div>
                                </div>
                            </div>

                            <div class=" card-stats">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-7-show">
                                            <div class="info-icon text-center icon-primary" style="
                                    background: #fd5d93;
                                    background-image: linear-gradient(to bottom left, #fd5d93, #ec250d, #fd5d93);
                                    background-size: 210% 210%;
                                    background-position: 100% 0;
                                    height: 50px;
                                    width: 50px;
                                    border-radius: 50%;
                                ">
                                                <i class="tim-icons icon-molecule-40"></i>
                                            </div>
                                            <div class="numbers">
                                                <p class="card-category">本月新增(万元)</p>
                                                <h3 class="card-title">{{ Loan.loanAmountMonth }}
                                                </h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <!---->
                                <div class="card-footer">
                                    <hr />
                                    <div class="stats">
                                        <div><i class="tim-icons icon-watch-time"></i>本月新增笔数：{{ Loan.loanCountMonth }}笔
                                        </div>
                                        <div>上月新增笔数：{{ Loan.loanCountLastMonth }}笔</div>
                                        <div>上月新增放款：{{ Loan.loanAmountLastMonth }}万元</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- 放款情况折线图 -->
        <div class="row">
            <div class="col-12">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-category">放款情况</h5>
                                <h2 class="card-title" style="font-size: 23px">
                                    贷款(万元)
                                    <a style="font-size: 14px;"
                                        href="https://dowsure88.feishu.cn/wiki/X5zXw6Bd4iRwxjkfp7KcTw9UnNh?table=blkwrVwi5LiS9kiE"
                                        referrerpolicy="no-referrer" target="_blank">查看详情</a>
                                </h2>
                            </div>
                            <div class="col-sm-6">
                                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                                    <label v-for="(option, index) in bigLineChartCategories" :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: bigLineChart.activeIndex === index }" :id="index">
                                        <input type="radio" @click="initBigChart(index)" name="options"
                                            autocomplete="off" :checked="bigLineChart.activeIndex === index" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%" ref="bigChart" chart-id="big-line-chart"
                            :chart-data="bigLineChart.chartData" :gradient-colors="bigLineChart.gradientColors"
                            :gradient-stops="bigLineChart.gradientStops" :extra-options="bigLineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
        </div>



        <!--保险和豆费曲线图 -->
        <div>
            <!-- 保险曲线图-->
            <div :class="{ 'text-right': isRTL }">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-category">投保GMV</h5>
                                <h3 class="card-title"> 保险(万元) <a style="font-size: 14px;"
                                        href="https://dowsure88.feishu.cn/wiki/Vkubw1Ejxi0A4skAhuLcdUHBnCA?table=blkcSTNmDJpNAZCE"
                                        referrerpolicy="no-referrer" target="_blank">查看详情</a></h3>

                            </div>
                        </div>
                    </template>
                    <div class="chart-right">
                        <div class="chart-area">
                            <line-chart style="height: 100%" ref="insureChar" chart-id="purple-line-chart"
                                :chart-data="purpleLineChart.chartData"
                                :gradient-colors="purpleLineChart.gradientColors"
                                :gradient-stops="purpleLineChart.gradientStops"
                                :extra-options="purpleLineChart.extraOptions">
                            </line-chart>
                        </div>
                        <div class="chart-box">
                            <div class="info-icon text-center icon-primary" style="
                                                    background: #1d8cf8;
                                                    background-image: linear-gradient(to bottom left, #1d8cf8, #3358f4, #1d8cf8);
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                ">
                                <i class="tim-icons icon-single-02"></i>
                            </div>
                            <div>
                                <div>本年累计保费（万元）</div>
                                <div class="bolder-text">{{ insuranceAmount.insuranceAmount }}</div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <!-- 豆费曲线图 -->
            <div :class="{ 'text-right': isRTL }">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- <h5 class="card-category">用户数</h5> -->
                                <h3 class="card-title"> 豆费（万元）</h3>
                            </div>
                        </div>
                    </template>
                    <div class="chart-right">
                        <div class="chart-area">
                            <line-chart style="height: 100%" ref="userChar" chart-id="green-line-chart"
                                :chart-data="greenLineChart.chartData" :gradient-stops="greenLineChart.gradientStops"
                                :extra-options="greenLineChart.extraOptions">
                            </line-chart>

                        </div>
                        <div>
                            <div class="chart-box">
                                <div class="info-icon text-center icon-primary" style="
                                                    background: #fd5d93;
                                                    background-image: linear-gradient(to bottom left, #fd5d93, #ec250d, #fd5d93);
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                ">
                                    <i class="tim-icons icon-molecule-40"></i>
                                </div>
                                <div>
                                    <div>累计收费金额（万元）</div>
                                    <div class="bolder-text">{{ feeAcount.dowFeeSum || '--' }}</div>
                                </div>
                            </div>
                            <div class="chart-box" style="margin-top: 30px;">
                                <div class="info-icon text-center icon-primary" style="
                                                    background: #e14eca;
                                                    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                ">
                                    <i class="tim-icons icon-shape-star"></i>
                                </div>
                                <div>
                                    <div>今日收费金额（万元）</div>
                                    <div class="bolder-text">{{ feeAcount.dowFeeToday || '--' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </div>

        <!-- 链接跳转 -->
        <div class="link-box">
            <div class="link-content">
                <span>豆服数据</span>
                <a href="https://dowsure88.feishu.cn/wiki/JQg3w1rPKiGgmQkAFi5c3IlQn2f?table=blkkv4gyLKCQ66Ee"
                    referrerpolicy="no-referrer" target="_blank">查看详情</a>
            </div>
            <div :span="12" class="link-content">
                <span>金融云数据</span>
                <a href="https://dowsure88.feishu.cn/wiki/Ta6wwTM9JieAeEkH0H7cibB7nJd?table=blkjoheoaoNyH81O"
                    referrerpolicy="no-referrer" target="_blank">查看详情</a>
            </div>

        </div>
        <!-- 用户数据and科技产品 -->
        <div class="message">
            <!-- 科技产品  -->
            <div class="product">
                <div class="top">
                    <h4 class="card-category" style="font-size: 23px">科技产品 </h4>
                </div>
                <div class="bottom">
                    <div v-if="TechnologyList.length > 0">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>LOGO</th>
                                    <th>产品名称</th>
                                    <th>客户数量</th>
                                    <th>累计收入(万元)</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <!-- <div class="flag"><img src="../../../assets/XX.jpg" alt="US"></div>
											 -->
                                        <div class="info-icon text-center icon-primary" style="
                                                    background: #e14eca;
                                                    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                ">
                                            <i class="tim-icons icon-chat-33"></i>
                                        </div>
                                    </td>
                                    <td>{{ TechnologyList[0].productName }}</td>
                                    <td>{{ TechnologyList[0].institutionsCountSum }}</td>
                                    <td>{{ TechnologyList[0].amountSum }}</td>

                                </tr>
                                <tr>
                                    <td>
                                        <!-- <div class="flag"><img src="../../../assets/XX.jpg" alt="US"></div> -->
                                        <div class="info-icon text-center icon-primary" style="
                                                    background: #fd5d93;
                                                    background-image: linear-gradient(to bottom left, #fd5d93, #ec250d, #fd5d93);
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                ">
                                            <i class="tim-icons icon-shape-star"></i>
                                        </div>
                                    </td>
                                    <td>{{ TechnologyList[1].productName }}</td>
                                    <td>{{ TechnologyList[1].institutionsCountSum }}</td>
                                    <td>{{ TechnologyList[1].amountSum }}</td>

                                </tr>
                                <!-- 				<tr>
										<td>
											<div class="flag"><img src="../../../assets/XX.jpg" alt="RO"></div>


											<div class="info-icon text-center icon-primary" style="background: #ff8d72;background-image: linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72);height: 50px;width: 50px;border-radius: 50%;
													     background-size: 210% 210%;
													     background-position: 100% 0;"><i class="tim-icons icon-shape-star"></i>
											</div>
										</td>
										<td>收款云</td>
										<td>760</td>
										<td>350</td>
										<td>10.35%</td>
									</tr> -->
                                <tr>
                                    <td>
                                        <!-- <div class="flag"><img src="../../../assets/XX.jpg" alt="BR"></div> -->
                                        <div class="info-icon text-center icon-primary" style="
                                                    background: #1d8cf8;
                                                    background-image: linear-gradient(to bottom left, #1d8cf8, #3358f4, #1d8cf8);
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                ">
                                            <i class="tim-icons icon-single-02"></i>
                                        </div>
                                    </td>
                                    <td>{{ TechnologyList[2].productName }}</td>
                                    <td>{{ TechnologyList[2].institutionsCountSum }}</td>
                                    <td>{{ TechnologyList[2].amountSum }}</td>

                                </tr>
                                <tr>
                                    <td style="border-bottom: none">
                                        <!-- <div class="flag"><img src="../../../assets/XX.jpg" alt="BR"></div> -->
                                        <div class="info-icon text-center icon-primary" style="
                                                    background: #ff8d72;
                                                    background-image: linear-gradient(to bottom left, #ff8d72, #ff6491, #ff8d72);
                                                    background-size: 210% 210%;
                                                    background-position: 100% 0;
                                                    height: 50px;
                                                    width: 50px;
                                                    border-radius: 50%;
                                                ">
                                            <i class="tim-icons  icon-molecule-40"></i>
                                        </div>
                                    </td>
                                    <td style="border-bottom: none">{{ TechnologyList[3].productName }}</td>
                                    <td style="border-bottom: none">{{ TechnologyList[3].institutionsCountSum }}
                                    </td>
                                    <td style="border-bottom: none">{{ TechnologyList[3].amountSum }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 用户数据 -->
            <div class="user">
                <div class="top">
                    <h4 class="card-category" style="font-size: 23px">用户数据</h4>
                    <!-- <h3 class="card-title"><i class="tim-icons icon-settings-gear-63"></i></h3> -->
                </div>
                <div class="bottom">
                    <div class="card-message">
                        <div class="info-icon text-center icon-primary" style="
                                background: #ff8d72;
                                background-image: linear-gradient(to bottom left, #ff8d72, #ff6491, #ff8d72);
                                height: 50px;
                                width: 50px;
                                border-radius: 50%;
                                background-size: 210% 210%;
                                background-position: 100% 0;
                            ">
                            <i class="tim-icons icon-shape-star"></i>
                        </div>

                        <div class="data">
                            <p class="title">累计总用户数</p>
                            <p class="price">{{ NumberUser.userCount }}</p>
                        </div>

                        <div class="data-d">
                            <p>
                                今日注册：<span class="quantity">{{ NumberUser.registerUserCount }}</span>
                            </p>
                            <p>
                                今日成交：<span class="quantity">{{ NumberUser.dealUserCount }}</span>
                            </p>
                        </div>
                        <div class="data-d" style="margin-right: 0">
                            <p>
                                日活：<span class="quantity">{{ NumberUser.dailyActiveUserCount }}</span>
                            </p>
                            <p>
                                月活：<span class="quantity">{{ NumberUser.monthActiveUserCount }}</span>
                            </p>
                        </div>
                    </div>

                    <div class="card-message">
                        <div class="info-icon text-center icon-primary" style="
                                background: #1d8cf8;
                                background-image: linear-gradient(to bottom left, #1d8cf8, #3358f4, #1d8cf8);
                                background-size: 210% 210%;
                                background-position: 100% 0;
                                height: 50px;
                                width: 50px;
                                border-radius: 50%;
                            ">
                            <i class="tim-icons icon-single-02"></i>
                        </div>
                        <div class="data">
                            <p class="title">累计贷款用户</p>
                            <p class="price">{{ NumberLoan.userCount }}</p>
                        </div>

                        <div class="data-d">
                            <p>
                                今日注册：<span class="quantity">{{ NumberLoan.registerUserCount }}</span>
                            </p>
                            <p>
                                今日成交：<span class="quantity">{{ NumberLoan.dealUserCount }}</span>
                            </p>
                        </div>
                        <div class="data-d" style="margin-right: 0">
                            <p>
                                日活：<span class="quantity">{{ NumberLoan.dailyActiveUserCount }}</span>
                            </p>
                            <p>
                                月活：<span class="quantity">{{ NumberLoan.monthActiveUserCount }}</span>
                            </p>
                        </div>
                    </div>

                    <div class="card-message" style="border-bottom: none;">
                        <div class="info-icon text-center icon-primary" style="
                                background: #fd5d93;
                                background-image: linear-gradient(to bottom left, #fd5d93, #ec250d, #fd5d93);
                                background-size: 210% 210%;
                                background-position: 100% 0;
                                height: 50px;
                                width: 50px;
                                border-radius: 50%;
                            ">
                            <i class="tim-icons icon-molecule-40"></i>
                        </div>
                        <div class="data">
                            <p class="title">累计保险用户</p>
                            <p class="price">{{ NumberInsurance.userCount }}</p>
                        </div>

                        <div class="data-d">
                            <p>
                                今日注册：<span class="quantity">{{ NumberInsurance.registerUserCount }}</span>
                            </p>
                            <p>
                                今日成交：<span class="quantity">{{ NumberInsurance.dealUserCount }}</span>
                            </p>
                        </div>
                        <div class="data-d" style="margin-right: 0">
                            <p>
                                日活：<span class="quantity">{{ NumberInsurance.dailyActiveUserCount }}</span>
                            </p>
                            <p>
                                月活：<span class="quantity">{{ NumberInsurance.monthActiveUserCount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import '../../../assets/world' // 引入世界地图
import worldMap from '@/common/map/world.json'
import LineChart from '../../Charts/LineChart';
import BarChart from '../../Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import '../../../assets/china';
import { boardDate, distributed } from '../../../api/loanDataBoard';
import moment from 'moment';

import { getLoan, getCount, getUser, getProductX, getInsurance, getLoans, getTechnology, getGlobalCount, getDowfu } from '../../../api/loanDataBoard';
export default {
    components: {
        LineChart,
        BarChart
    },
    data() {
        return {
            maxLoanCount: 0,
            loadingShow: false,
            areaType: '',// 国内 DOMESTIC , 全球 GLOBAL
            productTypeTag: "D盾",// 是否包含D盾产品
            globalCount: '',
            nameMap: worldMap.namemap,
            TechnologyList: [],
            colorTwo: true,
            bigLineChartCategories: ['自营GMV', '所有GMV'],
            insurance: ['按GMV', '按笔数'],
            mapShow: ['中国', '全球'],
            Balance: ['按GMV', '按笔数'], //在贷余额
            isRTL: false,
            //放款情况
            Loan: '',
            showData: '',
            showName: '',
            // 放款情况图表
            bigLineChart: {
                allData: [],
                activeIndex: 0,
                chartData: {
                    datasets: [{}],
                    labels: ''
                },
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
            },
            // 用户数据
            NumberUser: '',
            NumberLoan: '',
            NumberInsurance: '',
            //累计豆费数目
            userIndex: 0,
            feeAcount: '',
            greenLineChart: {
                extraOptions: chartConfigs.greenChartOptions,
                chartData: {
                    labels: '',
                    datasets: [
                        {
                            label: '豆费GMV',
                            fill: true,
                            borderColor: config.colors.danger,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: config.colors.danger,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: config.colors.danger,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [90, 27, 60, 12, 80]
                        }
                    ]
                },
                gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
                gradientStops: [1, 0.4, 0]
            },

            // 投保FVM
            insuranceAmount: '',
            mapShowIndex: 0,
            purpleLineChart: {
                extraOptions: chartConfigs.purpleChartOptions,
                chartData: {
                    labels: '',
                    datasets: [
                        {
                            label: '保险',
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
                            data: [80, 100, 70, 80, 120, 80]
                        }
                    ]
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.2, 0]
            },
            //放款GMV
            DowIndex: 0,
            ShowDow: '',
            blueBarChart: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                    labels: '',
                    datasets: [
                        {
                            label: 'Dow+',
                            fill: true,
                            borderColor: config.colors.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: [53, 20, 10, 80, 100, 45]
                        }
                    ]
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0]
            },
            map: {
                title: {
                    text: '',
                    x: 'center',
                    textStyle: {
                        color: '#333333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        const value = (params.value + '').split('.');
                        const valueStr = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        return params.name + ': ' + (params.value ? valueStr : 0);
                    }
                },

                // 数据和类型
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: 'red'
                                } //省份标签字体颜色
                            },
                            show: true,
                            color: 'red',
                            fontSize: 10
                        },
                        // 地图大小倍数
                        zoom: 1,
                        data: []
                    }
                ],
                visualMap: {
                    show: true,
                    type: 'continuous',
                    max: 0,
                    text: ['', ''],
                    realtime: true,
                    calculable: true,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        color: ['#FFFFCB', ' #F5A9A9', '#F87F80', '#DF0001', '#B40403', '#CC3366', '#CC3300']
                        // color: ['#FFEDE1', '#FFC889', '#FF3C3C']

                    },
                    right: 30,
                    bottom: 70
                }
            }
        };
    },
    created() {
        this.$emit('@testRouter', this.colorTwo);
    },
    mounted() {
        this.$emit('@testRouter', this.colorTwo);
        // 获取当前年月
        let year = moment().format('YYYY-MM');
        // 用户数据
        this.getUserData()
        //累计豆服会员费
        getDowfu().then((res) => {
            this.feeAcount = res.data;
            this.feeAcount.dowFeeSum = (Number(this.feeAcount.dowFeeSum) / 10000).toFixed(2);
            this.feeAcount.dowFeeToday = (Number(this.feeAcount.dowFeeToday) / 10000).toFixed(2);

            let LoanShow = [];
            let LoanDate = [];
            LoanDate = Object.values(res.data.dowFeeDateMap)
            LoanDate = LoanDate.map(amount => (Number(amount) / 10000).toFixed(2));
            LoanShow = Object.keys(res.data.dowFeeDateMap)
            let chartData = {
                labels: LoanShow,
                datasets: [
                    {
                        label: '豆费GMV',
                        fill: true,
                        borderColor: config.colors.danger,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: config.colors.danger,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: config.colors.danger,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: LoanDate
                    }
                ]
            };
            this.$refs.userChar.updateGradients(chartData);
            this.greenLineChart.chartData = chartData;
        });
        //投保
        getInsurance().then((res) => {
            res.data.insuranceAmount = (Number(res.data.insuranceAmount) / 10000).toFixed(2);
            this.insuranceAmount = res.data;
            let insuranceShow = Object.keys(res.data.insuranceAmountDateMap);
            let insuranceDate = Object.values(res.data.insuranceAmountDateMap);
            insuranceDate = insuranceDate.map(amount => (Number(amount) / 10000).toFixed(2));
            let chartData = {
                labels: insuranceShow,
                datasets: [
                    {
                        label: '保险',
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
                        data: insuranceDate
                    }
                ]
            };
            this.$refs.insureChar.updateGradients(chartData), (this.purpleLineChart.chartData = chartData);
        });
        //科技产品
        getTechnology().then((res) => {
            if (res.code == 200) {
                this.TechnologyList = res.data;
            }
        });
        // 中国地图
        this.map.series[0].data = [];
        distributed().then((res) => {
            this.nowData = res.data;
            res.data.loanProvinceCountList.forEach((item) => {
                if (item.province) {
                    const provinceMapping = {
                        '上海市': '上海',
                        '天津市': '天津',
                        '北京市': '北京',
                        '重庆市': '重庆',
                        '内蒙古自治区': '内蒙古',
                        '西藏自治区': '西藏',
                        '广西壮族自治区': '广西',
                        '新疆维吾尔自治区': '新疆',
                        '宁夏回族自治区': '宁夏'
                    };
                    item.province = provinceMapping[item.province] || item.province.replace(/自治区|省/g, '');
                    this.map.series[0].data.push({
                        name: item.province,
                        value: item.loanCount
                    });
                }
            });
            this.maxLoanCount = res.data.loanProvinceCountList.reduce((max, current) => {
                return current.loanCount > max ? current.loanCount : max;
            }, 0);
            this.map.series[0].data.push({
                name: '南海诸岛',
                itemStyle: {
                    normal: {
                        opacity: 1,
                        label: {
                            show: false
                        }
                    }
                }
            });
            this.map.visualMap.max = this.maxLoanCount;
            let mapChartDom = document.getElementById('mapChart');
            let mapChart = this.$echarts.init(mapChartDom);
            mapChart.setOption(this.map);

            window.addEventListener('resize', function () {
                mapChart.resize();
            });
        });
        //世界地图
        getGlobalCount().then((res) => {
            this.globalCount = Object.entries(res.data).map(([key, value]) => {
                const name = key === "中国大陆" ? "中国" : key;
                return { name, value };
            });
        })
        //贷款情况
        this.getLoanData()
    },
    create() {
        changeParentTitle();
    },
    methods: {

        //获取用户数据
        getUserData() {
            getUser({
                areaType: this.areaType
            }).then((res) => {
                this.NumberUser = res.data[2];
                this.NumberLoan = res.data[0];
                this.NumberInsurance = res.data[1];
            });
        },
        // 获取贷款情况
        getLoanData() {
            // 获取上一年一月
            let lastYear = moment(moment().subtract(1, 'year').format('YYYY')).startOf('quarter').format('YYYY-MM');
            getLoan({
                productTypeTag: this.productTypeTag,
                areaType: this.areaType
            }).then((res) => {
                res.data.loanAmount = (Number(res.data.loanAmount) / 10000).toFixed(2);
                res.data.loanAmountAvg = (Number(res.data.loanAmountAvg) / 10000).toFixed(2);
                res.data.loanAmountDay = (Number(res.data.loanAmountDay) / 10000).toFixed(2);
                res.data.loanAmountMonth = (Number(res.data.loanAmountMonth) / 10000).toFixed(2);
                res.data.loanAmountYesterday = (Number(res.data.loanAmountYesterday) / 10000).toFixed(1);
                res.data.loanAmountLastMonth = (Number(res.data.loanAmountLastMonth) / 10000).toFixed(1);
                res.data.loanAprAvg = (Number(res.data.loanAprAvg) * 100).toFixed(2);
                res.data.loanBalance = (Number(res.data.loanBalance) / 10000).toFixed(2);
                this.Loan = res.data;
                this.showData = Object.values(res.data.loanAmountDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                this.showName = Object.keys(res.data.loanAmountDateMap);
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
                            data: this.showData
                        }
                    ],
                    labels: this.showName
                };
                // this.$refs.bigChart.updateGradients(chartData);
                this.bigLineChart.chartData = chartData;
            }).catch(err => {

            })
        },
        drawMap() {
            var myChart = this.$echarts.init(document.getElementById('worldmap'));
            console.log(1212211, this.globalCount)
            this.globalCount = [
                { name: "阿拉伯联合酋长国", value: 2 },
                { name: "澳大利亚", value: 18 },
                { name: "巴西", value: 14 },
                { name: "加拿大", value: 138 },
                { name: "智利", value: 12 },
                { name: "中国", value: 18 },
                { name: "哥伦比亚", value: 11 },
                { name: "德国", value: 514 },
                { name: "西班牙", value: 80 },
                { name: "法国", value: 106 },
                { name: "印度尼西亚", value: 9 },
                { name: "意大利", value: 94 },
                { name: "日本", value: 68 },
                { name: "墨西哥", value: 27 },
                { name: "马来西亚", value: 22 },
                { name: "荷兰", value: 7 },
                { name: "菲律宾", value: 20 },
                { name: "波兰", value: 3 },
                { name: "瑞典", value: 3 },
                { name: "新加坡", value: 10 },
                { name: "泰国", value: 21 },
                { name: "大不列颠联合王国", value: 196 },
                { name: "美国", value: 2772 },
                { name: "越南", value: 10 },
                { name: "新加坡", value: 10 },
            ]
            let option = {
                // backgroundColor: "#02AFDB",
                title: {
                    left: '40%',
                    top: '0px',
                    textStyle: {
                        color: '#02AFDB',
                        opacity: 0.7
                    }
                },
                visualMap: {
                    // max: 390000,
                    // min: 100,
                    type: 'continuous', // continuous 类型为连续型  piecewise 类型为分段型
                    show: false, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
                    // 文本样式
                    textStyle: {
                        fontSize: 14,
                        color: 'black'
                    },
                    realtime: false, // 拖拽时，是否实时更新
                    calculable: true, // 是否显示拖拽用的手柄
                    // 定义 在选中范围中 的视觉元素
                    inRange: {
                        color: ['#5bc2e7', '#6980c5', '#70dfdf', '#f7f1ee', '#3390FF'] // 图元的颜色
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.name) {
                            return params.name + ' : ' + (isNaN(params.value) ? 0 : parseInt(params.value));
                        }
                    }
                },
                series: [{
                    type: 'map',
                    roam: false,
                    mapType: 'world',
                    zoom: 1.2,
                    mapLocation: {
                        y: 100
                    },
                    data: this.globalCount,
                    nameMap: this.nameMap,
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            textStyle: { color: 'white' }
                        }
                    },
                    itemStyle: {
                        borderWidth: 0.5, // 描边线宽 为 0 时无描边
                        borderColor: 'rgba(112,187,252,.5)', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
                        borderType: 'solid', // rgba(2,37,101,.5)描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                        emphasis: {
                            areaColor: 'rgba(2,37,101,.8)',
                            lable: { color: "white" },
                            textStyle: { color: "black" }
                        }
                    }
                }],
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });

        },

        changeParentTitle() {
            this.$emit('childEvent', '子组件传给父组件的title'); //第一个参数是提交的事件名，后面的参数可以是多个需要传递给父组件的参数
        },
        initBigChart(index) {
            if (index == 0) {
                this.productTypeTag = 'D盾'
                this.bigLineChart.activeIndex = index
                this.getLoanData()
            } else if (index == 1) {
                this.productTypeTag = ''
                this.getLoanData()
                this.bigLineChart.activeIndex = index
            }
        },

        //切换地图
        initMapChart(index) {

            if (index == 0) {
                this.mapShowIndex = index
                this.areaType = ''
                this.getLoanData()
                this.getUserData()
            } else {
                this.mapShowIndex = index
                this.areaType = 'GLOBAL'
                this.getLoanData()
                this.getUserData()
                this.$nextTick(() => {
                    this.drawMap()
                })



            }

        },


    },

    computed: {
        enableRTL() {
            return this.$route.query.enableRTL;
        }
    }
};
</script>

<style lang="scss" scoped>
.link-box {
    margin-bottom: 24px;
    height: 75px;
    background: #1e1e2f;
    line-height: 75px;
    display: flex;
    gap: 20px;

    .link-content {
        padding-left: 35px;
        width: 50%;
        background: #27293d;

        span {
            color: rgba(255, 255, 255, 0.80);
            font-size: 21px;
            font-weight: 500;
            margin-right: 35px;
        }

    }
}

.col-md-6 {
    ::v-deep .el-card__body {
        width: 100%;
        height: 100%;
    }
}

.chart-right {
    color: #D8D8D8;
    font-weight: 600;
    display: grid;
    grid-template-columns: 75% 25%;

    .chart-box {
        display: flex;
        height: 50px;
        justify-content: center;
        gap: 20px;

        .tim-icons {
            color: #fff;
            font-size: 1.7em;
            line-height: 50px;
        }

        .bolder-text {
            font-size: 26px;
        }
    }
}

.malldel {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    .card-body {
        height: 60px;
    }

    .card-stats .numbers {
        text-align: left;

        .card-title {
            cursor: pointer;
        }
    }

    .card-stats {
        //width: 24.5%;
        background: #27293d;

        .col-7-show {
            display: flex;
            gap: 20px;
            position: relative;
            padding-right: 15px;
            padding-left: 15px;
            width: 100%;

            .tim-icons {
                color: #fff;
                font-size: 1.7em;
                line-height: 50px;
            }
        }
    }

    .card-footer {
        color: rgba(255, 255, 255, 0.6);

        hr {
            background-color: #734733;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .stats {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        }
    }
}

.message {
    height: 490px;
    display: flex;
    justify-content: space-between;
    background: #27293d;
    padding: 50px 0px 0px 35px;

    .tim-icons {
        color: #fff;
        font-size: 1.7em;
        line-height: 50px;
    }

    .user {
        width: 40%;
        height: 100%;
        border-radius: 0.2857rem;
        background: #27293d;

        .top {
            &::after {
                display: block;
                content: '';
                clear: both;
            }

            padding: 10px 15px 20px 15px;

            .card-category {
                float: left;
                font-size: 16px;
                color: white;
            }

            .card-title {
                float: right;
            }
        }

        .bottom {
            padding: 10px 10px 10px 10px;

            .card-message {
                height: 92px;
                margin-bottom: 40px;
                border-bottom: 1px solid #734733;
                display: flex;
                justify-content: flex-start;

                &>div {
                    margin-right: 13%;
                }

                .data {
                    .price {
                        font-size: 20px;
                        color: white;
                        font-weight: 500;
                    }

                    .title {
                        color: rgba(255, 255, 255, 0.8);
                        font-weight: 300;
                    }
                }

                .quantity {
                    color: white;
                    font-weight: 500;
                }


            }

        }
    }

    .product {
        width: 58%;
        height: 100%;
        border-radius: 0.2857rem;
        background: #27293d;
        overflow: hidden;

        .top {
            padding: 10px 15px 10px 15px;

            .card-category {
                font-size: 16px;
                color: white;
            }
        }

        .bottom {

            /* 表格内背景颜色 */
            ::v-deep(.el-table th),
            ::v-deep(.el-table tr),
            ::v-deep(.el-table td) {
                background-color: transparent;
            }

            ::v-deep(.el-table) {
                color: rgba(255, 255, 255, 0.6);
                font-weight: 500;
            }

            ::v-deep(.el-table th.is-leaf) {
                border-bottom: 1px solid #3d3f51;
                border-top: none;
            }

            ::v-deep(.el-table td) {
                border-top: 1px solid #3d3f51;
                border-bottom: none;
                padding: 1.2rem;
            }

            ::v-deep(.el-table::before) {
                height: 0;
            }
        }
    }
}

::v-deep(.el-table th) {
    background-color: #27293d !important;
}

.footer {
    padding-top: 30px;
    width: 100%;
    padding: 0;
    height: 660px;

    .card-body {

        // height: 300px;
        .map-title {
            display: flex;
            justify-content: space-between;
            padding: 25px 35px 0px 35px;

            .map-title-span {
                color: rgba(255, 255, 255, 0.80);
                font-family: "PingFang SC";
                font-size: 23px;
                font-style: normal;
                font-weight: 600;
                line-height: 21px;
            }
        }

        .table-responsive {
            height: 370px;
            overflow: visible !important;

            tbody {
                tr {
                    position: relative;

                    .tim-icons {
                        color: #fff;
                        font-size: 1.7em;
                        line-height: 50px;
                    }
                }

                .flag {
                    img {
                        width: 40px;
                    }
                }
            }
        }
    }
}

::v-deep(.el-card) {
    border: none;
    background-color: transparent;
    box-shadow: none;
}

.table {
    font-size: 0.875rem;
    font-weight: 400;
}

#green-line-chart {
    height: 215px;
}

*,
*::before,
*::after {
    box-sizing: border-box; // 1
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent; // Reset for nesting within parents with `background-color`.

    th,
    td {
        // padding:.75rem;
        // vertical-align: top;
        border-bottom: 0.0625rem solid #3d3f51;
    }

    thead th {
        vertical-align: bottom;
        // border-bottom: 0.0625rem solid #e3e3e3;
    }

    tbody+tbody {
        // border-top: 0.0625rem solid #e3e3e3;
    }

    .table {
        // background-color:0.0625rem solid #e3e3e3;
    }
}

.card {
    background-color: #27293d;
}

p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 5px;

    &.description {
        font-size: 1.14em;
    }
}

.goxiangqing {
    position: absolute;
    left: 130px;
    top: 25px;
}

.goxiangqing-detail {
    position: absolute;
    left: 160px;
    top: 25px;
}

.go-detail {
    position: absolute;
    left: 120px;
    top: 20px;
}
</style>
