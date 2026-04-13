<template>
    <div class="loaning">
        <div class="shops">
            <el-card style="padding: 0">
                <el-radio-group v-model="radio1" size="medium" @change="changeShop">
                    <div v-for='(item, index) in sanplData' style='display: inline-block' :key='index'>
                        <el-tooltip placement="top" :content='item.offerId' :open-delay=openDelay>
                            <el-radio-button :label="index" :key="index">{{ $t('loan_detail_dp') }}{{ index + 1 }}({{
                                item.shopTypeName
                                }})</el-radio-button>
                        </el-tooltip>
                    </div>
                </el-radio-group>
            </el-card>
        </div>
        <!-- 亚马逊店铺 -->
        <div v-show="isAmazon">
            <div class="tips" v-if="itemData.isWarning">
                <img class="tips-icon" src="../../../assets/tips.png" alt />
                {{ itemData.tips }}
            </div>

            <div style="display: flex; justify-content: space-between">
                <el-card shadow="hover" class="card1" style="width: 65%">
                    <div class="score-box">
                        <div class="score-info" style="width: 67%">
                            <span class="score-title">{{ $t('loan_detail_zhpf') }}</span>
                            <div class="score-num">
                                <span class="score" v-if="weekLineChartData.riskReportV3ShopScore">{{
                                    weekLineChartData.riskReportV3ShopScore.scoreSum || '0'
                                    }}</span>
                                <span class="history-score">
                                    <i v-if="Number(weekLineChartData.riskReportV3ShopScore.scoreSum - itemData.lastSellerScore) > 0"
                                        class="el-icon-top"></i>
                                    <i v-else class="el-icon-bottom"></i>
                                    {{ (weekLineChartData.riskReportV3ShopScore.scoreSum -
                                        itemData.lastSellerScore).toFixed(2) }}
                                </span>
                            </div>
                            <div class="score-time">

                                <span>{{ $t('loan_detail_gxsj') }}：{{ itemData.reportCardDataDate || '--' }}</span>
                                <span>站点：{{ itemData.site ? itemData.site : '--' }}</span>
                            </div>
                        </div>
                        <div class="shop-info-box">
                            <div class="shop-info-item" style="margin-bottom: 20px">
                                <span class="info-item-title">{{ $t('loan_detail_hyjz') }}</span>
                                <span class="info-item-num">{{ itemData.industrySellerScore || '-' }}</span>
                                <img class="info-item-icon" src="../../../assets/s1.png" alt />
                            </div>
                            <div class="shop-info-item" style="margin-bottom: 20px">
                                <span class="info-item-title">{{ $t('loan_detail_qzjz') }}</span>
                                <span class="info-item-num">{{ itemData.allIndustrySellerScore || '-' }}</span>
                                <img class="info-item-icon" src="../../../assets/s2.png" alt />
                            </div>
                            <div class="shop-info-item">
                                <span class="info-item-title">{{ $t('loan_detail_hypm') }}</span>
                                <span class="info-item-num">{{ itemData.industryRankingRange || '-' }}</span>
                                <img class="info-item-icon" src="../../../assets/s4.png" alt />
                            </div>
                            <div class="shop-info-item">
                                <span class="info-item-title">{{ $t('loan_detail_qzpm') }}</span>
                                <span class="info-item-num">{{ itemData.fullRankingRange || '-' }}</span>
                                <img class="info-item-icon" src="../../../assets/s5.png" alt />
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" class="card1" style="width: 34%">
                    <div class="score-box">
                        <div id="charts" style="height: 245px; width: 100%; margin-bottom: 20px"></div>
                    </div>
                </el-card>
            </div>
            <div style="display: flex; justify-content: space-between">
                <el-card shadow="hover" class="card2" style="padding-left: 0px">
                    <span class="score-title" style="margin-bottom: 0px">{{ $t('loan_detail_zjlzxs') }}</span>
                    <div id="weekCharts" style="height: 300px; width: 100%"></div>
                </el-card>
                <el-card shadow="hover" class="card2" style="padding-left: 0px">
                    <span class="score-title" style="margin-bottom: 0px">{{ $t('loan_detail_dpxshkzn') }}</span>
                    <div id="charts2" style="height: 300px; width: 100%"></div>
                </el-card>
            </div>

            <el-card shadow="hover" class="card3">
                <div class="score-title" style="margin-bottom: 36px; display: flex; align-items: center">
                    {{ $t('loan_detail_jyzb') }}
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content" style="line-height: 20px">
                            {{ $t('loan_detail_tipstkl') }}
                            <br />{{ $t('loan_detail_ddqx') }}<br />{{ $t('loan_detail_cpl') }}
                            <br />{{ $t('loan_detail_ycl') }}
                            <br />{{ $t('loan_detail_jgl') }} <br />{{ $t('loan_detaiL_qxl') }}
                        </div>
                        <i class="el-icon-warning-outline tips-icon" style="margin-left: 10px"></i>
                    </el-tooltip>
                </div>
                <el-table :data="tableData" style="width: 100%" :border="true"
                    :row-style="{ height: '50px', 'font-size': '14px' }">
                    <el-table-column prop="head" label="指标">
                        <template slot-scope="scope">
                            <div style="font-size: 14px; text-align: center; height: 30px; line-height: 30px">{{
                                scope.row.head
                                }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :prop="item.key" :label="item.label" v-for="item in colunm" :key="item.key">
                        <template slot-scope="scope">
                            <div style="
                                font-size: 14px;
                                text-align: center;
                                height: 30px;
                                line-height: 30px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">
                                {{ scope.row[item.key] }}
                                <el-tooltip v-if="scope.row.val4 == '100%' && item.tips" class="item" effect="dark"
                                    content="排名在前80%以外" placement="top">
                                    <img class="tips-icon" src="../../../assets/tips.png" alt
                                        style="width: 32px; height: 24px" />
                                </el-tooltip>
                                <el-tooltip v-if="scope.row.val5 == '100%' && item.tips2" class="item" effect="dark"
                                    content="排名在前80%以外" placement="top">
                                    <img class="tips-icon" src="../../../assets/tips.png" alt
                                        style="width: 32px; height: 24px" />
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card shadow="hover" class="card3">
                <div class="score-title" style="margin-bottom: 36px">{{ $t('loan_detail_sqxx') }}</div>
                <el-table :data="tableData2" style="width: 100%" :border="true"
                    :row-style="{ height: '50px', 'font-size': '14px' }">
                    <el-table-column :prop="item.key" :label="item.label" v-for="item in colunm2" :key="item.key">
                        <template slot-scope="scope">
                            <div style="font-size: 14px; text-align: center; height: 30px; line-height: 30px">{{
                                scope.row[item.key]
                                }}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="tableData3" style="width: 100%" :border="true"
                    :row-style="{ height: '50px', 'font-size': '14px' }">
                    <el-table-column :prop="item.key" :label="item.label" v-for="item in colunm3" :key="item.key">
                        <template slot-scope="scope">
                            <div style="font-size: 14px; text-align: center; height: 30px; line-height: 30px">{{
                                scope.row[item.key]
                                }}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="tableData4" style="width: 100%" :border="true"
                    :row-style="{ height: '50px', 'font-size': '14px' }">
                    <el-table-column :prop="item.key" :label="item.label" v-for="item in colunm4" :key="item.key">
                        <template slot-scope="scope">
                            <div style="font-size: 14px; text-align: center; height: 30px; line-height: 30px">{{
                                scope.row[item.key]
                                }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <!-- 非亚马逊店铺 -->
        <div v-show="!isAmazon">

            <div class="tips" v-if="sanplData[sanplDataIndex].isWarning">
                <img class="tips-icon" src="../../../assets/tips.png" alt />
                {{ sanplData[sanplDataIndex].tips }}
            </div>
            <div class="no-amazon">
                <el-card class="card-no-amazon">
                    <div class="no-amazon-left">
                        <div class="no-amazon-title">{{ $t('loan_detail_dpxx') }}</div>
                        <div class="no-amazon-content">
                            <el-descriptions :column="showOne">
                                <el-descriptions-item :label="$t('loan_detail_dpid')">{{
                                    sanplData[sanplDataIndex].sellerId ||
                                    '--'
                                }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_pingtai')">{{
                                    sanplData[sanplDataIndex].shopTypeName || '--'
                                    }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_dpofferid')">{{ weekLineChartData.offerId
                                    || '--'
                                    }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_dpmc')">{{
                                    sanplData[sanplDataIndex].shopName || '--'
                                    }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_ksdc')">{{
                                    (sanplData[sanplDataIndex].amazonTenure) ? (sanplData[sanplDataIndex].amazonTenure)
                                        +
                                        '天' : '--' }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_gfpl')">{{
                                    sanplData[sanplDataIndex].salesStabilityScore || '--' }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_zdxx')">{{ sanplData[sanplDataIndex].site
                                    ?
                                    sanplData[sanplDataIndex].site : '--'
                                    }}</el-descriptions-item>
                                <el-descriptions-item :label="$t('loan_detail_zxkcjz')">{{
                                    sanplData[sanplDataIndex].latestFbaInventoryValue ?
                                        sanplData[sanplDataIndex].latestFbaInventoryValue
                                        + '元' : '--'
                                }}</el-descriptions-item>

                            </el-descriptions>
                            <div class="no-amazon-desc">
                                <div class="no-amazon-desc-title">
                                    {{ $t('loan_detail_ptxs') }}
                                </div>
                                <div class="no-amazon-desc-score">{{ sanplData[sanplDataIndex].platformCoefficient ||
                                    '--'
                                    }}</div>
                                <!-- <div>{{ $t('loan_detail_gxsj') }}：2022-02-11
                            </div> -->
                                <!-- <div>{{$t('loan_detail_gxsj') }}：2022-02-11</div> -->

                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card class="card-no-amazon">
                    <div class="no-amazon-left">
                        <div class="no-amazon-title">{{ $t('loan_detail_zjlzxs') }}</div>
                        <div id="weekChartsNotAmazon" style="height: 300px; width: 100%;top:45px"></div>
                    </div>
                </el-card>
            </div>
            <div class="no-amazon">
                <el-card class="card-no-amazon">
                    <div class="no-amazon-left">
                        <div class="no-amazon-title" style="margin-top: 10px;">{{ $t('laon_detail_xssj') }}</div>
                        <el-descriptions :column="showColum" class="sale-content">
                            <el-descriptions-item :label="$t('loan_detail_zjygyxs')">{{
                                itemData.month1SalesValue }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zylgyxs')">{{ itemData.month2SalesValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zysgyxs')">{{ itemData.month3SalesValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zyfgyxs')">{{ itemData.month4SalesValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zywgyxs')">{{ itemData.month5SalesValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zysixgyxs')">{{ itemData.month6SalesValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                        </el-descriptions>
                        <div class="no-amazon-total">
                            {{ $t('loan_detail_jlgygmv') }}: {{ sixTotalSales }} {{ $t('common_wy') }}
                        </div>

                    </div>
                </el-card>
                <el-card class="card-no-amazon">
                    <div class="no-amazon-left">
                        <div class="no-amazon-title" style="margin-top: 10px">{{ $t('loan_detail_hksj') }}</div>
                        <el-descriptions :column="showColum" class="sale-content">
                            <el-descriptions-item :label="$t('loan_detail_zjygyhk')">{{
                                itemData.month1DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zjlgyhk')">{{
                                itemData.month2DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zjtgyhk')">{{
                                itemData.month3DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zjfgyhk')">{{
                                itemData.month4DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zjfivegyhk')">{{
                                itemData.month5DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                            <el-descriptions-item :label="$t('loan_detail_zjsixgyhk')">{{
                                itemData.month6DisbursementsValue
                                }}{{ $t('common_yuan2') }}</el-descriptions-item>
                        </el-descriptions>
                        <div class="no-amazon-total">
                            {{ $t('loan_detail_zjgyzhk') }}: {{ sixTotalBack }} {{ $t('common_wy') }}
                        </div>

                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { weekdays } from 'moment';
import xtable from '../Xtable.vue';
export default {
    components: {
        xtable
    },
    props: {
        sanplData: {
            type: Array,
            default: []
        },
        defaultOffer: {
            type: Object,
            default: {}
        },
        //最近六周 折线图数据
        allweekLineChartData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        allweekLineChartData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) { }
        },
        defaultOffer: {
            deep: true,
            // immediate: true,
            handler(newV, oldV) {
                if (!Object.keys(newV).length) {
                    this.showPage = false;
                    return false;
                }
                if (newV) {
                    setTimeout(() => {
                        this.itemData = newV;
                        this.radio1 = newV.tabIndex;
                        this.getOfferInfo(newV.tabIndex);
                    }, 0);
                }
            }
        },
        sanplData: {
            deep: true,
            // immediate: true,
            handler(newV, oldV) {
                if (!newV || !newV.length) {
                    this.showPage = false;
                    return false;
                }
                this.radio1 = 0;
                this.itemData = newV[0];
                this.showPage = true;

                this.$nextTick(() => {
                    this.changeShop(0);
                });
            }
        }
    },
    data() {
        return {
            sixTotalSales: 0,
            sixTotalBack: 0,
            sanplDataIndex: 0,
            noAmazonIndex: 0,
            isAmazon: true,
            isShowAmazon: ['Amazon', 'Walmart', 'Tiktok', 'eBay'],
            showOne: 1,
            showColum: 2,
            openDelay: 500,
            weekLineChartData: {},
            chart1: {
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: this.$t('loan_detail_hegui'), max: 20 },
                        { name: this.$t('loan_detail_pl'), max: 20 },
                        { name: this.$t('loan_detail_kc'), max: 20 },
                        { name: this.$t('loan_detail_zz'), max: 20 },
                        { name: this.$t('loan_detail_huikuan'), max: 20 }
                    ]
                },
                series: [
                    {
                        label: {
                            show: true
                        },
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: []
                            }
                        ]
                    }
                ]
            },
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
            showPage: false,
            itemData: {},
            radio1: 0,
            tableData: [
                {
                    head: this.$t('loan_detail_tkl'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                },
                {
                    head: this.$t('loan_detail_ddqxl'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                },
                {
                    head: this.$t('loan_detail_cplshort'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                },
                {
                    head: this.$t('loan_detail_ycpsl'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                },
                {
                    head: this.$t('laon_detail_jgcsl'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                },
                {
                    head: this.$t('loan_detai_qxl'),
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: ''
                }
            ],
            tableData2: [
                {
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: '',
                    val6: '',
                    val7: '',
                }
            ],
            tableData3: [
                {
                    val1: '',
                    val2: '',
                    val3: '',
                    val4: '',
                    val5: '',
                    val6: '',
                    val7: '',
                }
            ],
            tableData4: [
                {
                    val1: '',
                    val2: '',
                    val3: '',
                }
            ],
            colunm2: [
                {
                    label: this.$t('loan_search_status'),
                    key: 'val1'
                },
                {
                    label: this.$t('loan_detail_xy'),
                    key: 'val2'
                },
                {
                    label: this.$t('loan_detail_nxt'),
                    key: 'val3'
                },
                {
                    label: this.$t('loan_detail_zxfba'),
                    key: 'val4'
                },
                {
                    label: this.$t('loan_detail_fbajsy'),
                    key: 'val5'
                },
                {
                    label: this.$t('loan_detail_gqotzfba'),
                    key: 'val6'
                },
                {
                    label: this.$t('loan_detail_kczzts'),
                    key: 'val7'
                }
            ],
            colunm3: [
                {
                    label: this.$t('loan_detail_kdj'),
                    key: 'val1'
                },
                {
                    label: this.$t('loan_detail_dds'),
                    key: 'val2'
                },
                {
                    label: this.$t('loan_detail_xswdx'),
                    key: 'val3'
                },
                {
                    label: this.$t('loan_detail_nxsermb'),
                    key: 'val4'
                },
                {
                    label: this.$t('loan_detail_nhkermb'),
                    key: 'val5'
                },
                {
                    label: this.$t('loan_detail_xsentb'),
                    key: 'val6'
                },
                {
                    label: this.$t('loan_detail_hkentb'),
                    key: 'val7'
                }
            ],
            colunm4: [
                {
                    label: '  最近3个月的月均回款',
                    key: 'val1'
                },
                {
                    label: '最近6个月的月均回款',
                    key: 'val2'
                },
                {
                    label: '最近1年的月均回款',
                    key: 'val3'
                },
            ],

            colunm: [
                {
                    label: this.$t('loan_detail_dp'),
                    key: 'val1'
                },
                {
                    label: this.$t('loan_detail_hyjz'),
                    key: 'val2'
                },
                {
                    label: this.$t('loan_detail_qzjz'),
                    key: 'val3'
                },
                {
                    label: this.$t('loan_detail_hypm'),
                    key: 'val4',
                    tips: 'true'
                },
                {
                    label: this.$t('loan_detail_qhypm'),
                    key: 'val5',
                    tips2: 'true'
                }
            ],

            options2: {
                grid: {
                    left: '2%',
                    right: '5%',
                    bottom: '22%',
                    containLabel: true
                },
                title: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['店铺销售额', '店铺回款额', '行业销售额', '行业回款额'],
                    selected: {
                        '行业销售额': false,
                        '行业回款额': false
                    }
                },
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                                // console.log(val);
                                return val;
                            }
                        },
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '店铺指标',
                        min: 0,

                        // interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '行业指标',
                        min: 0,

                        // interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        data: [],
                        type: 'line',
                        name: '店铺销售额'
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '店铺回款额'
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '行业销售额',
                        yAxisIndex: 1
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '行业回款额',
                        yAxisIndex: 1
                    }
                ]
            },
            moneyClass: '', //当前offer 六周数据的币种
            weekChartsOptions: {
                grid: {
                    left: '2%',
                    right: '5%',
                    bottom: '22%',
                    containLabel: true
                },
                title: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['销售金额', '回款金额']
                },
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                                // console.log(val);
                                return val;
                            }
                        },
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '店铺指标',
                        min: 0,

                        // interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        data: [],
                        type: 'line',
                        name: '销售金额'
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '回款金额'
                    }
                ]
            },
            weekChartsNotAmazonOptions: {
                grid: {
                    left: '2%',
                    right: '5%',
                    bottom: '22%',
                    containLabel: true
                },
                title: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['销售金额', '回款金额']
                },
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                                // console.log(val);
                                return val;
                            }
                        },
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '店铺指标',
                        min: 0,

                        // interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        data: [],
                        type: 'line',
                        name: '销售金额'
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '回款金额'
                    }
                ]
            }
        };
    },
    methods: {
        changeShop(index) {
            if (this.isShowAmazon.indexOf(this.sanplData[index].shopTypeName) != -1) {
                this.$nextTick(() => {
                    this.getWeekChants(index); //最近六周折线图和雷达图的方法
                    this.getOfferInfo(index);
                    this.isAmazon = true
                })
            } else {
                this.sanplDataIndex = index
                this.allweekLineChartData.riskReports.forEach((item) => {
                    if (item.offerId == this.sanplData[index].offerId) {
                        this.itemData = this.sanplData[index]
                        this.noAmazonIndex = index
                        this.weekLineChartData = item;
                    }
                });
                this.sixTotalSales = ((Number(this.itemData.month1SalesValue) +
                    Number(this.itemData.month2SalesValue) +
                    Number(this.itemData.month3SalesValue) +
                    Number(this.itemData.month4SalesValue) +
                    Number(this.itemData.month5SalesValue) +
                    Number(this.itemData.month6SalesValue)) / 10000).toFixed(2)
                this.sixTotalBack = ((Number(this.itemData.month1DisbursementsValue) +
                    Number(this.itemData.month2DisbursementsValue) +
                    Number(this.itemData.month3DisbursementsValue) +
                    Number(this.itemData.month4DisbursementsValue) +
                    Number(this.itemData.month5DisbursementsValue) +
                    Number(this.itemData.month6DisbursementsValue)) / 10000).toFixed(2)
                // this.$nextTick(() => {
                this.getWeekChantsNot(this.noAmazonIndex)
                // })

                this.isAmazon = false

            }
        },
        //最近六周折线图和雷达图的方法
        getWeekChants(index) {
            this.weekChartsOptions.series[0].data = [];
            this.weekChartsOptions.series[1].data = [];
            this.weekChartsOptions.xAxis[0].data = [];
            //offerid对比  取六周折线图数据
            this.allweekLineChartData.riskReports.forEach((item) => {
                if (item.offerId == this.sanplData[index].offerId) {
                    this.weekLineChartData = item;
                }
            });
            // 得 x轴日期
            for (let i = 0; i < 6; i++) {
                this.weekChartsOptions.xAxis[0].data.unshift(this.getBeforeDate(i * 7));
            }

            let weeksSales = [
                'week6SalesValue',
                'week5SalesValue',
                'week4SalesValue',
                'week3SalesValue',
                'week2SalesValue',
                'week1SalesValue'
            ];
            let weeksDisbursements = [
                'week6DisbursementsValue',
                'week5DisbursementsValue',
                'week4DisbursementsValue',
                'week3DisbursementsValue',
                'week2DisbursementsValue',
                'week1DisbursementsValue'
            ];
            // 取两个线
            weeksSales.forEach((key) => {
                this.weekChartsOptions.series[0].data.push(this.weekLineChartData.offerDataSetInfo[key]);
            });
            weeksDisbursements.forEach((key) => {
                this.weekChartsOptions.series[1].data.push(this.weekLineChartData.offerDataSetInfo[key]);
            });
            this.moneyClassArr.forEach((item) => {
                if (item.value == this.weekLineChartData.offerDataSetInfo.marketplaceCountry) {
                    this.moneyClass = item.label;
                }
            });
            this.weekChartsOptions.legend.data[0] = `销售金额(${this.moneyClass})`;
            this.weekChartsOptions.series[0].name = `销售金额(${this.moneyClass})`;
            this.weekChartsOptions.legend.data[1] = `回款金额(${this.moneyClass})`;
            this.weekChartsOptions.series[1].name = `回款金额(${this.moneyClass})`;

            //===================六周折线图完事   到    雷达图==========================
            let newV = this.weekLineChartData.riskReportV3ShopScore;
            let hegui =
                Number(newV.warnOrderScore) +
                Number(newV.cancelOrderScore) +
                Number(newV.defectOrderScore) +
                Number(newV.lateOrderScore) +
                Number(newV.returnOrderScore);
            let pingjia = Number(newV.negFeedbackScore) + Number(newV.feedbackOrderScore);
            let kucun = Number(newV.latestfbaScore) + Number(newV.turnsScore);
            let zengzhang = Number(newV.ysalesGrowthScore) + Number(newV.msalesGrowthScore);
            let huikuan = Number(newV.ydisGrowthScore) + Number(newV.mdisGrowthScore) + Number(newV.disRatioScore);
            this.chart1.series[0].data[0].value = [];
            this.chart1.series[0].data[0].value.push(hegui.toFixed(2) || 0);
            this.chart1.series[0].data[0].value.push(pingjia.toFixed(2) || 0);
            this.chart1.series[0].data[0].value.push(kucun.toFixed(2) || 0);
            this.chart1.series[0].data[0].value.push(zengzhang.toFixed(2) || 0);
            this.chart1.series[0].data[0].value.push(huikuan.toFixed(2) || 0);
            this.$nextTick(() => {
                let dom = document.getElementById('weekCharts');
                let myChart = this.$echarts.init(dom);
                myChart.setOption(this.weekChartsOptions);
                let dom2 = document.getElementById('charts');
                let myChart2 = this.$echarts.init(dom2);
                myChart2.setOption(this.chart1);
            });
        },
        //最近六周折线图和雷达图的方法--非亚马逊
        getWeekChantsNot(index) {
            this.weekChartsNotAmazonOptions.series[0].data = [];
            this.weekChartsNotAmazonOptions.series[1].data = [];
            this.weekChartsNotAmazonOptions.xAxis[0].data = [];
            //offerid对比  取六周折线图数据
            this.allweekLineChartData.riskReports.forEach((item) => {
                if (item.offerId == this.sanplData[index].offerId) {
                    this.weekLineChartData = item;
                }
            });
            // 得 x轴日期
            for (let i = 1; i < 7; i++) {
                this.weekChartsNotAmazonOptions.xAxis[0].data.unshift(this.getBeforeDate(i * 7));
            }

            let weeksSales = [
                'week6SalesValue',
                'week5SalesValue',
                'week4SalesValue',
                'week3SalesValue',
                'week2SalesValue',
                'week1SalesValue'
            ];
            let weeksDisbursements = [
                'week6DisbursementsValue',
                'week5DisbursementsValue',
                'week4DisbursementsValue',
                'week3DisbursementsValue',
                'week2DisbursementsValue',
                'week1DisbursementsValue'
            ];
            // 取两个线
            weeksSales.forEach((key) => {
                this.weekChartsNotAmazonOptions.series[0].data.push(this.weekLineChartData.offerDataSetInfo[key]);
            });
            weeksDisbursements.forEach((key) => {
                this.weekChartsNotAmazonOptions.series[1].data.push(this.weekLineChartData.offerDataSetInfo[key]);
            });
            this.moneyClassArr.forEach((item) => {
                if (item.value == this.weekLineChartData.offerDataSetInfo.marketplaceCountry) {
                    this.moneyClass = item.label;
                }
            });
            this.weekChartsNotAmazonOptions.legend.data[0] = `销售金额(${this.moneyClass})`;
            this.weekChartsNotAmazonOptions.series[0].name = `销售金额(${this.moneyClass})`;
            this.weekChartsNotAmazonOptions.legend.data[1] = `回款金额(${this.moneyClass})`;
            this.weekChartsNotAmazonOptions.series[1].name = `回款金额(${this.moneyClass})`;


            this.$nextTick(() => {
                let dom = document.getElementById('weekChartsNotAmazon');
                let myChart = this.$echarts.init(dom);
                myChart.setOption(this.weekChartsNotAmazonOptions);
            });
        },
        getOfferInfo(index) {
            this.itemData = this.sanplData[index];
            if (this.sanplData[index].monthMap) {
                this.options2.xAxis[0].data = [];
                for (let i = 1; i <= 12; i++) {
                    this.options2.xAxis[0].data.push(this.sanplData[index].monthMap[`month${i}`]);
                }
            } else {
                this.options2.xAxis[0].data = [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                ];
            }

            this.options2.series[0].data = [];
            this.options2.series[1].data = [];
            this.options2.series[2].data = [];
            this.options2.series[3].data = [];
            for (let i = 1; i <= 12; i++) {
                this.options2.series[0].data.unshift(this.itemData[`month${i}SalesValue`] || 0);
                this.options2.series[1].data.unshift(this.itemData[`month${i}DisbursementsValue`] || 0);
                this.options2.series[2].data.unshift(this.itemData[`month${i}SalesValueIndustry`] || 0);
                this.options2.series[3].data.unshift(this.itemData[`month${i}DisbursementsValueIndustry`] || 0);
            }
            console.log(this.options2.series[0].data);
            console.log(this.itemData.currSellerScore);
            if (this.itemData.shopMetricsVoMap.shop) {
                this.tableData[0].val1 = (this.itemData.shopMetricsVoMap.shop.returnOrder * 100).toFixed(2) + '%';
                this.tableData[1].val1 = (this.itemData.shopMetricsVoMap.shop.orderDefects * 100).toFixed(2) + '%';
                this.tableData[2].val1 = (this.itemData.shopMetricsVoMap.shop.negFeedback * 100).toFixed(2) + '%';
                this.tableData[3].val1 = (this.itemData.shopMetricsVoMap.shop.lateShipments * 100).toFixed(2) + '%';
                this.tableData[4].val1 = (this.itemData.shopMetricsVoMap.shop.sellerWarnings * 100).toFixed(2) + '%';
                this.tableData[5].val1 = (this.itemData.shopMetricsVoMap.shop.cancelOrder * 100).toFixed(2) + '%';
            }

            if (this.itemData.shopMetricsVoMap.industry) {
                this.tableData[0].val2 = (this.itemData.shopMetricsVoMap.industry.returnOrder * 100).toFixed(2) + '%';
                this.tableData[1].val2 = (this.itemData.shopMetricsVoMap.industry.orderDefects * 100).toFixed(2) + '%';
                this.tableData[2].val2 = (this.itemData.shopMetricsVoMap.industry.negFeedback * 100).toFixed(2) + '%';
                this.tableData[3].val2 = (this.itemData.shopMetricsVoMap.industry.lateShipments * 100).toFixed(2) + '%';
                this.tableData[4].val2 = (this.itemData.shopMetricsVoMap.industry.sellerWarnings * 100).toFixed(2) + '%';
                this.tableData[5].val2 = (this.itemData.shopMetricsVoMap.industry.cancelOrder * 100).toFixed(2) + '%';
            }

            if (this.itemData.shopMetricsVoMap.allIndustry) {
                this.tableData[0].val3 = (this.itemData.shopMetricsVoMap.allIndustry.returnOrder * 100).toFixed(2) + '%';
                this.tableData[1].val3 = (this.itemData.shopMetricsVoMap.allIndustry.orderDefects * 100).toFixed(2) + '%';
                this.tableData[2].val3 = (this.itemData.shopMetricsVoMap.allIndustry.negFeedback * 100).toFixed(2) + '%';
                this.tableData[3].val3 = (this.itemData.shopMetricsVoMap.allIndustry.lateShipments * 100).toFixed(2) + '%';
                this.tableData[4].val3 = (this.itemData.shopMetricsVoMap.allIndustry.sellerWarnings * 100).toFixed(2) + '%';
                this.tableData[5].val3 = (this.itemData.shopMetricsVoMap.allIndustry.cancelOrder * 100).toFixed(2) + '%';
            }

            if (this.itemData.shopMetricsVoMap.allIndustryRanking) {
                this.tableData[0].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.returnOrder || '0' + '%';
                this.tableData[1].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.orderDefects || '0' + '%';
                this.tableData[2].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.negFeedback || '0' + '%';
                this.tableData[3].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.lateShipments || '0' + '%';
                this.tableData[4].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.sellerWarnings || '0' + '%';
                this.tableData[5].val4 = this.itemData.shopMetricsVoMap.allIndustryRanking.cancelOrder || '0' + '%';
            }

            if (this.itemData.shopMetricsVoMap.allSiteRanking) {
                this.tableData[0].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.returnOrder || '0' + '%';
                this.tableData[1].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.orderDefects || '0' + '%';
                this.tableData[2].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.negFeedback || '0' + '%';
                this.tableData[3].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.lateShipments || '0' + '%';
                this.tableData[4].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.sellerWarnings || '0' + '%';
                this.tableData[5].val5 = this.itemData.shopMetricsVoMap.allSiteRanking.cancelOrder || '0' + '%';
            }

            this.tableData2[0].val1 = this.itemData.sellerStatus;
            this.tableData2[0].val2 = this.itemData.primaryCategory;
            this.tableData2[0].val3 = this.itemData.amazonTenure;
            this.tableData2[0].val4 = Number(this.itemData.latestFbaInventoryValue).toFixed(2) || 'NA';
            this.tableData2[0].val5 = Number(this.itemData.last3MonthFbaInventoryValue).toFixed(2) || 'NA';
            this.tableData2[0].val6 = this.itemData.last13WeekFbaRate;
            this.tableData2[0].val7 = this.itemData.turnoverDays;

            this.tableData3[0].val1 = this.itemData.unitPrice;
            this.tableData3[0].val2 = this.itemData.ttmOrders;
            this.tableData3[0].val3 = this.itemData.salesStabilityScore;
            this.tableData3[0].val4 = this.itemData.year1SalesValue == 'NA' ? 'NA' : Number(this.itemData.year1SalesValue).toFixed(2);
            this.tableData3[0].val5 = this.itemData.year1DisbursementsValue == 'NA' ? 'NA' : Number(this.itemData.year1DisbursementsValue).toFixed(2);
            this.tableData3[0].val6 = this.itemData.salesRate == 'NA' ? 'NA' : (this.itemData.salesRate * 100).toFixed(2) + '%';
            this.tableData3[0].val7 = this.itemData.disbursementRate == 'NA' ? 'NA' : (this.itemData.disbursementRate * 100).toFixed(2) + '%';
            this.tableData4[0].val1 = this.itemData.latest3mAvgDisbursementsValue == 'NA' ? 'NA' : Number(this.itemData.latest3mAvgDisbursementsValue).toFixed(2);
            this.tableData4[0].val2 = this.itemData.latest6mAvgDisbursementsValue == 'NA' ? 'NA' : Number(this.itemData.latest6mAvgDisbursementsValue).toFixed(2) || 'NA';
            this.tableData4[0].val3 = this.itemData.latest1yAvgDisbursementsValue == 'NA' ? 'NA' : Number(this.itemData.latest1yAvgDisbursementsValue).toFixed(2) || 'NA';

            this.$nextTick(() => {
                let dom2 = document.getElementById('charts2');
                let myChart2 = this.$echarts.init(dom2);
                myChart2.setOption(this.options2);
            })
        },
        getBeforeDate(n) {
            var d = new Date(this.weekLineChartData.reportDate);

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
        }
    },
    mounted() { }
};
</script>

<style lang='less' scoped>
.tips-icon:hover {
    color: #fe1964 !important;
}

.loaning {

    /deep/.el-table .cell,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
        text-align: center !important;
    }

    .shops {
        margin-top: 10px;

        /deep/.el-card__body {
            padding: 0;
        }

        /deep/.el-radio-button__inner {
            padding: 15px 30px;
        }
    }

    .tips {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        background: rgb(229, 232, 234);
        border-radius: 7px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #fa1c64;
        line-height: 50px;
        display: flex;
        align-items: center;

        .tips-icon {
            width: 32px;
            height: 24px;
            margin-right: 17px;
            margin-left: 21px;
        }
    }

    .card4 {
        width: 66%;

        /deep/ .el-card__body {}
    }

    .card3 {
        border-radius: 10px;
        padding-left: 20px;
        margin-top: 20px;

        .data {
            display: flex;

            .data-item {
                width: 257px;
                height: 115px;
                background: #ffffff;
                box-shadow: 0px 5px 11px 0px rgba(7, 1, 2, 0.14);
                border-radius: 13px;
                padding: 14px 28px;
                box-sizing: border-box;
                margin-right: 13px;

                .item-bottom {
                    margin-top: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .item-icon {
                        width: 21px;
                        height: 15px;
                    }

                    .item-num {
                        font-size: 34px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333333;
                    }
                }

                .item-title {
                    font-size: 17px;
                    font-family: Source Han Sans CN;
                    font-weight: 500;
                    color: #333333;
                }
            }
        }
    }

    .card2 {
        padding-left: 20px;
        width: 49.4%;
        margin-top: 20px;
        height: 288px;
        border-radius: 10px;

        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;

        .pay-info {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;
            line-height: 33px;
            margin-top: 30px;
            display: block;
        }

        .order-info {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .info {
                padding-left: 40px;
                border-left: 1px solid #999;
                width: 55%;
                display: flex;
                flex-direction: column;

                .info-item {
                    font-size: 15px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #999999;
                    line-height: 21px;
                }
            }

            .money {
                display: flex;
                flex-direction: column;

                .money-num {
                    font-size: 22px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #ec1c5f;
                    line-height: 19 px;
                }

                .money-title {
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #333333;
                    line-height: 19px;
                    margin-bottom: 5px;
                }
            }
        }
    }

    .score-title {
        margin-bottom: 58px;
        height: 16px;
        font-size: 18px;
        display: block;
        line-height: 16px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #333333;
        padding-left: 9px;
        border-left: 3px solid #fe0255;
    }

    .card1 {
        width: 49.4%;
        margin-top: 20px;

        height: 288px;
        border-radius: 10px;
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;

        .shop-info-box {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .shop-info-item {
                width: 207px;
                // width: 237px;
                height: 113px;
                background: #f5f3f3;
                border-radius: 13px;
                margin-left: 21px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;

                .info-item-num {
                    font-size: 24px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #fa1c64;
                    padding-top: 20px;
                }

                .info-item-title {
                    font-size: 17px;
                    font-family: Source Han Sans CN;
                    font-weight: 600;
                    color: #333333;
                }

                .info-item-icon {
                    width: 21px;
                    height: 21px;
                    position: absolute;
                    left: 5px;

                    top: 23px;
                }
            }
        }

        .score-box {
            display: flex;
            justify-content: space-between;

            .score-info {
                margin-right: 20px;

                .score-time {
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    bottom: 34px;
                    left: 43px;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #333333;
                    line-height: 25px;
                    width: 35%;
                }

                .score-num {
                    display: flex;
                    align-items: center;

                    .history-score {
                        font-size: 18px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #ec1c5f;
                        padding-top: 16px;
                        padding-left: 2px;
                    }

                    .score {
                        font-size: 48px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 25px;
                    }
                }
            }
        }
    }

    .no-amazon {
        display: flex;
        justify-content: space-between;
        background: rgb(238, 238, 238);
        margin-top: 20px;

        .card-no-amazon {
            border-radius: 10px;
            width: 49%;

            .no-amazon-left {
                padding: 0px 20px 20px 20px;
                background: #fff;

                .no-amazon-title {
                    // margin-bottom: 20px;
                    height: 16px;
                    font-size: 18px;
                    display: block;
                    line-height: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #333333;
                    padding-left: 9px;
                    border-left: 3px solid #fe0255;
                }

                .sale-content {
                    margin-top: 30px;

                    /deep/ tbody {
                        height: 45px;
                    }
                }

                .no-amazon-content {
                    display: flex;
                    // justify-content: space-between;
                    margin-top: 15px;

                    .el-descriptions {
                        width: 75%;

                        /deep/ tbody {
                            height: 40px;
                        }
                    }

                    .no-amazon-desc {
                        flex-direction: column;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        gap: 25px;

                        .no-amazon-desc-title {
                            font-size: 20px;
                            font-weight: 550;
                            text-align: center;
                        }

                        .no-amazon-desc-score {
                            font-size: 24px;
                            font-weight: 550;
                        }
                    }

                }

                .no-amazon-total {
                    margin-top: 10px;
                    font-size: 16px;
                    color: red;
                }

                /deep/ .el-descriptions-item__label {
                    font-size: 14px;
                }

                /deep/ .el-descriptions-item__content {
                    font-size: 14px;
                }

            }
        }

    }
}
</style>