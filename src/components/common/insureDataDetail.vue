<template>
    <div style="padding-bottom: 100px">
        <el-card style="margin-bottom: 35px; ">
            <div style="display: flex; align-items: center; justify-content: space-between">
                <div style="font-weight:800">
                    交易数据详情
                    <el-date-picker v-model="termSeven"
                        :picker-options="detailTabIndex == 'MONTH' ? pickerOptions : detailTabIndex == 'WEEK' ? pickerOptions3 : pickerOptions2"
                        :type="detailTabIndex == 'MONTH' ? 'monthrange' : 'daterange'" range-separator="至"
                        start-placeholder="开始月份" end-placeholder="结束月份"
                        :value-format="detailTabIndex == 'MONTH' ? 'yyyy-MM' : 'yyyy-MM-dd'" @change="changeDates"
                        :clearable="clearable"></el-date-picker>
                </div>
                <el-radio-group v-model="detailTabIndex" size="25" @change="changeTab">
                    <el-radio-button label="DAY">{{ $t('home_rqs') }}</el-radio-button>
                    <el-radio-button label="WEEK">{{ $t('home_zqs') }}</el-radio-button>
                    <el-radio-button label="MONTH">{{ $t('home_yqs') }}</el-radio-button>
                </el-radio-group>
            </div>
        </el-card>
        <el-card>
            <div style="font-weight: bold; font-size: 15px; margin-bottom: 30px">
                {{ $t('insure_data_ywsjtj') }}
                <div style="float:right">
                    <el-select v-model="tableDataFilter.platform" style="width: 130px; margin-left: 20px"
                        @change="getTabelData(termSeven)">
                        <el-option label="全部平台" value></el-option>
                        <el-option label="Amazon" value="Amazon"></el-option>
                        <el-option label="Wayfair" value="Wayfair"></el-option>
                        <el-option label="HomeDepot" value="HomeDepot"></el-option>
                        <el-option label="Walmart" value="Walmart"></el-option>
                        <el-option label="Overstock" value="Overstock"></el-option>
                        <el-option label="Lowe's" value="Lowe's"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                    <el-select v-model="tableDataFilter.insuranceCode" :placeholder="$t('loan_detail_choose')"
                        style="width: 130px; margin-left: 20px" @change="getTabelData(termSeven)">
                        <el-option label="全部保司" value></el-option>
                        <el-option label="大地" value="DD"></el-option>
                        <el-option label="平安" value="PN"></el-option>
                        <el-option label="史带" value="ST"></el-option>
                        <el-option label="人保" value="RB"></el-option>
                        <el-option label="众安" value="ZA"></el-option>
                    </el-select>
                </div>
            </div>
            <el-table v-loading="loading" :data="tableData" style="width: 100%; margin-bottom: 35px" :border="true"
                :row-style="{ height: '50px', 'font-size': '14px' }">
                <el-table-column prop="head" :label="$t('home_xtime')" width="130px">
                    <template slot-scope="scope">
                        <div style="font-size: 14px; height: 30px; line-height: 30px">{{ scope.row.head }}</div>
                    </template>
                </el-table-column>
                <el-table-column :prop="item.key" :label="item.label" v-for="item in colunm" :key="item.key">
                    <template slot-scope="scope">
                        <div style="font-size: 14px; height: 30px; line-height: 30px">{{ scope.row[item.key] }}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width: 100%; margin-bottom: 35px">
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 10px">{{ $t('insure_data_pjfb') }}</div>
                <div id="detailCharts2" style="height: 550px; width: 100%"></div>
            </div>
            <div style="width: 100%">
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 30px">{{ $t('insure_data_bsfb') }}</div>
                <div id="detailCharts7" style="height: 550px; width: 100%"></div>
            </div>
            <div style="width: 100%;margin-top:30px" v-loading="loadingT">
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 30px">
                    渠道数据统计
                    <div style="float:right">
                        <el-select v-model="channelDataForm.channelType" style="width: 130px; margin-left: 20px"
                            @change="getChannelTableData(termSeven)">
                            <el-option label="市场渠道" value="市场渠道"></el-option>
                            <el-option label="非市场渠道" value="非市场渠道"></el-option>
                            <el-option label="裂变" value="裂变"></el-option>
                            <el-option label="自营" value="自营"></el-option>
                        </el-select>
                        <el-select v-model="channelDataForm.type" :placeholder="$t('loan_detail_choose')"
                            style="width: 130px; margin-left: 20px" @change="getChannelTableData(termSeven)">
                            <el-option label="全部" value></el-option>
                            <el-option label="新渠道" value="新渠道"></el-option>
                            <el-option label="老渠道" value="老渠道"></el-option>
                        </el-select>
                        <el-select v-model="channelDataForm.findType" :placeholder="$t('loan_detail_choose')"
                            style="width: 130px; margin-left: 20px" @change="getChannelTableData(termSeven)">
                            <el-option label="订单数" value="order"></el-option>
                            <el-option label="保费/元" value="amount"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="tt">
                    <div style="overflow-x: scroll;max-width:90%">
                        <div class="table-left">
                            <div class="lie">
                                <div class="cell">
                                    渠道类型
                                    <el-tooltip class="item" effect="dark"
                                        content="新渠道：指渠道首单交易成功时间在2022.6.1后且距离首单12月以内；老渠道：除新渠道外的渠道统称。每周一凌晨2:00更新各渠道类型。"
                                        placement="top">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </div>
                                <div class="cell" v-for="(item, index) in ctItems" :key="index">{{ item.type }}</div>
                            </div>
                            <div class="lie">
                                <div class="cell" style="width:200px">渠道名称</div>
                                <div class="cell" style="width:200px" v-for="(item, index) in ctItems" :key="index">{{
                        item.channelName }}</div>
                            </div>
                            <div class="lie">
                                <div class="cell">渠道码</div>
                                <div class="cell" v-for="(item, index) in ctItems" :key="index">{{ item.channelCode }}
                                </div>
                            </div>
                            <div class="lie" v-for="(val, key, index) in cTableData" :key="index">
                                <div class="cell">{{ key }}</div>
                                <div class="cell" v-for="(val2, key2, index2) in val" :key="index2">{{ val2.monthAmount }}
                                </div>
                            </div>
                        </div>
                        <div class="table-left" style="margin-top:5px">
                            <div class="lie">
                                <div class="cell width pink">累计数据</div>
                                <div class="cell width pink">占比率</div>
                            </div>
                            <div class="lie" v-for="item in monthTotalArr">
                                <div class="cell pink" style="text-align:left">{{ item.sum }}</div>
                                <div class="cell pink">{{ item.rate }}%</div>
                            </div>
                        </div>
                    </div>

                    <div class="table-left" style="margin-left:5px">
                        <div class="lie" style="border-right:none">
                            <div class="cell pink">累计数据</div>
                            <div class="cell pink" v-for="item in channelTotalArr">{{ item }}</div>
                        </div>
                    </div>
                </div>
                <div style="font-size: 14px !important;
    justify-content: center;display: flex;
            align-items: center;margin-top:50px">
                    <el-pagination @current-change="changePage" @size-change="changeSize" background
                        layout="sizes,prev, pager, next" :current-page="channelDataForm.current"
                        :page-size="channelDataForm.size" :total="channelDataForm.total"></el-pagination>
                </div>
            </div>
        </el-card>
        <el-card style="margin-bottom: 35px;margin-top:35px">
            <div style="display: flex; align-items: center; ">
                <div style="font-weight:800">
                    续保率详情
                    <el-date-picker :clearable="false" v-model="xubaoDate" type="monthrange" range-separator="至"
                        start-placeholder="开始月份" end-placeholder="结束月份" :value-format="'yyyy-MM'"
                        @change="getreNewTableData"></el-date-picker>
                </div>
            </div>
        </el-card>
        <div style="width: 100%;margin-top:30px" v-loading="loadingX">
            <el-card style="margin-bottom: 30px;">
                <div
                    style="font-weight: bold; font-size: 15px;display:flex;align-items:center; justify-content: space-between; ">
                    <div style>
                        续保数据统计
                        <el-tooltip class="item" effect="dark" content="月度续保率计算规则：基于去年同期月下成交订单数中，距离保单起期起18个月内已续保的订单数占比。"
                            placement="top">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </div>
                    <el-select v-model="xubaoForm.channelType" style="width: 130px; margin-left: 20px;"
                        @change="getreNewTableData(termSeven)">
                        <el-option label="全部" value></el-option>
                        <el-option label="市场渠道" value="市场渠道"></el-option>
                        <el-option label="非市场渠道" value="非市场渠道"></el-option>
                        <el-option label="裂变" value="裂变"></el-option>
                        <el-option label="自营" value="自营"></el-option>
                    </el-select>
                </div>
                <div class="tt" style="margin-top:35px">
                    <div style="overflow-x: scroll;max-width:80%">
                        <div class="table-left">
                            <div class="lie">
                                <div class="cell"
                                    style="width: 400px;display: flex;justify-content: center;align-items: center; ">
                                    渠道类型</div>
                                <div class="cells">
                                    <div class="lie2">
                                        <div class="cell2 eee" style="width:115px">渠道大类</div>
                                        <div class="cell2" style="width:115px" v-for="(item, index) in renewItems"
                                            :key="index">
                                            {{ item.channelTypeDesc }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 eee" style="width:200px">渠道名称</div>
                                        <div style="width:200px" class="cell2" v-for="(item, index) in renewItems"
                                            :key="index">
                                            {{ item.channelName }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 eee">渠道码</div>
                                        <div class="cell2" v-for="(item, index) in renewItems" :key="index">{{
                        item.channelCode
                    }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="lie" v-for="(val, key, index) in renewTableData" :key="key">
                                <div class="cell first">{{ key.slice(0, 4) + '-' + key.slice(4, 6) }}</div>
                                <div class="cells">
                                    <div class="lie2">
                                        <div class="cell2 eee">{{ (Number(key.slice(0, 4) - 1) + '-' + key.slice(4, 6)) }}</div>
                                        <div class="cell2 eee" v-for="(val2, key2, index2) in val" :key="index2">{{
                        val2.frontAmount }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 blue">{{ key.slice(0, 4) + '-' + key.slice(4, 6) }}</div>
                                        <div class="cell2 blue" v-for="(val2, key2, index2) in val" :key="index2">{{
                        val2.amount
                    }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 yellow">续保率</div>
                                        <div class="cell2 yellow" v-for="(val2, key2, index2) in val" :key="index2">{{
                        val2.rate
                    }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-left" style="margin-top:5px">
                            <div class="lie">
                                <div class="cell pink"
                                    style="width:400px;display: flex;justify-content: center;align-items: center;">累计数据
                                </div>
                            </div>
                            <div class="lie" v-for="(item, key) in renewMonthTotalArr" :key="key">
                                <div class="cells">
                                    <div class="lie2">
                                        <div class="cell2 eee">{{ item.sum2 }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 blue">{{ item.sum }}</div>
                                    </div>
                                    <div class="lie2">
                                        <div class="cell2 yellow">{{ item.sales }}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-left" style="margin-left:5px">
                        <div class="lie">
                            <div class="cell first pink">累计数据</div>
                            <div class="cells">
                                <div class="lie2">
                                    <div class="cell2 eee">
                                        {{ (Number(xubaoDate[0].slice(0, 4)) - 1) + '-' + xubaoDate[0].slice(5, 7) }}至{{ (Number(xubaoDate[1].slice(0, 4)) - 1) + '-' + xubaoDate[1].slice(5, 7) }}
                                    </div>
                                    <div v-for="item in renewTotalArr" :key="item" class="cell2 eee last">{{ item.sum2 }}
                                    </div>
                                </div>
                                <div class="lie2">
                                    <div class="cell2 blue">
                                        {{ (Number(xubaoDate[0].slice(0, 4))) +'-'+xubaoDate[0].slice(5,7)}}至{{(Number(xubaoDate[1].slice(0,4)))+'-'+xubaoDate[1].slice(5,7)}}
                                    </div>
                                    <div v-for="item in renewTotalArr" :key="item" class="cell2 blue last">{{item.sum}}
                                    </div>
                                </div>
                                <div class="lie2">
                                    <div class="cell2 yellow">续保率</div>
                                    <div v-for="item in renewTotalArr" :key="item" class="cell2 yellow last">
                                        {{item.sales}}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="font-size: 14px !important;
    justify-content: center;display: flex;
            align-items: center;margin-top:50px">
                    <el-pagination @size-change="changeSize2" @current-change="changePage2" background
                        layout="sizes,prev, pager, next" :current-page="xubaoForm.current" :page-size="xubaoForm.size"
                        :total="xubaoForm.total"></el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { detailOption9 } from '../common/insureDetail';
import { business, boardChannel, channelTableData, renewTableData } from '../../api/insur';
export default {
    data() {
        return {
            renewTotalArr: [],
            renewMonthTotalArr: [],
            xubaoDate: [],
            monthTotalArr: [],
            renewItems: {},
            renewTableData: [],
            cTableData: [],
            tableDataFilter: {
                platform: '',
                insuranceCode: ''
            },
            channelDataForm: {
                channelType: '市场渠道',
                type: '',
                findType: 'order',
                current: 1,
                size: 10,
                total: 0
            },
            // chooseDates: [],
            chartsDate: [],
            clearable: false,
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
            pickerOptions3: {
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
            loadingT: false,
            loadingX: false,
            termSeven: [],
            ctItems: [],
            detailTabIndex: 'MONTH', //详情tab切换
            colunm: [],
            channelTotalArr: [],
            xubaoForm: {
                channelType: '',
                current: 1,
                size: 10,
                total: 0
            },
            tableData: [
                {
                    head: this.$t('insure_data_dds')
                },
                {
                    head: this.$t('insure_data_bfy')
                },
                {
                    head: this.$t('insure_data_dpgmv')
                },
                {
                    head: this.$t('insure_data_yhs')
                },
                {
                    head: this.$t('insure_data_hyscqds')
                },
                {
                    head: this.$t('insure_data_hyhhrs')
                }
            ]
        };
    },
    computed: {
        // tableData() {
        //     return [
        //         {
        //             head: this.$t('insure_data_dds')
        //         },
        //         {
        //             head: this.$t('insure_data_bfy')
        //         },
        //         {
        //             head: this.$t('insure_data_dpgmv')
        //         },
        //         {
        //             head: this.$t('insure_data_yhs')
        //         }
        //     ]
        // },
    },
    mounted() {
        this.xubaoDate = [this.GetDateStr(-180), this.GetDateStr(0)];
        this.changeTab('MONTH');
        this.getChannelTableData();
        this.getreNewTableData();
    },
    methods: {
        changePage(val) {
            this.channelDataForm.current = val;
            this.getChannelTableData();
        },
        changeSize(val) {
            this.channelDataForm.current = 1;
            this.channelDataForm.size = val;
            this.getChannelTableData();
        },
        changePage2(val) {
            this.xubaoForm.current = val;
            this.getreNewTableData();
        },
        changeSize2(val) {
            this.xubaoForm.current = 1;
            this.xubaoForm.size = val;
            this.getreNewTableData();
        },

        getreNewTableData() {
            this.xubaoForm.startTime = this.xubaoDate[0].slice(0, 7) + '-01';
            this.xubaoForm.endTime = this.xubaoDate[1].slice(0, 7) + '-31';
            this.renewTotalArr = [];
            this.renewMonthTotalArr = [];
            this.loadingX = true;
            renewTableData(this.xubaoForm)
                .then(res => {
                    this.renewItems = res.data.records[Object.keys(res.data.records)[0]];
                    this.xubaoForm.total = res.data.total;
                    this.renewTableData = res.data.records;
                    //横
                    Object.keys(res.data.records).forEach(key => {
                        let t = {
                            sum: 0,
                            sum2: 0
                        };
                        let total = 0;
                        res.data.records[key].forEach(item => {
                            t.sum = Number(t.sum) + Number(item.amount);
                            t.sum2 = Number(t.sum2) + Number(item.frontAmount);
                        });

                        if (t.sum == 0 || t.sum2 == 0) {
                            t.sales = 0;
                        } else {
                            console.log(t.sum, t.sum2);
                            t.sales = ((t.sum / t.sum2) * 100).toFixed(2);
                        }
                        if (res.data.records[key].length) {
                            this.renewMonthTotalArr.push(t);
                        }
                    });
                    //竖
                    this.renewItems.forEach((item, index) => {
                        let t = {
                            sum: 0,
                            sum2: 0,
                            sales: 0
                        };
                        Object.keys(res.data.records).forEach(key => {
                            t.sum = Number(t.sum) + Number(res.data.records[key][index].amount);
                            t.sum2 = Number(t.sum2) + Number(res.data.records[key][index].frontAmount);
                        });
                        if (t.sum == 0 || t.sum2 == 0) {
                            t.sales = 0;
                        } else {
                            t.sales = ((t.sum / t.sum2) * 100).toFixed(2);
                        }

                        this.renewTotalArr.push(t);
                    });
                    let r = {
                        sum: 0,
                        sum2: 0,
                        sales: 0
                    };
                    this.renewTotalArr.forEach(item => {
                        r.sum = Number(r.sum) + Number(item.sum);
                        r.sum2 = Number(r.sum2) + Number(item.sum2);
                    });
                    if (r.sum == 0 || r.sum2 == 0) {
                        r.sales = 0;
                    } else {
                        console.log(r.sum, r.sum2);
                        r.sales = ((Number(r.sum) / Number(r.sum2)) * 100).toFixed(2);
                    }
                    this.renewTotalArr.push(r);
                    this.loadingX = false;
                })
                .catch(err => {
                    this.loadingX = false;
                });
        },
        getChannelTableData() {
            this.loadingT = true;
            let stime = '';
            let etime = '';
            if (this.detailTabIndex == 'MONTH') {
                stime = this.termSeven[0] + '-01';
                let splitArr = this.termSeven[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
            }
            this.channelDataForm.startTime = stime || this.termSeven[0];
            this.channelDataForm.endTime = etime || this.termSeven[1];
            this.channelDataForm.term = this.detailTabIndex;
            this.channelTotalArr = [];
            this.monthTotalArr = [];
            channelTableData(this.channelDataForm)
                .then(res => {
                    this.ctItems = res.data.records[Object.keys(res.data.records)[0]];
                    this.channelDataForm.total = res.data.total;
                    this.cTableData = res.data.records;
                    this.monthTotalArr = []
                    //横
                    Object.keys(res.data.records).forEach(key => {
                        let t = {
                            sum: 0
                        };
                        let total = 0;
                        res.data.records[key].forEach(item => {
                            t.sum = t.sum + Number(item.monthAmount);
                            total = item.totalAmount;
                        });
                        // console.log(t);
                        if (t.sum == 0) {
                            t.rate = 0;
                        } else {
                            t.rate = ((t.sum / total) * 100).toFixed(2);
                        }
                        if (res.data.records[key].length) {
                            this.monthTotalArr.push(t);
                        }
                    });
                    //竖
                    this.channelTotalArr = [];
                    this.ctItems.forEach((item, index) => {
                        let t = 0;
                        Object.keys(res.data.records).forEach(key => {
                            t = t + Number(res.data.records[key][index].monthAmount);
                        });
                        this.channelTotalArr.push(
                            t
                                .toFixed(2)
                                .toString()
                                .split('.')[0]
                        );
                    });
                    this.loadingT = false;
                })
                .catch(err => {
                    this.loadingT = false;
                });
        },
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        },
        getChartsDate(chooseDates) {
            this.loading = true;
            let term = 'year';

            let stime = '';
            let etime = '';
            if (this.detailTabIndex == 'MONTH') {
                stime = this.termSeven[0] + '-01';
                let splitArr = this.termSeven[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
                term = 'year';
            } else if (this.detailTabIndex == 'WEEK') {
                term = 'month';
            } else {
                term = 'seven';
            }
            boardChannel({
                // startTime: dates[0],
                // endTime: dates[1],
                startTime: stime || this.termSeven[0],
                endTime: etime || this.termSeven[1],
                term
            }).then(res => {
                // 平台分布-----------
                let platformLine = res.data.insurancePlatformLine.data;
                let platformData = { xAxisData: [], yAxisData: [] };
                Object.getOwnPropertyNames(platformLine).forEach(key => {
                    platformData.xAxisData.push(key);
                    platformLine[key].forEach((item, idx) => {
                        if (platformData['yAxisData'][idx]) {
                            platformData['yAxisData'][idx]['amount'].push(item.amount);
                        } else {
                            platformData['yAxisData'][idx] = {
                                name: '',
                                amount: []
                            };
                            platformData['yAxisData'][idx]['name'] = item.name;
                            platformData['yAxisData'][idx]['amount'].push(item.amount);
                        }
                    });
                });
                this.$nextTick(() => {
                    this.getLineChart('detailCharts2', platformData);
                });

                // 保司分布-----------
                let companyLine = res.data.insuranceCompanyLine.data;
                let companyData = { xAxisData: [], yAxisData: [] };
                Object.getOwnPropertyNames(companyLine).forEach(key => {
                    companyData.xAxisData.push(key);
                    companyLine[key].forEach((item, idx) => {
                        if (companyData['yAxisData'][idx]) {
                            companyData['yAxisData'][idx]['amount'].push(item.amount);
                        } else {
                            companyData['yAxisData'][idx] = {
                                name: '',
                                amount: []
                            };
                            companyData['yAxisData'][idx]['name'] = item.name;
                            companyData['yAxisData'][idx]['amount'].push(item.amount);
                        }
                    });
                });
                this.$nextTick(() => {
                    this.getLineChart('detailCharts7', companyData);
                });
            });
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
        getLineChart(idData, data) {
            let dom2 = document.getElementById(idData);
            let myChart2 = this.$echarts.init(dom2);
            let option = detailOption9;
            option.xAxis.data = data.xAxisData;
            let seriesData = [];
            data.yAxisData.forEach(item => {
                seriesData.push({
                    name: item.name,
                    type: 'line',
                    data: item.amount
                });
            });
            option.series = seriesData;
            myChart2.setOption(option, true);
        },
        getTabelData(chooseDates) {
            this.loading = true;
            let term = 'year';
            let stime = '';
            let etime = '';
            if (this.detailTabIndex == 'MONTH') {
                term = 'year';
                stime = this.termSeven[0] + '-01';
                let splitArr = this.termSeven[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
            } else if (this.detailTabIndex == 'WEEK') {
                term = 'month';
            } else {
                term = 'seven';
            }
            business({
                // startTime: dates[0],
                // endTime: dates[1],
                platform: this.tableDataFilter.platform,
                insuranceCode: this.tableDataFilter.insuranceCode,
                startTime: stime || this.termSeven[0],
                endTime: etime || this.termSeven[1],
                term
            }).then(res => {
                this.loading = false;
                let cancelData = res.data;
                this.colunm = [];
                this.tableData = [
                    {
                        head: this.$t('insure_data_dds')
                    },
                    {
                        head: this.$t('insure_data_bfy')
                    },
                    {
                        head: this.$t('insure_data_dpgmv')
                    },
                    {
                        head: this.$t('insure_data_yhs')
                    },
                    {
                        head: this.$t('insure_data_hyscqds')
                    },
                    {
                        head: this.$t('insure_data_hyhhrs')
                    }
                ];
                cancelData.forEach((item, idx) => {
                    this.colunm.push({
                        key: 'col_' + idx,
                        label: item.date
                    });
                });

                this.colunm.forEach((item, idx) => {
                    this.tableData[0][item.key] = cancelData[idx].orderNum;
                    this.tableData[1][item.key] = cancelData[idx].amount;
                    this.tableData[3][item.key] = cancelData[idx].userCount;
                    this.tableData[2][item.key] = cancelData[idx].sales;
                    this.tableData[4][item.key] = cancelData[idx].marketCount;
                    this.tableData[5][item.key] = cancelData[idx].partnerCount;
                });
                this.loading = false;
            });
        },
        changeTab(val) {
            console.log(val);

            // var d = new Date();
            var d2 = new Date();
            if (val == 'DAY') {
                //  日趋势  默认值
                this.termSeven = [this.GetDateStr(-15), this.GetDateStr(0)];
            } else if (val == 'WEEK') {
                this.termSeven = [this.GetDateStr(-84), this.GetDateStr(0)];
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

            this.getTabelData(this.termSeven);
            this.getChartsDate(this.termSeven);
            this.getChannelTableData();
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
        changeDates() {
            this.getTabelData(this.termSeven);
            this.getChartsDate(this.termSeven);
            this.getChannelTableData();
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
            console.log(AddDayCount);
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

<style lang="less" scoped>
.eee {
    background-color: #f2f2f2;
}

.blue {
    background: rgba(150, 211, 243, 0.8);
}

.yellow {
    background: rgba(252, 204, 8, 0.4);
}

.lie2 {
    display: flex;
    flex-direction: column;
}

.first {
    width: 255px !important;
    display: flex;

    justify-content: center;
    align-items: center;
}

.cells {
    display: flex;

    .cell2:last-child {
        border-bottom: 1px solid #ebeef5;
    }

    .cell2 {
        font-size: 13px;
        border-left: 1px solid #ebeef5;
        border-top: 1px solid #ebeef5;
        height: 38px;
        width: 85px;
        display: flex;
        padding-left: 8px;
        box-sizing: border-box;

        //    justify-content: center;
        align-items: center;
    }
}

.pink {
    background: rgb(249, 203, 218) !important;
    color: black;
}

.width {
    width: 430px !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tt {
    display: flex;
}

.last:last-child {
    margin-top: 5px;
}

.table-left {
    display: flex;

    .lie:last-child {
        border-right: 1px solid #ebeef5;
    }

    .lie {
        .cell:nth-child(1) {
            background: rgb(242, 242, 242);
        }

        .cell:last-child {
            border-bottom: 1px solid #ebeef5;
        }

        .cell {
            font-size: 13px;
            border-top: 1px solid #ebeef5;
            border-left: 1px solid #ebeef5;
            height: 38px;
            width: 115px;
            display: flex;
            padding-left: 8px;
            box-sizing: border-box;

            align-items: center;
        }
    }
}

/deep/.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
    // text-align: center !important;
}
</style>