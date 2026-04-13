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
                    style="width: 100%; font-size: 14px" v-loading="tableLoading" highlight-current-row
                    @current-change="handleCurrentChange" :current-row-key="currentRowKey">
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
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('DSA') && scope.row.proposedAmount">¥{{
                                    scope.row.proposedAmount / 10000 }}</span>
                            <span
                                v-if="scope.row.applicationCode && scope.row.applicationCode.includes('USA') && scope.row.proposedAmount">${{
                                    scope.row.proposedAmount / 10000 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="apr" label="授信利率参考" align="center" width="120px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.lenderId==74">--</span>
                            <span v-else>{{ scope.row.apr }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="proposedInterestRate" label="授信利率(DCL)" align="center" width="120px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.proposedInterestRate }}%</span>
                        </template>
                    </el-table-column> -->
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
                            <span v-if="scope.row.creditApr">{{ scope.row.creditApr }}%</span>
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
                    <el-table-column prop="lastApprovalName" label="当前审批人" align="center" width="180px">
                    </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" fixed="right" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="handleView(scope.row)" type="text"
                                v-if="scope.row.lastApprovalLoginId.includes(userName)">审批</el-button>
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

        <!-- 授信-待风控初审 -->
        <el-dialog :visible.sync="dialogVisibleView" width="30%" title="授信审批" custom-class="import-dialog"
            class="container-box" :close-on-click-modal="false" @close="resetApproval_1st" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款场景:" v-if="viewForm.lenderId != 74">
                        <span v-if="viewForm.loanScenario === '1P'">1p自营</span>
                        <span v-if="viewForm.loanScenario === '1P_3P'">1p转3p</span>
                        <span v-if="viewForm.loanScenario === '1P_CUS'">过桥</span>
                    </el-form-item>
                    <el-form-item label="借款人姓名:">
                        {{ viewForm.borrowerName }}
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="授信额度（DCL）:" v-if="viewForm.lenderId != 74">
                        <span>{{ viewForm.proposedAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="授信利率（DCL）:" v-if="viewForm.lenderId !== 74">
                        <span>{{ viewForm.proposedInterestRate }}%</span>
                    </el-form-item>

                    <el-form-item label="客户情况描述:">
                        <span>{{ viewForm.customerDescription }}</span>
                    </el-form-item>
                    <el-form-item label="客户期望额度:">
                        <span v-if="viewForm.expectedAmount">{{ viewForm.expectedAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="与客户协商一致利率:">
                        <span v-if="viewForm.negotiatedInterestRate">{{ viewForm.negotiatedInterestRate }}%</span>
                    </el-form-item>
                    <el-form-item label="实控人姓名:"
                        v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">
                        <span>{{ viewForm.actualControllerName }}</span>
                    </el-form-item>
                    <el-form-item label="国内经营主体名称:"
                        v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">
                        <span>{{ viewForm.domesticBusinessEntityName }}</span>
                    </el-form-item>
                    <el-form-item label="实控人近1个月征信报告:">
                        <a v-if="viewForm.controllerCreditReport" :href="viewForm.controllerCreditReport"
                            :download="getFileName(viewForm.controllerCreditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(viewForm.controllerCreditReport) }}
                        </a>
                        <span v-else>暂无文件</span>
                    </el-form-item>
                    <el-form-item label="借款企业近1个月征信报告:">
                        <a v-if="viewForm.enterpriseCreditReport" :href="viewForm.enterpriseCreditReport"
                            :download="getFileName(viewForm.enterpriseCreditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(viewForm.enterpriseCreditReport) }}
                        </a>
                        <span v-else>暂无文件</span>
                    </el-form-item>
                    <el-form-item label="借款人企业上一年度审计报告:">
                        <a v-if="viewForm.enterpriseAuditReport" :href="viewForm.enterpriseAuditReport"
                            :download="getFileName(viewForm.enterpriseAuditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(viewForm.enterpriseAuditReport) }}
                        </a>
                        <span v-else>暂无文件</span>
                    </el-form-item>
                    <el-form-item label="其他补充材料:">
                        <div v-if="viewForm.additionalMaterials && viewForm.additionalMaterials.length">
                            <div v-for="(item, index) in viewForm.additionalMaterials" :key="index">
                                <a :href="item" :download="getFileName(item)" target="_blank"
                                    style="color: #409eff; text-decoration: underline; display: block; margin: 5px 0">
                                    {{ getFileName(item) }}
                                </a>
                            </div>
                        </div>
                        <span v-else>暂无文件</span>
                    </el-form-item>
                    <el-form-item label="上传尽调报告:">
                        <el-upload ref="fileApproval_1st" :action="uploadUrl" :before-remove="beforeRemove"
                            :on-success="handleAvatarSuccess" :on-error="errorMethod" multiple :on-exceed="handleExceed"
                            accept=".pdf, .word">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>

                        <span @click="goAIReport" class="AIReport">查看AI尽调报告</span>
                    </el-form-item>
                    <el-form-item label="贷款场景:" prop="loanScenario" v-if="viewForm.lenderId != 74">
                        <el-select v-model="viewForm.loanScenario" placeholder="请选择">
                            <el-option label="1p自营" value="1P" />
                            <el-option label="1p转3p" value="1P_3P" />
                            <el-option label="过桥" value="1P_CUS" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联申请单号:" prop="extApplicationCode"
                        v-if="viewForm.loanScenario === '1P_CUS' || viewForm.loanScenario === '1P_3P'">
                        <el-input v-model="viewForm.extApplicationCode" />
                    </el-form-item>
                    <el-form-item label="授信额度" prop="amount">
                        <el-input v-model="viewForm.amount">
                            <template slot="append">
                                <span v-if="viewForm.applicationCode">{{
                                    viewForm.applicationCode.includes('USA') ? '万美元' : '万元'
                                    }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="授信利率" prop="apr">
                        <el-input v-model="viewForm.apr"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="还款方式" prop="lenderProductId" v-if="viewForm.lenderId != 74">
                        <el-select v-model="viewForm.lenderProductId" placeholder="请选择" style="width: 100%">
                            <el-option v-for="item in getProductByLenderIdList" :key="item.id" :label="item.productName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="viewForm.initiateStatus == 'CREATED' && viewForm.lenderId == 74">
                        <el-form-item label="还款方式：" prop="repaymentType">
                            <el-select v-model="viewForm.repaymentType" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in repayMethodOptions" :key="item.dictValue"
                                    :label="item.dictValue" :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="期限：" prop="term">
                            <el-select v-model="viewForm.term" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in applyTimeOptions" :key="item.dictValue"
                                    :label="item.dictValue" :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最大可支用金额：" prop="maxAmount">
                            <el-input v-model="viewForm.maxAmount"></el-input>
                        </el-form-item>
                        <el-form-item label="担保条件：" prop="guaranteeDesc">
                            <el-input v-model="viewForm.guaranteeDesc"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="saveReject('初审')" icon="el-icon-close" type="danger" :loading="loadingReject"
                        :disabled="loadingPass">审批拒绝</el-button>
                    <el-button @click="savePass" icon="el-icon-check" type="success" :loading="loadingPass"
                        :disabled="loadingReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 授信-待风控复审 风委审批 -->
        <el-dialog :visible.sync="dialogVisibleCommon" width="28%" title="授信审批" custom-class="import-dialog"
            class="container-box" :close-on-click-modal="false" @close="resetCommon" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="当前审批状态:">
                        <span v-if="viewForm.initiateStatus == 'CMC_CREATED'">待CM初审</span>
                        <span v-else-if="viewForm.initiateStatus == 'APPROVAL_1ST'">待风控复审</span>
                        <span v-else>待风委审批</span>
                        <span style="color: #fe1964; margin-left: 20px" @click="goRecord">查看审批记录</span>
                    </el-form-item>
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <!-- <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item> -->
                    <el-form-item label="借款人姓名:">
                        <span>{{ viewForm.borrowerName }}</span>
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="借款人企业:">
                        {{ viewForm.borrowerEnterprise }}
                    </el-form-item>
                    <div v-if="viewForm.initiateStatus == 'APPROVAL_1ST' && viewForm.lenderId == 74">
                        <el-form-item label="还款方式：">
                            <el-select v-model="viewForm.repaymentType" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in repayMethodOptions" :key="item.dictValue"
                                    :label="item.dictValue" :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="期限：">
                            <el-select v-model="viewForm.term" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in applyTimeOptions" :key="item.dictValue"
                                    :label="item.dictValue" :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最大可支用金额：">
                            <el-input v-model="viewForm.maxAmount"></el-input>
                        </el-form-item>
                        <el-form-item label="担保条件：">
                            <el-input v-model="viewForm.guaranteeDesc"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="授信额度（DCL）:">
                        <span v-if="viewForm.proposedAmount" style="color: red">{{ viewForm.proposedAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>

                    <div v-if="viewForm.initiateStatus != 'CMC_CREATED'">
                        <el-form-item label="授信利率（DCL）:">
                            <span v-if="viewForm.proposedInterestRate" style="color: red">{{
                                viewForm.proposedInterestRate
                                }}%</span>
                        </el-form-item>
                        <el-form-item label="授信额度：">
                            <span v-if="viewForm.creditAmount" style="color: red">{{ viewForm.creditAmount / 10000
                            }}<span
                                    v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                    v-else>万元</span></span>
                        </el-form-item>
                        <el-form-item label="授信利率：">
                            <span v-if="viewForm.creditApr" style="color: red">{{ viewForm.creditApr }}%</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="审批意见：">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="saveReject" icon="el-icon-close" type="danger" :loading="loadingReject"
                        :disabled="loadingPass">审批拒绝</el-button>
                    <el-button @click="commonPass" icon="el-icon-check" type="success" :loading="loadingPass"
                        :disabled="loadingReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 放款-待风控初审 -->
        <el-dialog :visible.sync="dialogLoanVisibleView" width="28%" :title="chushenTitle" custom-class="import-dialog"
            class="container-box" :close-on-click-modal="false" @close="resetLoanApproval_1st" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item>

                    <el-form-item label="借款人姓名:">
                        {{ viewForm.borrowerName }}
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="借款人企业:">
                        {{ viewForm.borrowerEnterprise }}
                    </el-form-item>
                    <el-form-item label="授信额度:">
                        <span>{{ viewForm.creditAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="授信利率:">
                        <span>{{ viewForm.creditApr }}%</span>
                    </el-form-item>

                    <el-form-item label="本次支用金额:">
                        <span style="color: red">{{ viewForm.loanAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="锁定程度:">
                        <span style="color: red">{{ viewForm.lockType }}</span>
                    </el-form-item>
                    <el-form-item label="锁定情况:">
                        <span v-if="Array.isArray(viewForm.lockInfos)">
                            {{ viewForm.lockInfos.join(',') }}
                        </span>
                    </el-form-item>
                    <el-form-item label="贷款场景:" prop="loanScenario">
                        <el-select v-model="viewForm.loanScenario" placeholder="请选择">
                            <el-option label="1p自营" value="1P" />
                            <el-option label="1p转3p" value="1P_3P" />
                            <el-option label="过桥" value="1P_CUS" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联申请单号:" prop="extApplicationCode"
                        v-if="viewForm.loanScenario === '1P_CUS' || viewForm.loanScenario === '1P_3P'">
                        <el-input v-model="viewForm.extApplicationCode" />
                    </el-form-item>
                    <el-form-item label="最大可支用金额" prop="maxAmount">
                        <el-input v-model="viewForm.maxAmount">
                            <template slot="append">
                                <span v-if="viewForm.applicationCode">{{
                                    viewForm.applicationCode.includes('USA') ? '万美元' : '万元'
                                }}</span>
                            </template>
                        </el-input>
                        <div style="color: red; line-height: 20px !important; font-size: 12px">
                            注:最大可支用小于本次支用时，须审批拒绝，客户重新发起支用。
                        </div>
                    </el-form-item>
                    <el-form-item label="最新利率参考:">
                        <span style="color: red">{{ viewForm.riskApr }}</span>
                    </el-form-item>
                    <el-form-item label="授信利率" prop="latestApr">
                        <el-input v-model="viewForm.latestApr">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                    <div style="color: red; line-height: 20px !important; font-size: 12px">
                        注意：若填写的最大可支用金额小于当前客户申请支用金额 或 填写的授信利率与当前申请单授信利率不一致，则需操作审批拒绝，再由客户基于最新的额度和利率去发起支用
                    </div>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="loanRejectTips('初审')" icon="el-icon-close" type="danger"
                        :loading="loadingLoanReject" :disabled="loadingLoanPass">审批拒绝</el-button>
                    <el-button @click="loanApproval_1st('初审')" icon="el-icon-check" type="success"
                        :loading="loadingLoanPass" :disabled="loadingLoanReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 放款-待风控复核 财务头寸审核 -->
        <el-dialog :visible.sync="dialogLoanVisibleCommon" width="28%" title="放款审批" custom-class="import-dialog"
            class="container-box" :close-on-click-modal="false" @close="resetLoanCommon" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="当前审批状态:">
                        <span v-if="viewForm.initiateStatus === 'LOAN_APPROVAL_1ST'">待风控复核（放款）</span>
                        <span v-else-if="viewForm.initiateStatus === 'LOAN_APPROVAL_CEO'">待CEO终审</span>
                        <span v-else-if="viewForm.initiateStatus === 'LOAN_APPROVAL_3EP1'">待班委1终审</span>
                        <span v-else-if="viewForm.initiateStatus === 'LOAN_APPROVAL_3EP2'">待班委2终审</span>
                        <span v-else-if="viewForm.initiateStatus === 'LOAN_APPROVAL_3EP3'">待班委3终审</span>
                        <span v-else-if="viewForm.initiateStatus === 'LOAN_APPROVAL_3EP4'">待班委4终审</span>
                        <span v-else>待财务头寸审核</span>
                        <span style="color: #fe1964; margin-left: 20px" @click="goRecord">查看审批记录</span>
                    </el-form-item>
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item>
                    <el-form-item label="借款人姓名:">
                        <span>{{ viewForm.borrowerName }}</span>
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="借款人企业:">
                        {{ viewForm.borrowerEnterprise }}
                    </el-form-item>
                    <el-form-item label="授信额度：">
                        <span v-if="viewForm.creditAmount" style="color: red">{{ viewForm.creditAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="授信利率：">
                        <span v-if="viewForm.creditApr" style="color: red">{{ viewForm.creditApr }}%</span>
                    </el-form-item>
                    <el-form-item label="最大可支用金额:">
                        <span v-if="viewForm.maxAmount" style="color: red">{{ viewForm.maxAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="本次支用金额:">
                        <span v-if="viewForm.loanAmount" style="color: red">{{ viewForm.loanAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="当前额度:">
                        <span v-if="viewForm.currentQuota" style="color: red">{{ viewForm.currentQuota / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>
                    <el-form-item label="审批意见：">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="loanRejectTips" icon="el-icon-close" type="danger" :loading="loadingLoanReject"
                        :disabled="loadingLoanPass">审批拒绝</el-button>
                    <el-button @click="loanApproval2ndPass" icon="el-icon-check" type="success"
                        :loading="loadingLoanPass" :disabled="loadingLoanReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 放款-运营 -待确认贷款合同-->
        <el-dialog :visible.sync="dialogLoanVisibleOperateView" width="25%" title="授信/放款审批" custom-class="import-dialog"
            class="container-box" :close-on-click-modal="false" @close="resetLoanOperate" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item>

                    <el-form-item label="借款人姓名:">
                        {{ viewForm.borrowerName }}
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="借款人企业:">
                        {{ viewForm.borrowerEnterprise }}
                    </el-form-item>

                    <el-form-item label="贷款合同（首次放款需附带授信合同）:" prop="loanFiles">
                        <el-upload ref="fileOperate" :action="uploadUrl" :before-remove="beforeRemove"
                            :on-success="handleOperateFileSuccess" :on-error="errorMethod" multiple
                            :on-exceed="handleExceed" accept=".pdf, .word">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center">
                    <el-button @click="loanRejectTips" icon="el-icon-close" type="danger"
                        :loading="loadingOperateReject" :disabled="loadingOperatePass">审批拒绝</el-button>
                    <el-button @click="operatePass" icon="el-icon-check" type="success" :loading="loadingOperatePass"
                        :disabled="loadingOperateReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 放款-财务 上传放款凭证 -->
        <el-dialog :visible.sync="dialogLoanVisibleFinaceOperation" width="25%" title="放款审批"
            custom-class="import-dialog" class="container-box" :close-on-click-modal="false"
            @close="resetLoanFinanceOperation" center>
            <div style="padding-bottom: 20px">
                <el-form :model="viewForm" :rules="rules" ref="viewForm" label-width="40%">
                    <el-form-item label="贷款申请单号:">
                        <span>{{ viewForm.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号:">
                        <span>{{ viewForm.loanCode }}</span>
                    </el-form-item>

                    <el-form-item label="借款人姓名:">
                        {{ viewForm.borrowerName }}
                    </el-form-item>
                    <el-form-item label="借款人手机号:">
                        {{ viewForm.borrowerMobilePhone }}
                    </el-form-item>
                    <el-form-item label="借款人企业:">
                        {{ viewForm.borrowerEnterprise }}
                    </el-form-item>

                    <el-form-item label="放款账号开户行:">
                        {{ viewForm.name }}
                    </el-form-item>
                    <el-form-item label="放款账户名称:">
                        {{ viewForm.bankName }}
                    </el-form-item>
                    <el-form-item label="放款银行账号:">
                        {{ viewForm.bankNo }}
                    </el-form-item>
                    <el-form-item label="Swift Code:">
                        {{ viewForm.swiftCode }}
                    </el-form-item>
                    <el-form-item label="支用金额:">
                        <span style="color: #fe1964; font-weight: 800">{{ viewForm.loanAmount / 10000
                        }}<span
                                v-if="viewForm.applicationCode && viewForm.applicationCode.includes('USA')">万美元</span><span
                                v-else>万元</span></span>
                    </el-form-item>

                    <el-form-item label="上传放款凭证:" prop="financialDisbursementVoucherUrl">
                        <el-upload ref="fileFinanceOperate" :action="uploadUrl" :before-remove="beforeRemove"
                            :on-success="handleOperateUploadFileSuccess" :on-error="errorMethod" multiple
                            :on-exceed="handleExceed" accept=".pdf, .png,.jpg">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="viewForm.approvalOpinion"
                            :autosize="{ minRows: 4 }"></el-input>
                    </el-form-item>
                </el-form>
                <div style="color: #fe1964; font-weight: 800; margin-bottom: 50px; margin-left: 20%">
                    <div>特别注意：</div>
                    <div>操作审批通过后，人民币将自动通过宝付放款到客户收款账户并更新贷款单状态， 美元将自动更新贷款单状态。</div>
                </div>
                <div style="display: flex; justify-content: center">
                    <el-button @click="loanRejectTips" icon="el-icon-close" type="danger"
                        :loading="loadingFinanceReject" :disabled="loadingFinancePass">审批拒绝</el-button>
                    <el-button @click="finaceOperationPass" icon="el-icon-check" type="success"
                        :loading="loadingFinancePass" :disabled="loadingFinanceReject">审批通过</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getTableList,
    getDetail,
    approvalReject,
    loanReject,
    getApproval_1st,
    getApproval_2nd,
    getApproval_3ep,
    getLoanInfoById,
    getApprovalTableList,
    loan_approval_1st,
    loan_approval_2nd,
    loan_operation,
    finance_operation,
    loan_approval_ceo,
    loan_approval_3ep1,
    loan_approval_3ep2,
    loan_approval_3ep3,
    loan_approval_3ep4,
    finance_operation_upload,
    getProductByLenderId,
    getLoanStatusById,
    cmcApprovalPass,
    getIdMes
} from '@/api/examine.js';
import { max } from 'lodash';
import c from 'vue-awesome/components/Icon';

export default {
    data() {
        return {
            chushenTitle: '放款审批',
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
                loginId: window.localStorage.getItem('userName') || ''
            },
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            fileList: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            count: '',
            currentPage: 1,
            dialogVisibleView: false,
            dialogVisibleCommon: false,
            dialogLoanVisibleView: false,
            dialogLoanVisibleCommon: false,
            dialogLoanVisibleOperateView: false,
            dialogLoanVisibleFinaceOperation: false,
            tableLoading: false,
            loadingPass: false,
            loadingReject: false,
            loadingLoanPass: false,
            loadingLoanReject: false,
            loadingOperatePass: false,
            loadingOperateReject: false,
            loadingFinancePass: false,
            loadingFinanceReject: false,
            rules: {
                amount: [{ required: true, message: '请输入授信额度', trigger: 'blur' }],
                apr: [{ required: true, message: '请输入授信利率', trigger: 'blur' }],
                maxAmount: [{ required: true, message: '请输入最大可支用金额', trigger: 'blur' }],
                loanScenario: [{ required: true, message: '请输入贷款场景', trigger: 'blur' }],
                extApplicationCode: [{ required: true, message: '请输入关联申请单号', trigger: 'blur' }],
                latestApr: [{ required: true, message: '请输入授信利率', trigger: 'blur' }],
                loanFiles: [{ required: true, validator: this.fileMustUpload, trigger: 'change' }],
                financialDisbursementVoucherUrl: [{ required: true, validator: this.fileMustOperateUpload, trigger: 'change' }],
                lenderProductId: [{ required: true, message: '请输入还款方式', trigger: 'blur' }],
                repaymentType: [{ required: true, message: '请输入还款方式', trigger: 'blur' }],
                term: [{ required: true, message: '请输入期限', trigger: 'blur' }],
                maxAmount: [{ required: true, message: '请输入最大可支用金额', trigger: 'blur' }],
                guaranteeDesc: [{ required: true, message: '请输入担保条件', trigger: 'blur' }]
            },
            userName: window.localStorage.getItem('userName') || '',
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
            getProductByLenderIdList: [],
            applyTimeOptions: [],
            repayMethodOptions: [],
            lenderTypeList: [],
            lenderProductTypeList: [],
        };
    },

    created() {
        this.getDataList(this.ruleForm);
        // 数据字典获取
        this.getSelectData('CMC_MONTH')
        this.getSelectData('CMC_REPAY')
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
                if (code === 'CMC_MONTH') {
                    this.applyTimeOptions = res.data || [];
                } else if (code === 'CMC_REPAY') {
                    this.repayMethodOptions = res.data || [];
                } else if (code === 'LENDER_TYPE') {
                    this.lenderTypeList = res.data || [];
                } else if (code === 'LENDER_PRODUCT_TYPE') {
                    this.lenderProductTypeList = res.data || [];
                }
            })
        },
        handleCurrentChange(row) {
            this.currentRowKey = row ? row.date : null; // 假设以 date 作为唯一标识
        },
        //文件上传校验
        fileMustUpload(rule, value, callback) {
            if (!this.viewForm.loanFiles || this.viewForm.loanFiles.length === 0) {
                callback('请上传贷款合同');
            } else {
                callback();
            }
        },
        fileMustOperateUpload(rule, value, callback) {
            if (
                this.viewForm.applicationCode &&
                this.viewForm.applicationCode.includes('USA') &&
                !this.viewForm.financialDisbursementVoucherUrl
            ) {
                callback('请上传放款凭证');
            } else {
                callback();
            }
        },
        getDataList(paramer = this.ruleForm) {
            paramer = {
                ...paramer,
                startTime: paramer.createTime[0] ? paramer.createTime[0] : '',
                endTime: paramer.createTime[0] ? paramer.createTime[1] : ''
            };

            getApprovalTableList(paramer).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.count = res.data.total;
                    this.tableData.forEach((item) => {
                        item.lastApprovalLoginId = item.lastApprovalLoginId ? item.lastApprovalLoginId.split('/') : [];
                    });
                    this.$store.commit('changeexamineListNum', this.total);
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
        //审批入口
        handleView(scope) {
            if (scope.approvalType == 'CREDIT') {
                getDetail(scope.id).then((res) => {
                    if (res.code == 200) {
                        this.viewForm = {
                            ...res.data,
                            approvalOpinion: '',
                            additionalMaterials: res.data.additionalMaterials ? res.data.additionalMaterials.split(',') : []
                        };

                        // 根据详情返回的 lenderId 动态获取还款方式
                        if (res.data && res.data.lenderId) {
                            getProductByLenderId(res.data.lenderId).then((listRes) => {
                                if (listRes.code == 200) this.getProductByLenderIdList = listRes.data;
                            });
                        }

                        //初审
                        if (scope.initiateStatus == 'CREATED') {
                            this.dialogVisibleView = true;
                        } else {
                            //复审和终审
                            this.dialogVisibleCommon = true;
                        }
                    }
                });
            } else {
                getLoanInfoById(scope.id).then((res) => {
                    if (res.code == 200) {
                        this.viewForm = { ...res.data, approvalOpinion: '' };

                        //初审
                        if (scope.initiateStatus == 'LOAN_CREATED') {
                            this.getLoanStatusById(scope.applicationCode)
                            this.dialogLoanVisibleView = true;
                        } else if (scope.initiateStatus == 'LOAN_APPROVAL_2ND' && scope.applicationCode.includes('USA')) {
                            this.dialogLoanVisibleOperateView = true;
                        } else if (scope.initiateStatus == 'FINANCE_OPERATION_UPLOAD') {
                            this.dialogLoanVisibleFinaceOperation = true;
                        } else {
                            this.dialogLoanVisibleCommon = true;
                        }
                    }
                });
            }
        },
        getLoanStatusById(applicationCode) {
            getLoanStatusById({
                applicationCode
            }).then((res) => {
                if (res.code == 200) {
                    if (res.data == 'Y') {
                        this.chushenTitle = '放款审批（续贷）';
                    } else {
                        this.chushenTitle = '放款审批';
                    }
                }
            });
        },
        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },
        //授信-初审通过
        savePass() {
            if (!this.viewForm.loanScenario && this.viewForm.lenderId != 74) {
                return this.$message.warning('请填写贷款场景');
            }
            if ((this.viewForm.loanScenario == '1P_CUS' || this.viewForm.loanScenario == '1P_3P') && !this.viewForm.extApplicationCode) {
                return this.$message.warning('请填写关联申请单号');
            }
            this.loadingPass = true;
            this.$refs.viewForm.validate((valid) => {
                if (valid) {
                    // 判断是否为CMC审批
                    if (this.viewForm.initiateStatus === 'CMC_CREATED') {
                        cmcApprovalPass({
                            id: this.viewForm.id,
                            approvalOpinion: this.viewForm.approvalOpinion,
                            loginId: this.userName
                        }).then((res) => {
                            if (res.code == 200) {
                                this.$message.success('审批通过成功');
                                this.resetApproval_1st();
                                this.getDataList();
                            }
                        }).finally(() => {
                            this.loadingPass = false;
                        });
                    } else {
                        // 原有逻辑
                        getApproval_1st({
                            id: this.viewForm.id,
                            approvalOpinion: this.viewForm.approvalOpinion,
                            loginId: this.userName,
                            amount: this.viewForm.amount * 10000,
                            apr: this.viewForm.apr,
                            riskControlInvestigationReport: this.viewForm.riskControlInvestigationReport ? this.viewForm.riskControlInvestigationReport.join(',') : '',
                            lenderProductId: this.viewForm.lenderProductId,
                            loanScenario: this.viewForm.loanScenario,
                            extApplicationCode: this.viewForm.extApplicationCode,
                            repaymentType: this.viewForm.repaymentType,
                            maxAmount: this.viewForm.maxAmount,
                            term: this.viewForm.term,
                            guaranteeDesc: this.viewForm.guaranteeDesc,
                        }).then((res) => {
                            if (res.code == 200) {
                                this.$message.success('审批通过成功');
                                this.resetApproval_1st();
                                this.getDataList();
                            }
                        }).finally(() => {
                            this.loadingPass = false;
                        });
                    }
                } else {
                    this.loadingPass = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //授信-复审终审通过
        commonPass() {
            this.loadingPass = true;
            console.log("🚀 ~ this.viewForm.initiateStatus:", this.viewForm.initiateStatus)
            // 判断是否为CMC审批
            if (this.viewForm.initiateStatus === 'CMC_CREATED') {
                cmcApprovalPass({
                    id: this.viewForm.id,
                    approvalOpinion: this.viewForm.approvalOpinion,
                    loginId: this.userName,
                    repaymentType: this.viewForm.repaymentType,
                    term: this.viewForm.term,
                    guaranteeDesc: this.viewForm.guaranteeDesc,
                    maxAmount: this.viewForm.maxAmount
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message.success('审批通过成功');
                        this.resetCommon();
                        this.getDataList();
                    }
                }).finally(() => {
                    this.loadingPass = false;
                });
            } else if (this.viewForm.initiateStatus == 'APPROVAL_1ST') {
                getApproval_2nd({
                    id: this.viewForm.id,
                    approvalOpinion: encodeURIComponent(this.viewForm.approvalOpinion),
                    loginId: this.userName
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message.success('审批通过成功');
                        this.resetCommon();
                        this.getDataList();
                    }
                }).finally(() => {
                    this.loadingPass = false;
                });
            } else {
                getApproval_3ep({
                    id: this.viewForm.id,
                    approvalOpinion: encodeURIComponent(this.viewForm.approvalOpinion),
                    loginId: this.userName
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message.success('审批通过成功');
                        this.resetCommon();
                        this.getDataList();
                    }
                }).finally(() => {
                    this.loadingPass = false;
                });
            }
        },
        //授信-审批拒绝
        saveReject(type) {
            if (type == '初审') {
                if (!this.viewForm.loanScenario && this.viewForm.lenderId != 74) {
                    return this.$message.warning('请填写贷款场景');
                }
                if ((this.viewForm.loanScenario == '1P_CUS' || this.viewForm.loanScenario == '1P_3P') && !this.viewForm.extApplicationCode) {
                    return this.$message.warning('请填写关联申请单号');
                }
            }
            this.loadingReject = true;
            approvalReject({
                id: this.viewForm.id,
                approvalOpinion: this.viewForm.approvalOpinion,
                loginId: this.userName,
                loanScenario: this.viewForm.loanScenario,
                extApplicationCode: this.viewForm.extApplicationCode
            }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('审批拒绝成功！');
                    if (this.dialogVisibleView) this.resetApproval_1st();
                    else this.resetCommon();
                    this.getDataList();
                }
            }).finally(() => {
                this.loadingReject = false;
            });
        },

        //授信-初审重置
        resetApproval_1st() {
            this.$refs.viewForm.resetFields();
            this.$refs.fileApproval_1st.clearFiles();
            this.dialogVisibleView = false;
        },
        //授信-通用
        resetCommon() {
            this.$refs.viewForm.resetFields();
            this.dialogVisibleCommon = false;
        },

        //放款-运营重置
        resetLoanOperate() {
            this.$refs.viewForm.resetFields();
            this.$refs.fileOperate.clearFiles();
            this.dialogLoanVisibleOperateView = false;
        },
        loanRejectTips(type) {
            this.$confirm('拒绝后，客户需重新发起，重新走审批流程', '提示', {
                confirmButtonText: '确定审批拒绝',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loanReject(type);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消拒绝操作'
                });
            });
        },
        //放款-拒绝
        loanReject(type) {
            if (type == '初审') {
                if (!this.viewForm.loanScenario && this.viewForm.lenderId != 74) {
                    return this.$message.warning('请填写贷款场景');
                }
                if ((this.viewForm.loanScenario == '1P_CUS' || this.viewForm.loanScenario == '1P_3P') && !this.viewForm.extApplicationCode) {
                    return this.$message.warning('请填写关联申请单号');
                }
                if (!this.viewForm.maxAmount) {
                    return this.$message.warning('请填写最大可支用金额');
                }
                if (!this.viewForm.latestApr) {
                    return this.$message.warning('请填写授信利率');
                }
            }
            this.loadingLoanReject = true;
            loanReject({
                id: this.viewForm.id,
                approvalOpinion: this.viewForm.approvalOpinion,
                loginId: this.userName,
                maxAmount: this.dialogLoanVisibleView ? this.viewForm.maxAmount * 10000 : this.viewForm.maxAmount,
                riskApr: this.viewForm.riskApr,
                latestApr: this.viewForm.latestApr,
                loanScenario: this.viewForm.loanScenario,
                extApplicationCode: this.viewForm.extApplicationCode
            }).then((res) => {
                if (res.code == 200) {
                    this.$message.success('审批拒绝成功！');
                    if (this.dialogLoanVisibleView) this.resetLoanApproval_1st();
                    else if (this.dialogLoanVisibleOperateView) this.resetLoanOperate();
                    else if (this.dialogLoanVisibleFinaceOperation) this.resetLoanFinanceOperation();
                    else this.resetLoanCommon();
                    this.getDataList();
                }
            }).finally(() => {
                this.loadingLoanReject = false;
            });
        },
        //放款-初审重置
        resetLoanApproval_1st() {
            this.$refs.viewForm.resetFields();
            this.dialogLoanVisibleView = false;
        },
        //放款-通用重置
        resetLoanCommon() {
            this.$refs.viewForm.resetFields();
            this.dialogLoanVisibleCommon = false;
        },
        //放款-上传放款文件重置
        resetLoanFinanceOperation() {
            this.$refs.viewForm.resetFields();
            this.$refs.fileFinanceOperate.clearFiles();
            this.dialogLoanVisibleFinaceOperation = false;
        },
        // 放款初审通过
        loanApproval_1st(type) {
            this.loadingLoanPass = true;
            if (type == '初审') {
                if (!this.viewForm.loanScenario && this.viewForm.lenderId != 74) {
                    return this.$message.warning('请填写贷款场景');
                }
                if ((this.viewForm.loanScenario == '1P_CUS' || this.viewForm.loanScenario == '1P_3P') && !this.viewForm.extApplicationCode) {
                    return this.$message.warning('请填写关联申请单号');
                }
                if (!this.viewForm.maxAmount) {
                    return this.$message.warning('请填写最大可支用金额');
                }
                if (!this.viewForm.latestApr) {
                    return this.$message.warning('请填写授信利率');
                }
            }
            this.$refs.viewForm.validate((valid) => {
                if (valid) {
                    loan_approval_1st({
                        id: this.viewForm.id,
                        approvalOpinion: this.viewForm.approvalOpinion,
                        loginId: this.userName,
                        maxAmount: this.viewForm.maxAmount * 10000,
                        riskApr: this.viewForm.riskApr,
                        latestApr: this.viewForm.latestApr,
                        loanScenario: this.viewForm.loanScenario,
                        extApplicationCode: this.viewForm.extApplicationCode
                    })
                        .then((res) => {
                            if (res.code === 200) {
                                this.$message.success('放款初审通过成功');
                                this.resetLoanApproval_1st();
                                this.getDataList();
                            } else {
                                this.$message.error('放款初审通过失败');
                            }
                        })
                        .catch((error) => {
                            console.error('放款初审通过失败:', error);
                            this.$message.error('放款初审通过失败');
                        })
                        .finally(() => {
                            this.loadingLoanPass = false;
                        });
                } else {
                    this.loadingLoanPass = false;
                }
            });
        },
        // 放款-复核-支用财务头寸审核通过
        loanApproval2ndPass() {
            const requestData = {
                id: this.viewForm.id,
                approvalOpinion: encodeURIComponent(this.viewForm.approvalOpinion),
                loginId: this.userName
            };

            const handleSuccess = () => {
                this.$message.success('操作成功');
                this.resetLoanCommon();
                this.getDataList();
            };

            const handleError = (error) => {
                console.error('操作失败:', error);
                this.$message.error('操作失败');
            };

            //复核
            if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_1ST') {
                loan_approval_2nd(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_CEO') {
                //支用ceo审批
                loan_approval_ceo(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_3EP1') {
                //支用班委1
                loan_approval_3ep1(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_3EP2') {
                //支用班委2
                loan_approval_3ep2(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_3EP3') {
                //支用班委3
                loan_approval_3ep3(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else if (this.viewForm.initiateStatus === 'LOAN_APPROVAL_3EP4') {
                //支用班委4
                loan_approval_3ep4(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '审批失败');
                        }
                    })
                    .catch(handleError);
            } else {
                //头寸审核
                finance_operation(requestData)
                    .then((res) => {
                        if (res.code === 200) {
                            handleSuccess();
                        } else {
                            handleError(res.message || '财务操作失败');
                        }
                    })
                    .catch(handleError);
            }
        },

        //放款-运营通过
        operatePass() {
            this.loadingOperatePass = true;
            this.$refs.viewForm.validate((valid) => {
                if (valid) {
                    loan_operation({
                        id: this.viewForm.id,
                        approvalOpinion: encodeURIComponent(this.viewForm.approvalOpinion),
                        loginId: this.userName,
                        loanFiles: this.viewForm.loanFiles.join(',')
                    }).then((res) => {
                        if (res.code === 200) {
                            this.$message.success('操作成功');
                            this.resetLoanOperate();
                            this.getDataList();
                        }
                    }).finally(() => {
                        this.loadingOperatePass = false;
                    });
                } else {
                    this.loadingOperatePass = false;
                }
            });
        },

        //放款-上传放款凭证
        finaceOperationPass() {
            this.loadingFinancePass = true;
            this.$refs.viewForm.validate((valid) => {
                if (valid) {
                    finance_operation_upload({
                        id: this.viewForm.id,
                        approvalOpinion: encodeURIComponent(this.viewForm.approvalOpinion),
                        loginId: this.userName,
                        financialDisbursementVoucherUrl: this.viewForm.financialDisbursementVoucherUrl
                    }).then((res) => {
                        if (res.code === 200) {
                            this.$message.success('操作成功');
                            this.resetLoanFinanceOperation();
                            this.getDataList();
                        }
                    }).finally(() => {
                        this.loadingFinancePass = false;
                    });
                } else {
                    this.loadingFinancePass = false;
                }
            });
        },

        handleAvatarSuccess(res) {
            if (!this.viewForm.riskControlInvestigationReport) this.viewForm.riskControlInvestigationReport = [];
            this.viewForm.riskControlInvestigationReport.push(res.data.fullFilePath);
        },
        // 运营资料上传成功
        handleOperateFileSuccess(res) {
            if (!this.viewForm.loanFiles) this.viewForm.loanFiles = [];
            this.viewForm.loanFiles.push(res.data.fullFilePath);
        },
        //财务凭证上传成功
        handleOperateUploadFileSuccess(res) {
            this.viewForm.financialDisbursementVoucherUrl = res.data.fullFilePath;
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
                initiateStatus: '',
                loginId: this.userName
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
                    borrowerMobilePhone: scope.borrowerMobilePhone
                }
            });
        },
        //查看审批记录
        goRecord() {
            this.$router.push({
                path: '/examineRecord',
                query: {
                    initiateCode: this.viewForm.approvalType == 'CREDIT' ? this.viewForm.initiateCode : this.viewForm.loanCode,
                    approvalType: this.viewForm.approvalType == 'CREDIT' ? 'CREDIT' : 'LOAN',
                    applicationCode: this.viewForm.applicationCode,
                    loanCode: this.viewForm.loanCode,
                    loanScenario: this.viewForm.loanScenario,
                    approvalType: this.viewForm.approvalType,
                    applicationName: this.viewForm.applicationName,
                    initiateStatus: this.viewForm.initiateStatus,
                    borrowerName: this.viewForm.borrowerName,
                    borrowerEnterprise: this.viewForm.borrowerEnterprise,
                    borrowerMobilePhone: this.viewForm.borrowerMobilePhone
                }
            });
        },
        handleDetail(val) {
            localStorage.setItem('bPhoneNumber', val.borrowerMobilePhone);
            localStorage.setItem('bCardId', val.idCard);

            let path = '/loanAssitance-detail';
            if (val.applicationCode && val.applicationCode.includes('USA')) {
                path = '/us-detail';
            }
            this.$router.push({
                path,
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    loanCode: val.loanCode ? val.loanCode : '',
                    productName: val.lenderProductName,
                    creditAmount: val.creditAmount / 10000,
                    applicationStatus: val.initiateStatus,
                    account: val.borrowerMobilePhone,
                    userId: val.userId,
                    lenderId: val.lenderId,
                }
            });
        },
        goAIReport() {
            let query = {
                id: this.viewForm.id,
                loanNumber: this.viewForm.applicationCode,
                productName: this.viewForm.productName,
                creditAmount: this.viewForm.creditAmount,
                lenderId: this.viewForm.lenderId,
                applicationStatus: this.viewForm.applicationStatus,
                account: this.viewForm.account,
                userId: this.viewForm.userId,
                productId: this.viewForm.productId,
                tag: true
            };

            if (this.viewForm.applicationCode && this.viewForm.applicationCode.startsWith('DSA')) {
                this.$router.push({
                    path: '/loanAssitance-detail',
                    query
                });
            } else {
                this.$router.push({
                    path: '/us-detail',
                    query
                });
            }
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

// .el-form-item {
//     margin-bottom: 16px; /* 统一表单项底部间距 */
// }
/deep/ .searchForm .el-input--small .el-input__inner {
    width: 260px;
}

/deep/ .searchForm .el-form-item__content {
    padding: 0 24px !important;
}

.AIReport {
    color: #fe1964;
    cursor: pointer;
    /* 将鼠标指针改为手形 */
}

.AIReport:hover {
    text-decoration: underline !important;
}
</style>