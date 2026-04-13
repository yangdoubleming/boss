<template>
    <div class="block-config">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div class="block-config-content">
            <div class="block-search">
                <div class="block-search-left">
                    <el-input placeholder="输入客户ID（精准匹配）" v-model="ruleForm.userId" />
                    <el-select v-model="ruleForm.status" placeholder="请选择" @change="searchData">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                </div>
            </div>
            <div class="block-table">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; font-size: 14px"
                    element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="userId" label="客户ID" align="center"> </el-table-column>
                    <el-table-column prop="personalizedLimit" label="个性化额度（USD）" align="center"> </el-table-column>
                    <el-table-column prop="expireTime" label="有效期至" align="center"> </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="{ row }">
                            <el-tag :type="statusMap[row.status].type">{{
                                statusMap[row.status].label }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operator" label="操作人" align="center"> </el-table-column>
                    <el-table-column prop="createdAt" label="操作时间" align="center"> </el-table-column>
                    <el-table-column prop="lastUpdater" label="最后更新人" align="center"> </el-table-column>
                    <el-table-column prop="updatedAt" label="最后更新时间" align="center"> </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status === status.active" type="text"
                                @click="handleInactive(scope.row)">停用</el-button>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="ruleForm.size" layout="sizes, prev, pager, next"
                    :total="total" :current-page.sync="ruleForm.page" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getBlockWhiteList, deactivateQuota } from '@/api/mfp';
import { status, statusMap, statusOptions } from './const'
export default {
    name: 'BlockWhiteList',
    components: {},
    props: {},
    data() {
        return {
            userName: localStorage.getItem('userName') || '',
            total: 0,
            ruleForm: {
                userId: '',
                status: statusMap.all.value,
                page: 1,
                size: 10,
            },
            tableData: [],
            status,
            statusMap,
            statusOptions,
        }
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        async getDataList() {
            const res = await getBlockWhiteList(this.ruleForm)
            this.tableData = res.data.records || []
            this.total = res.data.total;
        },
        searchData() {
            this.ruleForm.page = 1;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.size = val;
            this.ruleForm.page = 1;
            this.getDataList();
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        async handleInactive(row) {
            try {

                await this.$confirm('确认停用该配置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await deactivateQuota({ id: row.id, lastUpdater: this.userName });
                this.$message.success('停用成功');
                this.getDataList();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>

<style scoped lang="scss">
.block-config-content {
    padding: 16px;
    background-color: #fff;

    .block-table {
        margin-top: 24px;
    }

    .block-search {
        display: flex;
        justify-content: space-between;

        .block-search-left {
            display: flex;
            gap: 8px;
        }
    }
}
</style>