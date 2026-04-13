

<template>
<div>
    <usLoaning
        v-if="!loading"
        :allweekLineChartData="allweekLineChartData"
        :sanplData="loaningData"
        :shopData="pageData.applicationOfferVoList"
        :defaultOffer="defaultOffer"
    />
</div>
</template>
<script>
import usLoaning from '@/components/common/detail-components/us-loaning.vue';
import {   latestQuery3plListNew } from '@/api';
import { shopreportNew } from '@/api/boss1';

export default {
    name: 'edu-shops-detail',
    components: { usLoaning },
    data() {
        return {
            loading: true,
            allweekLineChartData: {},
            loaningData:null,
            pageData:{
                applicationOfferVoList:[]
            },
            defaultOffer: {},
        }
    },
    created() {
        this.getWeekLineChartData()
        this.getloaningData()
    },
    methods:{
      async  getWeekLineChartData(){
            const params = JSON.parse(sessionStorage.getItem('offerIds'));
              await  shopreportNew({offerIds:params}).then((re) => {
                    // this.companyList = res.data;
                    this.shopreportData = re.data.riskReportV3ShopScore || {};
                    this.allweekLineChartData = re.data || {};
                });
        },
        async getloaningData(){
            const params = JSON.parse(sessionStorage.getItem('offerIds'));
            await latestQuery3plListNew({offerIds:params}).then((res) => {
                this.loaningData = res.data;
                this.loading = false
            });
        }
    }
};
</script>
<style scoped lang="less">

</style>