<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /资金管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                基本信息
            </div>
            <el-form :model="formData" style="padding: 0 12px" label-width="120px" class="Form" inline>
                <el-form-item label="资金来源：" prop="name">
                    <span class="text">{{ formData.name }}</span>
                </el-form-item>
                <el-form-item label="批次：">
                    <span class="text"> {{ formData.batch }}</span>
                </el-form-item>
                <el-form-item label="总金额：" prop="batch">
                    <span class="text"> {{ formData.amount }} 万元</span>
                </el-form-item>

                <el-form-item label="开始日期：" prop="beginDate">
                    <span class="text">{{ formData.beginDate }}</span>
                </el-form-item>
                <el-form-item label="到期日期：" prop="expireDate">
                    <span class="text"> {{ formData.expireDate }}</span>
                </el-form-item>
                <el-form-item label="单笔最大限额：" prop="limitAmount">
                    <span class="text"> {{ formData.limitAmount }} 万</span>
                </el-form-item>

                <el-form-item label="资金成本：" prop="interestRate">
                    <span class="text">{{ formData.interestRate }}</span>
                </el-form-item>
                <el-form-item label="是否兑付：" prop="isCashing">
                    <span class="text">{{ formData.isCashing ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="实际兑付日期：" prop="cashingDate">
                    <span class="text">{{ formData.cashingDate }}</span>
                </el-form-item>

                <el-form-item label="在贷金额：" prop="bcName">
                    <span class="text">{{ formData.loanBalance }} 万</span>
                </el-form-item>
                <el-form-item label="可用金额：">
                    <span class="text">{{ formData.availableAmount }} 万</span>
                </el-form-item>
                <el-form-item label="创建时间：" prop="bcName">
                    <span class="text">{{ formData.updateTime }}</span>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="block" style="justify-content: space-between; width: 95%">
            <div style="display: flex; align-items: center">
                <div class="line"></div>
                <div>放款明细</div>
            </div>
            <div><el-button type="primary" @click="openAdd">添加资产</el-button></div>
        </div>

        <!-- 详情列表 -->
        <table-page :tableData="tableData" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @delete="_delete" />
        <el-dialog class="addDialog" :modal-append-to-body="false" title="添加资产" :visible.sync="centerDialogVisible"
            width="25%" center>
            <el-form label-width="100px" :model="addForm">
                <el-row>
                    <el-col>
                        <el-form-item label="贷款单号:" prop="loanCode">
                            <el-input v-model="addForm.loanCode" placeholder="请填写贷款单号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd">取 消</el-button>
                <el-button type="primary" @click="insureAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="deleteDialog" :modal-append-to-body="false" title="删除资产" :visible.sync="deleteDialogVisible"
            width="25%" center>
            <div class="warn-tip">确认要删除该笔资产吗？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDelete">取 消</el-button>
                <el-button type="primary" @click="insureDelete">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import moment from 'moment'; //导入文件

import { detailSave, deletMes, addMes, getOne } from '../../../api/index.js';
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            nowId: '',
            deleteId: '',
            addForm: {
                fundCode: '',
                loanCode: ''
            },
            deleteDialogVisible: false,
            centerDialogVisible: false,
            formData: {}, //基本信息列表
            dateTime: [], //到期时间

            // totalSize: 10,
            tableData: [],
            Code: '',

            columns: [
                {
                    label: '贷款单号',
                    prop: 'loanCode',
                    width: 180
                },
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: 190
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: 100
                },
                {
                    label: '产品',
                    prop: 'productName',
                    width: 140
                },
                {
                    label: this.$t('loan_detail_dkejw'),
                    prop: 'loanAmount',
                    width: 120
                },
                {
                    label: '贷款开始日期',
                    prop: 'loanStartDate',
                    width: 180
                },
                {
                    label: '贷款结束日期',
                    prop: 'loanEndDate',
                    width: 180
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus',
                    width: 110
                },

                {
                    label: '利率(%)',
                    prop: 'apr',
                    width: 80
                },

                {
                    label: this.$t('loan_detail_zq'),
                    prop: 'loanPeriod',
                    width: 80
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentMethod',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 180
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    // width: 160,
                    operates: [
                        {
                            event: 'delete',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },

    mounted() {
        this.nowId = this.$route.query.id;
        this.addForm.fundCode = this.$route.query.code;
        this.getDetail();
    },
    methods: {
        //获取指定参数列表
        getDetail() {
            getOne({ id: this.nowId }).then((res) => {
                if (res.code == 200) {
                    this.formData = res.data;
                    this._getList();
                }
            });
        },
        //确定删除资产
        insureDelete() {
            deletMes({ id: this.deleteId }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('删除成功');
                    this.deleteDialogVisible = false;
                    this.getDetail();
                }
            });
        },
        closeDelete() {
            this.deleteDialogVisible = false;
            this.deleteId = '';
        },
        insureAdd() {
            addMes(this.addForm)
                .then((res) => {
                    if (res.code == 200) {
                        this.$message.success('添加成功');
                        this.getDetail();
                        this.addForm.loanCode = '';
                        this.centerDialogVisible = false;
                    }
                })
                .catch((err) => {
                    this.addForm.loanCode = '';
                    this.centerDialogVisible = false;
                });
        },
        openAdd() {
            this.centerDialogVisible = true;
        },
        closeAdd() {
            this.centerDialogVisible = false;
            this.addForm.loanCode = '';
        },
        _delete(row) {
            this.deleteId = row.loanFundId;
            this.deleteDialogVisible = true;
        },
        handlePageChange(page) {
            this.pageData = page;
            this._getList();
        },
        _getList() {
            detailSave({
                fundCode: this.$route.query.code
            }).then((res) => {
                this.tableData = res.data;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.Form {
    text-align: center;

    .el-form-item--small {
        width: 30%;
    }
}

.block {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    width: 100%;
    padding-left: 32px;
    margin: 24px 0;
    font-size: 18px;
    color: #323232;
    letter-spacing: 0;
    text-align: justify;
    line-height: 26px;
    font-weight: 500;

    .note {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #646566;
        letter-spacing: 0;
        text-align: justify;
        line-height: 26px;
        font-weight: 400;
        padding-left: 12px;
    }

    .line {
        width: 4px;
        height: 16px;
        background: #e52d6d;
        margin-right: 8px;
    }
}

.order {
    border-radius: 0px !important;
}

.text {
    width: 140px;
    display: block;
    margin-left: 30px;
    text-align: left;
}

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

.deleteDialog {
    .warn-tip {
        text-align: center;
        font-size: 16px;
        font-weight: 500;
    }
}

::v-deep .deleteDialog .el-dialog__header {
    display: flex;
    align-items: center;
}

::v-deep .deleteDialog .el-dialog__headerbtn {
    top: 10px;
}

.deleteDialog .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 40px;
}
</style>
