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
            <el-button style="float:right" type="primary" icon="el-icon-document-add" @click="openDia">新增</el-button>
        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange"
            @delete="_delete" @update='_updateF' @cliLink='_changeSwitch' />
        <el-dialog width="35%" :title="isEdit ? '编辑' : '新增'" :visible.sync="dialogFormVisible" direction="rtl">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item :label="$t('loan_detail_email')">
                    <el-input v-model="form.email" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.emailName" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="开启状态">
                    <el-switch v-model="form.enable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="_addOrUpdateEmail">{{ isEdit ? '提交编辑' : '立即创建' }}</el-button>

                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { emailList, deleteBanner, addOrUpdatePopup, deletePopup, addOrUpdateEmail, deleteEmail } from '../../../api/statistics';
import addChannel from '../../common/channel/add-channel.vue';
export default {
    name: 'popup-admin',
    mixins: [tableMixin],
    components: {
        tablePage,
        addChannel
    },
    data() {
        return {
            form: {
                email: '',
                emailName: '',
                emailEnable: true,
                createBossName: '',
                enable: true,
            },
            dialogFormVisible: false,
            tableOperate: [],
            detailData: {},
            tableData: [],
            isEdit: false,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '标题',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '内容',
                    filterable: true,
                    options: []
                },
                {
                    type: 'datetimerange',
                    value: '',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: 'code',
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: '邮箱',
                    prop: 'email'
                },

                {
                    label: '名称',
                    prop: 'emailName'
                },

                {
                    label: '创建人',
                    prop: 'createBossName'
                },
                {
                    label: '创建时间    ',
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'emailEnable',
                    cellEdit: 'link'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',

                    operates: [
                        {
                            event: 'update',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary'
                        },
                        {
                            event: 'delete',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    activated() { },
    created() { },
    methods: {
        openDia() {
            this.dialogFormVisible = true, this.isEdit = false
            Object.keys(this.form).forEach(key => {
                this.form[key] = ''
            })
            this.form.emailEnable = true
            this.form.enable = true
        },
        _changeSwitch(val) {
            val.emailEnable = val.enable ? 1 : 0;
            addOrUpdateEmail([val]).then((res) => {
                this._getList();
                this.$message.success('操作成功！');
            });
        },
        _updateF(row) {
            this.isEdit = true
            this.form = { ...row }
            this.form.enable = this.form.emailEnable
            this.dialogFormVisible = true
        },
        _addOrUpdateEmail() {
            this.form.createBossName = localStorage.getItem('userName');
            this.form.emailEnable = this.form.enable ? 1 : 0;
            addOrUpdateEmail([this.form]).then((res) => {
                this._getList();
                this.$message.success('操作成功！');
                Object.keys(this.form).forEach(key => {
                    this.form[key] = ''
                })
                this.form.enable = true
                this.dialogFormVisible = false
            });
        },
        _delete(row) {
            this.$confirm('此操作将永久删除该邮箱, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteEmail(row.id).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this._getList();
                });
            });
        },
        _createPopup() {
            this.form.popupStartTime = this.form.dates[0];
            this.form.popupEndTime = this.form.dates[1];
            this.form.createBossName = localStorage.getItem('userName');
            addOrUpdatePopup(this.form).then((res) => {
                this._getList();
                this.dialogFormVisible = false;
            });
        },

        _getList() {
            emailList({
                bannerList: this.filterOptions[0].value,
                popupBody: this.filterOptions[1].value,
                popupStartTime: this.filterOptions[2].value ? this.filterOptions[2].value[0] : '',
                popupEndTime: this.filterOptions[2].value ? this.filterOptions[2].value[1] : '',
                popupCode: this.filterOptions[3].value,
                page: this.currentPage,
                rows: 10
            }).then((res) => {
                res.data.records.forEach((item) => {

                    item.emailEnable = Number(item.emailEnable) ? true : false;
                    item.enable = Number(item.emailEnable) ? true : false;
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
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