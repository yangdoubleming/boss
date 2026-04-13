<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">用户管理</span>
        </div>
        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">注册用户数</span>
                            <span class="grid-num2">{{ count }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" label-width="85px" style="padding: 30px 0px 20px 5px">
                        <el-row style="display: flex">
                            <el-form-item label="手机号：">
                                <el-input v-model="ruleForm.usrName"></el-input>
                            </el-form-item>
                            <el-form-item label="渠道码：">
                                <el-input v-model="ruleForm.channelName" placeholder="请输入渠道名"></el-input>
                            </el-form-item>
                            <el-form-item label="注册时间：" class="timeC">
                                <el-date-picker v-model="dateTime" type="daterange" range-separator="至"
                                    start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="电商平台：" label-width="115px">
                                <el-select v-model="ruleForm.platform" :placeholder="$t('loan_detail_choose')">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="Amazon" value="Amazon"></el-option>
                                    <el-option label="Wayfair" value="Wayfair"></el-option>
                                    <el-option label="HomeDepot" value="HomeDepot"></el-option>
                                    <el-option label="Walmart" value="Walmart"></el-option>
                                    <el-option label="Overstock" value="Overstock"></el-option>
                                    <el-option label="Lowes" value="Lowes"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>

                        <div class="button">
                            <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                            <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">用户列表</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="usrName" :label="$t('loan_serch_phone')" align="center"> </el-table-column>
                    <el-table-column prop="channelCode" label="渠道码" align="center"> </el-table-column>
                    <el-table-column prop="channelName" label="渠道名" align="center"> </el-table-column>
                    <el-table-column prop="platform" label="电商平台" align="center"> </el-table-column>
                    <el-table-column prop="number" label="投保订单数" align="center">
                        <!-- <template slot-scope="scope">
                            <a @click="handleView(scope.row)" style="color: #fe1964; cursor: pointer">{{ scope.row.number }}</a>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="amount" label="已付保费" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center"> </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { userPage } from '@/api/insur';
export default {
    name: 'insuranceUser',
    data() {
        return {
            ruleForm: {
                usrName: '', // 手机号
                channelName: '', // 渠道名
                createTime: '', // 开始时间
                endTime: '', // 结束时间
                platform: '',
                current: 1,
                size: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            count: ''
        };
    },
    created() {
        this.getDataList(this.ruleForm);
    },
    methods: {
        searchData() {
            this.ruleForm.current = 1;
            this.total = 0;
            this.ruleForm.createTime = this.dateTime[0];
            this.ruleForm.endTime = this.dateTime[1];
            this.getDataList(this.ruleForm);
        },

        reset() {
            this.ruleForm.usrName = '';
            this.ruleForm.channelName = '';
            this.dateTime = [];
            this.ruleForm.createTime = '';
            this.ruleForm.endTime = '';
            this.ruleForm.platform = '';
            this.getDataList(this.ruleForm);
        },
        getDataList(paramer) {
            userPage(paramer).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.count = res.data.total;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        }
        // handleView(scope) {
        //     console.log(scope);

        //     this.$router.push({
        //         path: '/insurance'
        //         // query: {
        //         //     orderNo: scope.orderNo,
        //         //     comanyName: scope.comanyName,
        //         //     policyStatus: scope.policyStatus
        //         // }
        //     });
        // }
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
        width: 23%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button {
        margin: 10px 0;

        .el-button {
            width: 90px;
            margin-right: 35px;
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
        td:nth-child(1) {
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
</style>