<template>
    <div style="margin-top: 24px; padding-bottom: 24px">
        <el-card style="margin-top: 24px" shadow="hover">
            <div style="text-align: right; margin-bottom: 10px;position: relative">
                <span class="whiteType" v-show="whiteType">加白类型：{{ whiteType }}</span>
                <!-- <el-button
                    type="primary"
                    @click="creditSplit"
                    :loading="btnLoading"
                    v-if="$showBtn('SHOP_INFO_CREDIT_SPLIT') && pageDataNew && pageDataNew.length>1"
                >授信拆分</el-button>-->
                <el-button type="primary"
                    v-if="$showBtn('ASS_SHOP_INFO_HSBCCN_DOUBLELOCK') && $route.query.lenderId == '52'"
                    @click="openHfDoubleLock" :loading="hfDoubleLockLoading">汇丰账户锁定</el-button>
                <el-button type="primary" @click="getLink" :loading="getLinkLoading">担保签约链接</el-button>
                <el-button type="primary" @click="upPdf">上传担保协议</el-button>
                <el-button type="primary" @click="goGf" class="onCopy" :loading="calculationLoad">支付链接</el-button>
                <el-button type="primary" @click="postSendEmail"
                    v-if="$route.query.lenderId == '13' || $route.query.lenderId == '71'"
                    :loading="sendEamilStatus">发送邮件</el-button>
                <el-button type="primary" @click="openCalculation" :loading="calculationLoad">自动计算</el-button>
                <el-button type="primary" @click="openCalculationUpload" :loading="calculationUploadLoad">导出</el-button>
                <el-button type="primary" @click="searchOfferId" :loading="btnLoading2">查询offerId</el-button>
            </div>

            <xtable @edit="tableEvent" :columns="columns2" :detailTable="true" :tableData="pageDataNew" />
        </el-card>
        <el-dialog title="操作" :visible.sync="showOperate" width="60%" top="24vh">
            <div style="display: flex; flex-wrap: wrap">
                <el-card class="box-card" style="width: 48%; margin-right: 1px">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>申请</span>
                    </div>
                    <el-button @click="openReceived"
                        :disabled="chooseRow.applicationStatus != 'CREATED'">收到申请</el-button>
                    <el-button @click="oepnApproved"
                        :disabled="chooseRow.applicationStatus != 'RECEIVED'">通过申请（锁卡）</el-button>
                    <el-button :disabled="chooseRow.applicationStatus != 'RECEIVED'"
                        @click="openApprovedUnlock">通过申请（不锁卡）</el-button>
                </el-card>
                <el-card class="box-card" style="width: 48%">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>锁卡</span>
                    </div>
                    <el-button @click="openLock" :disabled="chooseRow.accountLockStatus == 'UNLOCKED' || chooseRow.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? true
                        : chooseRow.accountLockStatus == 'LOCKED'
                            ? false
                            : ''
                        ">确认锁卡</el-button>
                    <el-button @click="openUnLock" :disabled="chooseRow.accountLockStatus == 'UNLOCKED' || chooseRow.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? true
                        : chooseRow.accountLockStatus == 'LOCKED'
                            ? false
                            : ''
                        ">解锁账户</el-button>
                    <!-- <el-button @click="_resetAl">重置AL</el-button> -->
                    <el-button @click="_refreshAccountLockStatusUS">刷新(美国站)</el-button>
                    <el-button @click="_refreshAccountLockStatusDE">刷新(德国站)</el-button>
                </el-card>
                <el-card class="box-card" style="width: 48%; margin-bottom: 30px; margin-right: 1px">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>授信</span>
                    </div>
                    <el-button
                        :disabled="chooseRow.applicationStatus != 'CONFIRMED' || chooseRow.creditApprovalStatus == 'ACTIVE'"
                        @click="openApproval">创建授信</el-button>
                    <el-button @click="_updateCreadit"
                        :disabled="chooseRow.creditApprovalStatus != 'ACTIVE'">修改授信</el-button>
                    <el-button @click="_closeCredit" :disabled="chooseRow.loanStatus != 'CLOSED'">关闭授信</el-button>
                </el-card>
                <el-card class="box-card" style="width: 48%; margin-bottom: 30px">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>贷款</span>
                    </div>
                    <!-- <el-button @click="_createLoan">{{ $t('loan_detail_cjdk') }}</el-button> -->
                    <el-button :disabled="chooseRow.loanStatus == 'UN_ACTIVE'" @click="oepnRepayment">还款</el-button>
                    <el-button :disabled="chooseRow.loanStatus == 'UN_ACTIVE'" @click="_closeLoan">关闭贷款</el-button>
                </el-card>
            </div>
        </el-dialog>
        <el-dialog title="支付认证" :visible.sync="showPaymentAuth" width="60%" top="24vh">
            <el-image v-for="url in this.paymentAuthUrls" :key="url" :src="url" lazy></el-image>
            <el-descriptions title="支付信息" direction="vertical" :column="2" border>
                <el-descriptions-item label="借款人姓名">{{ paymentAuthBName || '-' }}</el-descriptions-item>
                <el-descriptions-item label="收款账号后3位">{{ paymentAuthAccountTail || '-' }}</el-descriptions-item>
            </el-descriptions>
            <div style="width: 100%">
                <el-button type="primary" style="width: 180px; margin: 20px auto; display: block; margin-bottom: 0px"
                    :loading="btnLoading" @click="authApproved">审核通过</el-button>
            </div>
        </el-dialog>
        <el-dialog :before-close="handleClose" title="支付认证" :visible.sync="showPaymentAuthBoth" width="60%" top="24vh">
            <div style="display: flex; justify-content: space-around">
                <div>
                    <div style="margin-bottom: 15px; text-align: center">资金归集账户（母户）关系截图或代持证明材料</div>
                    <el-upload class="upload-demo" :action="uploadUrl" :on-remove="handleRemove1"
                        :on-success="handleAvatarSuccess1" :before-remove="beforeRemove" multiple :limit="5"
                        :on-exceed="handleExceed1" :file-list="fileList1">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
                <div>
                    <div style="margin-bottom: 15px; text-align: center">收款账号信息</div>
                    <el-upload class="upload-demo" :action="uploadUrl" :before-remove="beforeRemove" multiple :limit="5"
                        :on-success="handleAvatarSuccess2" :on-remove="handleRemove2" :on-exceed="handleExceed2"
                        :file-list="fileList2">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </div>

            <el-image v-for="url in this.paymentAuthBoth.urls" :key="url" :src="url" lazy></el-image>
            <el-descriptions title="支付信息" direction="vertical" :column="2" border>
                <el-descriptions-item label="借款人姓名">{{ paymentAuthBoth.borrowerName || '-' }}</el-descriptions-item>
                <el-descriptions-item label="收款账号后3位">{{ paymentAuthBoth.accountTail || '-' }}</el-descriptions-item>
            </el-descriptions>
            <div style="width: 100%">
                <el-button type="primary" style="width: 180px; margin: 20px auto; display: block; margin-bottom: 0px"
                    :loading="btnLoading" @click="authApprovedBoth">审核通过</el-button>
            </div>
        </el-dialog>
        <!-- ============================账户锁定确认======================================================================================================================== -->
        <el-dialog title="账户锁定确认" :before-close="handleCloseLock" :visible.sync="showAccountLock" width="60%"
            top="24vh">
            <div style="display: flex;margin-bottom: 20px;">
                <el-descriptions style="width: 50%" :title="paymentDetailVO.paymentName || '-'" :column="1" border>
                    <el-descriptions-item label="收款主体类型">{{
                        (paymentDetailVO.paymentSubjectType &&
                            paymentSubjectTypeText[paymentDetailVO.paymentSubjectType]) || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="支付公司用户Id">{{ paymentDetailVO.paymentUserId || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="收款人名称">{{ paymentDetailVO.paymentSubjectName || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="收款人证件类型">-</el-descriptions-item>
                    <el-descriptions-item label="收款人证件号码">{{ paymentDetailVO.paymentSubjectCardNo || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="法人/董事名称">{{ paymentDetailVO.paymentLegalName || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="身份证号码">{{ paymentDetailVO.paymentLegalIdNo || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="验证结果">
                        <span>
                            {{
                                (paymentVerifyResultVO.borrowerSubjectVerification &&
                                    borrowerSubjectVerificationText[paymentVerifyResultVO.borrowerSubjectVerification]) ||
                                '-'
                            }}
                            <el-tooltip v-if="paymentVerifyResultVO.borrowerSubjectVerification === 'UNVERIFIED'"
                                class="item" effect="dark" :content="(paymentVerifyResultVO.borrowerSubjectVerificationFailedReason &&
                                    borrowerSubjectVerificationFailedReasonText[
                                    paymentVerifyResultVO.borrowerSubjectVerificationFailedReason
                                    ]) ||
                                    '-'
                                    " placement="top">
                                <i class="el-icon-question" style="cursor: pointer"></i>
                            </el-tooltip>
                        </span>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions style="width: 50%" title="KYC" :column="1" border>
                    <el-descriptions-item label="收款主体证件类型">{{
                        borrowerApplicationDetailInfoVO.productName || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="产品属性">{{
                        (borrowerApplicationDetailInfoVO.productAttributes &&
                            productAttributesText[borrowerApplicationDetailInfoVO.productAttributes]) ||
                        '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="借款人名称">{{
                        borrowerApplicationDetailInfoVO.productAttributes === 'PERSONAL'
                            ? borrowerApplicationDetailInfoVO.applyPersonName
                            : borrowerApplicationDetailInfoVO.productAttributes === 'ENTERPRISE'
                                ? borrowerApplicationDetailInfoVO.companyNameCn
                                : borrowerApplicationDetailInfoVO.productAttributes === 'HK-ENTERPRISE'
                                    ? borrowerApplicationDetailInfoVO.companyNameHK
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="借款人证件类型">{{
                        borrowerApplicationDetailInfoVO.borrowerCardType || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="借款人证件号码">{{
                        borrowerApplicationDetailInfoVO.productAttributes === 'PERSONAL'
                            ? borrowerApplicationDetailInfoVO.applyPersonIdCardNo
                            : borrowerApplicationDetailInfoVO.productAttributes === 'ENTERPRISE'
                                ? borrowerApplicationDetailInfoVO.bcCreditCode || '-'
                                : borrowerApplicationDetailInfoVO.productAttributes === 'HK-ENTERPRISE'
                                    ? '-'
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="法人名称">{{
                        borrowerApplicationDetailInfoVO.productAttributes === 'PERSONAL'
                            ? borrowerApplicationDetailInfoVO.legalPersonName
                            : borrowerApplicationDetailInfoVO.productAttributes === 'ENTERPRISE'
                                ? borrowerApplicationDetailInfoVO.legalPersonName
                                : borrowerApplicationDetailInfoVO.productAttributes === 'HK-ENTERPRISE'
                                    ? borrowerApplicationDetailInfoVO.directorName
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="法人证件号码">{{
                        borrowerApplicationDetailInfoVO.productAttributes === 'PERSONAL'
                            ? borrowerApplicationDetailInfoVO.legalPersonIdCardNo
                            : borrowerApplicationDetailInfoVO.productAttributes === 'ENTERPRISE'
                                ? borrowerApplicationDetailInfoVO.legalPersonIdCardNo
                                : borrowerApplicationDetailInfoVO.productAttributes === 'HK-ENTERPRISE'
                                    ? borrowerApplicationDetailInfoVO.directorIdCardNo || '-'
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="借款人公司名称">{{
                        borrowerApplicationDetailInfoVO.productAttributes === 'PERSONAL'
                            ? borrowerApplicationDetailInfoVO.companyNameCn || '-'
                            : borrowerApplicationDetailInfoVO.productAttributes === 'ENTERPRISE'
                                ? borrowerApplicationDetailInfoVO.companyNameCn
                                : borrowerApplicationDetailInfoVO.productAttributes === 'HK-ENTERPRISE'
                                    ? borrowerApplicationDetailInfoVO.companyNameHK
                                    : '-'
                    }}</el-descriptions-item>
                </el-descriptions>
                <el-descriptions style="width: 50%;" title="填写支付公司信息" :column="1" border>
                    <el-descriptions-item label="收款主体证件类型">{{
                        customerWritePaymentDetailVO.paymentSubjectTypeFromCust == 'PERSONAL'
                            ? '大陆个人'
                            : customerWritePaymentDetailVO.paymentSubjectTypeFromCust == 'ENTERPRISE'
                                ? '大陆企业'
                                : customerWritePaymentDetailVO.paymentSubjectTypeFromCust == 'HK-ENTERPRISE'
                                    ? '香港企业'
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="企业名称">{{
                        customerWritePaymentDetailVO.companyNameFromCust || '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label=" 法人姓名">{{
                        customerWritePaymentDetailVO.legalPersonNameFromCust || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="法人身份证号码">{{
                        customerWritePaymentDetailVO.legalPersonNameFromCust || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="收款人姓名
">{{ customerWritePaymentDetailVO.userNameFromCust ||
                        '-' }}</el-descriptions-item>
                    <el-descriptions-item label="收款人证件号码
">{{ customerWritePaymentDetailVO.idNoFromCust ||
                        '-' }}</el-descriptions-item>
                </el-descriptions>
            </div>
            <el-descriptions style="margin-bottom: 20px;" title="店铺信息" direction="vertical" :column="4" border>
                <el-descriptions-item label="offerId">{{ paymentDetailVO.offerId || '-' }}</el-descriptions-item>
                <el-descriptions-item label="店铺收款账号（支付）">{{
                    paymentDetailVO.paymentShopAccountTail || '-'
                    }}</el-descriptions-item>
                <el-descriptions-item label="店铺收款账号后3位（亚马逊）">{{
                    borrowerApplicationDetailInfoVO.amazonAccountTail || '-'
                    }}</el-descriptions-item>
                <el-descriptions-item label="验证结果">
                    <span>
                        {{
                            (paymentVerifyResultVO.shopVerification &&
                                shopVerificationText[paymentVerifyResultVO.shopVerification]) || '-'
                        }}
                        <el-tooltip v-if="paymentVerifyResultVO.shopVerification === 'UNVERIFIED'" class="item"
                            effect="dark" :content="(paymentVerifyResultVO.shopVerificationFailedReason &&
                                shopVerificationFailedReasonText[paymentVerifyResultVO.shopVerificationFailedReason]) ||
                                '-'
                                " placement="top">
                            <i class="el-icon-question" style="margin-left: 5px; cursor: pointer"></i>
                        </el-tooltip>
                    </span>
                </el-descriptions-item>
            </el-descriptions>

            <div style="width: 100%;margin-bottom: 20px;" v-if="tableDataAuthFile.length > 0">
                <div style="font-size: 16px;font-weight: 700;margin-bottom: 20px;color:#303133;">授权文件</div>
                <el-table :data="tableDataAuthFile" stripe style="width: 100%">
                    <el-table-column prop="fileTypeTxt" label="文件类型" align="center" />
                    <el-table-column prop="fileName" label="上传文件" align="center" />
                    <el-table-column prop="" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-upload accept=".pdf" v-if="scope.row.status == '00'" :action="payFileUpload"
                                :show-file-list="false" :headers="uploadHeaders" :on-success="handleAvatarSuccess5"
                                :data="{
                                    fileType: scope.row.fileType,
                                    offerId: paymentDetailVO.offerId,
                                }">
                                <el-button type="text" size="mini">上传</el-button>
                            </el-upload>
                            <div v-else>
                                <el-button type="text" @click="handleClickSeeFile(scope.row)" size="mini">查看</el-button>
                                <el-button type="text" @click="handleClickSeeFile(scope.row)" size="mini">下载</el-button>
                                <el-button type="text" @click="handleClickUploadFile(scope.row)"
                                    size="mini">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" style="margin: 20px auto" @click="toSendEmailPayFile">确认邮件内容</el-button>
            </div>

            <div style="width: 100%">
                <div style="text-align: center; margin: 20px auto 0 auto" v-if="paymentDetailVO.paymentCode === 'P3'">
                    <el-tooltip content="因调用PP接口需要付费，当前核验结果存在缓存，如需重新核验可点击该按钮触发。" placement="top" effect="dark">
                        <el-button type="primary" style="
                                width: 180px;
                                height: 40px;
                                margin: 10px auto;
                                display: block;
                                font-size: 16px;
                                border-radius: 20px;
                                border: none;
                            " :loading="btnLoading" @click="paymentUserReVerify">
                            重新核验
                        </el-button>
                    </el-tooltip>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8" style="display: flex;align-items: center;">
                        收款人是否一致：
                        <el-select v-model="sameObj.isSamePayee" placeholder="请选择">
                            <el-option v-for="item in optionsOne" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="8" style="display: flex;align-items: center;">
                        收款账户是否一致：
                        <el-select v-model="sameObj.isSamePayeeAccount" placeholder="请选择">
                            <el-option v-for="item in optionsOne" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="8" v-if="sameObj.isSamePayee == '0' || sameObj.isSamePayeeAccount == '0'">
                        <el-select v-model="sameObj.specialCustomerType" placeholder="请选择">
                            <el-option v-for="item in optionsSame" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-button v-if="isshowbtn" style="margin: 20px auto" type="primary" :loading="btnLoading"
                    @click="toSendEmail">发送邮件</el-button>
                <el-button type="primary" style="width: 180px; margin: 20px auto; height: 40px; display: block"
                    :loading="btnLoading" @click="lockPay">账户锁定确认</el-button>
            </div>
        </el-dialog>
        <!-- ============================确认邮件内容======================================================================================================================== -->
        <el-dialog title="" :visible.sync="dialogVisibleSendEmail" width="50%" top="24vh">
            <div style="width: 100%;">
                <el-descriptions title="" :column="1">
                    <el-descriptions-item labelStyle="font-size:14px;color:black;" contentStyle="font-size:14px;"
                        label="邮件收件人"><span v-for="item in sendEmailData.to" :key="item">{{ item
                            }}；</span></el-descriptions-item>
                    <el-descriptions-item labelStyle="font-size:14px;color:black;" contentStyle="font-size:14px;"
                        label="邮件抄送人"><span v-for="item in sendEmailData.cc" :key="item">{{ item
                            }}；</span></el-descriptions-item>
                    <el-descriptions-item labelStyle="font-size:14px;color:black;" contentStyle="font-size:14px;"
                        label="邮件主题">{{ sendEmailData.subject }}</el-descriptions-item>
                </el-descriptions>
                <div style="color:black;">邮件正文：</div>
                <div v-html="sendEmailData.text"></div>
                <div style="color:black;">邮件附件：</div>
                <a style="display: block;margin-bottom: 10px;" v-for="(value, key) in sendEmailData.fileUrlMap"
                    :key="key" :href="`${fjUrl}${value}`" target="_blank">{{ key }}</a>
                <div style="display: flex;justify-content: center; margin-top: 20px;">
                    <el-button type="primary" @click="sendEmailFileType">确认发送</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- ============================自营额度计算结束======================================================================================================================== -->

        <!-- ============================自动计算======================================================================================================================== -->
        <el-dialog title="自动计算" :visible.sync="showCalculation" width="55%" top="24vh">
            <xtable v-if="showCalculation" :columns="splitColumns3" :detailTable="true" :tableData="calculationData"
                @edit="_calculation" :isShowSelection="true" @select="calculationSelectRow" ref="bossTabel"
                @changeInput="_calculationChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ calculationTotalMoney }} 万
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCalculation = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="success" @click="$emit('openCreditInfo')">{{ $t('loan_detail_sp') }}</el-button>
                <el-button type="primary" @click="_calculation('Batch')"
                    style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================自动计算结束======================================================================================================================== -->

        <!-- ============================收到申请======================================================================================================================== -->
        <el-dialog title="收到申请" :visible.sync="showReceived" width="55%" top="24vh">
            <xtable v-if="showReceived" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_received" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showReceived = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_received('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================收到申请结束======================================================================================================================== -->

        <!-- ============================通过申请（锁卡）======================================================================================================================== -->
        <el-dialog title="通过申请（锁卡）" :visible.sync="showApproved" width="55%" top="24vh">
            <xtable v-if="showApproved" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approved" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApproved = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approved('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================通过申请（锁卡） 结束======================================================================================================================== -->

        <!-- ============================通过申请（不锁卡）======================================================================================================================== -->
        <el-dialog title="通过申请（不锁卡）" :visible.sync="showApprovedUnlock" width="55%" top="24vh">
            <xtable v-if="showApprovedUnlock" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approvedUnlock" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApprovedUnlock = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approvedUnlock('Batch')"
                    style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>

        <!-- ============================创建授信======================================================================================================================== -->
        <el-dialog title="创建授信" :visible.sync="showApproval" width="55%" top="24vh">
            <xtable v-if="showApproval" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approval" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApproval = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approval('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================修改授信======================================================================================================================== -->
        <el-dialog :title="'修改授信（最新授信金额：' + creditAmount + ' 万)'" :visible.sync="showUpdateCreadit" width="75%"
            top="24vh">
            <xtable v-if="showUpdateCreadit" :columns="splitColumns4" :detailTable="true"
                :tableData="amazonRequestData2" @edit="_updateC" :isShowSelection="true" @select="selectRow"
                ref="bossTabel" @changeInput="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showUpdateCreadit = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_updateC('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================创建授信结束======================================================================================================================== -->

        <!-- ============================授信拆分======================================================================================================================== -->

        <el-dialog title="授信拆分" :visible.sync="split" width="40%" top="24vh">
            <div style="margin-bottom: 30px">
                批复授信总金额
                <el-input style="width: 300px; margin-left: 10px" :disabled="true" v-model="creditAmount">
                    <template slot="append">万(人民币)</template>
                </el-input>
            </div>
            <xtable :columns="columns" :detailTable="true" :tableData="splitData" @changeInput="_changeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ totalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="split = false" style="width: 80px; height: 35px">取 消</el-button>
                <!-- <el-button type="primary" @click="_offerrRceived" style="width:80px;height:35px">提 交</el-button> -->
            </div>
        </el-dialog>
        <!-- ============================授信拆分结束======================================================================================================================== -->

        <el-dialog :before-close="toUpData" title="查询结果" :visible.sync="showSearchInfo" width="80%" top="24vh">
            <el-table :data="searchOfferData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" ref="multiple">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="offerId" label="offerID" width="380px"></el-table-column>
                <el-table-column label="疑似重复的offerID" width="380px">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.shopDuplicateOffer" v-model="scope.row.shopDuplicateOffer"
                            placeholder="请输入内容"></el-input>
                        <div v-else></div>
                    </template>
                </el-table-column>
                <el-table-column label="疑似重复原因" prop="reason" show-overflow-tooltip>
                    <!-- <template slot-scope="scope"> -->
                    <!--  <el-popover :ref="`node-${scope.row.offerId}`" trigger="hover" placement="top"
                            v-show="scope.row.reason">
                            <div>
                                {{ scope.row.reason }}
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.reason }}</el-tag>
                                </div>
                            </div>
                        </el-popover> -->
                    <!-- <div v-show="scope.row.reason">{{ scope.row.reason }}</div>
                    <div v-show="!scope.row.reason"> -- </div> -->
                    <!-- </template> -->
                </el-table-column>
                <el-table-column prop="sellerIds" label="sellerID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bindTime" label="绑定时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.shopDuplicateOffer"
                            @click="changeOffer(scope.row)">替换offer</el-button>
                        <el-button type="text" v-else>--</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="toUpData" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="addOfferId" style="width: 80px; height: 35px">添 加</el-button>
            </div>
        </el-dialog>

        <!-- ============================确认锁卡======================================================================================================================== -->
        <el-dialog title="确认锁卡" :visible.sync="showLock" width="42%" top="24vh">
            <xtable v-if="showLock" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_lock" :isShowSelection="true" @select="selectRow" ref="bossTabel" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="showLock = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_lock('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================确认锁卡结束======================================================================================================================== -->

        <!-- ============================解锁======================================================================================================================== -->
        <el-dialog title="解锁" :visible.sync="showUnLock" width="42%" top="24vh">
            <xtable v-if="showUnLock" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_unlock" :isShowSelection="true" @select="selectRow" ref="bossTabel" />

            <div slot="footer" class="dialog-footer">
                <el-button @click="showUnLock = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_unlock('Batch')" style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================解锁结束======================================================================================================================== -->

        <!-- ============================还款======================================================================================================================== -->
        <el-dialog title="还款" :visible.sync="showRepayment" width="42%" top="24vh">
            <xtable v-if="showRepayment" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_repayment" :isShowSelection="true" @select="selectRow" ref="bossTabel" />

            <div slot="footer" class="dialog-footer">
                <el-button @click="showRepayment = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_repayment('Batch')"
                    style="width: 80px; height: 35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================上传协议获取店铺列表======================================================================================================================== -->
        <el-dialog :visible.sync="dialogTableVisible" width="50%" :before-close="closeMore">
            <el-table ref="multipleTableUp" :data="pageDataNew" @selection-change="handleSelectionChangeMore">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="offerId" label="offerId"> </el-table-column>
                <el-table-column label="收款渠道">
                    <template slot-scope="scope">{{ scope.row.paymentName }}</template>
                </el-table-column>
            </el-table>
            <div style="display: flex">
                <el-upload accept=".pdf" :action="uploadMorePdf" :headers="uploadHeaders" :on-remove="handleRemove4"
                    :file-list="fileList4" :on-exceed="handleExceed4" :on-success="handleAvatarSuccess4" multiple
                    name="files" style="width: auto !important; margin-top: 20px">
                    <el-button size="small" type="primary">点击上传协议</el-button>
                </el-upload>
                <el-button @click="ensureUpMore" type="primary"
                    style="height: 35px; position: relative; top: 20px">确认上传</el-button>
            </div>
        </el-dialog>
        <!-- ============================获取易签宝的链接======================================================================================================================== -->
        <el-dialog :visible.sync="isShowLInks" width="40%" :before-close="closeLink">
            <el-table ref="multipleTableUp" :data="shopLinks">
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column label="担保人姓名" prop="guaranter" align="center"> </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="copyLinks(scope.row)">复制链接</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import bus from '../bus';
import Clipboard from 'clipboard';
import xtable from '../Xtable.vue';
import {
    allotCredit,
    offerrRceived,
    searchStoreNew,
    saveShopOffer,
    deleteOffer,
    paymentUserShop,
    paymentLock,
    applicationPhone,
    sendEmail,
    paymentClear,
    paymentAuthentication,
    verifyShop,
    isparentChild,
    offerVerify,
    saveBatch,
    upMore,
    getLink,
    hsbcOfferLocks,
    paymentUserVerify,
    replaceOffer,
    isShowBtn,
    emaildraft,
    pspAuthFileList,
    deletePspAuthFile,
    getAutoEmailDetail,
    sendEmailWithFile, getShopWhitelist
} from '../../../api/index';
import {
    received,
    approved,
    lock,
    unlock,
    approval,
    createLoan,
    repayment,
    closeLoan,
    closeCredit,
    approvedUnlock,
    resetAl,
    creditSingle,
    credits,
    refreshAccountLockStatusUS,
    refreshAccountLockStatusDE,
    calculation,
    updateApproval
} from '../../../api/boss1';

export default {
    props: {
        pageData: {
            type: Array,
            default: []
        },
        amazonData: {
            type: Array,
            default: []
        },
        creditAmount: {
            type: Number,
            default: 0
        },
        userId: {
            type: String,
            default: 0
        }
    },
    components: {
        xtable
    },
    watch: {
        amazonData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                if (!newV.length) return;
                this.selectRowData = []; //清缓存
                this.amazonRequestData = newV;
                this.amazonRequestData2 = newV;
                this._amazonChangeInput();
            }
        },
        pageData: {
            deep: true,
            immediate: false,
            handler(newV, oldV) {
                if (!newV.length) return;
                this.pageDataNew = _.cloneDeep(newV);
                this.pageDataNew.forEach((item) => {
                    let txt = {
                        'SPECIALLY_APPROVED_CUSTOMERS': '特批客户',
                        'GUARANTEED_CUSTOMER': '担保客户',
                        'OTHER': '其他原因',
                    }
                    item.hiddenBtn = item.loanStatus === 'ACTIVE' ? '' : '关闭授信';
                    item.hiddenBtn = item.loanStatus === 'ACTIVE' ? '' : '关闭贷款';
                    if (item.isSamePayee === true) {
                        item.isSamePayee = '是'
                    } else if (item.isSamePayee === false) {
                        item.isSamePayee = '否'
                    } else {
                        item.isSamePayee = item.isSamePayee;
                    }

                    if (item.isSamePayeeAccount === true) {
                        item.isSamePayeeAccount = '是'
                    } else if (item.isSamePayeeAccount === false) {
                        item.isSamePayeeAccount = '否'
                    } else {
                        item.isSamePayeeAccount = item.isSamePayeeAccount;
                    }
                    item.specialCustomerType = txt[item.specialCustomerType] || item.specialCustomerType;
                    item.amount2 = item.amount ? item.amount / 10000 : '';
                    paymentUserShop({
                        offerId: item.offerId,
                        applicationCode: this.$route.query.loanNumber
                    }).then((res) => {
                        if (res.data.paymentUserAndBorrowerVO.verifyResult) {
                            this.$set(item, 'paySelf', '通过');
                            // item.paySelf = '通过'
                        } else {
                            this.$set(item, 'paySelf', '未通过');
                        }
                        if (res.data.shopPaymentAccountVO.verifyResult) {
                            this.$set(item, 'payShop', '通过');
                            // item.payShop = '通过'
                        } else {
                            // item.payShop = '未通过'
                            this.$set(item, 'payShop', '未通过');
                        }
                    });
                    //     console.log(item, '11111');
                });
                // console.log(newV);
                if (this.chooseRowIndex.toString()) {
                    this.chooseRow = newV[this.chooseRowIndex];
                }
                this.showPage = true;
                this.loanStatus = newV[0].loanStatus;
                this.applicationStatus = newV[0].applicationStatus;
            }
        }
    },
    created() {
        this.shopWhitelist()
        this.creditAmount = this.$route.query.creditAmount;
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
        // this.pageData = []
        // this.pageDataNew = []
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
    },
    methods: {
        //获取加白指标
        shopWhitelist() {
            const userId = this.$route.query.userId;
            const lenderId = this.$route.query.lenderId;
            getShopWhitelist({
                userId: userId,
                lenderId: lenderId
            }).then((res) => {
                this.whiteType = res.data.join(',')
            })
        },
        //店铺列表更新
        toUpData() {
            this.$emit('upShopData');
            this.showSearchInfo = false;
        },
        //offer替换
        changeOffer(row) {
            (this.replaceoffer = {
                applicationCode: '',
                originalOfferIds: [],
                latestOfferIds: [],
                phone: ''
            }),
                (this.replaceoffer.applicationCode = this.$route.query.loanNumber);
            this.replaceoffer.originalOfferIds.push(row.shopDuplicateOffer);
            this.replaceoffer.latestOfferIds.push(row.offerId);
            this.replaceoffer.userId = this.$route.query.userId
            replaceOffer(this.replaceoffer)
                .then((res) => {
                    this.$message.success('offer替换成功');
                    this.searchOfferId();
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        handleClose() {
            this.fileList1 = [];
            this.fileList2 = [];
            this.showPaymentAuthBoth = false;
            this.bothFile1 = [];
            this.bothFile2 = [];
        },
        handleCloseLock() {
            this.fileList3 = [];
            this.showAccountLock = false;
            this.bothFile3 = {
                fileType: 'PARENT_CHILD_ACCOUNT_GUARANTEE_AGREEMENT'
            };
        },
        handleRemove4(file, fileList) {
            console.log(file);
            this.fddContractParams = this.fddContractParams.filter((item) => {
                return item.viewpdfUrl != file.response.data[0].fullPath;
            });
        },
        handleRemove1(file, fileList) {
            this.bothFile1 = this.bothFile1.filter((item) => {
                return item.fileUrl != file.response.data.filePath;
            });
        },
        handleRemove2(file, fileList) {
            this.bothFile2 = this.bothFile2.filter((item) => {
                return item.fileUrl != file.response.data.filePath;
            });
        },
        handleExceed1(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleExceed2(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleExceed3(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        handleExceed4(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        ensureUpMore() {
            if (!this.offerIdsMore.length) {
                return this.$message.warning('请选择要担保的店铺');
            }
            if (!this.fddContractParams.length) {
                return this.$message.warning('请上传协议');
            }
            upMore({
                fddContractParams: this.fddContractParams,
                applicationCode: this.$route.query.loanNumber,
                offerIds: this.offerIdsMore
            }).then((res) => {
                this.fddContractParams = [];
                this.offerIdsMore = [];
                this.$message.success('上传成功');
                this.closeMore();
            });
        },
        closeMore() {
            this.fddContractParams = [];
            this.fileList4 = [];
            this.toggleSelectionMore();
            this.dialogTableVisible = false;
        },
        toggleSelectionMore() {
            this.$refs.multipleTableUp.clearSelection();
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        // 查看
        handleClickSeeFile(row) {
            window.open(row.fileUrlAll);
        },
        // 删除
        handleClickUploadFile(row) {
            deletePspAuthFile(row).then((res) => {
                this.$message.success('删除成功');
                //查询授权文件上传状态
                this.getPspAuthFileList()
            });
        },
        //上传
        handleAvatarSuccess5(res, file, fileList) {
            if (res.code === 200) {
                this.$message.success('上传成功');
                //查询授权文件上传状态
                this.getPspAuthFileList()
            } else {
                this.$message.error(res.message || '请求失败')
            }
        },

        //上传
        handleAvatarSuccess4(res, file, fileList) {
            let obj = {};
            obj.docTitle = file.name;
            obj.viewpdfUrl = res.data[0].fullPath;
            obj.signType = 'OFFLINE';
            this.fddContractParams.push(obj);
        },

        //上传
        handleAvatarSuccess1(res, file, fileList) {
            let obj = {};
            obj.fileName = res.data.fileName;
            obj.fileUrl = res.data.filePath;
            this.bothFile1.push(obj);
        },
        //上传
        handleAvatarSuccess2(res, file, fileList) {
            let obj = {};
            obj.fileName = res.data.fileName;
            obj.fileUrl = res.data.filePath;
            this.bothFile2.push(obj);
        },
        handleAvatarSuccess3(res, file) {
            this.bothFile3.fileName = res.data.fileName;
            this.bothFile3.fileUrl = res.data.filePath;
        },
        // 发送邮件
        postSendEmail() {
            this.sendEamilStatus = true;
            sendEmail({ applicationCode: this.$route.query.loanNumber, currency: '' }).then((res) => {
                this.$message.success('发送成功');
                this.sendEamilStatus = false;
            });
        },
        goGf() {
            let a = `${this.merchant}/login?type=gf&applicationCode=${this.$route.query.loanNumber}`;

            this.$nextTick(() => {
                let clipboard = new Clipboard('.onCopy', {
                    text: function () {
                        return a;
                    }
                });
                clipboard.on('success', (e) => {
                    this.$message({ message: '复制成功', showClose: true, type: 'success' });
                    // 释放内存
                    clipboard.destroy();
                });
                clipboard.on('error', (e) => {
                    this.$message({ message: '复制失败,', showClose: true, type: 'error' });
                    clipboard.destroy();
                });
            });
        },
        copyLinks(row) {
            let _this = this;
            this.$copyText(row.shortUrl).then(
                function (e) {
                    _this.$message.success('复制成功!');
                },
                function (e) {
                    console.log('copy arguments e:', e);
                    _this.$message.warning('复制失败!');
                }
            );
        },
        closeLink() {
            this.isShowLInks = false;
        },
        openHfDoubleLock() {
            this.$alert('', '确认要锁定汇丰账户吗？', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action == 'confirm') {
                        this.hfDoubleLock()
                    }
                }
            });
        },
        hfDoubleLock() {
            this.hfDoubleLockLoading = true;
            hsbcOfferLocks({
                userId: this.$route.query.userId
            }).then((res) => {
                this.$message.success('操作成功')
                this.hfDoubleLockLoading = false;
            }).catch((err) => {
                this.hfDoubleLockLoading = false;
            });
        },
        //获取易签宝链接
        getLink() {
            this.getLinkLoading = true;
            getLink({
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                if (res.data.length > 0) {
                    this.shopLinks = res.data;
                    this.isShowLInks = true;
                }
                this.getLinkLoading = false;
            }).catch((err) => {
                this.getLinkLoading = false;
            });
        },
        openCalculationUpload() {
            if (!this.pageDataNew.length) {
                return this.$message.info('暂无数据！');
            }
            this.calculationUploadLoad = true;
            let that = this;
            let fileName = '';
            let arr = [];
            this.pageDataNew.forEach((item) => {
                arr.push({
                    offerId: item.offerId,
                    resourceCode: this.$route.query.loanNumber
                });
            });
            const axios = require('axios');
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/quota/allot/export`,
                data: arr,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `自动计算导出.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);

                    that.calculationUploadLoad = false;
                })
                .catch((error) => {
                    this.$message.info(error.response.data.message);
                    that.calculationUploadLoad = false;
                });
        },
        openCalculation() {
            this.calculationLoad = true;
            let arr = [];
            this.pageDataNew.forEach((item) => {
                arr.push(item.offerId);
            });
            calculation(arr).then((res) => {
                res.data.forEach((item) => {
                    item.year1DisbursementsValue = (item.year1DisbursementsValue / 10000).toFixed(2);
                });
                this.calculationData = res.data;

                this.showCalculation = true;
                this.calculationLoad = false;
                this.$nextTick(() => {
                    this._calculationChangeInput();
                });
            });
        },
        _calculation(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.calculationSelectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(4),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: this.$route.query.loanNumber
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                this.sendData.offerId = row.offerId;
                this.sendData.resourceCode = this.$route.query.loanNumber;
                batchArr = [this.sendData];
            }
            received(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showCalculation = false;
            });
        },
        // 多选框默认选中
        toggleSelection() {
            let arr = this.selectRowData;
            setTimeout(() => {
                this.$refs.bossTabel.$refs.multipleTable.clearSelection();
                arr.forEach((row) => {
                    this.$refs.bossTabel.$refs.multipleTable.toggleRowSelection(row);
                });
            }, 0);
        },
        // boss1 多选框change时间
        selectRow(rows) {
            this.selectRowData = rows;
        },
        calculationSelectRow(rows) {
            this.calculationSelectRowData = rows;
        },

        // boss1刷新 美国
        _refreshAccountLockStatusUS() {
            this.$confirm('刷新锁卡状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    refreshAccountLockStatusUS().then((res) => {
                        this.$message.success('刷新成功！');
                        this.$emit('refreshDetail');
                        this.showOperate = false;
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消刷新'
                    });
                });
        },
        // boss1刷新 德国
        _refreshAccountLockStatusDE() {
            this.$confirm('刷新锁卡状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    refreshAccountLockStatusDE().then((res) => {
                        this.$message.success('刷新成功！');
                        this.$emit('refreshDetail');
                        this.showOperate = false;
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消刷新'
                    });
                });
        },
        // 添加offerid多选框change事件
        handleSelectionChange(val) {
            this.ChooseOfferId = val;
        },
        handleSelectionChangeMore(val) {
            console.log(val);
            val.forEach((item) => {
                if (this.offerIdsMore.indexOf(item.offerId) == -1) {
                    this.offerIdsMore.push(item.offerId);
                }
            });
            console.log(this.offerIdsMore, 'offerIds');
        },
        // 添加offerid
        addOfferId() {
            if (!this.ChooseOfferId.length) {
                return false;
            }
            let arr = [];
            this.ChooseOfferId.forEach((item) => {
                arr.push({
                    applicationCode: this.$route.query.loanNumber,
                    offerId: item.offerId
                });
            });
            saveShopOffer(arr).then((res) => {
                this.$message.success('操作成功！');
                this.showSearchInfo = false;
                this.$emit('refreshDetail');
            });
        },
        // 查询offerid
        searchOfferId() {
            this.btnLoading2 = true;
            searchStoreNew({
                userId: this.$route.query.userId,
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                let arr = [];
                this.searchOfferData = [];
                this.pageDataNew.forEach((item) => {
                    arr.push(item.offerId);
                });
                res.data.forEach((rows, index) => {
                    if (!arr.join(',').includes(rows.offerId)) {
                        // this.searchOfferData.push(rows);
                        // this.searchOfferData = Array.from([... this.searchOfferData, rows])
                        this.$set(this.searchOfferData, index, rows);
                    }
                });
                if (this.searchOfferData.length) {
                    this.showSearchInfo = true;
                } else {
                    this.$message.info('未查到数据！');
                }
                this.btnLoading2 = false;
            });
        },
        //锁卡
        openLock() {
            this.showLock = true;

            // 判断该offer是否可以进行操作
            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn =
                    item.accountLockStatus == 'UNLOCKED' || item.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? (item.hiddenBtn += '提交')
                        : item.accountLockStatus == 'LOCKED'
                            ? false
                            : (item.hiddenBtn += '提交');
                item.disabled =
                    item.accountLockStatus == 'UNLOCKED' || item.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? true
                        : item.accountLockStatus == 'LOCKED'
                            ? false
                            : 'true';
            });

            this.toggleSelection();
        },
        //解锁
        openUnLock() {
            this.showUnLock = true;
            // 判断该offer是否可以进行操作
            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn =
                    item.accountLockStatus == 'UNLOCKED' || item.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? (item.hiddenBtn += '提交')
                        : item.accountLockStatus == 'LOCKED'
                            ? false
                            : (item.hiddenBtn += '提交');
                item.disabled =
                    item.accountLockStatus == 'UNLOCKED' || item.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? true
                        : item.accountLockStatus == 'LOCKED'
                            ? false
                            : 'true';
            });
            this.toggleSelection();
        },
        // 还款
        oepnRepayment() {
            this.showRepayment = true;

            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn = item.applicationStatus != 'UN_ACTIVE' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.applicationStatus != 'UN_ACTIVE';
            });
            this.toggleSelection();
        },
        // 创建授信
        openApproval() {
            this.showApproval = true;

            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn = item.creditApprovalStatus == 'ACTIVE' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.creditApprovalStatus == 'ACTIVE';
            });
            this.toggleSelection();
        },
        // 修改授信
        _updateCreadit() {
            this.showUpdateCreadit = true;
            this.amazonRequestData2.forEach((item) => {
                item.hiddenBtn = '';
                item.oldResourceAmount = !item.oldResourceAmount ? item.resourceAmount : item.oldResourceAmount;
                item.oldTenure = !item.oldTenure ? item.tenure : item.oldTenure;
                item.oldInterestRate = !item.oldInterestRate ? item.interestRate : item.oldInterestRate;

                item.resourceAmount = '';
                item.tenure = '';
                item.interestRate = '';
            });
            this.toggleSelection();
        },
        // 显示通过申请锁卡
        oepnApproved() {
            this.showApproved = true;
            // 判断该offer是否可以进行操作
            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn = item.applicationStatus != 'RECEIVED' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.applicationStatus != 'RECEIVED';
            });
            this.toggleSelection();
        },
        // 显示通过申请不锁卡
        openApprovedUnlock() {
            this.showApprovedUnlock = true;

            // 判断该offer是否可以进行操作
            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn = item.applicationStatus != 'RECEIVED' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.applicationStatus != 'RECEIVED';
            });

            this.toggleSelection();
        },

        //显示收到申请弹窗
        openReceived() {
            this.showReceived = true;
            // 判断该offer是否可以进行操作
            this.amazonRequestData.forEach((item) => {
                item.hiddenBtn = '';
                item.hiddenBtn = item.applicationStatus != 'CREATED' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.applicationStatus != 'CREATED';
            });
            this.toggleSelection();
        },
        // 授信拆分表格输入框change事件  计算总金额
        _changeInput() {
            this.totalMoney = 0;
            this.splitData.forEach((item) => {
                this.totalMoney = Number(item.resourceAmount) + this.totalMoney;
            });
            this.totalMoney = this.totalMoney.toFixed(3);
        },

        // boss1操作表格输入框change事件  计算总金额
        _amazonChangeInput() {
            if (this.$refs.bossTabel) {
                this.$refs.bossTabel.$refs.multipleTable.clearSelection();
            }
            this.amazonTotalMoney = 0;
            this.amazonData.forEach((item) => {
                this.amazonTotalMoney = Number(item.resourceAmount) + this.amazonTotalMoney;
            });
            this.amazonTotalMoney = this.amazonTotalMoney.toFixed(3);
        },
        // boss1  自动计算 操作表格输入框change事件  计算总金额
        _calculationChangeInput() {
            this.$refs.bossTabel.$refs.multipleTable.clearSelection();
            this.calculationTotalMoney = 0;
            this.calculationData.forEach((item) => {
                this.calculationTotalMoney = Number(item.resourceAmount) + this.calculationTotalMoney;
            });
            this.calculationTotalMoney = this.calculationTotalMoney.toFixed(3);
        },
        paymentUserReVerify() {
            paymentUserVerify({
                offerIds: [this.chooseRow.offerId],
                applicationCode: this.$route.query.loanNumber,
                userId: this.userId,
                ppForcedRefresh: true
            }).then((res) => {
                let data = res.data[0];
                this.customerWritePaymentDetailVO = data.customerWritePaymentDetailVO || {};
                this.borrowerApplicationDetailInfoVO = data.borrowerApplicationDetailInfoVO || {};
                this.paymentVerifyResultVO = data.paymentVerifyResultVO || {};
                this.paymentDetailVO = data.paymentDetailVO || {};
                this.paymentDetailVO.offerId = this.chooseRow.offerId;
                this.showAccountLock = true;
                if (this.paymentVerifyResultVO.borrowerSubjectVerification == 'VERIFY_PASS' && this.paymentVerifyResultVO.shopVerification == 'AUTO_VERIFY_PASS') {
                    this.sameObj.isSamePayeeAccount = "1"
                }
            });
        },

        // 操作
        tableEvent(event, row, index) {
            if (event == 'paymentClear') {
                this.$confirm('此操作将删除该OfferId绑定的支付公司, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        paymentClear({ offerId: row.offerId, userId: Number(this.userId) }).then((res) => {
                            this.$emit('refreshDetail');
                            this.$message.success('操作成功！');
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
            if (event == 'deleteOfferId') {
                this.$confirm('此操作将删除该OfferId, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        deleteOffer(row.id).then((res) => {
                            this.$emit('refreshDetail');
                            this.$message.success('操作成功！');
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
            this.chooseRow = row;
            this.chooseRowIndex = index;
            this.sendData = {
                offerId: row.offerId,
                resourceCode: this.$route.query.loanNumber
            };
            // console.log(this.chooseRow);

            if (event === 'openOperate') {
                this.showOperate = true;
            }
            if (event === 'accountLock') {
                paymentUserVerify({
                    offerIds: [this.chooseRow.offerId],
                    applicationCode: this.$route.query.loanNumber,
                    userId: this.userId
                }).then((res) => {
                    let data = res.data[0];
                    this.customerWritePaymentDetailVO = data.customerWritePaymentDetailVO || {};
                    this.borrowerApplicationDetailInfoVO = data.borrowerApplicationDetailInfoVO || {};
                    this.paymentVerifyResultVO = data.paymentVerifyResultVO || {};
                    this.paymentDetailVO = data.paymentDetailVO || {};
                    this.paymentDetailVO.offerId = this.chooseRow.offerId;
                    this.showAccountLock = true;
                    if (this.paymentVerifyResultVO.borrowerSubjectVerification == 'VERIFY_PASS' && this.paymentVerifyResultVO.shopVerification == 'AUTO_VERIFY_PASS') {
                        this.sameObj.isSamePayeeAccount = "1"
                    }
                    //查询授权文件上传状态
                    this.getPspAuthFileList()
                });
                isShowBtn({
                    offerId: this.chooseRow.offerId,
                    userId: this.userId
                }).then((res) => {
                    this.isshowbtn = res.data;
                });
            }
            if (event == 'paymentAuthentication') {
                if (this.$route.query.lenderId == 31 || this.$route.query.lenderId == 47) {
                    let obj = {
                        applicationCode: this.$route.query.loanNumber,
                        offerId: encodeURIComponent(this.chooseRow.offerId)
                    };
                    isparentChild(obj).then((res) => {
                        this.paymentAuthBoth = res.data;
                        this.showPaymentAuthBoth = true;
                    });
                } else {
                    paymentAuthentication({
                        offerId: this.chooseRow.offerId,
                        applicationCode: this.$route.query.loanNumber
                    }).then((res) => {
                        this.paymentAuthBName = res.data.borrowerName || '';
                        this.paymentAuthAccountTail = res.data.accountTail || '';
                        this.paymentAuthUrls = res.data.urls || [];
                        this.showPaymentAuth = true;
                    });
                }
            }
            if (event == 'monitorReport') {
                this.$router.push({
                    path: '/monitor-shop',
                    query: {
                        offerId: this.chooseRow.offerId
                    }
                });
            }
            if (event == 'creditReport') {
                this.$router.push({
                    path: '/credit-shop',
                    query: {
                        offerId: this.chooseRow.offerId
                    }
                });
            }
        },
        //查询授权文件上传状态
        getPspAuthFileList() {
            // pspAuthFileList({
            //     paymentCode: this.paymentDetailVO.paymentCode,
            //     offerId: this.chooseRow.offerId
            // }).then((res) => {
            //     console.log(111, res.data)
            //     if (res.data.files && res.data.files.length > 0) {
            //         this.tableDataAuthFile = res.data.files
            //         this.tableDataAuthFile.forEach((item) => {
            //             item.fileTypeTxt = this.paymentTypeTxt[item.fileType]
            //             if (item.fileUrl) {
            //                 item.fileUrlAll = `${process.env.VUE_APP_IMGS_BASE_URL}${item.fileUrl}`
            //             }
            //         })
            //     } else {
            //         this.tableDataAuthFile = []
            //     }
            // })
        },
        //上传pdf
        upPdf() {
            console.log(this.amazonRequestData, 'amazonRequestData');
            this.dialogTableVisible = true;
        },

        // 关闭授信
        _closeCredit() {
            closeCredit(this.chooseRow.offerId).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 重置
        _resetAl() {
            resetAl(this.chooseRow.offerId).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 关闭贷款
        _closeLoan() {
            closeLoan(this.chooseRow.offerId).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 还款
        _repayment(text) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                batchArr = [this.sendData];
            }
            repayment(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 创建贷款
        _createLoan() {
            createLoan([this.sendData]).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 创建授信
        _approval(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(4),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                batchArr = [this.sendData];
            }
            approval(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showApproval = false;
            });
        },
        // 修改授信
        _updateC(text, row) {
            if (text == '_copy') {
                row.resourceAmount = row.oldResourceAmount;
                row.tenure = row.oldTenure;
                row.interestRate = row.oldInterestRate;
            } else {
                let batchArr = [];
                if (text == 'Batch') {
                    this.selectRowData.forEach((item) => {
                        batchArr.push({
                            resourceAmount: item.resourceAmount,
                            interestRate: (item.interestRate / 100).toFixed(4),
                            tenure: item.tenure,
                            offerId: item.offerId,
                            resourceCode: item.resourceCode
                        });
                    });
                    if (!batchArr.length) {
                        return this.$message.warning('请先选择');
                    }
                } else {
                    this.sendData.resourceAmount = row.resourceAmount;
                    this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                    this.sendData.tenure = row.tenure;
                    this.sendData.offerId = row.offerId;
                    batchArr = [this.sendData];
                }
                updateApproval(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showUpdateCreadit = false;
                });
            }
        },
        // 解锁
        _unlock(text) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                batchArr = [this.sendData];
            }
            unlock(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 锁卡
        _lock(text) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                batchArr = [this.sendData];
            }
            lock(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
            });
        },
        // 收到申请
        _received(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(4),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                batchArr = [this.sendData];
            }
            received(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showReceived = false;
            });
        },
        // 通过申请 锁卡
        _approved(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(4),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                batchArr = [this.sendData];
            }
            approved(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showApproved = false;
            });
        },
        // 通过申请 不锁卡
        _approvedUnlock(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(4),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                batchArr = [this.sendData];
            }
            approvedUnlock(batchArr).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showApprovedUnlock = false;
            });
        },

        _offerrRceived() {
            offerrRceived(this.splitData).then((res) => {
                this.$message.success('提交成功！');
                this.$emit('refreshDetail');
                this.split = false;
            });
        },
        creditSplit() {
            this.btnLoading = true;
            allotCredit(this.$route.query.loanNumber).then((res) => {
                this.splitData = res.data;
                this.btnLoading = false;
                this.split = true;
                this._changeInput();
            });
        },
        lockPay() {
            if (!this.sameObj.isSamePayee || !this.sameObj.isSamePayeeAccount) {
                return this.$message.warning('请选择收款人，收款账户是否一致');
            }
            if ((this.sameObj.isSamePayee == '0' || this.sameObj.isSamePayeeAccount == '0') && !this.sameObj.specialCustomerType) {
                return this.$message.warning('请选择原因');
            }
            this.btnLoading = true;
            applicationPhone({ applicationCode: this.$route.query.loanNumber }).then((res) => {
                paymentLock({
                    applicationCode: this.$route.query.loanNumber,
                    phone: res.data,
                    offerId: this.chooseRow.offerId,
                    isSamePayee: this.sameObj.isSamePayee == '0' ? false : true,
                    isSamePayeeAccount: this.sameObj.isSamePayeeAccount == '0' ? false : true,
                    specialCustomerType: this.sameObj.specialCustomerType
                })
                    .then((resl) => {
                        this.btnLoading = false;
                        this.showAccountLock = false;
                        this.$emit('refreshDetail');
                    })
                    .catch((_) => {
                        this.btnLoading = false;
                    });
            });
        },
        authApproved(row) {
            let offerIds = [];
            offerIds.push(this.chooseRow.offerId);
            verifyShop({
                offerIds: offerIds,
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                this.$message.success('操作成功');
                this.$emit('refreshDetail');
                this.showPaymentAuth = false;
            });
        },
        authApprovedBoth(row) {
            if (this.bothFile1.length < 1) {
                return this.$message.warning('请上传资金归集账户(母户)关系截图或代持证明材料');
            }
            if (this.bothFile2.length < 1) {
                return this.$message.warning('请上传收款账号信息');
            }
            this.bothFile1.forEach((item) => {
                item.resourceId = this.chooseRow.id;
                item.fileType = 'PARENT_CHILD_ACCOUNT_PROVE';
            });
            this.bothFile2.forEach((item) => {
                item.resourceId = this.chooseRow.id;
                item.fileType = 'PARENT_CHILD_ACCOUNT_INFO';
            });
            // row.id
            offerVerify({
                offerId: this.chooseRow.offerId,
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                saveBatch([...this.bothFile1, ...this.bothFile2])
                    .then((res) => {
                        this.$message.success('操作成功');
                        // this.$emit('refreshDetail');
                        this.fileList1 = [];
                        this.fileList2 = [];
                        this.bothFile1 = [];
                        this.bothFile2 = [];
                        this.showPaymentAuthBoth = false;
                    })
                    .catch((err) => {
                        this.showPaymentAuthBoth = false;

                        this.$message.error(err.message);
                    });
            });
        },
        sendEmailFileType() {
            sendEmailWithFile({
                offerId: this.chooseRow.offerId,
                applicationCode: this.$route.query.loanNumber,
                userId: this.userId
            }).then((res) => {
                this.dialogVisibleSendEmail = false;
                this.$message.success('发送成功')
            })
        },
        toSendEmailPayFile() {
            getAutoEmailDetail({
                offerId: this.chooseRow.offerId,
                applicationCode: this.$route.query.loanNumber,
                userId: this.userId
            }).then((res) => {
                console.log(1616666666, res)
                this.sendEmailData = res.data;
                this.dialogVisibleSendEmail = true;
            })
        },
        toSendEmail: _.debounce(function () {
            emaildraft({ offerId: this.chooseRow.offerId, userId: this.userId, applicationCode: this.$route.query.loanNumber })
                .then((res) => {
                    if (res.data) {
                        this.$message.success('发送成功!');
                    } else {
                        this.$message.error('发送失败!');
                    }
                })
                .catch((err) => {
                    this.$message.error('发送失败!');
                });
        }, 500) // 500 毫秒的防抖时间
    },
    data() {
        return {
            whiteType: null,
            sameObj: {
                isSamePayee: '',
                isSamePayeeAccount: '',
                specialCustomerType: ""
            },
            optionsSame: [{
                value: 'SPECIALLY_APPROVED_CUSTOMERS',
                label: '特批客户'
            }, {
                value: 'GUARANTEED_CUSTOMER',
                label: '担保客户'
            }, {
                value: 'OTHER',
                label: '其他原因'
            }],
            optionsOne: [{
                value: '1',
                label: '是'
            }, {
                value: '0',
                label: '否'
            }],
            sendEmailData: {},
            dialogVisibleSendEmail: false,
            tableDataAuthFile: [],
            hfDoubleLockLoading: false,
            isshowbtn: false,
            customerWritePaymentDetailVO: {},
            replaceoffer: {
                applicationCode: '',
                originalOfferIds: [],
                latestOfferIds: [],
                phone: ''
            },
            pageDataNew: [],
            uploadHeaders: { token: localStorage.getItem('token') },
            isShowLInks: false,
            shopLinks: [],
            offerIdsMore: [],
            dialogTableVisible: false,
            fileList1: [],
            fileList2: [],
            fileList3: [],
            fileList4: [],
            //多个担保协议
            fddContractParams: [],
            //子母账户关系证明
            bothFile1: [],
            //子母账户关系证明
            bothFile2: [],
            //子母账户担保协议
            bothFile3: {
                fileType: 'PARENT_CHILD_ACCOUNT_GUARANTEE_AGREEMENT'
            },

            bothForm: {
                imageUrl1: '',
                imageUrl2: ''
            },
            uploadUrlBoth: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-file/file-upload/upload/gf`,
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            uploadBothPdf: process.env.VUE_APP_UPLOADFILE_URL,
            uploadMorePdf: process.env.VUE_APP_MORE,
            merchant: process.env.VUE_APP_MERCHANT,
            payFileUpload: process.env.VUE_APP_BASE_URL + '/lending/psp/authFile/fileUpload',
            fjUrl: process.env.VUE_APP_IMGS_BASE_URL,
            cardTypeText: {
                ID_CARD: '第二代居民身份证',
                HK_ID_CARD: '香港永久性居民身份证',
                PASSPORT: ' 护照'
            },
            productAttributesText: {
                PERSONAL: '个人借款',
                ENTERPRISE: '大陆企业借款',
                'HK-ENTERPRISE': '香港企业借款'
            },
            paymentSubjectTypeText: {
                PERSONAL: '个人',
                ENTERPRISE: '企业',
                'HK-ENTERPRISE': '香港企业'
            },
            borrowerSubjectVerificationText: {
                VERIFY_PASS: '通过',
                VERIFY_NO_PASS: '不通过',
                UNVERIFIED: '暂未核验',
                AUTO_VERIFY_PASS: '已核验（自动扣款）'
            },
            shopVerificationText: {
                VERIFY_PASS: '通过',
                VERIFY_NO_PASS: '不通过',
                UNVERIFIED: '暂未核验',
                AUTO_VERIFY_PASS: '已核验（自动扣款）'
            },
            borrowerSubjectVerificationFailedReasonText: {
                BORROWER_INFO_MISSING: '借款人信息缺失',
                BORROWER_ID_CARD_NUMBER_MISSING: '借款人身份证号码缺失',
                BORROWER_NAME_MISSING: '借款人名称缺失',
                NO_SELECT_PAYMENT: '未选择支付公司',
                PAYMENT_INFO_MISSING: '支付公司信息联登后的缺失',
                AWX_PAYMENT_INFO_MISSING: '调用空中云汇查询接口查不到账户信息',
                PAYMENT_AUTH_INFO_MISSING: '未查询到支付联登信息',
                PAYMENT_API_ERROR: '调用支付公司api核验异常',
                OFFLINE_PAYMENT: '线下支付不核验'
            },
            shopVerificationFailedReasonText: {
                BORROWER_SHOP_ACCOUNT_TAIL_MISSING: '借款人店铺后三位缺失',
                PAYMENT_SHOP_ACCOUNT_INFO_MISSING: '支付侧店铺数据缺失',
                NO_SELECT_PAYMENT: '未选择支付公司',
                WF_NO_SHOP_AUTH_IN_SP: 'WF的客户店铺在WF那边授权过期，需要客户重新在WF授权才能查询店铺账号信息',
                BORROWER_INFO_MISSING: '借款人信息缺失',
                BORROWER_ID_CARD_NUMBER_MISSING: '借款人身份证号码缺失',
                BORROWER_NAME_MISSING: '借款人名称缺失',
                PAYMENT_INFO_MISSING: '支付公司信息联登后的缺失',
                AWX_PAYMENT_INFO_MISSING: '调用空中云汇查询接口查不到账户信息',
                PAYMENT_API_ERROR: '调用支付公司api核验异常',
                OFFLINE_PAYMENT: '线下支付不核验',
                PAYMENT_AUTH_INFO_MISSING: '未查询到支付联登信息'
            },

            paymentUserAndBorrowerVO: {},
            shopPaymentAccountVO: {},
            borrowerApplicationDetailInfoVO: {},
            paymentVerifyResultVO: {},
            paymentDetailVO: {},
            paymentAuthBoth: {},
            paymentAuthAccountTail: '',
            paymentAuthBName: '',
            paymentAuthUrls: [],
            amazonRequestData2: [],
            baseUrl: process.env.VUE_APP_BASE_URL,
            calculationData: [], // 自动计算数据
            showCalculation: false, //自动计算弹窗
            calculationLoad: false, //自动计算load状态
            calculationTotalMoney: 0, //自动计算总金额
            getLinkLoading: false,
            showRepayment: false,
            showUnLock: false,
            showLock: false,
            chooseRowIndex: '',
            selectRowData: [], //多选框选出来的数据
            calculationSelectRowData: [], //自动计算多选
            calculationUploadLoad: false, //导出load
            splitColumns: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue'
                },
                {
                    label: '额度/万',
                    prop: 'resourceAmount',
                    cellEdit: 'input',
                    type: 'number',
                    width: 100
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
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
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
            splitColumns4: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue'
                },
                {
                    label: '额度/万',
                    prop: 'oldResourceAmount',

                    type: 'number',
                    width: 100
                },
                {
                    label: '期限(月)',
                    prop: 'oldTenure',

                    type: 'number'
                },
                {
                    label: '利率(%)',
                    prop: 'oldInterestRate',

                    type: 'number'
                },
                {
                    label: '额度/万',
                    prop: 'resourceAmount',
                    cellEdit: 'input',
                    type: 'number',
                    width: 100
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
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
                    operates: [
                        {
                            event: '_copy',
                            text: '复制',
                            type: 'info'
                        },
                        {
                            event: '_offerrRceived',
                            text: '提交',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            splitColumns3: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年回款额/万',
                    prop: 'year1DisbursementsValue'
                },
                {
                    label: '额度/万',
                    prop: 'resourceAmount',
                    cellEdit: 'input',
                    type: 'number',
                    width: 100
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
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
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
            splitColumns2: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: this.$t('loan_detail_hkzhhtw'),
                    prop: 'accountTail'
                },
                {
                    label: this.$t('loan_detail_hklx'),
                    prop: 'bankIdCode'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
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
            amazonRequestData: [],
            creditAmount: '',
            ChooseOfferId: [],
            showSearchInfo: false,
            searchOfferData: [],
            showApprovedUnlock: false,
            showApproved: false,
            form: {
                interestRate: '',
                tenure: '',
                resourceAmount: ''
            },
            approvalAmount: '',
            showApproval: false,
            showReceived: false,
            amazonTotalMoney: 0,
            sendData: {},
            totalMoney: '',
            chooseRow: {},
            showOperate: false,
            showAccountLock: false,
            showPaymentAuth: false,
            showPaymentAuthBoth: false,
            applicationStatus: '',
            loanStatus: '',
            btnLoading: false,
            showUpdateCreadit: false,
            btnLoading2: false,
            sendEamilStatus: false,
            split: false,
            splitData: [],
            showPage: false,
            columns: [
                {
                    label: 'offerId',
                    prop: 'offerId'
                },
                {
                    label: '年销售额/万',
                    prop: 'year1SalesValue'
                },
                {
                    label: '授信额度/万',
                    prop: 'resourceAmount',
                    cellEdit: 'input',
                    type: 'number'
                }
            ],
            columns2: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: '350'
                },
                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'site',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_pingtai'),
                    prop: 'offerSource',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_sqsj'),
                    prop: 'createTime',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_dpzt'),
                    prop: 'sellerStatus',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_shouquansj'),
                    prop: 'authorizeTime',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_skqd'),
                    prop: 'paymentName',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_skztyz'),
                    prop: 'paySelf',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_dpskzh'),
                    prop: 'payShop',
                    width: 150
                },
                {
                    label: 'sellerID',
                    prop: 'sellerId',
                    showTip: true
                },
                {
                    label: '店铺名称',
                    prop: 'shopName',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_jhed'),
                    prop: 'availableStatus',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_skzt'),
                    prop: 'accountLockStatus',
                    width: 200
                },
                {
                    label: this.$t('loan_detail_sqzt'),
                    prop: 'applicationStatus',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_hkzhhtw'),
                    prop: 'accountTail',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_offerly'),
                    prop: 'offerSource',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_hklx'),
                    prop: 'bankIdCode',
                    width: 150
                },
                // {
                //     label: '国家',
                //     prop: 'country',
                //     width: 150
                // },
                {
                    label: this.$t('loan_detail_sxsj'),
                    prop: 'creditTime',
                    width: 150
                },
                {
                    label: this.$t('loan_search_amount'),
                    prop: 'creditAmount',
                    width: 100
                },
                {
                    label: this.$t('loan_detail_dkejw'),
                    prop: 'amount2',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_sxzt'),
                    prop: 'creditApprovalStatus',
                    width: 150
                },
                {
                    label: this.$t('loan_search_dkzt'),
                    prop: 'loanStatus',
                    width: 150
                },
                {
                    label: this.$t('loan_detail_sdlx'),
                    prop: 'paymentLockStatus',
                    width: 80
                },

                {
                    label: this.$t('loan_detail_sdsj'),
                    prop: 'lockTime',
                    width: 150
                },

                {
                    label: '收款人是否一致',
                    prop: 'isSamePayee',
                    width: 150
                },

                {
                    label: '收款账户是否一致',
                    prop: 'isSamePayeeAccount',
                    width: 150
                },

                {
                    label: '不一致原因',
                    prop: 'specialCustomerType',
                    width: 150
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: 400,
                    operates: [
                        {
                            event: 'paymentAuthentication',
                            text: '支付认证',
                            type: 'waring',
                            code: 'SHOP_INFO_OPERATION'
                        },
                        {
                            event: 'paymentClear',
                            text: '支付清除',
                            type: 'waring',
                            code: 'SHOP_INFO_OPERATION'
                        },
                        {
                            event: 'accountLock',
                            text: '账户锁定',
                            type: 'waring',
                            code: 'SHOP_INFO_OPERATION'
                        },
                        {
                            event: 'openOperate',
                            text: '操作',
                            type: 'waring',
                            code: 'SHOP_INFO_OPERATION'
                        },
                        {
                            event: 'deleteOfferId',
                            text: this.$t('loan_detail_delete'),
                            type: ''
                        },
                        {
                            event: 'creditReport',
                            text: '授信报告',
                            type: ''
                        },
                        {
                            event: 'monitorReport',
                            text: '监控报告',
                            type: ''
                        }
                    ],
                    fixed: 'right'
                }
            ],
            paymentTypeTxt: {
                'PAYONEER_SPECIAL_REGULATION': '关于Dowsure服务的特别规定',
                'PAYONEER_PAYMENT_ACCOUNT_AUTHORIZATION': 'ARRON支付账户操作授权书',
                'PAYONEER_LENDING_PARTNER_FORM': 'Payoneer x Dowsure Lending Partner Consolidated form',
                'SKYEE_SKYEE_USER_AGREEMENT': 'SKYEE用户协议提现锁定及结汇提现之授权书',
                'SKYEE_INFORMATION_SERVICE_AUTHORIZATION': '信息服务授权书',
                'COGOLINKS_SERVICE_AUTHORIZATION': '服务授权书',
            }
        };
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

<style scoped lang="less">
.whiteType {
    line-height: 32px;
    position: absolute;
    left: 0;
    top: 0;
}

/deep/ .el-upload-list__item .el-icon-close {
    position: absolute;
    top: -5px !important;
    right: 5px;
    cursor: pointer;
    opacity: 0.75;
    color: #606266;
}

/deep/ .bothInfo .el-upload {
    width: auto !important;
}
</style>
