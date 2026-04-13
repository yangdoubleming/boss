<template>
  <div style="width: 100%;">
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  data() {
    return {
      cdata: {
        category: [
        ],
        barData: [
        ],
        rateData: [
          9600,
          5000,
          5900,
          6500,
          7500,
          6600,
          9900,
          12500,
          18000,
          21500,
          23200,
          64456,
          "-"
        ],
      }
    };
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
        this.changeShow(newValue)
      },
      deep: true, // 深度监听
      immediate: true // 监听到后，立即执行handler方法
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
  components: {
    Chart,
  },
  mounted() {
  },
  methods: {
    changeShow(newValue) {
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
        this.cdata.category = datesArray
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
      } else if (this.showValue == 2) {
        console.log('选为季', this.showValue);
        for (let i = 1; i <= 9; i++) {
          // 减去一个月
          date.setMonth(date.getMonth() - 1);
          datesArray.push(new Date(date).toISOString().split('T')[0]);
        }
        this.$set(this.cdata, 'category', datesArray);
        console.log('this.cdata.category', this.cdata.category);
        let monthsSales = [
          'quarter8SalesValue',
          'quarter7SalesValue',
          'quarter6SalesValue',
          'quarter5SalesValue',
          'quarter4SalesValue',
          'quarter3SalesValue',
          'quarter2SalesValue',
          'quarter1SalesValue'
        ]
        this.cdata.rateData = monthsSales.map(key => this.cdata[key]);
        this.cdata.rateData.push("-")
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
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>