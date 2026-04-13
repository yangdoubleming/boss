<template>
    <!-- 客户申请列表 -->
    <div class="applay-config">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div class="applay-config-content">
            <div class="applay-search">
                <div class="applay-search-left">
                    <el-input placeholder="客户ID" v-model="ruleForm.userId" />
                    <el-input placeholder="手机号" v-model="ruleForm.phone" />
                </div>
                <div>
                    <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                    <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                </div>
            </div>
            <div class="applay-table">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading"
                    element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
                    <el-table-column prop="customerLevel" label="客户层级" align="center"> </el-table-column>
                    <el-table-column prop="payinStandardRate" label="Payin费率(标准)" align="center"> </el-table-column>
                    <el-table-column prop="payinDelayRate" label="Payin费率(延迟)" align="center"> </el-table-column>
                    <el-table-column prop="payoutFeeRate" label="Payout费率" align="center"> </el-table-column>
                    <el-table-column prop="isWhitelist" label="是否加白" align="center"> </el-table-column>
                    <el-table-column prop="isPriceAdjustment" label="是否调价" align="center"> </el-table-column>
                    <el-table-column prop="salesOwnerName" label="归属销售" align="center"> </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="ruleForm.size" layout="sizes, prev, pager, next"
                    :total="total" :current-page.sync="ruleForm.current" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { customerFeePage } from '@/api/mfp';
export default {
    data() {
        return {
            userName: localStorage.getItem('userName') || '',
            userId:localStorage.getItem('userId') || '',
            total: 0,
            ruleForm: {
                userId: '',
                phone: '',
                current: 1,
                size: 10,
            },
            tableData: [],
            loading: false
        }
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        async getDataList() {
            try {
                this.loading = true;
                const res = await customerFeePage({...this.ruleForm,sysUserId:this.userId})
                if (res.code == 200 && res.data.records) {
                    this.tableData = res.data.records.map(data => {
                        return {
                            ...data,
                            payinStandardRate: this.formatPercent(data.payinStandardRate),
                            payinDelayRate: this.formatPercent(data.payinDelayRate),
                            payoutFeeRate: this.formatPercent(data.payoutFeeRate),
                            isWhitelist:data.isWhitelist==1?'是':'否',
                            isPriceAdjustment:data.isPriceAdjustment==1?'是':'否',
                        }
                    }) || []
                    this.total = res.data.total;
                } else {
                    this.tableData = []
                    this.total = 0;
                }
                this.loading = false
            } catch (err) {
                this.loading = false;
                console.log(err)
            }
        },
        formatPercent(num) {
            if (num == null) {
                return "--";
            }
            if (typeof num !== 'number') {
                num = parseFloat(num);
                if (isNaN(num)) {
                    return "--";
                }
            }
            if (num === 0) {
                return '0.00%';
            }
            return (num * 100).toFixed(2) + '%';
        },
        searchData() {
            this.ruleForm.current = 1;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.getDataList();
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        reset() {
            this.ruleForm = {
                userId: '',
                userPhone: '',
                offerId: '',
                salesName: '',
                startDate: '',
                endDate: '',
                userName: '',
                current: 1,
                size: 10
            };
            this.timeArray = []
            this.getDataList();
        },
    }
}

</script>

<style scoped lang="scss">
.applay-config-content {
    padding: 32px 16px;
    background-color: #fff;

    .applay-table {
        margin-top: 24px;
    }

    .applay-search {
        display: flex;

        .applay-search-left {
            display: flex;
            gap: 20px;
        }
    }
}
</style>