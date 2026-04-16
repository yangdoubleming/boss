<template>
    <div>
        <!-- 裂变结算记录 -->
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 运营管理 /
                裂变活动 / 佣金结算 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
            <div style="width: 70%; text-align: right">
                <el-button style="padding: 8px 40px; font-size: 14px; color: #e71d5d; border-color: #e71d5d"
                    @click="back">返回</el-button>
            </div>
        </div>
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">结算详情</div>

            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="userName" label="合伙人姓名" align="center"></el-table-column>
                    <el-table-column prop="userIphone" :label="$t('loan_serch_phone')" align="center"></el-table-column>
                    <el-table-column prop="settleAmount" label="结算金额/元" align="center"> </el-table-column>
                    <el-table-column prop="month" label="结算月份" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="结算时间" align="center"> </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px" hide-on-single-page>
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { queySettleDetailRecord } from '@/api/insur';
export default {
    name: 'settlt-loan',
    data() {
        return {
            tableData: [],
            total: 0,
            pageSize: 10,
            page: ''
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            queySettleDetailRecord({
                settleId: this.$route.query.id,
                page: this.page,
                rows: 10
            }).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.page = index;
            this.getDataList(this.ruleForm);
        },
        back() {
            this.$router.push({
                path: '/settlement-records',
                query: {
                    type: this.$route.query.type
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(3) {
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
</style>