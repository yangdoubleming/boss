<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-radio-group v-model="ruleForm.status" style="margin: 10px 0 0 20px;" @change="tabChange">
                        <el-radio-button v-for="item in statusOptions" :key="item.value" :label="item.value">
                            {{ item.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 0px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.offerId" placeholder="Offer ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.approvalNo" placeholder="飞书审批单号"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.whitelistType" placeholder="加白类型"
                                    @change="onWhitelistTypeChagne">
                                    <el-option v-for="item in whitelistTypeOptions" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :data="tableData" row-key="id" style="width: 100%; font-size: 14px"
                    v-loading="loading" element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="userId" label="用户ID" align="center" width="120"> </el-table-column>
                    <el-table-column prop="sellerId" label="Seller ID" align="center" width="150"> </el-table-column>
                    <el-table-column prop="offerId" label="Offer ID" align="center" width="190"> </el-table-column>
                    <el-table-column prop="whitelistTypeLabel" label="加白类型" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="effectiveTime" label="生效日期" align="center" width="160"> </el-table-column>
                    <el-table-column prop="expireTime" label="失效日期" align="center" width="160"> </el-table-column>
                    <el-table-column prop="status" label="状态" align="center" width="120">
                        <template slot-scope="{row}">
                            {{ statusMap[row.status].label }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="errMsg" label="详情" align="center" width="180"> </el-table-column>
                    <el-table-column prop="approvalNo" label="飞书审批单号" align="center" width="180"> </el-table-column>
                    <el-table-column prop="customerOwner" label="客户归属" align="center" width="150"> </el-table-column>
                    <el-table-column v-if="[status.effective, undefined].includes(ruleForm.status) && isAdmin"
                        prop="apr" label="操作" width="100">
                        <template slot-scope="{row}">
                            <template v-if="row.status === status.effective">
                                <el-button type="text" @click="onRemove(row)">作废</el-button>
                            </template>
                            <template v-else>
                                -
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="ruleForm.size" layout="sizes, prev, pager, next"
                    :total="total" :current-page.sync="ruleForm.current" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { getOfferWhitelistList, expireOfferWhitelist } from '@/api/mfp';

const whitelistType = {
    user: 'USER',
    shop: 'SHOP'
};
const whitelistTypeMap = {
    [whitelistType.user]: {
        value: whitelistType.user,
        label: '用户加白'
    },
    [whitelistType.shop]: {
        value: whitelistType.shop,
        label: '店铺加白'
    },
    all: {
        value: undefined,
        label: '全部'
    }
};

const whitelistTypeOptions = [
    {
        label: whitelistTypeMap.all.label,
        value: whitelistTypeMap.all.value
    },
    {
        label: whitelistTypeMap[whitelistType.user].label,
        value: whitelistType.user
    },
    {
        label: whitelistTypeMap[whitelistType.shop].label,
        value: whitelistType.shop
    }
];

const status = {
    effective: 'EFFECTIVE',
    expired: 'EXPIRED',
    failed: 'FAILED'
};
const statusMap = {
    [status.effective]: {
        value: status.effective,
        label: '生效中'
    },
    [status.expired]: {
        value: status.expired,
        label: '已失效'
    },
    [status.failed]: {
        value: status.failed,
        label: '执行失败'
    },
    all: {
        value: undefined,
        label: '全部'
    }
};
const statusOptions = [
    {
        label: statusMap.all.label,
        value: statusMap.all.value
    },
    {
        label: statusMap[status.effective].label,
        value: status.effective
    },
    {
        label: statusMap[status.expired].label,
        value: status.expired
    },
    {
        label: statusMap[status.failed].label,
        value: status.failed
    },
];

const createDefaultRuleForm = () => ({
    status: undefined,
    userId: '',
    offerId: '',
    approvalNo: '',
    whitelistType: whitelistTypeMap.all.value,
    current: 1,
    size: 10
});

export default {
    name: 'authorized-store',
    data() {
        return {
            loading: false,
            ruleForm: createDefaultRuleForm(),
            tableData: [],
            total: 0,
            whitelistTypeOptions,
            status,
            statusMap,
            statusOptions,
            sysUserName: localStorage.getItem('userName') || '',
            sysUserId: localStorage.getItem('userId') || '',
            isAdmin: false
        };
    },
    created() {
        this.getDataList();
    },

    methods: {
        onWhitelistTypeChagne() {
            this.ruleForm.current = 1;
            this.getDataList();
        },
        async onRemove(row) {
            if (!row || !row.id) {
                this.$message.error('缺少白名单记录ID');
                return;
            }
            const content = row.whitelistType === whitelistType.user ? '当前店铺是以用户纬度加白，一旦选择作废，则将作废该用户下所有店铺的加白资格。' : "作废仅针对当前店铺，不会影响该用户下其他店铺的加白资格。"
            try {
                await this.$confirm(content, '确认作废店铺加白资格', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await expireOfferWhitelist({ id: row.id });
                this.$message.success('作废成功');
                this.getDataList();
            } catch (error) {
                console.log(error);
            }
        },
        searchData() {
            this.ruleForm.current = 1;
            this.getDataList();
        },
        getWhitelistTypeLabel(value) {
            return whitelistTypeMap[value].label || value || '--';
        },
        tabChange() {
            this.ruleForm.current = 1;
            this.ruleForm.size = 10;
            this.getDataList();
        },
        getDataList() {
            this.loading = true;
            getOfferWhitelistList({
                ...this.ruleForm,
                sysUserId: this.sysUserId,
                sysUserName: this.sysUserName
            }).then((res) => {
                if (res.code === 200) {
                    this.tableData = (res.data.data.records || []).map((item) => ({
                        ...item,
                        whitelistTypeLabel: this.getWhitelistTypeLabel(item.whitelistType)
                    }));
                    this.total = res.data.data.total;
                    this.isAdmin = res.data.isAdmin
                } else {
                    this.tableData = [];
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm = createDefaultRuleForm();
            this.getDataList();
        }
    },
};
</script>

<style scoped>
.el-tree.filter-tree::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-tree.filter-tree::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 2px;
}

.el-tree.filter-tree::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}

.el-timeline::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-timeline::-webkit-scrollbar-track {
    background: #dddddd;
    border-radius: 2px;
}

.el-timeline::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}
</style>
<style lang="less" scoped>
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
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button {
        .el-button {
            width: 90px;
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
}
</style>
