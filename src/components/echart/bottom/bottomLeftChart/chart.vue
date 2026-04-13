<template>
  <div>
    <!-- 店铺销售与回款图 -->
    <Echart :options="options" id="bottomLeftChart" height="270px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
      cdata: {}
    };
  },
  components: {
    Echart,
  },
  props: {
    allData: {
      type: Object,
      default: () => ({})
    },
    showValue: {
      type: String,
      default: "3"
    },
  },
  watch: {
    allData: {
      handler(newValue) {
        console.log("🚀 ~ handler ~ newValue:", newValue)
        this.changeShow(newValue)
      },
      immediate: true,
      deep: true
    },
    showValue: {
      handler(newValue) {
        this.showValue = newValue
        this.changeShow(this.allData)
      },
      deep: true, // 深度监听
      // immediate: true // 监听到后，立即执行handler方法
    }
  },
  methods: {
    changeShow(newValue) {
      if (newValue && newValue.reportCardDataDate) {
        this.cdata = newValue;
        // 给定的日期字符串
        // 将日期字符串转换为Date对象
        let date = new Date(this.cdata.reportCardDataDate);
        let datesArray = []
        if (this.showValue == 3) {
          for (let i = 1; i <= 13; i++) {
            // 减去一个月
            date.setMonth(date.getMonth() - 1);
            datesArray.push(new Date(date).toISOString().split('T')[0]);
          }
          this.cdata.category = datesArray.reverse()
          let monthsSales = [
            'month12SalesValue',
            'month11SalesValue',
            'month10SalesValue',
            'month9SalesValue',
            'month8SalesValue',
            'month7SalesValue',
            'month6SalesValue',
            'month5SalesValue',
            'month4SalesValue',
            'month3SalesValue',
            'month2SalesValue',
            'month1SalesValue'
          ]
          this.cdata.rateData = monthsSales.map(key => this.cdata[key]);
          this.cdata.rateData.push("-")

          let mockMonthSales = [
            'month1SalesValue',
            'month0SalesValue',
          ]
          this.cdata.mockRateData = mockMonthSales.map(key => this.cdata[key]);
          let dashes = '-'.repeat(11);
          this.cdata.mockRateData = dashes.split('').concat(this.cdata.mockRateData)
          let monthsDisbursements = [
            'month12DisbursementsValue',
            'month11DisbursementsValue',
            'month10DisbursementsValue',
            'month9DisbursementsValue',
            'month8DisbursementsValue',
            'month7DisbursementsValue',
            'month6DisbursementsValue',
            'month5DisbursementsValue',
            'month4DisbursementsValue',
            'month3DisbursementsValue',
            'month2DisbursementsValue',
            'month1DisbursementsValue'
          ]
          this.cdata.barData = monthsDisbursements.map(key => this.cdata[key]);
          this.cdata.barData.push("-")
          let mockMonthsDisbursements = [
            'month1DisbursementsValue',
            'month0DisbursementsValue',
          ]
          this.cdata.mockBarData = mockMonthsDisbursements.map(key => this.cdata[key]);
          let mockDdashes = '-'.repeat(11);
          this.cdata.mockBarData = mockDdashes.split('').concat(this.cdata.mockBarData)

        } else if (this.showValue == 2) {
          let date = new Date(this.cdata.reportCardDataDate);
          let datesArray = []
          for (let i = 1; i <= 9; i++) {
            let currentQuarterMonth = Math.floor(date.getMonth() / 3) * 3 + 1;
            if (currentQuarterMonth % 3 !== 0) {
              date.setMonth(date.getMonth() - (currentQuarterMonth - 1));
            }
            date.setMonth(date.getMonth() - 3);
            let quarterDate = [
              date.getFullYear(),
              (date.getMonth() + 1).toString().padStart(2, '0'),
              '01'
            ].join('-'); // YYYY-MM-01
            datesArray.unshift(quarterDate); // 将日期添加到数组的开头
          }
          // this.cdata.category = datesArray.reverse()
          this.cdata.category = datesArray

          let monthsSales = [
            'quarter8SalesValue',
            'quarter7SalesValue',
            'quarter6SalesValue',
            'quarter5SalesValue',
            'quarter4SalesValue',
            'quarter3SalesValue',
            'quarter1SalesValue',
            'quarter1SalesValue'
          ]
          this.cdata.rateData = monthsSales.map(key => this.cdata[key]);
          this.cdata.rateData.push("-")
          let mockMonthSales = [
            'quarter1SalesValue',
            'quarter0SalesValue',
          ]
          this.cdata.mockRateData = mockMonthSales.map(key => this.cdata[key]);
          let dashes = '-'.repeat(7);
          this.cdata.mockRateData = dashes.split('').concat(this.cdata.mockRateData)
          let monthsDisbursements = [
            'quarter8DisbursementsValue',
            'quarter7DisbursementsValue',
            'quarter6DisbursementsValue',
            'quarter5DisbursementsValue',
            'quarter4DisbursementsValue',
            'quarter3DisbursementsValue',
            'quarter2DisbursementsValue',
            'quarter1DisbursementsValue'
          ]
          this.cdata.barData = monthsDisbursements.map(key => this.cdata[key]);
          this.cdata.barData.push("-")
          let mockMonthsDisbursements = [
            'quarter1DisbursementsValue',
            'quarter0DisbursementsValue',
          ]
          this.cdata.mockBarData = mockMonthsDisbursements.map(key => this.cdata[key]);
          let mockDdashes = '-'.repeat(7);
          this.cdata.mockBarData = mockDdashes.split('').concat(this.cdata.mockBarData)
        } else if (this.showValue == 1) {
          let date = new Date(this.cdata.reportCardDataDate);
          let datesArray = []
          for (let i = 1; i <= 7; i++) {
            // 减去7天
            date.setDate(date.getDate() - 7);
            // 将日期格式化为字符串并添加到数组中
            datesArray.push(date.toISOString().split('T')[0]);
          }
          this.cdata.category = datesArray.reverse()
          let monthsSales = [
            'week6SalesValue',
            'week5SalesValue',
            'week4SalesValue',
            'week3SalesValue',
            'week2SalesValue',
            'week1SalesValue'
          ]
          this.cdata.rateData = monthsSales.map(key => this.cdata[key]);
          this.cdata.rateData.push("-")
          let mockMonthSales = [
            'week1SalesValue',
            'week0SalesValue',
          ]
          this.cdata.mockRateData = mockMonthSales.map(key => this.cdata[key]);
          let dashes = '-'.repeat(5);
          this.cdata.mockRateData = dashes.split('').concat(this.cdata.mockRateData)
          let monthsDisbursements = [
            'week6DisbursementsValue',
            'week5DisbursementsValue',
            'week4DisbursementsValue',
            'week3DisbursementsValue',
            'week2DisbursementsValue',
            'week1DisbursementsValue'
          ]
          this.cdata.barData = monthsDisbursements.map(key => this.cdata[key]);
          this.cdata.barData.push("-")
          let mockMonthsDisbursements = [
            'week1DisbursementsValue',
            'week0DisbursementsValue',
          ]
          this.cdata.mockBarData = mockMonthsDisbursements.map(key => this.cdata[key]);
          let mockDdashes = '-'.repeat(5);
          this.cdata.mockBarData = mockDdashes.split('').concat(this.cdata.mockBarData)

        }
        this.options = {
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.8)",
            formatter: function (params, ticket, callback) {
              var htmlStr = '';
              var valMap = {};
              for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var xName = param.name;//x轴的名称  
                var seriesName = param.seriesName;//图例名称  
                var value = param.value;//y轴值  
                var color = param.color;//图例颜色  

                //过滤无效值
                if (value == '-') {
                  continue;
                }

                //过滤重叠值
                if (valMap[seriesName] == value) {
                  continue;
                }

                if (i === 0) {
                  htmlStr += xName + '<br/>';//x轴的名称  
                }
                htmlStr += '<div>';
                //为了保证和原来的效果一样，这里自己实现了一个点的效果  
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';

                //圆点后面显示的文本  
                htmlStr += seriesName + '：' + value;

                htmlStr += '</div>';
                valMap[seriesName] = value;
              }
              return htmlStr;
            },
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC"
              }
            }
          },
          legend: {
            data: ["销售总金额", "回款总金额"],
            textStyle: {
              color: "#B4B4B4"
            },
            top: "0%"
          },
          grid: {
            left: '0%',
            right: '3%',
            bottom: '8%',
            width: "96%",
            containLabel: true
          },
          xAxis: {
            data: this.cdata.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            type: 'category',
            boundaryGap: true,
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },

              axisLabel: {
                formatter: "{value} "
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: [
            {
              name: "销售总金额",
              type: "line",
              smooth: true,
              barWidth: 10,
              // stack: 'Total',
              itemStyle: {
                normal: {
                  color: "#F02FC2",
                  lineStyle: {
                    width: 2,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  }
                },
                // 强调最后一个数据点的样式
              },
              data: this.cdata.rateData
            },
            {
              name: "销售总金额",
              type: "line",
              smooth: true,
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: "#F02FC2",
                  // 最后一个点的边框颜色
                  // borderWidth: 2,
                  lineStyle: {
                    width: 2,
                    type: 'dotted',
                    // color: "yellow"//'dotted'虚线 'solid'实线
                  }
                }
              },
              data: this.cdata.mockRateData
            },
            {
              name: "回款总金额",
              type: "line",
              barWidth: 10,
              smooth: true,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "#7e8be9" },
                  //   { offset: 1, color: "#3EACE5" }
                  // ]),
                  color: "#7e8be9",
                  lineStyle: {
                    width: 2,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: this.cdata.barData
            },
            {
              name: "回款总金额",
              type: "line",
              barWidth: 10,
              smooth: true,
              smooth: false,
              itemStyle: {
                normal: {
                  // barBorderRadius: 5,
                  color: "#7e8be9",
                  // color: "#7e8be9",
                  lineStyle: {
                    width: 2,
                    type: 'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: this.cdata.mockBarData
            },
          ]
        }

      }
    }
  }
}
</script>