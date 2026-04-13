<template>
    <div style="margin-top: 24px; padding-bottom: 24px" v-loading="allLoading">
        <el-card style="margin-top: 24px" shadow="hover">
            <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between">
                <div v-if="$route.query.lenderId == '46'">是否加白客户：{{ isWhite }}</div>
                <div v-if="whiteType">加白类型：{{ whiteType }}</div>

                <div v-else></div>
                <div>
                    <el-button type="primary" @click="onZhaDaDataExport"
                        v-if="$route.query.lenderId == '73'">渣打店铺数据</el-button>
                    <el-button type="primary" @click="toGetHfWater">汇丰水位查询</el-button>
                    <el-button type="primary" @click="getLink" :loading="getLinkLoading">担保签约链接</el-button>
                    <el-button type="primary" @click="upPdf">上传担保协议</el-button>
                    <el-button type="primary" @click="ensureSendHf"
                        v-show="$route.query.lenderId == '46'">汇丰数据传输</el-button>
                    <el-button type="primary" @click="creditSplit" :loading="btnLoading"
                        v-if="$showBtn('SHOP_INFO_CREDIT_SPLIT') && pageData && pageData.length > 1">授信拆分</el-button>
                    <el-button type="primary" @click="goGf" class="onCopy" :loading="btnLoading2">支付链接</el-button>
                    <el-button type="primary" @click="searchOfferId" :loading="btnLoading2">查询offerId</el-button>
                </div>
            </div>

            <xtable ref="totalTable" @select="sendHuiFeng" :isShowSelection="false" @edit="tableEvent"
                :columns="columns2Filtered" :detailTable="true" :tableData="localPageData" />
        </el-card>
        <el-dialog title="操作" :visible.sync="showOperate" width="60%" top="24vh">
            <div style="display: flex; flex-wrap: wrap">
                <el-card class="box-card" style="width: 48%; margin-right: 1px">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>申请</span>
                    </div>
                    <el-button @click="openReceived" :disabled="chooseRow.applicationStatus != 'CREATED'">收到申请
                    </el-button>
                    <el-button @click="oepnApproved" :disabled="chooseRow.applicationStatus != 'RECEIVED'">通过申请（锁卡）
                    </el-button>
                    <el-button :disabled="chooseRow.applicationStatus != 'RECEIVED'" @click="openApprovedUnlock">
                        通过申请（不锁卡）</el-button>
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
                        ">
                        确认锁卡</el-button>
                    <el-button @click="openUnLock" :disabled="chooseRow.accountLockStatus == 'UNLOCKED' || chooseRow.accountLockStatus == 'PARTNER_CONFIRMED'
                        ? true
                        : chooseRow.accountLockStatus == 'LOCKED'
                            ? false
                            : ''
                        ">
                        解锁账户</el-button>
                    <!-- <el-button @click="_resetAl">重置AL</el-button> -->
                    <el-button @click="_refreshAccountLockStatusUS">刷新(美国站)</el-button>
                    <el-button @click="_refreshAccountLockStatusDE">刷新(德国站)</el-button>
                </el-card>
                <el-card class="box-card" style="width: 48%; margin-bottom: 30px; margin-right: 1px">
                    <div slot="header" class="clearfix1" style="height: 15px">
                        <span>授信</span>
                    </div>
                    <el-button
                        :disabled="chooseRow.accountLockStatus != 'PARTNER_CONFIRMED' || chooseRow.creditApprovalStatus != 'UN_ACTIVE'"
                        @click="openApproval">创建授信
                    </el-button>
                    <el-button :disabled="chooseRow.creditApprovalStatus != 'ACTIVE'"
                        @click="_updateCreadit">修改授信</el-button>
                    <el-button @click="_closeCredit" :disabled="chooseRow.applicationStatus != 'CLOSED'">关闭授信
                    </el-button>
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

        <!-- ============================自营额度计算======================================================================================================================== -->
        <!-- ============================自营额度计算结束======================================================================================================================== -->
        <!-- ============================收到申请======================================================================================================================== -->
        <el-dialog title="收到申请" :visible.sync="showReceived" width="55%" top="24vh">
            <xtable v-if="showReceived" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_received" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @change="_amazonChangeInput" />
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
                @change="_amazonChangeInput" />
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
                @change="_amazonChangeInput" />
            <div style="margin-top: 10px; text-align: right; padding-right: 10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApprovedUnlock = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_approvedUnlock('Batch')" style="width: 80px; height: 35px">批量提交
                </el-button>
            </div>
        </el-dialog>

        <!-- ============================创建授信======================================================================================================================== -->
        <el-dialog title="创建授信" :visible.sync="showApproval" width="55%" top="24vh">
            <xtable v-if="showApproval" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approval" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @change="_amazonChangeInput" />
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

        <el-dialog :before-close="toUpData" title="查询结果" :visible.sync="showSearchInfo" width="55%" top="24vh">
            <el-table :data="searchOfferData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" ref="multiple">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="offerId" label="offerID"></el-table-column>
                <el-table-column label="疑似重复的offerID" width="380px">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.shopDuplicateOffer" v-model="scope.row.shopDuplicateOffer"
                            placeholder="请输入内容"></el-input>
                        <div v-else> </div>
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
        <el-dialog title="账户锁定确认" :before-close="handleCloseLock" :visible.sync="showAccountLock" width="60%"
            top="24vh">
            <div style="display: flex;">
                <el-descriptions style="width: 50%;" :title="paymentDetailVO.paymentName || '-'" :column="1" border>
                    <el-descriptions-item label="收款主体类型">{{
                        (paymentDetailVO.paymentSubjectType &&
                            paymentSubjectTypeText[paymentDetailVO.paymentSubjectType])
                        || '-'
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
                <el-descriptions style="width: 50%;" title="KYC" :column="1" border>
                    <el-descriptions-item :label="$t('loan_search_cpmc')">{{
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
                            : customerWritePaymentDetailVO.paymentSubjectTypeFromCust ==
                                'ENTERPRISE'
                                ? '大陆企业'
                                : customerWritePaymentDetailVO.paymentSubjectTypeFromCust ==
                                    'HK-ENTERPRISE'
                                    ? '香港企业'
                                    : '-'
                    }}</el-descriptions-item>
                    <el-descriptions-item label="企业名称">{{
                        customerWritePaymentDetailVO.companyNameFromCust ||
                        '-' }}</el-descriptions-item>
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
            <el-descriptions title="店铺信息" direction="vertical" :column="4" border>
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
                                shopVerificationText[paymentVerifyResultVO.shopVerification])
                            || '-'
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
            <div style="width: 100%; ">
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
                <el-row :gutter="20" style="margin-top: 20px;">
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
                <el-button v-if="isshowbtnStatus" style="margin: 20px auto" type="primary" :loading="btnLoading"
                    @click="toSendEmail">发送邮件</el-button>
                <el-button type="primary"
                    style="width: 180px; margin: 20px auto; display: block; margin-bottom: 0px; height: 40px"
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
        <!-- ============================汇丰传输======================================================================================================================== -->
        <el-dialog title="请选择传输类型" width="60%" :visible.sync="huifengShow" v-loading="loadingHf">
            <el-radio-group v-model="sendHfObj.productType">
                <el-radio label="EMF-ONBD">贷前推数</el-radio>
                <el-radio label="EMF-MNTR">贷中推数</el-radio>
            </el-radio-group>
            <el-table v-if="sendHfObj.productType == 'EMF-ONBD'" ref="multipleTable" :data="tableDataHf"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChangeHf">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="offerId" label="offerId" width="" />
                <el-table-column prop="offerIdMd5" label="加密offerId" width="" />
                <el-table-column prop="shopName" label="店铺名称" width="" />
                <el-table-column prop="offerSource" label="offer来源" width="" />
                <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip />
                <el-table-column prop="sellerIds" label="sellerID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bindTime" label="绑定时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <!-- <el-radio-group v-else v-model="sendHfObj.sendType" style="margin-top: 20px;display: block;">
                <el-radio label="1" border>贷后增加店铺提额</el-radio>
                <el-radio label="2" border>贷后水位下降增加店铺</el-radio>
                <el-radio label="3" border>贷后店铺被封减少店铺</el-radio>
            </el-radio-group> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeHfShow">取 消</el-button>
                <el-button type="primary" @click="sendHuiFeng">确 定</el-button>
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
        <!-- ============================上传协议获取店铺列表======================================================================================================================== -->
        <el-dialog :visible.sync="dialogTableVisible" width="50%" :before-close="closeMore">
            <el-table ref="multipleTableUp" :data="pageDataNew" @selection-change="handleSelectionChangeMore">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="offerId" label="offerId"> </el-table-column>
                <el-table-column label="收款渠道">
                    <template slot-scope="scope">{{ scope.row.paymentName }}</template>
                </el-table-column>
            </el-table>
            <div id="uuuuuu" style="display: flex">
                <el-upload accept=".pdf" :action="uploadMorePdf" :headers="uploadHeaders" :on-remove="handleRemove4"
                    :file-list="fileList4" :on-exceed="handleExceed4" :on-success="handleAvatarSuccess4" multiple
                    name="files" style="width: auto !important; margin-top: 20px">
                    <el-button size="small" type="primary">点击上传协议</el-button>
                </el-upload>
                <el-button @click="ensureUpMore" type="primary"
                    style="height: 35px; position: relative; top: 20px">确认上传</el-button>
            </div>
        </el-dialog>
        <!-- ============================汇丰水位查询======================================================================================================================== -->
        <el-dialog :visible.sync="dialogHfWaterVisible" width="60%">
            <el-table :data="waterShow.list" border :summary-method="getSummaries" show-summary
                style="font-size: 16px;">
                <el-table-column prop="offerId" label="offerId">
                </el-table-column>
                <el-table-column prop="amount" label="水位值（美元）">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import xtable from '../Xtable.vue';
import {
    allotCredit,
    offerrRceived,
    searchStoreNew,
    saveShopOffer,
    deleteOffer,
    paymentUserShopUSD,
    applicationPhone,
    paymentLock,
    paymentClear,
    sendHuiFeng,
    paymentUserVerify,
    getLink,
    upMore,
    replaceOffer,
    getHfWater,
    isShowBtn,
    emaildraft,
    pspAuthFileList,
    deletePspAuthFile,
    getAutoEmailDetail,
    sendEmailWithFile, getShopWhitelist
} from '../../../api/index';
import {
    dhfqReceived,
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
    refreshAccountLockStatusDE,
    refreshAccountLockStatusUS,
    dhfqApproved,
    dhfqApproval,
    updateApproval,
    whiteListPass
} from '../../../api/boss1';
import CryptoJS from 'crypto-js';
export default {
    props: {
        pageData: {
            type: Array,
            default: []
        },
        // BEFORE_CREDIT("授信前回传", "BEFORE_CREDIT") 豆花,
        // AFTER_CREDIT("授信后回传", "AFTER_CREDIT"),
        lenderDataReturnType: {
            type: String,
            default: ''
        },
        amazonData: {
            type: Array,
            default: []
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
                if (this.lenderDataReturnType == 'BEFORE_CREDIT') {
                    newV.forEach((item) => {
                        item.interestRate = item.interestRate || 9;
                    });
                }
                this.amazonRequestData = newV;
                this.amazonRequestData2 = newV;
                this._amazonChangeInput();
            }
        },
        pageData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                if (!newV.length) return;
                this.pageDataNew = _.cloneDeep(newV);
                let localData = _.cloneDeep(newV);
                localData.forEach((item) => {
                    let txt = {
                        'SPECIALLY_APPROVED_CUSTOMERS': '特批客户',
                        'GUARANTEED_CUSTOMER': '担保客户',
                        'OTHER': '其他原因',
                    }
                    let lockStatusMap = {
                        'UNLOCK': '无锁',
                        'LOCK': '单锁',
                        'DOUBLE_LOCK': '双锁',
                        null: '未知状态',
                        '': '未知状态',
                        AUTOMATED_REPAYMENTS: '自动扣款',
                    }
                    item.paymentLockStatusText = lockStatusMap[item.paymentLockStatus];
                    item.amount2 = item.amount ? item.amount / 10000 : '';
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
                });
                // 新增：为每一项加offerIdMd5字段
                this.localPageData = localData.map(row => ({
                    ...row,
                    offerIdMd5: row.offerId ? CryptoJS.MD5(row.offerId).toString() : ''
                }));
                // console.log(newV);
                if (this.chooseRowIndex.toString()) {
                    this.chooseRow = localData[this.chooseRowIndex];
                }
                this.showPage = true;
                this.loanStatus = localData[0].loanStatus;
                this.applicationStatus = localData[0].applicationStatus;
            }
        }
    },
    created() {
        this.shopWhitelist()
        this.creditAmount = this.$route.query.creditAmount;
        // 汇丰美元-是否加白客户
        if (this.$route.query.lenderId == '46') {
            this.isWhiteList();
        }
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
        getSummaries(param) {
            const { columns, data } = param;
            let sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总水位';
                    return;
                } else {
                    sums[index] = this.waterShow.totalAmount.amount;
                }

            });

            return sums;
        },
        onZhaDaDataExport() {
            if (this.localPageData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            }
            let that = this;
            let dataObj = {
                offerIds: this.localPageData.map((x) => x.offerId),
                lenderId: 73,
                userId: this.$route.query.userId || this.localPageData[0].userId
            };
            const axios = require('axios');
            axios({
                method: 'post',
                data: dataObj,
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/scb/csv/zip`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data]);
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `渣打文件材料.zip`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        toGetHfWater() {
            let obj = {
                applicationCode: this.$route.query.loanNumber,
            }
            getHfWater(obj).then(res => {
                this.waterShow = res.data
                this.dialogHfWaterVisible = true
            })
        },
        handleSelectionChangeHf(val) {
            this.multipleSelection = val;
        },
        handleCloseLock() {
            this.showAccountLock = false;
        },
        //店铺列表更新
        toUpData() {
            this.$emit('upShopData')
            this.showSearchInfo = false
        },
        //offer替换
        changeOffer(row) {
            this.replaceoffer = {
                applicationCode: "",
                originalOfferIds: [],
                latestOfferIds: [],
                phone: ""
            },
                this.replaceoffer.applicationCode = this.$route.query.loanNumber
            this.replaceoffer.originalOfferIds.push(row.shopDuplicateOffer)
            this.replaceoffer.latestOfferIds.push(row.offerId)
            this.replaceoffer.userId = this.$route.query.userId
            replaceOffer(this.replaceoffer)
                .then((res) => {
                    this.$message.success("offer替换成功");
                    this.searchOfferId()
                })
                .catch((err) => {
                    this.loading = false;
                });


        },
        //上传
        handleAvatarSuccess4(res, file, fileList) {
            let obj = {};
            obj.docTitle = file.name;
            obj.viewpdfUrl = res.data[0].fullPath;
            obj.signType = 'OFFLINE';
            this.fddContractParams.push(obj);
        },
        handleExceed4(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleRemove4(file, fileList) {
            console.log(file);
            this.fddContractParams = this.fddContractParams.filter((item) => {
                return item.viewpdfUrl != file.response.data[0].fullPath;
            });
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
        //获取易签宝链接
        getLink() {
            this.getLinkLoading = true;
            getLink({
                applicationCode: this.$route.query.loanNumber
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        this.shopLinks = res.data;
                        this.isShowLInks = true;
                    }
                    this.getLinkLoading = false;
                })
                .catch((err) => {
                    this.getLinkLoading = false;
                });
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
                //查询授权文件上传状态
                this.getPspAuthFileList()
            });
        },

        // 汇丰美元-是否加白客户
        isWhiteList() {
            whiteListPass({
                userId: this.$route.query.userId
            }).then((res) => {
                if (res.data) {
                    this.isWhite = '是';
                } else {
                    this.isWhite = '否';
                }
            });
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
                    this.sendData.resourceCode = row.resourceCode;
                    batchArr = [this.sendData];
                }
                updateApproval(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showUpdateCreadit = false;
                });
            }
        },
        //关闭
        closeHfShow() {
            this.huifengShow = false;
        },
        //汇丰传输的表格选择事件
        sendHuiFeng() {
            if (this.sendHfObj.productType == 'EMF-ONBD') {
                console.log(16161, this.multipleSelection)
                if (this.multipleSelection.length === 0) {
                    return this.$message.warning('请选择数据');
                }
                this.sendHfObj.offerIds = this.multipleSelection.map((item) => {
                    return item.offerId;
                })
            }
            if (this.sendHfObj.productType == 'EMF-MNTR') {
                // 传全部offerId
                this.sendHfObj.offerIds = this.tableDataHf.map((item) => {
                    return item.offerId;
                })
            }
            this.loadingHf = true;
            sendHuiFeng(this.sendHfObj)
                .then((res) => {
                    this.$message.success('传输成功');
                    (this.sendHfObj = {
                        applicationCode: this.$route.query.loanNumber,
                        productType: 'EMF-ONBD'
                    }),
                        (this.loadingHf = false);
                    this.huifengShow = false;
                })
                .catch((err) => {
                    this.loadingHf = false;
                });
        },
        //确认传输给汇丰
        ensureSendHf() {
            this.huifengShow = true;
            if (this.sendHfObj.productType == 'EMF-ONBD') {
                this.loadingHf = true
                searchStoreNew({
                    userId: this.$route.query.userId,
                    applicationCode: this.$route.query.loanNumber
                }).then((res) => {
                    this.loadingHf = false
                    this.tableDataHf = res.data.map(row => ({
                        ...row,
                        offerIdMd5: row.offerId ? CryptoJS.MD5(row.offerId).toString() : ''
                    }))
                }).catch((err) => {
                    this.loadingHf = false
                })
            }
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
            console.log(rows);
            this.selectRowData = rows;
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
                this.localPageData.forEach((item) => {
                    arr.push(item.offerId);
                });
                res.data.forEach((rows, index) => {
                    if (!arr.join(',').includes(rows.offerId)) {
                        this.searchOfferData.push(rows);
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
                // item.hiddenBtn = item.applicationStatus != 'CONFIRMED' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                // item.disabled = item.applicationStatus != 'CONFIRMED';
                item.hiddenBtn = item.creditApprovalStatus == 'ACTIVE' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.creditApprovalStatus == 'ACTIVE';
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
        // 操作
        tableEvent(event, row, index) {
            console.log(this.amazonData);
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
                resourceCode: row.creditCode
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
            }
            isShowBtn({
                offerId: this.chooseRow.offerId,
                userId: this.userId
            }).then((res) => {
                this.isshowbtnStatus = res.data;
            });
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
            let batchArr = this.filterAmazonData(text, row);

            if (this.lenderDataReturnType == 'BEFORE_CREDIT') {
                dhfqApproval(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showApproval = false;
                });
            } else {
                approval(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showApproval = false;
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
            let batchArr = this.filterAmazonData(text, row);
            if (this.lenderDataReturnType == 'BEFORE_CREDIT') {
                dhfqReceived(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showReceived = false;
                });
            } else {
                received(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showReceived = false;
                });
            }
        },
        filterAmazonData(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(3),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: this.lenderDataReturnType == 'BEFORE_CREDIT' ? this.$route.query.loanNumber : item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceCode = this.lenderDataReturnType == 'BEFORE_CREDIT' ? this.$route.query.loanNumber : row.resourceCode;
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(3);
                this.sendData.tenure = row.tenure;
                batchArr = [this.sendData];
            }
            return batchArr;
        },
        // 通过申请 锁卡
        _approved(text, row) {
            let batchArr = this.filterAmazonData(text, row);

            if (this.lenderDataReturnType == 'BEFORE_CREDIT') {
                dhfqApproved(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showApproved = false;
                });
            } else {
                approved(batchArr).then((res) => {
                    this.$message.success('操作成功');
                    this.$emit('refreshDetail');
                    this.showApproved = false;
                });
            }
        },
        // 通过申请 不锁卡
        _approvedUnlock(text, row) {
            let batchArr = [];
            if (text == 'Batch') {
                this.selectRowData.forEach((item) => {
                    batchArr.push({
                        resourceAmount: item.resourceAmount,
                        interestRate: (item.interestRate / 100).toFixed(3),
                        tenure: item.tenure,
                        offerId: item.offerId,
                        resourceCode: item.resourceCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(3);
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
                res.data.forEach((item) => {
                    item.year1SalesValue = (item.year1SalesValue / 10000).toFixed(2);
                });
                this.splitData = res.data;
                this.btnLoading = false;
                this.split = true;
                this._changeInput();
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
            customerWritePaymentDetailVO: {},
            dialogHfWaterVisible: false,
            waterShow: {},
            replaceoffer: {
                applicationCode: "",
                originalOfferIds: [],
                latestOfferIds: [],
                phone: ""
            },
            offerIdsMore: [],
            pageDataNew: [],
            fileList4: [],
            //多个担保协议
            fddContractParams: [],
            uploadHeaders: { token: localStorage.getItem('token') },
            uploadMorePdf: process.env.VUE_APP_MORE,
            dialogTableVisible: false,
            getLinkLoading: false,
            isShowLInks: false,
            shopLinks: [],
            isWhite: '否',
            amazonRequestData2: [],
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
            showUpdateCreadit: false,
            huifengShow: false,
            allLoading: false,
            sendHfObj: {
                applicationCode: this.$route.query.loanNumber,
                productType: 'EMF-ONBD',
                offerIds: [],
                sendType: '1',
            },
            merchant: process.env.VUE_APP_MERCHANT,
            payFileUpload: process.env.VUE_APP_BASE_URL + '/lending/psp/authFile/fileUpload',
            fjUrl: process.env.VUE_APP_IMGS_BASE_URL,
            cardTypeText: {
                ID_CARD: '第二代居民身份证',
                HK_ID_CARD: '香港永久性居民身份证',
                PASSPORT: ' 护照',
                CERTIFICATE: '香港企业注册证书'
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
            showRepayment: false,
            showUnLock: false,
            showLock: false,
            chooseRowIndex: '',
            paymentUserAndBorrowerVO: {},
            shopPaymentAccountVO: {},
            borrowerApplicationDetailInfoVO: {},
            paymentVerifyResultVO: {},
            paymentDetailVO: {},
            showAccountLock: false,
            selectRowData: [], //多选框选出来的数据
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
            splitColumns3: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: '年回款额',
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
            applicationStatus: '',
            loanStatus: '',
            btnLoading: false,
            btnLoading2: false,
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
            columns2Base: [
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: '350'
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
                    prop: 'paymentName'
                },
                {
                    label: 'sellerID',
                    prop: 'sellerId'
                },
                {
                    label: this.$t('loan_detail_dpmc'),
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
                {
                    label: '国家',
                    prop: 'country',
                    width: 150
                },
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
                    label: '锁定状态',
                    prop: 'paymentLockStatusText',
                    width: 150
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
                    width: '250',
                    operates: [
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
                        }
                    ],
                    fixed: 'right'
                }
            ],
            tableDataHf: [],
            multipleSelection: [],
            loadingHf: false,
            isshowbtnStatus: false,
            paymentTypeTxt: {
                'PAYONEER_SPECIAL_REGULATION': '关于Dowsure服务的特别规定',
                'PAYONEER_PAYMENT_ACCOUNT_AUTHORIZATION': 'ARRON支付账户操作授权书',
                'PAYONEER_LENDING_PARTNER_FORM': 'Payoneer x Dowsure Lending Partner Consolidated form',
                'SKYEE_SKYEE_USER_AGREEMENT': 'SKYEE用户协议提现锁定及结汇提现之授权书',
                'SKYEE_INFORMATION_SERVICE_AUTHORIZATION': '信息服务授权书',
                'COGOLINKS_SERVICE_AUTHORIZATION': '服务授权书',
            },
            localPageData: [],
        };
    },
    computed: {
        columns2Filtered() {
            const base = this.columns2Base;
            if (this.$route.query.lenderId == '46') {
                return [
                    base[0], // offerId
                    {
                        label: '加密offerId',
                        prop: 'offerIdMd5',
                        width: '350'
                    },
                    ...base.slice(1)
                ];
            } else {
                return base;
            }
        }
    },
};
</script>
<style>
#uuuuuu {
    .el-upload--text {
        border: none;
        height: 30px;
    }
}
</style>
<style scoped></style>
