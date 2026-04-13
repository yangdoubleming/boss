<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 / crm /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <!-- 查询条件 -->
        <el-row class="searchForm">
            <el-form ref="ruleForm" :model="ruleForm" label-width="85px" :inline="true" style="padding: 20px; background-color: #fff">
                <div>
                    <el-form-item>
                        <el-input v-model="ruleForm.userId" placeholder="用户ID" class="inputClass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.applicationCode" placeholder="贷款申请单号" class="inputClass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.borrowerName" placeholder="姓名" class="inputClass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="ruleForm.borrowerMobilePhone" placeholder="手机号" class="inputClass"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item>
                        <el-select v-model="ruleForm.lenderName" placeholder="资方" clearable class="inputClass">
                            <el-option label="Morfin" value="Morfin"></el-option>
                            <el-option label="默放保理" value="默放保理"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="ruleForm.lenderProductName" placeholder="产品" clearable class="inputClass">
                            <el-option label="跨商宝美元-Morfin" value="跨商宝美元-Morfin"></el-option>
                            <el-option label="通用版跨商宝" value="通用版跨商宝"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model="ruleForm.createTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="申请开始时间"
                            end-placeholder="申请结束时间"
                            value-format="yyyy-MM-dd"
                            class="inputClass"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="ruleForm.approvalType" placeholder="审批类型" class="inputClass" style="width: 130px">
                            <el-option label="授信" value="CREDIT"></el-option>
                            <el-option label="放款" value="LOAN"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="ruleForm.initiateStatus" placeholder="审批状态" class="inputClass" style="width: 130px">
                            <el-option
                                :label="val.label"
                                :value="val.value"
                                v-for="(val, index) in initiateStatusList"
                                :key="index"
                            ></el-option>
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
                <el-table ref="Table" :data="tableData" element-loading-text="加载中，请稍后" style="width: 100%; font-size: 14px">
                    <el-table-column prop="initiateCode" label="审批单号" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="approvalType" label="审批类型" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.approvalType === 'CREDIT'">授信</span>
                            <span v-else>放款</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loanScenario" label="贷款场景" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.loanScenario === '1P'">1p自营</span>
                            <span v-if="scope.row.loanScenario === '1P_3P'">1p转3p</span>
                            <span v-if="scope.row.loanScenario === '1P_CUS'">过桥</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="applicationCode" label="贷款申请单号" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="loanCode" label="贷款单号" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center" width="80px"> </el-table-column>
                    <el-table-column prop="borrowerName" label="姓名" align="center" width="80px"> </el-table-column>
                    <el-table-column prop="borrowerMobilePhone" label="手机号" align="center" width="120px"> </el-table-column>
                    <el-table-column prop="borrowerEnterprise" label="企业名称" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="lenderName" label="资方" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="lenderProductName" label="产品" align="center" width="120px"> </el-table-column>
                    <el-table-column prop="applicationType" label="申请类型" align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.applicationType === 'COMPANY'">公司</span>
                            <span v-else>个人</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bindShopCount" label="店铺数" align="center"> </el-table-column>
                    <el-table-column prop="apr" label="授信利率参考" align="center" width="120px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.apr?scope.row.apr+'%':'' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creditAmount" label="授信额度/万" align="center" width="120px">

                        <template slot-scope="scope">
                            <span v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.creditAmount"
                                >¥{{ scope.row.creditAmount / 10000 }}</span
                            >
                            <span v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.creditAmount"
                                >${{ scope.row.creditAmount / 10000 }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="creditApr" label="授信利率%" align="center" width="120px"></el-table-column>
                    <el-table-column prop="maxAmount" label="最大可支用金额/万" align="center" width="160px">
                        <!--  自定义表头的插槽 solt=header -->
                        <template slot-scope="{}" slot="header">
                            <span>最大可支用金额/万</span>
                            <el-popover
                                placement="top-start"
                                width="365"
                                trigger="hover"
                                content="店铺全部锁定满足才可全部支用，否则会有支用金额限制。"
                                popper-class="log-popover"
                            >
                                <i slot="reference" style="color: red" class="el-icon-question"></i>
                            </el-popover>
                        </template>
                        <template slot-scope="scope">
                            <span v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.maxAmount"
                                >¥{{ scope.row.maxAmount / 10000 }}</span
                            >
                            <span v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.maxAmount"
                                >${{ scope.row.maxAmount / 10000 }}</span
                            >
                        </template>
                    </el-table-column>

                    <el-table-column prop="applicationTime" label="申请时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="initiateStatus" label="审批状态" align="center" width="160px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.initiateStatus === 'REJECTED'">
                                {{ scope.row.approvalType === 'CREDIT' ? '授信拒绝' : '放款拒绝' }}
                            </span>
                            <span v-else>
                                {{ statusMap[scope.row.initiateStatus] || '' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastTime" label="最新审批时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="lastApprovalName" label="当前审批人" align="center"> </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" fixed="right" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="handleProfile(scope.row)" type="text" v-if="scope.row.approvalType === 'CREDIT'"
                                >补充资料</el-button
                            >
                            <el-button
                                @click="handleProof(scope.row)"
                                type="text"
                                v-if="
                                    scope.row.approvalType === 'LOAN' &&
                                    scope.row.applicationCode &&
                                    scope.row.applicationCode.includes('USA')
                                "
                                :disabled="scope.row.initiateStatus === 'LOAN_CREATED'"
                            >
                                入账凭证</el-button
                            >
                            <el-button @click="handleRecord(scope.row)" type="text">审批记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="sizes, prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 50]"
                    @current-change="currentChange"
                    @size-change="handleSizeChange"
                    style="text-align: right; margin: 40px 20px"
                    :current-page.sync="currentPage"
                    v-if="total > 0"
                >
                </el-pagination>
            </el-card>
        </el-row>

        <!-- 补充资料弹框 -->
        <el-dialog
            :visible.sync="dialogVisibleProfile"
            width="32%"
            title="补充资料"
            custom-class="import-dialog"
            class="container-box"
            :close-on-click-modal="false"
        >
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>

                    <el-form-item label="借款人姓名:">
                        <span>{{ viewForm.borrowerName }}</span>
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        <span>{{ viewForm.borrowerMobilePhone }}</span>
                    </el-form-item>
                    <el-form-item label="贷款场景:" prop="loanScenario">
                        <el-select v-model="viewForm.loanScenario" placeholder="请选择贷款场景">
                            <el-option label="1P自营" value="1P"></el-option>
                            <el-option label="过桥" value="1P_CUS"></el-option>
                            <el-option label="1P转3P" value="1P_3P"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="过桥原贷款申请单号:"
                        v-if="viewForm.loanScenario && viewForm.loanScenario == '1P_CUS'"
                        prop="previousApplicationCode"
                    >
                        <el-input v-model="viewForm.previousApplicationCode"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="1P转3P原贷款申请单号:"
                        v-if="viewForm.loanScenario && viewForm.loanScenario == '1P_3P'"
                        prop="previousApplicationCode"
                    >
                        <el-input v-model="viewForm.previousApplicationCode"></el-input>
                    </el-form-item>
                    <el-form-item label="客户情况描述:" prop="customerDescription">
                        <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="viewForm.customerDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="客户期望额度:" prop="expectedAmount">
                        <el-input v-model="viewForm.expectedAmount">
                            <template slot="append">
                                <span v-if="viewForm.applicationCode">{{
                                    viewForm.applicationCode.includes('USA') ? '万美元' : '万元'
                                }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="与客户协商一致利率:" prop="negotiatedInterestRate">
                        <el-input v-model="viewForm.negotiatedInterestRate"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="实控人近1个月征信报告:" prop="controllerCreditReport">
                        <el-upload
                            ref="controllerCreditReportRefs"
                            :action="uploadUrl"
                            :on-success="controllerCreditReportSuccess"
                            multiple
                            class="upload-demo"
                            accept=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                            :file-list="viewForm.controllerCreditReport"
                        >
                            <el-button size="small" type="primary"> 点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="实控企业近1个月征信报告:" v-if="controllerCreditReportShow" prop="enterpriseCreditReport">
                        <el-upload
                            ref="enterpriseCreditReportRefs"
                            :action="uploadUrl"
                            :on-success="firmCreditReportSuccess"
                            multiple
                            accept=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                            :file-list="viewForm.enterpriseCreditReport"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="借款人国内企业上一年度审计报告:" v-if="enterpriseAuditReportShow" prop="enterpriseAuditReport">
                        <el-upload
                            ref="enterpriseAuditReportRefs"
                            :action="uploadUrl"
                            :on-success="enterpriseYearCreditReportSuccess"
                            multiple
                            accept=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                            :file-list="viewForm.enterpriseAuditReport"
                        >
                            <div style="display: flex; flex-direction: column; align-items: flex-start">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip" style="margin-left: 5px">
                                    (若无，须提供上一年度资产负债表+损益表并加盖公章)
                                </div>
                            </div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="其他补充材料:">
                        <el-upload
                            ref="additionalMaterialsRefs"
                            :action="uploadUrl"
                            :on-success="additionalMaterialsSuccess"
                            multiple
                            accept=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                            :file-list="viewForm.additionalMaterials"
                        >
                            <div style="display: flex; flex-direction: column; align-items: flex-start">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div class="el-upload__tip">(根据风险要求提供，可上传多个)</div>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="saveCancel" type="danger" :disabled="loadingProfile">取消</el-button>
                    <el-button @click="savePass" type="success" :loading="loadingProfile" :disabled="loadingProfile">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 入账凭证弹框 -->
        <el-dialog
            :visible.sync="dialogVisibleProof"
            width="30%"
            title="入账凭证"
            custom-class="import-dialog"
            class="container-box"
            :close-on-click-modal="false"
            @close="proofCancel"
        >
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="上传入账凭证:">
                        <el-upload
                            ref="ProofRefs"
                            :action="uploadUrl"
                            :file-list="viewForm.receiptVoucher"
                            :on-success="ProofSuccess"
                            multiple
                            accept=".jpg, .jpeg, .png, .gif"
                            :disabled="!!(viewForm.receiptVoucher && viewForm.receiptVoucher.length && viewForm.receiptVoucherDate)"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="入账时间">
                        <div>
                            <el-date-picker
                                v-model="viewForm.receiptVoucherDate"
                                type="date"
                                placeholder="选择日期"
                                :format="'yyyy 年 MM 月 dd 日'"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                :readonly="!!(viewForm.receiptVoucher && viewForm.receiptVoucher.length && viewForm.receiptVoucherDate)"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                </el-form>
                <div style="margin-left: 35%; margin-bottom: 60px; color: rgb(195 88 2)">
                    重要提示:请认真准确填写入账时间，若因填写有误产生任何问题，由您承担一切后果，感谢配合!
                </div>
                <div style="display: flex; justify-content: center">
                    <el-button @click="proofCancel" type="danger" :disabled="loadingProof">取消</el-button>
                    <el-button
                        @click="proofPass"
                        type="success"
                        :loading="loadingProof"
                        :disabled="
                            loadingProof ||  !viewForm.receiptVoucher
                        "
                        >确定</el-button
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getTableListForCrm,
    saveControllerCreditReport,
    saveEnterpriseCreditReport,
    saveEnterpriseAuditReport,
    saveAdditionalMaterials,
    saveCustomerDesc,
    saveReceiptVoucher,
    saveReceiptVoucherDate,
    findApprovalTime
} from '@/api/crm.js';
import { findAdditionalInformation, findReceiptInfo } from '@/api/examine';

export default {
    data() {
        return {
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
                initiateStatus: ''
            },
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            fileList: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            count: '',
            currentPage: 1,
            dialogVisibleProfile: false,
            dialogVisibleProof: false,
            loadingProfile: false,
            loadingProof: false,
            rules: {
                customerDescription: [{ required: true, message: '请输入客户情况描述', trigger: 'blur' }],
                previousApplicationCode: [{ required: true, message: '请输入原贷款单号', trigger: 'blur' }],
                loanScenario: [{ required: true, message: '请选择贷款场景', trigger: 'change' }],
                expectedAmount: [{ required: true, message: '请输入客户期望额度', trigger: 'blur' }],
                negotiatedInterestRate: [{ required: true, message: '请输入与客户协商一致利率', trigger: 'blur' }],
                controllerCreditReport: [{ required: true, validator: this.controllerCreditReportfileMustUpload, trigger: 'change' }],
                enterpriseCreditReport: [{ required: true, validator: this.enterpriseCreditReportfileMustUpload, trigger: 'change' }],
                enterpriseAuditReport: [{ required: true, validator: this.enterprisefileMustUpload, trigger: 'change' }]
            },
            pickerOptions: {
                disabledDate: (time) => {
                    const approvalTime = this.viewForm.approvalTime;
                    const now = new Date();
                    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const selectedDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                    const appTime = new Date(approvalTime);
                    const appDate = new Date(appTime.getFullYear(), appTime.getMonth(), appTime.getDate());

                    if (approvalTime) return selectedDate < appDate || selectedDate > currentDate;
                    else return selectedDate < appDate || selectedDate > currentDate;
                }
            },
            redTooltip: {
                color: 'red'
            },
            initiateStatusList: [
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
            ]
        };
    },
    computed: {
        statusMap() {
            const map = {};
            this.initiateStatusList.forEach((item) => {
                map[item.value] = item.label;
            });
            return map;
        },
        controllerCreditReportShow() {
            console.log(777,this.viewForm.creditAmount);
            
            if (this.viewForm.loanScenario == '1P') {
                if (this.viewForm.applicationCode && this.viewForm.applicationCode.includes('USA') && this.viewForm.creditAmount > 70000)
                    return true;
                else if (
                    this.viewForm.applicationCode &&
                    this.viewForm.applicationCode.includes('DSA') &&
                    this.viewForm.creditAmount > 500000
                )
                    return true;
            }
            return false;
        },
        enterpriseAuditReportShow() {
            if (this.viewForm.loanScenario == '1P_3P') return true;
            if (this.viewForm.loanScenario == '1P') {
                if (this.viewForm.applicationCode && this.viewForm.applicationCode.includes('USA') && this.viewForm.creditAmount > 70000)
                    return true;
                else if (
                    this.viewForm.applicationCode &&
                    this.viewForm.applicationCode.includes('DSA') &&
                    this.viewForm.creditAmount > 500000
                )
                    return true;
            }
            return false;
        }
    },
    created() {
        this.getDataList(this.ruleForm);
    },
    methods: {
        controllerCreditReportfileMustUpload(rule, value, callback) {
            if (!this.viewForm.controllerCreditReport || this.viewForm.controllerCreditReport.length === 0) {
                callback('请上传实控人近1个月征信报告');
            } else {
                callback();
            }
        },
        enterpriseCreditReportfileMustUpload(rule, value, callback) {
            if (!this.viewForm.enterpriseCreditReport || this.viewForm.enterpriseCreditReport.length === 0) {
                callback('请上传实控企业近1个月征信报告');
            } else {
                callback();
            }
        },
        enterprisefileMustUpload(rule, value, callback) {
            if (!this.viewForm.enterpriseAuditReport || this.viewForm.enterpriseAuditReport.length === 0) {
                callback('请上传借款人国内企业上一年度审计报告');
            } else {
                callback();
            }
        },

        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },
        getDataList(paramer) {
            paramer = {
                ...paramer,
                startTime: paramer.createTime[0] ? paramer.createTime[0] : '',
                endTime: paramer.createTime[0] ? paramer.createTime[1] : ''
            };
            getTableListForCrm(paramer).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.count = res.data.total;
                }
            });
        },

        //补充资料
        handleProfile(scope) {
            findAdditionalInformation(scope.applicationCode).then((res) => {
                if (res.code === 200) {
                    this.viewForm = {
                        applicationCode: scope.applicationCode,
                        borrowerName: scope.borrowerName,
                        borrowerMobilePhone: scope.borrowerMobilePhone,
                        loanCode: scope.loanCode,
                        loanScenario: res.data.loanScenario,
                        previousApplicationCode:res.data.previousApplicationCode,
                        proposedAmount: scope.proposedAmount,
                        creditAmount: scope.creditAmount,
                        customerDescription: res.data.customerDescription,
                        expectedAmount: res.data.expectedAmount ? res.data.expectedAmount / 10000 : '',
                        negotiatedInterestRate: res.data.negotiatedInterestRate,
                        controllerCreditReport: res.data.controllerCreditReport
                            ? [
                                  {
                                      name: this.getFileName(res.data.controllerCreditReport),
                                      url: res.data.controllerCreditReport
                                  }
                              ]
                            : [],
                        enterpriseCreditReport: res.data.enterpriseCreditReport
                            ? [
                                  {
                                      name: this.getFileName(res.data.enterpriseCreditReport),
                                      url: res.data.enterpriseCreditReport
                                  }
                              ]
                            : [],
                        enterpriseAuditReport: res.data.enterpriseAuditReport
                            ? [
                                  {
                                      name: this.getFileName(res.data.enterpriseAuditReport),
                                      url: res.data.enterpriseAuditReport
                                  }
                              ]
                            : [],

                        additionalMaterials: []
                    };
                    res.data.additionalMaterialsList
                        ? res.data.additionalMaterialsList.forEach((item) => {
                              this.viewForm.additionalMaterials.push({
                                  name: this.getFileName(item),
                                  url: item
                              });
                          })
                        : [];
                    this.dialogVisibleProfile = true;
                }
            });
        },
        //实控人近1个月征信报告
        controllerCreditReportSuccess(res, file, fileList) {
            console.log(111, file, fileList);

            let fullFilePath = res.data.fullFilePath;
            saveControllerCreditReport({
                applicationCode: this.viewForm.applicationCode,
                fullFilePath
            }).then(() => {
                // this.viewForm.controllerCreditReport.push({
                //     name: res.data.fileName,

                //     url: fullFilePath
                // });
                this.viewForm.controllerCreditReport = fileList;
            });
        },
        //实控企业近1个月征信报告
        firmCreditReportSuccess(res, file, fileList) {
            let fullFilePath = res.data.fullFilePath;
            saveEnterpriseCreditReport({
                applicationCode: this.viewForm.applicationCode,
                fullFilePath
            }).then(() => {
                this.viewForm.enterpriseCreditReport = fileList;
            });
        },
        //借款企业上一年度审计报告
        enterpriseYearCreditReportSuccess(res, file, fileList) {
            let fullFilePath = res.data.fullFilePath;
            saveEnterpriseAuditReport({
                applicationCode: this.viewForm.applicationCode,
                fullFilePath
            }).then(() => {
                this.viewForm.enterpriseAuditReport = fileList;
            });
        },
        //其他补充材料
        additionalMaterialsSuccess(res) {
            saveAdditionalMaterials({
                applicationCode: this.viewForm.applicationCode,
                fullFilePath: res.data.fullFilePath
            }).then((res) => {
                console.log(444, res);
            });
        },

        //重置补充资料
        resetProfile() {
            this.viewForm = {};
            this.$refs.controllerCreditReportRefs.clearFiles();
            if (this.$refs.enterpriseCreditReportRefs) this.$refs.enterpriseCreditReportRefs.clearFiles();
            if (this.$refs.enterpriseAuditReportRefs) this.$refs.enterpriseAuditReportRefs.clearFiles();
            this.$refs.additionalMaterialsRefs.clearFiles();
            this.dialogVisibleProfile = false;
        },
        //补充资料通过
        savePass() {
            this.loadingProfile = true;
            this.$refs.viewForm.validate((valid) => {
                if (valid) {
                    saveCustomerDesc({
                        applicationCode: this.viewForm.applicationCode,
                        customerDescription: this.viewForm.customerDescription,
                        expectedAmount: this.viewForm.expectedAmount * 10000,
                        negotiatedInterestRate: this.viewForm.negotiatedInterestRate,
                        loanScenario: this.viewForm.loanScenario,
                        previousApplicationCode: this.viewForm.loanScenario=='1P' ? '' : this.viewForm.previousApplicationCode,
                    })
                        .then((res) => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.resetProfile();
                                this.getDataList(this.ruleForm);
                            }
                        })
                        .finally(() => {
                            this.loadingProfile = false;
                        });
                } else {
                    this.loadingProfile = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //补充资料取消
        saveCancel() {
            this.resetProfile();
        },

        //入账凭证
        async handleProof(row) {
            try {
                // 并行发起两个请求
                const [approvalRes, receiptRes] = await Promise.all([
                    findApprovalTime(row.loanCode),
                    findReceiptInfo(row.applicationCode, row.loanCode)
                ]);

                if (approvalRes.code === 200) {
                    this.viewForm = {
                        applicationCode: row.applicationCode,
                        loanCode: row.loanCode || 'DSL2258484752819',
                        applicationTime: row.applicationTime,
                        approvalTime: approvalRes.data,
                        receiptVoucherDate: '', // 初始化为空字符串
                        receiptVoucher: [] // 初始化为空数组
                    };
                }

                if (receiptRes.code === 200) {
                    // 使用 this.$set 确保响应式
                    this.$set(this.viewForm, 'receiptVoucherDate', receiptRes.data.receiptVoucherDate);

                    if (receiptRes.data.receiptVoucher && receiptRes.data.receiptVoucherDate) {
                        this.$set(this.viewForm, 'receiptVoucher', [
                            {
                                name: this.getFileName(receiptRes.data.receiptVoucher),
                                url: receiptRes.data.receiptVoucher
                            }
                        ]);
                    } else {
                        this.$set(this.viewForm, 'receiptVoucher', []);
                    }
                }

                this.dialogVisibleProof = true;
            } catch (error) {
                console.error('请求失败:', error);
            }
        },
        //重置入账凭证
        resetProof() {
            this.viewForm = {};
            this.$refs.ProofRefs.clearFiles();
            this.dialogVisibleProof = false;
        },
        //入账凭证文件上传成功
        ProofSuccess(res) {
            this.viewForm.fullFilePath = res.data.fullFilePath;
            saveReceiptVoucher({
                applicationCode: this.viewForm.applicationCode,
                fullFilePath: res.data.fullFilePath,
                loanCode: this.viewForm.loanCode
            }).then((res) => {});
        },
        //入账凭证取消
        proofCancel() {
            this.resetProof();
        },
        //入账凭证通过
        proofPass() {
            this.loadingProof = true;
            saveReceiptVoucherDate({
                applicationCode: this.viewForm.applicationCode,
                receiptVoucherDate: this.viewForm.receiptVoucherDate,
                loanCode: this.viewForm.loanCode
            })
                .then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.resetProof();
                        this.getDataList(this.ruleForm);
                    }
                })
                .finally(() => {
                    this.loadingProof = false;
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

        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },

        handleAvatarSuccess(res) {},
        errorMethod() {
            this.$message.warning(`请上传PDF或者图片`);
        },
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
                    isCrm: true
                }
            });
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
        }
    }
};
</script>

<style lang='less' >
/deep/ .searchForm .el-input--small .el-input__inner {
    width: 260px !important;
}
/deep/ .searchForm .el-form-item__content {
    padding: 0 24px !important;
}

.dataList {
    background-color: #fff;
    // margin-top: 20px;
    padding: 20px;

    .title {
        display: flex;
        justify-content: space-between;
    }

    /deep/.el-table th > .cell {
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

.log-popover {
    color: red !important;
}
.inputClass {
    width: 260px;
    margin-bottom: 16px; /* 统一表单项底部间距 */
    padding: 0 24px !important;
}

.el-upload__tip {
    white-space: normal !important;
    word-break: break-word !important;
    margin-left: 0; /* 移除左边距 */
}

@media (max-width: 768px) {
    .el-upload__tip {
        font-size: 12px;
    }
    .import-dialog {
        width: 90% !important;
        min-width: unset !important;
    }
}
</style>