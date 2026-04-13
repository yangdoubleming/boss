<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />{{
                    $t('common_dsb')
                }}
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('loan_detail_dkgl') }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_dqdkje') }} </span>
                                    <span class="grid-num2">{{ loanAmountSum }} {{ $t('common_w') }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_detail_dqdkbs') }}</span>
                                    <span class="grid-num2">{{ loanNumberSum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page
            @filter-item-change="changeRoleSearchSelect"
            :detailTable="true"
            :tableData="tableData"
            :showFilterRadio="false"
            :tableOperate="tableOperate"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @conditional-query="handleColumnsFilter"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
            @update="update"
            @clearLoan="_clearLoan"
            :filterStatus="filterStatus"
            @removeLoan="removeLoan"
            @changeStatus="changeStatus"
            @paymentHistory="_paymentHistory"
            @toOrderInfo="toOrderInfo"
            @confirmDisburse="_confirmDisburse"
            @rePayment="_rePayment2"
            @viewDetails="_viewDetails"
            :exportBtn="true"
            @onExport="_onExport"
            @loanSplit="_loanSplit"
            @quote="openPlan"
            @confirmRepayment="_confirmRepayment"
            @testRepay="_testRepay"
        />
        <el-dialog title="还款计划" :visible.sync="dialogVisiblePlan" width="85%">
            <div style="margin-bottom: 10px">
                <el-button type="primary" @click="openExtensionPlan" style="float: right; margin-bottom: 10px">变更还款计划</el-button>
            </div>
            <xtable :columns="columns2" :detailTable="true" :tableData="planData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblePlan = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="变更还款计划" :visible.sync="showChangeRepaymentPlan" width="30%">
            <el-radio-group v-model="repaymentPlanType" style="margin: 30px 0">
                <el-radio-button label="extensionPlan">展期</el-radio-button>
                <el-radio-button label="adjustmentPlan">调价</el-radio-button>
            </el-radio-group>
            <div v-if="repaymentPlanType === 'extensionPlan'">
                <el-form
                    :inline="true"
                    :model="extensionPlanForm"
                    ref="extensionPlanForm"
                    style="padding-left: 20px"
                    label-width="150px"
                    label-position="left"
                >
                    <el-form-item label="展期本金" style="margin-right: 30px" prop="principal">
                        <el-input v-model="extensionPlanForm.principal" autocomplete="off" type="number" style="width: 200px">
                            <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="展期方式" style="margin-right: 30px" prop="extensionType">
                        <el-select v-model="extensionPlanForm.extensionType" placeholder="等额本息">
                            <el-option v-for="item in extensionTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="展期期限" style="margin-right: 30px" prop="time">
                        <el-input v-model="extensionPlanForm.time" style="width: 200px" type="number">
                            <el-button slot="append" icon="el-icon-lx-lock" style="width: 50px">
                                <el-select v-model="extensionPlanForm.timeType" placeholder="月">
                                    <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-button>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="计息开始日期" style="margin-right: 30px" prop="interestStartTime">
                        <el-date-picker
                            v-model="extensionPlanForm.interestStartTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('loan_detail_xzrqsj')"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="showChangeRepaymentPlan = false" style="width: 80px; height: 35px">取 消</el-button>
                    <el-button type="primary" @click="getExtensionPlan" style="width: 80px; height: 35px">试 算</el-button>
                    <el-button type="primary" @click="updateExtensionPlan" style="width: 80px; height: 35px">确 定</el-button>
                </div>
            </div>
            <div v-else>
                <el-form
                    :inline="true"
                    :model="adjustmentPlanForm"
                    ref="adjustmentPlanForm"
                    style="padding-left: 20px"
                    label-width="150px"
                    label-position="left"
                >
                    <el-form-item label="调价后利率" style="margin-right: 30px" prop="principal">
                        <el-input v-model="adjustmentPlanForm.interestRate" autocomplete="off" type="number" style="width: 200px">
                            <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="调价开始日期" style="margin-right: 30px" prop="interestStartTime">
                        <el-date-picker
                            v-model="adjustmentPlanForm.interestStartTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="showChangeRepaymentPlan = false" style="width: 80px; height: 35px">取 消</el-button>
                    <el-button type="primary" @click="getAdjustmentPlan" style="width: 80px; height: 35px">试 算</el-button>
                    <el-button type="primary" @click="updateAdjustmentPlan" style="width: 80px; height: 35px">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="展期计划" :visible.sync="showChangeRepaymentPlanResult" width="85%">
            <xtable :columns="columns2" :detailTable="true" :tableData="extensionPlanData" />
        </el-dialog>

        <el-dialog title="结清" :visible.sync="dialogVisible2" width="14%" style="margin-top: 20vh" @closed="removeEndDate">
            <el-date-picker v-model="endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结清日期">
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="_clearLoanF">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="贷款拆分" :visible.sync="loanSplit" width="80%">
            <div style="margin-bottom: 30px">
                贷款总金额
                <el-input style="width: 300px; margin-left: 10px" :disabled="true" v-model="loanAmount">
                    <template slot="append">万(人民币)</template>
                </el-input>
            </div>
            <xtable
                :columns="splitColumns"
                :detailTable="true"
                :tableData="splitData"
                @changeInput="_changeInput"
                @edit="_offerrRceived"
                :isShowSelection="true"
                @select="selectRow"
                ref="bossTabel"
            />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ totalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loanSplit = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_offerrRceivedAll('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="确认放款" :visible.sync="showDisburse" width="40%">
            <el-form :inline="false" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="贷款金额：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.loanAmount }} 美元</span>
                </el-form-item>
                <el-form-item label="借款主体：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bcName }}</span>
                </el-form-item>
                <el-form-item label="收款人名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bname }}</span>
                </el-form-item>
                <el-form-item label="收款人银行账户：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bankNo }}</span>
                </el-form-item>
                <el-form-item label="收款人开户行名称：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bankName }}</span>
                </el-form-item>
                <el-form-item label="收款人开户行地址：" style="margin-right: 30px" prop="creditAmount">
                    <span>{{ disburseForm.bankAddress }}</span>
                </el-form-item>
                <el-form-item label="起息时间：" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker
                        v-model="loanForm.disburseDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="放款凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(payMentFile)" v-if="payMentFile"
                            >查看凭证</el-button
                        >

                        <el-upload
                            style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl"
                            :on-success="handlePreview"
                            :show-file-list="false"
                        >
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="状态" style="margin-right: 30px" prop="creditStatus">
                    <el-radio v-model="loanForm.loanStatus" label="true">成功</el-radio>
                    <el-radio v-model="loanForm.loanStatus" label="false">失败</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDisburse = false">取 消</el-button>
                <el-button type="primary" @click="_pushDisburse">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="结清" :visible.sync="dialogVisible2" width="14%" style="margin-top: 20vh" @closed="removeEndDate">
            <el-date-picker v-model="endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结清日期">
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = fasle">取 消</el-button>
                <el-button type="primary" @click="_clearLoanF">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="showConfirmRepayment" custom-class="source-dialog" width="30%">
            <el-form
                :hide-required-asterisk="true"
                :inline="false"
                :rules="repaymentFormRules"
                :model="repaymentForm"
                ref="repaymentForm"
                label-width="140px"
            >
                <el-form-item label="还款类型" prop="repaymentType">
                    <el-select @change="changeType2" v-model="repaymentForm.repaymentType" placeholder="请选择还款类型">
                        <el-option label="正常还款" value="REPAYMENT"></el-option>
                        <el-option label="提前结清" value="CLEAR"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="还款日期：" prop="interestStartTime" v-if="repaymentForm.repaymentType === 'CLEAR'">
                    <el-date-picker
                        v-model="repaymentForm.interestStartTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                        @change="changeTerm"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="还款期数：" prop="remainTerm">
                    <el-select
                        v-model="repaymentForm.remainTerm"
                        :disabled="isClear"
                        @change="changeTerm"
                        multiple
                        placeholder="请选择还款期数"
                    >
                        <el-option v-for="item in value1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <!-- <el-input v-model="repaymentForm.remainTerm" disabled></el-input> -->
                </el-form-item>
                <el-form-item label="应还本金：" prop="remainPrincipalAmount">
                    <el-input v-model="repaymentForm.remainPrincipalAmount" disabled
                        ><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input
                    >
                </el-form-item>
                <el-form-item label="应还利息：" prop="remainInterestAmount">
                    <el-input v-model="repaymentForm.remainInterestAmount" disabled
                        ><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input
                    >
                </el-form-item>
                <el-form-item label="应还罚息：" prop="remainPenaltyAmount">
                    <el-input v-model="repaymentForm.remainPenaltyAmount" disabled
                        ><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input
                    >
                </el-form-item>
                <el-form-item label="应还总金额：" prop="remainRepaymentAmount">
                    <el-input v-model="repaymentForm.remainRepaymentAmount" disabled
                        ><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input
                    >
                </el-form-item>
                <el-form-item label="减免金额：" prop="reductionFee">
                    <el-input v-model="repaymentForm.reductionFee"><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input>
                </el-form-item>
                <el-form-item label="实还金额：" prop="repaymentAmount">
                    <el-input v-model="repaymentForm.repaymentAmount"
                        ><el-button slot="append" icon="el-icon-lx-lock">元</el-button></el-input
                    >
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-btn">
                <el-button @click="closeDia">取 消</el-button>
                <el-button type="primary" @click="_pushConfirmRepayment">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="贷款单信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="贷款通过时间" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker
                        v-model="form.loanApplyDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="起止时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker
                        v-model="dates"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="合同编号" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.contractNumber" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="期限" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.loanPeriod" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">月</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="贷款金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.loanAmount" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">万元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="利率" style="margin-right: 30px" prop="interestRate">
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
                    <el-date-picker
                        v-model="form.loanClearDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"
                    ></el-date-picker>
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
                <el-button type="primary" @click="openAddHistory" style="float: right; margin-bottom: 10px">创建记录</el-button>
            </div>
            <xtable :columns="columns3" :detailTable="true" :tableData="historyData" @edit="_deteleHistory" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="还款确认" :visible.sync="showRePayment" width="40%">
            <el-form :inline="false" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="还款类型：" style="margin-right: 30px" prop="creditAmount">
                    <el-radio-group v-model="rePaymentData.type" @change="changeType">
                        <el-radio :label="1">提前还款</el-radio>
                        <el-radio :label="2">到期还款</el-radio>
                        <el-radio :label="3">逾期还款</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="rePaymentData.type == 1">
                    <el-form-item label="还款时间：" style="margin-right: 30px" prop="creditApprovalTime">
                        <el-date-picker
                            v-model="rePaymentData.loanEndDate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('loan_detail_xzrqsj')"
                            @change="changeDate"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="还款金额：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentData.principal" type="number" style="width: 220px"></el-input>
                        <!-- <el-button type="primary" style="margin-left:5px" @click="_calculation">确认</el-button> -->
                    </el-form-item>
                    <el-form-item label="应还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(chooseRow.loanAmount) }}</span>
                    </el-form-item>
                    <el-form-item label="应还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.interest) }}</span>
                    </el-form-item>
                    <el-form-item label="提前还款费用：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.advance) }}</span>
                    </el-form-item>
                    <el-form-item label="应还总额：" style="margin-right: 30px" prop="creditAmount">
                        <span
                            >${{
                                numFormat(
                                    Number(
                                        (
                                            Number(chooseRow.loanAmount) +
                                            Number(rePaymentData.interest) +
                                            Number(rePaymentData.advance)
                                        ).toFixed(2)
                                    )
                                )
                            }}</span
                        >
                    </el-form-item>
                </div>

                <div v-if="rePaymentData.type == 2">
                    <el-form-item label="还款时间：" style="margin-right: 30px" prop="creditAmount">
                        <span>{{ rePaymentData.loanEndDate }}</span>
                    </el-form-item>
                    <el-form-item label="应还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.shouldPrincipal) }}</span>
                    </el-form-item>
                    <el-form-item label="应还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.interest) }}</span>
                    </el-form-item>
                    <el-form-item label="应还总额：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.total) }}</span>
                    </el-form-item>
                    <el-form-item label="还款金额：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentData.principal" type="number" style="width: 220px"></el-input>
                        <el-button type="primary" style="margin-left: 5px" @click="_calculation">确认</el-button>
                    </el-form-item>
                    <el-form-item label="实还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualPrincipal > 0 ? rePaymentData.actualPrincipal : 0) }}</span>
                    </el-form-item>
                    <el-form-item label="实还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualInterest) }}</span>
                    </el-form-item>
                    <el-form-item label="实还总额：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualTotal) }}</span>
                    </el-form-item>
                </div>

                <div v-if="rePaymentData.type == 3">
                    <el-form-item label="还款时间：" style="margin-right: 30px" prop="creditApprovalTime">
                        <el-date-picker
                            v-model="rePaymentData.loanEndDate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('loan_detail_xzrqsj')"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="还款金额：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentData.principal" type="number" style="width: 220px"></el-input>
                        <el-button type="primary" style="margin-left: 5px" @click="_calculation">确认</el-button>
                    </el-form-item>
                    <el-form-item label="实还违约费用：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualViolate) }}</span>
                    </el-form-item>
                    <el-form-item label="实还逾期费用：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualOverdue) }}</span>
                    </el-form-item>
                    <el-form-item label="实还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualInterest) }}</span>
                    </el-form-item>
                    <el-form-item label="实还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualPrincipal) }}</span>
                    </el-form-item>

                    <el-form-item label="实还总额：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ numFormat(rePaymentData.actualTotal) }}</span>
                    </el-form-item>
                </div>

                <el-form-item label="流水凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(rePaymentFile)" v-if="rePaymentFile"
                            >查看凭证</el-button
                        >

                        <el-upload
                            style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl"
                            :on-success="handlePreview2"
                            :show-file-list="false"
                        >
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRePayment = false">取 消</el-button>
                <el-button type="primary" @click="_pushRepayment">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="还款确认" :visible.sync="showNewRepayment" width="40%">
            <el-form :inline="false" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <!-- <el-form-item label="还款类型：" style="margin-right: 30px" prop="creditAmount">
                    <el-radio-group v-model="rePaymentDataV2.type" >
                        <el-radio :label="1">提前还款</el-radio>
                        <el-radio :label="2">到期还款</el-radio>
                        <el-radio :label="3">逾期还款</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <div>
                    <el-form-item label="还款时间：" style="margin-right: 30px" prop="creditApprovalTime">
                        <el-date-picker
                            v-model="rePaymentDataV2.loanEndDate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('loan_detail_xzrqsj')"
                            @change="changeRepaymentDate"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="应还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.paymentPrincipal }}</span>
                    </el-form-item>
                    <el-form-item label="应还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.paymentInterest }}</span>
                    </el-form-item>
                    <el-form-item label="应还违约费用：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.paymentDefaultInterest }}</span>
                    </el-form-item>
                    <el-form-item label="应还逾期费用：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.paymentPenaltyInterest }}</span>
                    </el-form-item>
                    <el-form-item label="提前还款手续费：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.handlingFee }}</span>
                    </el-form-item>
                    <el-form-item label="减免费用：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentDataV2.processingFee" type="number" style="width: 220px"></el-input>
                    </el-form-item>
                    <el-form-item label="应还总额：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ repaymentPlanData.dealAmount }}</span>
                    </el-form-item>
                    <el-form-item label="实还金额：" style="margin-right: 30px" prop="creditAmount">
                        <el-input v-model="rePaymentDataV2.loanAmount" type="number" style="width: 220px"></el-input>
                        <el-button type="primary" style="margin-left: 5px" @click="_calculation2('REPAYMENT')">还款 </el-button>
                        <el-button type="primary" style="margin-left: 5px" @click="_calculation2('SETTLE')">结清 </el-button>
                    </el-form-item>
                    <el-form-item label="实还本金：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ calculationData.paymentPrincipal }}</span>
                    </el-form-item>
                    <el-form-item label="实还利息：" style="margin-right: 30px" prop="creditAmount">
                        <span>${{ calculationData.paymentInterest }}</span>
                    </el-form-item>
                    <el-form-item label="实还违约/逾期费用：" style="margin-right: 30px" prop="creditAmount">
                        <span
                            >$ {{ calculationData.paymentDefaultInterest || 0 }} / $ {{ calculationData.paymentPenaltyInterest || 0 }}</span
                        >
                    </el-form-item>
                </div>
                <el-form-item label="流水凭证" style="margin-right: 30px" prop="dates">
                    <div style="display: flex; align-items: center">
                        <el-button style="margin-right: 15px" type="success" @click="openFile(rePaymentFile)" v-if="rePaymentFile"
                            >查看凭证</el-button
                        >

                        <el-upload
                            style="margin-right: 30px; height: 32px; width: 110px; overflow: hidden"
                            :action="uploadUrl"
                            :on-success="handlePreview2"
                            :show-file-list="false"
                        >
                            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showNewRepayment = false">取 消</el-button>
                <el-button type="primary" @click="_pushRepayment2">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="创建还款记录" :visible.sync="showAddHistory" width="30%">
            <el-form
                :inline="true"
                :model="addHistoryForm"
                :rules="addHistoryRules"
                ref="addHistoryForm"
                style="padding-left: 20px"
                label-width="150px"
                label-position="left"
            >
                <el-form-item label="交易时间" style="margin-right: 30px" prop="dealDate">
                    <el-date-picker
                        v-model="addHistoryForm.dealDate"
                        type="datetime"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('loan_detail_xzrqsj')"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="还本金额" style="margin-right: 30px" prop="paymentPrincipal">
                    <el-input v-model="addHistoryForm.paymentPrincipal" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="还息金额" style="margin-right: 30px" prop="paymentInterest">
                    <el-input v-model="addHistoryForm.paymentInterest" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="逾期罚息金额" style="margin-right: 30px" prop="paymentPenaltyInterest">
                    <el-input v-model="addHistoryForm.paymentPenaltyInterest" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="借据号" style="margin-right: 30px" prop="duebillNo">
                    <el-input v-model="addHistoryForm.duebillNo" autocomplete="off" type="text" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="流水号" style="margin-right: 30px" prop="serialNo">
                    <el-input v-model="addHistoryForm.serialNo" autocomplete="off" type="text" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="还逾期本金金额" style="margin-right: 30px" prop="paymentOverduePrincipal">
                    <el-input v-model="addHistoryForm.paymentOverduePrincipal" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="还逾期利息金额" style="margin-right: 30px" prop="paymentOverdueInterest">
                    <el-input v-model="addHistoryForm.paymentOverdueInterest" autocomplete="off" type="number" style="width: 200px">
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
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xform from '../../common/Xform.vue';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { repayment } from '../../../api/boss1';
import {
    disburseInfo,
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
    pushDisburse,
    saveFileUrl,
    usRepayment,
    lenderNameList,
    getRepaymentSum,
    getCalculateData,
    getPlan,
    usRepaymentV2,
    metaLoan,
    updatePlan,
    extensionPlan,
    getLoanPlan,
    getLenderList,
    drbAddRepaymentHistory,
    addRepaymentHistory,
    sentShopeeRepayment,
    deleteHistory,
    updateAdjustmentPlan,
    adjustmentPlan,
    repaymentPlansByLoanCode,
    repaymentPlansByClearSum,
    repaymentWipeFlowWriteOff,
    getRepaymentPlanAmountClearOffline,
    getRepaymentPlanAmount,
    repaymentOffline,
    loanPageWithUserId
} from '../../../api/index';
import { number } from 'echarts';
export default {
    name: 'us-loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable,
        xform
    },
    data() {
        return {
            showAddHistory: false,
            repaymentPlanType: 'extensionPlan',
            splitData: [],
            selectRowData: [],
            currRepAmount: 0,
            calculationData: {},
            rePaymentDataV2: {
                loanEndDate: '',
                processingFee: '',
                loanAmount: '',
                actualType: ''
            },
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
            showConfirmRepayment: false,
            repaymentForm: {
                remainInterestAmount: '',
                remainPenaltyAmount: '',
                remainRepaymentAmount: '',
                remainPrincipalAmount: '',
                reductionFee: '',
                interestStartTime: '',
                repaymentAmount: '',
                dealDate: ''
            },
            value1: [],
            isClear: false,
            repaymentFormRules: {
                remainTerm: [{ required: true, message: '请选择期数', trigger: 'change' }],
                repaymentType: [{ required: true, message: '请选择还款类型', trigger: 'change' }]
                // remainTerm: [{ required: true, message: '请选择期数', trigger: 'change' }],
            },
            repaymentPlanData: {},
            showRePayment: false,
            payMentFile: '',
            loanForm: {
                disburseDate: '',
                loanStatus: ''
            },

            showDisburse: false,
            splitColumns: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue',
                    width: '130'
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
            dates: [],
            form: {
                id: '',
                loanPeriod: '',
                apr: '',
                loanApplyDate: '',
                loanStartDate: '',
                loanEndDate: '',
                loanAmount: '',
                guarantorFee: '',
                guarantorFeeRate: '',
                contractNumber: '',
                loanClearDate: ''
            },
            dialogFormVisible: false,
            dialogVisible: false,
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            tableOperate: [],
            tableData: [],
            rePaymentFile: '',
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
                    placeholder: '',
                    placeholderArr: [this.$t('loan_detail_zykssj'), this.$t('loan_detail_zyjssj')],
                    filterable: true
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

            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: 230
                },
                {
                    label: this.$t('loan_detail_yhid'),
                    prop: 'userId',
                    width: 230
                },
                {
                    label: this.$t('loan_search_dkbh'),
                    prop: 'loanCode',
                    width: 230
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: 230
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: 140
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: 160
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'loanStatus'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'apr',
                    width: 110
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '190'
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },
                {
                    label: '币种',
                    prop: 'currency',
                    width: '50'
                },
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
                    label: this.$t('loan_detail_dkedw'),
                    prop: 'loanAmount',
                    width: '140'
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
                    prop: 'loanPeriod2',
                    width: '110'
                },
                {
                    label: this.$t('loan_detail_jqrq'),
                    prop: 'loanClearDate',
                    width: '200'
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
                        // {
                        //     event: 'clearLoan',
                        //     text:this.$t('status_table_cleared'),
                        //     type: 'primary',
                        //     popover:true,
                        // },
                        {
                            event: 'loanSplit',
                            text: this.$t('loan_detail_ymxcjdk'),
                            type: 'primary',
                            popover: true,
                            code: 'AMAZON_CREATE_LOAN'
                        },
                        {
                            event: 'toOrderInfo',
                            text: this.$t('loan_detail_dkxq'),
                            type: 'primary',
                            popover: true
                        },
                        // {
                        //     event: 'confirmDisburse',
                        //     text: this.$t('loan_detail_qrfk'),
                        //     type: 'primary',
                        //     popover: true
                        // },
                        {
                            event: 'confirmRepayment',
                            text: this.$t('loan_detail_hkqr'),
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'viewDetails',
                            text: this.$t('common_see'),
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'testRepay',
                            text: '还款测算',
                            type: 'primary',
                            popover: true
                        }

                        // {
                        //     event: 'update',
                        //     text: this.$t('loan_detail_xg'),
                        //     type: '',
                        //     popover:true,
                        // },

                        // {
                        //     event: 'removeLoan',
                        //     text:this.$t('loan_detail_delete'),
                        //     type: 'danger',
                        //     popover:true,
                        // }
                    ],
                    fixed: 'right'
                }
            ],
            productsList: [],
            row: {},
            dialogVisible2: false,
            endDate: '',
            loanStatus: '',
            repaymentAmount: 0,
            dealAmountSum: 0,
            totalMoney: 0,
            chooseDatas: [],
            disburseForm: {},
            loanCode: '',
            chooseRow: {},
            showNewRepayment: false,
            rePaymentData: {
                type: 1,
                loanEndDate: '', //时间
                principal: '', //还款金额
                advance: 0, //提前还款费用
                total: 0, // 总额
                interest: 0, //利息
                actualPrincipal: 0, //实还本金
                actualInterest: 0, //实还利息
                actualTotal: 0, //实还总额
                actualViolate: 0, //实际违约费用
                actualOverdue: 0, //实际逾期费用
                shouldPrincipal: 0 //应还本金
            },
            dialogVisiblePlan: false,
            extensionPlanForm: {
                loanCode: '',
                principal: '',
                extensionType: 'EQUAL_PRINCIPAL',
                time: '',
                timeType: 'M',
                interestStartTime: ''
            },
            adjustmentPlanForm: {
                loanCode: '',
                interestStartTime: '',
                interestRate: ''
            },
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
            showChangeRepaymentPlan: false,
            showChangeRepaymentPlanResult: false
        };
    },
    activated() {
        // console.log(this.$route);
        if (this.$route.query.loanNumber) {
            setTimeout(() => {
                this.filterOptions[0].value = this.$route.query.loanNumber;
                this._getList();
                this.$route.query.loanNumber = '';
            }, 0);
        }
        this.selectRowData = [];
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
            lenderType: '境外'
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
        closeDia() {
            this.$refs.repaymentForm.resetFields();
            this.showConfirmRepayment = false;
        },
        _pushConfirmRepayment() {
            if (!this.repaymentForm.repaymentAmount) {
                this.$message.error('请输入实还金额');
                return;
            }
            this.$refs.repaymentForm.validate((valid) => {
                if (valid) {
                    repaymentOffline({
                        loanCode: this.repaymentForm.loanCode,
                        dealDate: this.repaymentForm.interestStartTime,
                        reductionFee: this.repaymentForm.reductionFee,
                        repaymentType: this.repaymentForm.repaymentType,
                        terms: this.repaymentForm.remainTerm,
                        repaymentAmount: this.repaymentForm.repaymentAmount
                    }).then((res) => {
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
        getDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        changeTerm() {
            if (this.repaymentForm.repaymentType === 'CLEAR') {
                getRepaymentPlanAmountClearOffline({
                    loanCode: this.repaymentForm.loanCode,
                    terms: this.repaymentForm.remainTerm,
                    interestStartTime: this.repaymentForm.interestStartTime || this.getDate()
                }).then((res) => {
                    this.repaymentForm.remainInterestAmount = res.data.remainInterestAmount;
                    this.repaymentForm.remainPenaltyAmount = res.data.remainPenaltyAmount;
                    this.repaymentForm.remainRepaymentAmount = res.data.remainRepaymentAmount;
                    this.repaymentForm.remainTerm = res.data.remainTerm;
                    this.repaymentForm.remainPrincipalAmount = res.data.remainPrincipalAmount;
                });
            } else {
                getRepaymentPlanAmount({ loanCode: this.repaymentForm.loanCode, terms: this.repaymentForm.remainTerm }).then((res) => {
                    this.repaymentForm.remainInterestAmount = res.data.remainInterestAmount;
                    this.repaymentForm.remainPenaltyAmount = res.data.remainPenaltyAmount;
                    this.repaymentForm.remainRepaymentAmount = res.data.remainRepaymentAmount;
                    this.repaymentForm.remainTerm = res.data.remainTerm;
                    this.repaymentForm.remainPrincipalAmount = res.data.remainPrincipalAmount;
                });
            }
        },
        //确认还款
        _confirmRepayment(row) {
            this.isClear = false;
            getRepaymentPlanAmount({ loanCode: row.loanCode }).then((res) => {
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
        // 还款测算
        _testRepay(row) {
            this.$router.push({ path: '/repaymentTest', query: { loanCode: row.loanCode } })
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
                                sentShopeeRepayment({ userId: this.row.userId, loanCode: this.row.loanCode }).then((_) => {});
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
        changeRoleSearchSelect(val) {
            if (typeof val != 'number') {
                getLenderList({ lenderNameShort: this.filterOptions[4].value }).then((res) => {
                    res.data.forEach((item) => {
                        item.label = item.lenderName;
                        item.value = item.id;
                    });
                    this.filterOptions[5].options = res.data;
                });
            }
        },
        // 查看详情
        _viewDetails(row) {
            this.$router.push({
                path: '/us-loan-detail',
                query: {
                    //携带参数
                    data: row
                }
            });
        },
        _pushRepayment2() {
            if (!this.rePaymentDataV2.actualType) {
                return this.$message.info('请选择还款或者结清');
            }
            if (!this.rePaymentFile) {
                return this.$message.info('请上传流水凭证！');
            }

            usRepaymentV2({
                loanEndDate: this.rePaymentDataV2.loanEndDate,
                loanAmount: this.rePaymentDataV2.loanAmount,
                loanCode: this.chooseRow.loanCode,
                actualType: this.rePaymentDataV2.actualType,
                processingFee: this.rePaymentDataV2.processingFee || 0
            }).then((res) => {
                saveFileUrl({
                    path: this.rePaymentFile,
                    resourceCode: this.chooseRow.loanCode,
                    resourceType: 'REPAYMENT'
                }).then((res) => {
                    this.$message.success('操作成功！');
                    this.showNewRepayment = false;
                    this._getList();
                });
            });
        },
        changeRepaymentDate(val) {
            getPlan({
                dealDate: val,
                loanCode: this.chooseRow.loanCode
            }).then((res) => {
                this.repaymentPlanData = res.data;
                this.currRepAmount = this.repaymentPlanData.dealAmount;
            });
        },
        _calculation2(actualType) {
            if (!this.rePaymentDataV2.loanAmount) {
                return this.$message.warning('请填写实还金额');
            }
            this.rePaymentDataV2.actualType = actualType;
            getCalculateData({
                actualType: actualType,
                dealAmount: this.rePaymentDataV2.loanAmount,
                dealDate: this.rePaymentDataV2.loanEndDate,
                loanCode: this.chooseRow.loanCode,
                reductionFee: this.rePaymentDataV2.processingFee
                // processingFee:this.rePaymentDataV2.processingFee ||0
            }).then((res) => {
                this.calculationData = res.data;
                this.repaymentPlanData.dealAmount = (Number(this.currRepAmount) - Number(this.rePaymentDataV2.processingFee)).toFixed(2);
            });
        },
        _rePayment2(row) {
            this.repaymentPlanData = {};
            this.calculationData = {};
            this.showNewRepayment = true;
            Object.keys(this.rePaymentDataV2).forEach((key) => {
                this.rePaymentDataV2[key] = '';
            });
            this.rePaymentFile = '';
            this.chooseRow = JSON.parse(JSON.stringify(row));
        },
        changeDate() {
            // type == 1  如果选择日期不是90天内 既不是提前还款*+
            let num = this.getDaysBetween(this.chooseRow.loanStartDate.split(' ')[0], this.rePaymentData.loanEndDate.split(' ')[0]);
            if (num < this.chooseRow.loanPeriod) {
                this.rePaymentData.interest = (
                    ((Number(this.chooseRow.loanAmount) * (this.chooseRow.apr / 100)) / 360) *
                    Number(num)
                ).toFixed(3);

                let str = this.rePaymentData.interest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.interest = Number(n) > 0 ? Number(this.rePaymentData.interest) + 0.01 : this.rePaymentData.interest;
                this.rePaymentData.interest = Math.floor(Number(this.rePaymentData.interest) * 100) / 100;
                this.rePaymentData.advance = this.chooseRow.loanPeriod == 14 ? 0 : (this.chooseRow.loanAmount * 0.01).toFixed(2);
            } else {
                this.$message.info('选择日期不属于提前还款!');
                this.rePaymentData.loanEndDate = '';
                this.rePaymentData.advance = 0;
                this.rePaymentData.interest = 0;
            }
        },
        _pushRepayment() {
            if (!this.rePaymentFile) {
                return this.$message.info('请上传流水凭证！');
            }
            let date = this.rePaymentData.loanEndDate;
            if (this.rePaymentData.type == 2) {
                date += ' 00:00:00';
            }
            usRepayment({
                loanEndDate: date,
                loanAmount: this.rePaymentData.principal,
                loanCode: this.chooseRow.loanCode,
                repaymentType: this.chooseRow.loanPeriod == 14 ? 'ZHANGYU_LOAN' : 'MORFIN'
            }).then((res) => {
                saveFileUrl({
                    path: this.rePaymentFile,
                    resourceCode: this.chooseRow.loanCode,
                    resourceType: 'REPAYMENT'
                }).then((res) => {
                    this.$message.success('操作成功！');
                    this.showRePayment = false;
                    this._getList();
                });
            });
        },
        _calculation() {
            if (this.rePaymentData.type == 1) {
                // this.rePaymentData.advance = (this.rePaymentData.principal * 0.01).toFixed(2);
                // this.rePaymentData.total = (Number(this.rePaymentData.advance) + Number(this.rePaymentData.principal)).toFixed(2);
                //  if (Number(this.rePaymentData.principal) > Number(this.rePaymentData.advance)) {
                //     this.rePaymentData.actualInterest = this.rePaymentData.interest;
                // } else {
                //     this.rePaymentData.actualInterest = this.rePaymentData.principal;
                // }
            } else if (this.rePaymentData.type == 2) {
                this.rePaymentData.actualPrincipal = this.rePaymentData.principal - this.rePaymentData.interest;
                if (Number(this.rePaymentData.principal) > Number(this.rePaymentData.interest)) {
                    this.rePaymentData.actualInterest = this.rePaymentData.interest;
                } else {
                    this.rePaymentData.actualInterest = this.rePaymentData.principal;
                }
                let str = this.rePaymentData.actualInterest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.actualInterest =
                    Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;
                this.rePaymentData.actualPrincipal = this.rePaymentData.actualPrincipal > 0 ? this.rePaymentData.actualPrincipal : 0;
                this.rePaymentData.actualTotal = (
                    Number(this.rePaymentData.actualInterest) + Number(this.rePaymentData.actualPrincipal)
                ).toFixed(2);
            } else if (this.rePaymentData.type == 3) {
                // if(this.chooseRow.lenderProductId=='48'){
                //     this.chooseRow.loanPeriod=30
                // }
                this.rePaymentData.actualViolate = 0;
                this.rePaymentData.actualOverdue = 0;
                this.rePaymentData.interest = 0;

                if (!this.rePaymentData.loanEndDate) return this.$message.info('请选择日期');
                // console.log('asd', this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod ),);
                // 违约天数
                let wd =
                    Number(
                        this.getDaysBetween(
                            this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                            this.rePaymentData.loanEndDate.split(' ')[0]
                        )
                    ) - 30;
                wd = wd > 0 ? wd : 0;

                // 逾期天数
                let d =
                    this.getDaysBetween(
                        this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                        this.rePaymentData.loanEndDate.split(' ')[0]
                    ) > 30
                        ? 30
                        : this.getDaysBetween(
                              this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod),
                              this.rePaymentData.loanEndDate.split(' ')[0]
                          );

                let y = Number((this.chooseRow.loanAmount * 0.0002 * d).toFixed(2));
                let w = Number((this.chooseRow.loanAmount * 0.0004 * wd).toFixed(2));
                // let userD = this.getDaysBetween(
                //     this.getNewData(this.chooseRow.loanStartDate.split(' ')[0], this.chooseRow.loanPeriod - 1),
                //     this.rePaymentData.loanEndDate.split(' ')[0]
                // );

                let l =
                    ((this.chooseRow.loanAmount * (this.chooseRow.apr / 100)) / 360) *
                    this.getDaysBetween(this.chooseRow.loanStartDate.split(' ')[0], this.rePaymentData.loanEndDate.split(' ')[0]);

                // console.log('l', l);
                // console.log(this.chooseRow.loanAmount);
                //核销违约费用
                if (Number(this.rePaymentData.principal) > Number(w)) {
                    this.rePaymentData.actualViolate = w.toFixed(2);
                    //核销逾期
                    if (Number(this.rePaymentData.principal) > Number(y) + Number(w)) {
                        this.rePaymentData.actualOverdue = y.toFixed(2);
                        // 核销利息
                        if (Number(this.rePaymentData.principal) > Number(y) + Number(w) + l) {
                            console.log(1);
                            this.rePaymentData.actualInterest = l.toFixed(3);
                            let str = this.rePaymentData.actualInterest.toString();
                            let n = str.substr(str.length - 1, 1);
                            this.rePaymentData.actualInterest =
                                Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                            this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;

                            // 核销本金
                            if (Number(this.rePaymentData.principal) > Number(y) + Number(w) + l + Number(this.chooseRow.loanAmount)) {
                                this.rePaymentData.actualPrincipal = Number(this.chooseRow.loanAmount).toFixed(2);
                            } else {
                                this.rePaymentData.actualPrincipal = (
                                    Number(this.rePaymentData.principal) -
                                    Number(w) -
                                    Number(y) -
                                    l
                                ).toFixed(2);
                            }
                        } else {
                            this.rePaymentData.actualInterest = (Number(this.rePaymentData.principal) - Number(w) - Number(y)).toFixed(3);
                            let str = this.rePaymentData.actualInterest.toString();
                            let n = str.substr(str.length - 1, 1);
                            this.rePaymentData.actualInterest =
                                Number(n) > 0 ? Number(this.rePaymentData.actualInterest) + 0.01 : this.rePaymentData.actualInterest;
                            this.rePaymentData.actualInterest = Math.floor(Number(this.rePaymentData.actualInterest) * 100) / 100;
                        }
                    } else {
                        this.rePaymentData.actualOverdue = (Number(this.rePaymentData.principal) - Number(w)).toFixed(2);
                    }
                } else {
                    this.rePaymentData.actualViolate = this.rePaymentData.principal.toFixed(2);
                }
                // 计算总额
                this.rePaymentData.actualTotal =
                    Number(this.rePaymentData.actualViolate) +
                    Number(this.rePaymentData.actualOverdue) +
                    Number(this.rePaymentData.actualInterest) +
                    Number(this.rePaymentData.actualPrincipal);
            }
        },
        changeType(type) {
            let t = type;
            Object.keys(this.rePaymentData).forEach((key) => {
                this.rePaymentData[key] = 0;
            });
            this.rePaymentData.type = t;
            this.rePaymentData.loanEndDate = '';
            this.rePaymentData.principal = '';
            if (this.rePaymentData.type == 2) {
                this.rePaymentData.shouldPrincipal = this.chooseRow.loanAmount;
                this.rePaymentData.interest =
                    ((this.rePaymentData.shouldPrincipal * (this.chooseRow.apr / 100)) / 360) * this.chooseRow.loanPeriod;
                let str = this.rePaymentData.interest.toString();
                let n = str.substr(str.length - 1, 1);
                this.rePaymentData.interest = Number(n) > 0 ? Number(this.rePaymentData.interest) + 0.01 : this.rePaymentData.interest;
                this.rePaymentData.interest = Math.floor(Number(this.rePaymentData.interest) * 100) / 100;
                this.rePaymentData.total = (Number(this.rePaymentData.shouldPrincipal) + Number(this.rePaymentData.interest)).toFixed(2);
                this.rePaymentData.loanEndDate = this.getNewData(
                    this.chooseRow.loanStartDate.split(' ')[0],
                    Number(this.chooseRow.loanPeriod)
                );
            }
        },
        changeType2() {
            if (this.repaymentForm.repaymentType == 'CLEAR') {
                this.isClear = true;
                this.changeTerm();
            } else {
                this.isClear = false;
                this.changeTerm();
            }
        },
        numFormat(num) {
            if (!num) return num;
            num = Number(num);
            var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },
        getDaysBetween(dateString1, dateString2) {
            var startDate = Date.parse(dateString1);
            var endDate = Date.parse(dateString2);
            if (startDate > endDate) {
                return 0;
            }
            if (startDate == endDate) {
                return 0;
            }
            var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
            return days;
        },
        handlePreview(res, file) {
            console.log(res);
            this.payMentFile = res.data.fullFilePath;
        },
        handlePreview2(res, file) {
            console.log(res);
            this.rePaymentFile = res.data.fullFilePath;
        },
        openFile(file) {
            window.open(file);
        },
        getNewData(dateTemp, days) {
            // console.log(dateTemp);
            var dateTemp = dateTemp.split('-');
            var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式

            var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000;
            var rDate = new Date(millSeconds);
            var year = rDate.getFullYear();
            var month = rDate.getMonth() + 1;
            if (month < 10) month = '0' + month;
            var date = rDate.getDate();
            if (date < 10) date = '0' + date;
            return year + '-' + month + '-' + date;
        },
        _confirmDisburse(val) {
            this.loanCode = val.loanCode;
            this.chooseRow = JSON.parse(JSON.stringify(val));
            disburseInfo(val.loanCode).then((res) => {
                this.disburseForm = res.data;
                this.showDisburse = true;
            });
        },
        _pushDisburse() {
            if (!this.loanForm.loanStatus) {
                return this.$message.info('请选择状态');
            }
            if (this.chooseRow.lenderProductId == 96) {
                metaLoan({
                    loanCode: this.loanCode,
                    loanStartDate: this.loanForm.disburseDate,
                    loanStatus: this.loanForm.loanStatus
                }).then((res) => {
                    if (this.payMentFile) {
                        saveFileUrl({
                            path: this.payMentFile,
                            resourceCode: this.loanCode,
                            resourceType: 'LOAN'
                        }).then((res) => {
                            this.$message.success('操作成功！');
                            this.showDisburse = false;
                            this.loanForm.loanStatus = '';
                            this.loanForm.disburseDate = '';
                            this._getList();
                            this.payMentFile = '';
                        });
                    } else {
                        this.$message.success('操作成功！');
                        this.showDisburse = false;
                        this.loanForm.loanStatus = '';
                        this.loanForm.disburseDate = '';
                        this._getList();
                        this.payMentFile = '';
                    }
                });
            } else {
                pushDisburse({
                    loanCode: this.loanCode,
                    loanStartDate: this.loanForm.disburseDate,
                    loanStatus: this.loanForm.loanStatus
                }).then((res) => {
                    if (this.payMentFile) {
                        saveFileUrl({
                            path: this.payMentFile,
                            resourceCode: this.loanCode,
                            resourceType: 'LOAN'
                        }).then((res) => {
                            this.$message.success('操作成功！');
                            this.showDisburse = false;
                            this.loanForm.loanStatus = '';
                            this.loanForm.disburseDate = '';
                            this._getList();
                            this.payMentFile = '';
                        });
                    } else {
                        this.$message.success('操作成功！');
                        this.showDisburse = false;
                        this.loanForm.loanStatus = '';
                        this.loanForm.disburseDate = '';
                        this._getList();
                        this.payMentFile = '';
                    }
                });
            }
        },
        toOrderInfo(val) {
            this.$router.push({
                path: '/us-orderInfo',
                query: {
                    loanCode: val.loanCode,
                    lenderProductId: val.lenderProductId,
                    loanPeriod: val.loanPeriod
                }
            });
        },
        _rePayment(row) {
            this.rePaymentFile = '';
            this.chooseRow = JSON.parse(JSON.stringify(row));
            this.chooseRow.loanAmount = Number(this.chooseRow.loanAmount * 10000);

            this.showRePayment = true;
            Object.keys(this.rePaymentData).forEach((key) => {
                this.rePaymentData[key] = 0;
            });
            this.rePaymentData.type = 1;
            this.rePaymentData.loanEndDate = '';
            this.rePaymentData.principal = '';
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
        _changeInput() {
            console.log(this.splitData);
            this.totalMoney = 0;
            this.splitData.forEach((item) => {
                this.totalMoney = Number(item.resourceAmount) + this.totalMoney;
                // item.creditAmount=(item.creditAmount/10000).toFixed(2)
            });
            this.totalMoney = this.totalMoney.toFixed(3);
        },
        // boss1 多选框change时间
        selectRow(rows) {
            console.log(rows);
            this.selectRowData = rows;
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
                this.$emit('refreshDetail');
            });
        },
        _clearLoan(row) {
            this.row = row;
            this.dialogVisible2 = true;
        },
        _getList() {
            if (!this.filterOptions[6].value && !this.filterOptions[6].value.length) {
                this.filterOptions[6].value = ['', ''];
            }
            if (!this.filterOptions[5].value && !this.filterOptions[5].value.length) {
                this.filterOptions[5].value = ['', ''];
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
                'SELF_SUPPORT',
                this.filterOptions[6].value[0],
                this.filterOptions[6].value[1],
                this.filterOptions[7].value,
                this.filterOptions[8].value,
                '',
                this.filterOptions[3].value
            ).then((res) => {
                this.loanAmountSum = res.data.currentLoanAmountSum.toFixed(2);
                this.loanNumberSum = res.data.currentLoanNumberSum;
                let status = ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR', 'COMPENSATORY'];
                let statusStr = ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清', '已代偿'];
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        item.loanStatus = statusStr[status.indexOf(item.loanStatus)];
                        if (item.isExtLoanCode && item.loanStatus == '已结清') {
                            item.loanStatus = item.loanStatus + '（无还本续贷结清）';
                        }
                        item.paymentLock = item.paymentLock === 'UNLOCK' ? '未锁定' : '锁定';
                        item.hiddenBtn = '';
                        item.hiddenBtn = item.loanStatus == '创建' ? item.hiddenBtn : (item.hiddenBtn += '确认放款');
                        item.hiddenBtn = item.loanStatus == '已结清' ? (item.hiddenBtn += '还款确认') : item.hiddenBtn;
                        let s = item.loanPeriod;
                        item.loanPeriod2 = s +=
                            item.periodUnit === 'Y' ? '年' : item.periodUnit === 'M' ? '月' : item.periodUnit === 'D' ? '天' : '';
                        item.loanAmount = item.loanAmount ? item.loanAmount : 0;
                    });
                }

                this.tableData = res.data.records || [];
                this.totalSize = res.data.total;
            });
        },
        _onExport() {
            this.$export(
                `/loan/export?applicationCode=${this.filterOptions[1].value}&loanCode=${this.filterOptions[2].value}&loanApplyDateBegin=${
                    this.filterOptions[5].value[0]
                }&loanApplyDateEnd=${this.filterOptions[5].value[1]}&loanStatus=${
                    this.loanStatus
                }&applicationOrderType=${'SELF_SUPPORT'}&loanEndDateBegin=${this.filterOptions[6].value[0] || ''}&loanEndDateEnd=${
                    this.filterOptions[6].value[1] || ''
                }`
            );
        },
        openPlan(row) {
            this.extensionPlanForm.loanCode = row.loanCode;
            this.adjustmentPlanForm.loanCode = row.loanCode;
            getLoanPlan(row.loanCode).then((res) => {
                this.planData = res.data;
                this.dialogVisiblePlan = true;
            });
        },
        openExtensionPlan() {
            this.showChangeRepaymentPlan = true;
        },
        updateExtensionPlan(row) {
            updatePlan(this.extensionPlanForm).then((res) => {
                this.$message.success('修改成功');
                this.showChangeRepaymentPlan = false;
                this.dialogVisiblePlan = false;
            });
        },
        getExtensionPlan() {
            extensionPlan(this.extensionPlanForm).then((res) => {
                this.extensionPlanData = res.data;
                this.showChangeRepaymentPlanResult = true;
            });
        },
        updateAdjustmentPlan() {
            updateAdjustmentPlan(this.adjustmentPlanForm).then((res) => {
                this.$message.success('修改成功');
                this.showChangeRepaymentPlan = false;
                this.dialogVisiblePlan = false;
            });
        },
        getAdjustmentPlan() {
            adjustmentPlan(this.adjustmentPlanForm).then((res) => {
                this.extensionPlanData = res.data;
                this.showChangeRepaymentPlanResult = true;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.source-dialog {
    /deep/ .el-select {
        width: 100%;
    }

    /deep/.el-date-editor.el-input {
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
