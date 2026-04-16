<template>
    <div class="loanDataBoard" ref="pagediv" id="pagediv">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style=" font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />
                {{ $t('common_dsb') }} /
            </div>
            <span style="font-size: 14px; padding-left: 5px">{{ $t('home_name') }}</span>
        </div>
        <div class="btn-box-dataBoard">
            <div class="btn-item" @click="handleSelect('1')" :class="{ active: tabIndex == 1 }">{{ $t('home_sjgl') }}
            </div>
            <div class="btn-item" @click="handleSelect('2')" :class="{ active: tabIndex == 2 }">{{ $t('home_sjxq') }}
            </div>
            <div class="btn-item" @click="handleSelect('3')" :class="{ active: tabIndex == 3 }">{{ $t('home_flsj') }}
            </div>
        </div>
        <el-card v-show="tabIndex == 1" style="clear:both;">
            <div class="new-data-view-box">
                <div class="new-data-view-left" style="width: 23%;">
                    <div class="title-box">
                        <img class="title-img" src="../../../../public/img/nowTimeData.png" />
                        <div class="title-title">{{ $t('home_sssj') }}</div>
                    </div>
                    <div class="title-box-down">
                        <div class="item-box">
                            <div class="item-view" @click="goTodayLoan">
                                <img class="left" src="../../../../public/img/nowTimeItem.png" />
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_jrfkje') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ numFormat(nowData.currentLoanAmount) }}</div>
                                </div>
                            </div>
                            <div class="item-view" @click="goTodayLoan">
                                <img class="left" src="../../../../public/img/nowTimeItem.png" />
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_fkbs') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ nowData.currentLoanCount }}</div>
                                </div>
                            </div>
                            <div class="item-view" @click="goTodayOffer">
                                <img class="left" src="../../../../public/img/nowTimeItem.png" />
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_fkdps') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ nowData.currentLoanOfferCount }}</div>
                                </div>
                            </div>
                            <div class="item-view" @click="goTodayUser">
                                <img class="left" src="../../../../public/img/nowTimeItem.png" />
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_fkyhs') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ nowData.currentLoanUserCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="new-data-view-left" style="width: 70%;">
                    <div class="title-box">
                        <img class="title-img" src="../../../../public/img/loanView.png" />
                        <div class="title-title">{{ $t('home_ywgl') }}</div>
                    </div>
                    <div class="title-box-down">
                        <div class="item-box">
                            <a class="item-view" @click="_go('CREADIT')" href="#c">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljje') }}{{ $t('common_yuan') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ numFormat(nowData.creditAmountSum) }}</div>
                                </div>
                            </a>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_dkgmv') }}{{ $t('common_yuan') }}</span>
                                    </div>
                                    <div class="down">{{ numFormat(this.creditGmv) }}</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljbs') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.loanOfferCountSum }}</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljdp') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.loanUserCountSum }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="item-box">
                            <a class="item-view" @click="_go('LOAN')" href="#c">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljfkje') }}{{ $t('common_yuan') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ numFormat(nowData.loanAmountSum) }}</div>
                                </div>
                            </a>
                            <a class="item-view" @click="_go('LOANSUM')" href="#c">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljfkbs') }}</span>
                                        <div class="btn">{{ $t('common_see') }}</div>
                                    </div>
                                    <div class="down">{{ nowData.loanCountSum }}</div>
                                </div>
                            </a>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljsxdp') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.creditOfferCountSum }}</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_ljsxyh') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.creditUserCountSum }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="item-box">
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_zdye') }}{{ $t('common_yuan') }}</span>
                                    </div>
                                    <div class="down">{{ numFormat(nowData.loanBalance) }}</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_pjnh') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.loanAprAvg }}%</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_zddp') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.loanOfferCount }}</div>
                                </div>
                            </div>
                            <div class="item-view">
                                <div class="mid">
                                    <div class="up">
                                        <span>{{ $t('home_zdyh') }}</span>
                                    </div>
                                    <div class="down">{{ nowData.loanUserCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div v-if="tabIndex == 2">
            <el-col :span="24">
                <monthTrend></monthTrend>
            </el-col>
        </div>
        <div v-show="tabIndex == 3">
            <el-col :span="24">
                <el-card>
                    <dataClass></dataClass>
                </el-card>
            </el-col>
        </div>
        <div style="margin-top: 20px;" id="c" v-show="tabIndex == 1">
            <div class="btn-box-dataBoard">
                <div class="btn-item" @click="changeChartsCardType('LOAN')"
                    :class="{ active: chartsCardType == 'LOAN' }">{{ $t('home_fkje') }}</div>
                <div class="btn-item" @click="changeChartsCardType('CREADIT')"
                    :class="{ active: chartsCardType == 'CREADIT' }">{{ $t('home_sxje') }}</div>
                <div class="btn-item" @click="changeChartsCardType('LOANSUM')"
                    :class="{ active: chartsCardType == 'LOANSUM' }">{{ $t('home_fkbs') }}</div>
            </div>
            <el-card v-loading="loading" style="clear:both;">
                <!-- 资金方授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'">
                    <div class="select-f" style="position: relative;">
                        {{ $t('home_zjqst') }}-{{ $t('home_sxje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="lenderCreaditType" label="1" border
                                    @change="_changeOptionSelect(13)" size="medium"
                                    :style="{ borderRight: lenderCreaditType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="lenderCreaditType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="lenderCreaditType" label="2" border
                                    size="medium">
                                    <img v-if="lenderCreaditType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderCreaditType == 1">
                        <el-select class="loan-select" v-model="option13Select" clearable
                            @change="_changeOptionSelect(13)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option13SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="lenderCreaditType == 1">
                            <div id="myChart13" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="lenderCreaditType == 2">
                        <div style="width: 100%;display:flex;margin-top:60px" v-show="lenderCreaditType == 2">
                            <div id="myChart13Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div class="label-item" v-for="(item, index) in option13Pie.series[0].data"
                                    :key="item.name">
                                    <div class="top">
                                        <div class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                        </div>
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
                </div>
                <!-- 产品授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'">
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_cpqst') }}-{{ $t('home_sxje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="productCreaditType" label="1" border
                                    @change="_changeOptionSelect(14)" size="medium"
                                    :style="{ borderRight: productCreaditType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="productCreaditType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="productCreaditType" label="2" border
                                    size="medium">
                                    <img v-if="productCreaditType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productCreaditType == 1">
                        <el-select class="loan-select" v-model="option14Select" clearable
                            @change="_changeOptionSelect(14)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option14SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="productCreaditType == 1">
                            <div id="myChart14" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="productCreaditType == 2">
                        <div style="width: 100%;display:flex;margin-top:60px" v-show="productCreaditType == 2">
                            <div id="myChart14Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div class="label-item" v-for="(item, index) in option14Pie.series[0].data"
                                    :key="item.name">
                                    <div class="top">
                                        <div class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                        </div>
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
                </div>

                <!-- 支付公司 授信金额 -->
                <div v-show="chartsCardType === 'CREADIT'">
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_gsqst') }}-{{ $t('home_sxje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="paymentCreaditType" label="1" border
                                    @change="_changeOptionSelect(15)" size="medium"
                                    :style="{ borderRight: paymentCreaditType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="paymentCreaditType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="paymentCreaditType" label="2" border
                                    size="medium">
                                    <img v-if="paymentCreaditType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentCreaditType == 1">
                        <el-select class="loan-select" v-model="option15Select" clearable
                            @change="_changeOptionSelect(15)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option15SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="paymentCreaditType == 1">
                            <div id="myChart15" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="paymentCreaditType == 2">
                        <div style="width: 100%;display:flex;margin-top:60px" v-show="paymentCreaditType == 2">
                            <div id="myChart15Pie" style="height: 520px; width:600px;"></div>
                            <div class="charts-label-box">
                                <div class="label-item" v-for="(item, index) in option15Pie.series[0].data"
                                    :key="item.name">
                                    <div class="top">
                                        <div class="block"
                                            :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                        </div>
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
                </div>
                <!-- 资金方放款金额 -->
                <div v-show="chartsCardType === 'LOAN'" class="wai-top-box">
                    <div class="select-f" style="position: relative;">
                        {{ $t('home_zjqst') }}-{{ $t('home_ljfkje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="lenderLoanType" label="1" border size="medium"
                                    @change="_changeOptionSelect(4)"
                                    :style="{ borderRight: lenderLoanType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="lenderLoanType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="lenderLoanType" label="2" border
                                    size="medium">
                                    <img v-if="lenderLoanType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderLoanType == 1">
                        <el-select class="loan-select" v-model="option4Select" clearable
                            @change="_changeOptionSelect(4)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option4SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="lenderLoanType == 1">
                            <div id="myChart4" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="lenderLoanType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px;" v-show="lenderLoanType == 2">
                                <div id="myChart4Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option4Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>
                <!-- ///////////////////////////////////////////////////// -->
                <div v-show="chartsCardType === 'LOAN'" class="wai-top-box">
                    <div class="select-f" style="position: relative;margin-top:100px"
                        v-show="chartsCardType === 'LOAN'">
                        {{ $t('home_cpqst') }}-{{ $t('home_ljfkje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="productLoanType" label="1" border
                                    @change="_changeOptionSelect(6)" size="medium"
                                    :style="{ borderRight: productLoanType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="productLoanType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="productLoanType" label="2" border
                                    size="medium">
                                    <img v-if="productLoanType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productLoanType == 1">
                        <el-select class="loan-select" v-model="option6Select" clearable
                            @change="_changeOptionSelect(6)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option6SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="productLoanType == 1">
                            <div id="myChart6" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="productLoanType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px" v-show="productLoanType == 2">
                                <div id="myChart6Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option6Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>

                <!-- 支付公司 放款金额 -->
                <div v-show="chartsCardType === 'LOAN'" class="wai-top-box">
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_gsqst') }}-{{ $t('home_ljfkje') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="paymentLoanType" label="1" border
                                    @change="_changeOptionSelect(12)" size="medium"
                                    :style="{ borderRight: paymentLoanType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="paymentLoanType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="paymentLoanType" label="2" border
                                    size="medium">
                                    <img v-if="paymentLoanType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentLoanType == 1">
                        <el-select class="loan-select" v-model="option12Select" clearable
                            @change="_changeOptionSelect(12)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option12SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="paymentLoanType == 1">
                            <div id="myChart12" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="paymentLoanType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px;" v-show="paymentLoanType == 2">
                                <div id="myChart12Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option12Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>

                <!-- 资金方放款笔数 -->
                <div v-show="chartsCardType === 'LOANSUM'">
                    <div class="select-f" style="position: relative;">
                        {{ $t('home_zjqst') }}-{{ $t('home_fkbs') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="lenderSumType" label="1" border size="medium"
                                    @change="_changeOptionSelect(16)"
                                    :style="{ borderRight: lenderSumType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="lenderSumType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="lenderSumType" label="2" border size="medium">
                                    <img v-if="lenderSumType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="lenderSumType == 1">
                        <el-select class="loan-select" v-model="option16Select" clearable
                            @change="_changeOptionSelect(16)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option16SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="lenderSumType == 1">
                            <div id="myChart16" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="lenderSumType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px" v-show="lenderSumType == 2">
                                <div id="myChart16Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option16Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>

                <!-- 产品放款笔数 -->
                <div v-show="chartsCardType === 'LOANSUM'">
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_cpqst') }}-{{ $t('home_fkbs') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="productSumType" label="1" border size="medium"
                                    @change="_changeOptionSelect(17)"
                                    :style="{ borderRight: productSumType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="productSumType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="productSumType" label="2" border
                                    size="medium">
                                    <img v-if="productSumType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="productSumType == 1">
                        <el-select class="loan-select" v-model="option17Select" clearable
                            @change="_changeOptionSelect(17)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option17SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="productSumType == 1">
                            <div id="myChart17" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="productSumType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px" v-show="productSumType == 2">
                                <div id="myChart17Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option17Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>

                <!-- 支付公司放款笔数 -->
                <div v-show="chartsCardType === 'LOANSUM'">
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_gsqst') }}-{{ $t('home_fkbs') }}
                        <div style="float:right;padding-right:30px;">
                            <div style="display:flex;">
                                <el-radio class="echarts-radio1" v-model="paymentSumType" label="1" border size="medium"
                                    @change="_changeOptionSelect(18)"
                                    :style="{ borderRight: paymentSumType == 1 ? '1px solid #409EFF' : 'none' }">
                                    <img v-if="paymentSumType == 1" src="../../../assets/bar.png" alt />
                                    <img v-else src="../../../assets/bar2.png" alt />
                                    {{ $t('home_zzt') }}
                                </el-radio>
                                <el-radio class="echarts-radio2" v-model="paymentSumType" label="2" border
                                    size="medium">
                                    <img v-if="paymentSumType == 2" src="../../../assets/pie.png" alt />
                                    <img v-else src="../../../assets/pie2.png" alt />
                                    {{ $t('home_bt') }}
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;" v-if="paymentSumType == 1">
                        <el-select class="loan-select" v-model="option18Select" clearable
                            @change="_changeOptionSelect(18)" placeholder="全部" multiple style="margin-right:30px">
                            <el-option v-for="item in option18SelectArr" :key="item.name" :label="item.name" clearable
                                :value="item.name"></el-option>
                        </el-select>
                    </div>
                    <div style="width:100%;display:flex;">
                        <div style="width: 100%" v-show="paymentSumType == 1">
                            <div id="myChart18" style="height: 460px; width: 100%"></div>
                        </div>
                        <div v-show="paymentSumType == 2">
                            <div style="width: 100%;display:flex;margin-top:60px" v-show="paymentSumType == 2">
                                <div id="myChart18Pie" style="height: 520px; width:600px;"></div>
                                <div class="charts-label-box">
                                    <div class="label-item" v-for="(item, index) in option18Pie.series[0].data"
                                        :key="item.name">
                                        <div class="top">
                                            <div class="block"
                                                :style="{ background: index + 1 % 12 != 0 ? colorArr[(index) % 12] : colorArr[11] }">
                                            </div>
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
                </div>
            </el-card>

            <el-card style="margin-top: 20px;" class="wai-top-box">
                <div style="width:100%;display:flex;justify-content: space-between;margin-bottom:30px;margin-top:10px">
                    <el-radio-group v-model="termRadio" style="margin-right:20px" @change="changeLineChart">
                        <el-radio-button label="DAY">{{ $t('home_rqs') }}</el-radio-button>
                        <el-radio-button label="WEEK">{{ $t('home_zqs') }}</el-radio-button>
                        <el-radio-button label="MONTH">{{ $t('home_yqs') }}</el-radio-button>
                    </el-radio-group>
                    <el-date-picker @change="changeLineChart('MONTH')" v-if="termRadio == 'MONTH'"
                        value-format="yyyy-MM" v-model="months" type="monthrange" align="right" unlink-panels
                        range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"
                        :picker-options="pickerOptions"></el-date-picker>
                </div>
                <div style="width: 100%" class="wai-top-box">
                    <div class="select-f" style="position: relative;">
                        {{ $t('home_xfkje') }}&{{ $t('home_xfkzd') }}
                        <div id="myChart" style="height: 650px; width: 100%;margin-bottom:70px"></div>

                    </div>
                    <div class="select-f" style="position: relative;margin-top:100px">
                        {{ $t('home_ljdp') }}&{{ $t('home_xljfkqst') }}
                        <div id="myChart2" style="height: 650px; width: 100%"></div>

                    </div>

                </div>
            </el-card>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-card style="margin-top: 20px;">
                        <div style="width:100%;display:flex">
                            <div style="width: 100%;padding-top:20px" class="wai-top-box">
                                <div id="mapChart" style="height: 550px; width: 100%"></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {
    option,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option9,
    option10,
    option11,
    option12,
    option12Pie,
    option4Pie,
    option6Pie,
    option13,
    option13Pie,
    option14,
    option14Pie,
    option15,
    option15Pie,
    option16,
    option16Pie,
    option17,
    option17Pie,
    option18,
    option18Pie
} from '../../common/loanDataBoard';
import monthTrend from '../../common/loanDataBoard-trend2';
import dataClass from '../../common/dataClass';
import { boardDate, distributed, creditGmv } from '../../../api/loanDataBoard';
import '../../../assets/china';
import { itemsBanner } from '../../../api/statistics';
export default {
    name: 'loanDataBoard',
    components: {
        monthTrend,
        dataClass
    },
    data() {
        return {
            creditGmv: '0',
            option12,
            option12Pie,
            option14,
            option14Pie,
            option13,
            option13Pie,
            option15,
            option15Pie,
            option16,
            option16Pie,
            option17,
            option17Pie,
            option18,
            option18Pie,
            lenderSumType: '1',
            productSumType: '1',
            paymentSumType: '1',
            paymentCreaditType: '1',
            productCreaditType: '1',
            lenderCreaditType: '1',
            paymentLoanType: '1',
            productLoanType: '1',
            productLoanType: '1',
            lenderLoanType: '1',
            chartsCardType: 'LOAN',
            option8Select: '',
            option6Pie,
            option6SelectArr: [],
            option8SelectArr: [],
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
            months: [],
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
            echartsLoading: false,
            tabIndex: '1', //{{$t('loan_detail_gl') }}与详情切换
            termRadio: 'MONTH', //{{$t('loan_detail_gl') }}时间选择
            option,
            option2,
            option3,
            option4,
            option5,
            option6,
            option7,
            option8,
            option9,
            option10,
            option11,
            option4Pie,
            totalMonth: [],
            loading: false,
            option4SelectArr: [],
            option18SelectArr: [],
            option17SelectArr: [],
            option16SelectArr: [],
            option15SelectArr: [],
            option14SelectArr: [],
            option13SelectArr: [],
            option12SelectArr: [],
            map: {

                title: {
                    text: this.$t('home_xljfkyhfb'),
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
                        console.log(params);
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
                        color: ['#FFFFCB', ' #F5A9A9', '#F87F80','#33CCFF','#B40403', '#CC3366', '#CC3300',  '#DF0001']
                    }
                }
            },

            nowData: {},
            option4Select: [],
            option18Select: [],
            option17Select: [],
            option16Select: [],
            option15Select: [],
            option14Select: [],
            option13Select: [],
            option12Select: [],
            option6Select: []
        };
    },
    mounted() {
        this._creditGmv();
        this.changeTermType('MONTH');
        this.map.series[0].data = [];
        distributed().then(res => {
            this.nowData = res.data;
            res.data.loanProvinceCountList.forEach(item => {
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

            let mapChartDom = document.getElementById('mapChart');
            let mapChart = this.$echarts.init(mapChartDom);
            mapChart.setOption(this.map);

            let dates = [];
            Object.keys(res.data.dateMap).forEach((item, index) => {
                dates.push(res.data.dateMap[`month${index + 1}`]);
            });
            this.option4.xAxis[0].data = [];
            this.option12.xAxis[0].data = [];
            this.option6.xAxis[0].data = [];
            this.option8.xAxis[0].data = [];

            this.option4.xAxis[0].data = dates;
            this.option12.xAxis[0].data = dates;
            this.option6.xAxis[0].data = dates;
            this.option8.xAxis[0].data = dates;
            console.log(dates);
            // 资金方分布 - 累计放款金额
            this.option3.series[0].data = [];
            res.data.loanLenderAmountList.forEach(item => {
                this.option3.series[0].data.unshift({
                    value: (item.loanAmount / 10000).toFixed(2),
                    name: item.lenderName || '其他'
                });
            });

            let dom = document.getElementById('myChart3');
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.option3);
        });
    },
    methods: {
        _creditGmv() {
            creditGmv().then(res => {
                this.creditGmv = res.data
            })
        },
        changeChartsCardType(val) {
            this.chartsCardType = val;
            this.$nextTick(() => {
                this.refurbishEcharts('');
            });
        },
        handleSelect(val) {
            this.tabIndex = val;
            if (val == 1) {
                this.$nextTick(() => {
                    this.refurbishEcharts('');
                });
            }
        },
        _go(val) {
            this.loading = true;
            this.chartsCardType = val;
            this.$nextTick(() => {
                this.refurbishEcharts('');
            });
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        _changeOptionSelect(chartsIndex) {
            this.changeTermType('MONTH', chartsIndex);
        },
        _change(val) {
            if (val == 'MONTH' && this.months.length) {
                console.log(this.totalMonth);
                this.months = [this.totalMonth[0], this.totalMonth[this.totalMonth.length - 1]];
            }
            this.changeTermType('MONTH');
        },
        goTodayOffer() {
            this.$router.push('/offer-list?isToday=true');
        },
        goTodayUser() {
            this.$router.push('/loan-user?isToday=true');
        },
        goTodayLoan() {
            this.$router.push('/today-loan?isToday=true');
        },
        numFormat(num) {
            if (!num) return num;
            var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },
        changeLineChart(val) {
            if (val == 'DAY') {
                this.option.yAxis[1].interval = 200;
                this.option.yAxis[1].max = 2000;
            } else if (val == 'WEEK') {
                this.option.yAxis[1].interval = 1000;
                this.option.yAxis[1].max = 7000;
            } else {
                this.option.yAxis[1].interval = 2000;
                this.option.yAxis[1].max = 20000;
            }

            return boardDate(val).then(res => {
                let dates = [];
                Object.keys(res.data.dateMap).forEach((key, index) => {
                    if (res.data.dateMap.month1) {
                        dates.push(res.data.dateMap[`month${index + 1}`]);
                    } else if (res.data.dateMap.week1) {
                        dates.push(res.data.dateMap[`week${index + 1}`]);
                    } else {
                        dates.push(res.data.dateMap[`day${index + 1}`]);
                    }
                });
                this.option.xAxis[0].data = dates;
                this.option.series[0].data = [];
                this.option.series[1].data = [];
                this.option.series[2].data = [];
                Object.keys(res.data.loanAmountMap).forEach((key, index) => {
                    this.option.series[0].data.push((res.data.loanAmountMap[`loanAmount${index + 1}`] / 10000 || 0).toFixed(2));
                });

                Object.keys(res.data.loanBalanceMap).forEach((key, index) => {
                    this.option.series[1].data.push((res.data.loanBalanceMap[`loanBalance${index + 1}`] / 10000 || 0).toFixed(2));
                });
                Object.keys(res.data.currLoanAmountMap || {}).forEach((key, index) => {
                    this.option.series[2].data.push((res.data.currLoanAmountMap[`currLoanAmount${index + 1}`] / 10000 || 0).toFixed(2));
                });

                if (this.termRadio == 'MONTH') {
                    this.totalMonth = [...dates];
                }
                this.option2.xAxis[0].data = dates;
                this.option2.series[0].data = [];
                this.option2.series[1].data = [];
                Object.keys(res.data.loanUserCountMap).forEach((key, index) => {
                    this.option2.series[0].data.push(res.data.loanUserCountMap[`loanUserCount${index + 1}`]);
                });

                Object.keys(res.data.loanOfferCountMap).forEach((key, index) => {
                    this.option2.series[1].data.push(res.data.loanOfferCountMap[`loanOfferCount${index + 1}`]);
                });

                //时间范围筛选
                if (this.termRadio == 'MONTH') {
                    if (this.months && this.months.length) {
                        let starIndex;
                        let endIndex;
                        let dd = [...this.totalMonth]; //全部月份
                        starIndex = dd.indexOf(this.months[0]); //选择的时间下标
                        endIndex = dd.indexOf(this.months[1]) + 1;
                        this.option.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                        this.option2.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option2.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                    } else {
                        this.months = [this.totalMonth[0], this.totalMonth[this.totalMonth.length - 1]];
                    }
                }
                this.refurbishEcharts('1');
            });
        },
        changeTermType(val, chartsIndex) {
            // this.option.yAxis[0].min=val=='MONTH'?10000:0
            if (val == 'DAY') {
                this.option.yAxis[1].interval = 200;
                this.option.yAxis[1].max = 2000;
            } else if (val == 'WEEK') {
                this.option.yAxis[1].interval = 1000;
                this.option.yAxis[1].max = 7000;
            } else {
                this.option.yAxis[1].interval = 2000;
                this.option.yAxis[1].max = 20000;
            }

            return boardDate(val).then(res => {
                let dates = [];
                Object.keys(res.data.dateMap).forEach((key, index) => {
                    if (res.data.dateMap.month1) {
                        dates.push(res.data.dateMap[`month${index + 1}`]);
                    } else if (res.data.dateMap.week1) {
                        dates.push(res.data.dateMap[`week${index + 1}`]);
                    } else {
                        dates.push(res.data.dateMap[`day${index + 1}`]);
                    }
                });
                this.option.xAxis[0].data = dates;
                this.option.series[0].data = [];
                this.option.series[1].data = [];
                this.option.series[2].data = [];
                Object.keys(res.data.loanAmountMap).forEach((key, index) => {
                    this.option.series[0].data.push((res.data.loanAmountMap[`loanAmount${index + 1}`] / 10000 || 0).toFixed(2));
                });

                Object.keys(res.data.loanBalanceMap).forEach((key, index) => {
                    this.option.series[1].data.push((res.data.loanBalanceMap[`loanBalance${index + 1}`] / 10000 || 0).toFixed(2));
                });
                Object.keys(res.data.currLoanAmountMap || {}).forEach((key, index) => {
                    this.option.series[2].data.push((res.data.currLoanAmountMap[`currLoanAmount${index + 1}`] / 10000 || 0).toFixed(2));
                });

                if (this.termRadio == 'MONTH') {
                    this.totalMonth = [...dates];
                }
                this.option2.xAxis[0].data = dates;
                this.option2.series[0].data = [];
                this.option2.series[1].data = [];
                Object.keys(res.data.loanUserCountMap).forEach((key, index) => {
                    this.option2.series[0].data.push(res.data.loanUserCountMap[`loanUserCount${index + 1}`]);
                });

                Object.keys(res.data.loanOfferCountMap).forEach((key, index) => {
                    this.option2.series[1].data.push(res.data.loanOfferCountMap[`loanOfferCount${index + 1}`]);
                });

                this.option4.xAxis[0].data = [];
                this.option6.xAxis[0].data = [];
                this.option8.xAxis[0].data = [];
                this.option12.xAxis[0].data = [];
                this.option13.xAxis[0].data = [];
                this.option14.xAxis[0].data = [];
                this.option15.xAxis[0].data = [];
                this.option16.xAxis[0].data = [];
                this.option17.xAxis[0].data = [];
                this.option18.xAxis[0].data = [];
                this.option4.series = [];
                this.option6.series = [];
                this.option8.series = [];
                this.option12.series = [];
                this.option13.series = [];
                this.option14.series = [];
                this.option15.series = [];
                this.option16.series = [];
                this.option17.series = [];
                this.option18.series = [];

                this.option4.xAxis[0].data = dates;
                this.option6.xAxis[0].data = dates;
                this.option8.xAxis[0].data = dates;
                this.option12.xAxis[0].data = dates;
                this.option13.xAxis[0].data = dates;
                this.option14.xAxis[0].data = dates;
                this.option15.xAxis[0].data = dates;
                this.option16.xAxis[0].data = dates;
                this.option17.xAxis[0].data = dates;
                this.option18.xAxis[0].data = dates;

                // 资金方趋势图 - 累计放款金额
                this.option4.legend.textStyle = { color: '#999999' };
                this.option4.legend.data = [];
                res.data.loanLenderAmountMap.loanLenderAmount1.forEach(item => {
                    this.option4.legend.data.unshift(item.lenderName || '其他');
                    this.option4.series.unshift({
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
                        this.option4.series.forEach(it => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData = [];
                let total = 0;
                this.option4.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData.push(it);
                        total = total + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option4Pie.series[0].data = [];
                filterData.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option4Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total) * 100).toFixed(2)
                    });
                });
                this.option4.series = filterData;
                this.option4SelectArr = JSON.parse(JSON.stringify(filterData));

                // 产品趋势图 - 累计放款金额
                this.option6.legend.textStyle = { color: '#999999' };
                this.option6.legend.data = [];
                res.data.loanLenderProductAmountMap.loanLenderProductAmount1.forEach(item => {
                    this.option6.legend.data.unshift(item.lenderProduct || '其他');
                    this.option6.series.unshift({
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
                        this.option6.series.forEach(it => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData2 = [];
                let total2 = 0;
                this.option6.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData2.push(it);
                        total2 = total2 + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option6Pie.series[0].data = [];
                filterData2.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option6Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total2) * 100).toFixed(2)
                    });
                });
                this.option6.series = filterData2;
                this.option6SelectArr = JSON.parse(JSON.stringify(filterData2));

                // -----------------------------------------------------------------
                // 支付公司趋势图 - 累计放款金额
                this.option12.legend.textStyle = { color: '#999999' };
                this.option12.legend.data = [];
                res.data.loanPaymentAmountMap.loanPaymentAmountMap1.forEach(item => {
                    this.option12.legend.data.unshift(item.paymentName || '其他');
                    this.option12.series.unshift({
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
                    res.data.loanPaymentAmountMap[`loanPaymentAmountMap${index + 1}`].forEach(item => {
                        this.option12.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push((item.loanAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData12 = [];
                let total12 = 0;
                this.option12.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData12.push(it);
                        total12 = total12 + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option12Pie.series[0].data = [];
                filterData12.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option12Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total12) * 100).toFixed(2)
                    });
                });
                this.option12.series = filterData12;
                this.option12SelectArr = JSON.parse(JSON.stringify(filterData12));

                // 资金方趋势图 - 累计授信金额
                this.option13.legend.textStyle = { color: '#999999' };
                this.option13.legend.data = [];
                res.data.creditLenderAmountMap.creditLenderAmount1.forEach(item => {
                    this.option13.legend.data.unshift(item.lenderName || '其他');
                    this.option13.series.unshift({
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
                        this.option13.series.forEach(it => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData13 = [];
                let total13 = 0;
                this.option13.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData13.push(it);
                        total13 = total13 + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option13Pie.series[0].data = [];
                filterData13.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option13Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total13) * 100).toFixed(2)
                    });
                });
                this.option13.series = filterData13;
                this.option13SelectArr = JSON.parse(JSON.stringify(filterData13));

                // 产品趋势图 - 累计授信金额
                this.option14.legend.textStyle = { color: '#999999' };
                this.option14.legend.data = [];
                res.data.creditLenderProductAmountMap.creditLenderProductAmount1.forEach(item => {
                    this.option14.legend.data.unshift(item.lenderProduct || '其他');
                    this.option14.series.unshift({
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
                        this.option14.series.forEach(it => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData14 = [];
                let total14 = 0;
                this.option14.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData14.push(it);
                        total14 = total14 + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option14Pie.series[0].data = [];
                filterData14.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option14Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total14) * 100).toFixed(2)
                    });
                });
                this.option14.series = filterData14;
                this.option14SelectArr = JSON.parse(JSON.stringify(filterData14));

                // 支付公司 - 累计授信金额
                this.option15.legend.textStyle = { color: '#999999' };
                this.option15.legend.data = [];
                res.data.creditPaymentAmountMap.creditPaymentAmount1.forEach(item => {
                    this.option15.legend.data.unshift(item.paymentName || '其他');
                    this.option15.series.unshift({
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
                        this.option15.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push((item.creditAmount / 10000).toFixed(2));
                            }
                        });
                    });
                });
                let filterData15 = [];
                let total15 = 0;
                this.option15.series.forEach((it, ind) => {
                    if (Number(it.data[it.data.length - 1]) >= 200) {
                        filterData15.push(it);
                        total15 = total15 + Number(it.data[it.data.length - 1]);
                    }
                });
                this.option15Pie.series[0].data = [];
                filterData15.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option15Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total15) * 100).toFixed(2)
                    });
                });
                this.option15.series = filterData15;
                this.option15SelectArr = JSON.parse(JSON.stringify(filterData15));
                // -----------------------------------------------------------------

                // 资金方 - 累计放款笔数
                this.option16.legend.textStyle = { color: '#999999' };
                this.option16.legend.data = [];
                res.data.loanLenderCountMap.loanLenderCount1.forEach(item => {
                    this.option16.legend.data.unshift(item.lenderName || '其他');
                    this.option16.series.unshift({
                        name: item.lenderName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanLenderCountMap).forEach((key, index) => {
                    res.data.loanLenderCountMap[`loanLenderCount${index + 1}`].forEach(item => {
                        this.option16.series.forEach(it => {
                            if (it.name == item.lenderName || (!item.lenderName && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData16 = [];
                let total16 = 0;
                this.option16.series.forEach((it, ind) => {
                    // if (Number(it.data[it.data.length - 1]) >= 200) {
                    filterData16.push(it);
                    total16 = total16 + Number(it.data[it.data.length - 1]);
                    // }
                });
                this.option16Pie.series[0].data = [];
                filterData16.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option16Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total16) * 100).toFixed(2)
                    });
                });
                this.option16.series = filterData16;
                this.option16SelectArr = JSON.parse(JSON.stringify(filterData16));

                // 产品 - 累计放款笔数
                this.option17.legend.textStyle = { color: '#999999' };
                this.option17.legend.data = [];
                res.data.loanLenderProductCountMap.loanLenderProductCount1.forEach(item => {
                    this.option17.legend.data.unshift(item.lenderProduct || '其他');
                    this.option17.series.unshift({
                        name: item.lenderProduct || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanLenderProductCountMap).forEach((key, index) => {
                    res.data.loanLenderProductCountMap[`loanLenderProductCount${index + 1}`].forEach(item => {
                        this.option17.series.forEach(it => {
                            if (it.name == item.lenderProduct || (!item.lenderProduct && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData17 = [];
                let total17 = 0;
                this.option17.series.forEach((it, ind) => {
                    // if (Number(it.data[it.data.length - 1]) >= 200) {
                    filterData17.push(it);
                    total17 = total17 + Number(it.data[it.data.length - 1]);
                    // }
                });
                this.option17Pie.series[0].data = [];
                filterData17.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option17Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total17) * 100).toFixed(2)
                    });
                });
                this.option17.series = filterData17;
                this.option17SelectArr = JSON.parse(JSON.stringify(filterData17));

                // 支付公司 - 累计放款笔数
                this.option18.legend.textStyle = { color: '#999999' };
                this.option18.legend.data = [];
                res.data.loanPaymentCountMap.loanPaymentCountMap1.forEach(item => {
                    this.option18.legend.data.unshift(item.paymentName || '其他');
                    this.option18.series.unshift({
                        name: item.paymentName || '其他',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        data: []
                    });
                });

                Object.keys(res.data.loanPaymentCountMap).forEach((key, index) => {
                    res.data.loanPaymentCountMap[`loanPaymentCountMap${index + 1}`].forEach(item => {
                        this.option18.series.forEach(it => {
                            if (it.name == item.paymentName || (!item.paymentName && it.name == '其他')) {
                                it.data.push(item.loanCount);
                            }
                        });
                    });
                });
                let filterData18 = [];
                let total18 = 0;
                this.option18.series.forEach((it, ind) => {
                    // if (Number(it.data[it.data.length - 1]) >= 200) {
                    filterData18.push(it);
                    total18 = total18 + Number(it.data[it.data.length - 1]);
                    // }
                });
                this.option18Pie.series[0].data = [];
                filterData18.forEach(it => {
                    // 把大于两百万的也放进饼图  和算比例
                    this.option18Pie.series[0].data.push({
                        name: it.name,
                        value: it.data[it.data.length - 1],
                        scale: ((it.data[it.data.length - 1] / total18) * 100).toFixed(2)
                    });
                });
                this.option18.series = filterData18;
                this.option18SelectArr = JSON.parse(JSON.stringify(filterData18));

                //时间范围筛选
                if (this.termRadio == 'MONTH') {
                    if (this.months && this.months.length) {
                        let starIndex;
                        let endIndex;
                        let dd = [...this.totalMonth]; //全部月份
                        starIndex = dd.indexOf(this.months[0]); //选择的时间下标
                        endIndex = dd.indexOf(this.months[1]) + 1;
                        this.option.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                        this.option2.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option2.xAxis[0].data = [...dd.slice(starIndex, endIndex)];

                        this.option4.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option4.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                        this.option6.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option6.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                        this.option8.series.forEach(item => {
                            item.data = [...item.data.slice(starIndex, endIndex)];
                        });
                        this.option8.xAxis[0].data = [...dd.slice(starIndex, endIndex)];
                    } else {
                        this.months = [this.totalMonth[0], this.totalMonth[this.totalMonth.length - 1]];
                    }
                }
                //筛选 只保留选出来的一条
                if (this.option4Select.length) {
                    let arr = [];
                    this.option4Select.forEach(item => {
                        this.option4.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option4.series = arr;
                }
                if (this.option6Select.length) {
                    let arr = [];
                    this.option6Select.forEach(item => {
                        this.option6.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option6.series = arr;
                }
                if (this.option12Select.length) {
                    let arr = [];
                    this.option12Select.forEach(item => {
                        this.option12.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option12.series = arr;
                }
                if (this.option13Select.length) {
                    let arr = [];
                    this.option13Select.forEach(item => {
                        this.option13.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option13.series = arr;
                }
                if (this.option14Select.length) {
                    let arr = [];
                    this.option14Select.forEach(item => {
                        this.option14.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option14.series = arr;
                }
                if (this.option15Select.length) {
                    let arr = [];
                    this.option15Select.forEach(item => {
                        this.option15.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option15.series = arr;
                }
                if (this.option16Select.length) {
                    let arr = [];
                    this.option16Select.forEach(item => {
                        this.option16.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option16.series = arr;
                }
                if (this.option17Select.length) {
                    let arr = [];
                    this.option17Select.forEach(item => {
                        this.option17.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option17.series = arr;
                }
                if (this.option18Select.length) {
                    let arr = [];
                    this.option18Select.forEach(item => {
                        this.option18.series.forEach(it => {
                            if (item == it.name) {
                                arr.push(it);
                            }
                        });
                    });
                    this.option18.series = arr;
                }
                // if (this.option8Select) {
                //     this.option8.series = [this.option8.series.find(item => { return item.name == this.option8Select })]
                // }
                this.refurbishEcharts(chartsIndex);
            });
        },
        rgbaColor() {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 200);
            let b = Math.floor(Math.random() * 50);
            let a = Math.random().toFixed(2);
            let rgba = `rgba(${r},${g},${b},${a})`;
            return rgba;
        },
        refurbishEcharts(chartsIndex) {
            if (chartsIndex == 1 || !chartsIndex) {
                // 基于准备好的dom，初始化echarts实例
                let dom = document.getElementById('myChart');
                let myChart = this.$echarts.init(dom);
                myChart.setOption(this.option);
                let dom2 = document.getElementById('myChart2');
                let myChart2 = this.$echarts.init(dom2);
                myChart2.setOption(this.option2);
                this.echartsLoading = false;
            }

            if (chartsIndex == 4 || !chartsIndex) {
                let dom4 = document.getElementById('myChart4');
                let myChart4 = this.$echarts.init(dom4).dispose();
                myChart4 = this.$echarts.init(dom4);
                myChart4.setOption(this.option4);
            }

            if (chartsIndex == 6 || !chartsIndex) {
                let dom6 = document.getElementById('myChart6');
                let myChart6 = this.$echarts.init(dom6).dispose();
                myChart6 = this.$echarts.init(dom6);
                myChart6.setOption(this.option6);
            }

            let dom7 = document.getElementById('myChart4Pie');
            let myChart7 = this.$echarts.init(dom7).dispose();
            myChart7 = this.$echarts.init(dom7);
            myChart7.setOption(this.option4Pie);

            let dom8 = document.getElementById('myChart6Pie');
            let myChart8 = this.$echarts.init(dom8).dispose();
            myChart8 = this.$echarts.init(dom8);
            myChart8.setOption(this.option6Pie);

            if (chartsIndex == 12 || !chartsIndex) {
                let dom12 = document.getElementById('myChart12');
                let myChart12 = this.$echarts.init(dom12).dispose();
                myChart12 = this.$echarts.init(dom12);
                myChart12.setOption(this.option12);
            }
            let dom12Pie = document.getElementById('myChart12Pie');
            let myChart12Pie = this.$echarts.init(dom12Pie).dispose();
            myChart12Pie = this.$echarts.init(dom12Pie);
            myChart12Pie.setOption(this.option12Pie);

            if (chartsIndex == 13 || !chartsIndex) {
                let dom13 = document.getElementById('myChart13');
                let myChart13 = this.$echarts.init(dom13).dispose();
                myChart13 = this.$echarts.init(dom13);
                myChart13.setOption(this.option13);
            }
            let dom13Pie = document.getElementById('myChart13Pie');
            let myChart13Pie = this.$echarts.init(dom13Pie).dispose();
            myChart13Pie = this.$echarts.init(dom13Pie);
            myChart13Pie.setOption(this.option13Pie);

            if (chartsIndex == 14 || !chartsIndex) {
                let dom14 = document.getElementById('myChart14');
                let myChart14 = this.$echarts.init(dom14).dispose();
                myChart14 = this.$echarts.init(dom14);
                myChart14.setOption(this.option14);
            }
            let dom14Pie = document.getElementById('myChart14Pie');
            let myChart14Pie = this.$echarts.init(dom14Pie).dispose();
            myChart14Pie = this.$echarts.init(dom14Pie);
            myChart14Pie.setOption(this.option14Pie);

            if (chartsIndex == 15 || !chartsIndex) {
                let dom15 = document.getElementById('myChart15');
                let myChart15 = this.$echarts.init(dom15).dispose();
                myChart15 = this.$echarts.init(dom15);
                myChart15.setOption(this.option15);
            }
            let dom15Pie = document.getElementById('myChart15Pie');
            let myChart15Pie = this.$echarts.init(dom15Pie).dispose();
            myChart15Pie = this.$echarts.init(dom15Pie);
            myChart15Pie.setOption(this.option15Pie);

            if (chartsIndex == 16 || !chartsIndex) {
                let dom16 = document.getElementById('myChart16');
                let myChart16 = this.$echarts.init(dom16).dispose();
                myChart16 = this.$echarts.init(dom16);
                myChart16.setOption(this.option16);
            }
            let dom16Pie = document.getElementById('myChart16Pie');
            let myChart16Pie = this.$echarts.init(dom16Pie).dispose();
            myChart16Pie = this.$echarts.init(dom16Pie);
            myChart16Pie.setOption(this.option16Pie);

            if (chartsIndex == 17 || !chartsIndex) {
                let dom17 = document.getElementById('myChart17');
                let myChart17 = this.$echarts.init(dom17).dispose();
                myChart17 = this.$echarts.init(dom17);
                myChart17.setOption(this.option17);
            }
            let dom17Pie = document.getElementById('myChart17Pie');
            let myChart17Pie = this.$echarts.init(dom17Pie).dispose();
            myChart17Pie = this.$echarts.init(dom17Pie);
            myChart17Pie.setOption(this.option17Pie);

            if (chartsIndex == 18 || !chartsIndex) {
                let dom18 = document.getElementById('myChart18');
                let myChart18 = this.$echarts.init(dom18).dispose();
                myChart18 = this.$echarts.init(dom18);
                myChart18.setOption(this.option18);
            }
            let dom18Pie = document.getElementById('myChart18Pie');
            let myChart18Pie = this.$echarts.init(dom18Pie).dispose();
            myChart18Pie = this.$echarts.init(dom18Pie);
            myChart18Pie.setOption(this.option18Pie);
            // let dom8 = document.getElementById('myChart8');
            // let myChart8 = this.$echarts.init(dom8).dispose()
            // myChart8 = this.$echarts.init(dom8);
            // myChart8.setOption(this.option8);
        }
    }
};
</script>
<style scoped>
.el-menu {
    background: none;
}
</style>
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

/deep/.echarts-radio1>.el-radio__label {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/.echarts-radio2>.el-radio__label {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/.echarts-radio1>.el-radio__input {
    display: none !important;
    visibility: hidden !important;
}

/deep/.echarts-radio2>.el-radio__input {
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

    .l {
        height: 5px;
        width: 40px;
        background-color: #e52d6d;
        margin: 0 auto;
        margin-bottom: -10px;
    }
}

.el-menu--horizontal>.el-menu-item.is-active {
    border: none !important;
    font-size: 20px;
}

.el-menu--horizontal>.el-menu-item {
    height: 53px;
    margin: none;
    margin-right: 40px;
    padding-bottom: 5px;
    line-height: 51px;
}

.select-f {
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 19px;
    color: rgb(51, 51, 51);
    font-weight: 700;
    margin-bottom: 32px;
    padding-top: 20px;
    padding-left: 20px;
}

/deep/.loan-select {
    // z-index: 9999999999999999999999999999 !important;

    .el-input {
        min-height: 30px !important;
    }

    input {
        min-height: 30px !important;
        line-height: 30px !important;
    }

    .el-input__icon {
        line-height: 30px !important;
    }
}

.loanDataBoard {
    .btn-box-dataBoard {
        clear: both;

        .btn-item {
            // width: 230px;
            padding: 0 22px;
            height: 60px;
            background: rgb(249, 249, 249);
            border-radius: 20px 20px 0px 0px;
            float: left;
            margin-right: 32px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            color: rgb(102, 102, 102);
            cursor: pointer;
        }

        .btn-item:hover {
            color: #000;
            background: #fff;
        }

        .active {
            color: #000;
            background: #fff;
            cursor: pointer;
        }
    }

    .wai-top-box {
        background: rgb(246, 246, 246);
        border-radius: 20px;
    }

    /deep/.el-card__body {
        background: #fff;
    }

    /deep/.el-card {
        border: none;
        border-radius: 0 20px 20px 20px;
    }

    .el-tabs--border-card {
        border: none;
    }

    .new-data-view-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        overflow-x: auto;
        margin-bottom: 10px;

        .new-data-view-left {
            width: 460px;
            height: 536px;
            background: rgb(246, 246, 246);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
            border-radius: 20px;
            overflow: hidden;

            .title-box {
                color: white;
                display: flex;
                align-items: center;
                justify-content: left;
                margin-top: 32px;
                margin-left: 32px;
                margin-right: 12px;

                .title-img {
                    height: 40px;
                    margin-right: 12px;
                }

                .title-title {
                    font-size: 20px;
                    color: rgb(51, 51, 51);
                }
            }

            .title-box-down {
                display: flex;
                align-items: center;
                justify-content: space-around;

                .item-box {
                    // margin-right: 100px;
                    display: flex;
                    flex-direction: column;

                    .item-view {
                        display: flex;
                        align-items: center;
                        justify-content: left;
                        margin-left: 30px;
                        margin-top: 48px;
                        cursor: pointer;

                        .left {
                            height: 50px;
                            margin-right: 34px;
                        }

                        .mid {
                            .up {
                                font-size: 16px;
                                height: 16px;
                                color: rgb(153, 153, 153);
                                display: flex;
                                align-items: center;
                                justify-content: left;

                                .btn {
                                    width: 70px;
                                    height: 20px;
                                    line-height: 20px;
                                    font-size: 12px;
                                    border: 1px solid #999999;
                                    border-radius: 20px;
                                    color: #999999;
                                    text-align: center;
                                    cursor: pointer;
                                    margin-left: 10px;
                                }
                            }

                            .down {
                                font-weight: 700;
                                font-size: 30px;
                                margin-top: 8px;
                                color: rgb(51, 51, 51);
                            }
                        }
                    }
                }
            }
        }
    }

    .data-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .line {
            width: 1px;
            height: 48px;
            background: #dcdee0;
        }

        .data-item:nth-child(4n) {
            margin-right: 0;

            .item-value {
                border: none;
            }
        }

        .hover:hover {
            background: #f0f6ff;
        }

        .data-item {
            display: flex;
            flex-direction: column;
            width: 23%;
            margin-right: 26px;
            min-height: 80px;
            margin-bottom: 30px;
            padding-bottom: 25px;
            padding-top: 13px;
            padding-left: 0.6%;

            .item-label {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #646566;
                font-weight: 400;
                display: flex;
                align-items: center;

                .go-detial {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #e52d6d;
                    line-height: 18px;
                    font-weight: 400;
                    width: 56px;
                    height: 18px;
                    background: #ffeff3;
                    border: 1px solid rgba(229, 45, 109, 1);
                    border-radius: 2px;
                    text-align: center;
                    margin-left: 8px;
                }
            }

            .item-value {
                height: 100%;
                font-family: HelveticaNeue-Medium;
                font-size: 28px;
                color: #323232;
                letter-spacing: 0;
                text-align: justify;
                line-height: 40px;
                font-weight: 500;
                padding-top: 20px;
                display: block;
                border-right: 1px solid #dcdee0;
            }
        }
    }

    .today-title {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #131415;
        font-weight: 700;
        display: flex;
        margin-top: 10px;

        .icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            margin-top: 4px;
        }
    }

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

    .grid-content {
        font-size: 14px;
        color: #999;
        display: flex;
        padding: 20px;
        flex-direction: column;
        height: 115px;

        .grid-num {
            font-size: 15px;
            color: #000;
            font-weight: 700;
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
        }

        .el-icon-top {
            font-size: 15px;
            font-weight: 700;
            color: red;
        }
    }
}
</style>