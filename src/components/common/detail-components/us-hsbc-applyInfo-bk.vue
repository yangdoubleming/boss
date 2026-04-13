<template>
    <div class="hsbc-info-box" v-loading="loadingPersonalInfo">
        <el-form :model="applyInfo" :rules="rules" ref="applyInfo" label-width="200px" class="demo-ruleForm">
            <el-row class="pic-box">
                <el-upload class="avatar-uploader" v-loading="loadingA" :action="uploadUrl" capture="camera"
                    :show-file-list="false" :before-upload="beforeAvatarUploadA" :on-success="handleAvatarSuccessA">
                    <el-image class="avatar" v-if="applyInfo.bCardFrontPath" :src="`${imgsBaseUrl}` +
                        applyInfo.bCardFrontPath
                        " fit="cover"></el-image>
                    <div v-else>
                        <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzrxm.png" alt=""
                            style="width: 280px"></el-image>
                    </div>
                </el-upload>
                <el-upload class="avatar-uploader" style="float: left; margin-left: 20px" v-loading="loadingB"
                    :action="uploadUrl" capture="camera" :show-file-list="false" :before-upload="beforeAvatarUploadB"
                    :on-success="handleAvatarSuccessB">
                    <el-image class="avatar" v-if="applyInfo.bCardBackPath" :src="`${imgsBaseUrl}` +
                        applyInfo.bCardBackPath
                        " fit="cover"></el-image>
                    <div v-else>
                        <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzghm.png" alt=""
                            style="width: 280px"></el-image>
                    </div>
                </el-upload>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="香港企业名称" prop="bcNameHk">
                        <el-input v-model="applyInfo.bcNameHk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="香港企业董事" prop="directorHk">
                        <el-input v-model="applyInfo.directorHk"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="董事电话号码" prop="phoneHk">
                        <el-input v-model="applyInfo.phoneHk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="实控人身份证号" prop="bcLegalpersonIdCard">
                        <el-input v-model="applyInfo.bcLegalpersonIdCard"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="实控人居住地址" prop="bcLegalpersonAddress">
                        <el-input v-model="applyInfo.bcLegalpersonAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="实控人电话号码" prop="bcLegalpersonPhone">
                        <el-input v-model="applyInfo.bcLegalpersonPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="实控人邮箱" prop="bcLegalpersonMail">
                        <el-input v-model="applyInfo.bcLegalpersonMail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="账户名称" prop="bankAccount">
                        <el-input v-model="applyInfo.bankAccount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="开户行" prop="bankName">
                        <el-input v-model="applyInfo.bankName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="账号" prop="bankNo">
                        <el-input v-model="applyInfo.bankNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="Swift Code" prop="swiftCode">
                        <el-input v-model="applyInfo.swiftCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="香港企业注册地址" prop="bcAddressHk">
                        <el-input v-model="applyInfo.bcAddressHk"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="香港公司注册证明书编号" prop="certificateNoHk">
                        <el-input v-model="applyInfo.certificateNoHk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="香港董事身份证号码" prop="bCardIdHk">
                        <el-input v-model="applyInfo.bCardIdHk"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="10">
                    <el-form-item label="香港董事住所地" prop="directorAddress">
                        <el-input v-model="applyInfo.directorAddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="btn-box">
                <el-button type="primary" class="btn" @click="submitCompanyForm('applyInfo')"
                    name="personNextStep">确认修改</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { saveOrUpdateUsdLoan } from '../../../api/index';
export default {
    props: {
        pageInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        bInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        userAndCompanyInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        reEditBank: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        pageInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.dataList = newV;
                this.showPage = true;
            }
        },
        bInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.bInfoObj = JSON.parse(JSON.stringify(newV));
                this.$forceUpdate()
            }
        },
        userAndCompanyInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                let obj = JSON.parse(JSON.stringify(newV))
                this.applyInfo = Object.assign(this.applyInfo, obj)
            }
        }
    },
    data() {
        return {
            loadingA: false,
            loadingB: false,
            applyInfo: {
                bcNameHk: '',
                directorHk: '',
                phoneHk: '',
                bcLegalpersonIdCard: '',
                bcLegalpersonAddress: '',
                bcLegalpersonPhone: '',
                bankAccount: '',
                bankName: '',
                bankNo: '',
                swiftCode: '',
                bcAddressHk: '',
                bCardIdHk: '',
                directorAddress: '',
                bCardFrontPath: '',
                bCardBackPath: '',
                bcLegalpersonMail:'',
                certificateNoHk:''
            },
            bInfoObj: {},
            options: [],
            dataList: {},
            showPage: false,
            loanUse: '',
            isEdit: false,
            loadingPersonalInfo:false,
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            rules: {

            }
        };
    },
    mounted() {

    },
    methods: {
        // 身份证正面
        beforeAvatarUploadA(file) {
            this.loadingA = true;
        },
        handleAvatarSuccessA(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingA = false;
                this.applyInfo.bCardFrontPath = res.data.filePath;
            } else {
                this.loadingA = false;
                this.$message.error(res.message);
            }
        },
        // 身份证反面
        beforeAvatarUploadB(file) {
            this.loadingB = true;
        },
        handleAvatarSuccessB(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingB = false;
                this.applyInfo.bCardBackPath = res.data.filePath;
            } else {
                this.loadingB = false;
                this.$message.error(res.message);
            }
        },
        // 下一步---提交企业信息
        async submitCompanyForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.applyInfo.applicationCode = this.$route.query.loanNumber
                    this.loadingPersonalInfo = true;
                    saveOrUpdateUsdLoan(this.applyInfo).then((res) => {
                        // 保存企业信息
                        this.loadingPersonalInfo = false;
                        this.$message.success('操作成功');
                    }).catch((err) => {
                        this.loadingPersonalInfo = false;
                        this.$message.error(err.message);
                    });
                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style>
.btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
}

.btn {
    width: 240px;
    height: 50px;
    margin: 0 10px;
}

.hsbc-info-box {
    background: #fff;
    padding: 30px;
}

.hsbc-info-box .el-upload--text {
    height: auto;
    width: auto;
    border: none;
}

.pic-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.avatar-uploader {
    width: 280px;
    height: 170px;
    margin-bottom: 30px;
    overflow: hidden;
}

.avatar {
    width: 280px;
    height: 170px;
    overflow: hidden;
}
</style>