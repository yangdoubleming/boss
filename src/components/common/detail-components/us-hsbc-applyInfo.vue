<template>
    <div class="hsbc-info-box" v-loading="loadingPersonalInfo">
        <el-form :model="applyInfo" :rules="rules" ref="applyInfo" label-width="200px" class="demo-ruleForm">
            <el-row class="pic-box">
                <el-upload
                    class="avatar-uploader"
                    v-loading="loadingA"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadA"
                    :on-success="handleAvatarSuccessA"
                    :data="uploadParams"
                >
                    <el-image
                        class="avatar"
                        v-if="applyInfo.bCardFrontPath"
                        :src="`${imgsBaseUrl}` + applyInfo.bCardFrontPath"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzrxm.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.bCardFrontPath">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.bCardFrontPath)"
                            @click.stop="previewImage(applyInfo.bCardFrontPath)"
                        ></i>
                        <!-- 预览图标 -->
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.bCardFrontPath)"></i>
                        <i class="el-icon-delete" @click.stop="deleteImage('bCardFrontPath')"></i>
                        <!-- 删除图标 -->
                    </div>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    style="float: left; margin-left: 20px"
                    v-loading="loadingB"
                    :action="uploadUrl"
                    capture="camera"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadB"
                    :on-success="handleAvatarSuccessB"
                    :data="uploadParams"
                >
                    <el-image
                        class="avatar"
                        v-if="applyInfo.bCardBackPath"
                        :src="`${imgsBaseUrl}` + applyInfo.bCardBackPath"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzghm.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.bCardBackPath">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.bCardBackPath)"
                            @click.stop="previewImage(applyInfo.bCardBackPath)"
                        ></i>
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.bCardBackPath)"></i>
                        <i class="el-icon-delete" @click.stop="deleteImage('bCardBackPath')"></i>
                    </div>
                </el-upload>
            </el-row>
            <el-row class="pic-box">
                <el-upload
                    class="avatar-uploader"
                    v-loading="loadingC"
                    :action="uploadUrl"
                    capture="camera"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadC"
                    :on-success="handleAvatarSuccessC"
                    :data="uploadParams"
                >
                    <el-image
                        class="pdf-sty"
                        v-if="
                            applyInfo.certificateIncorporation &&
                            (applyInfo.certificateIncorporation.indexOf('.pdf') > -1 ||
                                applyInfo.certificateIncorporation.indexOf('.zip') > -1 ||
                                applyInfo.certificateIncorporation.indexOf('.rar') > -1 ||
                                applyInfo.certificateIncorporation.indexOf('.docx') > -1 ||
                                applyInfo.certificateIncorporation.indexOf('.doc') > -1)
                        "
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-document" style="font-size: 12px">公司注册证书上传成功</i>
                        </div>
                    </el-image>
                    <el-image
                        class="avatar"
                        v-else-if="applyInfo.certificateIncorporation"
                        :src="`${imgsBaseUrl}` + applyInfo.certificateIncorporation"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-bs.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.certificateIncorporation">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.certificateIncorporation)"
                            @click.stop="previewImage(applyInfo.certificateIncorporation)"
                        ></i>
                        <!-- 预览图标 -->
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.certificateIncorporation)"></i>
                        <!--                        &lt;!&ndash; 下载图标 &ndash;&gt;-->
                        <i class="el-icon-delete" @click.stop="deleteImage('certificateIncorporation')"></i>
                        <!-- 删除图标 -->
                    </div>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    style="float: left; margin-left: 20px"
                    v-loading="loadingD"
                    :action="uploadUrl"
                    capture="camera"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadD"
                    :on-success="handleAvatarSuccessD"
                    :data="uploadParams"
                >
                    <el-image
                        class="pdf-sty"
                        v-if="
                            applyInfo.businessRegistrationCertificate &&
                            (applyInfo.businessRegistrationCertificate.indexOf('.pdf') > -1 ||
                                applyInfo.businessRegistrationCertificate.indexOf('.zip') > -1 ||
                                applyInfo.businessRegistrationCertificate.indexOf('.rar') > -1 ||
                                applyInfo.businessRegistrationCertificate.indexOf('.docx') > -1 ||
                                applyInfo.businessRegistrationCertificate.indexOf('.doc') > -1)
                        "
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-document" style="font-size: 12px">商业登记证上传成功</i>
                        </div>
                    </el-image>
                    <el-image
                        class="avatar"
                        v-else-if="applyInfo.businessRegistrationCertificate"
                        :src="`${imgsBaseUrl}` + applyInfo.businessRegistrationCertificate"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ma.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.businessRegistrationCertificate">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.businessRegistrationCertificate)"
                            @click.stop="previewImage(applyInfo.businessRegistrationCertificate)"
                        ></i>
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.businessRegistrationCertificate)"></i>
                        <i class="el-icon-delete" @click.stop="deleteImage('businessRegistrationCertificate')"></i>
                    </div>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    v-loading="loadingE"
                    :action="uploadUrl"
                    capture="camera"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadE"
                    :on-success="handleAvatarSuccessE"
                    :data="uploadParams"
                >
                    <el-image
                        class="pdf-sty"
                        v-if="
                            applyInfo.companyCharter &&
                            (applyInfo.companyCharter.indexOf('.pdf') > -1 ||
                                applyInfo.companyCharter.indexOf('.zip') > -1 ||
                                applyInfo.companyCharter.indexOf('.rar') > -1 ||
                                applyInfo.companyCharter.indexOf('.docx') > -1 ||
                                applyInfo.companyCharter.indexOf('.doc') > -1)
                        "
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-document" style="font-size: 12px">公司章程上传成功</i>
                        </div>
                    </el-image>
                    <el-image
                        class="avatar"
                        v-else-if="applyInfo.companyCharter"
                        :src="`${imgsBaseUrl}` + applyInfo.companyCharter"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ar.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.companyCharter">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.companyCharter)"
                            @click.stop="previewImage(applyInfo.companyCharter)"
                        ></i>
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.companyCharter)"></i>
                        <i class="el-icon-delete" @click.stop="deleteImage('companyCharter')"></i>
                    </div>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    style="float: left; margin-left: 20px"
                    v-loading="loadingF"
                    :action="uploadUrl"
                    capture="camera"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUploadF"
                    :on-success="handleAvatarSuccessF"
                    :data="uploadParams"
                >
                    <el-image
                        class="pdf-sty"
                        v-if="
                            applyInfo.annualReturns &&
                            (applyInfo.annualReturns.indexOf('.pdf') > -1 ||
                                applyInfo.annualReturns.indexOf('.zip') > -1 ||
                                applyInfo.annualReturns.indexOf('.rar') > -1 ||
                                applyInfo.annualReturns.indexOf('.docx') > -1 ||
                                applyInfo.annualReturns.indexOf('.doc') > -1)
                        "
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-document" style="font-size: 12px">周年申报表上传成功</i>
                        </div>
                    </el-image>
                    <el-image
                        class="avatar"
                        v-else-if="applyInfo.annualReturns"
                        :src="`${imgsBaseUrl}` + applyInfo.annualReturns"
                        fit="cover"
                    ></el-image>
                    <div v-else>
                        <el-image
                            src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/ss.png"
                            alt=""
                            style="width: 280px"
                        ></el-image>
                    </div>
                    <div class="mask" v-if="applyInfo.annualReturns">
                        <i
                            class="el-icon-zoom-in"
                            v-if="isImage(applyInfo.annualReturns)"
                            @click.stop="previewImage(applyInfo.annualReturns)"
                        ></i>
                        <i class="el-icon-download" @click.stop="downloadFile(applyInfo.annualReturns)"></i>
                        <i class="el-icon-delete" @click.stop="deleteImage('annualReturns')"></i>
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
                        <el-input v-model="applyInfo.bcLegalpersonPhone">
                            <el-select
                                style="width: 85px"
                                v-model="applyInfo.actualControllerPhoneAreaCode"
                                slot="prepend"
                                placeholder="Code"
                            >
                                <el-option label="+86" value="86"></el-option>
                                <el-option label="+852" value="852"></el-option>
                                <el-option label="+65" value="65"></el-option>
                                <el-option label="+84" value="84"></el-option>
                                <el-option label="+62" value="62"></el-option>
                            </el-select>
                        </el-input>
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
                <el-button type="primary" class="btn" @click="submitCompanyForm('applyInfo')" name="personNextStep">确认修改</el-button>
            </div>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
                this.$forceUpdate();
            }
        },
        userAndCompanyInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                let obj = JSON.parse(JSON.stringify(newV));
                this.applyInfo = Object.assign(this.applyInfo, obj);
            }
        }
    },
    data() {
        return {
            loadingA: false,
            loadingB: false,
            loadingC: false,
            loadingD: false,
            loadingE: false,
            loadingF: false,
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
                bcLegalpersonMail: '',
                certificateNoHk: '',
                actualControllerPhoneAreaCode: '',
                certificateIncorporation: '',
                businessRegistrationCertificate: '',
                companyCharter: '',
                annualReturns: ''
            },
            bInfoObj: {},
            options: [],
            dataList: {},
            showPage: false,
            loanUse: '',
            isEdit: false,
            loadingPersonalInfo: false,
            uploadUrl: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-file/file-upload/upload/file`,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            rules: {},
            dialogImageUrl: '',
            dialogVisible: false,
            uploadParams: {
                isCompress: 'N'
            }
        };
    },
    mounted() {},
    methods: {
        isImage(fileUrl) {
            // 获取文件扩展名
            const fileExtension = fileUrl.split('.').pop().toLowerCase();

            // 常见的图片扩展名
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

            // 判断扩展名是否属于图片类型
            return imageExtensions.includes(fileExtension);
        },
        downloadFile(fileUrl) {
            fileUrl = this.imgsBaseUrl + fileUrl;
            // 获取文件扩展名
            const fileExtension = fileUrl.split('.').pop().toLowerCase();

            // 支持的文件类型
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const zipExtensions = ['zip', 'rar', 'pdf', 'doc', 'docx']; // 添加 doc 和 docx

            // 检查文件类型并生成下载链接
            if (imageExtensions.includes(fileExtension) || zipExtensions.includes(fileExtension)) {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.target = '_blank';
                // 动态设置文件名，若后端不提供文件名，可以自定义
                if (zipExtensions.includes(fileExtension)) {
                    link.download = 'archive.' + fileExtension; // 默认压缩包或文档下载名
                } else {
                    link.download = 'image.' + fileExtension; // 默认图片下载名
                }

                // 触发下载
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // 如果文件类型不支持
                this.$message({
                    type: 'warning',
                    message: '不支持的文件类型下载!'
                });
            }
        },
        previewImage(imageUrl) {
            this.dialogImageUrl = `${this.imgsBaseUrl}${imageUrl}`;
            this.dialogVisible = true;
        },
        deleteImage(field) {
            // 删除图片逻辑
            this.$confirm('确定要删除该图片吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.applyInfo[field] = '';
                    this.$message({
                        type: 'success',
                        message: '图片删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 身份证正面
        beforeAvatarUploadA(file) {
            this.loadingA = true;
        },
        // 身份证反面
        beforeAvatarUploadB(file) {
            this.loadingB = true;
        },
        beforeAvatarUploadC(file) {
            this.loadingC = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingC = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        beforeAvatarUploadD(file) {
            this.loadingD = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingD = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        beforeAvatarUploadE(file) {
            this.loadingE = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingE = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        beforeAvatarUploadF(file) {
            this.loadingF = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingF = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
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
        handleAvatarSuccessB(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingB = false;
                this.applyInfo.bCardBackPath = res.data.filePath;
            } else {
                this.loadingB = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessC(res, file) {
            if (res.code === 200 && res.data) {
                this.applyInfo.certificateIncorporation = res.data.filePath;
                this.loadingC = false;
            } else {
                this.loadingC = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessD(res, file) {
            if (res.code === 200 && res.data) {
                this.applyInfo.businessRegistrationCertificate = res.data.filePath;
                this.loadingD = false;
            } else {
                this.loadingD = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessE(res, file) {
            if (res.code === 200 && res.data) {
                this.applyInfo.companyCharter = res.data.filePath;
                this.loadingE = false;
            } else {
                this.loadingE = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessF(res, file) {
            if (res.code === 200 && res.data) {
                this.applyInfo.annualReturns = res.data.filePath;
                this.loadingF = false;
            } else {
                this.loadingF = false;
                this.$message.error(res.message);
            }
        },
        // 下一步---提交企业信息
        async submitCompanyForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.applyInfo.applicationCode = this.$route.query.loanNumber;
                    this.loadingPersonalInfo = true;
                    saveOrUpdateUsdLoan(this.applyInfo)
                        .then((res) => {
                            // 保存企业信息
                            this.loadingPersonalInfo = false;
                            this.$message.success('操作成功');
                        })
                        .catch((err) => {
                            this.loadingPersonalInfo = false;
                            this.$message.error(err.message);
                        });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped>
/* 蒙层样式 */
.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* 增加按钮间距 */
    color: white;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.avatar-uploader:hover .mask {
    opacity: 1;
}

.el-icon-zoom-in,
.el-icon-download,
.el-icon-delete {
    font-size: 24px;
}
</style>
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

.pdf-sty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 170px;
    border: 1px dashed #dcdfe6;
}
</style>
