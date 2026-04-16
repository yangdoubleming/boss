<template>
    <div class="collectionData">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />保险后台 / 保险管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">补录资料</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card>
                    <el-button type="primary" @click="dialogVisible = true">补录资料</el-button>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card>
                    <div style="margin-bottom: 20px; font-weight: 700">补录列表</div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="suppleDate" label="补录时间" align="center"> </el-table-column>
                        <el-table-column prop="zipName" label="补录资料" align="center"> </el-table-column>
                        <el-table-column prop="suppleStatus" label="补录情况" align="center"> </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <a @click="handleView(scope.row)" style="color: #fe1964; cursor: pointer">详情</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="size"
                        @current-change="currentChange"
                        style="text-align: right; margin: 40px 20px"
                        v-if="total > 0"
                    >
                    </el-pagination>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="补录资料" :visible.sync="dialogVisible" width="26%" center class="dialog">
            <div class="attention">
                注意：请上传客户保单/保函，命名格式请按照
                <span>“某某公司_保单”或“某某公司_保函”</span>，公司名请使用<span>被保企业公司名/姓名（中文）</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" label-width="93px" style="margin-top: 20px">
                <el-form-item label="附件上传：" prop="upload">
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        :action="uploadUrl"
                        :limit="1"
                        name="file"
                        icon="el-icon-link"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :data="loadData"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList"
                        :on-exceed="handleExceed"
                        :headers="headers"
                    >
                        <el-button size="small" type="primary">浏览</el-button>
                    </el-upload>
                    <div style="font-size: 13px; color: #999">仅支持.zip格式，最大200M</div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="(dialogVisible = false), (fileList = [])"
                    style="margin-right: 15px; color: #fe1964; border-color: #fe1964"
                    >取 消</el-button
                >
                <el-button type="primary" @click="uploadData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { supplePage } from '@/api/insur';

export default {
    data() {
        return {
            ruleForm: {},
            dialogVisible: false,
            uploadUrl: '',
            rules: {
                upload: [{ type: 'date', required: true, message: '请选择文件', trigger: 'change' }]
            },
            tableData: [],
            // 补录参数
            loadData: {
                upload: '',
                userId: ''
            },
            current: 1,
            total: '',
            size: 10,
            fileList: [],
            headers: {
                token: ''
            },
            baseUrl: process.env.VUE_APP_BASE_URL
        };
    },
    mounted() {
        this.uploadUrl = this.baseUrl + '/insurance/supple/data';
        console.log(this.uploadUrl);
    },
    created() {
        this.loadData.userId = localStorage.getItem('userId');
        this.headers.token = localStorage.getItem('token');
        this.getAdditionalList({
            current: 1,
            size: 10
        });
        // this.$message({
        //     showClose: true,
        //     dangerouslyUseHTMLString: true,
        //     message:
        //         '测试wayFair一下的保险公司与Wayfair平台不对应,数据不做处理<br />测试amazon12的保险公司与Amazon平台不对应,数据不做处理<br />批量投保成功',
        //     type: 'error',
        //     duration:0,

        // });
    },
    methods: {
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        // 补录资料成功
        handleAvatarSuccess(res, file) {
            console.log(res);
            if (res.code === 200) {
                // this.$message.success('上传成功');
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.message,
                    type: 'success',
                    customClass: 'specific'
                });
                this.getAdditionalList({
                    current: 1,
                    size: 10
                });
                this.dialogVisible = false;
                this.fileList = [];
            } else {
                // this.$message.error(res.message);
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.message,
                    type: 'error',
                    customClass: 'specific'
                });
            }
        },
        // 补录资料前调用
        beforeAvatarUpload(file) {
            this.loadData.upload = file;
            let extension = file.name.split('.')[1];
            let extensionList = ['zip'];
            if (extensionList.indexOf(extension) < 0) {
                this.$message.error('只能上传zip文件');
                return false;
            }
            const isLt200m = file.size / 1024 / 1024 < 200;
            console.log(file.size, isLt200m);
            if (!isLt200m) {
                this.$message.error('上传文件大小不能超过 200M!');
                return false;
            }
        },
        uploadData() {
            console.log(this.loadData);
            this.$refs.upload.submit();
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },

        // 获取补录列表
        getAdditionalList(paramer) {
            supplePage(paramer).then((res) => {
                // console.log(res);
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 获取列表详情
        handleView(value) {
            // console.log(value);
            this.$router.push({
                path: '/collection-detail',
                query: {
                    id: value.id
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.current = index;
            this.getAdditionalList({
                current: this.current,
                size: 10
            });
        }
    }
};
</script>

<style lang='less' scoped>
.collectionData {
    .el-card {
        font-size: 15px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .dialog {
        .attention {
            color: #000;
            span {
                font-weight: 700;
            }
        }
        /deep/.el-dialog__header {
            padding: 30px 20px 10px;
            font-weight: 700;
        }
        /deep/.el-dialog__body {
            padding: 20px 35px 10px;
        }
        .down {
            color: #409eff;
            cursor: pointer;
        }
        .upload-demo {
            display: flex;
            /deep/.el-upload-list__item:first-child {
                margin-top: 5px;
            }
            /deep/.el-upload-list__item-name {
                color: #fe1964;
            }
            /deep/.el-icon-document {
                color: #fe1964;
            }
        }
        /deep/.el-upload--text {
            border: none;
            width: 90px;
            height: 35px;
            .el-button {
                padding: 5px 22px;
                color: #fe1964;
                background-color: #fff;
            }
        }
        /deep/.el-upload-list {
            overflow: hidden;
            margin-left: 10px;
        }
        .dialog-footer {
            padding: 0px 20px 35px;
            button {
                padding: 5px 30px;
            }
        }
    }
}
</style>