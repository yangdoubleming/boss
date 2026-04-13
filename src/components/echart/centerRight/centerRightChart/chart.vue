<template>
  <div>
    <Echart :options="options" id="centreRight2Chart1" height="220px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},

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
        // 固定样式数据
        let lineStyle = {
          normal: {
            width: 1,
            opacity: 0.5
          }
        };

        this.options = {
          // title: {
          //   text: 'Basic Radar Chart'
          // },
          legend: {
            data: ['行业平均', '店铺'],
            left: 0,
            orient: 'vertical'
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '销售', max: 5 },
              { name: '运营', max: 5 },
              { name: '盈利', max: 5 },
              { name: '合规', max: 5 },
              { name: '服务', max: 5 },
            ]
          },
          series: [

            {
              type: 'radar',
              data: newData,
              label: {
                show: true
              },
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