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
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @delete="_deleteBanner" />
        <el-drawer size="45%" title="审批" :visible.sync="dialogFormVisible" direction="rtl">
            <addChannel :isApprove="true" v-loading="loading" :detailData="detailData" @push="pushForm"
                :platfrom="platfrom" @_approve="_approve"></addChannel>
        </el-drawer>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { bannerList, deleteBanner } from '../../../api/statistics';
import addChannel from '../../common/channel/add-channel.vue';
export default {
    name: 'banner-admin',
    mixins: [tableMixin],
    components: {
        tablePage,
        addChannel
    },
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            tableOperate: [],
            detailData: {},
            tableData: [],
            platfrom: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: 'code',
                    filterable: true,
                    options: []
                }, {
                    type: 'input',
                    value: '',
                    placeholder: '描述',
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: '图片',
                    prop: 'bannelImageUrl',
                    cellEdit: 'img'
                },
                {
                    label: '类型',
                    prop: 'bannelType'
                },

                {
                    label: '请求code',
                    prop: 'bannelGatewayCode'
                },

                {
                    label: '描述',
                    prop: 'bannelDescribe',
                    width: 200
                },
                {
                    label: '排序',
                    prop: 'sort'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
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
    created() {

    },
    methods: {
        _deleteBanner(val) {
            this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteBanner(val.id).then((res) => {
                    this._getList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            });
        },
        _approve(id, type) {
            if (type) {
                approve(id, localStorage.getItem('userName')).then((res) => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            } else {
                returnApprove(id, localStorage.getItem('userName')).then((res) => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            }
        },
        pushForm(form, type) {
            // type  1保存 2提交

            if (type == 1) {
                createDetail(form).then((res) => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            } else {
                createOrEditDetail(form, form.channelCode ? 'PATCH' : 'PUT').then((res) => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            }
        },
        _getList() {
            bannerList({
                gatewayCode: this.filterOptions[0].value,
                describe: this.filterOptions[1].value,
                page: this.currentPage,
                rows: 10
            }).then((res) => {
                res.data.records.forEach((item) => {
                    item.bannelType = item.bannelType == 1 ? 'h5' : 'pc';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.loading = true;
            this.dialogFormVisible = true;
            getMerchantDetail(val.id).then((res) => {
                this.loading = false;
                res.data.dates = [res.data.startTime || '', res.data.endTime || ''];
                this.detailData = res.data;
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