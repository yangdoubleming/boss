<template>
    <div>
        <el-card style="padding: 10px;height: 100%;">
            <div class="data">
                当前修改月份 : {{ yearMonthStr }}
            </div>
            <main class="items">
                <div class="item">
                    <div class="item-title">信贷业务</div>
                    <el-form style="width: 80%;margin-left: 10%;" :label-position="labelPosition" label-width="190px"
                        :model="loanForm">
                        <el-form-item label="1.平台成本：">
                            <el-input v-model="loanForm.costPlatform">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="2.人力成本：">
                            <el-input v-model="loanForm.costManpower">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="3.差旅费＆招待费：">
                            <el-input v-model="loanForm.costEntertain">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="4.其他费用-公摊：">
                            <el-input v-model="loanForm.costOther">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="item">
                    <div class="item-title">金融云业务</div>
                    <el-form style="width: 80%;margin-left: 10%;" :label-position="labelPosition" label-width="190px"
                        :model="financeForm">
                        <el-form-item label="1.平台成本：">
                            <el-input v-model="financeForm.costPlatform">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="2.人力成本：">
                            <el-input v-model="financeForm.costManpower">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="3.差旅费＆招待费：">
                            <el-input v-model="financeForm.costEntertain">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="4.其他费用-公摊：">
                            <el-input v-model="financeForm.costOther">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="item">
                    <div class="item-title">豆服业务</div>
                    <el-form style="width: 80%;margin-left: 10%;" :label-position="labelPosition" label-width="190px"
                        :model="dfForm">
                        <el-form-item label="1.平台成本：">
                            <el-input v-model="dfForm.costPlatform">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="2.人力成本：">
                            <el-input v-model="dfForm.costManpower">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="3.差旅费＆招待费：">
                            <el-input v-model="dfForm.costEntertain">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="4.其他费用-公摊：">
                            <el-input v-model="dfForm.costOther">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="item">
                    <div class="item-title">保险业务</div>
                    <el-form style="width: 80%;margin-left: 10%;" :label-position="labelPosition" label-width="190px"
                        :model="insuranceForm">
                        <el-form-item label="1.平台成本：">
                            <el-input v-model="insuranceForm.costPlatform">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="2.人力成本：">
                            <el-input v-model="insuranceForm.costManpower">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="3.差旅费＆招待费：">
                            <el-input v-model="insuranceForm.costEntertain">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="4.其他费用-公摊：">
                            <el-input v-model="insuranceForm.costOther">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </main>
            <div class="total">
                固定成本合计：{{ formatCurrency(total) }}
            </div>
            <el-button class="btn" type="primary" @click="updata">保存</el-button>
        </el-card>

    </div>
</template>
<script>
import { costDetail, costUpdata } from '@/api/index'
export default {
    name: "costDetail",
    data() {
        return {
            labelPosition: 'left',
            formLabelAlign: {},
            yearMonthStr: "",
            loanForm: {},
            financeForm: {},
            dfForm: {},
            insuranceForm: {},

            allData: []
        };
    },
    created() {
        this.yearMonthStr = this.$route.query.yearMonthStr

        this.getDetail()
    },
    computed: {
        total() {
            const forms = [this.loanForm, this.financeForm, this.dfForm, this.insuranceForm];
            const costs = ['costPlatform', 'costManpower', 'costEntertain', 'costOther'];

            return forms.reduce((total, form) => {
                costs.forEach(cost => {
                    total += Number(form[cost]);
                });
                return total;
            }, 0);
        }
    },
    methods: {
        //修改
        updata() {
            costUpdata(
                {
                    costList: [
                        this.loanForm,
                        this.financeForm,
                        this.dfForm,
                        this.insuranceForm
                    ]
                }
            ).then(res => {
                const { data } = res
                this.$message.success('修改成功')
            })
        },
        getDetail() {
            costDetail({
                yearMonthStr: this.yearMonthStr
            }).then(res => {
                const { data } = res
                this.allData = data.records
                this.loanForm = data.records[0]
                this.financeForm = data.records[1]
                this.dfForm = data.records[2]
                this.insuranceForm = data.records[3]
            })
        },
        formatCurrency(number) {
            if (!number || isNaN(number)) {
                return '0.00'
            }
            // 四舍五入保留两位小数
            const roundedNumber = parseFloat(number).toFixed(2)

            // 将数字转换为千位分隔符的形式
            return parseFloat(roundedNumber).toLocaleString('en-US', {
                minimumFractionDigits: 2
            })
        },
    },
};
</script>
<style lang="scss" scoped>
.data {
    color: #000;
    font-family: "Source Han Sans SC";
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
}

::v-deep.el-form--label-left .el-form-item__label {
    font-size: 20px;
}

::v-deep .el-form-item__content .el-input-group {
    font-size: 16px;
}

.items {
    display: flex;
    flex-wrap: wrap;
    gap: 10%;

    .item {
        width: 40%;

        .item-title {
            color: #000;
            position: relative;
            font-size: 28px;
            font-weight: 400;
            right: -10px;
            margin-bottom: 10px;
        }

        .item-title::before {
            content: "";
            display: block;
            width: 10px;
            height: 40px;
            background-color: #FF5663;
            position: absolute;
            left: -16px;
            top: 2px;
        }
    }
}

.total {
    color: #000;
    font-size: 28px;
    font-weight: 400;
    margin-top: 10px;
}

.btn {
    width: 100px;
    margin-top: 20px;
    margin-bottom: 50px;
}
</style>