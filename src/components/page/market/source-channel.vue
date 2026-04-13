<template>
    <div v-loading="loading">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包 /
                市场管理 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" icon="el-icon-document-copy" @click="_add">新增来源</el-button>
        </div>
        <table-page @filter-item-focus="focusSource" @filter-item-change='changeSource' :tableData="tableData"
            :tableOperate="tableOperate" :filterOptions="filterOptions" :columns="columns" :isSource='true'
            :totalSize="totalSize" @quote="toDetail" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="ConditionalReset" @page-change="handlePageChange">
        </table-page>
        <el-dialog custom-class="source-dialog" width="25%" title="新增来源" :visible.sync="dialogFormVisible"
            :with-header="false" @close="closeDia">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="来源名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="级别" prop="level">
                    <el-select @change="getSecondLevel" v-model="ruleForm.level" placeholder="请选择级别">
                        <el-option v-for="item in addLevelAll" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="ruleForm.level != 1" label="父级来源" prop="pid">
                    <el-select v-model="ruleForm.pid" placeholder="请选择父级来源">
                        <el-option v-for="item in addLevelSecond" :key="item.label" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-btn">
                <el-button type="primary" @click="closeDia" style="width: 120px;">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 120px;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { levelSecondList, addSource, levelByInfo, addMarketChannel, editMarketChannel, sourceList, levelList } from '../../../api/statistics';
export default {
    name: 'channel-admin',
    mixins: [tableMixin],
    components: {
        tablePage,
    },
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            tableOperate: [],
            ruleForm: {

            },
            rules: {
                name: [
                    { required: true, message: '请输入来源名称', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '请选择级别', trigger: 'blur' },
                ],

                pid: [
                    { required: true, message: '请选择父级来源', trigger: 'blur' },
                ],
            },
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '来源名称',
                    filterable: true,

                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '级别',
                    filterable: true,
                    options: [],
                    level: 1
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '父级来源',
                    filterable: true,
                    options: [],
                    level: 2
                },
            ],
            columns: [
                {
                    label: '来源名称',
                    prop: 'name',
                },
                {
                    label: '级别',
                    prop: 'levelName',
                },
                {
                    label: '编码',
                    prop: 'code',
                },
                {
                    label: '父级来源',
                    prop: 'pidName',
                },

            ],
            currentPage: 1,
            addLevelAll: [],
            addLevelSecond: [],
        };
    },
    activated() { },
    created() {
        // 获取列表
        this.getLevel()
        // this.getListOne()
    },
    methods: {
        //清空
        ConditionalReset() {
            this.filterOptions.forEach((item) => {
                item.value = '';
            });
            this.filterOptions[2].options = []
            this._getListFirstPage();
        },
        focusSource(val, prop) {
        },
        changeSource(val, prop) {
            if (prop.level == 1) {
                this.filterOptions[2].options = []
                this.filterOptions[2].value = ''
                if (val == 1) {
                    this.filterOptions[2].options = []
                    this.filterOptions[2].value = ''
                } else {
                    levelByInfo({ level: val - 1 }).then(res => {
                        let option = []
                        res.data.forEach((item) => {
                            let obj = {}
                            obj.label = item.name;
                            obj.value = item.id
                            // item = obj
                            option.push(obj)
                        });
                        this.filterOptions[2].options = option;
                    })
                }
            }

        },
        //获取新增来源的父级
        getSecondLevel(val) {
            levelByInfo({ level: val - 1 }).then(res => {
                let option = []
                res.data.forEach((item) => {
                    let obj = {}
                    obj.label = item.name;
                    obj.value = item.id
                    // item = obj
                    option.push(obj)
                });
                this.addLevelSecond = option
            })
        },
        // 获取新增来源的所有级别
        getLevel() {
            levelList().then(res => {
                let option = []
                res.data.forEach((item, index) => {
                    let obj = {}
                    obj.label = item;
                    obj.value = Number(index) + 1
                    item = obj
                    option.push(obj)
                });
                this.addLevelAll = option;
                this.filterOptions[1].options = option
            })
        },
        _add() {
            this.dialogFormVisible = true;
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.level == 1) {
                        this.ruleForm.pid = 0
                    }
                    this.loading = true
                    addSource(this.ruleForm).then(res => {
                        if (res.code == 200) {
                            this.$message.success('新增来源成功')
                            this.closeDia()
                            this._getList()
                        }
                        this.loading = false
                    }).catch(err => {
                        this.loading = false
                    })

                } else {
                    this.loading = false
                    return false;
                }
            });
        },
        // 数据还原
        backData() {
            this.dialogFormVisible = false
            this.currentPage = 1
            this.ruleForm = {

            }
        },
        // 获取列表
        _getList() {
            this.loading = true
            sourceList({
                current: this.currentPage,
                size: 10,
                pid: this.filterOptions[1].value == 1 && !this.filterOptions[2].value ? 0 : this.filterOptions[2].value,
                name: this.filterOptions[0].value,
                level: this.filterOptions[1].value
            }).then(res => {
                this.loading = false
                res.data.records.forEach(item => {
                    if (!item.pidName) {
                        item.pidName = '--'
                    }
                })
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            }).catch(err => {
                this.loading = false
            });
        },
        toDetail(item) {
            this.ruleForm = Object.assign(this.ruleForm, item)
            this.ruleForm.id = item.id
            this.dialogFormVisible = true
        },
        closeDia() {
            // 数据还原
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisible = false
        }
    }
};
</script>


<style lang='less' scoped>
.source-dialog {
    /deep/ .el-select {
        width: 100%;
    }

    /deep/ .el-form--inline .el-form-item {
        margin-right: -10px
    }

    .dialog-btn {
        display: flex;
        justify-content: center;
        gap: 35px;
    }

    /deep/.el-dialog__body {
        padding: 30px 20px 0;
    }
}

/deep/ .source-dialog .el-select {
    width: 100%;
}
</style>