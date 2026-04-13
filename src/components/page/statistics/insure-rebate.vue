<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 / 运营管理 /
                裂变活动 / 保险数据统计 /
                <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">保险返佣排行榜</span>
            </div>
            <div style="width: 70%; text-align: right">
                <el-button style="padding: 5px 35px; font-size: 14px; color: #e71d5d; border-color: #e71d5d" @click="$router.go(-1)"
                    >返回</el-button
                >
            </div>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item label="返佣时间">
                                <el-date-picker
                                    v-model="dateTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="返佣起始日"
                                    end-placeholder="返佣截止日"
                                    value-format="yyyy-MM-dd"
                                    :clearable="clearable"
                                >
                                </el-date-picker>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList two" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">保险返佣排行</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%" border>
                    <!-- <el-table-column prop="num" label="排序" align="center"></el-table-column> -->
                    <el-table-column type="index" label="排序" align="center" :index="indexAdd" width='100'/>
                    <el-table-column prop="userName" label="合伙人姓名" align="center"> </el-table-column>
                    <el-table-column prop="parent" label="合伙人类型" align="center"> </el-table-column>
                    <el-table-column prop="userIphone" label="合伙人手机号" align="center"> </el-table-column>
                    <el-table-column prop="totalRebateAmount" label="保险总返佣" align="center"> </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="currentChange"
                    style="text-align: right; margin: 40px 20px"
                    hide-on-single-page
                >
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { rebate } from '@/api/insur';

export default {
    name: 'insure-statistics',
    data() {
        return {
            ruleForm: {
                startTime: '',
                endTime: '',
                page: 1,
                rows: 10
            },
            index: 0,
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            clearable: false
        };
    },
    computed: {
        // index() {
        //     return (this.index + 1);
        // }
    },
    created() {
        this.getDataList();
    },
    methods: {
        searchData() {
            this.ruleForm.startTime = this.dateTime[0];
            this.ruleForm.endTime = this.dateTime[1];
            this.ruleForm.page = 1;
            this.total = 0;
            this.getDataList();
        },
        indexAdd(index) {
            return index + 1 + (this.ruleForm.page - 1) * this.ruleForm.rows; // 每页显示条数;
        },
        getDataList() {
            rebate(this.ruleForm).then((res) => {
                if (res.code === '200') {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        reset() {
            this.ruleForm.startTime = '';
            this.ruleForm.endTime = '';
            this.dateTime = [];
        }
    }
};
</script>

<style lang='less' scoped>
.searchForm {
    .el-form-item {
        width: 35%;
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

    /deep/.el-table__header {
        height: 60px;
        font-size: 13px;
        th {
            background-color: #e8e8e8 !important;
            color: #666;
        }
    }
    /deep/.el-table__row {
        height: 60px;
        font-size: 13px;

        td:nth-child(1) {
            color: #333;
            font-weight: 700;
        }
        td:nth-child(5) {
            color: #e71d5d;
        }
    }
}
</style>