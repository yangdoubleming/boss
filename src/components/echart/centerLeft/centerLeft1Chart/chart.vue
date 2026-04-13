<template>
  <div>
    <Echart :options="options" id="centreLeft1Chart" height="320px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
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
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Array,
      default: () => ([])
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        if (Array.isArray(newData)) {
          newData = newData.filter(item => item.value !== 0);
        }
        this.options = {
          color: [
            "#37a2da",
            "#32c5e9",
            "#9fe6b8",
            "#ffdb5c",
            "#ff9f7f",
            "#fb7293",
            "#e7bcf3",
            "#8378ea",
            "#15d36a",
            "#f6632c",
            "#f59a23",
            "#f57f17",
            "#f5580a",
            "#3de3c6",
            "#d0a65f"
          ],
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              lineStyle: {
                normal: {
                  color: this.linearBtoG,
                  width: 3
                }
              },
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: true, //防止标签重叠，默认为true
              // padAngle: 10,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  borderRadius: 10,
                  borderColor: '#1e1e2f'
                }

              },

              emphasis: {
                label: {
                  show: true,
                  // fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: newData
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped></style>