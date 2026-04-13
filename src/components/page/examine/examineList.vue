<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 审批管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <!-- 查询条件 -->
        <el-row class="searchForm">
            <el-form ref="ruleForm" :model="ruleForm" label-width="85px" :inline="true"
                style="padding: 20px; background-color: #fff">
                <div>
                    <el-form-item>
                        <el-input v-model="ruleForm.userId" placeholder="用户ID"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.applicationCode" placeholder="贷款申请单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.borrowerName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.borrowerMobilePhone" placeholder="手机号"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item>
                        <el-select v-model="ruleForm.lenderName" placeholder="资方" clearable>
                            <el-option v-for="item in lenderTypeList" :key="item.dictValue" :label="item.dictValue"
                                :value="item.dictValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="ruleForm.lenderProductName" placeholder="产品" clearable>
                            <el-option v-for="item in lenderProductTypeList" :key="item.dictValue"
                                :label="item.dictValue" :value="item.dictValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="ruleForm.createTime" type="daterange" range-separator="至"
                            start-placeholder="申请开始时间" end-placeholder="申请结束时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="ruleForm.approvalType" placeholder="审批类型">
                            <el-option label="授信" value="CREDIT"></el-option>
                            <el-option label="放款" value="LOAN"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item>
                        <el-button type="primary" @click="searchCase" icon="el-icon-search">查询</el-button>
                        <el-button @click="resetForm" icon="el-icon-refresh-left">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-row>

        <!-- 表格列表 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="Table" :data="tableData" element-loading-text="加载中，请稍后"
                    style="width: 100%; font-size: 14px" highlight-current-row @current-change="handleCurrentChange"
                    :current-row-key="currentRowKey">
                    <el-table-column prop="initiateCode" label="审批单号" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="approvalType" label="审批类型" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.approvalType === 'CREDIT'">授信</span>
                            <span v-else>放款</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loanScenario" label="贷款场景" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.loanScenario === '1P'">1p自营</span>
                            <span v-if="scope.row.loanScenario === '1P_3P'">1p转3p</span>
                            <span v-if="scope.row.loanScenario === '1P_CUS'">过桥</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="applicationCode" label="贷款申请单号" align="center" width="150px">
                    </el-table-column>
                    <el-table-column prop="loanCode" label="贷款单号" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center" width="80px"> </el-table-column>
                    <el-table-column prop="borrowerName" label="姓名" align="center" width="120px"> </el-table-column>
                    <el-table-column prop="borrowerMobilePhone" label="手机号" align="center" width="120px">
                    </el-table-column>
                    <el-table-column prop="borrowerEnterprise" label="企业名称" align="center" width="170px">
                    </el-table-column>
                    <el-table-column prop="lenderName" label="资方" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="lenderProductName" label="产品" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="applicationType" label="申请类型" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.applicationType === 'COMPANY'">公司</span>
                            <span v-else>个人</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bindShopCount" label="店铺数" align="center"> </el-table-column>
                    <el-table-column prop="proposedAmount" label="授信额度/万(DCL)" align="center" width="135px">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.proposedAmount || Number(scope.row.proposedAmount) <= 0">-</span>
                            <span
                                v-else-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.proposedAmount">¥{{
                                    scope.row.proposedAmount / 10000 }}</span>
                            <span
                                v-else-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.proposedAmount">${{
                                    scope.row.proposedAmount / 10000 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="apr" label="授信利率参考" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.lenderId == 74">--</span>
                            <span v-else>{{ scope.row.apr }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creditAmount" label="授信额度/万" align="center" width="100px">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.creditAmount">¥{{
                                    scope.row.creditAmount / 10000 }}</span>
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.creditAmount">${{
                                    scope.row.creditAmount / 10000 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creditApr" label="授信利率%" align="center" width="90px">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.creditApr || Number(scope.row.creditApr) <= 0">-</span>
                            <span v-else-if="scope.row.creditApr">{{ scope.row.creditApr }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxAmount" label="最大可支用金额/万" align="center" width="140px">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.maxAmount">¥{{
                                    scope.row.maxAmount / 10000 }}</span>
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.maxAmount">${{
                                    scope.row.maxAmount / 10000 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="currentAmount" label="本次支用金额/万" align="center" width="135px">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.currentAmount">¥{{
                                    scope.row.currentAmount / 10000 }}</span>
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.currentAmount">${{
                                    scope.row.currentAmount / 10000 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="applicationTime" label="申请时间" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="applicationName" label="销售姓名" align="center"> </el-table-column>
                    <el-table-column prop="initiateStatus" label="审批状态" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.initiateStatus === 'REJECTED'">
                                {{ scope.row.approvalType === 'CREDIT' ? '授信拒绝' : '放款拒绝' }}
                            </span>
                            <span v-else>
                                {{ statusMap[scope.row.initiateStatus] || '' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastTime" label="最新审批时间" align="center" width="160px"> </el-table-column>
                    <el-table-column prop="lastApprovalName" label="当前审批人" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" fixed="right" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
                            <el-button @click="handleRecord(scope.row)" type="text">审批记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-size="pageSize"
                    :page-sizes="[10, 20, 50]" @current-change="currentChange" @size-change="handleSizeChange"
                    style="text-align: right; margin: 40px 20px" :current-page.sync="currentPage" v-if="total > 0">
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { getTableList, getDetail, getIdMes } from '@/api/examine.js';
export default {
    data() {
        return {
            currentRowKey: null,
            viewForm: {},
            ruleForm: {
                userId: '',
                applicationCode: '',
                borrowerName: '',
                borrowerMobilePhone: '',
                lenderName: '',
                createTime: '',
                approvalType: '',
                lenderProductName: '',
                current: 1,
                size: 10,
                initiateStatus: '',

            },
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            fileList: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            count: '',
            currentPage: 1,
            dialogVisibleView: false,
            rules: {
                amount: [{ required: true, message: '请输入授信额度', trigger: 'blur' }],
                apr: [{ required: true, message: '请输入授信利率', trigger: 'blur' }]
            },
            initiateStatusList: [
                {
                    label: '待CM审批',
                    value: 'CMC_CREATED'
                },
                {
                    label: '待风控初审',
                    value: 'CREATED'
                },
                {
                    label: '待风控复审',
                    value: 'APPROVAL_1ST'
                },
                {
                    label: '待风委审核',
                    value: 'APPROVAL_2ND'
                },
                {
                    label: '放款风控初审',
                    value: 'LOAN_CREATED'
                },
                {
                    label: '放款风控复审',
                    value: 'LOAN_APPROVAL_1ST'
                },
                {
                    label: '待确认贷款合同',
                    value: 'LOAN_APPROVAL_2ND'
                },
                {
                    label: '待财务上传凭证',
                    value: 'FINANCE_OPERATION_UPLOAD'
                },
                {
                    label: '待财务头寸审核',
                    value: 'FINANCE_OPERATION'
                },
                {
                    label: '待CEO终审',
                    value: 'LOAN_APPROVAL_CEO'
                },
                {
                    label: '待班委1终审',
                    value: 'LOAN_APPROVAL_3EP1'
                },
                {
                    label: '待班委2终审',
                    value: 'LOAN_APPROVAL_3EP2'
                },
                {
                    label: '待班委3终审',
                    value: 'LOAN_APPROVAL_3EP3'
                },
                {
                    label: '待班委4终审',
                    value: 'LOAN_APPROVAL_3EP4'
                },
                {
                    label: '审批拒绝',
                    value: 'REJECT'
                },
                {
                    label: '已放款',
                    value: 'DISBURSED'
                },
                {
                    label: '授信审批通过',
                    value: 'APPROVAL_3EP'
                }
            ],
            lenderTypeList: [],
            lenderProductTypeList: [],
        };
    },

    created() {
        this.getDataList(this.ruleForm);
        // 数据字典获取
        this.getSelectData('LENDER_TYPE')
        this.getSelectData('LENDER_PRODUCT_TYPE')
    },
    computed: {
        statusMap() {
            const map = {};
            this.initiateStatusList.forEach((item) => {
                map[item.value] = item.label;
            });
            return map;
        }
    },
    methods: {
        // 数据字典获取
        getSelectData(code) {
            getIdMes({ code }).then(res => {
                console.log("🚀 ~ res:", res)
                if (code === 'LENDER_TYPE') {
                    this.lenderTypeList = res.data || [];
                } else if (code === 'LENDER_PRODUCT_TYPE') {
                    this.lenderProductTypeList = res.data || [];
                }
            })
        },
        handleCurrentChange(row) {
            this.currentRowKey = row ? row.date : null; // 假设以 date 作为唯一标识
        },
        getDataList(paramer) {
            paramer = {
                ...paramer,
                startTime: paramer.createTime[0] ? paramer.createTime[0] : '',
                endTime: paramer.createTime[0] ? paramer.createTime[1] : ''
            };
            getTableList(paramer).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.count = res.data.total;
                }
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
        handleView(scope) {
            getDetail(scope.id).then((res) => {
                if (res.code == 200) {
                    this.viewForm = { ...res.data, approvalOpinion: '' };

                    if (scope.initiateStatus == 'CREATED' && scope.approvalType == 'CREDIT') {
                        this.dialogVisibleView = true;
                    } else if (
                        (scope.initiateStatus == 'APPROVAL_1ST' || scope.initiateStatus == 'APPROVAL_2ND') &&
                        scope.approvalType == 'CREDIT'
                    ) {
                        this.dialogVisibleCommon = true;
                    } else {
                    }
                }
            });
        },
        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },

        handleAvatarSuccess(res) {
            console.log(res);
            this.viewForm.filePath = res.data.fullFilePath;
        },
        errorMethod() {
            this.$message.warning(`请上传PDF或者图片`);
        },
        //查询
        searchCase() {
            this.getDataList({
                ...this.ruleForm,
                current: 1,
                size: 10
            });
        },
        //重置
        resetForm() {
            this.ruleForm = {
                userId: '',
                applicationCode: '',
                borrowerName: '',
                borrowerMobilePhone: '',
                lenderName: '',
                createTime: '',
                approvalType: '',
                lenderProductName: '',
                current: 1,
                size: 10,
                initiateStatus: ''
            };
            this.getDataList(this.ruleForm);
        },

        beforeRemove() { },
        handleExceed() { },
        handleRecord(scope) {
            this.$router.push({
                path: '/examineRecord',
                query: {
                    initiateCode: scope.approvalType == 'CREDIT' ? scope.initiateCode : scope.loanCode,
                    approvalType: scope.approvalType == 'CREDIT' ? 'CREDIT' : 'LOAN',
                    applicationCode: scope.applicationCode,
                    loanCode: scope.loanCode,
                    loanScenario: scope.loanScenario,
                    approvalType: scope.approvalType,
                    applicationName: scope.applicationName,
                    initiateStatus: scope.initiateStatus,
                    borrowerName: scope.borrowerName,
                    borrowerEnterprise: scope.borrowerEnterprise,
                    borrowerMobilePhone: scope.borrowerMobilePhone,
                    lenderId:scope.lenderId
                }
            });
        },
        handleDetail(val) {
            localStorage.setItem('bPhoneNumber', val.borrowerMobilePhone);
            localStorage.setItem('bCardId', val.idCard);

            let path = "/loanAssitance-detail"
            if (val.applicationCode && val.applicationCode.includes('USA')) {
                path = '/us-detail'
            }
            this.$router.push({
                path,
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.lenderProductName,
                    creditAmount: val.creditAmount / 10000,
                    applicationStatus: val.initiateStatus,
                    account: val.borrowerMobilePhone,
                    userId: val.userId,
                    lenderId: val.lenderId,
                    loanCode: val.loanCode ? val.loanCode : '',

                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.dataList {
    background-color: #fff;
    // margin-top: 20px;
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

.container-box {

    //弹出层的高度
    ::v-deep .el-dialog.import-dialog {
        height: auto;
        max-height: 80vh;
        overflow-y: auto;
    }

    //弹出层里内容的高度
    ::v-deep .el-dialog__body {
        max-height: 70vh !important;
    }
}

/deep/.el-icon-close {
    line-height: 1;
}

/deep/.el-upload--text {
    border: none;
    height: auto;
    width: auto;
}

.el-form-item {
    margin-bottom: 16px;
    /* 统一表单项底部间距 */
}

/deep/ .searchForm .el-input--small .el-input__inner {
    width: 260px;
}

/deep/ .searchForm .el-form-item__content {
    padding: 0 24px !important;
}

/deep/ .specialWidth .el-input--small .el-input__inner {
    width: 130px;
}
</style>