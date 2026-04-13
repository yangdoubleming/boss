<template>
    <div class="service">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">逾期管理详情</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                借款人信息
            </div>
            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="借款人名称" prop="bname">
                    <span class="text">{{ $route.query.bname || '-' }}</span>
                </el-form-item>
                <el-form-item label="借款人手机号" prop="bphoneNumber">
                    <span class="text">{{ $route.query.bphoneNumber || '-' }}</span>
                </el-form-item>
                <el-form-item label="授信金额" prop="creditAmount">
                    <span class="text">{{ loanInfo.creditAmount || '-' }}</span>
                </el-form-item>
                <el-form-item label="贷款金额" prop="loanAmount">
                    <span class="text">{{ loanInfo.loanAmount || '-' }}</span>
                </el-form-item>
                <el-form-item label="逾期金额合计" prop="overdueAmount">
                    <span class="text">{{ loanInfo.overdueAmount || '-' }}</span>
                </el-form-item>
                <el-form-item label="逾期本金合计" prop="overduePrincipal">
                    <span class="text">{{ loanInfo.overduePrincipal || '-' }}</span>
                </el-form-item>
                <el-form-item label="逾期利息合计" prop="overdueInterest">
                    <span class="text">{{ loanInfo.overdueInterest || '-' }}</span>
                </el-form-item>

                <div class="block">
                    <div class="line"></div>
                    支付公司传数情况
                </div>
                <el-table :data="paymentRecord" header-align="center"
                    style="width:1450px; margin-left: 100px;margin-bottom: 50px;">

                    <el-table-column prop="paymentName" label="支付公司名称" width="" align="center"></el-table-column>
                    <el-table-column prop="loanAmount" label="传数金额" width="" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="传数日期" width="" align="center"></el-table-column>
                    <!-- 非浦发 -->
                    <el-table-column label="操作" align="center" v-if="!isPufa">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" v-if="scope.row.limitedStatus == '1'"
                                :disabled="true">划扣中</el-button>
                            <el-button size="mini" :disabled="scope.row.isDisable" type="danger"
                                v-if="scope.row.limitedStatus == '0'" @click="_tableEvent(scope.row)">强制划扣</el-button>
                            <!-- 空中云汇专属按钮 -->
                            <el-button size="mini" type="danger" v-if="scope.row.isHKZH" @click="kzyhFreeze(scope.row)"
                                :loading="kzyhLoading">冻结支付</el-button>
                        </template>
                    </el-table-column>
                    <!-- 浦发 -->
                    <el-table-column label="操作" align="center" v-if="isPufa">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" v-if="scope.row.limitedStatus == '1'"
                                :disabled="true">划扣中</el-button>
                            <el-button :disabled="scope.row.isDisable" size="mini" type="danger"
                                v-if="scope.row.limitedStatus == '0'" @click="_tableEvent(scope.row)">强制划扣</el-button>
                            <el-button size="mini" type="danger" v-if="scope.row.isPp"
                                @click="ppWithdrawLimit(scope.row)">冻结账户</el-button>
                            <!-- 空中云汇专属按钮 -->
                            <el-button size="mini" type="danger" v-if="scope.row.isHKZH" :loading="kzyhLoading"
                                @click="kzyhFreeze(scope.row)">冻结支付</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form>
            <div class="block">
                <div class="line"></div>
                冻结历史记录
            </div>
            <el-table :data="limitRecordList" header-align="center"
                style="width:1450px; margin-left: 100px;margin-bottom: 50px;">
                <el-table-column prop="paymentName" :label="$t('home_zfgs')" width="" align="center"></el-table-column>
                <el-table-column prop="limitedAmount" label="申请划扣金额" width="" align="center"></el-table-column>
                <el-table-column prop="deductCurrency" label="币种" width="" align="center"></el-table-column>
                <el-table-column prop="submitDeductTime" label="申请日期" width="" align="center"></el-table-column>
                <el-table-column prop="limitedRelieveTime" label="停止日期" width="" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" v-if="scope.row.limitedStatus == '2'"
                            @click="ppWithdrawLimitCancel(scope.row)">解冻账户</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <div class="line"></div>
                强制划扣申请
            </div>
            <el-table :data="coerciveMeasuresApply" header-align="center"
                style="width:1450px; margin-left: 100px;margin-bottom: 50px;">
                <el-table-column prop="paymentName" :label="$t('home_zfgs')" width="" align="center"></el-table-column>
                <el-table-column prop="limitedAmount" label="申请划扣金额" width="" align="center"></el-table-column>
                <el-table-column prop="deductCurrency" label="币种" width="" align="center"></el-table-column>
                <el-table-column prop="submitDeductTime" label="申请日期" width="" align="center"></el-table-column>
                <el-table-column prop="limitedRelieveTime" label="停止日期" width="" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" :disabled="scope.row.limitedStatus == '0'"
                            @click="_applyCancel(scope.row)">取消划扣</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <div class="block">
                <div class="line"></div>
                强制划扣结果
            </div>
            <el-table :data="coerciveMeasuresResult" header-align="center"
                style="width:1450px; margin-left: 100px;margin-bottom: 100px;">
                <el-table-column prop="paymentName" :label="$t('home_zfgs')" width="" align="center"></el-table-column>
                <el-table-column prop="remainInterestAmount" label="实际划扣金额" width="" align="center"></el-table-column>
                <el-table-column prop="remainPenaltyAmount" label="币种" width="" align="center"></el-table-column>
                <el-table-column prop="currentRepaymentAmount" label="划扣日期" width="" align="center"></el-table-column>
            </el-table> -->
            <div class="block">
                <div class="line"></div>
                跟进记录
            </div>
            <el-table :data="overdueNote" header-align="center"
                style="width:1450px; margin-left: 100px;margin-bottom: 50px;">
                <el-table-column prop="followTime" label="记录时间" width="" align="center"></el-table-column>
                <el-table-column prop="recorder" label="记录人" width="" align="center"></el-table-column>
                <el-table-column prop="followContent" label="记录内容" width="" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="_showRecords(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="_overdueNoteDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 修改跟进记录 -->
        <el-dialog title="修改跟进记录" :visible.sync="dialogFollow" width="600px">
            <el-form :model="followForm" ref="followForm" label-width="100px" class="demo-followForm">
                <el-form-item label="时间" prop="">
                    <el-date-picker v-model="followForm.followTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="跟进内容" prop="">
                    <el-input v-model="followForm.followContent" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFollow = false">取消</el-button>
                    <el-button type="primary" @click="_followRecords('followForm')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getOverdueNoteList, getPaymentLoanList, overdueNoteUpdate, overdueNoteDelete, getOverdueDeductionRecordList } from '../../../api/statistics';
import { disburseInfo } from '../../../api/index';
import { ll, kzyh, pp, wy, llCancel, wyCancel, searchStatusLL, searchStatusPP, searchStatusWY, ppWithdrawLimit, ppWithdrawLimitCancel } from '../../../api/boss1'
export default {
    data() {
        return {
            kzyhLoading: false,
            applyButten: '',
            dialogFollow: false,
            dialogCoerciveMeasures: false,
            overdueNote: [],
            loanInfo: {},
            paymentRecord: [],
            formData: {},
            limitRecordList: [],
            coerciveMeasuresApply: [],
            coerciveMeasuresResult: [],
            followForm: {
                id: '',
                followTime: '',
                followContent: ''
            },
            coerciveMeasuresForm: {},
            isPufa: false,
        };
    },
    created() {
        if (this.$route.query.lenderId == 9 || this.$route.query.lenderId == 47) {
            this.isPufa = true

        }
        disburseInfo(this.$route.query.loanCode).then(res => {
            this.loanInfo = res.data
        })

        this._getOverdueNoteList()
        this._getOverdueDeductionRecordList()

    },
    mounted() {
        getPaymentLoanList(this.$route.query.loanCode).then(res => {

            res.data.forEach(item => {
                if (this.isPufa) {
                    if (item.paymentCode == 'P2') {
                        item.isDisable = true
                    }
                    if (item.paymentCode == 'P3') {
                        item.isPp = true
                        item.isDisable = true
                    }
                    if (item.paymentCode == 'P10') {
                        item.isHKZH = true
                        item.isDisable = true
                    }
                } else {
                    if (item.paymentCode == 'P10') {
                        item.isHKZH = true
                        item.isDisable = true
                    }
                }
            });


            this.paymentRecord = res.data

        })
    },
    methods: {
        _applyCancel(row) {
            this.paymentCode = row.paymentCode
            this.$confirm('请确认是否取消强制划扣?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                if (row.paymentCode == 'P2') {
                    llCancel(row.contractNumber).then(res => {
                        if (res.data) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
                        }

                    })
                } else if (row.paymentCode == 'P3') {
                    this.$message.success('操作成功')
                } else if (row.paymentCode == 'P8') {
                    wyCancel(row.contractNumber).then(res => {
                        if (res.data) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
                        }
                    })
                } else {
                    this.$message.warning('暂不支持！')
                }
            });
        },
        _getOverdueDeductionRecordList() {
            getOverdueDeductionRecordList(this.$route.query.loanCode).then(res => {
                this.coerciveMeasuresApply = res.data.filter(item => {
                    return item.limitedStatus != 2 && item.limitedStatus != 3
                })
                this.limitRecordList = res.data.filter(item => {
                    return item.limitedStatus == 2 || item.limitedStatus == 3
                })
            })
        },
        _overdueNoteDelete(val) {
            this.$confirm('请确认是否删除记录?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                overdueNoteDelete(val.id).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this._getOverdueNoteList()
                    } else {
                        this.$message({
                            message: '发生错误，请联系管理员。',
                            type: 'error'
                        });
                    }
                })

            });
        },
        _getOverdueNoteList() {
            getOverdueNoteList(this.$route.query.loanCode).then(res => {
                this.overdueNote = res.data
            })
        },
        _showRecords(val) {
            this.dialogFollow = true
            this.followForm.id = val.id
            this.followForm.followTime = val.followTime
            this.followForm.followContent = val.followContent
        },
        _followRecords() {
            overdueNoteUpdate({
                id: this.followForm.id,
                followTime: this.followForm.followTime,
                followContent: this.followForm.followContent,
            }).then(res => {
                this._getOverdueNoteList()
                this.$message.success('操作成功')
                this.dialogFollow = false
            })
        },
        _tableEvent(row) {
            this.paymentCode = row.paymentCode
            let value = this.loanInfo.overdueAmount
            this.$confirm('请确认是否发起强制划扣?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                if (row.paymentCode == 'P2') {
                    ll(value, row.contractNumber).then(res => {
                        if (res.data) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
                        }

                    })
                } else if (row.paymentCode == 'P3') {
                    pp(value, row.loanCode).then(res => {
                        if (res.data) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
                        }
                    })
                } else if (row.paymentCode == 'P8') {
                    wy(value, row.contractNumber).then(res => {
                        if (res.data) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
                        }
                    })
                } else {
                    this.$message.warning('暂不支持！')
                }
            });
        },
        ppWithdrawLimit(row) {
            this.paymentCode = row.paymentCode
            let value = this.loanInfo.overdueAmount
            ppWithdrawLimit(value, this.$route.query.loanCode).then(res => {
                if (res.data) {
                    this.$message.success('操作成功')
                } else {
                    this.$message.error('操作失败')
                }
            }).catch(err => {
                this.$message.error(err.message || err.msg)
            })
        },
        ppWithdrawLimitCancel(row) {
            this.paymentCode = row.paymentCode
            let value = this.loanInfo.overdueAmount
            ppWithdrawLimitCancel(value, this.$route.query.loanCode).then(res => {
                if (res.data) {
                    this.$message.success('操作成功')
                } else {
                    this.$message.error('操作失败')
                }
            }).catch(err => {
                this.$message.error(err.message || err.msg)
            })
        },
        //空中云汇冻结
        kzyhFreeze(row) {
            this.kzyhLoading = true
            kzyh({
                applicationCode: row.applicationCode
            }).then(res => {
                this.kzyhLoading = false
                this.$message.success('操作成功')
            }).catch(err => {
                this.$message.error(err.message || err.msg)
                this.kzyhLoading = false
            })
        }
    }
};
</script>

<style lang="less">
.service {
    .text {
        width: 280px;
        display: block;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .block {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        width: 100%;
        padding-left: 32px;
        margin: 24px 0;
        font-size: 18px;
        color: #323232;
        letter-spacing: 0;
        text-align: justify;
        line-height: 26px;
        font-weight: 500;

        .note {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #646566;
            letter-spacing: 0;
            text-align: justify;
            line-height: 26px;
            font-weight: 400;
            padding-left: 12px;
        }

        .line {
            width: 4px;
            height: 16px;
            background: #E52D6D;
            margin-right: 8px;


        }
    }

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