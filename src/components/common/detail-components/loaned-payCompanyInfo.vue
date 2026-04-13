<template>
    <div>
        <el-card style="margin-top:24px" shadow="hover">


            <xtable :columns="columns2" :detailTable="true" :tableData="pageData" @edit="tableEvent" />
            <el-dialog title="划扣结果" :visible.sync="showStatus" width="650px">
                <el-table :data="sData" style="width: 100%" v-if="paymentCode == 'P2'">
                    <el-table-column prop="repaymentAmount" label="扣款金额" />
                    <el-table-column prop="currency" label="币种" />
                    <el-table-column prop="applyTime" :label="$t('loan_detail_sqsj')" />
                </el-table>
                <el-table :data="sData" style="width: 100%" v-if="paymentCode == 'P3'">
                    <el-table-column prop="realDeductAmt" label="扣款金额" />
                    <el-table-column prop="deductCurrency" label="币种" />
                    <el-table-column prop="deductTime" label="发起时间" />
                </el-table>
                <el-table :data="sData" style="width: 100%" v-if="paymentCode == 'P8'">
                    <el-table-column prop="successAmount" label="扣款金额" />
                    <el-table-column prop="currency" label="币种" />
                    <el-table-column prop="createTime" label="扣款时间" />
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showStatus = false">关闭</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import xtable from '../Xtable.vue';
import { ll, pp, wy, searchStatusLL, searchStatusPP, searchStatusWY } from '../../../api/boss1'
export default {
    components: {
        xtable
    },
    props: {
        pageData: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            columns2: [

                {
                    label: '贷款单号',
                    prop: 'loanCode',
                },
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                },
                {
                    label: '金额',
                    prop: 'loanAmount',
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
                    operates: [
                        {
                            event: 'quote',
                            text: '强制划扣',
                            type: 'primary',

                        },
                        {
                            event: 'searchStatus',
                            text: '查询结果',
                            type: 'primary',

                        },

                    ],
                    fixed: 'right'
                },
            ],
            sData: [],
            paymentCode: '',
            showStatus: false
        }
    },
    methods: {
        tableEvent(val1, row) {
            this.paymentCode = row.paymentCode
            if (val1 == 'quote') {
                this.$prompt('', '划扣金额（元）', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '请输入金额'
                }).then(({ value }) => {
                    if (row.paymentCode == 'P2') {
                        ll(value, row.contractNumber).then(res => {
                            if (res.data) {
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error('操作失败')
                            }

                        })
                    } else if (row.paymentCode == 'P3') {
                        pp(value, row.loanCode).then(res => {
                            if (res.data) {
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error('操作失败')
                            }
                        })
                    } else if (row.paymentCode == 'P8') {
                        wy(value, row.contractNumber).then(res => {
                            if (res.data) {
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error('操作失败')
                            }
                        })
                    } else {
                        this.$message.warning('暂不支持！')
                    }
                })
            } else {
                if (row.paymentCode == 'P2') {
                    searchStatusLL(row.contractNumber).then(res => {
                        this.showStatus = true
                        this.sData = res.data
                    })
                } else if (row.paymentCode == 'P3') {
                    searchStatusPP(row.contractNumber).then(res => {
                        this.showStatus = true
                        this.sData = res.data ? [res.data] : []
                    })
                } else if (row.paymentCode == 'P8') {
                    searchStatusWY(row.contractNumber).then(res => {
                        this.showStatus = true
                        this.sData = res.data
                    })
                } else {
                    this.$message.warning('暂不支持！')
                }
            }

        },
    }
}
</script>

<style></style>