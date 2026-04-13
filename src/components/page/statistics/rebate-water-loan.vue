<template>
    <div v-loading="loading">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.loanCode" placeholder="贷款编号"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-select v-model="ruleForm.loanStatus" placeholder="当前状态" style="width: 100%">
                                    <el-option v-for="(item, index) in orderStatusStr" :key="index" :label="item"
                                        :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.rewardType" placeholder="返佣类型" style="width: 100%">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="推荐返佣" value="1"></el-option>
                                    <el-option label="代理返佣" value="2"></el-option>
                                    <el-option label="补充返佣" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="timeC">
                                <el-date-picker v-model="dateTime" type="daterange" range-separator="-"
                                    start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-row>
                        <el-row style="display: flex; margin-top: 25px">
                            <el-form-item>
                                <el-input v-model="ruleForm.nameOrCode" placeholder="合伙人姓名/邀请码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.dataStatus" placeholder="佣金状态" style="width: 100%">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="待审批" value="1"></el-option>
                                    <el-option label="已生效 " value="2"></el-option>
                                    <el-option label="已结算" value="3"></el-option>
                                    <el-option label="已拒绝" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.levelName" placeholder="一级合伙人姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.paymentType" placeholder="佣金支付状态" style="width: 100%">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="待结算" value="NOT_SETTLE"></el-option>
                                    <el-option label="已结清 " value="SETTLE"></el-option>
                                </el-select>
                            </el-form-item>

                        </el-row>
                        <div class="button" style=" margin-top: 25px">
                            <el-button type="primary" @click="searchData">搜索</el-button>
                            <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            <el-button @click="exportDetail" type="primary" style="width: 110px">导出返佣明细</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">贷款合伙人返佣流水</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="levelName" label="一级合伙人姓名" align="center" width="150"> </el-table-column>
                    <el-table-column prop="levelPhone" label="一级合伙人手机号" align="center" width="140"></el-table-column>
                    <el-table-column prop="userName" label="合伙人姓名" align="center" width="100"> </el-table-column>
                    <el-table-column prop="userIphone" label="合伙人手机号" align="center" width="140"> </el-table-column>
                    <el-table-column prop="customerName" label="客户姓名" align="center" width="140"> </el-table-column>
                    <el-table-column prop="customerIphone" label="客户手机号" align="center" width="140"> </el-table-column>
                    <el-table-column prop="customerOrderNumber" label="贷款编号" align="center" width="250">
                    </el-table-column>
                    <el-table-column prop="moneyInterestRate" label="返佣系数（%）" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="channelLevelRate" label="等级倍率（%）" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="lenderProductName" label="客户贷款产品" align="center" width="220">
                    </el-table-column>
                    <el-table-column prop="loanAmount" label="支用金额/元 " align="center"> </el-table-column>
                    <el-table-column prop="loanStartDate" label="支用时间" align="center" width="220"> </el-table-column>
                    <el-table-column prop="repaymentMethod" label="还款方式" align="center" width="200"> </el-table-column>
                    <el-table-column prop="loanStatus" label="当前状态" align="center"> </el-table-column>
                    <el-table-column prop="loanBalance" label="当前在贷金额" align="center" width="150"> </el-table-column>
                    <el-table-column prop="moneyOrderAmount" label="历史结算佣金/元" align="center" width="150">
                    </el-table-column>
                    <el-table-column label="上月待结算/元" prop="lastMonthAmount" align="center"
                        width="150"></el-table-column>
                    <el-table-column label="本月累计佣金/元 " prop="monthAmount" align="center" width="150"></el-table-column>
                    <el-table-column label='预计待结算/元' prop="futureAmount" align="center" width="150"></el-table-column>
                    <!-- <el-table-column prop="rewardType" label="返佣类型" align="center"> </el-table-column> -->
                    <el-table-column prop="customerType" label="客户类型" align="center"> </el-table-column>
                    <el-table-column prop="dataStatus" label="佣金状态" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="返佣时间" align="center" width="160"> </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" width="280px" fixed="right">
                        <template slot-scope="scope">
                            <div v-if="scope.row.dataStatus == '待审批'">
                                <a  style="color: #fe1964; cursor: pointer; margin-right: 20px" @click="updateCommissionRate(scope.row)">返佣系数修改</a>
                                <a @click="ensurePass(scope.row)"
                                    style="color: #fe1964; cursor: pointer; margin-right: 20px">审批通过</a>
                                <a @click="ensureRefuse(scope.row)" style="color: #fe1964; cursor: pointer">审核拒绝</a>
                            </div>
                            <span v-else>--</span>
                        </template></el-table-column>
                </el-table>
                <!-- <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="currentChange"
                    style="text-align: right; margin: 40px 20px"
                >
                </el-pagination> -->
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :current-page.sync="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize"
                    layout="sizes, prev, pager, next" :total="total" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="佣金系数修改" :visible.sync="dialogFormVisible" width="23%">
            <el-form  label-width="124px" class="editForm">
                <el-form-item label="当前修改借款单：">
                    <span style="width: 200px">{{editForm.customerOrderNumber}}</span>
                </el-form-item>
                <el-form-item label="借款人姓名：" >
                    <span style="width: 200px">{{editForm.customerName}}</span>
                </el-form-item>
                <el-form-item label="借款日期：" >
                    <span style="width: 200px">{{editForm.loanStartDate}}</span>
                </el-form-item>
                <el-form-item label="合伙人姓名：" >
                    <span style="width: 200px">{{editForm.userName }}</span>
                </el-form-item>
                <el-form-item label="修改后返佣系数：">
                    <div class="updateRate"><el-input v-model="num" type="number"  placeholder="请输入数字"
                              style="width: 80%"></el-input><span style="width: 32px" class="rate-icon">%</span></div>
                </el-form-item>
                <el-icon name="warning-outline"></el-icon><span style="margin-left: 5px">修改后本月佣金将重新按最新的系数计算</span>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateInterestRate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {  ensurePass, getRebateDetailsList, ensureRefuse,updateMoneyInterestRate } from '@/api/insur';
import moment from 'moment';
export default {
    name: 'rebate-water',
    data() {
        return {
            num:null,
            loading: false,
            ruleForm: {
                dataStatus: '', //佣金状态
                loanCode: '',
                loanStatus: '',
                rewardType: '', // 返佣类型
                nameOrCode: '', // 合伙人姓名/邀请码
                dateStart: '',
                dateEnd: '',
                page: 1,
                rows: 10,
                paymentType: '',
                levelName: ""
            },
            currentPage: 1,
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            dialogFormVisible:false,
            baseUrl: process.env.VUE_APP_LTEXT_URL,
            orderStatus: ['CREATED', 'DISBURSE_SUCESS', 'DISBURSE_FAILED', 'OVERDUE', 'REPAYMENT', 'CLOSED', 'CLEAR'],
            orderStatusStr: ['创建', '放款成功', '放款失败', '已逾期', '还款中', '已关闭', '已结清'],
            editForm:[],
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        //返佣系数
        updateCommissionRate(row) {
            this.editForm = row
            this.dialogFormVisible = true;
        },
        //审批通过
        ensurePass(row) {
            this.loading = true
            ensurePass({ id: row.id }).then((res) => {
                if (res.code == 200) {
                    this.loading = false
                    this.$message.success('审批通过');
                    this.getDataList();
                }
            }).catch(err => {
                this.$message.error(err.message);
                this.loading = false
            })
        },
        //审批拒绝
        ensureRefuse(row) {
            this.loading = true
            ensureRefuse({ id: row.id }).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.$message.success('审批拒绝');
                    this.getDataList()
                }
            })
        },
        // 确定修改返佣系数
        updateInterestRate() {
            const params = {id:this.editForm.id,moneyInterestRate:Number(this.num)}
            updateMoneyInterestRate(params).then((res) => {
                    if (res.code == 200) {
                        this.loading = false
                        this.$message.success('修改成功');
                        this.getDataList()
                    }
            }
            )
            this.dialogFormVisible = false;

        },
        searchData() {
            this.ruleForm.dateStart = this.dateTime && this.dateTime.length ? this.dateTime[0] : '';
            this.ruleForm.dateEnd = this.dateTime && this.dateTime.length ? this.dateTime[1] : '';
            this.ruleForm.page = 1;
            this.currentPage = 1;
            // console.log(this.ruleForm)
            this.getDataList();
        },
        exportDetail() {
            // window.open(this.uploadUrl + `/template/download`);
            const axios = require('axios');
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.baseUrl}/admin/Loan/exportRebateDetailsList`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `贷款返佣明细${moment().format('YYYYMMDD')}.xls`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error.data);
                });
        },
        getDataList() {
            let obj = JSON.parse(JSON.stringify(this.ruleForm));
            if (this.ruleForm.loanStatus) {
                obj.loanStatus = this.orderStatusStr[this.ruleForm.loanStatus];
            }

            getRebateDetailsList({ data: obj, path: '/Loan/getRebateDetailsList' }).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    res.data.records.forEach((item) => {
                        item.productType =
                            item.productType == '1'
                                ? '推荐返佣'
                                : item.productType == '2'
                                    ? '代理返佣'
                                    : item.productType == '3'
                                        ? '补充返佣'
                                        : '';
                        item.dataStatus =
                            item.dataStatus == '1' ? '待审批' : item.dataStatus == '2' ? '已生效' : item.dataStatus == '3' ? '已结算' : item.dataStatus == '0' ? '已拒绝' : '';
                        // 转状态
                        item.loanStatus = this.orderStatus.indexOf(item.loanStatus).toString()
                            ? this.orderStatusStr[this.orderStatus.indexOf(item.loanStatus)]
                            : '';
                    });

                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            }).catch(err => {
            })
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.rows = val;
            this.ruleForm.page = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm.loanCode = '';
            this.ruleForm.loanStatus = '';
            this.ruleForm.rewardType = '';
            this.ruleForm.nameOrCode = '';
            this.ruleForm.dateStart = '';
            this.ruleForm.dateEnd = '';
            this.ruleForm.dataStatus = '';
            this.ruleForm.levelName = ''
            this.ruleForm.paymentType = ''
            this.dateTime = [];
        }
    }
};
</script>

<style lang="less" scoped>
.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }

    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            // width: 280px;
            width: 100%;
        }
    }

    .button {

        // width: 300px;
        .el-button {
            width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(8) {
            .cell {
                color: #fe1964;
            }
        }

        // td:nth-child(3) {
        //     .cell {
        //         color: #fe1964;
        //     }
        // }
    }
}
/deep/.editForm {
    .el-form-item__label {
        text-align: left!important;
        color: #000;
    }

}
/deep/.el-dialog__body{
    padding: 20px 30px!important;
}
/deep/.el-dialog__header{
    padding: 20px 30px 10px;
}
.updateRate{
    display: flex;
    /deep/.el-input__inner{
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
    }
}
.rate-icon{
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #eeeeee;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
</style>
