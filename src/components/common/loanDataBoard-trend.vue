<template>
    <div style="padding-bottom:100px;">
        <div style="background:#fff;padding:30px 20px;border-radius:0 20px 20px 20px">
            <div
                style="display:flex;align-items:center;margin-bottom:20px;justify-content: space-between;"
            >
                <el-radio-group v-model="detailTabIndex" size="25" @change="changeTab">
                    <el-radio-button label="MONTH">{{$t('home_yqs')}}</el-radio-button>
                    <el-radio-button label="WEEK">{{$t('home_zqs')}}</el-radio-button>
                    <el-radio-button label="DAY">{{$t('home_rqs')}}</el-radio-button>
                </el-radio-group>

                <div style="text-align:right;">
                    <el-date-picker
                        v-model="termSeven"
                        :picker-options="detailTabIndex == 'MONTH' ? pickerOptions : pickerOptions2"
                        :type="detailTabIndex == 'MONTH' ? 'monthrange' : 'daterange'"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        :value-format="detailTabIndex == 'MONTH' ? 'yyyy-MM' : 'yyyy-MM-dd'"
                        @change="changeDates"
                    ></el-date-picker>
                    <el-button
                        type="primary"
                        icon="el-icon-printer"
                        style="margin-left:30px"
                        @click="_export"
                    >{{$t('home_export')}}</el-button>
                </div>
            </div>
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                :border="true"
                :row-style="{ height: '50px', 'font-size': '14px' }"
            >
                <el-table-column prop="head" :label="$t('home_xtime')" width="130px">
                    <template slot-scope="scope">
                        <div
                            style="font-size:14px;text-align:center;height:30px;line-height:30px"
                        >{{ scope.row.head }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    :prop="item.key"
                    :label="item.label"
                    v-for="(item ) in colunm"
                    :key="item.key"
                >
                    <template slot-scope="scope">
                        <div style="font-size:14px;text-align:center;height:30px;line-height:30px">
                            {{
                            scope.row[item.key] }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin-top: 20px;" id="c" v-loading="loading">
            <el-card style="border-radius:20px">
                <el-radio-group
                    v-model="chartsCardType"
                    style="margin-bottom: 20px;"
                    @change="refurbishEcharts('')"
                    size="25"
                >
                    <el-radio-button label="LOAN">{{$t('home_fkje')}}</el-radio-button>
                    <el-radio-button label="CREADIT">{{$t('home_sxje')}}</el-radio-button>
                    <el-radio-button label="LOANSUM">{{$t('home_fkdps')}}</el-radio-button>
                </el-radio-group>
                <div
                    style="width:100%;height:1px;background:#EBEDF0;margin-top:12px;margin-bottom:32px"
                ></div>
                <!-- 资金方授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_zjffb')}}-{{$t('home_sxje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="lenderCreaditType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(1)"
                                    size="medium"
                                    :style="{ borderRight: lenderCreaditType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="lenderCreaditType == 1"
                                        src="../../assets/bar.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="lenderCreaditType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="lenderCreaditType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderCreaditType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail1Select"
                            clearable
                            @change="_changeOptionSelect(1)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail1SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="lenderCreaditType == 1">
                            <div id="detailChart1" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="lenderCreaditType == 2"
                        >
                            <div id="detailChart1Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail1Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 产品授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_cpfb')}}-{{$t('home_sxje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="productCreaditType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(2)"
                                    size="medium"
                                    :style="{ borderRight: productCreaditType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="productCreaditType == 1"
                                        src="../../assets/bar.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="productCreaditType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="productCreaditType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productCreaditType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail2Select"
                            clearable
                            @change="_changeOptionSelect(2)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail2SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="productCreaditType == 1">
                            <div id="detailChart2" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="productCreaditType == 2"
                        >
                            <div id="detailChart2Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail2Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 支付公司授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        支付公司分布-{{$t('home_sxje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="paymentCreaditType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(3)"
                                    size="medium"
                                    :style="{ borderRight: paymentCreaditType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="paymentCreaditType == 1"
                                        src="../../assets/bar.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="paymentCreaditType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="paymentCreaditType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentCreaditType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail3Select"
                            clearable
                            @change="_changeOptionSelect(3)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail3SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="paymentCreaditType == 1">
                            <div id="detailChart3" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="paymentCreaditType == 2"
                        >
                            <div id="detailChart3Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail3Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 资金方放款金额 -->
                <div v-show="chartsCardType === 'LOAN'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_zjffb')}}-{{$t('home_fkje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="lenderLoanType"
                                    label="1"
                                    border
                                    size="medium"
                                    :style="{ borderRight: lenderLoanType == 1 ? '1px solid #FE1964' : 'none' }"
                                    @change="_changeOptionSelect(4)"
                                >
                                    <img v-if="lenderLoanType == 1" src="../../assets/bar.png" alt />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="lenderLoanType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img v-if="lenderLoanType == 2" src="../../assets/pie.png" alt />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderLoanType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail4Select"
                            clearable
                            @change="_changeOptionSelect(4)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail4SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="lenderLoanType == 1">
                            <div id="detailChart4" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="lenderLoanType == 2"
                        >
                            <div id="detailChart4Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail4Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {{$t('home_cpfb')}} {{$t('home_fkje')}} -->
                <div v-show="chartsCardType === 'LOAN'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_cpfb')}}-{{$t('home_fkje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="productLoanType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(5)"
                                    size="medium"
                                    :style="{ borderRight: productLoanType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img v-if="productLoanType == 1" src="../../assets/bar.png" alt />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="productLoanType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img v-if="productLoanType == 2" src="../../assets/pie.png" alt />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productLoanType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail5Select"
                            clearable
                            @change="_changeOptionSelect(5)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail5SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="productLoanType == 1">
                            <div id="detailChart5" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="productLoanType == 2"
                        >
                            <div id="detailChart5Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail5Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {{$t('home_zfgs')}} {{$t('home_fkje')}} -->
                <div v-show="chartsCardType === 'LOAN'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_zfgs')}}-{{$t('home_fkje')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="paymentLoanType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(6)"
                                    size="medium"
                                    :style="{ borderRight: paymentLoanType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img v-if="paymentLoanType == 1" src="../../assets/bar.png" alt />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="paymentLoanType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img v-if="paymentLoanType == 2" src="../../assets/pie.png" alt />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentLoanType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail6Select"
                            clearable
                            @change="_changeOptionSelect(6)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail6SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="paymentLoanType == 1">
                            <div id="detailChart6" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="paymentLoanType == 2"
                        >
                            <div id="detailChart6Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail6Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}万</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {{$t('home_zjffb')}} 放款店铺 -->
                <div v-show="chartsCardType === 'LOANSUM'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_zjffb')}}-{{$t('home_fkdps')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="lenderLoanSumType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(7)"
                                    size="medium"
                                    :style="{ borderRight: lenderLoanSumType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="lenderLoanSumType == 1"
                                        src="../../assets/bar.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="lenderLoanSumType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="lenderLoanSumType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderLoanSumType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail7Select"
                            clearable
                            @change="_changeOptionSelect(7)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail7SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="lenderLoanSumType == 1">
                            <div id="detailChart7" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="lenderLoanSumType == 2"
                        >
                            <div id="detailChart7Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail7Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}笔</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {{$t('home_cpfb')}} 放款店铺 -->
                <div v-show="chartsCardType === 'LOANSUM'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_cpfb')}}-{{$t('home_fkdps')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="productLoanSumType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(8)"
                                    size="medium"
                                    :style="{ borderRight: productLoanSumType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="productLoanSumType == 1"
                                        src="../../assets/bar.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/bar2.png" alt />
                                    {{$t('home_zzt')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="productLoanSumType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="productLoanSumType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productLoanSumType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail8Select"
                            clearable
                            @change="_changeOptionSelect(8)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail8SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="productLoanSumType == 1">
                            <div id="detailChart8" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="productLoanSumType == 2"
                        >
                            <div id="detailChart8Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail8Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}笔</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {{$t('home_zfgs')}} 放款店铺 -->
                <div v-show="chartsCardType === 'LOANSUM'" style="margin-top: 50px">
                    <div class="select-f" style="position: relative;">
                        {{$t('home_zfgs')}}-{{$t('home_fkdps')}}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio
                                    class="echarts-radio1"
                                    v-model="paymentLoanSumType"
                                    label="1"
                                    border
                                    @change="_changeOptionSelect(9)"
                                    size="medium"
                                    :style="{ borderRight: paymentLoanSumType == 1 ? '1px solid #FE1964' : 'none' }"
                                >
                                    <img
                                        v-if="paymentLoanSumType == 1"
                                        src="../../assets/line2.png"
                                        style="width:20px;height:20px"
                                        alt
                                    />
                                    <img
                                        v-else
                                        src="../../assets/line.png"
                                        style="width:20px;height:20px"
                                        alt
                                    />
                                    {{$t('home_line')}}
                                </el-radio>
                                <el-radio
                                    class="echarts-radio2"
                                    v-model="paymentLoanSumType"
                                    label="2"
                                    border
                                    size="medium"
                                >
                                    <img
                                        v-if="paymentLoanSumType == 2"
                                        src="../../assets/pie.png"
                                        alt
                                    />
                                    <img v-else src="../../assets/pie2.png" alt />
                                    {{$t('home_bt')}}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentLoanSumType == 1">
                        <el-select
                            class="loan-select"
                            v-model="detail9Select"
                            clearable
                            @change="_changeOptionSelect(9)"
                            placeholder="全部"
                            multiple
                            style="margin-right:30px"
                        >
                            <el-option
                                v-for="item in detail9SelectArr"
                                :key="item.name"
                                :label="item.name"
                                clearable
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%" v-show="paymentLoanSumType == 1">
                            <div id="detailChart9" style="height: 460px; width: 100%"></div>
                        </div>
                        <div
                            style="width: 100%;display:flex;margin-top:60px"
                            v-show="paymentLoanSumType == 2"
                        >
                            <div id="detailChart9Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div
                                    class="label-item"
                                    v-for="(item, index) in detail9Pie.series[0].data"
                                    :key="item.name"
                                >
                                    <div class="top">
                                        <div
                                            class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }"
                                        ></div>
                                        {{ item.name }}
                                    </div>
                                    <div class="bottom">
                                        <span>{{ Number(item.value).toLocaleString() }}笔</span>
                                        <span>占比 {{ item.scale }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card style="margin-top:20px;border-radius:20px">
                <div style="margin-top: 20px">
                    <div class="select-f" style="position: relative;">{{$t('home_yhs')}}</div>

                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%">
                            <div id="detailCharts5" style="height: 460px; width: 100%"></div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 20px">
                    <div class="select-f" style="position: relative;">{{$t('home_dps')}}</div>

                    <div style="width:100%;display:flex;padding-top:20px">
                        <div style="width: 100%">
                            <div id="detailCharts6" style="height: 460px; width: 100%"></div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {
    detail1Pie,
    detail1,
    detail2Pie,
    detail2,
    detail3Pie,
    detail3,
    detail4Pie,
    detail4,
    detail5Pie,
    detail5,
    detail6Pie,
    detail6,
    detail7Pie,
    detail7,
    detail8Pie,
    detail8,
    detail9Pie,
    detail9,
    detailOption5,
    detailOption6
} from '../common/loanDataBoard';
import { boardTrend, boardPolyline, boardDate, boardColumnar } from '../../api/loanDataBoard';
import { number } from 'echarts';
export default {
    data() {
        return {
            detailOption5,
            detailOption6,
            detail1Pie,
            detail1,
            lenderCreaditType: '1',
            detail1SelectArr: [],
            detail1Select: [],

            productCreaditType: '1',
            detail2Pie,
            detail2,
            detail2SelectArr: [],
            detail2Select: [],

            paymentCreaditType: '1',
            detail3Pie,
            detail3,
            detail3SelectArr: [],
            detail3Select: [],

            lenderLoanType: '1',
            detail4Pie,
            detail4,
            detail4SelectArr: [],
            detail4Select: [],

            productLoanType: '1',
            detail5Pie,
            detail5,
            detail5SelectArr: [],
            detail5Select: [],

            paymentLoanType: '1',
            detail6Pie,
            detail6,
            detail6SelectArr: [],
            detail6Select: [],

            lenderLoanSumType: '1',
            detail7Pie,
            detail7,
            detail7SelectArr: [],
            detail7Select: [],

            productLoanSumType: '1',
            detail8Pie,
            detail8,
            detail8SelectArr: [],
            detail8Select: [],

            paymentLoanSumType: '1',
            detail9Pie,
            detail9,
            detail9SelectArr: [],
            detail9Select: [],

            chartsCardType: 'LOAN',
            totalMonth: [],
            chooseDates: [],
            chartsDate: [],
            loading: false,
            pickerMinDate2: '',
            pickerMaxDate2: '',
            pickerOptions: {
                onPick: ({ maxDate, minDate }) => {
                    if (minDate) {
                        this.pickerMinDate2 = minDate.getTime();
                    }
                    if (maxDate) {
                        this.pickerMinDate2 = '';
                        this.pickerMaxDate2 = maxDate.getTime();
                    }
                },
                disabledDate: time => {
                    const day30 = 364 * 24 * 3600 * 1000;
                    if (this.pickerMinDate2 !== '') {
                        let maxTime = this.pickerMinDate2 + day30;
                        if (maxTime > new Date()) {
                            maxTime = new Date();
                        }
                        return time.getTime() > maxTime || time.getTime() > Date.now() - 24 * 3600 * 1000;
                    }
                    if (this.pickerMaxDate2 !== '' && !this.pickerMinDate2) {
                        let minTime = this.pickerMaxDate2 - day30;
                        return time.getTime() < minTime || time.getTime() > Date.now() - 24 * 3600 * 1000;
                    }
                    return time.getTime() > Date.now() - 24 * 3600 * 1000;
                }
            },
            pickerOptions2: {
                onPick: ({ maxDate, minDate }) => {
                    if (minDate) {
                        this.pickerMinDate2 = minDate.getTime();
                    }
                    if (maxDate) {
                        this.pickerMinDate2 = '';
                        this.pickerMaxDate2 = maxDate.getTime();
                    }
                },
                disabledDate: time => {
                    const day30 = 15 * 24 * 3600 * 1000;
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
            pickerOptions: {
                shortcuts: [
                    {
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    },
                    {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ],
                disabledDate: time => {
                    const date = new Date();
                    const year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    if (month >= 1 && month <= 9) {
                        month = '0' + month;
                    }
                    const currentdate = year.toString() + month.toString(); // 当前年月

                    const page_year = time.getFullYear();
                    let page_month = time.getMonth() + 1;
                    if (page_month >= 1 && page_month <= 9) {
                        page_month = '0' + page_month;
                    }
                    const pageDate = page_year.toString() + page_month.toString(); //页面中的年月

                    let min_year = date.getFullYear();
                    let min_month = date.getMonth() + 1 - this.totalMonth.length;
                    if (min_month <= 0) {
                        min_year = min_year - 1;
                        min_month = 12 + min_month;
                    }
                    if (min_month >= 1 && min_month <= 9) {
                        min_month = '0' + min_month;
                    }
                    const minDate = min_year.toString() + min_month.toString(); // 最小年月

                    return currentdate < pageDate || pageDate < minDate;
                }
            },
            termSeven: [],
            colorArr: [
                '#EE4982',
                '#FF7171',
                '#FFB929',
                '#FFDB4B',
                '#A3EA3C',
                '#3CE58C',
                '#09CFAB',
                '#3ED3FF',
                '#3E83FF',
                '#4764E4',
                '#9E88F0',
                '#9560E3'
            ],
            showLender: [],
            showPayment: [],
            showProduct: [],
            detailTabIndex: 'MONTH', //详情tab切换
            colunm: [],
            tableData: [
                {
                    head: `${this.$t('common_sxje')}${this.$t('common_wy')}`
                },
                {
                    head: `${this.$t('common_zyje')}${this.$t('common_wy')}`
                },
                {
                    head: this.$t('home_zyl')
                },
                {
                    head: this.$t('home_sxmjs')
                },
                {
                    head: this.$t('home_zymjs')
                },
                {
                    head: this.$t('home_zymjb')
                }
            ]
        };
    },
    mounted() {
        boardDate('MONTH').then(res => {
            this.showLender = [];
            this.showProduct = [];
            this.showPayment = [];
            this.totalMonth = [];
            Object.keys(res.data.dateMap).forEach((key, index) => {
                this.totalMonth.push(res.data.dateMap[`month${index + 1}`]);
            });
            res.data.loanLenderAmountMap[`loanLenderAmount${Object.keys(res.data.loanLenderAmountMap).length}`].forEach(item => {
                if (item.loanAmount >= 2000000) {
                    this.showLender.push(item.lenderName || '其他');
                }
            });
            res.data.loanLenderProductAmountMap[
                `loanLenderProductAmount${Object.keys(res.data.loanLenderProductAmountMap).length}`
            ].forEach(item => {
                if (item.loanAmount >= 2000000) {
                    this.showProduct.push(item.lenderProduct || '其他');
                } 
            });
            res.data.loanPaymentAmountMap[`loanPaymentAmountMap${Object.keys(res.data.loanPaymentAmountMap).length}`].forEach(item => {
                if (item.loanAmount >= 2000000) {
                    this.showPayment.push(item.paymentName || '其他');
                }
            });
            this.changeTab('MONTH');
            this.getUserSumOrOfferSum();
        });
    },
    methods: {
        getUserSumOrOfferSum(dates) {
            boardPolyline(dates[0], dates[1], this.detailTabIndex).then(res => {
                let dates = [];

                Object.keys(res.data.dateMap).forEach((item, index) => {
                    if (this.detailTabIndex == 'MONTH') {
                        dates.push(res.data.dateMap[`month${index + 1}`]);
                    } else if (this.detailTabIndex == 'WEEK') {
                        dates.push(res.data.dateMap[`week${index + 1}`]);
                    } else {
                        dates.push(res.data.dateMap[`day${index + 1}`]);
                    }
                });
                this.detailOption5.xAxis[0].data = dates;
                this.detailOption6.xAxis[0].data = dates;
                //{{$t('home_yhs')}}
                this.detailOption5.series[0].data = [];
                this.detailOption5.series[1].data = [];
                this.detailOption5.series[2].data = [];
                this.detailOption5.series[3].data = [];
                this.detailOption5.series[4].data = [];
                Object.keys(res.data.userRegisterCountMap).forEach((keys, index) => {
                    this.detailOption5.series[0].data.push(res.data.userRegisterCountMap[`userRegisterCount${index + 1}`]);
                });
                Object.keys(res.data.userCreditCountMap).forEach((keys, index) => {
                    this.detailOption5.series[1].data.push(res.data.userCreditCountMap[`userCreditCount${index + 1}`]);
                });
                Object.keys(res.data.userLoanCountMap).forEach((keys, index) => {
                    this.detailOption5.series[2].data.push(res.data.userLoanCountMap[`userLoanCount${index + 1}`]);
                });
                Object.keys(res.data.userCreditRateMap).forEach((keys, index) => {
                    this.detailOption5.series[3].data.push(res.data.userCreditRateMap[`userCreditRate${index + 1}`]);
                });
                Object.keys(res.data.userLoanRateMap).forEach((keys, index) => {
                    this.detailOption5.series[4].data.push(res.data.userLoanRateMap[`userLoanRate${index + 1}`]);
                });

                let dom5 = document.getElementById('detailCharts5');
                let myChart5 = this.$echarts.init(dom5).dispose();
                myChart5 = this.$echarts.init(dom5);
                myChart5.setOption(this.detailOption5);

                // {{$t('home_dps')}}
                this.detailOption6.series[0].data = [];
                this.detailOption6.series[1].data = [];
                this.detailOption6.series[2].data = [];
                this.detailOption6.series[3].data = [];
                this.detailOption6.series[4].data = [];
                Object.keys(res.data.authorizeOfferCountMap).forEach((keys, index) => {
                    this.detailOption6.series[0].data.push(res.data.authorizeOfferCountMap[`authorizeOfferCount${index + 1}`]);
                });
                Object.keys(res.data.creditShopCountMap).forEach((keys, index) => {
                    this.detailOption6.series[1].data.push(res.data.creditShopCountMap[`creditShopCount${index + 1}`]);
                });
                Object.keys(res.data.loanShopCountMap).forEach((keys, index) => {
                    this.detailOption6.series[2].data.push(res.data.loanShopCountMap[`loanShopCount${index + 1}`]);
                });
                Object.keys(res.data.creditShopRateMap).forEach((keys, index) => {
                    this.detailOption6.series[3].data.push(res.data.creditShopRateMap[`creditShopRate${index + 1}`]);
                });
                Object.keys(res.data.loanShopRateMap).forEach((keys, index) => {
                    this.detailOption6.series[4].data.push(res.data.loanShopRateMap[`loanShopRate${index + 1}`]);
                });
                let dom6 = document.getElementById('detailCharts6');
                let myChart6 = this.$echarts.init(dom6).dispose();
                myChart6 = this.$echarts.init(dom6);
                myChart6.setOption(this.detailOption6);
            });
        },
        refurbishEcharts(chartsIndex) {
            if (chartsIndex == 1 || !chartsIndex) {
                let dom1 = document.getElementById('detailChart1');
                let myChart1 = this.$echarts.init(dom1).dispose();
                myChart1 = this.$echarts.init(dom1);
                myChart1.setOption(this.detail1);
            }
            let dom1Pie = document.getElementById('detailChart1Pie');
            let myChart1Pie = this.$echarts.init(dom1Pie).dispose();
            myChart1Pie = this.$echarts.init(dom1Pie);
            myChart1Pie.setOption(this.detail1Pie);

            if (chartsIndex == 2 || !chartsIndex) {
                let dom2 = document.getElementById('detailChart2');
                let myChart2 = this.$echarts.init(dom2).dispose();
                myChart2 = this.$echarts.init(dom2);
                myChart2.setOption(this.detail2);
            }
            let dom2Pie = document.getElementById('detailChart2Pie');
            let myChart2Pie = this.$echarts.init(dom2Pie).dispose();
            myChart2Pie = this.$echarts.init(dom2Pie);
            myChart2Pie.setOption(this.detail2Pie);

            if (chartsIndex == 3 || !chartsIndex) {
                let dom3 = document.getElementById('detailChart3');
                let myChart3 = this.$echarts.init(dom3).dispose();
                myChart3 = this.$echarts.init(dom3);
                myChart3.setOption(this.detail3);
            }
            let dom3Pie = document.getElementById('detailChart3Pie');
            let myChart3Pie = this.$echarts.init(dom3Pie).dispose();
            myChart3Pie = this.$echarts.init(dom3Pie);
            myChart3Pie.setOption(this.detail3Pie);

            if (chartsIndex == 4 || !chartsIndex) {
                let dom4 = document.getElementById('detailChart4');
                let myChart4 = this.$echarts.init(dom4).dispose();
                myChart4 = this.$echarts.init(dom4);
                myChart4.setOption(this.detail4);
            }
            let dom4Pie = document.getElementById('detailChart4Pie');
            let myChart4Pie = this.$echarts.init(dom4Pie).dispose();
            myChart4Pie = this.$echarts.init(dom4Pie);
            myChart4Pie.setOption(this.detail4Pie);

            if (chartsIndex == 5 || !chartsIndex) {
                let dom5 = document.getElementById('detailChart5');
                let myChart5 = this.$echarts.init(dom5).dispose();
                myChart5 = this.$echarts.init(dom5);
                myChart5.setOption(this.detail5);
            }
            let dom5Pie = document.getElementById('detailChart5Pie');
            let myChart5Pie = this.$echarts.init(dom5Pie).dispose();
            myChart5Pie = this.$echarts.init(dom5Pie);
            myChart5Pie.setOption(this.detail5Pie);

            if (chartsIndex == 6 || !chartsIndex) {
                let dom6 = document.getElementById('detailChart6');
                let myChart6 = this.$echarts.init(dom6).dispose();
                myChart6 = this.$echarts.init(dom6);
                myChart6.setOption(this.detail6);
            }
            let dom6Pie = document.getElementById('detailChart6Pie');
            let myChart6Pie = this.$echarts.init(dom6Pie).dispose();
            myChart6Pie = this.$echarts.init(dom6Pie);
            myChart6Pie.setOption(this.detail6Pie);

            if (chartsIndex == 7 || !chartsIndex) {
                let dom7 = document.getElementById('detailChart7');
                let myChart7 = this.$echarts.init(dom7).dispose();
                myChart7 = this.$echarts.init(dom7);
                myChart7.setOption(this.detail7);
            }
            let dom7Pie = document.getElementById('detailChart7Pie');
            let myChart7Pie = this.$echarts.init(dom7Pie).dispose();
            myChart7Pie = this.$echarts.init(dom7Pie);
            myChart7Pie.setOption(this.detail7Pie);

            if (chartsIndex == 8 || !chartsIndex) {
                let dom8 = document.getElementById('detailChart8');
                let myChart8 = this.$echarts.init(dom8).dispose();
                myChart8 = this.$echarts.init(dom8);
                myChart8.setOption(this.detail8);
            }
            let dom8Pie = document.getElementById('detailChart8Pie');
            let myChart8Pie = this.$echarts.init(dom8Pie).dispose();
            myChart8Pie = this.$echarts.init(dom8Pie);
            myChart8Pie.setOption(this.detail8Pie);

            if (chartsIndex == 9 || !chartsIndex) {
                let dom9 = document.getElementById('detailChart9');
                let myChart9 = this.$echarts.init(dom9).dispose();
                myChart9 = this.$echarts.init(dom9);
                myChart9.setOption(this.detail9);
            }
            let dom9Pie = document.getElementById('detailChart9Pie');
            let myChart9Pie = this.$echarts.init(dom9Pie).dispose();
            myChart9Pie = this.$echarts.init(dom9Pie);
            myChart9Pie.setOption(this.detail9Pie);

            this.loading = false;
        },
        _export() {
            this.$export(
                `/data/board/trend/export?beginDate=${this.chooseDates[0]}&endDate=${this.chooseDates[1]}&dateType=${this.detailTabIndex}`
            );
        },
        _changeOptionSelect(chartsIndex) {
            console.log(this.termSeven[0].length < 8)
            if (this.detailTabIndex == 'MONTH' && this.termSeven[0].length < 8) {
                this.termSeven = [this.termSeven[0] + '-01', this.termSeven[1] + '-01'];
            }
            this.getChartsData(this.termSeven, chartsIndex);
        },
        getChartsData(date, chartsIndex) {
            boardColumnar(date[0], date[1], this.detailTabIndex).then(res => {
                let dates = [];
                Object.keys(res.data.dateMap).forEach((item, index) => {
                    if (this.detailTabIndex == 'MONTH') {
                        dates.push(res.data.dateMap[`month${index + 1}`]);
                    } else if (this.detailTabIndex == 'WEEK') {
                        dates.push(res.data.dateMap[`week${index + 1}`]);
                    } else {
                        dates.push(res.data.dateMap[`day${index + 1}`]);
                    }
                });

                // {{$t('home_zjffb')}} - {{$t('home_sxje')}}
                this.detail1.xAxis[0].data = [];
                this.detail1.series = [];
                this.detail1.xAxis[0].data = dates;
                this.detail1.legend.data = [];
                res.data.creditLenderAmountMap.creditLenderAmount1.forEach(item => {
                    this.detail1.legend.data.unshift(item.lenderName || '其他');
                    this.detail1.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.creditLenderAmountMap).forEach((key, index) => {
                    res.data.creditLenderAmountMap[`creditLenderAmount${index + 1}`].forEach(item => {
                        this.detail1.series.forEach(it => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData1 = [];
                let total1 = 0;

                this.detail1.series.forEach((it, ind) => {
                    // if (this.showLender.indexOf(it.name) != -1) {
                    filterData1.push(it);

                    // }
                    it.data.forEach(sum => {
                        total1 = Number(sum) + total1;
                    });
                });

                this.detail1Pie.series[0].data = [];
                filterData1.forEach(it => {
                    let itTotal = 0;
                    it.data.forEach(item => {
                        itTotal = itTotal + Number(item);
                    });
                    this.detail1Pie.series[0].data.push({ name: it.name, value: itTotal, scale: ((itTotal / total1) * 100).toFixed(2) });
                });
                let qita1 = 0;
                let arr = [];
                this.detail1Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita1 = qita1 + e.value;
                    }
                });
                this.detail1Pie.series[0].data = this.detail1Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita1) {
                    this.detail1Pie.series[0].data.push({ name: '其他', value: qita1, scale: ((qita1 / total1) * 100).toFixed(2) });
                }

                this.detail1.series = filterData1;
                this.detail1SelectArr = JSON.parse(JSON.stringify(filterData1));

                if (this.detail1Select.length) {
                    let arr = [];
                    this.detail1Select.forEach(item => {
                        this.detail1.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.detail1.series = arr;
                }

                // {{$t('home_cpfb')}} - {{$t('home_sxje')}}
                this.detail2.xAxis[0].data = [];
                this.detail2.series = [];
                this.detail2.xAxis[0].data = dates;
                this.detail2.legend.data = [];
                res.data.creditLenderProductAmountMap.creditLenderProductAmount1.forEach(item => {
                    this.detail2.legend.data.unshift(item.lenderProduct || '其他');
                    this.detail2.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderProduct || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });
                Object.keys(res.data.creditLenderProductAmountMap).forEach((key, index) => {
                    res.data.creditLenderProductAmountMap[`creditLenderProductAmount${index + 1}`].forEach(item => {
                        this.detail2.series.forEach(it => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
          
                let filterData2 = [];
                let total2 = 0;
                this.detail2.series.forEach((it, ind) => { 
                    if (this.showProduct.indexOf(it.name) != -1) {
                        filterData2.push(it);
                    }
                    it.data.forEach(sum => {
                        total2 = Number(sum) + total2;
                    });
                });

                
                this.detail2Pie.series[0].data = [];
                filterData2.forEach(it => {
                    let itTotal2 = 0;
                    it.data.forEach(item => {
                        itTotal2 = itTotal2 + Number(item);
                    });
                    this.detail2Pie.series[0].data.push({ name: it.name, value: itTotal2, scale: ((itTotal2 / total2) * 100).toFixed(2) });
                });

                let qita2 = 0;
                this.detail2Pie.series[0].data.forEach((e, i) => {
                    console.log(e);
                    console.log(e);
                    if (e.scale < 1 || e.value == 0) {
                        qita2 = qita2 + e.value;
                    }
                });
                this.detail2Pie.series[0].data = this.detail2Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita2) {
                    this.detail2Pie.series[0].data.push({ name: '其他', value: qita2, scale: ((qita2 / total2) * 100).toFixed(2) });
                }

                this.detail2.series = filterData2;
                this.detail2SelectArr = JSON.parse(JSON.stringify(filterData2));

                if (this.detail2Select.length) {
                    let arr2 = [];
                    this.detail2Select.forEach(item => {
                        this.detail2.series.forEach(it => {
                            if (item == it.name) {
                                arr2.push(it);
                            }
                        });
                    });
                    this.detail2.series = arr2;
                }

                // {{$t('home_zfgs')}} - {{$t('home_sxje')}}
                this.detail3.xAxis[0].data = [];
                this.detail3.series = [];
                this.detail3.xAxis[0].data = dates;
                this.detail3.legend.data = [];
                res.data.creditPaymentAmountMap.creditPaymentAmount1.forEach(item => {
                    this.detail3.legend.data.unshift(item.paymentName || '其他');
                    this.detail3.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.paymentName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.creditPaymentAmountMap).forEach((key, index) => {
                    res.data.creditPaymentAmountMap[`creditPaymentAmount${index + 1}`].forEach(item => {
                        this.detail3.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData3 = [];
                let total3 = 0;
                this.detail3.series.forEach((it, ind) => {
                    if (this.showPayment.indexOf(it.name) != -1) {
                        filterData3.push(it);
                    }
                    it.data.forEach(sum => {
                        total3 = Number(sum) + total3;
                    });
                });

                this.detail3Pie.series[0].data = [];
                filterData3.forEach(it => {
                    let itTotal3 = 0;
                    it.data.forEach(item => {
                        itTotal3 = itTotal3 + Number(item);
                    });
                    this.detail3Pie.series[0].data.push({ name: it.name, value: itTotal3, scale: ((itTotal3 / total3) * 100).toFixed(2) });
                });

                let qita3 = 0;
                this.detail3Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita3 = qita3 + e.value;
                    }
                });
                this.detail3Pie.series[0].data = this.detail3Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita3) {
                    this.detail3Pie.series[0].data.push({ name: '其他', value: qita3, scale: ((qita3 / total3) * 100).toFixed(2) });
                }

                this.detail3.series = filterData3;
                this.detail3SelectArr = JSON.parse(JSON.stringify(filterData3));

                if (this.detail3Select.length) {
                    let arr3 = [];
                    this.detail3Select.forEach(item => {
                        this.detail3.series.forEach(it => {
                            if (item == it.name) {
                                arr3.push(it);
                            }
                        });
                    });
                    this.detail3.series = arr3;
                }

                // {{$t('home_zjffb')}} - 贷款金额
                this.detail4.xAxis[0].data = [];
                this.detail4.series = [];
                this.detail4.xAxis[0].data = dates;
                this.detail4.legend.data = [];
                res.data.loanLenderAmountMap.loanLenderAmount1.forEach(item => {
                    this.detail4.legend.data.unshift(item.lenderName || '其他');
                    this.detail4.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanLenderAmountMap).forEach((key, index) => {
                    res.data.loanLenderAmountMap[`loanLenderAmount${index + 1}`].forEach(item => {
                        this.detail4.series.forEach(it => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData4 = [];
                let total4 = 0;
                this.detail4.series.forEach((it, ind) => {
                    if (this.showLender.indexOf(it.name) != -1) {
                        filterData4.push(it);
                    }
                    it.data.forEach(sum => {
                        total4 = Number(sum) + total4;
                    });
                });

                this.detail4Pie.series[0].data = [];
                filterData4.forEach(it => {
                    let itTotal4 = 0;
                    it.data.forEach(item => {
                        itTotal4 = itTotal4 + Number(item);
                    });
                    this.detail4Pie.series[0].data.push({ name: it.name, value: itTotal4, scale: ((itTotal4 / total4) * 100).toFixed(2) });
                });

                let qita4 = 0;
                this.detail4Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita4 = qita4 + e.value;
                    }
                });
                this.detail4Pie.series[0].data = this.detail4Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita4) {
                    this.detail4Pie.series[0].data.push({ name: '其他', value: qita4, scale: ((qita4 / total4) * 100).toFixed(2) });
                }

                this.detail4.series = filterData4;
                this.detail4SelectArr = JSON.parse(JSON.stringify(filterData4));

                if (this.detail4Select.length) {
                    let arr4 = [];
                    this.detail4Select.forEach(item => {
                        this.detail4.series.forEach(it => {
                            if (item == it.name) {
                                arr4.push(it);
                            }
                        });
                    });
                    this.detail4.series = arr4;
                }

                // {{$t('home_zjffb')}} - 贷款金额
                this.detail5.xAxis[0].data = [];
                this.detail5.series = [];
                this.detail5.xAxis[0].data = dates;
                this.detail5.legend.data = [];
                res.data.loanLenderProductAmountMap.loanLenderProductAmount1.forEach(item => {
                    this.detail5.legend.data.unshift(item.lenderProduct || '其他');
                    this.detail5.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderProduct || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanLenderProductAmountMap).forEach((key, index) => {
                    res.data.loanLenderProductAmountMap[`loanLenderProductAmount${index + 1}`].forEach(item => {
                        this.detail5.series.forEach(it => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData5 = [];
                let total5 = 0;
                this.detail5.series.forEach((it, ind) => {
                    if (this.showProduct.indexOf(it.name) != -1) {
                        filterData5.push(it);
                    }
                    it.data.forEach(sum => {
                        total5 = Number(sum) + total5;
                    });
                });

                this.detail5Pie.series[0].data = [];
                filterData5.forEach(it => {
                    let itTotal5 = 0;
                    it.data.forEach(item => {
                        itTotal5 = itTotal5 + Number(item);
                    });
                    this.detail5Pie.series[0].data.push({ name: it.name, value: itTotal5, scale: ((itTotal5 / total5) * 100).toFixed(2) });
                });

                let qita5 = 0;
                this.detail5Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita5 = qita5 + e.value;
                    }
                });
                this.detail5Pie.series[0].data = this.detail5Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita5) {
                    this.detail5Pie.series[0].data.push({ name: '其他', value: qita5, scale: ((qita5 / total5) * 100).toFixed(2) });
                }

                this.detail5.series = filterData5;
                this.detail5SelectArr = JSON.parse(JSON.stringify(filterData5));

                if (this.detail5Select.length) {
                    let arr5 = [];
                    this.detail5Select.forEach(item => {
                        this.detail5.series.forEach(it => {
                            if (item == it.name) {
                                arr5.push(it);
                            }
                        });
                    });
                    this.detail5.series = arr5;
                }

                // {{$t('home_zfgs')}} - 贷款金额
                this.detail6.xAxis[0].data = [];
                this.detail6.series = [];
                this.detail6.xAxis[0].data = dates;
                this.detail6.legend.data = [];
                res.data.loanPaymentAmountMap.loanPaymentAmount1.forEach(item => {
                    this.detail6.legend.data.unshift(item.paymentName || '其他');
                    this.detail6.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.paymentName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanPaymentAmountMap).forEach((key, index) => {
                    res.data.loanPaymentAmountMap[`loanPaymentAmount${index + 1}`].forEach(item => {
                        this.detail6.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData6 = [];
                let total6 = 0;
                this.detail6.series.forEach((it, ind) => {
                    if (this.showPayment.indexOf(it.name) != -1) {
                        filterData6.push(it);
                    }
                    it.data.forEach(sum => {
                        total6 = Number(sum) + total6;
                    });
                });

                this.detail6Pie.series[0].data = [];
                filterData6.forEach(it => {
                    let itTotal6 = 0;
                    it.data.forEach(item => {
                        itTotal6 = itTotal6 + Number(item);
                    });
                    this.detail6Pie.series[0].data.push({ name: it.name, value: itTotal6, scale: ((itTotal6 / total6) * 100).toFixed(2) });
                });

                let qita6 = 0;
                this.detail6Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita6 = qita6 + e.value;
                    }
                });
                this.detail6Pie.series[0].data = this.detail6Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita6) {
                    this.detail6Pie.series[0].data.push({ name: '其他', value: qita6, scale: ((qita6 / total6) * 100).toFixed(2) });
                }

                this.detail6.series = filterData6;
                this.detail6SelectArr = JSON.parse(JSON.stringify(filterData6));

                if (this.detail6Select.length) {
                    let arr6 = [];
                    this.detail6Select.forEach(item => {
                        this.detail6.series.forEach(it => {
                            if (item == it.name) {
                                arr6.push(it);
                            }
                        });
                    });
                    this.detail6.series = arr6;
                }

                // {{$t('home_zjffb')}} - 贷款店铺数
                this.detail7.xAxis[0].data = [];
                this.detail7.series = [];
                this.detail7.xAxis[0].data = dates;
                this.detail7.legend.data = [];
                res.data.loanOfferLenderCountMap.loanOfferLenderCount1.forEach((item) => {
                    this.detail7.legend.data.unshift(item.lenderName || '其他');
                    this.detail7.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    }); 
                });

                Object.keys(res.data.loanOfferLenderCountMap).forEach((key, index) => {
                    res.data.loanOfferLenderCountMap[`loanOfferLenderCount${index + 1}`].forEach((item) => {

                        this.detail7.series.forEach((it) => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData7 = [];
                let total7 = 0;
                this.detail7.series.forEach((it, ind) => {
                    if (this.showLender.indexOf(it.name) != -1) {
                        filterData7.push(it);
                    }
                    it.data.forEach(sum => {
                        total7 = Number(sum) + total7;
                    });
                });

                this.detail7Pie.series[0].data = [];
                filterData7.forEach(it => {
                    let itTotal7 = 0;
                    it.data.forEach(item => {
                        itTotal7 = itTotal7 + Number(item);
                    });
                    this.detail7Pie.series[0].data.push({ name: it.name, value: itTotal7, scale: ((itTotal7 / total7) * 100).toFixed(2) });
                });

                let qita7 = 0;
                this.detail7Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita7 = qita7 + e.value;
                    }
                });
                this.detail7Pie.series[0].data = this.detail7Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita7) {
                    this.detail7Pie.series[0].data.push({ name: '其他', value: qita7, scale: ((qita7 / total7) * 100).toFixed(2) });
                }

                this.detail7.series = filterData7;
                this.detail7SelectArr = JSON.parse(JSON.stringify(filterData7));

                if (this.detail7Select.length) {
                    let arr7 = [];
                    this.detail7Select.forEach(item => {
                        this.detail7.series.forEach(it => {
                            if (item == it.name) {
                                arr7.push(it);
                            }
                        });
                    });
                    this.detail7.series = arr7;
                }

                // {{$t('home_cpfb')}} - 贷款店铺数
                this.detail8.xAxis[0].data = [];
                this.detail8.series = [];
                this.detail8.xAxis[0].data = dates;
                this.detail8.legend.data = [];
                res.data.loanOfferLenderProductCountMap.loanOfferLenderProductCount1.forEach((item) => {
                    this.detail8.legend.data.unshift(item.lenderProduct || '其他');
                    this.detail8.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.lenderProduct || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanOfferLenderProductCountMap).forEach((key, index) => {
                    res.data.loanOfferLenderProductCountMap[`loanOfferLenderProductCount${index + 1}`].forEach((item) => {

                        this.detail8.series.forEach((it) => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData8 = [];
                let total8 = 0;
                this.detail8.series.forEach((it, ind) => {
                    if (this.showProduct.indexOf(it.name) != -1) {
                        filterData8.push(it);
                    }
                    it.data.forEach(sum => {
                        total8 = Number(sum) + total8;
                    });
                });

                this.detail8Pie.series[0].data = [];
                filterData8.forEach(it => {
                    let itTotal8 = 0;
                    it.data.forEach(item => {
                        itTotal8 = itTotal8 + Number(item);
                    });
                    this.detail8Pie.series[0].data.push({ name: it.name, value: itTotal8, scale: ((itTotal8 / total8) * 100).toFixed(2) });
                });

                let qita8 = 0;
                this.detail8Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita8 = qita8 + e.value;
                    }
                });
                this.detail8Pie.series[0].data = this.detail8Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita8) {
                    this.detail8Pie.series[0].data.push({ name: '其他', value: qita8, scale: ((qita8 / total8) * 100).toFixed(2) });
                }

                this.detail8.series = filterData8;
                this.detail8SelectArr = JSON.parse(JSON.stringify(filterData8));

                if (this.detail8Select.length) {
                    let arr8 = [];
                    this.detail8Select.forEach(item => {
                        this.detail8.series.forEach(it => {
                            if (item == it.name) {
                                arr8.push(it);
                            }
                        });
                    });
                    this.detail8.series = arr8;
                }

                // {{$t('home_zfgs')}} - 贷款店铺数
                this.detail9.xAxis[0].data = [];
                this.detail9.series = [];
                this.detail9.xAxis[0].data = dates;
                this.detail9.legend.data = [];
                res.data.loanOfferPaymentCountMap.loanOfferPaymentCount1.forEach(item => {
                    this.detail9.legend.data.unshift(item.paymentName || '其他');
                    this.detail9.series.unshift({
                        barWidth: 40, //柱图宽度
                        name: item.paymentName || '其他',
                        type: 'line',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanOfferPaymentCountMap).forEach((key, index) => {
                    res.data.loanOfferPaymentCountMap[`loanOfferPaymentCount${index + 1}`].forEach(item => {
                        this.detail9.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData9 = [];
                let total9 = 0;
                this.detail9.series.forEach((it, ind) => {
                    if (this.showPayment.indexOf(it.name) != -1) {
                        filterData9.push(it);
                    }
                    it.data.forEach(sum => {
                        total9 = Number(sum) + total9;
                    });
                });

                this.detail9Pie.series[0].data = [];
                filterData9.forEach(it => {
                    let itTotal9 = 0;
                    it.data.forEach(item => {
                        itTotal9 = itTotal9 + Number(item);
                    });
                    this.detail9Pie.series[0].data.push({ name: it.name, value: itTotal9, scale: ((itTotal9 / total9) * 100).toFixed(2) });
                });

                let qita9 = 0;
                this.detail9Pie.series[0].data.forEach((e, i) => {
                    if (e.scale < 1) {
                        qita9 = qita9 + e.value;
                    }
                });
                this.detail9Pie.series[0].data = this.detail9Pie.series[0].data.filter(item => {
                    return item.scale >= 1;
                });
                if (qita9) {
                    this.detail9Pie.series[0].data.push({ name: '其他', value: qita9, scale: ((qita9 / total9) * 100).toFixed(2) });
                }

                this.detail9.series = filterData9;
                this.detail9SelectArr = JSON.parse(JSON.stringify(filterData9));

                if (this.detail9Select.length) {
                    let arr9 = [];
                    this.detail9Select.forEach(item => {
                        this.detail9.series.forEach(it => {
                            if (item == it.name) {
                                arr9.push(it);
                            }
                        });
                    });
                    this.detail9.series = arr9;
                }

                this.refurbishEcharts(chartsIndex);
            });
        },
        getTabelData(dates) {
            this.chooseDates = dates;
            this.loading = true;
            boardTrend(dates[0], dates[1], this.detailTabIndex).then(res => {
                this.colunm = [];
                if (this.detailTabIndex == 'MONTH') {
                    Object.keys(res.data.dateMap).forEach((key, index) => {
                        this.colunm.push({ label: res.data.dateMap[`month${index + 1}`], key: `val${index}` });
                    });
                } else if (this.detailTabIndex == 'WEEK') {
                    Object.keys(res.data.dateMap).forEach((key, index) => {
                        this.colunm.push({ label: res.data.dateMap[`week${index + 1}`], key: `val${index}` });
                    });
                } else {
                    Object.keys(res.data.dateMap).forEach((key, index) => {
                        this.colunm.push({ label: res.data.dateMap[`day${index + 1}`], key: `val${index}` });
                    });
                }
                Object.keys(res.data.creditAmountMap).forEach((key, index) => {
                    this.tableData[0][`val${index}`] = (res.data.creditAmountMap[`creditAmount${index + 1}`] / 10000).toFixed(2);
                });
                Object.keys(res.data.loanAmountMap).forEach((key, index) => {
                    this.tableData[1][`val${index}`] = (res.data.loanAmountMap[`loanAmount${index + 1}`] / 10000).toFixed(2);
                });
                Object.keys(res.data.loanRateMap).forEach((key, index) => {
                    this.tableData[2][`val${index}`] = (res.data.loanRateMap[`loanRate${index + 1}`] * 100).toFixed(2) + '%';
                });
                Object.keys(res.data.creditUserCountMap).forEach((key, index) => {
                    this.tableData[3][`val${index}`] = res.data.creditUserCountMap[`creditUserCount${index + 1}`];
                });
                Object.keys(res.data.loanSellerCountMap).forEach((key, index) => {
                    this.tableData[4][`val${index}`] = res.data.loanSellerCountMap[`loanSellerCount${index + 1}`];
                });
                Object.keys(res.data.loanSellerRateMap).forEach((key, index) => {
                    this.tableData[5][`val${index}`] =
                        this.handleCutZero(((res.data.loanSellerRateMap[`loanSellerRate${index + 1}`] || 0) * 100).toFixed(2)) + '%';
                    //
                });
            });
        },
        handleCutZero(num) {
            //拷贝一份 返回去掉零的新串
            let newstr = num;
            //循环变量 小数部分长度
            // console.log(num.indexOf('.') - 1);
            let leng = num.length - num.indexOf('.') - 1;
            //判断是否有效数
            if (num.indexOf('.') > -1) {
                //循环小数部分
                for (let i = leng; i > 0; i--) {
                    //如果newstr末尾有0
                    if (newstr.lastIndexOf('0') > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
                        let k = newstr.lastIndexOf('0');
                        //如果小数点后只有一个0 去掉小数点
                        if (newstr.charAt(k - 1) == '.') {
                            return newstr.substring(0, k - 1);
                        } else {
                            //否则 去掉一个0
                            newstr = newstr.substring(0, k);
                        }
                    } else {
                        //如果末尾没有0
                        return newstr;
                    }
                }
            }
            return num;
        },
        changeTab(val) {
            this.loading = true;
			this.loading = true;
			if(this.termSeven==null){
				this.loading=false
			}
            if (val == 'MONTH') {
                console.log(this.totalMonth);
                this.termSeven = [this.lastYear() + '-01', this.doHandleDate() + '-01'];

                this.getTabelData(this.termSeven);
                this.getChartsData(this.termSeven);
            } else if (val == 'WEEK') {
                this.termSeven = [this.GetDateStr(-98), this.GetDateStr(0)];
                this.getTabelData(this.termSeven);
                this.getChartsData(this.termSeven);
            } else {
                this.termSeven = [this.GetDateStr(-15), this.GetDateStr(0)];
                this.getTabelData(this.termSeven);
                this.getChartsData(this.termSeven);
            }
            this.getUserSumOrOfferSum(this.termSeven);
        },
        changeDates() {
            this.loading = true;
            if (this.detailTabIndex == 'MONTH') {
                this.getTabelData([this.termSeven[0] + '-01', this.termSeven[1] + '-01']);
                this.getUserSumOrOfferSum([this.termSeven[0] + '-01', this.termSeven[1] + '-01']);
                this.getChartsData([this.termSeven[0] + '-01', this.termSeven[1] + '-01']);
            } else {
                this.getTabelData(this.termSeven);
                this.getUserSumOrOfferSum(this.termSeven);
                this.getChartsData(this.termSeven);
            }
        },

        doHandleDate() {
            var myDate = new Date();
            var tYear = myDate.getFullYear();
            var tMonth = myDate.getMonth();

            var m = tMonth + 1;
            if (m.toString().length == 1) {
                m = '0' + m;
            }
            return tYear + '-' + m;
        },
        lastYear() {
            var dataArr = [];
            var data = new Date();
            var year = data.getFullYear();
            data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
            for (var i = 0; i < 12; i++) {
                data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
                var m = data.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                dataArr.push(data.getFullYear() + '-' + m);
            }
            return dataArr[11];
        },
        GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
            var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
            return y + '-' + m + '-' + d;
        }
    }
};
</script>

<style lang='less' scoped>
.charts-label-box {
    width: 100%;

    .label-item {
        display: inline-block;
        width: 30%;
        height: 77px;

        .bottom {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;

            // box-sizing: border-box;
            span {
                padding-right: 12px;
            }
        }

        .top {
            display: flex;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #969799;
            font-weight: 400;
            margin-bottom: 7px;

            .block {
                width: 8px;
                height: 8px;
                background: #ee4982;
                margin-right: 9px;
            }
        }
    }
}

.select-f {
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 19px;
    color: #131415;
    font-weight: 700;
    margin-bottom: 32px;
}

/deep/.echarts-radio1 {
    margin: 0;
    border-radius: 4px 0 0 4px;
    border-right: none;
    padding: 0 10px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        padding-right: 4px;
    }

    padding-top: 0 !important;

    /deep/.el-radio__input {
        display: none !important;
        visibility: hidden !important;
    }
}

/deep/.echarts-radio1 > .el-radio__label {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/.echarts-radio2 > .el-radio__label {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/.echarts-radio1 > .el-radio__input {
    display: none !important;
    visibility: hidden !important;
}

/deep/.echarts-radio2 > .el-radio__input {
    display: none !important;
    visibility: hidden !important;
}

.echarts-radio2 {
    margin: 0;
    border-radius: 0 4px 4px 0;
    // border-right: none;
    padding: 0 10px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0 !important;
    margin-left: 0 !important;

    img {
        padding-right: 4px;
    }
}

.el-menu-item {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}

.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 5px solid #e52d6d;
    font-size: 20px;
}

.el-menu--horizontal > .el-menu-item {
    height: 53px;
    margin: none;
    margin-right: 40px;
    padding-bottom: 5px;
}

.select-f1 {
    z-index: 9999999999999999999999999999 !important;
    position: relative;
}

/deep/.loan-select1 {
    z-index: 99999999999999999999999 !important;
    position: absolute;
    top: 25px;
    right: 20px;

    .el-input {
        height: 30px !important;
    }

    input {
        height: 30px !important;
        line-height: 30px !important;
    }

    .el-input__icon {
        line-height: 30px !important;
    }
}

/deep/.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
    text-align: center !important;
}
</style>