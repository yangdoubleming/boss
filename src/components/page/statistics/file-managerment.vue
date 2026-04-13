<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div
                style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
                <el-form-item label="资源位置">
                    <el-select v-model="ruleForm.resource_tag" :placeholder="$t('loan_detail_choose')"
                        @change="submitForm" clearable>
                        <el-option v-for="item in resourcetagList" :key="item.id" :label="item.dict_name"
                            :value="item.dict_value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-select v-model="ruleForm.is_active" @change="submitForm"
                        :placeholder="$t('loan_detail_choose')">
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">查询</el-button>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button type="primary" icon="el-icon-document-add"
                        @click="dialogFormVisible = true">上传文件</el-button>
                </el-form-item>
            </div>
        </el-form>
        <NewTable @page-change="handlePageChange" :current="ruleForm.page" :totalSize="totalSize" :columns="columns"
            :tableData="tableData" @delete="handleDelete" @edit="editForm">
            <template v-slot:resource_tag>
                <el-table-column label="资源位" prop="resource_tag" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.resource_tag }}
                    </template>
                </el-table-column>
            </template>

            <template v-slot:file_size>
                <el-table-column label="图片大小" prop="file_size" align="center">
                    <template slot-scope="scope">
                        {{ parseFloat(scope.row.file_size / 1024 / 1024).toFixed(2) + 'M' }}
                    </template>
                </el-table-column>
            </template>

            <template v-slot:is_active>
                <el-table-column label="是否上架" prop="is_active" align="center">
                    <template slot-scope="scope">
                        <el-switch @change="(e) => {
                handleImageActivate(e, scope.row.id);
            }
                " :active-value="0" :inactive-value="1" v-model="scope.row.is_active" active-color="#13ce66"
                            inactive-color="#ff4949" :disabled="loading">
                        </el-switch>
                    </template>
                </el-table-column>
            </template>

            <template v-slot:action>
                <el-table-column label="操作" prop="action" align="center">
                    <template slot-scope="scope">
                        {{ scope }}
                    </template>
                </el-table-column>
            </template>

            <template v-slot:full_path>
                <el-table-column label="图片" prop="full_path" align="center">
                    <template slot-scope="scope">
                        <img @click="handlePictureCardPreview(scope.row.full_path)" :src="scope.row.full_path" alt=""
                            style="height: 120px" />
                    </template>
                </el-table-column>
            </template>
        </NewTable>

        <el-dialog class="new-image" title="新增-图片" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="资源位标签" style="margin-right: 30px" prop="resource_tag">
                    <el-select v-model="form.resource_tag" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in resourcetagList" :key="item.id" :label="item.dict_name"
                            :value="item.dict_value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传图片" prop="fileList">
                    <el-upload action="#" ref="ossUpload" v-model="form.fileList" :multiple="false"
                        :on-change="handleFileChange" :auto-upload="false" :limit="1" list-type="picture-card">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{ file }">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                    @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否上架" prop="is_active">
                    <el-switch :active-value="0" :inactive-value="1" v-model="form.is_active" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否保留原文件名" prop="visit_type">
                    <el-switch :active-value="0" :inactive-value="1" v-model="form.visit_type" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="file_sort">
                    <el-input-number v-model="form.file_sort" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="图片链接" prop="file_link_url">
                    <el-input v-model="form.file_link_url" label="图片链接"></el-input>
                </el-form-item>
                <el-form-item label="链接是否新页面打开" prop="is_open">
                    <el-switch :active-value="0" :inactive-value="1" v-model="form.is_open" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="_addPlatform" style="width: 80px; height: 35px">确 定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    queryImage,
    uploadImageFile,
    getImageFileList,
    deleteImageById,
    updateImageFile,
    getResourcetagList
} from '../../../api/fileUpload';
import { put } from '../../../utils/oss.js';
import NewTable from '../../common/NewTable.vue';

export default {
    name: 'platform-list',
    mixins: [tableMixin],
    components: {
        tablePage,
        NewTable
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            dialogFormVisible: false,
            loading: false,
            resourcetagList: [],
            ruleForm: {
                resource_tag: '',
                is_active: '',
                page: 1,
                row: 10
            },
            form: {
                resource_tag: null,
                is_active: 0,
                fileList: null,
                visit_type: 0,
                file_sort: 1,
                file_link_url: '',
                full_path: '',
                is_open: 0,
                id: ''
            },
            tableOperate: [],
            tableData: [],
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            columns: [
                {
                    label: 'ID',
                    prop: 'id',
                    width: '50',
                    align: 'center'
                },
                {
                    label: '资源位',
                    prop: 'resource_tag',
                    notRedner: true
                },
                {
                    label: '资源位备注',
                    prop: 'resource_remake'
                },
                {
                    label: '保存位置',
                    prop: 'file_path',
                    type: 'file_path',
                    align: 'center'
                },
                {
                    label: '图片',
                    prop: 'full_path',
                    notRedner: true
                },
                {
                    label: '图片大小',
                    prop: 'file_size',
                    notRedner: true
                },
                {
                    label: '是否上架',
                    prop: 'is_active',
                    notRedner: true
                },
                {
                    label: '图片排序',
                    align: 'center',
                    prop: 'file_sort'
                },
                {
                    label: '更新时间',
                    prop: 'update_time',
                    type: 'dateFromNode',
                    align: 'center',
                    width: 90
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: 'action',
                    operates: [
                        {
                            event: 'delete',
                            text: this.$t('loan_detail_delete'),
                            type: 'text',
                            popConfirm: true
                        },
                        {
                            event: 'edit',
                            text: '编辑',
                            type: 'text',
                            popConfirm: true
                        }
                    ],
                    align: 'center',
                    fixed: 'right'
                }
            ],
            rules: {
                resource_tag: [{ required: true, message: '请选择资源位标签', trigger: 'blur' }],
                fileList: [{ required: true, message: '请上传图片', trigger: 'change' }],
                is_active: [{ required: true, message: '请选择是否上架', trigger: 'change' }],
                visit_type: [{ required: true, message: '请选择是否用MD5加密', trigger: 'change' }],
                file_sort: [{ required: true, message: '请选择图片的排序', trigger: 'change' }],
                file_link_url: [{ max: 200, message: '长度不能大于200', trigger: 'blur' }]
            },
            totalSize: 0
        };
    },
    mounted() {
        this._getResourcetagList();
    },
    methods: {
        resetForm() {
            this.ruleForm = {
                resource_tag: '',
                is_active: '',
                page: 1,
                row: 10
            }
            this._getList()
        },
        submitForm() {
            this.ruleForm.page = 1
            this.ruleForm.row = 10
            this._getList()
        },
        editForm(val) {
            console.log(val);
            for (let k in this.form) {
                this.form[k] = val[k];
            }
            this.dialogFormVisible = true;
        },
        handlePageChange(page) {
            this.ruleForm.page = page;
            this._getList();
        },
        handleFileChange(file, fileList) {
            const isLt5M = file.size / 1024 / 1024 < 50;
            fileList;
            const isImage = file.raw.type.indexOf('image') !== -1;

            if (!isLt5M) {
                this.$message.error('上传图片大小不能超过 50MB!');
                this.$refs.ossUpload.clearFiles();
                return;
            }
            if (!isImage) {
                this.$message.error('只能上传图片!');
                this.$refs.ossUpload.clearFiles();
                return;
            }
            this.form.fileList = [];
            this.form.fileList = [file];
        },
        handleRemove(file) {
            this.$refs.ossUpload.clearFiles();
        },
        initFormData() {
            this.form = {
                resource_tag: null,
                is_active: 0,
                fileList: null,
                visit_type: 0,
                file_sort: 1,
                file_link_url: '',
                full_path: '',
                is_open: 0,
                id: ''
            };
            this.handleRemove();
        },
        handlePictureCardPreview(file) {
            typeof file === 'string' ? (this.dialogImageUrl = file) : (this.dialogImageUrl = file.url);
            this.dialogVisible = true;
        },
        //todo: 添加图片预览时，点击可以下载。
        handleDownload(file) {
            console.log(file);
        },
        async _addPlatform() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    let file = this.form.fileList[0];
                    let fileName = file.name.split('.');
                    let realFileName = fileName[0];
                    if (this.form.visit_type === 0) {
                        fileName[0] = this.$md5(fileName[0]);
                        file.name = fileName.join('.');
                    }

                    let path = [this.form.resource_tag];
                    let remake = this.resourcetagList.filter((item) => item.dict_value === path[0])[0].dict_name;
                    let ossRes = await put(file, path);
                    let data = {
                        scene_tag: 'ACTIVITY',
                        resource_tag: this.form.resource_tag,
                        resource_remake: remake,
                        file_md5_name: fileName[0],
                        file_real_name: realFileName,
                        file_suffix: fileName[1],
                        file_path: path.join('/'),
                        full_path: ossRes.url,
                        file_size: file.size,
                        is_active: this.form.is_active,
                        visit_type: this.form.visit_type,
                        file_sort: this.form.file_sort,
                        file_link_url: this.form.file_link_url,
                        is_open: this.form.is_open
                    };
                    if (this.form.id) {
                        data.id = this.form.id;
                        let res = await updateImageFile(data);
                        if (res.code === 200) {
                            this.dialogFormVisible = false;
                            this.$message({
                                message: '上传成功～',
                                type: 'success'
                            });
                            this._getList();
                        } else {
                            this.$message({
                                message: '发生错误，请联系管理员。',
                                type: 'error'
                            });
                        }
                    } else {
                        let res = await uploadImageFile(data);
                        if (res.code === 200) {
                            this.dialogFormVisible = false;
                            this.$message({
                                message: '上传成功～',
                                type: 'success'
                            });
                            this._getList();
                        } else {
                            this.$message({
                                message: '发生错误，请联系管理员。',
                                type: 'error'
                            });
                        }
                    }

                    this.loading = false;
                    this.initFormData();
                } else {
                    return false;
                }
            });
        },
        _getList() {
            getImageFileList(this.ruleForm)
                .then((res) => {
                    this.tableData = res.data.imageList;
                    this.totalSize = res.data.total;
                    this.ruleForm.page = res.data.page;
                })
                .catch((err) => {
                    this.$message({
                        message: '发生错误，请联系管理员。',
                        type: 'error'
                    });
                });
        },
        _getResourcetagList() {
            getResourcetagList({ resource_type: 'RESOURCE_LOCATION' })
                .then((res) => {
                    this.resourcetagList = res.data.resourcetagList;
                })
                .catch((err) => {
                    this.$message({
                        message: '发生错误，请联系管理员。',
                        type: 'error'
                    });
                });
        },
        handleDelete(index, row, event, text) {
            if (this.loading) {
                return;
            }
            this.loading = true;
            deleteImageById({ id: index.id })
                .then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '删除成功～',
                            type: 'success'
                        });
                        this._getList();
                    } else {
                        this.$message({
                            message: '发生错误，请联系管理员。',
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: '发生错误，请联系管理员。',
                        type: 'error'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleImageActivate(is_active, id) {
            if (this.loading) {
                return;
            }
            this.loading = true;
            updateImageFile({ id, is_active })
                .then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: is_active === 0 ? '图片上架成功。' : '图片下架成功。',
                            type: is_active === 0 ? 'success' : 'error'
                        });
                        this._getList();
                    } else {
                        this.$message({
                            message: '发生错误，请联系管理员。',
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: '发生错误，请联系管理员。',
                        type: 'error'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang='less' scoped>
.new-image {}

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