<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
                    :columns="columns" :totalSize="totalSize" @edit="toDetail" :detailTable="true"
                    @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
                    @page-change="handlePageChange" />
        <el-dialog title="新建目标" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="目标统计月份" style="margin-right:30px" prop="dates">
                    <el-date-picker
                        v-model="form.monthOfYear"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="目标组别" style="margin-right:30px" prop="dates">
                    <el-select v-model="groupId" placeholder="请选择组别" style="width:200px" @change="changeGroupId">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="_addProfit" style="width:80px;height:35px">新建</el-button>
                <el-button @click="dialogFormVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getPlatformList, addPlatform } from '../../../api/statistics';
import { pmProfitList, profitSave, salesGroupList } from '../../../api/member';
export default {
    name: 'target-pm',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                current: 0,
                size: 10,
                id: null,
                year: "",
                month: "",
                monthOfYear: "",
                salesGroupId: "",
                profitTarget: 0
            },
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '年份',
                    filterable: true,
                    options: []
                },

                {
                    type: 'input',
                    value: '',
                    placeholder: '月份',
                    filterable: true,
                    options: []
                },
            ],
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            columns: [
                {
                    label: '年份',
                    prop: 'year'
                },
                {
                    label: '月份',
                    prop: 'month'
                },
                {
                    label: '总体边际利润目标（万元）',
                    prop: 'profitTarget'
                },
                {
                    label: '修改',
                    prop: '',
                    width: '90',
                    operates: [
                        {
                            event: 'edit',
                            text: '修改',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            groupId: '',
            groupList: []
        };
    },
    created() {
        this._getList()
        this._getGroup()
    },
    methods: {
        _addProfit() {
            this.form.current = this.currentPage
            this.form.year = this.form.monthOfYear.split('-')[0]
            this.form.month = this.form.monthOfYear.split('-')[1]
            this.form.salesGroupId = this.groupId
            profitSave(this.form).then(res => {
                this.dialogFormVisible = false
                this.$message.success('操作成功!')
                this._getList()
            })
        },
        changeGroupId(val){
            this.groupId = val;
        },
        //获取组别
        _getGroup(){
            salesGroupList({
                current: this.currentPage,
                size: 10,
            }).then((res) => {
                this.groupList = res.data.records
                this.groupId = this.groupList[0].id
            });
        },
        handleSelectionChange(val) {

            this.multipleSelection = val;
        },

        _getList() {
            console.log(this.filterOptions[2]);
            pmProfitList({
                year: this.filterOptions[0].value,
                month: this.filterOptions[1].value,
                current: this.currentPage,
                size: 10,

            }).then((res) => {

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/target-edit',
                query: val
            });
        }
    }
};
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px;
    height: 178px;
    display: block;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
}

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