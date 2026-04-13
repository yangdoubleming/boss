<template>
    <div>
        <div class="top-btn">
            <el-button type="primary" @click="goAdd">新建</el-button>
        </div>
        <table-page v-loading="loading" :tableData="tableData" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @update="goUpdata" />
        <el-dialog width="20%" title="新建" :visible.sync="dialogFormVisible">
            <el-date-picker value-format="yyyy-MM" style="width: 100%;" v-model="addMonth" type="month"
                placeholder="选择时间">
            </el-date-picker>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensureAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { costPage, costAdd } from '@/api/index'
export default {
    name: "costList",
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            addMonth: '',
            dialogFormVisible: false,
            loading: false,
            tableData: [
            ],
            filterOptions: [
                {
                    type: 'year',
                    value: '',
                    placeholder: '年',
                    filterable: true,
                    options: []
                },
                {
                    type: 'month',
                    value: '',
                    placeholder: '月',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: '年份',
                    prop: 'yearStr',
                },
                {
                    label: '月份',
                    prop: 'yearMonthStr',
                },
                {
                    label: '合计固定成本',
                    prop: 'costTotal',
                },
                {
                    label: '操作',
                    prop: '',
                    operates: [
                        {
                            event: 'update',
                            text: '修改',
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    methods: {
        //确定
        ensureAdd() {
            if (!this.addMonth) {
                this.$message.error('请选择月份')
                return
            }
            costAdd({
                yearMonthStr: this.addMonth
            }).then(res => {
                if (res.code == 200) {
                    this.$message.success('添加成功')
                    this._getList()
                    this.dialogFormVisible = false
                }
            })
        },
        //获取数据
        _getList() {
            costPage({
                current: this.currentPage,
                size: 10,

            }).then(res => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            })
        },
        //修改
        goUpdata(row) {
            this.$router.push({
                path: '/cost-detail',
                query: {
                    yearMonthStr: row.yearMonthStr
                }
            })
        },
        //新增
        goAdd() {
            this.addMonth = ''
            this.dialogFormVisible = true
        }
    }
}
</script>
<style lang="scss" scoped>
.top-btn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-top: 20px;
}
</style>