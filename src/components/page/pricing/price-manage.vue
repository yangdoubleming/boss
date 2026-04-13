<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                / 贷款定价管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
            <el-button style="float: right" type="primary" @click="addNew">新增调整政策</el-button>
        </div>
        <table-page @page-change="handlePageChange" @conditional-query="handleColumnsFilter"
            @conditional-reset="handleConditionalReset" @addNew="addNew" @removeProduct="removeProduct"
            :columns="columns" :filterOptions="filterOptions" :tableData="tableData"
            :totalSize="totalSize"></table-page>
        <!-- 新增价格调整 -->
        <el-dialog custom-class="change-price" :title="isEdit ? '修改价格调整' : '新增价格调整'" :visible.sync="priceFormShow"
            width="35%">
            <el-form :hide-required-asterisk="false" :rules="addRules" :inline="false" :model="priceForm"
                ref="priceForm" style="padding-left: 20px;width: 70%;" label-width="150px" label-position="left">
                <el-form-item label="调价政策名称：" prop="name">
                    <el-input v-model="priceForm.name"></el-input>
                </el-form-item>
                <el-form-item label="调价政策类型:" prop="type">
                    <el-select style="width: 100%;" v-model="priceForm.type">
                        <el-option value="公司价格调整" label="公司价格调整"></el-option>
                        <el-option value="银行价格调整" label="银行价格调整"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="适用产品:" prop="productName">
                    <el-select style="width: 100%;" v-model="priceForm.productName">
                        <el-option v-for="item in  allData[1] " :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调整基数:" prop="adjustNumber">
                    <el-select style="width: 100%;" v-model="priceForm.adjustNumber">
                        <el-option value="放款额" label="放款额"> </el-option>
                        <el-option value="日均余额" label="日均余额"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="还款方式:" prop="repaymentType">
                    <el-select style="width: 100%;" v-model="priceForm.repaymentType">
                        <el-option v-for="item in  allData[6] " :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调整价格:" prop="value">
                    <el-input v-model="priceForm.value"> <template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="折算系数:" prop="coefficient">
                    <el-input v-model="priceForm.coefficient"> <template slot="append">%</template></el-input>
                </el-form-item>
                <el-form-item label="生效开始日期:" prop="startTime">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"
                        v-model="priceForm.startTime" type="date" placeholder="生效开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="生效结束日期:" prop="endTime">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" v-model="priceForm.endTime"
                        type="date" placeholder="生效结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调整描述和原因:" prop="reason">
                    <el-input resize="none" type="textarea" :rows="3" :placeholder="$t('loan_detail_qsrnr')"
                        v-model="priceForm.reason">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="priceFormShow = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="enusreChange" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getPriceData, getAllData, addPrice, deleteAdjust, changeAdjust } from '../../../api/price'
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            isEdit: false,//是否是编辑
            user: localStorage.getItem('userName'),
            allData: [],
            addRules: {
                startTime: [
                    { required: true, message: '请选择生效开始日期', trigger: 'change' },
                ],
                endTime: [
                    { required: true, message: '请选择生效结束日期', trigger: 'change' },
                ],
                name: [
                    { required: true, message: '请输入调价政策名称', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择调价政策类型', trigger: 'change' },
                ],
                productName: [
                    { required: true, message: '请选择适用产品', trigger: 'change' },
                ],
                adjustNumber: [
                    { required: true, message: '请输入调整基数', trigger: 'blur' },
                ],
                repaymentType: [
                    { required: true, message: '请输入还款方式', trigger: 'blur' },
                ],
                value: [
                    { required: true, message: '请输入调整价格', trigger: 'blur' },
                    // { max: 100, message: '价格调整比例不能超过100%', trigger: 'blur' }

                ],
                coefficient: [
                    { required: true, message: '请输入折算系数', trigger: 'blur' },
                    // { max: 100, message: '折算系数比例不能超过100%', trigger: 'blur' }
                ],
                reason: [
                    { required: true, message: '请输入调整描述和原因', trigger: 'blur' },
                ]
            },
            totalSize: 0,//总条数
            useProduct: false,
            value1: "",
            textarea: "",
            showConfirmRepayment: true,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    options: [],
                    placeholder: '政策名称',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '适用产品',
                    filterable: true
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: ['生效开始时间', '生效结束时间'],
                    filterable: true,
                    options: []
                }
            ],
            tableData: [],
            columns: [
                {
                    label: '政策编号',
                    prop: 'code',
                    width: 150
                },
                {
                    label: '政策名称',
                    prop: 'name',
                    width: 150

                },
                {
                    label: '调价政策类型',
                    prop: 'type',
                    width: 140

                },
                {
                    label: '适用产品',
                    prop: 'productName',
                    width: 140

                },
                {
                    label: '调整基数',
                    prop: 'adjustNumber',
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentType',
                },
                {
                    label: '调整价格(%)',
                    prop: 'value',
                    width: 120
                },
                {
                    label: '折算系数(%)',
                    prop: 'coefficient',
                    width: 120

                },
                {
                    label: '调整描述和原因',
                    prop: 'reason',
                    width: 160
                },
                {
                    label: '生效开始日期',
                    prop: 'startTime',
                    width: 160

                },
                {
                    label: '生效截止日期',
                    prop: 'endTime',
                    width: 160
                },
                {
                    label: '创建人',
                    prop: 'createName',
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 160

                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [

                        {
                            event: 'addNew',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary',
                        },
                        {
                            event: 'removeProduct',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }

            ],
            priceFormShow: false,
            priceForm: {},
        }
    },
    created() {
        this.getAllData()
    },
    methods: {
        //打开新增政策的弹窗
        addNew(row) {
            if (row.productName) {
                this.isEdit = true
                this.priceFormShow = true
                this.priceForm = { ...row }
            } else {
                this.priceForm = {}
                this.isEdit = false
                this.priceFormShow = true
            }
        },
        colseChange() {
            this.$refs.priceForm.resetFields();
            this.priceFormShow = false


        },
        //确认修改和新增政策
        enusreChange() {
            this.$refs.priceForm.validate((valid) => {
                if (valid) {
                    if (!this.isEdit) {
                        let date1 = new Date(this.priceForm.startTime)
                        let date2 = new Date(this.priceForm.endTime)
                        let time1 = date1.getTime();
                        let time2 = date2.getTime();
                        if (
                            time1 - time2 > 0
                        ) {
                            return this.$message.error('结束时间不能小于开始时间！');
                        }
                        this.allData[1].forEach(item => {
                            if (item.value == this.priceForm.productName) {
                                this.priceForm.pid = item.id
                            }
                        })
                        if (this.priceForm.coefficient > 100) {
                            return this.$message.error('折扣系数不能大于100！');
                        }
                        if (this.priceForm.value > 100) {
                            return this.$message.error('调整价格不能大于100！');
                        }
                        this.priceForm.createName = this.user
                        this.priceForm.value = ((this.priceForm.value) / 100)
                        this.priceForm.coefficient = ((this.priceForm.coefficient) / 100)
                        this.loading = true
                        addPrice(this.priceForm).then(res => {
                            this.$refs.priceForm.resetFields();
                            this.priceFormShow = false
                            this.$message.success('添加成功')
                            this._getList()
                            this.loading = false
                        })
                    } else {
                        let date1 = new Date(this.priceForm.startTime)
                        let date2 = new Date(this.priceForm.endTime)
                        let time1 = date1.getTime();
                        let time2 = date2.getTime();
                        if (
                            time1 - time2 > 0
                        ) {
                            return this.$message.error('结束时间不能小于开始时间！');
                        }
                        this.allData[1].forEach(item => {
                            if (item.value == this.priceForm.productName) {
                                this.priceForm.pid = item.id
                            }
                        })
                        if (this.priceForm.coefficient > 100) {
                            return this.$message.error('折扣系数不能大于100！');
                        }
                        if (this.priceForm.value > 100) {
                            return this.$message.error('调整价格不能大于100！');
                        }
                        this.priceForm.value = ((this.priceForm.value) / 100)
                        this.priceForm.coefficient = ((this.priceForm.coefficient) / 100)
                        changeAdjust({
                            data: this.priceForm,
                            id: this.priceForm.id
                        }).then(res => {
                            this.$refs.priceForm.resetFields();
                            this.priceFormShow = false
                            this.$message.success('修改成功')
                            this._getList()
                            this.loading = false
                        })
                    }
                }
            }
            )
        },
        //删除政策
        removeProduct(row) {
            this.$confirm('确认要删除价格调整吗?', '删除价格配置', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteAdjust({
                    data: {
                        current: this.currentPage,
                        size: 10,
                    },
                    id: row.id
                },).then(res => {
                    this.$message.success('删除成功！');
                    this._getList();
                });
            });
        },
        _getList() {
            let starTime = this.filterOptions[2].value.length ? this.filterOptions[2].value[0] + ' 00:00:00' : '';
            let endTime = this.filterOptions[2].value.length ? this.filterOptions[2].value[1] + ' 23:59:59' : '';
            getPriceData(
                {
                    current: this.currentPage,
                    size: 10,
                    name: this.filterOptions[0].value,
                    pid: this.filterOptions[1].value,
                    startTime: starTime,
                    endTime: endTime,
                }
            ).then(res => {
                res.data.records.forEach(item => {
                    item.value = item.value * 100
                    item.coefficient = item.coefficient * 100
                })
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            })

        },
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
                this.allData[1].forEach(item => {
                    this.filterOptions[1].options.push({
                        label: item.value,
                        value: item.id
                    }
                    )
                })
            }).catch(err => {
                this.loading = false;
            })
        }

    },
};
</script>
<style lang="scss" scoped></style>