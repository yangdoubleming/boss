<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">合伙人总数</span>
                            <span class="grid-num2">{{ totalUser }}</span>
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
                            <span class="grid-num2">{{ (amountSum.totalRebateAmount -
                amountSum.settlementAmount).toFixed(2) }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待生效</span>
                            <span class="grid-num2">{{ amountSum.inEffectAmount }}{{ $t('common_yuan2') }}</span>
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

                            <!-- <el-form-item>
                                <el-select v-model="ruleForm.registerType" placeholder="注册类型" style="width: 100%">
                                    <el-option label="贷款" value="LOAN"></el-option>
                                    <el-option label="保险" value="INSURANCE"></el-option>
                                </el-select>
                            </el-form-item> -->

                            <el-form-item>
                                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.code" placeholder="邀请码"></el-input>
                            </el-form-item>
                            <!-- <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset" style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                                <el-button type="primary" @click="exportExcel" style="margin-left: 20px">导出</el-button>
                            </div> -->
                        </el-row>
                        <el-row style="display: flex; margin-top: 20px">
                            <el-form-item class="timeC">
                                <el-date-picker v-model="dateTime" type="daterange" range-separator="-"
                                    start-placeholder="注册起始日" end-placeholder="注册截止日" value-format="yyyy-MM-dd"
                                    :clearable="clearable">
                                </el-date-picker>
                            </el-form-item>
                            <div class="button">
                                <el-button type="primary" @click="searchData">搜索</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                                <el-button type="primary" @click="exportExcel" style="margin-left: 20px">导出</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; color: #666; font-size: 15px; display: flex">
                <div class="left" style="font-weight: 700; flex: 1">
                    合伙人管理列表
                    <el-select v-model="ruleForm.sortType" placeholder="合伙人类型" style="margin-left: 20px"
                        @change="changeSort">
                        <el-option label="按注册时间顺序" value="1"></el-option>
                        <el-option label="按总返佣排序" value="2"></el-option>
                        <el-option label="按待结算排序" value="3"></el-option>
                        <el-option label="按代理数排序" value="4"></el-option>
                    </el-select>
                </div>
                <div class="right">
                    <span style="margin-right: 15px">总返佣：{{ totalRebate }}{{ $t('common_yuan2') }}</span>
                    <span style="margin-right: 15px">待结算：{{ beSettled }}{{ $t('common_yuan2') }}</span>
                    <span style="margin-right: 15px">已结算：{{ settled }}{{ $t('common_yuan2') }}</span>
                    <span>待生效：{{ inEffect }}{{ $t('common_yuan2') }}</span>
                </div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading">
                    <el-table-column prop="userParentType" label="合伙人类型" align="center"> </el-table-column>
                    <el-table-column prop="userRegisterTypeName" label="注册类型" align="center"> </el-table-column>
                    <el-table-column prop="userName" :label="$t('loan_search_name')" align="center"> </el-table-column>
                    <el-table-column prop="userIphone" :label="$t('loan_serch_phone')" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="userInvitationCode" label="邀请码" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="agentNum" label="代理数" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="点击查看代理详情" placement="top">
                                <a @click="clickNum(scope.row)" style="color: #409EFF; cursor: pointer">{{
                scope.row.agentNum }}</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="总返佣/元" align="center"> </el-table-column>
                    <el-table-column prop="beSettleAmount" label="待结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="settlementAmount" label="已结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="inEffectAmount" label="待生效金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center" width="180px"> </el-table-column>
                    <el-table-column prop="eventsAmount" label="活动预计返现/元" align="center"> </el-table-column>

                    <el-table-column prop="action" label="操作" align="center">
                        <template slot-scope="scope">
                            <a @click="rebateDetail(scope.row)" style="color: #409EFF; cursor: pointer;">返佣明细</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="关联新客户" :visible.sync="dialogVisible" width="30%" class="dialogClass">
            <div style="display: flex; line-height: 30px; margin: 30px">
                <span style="width: 35%; margin: 0px 10px 0px 30px">当前合伙人</span>
                <el-input v-model="input" :placeholder="$t('loan_detail_qsrnr')"></el-input>
            </div>
            <div>
                <div class="title">| 关联新客户信息</div>
                <el-form ref="dialogForm" :model="dialogForm" label-width="120px">
                    <el-form-item label="新客户手机号">
                        <el-input v-model="dialogForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="新客户贷款状态">
                        <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false"
                    style="width: 100px; color: #409EFF; margin-right: 40px; border-color: #409EFF">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" style="width: 100px">确 定</el-button>
                <div style="margin-top: 30px; color: #409EFF; font-size: 15px">
                    *点击确定后此客户贷款的返佣将划扣到当前合伙人下，请谨慎操作。
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getInsuranceRegisterCount, getRegisterAmountList, getAmountSumApi } from '@/api/insur';
import moment from 'moment'; //导入文件
export default {
    name: 'partner-management-insurance',
    data() {
        return {
            clearable: false,
            totalUser: 0,
            ruleForm: {
                name: '', // 姓名
                code: '', //  邀请码
                phone: '', // 手机号
                level: '', // 合伙人类型
                registerType: '', // 注册类型

                sortType: '1', // 排序类型
                userId: '',
                registerStartTime: '', // 注册起始日
                registerEndTime: '', // 注册终止日
                type: '',

                page: 1,
                rows: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,

            amountSum: {},
            totolUser: 0,
            dialogVisible: false,
            input: '',
            dialogForm: {
                loanTel: '',
                userIphone: ''
            },
            inEffect: '',
            settled: '',
            beSettled: '',
            totalRebate: '',
            loading: true,
            TEXT_URL: process.env.VUE_APP_TEXT_URL,
            disabled: false
        };
    },
    created() {
        getInsuranceRegisterCount().then((res) => {
            this.totalUser = res.data;
        });
        this.getDataList();
        getAmountSumApi('', '/Insure/getAmountSum').then((res) => {
            if (res.code === '200') {
                this.amountSum = res.data;
            }
        });
    },
    methods: {
        searchData() {
            this.ruleForm.page = 1;
            this.total = 0;
            this.loading = true;
            this.ruleForm.registerStartTime = this.dateTime[0];
            this.ruleForm.registerEndTime = this.dateTime[1];
            this.getDataList();
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
        },
        getDataList() {
            getRegisterAmountList(this.ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    res.data.page.records.forEach((item) => {
                        if (item.userParentType == '二级合伙人') {
                            item.agentNum = '-';
                        }
                    });
                    this.loading = false;
                    this.tableData = res.data.page.records;
                    this.total = res.data.page.total;
                    this.inEffect = res.data.inEffect;
                    this.settled = res.data.settled;
                    this.beSettled = res.data.beSettled;
                    this.totalRebate = res.data.totalRebate;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.loading = true;
            this.getDataList();
        },
        // 返佣明细
        rebateDetail(scope) {
            console.log(scope);
            this.$router.push({
                path: '/rebate-detail',
                query: {
                    userParentType: scope.userParentType,
                    userIphone: scope.userIphone,
                    userName: scope.userName,
                    userId: scope.id,
                    orderType: 2 //1贷款  2保险
                }
            });
        },
        clickNum(scope) {
            if (scope.agentNum == '-' || scope.agentNum == '0') {
                this.$message.error('当前暂无代理详情');
            } else {
                this.ruleForm.userId = scope.id;
                this.loading = true;
                this.ruleForm.page = 1;
                this.total = 0;
                this.ruleForm.name = '';
                this.ruleForm.code = '';
                this.ruleForm.phone = '';
                this.ruleForm.level = '';
                this.ruleForm.registerType = '';
                this.dateTime = [];
                this.getDataList();
            }
        },
        exportExcel() {
            this.disabled = true;
            this.ruleForm.type = 'INSURANCE';
            const axios = require('axios');
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
                    this.disabled = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.disabled = false;
                });
        },
        changeSort(value) {
            this.ruleForm.page = 1;
            this.total = 0;
            this.ruleForm.sortType = value;
            this.ruleForm.userId = '';
            this.loading = true;
            this.getDataList();
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
        width: 20%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }

    .button {
        width: 300px;

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
        height: 65px;

        td:nth-child(8) {
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
</style>