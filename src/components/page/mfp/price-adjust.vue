<template>
    <!-- 调价记录 -->
    <div class="applay-config">
        <div style="display: flex; align-items: center; padding: 18px 0">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div class="applay-config-content">
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-radio-group v-model="ruleForm.status" style="margin-left: 20px;" @change="searchData">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button :label="item.value" :key="item.value" v-for="item in typeOptions">{{ item.label
                            }}</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" class="form-box">
                        <el-form-item>
                            <el-input v-model="ruleForm.customerId" placeholder="用户ID"
                                :style="{ width: '180px' }"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="ruleForm.customerPhone" placeholder="客户手机号"
                                :style="{ width: '180px' }"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="ruleForm.approvalSerialNumber" placeholder="飞书审批单号"
                                :style="{ width: '180px' }"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker style="border-radius:8px" v-model="ruleForm.effectiveDate"
                                value-format='yyyy-MM-dd' :clearable="false" type="date" placeholder="调价实际生效日" />
                        </el-form-item>
                        <el-form-item>
                            <div style="display: flex">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            </div>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
            <div class="applay-table">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading"
                    element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="customerId" label="用户ID" align="center"> </el-table-column>
                    <el-table-column prop="payinStandardRate" label="Payin费率(标准)" align="center"> </el-table-column>
                    <el-table-column prop="payinDelatedRate" label="Payin费率(延迟)" align="center"> </el-table-column>
                    <el-table-column prop="payoutFeeRate" label="Payout费率" align="center"> </el-table-column>
                    <el-table-column prop="effectiveTimeStr" label="实际生效时间" align="center"> </el-table-column>
                    <el-table-column prop="actualExpireTimeStr" label="实际失效时间" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.actualExpireTimeStr ? scope.row.actualExpireTimeStr : scope.row.expireTimeStr
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"> </el-table-column>
                    <el-table-column prop="approvalSerialNumber" label="飞书审批单号" align="center"> </el-table-column>
                    <el-table-column prop="salesOwnerName" label="归属销售" align="center"> </el-table-column>
                    <el-table-column prop="expireTime" label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="[3, 4].includes(scope.row.status) && isAdmin"
                                @click="handleDel(scope.row)">作废</el-button>
                        </template>
                    </el-table-column>
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
import { priceAdjustConfigPage, priceAdjustConfigInvalidate, roleList } from '@/api/mfp';
export default {
    data() {
        return {
            userName: localStorage.getItem('userName') || '',
            userId: localStorage.getItem('userId') || '',
            total: 0,
            tabType: '',
            ruleForm: {
                customerId: '',
                status: '',
                customerPhone: '',
                approvalSerialNumber: '',
                effectiveDate: '',
                current: 1,
                size: 10,
            },
            typeOptions: [
                { label: '生效中', value: '4' },
                { label: '待生效', value: '3' },
                { label: '已失效', value: '2' },
                { label: '执行失败', value: '0' },
            ],
            tableData: [],
            loading: false,
            isAdmin:false
        }
    },
    mounted() {
        this.getDataList()
        this.roleList()
    },
    methods: {
        async roleList() {
            try {
                this.loading = true
                const res = await roleList({ userId: this.userId })
                if (res.code == 200 && res.data) {
                    this.isAdmin = res.data.some(item => ['ADMIN', 'SalesAssistant', 'RISK_MANAGER'].includes(item.code))
                    console.log('isAdmin',this.isAdmin)
                }
                this.loading = false
            } catch (err) {
                this.loading = false
                console.log(err)
            }
        },
        async getDataList() {
            try {
                this.loading = true
                const res = await priceAdjustConfigPage({ ...this.ruleForm, sysUserId: this.userId })
                if (res.code == 200 && res.data.records) {
                    this.tableData = res.data.records.map(data => {
                        let flag = this.typeOptions.find(type => type.value == data.status)
                        return {
                            ...data,
                            payinStandardRate: this.formatPercent(data.payinStandardRate),
                            payinDelatedRate: this.formatPercent(data.payinDelatedRate),
                            payoutFeeRate: this.formatPercent(data.payoutFeeRate),
                            statusName: flag ? flag.label : ''
                        }
                    }) || []
                    this.total = res.data.total;
                } else {
                    this.tableData = []
                    this.total = 0;
                }
                this.loading = false
            } catch (err) {
                this.loading = false
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
            this.getDataList();
        },
        handleSizeChange(val) {
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.getDataList();
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList();
        },
        async handleDel(row) {
            this.$confirm('作废后，该客户的Payin/Payout费率将恢复刊例价', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await priceAdjustConfigInvalidate({ id: row.id, lastUpdater: this.userName, userId: this.userId })
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '作废成功!'
                    });
                    this.ruleForm.size = 10;
                    this.ruleForm.current = 1;
                    this.ruleForm.status = '';
                    this.getDataList();
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        reset() {
            this.ruleForm = {
                customerId: '',
                status: '',
                customerPhone: '',
                approvalSerialNumber: '',
                effectiveDate: '',
                current: 1,
                size: 10,
            };
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
        justify-content: space-between;

        .applay-search-left {
            display: flex;
            gap: 8px;
        }
    }
}

.form-box {
    display: flex;
    align-items: center;
    padding: 20px 20px 0px 20px;
    gap: 12px;
}
</style>