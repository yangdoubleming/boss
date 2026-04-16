<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <el-card shadow="hover" style="height:100%" :style="{ width: wid == 24 ? chartsWidth : '100%' }">
            <div style="margin-bottom:30px;font-size:14px">
                统计周数
                <el-select v-model="weekNumber" :placeholder="$t('loan_detail_choose')" style="margin-left:10px"
                    @change="changeSelect">
                    <div v-for="item in 50" :key="item.item">
                        <el-option v-if="item" :label="item" :value="item"></el-option>
                    </div>
                </el-select>
            </div>
            <div class="eCharts-box" style="width:100%" :style="{ display: wid == 24 ? 'block' : 'flex' }">
                <div :style="{ width: wid == 24 ? '100%' : '50%' }">
                    <div id="weeksCount" style="height:650px"
                        :style="{ width: wid == 24 ? chartsWidth : '100%', paddingTop: wid == 24 ? '35px' : '0' }"></div>
                </div>
                <div :style="{ width: wid == 24 ? '100%' : '50%' }">
                    <div id="weeksCount2" style="height:650px"
                        :style="{ width: wid == 24 ? chartsWidth : '100%', paddingTop: wid == 24 ? '35px' : '0' }"></div>
                </div>
            </div>
            <div style="display:block;margin:0 auto;margin-bottom:30px;width: 100%;margin-top: 10px;margin-bottom: 30px;
							white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
                <div class="box">
                    <div class="content1">周</div>
                    <div class="content1" v-for=" item in option5.xAxis[0].data" :key="item">{{ item }}</div>
                </div>
                <div class="box">
                    <div class="content1">注册店铺数</div>
                    <div class="content1" v-for=" (item, index) in option5.series[0].data" :key="index">{{ item }}</div>
                </div>
                <div class="box">
                    <div class="content1">累计注册店铺数</div>
                    <div class="content1" v-for=" (item, index) in option5.series[1].data" :key="index">{{ item }}</div>
                </div>
            </div>


            <div style="display:block;margin:0 auto;margin-bottom:30px; width: 100%;margin-top: 10px;margin-bottom: 30px;
							white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
                <div class="box">
                    <div class="content1">周</div>
                    <div class="content1" v-for=" item in option.xAxis[0].data" :key="item">{{ item }}</div>
                </div>
                <div class="box">
                    <div class="content1">新增店铺数</div>
                    <div class="content1" v-for=" (item, index) in option.series[0].data" :key="index">{{ item }}</div>
                </div>
                <div class="box">
                    <div class="content1">累计新增店铺数</div>
                    <div class="content1" v-for=" (item, index) in option.series[1].data" :key="index">{{ item }}</div>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script>
import { countWeeks } from '../../../api/index';
export default {
    name: 'store-stats',
    data() {
        return {
            weekNumber: 10,
            chartsWidth: 0,
            activeName: 1,
            totalDataForm: {},

            wid: 8,
            option: {
                grid: {
                    left: '1%',
                    right: '9%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['#E01F54', '#001852'],
                title: { text: '新增店铺数统计' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                legend: {
                    data: ['新增店铺数', '累计新增店铺数']
                },
                series: [
                    {
                        name: '新增店铺数',
                        type: 'bar',
                        data: []
                    },

                    {
                        name: '累计新增店铺数',
                        type: 'line',
                        yAxisIndex: 1,
                        data: []
                    }
                ],
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 5) + '\n' + value.substring(5, 6) + '\n' + value.substring(6, 11);
                                // console.log( val);
                                return val;
                            }
                        },
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '新增店铺数',
                        min: 0,

                        interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '累计新增店铺数',
                        min: 0,

                        interval: 500,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ]
            },

            option5: {
                grid: {
                    left: '1%',
                    right: '9%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['#E01F54', '#001852'],
                title: { text: '注册店铺数统计' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                legend: {
                    data: ['注册店铺数', '累计注册店铺数']
                },
                series: [
                    {
                        name: '注册店铺数',
                        type: 'bar',
                        data: []
                    },

                    {
                        name: '累计注册店铺数',
                        type: 'line',
                        yAxisIndex: 1,
                        data: []
                    }
                ],
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 5) + '\n' + value.substring(5, 6) + '\n' + value.substring(6, 11);
                                // console.log( val);
                                return val;
                            }
                        },
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '注册店铺数',
                        min: 0,
                        max: 500,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '累计注册店铺数',
                        min: 0,
                        max: 6000,
                        interval: 500,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ]
            }
        };
    },

    methods: {
        changeSelect(val) {
            this.getData();
        },
        getData() {
            this.option5.series[0].data = [];
            this.option5.series[1].data = [];
            this.option5.xAxis[0].data = [];
            this.option.series[0].data = [];
            this.option.series[1].data = [];
            this.option.xAxis[0].data = [];
            countWeeks(this.weekNumber).then((res) => {
                res.data.forEach((item) => {
                    this.option5.series[0].data.unshift(item.currentRegisterOfferCount);
                    this.option5.series[1].data.unshift(item.registerOfferCount);
                    this.option5.xAxis[0].data.unshift(item.lastSaturday + '-' + item.thisFriday);

                    this.option.series[0].data.unshift(item.currentOfferCount);
                    this.option.series[1].data.unshift(item.offerCount);
                    this.option.xAxis[0].data.unshift(item.lastSaturday + '-' + item.thisFriday);
                });
                let dom = document.getElementById('weeksCount');
                let myChart = this.$echarts.init(dom);
                myChart.setOption(this.option5);
                let dom2 = document.getElementById('weeksCount2');
                let myChart2 = this.$echarts.init(dom2);
                myChart2.setOption(this.option);
            });
        }
    },
    created() {
        this.chartsWidth = document.body.clientWidth - 85 + 'px';
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
        var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
        var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
        var bIsAndroid = sUserAgent.match(/android/i) == 'android';
        var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
        var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            this.wid = 24;
            console.log(this.wid);
        } else {
            this.wid = 8;
        }
        console.log(this.wid);
    },
    mounted() {
        this.getData();
    }
};
</script>

<style lang='less' scoped>
.btm {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
}

#app {
    // width: 70%;
    min-height: 100vh;
    box-sizing: border-box;

    // padding: 50px;
    .box {

        height: 40px;
        // display: flex;
        border-left: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;

        .content1 {
            width: 170px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fafafa;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            color: #333;
            font-size: 14px;
            display: inline-block;
        }

        .content2 {
            width: 170px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            // color: #b0b0b2;
            font-size: 14px;
            display: inline-block;
        }
    }
}

/deep/.el-collapse-item__header {
    padding-left: 20px !important;
}

.eCharts-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 18px;
}

.grid-num2 {
    font-size: 18px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
