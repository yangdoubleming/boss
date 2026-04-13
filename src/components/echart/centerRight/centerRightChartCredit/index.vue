<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import { getEvaluation } from '@/api/index'
import Chart from './chart.vue';
export default {
  data() {
    return {
      cdata: []
    }
  },
  components: {
    Chart,
  },
  methods: {
    getEvaluationData() {
      getEvaluation({
        // offerId: "amzn1.lending.offer.us.4cl1lhg858t1du3f23wv",
        offerId: this.$route.query.offerId,
        reportType: 2
      }).then(res => {
        this.cdata = res.data
      })
    }
  },
  mounted() {
    this.getEvaluationData()
  }
}
</script>