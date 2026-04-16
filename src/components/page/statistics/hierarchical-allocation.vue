<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />保险后台 / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <!-- <el-row :gutter="24" class="searchForm">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-form
                    ref="ruleForm"
                    :model="ruleForm"
                    style="padding: 30px 20px 30px 20px; display: flex; justify-content: space-between"
                >
                    <el-form-item>
                        <el-input v-model="ruleForm.scrmName" placeholder="资方"></el-input>
                    </el-form-item>
                    <div class="button" style="margin-top: 20px">
                        <el-button type="primary" @click="searchData">查询</el-button>
                        <el-button @click="reset" style="border: 1px solid #409EFF; color: #409EFF">重置</el-button>
                        <span style="margin: 0 20px">已选线索:13条</span>
                        <el-button type="primary" @click="exportExcel" :disabled="disabled">添加返佣资方</el-button>
                    </div>
                </el-form>
            </el-card>
        </el-row> -->

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading">
                    <el-table-column prop="level" label="等级" align="center"> </el-table-column>
                    <el-table-column prop="newCustomerRate" label="新客倍率%" align="center"> </el-table-column>

                    <el-table-column prop="oldCustomerRate" label="老客倍率%" align="center"> </el-table-column>
                    <el-table-column prop="partnerCount" label="合伙人数" align="center"> </el-table-column>

                    <el-table-column prop="" label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <a @click="alterDetail(scope.row)" style="color: #409EFF; cursor: pointer; margin-right: 30px">修改</a>
                            <a @click="viewHistory(scope.row)" style="color: #409EFF; cursor: pointer; margin-right: 30px">历史记录</a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-row>

        <el-dialog title="等级倍率修改" :visible.sync="alterVisible" width="30%" :before-close="alterCancel">
            <el-form ref="alterform" :model="alterform" label-width="130px">
                <el-form-item label="当前修改等级:">
                    <el-input v-model="alterform.level" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改前新客倍率:">
                    <el-input v-model="alterform.newCustomerRate" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改前老客倍率:">
                    <el-input v-model="alterform.oldCustomerRate" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改后新客倍率:">
                    <el-input placeholder="请输入内容" type="number" v-model="alterform.afternewCustomerRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="修改后老客倍率:">
                    <el-input placeholder="请输入内容" type="number" v-model="alterform.afteroldCustomerRate">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="新倍率生效日期:">
                    <el-date-picker
                        v-model="alterform.activationTime"
                        type="date"
                        placeholder="请选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div>
                <i class="el-icon-warning-outline"></i>
                <span style="margin-left: 10px">生效日期当天及后续产生的借款单按更新后的倍率计算</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterCancel">取 消</el-button>
                <el-button type="primary" @click="alterconfirm">确定修改</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="historyTitle" :visible.sync="historyVisible" width="60%" :before-close="historyCancel">
            <el-table :data="historyList" style="width: 100%; font-size: 14px" v-loading="loading">
                <el-table-column prop="createTime" label="创建日期" align="center" width="160px"> </el-table-column>
                <el-table-column prop="status" label="修改状态" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '待生效' ? 'success' : 'info'" disable-transitions>{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="newCustomerRate" label="修改后新客系数%" align="center"> </el-table-column>
                <el-table-column prop="oldCustomerRate" label="修改后老客系数%" align="center"> </el-table-column>
                <el-table-column prop="activationTime" label="生效日期" align="center" width="160px"> </el-table-column>
                <el-table-column prop="modifier" label="修改人" align="center"> </el-table-column>

                <el-table-column prop="cancelTime" label="撤销日期" align="center" width="160px"> </el-table-column>
                <el-table-column prop="cancel" label="撤销人" align="center"> </el-table-column>
                <!-- <el-table-column prop="" label="操作" align="center"  >
                    <template slot-scope="scope">
                        <a @click="alterDetail(scope.row)" style="color: #409EFF; cursor: pointer; margin-right: 30px" v-if="scope.row.status === '待生效'">修改</a>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { getlistAll, updateCoefficient, getHistory } from '@/api/insur';

export default {
    data() {
        return {
            ruleForm: {
                scrmName: ''
            },
            disabled: false,
            tableData: [],
            alterVisible: false,
            historyVisible: false,
            alterform: {
                level: '',
                newCustomerRate: '',
                oldCustomerRate: '',
                afternewCustomerRate: '',
                afteroldCustomerRate: '',
                activationTime: '',
                id: ''
            },
            historyTitle: '',
            historyList: []
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            getlistAll().then((res) => {
                this.tableData = res.data;
            });
        },
        //修改
        alterDetail(scope) {
            this.alterform.newCustomerRate = scope.newCustomerRate;
            this.alterform.oldCustomerRate = scope.oldCustomerRate;
            this.alterform.level = scope.level;
            this.alterform.id = scope.id;
            this.alterVisible = true;
        },
        alterCancel() {
            this.alterVisible = false;

            this.alterform = {
                level: '',
                newCustomerRate: '',
                oldCustomerRate: '',
                afternewCustomerRate: '',
                afteroldCustomerRate: '',
                activationTime: '',
                id: ''
            };
        },
        historyCancel() {
            this.historyVisible = false;
            this.historyTitle = '';
            this.historyList = [];
        },
        alterconfirm() {
            this.alterVisible = false;
            updateCoefficient({
                id: this.alterform.id,
                level: this.alterform.level,
                newCustomerRate: Number(this.alterform.afternewCustomerRate),
                oldCustomerRate: Number(this.alterform.afteroldCustomerRate),
                activationTime: this.alterform.activationTime
            })
                .then((res) => {
                    if (res.code == '200') {
                        this.$message.success('修改成功');
                        this.getDataList();
                        if (this.historyTitle) {
                            getHistory(this.alterform.id).then((res) => {
                                if (res.code == '200') {
                                    this.historyList = res.data;
                                }
                            });
                        }
                    }
                })
                .finally(() => {
                    this.alterform = {
                        level: '',
                        newCustomerRate: '',
                        oldCustomerRate: '',
                        afternewCustomerRate: '',
                        afteroldCustomerRate: '',
                        activationTime: '',
                        id: ''
                    };
                });
        },
        //查看历史记录
        viewHistory(scope) {
            this.historyTitle = 'LV' + scope.level;
            this.historyVisible = true;
            getHistory(scope.id).then((res) => {
                if (res.code == '200') {
                    this.historyList = res.data;
                }
            });
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
    padding: 0 12px;
    .el-form-item {
        width: 18%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }

    .button {
        // width: 300px;
        .el-button {
            // width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    margin-top: 20px;
    // padding: 0 12px;

    /deep/.el-table th > .cell {
        color: #000;
    }

    /deep/.el-table__row {
        height: 40px;

        td:nth-child(8) {
            .cell {
                color: #409EFF;
            }
        }

        td:nth-child(10) {
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
    /deep/.el-dialog__body {
        padding: 0px 50px;
    }

    .title {
        margin: 20px 0;
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }

    .el-form {
        margin: 0 30px;
        margin-top: 30px;
    }

    .el-select {
        width: 100%;
    }

    /deep/.el-dialog__header {
        text-align: center;
        padding-top: 40px;

        /deep/.el-dialog__title {
            font-size: 24px;
        }
    }

    /deep/.el-dialog__footer {
        text-align: center;
        padding: 20px;
        padding-bottom: 50px;
    }
}

.el-pagination {
    text-align: right;
    margin: 30px;
}
</style>