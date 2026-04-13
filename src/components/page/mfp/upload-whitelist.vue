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
                    <el-form ref="ruleForm" :model="ruleForm"
                        style="padding: 30px 20px 0px 20px; display: flex; justify-content: space-between">
                        <el-form-item>
                            <el-input v-model="ruleForm.userId" placeholder="客户ID" clearable
                                :style="{ width: '180px' }"></el-input>
                        </el-form-item>
                        <div class="button" style="display: flex; align-items: center; gap: 15px">
                            <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                            <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                            <el-button type="primary" @click="exportFile">导入</el-button>
                        </div>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; font-size: 14px" v-loading="loading"
                    element-loading-text="加载中，请稍后" tooltip-effect="dark">
                    <el-table-column prop="userId" label="客户ID" align="center"> </el-table-column>
                    <el-table-column prop="payinStandardRate" label="标准订单利率" align="center"> </el-table-column>
                    <el-table-column prop="payinDelatedRate" label="延时订单利率" align="center"> </el-table-column>
                    <el-table-column prop="payoutFeeRate" label="payout费率" align="center"> </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="ruleForm.size" layout="sizes, prev, pager, next"
                    :total="total" :current-page.sync="ruleForm.current" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>
        <el-dialog :visible="dialogParams.visible" title="上传白名单文件" width="500px" :before-close="handleClose">
            <div class="upload-file">
                <div>
                    <span>上传模板：</span><a
                        href="https://file.dowsure.com/boss/documents/%E4%B8%8A%E4%BC%A0%E7%99%BD%E5%90%8D%E5%8D%95%E6%A8%A1%E6%9D%BF.xlsx">白名单模板</a>
                </div>
                <el-upload class="upload-btn" :on-success="handleSuccess" :action="actionUrl" accept="xlsx"
                    :headers="myHeaders" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getMfpFeeConfig, updateAccount } from '@/api/crm'; //导入文件
export default {
    name: 'authorized-store',
    data() {
        return {
            currentAccountId: '',
            accountNameIsEditing: false,
            loading: false,
            ruleForm: {
                userId: '',
                offerId: '',
                salesName: '',
                userPhone: '',
                current: 1,
                size: 10,
                userName: ''
            },
            tableData: [],
            total: 0,
            disabled: false,
            timeArray: [],
            totalAmount: 0,
            dialogParams: {
                visible: false
            },
            fileList: [],
            actionUrl: `${process.env.VUE_APP_BASE_URL}/lending/mfp/importFeeConfig`,
            myHeaders: { token: '' }
        };
    },
    created() {
        this.myHeaders.token = localStorage.getItem('token');
        this.getDataList();
    },

    methods: {
        searchData() {
            this.ruleForm.current = 1;
            this.getDataList();
        },
        getDataList() {
            this.loading = true;
            this.ruleForm.userName = this.userName;
            getMfpFeeConfig(this.ruleForm)
                .then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data.records.map((re) => {
                            return {
                                ...re,
                                payinStandardRate: this.formatPercent(re.payinStandardRate),
                                payinDelatedRate: this.formatPercent(re.payinDelatedRate),
                                payoutFeeRate: this.formatPercent(re.payoutFeeRate)
                            };
                        });
                        this.total = res.data.total;
                    } else {
                        this.tableData = [];
                    }
                })
                .finally(() => {
                    this.loading = false;
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
            this.getDataList();
        },
        reset() {
            this.ruleForm = {
                userId: '',
                current: 1,
                size: 10
            };
            this.getDataList();
        },
        exportFile() {
            this.dialogParams.visible = true;
        },
        handleSuccess(res, file) {
            console.log('🚀 ~ handleSuccess ~ res:', res);
            if (res.code === 200 && res.data) {
                this.handleClose();
                // 获取表格数据
                this.getDataList();
                this.$message.success('导入文件成功');
            } else {
                this.$message.error(res.message);
            }
        },
        handleClose() {
            this.dialogParams.visible = false;
            this.fileList = [];
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
        }
    },
    computed: {
        userName() {
            let username = localStorage.getItem('userName');
            return username ? username : '';
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

::v-deep .el-drawer__header {
    margin-bottom: 0;
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
}

.upload-file {
    .upload-btn {
        margin-top: 20px;
    }
}
</style>
