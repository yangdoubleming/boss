<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" @click="dialogFormVisible = true">新增线索</el-button>
        </div>

        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" />
        <el-dialog title="新增线索" :visible.sync="dialogFormVisible" width="35%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left:20px" label-width="150px"
                label-position="left">
                <el-form-item label="线索数量" style="margin-right:30px">
                    <el-input v-model="form.totalNumber" autocomplete="off" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="日期" style="margin-right:30px">
                    <el-date-picker v-model="form.totalTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"></el-date-picker>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" @click="_addLead" style="width:80px;height:35px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { leadList, addLead } from '../../../api/index';
export default {
    name: 'lead',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                totalNumber: '',
                totalTime: '',
            },
            dialogFormVisible: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'daterange',
                    value: '',
                    placeholder: '',
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: '统计数量',
                    prop: 'totalNumber'
                },
                {
                    label: '统计时间',
                    prop: 'totalTime'
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '180',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: this.$t('common_see'),
                //             type: 'primary'
                //         },
                //          {
                //             event: '22',
                //             text: '冻结',
                //             type: 'danger'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    },
    created() { },
    methods: {
        _addLead() {
            addLead(this.form).then((res) => {
                this.$message.success('操作成功！')
                this._getList()
                this.dialogFormVisible = false
                this.form = {
                    totalNumber: '',
                    totalTime: '',
                }
            })
        },
        _getList() {
            let star =
                this.filterOptions[0].value && this.filterOptions[0].value.length ? this.filterOptions[0].value[0] + ' 00:00:00' : '';
            let end = this.filterOptions[0].value && this.filterOptions[0].value.length ? this.filterOptions[0].value[1] + ' 23:59:59' : '';
            leadList(this.currentPage, star, end).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.$router.push({
                path: '/loaned-detail',
                query: {
                    id: val.id
                }
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