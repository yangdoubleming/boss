<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div style="margin-bottom: 40px">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div style="display: flex; gap: 20px; padding: 20px; align-items: center" class="title-box">
                    <div class="title-left">
                        <div class="title-key">{{ resignedAccountInfo.name }}</div>
                        <div class="title-value">离职员工</div>
                    </div>
                    <div class="title-right">
                        <div class="info-item">
                            <span>待分配客户数：</span>
                            <span>{{ tableData.length }}</span>
                        </div>
                        <div class="info-item">
                            <span class="">岗位：</span>
                            <span>{{ resignedAccountInfo.position }}</span>
                        </div>
                        <div class="info-item">
                            <span class="">离职时间：</span>
                            <span>{{ resignedAccountInfo.updateTime.split(' ')[0] }}</span>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.accountName" placeholder="客户名称"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.labelName" placeholder="状态"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <div>已选中：{{ ids.length }}项</div>
                                <el-button type="primary" @click="_settlement">分配至他人</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData"
                    style="width: 100%; font-size: 14px" v-loading="loading" element-loading-text="加载中，请稍后"
                    tooltip-effect="dark" @select="handleSelectionChange" @select-all="handleSelectAll">
                    <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                    <el-table-column prop="accountName" label="客户名称" align="center">
                        <template slot-scope="scope">
                            <div @click="openDrawer(scope.row)">{{ scope.row.accountName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center"> </el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.phone.slice(0, 3) + '****' + scope.row.phone.slice(7, 12) }}</div>
                        </template></el-table-column>
                    <el-table-column prop="labelNames" label="状态" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.labelNameString || '--' }}
                        </template></el-table-column>
                    <el-table-column prop="yearSaleAmount" label="年销售额（万元）" align="center" width="200">
                        <template slot-scope="scope">
                            {{ formatToWan(scope.row.yearSaleAmount) || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ownerName" label="归属人" align="center"> </el-table-column>
                    <el-table-column prop="sourceName" label="客户来源（大类）" align="center"> </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"
                    :current-page.sync="currentPage" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>

        <el-dialog title="转接客户" :visible.sync="dialogVisible" width="40%" class="dialogClass"
            :before-close="handleClose">
            <div style="
                    font-weight: 600;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                "></div>
            <el-form>
                <div style="font-size: 15px">-当前已选中：<span style="font-size: 18px;color: #222222;padding: 0 5px">{{
                    ids.length }}</span>条数据</div>
                <el-form-item required label="选择转接人"><el-input placeholder="请选择转接人" v-model="filterText"
                        suffix-icon="el-icon-plus" disabled> </el-input></el-form-item>
            </el-form>

            <el-tree class="filter-tree" :data="GroupList" :props="defaultProps" :filter-node-method="filterNode"
                ref="tree" @node-click="handleNodeClick" style="max-height: 350px; overflow-y: scroll">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: center; align-items: center">
                    <el-button @click="handleClose"
                        style="width: 100px; color: #fe1964; margin-right: 15px; border-color: #fe1964">取 消</el-button>
                    <el-button type="primary" @click="_push" style="width: 100px">确 定</el-button>
                </div>
            </span>
        </el-dialog>
        <el-drawer :visible.sync="drawerVisible" direction="rtl" :before-close="handleDrawerClose" class="drawerFrom">
            <div class="drawer-main">
                <div class="drawer-card">
                    <div>客户名称</div>
                    <div style="padding: 0 10px; color: #000000; display: flex; justify-content: space-between; align-items: center"
                        v-if="accountNameIsEditing === false">
                        <div style="padding: 16px 15px; font-size: 14px">{{ currentAccountInfo.borrowerName }}</div>
                        <div>
                            <img src="../../../assets/icon/edit.svg" @click="accountNameIsEditing = true" />
                        </div>
                    </div>
                    <div style="padding: 10px; color: #000000; display: flex; justify-content: space-between" v-else>
                        <el-input v-model="currentAccountInfo.borrowerName" style="width: 400px"></el-input>
                        <div @click="changeAccountName">
                            <img src="../../../assets/icon/save.svg" />
                        </div>
                    </div>
                    <div>客户手机号</div>
                    <div style="padding:10px 26px; color: #000000; display: flex; justify-content: space-between">{{
                        customerPhone || '--' }}</div>
                </div>
                <div class="drawer-card">
                    <div>系统信息</div>
                    <div style="display: flex; gap: 20px; padding: 10px">
                        <div class="drawer-card-left">
                            <div>状态</div>
                            <div>年销售额（万元）</div>
                            <div>客户来源（小类）</div>
                        </div>
                        <div class="drawer-card-right">
                            <div>{{ currentAccountInfo.labelNameString || '--' }}</div>
                            <div>{{ formatToWan(currentAccountInfo.y1SalesValue) || '--' }}</div>
                            <div>{{ currentAccountInfo.sourceName }}</div>
                        </div>
                    </div>
                </div>
                <div class="drawer-card">
                    <div>动态记录</div>
                    <div style="padding: 20px" v-if="currentAccountInfo.customerHistoryList.length > 0">
                        <el-timeline style="max-height: 300px; overflow-y: scroll">
                            <el-timeline-item v-for="(activity, index) in currentAccountInfo.customerHistoryList"
                                :key="index" icon="el-icon-document-copy" :size="activity.size" placement="top"
                                :hide-timestamp="true">
                                {{ activity }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <el-empty description="无记录" :image-size="60" v-else></el-empty>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import moment from 'moment';
import { accountInfo, listByGroup, listUserInfoPage, transferOwner, updateAccount } from '@/api/crm'; //导入文件
export default {
    name: 'commission-settlement',
    data() {
        return {
            customerPhone: '',
            resignedAccountInfo: {},
            filterText: '',
            filterNodeId: '',
            GroupList: [],
            defaultProps: {
                children: 'salesVoList',
                label: 'name'
            },
            currentPage: 1,
            currentAccountInfo: {
                borrowerName: '',
                borrowerPhone: null,
                companyName: null,
                customerHistoryList: [],
                labelNames: [],
                labelNameString: '',
                sourceName: '',
                userCreateTime: null,
                userId: null,
                y1SalesValue: 0
            },
            currentAccountId: '',
            accountNameIsEditing: false,
            loading: false,
            dialogVisible: false,
            drawerVisible: false,
            ruleForm: {
                userId: '', // 手机号
                accountName: '',
                ownerName: '',
                phone: '',
                labelName: '',
                current: 1,
                size: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            multipleSelection: [],
            disabled: false,
            ids: [],
            totalAmount: 0,
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
            }
        };
    },
    created() {
        this.getDataList();
        this.getListByGroup();
        this.resignedAccountInfo = JSON.parse(this.$route.query.row || '{}');
        this.ruleForm.ownerName = this.resignedAccountInfo.name;
    },
    methods: {
        formatToWan(num) {
            if (!num) return '--'
            return (num / 10000).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        getListByGroup() {
            listByGroup().then((res) => {
                res.data.map((item) => {
                    if (item.salesVoList) {
                        item.salesVoList.map((item) => {
                            item.name = item.internalName;
                        });
                    }
                });
                this.GroupList = res.data;
            });
        },
        changeAccountName() {
            this.accountNameIsEditing = false;
            updateAccount({
                id: this.currentAccountId,
                accountName: this.currentAccountInfo.borrowerName,
                phone: this.currentAccountInfo.borrowerPhone
            }).then((res) => {
                this.getDataList();
            });
        },
        handleNodeClick(data) {
            if (!data.children) {
                this.filterText = data.name;
                this.filterNodeId = data.id;
            }
            console.log(data);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleDrawerClose() {
            this.drawerVisible = false;
            this.accountNameIsEditing = false;
        },
        openDrawer(row) {
            this.drawerVisible = true;
            this.currentAccountId = row.id;
            this.customerPhone = row.phone;
            accountInfo({ account: row.phone }).then((res) => {
                this.currentAccountInfo = res.data;
                this.currentAccountInfo.labelNameString = this.currentAccountInfo.labelNames.join(', ');
            });
        },
        showDetail(row) {
            this.$router.push({
                path: '/loanUser-detail',
                query: {
                    userId: row.userId,
                    account: row.phone
                }
            });
        },
        getRowKey(row) {
            return row.id;
        },
        _push() {
            const that = this;
            this.$confirm('确定要执行这个操作吗？', '确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                if (that.ids.length === 0) {
                    return;
                }
                transferOwner({
                    neocrmAccountIds: this.ids,
                    salesId: this.filterNodeId
                }).then((res) => {
                    that.$message.success('操作成功！');
                    that.dialogVisible = false;
                    this.loading = true
                    that.getDataList();
                    setTimeout(() => {
                        that.loading = false;
                        that.$message.success('操作成功！');
                    }, 2000)
                    that.ids = [];
                    that.multipleSelection = [];
                });
            }).catch(() => {
                this.$message.info('操作已取消');
            });



        },
        // 点击“分配”之前检查（改为校验 ids）
        _settlement() {
            if (!this.ids.length) return this.$message.info('请先勾选！');
            this.dialogVisible = true;
            // getAmount 可以用 ids，本例中不再从 multipleSelection 推 ids
            // this.getAmount(); // 可删
        },
        searchData() {
            this.ruleForm.current = 1;
            this.ids = [];
            this.multipleSelection = [];
            this.currentPage = 1;
            this.getDataList();
        },
        // 获取数据并回显已选项
        getDataList() {
            // 不要在这里无脑 clearSelection()，否则会擦掉 reserve-selection 的记忆
            listUserInfoPage(this.ruleForm).then((res) => {
                if (res.code === 200) {
                    // 先赋数据
                    this.tableData = res.data.records.map(item => {
                        item.labelNameString = item.labelNames.join(", ");
                        return item;
                    });
                    this.total = res.data.total;

                    // 回显：DOM 渲染后再 toggle 当前页中已被全局 ids 记录的行
                    this.$nextTick(() => {
                        if (!this.$refs.multipleTable) return;
                        this.tableData.forEach((row) => {
                            if (this.ids.includes(row.id)) {
                                // 第二个参数 true 表示选中
                                this.$refs.multipleTable.toggleRowSelection(row, true);
                            } else {
                                // 确保未选中的行被取消（防止残留选择）
                                this.$refs.multipleTable.toggleRowSelection(row, false);
                            }
                        });
                    });
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            console.log(val);
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm = {
                userId: '',
                accountName: '',
                ownerName: this.resignedAccountInfo.name,  // 保留归属人
                phone: '',
                labelName: '',
                current: 1,
                size: 10
            }
        },
        // 当表格页内的选中状态发生变化（单选、多选、全选都触发 selection-change）
        handleSelectionChange(selection) {
            // selection 是当前页中被选中的行（Element 在 reserve-selection 下也可能包含其他页，但为保险处理当前页）
            const selectionIds = selection.map(s => s.id);
            const pageIds = this.tableData.map(r => r.id);

            // 把当前页的 id 全部从全局 ids 中先移除，然后把当前页被选中的 id 加回去
            this.ids = this.ids.filter(id => !pageIds.includes(id)).concat(selectionIds);

            // 去重（以防意外）
            this.ids = Array.from(new Set(this.ids));

            // multipleSelection 可以同步当前页 selection（仅用于界面需要完整行对象时用）
            this.multipleSelection = selection.slice();
        },
        // 当用户点击表头的“全选/全不选”时触发（注意：select-all 的入参是当前页的 selection）
        handleSelectAll(selection) {
            // 直接复用 selection-change 的逻辑
            this.handleSelectionChange(selection);
        },
        //可结算金额
        getAmount() {
            //重要代码
            this.multipleSelection.forEach((item) => {
                this.ids.push(item.id);
            });
        },
        handleClose() {
            this.dialogVisible = false;
            this.ids = [];
        },
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        }
    }
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
.dialogClass {
    /deep/ .el-input__inner {
        color: #333333;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    /deep/.el-tree-node__content {
        height: 30px;
    }

    /deep/.el-tree-node__content:hover {}

    /deep/.el-tree-node.is-current {}

    /deep/.el-tree-node__label {
        font-size: 15px;
    }

    /deep/ .is-current .el-tree-node__content {
        background-color: #ffe8f0;
    }
}

.title-box {
    display: flex;
    padding: 20px;
    align-items: center;

    .title-left {
        margin-right: 100px;

        .title-key {
            color: rgba(0, 0, 0, 0.87);
            font-size: 16px;
            font-weight: 700;
        }

        .title-value {
            color: #5e626d;
            font-size: 12px;
        }
    }

    .title-right {
        display: flex;

        .info-item {
            &:nth-child(1) {
                border-right: 1px solid #e5e5e5;
            }

            &:nth-child(2) {
                border-right: 1px solid #e5e5e5;
            }

            color: #5e626d;
            padding: 2px 30px;
        }
    }
}

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

.drawerFrom {
    color: #747b8b;

    .drawer-main {
        padding: 20px;
        border-top: 1px solid #a4a4a4;

        .drawer-card {
            padding: 20px 0;
            border-bottom: 1px solid #a4a4a4;

            .drawer-card-left {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .drawer-card-right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: #000000;
            }
        }
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
        td:nth-child(2) {
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
