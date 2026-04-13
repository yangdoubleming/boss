<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                / 贷款定价管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
            <el-button style="float: right" type="primary" @click="editStart(0)">新增配置</el-button>
        </div>
        <table-page @filter-item-change='changeRoleSearchSelect' @page-change="handlePageChange"
            @conditional-reset="handleConditionalReset" @conditional-query="handleColumnsFilter" @editStart="editStart"
            @useStart="useStart" @removerUse="removerUse" :filterOptions="filterOptions" :totalSize="totalSize"
            :tableData="tableData" :columns="columns" :current="currentPage"></table-page>
        <!-- 配置生效 -->
        <el-dialog :close-on-click-modal="false" title="配置生效" :visible.sync="useProduct" width="35%">
            <el-form :rules="useRules" :inline="false" :model="useForm" ref="useForm"
                style="padding-left: 20px;width: 70%;" label-width="150px" label-position="left">
                <el-form-item label="生效开始日期:" prop="startTime">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" v-model="useForm.startTime"
                        type="datetime" placeholder="生效开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="生效结束日期:" prop="endTime">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" v-model="useForm.endTime"
                        type="datetime" placeholder="生效结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="closeUse('useForm')" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="enusreUse" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增配置 -->
        <el-dialog :close-on-click-modal="false" custom-class="change-price" :title="isEdit ? '修改配置' : '新增配置'"
            :visible.sync="addFormShow" width="35%">
            <el-form :rules="addRules" :inline="false" :model="addForm" ref="addForm"
                style="padding-left: 20px;width: 70%;" label-width="150px" label-position="left">
                <el-form-item label="配置名称：" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="维度级别:" prop="level">
                    <el-select @change="choseLevel" style="width: 100%;" v-model="addForm.level">
                        <el-option value="1" label="一级"></el-option>
                        <el-option value="2" label="二级"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="所属上级维度:" prop="superiorsName" v-if="addForm.level != 1 && addForm.level != '1级'">
                    <el-select style="width: 100%;" v-model="addForm.superiorsName">
                        <el-option v-for="item in levelList" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参数值:" prop="value">
                    <el-input v-model="addForm.value"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="addFormShow = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="ensureAdd" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getMainData, deleteData, ensureUse, addNewUse, getSelectData, getAllData, changeIncome } from '../../../api/price'
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            temp1: [],
            allList: [],
            pids: [],//条件筛选
            addRules: {
                title: [
                    { required: true, message: '请输入配置名称', trigger: 'blur' },
                ],
                value: [
                    { required: true, message: '请输入参数值', trigger: 'value' },
                ],
                level: [
                    { required: true, message: '请选择维度级别', trigger: 'change' },
                ],
                superiorsName: [
                    { required: true, message: '请选择所属上级维度', trigger: 'change' },
                ],
            },
            levelList: [],
            user: localStorage.getItem('userName'),
            totalSize: 0,//总条数
            isEdit: false,//是否是编辑
            // 配置生效
            useRules: {
                startTime: [
                    { required: true, message: '请输入生效开始日期', trigger: 'change' },
                ],
                endTime: [
                    { required: true, message: '请输入生效结束日期', trigger: 'change' },
                ],
            },
            useForm: {
                startTime: '',
                endTime: '',
            },
            addFormShow: false, //新增弹窗
            addForm: {},
            useProduct: false, //配置生效
            tableData: [],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '一级维度',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '二级维度',
                    filterable: true
                }
            ],
            columns: [
                {
                    label: '配置名称',
                    prop: 'title',
                },
                {
                    label: 'Code',
                    prop: 'code',
                }, {
                    label: '维度级别',
                    prop: 'level',
                },
                {
                    label: '所属上级维度',
                    prop: 'superiorsName',
                    width: 150

                },
                {
                    label: '参数值',
                    prop: 'value',
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'status',
                },
                {
                    label: '生效开始日期',
                    prop: 'startTimeStr',
                    width: 160
                },
                {
                    label: '生效截止日期',
                    prop: 'endTimeStr',
                    width: 160

                }, {
                    label: '创建人',
                    prop: 'createName',
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 160

                },
                {
                    label: '更新人',
                    prop: 'updateName',
                }, {
                    label: this.$t('loan_detail_gxsj'),
                    prop: 'updateTime',
                    width: 160

                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'useStart',
                            text: '生效',
                            type: 'primary'
                        },
                        {
                            event: 'editStart',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary',
                            code: 'CREDIT_UPDATA'
                        },
                        {
                            event: 'removerUse',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
        }
    },
    created() {
        this.getAllList()
    },
    methods: {
        //获取所有的维度总数据
        getAllList() {
            getMainData(
                {
                    current: 1,
                    size: 100000,
                    billType: 'PRODUCT',
                }).then(res => {
                    this.allList = res.data.records;
                    this.allList.forEach(item => {
                        if (!this.temp1.includes(item.title)) {
                            this.temp1.push(item.title)

                        }
                    })
                    this.filterOptions[0].options = []
                    this.filterOptions[0].value = ""
                    this.temp1.forEach(item => {
                        if (item != '业务输入') {
                            this.filterOptions[0].options.push({
                                label: item,
                                value: item
                            })
                        }
                    })

                }).catch(err => {
                    this.loading = false
                })
        },
        changeRoleSearchSelect(val, prop) {
            if (prop.placeholder == "一级维度") {
                this.filterOptions[1].options = []
                this.filterOptions[1].value = ""
                this.allList.forEach(item => {
                    if (item.title == val) {
                        this.filterOptions[1].options.push({
                            label: item.value,
                            value: item.value
                        })
                    }
                })
            }
        },
        choseLevel() {
            let level
            if (this.addForm.level.includes('级')) {
                level = (this.addForm.level.replace('级', '').replace(' ', '')) - 1
            } else {
                level = this.addForm.level - 1

            }
            // if (level) {
            getSelectData({ level }).then(res => {
                this.levelList = res.data
            })
            // }
        },
        //表单清空
        closeUse(formName) {
            this.$refs[formName].resetFields();
            this.addFormShow = false
            this.useProduct = false
        },
        //删除配置
        removerUse(row) {
            this.$confirm('请确定是否删除配置吗?', '删除配置', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteData(
                    {
                        data: {
                            current: this.currentPage,
                            size: 10,
                        },
                        id: row.id
                    },

                ).then(res => {
                    this.$message.success('删除成功！');
                    this.getAllList()
                    this._getList();
                });
            });
        },
        //打开配置生效的弹窗
        useStart(row) {
            this.useForm.id = row.id
            this.useForm.updateName = this.user
            this.useProduct = true
        },
        //确认配置生效
        enusreUse() {
            this.$refs.useForm.validate((valid) => {
                if (valid) {
                    let date1 = new Date(this.useForm.startTime)
                    let date2 = new Date(this.useForm.endTime)
                    let time1 = date1.getTime();
                    let time2 = date2.getTime();
                    if (
                        time1 - time2 > 0
                    ) {
                        return this.$message.error('结束时间不能小于开始时间！');
                    }
                    ensureUse(this.useForm).then(res => {
                        if (res.code == 200) {
                            this.$message.success('配置生效成功！');
                            this.closeUse('useForm')
                            this._getList()
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        //确认新增配置
        ensureAdd() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if (!this.isEdit) {
                        this.addForm.createName = this.user
                        this.levelList.forEach(item => {
                            if (item.value == this.addForm.superiorsName) {
                                this.addForm.pid = item.id
                            }
                        })
                        addNewUse(
                            {
                                pid: this.addForm.pid,
                                title: this.addForm.title,
                                createName: this.addForm.createName,
                                level: Number(this.addForm.level),
                                billType: "PRODUCT",
                                value: this.addForm.value,
                            }
                        ).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增配置成功！');
                                this.closeUse('addForm')
                                this.getAllList()
                                this._getList()
                            }
                        })
                    } else {
                        this.addForm.createName = this.user
                        if (this.addForm.level == 1) {
                            this.addForm.pid = 0
                        } else {
                            this.levelList.forEach(item => {
                                if (item.value == this.addForm.superiorsName) {
                                    this.addForm.pid = item.id
                                }
                            })
                        }

                        changeIncome({
                            data: this.addForm,
                            id: this.addForm.id
                        }).then(res => {
                            this.closeUse('addForm')
                            this.$message.success('修改成功')
                            this._getList()
                            this.getAllList()
                            this.loading = false
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //编辑或新增配置
        editStart(row) {
            if (row.title) {
                this.isEdit = true
                this.addForm = { ...row }
                this.choseLevel()
                this.addFormShow = true
            } else {
                this.addForm = {}
                this.isEdit = false
                this.addFormShow = true
            }

        },
        //获取表格数据
        _getList() {
            getMainData({
                current: this.currentPage,
                size: 10,
                title: this.filterOptions[0].value,
                billType: 'PRODUCT',
                value: this.filterOptions[1].value,
            }).then(res => {
                res.data.records.forEach(item => {
                    if (item.status == '生效') {
                        item.hiddenBtn = '生效'
                    }
                });
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            })
        },
    },
};
</script>