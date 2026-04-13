<template>

    <div class="content" v-loading="isOver">
        <el-button style="margin-bottom: 20px;" @click='getNewDetail' type="primary">获取最新数据</el-button>
        <el-descriptions :contentStyle="{ 'font-size': '14px' }" :labelStyle="{ 'font-size': '14px' }"
            direction="vertical" class="my-descriptions" :column="3" border>
            <el-descriptions-item label="客户可提现额度（RMB万元）">{{ model.modelParam[1] }}</el-descriptions-item>
            <el-descriptions-item label="客户在贷金额（RMB万元）">{{ model.modelParam[2] }}</el-descriptions-item>
            <el-descriptions-item label="年销售额（RMB万元）">{{ model.modelParam[3] }}</el-descriptions-item>
            <el-descriptions-item label="年回款额（RMB万元）">{{ model.modelParam[4] }}</el-descriptions-item>
            <el-descriptions-item label="最新FBA价值（RMB万元）">{{ model.modelParam[5] }}</el-descriptions-item>
            <el-descriptions-item label="绑定店铺数">{{ model.modelParam[6] }}</el-descriptions-item>
            <el-descriptions-item label="店铺评分">{{ model.modelParam[7] }}</el-descriptions-item>
            <el-descriptions-item label="年销售额同比">{{ model.modelParam[8] }}</el-descriptions-item>
            <el-descriptions-item label="年回款额同比">{{ model.modelParam[9] }}</el-descriptions-item>
            <el-descriptions-item label="最大经营年限（天）">{{ model.modelParam[10] }}</el-descriptions-item>
            <el-descriptions-item label="近3个月回款额总和/授信金额">{{ model.modelParam[11] }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ model.modelParam[12] }}</el-descriptions-item>
            <el-descriptions-item label="身份证地址">{{ model.modelParam[13] }}</el-descriptions-item>
            <el-descriptions-item :label="$t('home_zfgs')">{{ model.modelParam[14] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="锁定方式">{{ model.modelParam[15] }}</el-descriptions-item>
            <el-descriptions-item label="近2年内逾期次数（默放）">{{ model.modelParam[16] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="近6个月内逾期次数（默放）">{{ model.modelParam[17] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="融御云商分-基础款">{{ model.modelParam[18] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="信用风险识别-线上小额现金贷">{{ model.modelParam[19] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="信用风险识别-信用卡（类信用卡）">{{ model.modelParam[20] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="融安云联分-基础款">{{ model.modelParam[21] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="融安云信分-基础款">{{ model.modelParam[22] || '--' }}</el-descriptions-item>
            <el-descriptions-item label="近3个月回款金额（RMB万元）">{{ model.modelParam[23] }}</el-descriptions-item>
            <el-descriptions-item label="贷款利率">{{ model.modelParam[24] }}</el-descriptions-item>
            <el-descriptions-item label="近6个月销售额月均环比增长率">{{ model.modelParam[25] }}</el-descriptions-item>
            <el-descriptions-item label="近1个季度销售额同比增长率">{{ model.modelParam[26] }}</el-descriptions-item>
            <el-descriptions-item label="近6个月回款月均环比增长率">{{ model.modelParam[27] }}</el-descriptions-item>
            <el-descriptions-item label="近1个季度回款同比增长率">{{ model.modelParam[28] }}</el-descriptions-item>
            <el-descriptions-item label="差评率">{{ model.modelParam[29] }}</el-descriptions-item>
            <el-descriptions-item label="退货率">{{ model.modelParam[30] }}</el-descriptions-item>
            <el-descriptions-item label="延迟配送率">{{ model.modelParam[31] }}</el-descriptions-item>
            <el-descriptions-item label="警告次数率">{{ model.modelParam[32] }}</el-descriptions-item>
            <el-descriptions-item label="取消订单率">{{ model.modelParam[33] }}</el-descriptions-item>
            <el-descriptions-item label="订单缺陷率">{{ model.modelParam[34] }}</el-descriptions-item>
            <el-descriptions-item label="店铺站点">{{ model.modelParam[35] }}</el-descriptions-item>
            <el-descriptions-item label="主营类目">{{ model.modelParam[36] }}</el-descriptions-item>
            <el-descriptions-item label="销售评级">{{ model.modelParam[37] }}</el-descriptions-item>
            <el-descriptions-item label="库存周转天数">{{ model.modelParam[38] }}</el-descriptions-item>
            <el-descriptions-item label="年均回款率">{{ model.modelParam[39] }}</el-descriptions-item>
            <el-descriptions-item label="最长逾期天数">{{ model.modelParam[40] }}</el-descriptions-item>
            <el-descriptions-item label="逾期天数大于3天次数">{{ model.modelParam[41] }}</el-descriptions-item>

            <el-descriptions-item label="近12月平均销售月增速">{{ model.modelParam[42] }}</el-descriptions-item>
            <el-descriptions-item label="当前是否逾期">{{ model.modelParam[43] }}</el-descriptions-item>
            <el-descriptions-item label="百融欺诈团伙等级">{{ model.modelParam[44] }}</el-descriptions-item>
            <el-descriptions-item label="百融欺诈团伙群组规模">{{ model.modelParam[45] }}</el-descriptions-item>
            <el-descriptions-item label="近2个月的月均回款（RMB万元）">{{ model.modelParam[46] }}</el-descriptions-item>
            <el-descriptions-item label="近1个月的销售额（RMB万元）">{{ model.modelParam[47] }}</el-descriptions-item>
            <el-descriptions-item label="近3个月的月均回款（RMB万元）">{{ model.modelParam[48] }}</el-descriptions-item>
            <el-descriptions-item label="近2个月的月均销售额（RMB万元）">{{ model.modelParam[49] }}</el-descriptions-item>
            <el-descriptions-item label="近第1个月的回款（RMB万元）">{{ model.modelParam[50] }}</el-descriptions-item>
            <el-descriptions-item label="近6周的周均销售额（RMB万元）">{{ model.modelParam[51] }}</el-descriptions-item>
            <el-descriptions-item label="近第1周的销售额（RMB万元）">{{ model.modelParam[52] }}</el-descriptions-item>
            <el-descriptions-item label="近3个月的月均销售额（RMB万元）">{{ model.modelParam[53] }}</el-descriptions-item>
            <el-descriptions-item label="近6个月的月均销售额（RMB万元）">{{ model.modelParam[54] }}</el-descriptions-item>
            <el-descriptions-item label="近6个月的月均回款（RMB万元）">{{ model.modelParam[55] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月的销售额协方差">{{ model.modelParam[56] }}</el-descriptions-item>
            <el-descriptions-item label="近第1周的回款（RMB万元）">{{ model.modelParam[57] }}</el-descriptions-item>
            <el-descriptions-item label="近1个季度回款环比">{{ model.modelParam[58] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月的回款协方差">{{ model.modelParam[59] }}</el-descriptions-item>
            <el-descriptions-item label="近9个月的月均销售额（RMB万元）">{{ model.modelParam[60] }}</el-descriptions-item>
            <el-descriptions-item label="近1个季度销售额环比">{{ model.modelParam[61] }}</el-descriptions-item>
            <el-descriptions-item label="近9个月的月均回款（RMB万元）">{{ model.modelParam[62] }}</el-descriptions-item>
            <el-descriptions-item label="近6周销售额协方差">{{ model.modelParam[63] }}</el-descriptions-item>
            <el-descriptions-item label="近8个季度的销售额协方差">{{ model.modelParam[64] }}</el-descriptions-item>
            <el-descriptions-item label="近3个月FBA库存价值（RMB万元）">{{ model.modelParam[65] }}</el-descriptions-item>
            <el-descriptions-item label="近8个季度回款额协方差">{{ model.modelParam[66] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月的月均销售额（RMB万元）">{{ model.modelParam[67] }}</el-descriptions-item>
            <el-descriptions-item label="近1个周销售额增长率">{{ model.modelParam[68] }}</el-descriptions-item>
            <el-descriptions-item label="近1个周回款增长率">{{ model.modelParam[69] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月的总订单数">{{ model.modelParam[70] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月月均回款（RMB万元）">{{ model.modelParam[71] }}</el-descriptions-item>
            <el-descriptions-item label="最热销货品3个月销售占比">{{ model.modelParam[72] }}</el-descriptions-item>
            <el-descriptions-item label="近12个月退款订单数">{{ model.modelParam[73] }}</el-descriptions-item>
            <el-descriptions-item label="征信评分">{{ model.modelParam[74] }}</el-descriptions-item>
            <el-descriptions-item label="信用卡使用率">{{ model.modelParam[75] }}</el-descriptions-item>
            <el-descriptions-item label="近6个月逾期次数">{{ model.modelParam[76] }}</el-descriptions-item>
            <el-descriptions-item label="近3个月信用卡和贷款审批查询次数">{{ model.modelParam[77] }}</el-descriptions-item>
            <el-descriptions-item label="预警店铺数">{{ model.modelParam[78] }}</el-descriptions-item>
            <el-descriptions-item label="系统额度(万元)">{{ model.modelParam.amount_base }}</el-descriptions-item>
            <el-descriptions-item label="系统利率(%)">{{ model.modelParam.price_base }}</el-descriptions-item>
            <el-descriptions-item label="申请单号 ">{{
        model.modelParam.appcode
    }}</el-descriptions-item>



        </el-descriptions>
        <el-table :summary-method="getSummaries" show-summary :data="model.modelResult.detail" stripe
            style="width: 50% ;margin-top: 20px;font-size: 15px;">
            <el-table-column prop="model" align='center' label="模型名称">
            </el-table-column>
            <el-table-column prop="amount" align='center' label="建议额度(万元)">
            </el-table-column>
            <el-table-column prop="price" align='center' label="建议利率(%)">
            </el-table-column>
            <el-table-column prop="amount_coef" align='center' label="额度系数">
            </el-table-column>
            <el-table-column prop="price_coef" align='center' label="利率系数">
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
import { getModel, getNewModel } from '../../../api/index';
export default {
    data() {
        return {
            model: {},
            isOver: false,
            isPass: ''
        }
    },
    mounted() {
        this.getModel()
    },
    methods: {
        //获取最新数据
        getNewDetail() {
            this.isOver = true
            getNewModel({ applicationCode: this.$route.query.loanNumber }).then(res => {
                if (res.data.code == 200) {
                    this.getModel()
                } else {
                    this.isOver = false
                }
            }).catch(error => {
                this.isOver = false
            })
        },
        getSummaries(param) {
            this.model.modelResult.decision == 'REJECT' ? this.isPass = '拒绝' : this.isPass = '通过'
            const { columns } = param
            const sums = []

            columns.forEach((column, index) => {

                switch (index) {

                    case 0:

                        sums[index] = '最终决策'

                        break

                    case 1:

                        sums[index] = this.model.modelResult.amount


                        break

                    case 2:

                        sums[index] = this.model.modelResult.price

                        break

                    case 3:

                        sums[index] = this.isPass

                        break




                }

            })

            return sums

        },
        getModel() {
            this.isOver = true
            getModel(
                { applicationCode: this.$route.query.loanNumber }
            ).then(res => {
                this.model = res.data
                this.isOver = false

            }).catch(err => {
                this.isOver = false
            })
        },


    }
}
</script>

<style lang="scss" scoped>
.content {
    background-color: #fff;

    .my-descriptions {
        width: 80%;
        display: block;

        ::V-deep .el-descriptions--small.is-bordered td,
        .el-descriptions--small.is-bordered th {
            font-size: 14px;
        }

        .my-label {
            width: 25%;

        }
    }
}
</style>