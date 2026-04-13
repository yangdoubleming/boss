<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <div style="text-align: right; margin-bottom: 20px">
            <el-button type="primary" @click="onExport">导出命中名单</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">新增预警</el-button>
        </div>
        <table-page
            :tableData="tableData"
            :showFilterRadio="false"
            :columns="columns"
            :scroll="{ x: 1300 }"
            :current="currentPage"
            :totalSize="totalSize"
            @seeRules="showRules"
            @page-change="handlePageChange"
        />
        <!-- ====================================================新增规则========================================================= -->
        <el-dialog title="新建贷中预警" :visible.sync="dialogFormVisible" width="600px" :before-close="cancelAdd">
            <el-form :model="form" style="padding-left: 20px" label-width="150px">
                <el-form-item label="资方">
                    <el-select v-model="form.lenderId" :placeholder="$t('loan_detail_choose')" style="width: 300px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addRiskWarning">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { lenderList, riskRuleList, saveRiskRule } from '@/api/risk';
import axios from 'axios';

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                lenderId: ''
            },
            dialogFormVisible: false, //新增角色
            currentPage: 1,
            totalSize: 0,
            tableData: [],
            options: [],
            value: '',
            columns: [
                {
                    label: '资方',
                    prop: 'lenderName'
                },
                {
                    label: '启用规则数',
                    prop: 'turnOnCount'
                },
                {
                    label: '更新时间',
                    prop: 'updateTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '240',
                    operates: [
                        {
                            event: 'seeRules',
                            text: '配置',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    mounted() {
        this._getList();
    },
    methods: {
        onExport() {
            const axios = require('axios');
            let that = this;
            axios({
                method: 'get',
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/risk/customer/export`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 新增角色
        addRiskWarning() {
            saveRiskRule(this.form.lenderId).then((res) => {
                this.$message.success('新增成功！');
                this._getList();
                this.cancelAdd();
            });
        },
        //获取资方列表
        getLenderList() {
            lenderList({}).then((res) => {
                res.data.forEach((item) => {
                    if (
                        !this.tableData.some((row) => row.lenderName === item.lenderName) &&
                        !this.options.some((row) => row.value === item.id) && item.lenderType!=='未合作'
                    ) {
                        this.options.push({ value: item.id, label: item.lenderName });
                    }
                });
            });
        },
        _getList() {
            riskRuleList({ current: this.currentPage, size: 10 }).then((res) => {
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
                this.getLenderList();
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList();
        },
        cancelAdd() {
            this.dialogFormVisible = false;
            this.form = {
                lenderId: ''
            };
        },
        showRules(val) {
            this.$router.push(
                `/warningConfigurationSet?lenderId=${val.lenderId}&lenderName=${val.lenderName}&turnOnCount=${val.turnOnCount}`
            );
        },
        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return YY + MM + DD;
        }
    }
};
</script>

<style>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
