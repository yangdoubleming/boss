<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>


        <!-- 状态变更 -->
        <el-dialog title="状态变更" :visible.sync="dialogFollow" width="500px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="当前状态: " prop="status">
                    <el-select v-model="ruleForm.status" disabled></el-select>
                </el-form-item>
                <el-form-item label="状态变更为: " prop="">
                    <el-select v-model="ruleForm.updateStatus" placeholder="请选择状态" size="medium">
                        <el-option label="未入账" value="NOT_WRITTEN_OFF"></el-option>
                        <el-option label="已入账" value="WRITTEN_OFF"></el-option>
                        <el-option label="非还款交易" value="NOT_REPAYMENT"></el-option>

                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogFollow = false">取消</el-button>
                    <el-button type="primary" @click="_updateStatus(ruleForm)">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @updateStatus="_showRecords"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" />


    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { repaymentWipeFlowList, repaymentWipeFlowUpdateStatus } from '../../../api/index';
export default {
    name: 'repayment-wipe-flow-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogFollow: false,
            tableOperate: [],
            tableData: [],
            baseUrl: process.env.VUE_APP_BASE_URL,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '交易流水号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '账户名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    options: [],
                    placeholder: '账户号',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: '未入账',
                            value: 'NOT_WRITTEN_OFF',
                        },
                        {
                            label: '已入账',
                            value: 'WRITTEN_OFF'
                        },
                        {
                            label: '非还款交易',
                            value: 'NOT_REPAYMENT'
                        },
                    ],
                    placeholder: '状态',
                    filterable: true
                },
                {
                    type: 'datetimerange',
                    value: [],
                    placeholder: '交易时间',
                    filterable: true,
                    placeholderArr: ['交易时间开始', '交易时间结束'],
                    options: []
                },
            ],
            columns: [
                {
                    label: '交易流水号',
                    prop: 'serialNo',
                    width: 230,
                },
                {
                    label: this.$t('loan_detail_pingtai'),
                    prop: 'platform',
                    width: 60
                },
                {
                    label: '交易时间',
                    prop: 'dealTime',
                    width: 100
                },
                {
                    label: '交易金额(元)',
                    prop: 'dealAmount',
                    width: 100
                },
                {
                    label: '剩余待入账金额(元)',
                    prop: 'remainDealAmount',
                    width: 150
                },
                {
                    label: '币种',
                    prop: 'currency',
                    width: 65
                },

                {
                    label: '账户名',
                    prop: 'accountName',
                    width: 150,
                },
                {
                    label: '账户号',
                    prop: 'accountNo',
                    width: 180
                },

                {
                    label: '银行',
                    prop: 'accountBankName',
                    width: 180,
                },
                {
                    label: '交易类型',
                    prop: 'debitFlag',
                    width: 80,
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'status',
                    width: 100
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'updateStatus',
                            text: '状态变更',
                            type: 'primary'
                        },
                        // {
                        //     event: 'toLoanning',
                        //     text: this.$t('common_see'),
                        //     type: 'primary'
                        // },

                    ],
                    fixed: 'right'
                }
            ],
            ruleForm: {
                id: '',
                status: '',
                updateStatus: ''
            },

        };
    },
    created() {
    },
    methods: {
        // 获取列表
        _getList() {
            repaymentWipeFlowList({
                current: this.currentPage,
                size: 10,
                serialNo: this.filterOptions[0].value,
                accountName: this.filterOptions[1].value,
                accountNo: this.filterOptions[2].value,
                status: this.filterOptions[3].value,
                dealTimeBegin: this.filterOptions[4].value[0] ? this.filterOptions[4].value[0] : '',
                dealTimeEnd: this.filterOptions[4].value[1] ? this.filterOptions[4].value[1].replace(/00:00:00/g, "23:59:59") : ''
            }).then((res) => {
                this.tableData = res.data.records.map(x => {
                    x.currency = x.currency == 'CNY' ? '人民币' : x.currency;
                    x.dealTime = x.dealTime ? x.dealTime.substring(0, 10) : "-"
                })

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },


        toLoanning(val) {
            this.$router.push({
                path: '/overdue-info',
                query: {
                    loanCode: val.loanCode,
                    bname: val.bname,
                    bphoneNumber: val.bphoneNumber,
                }
            });
        },

        _showRecords(val) {
            this.ruleForm.id = val.id
            this.ruleForm.status = val.status
            this.dialogFollow = true
        },
        _updateStatus(val) {
            repaymentWipeFlowUpdateStatus({
                id: val.id,
                status: val.updateStatus,
            }).then(res => {
                this.$message.success('操作成功')
                this.dialogFollow = false
                this._getList()
            })
        }
    }
}
</script>
<style>
.el-upload--text {
    height: 34px;
    border: none;
    width: 110px;
}
</style>
<style lang='less' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px;
    height: 178px;
    display: block;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>