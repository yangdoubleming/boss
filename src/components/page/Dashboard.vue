<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                />
                豆沙包
            </div>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计总贷款金额</span>
                                    <span class="grid-num2">{{totalDataForm.loanAmountSum}}万</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计总贷款笔数</span>
                                    <span class="grid-num2">{{totalDataForm.loanNumberSum}}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">注册用户数</span>
                                    <span class="grid-num2">{{totalDataForm.userCount}}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计总授信金额</span>
                                    <span class="grid-num2">{{totalDataForm.creditAmountSum}}万</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计店铺数</span>
                                    <span class="grid-num2">{{totalDataForm.offerCount}}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="wid">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计店铺GMV（美元）</span>
                                    <span
                                        class="grid-num2"
                                    >{{(totalDataForm.year1SalesValueSum/10000).toFixed(2)}}万元</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-collapse v-model="activeName" accordion style="margin-bottom:30px">
                    <el-collapse-item title=" 管理员看板" name="1">
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-row :gutter="24" class="mgb20">
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">贷款金额（万人民币）</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.loanAmountSum.toFixed(2) }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">授信金额（万人民币）</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.creditAmountSum.toFixed(2) }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">贷款笔数</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.loanNumberSum }}笔</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24" class="mgb20">
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">用户注册数</span>
                                                    <span class="grid-num2">{{pageData.userCount }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">进件数</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.applicationCount }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">授信数</span>
                                                    <span class="grid-num2">{{pageData.creditCount}}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24" class="mgb20">
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">授信数/进件数比例</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{(pageData.creditApp*100).toFixed(2) }}%</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">放款数/进件数比例</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{(pageData.loanApp*100).toFixed(2) }}%</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>

                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">平均放款额（万人民币）</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.loanAmountAvg.toFixed(2) }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24" class="mgb20">
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">在贷余额（万人民币）</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.loanBalance.toFixed(2) }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">提前结清数</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.prepaymentCount }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>

                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">提前结清数/放款数比例</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{(pageData.prepaymentLoan *100).toFixed(2)}}%</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24" class="mgb20">
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">平均年化利率</span>
                                                    <span class="grid-num2">{{pageData.loanAprAvg}}%</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="wid">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <div class="grid-content grid-con-1">
                                                <div class="grid-cont-right">
                                                    <span class="grid-num">续贷数</span>
                                                    <span
                                                        class="grid-num2"
                                                    >{{pageData.seriesLoanCount }}</span>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>

                <el-card
                    shadow="hover"
                    style="height:100%"
                    :style="{width:wid==24?chartsWidth:'100%'}"
                >
                    <div
                        class="eCharts-box"
                        style="width:100%"
                        :style="{display:wid==24?'block':'flex'}"
                    >
                        <div :style="{width:wid==24?'100%':'50%'}">
                            <div
                                id="myChart"
                                style="height:650px"
                                :style="{width:wid==24?chartsWidth:'100%'}"
                            ></div>
                        </div>
                        <div
                            style="margin-left:20px"
                            :style="{width:wid==24?'100%':'50%',paddingTop:wid==24?'35px':'0'}"
                        >
                            <div
                                id="myChart2"
                                style="height:650px"
                                :style="{width:wid==24?chartsWidth:'100%'}"
                            ></div>
                        </div>
                    </div>
                    <div
                        class="eCharts-box"
                        style="width:100%"
                        :style="{display:wid==24?'block':'flex'}"
                    >
                        <div :style="{width:wid==24?'100%':'50%'}">
                            <div
                                id="everyDayConversion"
                                style="height:650px"
                                :style="{width:wid==24?chartsWidth:'100%',paddingTop:wid==24?'35px':'0'}"
                            ></div>
                        </div>
                        <div :style="{width:wid==24?'100%':'50%'}">
                            <div
                                id="user"
                                style="height:650px"
                                :style="{width:wid==24?chartsWidth:'100%',paddingTop:wid==24?'35px':'0'}"
                            ></div>
                        </div>
                        <!-- <div style="margin-left:20px">
                            <div id="myChart2" style="width:800px;height:650px"></div>
                        </div>-->
                    </div>

                  
                </el-card>
            </el-col>
        </el-row>
        

    </div>
</template>

<script>
import { daysChart, monthChart, statSum, countConversion, newCount, userCount, adminDataBlock, countWeeks } from '../../api/index';
export default {
    name: 'dashboard',
    data() {
        return {
            chartsWidth: 0,
            activeName: 1,
            totalDataForm: {},
            pageData: {
                loanAmountSum: 0,
                creditAmountSum: 0,
                creditApp: 0,
                loanApp: 0,
                loanAmountAvg: 0,
                loanBalance: 0,
                prepaymentLoan: 0,
                loanAprAvg: 0
            },
            wid: 8,

            option: {
                color: ['#E01F54', '#001852'],
                title: { text: '近六月放款' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    left: '0%',
                    right: '9%',
                    bottom: '0%',
                    containLabel: true
                },
                legend: {
                    data: ['放款金额', '放款笔数']
                },
                series: [
                    {
                        name: '放款金额',
                        type: 'bar',
                        data: []
                    },

                    {
                        name: '放款笔数',
                        type: 'line',
                        yAxisIndex: 1,
                        data: []
                    }
                ],
                xAxis: [
                    {
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
                        name: '放款金额（万）',
                        min: 0,
                        
                        interval: 1000,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '放款笔数',
                        min: 0,
                        
                        interval: 10,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ]
            },
            option2: {
                grid: {
                    left: '1%',
                    right: '9%',
                    bottom: '0%',
                    containLabel: true
                },
                color: ['#E01F54', '#001852'],
                title: { text: '近30天放款' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                legend: {
                    data: ['放款金额', '放款笔数']
                },
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 2) + '\n' + value.substring(2, 3) + '\n' + value.substring(3, 5);
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
                        name: '放款金额（万）',
                        min: 0,
                       
                        interval: 300,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '放款笔数',
                        min: 0,
                       
                        interval: 1,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ],
                series: [
                    {
                        name: '放款金额',
                        type: 'bar',
                        data: []
                    },

                    {
                        name: '放款笔数',
                        type: 'line',
                        yAxisIndex: 1,
                        data: []
                    }
                ]
            },
            option3: {
                grid: {
                    left: '0%',
                    right: '9%',
                    bottom: '0%',
                    containLabel: true
                },
                color: ['#E01F54', '#001852'],
                title: { text: '每日新增&转化店铺' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                legend: {
                    data: ['新增店铺', '转化店铺']
                },
                series: [
                    {
                        name: '新增店铺',
                        type: 'bar',
                        data: []
                    },

                    {
                        name: '转化店铺',
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
                                let val = value.substring(0, 2) + '\n' + value.substring(2, 3) + '\n' + value.substring(3, 5);
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
                        name: '新增店铺',
                        min: 0,
                        
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '转化店铺',
                        min: 0,
                        
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }
                ]
            },
            option4: {
                grid: {
                    left: '0%',
                    right: '9%',
                    bottom: '0%',
                    containLabel: true
                },
                color: ['#E01F54'],
                title: { text: '每日新增用户' },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                legend: {
                    data: ['新增用户']
                },
                series: [
                    {
                        name: '新增用户',
                        type: 'bar',
                        data: []
                    }
                ],
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                let val = value.substring(0, 2) + '\n' + value.substring(2, 3) + '\n' + value.substring(3, 5);
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
                        name: '新增用户',
                        min: 0,
                        
                        interval: 10,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ]
            },
           
        };
    },

    methods: {
        drawLine1() {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('myChart');
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.option);

            let dom2 = document.getElementById('myChart2');
            let myChart2 = this.$echarts.init(dom2);
            myChart2.setOption(this.option2);
        },
        drawLine2() {
            // 基于准备好的dom，初始化echarts实例
            let dom2 = document.getElementById('myChart2');
            let myChart2 = this.$echarts.init(dom2);
            myChart2.setOption(this.option2);
        }
    },
    created() {
        this.chartsWidth = document.body.clientWidth - 85 + 'px';
        console.log(this.chartsWidth);
        adminDataBlock().then((res) => {
            this.pageData = res.data;
        });
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
        
        statSum().then((res) => {
            this.totalDataForm = res.data;
            this.totalDataForm.loanAmountSum = (res.data.loanAmountSum / 10000).toFixed(2);
            this.totalDataForm.loanNumberSum = res.data.loanNumberSum;
            this.totalDataForm.userCount = res.data.userCount;
            this.totalDataForm.offerCount = res.data.offerCount;
            this.totalDataForm.creditAmountSum = (res.data.creditAmountSum / 10000).toFixed(2);
        });
    },
    mounted() {
       
        Promise.all([countConversion(), newCount()])
            .then((result) => {
                let arr = [];
                let arr2 = [];
                let arr3 = [];
                result[1].data.forEach((item) => {
                    arr.push(item.currentDate);
                    arr2.push(item.offerCount);
                });
                result[0].data.forEach((item) => {
                    arr3.push(item.offerCount);
                });
                this.option3.xAxis[0].data = arr;
                this.option3.series[0].data = arr2;
                this.option3.series[1].data = arr3;
                let dom = document.getElementById('everyDayConversion');
                let myChart = this.$echarts.init(dom);
                myChart.setOption(this.option3);
            })
            .catch((error) => {
                console.log(error);
            });
        userCount().then((res) => {
            let arr = [];
            let arr2 = [];
            res.data.forEach((item) => {
                arr.push(item.currentDate);
                arr2.push(item.userCount);
            });
            this.option4.xAxis[0].data = arr;
            this.option4.series[0].data = arr2;
            let dom = document.getElementById('user');
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.option4);
        });

        monthChart().then((res) => {
            // console.log(res);
            let arr = [];
            let arr2 = [];
            let arr3 = [];
            res.data.forEach((item) => {
                arr.push(item.loanDateStr);
                arr2.push(item.loanCount);
                arr3.push(item.loanAmountSum);
            });
            this.option.xAxis[0].data = arr;
            this.option.series[1].data = arr2;
            this.option.series[0].data = arr3;

            this.drawLine1();
        });

        daysChart().then((res) => {
            // console.log(res);
            let arr = [];
            let arr2 = [];
            let arr3 = [];
            res.data.forEach((item) => {
                let d = item.loanStartDate.slice(0, 5);
                arr.push(item.loanStartDate.replace(d, ''));
                arr2.push(item.loanCount);
                arr3.push(item.loanAmountSum);
            });
            this.option2.xAxis[0].data = arr;
            this.option2.series[1].data = arr2;
            this.option2.series[0].data = arr3;
            this.drawLine2();
        });
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
        width: 100%;
        height: 40px;
        display: flex;
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
