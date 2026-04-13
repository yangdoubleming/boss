<template>
    <div class="dataBoard">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{ $t('common_dsb') }} / {{ $t('insure_data_bxgl') }} /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('insure_data_sjkb')
                }}</span>
        </div>

        <div style="padding-left: 20px; margin-bottom: 20px">
            <el-radio-group v-model="tabIndex" size="25" @change="isAll">
                <el-radio-button label="1">{{ $t('insure_data_sjgl') }}</el-radio-button>
                <el-radio-button label="2">{{ $t('insure_data_zrxsjxq') }}</el-radio-button>
                <el-radio-button label="3">{{ $t('insure_data_flsj') }}</el-radio-button>
            </el-radio-group>
        </div>

        <div :gutter="24" v-if="tabIndex == 1">
            <el-row :gutter="24" v-loading="totalLending">
                <el-col :span="24">
                    <el-card>
                        <span style="font-weight: bold; font-size: 15px">{{ $t('insure_data_sssj') }}</span>
                        <el-select v-model="realParam.platform" style="width: 130px; margin-left: 20px"
                            @change="changePlat">
                            <el-option label="全部平台" value=""></el-option>
                            <el-option label="Amazon" value="Amazon"></el-option>
                            <el-option label="Wayfair" value="Wayfair"></el-option>
                            <el-option label="HomeDepot" value="HomeDepot"></el-option>
                            <el-option label="Walmart" value="Walmart"></el-option>
                            <el-option label="Overstock" value="Overstock"></el-option>
                            <el-option label="Lowes" value="Lowes"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                        <el-select v-model="realParam.insuranceCode" :placeholder="$t('loan_detail_choose')"
                            style="width: 130px; margin-left: 20px" @change="changePlat">
                            <el-option label="全部保司" value=""></el-option>
                            <el-option label="大地" value="DD"></el-option>
                            <el-option label="平安" value="PN"></el-option>
                            <el-option label="史带" value="ST"></el-option>
                            <el-option label="人保" value="RB"></el-option>
                            <el-option label="众安" value="ZA"></el-option>
                        </el-select>
                        <el-select v-model="realParam.term" style="width: 80px; margin-left: 20px" @change="changeTerm">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" v-loading="totalLending">
                <el-col :span="5">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ countDate }}{{ $t('insure_data_jrdds') }}</span>
                            <span class="grid-num2">{{ realTime.order.count }}</span>
                            <span class="grid-num3">
                                <span>{{ frontDate }}{{ $t('insure_data_zrsj') }}：{{ realTime.order.front }}</span>
                                <span>
                                    {{ $t('insure_data_hb') }}：
                                    <i :class="realTime.order.ration > 0 ? 'el-icon-top' : realTime.order.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.order.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.order.ration2 }}%
                                </span>
                            </span>
                            <span class="grid-num3">
                                <span>去年{{ countDate == '本年' ? '' : countDate }}数据：{{ realTime.yearOrder.front }}</span>
                                <span>
                                    {{ $t('insure_data_tb') }}：
                                    <i :class="realTime.yearOrder.ration > 0 ? 'el-icon-top' : realTime.yearOrder.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.yearOrder.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.yearOrder.ration.toString().replace('-', '') }}%
                                </span>
                            </span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ countDate }}{{ $t('insure_data_jrzbf') }}</span>
                            <span class="grid-num2">{{ realTime.amount.count }}{{ $t('common_yuan2') }}</span>
                            <span class="grid-num3">
                                <span>{{ frontDate }}{{ $t('insure_data_zrsj') }}：{{ realTime.amount.front
                                    }}{{ $t('common_yuan2') }}</span>
                                <span>
                                    {{ $t('insure_data_hb') }}：
                                    <i :class="realTime.amount.ration > 0 ? 'el-icon-top' : realTime.amount.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.amount.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.amount.ration2 }}%
                                </span>
                            </span>
                            <span class="grid-num3">
                                <span>去年{{ countDate == '本年' ? '' : countDate }}数据：{{ realTime.yearAmount.front
                                    }}{{ $t('common_yuan2') }}</span>
                                <span>
                                    {{ $t('insure_data_tb') }}：
                                    <i :class="realTime.yearAmount.ration > 0 ? 'el-icon-top' : realTime.yearAmount.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.yearAmount.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.yearAmount.ration.toString().replace('-', '') }}%
                                </span>
                            </span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ countDate }}{{ $t('insure_data_jrxzs') }}</span>
                            <span class="grid-num2">{{ realTime.user.count }}</span>
                            <span class="grid-num3">
                                <span>{{ frontDate }}{{ $t('insure_data_zrsj') }}：{{ realTime.user.front }}</span>
                                <span>
                                    {{ $t('insure_data_hb') }}：
                                    <i :class="realTime.user.ration > 0 ? 'el-icon-top' : realTime.user.ration < 0 ? 'el-icon-bottom' : ''"
                                        :style="{ color: realTime.user.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.user.ration2 }}%
                                </span>
                            </span>
                            <span class="grid-num3">
                                <span>去年{{ countDate == '本年' ? '' : countDate }}数据：{{ realTime.yearUser.front }}</span>
                                <span>
                                    {{ $t('insure_data_tb') }}：
                                    <i :class="realTime.yearUser.ration > 0 ? 'el-icon-top' : realTime.yearUser.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.yearUser.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.yearUser.ration.toString().replace('-', '') }}%
                                </span>
                            </span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ countDate }}{{ $t('insure_data_jjbf') }}</span>
                            <span class="grid-num2">{{ realTime.avgAmount.count }}{{ $t('common_yuan2') }}</span>
                            <span class="grid-num3">
                                <span>{{ frontDate }}{{ $t('insure_data_zrsj') }}：{{ realTime.avgAmount.front
                                    }}{{ $t('common_yuan2') }}</span>
                                <span>
                                    {{ $t('insure_data_hb') }}：
                                    <i :class="realTime.avgAmount.ration > 0
                        ? 'el-icon-top'
                        : realTime.avgAmount.ration < 0
                            ? 'el-icon-bottom'
                            : ''
                        " :style="{ color: realTime.avgAmount.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.avgAmount.ration2 }}%
                                </span>

                            </span>
                            <span class="grid-num3">
                                <span>去年{{ countDate == '本年' ? '' : countDate }}数据：{{ realTime.yearAvgAmount.front
                                    }}{{ $t('common_yuan2') }}</span>
                                <span>
                                    {{ $t('insure_data_tb') }}：
                                    <i :class="realTime.yearAvgAmount.ration > 0 ? 'el-icon-top' : realTime.yearAvgAmount.ration < 0 ? 'el-icon-bottom' : ''
                        " :style="{ color: realTime.yearAvgAmount.ration > 0 ? 'red' : 'green' }"></i>
                                    {{ realTime.yearAvgAmount.ration.toString().replace('-', '') }}%
                                </span>
                            </span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" v-loading="loading1">
                <el-col :span="24">
                    <el-card>
                        <span style="font-weight: bold; font-size: 15px">{{ $t('insure_data_ljsjtj') }}</span>
                        <el-select v-model="addParame.platform" style="width: 130px; margin-left: 20px"
                            @change="changeOption">
                            <el-option label="全部平台" value=""></el-option>
                            <el-option label="Amazon" value="Amazon"></el-option>
                            <el-option label="Wayfair" value="Wayfair"></el-option>
                            <el-option label="HomeDepot" value="HomeDepot"></el-option>
                            <el-option label="Walmart" value="Walmart"></el-option>
                            <el-option label="Overstock" value="Overstock"></el-option>
                            <el-option label="Lowes" value="Lowes"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                        <el-select v-model="addParame.insuranceCode" :placeholder="$t('loan_detail_choose')"
                            style="width: 130px; margin-left: 20px" @change="changeOption">
                            <el-option label="全部保司" value=""></el-option>
                            <el-option label="大地" value="DD"></el-option>
                            <el-option label="平安" value="PN"></el-option>
                            <el-option label="史带" value="ST"></el-option>
                            <el-option label="人保" value="RB"></el-option>
                            <el-option label="众安" value="ZA"></el-option>
                        </el-select>
                        <el-date-picker v-model="accumulativeDate" type="daterange" range-separator="-"
                            @change="changeAdd" value-format="yyyy-MM-dd" :clearable="clearable">
                        </el-date-picker>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="hoverGo" :gutter="24" v-loading="loading1">
                <el-col :span="5">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_ljdds') }}</span>
                            <span class="grid-num2">{{ policyCount.policyCount }}</span>
                            <!-- <div style="color: #999; text-align: right; font-size: 12px">(包括wayfair责任险14单)</div> -->
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_ljzbf') }}</span>
                            <span class="grid-num2">{{ policyCount.policyAmount }}{{ $t('common_yuan2') }}</span>
                            <!-- <div style="color: #999; text-align: right; font-size: 12px">(包括wayfair责任险27649元)</div> -->
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_ljyhs') }}</span>
                            <span class="grid-num2">{{ policyCount.userCount }}</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_ljtbjbf') }}</span>
                            <span class="grid-num2">{{ policyCount.avgAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                    </el-card>
                </el-col>

            </el-row>
            <el-row class="hoverGo" :gutter="24" v-loading="loading1"> <el-col :span="5" :offset="0">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_hyscqds') }}</span>
                            <span class="grid-num2">{{ policyCount.marketCount }}</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_hyhhrs') }}</span>
                            <span class="grid-num2">{{ policyCount.partnerCount }}</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="grid-content">
                            <span class="grid-num">{{ $t('insure_data_bxgmv') }}</span>
                            <span class="grid-num2">{{ policyCount.gmv }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col>
                    <el-card>
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 70px">
                            <div>
                                <span
                                    style="font-size: 18px; font-weight: bold; font-family: normal; color: rgb(70, 70, 70)">
                                    {{ $t('insure_data_ddgm') }}</span>
                                <el-select v-model="choose" style="width: 130px; margin-left: 20px"
                                    @change="changeType">
                                    <el-option label="按保司" value="company"></el-option>
                                    <el-option label="按平台" value="platform"></el-option>
                                </el-select>
                                <el-date-picker @change="changeDates"
                                    v-if="termRadio == 'seven' || termRadio == 'month'" v-model="termSeven"
                                    type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd" :clearable="clearable"
                                    :picker-options="termRadio == 'seven' ? pickerOptions1 : termRadio == 'month' ? pickerOptions2 : ''">
                                </el-date-picker>

                                <el-date-picker v-if="termRadio == 'year'" v-model="termSeven" type="monthrange"
                                    range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"
                                    value-format="yyyy-MM" @change="changeDates" :clearable="clearable">
                                </el-date-picker>
                            </div>
                            <div style="text-align: right">
                                <el-radio-group v-model="termRadio" style="margin-right: 20px" @change="changeTermType">
                                    <el-radio-button label="seven">{{ $t('home_rqs') }}</el-radio-button>
                                    <el-radio-button label="month">{{ $t('home_zqs') }}</el-radio-button>
                                    <el-radio-button label="year">{{ $t('home_yqs') }}</el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div style="width: 100%; margin-top: 25px">
                            <div>{{ $t('insure_data_xzbfqs') }}</div>
                            <div id="myChart" style="height: 650px; width: 100%"></div>
                            <div style="margin: 50px 0 20px 0">{{ $t('insure_data_ljbfqs') }}</div>
                            <div id="myChart5" style="height: 650px; width: 100%"></div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col>
                    <el-card>
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 70px">
                            <div>
                                <span
                                    style="font-size: 18px; font-weight: bold; font-family: normal; color: rgb(70, 70, 70)">
                                    {{ $t('insure_data_ddgm2') }}</span>
                                <el-date-picker @change="changeBoardTime"
                                    v-if="termRadio1 == 'seven' || termRadio1 == 'month'" v-model="boardDatetimerange"
                                    type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd" :clearable="clearable"
                                    :picker-options="termRadio1 == 'seven' ? pickerOptions1 : termRadio1 == 'month' ? pickerOptions2 : ''">
                                </el-date-picker>

                                <el-date-picker v-if="termRadio1 == 'year'" v-model="boardDatetimerange"
                                    type="monthrange" range-separator="至" start-placeholder="开始月份"
                                    end-placeholder="结束月份" value-format="yyyy-MM" @change="changeBoardTime"
                                    :clearable="clearable"></el-date-picker>
                            </div>
                            <div style="text-align: right">
                                <el-radio-group v-model="termRadio1" style="margin-right: 20px"
                                    @change="changeTermType1">
                                    <el-radio-button label="seven">{{ $t('home_rqs') }}</el-radio-button>
                                    <el-radio-button label="month">{{ $t('home_zqs') }}</el-radio-button>
                                    <el-radio-button label="year">{{ $t('home_yqs') }}</el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; margin-bottom: 100px">
                            <div style="width: 40%">
                                <div id="myChart2" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_ddly') }}</div>
                            </div>
                            <div style="width: 60%">
                                <div id="myChart3" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_glyb') }}</div>
                            </div>
                        </div>

                        <div style="width: 100%; display: flex; margin-bottom: 100px">
                            <div style="width: 40%">
                                <div id="myChart4" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_tbpt') }}</div>
                            </div>
                            <div style="width: 60%">
                                <div id="myChart6" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_bfqs') }}</div>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; margin-bottom: 100px">
                            <div style="width: 40%">
                                <div id="myChart7" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_tbbs') }}</div>
                            </div>
                            <div style="width: 60%">
                                <div id="myChart8" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_gbs') }}</div>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; margin-bottom: 100px">
                            <div style="width: 40%">
                                <div id="myChart9" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_scq') }}</div>
                            </div>
                            <div style="width: 60%">
                                <div id="myChart10" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_gqd') }}</div>
                            </div>
                        </div>
                        <!-- <div style="width: 100%; display: flex; margin-bottom: 100px">
                            <div style="width: 40%">
                                <div id="myChart11" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_xsbm') }}</div>
                            </div>
                            <div style="width: 60%">
                                <div id="myChart12" style="height: 550px; width: 100%"></div>
                                <div style="text-align: center">{{ $t('insure_data_glj') }}</div>
                            </div>
                        </div> -->
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-card>
                        <div style="font-size: 18px; font-weight: bold; font-family: normal; color: rgb(70, 70, 70)">
                            {{ $t('insure_data_tbyhqyfb') }}</div>
                        <div style="width: 100%; display: flex">
                            <div style="width: 50%">
                                <div id="myChart13" style="height: 550px; width: 100%"></div>
                            </div>
                            <div style="width: 50%">
                                <div id="myChart14" style="height: 550px; width: 100%"></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="24" v-if="tabIndex == 2">
            <el-col :span="24">
                <!-- <el-card> -->
                <monthTrend></monthTrend>
                <!-- </el-card> -->
            </el-col>
        </el-row>
        <el-row :gutter="24" v-if="tabIndex == 3">
            <el-col :span="24">
                <el-card>
                    <dataClass></dataClass>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
const pickerOptions = {
    shortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                console.log(picker);
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                console.log([start, end]);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
            }
        }
    ]
};
const options = [
    {
        value: 'today',
        label: '今日'
    },
    {
        value: 'week',
        label: '本周'
    },
    {
        value: 'month',
        label: '本月'
    },
    {
        value: 'year',
        label: '本年'
    }
];

import { dataBoard, boardRealTime, boardCompany, boardChannel, boardOrderTrend, boardProvince } from '../../../api/insur';
import monthTrend from '../../common/insureDataDetail';
import dataClass from '../../common/liabilityInsureance';
import '../../../assets/china';
import { number } from 'echarts';
export default {
    components: {
        monthTrend,
        dataClass
    },
    data() {
        return {
            totalLending: false,
            loading1: false,
            tabIndex: '1', //概览与详情切换
            clearable: false,
            choose: 'company',
            pickerMinDate: '',
            pickerMaxDate: '',
            accumulativeDate: '', // 累计数据的日期
            addParame: {
                // 累计数据参数
                platform: '',
                payStartTime: '',
                payEndTime: '',
                insuranceCode: ''
            },
            realParam: {
                // 实时数据参数
                insuranceCode: '',
                platform: '',
                term: 'today' //实时数据筛选条件
            },
            pickerOptions1: {
                //时间范围选择控制
                onPick: ({ maxDate, minDate }) => {
                    if (minDate) {
                        this.pickerMinDate = minDate.getTime();
                    }
                    if (maxDate) {
                        this.pickerMinDate = '';
                        this.pickerMaxDate = maxDate.getTime();
                    }
                },
                disabledDate: (time) => {
                    const day30 = 30 * 24 * 3600 * 1000;
                    if (this.pickerMinDate !== '') {
                        let maxTime = this.pickerMinDate + day30;
                        if (maxTime > new Date()) {
                            maxTime = new Date();
                        }
                        return time.getTime() > maxTime || time.getTime() > Date.now();
                    }
                    if (this.pickerMaxDate !== '' && !this.pickerMinDate) {
                        let minTime = this.pickerMaxDate - day30;
                        return time.getTime() < minTime || time.getTime() > Date.now();
                    }
                    return time.getTime() > Date.now();
                }
            },

            pickerMinDate2: '',
            pickerMaxDate2: '',
            pickerOptions2: {
                //时间范围选择控制
                onPick: ({ maxDate, minDate }) => {
                    if (minDate) {
                        this.pickerMinDate2 = minDate.getTime();
                    }
                    if (maxDate) {
                        this.pickerMinDate2 = '';
                        this.pickerMaxDate2 = maxDate.getTime();
                    }
                },
                disabledDate: (time) => {
                    const day30 = 90 * 24 * 3600 * 1000;
                    if (this.pickerMinDate2 !== '') {
                        let maxTime = this.pickerMinDate2 + day30;
                        if (maxTime > new Date()) {
                            maxTime = new Date();
                        }
                        return time.getTime() > maxTime || time.getTime() > Date.now();
                    }
                    if (this.pickerMaxDate2 !== '' && !this.pickerMinDate2) {
                        let minTime = this.pickerMaxDate2 - day30;
                        return time.getTime() < minTime || time.getTime() > Date.now();
                    }
                    return time.getTime() > Date.now();
                }
            },
            // pickerMinDate2: '',
            // pickerOptions2: {
            //     onPick: ({ maxDate, minDate }) => {
            //         // console.log('阿萨德撒打算',maxDate, minDate);
            //         console.log(minDate.getTime());
            //         this.pickerMinDate2 = minDate.getTime();
            //         if (maxDate) {
            //             this.pickerMinDate2 = '';
            //         }
            //     },
            //     disabledDate: (time) => {
            //         if (this.pickerMinDate2 !== '') {
            //             const day30 = (90 - 1) * 24 * 3600 * 1000;
            //             let maxTime = this.pickerMinDate2 + day30;

            //             return time.getTime() > maxTime;
            //         }
            //         return time.getTime() > Date.now() - 8.64e7;
            //     }
            // },

            termSeven: ['', ''], // 订单规模趋势时间
            termMonth: [],
            datePick: '',
            termRadio: 'seven',
            termRadio1: 'seven',
            option1: {
                title: {
                    text: '渠道责任险规模分布',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '元，' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                legend: { data: [] },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '65%',
                        // center: ['50%', '50%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },

            pickerOptions, //饿了么 时间选择快捷
            boardDatetimerange: [], // 订单规模分布时间
            options,

            policyCount: {}, //累计

            boardCompanyData: [], //各宝石饼图数据
            countDate: '',
            frontDate: "",
            realTime: {
                //实时数据
                amount: {
                    ration: '',
                    count: '',
                    front: ''
                },
                avgAmount: {
                    ration: '',
                    count: '',
                    front: ''
                },
                order: {
                    ration: '',
                    count: '',
                    front: ''
                },
                user: {
                    ration: '',
                    count: '',
                    front: ''
                },
                //实时数据
                yearUser: {
                    ration: '',
                    count: '',
                    front: ''
                },
                yearOrder: {
                    ration: '',
                    count: '',
                    front: ''
                },
                yearAvgAmount: {
                    ration: '',
                    count: '',
                    front: ''
                },
                yearAmount: {
                    ration: '',
                    count: '',
                    front: ''
                },
            },
            map: {
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params);
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
                            show: true,
                            color: 'red',
                            fontSize: 10
                        },
                        // 地图大小倍数
                        zoom: 1.2,
                        data: []
                    }
                ],
                visualMap: {
                    min: 0,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    inRange: {
                        color: ['#E0FFFF', '#B0E0E6', '#87CEFA', '#ADD8E6', '#00BFFF']
                    }
                }
            }
        };
    },

    // computed:{
    //     countDate() {
    //         return this.$t('insure_data_jr') //实时数据前缀
    //     },
    //     frontDate() {
    //         return this.$t('insure_data_zr') //实时数据前缀
    //     },
    // },
    mounted() {
        this.boardDatetimerange = [this.getDay(-6), this.getDay(-0)];
        this.changeTermType('seven');

        this.changeDates();
        this.changeBoardTime();
        this.changeTerm();
        this.getDataBoard();
        this.getMap();
    },
    methods: {
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        },
        changeDates(val) {
            // console.log(val);
            let stime = '';
            let etime = '';
            if (this.termRadio == 'year') {
                stime = this.termSeven[0] + '-01';
                let splitArr = this.termSeven[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
            }
            boardOrderTrend({
                term: this.termRadio,
                startTime: stime || this.termSeven[0],
                endTime: etime || this.termSeven[1],
                type: this.choose
            }).then((res) => {
                let xAxisData = [];
                let yAxisObj = [];
                let totalObj = { name: '', value: [] };
                let legendData = { data: [] };
                let dataAdd = res.data.columnar.data;
                let arr = [];

                for (var i in dataAdd) {
                    arr.push(dataAdd[i]);
                }

                Object.keys(dataAdd).forEach((key, i) => {
                    xAxisData.push(key);

                    if (dataAdd[key][i] && dataAdd[key][i].companyName != '总计') {
                        legendData.data.unshift(dataAdd[key][i].companyName);
                        legendData.data.push('总订单数');
                    }
                    totalObj.name = '总订单数';
                    totalObj.value.push(dataAdd[key][0].orderNum);
                });
                for (let i = 0; i < arr.length; i++) {
                    yAxisObj = arr[i].map((item) => {
                        return { name: item.companyName, value: [] };
                    });
                }
                yAxisObj.forEach((item) => {
                    arr.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name !== '总计' && item.name === item3.companyName) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                window.echartsData = res.data.columnar;
                this.$nextTick(() => {
                    this.drawLine(xAxisData, yAxisObj, totalObj, legendData);
                });

                let xAxisData5 = [];
                let yAxisObj5 = [];
                // let totalObj5 = { name: '', value: [] };
                let legendData5 = { data: [] };
                let dataAdd5 = res.data.broken.data;
                let arr5 = [];

                for (var i in dataAdd5) {
                    arr5.push(dataAdd5[i]);
                }
                Object.keys(dataAdd5).forEach((key, i) => {
                    xAxisData5.push(key);

                    if (dataAdd5[key][i]) {
                        legendData5.data.unshift(dataAdd[key][i].companyName);
                    }
                });
                for (let i = 0; i < arr5.length; i++) {
                    yAxisObj5 = arr5[i].map((item) => {
                        return { name: item.companyName, value: [] };
                    });
                }
                yAxisObj5.forEach((item) => {
                    arr5.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.companyName) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                window.echartsData1 = res.data.broken;
                // console.log(window.echartsData1)
                this.$nextTick(() => {
                    this.drawLine5(xAxisData5, yAxisObj5, legendData5);
                });
            });
        },
        changeTermType(val) {
            var d = new Date();
            var d2 = new Date();
            var arr = [];
            d.setTime(d.getTime() - 30 * 24 * 3600 * 1000 * 3);
            arr[0] = d.getFullYear();
            arr[1] = d.getMonth() + 1;
            arr[2] = this.getDay(-0).split('-')[2];
            if (val == 'seven') {
                //  日趋势  默认值
                this.termSeven = [this.getDay(-6), this.getDay(-0)];
                console.log(this.termSeven);
            } else if (val == 'month') {
                // 周
                this.termSeven = [arr.join('-'), this.getDay(-0)];
                console.log(this.termSeven);
            } else {
                // 月
                let month = [];
                month[0] = d2.getFullYear() - 1; // 去年年份
                month[1] = this.Zero(d2.getMonth() + 2 + '');
                if (d2.getMonth() === 11) {
                    month[0] = d2.getFullYear();
                    month[1] = '01';
                }
                console.log(month[0]);
                this.termSeven = [month[0] + '-' + month[1], this.getDay(-0)];
                console.log(this.termSeven);
            }
            this.changeDates();
        },
        changeTermType1(val) {
            var d = new Date();
            var d2 = new Date();
            var arr = [];
            this.termRadio1 = val;

            d.setTime(d.getTime() - 30 * 24 * 3600 * 1000 * 3);
            arr[0] = d.getFullYear();
            arr[1] = d.getMonth() + 1;
            arr[2] = this.getDay(-0).split('-')[2];
            if (val == 'seven') {
                //  日趋势  默认值
                this.boardDatetimerange = [this.getDay(-6), this.getDay(-0)];
                console.log(this.boardDatetimerange);
            } else if (val == 'month') {
                // 周
                this.boardDatetimerange = [arr.join('-'), this.getDay(-0)];
                console.log(this.boardDatetimerange);
            } else {
                // 月

                let month = [];
                month[0] = d2.getFullYear() - 1; // 去年年份
                month[1] = this.Zero(d2.getMonth() + 2 + '');
                if (d2.getMonth() === 11) {
                    month[0] = d2.getFullYear();
                    month[1] = '01';
                }
                this.boardDatetimerange = [month[0] + '-' + month[1], this.getDay(-0)];
                console.log(this.boardDatetimerange);
            }
            this.changeBoardTime();
        },
        getMonthFinalDay(year, month) {
            var day = '';
            if (year == null || year == undefined || year == '') {
                year = new Date().getFullYear();
            }
            if (month == null || month == undefined || month == '') {
                month = new Date().getMonth() + 1;
            }
            day = new Date(new Date(year, month).setDate(0)).getDate();
            return year + '-' + month + '-' + day;
        },
        changeBoardTime() {
            let stime = '';
            let etime = '';
            if (this.termRadio1 == 'year') {
                stime = this.boardDatetimerange[0] + '-01';
                let splitArr = this.boardDatetimerange[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
            }
            boardChannel({
                startTime: stime || this.boardDatetimerange[0],
                endTime: etime || this.boardDatetimerange[1],
                term: this.termRadio1
            }).then((res) => {
                // res.data.orderSourcePie.forEach((item,index) => {
                //    if(item.name=='销售部门'){
                //     res.data.orderSourcePie.splice(index,1)
                //    }
                // });
                // Object.keys(res.data.orderSourceLine.data).forEach((key,index) => {

                //     res.data.orderSourceLine.data[key].forEach((item,ind)=>{
                //         if(item.name=='销售部门'){res.data.orderSourceLine.data[key].splice(ind,1) }
                //     })

                // });
                // ================================================================================================
                let data1 = [];
                res.data.orderSourcePie.forEach((item) => {
                    if (item.amount !== 0) {
                        data1.push({
                            name: item.name,
                            value: item.amount
                        });
                    }
                });

                this.$nextTick(() => {
                    this.drawLine2(data1);
                });

                // =================================================================================================
                let data2 = [];
                res.data.insurancePlatformPie.forEach((item) => {
                    if (item.amount !== 0) {
                        data2.push({
                            name: item.name,
                            value: item.amount
                        });
                    }
                });
                this.$nextTick(() => {
                    this.drawLine4(data2);
                });

                // ===========================================================================================

                let data3 = [];
                res.data.insuranceCompanyPie.forEach((item) => {
                    if (item.amount !== 0) {
                        data3.push({
                            name: item.name,
                            value: item.amount
                        });
                    }
                });
                this.$nextTick(() => {
                    this.drawLine7(data3);
                });

                // =============================================================================================
                let data4 = [];
                res.data.marketPie.forEach((item) => {
                    if (item.amount !== 0) {
                        data4.push({
                            name: item.name,
                            value: item.amount
                        });
                    }
                });
                this.$nextTick(() => {
                    this.drawLine9(data4);
                });

                // ==============================================================================================
                let data5 = [];
                res.data.salePie.forEach((item) => {
                    if (item.amount !== 0) {
                        data5.push({
                            name: item.name,
                            value: item.amount
                        });
                    }
                });
                this.$nextTick(() => {
                    // this.drawLine11(data5);
                });

                // =============================================== 来源保费趋势 ================================================
                let xData = [];
                let legData = { data: [] };
                let ySourceData = [];
                let arr3 = [];
                let lineData = res.data.orderSourceLine.data;
                for (var i in lineData) {
                    arr3.push(lineData[i]);
                }
                let newArr = [];
                Object.keys(lineData).forEach((key, i) => {
                    xData.push(key);
                    // console.log(lineData[key]);
                    lineData[key].forEach((item) => {
                        newArr.unshift(item.name);
                    });
                });
                legData.data = [...new Set(newArr)];
                for (let i = 0; i < arr3.length; i++) {
                    ySourceData = arr3[i].map((item) => {
                        return { name: item.name, value: [] };
                    });
                }
                ySourceData.forEach((item) => {
                    arr3.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.name) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                this.$nextTick(() => {
                    this.drawLine3(xData, ySourceData, legData);
                });

                // =============================================== 平台保费趋势 ==============================================
                let xData6 = [];
                let legData6 = { data: [] };
                let ySourceData6 = [];
                let arr6 = [];
                let platData = res.data.insurancePlatformLine.data;
                for (var i in platData) {
                    arr6.push(platData[i]);
                }
                let newArr6 = [];
                Object.keys(platData).forEach((key, i) => {
                    xData6.push(key);
                    // console.log(platData[key]);
                    platData[key].forEach((item) => {
                        newArr6.unshift(item.name);
                    });
                });
                legData6.data = [...new Set(newArr6)];
                for (let i = 0; i < arr6.length; i++) {
                    ySourceData6 = arr6[i].map((item) => {
                        return { name: item.name, value: [] };
                    });
                }
                ySourceData6.forEach((item) => {
                    arr6.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.name) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                this.$nextTick(() => {
                    this.drawLine6(xData6, ySourceData6, legData6);
                });

                // ======================================  投保保司趋势  ========================================================
                let xData8 = [];
                let legData8 = { data: [] };
                let ySourceData8 = [];
                let arr8 = [];
                let companyData = res.data.insuranceCompanyLine.data;
                for (var i in companyData) {
                    arr8.push(companyData[i]);
                }
                let newArr8 = [];
                Object.keys(companyData).forEach((key, i) => {
                    xData8.push(key);
                    companyData[key].forEach((item) => {
                        newArr8.unshift(item.name);
                    });
                });
                legData8.data = [...new Set(newArr8)];
                for (let i = 0; i < arr8.length; i++) {
                    ySourceData8 = arr8[i].map((item) => {
                        return { name: item.name, value: [] };
                    });
                }
                ySourceData8.forEach((item) => {
                    arr8.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.name) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                this.$nextTick(() => {
                    this.drawLine8(xData8, ySourceData8, legData8);
                });

                // ======================================  各渠道保费趋势  ========================================================
                let xData10 = [];
                let legData10 = { data: [] };
                let ySourceData10 = [];
                let arr10 = [];
                let channelData = res.data.marketLine.data;
                for (var i in channelData) {
                    arr10.push(channelData[i]);
                }
                let newArr10 = [];
                Object.keys(channelData).forEach((key, i) => {
                    xData10.push(key);
                    channelData[key].forEach((item) => {
                        newArr10.unshift(item.name);
                    });
                });
                legData10.data = [...new Set(newArr10)];
                for (let i = 0; i < arr10.length; i++) {
                    ySourceData10 = arr10[i].map((item) => {
                        return { name: item.name, value: [] };
                    });
                }
                ySourceData10.forEach((item) => {
                    arr10.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.name) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                this.$nextTick(() => {
                    this.drawLine10(xData10, ySourceData10, legData10);
                });
                // ======================================  各路径保费趋势  ========================================================

                let xData12 = [];
                let legData12 = { data: [] };
                let ySourceData12 = [];
                let arr12 = [];
                let saleData = res.data.saleLine.data;
                for (var i in saleData) {
                    arr12.push(saleData[i]);
                }
                let newArr12 = [];
                Object.keys(saleData).forEach((key, i) => {
                    xData12.push(key);
                    saleData[key].forEach((item) => {
                        newArr12.unshift(item.name);
                    });
                });
                legData12.data = [...new Set(newArr12)];
                for (let i = 0; i < arr10.length; i++) {
                    ySourceData12 = arr12[i].map((item) => {
                        return { name: item.name, value: [] };
                    });
                }
                ySourceData12.forEach((item) => {
                    arr12.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.name) {
                                item.value.push(item3.amount);
                            }
                        });
                    });
                });
                // console.log(ySourceData12);
                this.$nextTick(() => {
                    // this.drawLine12(xData12, ySourceData12, legData12);
                });
            });
        },
        changeTerm(val) {

            this.countDate =
                this.realParam.term == 'today'
                    ? this.$t('insure_data_jr')
                    : this.realParam.term == 'week'
                        ? '本周'
                        : this.realParam.term == 'month'
                            ? '本月'
                            : this.realParam.term == 'year'
                                ? '本年'
                                : '';
            this.frontDate =
                this.realParam.term == 'today'
                    ? this.$t('insure_data_zr')
                    : this.realParam.term == 'week'
                        ? '上周'
                        : this.realParam.term == 'month'
                            ? '上月'
                            : this.realParam.term == 'year'
                                ? '去年'
                                : '';
            this.getBoardRealTime();
        },
        getBoardRealTime() {
            this.totalLending = true
            boardRealTime(this.realParam).then((res) => {
                this.realTime = res.data;

                this.realTime.order.ration2 = this.realTime.order.ration.toString().replace('-', ' ');
                this.realTime.amount.ration2 = this.realTime.amount.ration.toString().replace('-', ' ');
                this.realTime.user.ration2 = this.realTime.user.ration.toString().replace('-', ' ');
                this.realTime.avgAmount.ration2 = this.realTime.avgAmount.ration.toString().replace('-', ' ');

                this.realTime.yearAmount.ration2 = this.realTime.yearAmount.ration.toString().replace('-', ' ');
                this.realTime.yearAvgAmount.ration2 = this.realTime.yearAvgAmount.ration.toString().replace('-', ' ');
                this.realTime.yearOrder.ration2 = this.realTime.yearOrder.ration.toString().replace('-', ' ');
                this.realTime.yearUser.ration2 = this.realTime.yearUser.ration.toString().replace('-', ' ');
                this.totalLending = false
            });
        },
        getDataBoard() {
            this.loading1 = true
            dataBoard(this.addParame).then((res) => {
                this.policyCount = res.data;
                this.loading1 = false
            }).catch(err => {
                this.loading1 = false
            })
        },
        // 新增保费趋势
        drawLine(xAxisData = [], yAxisObj = [], totalObj = {}, legendData = {}) {
            let seriesData = [];

            yAxisObj.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'bar',
                    stack: 'Ad',
                    yAxisIndex: 0,
                    emphasis: {
                        focus: 'series'
                    },
                    data: item.value
                });
            });
            seriesData.push({
                name: '总订单数',
                type: 'line',
                data: totalObj.value,
                yAxisIndex: 1
            });

            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart');
            let myChart = this.$echarts.init(dom);

            let option = {
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: {
                //         type: 'shadow',
                //         crossStyle: {
                //             color: '#999'
                //         }
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (arg) {
                        arg.forEach((it) => {
                            Object.keys(window.echartsData.data).forEach((key) => {
                                window.echartsData.data[key].forEach((item2) => {
                                    if (it.seriesName == item2.companyName && it.axisValueLabel === key) {
                                        it.orderNum = item2.orderNum;
                                    }

                                    if (it.seriesName == '总订单数' && it.axisValueLabel === key) {
                                        it.seriesName = '总计';
                                        it.data = item2.amount;
                                        it.orderNum = it.value;
                                    }
                                });
                            });
                        });

                        let arrTemp = arg;
                        let dom = [
                            `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div><div style="width:100px;text-align:left">保费/元</div> <div style="width:100px;text-align:left">订单数</div> </div>`
                        ];
                        arrTemp.forEach((item) => {
                            dom.push(
                                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left" "> ${item.marker} ${item.seriesName}：</div><div style="width:100px;text-align:left">${item.data}</div> <div style="width:100px;text-align:left">${item.orderNum}</div></div>`
                            );
                        });
                        let dom2 = [];
                        dom.forEach((item, index) => {
                            if (item) {
                                dom2.push(item);
                            }
                        });
                        return dom2.join('<br/>');
                    }
                },
                legend: legendData,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisData,
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 10);
                                // console.log( val);
                                return val;
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '保费/元',
                        min: 0,
                        position: 'left'
                    },

                    {
                        type: 'value',
                        name: '订单数',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: seriesData
            };
            myChart.setOption(option, true);
        },
        // 累计保费趋势
        drawLine5(xAxisData5 = [], yAxisObj5 = [], legendData5 = {}) {
            let seriesData5 = [];

            yAxisObj5.forEach((item) => {
                seriesData5.push({
                    name: item.name,
                    type: 'line',
                    yAxisIndex: 1,
                    data: item.value
                });
            });
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart5');
            let myChart = this.$echarts.init(dom);

            let option = {
                legend: legendData5,
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisData5,
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        position: 'right'
                    },
                    {
                        type: 'value',
                        name: '保费/元'
                        // min: 0
                    }
                ],
                series: seriesData5
                // series: [
                //     {
                //         name: '大地',
                //         type: 'line',
                //         stack: 'Total',
                //         data: []
                //     },
                //     {
                //         name: '平安',
                //         type: 'line',
                //         stack: 'Total',
                //         data: []
                //     },
                //     {
                //         name: '人保',
                //         type: 'line',
                //         stack: 'Total',
                //         data: []
                //     },
                //     {
                //         name: '史带',
                //         type: 'line',
                //         stack: 'Total',
                //         data: []
                //     },
                //     {
                //         name: '总订单数',
                //         type: 'line',
                //         data: [],
                //         yAxisIndex: 1
                //     }
                // ]
            };
            myChart.setOption(option, true);
        },
        //订单来源分布
        drawLine2(data1 = []) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart2');
            let myChart = this.$echarts.init(dom);
            let option = {
                tooltip: {
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data1
                    }
                ]
            };
            myChart.setOption(option, true);
        },
        // 各来源保费趋势
        drawLine3(xData = [], ySourceData = [], legData = {}) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart3');
            let myChart = this.$echarts.init(dom);
            let seriesData = [];

            ySourceData.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.value
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: legData,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name: '保费/元',
                    min: 0,
                    position: 'left'
                },

                series: seriesData
            };
            myChart.setOption(option, true);
        },
        // 投保平台分布
        drawLine4(data2 = []) {
            let dom = document.getElementById('myChart4');
            let myChart = this.$echarts.init(dom);
            let option = {
                tooltip: {
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data2
                    }
                ]
            };
            myChart.setOption(option, true);
        },

        // 各平台保费趋势
        drawLine6(xData6 = [], ySourceData6 = [], legData6 = {}) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart6');
            let myChart = this.$echarts.init(dom);
            let seriesData = [];

            ySourceData6.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.value
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: legData6,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData6
                },
                yAxis: {
                    type: 'value',
                    name: '保费/元',
                    min: 0,
                    position: 'left'
                },

                series: seriesData
            };
            myChart.setOption(option, true);
        },

        // 投保保司分布
        drawLine7(data3 = []) {
            let dom = document.getElementById('myChart7');
            let myChart = this.$echarts.init(dom);
            let option = {
                tooltip: {
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data3
                    }
                ]
            };
            myChart.setOption(option, true);
        },

        // 各保司保费趋势
        drawLine8(xData8 = [], ySourceData8 = [], legData8 = {}) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart8');
            let myChart = this.$echarts.init(dom);
            let seriesData = [];

            ySourceData8.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.value
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: legData8,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData8
                },
                yAxis: {
                    type: 'value',
                    name: '保费/元',
                    min: 0,
                    position: 'left'
                },

                series: seriesData
            };
            myChart.setOption(option, true);
        },

        // 市场渠道分布
        drawLine9(data4 = []) {
            let dom = document.getElementById('myChart9');
            let myChart = this.$echarts.init(dom);
            let option = {
                tooltip: {
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data4
                    }
                ]
            };
            myChart.setOption(option, true);
        },
        // 各渠道保费趋势
        drawLine10(xData10 = [], ySourceData10 = [], legData10 = {}) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart10');
            let myChart = this.$echarts.init(dom);
            let seriesData = [];

            ySourceData10.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.value
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: legData10,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData10
                },
                yAxis: {
                    type: 'value',
                    name: '保费/元',
                    min: 0,
                    position: 'left'
                },

                series: seriesData
            };
            myChart.setOption(option, true);
        },

        // 市场渠道分布
        drawLine11(data5 = []) {
            let dom = document.getElementById('myChart11');
            let myChart = this.$echarts.init(dom);
            let option = {
                tooltip: {
                    formatter: function (datas) {
                        var res =
                            datas.data.name +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '&nbsp;' +
                            '保费：' +
                            datas.data.value +
                            '&nbsp;' +
                            '&nbsp;' +
                            '占比：' +
                            datas.percent +
                            '%';
                        return res;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: data5
                    }
                ]
            };
            myChart.setOption(option, true);
        },

        // 各路径保费趋势
        drawLine12(xData12 = [], ySourceData12 = [], legData12 = {}) {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart12');
            let myChart = this.$echarts.init(dom);
            let seriesData = [];

            ySourceData12.forEach((item) => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.value
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: legData12,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData12
                },
                yAxis: {
                    type: 'value',
                    name: '保费/元',
                    min: 0,
                    position: 'left'
                },

                series: seriesData
            };
            myChart.setOption(option, true);
        },

        getDay(day) {
            var today = new Date();
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = this.doHandleMonth(tMonth + 1);
            tDate = this.doHandleMonth(tDate);
            return tYear + '-' + tMonth + '-' + tDate;
        },
        doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = '0' + month;
            }
            return m;
        },
        changeAdd(value) {
            // console.log(value);
            this.addParame.payStartTime = this.accumulativeDate[0];
            this.addParame.payEndTime = this.accumulativeDate[1];
            this.getDataBoard();
        },
        changeOption(value) {
            // console.log(value);
            // this.addParame.platform = value;
            this.getDataBoard();
        },
        changePlat(value) {

            this.changeTerm();
        },
        changeType(value) {
            this.choose = value;
            this.changeDates();
        },
        // 投保用户区域
        darwLine14(yData = [], sData = []) {
            let dom = document.getElementById('myChart14');
            let myChart = this.$echarts.init(dom);
            let option = {
                color: ['#00BFFF'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '10%',
                    right: '4%',
                    bottom: '2%'
                    // containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
                },
                yAxis: {
                    name: '省份',
                    type: 'category',
                    // data: ['广东', '江苏', '山东', '北京', '河南', '黑龙江', '上海', '湖北', '福建', '浙江'],
                    data: yData,
                    axisTick: {
                        show: false //刻度线
                    },
                    axisLine: {
                        show: false //隐藏y轴
                    }
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: '8%',
                        // data: [18203, 23489, 29034, 104970, 131744, 630230, 746324, 49373, 9472, 84722]
                        data: sData
                    }
                ]
            };
            myChart.setOption(option, true);
        },
        getMap() {
            this.map.series[0].data = [];
            let yData = [];
            let sData = [];
            boardProvince().then((res) => {
                res.data.forEach((item) => {
                    this.map.series[0].data.push({
                        name:
                            item.provName == '上海市' || item.provName == '天津市' || item.provName == '北京市' || item.provName == '重庆市'
                                ? item.provName.replace('市', '')
                                : item.provName.replace('省', ''),

                        value: item.provNum
                    });
                    yData.unshift(item.provName);
                    sData.unshift(item.provNum);
                });
                let dom13 = document.getElementById('myChart13');
                let myChart13 = this.$echarts.init(dom13);
                myChart13.setOption(this.map);

                this.darwLine14(yData, sData);
            });
        },
        isAll(value) {
            if (value == 1) {
                this.boardDatetimerange = [this.getDay(-6), this.getDay(-0)];
                this.changeTermType('seven');
                this.changeDates();
                this.changeBoardTime();
                this.changeTerm();
                this.getDataBoard();
                this.getMap();
            }
        }
    }
};
</script>

<style lang='less' scoped>
/* 	*,
	*::before,
	*::after {
	  box-sizing:content-box!important // 1
	} */

.dataBoard {
    .el-card {
        font-size: 15px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    /deep/.el-input--small .el-input__inner {
        height: 25px;
        line-height: 23px;
    }

    /deep/.el-input--small .el-input__icon {
        line-height: 25px;
    }

    /deep/.el-range-editor.el-input__inner {
        padding: 0px 10px;
        height: 26px;
        margin-left: 10px;
    }


    .el-col-offset-1 {
        margin-left: 2%;
    }

    .grid-content {
        font-size: 14px;
        color: #999;
        display: flex;
        padding: 20px;
        flex-direction: column;
        height: auto;

        .grid-num {
            font-size: 15px;
            color: #000;
            margin-bottom: 10px;
        }

        .grid-num2 {
            font-size: 28px;
            text-align: center;
            color: #000;
            margin: 20px 0;
        }

        .grid-num3 {
            color: #000;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .el-icon-top {
            font-size: 15px;
            font-weight: 700;
            color: red;
        }
    }
}
</style>