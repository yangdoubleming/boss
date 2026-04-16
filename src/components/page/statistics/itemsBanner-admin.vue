<template>
    <div class="itemsBanner">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" icon="el-icon-document-add"
                @click="addItemsBanner">新增</el-button>
        </div>

        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange"
            @getContent="_getContent" @updateBanner="_updateBanner" @deleteItems="_deleteItems" />
        <el-dialog width="35%" :title="isEdit ? '编辑' : '新增'" :visible.sync="dialogFormVisible" direction="rtl">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="code">
                    <el-input v-model="form.gateWayCode"></el-input>
                </el-form-item>

                <el-form-item label="类型">
                    <el-select v-model="bannelType" :placeholder="$t('loan_detail_choose')">
                        <el-option label="h5" value="1"></el-option>
                        <el-option label="pc" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" v-for="(item, index) in form.bannelList" :key="item.key">
                    <div class="upload" @click="uploadIndex = index">
                        <el-upload class="avatar-uploader" :action="uploadUrl" :on-success="uploadSuccess"
                            :on-preview="openImg" :show-file-list="false" :on-remove="handleRemove">
                            <img v-if="item.bannelImageUrl" :src="item.bannelImageUrl" class="avatar"
                                style="width:146px;height:146px" />
                            <i v-if="!item.bannelImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <el-input v-model="item.bannelHrefUrl" placeholder="网址"
                        style="width:380px;margin-top:5px;"></el-input>

                    <el-input v-model="item.bannelDescribe" placeholder="描述"
                        style="width:380px;margin-top:5px;"></el-input>
                    <div style="margin-top:5px">
                        <el-button @click="openImg({ url: item.bannelImageUrl })" type="success"
                            v-if="item.bannelImageUrl">查看</el-button>
                        <el-button @click="deleteBannerItem(index)" type="danger">删除</el-button>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="_createBanner">{{ isEdit ? '提交修改' : '立即创建' }}</el-button>
                    <el-button type="warning" @click="addBanner">新增图片</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <el-carousel indicator-position="none" height="500px" style="padding:0px 50px 25px 50px" :loop="false"
                :autoplay="false">
                <el-carousel-item v-for="item in dialogImageUrl" :key="item" style="display:flex;align-items: center;
    justify-content: center;">
                    <img style="height:100%" :src="item" alt />
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { itemsBanner, deleteBanner, createBanner, bannerList } from '../../../api/statistics';
export default {
    name: 'banner-admin',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            isEdit: false,
            dialogImageUrl: '',
            uploadIndex: '',
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            dialogVisible: false,
            form: {
                gateWayCode: '',
                bannelDescribe: '',
                bannelType: '',
                bannelList: [
                    {
                        bannelImageUrl: '',
                        bannelHrefUrl: '',
                        id: '1'
                    }
                ]
            },
            loading: false,
            dialogFormVisible: false,
            tableOperate: [],
            detailData: {},
            tableData: [],
            platfrom: [],
            bannelType: '',
            deleteIds: '',
            imgs: '',
            filterOptions: [
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
                    label: 'code',
                    prop: 'bannel_gateway_code'
                },
                {
                    label: '类型',
                    prop: 'bannel_type'
                },

                {
                    label: '条数',
                    prop: 'count'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '230',
                    operates: [
                        {
                            event: 'getContent',
                            text: '查看图片',
                            type: 'primary'
                        },
                        {
                            event: 'updateBanner',
                            text: this.$t('loan_detail_xg'),
                            type: 'warning'
                        },
                        {
                            event: 'deleteItems',
                            text: this.$t('loan_detail_delete'),
                            type: 'danger'
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
        _deleteItems(row) {
            this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(row);
                bannerList({
                    bannelType: row.bannel_type == 'h5' ? 1 : 2,
                    gatewayCode: row.bannel_gateway_code,
                    bannelDescribe: '',
                    page: 1,
                    rows: 10
                }).then((res) => {
                    let str = '';
                    res.data.records.forEach((item) => {
                        str = str += item.id + ',';
                    });
                    deleteBanner(str).then((res) => {
                        this._getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                });
            });
        },
        addItemsBanner() {
            this.isEdit = false;
            this.bannelType = '';

            this.dialogFormVisible = true;
        },
        _updateBanner(row) {
            this.isEdit = true;
            this.deleteIds = '';

            this.form.gateWayCode = row.bannel_gateway_code;
            this.bannelType = row.bannel_type == 'pc' ? '2' : '1';
            console.log(this.form);
            bannerList({
                bannelType: row.bannel_type == 'h5' ? 1 : 2,
                gatewayCode: row.bannel_gateway_code,
                bannelDescribe: '',
                page: 1,
                rows: 10
            }).then((res) => {
                this.form.bannelList = [];
                res.data.records.forEach((item) => {
                    this.form.bannelList.push(item);
                });
                this.dialogFormVisible = true;
            });
        },
        deleteBannerItem(index) {
            if (this.isEdit) {
                this.deleteIds += this.form.bannelList[index].id + ',';
            }
            this.form.bannelList.splice(index, 1);
        },
        _getContent(row) {
            bannerList({
                gatewayCode: row.bannel_gateway_code,
                bannelDescribe: '',
                bannelType: row.bannel_type == 'h5' ? 1 : 2,
                page: 1,
                rows: 10
            }).then((res) => {
                this.dialogImageUrl = [];
                res.data.records.forEach((item) => {
                    this.dialogImageUrl.push(item.bannelImageUrl);
                });
                this.dialogVisible = true;
            });
        },
        _createBanner() {
            if (!this.form.gateWayCode) {
                return this.$message.info('请输入code');
            }
            if (!this.bannelType) {
                console.log(this.form);
                return this.$message.info('请选择类型');
            }
            if (!this.form.bannelList.length) {
                return this.$message.info('请上传图片');
            }
            this.form.bannelType = this.bannelType;
            this.form.bossName = localStorage.getItem('userName');
            this.form.bannelList.forEach((item, index) => {
                item.sort = index + 1;
            });
            let obj = {};
            obj.bossName = localStorage.getItem('userName');
            obj.data = this.form.bannelList;
            obj.data.forEach((item) => {
                item.gateWayCode = this.form.gateWayCode;
                item.bannelType = this.form.bannelType;
            });
            createBanner(obj).then((res) => {
                this.$message.success('操作成功！');
                this.dialogFormVisible = false;
                this.form = {
                    gateWayCode: '',
                    bannelDescribe: '',
                    bannelType: '',
                    bannelList: [
                        {
                            bannelImageUrl: '',
                            bannelHrefUrl: '',
                            key: '1'
                        }
                    ]
                };

                if (this.isEdit && this.deleteIds) {
                    deleteBanner(this.deleteIds).then((res) => {
                        this._getList();
                    });
                } else {
                    this._getList();
                }
            });
        },
        addBanner() {
            this.form.bannelList.push({
                bannelImageUrl: '',
                bannelHrefUrl: '',
                key: Math.round(Math.random() * 99999)
            });
        },
        handleRemove(file) {
            this.form.bannelList[this.uploadIndex].bannelImageUrl = '';
        },
        uploadSuccess(file, index) {
            this.form.bannelList[this.uploadIndex].bannelImageUrl = file.data.fullFilePath;
        },
        openImg(file) {
            this.dialogImageUrl = [file.url];
            this.dialogVisible = true;
        },
        // _deleteBanner(val) {
        //     this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         deleteBanner(val.id).then((res) => {
        //             this._getList();
        //             this.$message({
        //                 type: 'success',
        //                 message: '删除成功!'
        //             });
        //         });
        //     });
        // },

        _getList() {
            itemsBanner(this.filterOptions[0].value, this.currentPage).then((res) => {
                res.data.records.forEach((item) => {
                    item.bannel_type = item.bannel_type == 1 ? 'h5' : 'pc';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }
    }
};
</script>

<style lang='less' scoped>
/deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 146px !important;
    height: 146px !important;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 146px;
    height: 146px;
    line-height: 146px;
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