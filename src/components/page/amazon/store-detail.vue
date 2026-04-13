<template>
    <div>
        <el-col :span="24" style="margin-bottom: 24px">
            <el-card shadow="hover" :body-style="{ padding: '0px', height: '60px' }">
                <div class="grid-content grid-con-1" style="display: flex">
                    <el-menu default-active="3" class="el-menu-demo" style="width: 92%;margin-bottom: 10px;"
                        mode="horizontal" @select="handleSelect" active-text-color="#fe1964">
                        <!-- <el-menu-item index="3"
                            v-if="!['25', '48', '59'].includes($route.query.lenderId)">{{ $t('loan_detail_sxbg') }}</el-menu-item>
                        <el-menu-item index="6"
                            v-if="!['25', '48', '59'].includes($route.query.lenderId)">{{$t('loan_detail_jkbg')}}</el-menu-item> -->
                        <el-menu-item index="3">{{ $t('loan_detail_sxbg') }}</el-menu-item>
                        <el-menu-item index="6">{{$t('loan_detail_jkbg')}}</el-menu-item>
                    </el-menu>
                </div>
            </el-card>
        </el-col>
        <div v-loading="checkTabLoading">
            <achievementData v-if="activeIndex == '3'" :sanplData="sanplData" :defaultOffer="{}" />
            <loaning v-if="activeIndex == '6'" :sanplData="loaningData" :shopData="pageData.applicationOfferVoList"
                :defaultOffer="defaultOffer" :allweekLineChartData="allweekLineChartData" />
        </div>
    </div>
</template>
<script>
import loaning from '../../common/detail-components/loaningShop.vue';
import achievementData from "../../common/detail-components/achievementDataShop.vue";
import { getShopByOfferId, getShopByOfferIdLoan } from '../../../api/index';
import { shopreport } from '../../../api/boss1';
export default {
    components: {
        achievementData,
        loaning
    },
    data() {
        return {
            activeIndex: "3",
            checkTabLoading: false,
            sanplData: [],
            loaningData: [],
            defaultOffer: {}, //传给 loanning组件 默认展示的offer
            allweekLineChartData: {}, //给贷中用的最近六周数据
            pageData: {},


        }
    },
    created() {
        this.handleSelect(3)
    },
    activated() {
        this.activeIndex = '3'
        this.handleSelect("3")
    },
    methods: {
        handleSelect(key) {
            this.checkTabLoading = true;
            this.activeIndex = key;
            if (this.activeIndex == 3) {
                getShopByOfferId({ offerId: this.$route.query.offerId }).then(res => {
                    this.sanplData = [res.data]
                    this.this.checkTabLoading = false
                }).catch(err => {
                    this.checkTabLoading = false
                })
            } else if (this.activeIndex == 6) {
                //贷中
                getShopByOfferIdLoan({ offerId: this.$route.query.offerId }).then(res => {
                    this.loaningData = [res.data]
                    this.allweekLineChartData = res.data;
                    this.checkTabLoading = false

                }).catch(err => {
                    this.checkTabLoading = false
                })
                // shopreport(this.$route.query.loanNumber).then((re) => {
                //     this.allweekLineChartData = re.data || {};
                //     this.checkTabLoading = false
                // }).catch(err => {
                //     this.checkTabLoading = false
                // })
            }
        },

    }
}
</script>
<style lang="less" scoped>
.el-menu-item {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}
</style>