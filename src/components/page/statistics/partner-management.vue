<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />保险后台 / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">合伙人总数</span>
                            <span class="grid-num2">{{ amountSum.userCount }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">总返佣（预计）</span>
                            <span class="grid-num2">{{ amountSum.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">已结算</span>
                            <span class="grid-num2">{{ amountSum.settlementAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待结算</span>
                            <span class="grid-num2">{{ amountSum.beSettlementAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待生效</span>
                            <span class="grid-num2">{{ amountSum.beEffectiveAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-select v-model="ruleForm.level" placeholder="合伙人类型" style="width: 100%">
                                    <el-option label="一级合伙人" value="1"></el-option>
                                    <el-option label="二级合伙人" value="2"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select v-model="ruleForm.registerType" placeholder="注册类型" style="width: 100%">
                                    <el-option label="贷款" value="LOAN"></el-option>
                                    <el-option label="保险" value="INSURANCE"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-right: 0">
                                <el-input v-model="ruleForm.code" placeholder="邀请码"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row style="display: flex; margin-top: 20px">
                            <el-form-item class="timeC">
                                <el-date-picker
                                    v-model="dateTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="注册起始日"
                                    end-placeholder="注册截止日"
                                    value-format="yyyy-MM-dd"
                                    :clearable="clearable"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.scrmName" placeholder="邀请人"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.scrmDepartment" placeholder="所属部门"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.type" placeholder="渠道分类" style="width: 100%">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="公司" value="CHANNEL"></el-option>
                                    <el-option label="个人" value="PARTNER"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.customerNumber" placeholder="客户手机号"></el-input>
                            </el-form-item>
                        </el-row>
                        <div class="button" style="margin-top: 20px">
                            <el-button type="primary" @click="searchData">搜索</el-button>
                            <el-button @click="reset" style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                            <el-button type="primary" @click="exportExcel" style="margin-left: 10px" :disabled="disabled">导出</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; color: #666; font-size: 15px; display: flex">
                <div class="left" style="font-weight: 700; flex: 1">
                    合伙人管理列表
                    <el-select v-model="ruleForm.sortType" placeholder="合伙人类型" style="margin-left: 20px" @change="changeSort">
                        <el-option label="按注册时间顺序" value="1"></el-option>
                        <el-option label="按总返佣排序" value="2"></el-option>
                        <el-option label="按待结算排序" value="3"></el-option>
                        <el-option label="按代理数排序" value="4"></el-option>
                    </el-select>
                </div>
                <div class="right">
                    <span style="margin-right: 15px">总返佣：{{ listAll.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                    <span style="margin-right: 15px">待结算：{{ listAll.beSettlementAmount }}{{ $t('common_yuan2') }}</span>
                    <span style="margin-right: 15px">已结算：{{ listAll.settlementAmount }}{{ $t('common_yuan2') }}</span>
                    <span>待生效：{{ listAll.beEffectiveAmount }}{{ $t('common_yuan2') }}</span>
                </div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading">
                    <el-table-column prop="userParentType" label="合伙人类型" align="center" width="120"> </el-table-column>
                    <el-table-column prop="userRegisterTypeName" label="注册类型" align="center"> </el-table-column>
                    <el-table-column prop="userName" :label="$t('loan_search_name')" align="center" width="120"> </el-table-column>
                    <el-table-column prop="userIphone" :label="$t('loan_serch_phone')" align="center" width="120"> </el-table-column>
                    <el-table-column prop="userParentName" label="邀请人" align="center" width="120"> </el-table-column>
                    <el-table-column prop="" label="所属部门" align="center" width="120"> </el-table-column>

                    <el-table-column prop="channelLevel" label="等级(Lv1-Lv6)" align="center" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.channelLevel ? 'LV' + scope.row.channelLevel : '' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="userInvitationCode" label="邀请码" align="center" width="120"> </el-table-column>

                    <el-table-column prop="agentNum" label="代理数" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="点击查看代理详情" placement="top">
                                <a @click="clickNum(scope.row)" style="color: #409EFF; cursor: pointer">{{ scope.row.agentNum }}</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="showType" label="渠道分类" align="center"> </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="总返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="beSettlementAmount" label="待结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="settlementAmount" label="已结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="beEffectiveAmount" label="待生效金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="eventsAmount" label="活动预计返现/元" align="center"> </el-table-column>
                    <!-- <el-table-column
                        v-if="item.type == 'sort'"
                        :prop="item.prop"
                        :label="item.label"
                        :key="index"
                    ></el-table-column> -->
                    <el-table-column prop="action" label="操作" align="center" width="200px" fixed="right">
                        <template slot-scope="scope">
                            <a @click="rebateDetail(scope.row)" style="color: #409EFF; cursor: pointer; margin-right: 30px">返佣明细</a>
                            <a @click="loanJump(scope.row)" style="color: #409EFF; cursor: pointer; margin-right: 30px">贷款客户</a>
                            <a @click="alterLevel(scope.row)" style="color: #409EFF; cursor: pointer">等级修改</a>

                            <!-- <a
                                @click="dialogVisible = true"
                                style="color: #409EFF; cursor: pointer"
                                v-if="scope.row.userRegisterTypeName === '贷款'"
                                >关联新客户</a
                            > -->
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="currentChange"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageSize"
                    layout="sizes, prev, pager, next"
                    :total="total"
                    :current-page.sync="currentPage"
                >
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="关联新客户" :visible.sync="dialogVisible" width="30%" class="dialogClass">
            <div style="display: flex; line-height: 30px; margin: 30px">
                <span style="width: 35%; margin: 0px 10px 0px 30px">合伙人手机号</span>
                <el-input v-model="dialogForm.userIphone" :placeholder="$t('loan_detail_qsrnr')"></el-input>
            </div>
            <div>
                <div class="title">| 关联新客户信息</div>
                <el-form ref="dialogForm" :model="dialogForm" label-width="120px">
                    <el-form-item label="新客户手机号">
                        <el-input v-model="dialogForm.loanTel"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" style="width: 100px; color: #409EFF; margin-right: 40px; border-color: #409EFF"
                    >取 消</el-button
                >
                <el-button type="primary" @click="_relevance" style="width: 100px">确 定</el-button>
                <div style="margin-top: 30px; color: #409EFF; font-size: 15px">
                    *点击确定后此客户贷款的返佣将划扣到当前合伙人下，请谨慎操作。
                </div>
            </span>
        </el-dialog>
        <el-dialog title="渠道码" :visible.sync="customerDialog" width="20%" :before-close="colseCustomer">
            渠道码为： {{ showChannlecode }}
        </el-dialog>
        <el-dialog title="合伙人等级修改" :visible.sync="alterVisible" width="30%" :before-close="alterCancel">
            <el-form ref="alterform" :model="alterform" label-width="130px">
                <el-form-item label="当前修改等级">
                    <el-input v-model="alterform.channelLevel" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改前新客倍率:">
                    <el-input v-model="alterform.newCustomerRate" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改前老客倍率:">
                    <el-input v-model="alterform.oldCustomerRate" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改后等级:">
                    <el-select v-model="alterform.afterLevel" placeholder="请选择等级">
                        <el-option :label="'LV' + item.level" :value="item.level" v-for="item in levelList" :key="item.level"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div>
                <i class="el-icon-warning-outline"></i>
                <span>修改后当天及后续产生的借款单按更新后的倍率计算</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterCancel">取 消</el-button>
                <el-button type="primary" @click="alterconfirm">确定修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getTotalRegisterAmountList,
    getStatisticsAmount,
    getChannelCode,
    getAmountSumApi,
    liebianJoinLoan,
    getlistAll,
    updateLevel
} from '@/api/insur';
import moment from 'moment'; //导入文件
export default {
    name: 'partner-management',
    data() {
        return {
            alterform: {
                channelLevel: '',
                newCustomerRate: '',
                oldCustomerRate: '',
                afterLevel: '',
                id: ''
            },
            settlementList: [
                {
                    label: '个人(身边云结算)',
                    value: '个人'
                },
                {
                    label: '公司(对公结算)',
                    value: '公司'
                },
                {
                    label: '内部人员(内部结算)',
                    value: '内部人员'
                }
            ],
            levelList: [],
            showChannlecode: '',
            customerDialog: false,
            clearable: false,
            ruleForm: {
                name: '', // 姓名
                code: '', //  邀请码
                phone: '', // 手机号
                level: '', // 合伙人类型
                registerType: '', // 注册类型
                scrmName: '', //  邀请人
                scrmDepartment: '', // 所属部门

                sortType: '1', // 排序类型
                userId: '',
                registerStartTime: '', // 注册起始日
                registerEndTime: '', // 注册终止日
                type: '',

                page: 1,
                rows: 10,
                type: ''
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,

            amountSum: {
                totalRebateAmount: '', // 总返佣
                beEffectiveAmount: '', // 待生效
                settlementAmount: '', // 已结算
                beSettlementAmount: '', // 待结算
                userCount: '' // 总人数
            },
            dialogVisible: false,
            alterVisible: false,
            input: '',
            dialogForm: {
                loanTel: '',
                userIphone: ''
            },

            listAll: {
                totalRebateAmount: '', // 总返佣
                beEffectiveAmount: '', // 待生效
                settlementAmount: '', // 已结算
                beSettlementAmount: '' // 待结算
            },
            loading: true,
            TEXT_URL: process.env.VUE_APP_TEXT_URL,

            disabled: false,
            currentPage: 1
        };
    },
    created() {
        getStatisticsAmount('', '', 0).then((res) => {
            if (res.code === '200') {
                this.amountSum = res.data;
            }
        });
        this.getDataList();
    },
    methods: {
        _relevance() {
            this.dialogForm.bossName = localStorage.getItem('userName');
            liebianJoinLoan(this.dialogForm).then((res) => {
                this.$message.success('操作成功！');
                this.dialogVisible = false;
                for (let k in this.dialogForm) {
                    this.dialogForm[k] = '';
                }
            });
        },
        colseCustomer() {
            this.ruleForm.customerNumber = '';
            this.customerDialog = false;
        },
        searchData() {
            if (this.ruleForm.customerNumber) {
                getChannelCode({
                    phone: this.ruleForm.customerNumber
                }).then((res) => {
                    this.showChannlecode = res.data;
                    this.ruleForm.customerNumber = '';
                    this.customerDialog = true;
                });
            } else {
                this.ruleForm.page = 1;
                this.loading = true;
                this.currentPage = 1;
                this.ruleForm.registerStartTime = this.dateTime[0];
                this.ruleForm.registerEndTime = this.dateTime[1];
                this.getDataList();
            }
        },

        reset() {
            this.ruleForm.name = '';
            this.ruleForm.code = '';
            this.ruleForm.phone = '';
            this.ruleForm.level = '';
            this.ruleForm.registerType = '';
            this.dateTime = [];
            this.ruleForm.userId = '';
            this.ruleForm.sortType = '1';
            // this.ruleForm.rows = 10;
            this.ruleForm.scrmName = '';
            this.ruleForm.scrmDepartment = '';
            this.ruleForm.customerNumber = '';
            // this.total = 0;
        },
        getDataList() {
            getTotalRegisterAmountList(this.ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    res.data.page.records.forEach((item) => {
                        if (item.userParentType == '二级合伙人') {
                            item.agentNum = '-';
                        }
                    });
                    this.loading = false;
                    res.data.page.records.forEach((item) => {
                        item.type == 'CHANNEL' ? (item.showType = '公司') : item.type == 'PARTNER' ? (item.showType = '个人') : '-';
                    });
                    this.tableData = res.data.page.records;
                    this.total = res.data.page.total;
                    this.listAll.totalRebateAmount = res.data.totalRebateAmount;
                    this.listAll.beSettlementAmount = res.data.beSettlementAmount;
                    this.listAll.settlementAmount = res.data.settlementAmount;
                    this.listAll.beEffectiveAmount = res.data.beEffectiveAmount;
                }
            });
            getlistAll().then((res) => {
                this.levelList = res.data;
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.loading = true;
            this.getDataList();
        },
        handleSizeChange(val) {
            this.ruleForm.rows = val;
            this.ruleForm.page = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        // 返佣明细
        rebateDetail(scope) {
            // console.log(scope);
            this.$router.push({
                path: '/rebate-detail',
                query: {
                    userParentType: scope.userParentType,
                    userIphone: scope.userIphone,
                    userName: scope.userName,
                    userId: scope.id,
                    orderType: 1
                }
            });
        },
        clickNum(scope) {
            if (scope.agentNum == '-' || scope.agentNum == '0') {
                this.$message.error('当前暂无代理详情');
            } else {
                this.ruleForm.userId = scope.id;
                this.loading = true;
                this.ruleForm.name = '';
                this.ruleForm.code = '';
                this.ruleForm.phone = '';
                this.ruleForm.level = '';
                this.ruleForm.registerType = '';
                this.ruleForm.page = 1;
                this.dateTime = [];
                this.getDataList();
            }
        },
        // 贷款客户
        loanJump(scope) {
            this.$router.push({
                path: '/loan-customer',
                query: {
                    id: scope.id,
                    userParentType: scope.userParentType,
                    userIphone: scope.userIphone,
                    userName: scope.userName,
                    channelCode: this.showChannlecode || scope.userInvitationCode
                }
            });
        },
        //等级修改
        alterLevel(scope) {
            console.log(scope);
            this.alterform.newCustomerRate = scope.newCustomerRate;
            this.alterform.oldCustomerRate = scope.oldCustomerRate;
            this.alterform.channelLevel = scope.channelLevel;
            this.alterform.id = scope.id;
            this.alterVisible = true;
        },
        alterCancel() {
            this.alterVisible = false;

            this.alterform = {
                channelLevel: '',
                newCustomerRate: '',
                oldCustomerRate: '',
                afterLevel: '',
                showType: '',
                id: ''
            };
        },
        alterconfirm() {
            this.alterVisible = false;
            updateLevel({ id: this.alterform.id, channelLevel: this.alterform.afterLevel }).then((res) => {
                if (res.code == '200') {
                    this.$message.success('修改成功');
                    this.getDataList();
                    this.alterform = {
                        channelLevel: '',
                        newCustomerRate: '',
                        oldCustomerRate: '',
                        afterLevel: '',
                        showType: '',
                        id: ''
                    };
                }
            });
        },
        exportExcel() {
            this.disabled = true;
            const axios = require('axios');
            let that = this;
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.TEXT_URL}/download/exportExcel`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `裂变合伙人${moment().format('YYYYMMDD')}.xls`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.disabled = false;
                })
                .catch((error) => {
                    console.log(error);
                    that.disabled = false;
                });
        },
        changeSort(value) {
            this.ruleForm.page = 1;
            this.total = 0;
            this.ruleForm.sortType = value;
            this.ruleForm.userId = '';
            this.loading = true;
            this.getDataList();

            // 注册时间
            // if (this.ruleForm.sortType == 1) {
            //     this.tableData = res.data.page.records;
            // }
            // // 总佣金
            // if (this.ruleForm.sortType == 2) {
            //     this.tableData.sort(function (a, b) {
            //         return b.totalRebateAmount - a.totalRebateAmount;
            //     });
            // }
            // 待结算
            // if (this.ruleForm.sortType == 3) {
            //     this.tableData.sort(function (a, b) {
            //         return b.waitEffectAmount - a.waitEffectAmount;
            //     });
            // }
            // // 代理数
            // if (this.ruleForm.sortType == 4) {
            //     this.tableData.sort(function (a, b) {
            //         return b.agentNum - a.agentNum;
            //     });
            // }
        }
    }
};
</script>

<style lang='less' scoped>
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
        width: 18%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
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

    /deep/.el-table th > .cell {
        color: #000;
    }

    /deep/.el-table__row {
        height: 40px;

        td:nth-child(8) {
            .cell {
                color: #409EFF;
            }
        }

        td:nth-child(10) {
            .cell {
                color: #409EFF;
            }
        }

        // td:nth-child(3) {
        //     .cell {
        //         color: #409EFF;
        //     }
        // }
    }
}

.dialogClass {
    /deep/.el-dialog__body {
        padding: 0px 50px;
    }

    .title {
        margin: 20px 0;
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }

    .el-form {
        margin: 0 30px;
        margin-top: 30px;
    }

    .el-select {
        width: 100%;
    }

    /deep/.el-dialog__header {
        text-align: center;
        padding-top: 40px;

        /deep/.el-dialog__title {
            font-size: 24px;
        }
    }

    /deep/.el-dialog__footer {
        text-align: center;
        padding: 20px;
        padding-bottom: 50px;
    }
}

.el-pagination {
    text-align: right;
    margin: 30px;
}
</style>