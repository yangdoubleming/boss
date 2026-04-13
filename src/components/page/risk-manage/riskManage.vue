<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 额度审批管理</span>
        </div>
        <table-page @conditional-reset="handleConditionalReset" @quote="_quote" :tableData="tableData"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" :current="currentPage"
            @viewDetails="toDetail" @page-change="handlePageChange" @conditional-query="handleColumnsFilter">
        </table-page>
        <el-dialog class="addDialog" :modal-append-to-body="false" title="额度审批" :visible.sync="centerDialogVisible"
            width="25%" center>
            <el-form ref="addForm" :rules="addRule" label-width="100px" :model="addForm">
                <el-row>
                    <el-col>
                        <el-form-item label="审批额度:" prop="creditAmountActual">
                            <el-input type="number" v-model="addForm.creditAmountActual" placeholder="请填写审批额度">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="文档链接:" prop="fileUrl">
                            <el-input v-model="addForm.fileUrl" placeholder="请填写文档链接"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="审批意见:" prop="opinions">
                            <el-input resize="none" type="textarea" v-model="addForm.opinions"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="reset">取 消</el-button>
                <el-button type="primary" @click="submit">审批通过</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tablePage from '../../common/tablePage.vue';
import { tableMixin } from '../../../utils/mixin';
import { passList, creditPass } from '../../../api/ksb';
export default {
    name: 'riskManage',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            totalSize: 0,
            addRule: {
                creditAmountActual: [
                    { required: true, message: '请填写审批额度', trigger: 'blur' },
                    {
                        pattern: /^(([1-9]?\d(\.\d{1,2})?)|100|100.00)$/,
                        message: '输入金额不超过100万'
                    }
                ]
            },
            addForm: {
                id: '',
                creditAmountActual: '',
                fileUrl: '',
                opinions: ''
            },
            centerDialogVisible: false,
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '审批编号',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '授信单号',
                    filterable: true
                },
                {
                    type: 'select',
                    value: 'PENDING',
                    options: [
                        {
                            label: this.$t('status_all'),
                            value: ''
                        },
                        {
                            label: '待审核',
                            value: 'PENDING'
                        },
                        {
                            label: '已审核',
                            value: 'PROCESSED'
                        }
                    ],
                    placeholder: '状态',
                    filterable: true
                },
                {
                    type: 'daterange',
                    filterable: true,
                    value: [],
                    placeholderArr: ['申请开始时间 ', '申请结束时间']
                }
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '220'
                },
                {
                    label: '审批编号',
                    prop: 'creditApproveCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },
                {
                    label: '产品名称',
                    prop: 'lenderName',
                    width: '200'
                },
                {
                    label: '当前可提现额度',
                    prop: 'creditAmountBefore',
                    width: '150'
                },
                {
                    label: '待审批可提现额度',
                    prop: 'creditAmountTotal',
                    width: '150'
                },
                {
                    label: '可用额度',
                    prop: 'availableAmountBefore',
                    width: '150'
                },
                {
                    label: '实际审批额度',
                    prop: 'creditAmountActual',
                    width: '150'
                },
                {
                    label: '币种',
                    prop: 'currency',
                    width: '150'
                },

                {
                    label: '审批状态',
                    prop: 'approveStatus',
                    width: '150'
                },
                {
                    label: '审批人',
                    prop: 'approveMan',
                    width: '150'
                },

                {
                    label: '审批时间',
                    prop: 'approveTime',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_sqsj'),
                    prop: 'createTime',
                    width: '220'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
                    operates: [
                        {
                            event: 'quote',
                            text: '审核',
                            type: 'primary'
                        },
                        {
                            event: 'viewDetails',
                            text: this.$t('common_see'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() {


    },
    mounted() {

    },
    activated() {

    },
    methods: {
        _getList() {
            if (this.$route.query.creditCode) {
                this.filterOptions[1].value = this.$route.query.creditCode
                this.filterOptions[2].value = ''
                this.$route.query.creditCode = ''
                window.history.replaceState('', '', `${window.location.origin}/risk-manage-list`)
            }
            let starTime =
                this.filterOptions[3].value && this.filterOptions[3].value.length ? this.filterOptions[3].value[0] + ' 00:00:00' : '';
            let endTime =
                this.filterOptions[3].value && this.filterOptions[3].value.length ? this.filterOptions[3].value[1] + ' 23:59:59' : '';
            passList({
                current: this.currentPage,
                size: 10,
                creditApproveCode: this.filterOptions[0].value,
                creditCode: this.filterOptions[1].value,
                approveStatus: this.filterOptions[2].value,
                createTimeBegin: starTime,
                createTimeEnd: endTime
            }).then((res) => {
                if ((res.code = 200)) {
                    res.data.records.forEach((item) => {
                        item.hiddenBtn = item.approveStatus == 'PENDING' ? '' : '审核';
                        if (item.approveStatus == 'PENDING') {
                            item.approveStatus = '待审核';
                        } else if (item.approveStatus == 'PROCESSED') {
                            item.approveStatus = '已审核';
                        }
                        item.creditAmountTotal = Number(item.creditAmountTotal).toFixed(2) + '万';
                        item.creditAmountBefore = Number(item.creditAmountBefore).toFixed(2) + '万';
                        item.creditAmountActual = Number(item.creditAmountActual).toFixed(2) + '万';
                        item.availableAmountBefore = Number(item.availableAmountBefore).toFixed(2) + '万';
                    });
                    this.tableData = res.data.records;
                    this.totalSize = res.data.total;

                }
            });
        },
        submit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    creditPass(this.addForm)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message.success('审核通过');
                                this._getList();
                                this.reset();
                            }
                        })
                        .catch((err) => {
                            this.reset();
                        });
                }
            });
        },
        reset() {
            this.$refs.addForm.resetFields(); //重置表单数据
            this.centerDialogVisible = false;
        },
        _quote(row) {
            this.centerDialogVisible = true;
            this.addForm.id = row.id;
        },
        toDetail(val) {
            this.$router.push({
                path: '/minecraft-detail',
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.lenderName,
                    creditAmount: val.creditAmount,
                    applicationStatus: val.applicationStatus,
                    account: val.account,
                    userId: val.userId,
                    creditCode: val.creditCode,
                    lenderId: val.lenderId
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
::v-deep .addDialog .el-dialog__header {
    display: flex;
    align-items: center;
}

::v-deep .addDialog .el-dialog__headerbtn {
    top: 10px;
}

.addDialog .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 40px;
}
</style>
