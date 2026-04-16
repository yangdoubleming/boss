<template>
    <div>
        <!-- 结算记录 -->
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
                裂变活动 / <span v-if="ruleForm.settleType === '1'">贷款佣金结算</span> <span v-else>保险佣金结算</span>/
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <div style="width: 70%; text-align: right">
                <el-button style="padding: 8px 40px; font-size: 14px; color: #409EFF; border-color: #409EFF"
                    @click="$router.push('commission-settlement')" v-if="ruleForm.settleType === '1'">返回</el-button>
                <el-button style="padding: 8px 40px; font-size: 14px; color: #409EFF; border-color: #409EFF"
                    @click="$router.push('insure-commisson-settlement')" v-else>返回</el-button>
            </div>
        </div>
        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">已结算金额</span>
                            <span class="grid-num2">{{ allSettleAmount }}</span>
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
                            <el-form-item class="timeC" label="结算时间">
                                <el-date-picker v-model="dateTime" type="daterange" range-separator="-"
                                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">
                保险佣金结算记录
                <div style="float: right; font-weight: 400; margin-right: 45px">已结算总金额：{{ allSettleAmount
                    }}{{ $t('common_yuan2') }}</div>
            </div>

            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="settleType" label="结算类型" align="center"></el-table-column>
                    <el-table-column prop="settleAmount" label="结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="结算时间" align="center"> </el-table-column>
                    <el-table-column prop="operUserName" label="操作人" align="center"> </el-table-column>

                    <el-table-column prop="action" label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <a @click="billing(scope.row)" style="color: #409EFF; cursor: pointer">结算详情</a>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { queySettleRecord } from '@/api/insur';
export default {
    name: 'settlement-records',
    data() {
        return {
            tableData: [],
            ruleForm: {
                settleStartTime: '', // 结算开始时间
                settleEndTime: '', // 结算结束时间
                settleType: '',
                page: 1,
                rows: 10
            },
            total: 0,
            pageSize: 10,
            page: '',
            allSettleAmount: '',
            dateTime: []
        };
    },
    created() {
        this.ruleForm.settleType = this.$route.query.type;
        this.getDataList();
    },
    methods: {
        getDataList() {
            queySettleRecord(this.ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    this.allSettleAmount = res.data.allSettleAmount;
                    this.tableData = res.data.page.records;
                    this.total = res.data.page.total;
                    this.tableData.forEach((item) => {
                        if (item.settleType == '1') {
                            item.settleType = '贷款';
                        } else {
                            item.settleType = '保险';
                        }
                    });
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        billing(value) {
            this.$router.push({
                path: '/settlt-loan',
                query: {
                    id: value.id,
                    type: this.ruleForm.settleType
                }
            });
        },
        searchData() {
            this.ruleForm.page = 1;
            this.ruleForm.settleStartTime = this.dateTime[0];
            this.ruleForm.settleEndTime = this.dateTime[1];
            this.getDataList();
        },
        reset() {
            this.dateTime = [];
            this.ruleForm.settleStartTime = '';
            this.ruleForm.settleEndTime = '';
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

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(2) {
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

.searchForm {
    .el-form-item {
        width: 25%;
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
</style>