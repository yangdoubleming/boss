<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{
                        $t('common_dsb')
                    }}
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('loan_detail_dkgl')
                }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_zfkje') }}</span>
                                    <span class="grid-num2">{{ loanAmountSum }} {{ $t('common_w') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_zfkbs') }}</span>
                                    <span class="grid-num2">{{ loanNumberSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('home_zdye') }}</span>
                                    <span class="grid-num2">{{ onLoanAmountSum }} {{ $t('common_w') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page @clickCell="clickCell" @filter-item-change="changeRoleSearchSelect"
            @dlqDisbursement="_dlqDisbursement" :exportBtn="true" @onExport="_onExport" :detailTable="true"
            :tableData="tableData" :showFilterRadio="false" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @conditional-query="handleColumnsFilter" :current="currentPage"
            @conditional-reset="handleConditionalReset" @page-change="handlePageChange" @quote="openPlan"
            @update="update" @clearLoan="_clearLoan" :filterStatus="filterStatus" @removeLoan="removeLoan"
            @approveLoan="approveLoan" @changeStatus="changeStatus" @paymentHistory="_paymentHistory" @upBank="_upBank"
            @loanSplit="_loanSplit" @repaymentEvent="_repaymentEvent" @overdue="_overdue" @viewDetails="_viewDetails"
            @entrySettlement="_entrySettlement" @entryServiceFee="_entryServiceFee"
            @confirmRepayment="_confirmRepayment" @applySign="_applySign" @singleTransfer="_singleTransfer"
            @testRepay="_testRepay" />
        <el-dialog title="还款计划" :visible.sync="dialogVisible" width="85%">
            <div style="margin-bottom: 10px">
                <el-button type="primary" @click="openExtensionPlan"
                    style="float: right; margin-bottom: 10px">变更还款计划</el-button>
            </div>
            <xtable :columns="columns2" :detailTable="true" :tableData="planData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="结清" :visible.sync="dialogVisible2" width="14%" style="margin-top: 20vh"
            @closed="removeEndDate">
            <el-date-picker v-model="endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择结清日期"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = fasle">取 消</el-button>
                <el-button type="primary" @click="_clearLoanF">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="贷款单信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="贷款通过时间" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="form.loanApplyDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="起止时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker v-model="dates" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同编号" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.contractNumber" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="期限" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.loanPeriod" autocomplete="off" style="width: 200px" type="number">
                        <!-- <el-button slot="append" icon="el-icon-lx-lock">月</el-button> -->
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="form.periodUnit" @change="changeSelectValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="贷款金额" style="margin-right: 30px" prop="loanAmount">
                    <el-input v-model="form.loanAmount" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="年利率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.apr" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保费" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.guarantorFee" type="number" autocomplete="off" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="担保费率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.guarantorFeeRate" type="number" autocomplete="off" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="贷款结清日期" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="form.loanClearDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="币种" style="margin-right: 30px" prop="currency">
                    <el-select v-model="form.currency" :placeholder="$t('loan_detail_choose')" disabled>
                        <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label"
                            :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_loanUpdate" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="还款记录" :visible.sync="dialogVisible3" width="85%">
            <div style="margin-bottom: 10px">
                <!-- <span>已还金额：{{dealAmountSum }}</span>
                <span style="padding-left:50px">待还本金：{{repaymentAmount}}</span>-->
                <el-button type="primary" @click="openAddHistory"
                    style="float: right; margin-bottom: 10px">创建记录</el-button>
            </div>
            <xtable :columns="columns3" :detailTable="true" :tableData="historyData" @edit="_deteleHistory" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="创建还款记录" :visible.sync="showAddHistory" width="30%">
            <el-form :inline="true" :model="addHistoryForm" :rules="addHistoryRules" ref="addHistoryForm"
                style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="交易时间" style="margin-right: 30px" prop="dealDate">
                    <el-date-picker v-model="addHistoryForm.dealDate" type="datetime" value-format="yyyy-MM-dd"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="还本金额" style="margin-right: 30px" prop="paymentPrincipal">
                    <el-input v-model="addHistoryForm.paymentPrincipal" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="还息金额" style="margin-right: 30px" prop="paymentInterest">
                    <el-input v-model="addHistoryForm.paymentInterest" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="逾期罚息金额" style="margin-right: 30px" prop="paymentPenaltyInterest">
                    <el-input v-model="addHistoryForm.paymentPenaltyInterest" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="借据号" style="margin-right: 30px" prop="duebillNo">
                    <el-input v-model="addHistoryForm.duebillNo" autocomplete="off" type="text"
                        style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="流水号" style="margin-right: 30px" prop="serialNo">
                    <el-input v-model="addHistoryForm.serialNo" autocomplete="off" type="text"
                        style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="还逾期本金金额" style="margin-right: 30px" prop="paymentOverduePrincipal">
                    <el-input v-model="addHistoryForm.paymentOverduePrincipal" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="还逾期利息金额" style="margin-right: 30px" prop="paymentOverdueInterest">
                    <el-input v-model="addHistoryForm.paymentOverdueInterest" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="当前还款期数" style="margin-right: 30px" prop="currentTerm">
                    <el-select v-model="addHistoryForm.currentTerm" :placeholder="$t('loan_detail_choose')">
                        <div v-for="item in 10" :key="item">
                            <el-option :label="item" :value="item" v-if="item != 0"></el-option>
                        </div>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddHistory = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="addHistory" style="width: 80px; height: 35px">提 交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="变更还款计划" :visible.sync="showExtensionPlan" width="30%">
            <el-form :inline="true" :model="extensionPlanForm" ref="extensionPlanForm" style="padding-left: 20px"
                label-width="150px" label-position="left">
                <el-form-item label="展期本金" style="margin-right: 30px" prop="principal">
                    <el-input v-model="extensionPlanForm.principal" autocomplete="off" type="number"
                        style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="展期方式" style="margin-right: 30px" prop="extensionType">
                    <el-select v-model="extensionPlanForm.extensionType" placeholder="等额本息">
                        <el-option v-for="item in extensionTypeOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="展期期限" style="margin-right: 30px" prop="time">
                    <el-input v-model="extensionPlanForm.time" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 50px">
                            <el-select v-model="extensionPlanForm.timeType" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="计息开始日期" style="margin-right: 30px" prop="interestStartTime">
                    <el-date-picker v-model="extensionPlanForm.interestStartTime" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showExtensionPlan = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="getExtensionPlan" style="width: 80px; height: 35px">试 算</el-button>
                <el-button type="primary" @click="updateExtensionPlan" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="展期计划" :visible.sync="showExtensionPlanResult" width="85%">
            <xtable :columns="columns2" :detailTable="true" :tableData="extensionPlanData" />
        </el-dialog>

        <el-dialog title="贷款拆分" :visible.sync="loanSplit" width="80%">
            <div style="margin-bottom: 30px">
                贷款总金额
                <el-input style="width: 300px; margin-left: 10px" :disabled="true" v-model="loanAmount">
                    <template slot="append">万(人民币)</template>
                </el-input>
            </div>
            <xtable :columns="splitColumns" :detailTable="true" :tableData="splitData" @changeInput="_changeInput"
                @edit="_offerrRceived" :isShowSelection="true" @select="selectRow" ref="bossTabel" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ totalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loanSplit = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_offerrRceivedAll('Batch')"
                    style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="还款" :visible.sync="showRePayment" width="60%">
            <el-table :data="rePaymentData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="offerId" label="offerId" width="300"></el-table-column>
                <el-table-column prop="resourceCode" label="单号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="year1SalesValue" label="年销售额(美元)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resourceAmount" label="分配额度(万)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showRePayment = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_rePayment" style="width: 80px; height: 35px">还 款</el-button>
            </div>
        </el-dialog>
        <el-dialog title="确认放款" :visible.sync="showDlqDisbursement" width="40%">
            <el-form :inline="false" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="放款金额：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ dlqdisburseForm.loanAmount == 'USD' ? '$' : '¥' }}
                        {{ Number(dlqdisburseForm.loanAmount).toLocaleString() }}</span>
                </el-form-item>
                <el-form-item label="收款人名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ dlqdisburseForm.bname }}</span>
                </el-form-item>
                <el-form-item label="收款人银行账户：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ dlqdisburseForm.bankNo }}</span>
                </el-form-item>
                <el-form-item label="收款人开户行名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ dlqdisburseForm.bankName }}</span>
                </el-form-item>
                <!-- <el-form-item label="收款人开户行地址：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ dlqdisburseForm.bankAddress }}</span>
                </el-form-item>-->
                <el-form-item label="起息时间：" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="dlqdisburseForm.loanStartDate" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="dlqdisburseForm.loanStatus" label="REPAYMENT">成功</el-radio>
                    <el-radio v-model="dlqdisburseForm.loanStatus" label="DISBURSE_FAILED">失败</el-radio>
                </el-form-item>
                <el-form-item label="放款凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(dlqdisburseForm.filePath)"
                            v-if="dlqdisburseForm.fullFilePath">查看凭证</el-button>

                        <el-upload style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl" :on-success="_dlqFile" :show-file-list="false">
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDlqDisbursement = false">取 消</el-button>
                <el-button type="primary" @click="_pushDlqDisburse">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="确认还款" :visible.sync="showConfirmRepayment" custom-class="source-dialog" width="30%">
            <el-form :hide-required-asterisk="true" :inline="false" :rules="repaymentFormRules" :model="repaymentForm"
                ref="repaymentForm" label-width="140px">
                <el-form-item label="还款类型" prop="repaymentType">
                    <el-select @change="changeType" v-model="repaymentForm.repaymentType" placeholder="请选择还款类型">
                        <el-option label="正常还款" value="REPAYMENT"></el-option>
                        <el-option label="提前结清" value="CLEAR"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="还款期数：" prop="remainTerm">
                    <el-select v-model="repaymentForm.remainTerm" :disabled="isClear" @change="changeTerm" multiple
                        placeholder="请选择还款期数">
                        <el-option v-for="item in value1" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <!-- <el-input v-model="repaymentForm.remainTerm" disabled></el-input> -->
                </el-form-item>
                <el-form-item label="应还本金：" prop="remainPrincipalAmount">
                    <el-input v-model="repaymentForm.remainPrincipalAmount" disabled><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="应还利息：" prop="remainInterestAmount">
                    <el-input v-model="repaymentForm.remainInterestAmount" disabled><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="应还罚息：" prop="remainPenaltyAmount">
                    <el-input v-model="repaymentForm.remainPenaltyAmount" disabled><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="应还总金额：" prop="remainRepaymentAmount">
                    <el-input v-model="repaymentForm.remainRepaymentAmount" disabled><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="减免金额：" prop="reductionFee">
                    <el-input v-model="repaymentForm.reductionFee"><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="银行交易流水号：" prop="serialNo">
                    <el-input v-model="repaymentForm.serialNo"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-btn">
                <el-button @click="closeDia">取 消</el-button>
                <el-button type="primary" @click="_pushConfirmRepayment">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="录入豆服结算价" :visible.sync="showEntrySettlement" custom-class="source-dialog" width="30%">
            <el-form :hide-required-asterisk="true" :inline="false" :rules="settlementFormRules" :model="settlementForm"
                ref="settlementFormRef" label-width="140px">
                <el-form-item label="豆服结算价：" prop="price">
                    <el-input v-model="settlementForm.price"><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-btn">
                <el-button @click="handleCancelSettlement">取 消</el-button>
                <el-button type="primary" @click="_pushConfirmSettlement">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="录入服务商信息" :visible.sync="showEntryServiceFee" custom-class="source-dialog" width="30%">
            <el-form :hide-required-asterisk="true" :inline="false" :rules="entryServiceFeeRules"
                :model="entryServiceFeeForm" ref="entryServiceFeeFormRef" label-width="140px">
                <el-form-item label="服务商服务费:" prop="serviceFee">
                    <el-input v-model="entryServiceFeeForm.brokerage"><el-button slot="append"
                            icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="服务商名称" prop="serviceProviderName">
                            <el-input v-model="entryServiceFeeForm.serviceProviderName"></el-input>
                        </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-btn">
                <el-button @click="handleCancelService">取 消</el-button>
                <el-button type="primary" @click="_pushConfirmService">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="放款审批" :visible.sync="approveLoanDialog" width="25%">
            <el-form>
                <el-form-item label="放款审批" style="margin-left: 50px">
                    <el-select v-model="approveForm.status" style="margin-left: 30px">
                        <el-option value="APPROVED" label="审批通过"></el-option>
                        <el-option value="APPROVAL_REJECTION" label="审批拒绝"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="approveColse">取 消</el-button>
                <el-button type="primary" @click="approveEnsure">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="银行流水信息录入" :visible.sync="upBankShow" width="30%">
            <el-form :inline="true" :model="upBankObj" ref="upBankObj" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="指示参考号:" style="margin-right: 30px" prop="paymentVoucher">
                    <el-input v-model="upBankObj.paymentVoucher" autocomplete="off" style="width: 200px"> </el-input>
                </el-form-item>
                <el-form-item label="交易类型:" style="margin-right: 30px" prop="transactionType">
                    <!-- <el-input v-model="upBankObj.transactionType" autocomplete="off" style="width: 200px">
                    </el-input> -->
                    <el-select v-model="upBankObj.transactionType">
                        <el-option label="银行已收到" value="银行已收到"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预计生效日期:" style="margin-right: 30px" prop="expectedEffectiveDate">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="upBankObj.expectedEffectiveDate"
                        type="datetime" placeholder="选择预计生效日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="付款状态:" style="margin-right: 30px" prop="paymentStatus">
                    <el-select v-model="upBankObj.paymentStatus">
                        <el-option label="标准实时全额结算RTGS" value="标准实时全额结算RTGS"></el-option>
                    </el-select>
                    <!-- <el-input v-model="upBankObj.paymentStatus" autocomplete="off" style="width: 200px">
                    </el-input> -->
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer" style="display: flex; justify-content: center; gap: 40pxs">
                <el-button @click="colseUpBank" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="ensureUpBank" style="width: 80px; height: 35px">提 交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="签约链接" :visible.sync="dialogSignVisible" width="30%" @close="dialogSignVisible = false">
            <div v-if="signLink" style="display: flex; align-items: center; padding: 20px 0">
                <el-input v-model="signLink" disabled></el-input>
                <el-button type="primary" @click="copyLink" style="margin-left: 10px"> 复制链接 </el-button>
            </div>
            <div v-else>
                <p>链接获取失败</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xform from '../../common/Xform.vue';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { repayment, overdue, approveLoan } from '../../../api/boss1';
import {
    loanPage,
    repaymentPlan,
    clearLoan,
    loanUpdate,
    deleteLoan,
    lenderList,
    recordList,
    allotLoan,
    splitedCreateLoan,
    selectLoan,
    addRepaymentHistory,
    deleteHistory,
    getLoanPlan,
    drbAddRepaymentHistory,
    sentShopeeRepayment,
    getDlqdisburseForm,
    getDlqdisburseSubmit,
    getShopeedisburseSubmit,
    metaLoan,
    saveFileUrl,
    pushDisburse,
    ksbDisburse,
    repaymentPlansByLoanCode,
    repaymentPlansByClearSum,
    repaymentWipeFlowWriteOff,
    pfDisburse,
    updatePlan,
    extensionPlan,
    lenderNameList,
    getLenderList,
    sendBank,
    settlementPrice,
    SettlementBrokeragePrice,
    loanPageWithUserId,
    getEsignDowfuContractUrl,
    singleTransfer
} from '../../../api/index';
export default {
    name: 'loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable,
        xform
    },
    data() {
        return {
            dialogSignVisible: false,
            signLink: '',
            upBankObj: {},
            upBankShow: false,
            isClear: false,
            allTerms: [],
            value1: [],
            approveForm: {
                status: 'APPROVED',
                loanCode: ''
            },
            approveLoanDialog: false,
            addHistoryRules: {
                dealDate: [{ required: true, message: '请选择时间', trigger: 'change' }],
                paymentPrincipal: [{ required: true, message: '请填写还本金额', trigger: 'change' }],
                paymentInterest: [{ required: true, message: '请填写还息金额', trigger: 'change' }]
            },
            addHistoryForm: {
                loanCode: '',
                dealDate: '',
                paymentPrincipal: '',
                paymentInterest: '',
                duebillNo: '',
                serialNo: '',
                paymentOverduePrincipal: '',
                paymentOverdueInterest: '',
                currentTerm: '',
                paymentPenaltyInterest: ''
            },
            extensionPlanForm: {
                loanCode: '',
                principal: '',
                extensionType: 'EQUAL_PRINCIPAL',
                time: '',
                timeType: 'M',
                interestStartTime: ''
            },
            splitData: [],
            showRePayment: false,
            dateDefaultValue: 'M',
            splitColumns: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue',
                    width: '120'
                },
                {
                    label: '回传授信金额/万',
                    prop: 'creditAmount',
                    type: 'number',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_dkejw'),
                    prop: 'resourceAmount',
                    cellEdit: 'input',
                    type: 'number',
                    width: '120'
                },

                {
                    label: '期限(月)',
                    prop: 'tenure',
                    cellEdit: 'input',
                    type: 'number'
                },
                {
                    label: '利率(%)',
                    prop: 'interestRate',
                    cellEdit: 'input',
                    type: 'number'
                },
                {
                    label: '服务费（元）',
                    prop: 'serviceFee',
                    cellEdit: 'input',
                    width: '120',
                    type: 'number'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: '_offerrRceived',
                            text: '提交',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            loanAmount: '',
            loanSplit: false,
            dialogVisible3: false,
            columns3: [
                {
                    label: '借据号',
                    prop: 'duebillNo',
                    width: '170'
                },
                {
                    label: '交易金额',
                    prop: 'dealAmount'
                },
                {
                    label: '当前还款期数',
                    prop: 'currentTerm',
                    width: '120'
                },

                {
                    label: '交易日期',
                    prop: 'dealDate'
                },

                {
                    label: '还息金额',
                    prop: 'paymentInterest'
                },

                {
                    label: '还逾期利息金额',
                    prop: 'paymentOverdueInterest',
                    width: 120
                },
                {
                    label: '还逾期本金金额',
                    prop: 'paymentOverduePrincipal',
                    width: 120
                },
                {
                    label: '还逾期罚息金额',
                    prop: 'paymentPenaltyInterest',
                    width: 120
                },
                {
                    label: '还本金额',
                    prop: 'paymentPrincipal'
                },
                {
                    label: '流水号',
                    prop: 'serialNo'
                },
                {
                    label: '剩余待还本金金额',
                    prop: 'surplusPrincipal',
                    width: 120
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '160'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'deteleHistory',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            historyData: [],
            filterStatus: [
                {
                    label: this.$t('status_all'),
                    value: ''
                },
                {
                    label: this.$t('status_create'),
                    value: 'CREATED'
                },
                {
                    label: this.$t('status_successful'),
                    value: 'DISBURSE_SUCESS'
                },
                {
                    label: this.$t('status_failed'),
                    value: 'DISBURSE_FAILED'
                },
                {
                    label: this.$t('status_past'),
                    value: 'OVERDUE'
                },

                {
                    label: this.$t('status_Repayment'),
                    value: 'REPAYMENT'
                },
                {
                    label: this.$t('status_closed'),
                    value: 'CLOSED'
                },
                {
                    label: this.$t('status_cleared'),
                    value: 'CLEAR'
                },
                {
                    label: '已代偿',
                    value: 'COMPENSATORY'
                }
            ],
            loanAmountSum: '',
            loanNumberSum: '',
            onLoanAmountSum: '',
            dates: [],
            id: '',
            currencyOptions: [
                {
                    value: 'CNY',
                    label: '人民币'
                },
                {
                    value: 'USD',
                    label: '美元'
                }
            ],
            form: {
                id: '',
                loanPeriod: '',
                apr: '',
                loanApplyDate: '',
                periodUnit: '',
                loanStartDate: '',
                loanEndDate: '',
                loanAmount: '',
                guarantorFee: '',
                guarantorFeeRate: '',
                contractNumber: '',
                loanClearDate: '',
                currency: ''
            },
            dialogFormVisible: false,
            planData: [],
            extensionPlanData: [],
            dateOptions: [
                {
                    value: 'D',
                    label: '日'
                },
                {
                    value: 'M',
                    label: '月'
                },
                {
                    value: 'Y',
                    label: '年'
                }
            ],
            extensionTypeOptions: [
                {
                    value: 'EQUAL_PRINCIPAL',
                    label: '等额本息'
                },
                {
                    value: 'ONE_TIME_REPAYMENT',
                    label: '一次性还本付息'
                }
            ],

            dialogVisible: false,
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_dkbh'),
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('loan_search_zf'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: this.$t('loan_search_zfcp'),
                    filterable: true,
                    options: []
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholderArr: [this.$t('loan_detail_zykssj'), this.$t('loan_detail_zyjssj')]
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholder: '',
                    placeholderArr: [this.$t('loan_detail_dkjssjks'), this.$t('loan_detail_dkjssjjs')],
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_jkrmc'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_search_jkrsjh'),
                    filterable: true
                }
                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '放款审批状态',
                //     filterable: true,
                //     options: [
                //         {
                //             value: 'APPROVED',
                //             label: '审批通过'
                //         },
                //         {
                //             value: 'APPROVAL_REJECTION',
                //             label: '审批拒绝'
                //         },
                //         {
                //             value: 'PENDING_APPROVAL',
                //             label: '等待审批'
                //         }
                //     ]
                // },

                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '状态',
                //     filterable: true,
                //     options: [
                //         {
                //              label: this.$t('status_create'),
                //             value: 'CREATED'
                //         },
                //         {
                //              label: this.$t('status_successful'),
                //             value: 'DISBURSE_SUCESS'
                //         },
                //         {
                //              label: this.$t('status_failed'),
                //             value: 'DISBURSE_FAILED'
                //         },
                //         {
                //             label: this.$t('status_past'),
                //             value: 'OVERDUE'
                //         },
                //         {
                //             label: this.$t('status_Repayment'),
                //             value: 'REPAYMENT'
                //         },
                //         {
                //              label: this.$t('status_closed'),
                //             value: 'CLOSED'
                //         },
                //     ]
                // },
                // {
                //     type: 'select',
                //     value: '',
                //     placeholder: '锁定',
                //     filterable: true,
                //     options: [
                //         {
                //             label: '未锁定',
                //             value: 'UNLOCK'
                //         },
                //         {
                //             label: '锁定',
                //             value: 'LOCK'
                //         },

                //     ]
                // }
            ],
            columns2: [
                {
                    label: '当期本金/元',
                    prop: 'currentPrincipal',
                    width: 100
                },
                {
                    label: '当期利息/元',
                    prop: 'currentInterest',
                    width: 100
                },
                {
                    label: '服务费/元',
                    prop: 'serviceFee',
                    width: 100
                },
                {
                    label: '当前期数/月',
                    prop: 'currentTerm',
                    width: 100
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'interestRate',
                    width: 100
                },
                {
                    label: '当期还款总金额/元',
                    prop: 'currentRepaymentAmount',
                    width: 140
                },
                {
                    label: '剩余待还本金/元',
                    prop: 'remainPrincipalAmount'
                },
                {
                    label: '剩余待还利息/元',
                    prop: 'remainInterestAmount'
                },
                {
                    label: '剩余待还罚息/元',
                    prop: 'remainPenaltyAmount'
                },
                {
                    label: '剩余待还总金额/元',
                    prop: 'remainRepaymentAmount'
                },
                {
                    label: '还款状态',
                    prop: 'repaymentStatus'
                },
                {
                    label: '还款日期',
                    prop: 'repaymentDate',
                    width: '170'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '170'
                }
            ],

            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '220',
                    color: 'red'
                },
                {
                    label: '用户ID',
                    prop: 'userId',
                    width: '100',
                    color: 'red'
                },
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220',
                    color: 'red'
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: '190'
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: '90'
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: '160'
                },

                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_fkspzt'),
                    prop: 'riskControlApprovalStatus',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr',
                    width: '100'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '200'
                },
                // {
                //     label: this.$t('loan_detail_sxdh'),
                //     prop: 'creditCode',
                //     width: '220'
                // },
                // {
                //     label: '存款账户',
                //     prop: 'depositAccount'
                // },
                // {
                //     label: '存款账户银行',
                //     prop: 'depositAccountBank',
                //     width: '120'
                // },

                // {
                //     label: '存款账户用户名',
                //     prop: 'depositAccountUsername',
                //     width: '120'
                // },
                {
                    label: this.$t('loan_search_loan'),
                    prop: 'loanBalance',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_htxy'),
                    prop: 'guarantorFee',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_dbfl'),
                    prop: 'guarantorFeeRate',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_dkedw'),
                    prop: 'loanAmount',
                    width: '130'
                },

                {
                    label: this.$t('loan_detail_dkzysqrq'),
                    prop: 'loanApplyDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_dkzyksrq'),
                    prop: 'loanStartDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_dkzyjsrq'),
                    prop: 'loanEndDate',
                    width: '200'
                },

                {
                    label: this.$t('loan_detail_zq'),
                    prop: 'loanPeriod'
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '200'
                },
                {
                    label: '支用方式',
                    prop: 'payType',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_hkfs'),
                    prop: 'repaymentMethod',
                    width: '260'
                },

                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '200'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'upBank',
                            text: '银行流水上传',
                            type: 'warning',
                            popover: true
                        },
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_hkjh'),
                            type: 'success',
                            popover: true
                        },

                        {
                            event: 'paymentHistory',
                            text: this.$t('loan_detail_fkjl'),
                            type: 'warning',
                            popover: true
                        },
                        {
                            event: 'loanSplit',
                            text: this.$t('loan_detail_ymxcjdk'),
                            type: 'primary',
                            popover: true,
                            code: 'AMAZON_CREATE_LOAN'
                        },
                        {
                            event: 'repaymentEvent',
                            text: this.$t('loan_detail_amazonjq'),
                            type: 'primary',
                            popover: true,
                            code: 'AMAZON_REPAYMENT'
                        },
                        {
                            event: 'overdue',
                            text: this.$t('status_table_yq'),
                            type: 'primary',
                            popover: true,
                            code: 'LOAN_REPAYMENT'
                        },
                        // {
                        //     event: 'clearLoan',
                        //     text: this.$t('status_table_cleared'),
                        //     type: 'primary',
                        //     popover: true,
                        //     code: 'LOAN_REPAYMENT'
                        // },
                        {
                            event: 'dlqDisbursement',
                            text: this.$t('loan_detail_qrfk'),
                            type: 'primary',
                            popover: true,
                            code: 'LOAN_CONFIRM'
                        },
                        {
                            event: 'confirmRepayment',
                            text: this.$t('loan_detail_hkqr'),
                            type: 'primary',
                            popover: true,
                            code: 'CONFIRM_REPAYMENT'
                        },
                        {
                            event: 'update',
                            text: this.$t('loan_detail_xg'),
                            type: '',
                            popover: true,
                            code: 'UPDATA_LOAN'
                        },

                        {
                            event: 'removeLoan',
                            text: this.$t('loan_detail_delete'),
                            type: 'danger',
                            popover: true,
                            code: 'DELETE_LOAN'
                        },
                        {
                            event: 'approveLoan',
                            text: this.$t('loan_detail_fksq'),
                            type: 'primary',
                            popover: true,
                            code: 'APPOVE_LOAN'
                        },
                        {
                            event: 'viewDetails',
                            text: this.$t('common_see'),
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'entrySettlement',
                            text: '录入豆服结算价',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'applySign',
                            text: '支用签约',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'singleTransfer',
                            text: '豆服线下打款',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'entryServiceFee',
                            text: '录入服务商信息',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'testRepay',
                            text: '还款测算',
                            type: 'primary',
                            popover: true
                        }
                    ],
                    fixed: 'right'
                }
            ],
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            productsList: [],
            row: {},
            dialogVisible2: false,
            endDate: '',
            loanStatus: '',
            repaymentAmount: 0,
            dealAmountSum: 0,
            totalMoney: 0,
            rePaymentData: [],
            chooseDatas: [],
            showAddHistory: false,
            showExtensionPlan: false,
            showExtensionPlanResult: false,
            showEntryServiceFee: false,
            selectRowData: [],
            showDlqDisbursement: false, //店零钱确认放款弹窗
            dlqdisburseForm: {
                loanStartDate: '',
                loanStatus: 'REPAYMENT'
            },
            showConfirmRepayment: false,
            repaymentForm: {
                remainInterestAmount: '',
                remainPenaltyAmount: '',
                remainRepaymentAmount: '',
                remainPrincipalAmount: '',
                reductionFee: '',
                serialNo: ''
            },
            showEntrySettlement: false,
            settlementForm: {
                price: '',
                id: ''
            },
            settlementFormRules: {
                price: [{ required: true, message: '请输入结算价', trigger: 'blur' }]
            },
            entryServiceFeeForm: {
                id: '',
                brokerage: '',
                serviceProviderName:''
            },
            entryServiceFeeRules: {
                brokerage: [{ required: true, message: '请输入服务商服务费', trigger: 'blur' }],
                serviceProviderName: [{ required: true, message: '请输入服务商名称', trigger: 'blur' }],
            },
            repaymentFormRules: {
                serialNo: [{ required: true, message: '请填写银行交易流水号', trigger: 'blur' }],
                remainTerm: [{ required: true, message: '请选择期数', trigger: 'change' }],
                repaymentType: [{ required: true, message: '请选择还款类型', trigger: 'change' }]
                // remainTerm: [{ required: true, message: '请选择期数', trigger: 'change' }],
            }
        };
    },
    mounted() {
        document.addEventListener('copy', function (e) {
            // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
            let clipboardData = e.clipboardData || window.clipboardData;
            // 如果 未复制或者未剪切，直接 return
            if (!clipboardData) return;
            // Selection 对象 表示用户选择的文本范围或光标的当前位置。
            // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
            let text = window.getSelection().toString();
            if (text) {
                // 如果文本存在，首先取消默认行为
                e.preventDefault();
                // 通过调用 clipboardData 对象的 setData(format,data) 方法，设置相关文本
                // format 一个 DOMString 类型 表示要添加到 drag object 的拖动数据的类型
                // data 一个 DOMString 表示要添加到 drag object 的数据
                clipboardData.setData('text/plain', text.trim());
            }
        });
    },

    activated() {
        // console.log(this.$route);
        if (this.$route.query.loanNumber) {
            setTimeout(() => {
                this.filterOptions[1].value = this.$route.query.loanNumber;
                this._getList();
                this.$route.query.loanNumber = '';
            }, 0);
        }
        this.selectRowData = [];
        document.addEventListener('copy', function (e) {
            // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
            let clipboardData = e.clipboardData || window.clipboardData;
            // 如果 未复制或者未剪切，直接 return
            if (!clipboardData) return;
            // Selection 对象 表示用户选择的文本范围或光标的当前位置。
            // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
            let text = window.getSelection().toString();
            if (text) {
                // 如果文本存在，首先取消默认行为
                e.preventDefault();
                // 通过调用 clipboardData 对象的 setData(format,data) 方法，设置相关文本
                // format 一个 DOMString 类型 表示要添加到 drag object 的拖动数据的类型
                // data 一个 DOMString 表示要添加到 drag object 的数据
                clipboardData.setData('text/plain', text.trim());
            }
        });
    },
    deactivated() {
        document.removeEventListener('copy', function (e) {
            let clipboardData = e.clipboardData || window.clipboardData;
            if (!clipboardData) return;

            let text = window.getSelection().toString();
            if (text) {
                e.preventDefault();
                clipboardData.setData('text/plain', text.trim());
            }
        });
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[4].options = res.data;
        });
        lenderNameList({
            lenderType: '境内'
        }).then((res) => {
            let option = [];
            res.data.forEach((item) => {
                let obj = {};
                obj.label = item;
                obj.value = item;
                item = obj;
                option.push(obj);
            });
            this.filterOptions[3].options = option;
        });
    },

    methods: {
        _applySign(row) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)'
            });
            getEsignDowfuContractUrl({
                signType: 'LOAN',
                code: row.loanCode
            })
                .then((res) => {
                    loading.close();
                    if (!res.data.isSign) {
                        this.signLink = res.data.shortUrl; // Set the sign link
                        this.dialogSignVisible = true; // Show the dialog
                    } else {
                        this.$message.warning('支用签约已完成');
                    }
                })
                .catch((err) => {
                    loading.close();
                });
        },
        copyLink() {
            const textarea = document.createElement('textarea');
            textarea.value = this.signLink;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.$message.success('链接已复制到剪贴板');
        },
        _singleTransfer(row) {
            this.$confirm('是否打款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                singleTransfer({
                    loanCode: row.loanCode
                }).then((res) => {
                    this.$message.success('打款成功');
                });
            });
        },

        _pushConfirmSettlement() {
            if (!this.settlementForm.price) {
                this.$message.error('请输入结算价');
                return;
            }
            if (!/^\d+\.\d{2}$/.test(this.settlementForm.price)) {
                this.$message.error('结算价必须保留两位小数');
                return;
            }
            if (parseFloat(this.settlementForm.price) > parseFloat(this.settlementForm.loanAmount)) {
                this.$message.error('结算价不得大于贷款金额');
                return;
            }
            settlementPrice(this.settlementForm).then((res) => {
                this.$message.success('操作成功');
                this.$refs.settlementForm.resetFields();
                this.showEntrySettlement = false;
            });
        },
        handleCancelSettlement() {
            this.$refs.entryServiceFeeFormRef.resetFields();
            this.showEntryServiceFee = false;
        },
        handleCancelService() {
            this.$refs.entryServiceFeeFormRef.resetFields();
            this.showEntryServiceFee = false;
        },
        _pushConfirmService() {
            this.$refs.entryServiceFeeFormRef.validate((valid) => {
                if (valid) {
                    SettlementBrokeragePrice(this.entryServiceFeeForm).then((res) => {
                        this.$message.success('操作成功');
                        this.$refs.entryServiceFeeFormRef.resetFields();
                        this.showEntryServiceFee = false;
                    });
                }
            });
        },
        _entrySettlement(row) {
            console.log('🚀 ~ _entrySettlement ~ row:', row);
            this.showEntrySettlement = true;
            this.settlementForm.price = row.price;
            this.settlementForm.loanAmount = parseFloat(row.loanAmount.replace('¥', '')) * 10000;
            console.log(this.settlementForm.loanAmount);
            this.settlementForm.id = row.id;
        },
        _entryServiceFee(row) {
            console.log('🚀 ~ _entryServiceFee ~ row:', row);
            this.showEntryServiceFee = true;
            console.log(row);

            this.entryServiceFeeForm.brokerage = row.brokerage != null ? row.brokerage.toString() : '';
            this.entryServiceFeeForm.id = row.id;
        },
        // 还款测算
        _testRepay(row) {
            this.$router.push({ path: '/repaymentTest', query: { loanCode: row.loanCode } })
        },
        colseUpBank() {
            this.upBankObj = {};
            this.upBankShow = false;
        },
        //上传银行流水
        _upBank(row) {
            this.upBankShow = true;
            this.upBankObj.loanCode = row.loanCode;
        },
        //确认上传银行流水
        ensureUpBank() {
            sendBank(this.upBankObj).then((res) => {
                this.$message.success('上传成功');
                this.colseUpBank();
            });
        },
        changeRoleSearchSelect(val) {
            if (typeof val != 'number') {
                getLenderList({ lenderNameShort: this.filterOptions[3].value }).then((res) => {
                    res.data.forEach((item) => {
                        item.label = item.lenderName;
                        item.value = item.id;
                    });
                    this.filterOptions[4].options = res.data;
                });
            }
        },
        closeDia() {
            this.$refs.repaymentForm.resetFields();
            this.showConfirmRepayment = false;
        },
        clickCell(row) {
            if (row.column.columnKey == '申请单号') {
                let orderStatusStr = [
                    '已创建',
                    '已提交',
                    '已初核',
                    '已复核',
                    '已批准',
                    '已启用',
                    '已拒绝',
                    '已放弃',
                    '已提款',
                    '已放款',
                    '已逾期',
                    '已关闭'
                ];
                let orderStatus = [
                    'CREATED',
                    'SUBMITTED',
                    'RECEIVED_1ST',
                    'RECEIVED_2ND',
                    'APPROVED',
                    'ENABLED',
                    'REJECTED',
                    'ABANDONED',
                    'WITHDRAWED',
                    'DISBURSED',
                    'OVERDUE',
                    'CLOSED'
                ];
                row.row.applicationStatus = orderStatus.indexOf(row.row.applicationStatus).toString()
                    ? orderStatusStr[orderStatus.indexOf(row.row.applicationStatus)]
                    : '';

                this.$router.push({
                    path: '/loanAssitance-detail',
                    query: {
                        id: row.row.id,
                        loanNumber: row.row.applicationCode,
                        productName: row.row.productName,
                        creditAmount: row.row.creditAmount,
                        applicationStatus: row.row.applicationStatus,
                        account: row.row.account,
                        userId: row.row.userId,
                        lenderId: row.row.lenderId
                    }
                });
            }
            if (row.column.columnKey == '授信单号') {
                this.$router.push({
                    path: '/risk-manage-list',
                    query: {
                        creditCode: row.row.creditCode
                    }
                });
            }
        },
        approveLoan(row) {
            this.approveForm.loanCode = row.loanCode;
            this.approveLoanDialog = true;
        },
        approveColse() {
            this.approveLoanDialog = false;
            this.approveForm = {
                status: 'APPROVED',
                loanCode: ''
            };
        },
        approveEnsure() {
            approveLoan(this.approveForm).then((res) => {
                this.$message.success('审批成功');
                this.approveColse();
                this._getList();
            });
        },
        changeSelectValue(v) {
            console.log(2323253, v);
        },
        // 查看详情
        _viewDetails(row) {
            this.$router.push({
                path: '/loan-detail',
                query: {
                    //携带参数
                    data: JSON.stringify(row)
                }
            });
        },
        openFile(file) {
            window.open(this.imgsBaseUrl + file);
        },
        _pushDlqDisburse() {
            if (this.dlqdisburseForm.lenderProductId == 74) {
                getShopeedisburseSubmit(this.dlqdisburseForm).then((res) => {
                    this.$message.success('操作成功！');
                    this.showDlqDisbursement = false;
                    this._getList();
                    Object.keys(this.dlqdisburseForm).forEach((key) => {
                        this.dlqdisburseForm[key] = '';
                    });
                    this.dlqdisburseForm.loanStatus = 'REPAYMENT';
                });
            } else if (this.dlqdisburseForm.lenderProductId == 97) {
                this.dlqdisburseForm.disburseDate = this.dlqdisburseForm.loanStartDate;
                this.dlqdisburseForm.loanStatus = this.dlqdisburseForm.loanStatus == 'REPAYMENT' ? true : false;

                metaLoan(this.dlqdisburseForm).then((res) => {
                    saveFileUrl({
                        path: this.dlqdisburseForm.filePath,
                        resourceCode: this.dlqdisburseForm.loanCode,
                        resourceType: 'LOAN'
                    }).then((res) => {
                        this.$message.success('操作成功！');
                        this.showDlqDisbursement = false;
                        this._getList();
                        Object.keys(this.dlqdisburseForm).forEach((key) => {
                            this.dlqdisburseForm[key] = '';
                        });
                        this.dlqdisburseForm.loanStatus = 'REPAYMENT';
                    });
                });
            } else if (this.dlqdisburseForm.lenderProductId == 98 || this.dlqdisburseForm.lenderProductId == 99) {
                if (!this.dlqdisburseForm.filePath) {
                    return this.$message.info('请上传凭证');
                }
                this.dlqdisburseForm.disburseDate = this.dlqdisburseForm.loanStartDate;
                this.dlqdisburseForm.loanStatus = this.dlqdisburseForm.loanStatus == 'REPAYMENT' ? true : false;

                pushDisburse(this.dlqdisburseForm).then((res) => {
                    saveFileUrl({
                        path: this.dlqdisburseForm.filePath,
                        resourceCode: this.dlqdisburseForm.loanCode,
                        resourceType: 'LOAN'
                    }).then((res) => {
                        this.$message.success('操作成功！');
                        this.showDlqDisbursement = false;
                        this._getList();
                        Object.keys(this.dlqdisburseForm).forEach((key) => {
                            this.dlqdisburseForm[key] = '';
                        });
                        this.dlqdisburseForm.loanStatus = 'REPAYMENT';
                    });
                });
            } else {
                getDlqdisburseSubmit(this.dlqdisburseForm).then((res) => {
                    this.$message.success('操作成功！');
                    this.showDlqDisbursement = false;
                    this._getList();
                    Object.keys(this.dlqdisburseForm).forEach((key) => {
                        this.dlqdisburseForm[key] = '';
                    });
                    this.dlqdisburseForm.loanStatus = 'REPAYMENT';
                });
            }
        },
        _dlqFile(file) {
            console.log(file);
            if (file.code == 400) {
                this.$message.info(file.message);
                return false;
            }
            this.$set(this.dlqdisburseForm, 'fileName', file.data.fileName);
            this.$set(this.dlqdisburseForm, 'filePath', file.data.filePath);
            this.$set(this.dlqdisburseForm, 'fullFilePath', file.data.fullFilePath);
        },
        _dlqDisbursement(row) {
            this.dlqdisburseForm.loanCode = row.loanCode;
            if (
                row.lenderProductId == 98 ||
                row.lenderProductId == 99 ||
                row.lenderProductId == 106 ||
                row.lenderProductId == 74 ||
                row.lenderProductId == 115 ||
                row.lenderProductId == 116 ||
                row.lenderProductId == 119 ||
                row.lenderProductId == 120 ||
                row.lenderProductId == 124 ||
                row.lenderProductId == 126 ||
                row.lenderProductId == 127 ||
                row.lenderProductId == 130 ||
                row.lenderProductId == 131 ||
                row.lenderProductId == 132 ||
                row.lenderProductId == 161 ||
                row.lenderProductId == 162
            ) {
                if (row.riskControlApprovalStatus == '审批通过') {
                    this.$confirm('请确定是否自动放款?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        ksbDisburse(row.loanCode).then((res) => {
                            this.$message.success('操作成功');
                        });
                    });
                } else {
                    return this.$message.info('请等待放款审批通过');
                }
            } else if (
                row.lenderProductId == 110 ||
                row.lenderProductId == 112 ||
                row.lenderProductId == 93 ||
                row.lenderProductId == 114
            ) {
                if (row.riskControlApprovalStatus == '审批通过') {
                    this.$confirm('请确定是否自动放款?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        pfDisburse(row.loanCode).then((res) => {
                            this.$message.success('操作成功');
                        });
                    });
                } else {
                    return this.$message.info('请等待放款审批通过');
                }
            } else {
                getDlqdisburseForm(row.loanCode).then((res) => {
                    this.dlqdisburseForm = Object.assign(this.dlqdisburseForm, res.data);
                    this.dlqdisburseForm.lenderProductId = row.lenderProductId;
                    this.showDlqDisbursement = true;
                    console.log(this.dlqdisburseForm);
                });
            }
        },
        _deteleHistory(t, r) {
            this.$confirm('请确定是否删除该条还款记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteHistory(r.id).then((res) => {
                    this.$message.success('删除成功！');
                    this._paymentHistory(this.row);
                });
            });
        },
        _overdue(row) {
            this.$confirm('请确定是否设置逾期?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                overdue({
                    lenderProductId: row.lenderProductId,
                    id: row.id
                }).then((res) => {
                    this.$message.success('操作成功！');
                    this._getList();
                });
            });
        },
        // boss1 多选框change时间
        selectRow(rows) {
            console.log(rows);
            this.selectRowData = rows;
        },
        addHistory() {
            this.$refs.addHistoryForm.validate((valid) => {
                if (valid) {
                    this.addHistoryForm.loanCode = this.row.loanCode;
                    if (this.row.lenderName == '惠民保理') {
                        drbAddRepaymentHistory(this.addHistoryForm).then((res) => {
                            this.$message.success('创建成功');
                            this.showAddHistory = false;
                            this._paymentHistory(this.row);
                            Object.keys(this.addHistoryForm).forEach((key) => {
                                this.addHistoryForm[key] = '';
                            });
                        });
                    } else {
                        addRepaymentHistory(this.addHistoryForm).then((res) => {
                            this.$message.success('创建成功');
                            this.showAddHistory = false;
                            // 虾皮推送
                            if (this.row.lenderName === '惠民保理-虾皮') {
                                sentShopeeRepayment({ userId: this.row.userId, loanCode: this.row.loanCode }).then((_) => { });
                            }
                            this._paymentHistory(this.row);
                            Object.keys(this.addHistoryForm).forEach((key) => {
                                this.addHistoryForm[key] = '';
                            });
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        openAddHistory() {
            this.showAddHistory = true;
            if (this.row.lenderName == '惠民保理') {
                this.addHistoryForm.paymentPrincipal = 3333.33;
            }
        },
        openExtensionPlan() {
            this.showExtensionPlan = true;
        },
        getExtensionPlan() {
            extensionPlan(this.extensionPlanForm).then((res) => {
                this.extensionPlanData = res.data;
                this.showExtensionPlanResult = true;
            });
        },
        updateExtensionPlan(row) {
            updatePlan(this.extensionPlanForm).then((res) => {
                this.$message.success('修改成功');
                this.showExtensionPlan = false;
                this.dialogVisible = false;
            });
        },
        handleSelectionChange(val) {
            this.chooseDatas = val;
        },
        _rePayment() {
            if (!this.chooseDatas.length) {
                return this.$message.info('请先选择');
            }
            repayment(this.chooseDatas).then((res) => {
                this.$message.success('操作成功！');
            });
        },
        _changeInput() {
            console.log(this.splitData);
            this.totalMoney = 0;
            this.splitData.forEach((item) => {
                this.totalMoney = Number(item.resourceAmount) + this.totalMoney;
                // item.creditAmount=(item.creditAmount/10000).toFixed(2)
            });
            this.totalMoney = this.totalMoney.toFixed(3);
        },
        _repaymentEvent(row) {
            allotLoan(row.loanCode).then((res) => {
                this.rePaymentData = res.data;
                this.showRePayment = true;
            });
        },
        _offerrRceived(text, row) {
            let obj = JSON.parse(JSON.stringify(row));
            obj.interestRate = (obj.interestRate / 100).toFixed(4);
            splitedCreateLoan([obj]).then((res) => {
                this.$message.success('提交成功！');
                this.loanSplit = false;
            });
        },
        _offerrRceivedAll() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)'
            });
            let data = JSON.parse(JSON.stringify(this.selectRowData));
            data.forEach((item) => {
                item.interestRate = (item.interestRate / 100).toFixed(4);
            });
            splitedCreateLoan(data)
                .then((res) => {
                    this.$message.success('提交成功！');
                    this.loanSplit = false;
                    loading.close();
                })
                .catch((err) => {
                    loading.close();
                });
        },

        _loanSplit(row) {
            this.totalMoney = 0;
            this.loanAmount = row.loanAmount;
            allotLoan(row.loanCode).then((res) => {
                res.data.forEach((item) => {
                    // item.year1SalesValue = item.year1SalesValue;
                    // item.resourceAmount = item.resourceAmount;
                    item.creditAmount = (item.creditAmount / 10000).toFixed(3);
                    item.year1SalesValue = (item.year1SalesValue / 10000).toFixed(2);
                    // item.disabled = item.loanStatus == 'UN_ACTIVE' && item.creditApprovalStatus == 'ACTIVE' ? false : true;
                    // item.hiddenBtn = item.loanStatus == 'UN_ACTIVE' && item.creditApprovalStatus == 'ACTIVE' ? '' : '提交';
                });

                this.splitData = res.data;
                this.loanSplit = true;
                this._changeInput();
            });
        },
        _paymentHistory(row) {
            this.row = row;
            this.dialogVisible3 = true;
            this.historyData = [];
            this.repaymentAmount = '';
            this.dealAmountSum = '';
            recordList(row.loanCode).then((res) => {
                this.historyData = res.data.repaymentRecordVoList || [];
                this.dealAmountSum = res.data.dealAmountSum; //待还本金
                this.repaymentAmount = res.data.repaymentAmount; //已还金额
            });
        },
        changeStatus(val) {
            this.loanStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        removeEndDate() {
            this.endDate = '';
        },
        removeLoan(row) {
            this.$confirm('请确定是否删除该贷款单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteLoan(row.id).then((res) => {
                    this.$message.success('删除成功！');
                    this._getList();
                });
            });
        },

        _loanUpdate() {
            this.form.loanStartDate = this.dates && this.dates[0] ? this.dates[0] : '';
            this.form.loanEndDate = this.dates && this.dates[1] ? this.dates[1] : '';
            this.form.loanClearDate = this.form.loanClearDate || '';
            let formData = new FormData();
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key]);
            });

            //formData.append('periodUnit', this.dateDefaultValue);

            loanUpdate(formData).then((res) => {
                this._getList();
                this.$message.success('修改成功！');
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
                this.dates = [];
                this.dialogFormVisible = false;
            });
        },
        update(row) {
            // this.form=row
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
            this.form.loanAmount = this.form.loanAmount.substring(1);
            this.form.loanPeriod = this.form.loanPeriod.substring(0, this.form.loanPeriod.length - 1);
            console.log(222, this.form.loanAmount);
            console.log(333, this.form.loanPeriod);
            this.dates = [];
            this.dates.push(row.loanStartDate);
            this.dates.push(row.loanEndDate);
            this.dialogFormVisible = true;
        },
        _clearLoanF() {
            clearLoan(this.row.id, this.endDate).then((res) => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.row = {};
                this.dialogVisible2 = false;
                this._getList();
            });
        },
        _clearLoan(row) {
            this.row = row;
            this.dialogVisible2 = true;
        },
        //确认还款
        _confirmRepayment(row) {
            this.isClear = false;
            repaymentPlansByLoanCode({ loanCode: row.loanCode }).then((res) => {
                this.repaymentForm = res.data;
                if (res.data.remainTerm) {
                    this.value1 = [];
                    res.data.remainTerm.forEach((item) => {
                        let obj = {};
                        obj.value = item;
                        obj.label = '第' + item + '期';
                        this.value1.push(obj);
                    });

                    this.repaymentForm.remainTerm = res.data.remainTerm;
                    this.repaymentForm.repaymentType = 'REPAYMENT';
                }
                this.repaymentForm.loanCode = row.loanCode;
                this.showConfirmRepayment = true;
            });
        },
        changeTerm() {
            if (this.repaymentForm.repaymentType == 'CLEAR') {
                repaymentPlansByClearSum({ loanCode: this.repaymentForm.loanCode, terms: this.repaymentForm.remainTerm }).then((res) => {
                    this.repaymentForm.remainInterestAmount = res.data.remainInterestAmount;
                    this.repaymentForm.remainPenaltyAmount = res.data.remainPenaltyAmount;
                    this.repaymentForm.remainRepaymentAmount = res.data.remainRepaymentAmount;
                    this.repaymentForm.remainTerm = res.data.remainTerm;
                    this.repaymentForm.remainPrincipalAmount = res.data.remainPrincipalAmount;
                });
            } else {
                repaymentPlansByLoanCode({ loanCode: this.repaymentForm.loanCode, terms: this.repaymentForm.remainTerm }).then((res) => {
                    this.repaymentForm.remainInterestAmount = res.data.remainInterestAmount;
                    this.repaymentForm.remainPenaltyAmount = res.data.remainPenaltyAmount;
                    this.repaymentForm.remainRepaymentAmount = res.data.remainRepaymentAmount;
                    this.repaymentForm.remainTerm = res.data.remainTerm;
                    this.repaymentForm.remainPrincipalAmount = res.data.remainPrincipalAmount;
                });
            }
        },
        changeType() {
            if (this.repaymentForm.repaymentType == 'CLEAR') {
                this.isClear = true;
                this.changeTerm();
            } else {
                this.isClear = false;
                this.changeTerm();
            }
        },
        _pushConfirmRepayment() {
            let form = {
                loanCode: this.repaymentForm.loanCode,
                serialNo: this.repaymentForm.serialNo,
                reductionFee: this.repaymentForm.reductionFee,
                repaymentType: this.repaymentForm.repaymentType,
                terms: this.repaymentForm.remainTerm
            };
            this.$refs.repaymentForm.validate((valid) => {
                if (valid) {
                    repaymentWipeFlowWriteOff(form).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.showConfirmRepayment = false;
                        this._getList();
                    });
                } else {
                    return false;
                }
            });
        },
        openPlan(row) {
            this.extensionPlanForm.loanCode = row.loanCode;
            getLoanPlan(row.loanCode).then((res) => {
                this.planData = res.data;
                this.dialogVisible = true;
            });
        },
        _onExport() {
            if (!this.filterOptions[6].value) {
                this.filterOptions[6].value = ['', ''];
            }
            if (!this.filterOptions[5].value) {
                this.filterOptions[5].value = ['', ''];
            }
            this.$export(
                `/loan/export?applicationCode=${this.filterOptions[1].value}&bName=${this.filterOptions[7].value}&bPhoneNumber=${this.filterOptions[8].value
                }&loanCode=${this.filterOptions[2].value}&loanApplyDateBegin=${this.filterOptions[5].value[0]}&loanApplyDateEnd=${this.filterOptions[5].value[1]
                }&lenderId=${this.filterOptions[4].value}&loanStatus=${this.loanStatus
                }&applicationOrderType=${'JOINT_VENTURE'}&loanEndDateBegin=${this.filterOptions[6].value[0] || ''}&loanEndDateEnd=${this.filterOptions[6].value[1] || ''
                }`
            );
        },
        _getList() {
            if (!this.filterOptions[6].value) {
                this.filterOptions[6].value = ['', ''];
            }
            if (!this.filterOptions[5].value) {
                this.filterOptions[5].value = ['', ''];
            }
            if (!/^\d+$/.test(this.filterOptions[0].value) && this.filterOptions[0].value !== '') {
                this.$message.error('用户ID必须为数字');
                return;
            }
            loanPageWithUserId(
                this.currentPage,
                this.filterOptions[0].value,
                this.filterOptions[1].value,
                this.filterOptions[2].value,
                this.filterOptions[5].value[0],
                this.filterOptions[5].value[1],
                this.filterOptions[4].value,
                this.loanStatus,
                '',
                '',
                'JOINT_VENTURE',
                this.filterOptions[6].value[0],
                this.filterOptions[6].value[1],
                this.filterOptions[7].value,
                this.filterOptions[8].value,
                '',
                this.filterOptions[3].value
            ).then((res) => {
                this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(2);

                this.onLoanAmountSum = res.data.currentOnLoanAmountSum.toFixed(2);

                this.loanNumberSum = res.data.currentLoanNumberSum;
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR', 'COMPENSATORY'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清', '已代偿'];
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        if (item.riskControlApprovalStatus == 'APPROVED') {
                            item.riskControlApprovalStatus = '审批通过';
                        } else if (item.riskControlApprovalStatus == 'APPROVAL_REJECTION') {
                            item.riskControlApprovalStatus = '审批拒绝';
                        } else if (item.riskControlApprovalStatus == 'PENDING_APPROVAL') {
                            item.riskControlApprovalStatus = '等待审批';
                        } else {
                            item.riskControlApprovalStatus = '获取失败';
                        }
                        item.loanPeriod = item.loanPeriod
                            ? item.loanPeriod +
                            (item.periodUnit == 'D' ? '天' : item.periodUnit == 'M' ? '月' : item.periodUnit == 'Y' ? '年' : '')
                            : '';
                        item.guarantorFeeRate = (item.guarantorFeeRate * 100).toFixed(2);
                        item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                        if (item.isExtLoanCode && item.loanStatus == '已结清') {
                            item.loanStatus = item.loanStatus + '（无还本续贷结清）';
                        }
                        item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
                        item.hiddenBtn = '';
                        item.hiddenBtn =
                            item.lenderProductId == 33 || item.lenderProductId == 34
                                ? (item.hiddenBtn += '结清,删除，修改')
                                : item.hiddenBtn;
                        item.hiddenBtn =
                            item.lenderId !== '68' && item.lenderId !== '69' && item.loanStatus !== '还款中'
                                ? (item.hiddenBtn += '录入豆服结算价')
                                : item.hiddenBtn;
                        item.hiddenBtn = item.loanStatus == '创建' ? item.hiddenBtn : (item.hiddenBtn += '确认放款');
                        // if (['57', '9', '55'].includes(item.lenderId)) {
                        if (item.lenderId == '9' || item.lenderId == '57' || item.lenderId == '55') {
                            item.hiddenBtn = item.hiddenBtn;
                        } else {
                            item.hiddenBtn = item.hiddenBtn + '放款审批';
                        }
                        if (item.lenderId != '59') {
                            item.hiddenBtn = item.hiddenBtn + '银行流水上传';
                        }
                        // item.hiddenBtn = (['57', '9', '55'].includes(item.lenderId)) ? item.hiddenBtn : item.hiddenBtn ;
                        item.loanAmount = item.loanAmount ? '¥' + item.loanAmount : 0;
                    });
                }

                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
                if (this.$route.query.loanNumber) {
                    this.filterOptions[1].value = this.$route.query.loanNumber;
                    this._getList();
                    this.$route.query.loanNumber = '';

                    return false;
                }
            });
        }
    },
    beforeDestroy() {
        document.removeEventListener('copy', function (e) {
            // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
            let clipboardData = e.clipboardData || window.clipboardData;
            // 如果 未复制或者未剪切，直接 return
            if (!clipboardData) return;
            // Selection 对象 表示用户选择的文本范围或光标的当前位置。
            // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
            let text = window.getSelection().toString();
            if (text) {
                // 如果文本存在，首先取消默认行为
                e.preventDefault();
                // 通过调用 clipboardData 对象的 setData(format,data) 方法，设置相关文本
                // format 一个 DOMString 类型 表示要添加到 drag object 的拖动数据的类型
                // data 一个 DOMString 表示要添加到 drag object 的数据
                clipboardData.setData('text/plain', text.trim());
            }
        });
    }
};
</script>

<style lang="less" scoped>
.source-dialog {
    /deep/ .el-select {
        width: 100%;
    }

    /deep/ .el-form--inline .el-form-item {
        margin-right: -10px;
    }

    .dialog-btn {
        display: flex;
        justify-content: center;
        gap: 35px;
    }
}

/deep/ .source-dialog .el-dialog__body {
    padding: 30px 20px 0 !important;
}

/deep/ .source-dialog .el-select {
    width: 100%;
}

/deep/.el-table_1_column_1 .el-table__cell {
    color: red !important;
}

/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

/* 火狐 */
input {
    -moz-appearance: textfield;
}

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
