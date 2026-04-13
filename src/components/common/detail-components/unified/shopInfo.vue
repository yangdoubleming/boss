<template>
    <div style="margin-top:24px;padding-bottom:24px">
        <el-card style="margin-top:24px" shadow="hover">
            <div style="text-align:right;margin-bottom:10px">
                <!-- <el-button
                    type="primary"
                    @click="creditSplit"
                    :loading="btnLoading"
                    v-if="$showBtn('SHOP_INFO_CREDIT_SPLIT') && pageData && pageData.length>1"
                >授信拆分</el-button>-->
                <!-- <el-button type="primary" @click="openCalculation" :loading="calculationLoad">自动计算</el-button> -->
                <el-button type="primary" @click="openCalculationUpload" :loading="calculationUploadLoad">导出</el-button>
            </div>

            <xtable @edit="tableEvent" :columns="columns2" :detailTable="true" :tableData="pageData" />
        </el-card>
        <el-dialog title="操作" :visible.sync="showOperate" width="60%" top="24vh">
            <div style="display:flex;flex-wrap: wrap;">
                <el-card class="box-card" style="width:48%;margin-right:1px">
                    <div slot="header" class="clearfix1" style="height:15px">
                        <span>申请</span>
                    </div>
                    <el-button @click="openReceived"
                        :disabled="chooseRow.applicationStatus != 'CREATED'">收到申请</el-button>
                    <el-button @click="oepnApproved"
                        :disabled="chooseRow.applicationStatus != 'RECEIVED'">通过申请（锁卡）</el-button>
                    <el-button :disabled="chooseRow.applicationStatus != 'RECEIVED'"
                        @click="openApprovedUnlock">通过申请（不锁卡）</el-button>
                </el-card>
                <el-card class="box-card" style="width:48%;">
                    <div slot="header" class="clearfix1" style="height:15px">
                        <span>锁卡</span>
                    </div>
                    <el-button @click="openLock"
                        :disabled="chooseRow.accountLockStatus == 'UNLOCKED' || chooseRow.accountLockStatus == 'PARTNER_CONFIRMED' ? true : chooseRow.accountLockStatus == 'LOCKED' ? false : ''">确认锁卡</el-button>
                    <el-button @click="openUnLock"
                        :disabled="chooseRow.accountLockStatus == 'UNLOCKED' || chooseRow.accountLockStatus == 'PARTNER_CONFIRMED' ? true : chooseRow.accountLockStatus == 'LOCKED' ? false : ''">解锁账户</el-button>
                    <!-- <el-button @click="_resetAl">重置AL</el-button> -->
                    <el-button @click="_refreshAccountLockStatusUS">刷新(美国站)</el-button>
                    <el-button @click="_refreshAccountLockStatusDE">刷新(德国站)</el-button>
                </el-card>
                <el-card class="box-card" style="width:48%;margin-bottom:30px;margin-right:1px">
                    <div slot="header" class="clearfix1" style="height:15px">
                        <span>授信</span>
                    </div>
                    <el-button
                        :disabled="chooseRow.accountLockStatus != 'PARTNER_CONFIRMED' || chooseRow.creditApprovalStatus != 'UN_ACTIVE'"
                        @click="openApproval">创建授信</el-button>
                    <el-button @click="_closeCredit" :disabled="chooseRow.loanStatus != 'CLOSED'">关闭授信</el-button>
                </el-card>
                <el-card class="box-card" style="width:48%;margin-bottom:30px;">
                    <div slot="header" class="clearfix1" style="height:15px">
                        <span>贷款</span>
                    </div>
                    <!-- <el-button @click="_createLoan">{{ $t('loan_detail_cjdk') }}</el-button> -->
                    <el-button :disabled="chooseRow.loanStatus == 'UN_ACTIVE'" @click="oepnRepayment">还款</el-button>
                    <el-button :disabled="chooseRow.loanStatus == 'UN_ACTIVE'" @click="_closeLoan">关闭贷款</el-button>
                </el-card>
            </div>
        </el-dialog>

        <!-- ============================自动计算======================================================================================================================== -->
        <el-dialog title="自动计算" :visible.sync="showCalculation" width="55%" top="24vh">
            <xtable v-if="showCalculation" :columns="splitColumns3" :detailTable="true" :tableData="calculationData"
                @edit="_calculation" :isShowSelection="true" @select="calculationSelectRow" ref="bossTabel"
                @changeInput="_calculationChangeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ calculationTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCalculation = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="success" @click="$emit('openCreditInfo')">{{ $t('loan_detail_sp') }}</el-button>
                <el-button type="primary" @click="_calculation('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================自动计算结束======================================================================================================================== -->

        <!-- ============================收到申请======================================================================================================================== -->
        <el-dialog title="收到申请" :visible.sync="showReceived" width="55%" top="24vh">
            <xtable v-if="showReceived" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_received" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showReceived = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_received('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================收到申请结束======================================================================================================================== -->

        <!-- ============================通过申请（锁卡）======================================================================================================================== -->
        <el-dialog title="通过申请（锁卡）" :visible.sync="showApproved" width="55%" top="24vh">
            <xtable v-if="showApproved" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approved" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApproved = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_approved('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================通过申请（锁卡） 结束======================================================================================================================== -->

        <!-- ============================通过申请（不锁卡）======================================================================================================================== -->
        <el-dialog title="通过申请（不锁卡）" :visible.sync="showApprovedUnlock" width="55%" top="24vh">
            <xtable v-if="showApprovedUnlock" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approvedUnlock" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApprovedUnlock = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_approvedUnlock('Batch')"
                    style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>

        <!-- ============================创建授信======================================================================================================================== -->
        <el-dialog title="创建授信" :visible.sync="showApproval" width="55%" top="24vh">
            <xtable v-if="showApproval" :columns="splitColumns" :detailTable="true" :tableData="amazonRequestData"
                @edit="_approval" :isShowSelection="true" @select="selectRow" ref="bossTabel"
                @changeInput="_amazonChangeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ amazonTotalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showApproval = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_approval('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================创建授信结束======================================================================================================================== -->

        <!-- ============================授信拆分======================================================================================================================== -->

        <el-dialog title="授信拆分" :visible.sync="split" width="40%" top="24vh">
            <div style="margin-bottom:30px">
                批复授信总金额
                <el-input style="width:300px;margin-left:10px" :disabled="true" v-model="creditAmount">
                    <template slot="append">万(人民币)</template>
                </el-input>
            </div>
            <xtable :columns="columns" :detailTable="true" :tableData="splitData" @changeInput="_changeInput" />
            <div style="margin-top:10px;text-align:right;padding-right:10px">输入总金额：{{ totalMoney }} 万</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="split = false" style="width:80px;height:35px">取 消</el-button>
                <!-- <el-button type="primary" @click="_offerrRceived" style="width:80px;height:35px">提 交</el-button> -->
            </div>
        </el-dialog>
        <!-- ============================授信拆分结束======================================================================================================================== -->

        <el-dialog title="查询结果" :visible.sync="showSearchInfo" width="55%" top="24vh">
            <el-table :data="searchOfferData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" ref="multiple">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="offerId" label="offerID"></el-table-column>
                <el-table-column prop="sellerIds" label="sellerID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bindTime" label="绑定时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showSearchInfo = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="addOfferId" style="width:80px;height:35px">添 加</el-button>
            </div>
        </el-dialog>

        <!-- ============================确认锁卡======================================================================================================================== -->
        <el-dialog title="确认锁卡" :visible.sync="showLock" width="42%" top="24vh">
            <xtable v-if="showLock" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_lock" :isShowSelection="true" @select="selectRow" ref="bossTabel" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="showLock = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_lock('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================确认锁卡结束======================================================================================================================== -->

        <!-- ============================解锁======================================================================================================================== -->
        <el-dialog title="解锁" :visible.sync="showUnLock" width="42%" top="24vh">
            <xtable v-if="showUnLock" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_unlock" :isShowSelection="true" @select="selectRow" ref="bossTabel" />

            <div slot="footer" class="dialog-footer">
                <el-button @click="showUnLock = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_unlock('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================解锁结束======================================================================================================================== -->

        <!-- ============================还款======================================================================================================================== -->
        <el-dialog title="还款" :visible.sync="showRepayment" width="42%" top="24vh">
            <xtable v-if="showRepayment" :columns="splitColumns2" :detailTable="true" :tableData="amazonRequestData"
                @edit="_repayment" :isShowSelection="true" @select="selectRow" ref="bossTabel" />

            <div slot="footer" class="dialog-footer">
                <el-button @click="showRepayment = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_repayment('Batch')" style="width:80px;height:35px">批量提交</el-button>
            </div>
        </el-dialog>
        <!-- ============================还款结束======================================================================================================================== -->
    </div>
</template>

<script>
import xtable from '../../Xtable.vue';
import { allotCredit, offerrRceived, saveShopOffer, deleteOffer } from '../../../../api/index';
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
    calculation
} from '../../../../api/boss1';
export default {
    props: {
        pageData: {
            type: Array,
            default: []
        },
        amazonData: {
            type: Array,
            default: []
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

                this._amazonChangeInput();
            }
        },
        pageData: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                if (!newV.length) return;

                newV.forEach((item) => {
                    item.hiddenBtn = item.loanStatus === 'ACTIVE' ? '' : '关闭授信';
                    item.hiddenBtn = item.loanStatus === 'ACTIVE' ? '' : '关闭贷款';
                    item.amount2 = item.amount ? (item.amount / 10000) : ''

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
        this.creditAmount = this.$route.query.creditAmount;
    },

    methods: {
        openCalculationUpload() {
            if (!this.pageData.length) {
                return this.$message.info('暂无数据！');
            }
            this.calculationUploadLoad = true;
            let that = this;
            let fileName = '';
            let arr = [];
            this.pageData.forEach((item) => {
                arr.push({
                    offerId: item.offerId,
                    resourceCode: this.pageData[0].applicationCode
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
            this.pageData.forEach((item) => {
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
                })
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
                        resourceCode: this.pageData[0].applicationCode
                    });
                });
            } else {
                this.sendData.resourceAmount = row.resourceAmount;
                this.sendData.interestRate = (row.interestRate / 100).toFixed(4);
                this.sendData.tenure = row.tenure;
                this.sendData.offerId = row.offerId;
                this.sendData.resourceCode = this.pageData[0].applicationCode;
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
                item.hiddenBtn = item.applicationStatus != 'CONFIRMED' ? (item.hiddenBtn += '提交') : item.hiddenBtn;
                item.disabled = item.applicationStatus != 'CONFIRMED';
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

        // 操作
        tableEvent(event, row, index) {

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
                resourceCode: row.applicationCode
            };
            // console.log(this.chooseRow);

            if (event === 'openOperate') {
                this.showOperate = true;
            }
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
        }
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            calculationData: [], // 自动计算数据
            showCalculation: false, //自动计算弹窗
            calculationLoad: false, //自动计算load状态
            calculationTotalMoney: 0, //自动计算总金额
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
            columns2: [
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
                    label: '授权时间',
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
                    label: '收款账户锁定状态',
                    prop: 'lockStatus',
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
                    label: this.$t('loan_detail_sdlx'),
                    prop: 'paymentLockStatus',
                    width: 80
                },

                {
                    label: this.$t('loan_detail_sdsj'),
                    prop: 'lockTime',
                    width: 150
                },

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '200',
                //     operates: [
                //         {
                //             event: 'openOperate',
                //             text: '操作',
                //             type: 'waring',
                //             code: 'SHOP_INFO_OPERATION'
                //         },
                //         {
                //             event: 'deleteOfferId',
                //             text:this.$t('loan_detail_delete'),
                //             type: ''
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    }
};
</script>

<style scoped></style>