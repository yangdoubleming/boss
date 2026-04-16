<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">订单复核</span>
        </div>
        <el-row :gutter="24" class="searchForm">
            <el-form ref="ruleForm" :model="ruleForm" label-width="85px"
                style="padding: 20px 0 0 20px; background-color: #fff; margin: 0 12px 0 12px">
                <el-row style="display: flex">
                    <el-form-item label="订单编号：">
                        <el-input v-model="ruleForm.orderNo"></el-input>
                    </el-form-item>
                    <div class="actionButton">
                        <el-button type="primary" @click="searchCase" style="margin-left: 12px">搜索</el-button>
                        <el-button @click="reset">重置</el-button>
                    </div>
                </el-row>
            </el-form>
        </el-row>
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div class="title">
                <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">审核列表</div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData" v-loading="loading"
                    element-loading-text="加载中，请稍后" style="width: 100%; font-size: 14px" @select="handleSelectionChange"
                    @select-all="handleSelectAll">
                    <el-table-column prop="orderNo" label="订单编号" align="center" width="240px"> </el-table-column>
                    <el-table-column prop="policyStatr" label="保险起期" align="center" width="240px"> </el-table-column>
                    <el-table-column prop="policyStatus" label="保单状态" align="center"> </el-table-column>
                    <el-table-column prop="channelCode" label="渠道码" align="center"> </el-table-column>
                    <el-table-column prop="payTime" label="支付时间" align="center" width="160px"> </el-table-column>
                    <el-table-column prop="amount" label="保费(元)" align="center"> </el-table-column>
                    <el-table-column prop="createName" label="操作人" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="createTime" label="操作时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="redact(scope.row)" type="text" v-if="scope.row.type === 'N'">复核</el-button>
                            <el-button type="text" v-else disabled>--</el-button>
                            <!-- <el-button type="text" @click="renew(scope.row)" v-if="Number(scope.row.days)<=60 && scope.row.comanyName=='大地' && scope.row.dataMark=='线上'">续保</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-size="pageSize"
                    :page-sizes="[10, 20, 50]" @current-change="currentChange" @size-change="handleSizeChange"
                    style="text-align: right; margin: 40px 20px" :current-page.sync="currentPage" v-if="total > 0">
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog :visible.sync="dialogVisibleEdit" width="30%" class="diaPage" :close-on-click-modal="false">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="订单金额：" prop="amount">
                    <el-input v-model="editForm.amount" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="渠道码：" prop="channelCode">
                    <el-input v-model="editForm.channelCode" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="保险起期：" prop="policyStatr">
                    <el-date-picker type="datetime" v-model="editForm.policyStatr" style="width: 100%"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="支付时间：" prop="payTime">
                    <el-date-picker type="datetime" v-model="editForm.payTime" style="width: 100%"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否退保：" prop="policyStatus">
                    <el-select v-model="editForm.policyStatus" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in state" :key="item.id" :value="item.label" :label="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="(dialogVisibleEdit = false)"
                    style="margin-right: 15px; color: #fe1964; border-color: #fe1964">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { auditList, approveOrder } from '@/api/insur';
import tablePage from '../../common/tablePage.vue';
import { Message } from 'element-ui';
import moment from 'moment'; //导入文件
// const uploadUrl = 'http://114.116.249.242:9050';
const state = [
    { id: 2, dictValue: '待审核', label: 'underwriting' },
    { id: 3, dictValue: '待付款', label: 'unpaid' },
    { id: 4, dictValue: '已付款', label: 'paid' },
    { id: 5, dictValue: '已生效', label: 'effective' },
    { id: 6, dictValue: '已过期', label: 'expired' },
    { id: 7, dictValue: '拒保', label: 'reject' },
    { id: 8, dictValue: '退保', label: 'surrender' },
    { id: 9, dictValue: '订单取消', label: 'cancel' }
];

export default {
    name: 'insurance',
    components: {
        tablePage
    },
    data() {
        return {
            ruleForm: {
                orderNo: '', // 订单编号
                current: 1,
                size: 10
            },
            editForm: {
                orderNo: '',
                policyStatr: '',
                policyStatus: '',//保单状态
                channelCode: '',
                payTime: '',
                amount: '',
                createName: localStorage.getItem('userName')
            },
            sumData: {},
            dateTime: [],
            payTime: [],
            giveTime: [],
            state,
            tableData: [],
            total: 0,
            pageSize: 10,
            policyAmout: '', // 总保费
            dialogVisible: false,
            dialogVisibleEdit: false,
            dialogVisiblePolicy: false,
            rules: {
                upload: [{ type: 'date', required: true, message: '请选择文件', trigger: 'change' }]
            },
            loadData: {
                file: ''
            },
            uploadUrl: '',
            errorInsure: false,
            errorMsg: [],
            fileList: [],
            fileListPolicy: [],
            headers: {
                token: ''
            },
            baseUrl: process.env.VUE_APP_BASE_URL,
            disabled: false,
            disabledPolicy: false,
            multipleSelection: [],
            loading: false,
            ids: [],
            currentPage: 1,
            disabledDown: false
        };
    },
    created() {
        this.uploadUrl = this.baseUrl + '/insurance/excel';
        this.headers.token = localStorage.getItem('token');
        this.getDataList(this.ruleForm);
    },
    methods: {
        // 续保
        renew(item) {
            window.open(`${process.env.VUE_APP_INSURE}/dadiPolicy/home?channelName=${item.channelCode}&orderNo=${item.orderNo}&productCode=DD&renew=1`)
        },
        handleSelectionChange(list, row) {
            if (list.includes(row)) {
                //勾选时做的事
                this.multipleSelection.push(row);
            } else {
                //取消勾选时做的事
                console.log(val.orderNo);
                this.multipleSelection = this.multipleSelection.filter((val) => val.orderNo !== row.orderNo);
            }
            console.log(this.multipleSelection.length);
        },
        async handleSelectAll(selection) {
            if ((selection.length && !this.checked) || (!selection.length && this.checked)) {
                // 全选
                this.loading = true;
                this.multipleSelection = [];
                await auditList({
                    orderNo: this.ruleForm.orderNo,
                    current: 1,
                    size: this.total
                }).then((res) => {
                    if (res.code == 200) {
                        res.data.records.forEach((item) => {
                            this.multipleSelection.push(item);
                        });
                    }
                });
                await this.getDataList(this.ruleForm);
                await this.setLoading();
            } else {
                // 全不选
                this.multipleSelection = [];
            }
        },
        getRowKey(row) {
            return row.orderNo;
        },
        setLoading() {
            this.loading = false;
            console.log(this.multipleSelection.length);
        },
        searchCase() {
            this.multipleSelection = [];
            this.ids = [];
            this.ruleForm.policyStatr = this.dateTime[0];
            this.ruleForm.policyEnd = this.dateTime[1];

            this.ruleForm.payTime = this.payTime[0];
            this.ruleForm.payEnd = this.payTime[1];

            this.ruleForm.placeTime = this.giveTime[0];
            this.ruleForm.placeEnd = this.giveTime[1];
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.total = 0;
            this.getDataList(this.ruleForm);
        },
        // 重置
        reset() {
            this.ruleForm.orderNo = '';
            // this.ruleForm.size = 10;
            this.getDataList(this.ruleForm);
        },
        getDataList(paramer) {
            this.loading = true;
            auditList(paramer).then((res) => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.loading = false;
                    res.data.records.forEach((i) => {
                        if (/^[a-zA-Z]+$/.test(i.policyStatus)) { // 判断是否包含中文字符
                            const foundState = state.find(item => item.label === i.policyStatus);
                            i.policyStatus = foundState.dictValue;
                        }
                    });
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.policyAmout = res.data.amount;
                    this.$refs.multipleTable.clearSelection();
                } else {
                    this.loading = false;
                    this.$message.error(res.msg);
                }
                //回显
                this.multipleSelection.forEach((val) => {
                    this.tableData.forEach((row) => {
                        if (row.orderNo == val.orderNo) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                });
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        //修改页数
        handleSizeChange(size) {
            this.ruleForm.size = size;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList(this.ruleForm);
        },
        redact(value) {
            console.log(value);
            this.dialogVisibleEdit = true
            this.editForm = {
                orderNo: value.orderNo,
                policyStatr: value.policyStatr,
                policyStatus: value.policyStatus,//保单状态
                channelCode: value.channelCode,
                payTime: value.payTime,
                amount: value.amount,
                createName: localStorage.getItem('userName')
            }
        },
        formatPolicyStart(policyStart) {
            const date = new Date(policyStart);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 00:00:00`;
        },
        saveEdit() {
            if (!this.editForm.amount) {
                this.$message.warning('订单金额不能为空');
                return false;
            }
            if (!this.editForm.channelCode) {
                this.$message.warning('渠道码不能为空');
                return false;
            }
            if (!this.editForm.policyStatr) {
                this.$message.warning('保险起期不能为空');
                return false;
            }
            console.log(this.editForm);
            if (/[\u4e00-\u9fa5]/.test(this.editForm.policyStatus)) { // 判断是否包含中文字符
                const foundState = state.find(item => item.dictValue === this.editForm.policyStatus);
                this.editForm.policyStatus = foundState.label;
            }
            this.editForm.policyStatr = this.formatPolicyStart(this.editForm.policyStatr)
            approveOrder(this.editForm)
                .then((res) => {
                    if (res.code === 200) {
                        this.dialogVisibleEdit = false;
                        this.getDataList(this.ruleForm);
                        this.editForm.amount = '';
                        this.editForm.channelCode = '';
                        this.editForm.policyStatr = '';
                        this.editForm.payTime = '';
                        this.editForm.isInsurance = '';
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.message);
                });
        },
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }

    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }

    .el-select {
        width: 100%;
    }

    .product {
        a {
            padding: 6px 10px;
            border: 1px solid #ccc;
            font-size: 12px;
        }

        a:nth-child(2) {
            border-left: none;
        }

        a:nth-child(3) {
            padding: 6px 22px;
            border-left: none;
        }

        .addclass {
            background-color: #fff;
            color: #e71d5d;
            border: 1px solid #e71d5d;
        }
    }

    /deep/.el-range__close-icon {
        display: none;
    }

    .actionButton {
        .el-button {
            width: 105px;
        }

        .el-button:nth-child(2) {
            border: 1px solid #e71d5d;
            color: #e71d5d;
        }
    }

    .el-row {
        margin-bottom: 10px;
    }

    /deep/.el-form-item__label {
        padding: 0 5px 0 0;
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    .title {
        display: flex;
        justify-content: space-between;
    }

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(1) {
            .cell {
                color: #fe1964;
            }
        }
    }
}

.dialog {
    /deep/.el-dialog__header {
        padding: 30px 20px 10px;
        font-weight: 700;
    }

    /deep/.el-dialog__body {
        padding: 20px 35px 10px;
    }

    .down {
        color: #409eff;
        cursor: pointer;
    }

    .upload-demo {
        display: flex;

        /deep/.el-upload-list__item:first-child {
            margin-top: 5px;
        }

        /deep/.el-upload-list__item-name {
            color: #fe1964;
        }

        /deep/.el-icon-document {
            color: #fe1964;
        }
    }

    /deep/.el-upload--text {
        border: none;
        width: 90px;
        height: 35px;

        .el-button {
            padding: 5px 20px;
            color: #fe1964;
            background-color: #fff;
        }
    }

    /deep/.el-upload-list {
        overflow: hidden;
        margin-left: 10px;
    }

    .dialog-footer {
        padding: 0px 20px 35px;

        button {
            padding: 5px 30px;
        }
    }
}

.errorTip {
    .el-dialog__body {
        padding: 20px;

        .title {
            color: #000;
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 15px;

            /deep/.el-icon-circle-close {
                color: #b92626;
                font-size: 22px;
                font-weight: 700;
            }
        }
    }
}
</style>