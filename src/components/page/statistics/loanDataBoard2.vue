<template>
    <div class="boxTwo">
        <div class="row">
            <div class="col-12">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-category">放款情况</h5>
                                <h2 class="card-title" style="font-size: 23px" v-if="bigLineChart.activeIndex != 1">
                                    贷款(万元)</h2>
                                <router-link class="goxiangqing"
                                    to="/readboard-loanDetails"><span>查看详情</span></router-link>
                                <h2 class="card-title" style="font-size: 23px" v-if="bigLineChart.activeIndex == 1">
                                    贷款(笔数)</h2>
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

        <!-- tab栏 -->
        <div class="malldel">
            <div class="card card-stats">
                <div class="card-body">
                    <div class="row">
                        <div class="col-5">
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
                        </div>
                        <div class="col-7">
                            <div class="numbers">
                                <p class="card-category">累计放款金额(万元)</p>
                                <h3 class="card-title" @click="goLoan">{{ LoanX.loanAmount }}</h3>
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

            <div class="card card-stats">
                <div class="card-body">
                    <div class="row">
                        <div class="col-5">
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
                        </div>
                        <div class="col-7">
                            <div class="numbers">
                                <p class="card-category">在贷余额(万元)</p>
                                <h3 class="card-title" @click="goLoadA">{{ LoanX.loanBalance }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="card-footer">
                    <hr />
                    <div class="stats">
                        <span><i class="tim-icons icon-sound-wave"></i>在贷笔数：{{ Loan.currLoanCount }}笔</span>
                        <span>M1逾期率：{{ (Number(Loan.m1OverdueRate) * 100).toFixed(2) }}%</span>
                        <span>M3不良率：{{ (Number(Loan.m3DefectiveRate) * 100).toFixed(2) }} %</span>
                    </div>
                </div>
            </div>

            <div class="card card-stats">
                <div class="card-body">
                    <div class="row">
                        <div class="col-5">
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
                        </div>
                        <div class="col-7">
                            <div class="numbers">
                                <p class="card-category">今日新增(万元)</p>
                                <h3 class="card-title" @click="goLoanToDay">{{ LoanX.loanAmountToday }}</h3>
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
                        <div>昨日新增放款：{{ Loan.loanAmountYesterday }}</div>
                    </div>
                </div>
            </div>

            <div class="card card-stats">
                <div class="card-body">
                    <div class="row">
                        <div class="col-5">
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
                        </div>
                        <div class="col-7">
                            <div class="numbers">
                                <p class="card-category">本月新增(万元)</p>
                                <h3 class="card-title" @click="goLoanMonth">{{ LoanX.loanAmountMonth }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="card-footer">
                    <hr />
                    <div class="stats">
                        <div><i class="tim-icons icon-watch-time"></i>本月新增笔数：{{ Loan.loanCountMonth }}笔</div>
                        <div>上月新增笔数：{{ Loan.loanCountLastMonth }}笔</div>
                        <div>上月新增放款：{{ Loan.loanAmountLastMonth }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--中间三个 -->
        <div class="row">
            <div class="col-lg-4" :class="{ 'text-right': isRTL }">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6" v-if="insuranceIndex != 1">
                                <h5 class="card-category">投保GMV</h5>
                                <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary"></i> 保险(万元)</h3>
                                <router-link class="goxiangqing-detail"
                                    to="/readboard-insureDetails"><span>查看详情</span></router-link>
                            </div>
                            <div class="col-sm-6" v-if="insuranceIndex == 1">
                                <h5 class="card-category">投保GMV</h5>
                                <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary"></i> 保险(笔数)</h3>
                            </div>

                            <div class="col-sm-6">
                                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                                    <label v-for="(option, index) in insurance" :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: insuranceIndex === index }" :id="index">
                                        <input type="radio" @click="initInsureChart(index)" name="options"
                                            autocomplete="off" :checked="insuranceIndex === index" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%" ref="insureChar" chart-id="purple-line-chart"
                            :chart-data="purpleLineChart.chartData" :gradient-colors="purpleLineChart.gradientColors"
                            :gradient-stops="purpleLineChart.gradientStops"
                            :extra-options="purpleLineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{ 'text-right': isRTL }">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6" v-if="DowIndex != 1">
                                <h5 class="card-category">放款GMV</h5>
                                <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info"></i>Dow+(万元)
                                </h3>
                            </div>
                            <div class="col-sm-6" v-if="DowIndex == 1">
                                <h5 class="card-category">放款GMV</h5>
                                <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info"></i>Dow+(笔数)
                                </h3>
                            </div>
                            <div class="col-sm-6">
                                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                                    <label v-for="(option, index) in Balance" :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: DowIndex === index }" :id="index">
                                        <input type="radio" @click="initBlue(index)" name="options" autocomplete="off"
                                            :checked="DowIndex === index" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <bar-chart style="height: 100%" ref="DowAcount" chart-id="blue-bar-chart"
                            :chart-data="blueBarChart.chartData" :gradient-stops="blueBarChart.gradientStops"
                            :extra-options="blueBarChart.extraOptions">
                        </bar-chart>
                    </div>
                </card>
            </div>
            <div class="col-lg-4" :class="{ 'text-right': isRTL }">
                <card type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-category">用户数</h5>
                                <h3 class="card-title"><i class="tim-icons icon-send text-success"></i> 豆服会员用户</h3>
                            </div>
                            <div class="col-sm-6">
                                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                                    <label v-for="(option, index) in Cumulative" :key="option"
                                        class="btn btn-sm btn-primary btn-simple"
                                        :class="{ active: userIndex === index }" :id="index">
                                        <input type="radio" @click="initUserChart(index)" name="options"
                                            autocomplete="off" :checked="userIndex === index" />
                                        {{ option }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart style="height: 100%" ref="userChar" chart-id="green-line-chart"
                            :chart-data="greenLineChart.chartData" :gradient-stops="greenLineChart.gradientStops"
                            :extra-options="greenLineChart.extraOptions">
                        </line-chart>
                    </div>
                </card>
            </div>
        </div>

        <!-- 用户数据and金融产品 -->
        <div class="message">
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

                    <div class="card-message">
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
            <!-- 金融产品 -->
            <div class="product">
                <div class="top">
                    <h4 class="card-category" style="font-size: 23px">金融产品</h4>
                </div>
                <div class="bottom">
                    <el-table :data="tableData" class="table" height="440"
                        :header-cell-style="{ color: 'rgba(255, 255, 255, 0.1);' }">
                        <el-table-column prop="productName" :label="$t('loan_search_cpmc')"> </el-table-column>
                        <el-table-column prop="modelName" label="产品分类"> </el-table-column>
                        <el-table-column prop="loanAmount" label="累计放款(万元)"> </el-table-column>
                        <el-table-column prop="loanAmountMonth" label="本月放款(万元)"> </el-table-column>
                        <el-table-column prop="loanAmountDay" label="今日放款(万元)"> </el-table-column>
                        <el-table-column prop="loanBalance" label="在贷余额(万元)"> </el-table-column>
                        <!-- <el-table-column prop="overdueRate" label="逾期率"> </el-table-column> -->
                    </el-table>
                </div>
            </div>
        </div>

        <!-- 底部地图 -->

        <div class="card footer">
            <!---->
            <div class="card-header">
                <h4 class="card-title" style="font-size: 23px">科技产品</h4>
                <router-link class="go-detail" to="/readboard-technicalDetails"><span>查看详情</span></router-link>
                <p class="card-category">Dowsure XFCloud Product</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 ml-auto mr-auto">
                        <div class="table-responsive" v-if="TechnologyList.length > 0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>LOGO</th>
                                        <th>产品名称</th>
                                        <th>客户数量</th>
                                        <th>累计收入(万元)</th>
                                        <th>本月收入(万元)</th>
                                        <th>续费率</th>
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
                                                <i class="tim-icons icon-shape-star"></i>
                                            </div>
                                        </td>
                                        <td>{{ TechnologyList[0].productName }}</td>
                                        <td>{{ TechnologyList[0].institutionsCountSum }}</td>
                                        <td>{{ TechnologyList[0].amountSum }}</td>
                                        <td>{{ TechnologyList[0].amountMonth }}</td>
                                        <td>{{ TechnologyList[0].renewalRate * 100 }}%</td>
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
                                                <i class="tim-icons icon-molecule-40"></i>
                                            </div>
                                        </td>
                                        <td>{{ TechnologyList[1].productName }}</td>
                                        <td>{{ TechnologyList[1].institutionsCountSum }}</td>
                                        <td>{{ TechnologyList[1].amountSum }}</td>
                                        <td>{{ TechnologyList[1].amountMonth }}</td>
                                        <td>100%</td>
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
                                        <td>{{ TechnologyList[2].amountMonth }}</td>
                                        <td>{{ TechnologyList[2].renewalRate * 100 }}%</td>
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
                                                <i class="tim-icons icon-chat-33"></i>
                                            </div>
                                        </td>
                                        <td>{{ TechnologyList[3].productName }}</td>
                                        <td>{{ TechnologyList[3].institutionsCountSum }}</td>
                                        <td>{{ TechnologyList[3].amountSum }}</td>
                                        <td>{{ TechnologyList[3].amountMonth }}</td>
                                        <td>{{ TechnologyList[3].renewalRate * 100 }}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- 地图 -->
                    <div class="col-md-6">
                        <el-col :span="24">
                            <el-card style="margin-top: -120px; height: 580px; text-align: center">
                                <div style="width: 100%; display: flex; height: 100%">
                                    <div class="wai-top-box" style="width: 100%; height: 100%">
                                        <div id="mapChart" style="width: 100%; height: 100%"></div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../../Charts/LineChart';
import BarChart from '../../Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import '../../../assets/china';
import { boardDate, distributed } from '../../../api/loanDataBoard';
import moment from 'moment';

import { getLoan, getCount, getUser, getProductX, getInsurance, getLoans, getTechnology, getLoanX } from '../../../api/loanDataBoard';
export default {
    components: {
        LineChart,
        BarChart
    },
    data() {
        return {
            TechnologyList: [],
            colorTwo: true,
            bigLineChartCategories: ['按GMV', '按笔数', '按在贷余额'],
            insurance: ['按GMV', '按笔数'],
            Balance: ['按GMV', '按笔数'], //在贷余额
            Cumulative: ['贷款', '保险', 'Dow+'],
            isRTL: false,
            //放款情况
            Loan: '',
            LoanX:'',
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
            // 金融产品
            tableData: [],

            //累计用户数
            userIndex: 0,
            userAcount: '',
            greenLineChart: {
                extraOptions: chartConfigs.greenChartOptions,
                chartData: {
                    labels: '',
                    datasets: [
                        {
                            label: '用户数',
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
            insuranceIndex: 0,
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
                    min: 0,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        color: ['#FFFFCB', ' #F5A9A9', '#F87F80','#33CCFF','#B40403', '#CC3366', '#CC3300',  '#DF0001']
                    },
                    right: -100
                }
            }
        };
    },
    created() {
        this.$emit('@testRouter', this.colorTwo);
        // console.log(this.colorTwo)
    },
    mounted() {
        this.$emit('@testRouter', this.colorTwo);
        // 获取当前年月
        let year = moment().format('YYYY-MM');

        // 获取上一年一月
        // let lastYear = moment().subtract(1, 'year').format('YYYY-MM')
        let lastYear = moment(moment().subtract(1, 'year').format('YYYY')).startOf('quarter').format('YYYY-MM');
        getLoan().then((res) => {
            res.data.loanAmount = (Number(res.data.loanAmount) / 10000).toFixed(2);
            res.data.loanAmountAvg = (Number(res.data.loanAmountAvg) / 10000).toFixed(2);
            res.data.loanAmountDay = (Number(res.data.loanAmountDay) / 10000).toFixed(2);
            res.data.loanAmountMonth = (Number(res.data.loanAmountMonth) / 10000).toFixed(2);
            res.data.loanAmountYesterday = (Number(res.data.loanAmountYesterday) / 10000).toFixed(1);
            res.data.loanAmountLastMonth = (Number(res.data.loanAmountLastMonth) / 10000).toFixed(1);
            let indexLoan = Object.keys(res.data.loanAmountDateMap).indexOf(lastYear);
            res.data.loanAmountDateMap = Object.fromEntries(Object.entries(res.data.loanAmountDateMap).slice(indexLoan));
            console.log(res.data.loanAmountDateMap, '  res.data.loanAmountDateMap');
            res.data.loanBalanceDateMap = Object.fromEntries(Object.entries(res.data.loanBalanceDateMap).slice(indexLoan));
            console.log(res.data.loanBalanceDateMap, 'res.data.loanBalanceDateMap');
            res.data.loanCountDateMap = Object.fromEntries(Object.entries(res.data.loanCountDateMap).slice(indexLoan));
            res.data.loanAprAvg = (Number(res.data.loanAprAvg) * 100).toFixed(2);

            res.data.AcountGo = (Number(Object.values(res.data.loanAmountDateMap).slice(-1)[0]) / 10000).toFixed(2);
            res.data.AcountZd = (Number(Object.values(res.data.loanBalanceDateMap).slice(-1)[0]) / 10000).toFixed(2);
            this.Loan = res.data;
            this.showData = Object.values(res.data.loanAmountDateMap).map((item, index) => {
                return (item = (Number(item) / 10000).toFixed(2));
            });
            console.log(this.showData, 'showData');
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
        });
        getLoanX().then((res) => {
            this.LoanX = res.data;
        });
        // 用户数据
        getUser().then((res) => {
            this.NumberUser = res.data[2];
            this.NumberLoan = res.data[0];
            this.NumberInsurance = res.data[1];
        });

        //金融产品
        getProductX().then((res) => {
            res.data.forEach((item, index) => {
                if (item.loanAmount == null) {
                    item.loanAmount = '0.00';
                } else {
                    item.loanAmount = (Number(item.loanAmount) / 10000).toFixed(2);
                }

                if (item.loanAmountDay == null) {
                    item.loanAmountDay = '0.00';
                } else {
                    item.loanAmountDay = (Number(item.loanAmountDay) / 10000).toFixed(2);
                }

                if (item.loanAmountMonth == null) {
                    item.loanAmountMonth = '0.00';
                } else {
                    item.loanAmountMonth = (Number(item.loanAmountMonth) / 10000).toFixed(2);
                }

                if (item.loanBalance == null) {
                    item.loanBalance = '0.00';
                } else {
                    item.loanBalance = (Number(item.loanBalance) / 10000).toFixed(2);
                }

                if (Number(item.overdueRate) * 100 != '0.00') {
                    item.overdueRate = (Number(item.overdueRate) * 100).toFixed(2) + '%';
                } else {
                    item.overdueRate = '-';
                }
            });

            res.data.sort((a, b) => {
                return b.loanAmount - a.loanAmount;
            });
            res.data = res.data.slice(0, 6);

            this.tableData = res.data;
        });

        //累计用户数
        getCount().then((res) => {
            res.data.LOAN = res.data.LOAN.slice(-6, res.data.LOAN.length);
            res.data.INSURANCE = res.data.INSURANCE.slice(-6, res.data.INSURANCE.length);
            this.userAcount = res.data;
            let LoanShow = [];
            let LoanDate = [];
            Object.values(res.data.LOAN).forEach((item, index) => {
                LoanShow.push(item.date);
            });

            Object.values(res.data.LOAN).forEach((item, index) => {
                LoanDate.push(item.currUserCount);
            });
            let chartData = {
                labels: LoanShow,
                datasets: [
                    {
                        label: '用户数',
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
            res.data.forEach((item, index) => {
                if (item.insuranceAmount == null) {
                    item.insuranceAmount = '';
                } else {
                    item.insuranceAmount = (Number(item.insuranceAmount) / 10000).toFixed(2);
                }

                if (item.currInsuranceAmount == null) {
                    item.currInsuranceAmount = '';
                } else {
                    item.currInsuranceAmount = (Number(item.currInsuranceAmount) / 10000).toFixed(2);
                }
            });
            res.data = res.data.slice(-6, res.data.length);
            this.insuranceAmount = res.data;
            let insuranceShow = [];
            let insuranceDate = [];

            Object.values(res.data).forEach((item, index) => {
                insuranceShow.push(item.date);
            });

            Object.values(res.data).forEach((item, index) => {
                insuranceDate.push(item.currInsuranceAmount);
            });
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
                    this.map.series[0].data.push({
                        name:
                            item.province == '上海市' || item.province == '天津市' || item.province == '北京市' || item.province == '重庆市'
                                ? item.province.replace('市', '')
                                : item.province.replace('省', ''),
                        value: item.loanCount
                    });
                }
            });

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

            let mapChartDom = document.getElementById('mapChart');
            let mapChart = this.$echarts.init(mapChartDom);
            mapChart.setOption(this.map);

            window.addEventListener('resize', function () {
                mapChart.resize();
            });
        });

        // 放款GMV
        getLoans().then((res) => {
            res.data.forEach((item, index) => {
                if (item.currLoanAmount == null) {
                    item.currLoanAmount = '';
                } else {
                    item.currLoanAmount = (Number(item.currLoanAmount) / 10000).toFixed(2);
                }
            });
            res.data = res.data.slice(-6, res.data.length);
            this.ShowDow = res.data;

            let DowShow = [];
            let DowData = [];
            res.data.forEach((item, index) => {
                DowShow.push(item.date);
                DowData.push(item.currLoanAmount);
            });

            // Object.values(res.data).forEach((item, index) => {
            // 	DowShow.push(item.date)
            // })
            // Object.values(res.data).forEach((item, index) => {
            // 	DowData.push(item.loanAmount)
            // })

            let chartData = {
                labels: DowShow,
                datasets: [
                    {
                        label: 'Dow+',
                        fill: true,
                        borderColor: config.colors.info,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: DowData
                    }
                ],

                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }
                        ]
                    }
                }
            };

            this.$refs.DowAcount.updateGradients(chartData), (this.blueBarChart.chartData = chartData);
        });
    },
    create() {
        changeParentTitle();
    },
    methods: {
        //去今月贷款
        goLoanMonth() {
            this.$router.push('/today-loan?isTomonth=true');
        },
        //去今日的贷款
        goLoanToDay() {
            this.$router.push('/today-loan?isToday=true');
        },
        //去贷款详情在贷余额
        goLoadA() {
            this.$router.push({
                path: '/readboard-loanDetails',
                query: {
                    nowIndex: 2
                }
            });
        },
        //去贷款详情GVM
        goLoan() {
            this.$router.push('/readboard-loanDetails');
        },
        changeParentTitle() {
            this.$emit('childEvent', '子组件传给父组件的title'); //第一个参数是提交的事件名，后面的参数可以是多个需要传递给父组件的参数
        },
        initBigChart(index) {
            if (index == 0) {
                this.showData = Object.values(this.Loan.loanAmountDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                this.showName = Object.keys(this.Loan.loanAmountDateMap);
            } else if (index == 1) {
                this.showData = Object.values(this.Loan.loanCountDateMap);
                this.showName = Object.keys(this.Loan.loanCountDateMap);
            } else if (index == 2) {
                this.showData = Object.values(this.Loan.loanBalanceDateMap).map((item, index) => {
                    return (item = (Number(item) / 10000).toFixed(2));
                });
                this.showName = Object.keys(this.Loan.loanBalanceDateMap);
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
                        data: this.showData
                    }
                ],
                labels: this.showName
            };
            this.$refs.bigChart.updateGradients(chartData);
            this.bigLineChart.chartData = chartData;
            this.bigLineChart.activeIndex = index;
        },

        initUserChart(index) {
            let LoanShow = [];
            let LoanDate = [];
            if (index == 0) {
                Object.values(this.userAcount.LOAN).forEach((item, index) => {
                    LoanShow.push(item.date);
                });

                Object.values(this.userAcount.LOAN).forEach((item, index) => {
                    LoanDate.push(item.currUserCount);
                });
            } else if (index == 1) {
                Object.values(this.userAcount.INSURANCE).forEach((item, index) => {
                    LoanShow.push(item.date);
                });

                Object.values(this.userAcount.INSURANCE).forEach((item, index) => {
                    LoanDate.push(item.currUserCount);
                });
            } else if (index == 2) {
                Object.values(this.userAcount.DOW).forEach((item, index) => {
                    LoanShow.push(item.date);
                });
                Object.values(this.userAcount.DOW).forEach((item, index) => {
                    LoanDate.push(item.currUserCount);
                });
            }
            let chartData = {
                labels: LoanShow,
                datasets: [
                    {
                        label: '用户数',
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
            this.userIndex = index;
        },

        initInsureChart(index) {
            let insuranceShow = [];
            let insuranceDate = [];
            if (index == 0) {
                Object.values(this.insuranceAmount).forEach((item, index) => {
                    insuranceShow.push(item.date);
                });
                Object.values(this.insuranceAmount).forEach((item, index) => {
                    insuranceDate.push(item.currInsuranceAmount);
                });
            } else if (index == 1) {
                Object.values(this.insuranceAmount).forEach((item, index) => {
                    insuranceShow.push(item.date);
                });
                Object.values(this.insuranceAmount).forEach((item, index) => {
                    insuranceDate.push(item.currInsuranceCount);
                });
            }

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
            this.insuranceIndex = index;
        },
        initBlue(index) {
            let DowShow = [];
            let DowData = [];
            if (index == 0) {
                this.ShowDow.forEach((item, index) => {
                    DowShow.push(item.date);
                    DowData.push(item.currLoanAmount);
                });
            } else if (index == 1) {
                this.ShowDow.forEach((item, index) => {
                    DowShow.push(item.date);
                    DowData.push(item.currLoanCount);
                });
            }
            let chartData = {
                labels: DowShow,
                datasets: [
                    {
                        label: 'Dow+',
                        fill: true,
                        borderColor: config.colors.info,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: DowData
                    }
                ]
            };
            this.$refs.DowAcount.updateGradients(chartData), (this.blueBarChart.chartData = chartData);
            this.DowIndex = index;
        }
    },

    computed: {
        enableRTL() {
            return this.$route.query.enableRTL;
        }
    }
};
</script>

<style lang="scss" scoped>
.col-md-6 {
    ::v-deep .el-card__body {
        width: 100%;
        height: 100%;
    }
}

.malldel {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .card-body {
        height: 60px;
    }

    .card-stats .numbers {
        text-align: right;
        margin-right: 10%;

        .card-title {
            cursor: pointer;
        }
    }

    .card-stats {
        width: 24.5%;

        .col-5 {
            width: 100px;
            position: relative;
            padding-right: 15px;
            padding-left: 15px;

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
                justify-content: start;

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

                .tim-icons {
                    color: #fff;
                    font-size: 1.7em;
                    line-height: 50px;
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
    margin-top: 30px;
    width: 100%;
    padding: 0;
    height: 570px;

    .card-body {
        height: 300px;

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
