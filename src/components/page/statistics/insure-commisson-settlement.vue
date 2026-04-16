<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
                裂变活动 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">保险佣金结算</span>
            <span style="color: #d51d1d; margin-left: 70px; font-size: 14px">请注意：此页面只针对保险佣金结算！</span>
        </div>

        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">合伙人总数</span>
                            <span class="grid-num2">{{ inData.userCount }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">保险总返佣</span>
                            <span class="grid-num2">{{ inData.totalRebateAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">待结算保险佣金</span>
                            <span class="grid-num2">{{ inData.beSettlementAmount }}{{ $t('common_yuan2') }}</span>
                        </div>

                        <div class="grid-cont-right">
                            <span class="grid-num">已结算保险佣金</span>
                            <span class="grid-num2">{{ inData.settlementAmount }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">上月待结算保险佣金</span>
                            <span class="grid-num2">{{ inData.lastMonthBeSettlementAmount
                                }}{{ $t('common_yuan2') }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">可结算保险佣金</span>
                            <span class="grid-num2" style="color: #409EFF">{{ inData.settlableAmount
                                }}{{ $t('common_yuan2') }}</span>
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
                                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset" style="border: 1px solid #409EFF; color: #409EFF">重置
                                </el-button>
                                <el-button type="primary" @click="accountRecord" style="margin-left: 20px">结算记录
                                </el-button>
                                <el-button type="primary" @click="exportList" style="margin-left: 20px"
                                    :disabled="disabled">导出</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div
                style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px; display: flex; justify-content: space-between">
                保险佣金结算列表
                <el-button type="primary" @click="_settlement">批量结算</el-button>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData" v-loading="loading"
                    element-loading-text="加载中，请稍后" style="width: 100%; font-size: 14px" @sort-change="handleSortChange"
                    tooltip-effect="dark" @select="handleSelectionChange" @select-all="handleSelectAll">
                    <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                    <el-table-column prop="userRegisterTypeName" label="注册类型" align="center"></el-table-column>
                    <el-table-column prop="userName" label="合伙人姓名" align="center"> </el-table-column>
                    <el-table-column prop="userIphone" :label="$t('loan_serch_phone')" align="center">
                    </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="总返佣/元" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="settlableAmount" label="可结算金额/元" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="lastMonthBeSettlementAmount" label="上月待结算金额/元" align="center"
                        sortable="custom"> </el-table-column>
                    <el-table-column prop="beSettlementAmount" label="待结算金额/元" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="settlementAmount" label="已结算金额/元" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center"> </el-table-column>
                </el-table>
                <!-- <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="currentChange"
                    style="text-align: right; margin: 40px 20px"
                    hide-on-single-page
                >
                </el-pagination> -->
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"
                    style="text-align: right; margin: 40px 20px" :current-page.sync="currentPage">
                </el-pagination>
            </el-card>
        </el-row>

        <el-dialog title="批量结算佣金" :visible.sync="dialogVisible" width="30%" class="dialogClass"
            :before-close="handleClose">
            <div style="font-size: 16px; display: flex; flex-direction: column; justify-content: center">
                <div class="block" style="margin-bottom: 25px">
                    <span class="demonstration" style="margin-right: 20px">
                        <span style="color: red">*</span>
                        结算月份</span>
                    <el-date-picker v-model="termSeven" type="month" placeholder="选择月" :clearable="false"
                        value-format="yyyy-MM" :picker-options="pickerOptions" @change="changeValue">
                    </el-date-picker>
                </div>
                <p>
                    将<span style="color: #e9335e">{{ multipleSelection.length }}</span> 个合伙人，可结算佣金共计
                    <span style="color: #e9335e">{{ totalAmount }}</span> 元，批量处理为【已结算】
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: center; align-items: center">
                    <el-button @click="handleClose"
                        style="width: 100px; color: #409EFF; margin-right: 15px; border-color: #409EFF">取 消</el-button>
                    <el-button type="primary" @click="_push" style="width: 100px" :disabled="disabledSettle">确 定
                    </el-button>
                </div>

                <div style="margin-top: 30px; color: #409EFF; font-size: 15px; text-align: center">
                    *点击确定表示您已线下结算佣金给合伙人，请谨慎操作。
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { insuCommissionPage, settleable, batchUserLiquidation, getStatisticsAmount } from '@/api/insur';
import moment from 'moment'; //导入文件
import { supplePage } from '../../../api/insur';
export default {
    name: 'insure-commission-settlement',
    data() {
        return {
            loading: false,
            dialogVisible: false,
            ruleForm: {
                name: '', // 手机号
                phone: '',
                page: 1,
                rows: 10,
                orderBy: '',
                orderType: ''
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            dateTime: [],
            TEXT_URL: process.env.VUE_APP_TEXT_URL,
            tableData1: [],
            multipleSelection: [],
            inData: {},
            totalCount: 0,
            termSeven: '',
            pickerOptions: {
                disabledDate(time) {
                    let t = new Date().getDate();
                    if (t >= 25) {
                        // 返回上个月的日期
                        return time.getTime() > Date.now() - 8.64e7 * t;
                    } else {
                        const day = 60 * 24 * 3600 * 1000;
                        // 返回小于两个月前的日期
                        return time.getTime() > Date.now() - day;
                    }
                }
            },
            disabled: false,
            totalAmount: 0,
            disabledSettle: false,
            ids: [],
            currentPage: 1
        };
    },
    created() {
        getStatisticsAmount('', '', 4).then((res) => {
            if (res.code === '200') {
                this.inData = res.data;
            }
        });

        this.getDataList();
        this.approveDate();
    },
    computed: {
        // totalAmount() {
        //     if (!this.multipleSelection.length) return 0;
        //     let n = 0;
        //     this.multipleSelection.forEach((item) => {
        //         n = n + Number(item.amount);
        //     });
        //     return n;
        // }
    },
    methods: {
        async handleSelectAll(selection) {
            if ((selection.length && !this.checked) || (!selection.length && this.checked)) {
                // 全选
                this.loading = true;
                this.multipleSelection = [];
                await insuCommissionPage({
                    name: this.ruleForm.name,
                    phone: this.ruleForm.phone,
                    page: 1,
                    rows: this.total,
                    orderBy: this.ruleForm.orderBy,
                    orderType: this.ruleForm.orderType
                }).then((res) => {
                    if (res.code == 200) {
                        res.data.page.records.forEach((item) => {
                            this.multipleSelection.push(item);
                        });
                    }
                });
                await this.getDataList();
                await this.setLoading();
            } else {
                // 全不选
                this.multipleSelection = [];
            }
        },
        setLoading() {
            this.loading = false;
            console.log(this.multipleSelection.length);
        },
        getRowKey(row) {
            return row.id;
        },
        _push() {
            this.disabledSettle = true;
            batchUserLiquidation({
                settleType: 2,
                settleMonth: this.termSeven,
                operUserId: localStorage.getItem('userId'),
                usersId: this.ids,
                amount: this.totalAmount,
                bossName: localStorage.getItem('userName')
            }).then((res) => {
                this.$message.success('操作成功！');
                this.dialogVisible = false;
                this.getDataList();
                this.disabledSettle = false;
                this.ids = [];
            });
        },
        _settlement() {
            if (!this.multipleSelection.length) return this.$message.info('请先勾选！');
            this.dialogVisible = true;
            this.approveDate();
            this.getAmount();
        },
        changeValue(value) {
            this.ids = [];
            this.termSeven = value;
            this.getAmount();
        },
        // 可结算金额
        getAmount() {
            this.multipleSelection.forEach((item) => {
                this.ids.push(item.id);
            });
            settleable({
                settleType: 2,
                isSelectAll: this.isAll,
                settleMonth: this.termSeven,
                operUserId: localStorage.getItem('userId'),
                usersId: this.ids
            }).then((res) => {
                if (res.code == 200) {
                    this.totalAmount = res.data;
                    if (this.totalAmount <= 0) {
                        this.disabledSettle = true;
                    } else {
                        this.disabledSettle = false;
                    }
                }
            });
        },
        searchData() {
            this.multipleSelection = [];
            this.ids = [];
            this.ruleForm.page = 1;
            this.currentPage = 1;
            // console.log(this.ruleForm)
            this.getDataList();
        },
        getDataList() {
            insuCommissionPage(this.ruleForm).then((res) => {
                if (res.code === '200') {
                    this.$refs.multipleTable.clearSelection();
                    this.tableData = res.data.page.records;
                    this.total = res.data.page.total;
                }
                //回显
                this.multipleSelection.forEach((val) => {
                    this.tableData.forEach((row) => {
                        if (row.id == val.id) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                });
            });
        },
        handleSortChange(column, prop, order) {
            console.log(column.order);
            this.ruleForm.orderBy = column.prop;
            this.ruleForm.orderType = column.order;
            this.getDataList();
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList();
        },
        handleSizeChange(val) {
            this.ruleForm.rows = val;
            this.ruleForm.page = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm.name = '';
            this.ruleForm.phone = '';
            this.ruleForm.dateStart = '';
            this.ruleForm.dateEnd = '';
            // this.ruleForm.rows = 10;
        },
        handleSelectionChange(list, row) {
            if (list.includes(row)) {
                //勾选时做的事
                this.multipleSelection.push(row);
            } else {
                //取消勾选时做的事
                this.multipleSelection = this.multipleSelection.filter((val) => val.id !== row.id);
            }
            console.log(this.multipleSelection.length);
        },
        // 导出
        exportList() {
            this.disabled = true;
            let that = this;
            const axios = require('axios');
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.TEXT_URL}/download/exportCommission`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    that.disabled = false;
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `保险佣金结算${moment().format('YYYYMMDD')}.xls`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error);
                    that.disabled = false;
                });
        },
        // 结算记录
        accountRecord() {
            this.$router.push({
                path: '/settlement-records',
                query: {
                    type: 2
                }
            });
        },
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        },
        // 默认日期
        approveDate() {
            let t = new Date().getDate();
            var d = new Date();
            let month = [];
            month[0] = d.getFullYear(); // 年份
            month[1] = this.Zero(d.getMonth() + ''); // 上个月月份
            month[2] = this.Zero(d.getMonth() - 1 + ''); // 上上个月月份
            if (t >= 25) {
                // 上个月
                this.termSeven = month[0] + '-' + month[1];
            } else {
                // 上上个月
                this.termSeven = month[0] + '-' + month[2];
            }
        },
        handleClose() {
            this.dialogVisible = false;
            this.ids = [];
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
            width: 280px;
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
        td:nth-child(6) {
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
    /deep/.el-dialog {
        padding: 20px 40px;
    }

    /deep/.el-dialog__header {
        text-align: center;
    }

    /deep/.el-dialog__title {
        font-size: 20px;
    }
}
</style>