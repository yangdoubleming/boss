<template>
    <div class="statistic">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 / 运营管理 /
                裂变活动 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">保险数据统计</span>
        </div>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="top">
                    <div class="left">活动效果数据</div>
                    <div>
                        <span style="font-size: 13px; margin-right: 15px">注册时间</span>
                        <el-date-picker
                            v-model="dateTime"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="注册起始日"
                            end-placeholder="注册截止日"
                            value-format="yyyy-MM-dd"
                            @change="changeValue"
                        >
                        </el-date-picker>
                    </div>
                </div>

                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="activityType" label="活动类型" align="center"> </el-table-column>
                    <el-table-column prop="fparent" label="一级合伙人数" align="center"> </el-table-column>
                    <el-table-column prop="tparent" label="二级合伙人数" align="center"> </el-table-column>
                    <el-table-column prop="activefParent" label="活跃一级合伙人数" align="center"> </el-table-column>
                    <el-table-column prop="activetParent" label="活跃二级合伙人数" align="center"> </el-table-column>
                    <el-table-column prop="totalAmount" label="交易总保费/元" align="center"> </el-table-column>
                    <el-table-column prop="totalRebate" label="保险总返佣/元" align="center"> </el-table-column>
                </el-table>
                <div style="font-size: 13px; margin-top: 15px; color: #000">“活跃“定义说明：指获得总返佣>0元的合伙人。</div>
            </el-card>
        </el-row>

        <el-row :gutter="24" class="dataList two" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="top">
                    <div class="left">
                        保险返佣Top10
                        <el-button
                            style="margin-left: 20px; border-color: #e71d5d; border-radius: 10px; color: #e71d5d; padding: 5px 20px"
                            @click="$router.push('/insure-rebate')"
                            >更多排行榜</el-button
                        >
                    </div>
                    <div>
                        <span style="font-size: 13px; margin-right: 15px">返佣时间</span>
                        <el-date-picker
                            v-model="dateTime1"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="返佣起始日"
                            end-placeholder="返佣截止日"
                            value-format="yyyy-MM-dd"
                            @change="changeValue1"
                        >
                        </el-date-picker>
                    </div>
                </div>

                <el-table :data="topData" style="width: 100%" border>
                    <el-table-column prop="num" label="排序" align="center"> </el-table-column>
                    <el-table-column prop="userName" label="合伙人姓名" align="center"> </el-table-column>
                    <el-table-column prop="parent" label="合伙人类型" align="center"> </el-table-column>
                    <el-table-column prop="userIphone" label="合伙人手机号" align="center"> </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="保险总返佣" align="center"> </el-table-column>
                </el-table>
            </el-card>
        </el-row>

        <!-- 新增合伙人趋势 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="top">
                    <div class="left">新增合伙人趋势</div>
                    <div>
                        <el-radio-group v-model="termRadio1" style="margin-right: 20px" @change="changeTermType1">
                            <el-radio-button label="seven">日趋势</el-radio-button>
                            <el-radio-button label="month">周趋势</el-radio-button>
                            <el-radio-button label="year">月趋势</el-radio-button>
                        </el-radio-group>

                        <el-date-picker
                            @change="changeDates1"
                            v-if="termRadio1 == 'seven' || termRadio1 == 'month'"
                            v-model="termSeven1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            :clearable="clearable"
                            :picker-options="termRadio1 == 'seven' ? pickerOptions1 : termRadio1 == 'month' ? pickerOptions2 : ''"
                        ></el-date-picker>

                        <el-date-picker
                            v-if="termRadio1 == 'year'"
                            v-model="termSeven1"
                            type="monthrange"
                            range-separator="至"
                            start-placeholder="开始月份"
                            end-placeholder="结束月份"
                            value-format="yyyy-MM"
                            @change="changeDates1"
                            :clearable="clearable"
                        ></el-date-picker>
                    </div>
                </div>
                <div style="width: 100%; margin-top: 25px">
                    <div id="myChart1" style="height: 650px; width: 100%"></div>
                </div>
            </el-card>
        </el-row>

        <!-- 责任险订单保费趋势 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-col>
                <el-card shadow="hover" :body-style="{ padding: '20px' }">
                    <div class="top">
                        <div class="left">责任险订单保费趋势（裂变活动）</div>
                        <div>
                            <el-radio-group v-model="termRadio" style="margin-right: 20px" @change="changeTermType">
                                <el-radio-button label="seven">日趋势</el-radio-button>
                                <el-radio-button label="month">周趋势</el-radio-button>
                                <el-radio-button label="year">月趋势</el-radio-button>
                            </el-radio-group>

                            <el-date-picker
                                @change="changeDates"
                                v-if="termRadio == 'seven' || termRadio == 'month'"
                                v-model="termSeven"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                :clearable="clearable"
                                :picker-options="termRadio == 'seven' ? pickerOptions1 : termRadio == 'month' ? pickerOptions2 : ''"
                            ></el-date-picker>

                            <el-date-picker
                                v-if="termRadio == 'year'"
                                v-model="termSeven"
                                type="monthrange"
                                range-separator="至"
                                start-placeholder="开始月份"
                                end-placeholder="结束月份"
                                value-format="yyyy-MM"
                                @change="changeDates"
                                :clearable="clearable"
                            ></el-date-picker>
                        </div>
                    </div>
                    <div style="width: 100%; margin-top: 25px">
                        <div id="myChart" style="height: 650px; width: 100%"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { activity, statisticsOrder, statisticsParent, rebate } from '../../../api/insur';

import '../../../assets/china';
export default {
    name: 'insure-statistics',
    data() {
        return {
            clearable: false,
            pickerMinDate: '',
            pickerMaxDate: '',
            accumulativeDate: '', // 累计数据的日期
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

            termSeven: ['', ''], // 责任险订单保费趋势
            termSeven1: ['', ''],
            termMonth: [],
            datePick: '',
            termRadio: 'seven',
            termRadio1: 'seven',

            tableData: [],
            topData: [],
            dateTime: [],
            dateTime1: []
        };
    },
    mounted() {
        this.changeTermType('seven');
        this.changeTermType1('seven');
        this.getData();
        this.getTop();
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
            statisticsOrder({
                term: this.termRadio,
                startTime: stime || this.termSeven[0],
                endTime: etime || this.termSeven[1]
            }).then((res) => {
                let xAxisData = [];
                let yAxisObj = [];
                let totalObj = { name: '', value: [] };
                let legendData = { data: ['保费/元', '订单数'] };
                let dataAdd = res.data;
                let arr = [];

                for (var i in dataAdd) {
                    arr.push(dataAdd[i]);
                }

                Object.keys(dataAdd).forEach((key, i) => {
                    xAxisData.push(key);

                    // totalObj.name = '订单数';
                    totalObj.value.push(dataAdd[key][0].num);
                });
                for (let i = 0; i < arr.length; i++) {
                    yAxisObj = arr[i].map((item) => {
                        return { name: '保费/元', value: [] };
                    });
                }

                yAxisObj.forEach((item) => {
                    arr.forEach((item2) => {
                        item2.forEach((item3) => {
                            item.value.push(item3.amount);
                        });
                    });
                });
                window.echartsData = res.data;
                this.$nextTick(() => {
                    this.drawLine(xAxisData, yAxisObj, totalObj, legendData);
                });
            });
        },
        changeDates1(val) {
            // console.log(val);
            let stime = '';
            let etime = '';
            if (this.termRadio1 == 'year') {
                stime = this.termSeven1[0] + '-01';
                let splitArr = this.termSeven1[1].split('-');
                etime = this.getMonthFinalDay(splitArr[0], splitArr[1]);
            }
            statisticsParent({
                term: this.termRadio1,
                startTime: stime || this.termSeven1[0],
                endTime: etime || this.termSeven1[1]
            }).then((res) => {
                let xAxisData = [];
                let yAxisObj = [];
                // let totalObj = { name: '', value: [] };
                let legendData = { data: [] };
                let dataAdd = res.data;
                let arr = [];

                for (var i in dataAdd) {
                    arr.push(dataAdd[i]);
                }
                Object.keys(dataAdd).forEach((key, i) => {
                    xAxisData.push(key);
                    if (dataAdd[key][i] && dataAdd[key][i]) {
                        legendData.data.unshift(dataAdd[key][i].level);
                    }
                });
                for (let i = 0; i < arr.length; i++) {
                    yAxisObj = arr[i].map((item) => {
                        return { name: item.level, value: [] };
                    });
                }

                yAxisObj.forEach((item) => {
                    // console.log(item);
                    arr.forEach((item2) => {
                        item2.forEach((item3) => {
                            if (item.name === item3.level) {
                                item.value.push(item3.num);
                            }
                        });
                    });
                });

                // window.echartsData = res.data;
                this.$nextTick(() => {
                    this.drawLine1(xAxisData, yAxisObj, legendData);
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
                // console.log(this.termSeven);
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
                // console.log(month[0]);
                this.termSeven = [month[0] + '-' + month[1], this.getDay(-0)];
                // console.log(this.termSeven);
            }
            this.changeDates();
        },
        changeTermType1(val) {
            var d = new Date();
            var d2 = new Date();
            var arr = [];
            d.setTime(d.getTime() - 30 * 24 * 3600 * 1000 * 3);
            arr[0] = d.getFullYear();
            arr[1] = d.getMonth() + 1;
            arr[2] = this.getDay(-0).split('-')[2];
            if (val == 'seven') {
                //  日趋势  默认值
                this.termSeven1 = [this.getDay(-6), this.getDay(-0)];
                // console.log(this.termSeven);
            } else if (val == 'month') {
                // 周
                this.termSeven1 = [arr.join('-'), this.getDay(-0)];
            } else {
                // 月
                let month = [];
                month[0] = d2.getFullYear() - 1; // 去年年份
                month[1] = this.Zero(d2.getMonth() + 2 + '');
                if (d2.getMonth() === 11) {
                    month[0] = d2.getFullYear();
                    month[1] = '01';
                }
                // console.log(month[0]);
                this.termSeven1 = [month[0] + '-' + month[1], this.getDay(-0)];
                // console.log(this.termSeven1);
            }
            this.changeDates1();
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
        // 责任险订单保费趋势
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
                name: '订单数',
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
                //     formatter: function (arg) {
                //         arg.forEach((it) => {
                //             // console.log(it);
                //             Object.keys(window.echartsData).forEach((key) => {
                //                 window.echartsData[key].forEach((item2) => {
                //                     // console.log(item2)
                //                     if (it.axisValueLabel === key) {
                //                         it.data = item2.amount;
                //                         it.orderNum = item2.num;
                //                     }
                //                 });
                //             });
                //         });

                //         let arrTemp = arg;
                //         let dom = [
                //             `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div><div style="width:100px;text-align:left">保费/元</div> <div style="width:100px;text-align:left">订单数</div> </div>`
                //         ];
                //         arrTemp.forEach((item) => {
                //             dom.push(
                //                 `<div style="display:flex;align-items:center"><div style="width:120px;text-align:left"> ${item.marker} </div><div style="width:100px;text-align:left">${item.data}</div> <div style="width:100px;text-align:left">${item.orderNum}</div></div>`
                //             );
                //         });
                //         let dom2 = [];
                //         dom.forEach((item, index) => {
                //             if (item) {
                //                 dom2.push(item);
                //             }
                //         });
                //         return dom2.join('<br/>');
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: legendData,
                // legend: {
                //     data: ['保费/元', '订单数']
                // },
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
        // 新增合伙人趋势
        drawLine1(xAxisData = [], yAxisObj = [], legendData = {}) {
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

            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart1');
            let myChart = this.$echarts.init(dom);

            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
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
                        name: '新增合伙人数',
                        min: 0,
                        position: 'left'
                    }
                ],
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
        changeValue(v) {
            if (v == null) {
                this.dateTime = [];
            } else {
                this.dateTime = v;
            }
            this.getData();
        },
        changeValue1(v) {
            if (v == null) {
                this.dateTime1 = [];
            } else {
                this.dateTime1 = v;
            }
            this.getTop();
        },
        getData() {
            activity({
                startTime: this.dateTime[0],
                endTime: this.dateTime[1]
            }).then((res) => {
                if (res.code === '200') {
                    this.tableData = res.data;
                }
            });
        },
        getTop() {
            rebate({
                startTime: this.dateTime1[0],
                endTime: this.dateTime1[1],
                rows: 10,
                page: 1
            }).then((res) => {
                // console.log(res);
                this.topData = res.data.records;
            });
        }
    }
};
</script>

<style lang='less' scoped>
.statistic {
    .el-card {
        font-size: 15px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .top {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .left {
            margin-bottom: 20px;
            font-weight: 700;
            color: #000;
            font-size: 15px;
            border-left: 1px solid #000;
            padding-left: 12px;
        }
    }

    /deep/.el-table__header {
        height: 60px;
        font-size: 13px;
        th {
            background-color: #e8e8e8 !important;
            color: #666;
        }
    }
    /deep/.el-table__row {
        height: 60px;
        font-size: 13px;
        td:nth-child(1) {
            color: #333;
            font-weight: 700;
        }
    }
    .two {
        /deep/.el-table__row {
            td:nth-child(5) {
                color: #e71d5d;
            }
        }
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
        margin-left: 20px;
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