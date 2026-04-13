<template>
    <div class="usKsbRepayDialog">
        <el-button type="warning" @click="showDialog">创建贷款</el-button>
        <el-dialog title="创建贷款" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                v-loading="loading">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="贷款支用申请时间" labelWidth="160px" prop="loanStartDate">
                            <el-date-picker type="date" placeholder="贷款支用申请时间" v-model="ruleForm.loanStartDate"
                                style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="贷款金额" prop="loanAmount">
                            <el-input v-model="ruleForm.loanAmount">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="贷款期限" prop="loanPeriod">
                            <el-input v-model="ruleForm.loanPeriod">
                                <el-select v-model="ruleForm.periodUnit" slot="append" placeholder="请选择"
                                    :style="{ width: '60px' }">
                                    <el-option label="天" value="D"></el-option>
                                    <el-option label="月" value="M"></el-option>
                                    <el-option label="年" value="Y"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="支付方式" prop="makeLoanMethod">
                            <el-select v-model="ruleForm.makeLoanMethod" placeholder="请选择支付方式" style="width: 100%">
                                <el-option label="受托支付" value="ENTRUSTED_PAYMENT"></el-option>
                                <el-option label="自主支付" value="INDEPENDENT_PAYMENT"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="还款方式" prop="repaymentMethod">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="请选择还款方式" style="width: 100%">
                                <el-option :label="item.label" :value="item.value" v-for="item in optionsRepayWayList"
                                    :key="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="年利率" prop="apr">
                            <el-input v-model="ruleForm.apr">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同编号" prop="contractNumber">
                            <el-input v-model="ruleForm.contractNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="币种" prop="currency">
                            <el-select v-model="ruleForm.currency" placeholder="请选择币种" style="width: 100%">
                                <el-option label="人民币" value="CNY"></el-option>
                                <el-option label="美元" value="USD"></el-option>
                                <el-option label="离岸人民币" value="CNH"></el-option>
                                <el-option label="港元" value="HKD"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { ksbUsCreateLoanPageDetail, ksbUsCreateLoan } from '../../../../api';
export default {
    data() {
        return {
            dialogVisible: false,
            loading: false,
            pageInfoData: {},
            ruleForm: {
                applicationCode: '', //申请单号
                contractNumber: '', // 合同编号
                loanStartDate: '', //贷款开始时间
                loanPeriod: '', //贷款期限
                loanAmount: '', // 贷款金额
                apr: '', //利率
                periodUnit: 'Y', //贷款期限单位 Y:年，M：月。D：天
                makeLoanMethod: '', //支付方式 ENTRUSTED_PAYMENT("受托支付", "ENTRUSTED_PAYMENT"), INDEPENDENT_PAYMENT("自主支付", "INDEPENDENT_PAYMENT"),
                repaymentMethod: '', // 还款方式  EQUAL_PRINCIPAL：等额本息，INTEREST_BEFORE_CAPITAL：先息后本，ONE_TIME_REPAYMENT：一次性还本付息
                currency: ''
            },
            rules: {
                loanStartDate: [{ required: true, message: '请输入贷款支用申请时间', trigger: 'blur' }],
                loanPeriod: [{ required: true, message: '请输入贷款期限', trigger: 'blur' }],
                apr: [{ required: true, message: '请输入年利率', trigger: 'blur' }],
                makeLoanMethod: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
                repaymentMethod: [{ required: true, message: '请输入还款方式', trigger: 'blur' }],
                loanAmount: [{ required: true, message: '请输入贷款金额', trigger: 'blur' }],
                currency: [{ required: true, message: '请选择币种', trigger: 'blur' }]
            },
            optionsProductList: [],
            optionsRepayWayList: [],
            lineTxt: {
                INDEPENDENT_PAYMENT: '自主支用',
                ENTRUSTED_PAYMENT: '受托支付'
            },
            repayWayTxt: {
                EQUAL_PRINCIPAL: '等额本息',
                INTEREST_BEFORE_CAPITAL: '先息后本',
                ONE_TIME_REPAYMENT: '一次性还本付息'
            }
        };
    },
    mounted() { },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.resetForm('ruleForm');
        },
        showDialog() {
            this.loading = true;
            this.dialogVisible = true;
            // 获取产品信息和还款方式
            this.getKsbUsCreateLoanPageDetail();
        },
        // 获取产品信息和还款方式
        getKsbUsCreateLoanPageDetail() {
            ksbUsCreateLoanPageDetail({
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                this.loading = false;
                this.pageInfoData = res.data;
                this.optionsProductList = res.data.lenderProductVos.map((item) => {
                    return {
                        id: item.id,
                        label: `${item.repaymentMethod}-${item.lenderProductTenure}-${this.lineTxt[item.makeLoanMethod]}`
                    };
                });
                this.optionsRepayWayList = res.data.repaymentTypes.map((item) => {
                    return {
                        value: item.code,
                        label: `${item.name}`
                    };
                });
            });
        },
        submitForm(formName) {
            if (this.ruleForm.loanAmount > 5000) {
                return this.$message.error('贷款金额不能大于5000万,请确认金额是否正确');
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.applicationCode = this.$route.query.loanNumber;
                    this.loading = true;
                    ksbUsCreateLoan(this.ruleForm)
                        .then((res) => {
                            this.loading = false;
                            this.$message.success('创建成功！');
                            this.handleClose();
                            this.resetForm('ruleForm');
                        })
                        .catch((err) => {
                            this.loading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.dialogVisible = false;
            this.$emit('close-dialog');
        }
    }
};
</script>
<style lang="scss" scoped>
.usKsbRepayDialog {
    .el-button {
        width: 100px;
        border-radius: 3px;
        margin-left: 10px;
    }
}
</style>
