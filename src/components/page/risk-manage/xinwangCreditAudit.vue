<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 审批列表</span>
        </div>
        <table-page @conditional-reset="handleConditionalReset" @quote="_quote" :tableData="tableData"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" :current="currentPage"
            @viewDetails="toDetail" @page-change="handlePageChange" @conditional-query="handleColumnsFilter">
        </table-page>
        <el-dialog class="addDialog" :modal-append-to-body="false" title="授信审批" :visible.sync="centerDialogVisible"
            width="25%" center>
            <el-form ref="addForm" :rules="addRule" label-width="100px" :model="addForm">
                <el-row>
                    <el-col>
                        <el-form-item label="" prop="status">
                            <el-radio v-model="addForm.status" label="PASS">通过</el-radio>
                            <el-radio v-model="addForm.status" label="REJECT">拒绝</el-radio>
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
import { xinwangCreditPassList, xinwangCreditPass } from '../../../api/ksb';
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
                status: [
                    { required: true, message: '请选择审批状态', trigger: 'blur' }
                ]
            },
            addForm: {
                applicationCode: '',
                status: '',
            },
            centerDialogVisible: false,
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '申请单号',
                    filterable: true
                },
                {
                    type: 'select',
                    value: 'PENDING',
                    options: [
                        {
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '待审核',
                            value: 'PENDING'
                        },
                        {
                            label: '通过',
                            value: 'PASS'
                        },
                        {
                            label: '拒绝',
                            value: 'REJECT'
                        }
                    ],
                    placeholder: '状态',
                    filterable: true
                },
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '销售姓名',
                //     filterable: true
                // },
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '销售手机号',
                //     filterable: true
                // },
            ],
            columns: [
                {
                    label: '申请单号',
                    prop: 'applicationCode',
                    width: '220'
                },
                {
                    label: '审批状态',
                    prop: 'status',
                    width: '150'
                },
                // {
                //     label: '销售姓名',
                //     prop: 'salesName',
                //     width: '150'
                // },

                // {
                //     label: '销售手机号',
                //     prop: 'salesPhone',
                //     width: ''
                // },
                {
                    label: '审批时间',
                    prop: 'approvalTime',
                    width: ''
                },
                {
                    label: '审批人',
                    prop: 'approver',
                    width: ''
                },
                {
                    label: '飞书审批流编号',
                    prop: 'instanceCode',
                    width: ''
                },
                {
                    label: '创建时间',
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
            xinwangCreditPassList({
                current: this.currentPage,
                size: 10,
                applicationCode: this.filterOptions[0].value,
                status: this.filterOptions[1].value,
                // salesName: this.filterOptions[2].value,
                // salesPhone: this.filterOptions[3].value,
            }).then((res) => {
                if (res.data.records && res.data.records.length > 0) {
                    res.data.records.forEach((item) => {
                        item.hiddenBtn = item.status == 'PENDING' ? '' : '审核';
                        if (item.status == 'PENDING') {
                            item.status = '待审核';
                        } else if (item.status == 'PASS') {
                            item.status = '通过';
                        } else if (item.status == 'REJECT') {
                            item.status = '拒绝';
                        }
                        item.creditAmountTotal = Number(item.creditAmountTotal).toFixed(2) + '万';
                        item.creditAmountBefore = Number(item.creditAmountBefore).toFixed(2) + '万';
                        item.creditAmountActual = Number(item.creditAmountActual).toFixed(2) + '万';
                        item.availableAmountBefore = Number(item.availableAmountBefore).toFixed(2) + '万';
                    });
                    this.tableData = res.data.records || []
                    this.totalSize = res.data.total;
                }else{
                    this.tableData = []
                }
            });
        },
        submit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    xinwangCreditPass(this.addForm).then((res) => {
                        this.$message.success('操作成功');
                        this._getList();
                        this.reset();
                    }).catch((err) => {
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
            this.addForm.applicationCode = row.applicationCode;
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
