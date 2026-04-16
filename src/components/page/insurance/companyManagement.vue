<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">保司管理</span>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" label-width="85px" style="padding: 30px 0px 20px 5px">
                        <el-row style="display: flex">
                            <el-form-item label="保险公司：" style="margin-left: 20px">
                                <el-input v-model="ruleForm.companyName"></el-input>
                            </el-form-item>
                            <el-button type="primary" @click="searchData"
                                style="width: 90px; height: 35px">搜索</el-button>
                            <el-button @click="reset"
                                style="margin-left: 20px; border: 1px solid #409EFF; color: #409EFF; width: 90px; height: 35px">重置</el-button>
                            <el-button type="primary" @click="addInfo"
                                style="margin-left: 20px; width: 90px; height: 35px">新增</el-button>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="font-size: 14px; font-weight: 600; color: #777; margin-bottom: 20px">保司列表</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin: 0 20px">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="companyName" label="保险公司" align="center"> </el-table-column>
                    <el-table-column prop="cooperationProductNum" label="合作产品数" align="center"> </el-table-column>
                    <el-table-column prop="cooperationTime" label="合作时间" align="center"> </el-table-column>
                    <el-table-column prop="cooperationTerm" label="合作有效期/年" align="center"> </el-table-column>
                    <el-table-column prop="rate" label="返点佣金" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.rate === '' || scope.row.rate === null">-</div>
                            <div v-else>{{ scope.row.rate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="action" label="操作" align="center">
                        <template slot-scope="scope">
                            <a @click="redact(scope.row)"
                                style="color: #409EFF; cursor: pointer; margin-right: 15px">编辑</a>
                            <a @click="detail(scope.row)" style="color: #409EFF; cursor: pointer">详情</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="ruleForm.size"
                    @current-change="currentChange" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" width="30%" class="diaPage" :close-on-click-modal="false">
            <div class="title">{{ title }}</div>
            <el-form :model="partnerForm" :rules="rules" ref="partnerForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="保险公司：" prop="companyName">
                    <el-input v-model="partnerForm.companyName" maxlength="30" @change="blurImg"></el-input>
                </el-form-item>
                <el-form-item label="合作时间：" prop="cooperationTime">
                    <el-date-picker type="date" v-model="partnerForm.cooperationTime" style="width: 100%"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="合作期限：" prop="cooperationTerm">
                    <el-input v-model="partnerForm.cooperationTerm" type="number"
                        oninput="if(value.length>2) value=value.slice(0,2)">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="主协议：">
                    <el-upload class="upload-demo" accept=".pdf, .doc, .docx," :action="uploadUrl" :limit="1"
                        icon="el-icon-link" :data="loadData" :on-success="handleAvatarSuccess" :file-list="fileList"
                        :on-exceed="handleExceed" :headers="headers" name="upLoadImage" :on-remove="handleRemove">
                        <el-button size="small" type="primary">上 传</el-button>
                        <span style="font-size: 13px; color: #999; margin-left: 6%">可上传word、pdf文件</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="互联网协议：">
                    <el-upload accept=".pdf, .doc, .docx," ref="upload" class="upload-demo" :action="uploadUrl"
                        :limit="1" icon="el-icon-link" :data="loadData1" :on-success="handleAvatarSuccess1"
                        :file-list="fileList1" :on-exceed="handleExceed1" :headers="headers" name="upLoadImage"
                        :on-remove="handleRemove1">
                        <el-button size="small" type="primary">上 传</el-button>
                        <span style="font-size: 13px; color: #999; margin-left: 6%">可上传word、pdf文件</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="其他协议：">
                    <el-upload ref="upload" class="upload-demo" :action="uploadUrl" :limit="10" icon="el-icon-link"
                        :data="loadData2" :on-success="handleAvatarSuccess2" :file-list="fileList2"
                        :on-exceed="handleExceed2" :headers="headers" name="upLoadImage" :on-remove="handleRemove2"
                        accept=".pdf, .doc, .docx," :before-upload="beforeAvatarUpload">
                        <el-button size="small" type="primary">上 传</el-button>
                        <span style="font-size: 13px; color: #999; margin-left: 6%">可上传word、pdf文件</span>
                    </el-upload>
                    <div style="font-size: 13px; color: #999; margin-left: 5px">温馨提示：其他协议的协议名不可重复</div>
                </el-form-item>
                <el-form-item label="返点佣金：" prop="rate">
                    <el-input v-model="partnerForm.rate">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="(dialogVisible = false), (fileList = []), (fileList1 = []), (fileList2 = [])"
                    style="margin-right: 15px; color: #409EFF; border-color: #409EFF">取 消</el-button>
                <el-button type="primary" @click="uploadData" :disabled="disable">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { companyPageList, addAndUpdate, detailCompany } from '@/api/insur';
export default {
    name: 'companyManagement',
    data() {
        return {
            ruleForm: {
                companyName: '',
                current: 1,
                size: 10
            },
            baseUrl: process.env.VUE_APP_BASE_URL,
            isactive: 0,
            tableData: [],
            total: 0,
            dialogVisible: false,
            title: '新增合作保司',
            partnerForm: {
                companyName: '', // 保司名称
                cooperationTime: '', //合作时间
                cooperationTerm: '', // 合作期限
                rate: '', // 返点佣金
                id: '',
                fileList: []
            },
            rules: {
                companyName: [
                    { required: true, message: '请输入保险公司', trigger: 'blur' },
                    { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
                ],
                cooperationTime: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
                cooperationTerm: [
                    { required: true, message: '请输入合作期限', trigger: 'blur' },
                    { min: 0, max: 2, message: '长度在 0 到 2 个字符', trigger: 'blur' }
                ],

            },
            uploadUrl: '',
            fileList: [],
            fileList1: [],
            fileList2: [],
            disable: false,
            headers: {
                token: ''
            },
            // 主协议参数
            loadData: {
                companyName: '',
                type: 'main'
            },
            // 互联网协议参数
            loadData1: {
                companyName: '',
                type: 'internet'
            },
            // 其他协议参数
            loadData2: {
                companyName: '',
                type: 'other'
            },
            arr: []
        };
    },
    mounted() {
        this.uploadUrl = this.baseUrl + '/insurance/company/upload';
    },
    created() {
        this.headers.token = localStorage.getItem('token');
        this.getDataList(this.ruleForm);
    },
    methods: {
        lastArray(fileList) {
            console.log(fileList);
            let fileType = fileList;
            this.arr.push(fileList);
            for (var i = 0; i < this.arr.length; i++) {
                for (var j = i + 1; j < this.arr.length; j++) {
                    if (fileType.agreementType === this.arr[i].agreementType) {
                        this.arr[i] = fileType;
                    }
                    if (this.arr[i].fileType == this.arr[j].fileType) {
                        this.arr.splice(j, 1);
                        j--;
                    }
                }
            }
            return this.arr;
        },
        searchData() {
            this.ruleForm.current = 1;
            this.total = 0;
            this.getDataList(this.ruleForm);
        },
        reset() {
            this.ruleForm.companyName = '';
        },
        getDataList(paramer) {
            companyPageList(paramer).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            });
        },


        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        blurImg(value) {
            // console.log(value);
            this.loadData.companyName = value;
            this.loadData1.companyName = value;
            this.loadData2.companyName = value;
        },
        // 上传成功
        handleAvatarSuccess(res, file, fileList) {
            console.log(fileList);
            if (res.code === 200) {
                this.$message.success('上传成功');
                this.partnerForm.fileList.push({
                    agreementType: res.data.agreementType,
                    agreementName: res.data.fileName,
                    longUrl: res.data.longUrl,
                    shortUrl: res.data.shortUrl
                });
            } else {
                this.$message.error(res.message);
                this.fileList = [];
            }
        },
        handleAvatarSuccess1(res, file) {
            if (res.code === 200) {
                this.$message.success('上传成功');
                this.partnerForm.fileList.push({
                    agreementType: res.data.agreementType,
                    agreementName: res.data.fileName,
                    longUrl: res.data.longUrl,
                    shortUrl: res.data.shortUrl
                });
            } else {
                this.$message.error(res.message);
                this.fileList1 = [];
            }
        },
        handleAvatarSuccess2(res, file, fileList) {
            console.log(file);
            if (res.code === 200) {
                this.$message.success('上传成功');
                this.partnerForm.fileList.push({
                    agreementType: res.data.agreementType,
                    agreementName: res.data.fileName,
                    longUrl: res.data.longUrl,
                    shortUrl: res.data.shortUrl
                });
                this.fileList2.push({
                    agreementType: res.data.agreementType,
                    name: file.name.split('.')[0]
                });
            } else {
                this.$message.error(res.message);
                this.fileList2 = fileList.filter((item) => {
                    if (item.response) {
                        return item.response.code == 200;
                    } else {
                        return item.agreementType == 'other';
                    }
                });
            }
            console.log(this.fileList2);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前仅可选择 1 个文件，请先删除之前选择的文件，上传新的文件。`);
        },
        handleExceed1(files, fileList) {
            this.$message.warning(`当前仅可选择 1 个文件，请先删除之前选择的文件，上传新的文件。`);
        },
        handleExceed2(files, fileList) {
            this.$message.warning(`当前仅可选择 10 个文件，请先删除之前选择的文件，上传新的文件。`);
        },
        //移除成功
        handleRemove(file, fileList) {
            if (file.response) {
                console.log('上传');
                this.partnerForm.fileList = this.partnerForm.fileList.filter((item) => {
                    return item.agreementType !== file.response.data.agreementType;
                });
            } else {
                this.partnerForm.fileList = this.partnerForm.fileList.filter((item) => {
                    console.log('回显');
                    return item.agreementType !== file.agreementType;
                });
            }
            console.log(this.partnerForm.fileList);
        },
        handleRemove1(file, fileList) {
            if (file.response) {
                console.log('上传');
                this.partnerForm.fileList = this.partnerForm.fileList.filter((item) => {
                    return item.agreementType !== file.response.data.agreementType;
                });
            } else {
                this.partnerForm.fileList = this.partnerForm.fileList.filter((item) => {
                    console.log('回显');
                    return item.agreementType !== file.agreementType;
                });
            }
            console.log(this.partnerForm.fileList);
        },
        handleRemove2(file, fileList) {
            console.log(this.fileList2, '过滤前的fileList2');
            if (file.response) {
                for (let i = 0; i < this.partnerForm.fileList.length; i++) {
                    if (
                        this.partnerForm.fileList[i].agreementType === file.response.data.agreementType &&
                        this.partnerForm.fileList[i].agreementName === file.response.data.fileName
                    ) {
                        this.partnerForm.fileList.splice(i, 1);
                        break;
                    }
                }
            } else {
                for (let i = 0; i < this.partnerForm.fileList.length; i++) {
                    if (
                        this.partnerForm.fileList[i].agreementType === file.agreementType &&
                        this.partnerForm.fileList[i].agreementName === file.name.split('.')[0]
                    ) {
                        this.partnerForm.fileList.splice(i, 1);
                        break;
                    }
                }
            }
            this.fileList2 = this.fileList2.filter((item) => {
                // console.log(item);
                return file.name !== item.name;
            });

            // for (let i = 0; i < this.fileList2.length; i++) {
            //     if (this.fileList2[i].name === file.name) {
            //         this.fileList2.splice(i, 1);
            //         break;
            //     }
            // }
            console.log(this.fileList2, 'fileList2');
            console.log(this.partnerForm.fileList, '文件列表');
        },
        // 判断是否为pdf 或者word文件
        // beforeAvatarUpload(file) {
        //     console.log(file);
        //     // const isPdf = file.type === 'application/pdf';
        //     // const isWord = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //     // if (!isPdf && !isWord) {
        //     //     this.$message.error('仅支持word、pdf文件上传!');
        //     // }
        //     // return isPdf || isWord;
        // },
        uploadData() {
            if (!this.partnerForm.companyName) {
                this.$message.warning('保司名称不能为空');
                return false;
            }
            if (!this.partnerForm.cooperationTime) {
                this.$message.warning('合作时间不能为空');
                return false;
            }
            if (!this.partnerForm.cooperationTerm) {
                this.$message.warning('合作期限不能为空');
                return false;
            }

            // if (this.partnerForm.rate) {
            //     if (!/(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/.test(this.partnerForm.rate)) {
            //         this.$message.warning('返点佣金输入错误,请输入0-100数字,最多可保留两位小数');
            //         return false;
            //     }
            // }

            if (this.partnerForm.cooperationTerm.length >= 2) {
                let str = this.partnerForm.cooperationTerm;
                if (str.startsWith('0')) {
                    let arr = str.split('0');
                    this.partnerForm.cooperationTerm = arr[1];
                }
            }

            this.disable = true;
            console.log(this.partnerForm);
            addAndUpdate(this.partnerForm, this.partnerForm.id)
                .then((res) => {
                    if (res.code === 200) {
                        this.dialogVisible = false;
                        this.getDataList(this.ruleForm);
                        this.partnerForm.companyName = '';
                        this.partnerForm.cooperationTime = '';
                        this.partnerForm.cooperationTerm = '';
                        this.partnerForm.rate = '';
                        this.fileList = [];
                        this.fileList1 = [];
                        this.fileList2 = [];
                        this.partnerForm.id = '';
                        this.partnerForm.fileList = [];
                        this.disable = false;
                    } else {
                        this.disable = false;
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    // this.$message.error(err.message);
                    this.disable = false;
                });
        },
        addInfo() {
            this.dialogVisible = true;
            this.title = '新增合作保司';
            this.partnerForm.companyName = '';
            this.partnerForm.cooperationTime = '';
            this.partnerForm.cooperationTerm = '';
            this.partnerForm.rate = '';
            this.partnerForm.id = '';
            this.partnerForm.fileList = [];
            this.fileList = [];
            this.fileList1 = [];
            this.fileList2 = [];
            this.disable = false;
        },
        redact(value) {
            // console.log(value);
            this.dialogVisible = true;
            this.title = '编辑合作保司';
            this.fileList = [];
            this.fileList1 = [];
            this.fileList2 = [];
            detailCompany({
                id: value.id
            }).then((res) => {
                // console.log(res);
                this.partnerForm = res.data;
                this.loadData.companyName = value.companyName;
                this.loadData1.companyName = value.companyName;
                this.loadData2.companyName = value.companyName;
                this.partnerForm.fileList.forEach((item) => {
                    if (item.agreementType === '主协议') {
                        item.agreementType = 'main';
                        this.fileList.push({
                            name: item.agreementName,
                            agreementType: 'main'
                        });
                    } else if (item.agreementType === '互联网协议') {
                        item.agreementType = 'internet';
                        this.fileList1.push({
                            name: item.agreementName,
                            agreementType: 'internet'
                        });
                    } else {
                        item.agreementType = 'other';
                        this.fileList2.push({
                            name: item.agreementName,
                            agreementType: 'other'
                        });
                    }
                });
            });
        },
        detail(value) {
            this.$router.push({
                path: 'insurCompanyDetail',
                query: {
                    companyId: value.id,
                    companyCode: value.companyCode,
                }
            });
        },
        //失败回调
        beforeAvatarUpload(file) {
            // console.log(file, 'before');
            // console.log(this.fileList2);
            let name = file.name.split('.')[0];
            let flag = true;
            for (let i = 0; i < this.fileList2.length; i++) {
                let newNmae = this.fileList2[i].name.split('.')[0];
                if (newNmae == name) {
                    flag = false;
                }
            }
            if (!flag) {
                this.$message.warning('其他协议中不能上传相同的文件名！');
            }
            return flag;
        }
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }

    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .condition {
        width: 200px;
        line-height: 32px;
        padding: 0 15px;

        a {
            padding: 5px 20px;
            border: 1px solid #e71d5d;
            color: #e71d5d;
            font-size: 13px;
        }

        a:nth-child(2) {
            border-left: none;
        }

        .addclass {
            background-color: #e71d5d;
            color: #fff;
            border: 1px solid #e71d5d;
        }
    }

    .el-form-item {
        width: 26%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }
}

.diaPage {
    /deep/.el-dialog__header {
        padding: 0;
    }

    /deep/.el-dialog__body {
        padding: 30px 12%;
    }

    .title {
        text-align: center;
        font-size: 16px;
        color: #000;
        margin-bottom: 50px;
    }

    .upload-demo {

        // display: flex;
        /deep/.el-upload-list__item:first-child {
            margin-top: -5px;
        }

        /deep/.el-upload-list__item-name {
            color: #409EFF;
        }

        /deep/.el-icon-document {
            color: #409EFF;
        }
    }

    /deep/.el-upload--text {
        width: 100%;
        border: none;
        text-align: left;
        height: 35px;

        .el-button {
            padding: 5px 22px;
            color: #409EFF;
            background-color: #fff;
        }
    }

    /deep/.el-upload-list {
        overflow: hidden;
        margin-left: 10px;
    }

    /deep/.el-dialog__footer {
        text-align: center;
        padding-bottom: 40px;

        .el-button {
            padding: 7px 20px;
        }
    }
}

/deep/.el-table__row {
    td:nth-child(2) {
        color: #409EFF;
    }
}
</style>