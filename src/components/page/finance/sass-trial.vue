<template>
    <div class="all-content" v-loading="loading">
        <el-form ref="form" :model="enterForm" label-width="120px">
            <el-form-item label="产品: ">
                <el-radio-group @change="choseBank" v-model="enterForm.value1" size="medium" class="btns">
                    <el-radio-button v-for="item in allData[1]" :label="item.id">{{ item.value }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="卖家规模: ">
                <el-radio-group v-model="enterForm.value2" size="medium" class="btns">
                    <el-radio-button v-for="item in allData[7]" :label="item.id">{{ item.value }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="融资需求: " style="width: 35%;">
                <el-input placeholder="请输入融资金额" v-model.trim="financingAmount">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="融资期限: ">
                <el-radio-group v-model="termDay" size="medium" class="btns">
                    <el-radio-button v-for="item in allData[73]" :label="item.value">{{ item.value }}个月</el-radio-button>>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="获客来源: " v-show="isJianHang">
                <el-radio-group v-model="enterForm.value3" size="medium" class="btns">
                    <el-radio-button v-for="item in allData[3]" :label="item.id">{{ item.value }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="客户类型: ">
                <el-radio-group v-model="value4" size="medium" class="btns" @change="getRate">
                    <el-radio-button v-for="item in allData[8]" :label="item.id">{{ item.value }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="支付公司: ">
                <el-radio-group v-model="enterForm.value5" size="medium" class="btns">
                    <el-radio-button v-for="item in allData[4]" :label="item.id">{{ item.value }}</el-radio-button>>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="委托支付: ">
                <el-radio-group v-model="enterForm.value6" size="medium" class="btns">
                    <el-radio-button v-for="item in  allData[5] " :label="item.id">{{ item.value }}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="还款方式: ">
                <el-radio-group v-model="enterForm.value7" size="medium" class="btns">
                    <el-radio-group v-model="enterForm.value7" size="medium" class="btns">
                        <el-radio-button v-for="item in  allData[6] " :label="item.id">{{ item.value }}
                        </el-radio-button>
                    </el-radio-group>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="销售提成: ">
                <el-input placeholder="请输入销售提成" style="width: 25%;" v-model="rate">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="试算结果: ">
                <el-descriptions :column="2" direction="vertical" border>
                    <el-descriptions-item label="刊例价">{{ resultDate.productApr }}</el-descriptions-item>
                    <el-descriptions-item label="执行利率">{{ resultDate.apr }}</el-descriptions-item>
                    <el-descriptions-item label="会员权益基础费">{{ resultDate.serviceFee }}</el-descriptions-item>
                    <el-descriptions-item label="预计提成">{{ resultDate.royalty }}</el-descriptions-item>
                </el-descriptions>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ensureCount">确认试算</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getAllData, ensureCount, getSaleRate } from '../../../api/price'
export default {
    name: 'sassTrial',
    data() {
        return {
            isJianHang: false,
            loading: false,
            value4: '', //客户类型
            enterForm: {
                value1: '', //产品
                value2: '', //卖家规模
                value3: '', //获客来源

                value5: '', //支付公司
                value6: '', //委托支付
                value7: '', //还款方式
            },
            termDay: '',
            financingAmount: ' ',
            rate: 1,
            resultDate: {},
            allData: {},
            repaymentType: "",
        }
    },
    created() {
        this.getAllData()
    },
    methods: {
        //获取销售提成
        getRate(value) {
            getSaleRate({ id: value }).then(res => {
                this.rate = res.data * 100
            })
        },
        //判断是否是建行
        choseBank(value) {
            if (value == 10 || value == 11) {
                this.isJianHang = true;
            } else {
                this.isJianHang = false
                this.enterForm.value3 = ''
            }
        },
        //获取所有数据
        getAllData() {
            this.loading = true;
            getAllData().then(res => {
                res.data.forEach(item => {
                    let pid = item.pid;
                    if (!this.allData[pid]) {
                        this.allData[pid] = [];
                    }
                    this.allData[pid].push(item);
                    this.loading = false;
                });
            }).catch(err => {
                this.loading = false;
            })

        },
        //选择试算
        ensureCount() {
            let ids = Object.values(this.enterForm)
            ids = ids.filter(item => item != '')
            this.allData[6].forEach(item => {
                if (item.id == this.enterForm.value7) {
                    this.repaymentType = item.value
                }
            })
            if (!this.enterForm.value1) {
                return this.$message.warning('请选择产品')
            }
            if (!this.enterForm.value2) {
                return this.$message.warning('请选择卖家规模')
            }
            let reg = /^[1-9]\d*$/
            if (!reg.test(this.financingAmount)) {
                return this.$message.warning('融资需求不能为空且必须为整数')
            }
            if (!this.termDay) {
                return this.$message.warning('请选择融资期限')
            }
            if (!this.enterForm.value5) {
                return this.$message.warning('请选择支付公司')
            }
            if (!this.enterForm.value6) {
                return this.$message.warning('请选择受托支付方式')
            }

            if (!this.enterForm.value7) {
                return this.$message.warning('请选择还款方式')
            }

            if (this.rate > 100) {
                return this.$message.warning('销售提成比例不能大于一百')
            }
            this.loading = true
            ensureCount(
                {
                    term: this.termDay,
                    ids: ids,
                    financingAmount: this.financingAmount,
                    rate: this.rate / 100,
                    repaymentType: this.repaymentType
                }
            ).then(res => {
                this.$nextTick(() => {
                    this.resultDate.productApr = (res.data.productApr * 100).toFixed(2) + '%'
                    this.resultDate.apr = (res.data.apr * 100).toFixed(2) + '%'
                    this.resultDate.serviceFee = '￥' + (res.data.serviceFee).toFixed(2)
                    this.resultDate.royalty = '￥' + (res.data.royalty).toFixed(2)
                    this.loading = false
                })

            }).catch(err => {
                this.loading = false
            })
        },
    }
}
</script>
<style lang="less" scoped>
.all-content {
    width: 60%;
    margin: 30px auto 0px;
    padding-bottom: 40px;

    .title {
        font-size: 18px;
        font-weight: 550;
        margin-right: 10px;

    }

    .btns {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    /deep/.el-descriptions__body {
        background-color: transparent;

        table {
            font-size: 16px;
            width: 50%;
            background: #ccc;
        }
    }
}
</style>