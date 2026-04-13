<template>
    <div>
        <el-button type="primary" @click="showDrawer">新增服务商</el-button>
        <el-dialog title="" :visible.sync="drawer" :close-on-click-modal="false" width="60%" :before-close="handleClose">
            <div class="drawer-box">
                <div class="title-box">{{ dialogTitle }}</div>
                <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px"
                    class="demo-ruleForm">
                    <el-form-item label="服务商主体类型" prop="subjectType">
                        <el-radio-group v-model="ruleForm.subjectType" :disabled="!isAddStatus">
                            <el-radio-button label="大陆"></el-radio-button>
                            <el-radio-button label="香港"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <div>
                        <el-form-item label="服务商名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入服务商名称"></el-input>
                        </el-form-item>
                        <el-form-item label="营业执照号" prop="companyCertNo" v-if="ruleForm.subjectType == '大陆'">
                            <el-input v-model="ruleForm.companyCertNo" placeholder="请输入营业执照号"></el-input>
                        </el-form-item>
                        <el-form-item label="商业登记证编号" v-else prop="businessRegistrationNo">
                            <el-input v-model="ruleForm.businessRegistrationNo" placeholder="请输入商业登记证编号"></el-input>
                        </el-form-item>
                        <el-form-item label="法人名字" prop="legalPersonName">
                            <el-input v-model="ruleForm.legalPersonName" placeholder="请输入法人名字"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="contactName">
                            <el-input v-model="ruleForm.contactName" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="法人身份证" prop="legalPersonId">
                            <el-input v-model="ruleForm.legalPersonId" placeholder="请输入法人身份证"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人手机号" prop="contactPhone">
                            <el-input v-model="ruleForm.contactPhone" placeholder="请输入联系人手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="合作状态" prop="cooperationStatus">
                            <el-select v-model="ruleForm.cooperationStatus" placeholder="请选择合作状态" style="width: 100%;">
                                <el-option v-for="item in cooperationStatusList" :key="item" :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系邮箱" prop="email">
                            <el-input v-model="ruleForm.email" placeholder="请输入联系邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="ruleForm.type" placeholder="请选择类型" style="width: 100%;">
                                <el-option v-for="item in typeList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="公司地址" prop="companyAddress">
                            <el-input v-model="ruleForm.companyAddress" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                        <el-form-item label="公司官网" prop="companywebsite">
                            <el-input v-model="ruleForm.companywebsite" placeholder="请输入公司官网"></el-input>
                        </el-form-item>
                        <el-form-item label="公司规模" prop="companyScale">
                            <el-select v-model="ruleForm.companyScale" placeholder="请选择公司规模" style="width: 100%;">
                                <el-option v-for="item in companyScaleList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="upload-box">
                        <el-upload v-if="uploadReady" class="avatar-uploader" v-loading="loadingA"
                            :on-success="handleAvatarSuccessA" :before-upload="beforeAvatarUploadA" :auto-upload="true"
                            capture="camera" :action="uploadUrl" :show-file-list="false">
                            <el-image class="avatar" v-if="ruleForm.attachments[0] && ruleForm.attachments[0].fileUrl"
                                :src="ruleForm.attachments[0] && ruleForm.attachments[0].fileUrl" :fit="fit"></el-image>
                            <div v-else>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">上传身份证正面</div>
                            </div>
                        </el-upload>
                        <el-upload v-if="uploadReady" class="avatar-uploader" v-loading="loadingB"
                            :on-success="handleAvatarSuccessB" :before-upload="beforeAvatarUploadB" :auto-upload="true"
                            capture="camera" :action="uploadUrl" :show-file-list="false">
                            <el-image class="avatar" v-if="ruleForm.attachments[1] && ruleForm.attachments[1].fileUrl"
                                :src="ruleForm.attachments[1] && ruleForm.attachments[1].fileUrl" :fit="fit"></el-image>
                            <div v-else>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">上传身份证反面</div>
                            </div>
                        </el-upload>
                        <el-upload v-if="uploadReady" class="avatar-uploader" v-loading="loadingC"
                            :on-success="handleAvatarSuccessC" :before-upload="beforeAvatarUploadC" :auto-upload="true"
                            capture="camera" :action="uploadUrl" :show-file-list="false">
                            <el-image class="avatar" v-if="ruleForm.attachments[2] && ruleForm.attachments[2].fileUrl"
                                :src="ruleForm.attachments[2] && ruleForm.attachments[2].fileUrl" :fit="fit"></el-image>
                            <div v-else>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">{{ ruleForm.subjectType == '香港' ? '上传商业登记证' : '上传营业执照' }}
                                </div>
                            </div>
                        </el-upload>
                    </div>
                    <el-form-item label="服务商简介" prop="profile">
                        <el-input v-model="ruleForm.profile" type="textarea" :rows="3" style="width: 500px" placeholder="请输入服务商简介"></el-input>
                    </el-form-item>
                    <div v-show="!isAddStatus">协议管理</div>
                    <div class="upload-box" v-show="!isAddStatus">
                        <div style="width: 50%;">
                            <a style="text-align: center;width: 263px;display: block;" :href="ruleForm.protocolUrl" target="_blank" v-if="ruleForm.protocolUrl"
                                download>查看合作协议</a>
                            <el-upload class="avatar-uploader" v-loading="loadingD" :on-success="handleAvatarSuccessD"
                                :before-upload="beforeAvatarUploadD" :auto-upload="true" capture="camera"
                                :action="uploadUrl" :show-file-list="false">
                                <div>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">上传协议文件</div>
                                </div>
                            </el-upload>
                            <div class="file-tips" v-if="ruleForm.protocolUrl">
                                <div class="file-name">{{ ruleForm.protocolFileName }}</div>
                                <div class="file-ops">
                                    <div class="download" @click="downloadFile(ruleForm.protocolUrl, ruleForm.protocolFileName)">下载</div>
                                     <div class="delete" @click="deleteFile(ruleForm.protocolUrl)">删除</div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 50%;">
                            <a style="text-align: center;width: 263px;display: block;" :href="ruleForm.protocolTemplate" target="_blank" v-show="ruleForm.protocolTemplate"
                                download>查看标准协议模板</a>
                            <el-upload class="avatar-uploader" v-loading="loadingE" :on-success="handleAvatarSuccessE"
                                :before-upload="beforeAvatarUploadE" :auto-upload="true" capture="camera"
                                :action="uploadUrl" :show-file-list="false">
                                <div>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">上传模板文件</div>
                                </div>
                            </el-upload>
                            <div class="file-tips" v-if="ruleForm.protocolTemplate">
                                <div class="file-name">{{ ruleForm.protocolTemplateName }}</div>
                                <div class="file-ops">
                                    <div class="download" @click="downloadFile(ruleForm.protocolTemplate, ruleForm.protocolTemplateName)">下载</div>
                                     <div class="delete" @click="deleteFile(ruleForm.protocolTemplate)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>收款账号信息</div>
                    <div>
                        <el-form-item label="开户银行" prop="bankInfo.bankName">
                            <el-input v-model="ruleForm.bankInfo.bankName" placeholder="请输入开户银行名称"></el-input>
                        </el-form-item>
                        <el-form-item label="银行账户" prop="bankInfo.accountNo">
                            <el-input v-model="ruleForm.bankInfo.accountNo" placeholder="请输入银行账户号码"></el-input>
                        </el-form-item>
                        <el-form-item label="开户名称" prop="bankInfo.accountName">
                            <el-input v-model="ruleForm.bankInfo.accountName" placeholder="请输入开户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="SWIFT代码" prop="bankInfo.swift" v-if="ruleForm.subjectType == '香港'">
                            <el-input v-model="ruleForm.bankInfo.swift" placeholder="请输入SWIFT代码"></el-input>
                        </el-form-item>
                        <el-form-item label="银行行号" prop="bankInfo.bankNo" v-if="ruleForm.subjectType == '大陆'">
                            <el-input v-model="ruleForm.bankInfo.bankNo" placeholder="请输入银行行号"></el-input>
                        </el-form-item>
                        <el-form-item label="开户行分行全称" prop="bankInfo.fullName" v-if="ruleForm.subjectType == '大陆'">
                            <el-input v-model="ruleForm.bankInfo.fullName" placeholder="请输入开户行分行全称"></el-input>
                        </el-form-item>
                    </div>
                    <div>开票信息</div>
                    <div>
                        <el-form-item label="发票抬头" prop="invoiceInfo.invoiceInfo">
                            <el-input v-model="ruleForm.invoiceInfo.invoiceInfo" placeholder="请输入发票抬头"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人名称" prop="invoiceInfo.contact">
                            <el-input v-model="ruleForm.invoiceInfo.contact" placeholder="请输入联系人名称"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话" prop="invoiceInfo.phone">
                            <el-input v-model="ruleForm.invoiceInfo.phone" placeholder="请输入联系人电话"></el-input>
                        </el-form-item>
                        <el-form-item label="纳税人识别号" prop="invoiceInfo.taxNo" v-if="ruleForm.subjectType == '大陆'">
                            <el-input v-model="ruleForm.invoiceInfo.taxNo" placeholder="请输入纳税人识别号"></el-input>
                        </el-form-item>
                        <el-form-item label="发票类型" prop="invoiceInfo.invoiceType" v-if="ruleForm.subjectType == '大陆'">
                            <el-select v-model="ruleForm.invoiceInfo.invoiceType" placeholder="请选择发票类型"
                                style="width: 100%;">
                                <el-option v-for="item in invoiceTypeList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="公司地址" prop="invoiceInfo.address" v-if="ruleForm.subjectType == '大陆'">
                            <el-input v-model="ruleForm.invoiceInfo.address" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item style="margin-top: 20px;display: flex;align-items: center;justify-content: center;" v-if="isAddStatus">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    </el-form-item>
                    <el-form-item style="margin-top: 20px;display: flex;align-items: center;justify-content: center;" v-else>
                        <el-button @click="handleClose">关闭</el-button>
                        <el-button type="primary" @click="saveChanges('ruleForm')">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { 
    addProviderPage, 
    providerPageDetails, 
    providerPageDict, 
    providerAddTemp, 
    providerSave
} from '@/api/index.js';
import { get } from 'lodash';
export default {
    data() {
        return {
            drawerKey: Date.now(),
            loadingA: false,
            loadingB: false,
            loadingC: false,
            loadingD: false,
            loadingE: false,
            uploadReady: false,
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            drawer: false,
            direction: 'rtl',
            dialogTitle: '新增服务商',
            providerId: '',
            subjectTypeList: [],
            cooperationStatusList: [],
            typeList: [],
            idCardTypeList: [],
            companyScaleList: [],
            invoiceTypeList: [],
            fit: 'cover',
            isAddStatus: true,
            ruleForm: {
                subjectType: '大陆',
                bankInfo: {},
                invoiceInfo: {},
                attachments: [
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                ],
                protocolUrl: '',
                protocolFileName: '',
                protocolTemplate: '',
                protocolTemplateName: ''
            },
            // OCR识别结果存储
            ocrResult: {
                name: '',
                idNumber: ''
            },
            // 营业执照/OCR识别结果存储
            licenseOcrResult: {
                name: '',
                regNum: ''
            },
            rules: {
                subjectType: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                legalPersonName: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                legalPersonId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                companyCertNo: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                businessRegistrationNo: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                cooperationStatus: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                contactName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                contactPhone: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.subjectType': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.bankName': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.accountNo': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.swift': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.accountName': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.bankNo': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'bankInfo.fullName': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.invoiceInfo': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.contact': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.phone': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.taxNo': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.invoiceType': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.subjectType': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                'invoiceInfo.address': [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() {
    },
    methods: {
        // 获取数据字典
        async getDict() {
            await providerPageDict().then((res) => {
                this.subjectTypeList = get(res, 'data.subjectTypeList', [])
                this.cooperationStatusList = get(res, 'data.cooperationStatusList', [])
                this.typeList = get(res, 'data.typeList', [])
                this.idCardTypeList = get(res, 'data.idCardTypeList', [])
                this.companyScaleList = get(res, 'data.companyScaleList', [])
                this.invoiceTypeList = get(res, 'data.invoiceTypeList', [])
            })
        },
        async showDrawer(id) {
            this.drawerKey = Date.now(); // ⭐ 关键：强制刷新 drawer 内部内容
            this.drawer = true;
            this.uploadReady = false;
            this.clearData()
            await this.$nextTick();
            this.uploadReady = true;
            window.dispatchEvent(new Event('resize'));
            await this.getDict()
            // 判断ID是否是object
            if (id && typeof id !== 'object') {
                this.dialogTitle = '服务商详情'
                this.providerId = id
                this.isAddStatus = false
                this.getDetails(id)
            } else {
                this.dialogTitle = '新增服务商'
                this.isAddStatus = true
            }
        },
        // 清空数据
        clearData() {
            this.ruleForm = {
                subjectType: '大陆',
                bankInfo: {},
                invoiceInfo: {},
                attachments: [
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                    {
                        fileType: "",
                        fileName: "",
                        fileUrl: "",
                        fullFilePath: ""
                    },
                ],
                protocolUrl: '',
                protocolFileName: '',
                protocolTemplate: '',
                protocolTemplateName: ''
            }
            // 清空OCR识别结果
            this.ocrResult = {
                name: '',
                idNumber: ''
            }
            // 清空营业执照/OCR识别结果
            this.licenseOcrResult = {
                name: '',
                regNum: ''
            }
        },
        getDetails(id) {
            providerPageDetails({ id }).then((res) => {
                this.ruleForm = res.data
            })
        },
        beforeAvatarUploadA() {
            this.loadingA = true;
        },
        beforeAvatarUploadB() {
            this.loadingB = true;
        },
        beforeAvatarUploadC() {
            this.loadingC = true;
        },
        beforeAvatarUploadD() {
            this.loadingD = true;
        },
        beforeAvatarUploadE() {
            this.loadingE = true;
        },
        handleAvatarSuccessA(res, file) {
            this.loadingA = true
            if (res.code === 200 && res.data) {
                this.ruleForm.attachments[0].fileUrl = res.data.fullFilePath
                this.ruleForm.attachments[0].fullFilePath = res.data.fullFilePath
                this.ruleForm.attachments[0].fileType = '身份证正面'
                this.ruleForm.attachments[0].fileName = res.data.fileName
                this.loadingA = false
            } else {
                this.loadingA = false
                this.$message.error(res.message)
            }
        },
        handleAvatarSuccessB(res, file) {
            this.loadingB = true
            console.log(1111999, res)
            console.log(1111999, this.ruleForm)
            if (res.code === 200 && res.data) {
                this.ruleForm.attachments[1].fileUrl = res.data.fullFilePath
                this.ruleForm.attachments[1].fullFilePath = res.data.fullFilePath
                this.ruleForm.attachments[1].fileType = '身份证反面'
                this.ruleForm.attachments[1].fileName = res.data.fileName
                this.loadingB = false
            } else {
                this.loadingB = false
                this.$message.error(res.message)
            }
        },
        handleAvatarSuccessC(res, file) {
            this.loadingC = true
            if (res.code === 200 && res.data) {
                this.ruleForm.attachments[2].fileUrl = res.data.fullFilePath
                this.ruleForm.attachments[2].fullFilePath = res.data.fullFilePath
                this.ruleForm.attachments[2].fileType = this.ruleForm.subjectType == '香港' ? '商业登记证' : '营业执照'
                this.ruleForm.attachments[2].fileName = res.data.fileName
                this.loadingC = false
            } else {
                this.loadingC = false
                this.$message.error(res.message)
            }
        },
        handleAvatarSuccessD(res, file) {
            this.loadingD = true
            if (res.code === 200 && res.data) {
                console.log(1111999, res)
                this.ruleForm.protocolUrl = res.data.fullFilePath
                // 保存文件名
                this.ruleForm.protocolFileName = res.data.fileName
                this.uploadTemp({
                    protocolUrl: res.data.fullFilePath,
                    id: this.providerId
                })
                this.loadingD = false
            } else {
                this.loadingD = false
                this.$message.error(res.message)
            }
        },
        handleAvatarSuccessE(res, file) {
            this.loadingE = true
            if (res.code === 200 && res.data) {
                this.ruleForm.protocolTemplate = res.data.fullFilePath
                // 保存文件名
                this.ruleForm.protocolTemplateName = res.data.fileName
                this.uploadTemp({
                    protocolTemplate: res.data.fullFilePath,
                    id: this.providerId
                })
                this.loadingE = false
            } else {
                this.loadingE = false
                this.$message.error(res.message)
            }
        },
        // 模板上传接口
        uploadTemp(obj) {
            providerAddTemp(obj).then((res) => {

            })
        },
        submitForm(formName) {
            console.log(2222, this.ruleForm)
            if (this.ruleForm.attachments[0].fileUrl == '' || this.ruleForm.attachments[1].fileUrl == '' || this.ruleForm.attachments[2].fileUrl == '') {
                return this.$message.warning('请上传证件图片')
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addProviderPage(this.ruleForm).then((res) => {
                        this.$message.success('创建成功')
                        this.drawer = false
                        this.$emit('refreshData')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 保存修改，调用providerSave接口进行数据暂存
        saveChanges(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新增updatedTime字段，值与updatedAt相同
                    if (this.ruleForm.updatedAt) {
                        this.ruleForm.updatedTime = this.ruleForm.updatedAt;
                    }
                    providerSave(this.ruleForm).then((res) => {
                        this.$message.success('保存成功')
                        this.drawer = false
                        this.$emit('refreshData')
                    }).catch(err => {
                        this.$message.error(err.message || '保存失败')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClose() {
            this.drawer = false;
        },
        deleteFile(fileType) {
            if (fileType === this.ruleForm.protocolUrl) {
                this.ruleForm.protocolUrl = '';
                this.ruleForm.protocolFileName = '';
            } else if (fileType === this.ruleForm.protocolTemplate) {
                this.ruleForm.protocolTemplate = '';
                this.ruleForm.protocolTemplateName = '';
            }
            this.$message.success('删除成功');
        },
        downloadFile(url, fileName) {
            // 处理跨域资源和特殊文件类型的下载
            if (url) {
                // 检查是否为跨域资源
                const isCrossOrigin = this.isCrossOrigin(url);
                
                if (isCrossOrigin) {
                    // 对于跨域资源，使用fetch API获取文件内容后再下载
                    this.downloadCrossOriginFile(url, fileName);
                } else {
                    // 对于同域资源，使用简单的a标签下载
                    this.downloadSameOriginFile(url, fileName);
                }
            } else {
                this.$message.error('下载链接无效');
            }
        },
        // 检查URL是否为跨域
        isCrossOrigin(url) {
            const parsedUrl = new URL(url, window.location.origin);
            return parsedUrl.origin !== window.location.origin;
        },
        // 下载同域文件
        downloadSameOriginFile(url, fileName) {
            const link = document.createElement('a');
            link.href = url;
            if (fileName) {
                link.download = fileName;
            }
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        // 下载跨域文件
        async downloadCrossOriginFile(url, fileName) {
            try {
                // 使用fetch API获取文件内容
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                // 获取Blob对象
                const blob = await response.blob();
                
                // 创建临时URL
                const blobUrl = window.URL.createObjectURL(blob);
                
                // 使用临时URL下载文件
                this.downloadSameOriginFile(blobUrl, fileName);
                
                // 释放临时URL
                setTimeout(() => {
                    window.URL.revokeObjectURL(blobUrl);
                }, 100);
            } catch (error) {
                this.$message.error('下载失败：' + error.message);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.drawer-box {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .title-box {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .demo-ruleForm {
        width: 80%;

        .upload-box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .avatar-uploader {
                width: 263px;
                height: 140px;
                margin-bottom: 30px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .avatar {
                width: 263px;
                height: 140px;
                overflow: hidden;
                border: 1px solid #d9d9d9;
            }

            .file-tips {
                width: 263px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                color: #999;
                margin-top: 10px;

                .file-ops {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .delete {
                        cursor: pointer;
                    }

                    .download {
                        margin-right: 10px;
                        color: rgb(254, 25,140);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
