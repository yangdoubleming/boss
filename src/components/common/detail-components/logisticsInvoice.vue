<template>
    <div class="table-container" v-loading="loadingAll">
        <div class="table-header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.orderNo" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="账单编号">
                    <el-input v-model="formInline.billNo" placeholder="账单编号"></el-input>
                </el-form-item>
                <el-form-item label="账单状态">
                    <el-select v-model="formInline.billDetailStatus" placeholder="账单状态">
                        <el-option :label="item.label" :value="item.value" v-for="item in billDetailStatusTxt"
                            :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="btn-boxx">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <!-- <el-button type="primary" @click="onSubmit" style="margin-bottom: -6px;">下载</el-button> -->
                    <el-upload class="upload-btnn" :on-success="handleSuccess" :action="baseUrl" v-loading="loadingBtn"
                        :with-credentials="false" :headers="myHeaders" :show-file-list="false">
                        <el-button type="primary">导入账单</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-content">
            <el-table :data="tableData" stripe style="width: 100%">
                <!-- <el-table-column prop="billDetailDate" align="center" label="账单日期" width="180">
                    <template slot-scope="scope">
                        <el-popover placement="top-start" title="" width="200" trigger="hover"
                            :content="scope.row.address">
                            <div class="table-text-hidden" slot="reference">{{
                                scope.row.address
                            }}</div>
                        </el-popover>
                    </template></el-table-column> -->
                <el-table-column align="center" label="序号" type="index" width="50" />
                <el-table-column prop="orderDate" align="center" label="下单日期" width="140" />
                <el-table-column prop="billDetailDate" align="center" label="账单日期" width="140" />
                <el-table-column prop="orderNo" align="center" label="订单编号" />
                <el-table-column prop="fbaOrderNumber" align="center" label="FBA单号" />
                <el-table-column prop="transportChannel" align="center" label="运输渠道" />
                <el-table-column prop="customerOrderNumber" align="center" label="客户单号" />
                <el-table-column prop="address" align="center" label="转单号" />
                <el-table-column prop="totalPieces" align="center" label="总件数" />
                <el-table-column prop="address" align="center" label="总重量" />
                <el-table-column prop="customsDeclarationMethod" align="center" label="报关方式" />
                <el-table-column prop="productName" align="center" label="品名" />
                <el-table-column prop="costType" align="center" label="费用类型" />
                <el-table-column prop="currency" align="center" label="币种" />
                <el-table-column prop="chargeableWeight" align="center" label="计费重" />
                <el-table-column prop="weight" align="center" label="重量" />
                <el-table-column prop="volume" align="center" label="体积" />
                <el-table-column prop="currency" align="center" label="结算单位" />
                <el-table-column prop="unitPrice" align="center" label="结算单价" />
                <el-table-column prop="billDetailReceivableAmount" align="center" label="结算账单金额" />
                <el-table-column prop="adjustmentUnitPrice" align="center" label="对客单价" />
                <el-table-column prop="adjustmentAmount" align="center" label="对客账单金额" />
                <el-table-column prop="billDetailStatusTxt" align="center" label="账单状态" />
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.billDetailStatus === 'UNCONFIRMED'">
                            <el-button @click="showEdit(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="confirm(scope.row)" type="text" size="small">确认</el-button>
                        </div>
                        <div v-else>-</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="dialogVisibleEdit" width="30%" :before-close="handleCloseEdit">
            <div v-loading="loadingEdit">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="对客单价" prop="adjustmentUnitPrice">
                        <el-input v-model="ruleForm.adjustmentUnitPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="对客账单金额" prop="adjustmentAmount">
                        <el-input v-model="ruleForm.adjustmentAmount"></el-input>
                    </el-form-item>
                    <div style="display: flex;justify-content: flex-end;">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 120px;">确认</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { values } from 'lodash';
import {
    logisticsBillDetails,
    logisticsConfirmBillDetail,
    logisticsUpdateBillDetail,
    logisticsUploadBillFile
} from '../../../api/boss1';

export default {
    data() {
        return {
            baseUrl: '',
            myHeaders: { token: "" },
            formInline: {
                orderNo: '',
                billNo: '',
                billDetailStatus: ''
            },
            tableData: [],
            dialogVisibleEdit: false,
            loadingEdit: false,
            loadingAll: false,
            loadingBtn: false,
            ruleForm: {
                adjustmentUnitPrice: '',
                adjustmentAmount: '',
            },
            rules: {
                adjustmentUnitPrice: [
                    { required: true, message: '请输入对客单价', trigger: 'blur' },
                    { pattern: /^[0-9]+.?[0-9]*$/, message: "请输入正确的数字", trigger: "blur" },
                ],
                adjustmentAmount: [
                    { required: true, message: '请输入对客账单金额', trigger: 'blur' },
                    { pattern: /^[0-9]+.?[0-9]*$/, message: "请输入正确的数字", trigger: "blur" },
                ],
            },
            billDetailStatusTxt: [
                { label: '未同步', value: 'UNCONFIRMED' },
                { label: '已同步', value: 'DF_CONFIRMED' },
                { label: '已确认', value: 'CONFIRMED' },
                { label: '已支付', value: 'PAY' }
            ]
        }
    },
    mounted() {
        // 获取表格数据
        this.getTableDataList()
        this.baseUrl = window.location.hostname.includes('.com') ? `${process.env.VUE_APP_BASE_URL}/lending/df-bill-detail/uploadBillFile?applicationCode=${this.$route.query.loanNumber}` : `/api/lending/df-bill-detail/uploadBillFile?applicationCode=${this.$route.query.loanNumber}`
        this.myHeaders.token = localStorage.getItem('token')
    },
    methods: {
        // 查询-搜索
        onSubmit() {
            // 获取表格数据
            this.getTableDataList()
        },
        // 获取表格数据
        getTableDataList() {
            this.loadingAll = true
            let params = Object.assign(this.formInline, {
                userId: this.$route.query.userId,
                applicationCode: this.$route.query.loanNumber
            })
            logisticsBillDetails(params).then(res => {
                this.loadingAll = false
                this.tableData = res.data && res.data.records || []
                if (this.tableData.length > 0) {
                    this.tableData.forEach(item => {
                        item.billDetailStatusTxt = this.billDetailStatusTxt.find(i => i.value == item.billDetailStatus).label
                    })
                }
            }).catch(() => {
                this.loadingAll = false
            })
        },
        // 显示修改弹窗
        showEdit(row) {
            this.dialogVisibleEdit = true
            this.ruleForm.adjustmentUnitPrice = row.adjustmentUnitPrice
            this.ruleForm.adjustmentAmount = row.adjustmentAmount
            this.ruleForm.id = row.id
            this.ruleForm.applicationCode = this.$route.query.loanNumber
        },
        // 修改
        edit() {
            this.loadingEdit = true
            logisticsUpdateBillDetail(this.ruleForm).then(res => {
                this.loadingEdit = false
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                // 关闭修改弹窗
                this.handleCloseEdit()
                // 获取表格数据
                this.getTableDataList()
            }).catch(() => {
                this.loadingEdit = false
            })
        },
        // 关闭修改弹窗
        handleCloseEdit() {
            this.dialogVisibleEdit = false
            this.ruleForm = {
                adjustmentUnitPrice: '',
                adjustmentAmount: '',
            }
        },
        // 确认
        confirm(row) {
            this.$confirm('确认账单信息无误？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                logisticsConfirmBillDetail({
                    applicationCode: this.$route.query.loanNumber,
                    id: row.id
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '确认成功!'
                    });
                    // 获取表格数据
                    this.getTableDataList()
                })

            }).catch(() => { });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 修改
                    this.edit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleSuccess(res, file) {
            console.log("🚀 ~ handleSuccess ~ res:", res)
            if (res.code === 200 && res.data) {
                this.loadingBtn = false;
                // 获取表格数据
                this.getTableDataList()
                this.$message.success('导入账单文件成功');
            } else {
                this.loadingBtn = false;
                this.$message.error(res.message);
            }
        },
    },

}
</script>
<style>
.el-upload--text {
    width: 120px;
}
</style>

<style lang="scss" scoped>
.table-container {
    padding: 20px;
    background: #fff;
}

.table-text-hidden {
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.btn-boxx {}

.upload-btnn {
    float: right;
}
</style>