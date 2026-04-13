<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row>
            <div class="message">
                <div class="message-row">
                    <div class="message-row-item">
                        审批单号：<span class="specialColor">{{ basicInfo.initiateCode }}</span>
                    </div>
                    <div class="message-row-item">
                        贷款申请单号：<span class="specialColor">{{ basicInfo.applicationCode }}</span>
                    </div>
                    <div class="message-row-item">
                        <span>贷款单号：<span class="specialColor">{{ basicInfo.loanCode }}</span></span>
                    </div>
                    <div class="message-row-item">
                        贷款场景：
                        <span v-if="basicInfo.loanScenario === '1P'">1p自营</span>
                        <span v-if="basicInfo.loanScenario === '1P_3P'">1p转3p</span>
                        <span v-if="basicInfo.loanScenario === '1P_CUS'">过桥</span>
                        <span v-else></span>
                    </div>
                    <span class="message-row-item">审批类型: <span v-if="basicInfo.approvalType === 'CREDIT'">授信</span>
                        <span v-else>放款</span></span>
                    <span class="message-row-item">销售：<span>{{ basicInfo.applicationName }}</span></span>
                </div>
                <div class="message-row">
                    <span class="message-row-item2">
                        当前审批状态：
                        <span v-if="basicInfo.initiateStatus === 'REJECTED'">
                            {{ basicInfo.approvalType === 'CREDIT' ? '授信拒绝' : '放款拒绝' }}
                        </span>
                        <span v-else>
                            {{ statusMap[basicInfo.initiateStatus] || '' }}
                        </span>
                    </span>
                    <span class="message-row-item2">借款人姓名：<span>{{ basicInfo.borrowerName }}</span></span>
                    <span class="message-row-item2">借款人企业：<span>{{ basicInfo.borrowerEnterprise }}</span></span>
                    <span class="message-row-item2">借款人手机号:<span>{{ basicInfo.borrowerMobilePhone }}</span></span>
                </div>
            </div>
        </el-row>

        <!-- 表格列表 -->
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="Table" :data="tableData" element-loading-text="加载中，请稍后"
                    style="width: 100%; font-size: 14px">
                    <el-table-column prop="approvalTime" label="审批时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="approvalStatus" label="审批状态" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="approvalOperation" label="审批操作" align="center" width="120px">
                    </el-table-column>
                    <el-table-column prop="approvalInfo" label="审批信息" align="center" width="400px">
                        <template slot-scope="scope">
                            <div v-if="scope.row.approvalStatus === '待风控初审'">
                                <div style="color: #fe1964"
                                    v-if="!basicInfo.isCrm && scope.row.approvalInfo.proposedAmount">
                                    授信额度(DCL):{{ scope.row.approvalInfo.proposedAmount / 10000
                                    }}{{ basicInfo.applicationCode && basicInfo.applicationCode.includes('USA') ? '万美元'
                                    : '万元' }}
                                </div>
                                <div style="color: #fe1964"
                                    v-if="!basicInfo.isCrm && scope.row.approvalInfo.proposedInterestRate && $route.query.lenderId!='74'">授信利率参考:{{
                                        scope.row.approvalInfo.proposedInterestRate }}%</div>

                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.creditAmount">
                                    授信额度:{{ scope.row.approvalInfo.creditAmount / 10000
                                    }}{{ basicInfo.applicationCode && basicInfo.applicationCode.includes('USA') ? '万美元'
                                    : '万元' }}
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.creditApr">
                                    授信利率:{{ scope.row.approvalInfo.creditApr }}%
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.riskApr">
                                    本次贷款利率参考:{{ scope.row.approvalInfo.riskApr }}%
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.latestApr">
                                    授信利率调整:{{ scope.row.approvalInfo.latestApr }}%
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.repaymentType && $route.query.lenderId=='74'">
                                    还款方式:{{ scope.row.approvalInfo.repaymentType }}
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.term && $route.query.lenderId=='74'">
                                    期限:{{ scope.row.approvalInfo.term }}
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.maxAmount && $route.query.lenderId=='74'">
                                    最大可支用金额:{{ scope.row.approvalInfo.maxAmount }}
                                </div>
                                <div style="color: #fe1964" v-if="scope.row.approvalInfo.guaranteeDesc && $route.query.lenderId=='74'">
                                    担保条件:{{ scope.row.approvalInfo.guaranteeDesc }}
                                </div>
                                <div style="color: #fe1964"
                                    v-if="scope.row.approvalInfo.riskControlInvestigationReport && scope.row.approvalInfo.riskControlInvestigationReport.length">
                                    尽调报告:
                                    <span v-for="(item, index) in scope.row.approvalInfo.riskControlInvestigationReport"
                                        :key="index">
                                        <a :href="item" :download="getFileName(item)" target="_blank"
                                            style="color: #409eff; text-decoration: underline; display: block; margin: 5px 0">
                                            {{ getFileName(item) }}
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div v-if="scope.row.approvalStatus === '待风控初审(放款)'">
                                <div style="color: #fe1964">
                                    本次支用金额:{{ scope.row.approvalInfo.loanAmount / 10000
                                    }}{{ basicInfo.applicationCode && basicInfo.applicationCode.includes('USA') ? '万美元'
                                    : '万元' }}
                                </div>
                                <div style="color: #fe1964">锁定情况:{{ scope.row.approvalInfo.lockInfos.join(',') }}</div>
                                <div style="color: #fe1964">锁定程度:{{ scope.row.approvalInfo.lockType }}</div>

                                <div style="color: #fe1964">
                                    最大可支用金额:{{ scope.row.approvalInfo.maxAmount / 10000
                                    }}{{ basicInfo.applicationCode && basicInfo.applicationCode.includes('USA') ? '万美元'
                                    : '万元' }}
                                </div>
                            </div>
                            <div v-if="scope.row.approvalStatus == '待确认贷款合同'">
                                <div style="color: #fe1964">
                                    <div v-for="(link, index) in getLinkArray(scope.row.approvalInfo.loanFiles)"
                                        :key="index">
                                        <a :href="link" :download="getFileName(link)" target="_blank"
                                            style="color: #fe1964; text-decoration: underline">
                                            {{ getFileName(link) }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div v-if="scope.row.approvalStatus == '待上传放款凭证'">
                                <div>
                                    <a :href="scope.row.approvalInfo.financialDisbursementVoucherUrl"
                                        :download="getFileName(scope.row.approvalInfo.financialDisbursementVoucherUrl)"
                                        target="_blank" style="color: #fe1964; text-decoration: underline">{{
                                            getFileName(scope.row.approvalInfo.financialDisbursementVoucherUrl) }}</a>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="approvalOpinion" label="审批意见" align="center" width="300px">
                    </el-table-column>
                    <el-table-column prop="approverName" label="审批人" align="center"> </el-table-column>
                    <el-table-column prop="approvalRole" label="审批角色" align="center" width="120px"> </el-table-column>
                </el-table>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { getDetail, getRecordList, getIdMes } from '@/api/examine.js';

export default {
    data() {
        return {
            basicInfo: {},
            tableData: [],
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
        this.basicInfo = { ...this.$route.query };
        this.getRow(this.$route.query.initiateCode, this.$route.query.approvalType);
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
        //分割链接
        getLinkArray(links) {
            if (!links) return [];
            return links.split(',').map((link) => link.trim());
        },
        getFileName(url) {
            if (!url) return;

            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },
        getRow(initiateCode, approvalType) {
            getRecordList({
                initiateCode,
                approvalType
            }).then((res) => {
                if (res.code == 200) {
                    // 第一步：处理 res.data，确保 this.tableData 是一个数组
                    this.tableData = (res.data || []).map((item) => ({
                        ...item,
                        approvalInfo: item.approvalInfo ? JSON.parse(item.approvalInfo) : {}
                    }));

                    // 第二步：遍历 this.tableData 数组，处理每个对象的 approvalInfo
                    this.tableData.forEach((tableItem) => {
                        // 确保 tableItem.approvalInfo 是一个对象
                        if (tableItem.approvalInfo) {
                            // 处理 approvalInfo 中的 riskControlInvestigationReport 属性
                            tableItem.approvalInfo.riskControlInvestigationReport = tableItem.approvalInfo.riskControlInvestigationReport
                                ? tableItem.approvalInfo.riskControlInvestigationReport.split(',').filter(Boolean)
                                : [];
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.message {
    background-color: #fff;
    padding: 20px;

    .message-row {
        display: flex;
        justify-content: space-between;

        &-item {
            // width: 10%;
            // display: inline-block;
            padding: 12px 24px;
        }

        &-item2 {
            width: 25%;
            display: inline-block;
            padding: 12px 24px;
        }

        .specialColor {
            color: #fe1964;
        }
    }
}

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

.link {
    cursor: pointer;
}

.link:hover {
    text-decoration: underline !important;
}
</style>