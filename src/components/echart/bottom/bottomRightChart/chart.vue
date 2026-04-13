<template>
  <div>
    <Echart :options="options" id="centreLeft1Chart" height="220px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f5b44d'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#fff'
            },
            {
              offset: 1,
              color: '#f01668'
            }
          ]
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#1c98e8'
            },

            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(35,184,210,.2)'
            },
            {
              offset: 1,
              color: 'rgba(35,184,210,0)'
            }
          ]
        }
      }
    }
  },
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          title: {
            text: '',
            textStyle: {
              color: '#D3D6DD',
              fontSize: 24,
              fontWeight: 'normal'
            },
            subtext: '退货率曲线(%)',
            subtextStyle: {
              color: '#fff',
              fontSize: 16
            },
            top: 40,
            left: 25
          },
          legend: {
            top: 0,
            itemGap: 15,
            itemWidth: 12,
            itemHeight: 12,
            // data: ['我的指标'],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,.7)',
          },
          grid: {
            left: 40,
            right: 20,
            bottom: 40,
            top: '40%'
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            axisLine: true,
            axisLabel: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 12
            },
            data: newData.monthLineData
          },
          // 下方Y轴
          yAxis: {
            name: '',
            nameLocation: 'end',
            nameGap: 24,
            nameTextStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: 14
            },
            // max: 100,
            splitNumber: 4,

            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                opacity: 0.1
              }
            },
            axisLabel: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 12
            }
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: true,
              symbol: 'emptyCircle',
              symbolSize: 5,
              itemStyle: {
                color: '#fff'
              },
              lineStyle: {
                color: this.colorList.linearBtoG,
                width: 3
              },
              areaStyle: {
                color: this.colorList.areaBtoG
              },
              data: newData.weekCategory,
              lineSmooth: true,
              tooltip: {
                // position: 'top',
                formatter: '{c}',
                backgroundColor: 'rgba(255,255,255,.7)',
                padding: 6
              }
            },
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
