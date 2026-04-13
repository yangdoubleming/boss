<template>
  <div style="width: 100%;padding-top: 40px;">
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import { getRefundRate } from '@/api/index'
import Chart from './chart.vue'
export default {
  data() {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        radarDataAvg: [],
        // maxData: 12000,
        // weekMaxData: [],
        monthLineData: []
      }
    }
  },
  components: {
    Chart,
  },
  mounted() {
    this.getRefundRateShow()
  },
  beforeDestroy() {
    clearInterval(this.drawTiming);
  },
  methods: {
    //获取退货率曲线
    getRefundRateShow() {

      getRefundRate(
        {
          // offerId: "amzn1.lending.offer.fr.2nhO1yK3H8bAO8ePxvhYnNSiyv8wvV57",
          offerId: this.$route.query.offerId,
        }
      ).then(res => {
        console.log("🚀 ~ getRefundRateShow ~ res:", res)
        this.cdata.monthLineData = [];
        this.cdata.weekCategory = [];
        if (res.data.refundRates.length) {
          res.data.refundRates.forEach(item => {
            this.cdata.monthLineData.push(item.date)
            this.cdata.weekCategory.push(item.refundRate)
          })
        } else {
          let dateBase = new Date();
          this.cdata.year = dateBase.getFullYear();
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth(); // 月份从0开始，0是1月
          for (let i = 0; i <= 3; i++) {
            const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
            const month = (currentMonth - i + 12) % 12 + 1; // 月份从1开始，加1是因为月份是从0开始的

            this.cdata.monthLineData.push(`${year}-${month.toString().padStart(2, '0')}`);
          }
          this.cdata.monthLineData = this.cdata.monthLineData.reverse()
          this.cdata.weekCategory = [0, 0, 0, 0]
        }


      })
    },

  }
};
</script>

<style lang="scss" scoped></style>