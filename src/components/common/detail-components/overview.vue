<template>
    <div class="overview">
        <div style="display:flex; justify-content: space-between;">
            <el-card shadow="hover" class="card1">
                <div class="score-box">
                    <div class="score-info">
                        <span class="score-title">{{ $t('loan_detail_mjpf') }}</span>
                        <div class="score-num">
                            <span class="score">{{ shopreportData.scoreSum }}</span>
                            <span class="history-score">
                                <i v-if="Number(shopreportData.scoreSum - totalData.lastSellerScore) > 0"
                                    class="el-icon-top"></i>
                                <i v-else class="el-icon-bottom"></i>
                                {{ (shopreportData.scoreSum - totalData.lastSellerScore).toFixed(2) }}
                            </span>
                        </div>
                        <div class="score-time">{{ $t('loan_detail_gxsj') }}：{{ totalData.reportDate || '-' }}</div>
                    </div>
                    <div id="charts" style="height:245px;width:50%;margin-bottom:20px"></div>
                </div>
            </el-card>
            <el-card shadow="hover" class="card2" style="padding-left: 0px;">
                <span class="score-title" style="margin-bottom:8px;">{{ totalData.lenderProduct || '' }}</span>
                <div style="border-bottom:1px solid #999;"></div>
                <div class="order-info">
                    <div class="money">
                        <span class="money-title">{{ $t('loan_detail_sxzed') }}</span>
                        <span class="money-num" style="margin-bottom:10px">
                            <span style="padding-right:5px">¥</span>
                            {{ totalData.creditAmount || '-' }}
                        </span>
                        <span class="money-title">{{ $t('loan_detail_ktxzed') }}</span>
                        <span class="money-num" style="margin-bottom:10px">
                            <span style="padding-right:5px">¥</span>
                            {{ (totalData.availableAmount || 0).toFixed(2) || '-' }}
                        </span>
                        <span class="money-title">{{ $t('loan_detail_zdje') }}）</span>
                        <span class="money-num">
                            <span style="padding-right:5px">¥</span>
                            {{ totalData.loanBalance || '-' }}
                            <!-- <i v-if="totalData.loanBalance " class="el-icon-arrow-right"></i> -->
                        </span>
                    </div>
                    <div class="info">
                        <span class="info-item">{{ $t('loan_search_zjf') }}：{{ totalData.lenderName || '-' }}</span>
                        <span class="info-item">{{ $t('loan_detail_rate') }}：{{ totalData.interestRate || '-' }}</span>
                        <span class="info-item">{{ $t('loan_detail_hkfs') }}：{{ totalData.repaymentMethod ==
                            'EQUAL_PRINCIPAL_AND_INTEREST' ?
                            '等额本金'
                            :
                            totalData.repaymentMethod == 'EQUAL_PRINCIPAL' ? '等额本息' : totalData.repaymentMethod ==
                                'BEFORE_INTEREST_AFTER_PRINCIPAL' ? '先息后本' : totalData.repaymentMethod == 'LOAN_AND_RETURN'
                                ?
                                '随借随还' : totalData.repaymentMethod == 'FLEXIBLE_REPAYMENT' ? '灵活还款' : '' ||
                                    '-' }}</span>
                        <span class="info-item">{{ $t('loan_detail_dbf') }}：{{ totalData.gcName || '-' }}</span>
                        <span class="info-item">{{ $t('loan_detail_fl') }}：{{ totalData.guaranteeRate || '-' }}</span>
                        <span class="info-item">{{ $t('loan_detail_fllx') }}：{{ totalData.gcpFeeType || '-' }}</span>
                        <span class="info-item">{{ $t('loan_search_sxrq') }}：{{ totalData.creditDate || '-' }}</span>
                        <span class="info-item">{{ $t('loan_search_sqrq') }}：{{ totalData.applicationTime || '-'
                            }}</span>
                    </div>
                </div>
            </el-card>
        </div>
        <el-card shadow="hover" class="card3">
            <div class="score-title" style="margin-bottom:36px">{{ $t('loan_detail_jjsj') }}</div>
            <div class="data">
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_dpyjgs') }}</span>
                    <div class="item-bottom">
                        <span class="item-num">{{ totalData.abnormalShopCount || '0' }}</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_bddpsl') }}</span>
                    <div class="item-bottom">
                        <span class="item-num">{{ totalData.bindShopCount || '0' }}</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_wlys') }}</span>
                    <div class="item-bottom">
                        <span class="item-num">{{ (totalData.futureReceivablesLoanBalance * 100).toFixed(2) }}%</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_kczd') }}</span>
                    <div class="item-bottom">
                        <span class="item-num">{{ totalData.futureReceivablesFbaLoanBalance || 0 }}</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_zxjeyhke') }}</span>
                    <div class="item-bottom">
                        <span class="item-num"> {{ (totalData.creditAmountDisbursementsValue * 100).toFixed(2)
                            }}%</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
                <div class="data-item">
                    <span class="item-title">{{ $t('loan_detail_zdyeyhke') }}</span>
                    <div class="item-bottom">
                        <span class="item-num">{{ (totalData.loanBalanceDisbursementsValue * 100).toFixed(2) }}%</span>
                        <img class="item-icon" src="../../../assets/d-icon1.png" alt />
                    </div>
                </div>
            </div>
        </el-card>
        <div style="display:flex; justify-content: space-between;">
            <el-card shadow="hover" class="card2">
                <span class="score-title" style="margin-bottom:8px;">{{ $t('loan_detail_zfsj') }}</span>
                <span class="pay-info">{{ $t('home_zfgs') }}：{{ totalData.paymentName || '-' }}</span>
                <span class="pay-info">{{ $t('loan_detail_xse') }}：{{ (totalData.saleValueSum / 10000).toFixed(2) || '-'
                    }}{{ $t('loan_detail_wrmb') }}</span>
                <span class="pay-info">{{ $t('loan_detail_hke') }}：{{ (totalData.disbursementsValueSum /
                    10000).toFixed(2)
                    || '-' }}{{
                        $t('loan_detail_wrmb') }}</span>
            </el-card>
            <div class="card4">
                <el-card shadow="hover" class="card1 card4" style="width:100%">
                    <div class="score-title" style="margin-bottom:0">{{ $t('loan_detail_sydpjgyxs') }}</div>
                    <div id="charts2" style="height:300px;width:100%;"></div>
                </el-card>
            </div>
        </div>

        <el-card shadow="hover" class="card3">
            <div class="score-title" style="margin-bottom:36px">{{ $t('loan_detail_sqxx') }}</div>
            <xtable :isShowIndex="true" :columns="columns" :detailTable="true"
                :tableData="totalData.applicationOfferVoList" @edit="shopInfoEvent" />
            <div style="display: flex; gap: 40px; font-weight: 550; font-size: 16px;">
                <div>{{ $t('loan_detail_zjsgyyjhk') }}: {{ threeTotal }}{{
                    $t('common_yuan2') }}</div>
                <div>{{ $t('loan_detail_zjlgyyjhk') }} {{ sixTotal }}{{ $t('common_yuan2') }} </div>
                <div>{{ $t('loan_detail_zjynyjhk') }} {{ yearTotal }}{{ $t('common_yuan2') }}</div>
            </div>
        </el-card>
        <el-card shadow="hover" class="card3">
            <div class="score-title" style="margin-bottom:36px">{{ $t('loan_detail_dkxx') }}</div>
            <div>

                <el-button type="primary" @click="dialogFormVisible = true"
                    style="height:30px;float:right;margin-bottom:10px"
                    v-if="pageData.applicationStatus === 'DISBURSED' && $showBtn('CREATE_LOAN')">新增贷款单</el-button>
                <el-button type="primary" @click="showWalmart"
                    style="height:30px;float:right;margin-bottom:10px;margin-right: 20px;"
                    v-if="isWalmart">walmart贷款单</el-button>
            </div>
            <xtable :columns="columns2" :detailTable="true" :tableData="totalData.loanVoList || []" @edit="quote" />
        </el-card>
        <el-dialog title="结清" :visible.sync="dialogVisible" width="14%" style="margin-top:20vh" @closed="removeEndDate">
            <el-date-picker v-model="endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择结清日期"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = fasle">取 消</el-button>
                <el-button type="primary" @click="_clearLoan">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增贷款单" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left:20px" label-width="150px"
                label-position="left">
                <el-form-item label="贷款通过时间" style="margin-right:30px" prop="creditApprovalTime">
                    <el-date-picker v-model="form.loanApplyDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="贷款时间" style="margin-right:30px" prop="dates">
                    <el-date-picker v-model="dates" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="担保公司" style="margin-right:30px" prop="creditAmount">
                    <el-select v-model="form.guarantorCompanyId" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in options" :key="item.id" :label="item.gcName"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同编号" style="margin-right:30px" prop="creditAmount">
                    <el-input v-model="form.contractNumber" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="期限" style="margin-right:30px" prop="creditAmount">
                    <el-input v-model="form.loanPeriod" autocomplete="off" type="number" style="width:200px">
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="dateDefaultValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="贷款金额" style="margin-right:30px" prop="creditAmount">
                    <el-input v-model="form.loanAmount" autocomplete="off" type="number" style="width:200px">
                        <el-button slot="append" icon="el-icon-lx-lock">万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="利率" style="margin-right:30px" prop="interestRate">
                    <el-input v-model="form.apr" autocomplete="off" type="number" style="width:200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保费" style="margin-right:30px" prop="interestRate">
                    <el-input v-model="form.guarantorFee" autocomplete="off" type="number" style="width:200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保费率" style="margin-right:30px" prop="interestRate">
                    <el-input v-model="form.guarantorFeeRate" autocomplete="off" style="width:200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="币种" style="margin-right: 30px" prop="currency">
                    <el-select v-model="form.currency" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="addOrder" style="width:80px;height:35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :before-close="colseShowWalmart" title="walmart贷款信息" :visible.sync="walmartDialog" width="80%">
            <xtable :columns="columns3" :detailTable="true" :tableData="walmartData || []" />

        </el-dialog>
    </div>
</template>

<script>
import xtable from '../Xtable.vue';
import { clearLoan, companyAll, loanSave, deleteLoan, isWalmart, getWalmart,deleteForOverview } from '../../../api/index';

export default {
    components: {
        xtable
    },
    props: {
        pageData: {
            type: Object,
            default: {}
        },
        shopreportData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        shopreportData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                let hegui = Number(newV.warnOrderScore) + Number(newV.cancelOrderScore) + Number(newV.defectOrderScore) + Number(newV.lateOrderScore) + Number(newV.returnOrderScore)
                let pingjia = Number(newV.negFeedbackScore) + Number(newV.feedbackOrderScore)
                let kucun = Number(newV.latestfbaScore) + Number(newV.turnsScore)
                let zengzhang = Number(newV.ysalesGrowthScore) + Number(newV.msalesGrowthScore)
                let huikuan = Number(newV.ydisGrowthScore) + Number(newV.mdisGrowthScore) + Number(newV.disRatioScore)
                this.chart1.series[0].data[0].value = [];
                this.chart1.series[0].data[0].value.push(hegui.toFixed(2) || 0);
                this.chart1.series[0].data[0].value.push(pingjia.toFixed(2) || 0);
                this.chart1.series[0].data[0].value.push(kucun.toFixed(2) || 0);
                this.chart1.series[0].data[0].value.push(zengzhang.toFixed(2) || 0);
                this.chart1.series[0].data[0].value.push(huikuan.toFixed(2) || 0);
                this.refCharts();
            }
        },
        pageData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                if (newV.monthMap) {
                    this.options2.xAxis[0].data = [];
                    for (let i = 1; i <= 12; i++) {
                        this.options2.xAxis[0].data.push(newV.monthMap[`month${i}`]);
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
                if (newV.applicationOfferVoList) {
                    this.sixTotal = 0;
                    this.threeTotal = 0;
                    this.yearTotal = 0
                    newV.applicationOfferVoList.forEach((item) => {
                        item.score = item.currSellerScore - item.lastSellerScore;
                        this.threeTotal = Number(this.threeTotal) + Number(item.latest3mAvgDisbursementsValue)
                        this.threeTotal = this.threeTotal.toFixed(2)
                        this.sixTotal = Number(this.sixTotal) + Number(item.latest6mAvgDisbursementsValue)
                        this.sixTotal = this.sixTotal.toFixed(2)
                        this.yearTotal = Number(this.yearTotal) + Number(item.latest1yAvgDisbursementsValue)
                        this.yearTotal = this.yearTotal.toFixed(2)

                    });
                }
                this.form.applicationCode = this.$route.query.loanNumber;
                this.totalData = newV;

                if (newV.dataBoardOfferDTO) {
                    this.refCharts();
                }
            }
        }
    },
    data() {
        return {
            walmartData: [],
            walmartDialog: false,
            isWalmart: false,
            dateOptions: [
                {
                    value: 'D',
                    label: '日'
                },
                {
                    value: 'M',
                    label: '月'
                },
                {
                    value: 'Y',
                    label: '年'
                }
            ],
            dateDefaultValue: 'M',
            threeTotal: 0,
            sixTotal: 0,
            yearTotal: 0,
            dialogFormVisible: false,
            form: {
                //新增贷款单
                loanPeriod: '',
                apr: '',
                loanApplyDate: '',
                loanStartDate: '',
                loanEndDate: '',
                loanAmount: '',
                guarantorFee: '',
                guarantorFeeRate: '',
                contractNumber: '',
                applicationCode: '',
                currency: ''
            },
            row: {},
            endDate: '',
            dialogVisible: false,
            totalData: {},

            columns: [
                {
                    label: 'offer ID',
                    prop: 'offerId',
                    width: '335'
                },
                {
                    label: this.$t('loan_detail_shouquansj'),
                    prop: 'authorizeTime',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_tablet'),
                    prop: 'latest3mAvgDisbursementsValue',
                    width: 160

                },
                {
                    label: this.$t('loan_detail_tablets'),
                    prop: 'latest6mAvgDisbursementsValue',
                    width: 160

                },
                {
                    label: this.$t('loan_detail_tabley'),
                    prop: 'latest1yAvgDisbursementsValue',
                    width: 160

                },
                {
                    label: this.$t('loan_detail_jotgyxse'),
                    prop: 'year1SalesValue',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_jotgyhke'),
                    prop: 'year1DisbursementsValue',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_zxfbakc'),
                    prop: 'latestFbaInventoryValue',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_sdrjz'),
                    prop: 'sde'
                },
                {
                    label: this.$t('loan_detail_ldgz'),
                    prop: 'storeValuation'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'sellerStatus'
                },
                {
                    label: this.$t('loan_detail_dqdppf'),
                    prop: 'currSellerScore',
                    score: true
                },
                {
                    label: this.$t('loan_search_cz'),
                    width: 120,
                    prop: '',
                    operates: [
                        {
                            event: 'toLoanning',
                            text: this.$t('common_see'),
                            type: 'primary'
                        },
                        {
                            event: 'toDelete',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            columns2: [
                {
                    label: this.$t('loan_detail_sqxx'),
                    prop: 'loanApplyDate'
                },
                {
                    label: this.$t('loan_detail_qiri'),
                    prop: 'loanStartDate'
                },
                {
                    label: this.$t('loan_detail_zqy'),
                    prop: 'loanPeriod'
                },
                {
                    label: this.$t('loan_detail_qzr'),
                    prop: 'loanEndDate'
                },
                {
                    label: this.$t('loan_detail_jew'),
                    prop: 'loanAmount'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr'
                },
                {
                    label: this.$t('loan_detail_flbfb'),
                    prop: 'guarantorFeeRate'
                },
                {
                    label: this.$t('loan_detail_fy'),
                    prop: 'guarantorFee'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('status_table_cleared'),
                            type: 'primary'
                        },
                        {
                            event: 'removeLoan',
                            text: this.$t('loan_detail_delete'),
                            type: 'danger'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            columns3: [
                {
                    label: this.$t('loan_detail_sqxx'),
                    prop: 'loanApplyDate'
                },
                {
                    label: this.$t('loan_detail_qiri'),
                    prop: 'loanStartDate'
                },
                {
                    label: this.$t('loan_detail_zqy'),
                    prop: 'loanPeriod'
                },
                {
                    label: this.$t('loan_detail_qzr'),
                    prop: 'loanEndDate'
                },
                {
                    label: "金额（元）",
                    prop: 'loanAmount'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr'
                },
                {
                    label: this.$t('loan_detail_flbfb'),
                    prop: 'guarantorFeeRate'
                },
                {
                    label: this.$t('loan_detail_fy'),
                    prop: 'guarantorFee'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus'
                },
            ],
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
            options: [],
            currencyOptions: [{
                value: 'CNY',
                label: '人民币'
            }, {
                value: 'USD',
                label: '美元'
            }],
            dates: [],
            options2: {
                grid: {
                    left: '2%',
                    right: '3%',
                    bottom: '22%',
                    containLabel: true
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['销售总金额', '回款总金额']
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
                        name: '金额（元）',
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
                        name: '销售总金额'
                    },
                    {
                        data: [],
                        type: 'line',
                        name: '回款总金额'
                    }
                ]
            }
        };
    },
    created() {
        companyAll().then((res) => {
            this.options = res.data;
        });
        this.isShowWalmart()
    },
    methods: {
        isShowWalmart() {
            isWalmart({
                applicationCode: this.$route.query.loanNumber
            }).then(res => {
                this.isWalmart = res.data
            })
        },
        showWalmart() {
            getWalmart({ applicationCode: this.$route.query.loanNumber }).then(res => {
                res.data.forEach(item => {
                    switch (item.loanStatus) {
                        case 'CLEAR':
                            item.loanStatus = '已结清'
                            break;
                        case 'REPAYMENT':
                            item.loanStatus = '还款中'
                            break;
                        case 'OVERDUE':
                            item.loanStatus = '已逾期'
                            break;
                        default:
                            break;
                    }
                })
                this.walmartData = res.data
                this.walmartDialog = true
            })
        },
        colseShowWalmart() {
            this.walmartData = []
            this.walmartDialog = false
        },
        addOrder() {
            this.form.periodUnit = this.dateDefaultValue;
            this.form.loanStartDate = this.dates && this.dates[0] ? this.dates[0] : '';
            this.form.loanEndDate = this.dates && this.dates[1] ? this.dates[1] : '';
            let formData = new FormData();
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key]);
            });

            loanSave(formData).then((res) => {
                this.$message.success('新增成功！');
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
                this.dates = [];
                this.dialogFormVisible = false;
                this.$emit('refreshDetail');
            });
        },
        removeEndDate() {
            this.endDate = '';
        },
        _clearLoan() {
            clearLoan(this.row.id, this.endDate).then((res) => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.row = {};
                this.$emit('refreshDetail');
            });
        },

        quote(event, row, index) {
            if (event === 'removeLoan') {
                this.$confirm('请确定是否删除该贷款单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteLoan(row.id).then((res) => {
                        this.$message.success('删除成功！');
                        this.$emit('refreshDetail');
                    });
                });
            } else {
                this.row = row;
                this.dialogVisible = true;
            }
        },
        shopInfoEvent(event, row, index) {
            if (event == 'toLoanning') {
                this.$emit('toLoanning', row.offerId);
            }
            if (event == 'toDelete') {
                this.$confirm('此操作将删除该Offerld,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteForOverview(row.offerId,this.$route.query.loanNumber).then((res) => {
                        this.$message.success('删除成功！');
                        this.$emit('refreshDetail');
                    });
                });
                
            }
        },
        refCharts() {
            this.options2.series[0].data = [];
            this.options2.series[1].data = [];

            for (let i = 1; i <= 12; i++) {
                this.options2.series[0].data.unshift(this.totalData.dataBoardOfferDTO[`month${i}SalesValue`] || 0);
                this.options2.series[1].data.unshift(this.totalData.dataBoardOfferDTO[`month${i}DisbursementsValue`] || 0);
            }


            let dom2 = document.getElementById('charts2');
            let myChart2 = this.$echarts.init(dom2);
            myChart2.setOption(this.options2);
            let dom = document.getElementById('charts');
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.chart1);
        }
    },
    // deactivated() {
    //     this.sixTotal = 0;
    //     this.threeTotal = 0;
    //     this.yearTotal = 0
    // },
    mounted() {
        this.refCharts();
    }
};
</script>

<style lang='less' scoped>
.overview {
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
                background: #ffffff;
                box-shadow: 0px 5px 11px 0px rgba(7, 1, 2, 0.14);
                border-radius: 13px;
                padding: 14px 28px;
                box-sizing: border-box;
                margin-right: 13px;

                .item-bottom {
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
        width: 32.5%;
        margin-top: 20px;
        height: 271px;
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
                    font-size: 14px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #ec1c5f;
                    line-height: 20px;
                }

                .money-title {
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #333333;
                    line-height: 20px;
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
        width: 66%;
        margin-top: 20px;

        height: 271px;
        border-radius: 10px;
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;

        .score-box {
            display: flex;
            justify-content: space-between;

            .score-info {
                .score-time {
                    position: absolute;
                    bottom: 34px;
                    left: 43px;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #333333;
                    line-height: 25px;
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
                        padding-left: 20px;
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
}
</style>