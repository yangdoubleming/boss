<template>
    <section>
        <div class="authshop-details-boxx">
            <div>
                <el-card class="box-card tablex" shadow="never" v-if="subIndex == 1">
                    <div class="containerx" v-loading="loadingA">
                        <div class="card-title">
                            <div class="line"></div>
                            {{ $t('loan_detail_jbxx') }}
                        </div>
                        <div style="padding: 0 30px 0px 30px">
                            <el-form class="demo-ruleForm" label-width="180px">
                                <el-form-item :label="$t('loan_detail_dssfz')" required>
                                    <div style="color: rgb(133, 133, 133)">
                                        {{ $t('loan_detail_upxj') }}
                                    </div>
                                </el-form-item>
                                <el-form-item required>
                                    <div class="upload-box">
                                        <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false"
                                            :before-upload="beforeUpload" :on-success="handleAvatarSuccess1"
                                            :on-progress="showUploadLoading">
                                            <img v-if="!file1.fileUrl" src="@/assets/c1.png" class="default-img" alt />
                                            <img v-else :src="imgsBaseUrl + file1.fileUrl" class="default-img" alt />
                                        </el-upload>
                                        <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false"
                                            :before-upload="beforeUpload" :on-success="handleAvatarSuccess2"
                                            :on-progress="showUploadLoading">
                                            <img v-if="!file2.fileUrl" src="@/assets/c2.png" class="default-img" alt />
                                            <img v-else :src="imgsBaseUrl + file2.fileUrl" class="default-img" alt />
                                        </el-upload>
                                    </div>
                                </el-form-item>
                            </el-form>
                            <el-form class="demo-ruleForm" label-width="200px">
                                <el-form-item :label="$t('loan_detail_sjkzr')" required>
                                    <div>
                                        <el-checkbox v-model="checked" style="color: #000" @change="changeCheck">{{
                    $t('loan_detail_tgssfz') }}</el-checkbox>
                                        <span style="color: rgb(133, 133, 133); padding-left: 20px">{{
                    $t('loan_detail_upxj') }}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item required v-if="!checked">
                                    <div class="upload-box">
                                        <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false"
                                            :before-upload="beforeUpload" :on-success="handleAvatarSuccess3"
                                            :on-progress="showUploadLoading">
                                            <img v-if="!file3.fileUrl" src="@/assets/c1.png" class="default-img" alt />
                                            <img v-else :src="imgsBaseUrl + file3.fileUrl" class="default-img" alt />
                                        </el-upload>
                                        <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="false"
                                            :before-upload="beforeUpload" :on-success="handleAvatarSuccess4"
                                            :on-progress="showUploadLoading">
                                            <img v-if="!file4.fileUrl" src="@/assets/c2.png" class="default-img" alt />
                                            <img v-else :src="imgsBaseUrl + file4.fileUrl" class="default-img" alt />
                                        </el-upload>
                                    </div>
                                </el-form-item>
                                <div
                                    style="display: flex; align-items: start; justify-content: flex-start; flex-wrap: wrap">
                                    <el-form-item :label="$t('loan_detail_sydjz')" required>
                                        <div>
                                            <el-upload :action="uploadUrl" :with-credentials="true"
                                                accept=".jpg, .jpeg, .png, .pdf" :before-upload="beforeUpload"
                                                :show-file-list="false" :on-preview="showUploadLoading"
                                                :on-success="handleAvatarSuccess5">
                                                <div class="upload-flex">
                                                    <el-popover placement="top-start" title width trigger="hover"
                                                        :content="$t('loan_detail_upshort')">
                                                        <el-button class="btn" slot="reference"
                                                            style="width: 280px; line-height: 51px">
                                                            {{ $t('loan_detail_qscsydjz') }}
                                                            <i class="el-icon-upload el-icon--right"></i>
                                                        </el-button>
                                                    </el-popover>
                                                </div>
                                            </el-upload>
                                            <a style="margin-left: 35px; height: 20px; color: #606266"
                                                v-if="file5.fileUrl" :href="imgsBaseUrl + file5.fileUrl"
                                                target="_blank">
                                                <i class="el-icon-document"></i>
                                                {{ file5.fileName }}
                                            </a>
                                        </div>
                                    </el-form-item>
                                    <el-form-item :label="$t('loan_detail_dgzh')" required>
                                        <div>
                                            <el-upload :action="uploadUrl" :with-credentials="true"
                                                accept=".jpg, .jpeg, .png, .pdf" :before-upload="beforeUpload"
                                                :show-file-list="false" :on-preview="showUploadLoading"
                                                :on-success="handleAvatarSuccess6">
                                                <div class="upload-flex">
                                                    <el-popover placement="top-start" title width trigger="hover"
                                                        :content="$t('loan_detail_upshort')">
                                                        <el-button class="btn" slot="reference"
                                                            style="width: 280px; line-height: 51px">
                                                            {{ $t('loan_detail_qsckhzl') }}
                                                            <i class="el-icon-upload el-icon--right"></i>
                                                        </el-button>
                                                    </el-popover>
                                                </div>
                                            </el-upload>
                                            <a style="margin-left: 35px; height: 20px; color: #606266"
                                                v-if="file6.fileUrl" :href="imgsBaseUrl + file6.fileUrl"
                                                target="_blank">
                                                <i class="el-icon-document"></i>
                                                {{ file6.fileName }}
                                            </a>
                                        </div>
                                    </el-form-item>
                                    <el-form-item :label="$t('loan_detail_gszczms')" required>
                                        <div>
                                            <el-upload :action="uploadUrl" :with-credentials="true"
                                                accept=".jpg, .jpeg, .png, .pdf" :before-upload="beforeUpload"
                                                :show-file-list="false" :on-preview="showUploadLoading"
                                                :on-success="handleAvatarSuccess7">
                                                <div class="upload-flex">
                                                    <el-popover placement="top-start" title width trigger="hover"
                                                        :content="$t('loan_detail_upshort')">
                                                        <el-button class="btn" slot="reference"
                                                            style="width: 280px; line-height: 51px">
                                                            {{ $t('loan_detail_qscgszc') }}
                                                            <i class="el-icon-upload el-icon--right"></i>
                                                        </el-button>
                                                    </el-popover>
                                                </div>
                                            </el-upload>
                                            <a style="margin-left: 35px; height: 20px; color: #606266"
                                                v-if="file7.fileUrl" :href="imgsBaseUrl + file7.fileUrl"
                                                target="_blank">
                                                <i class="el-icon-document"></i>
                                                {{ file7.fileName }}
                                            </a>
                                        </div>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                        <!-- <div
                style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
                margin-bottom: 15px;
              "
              >
                <el-button type="primary" style="width: 180px" @click="submitApplication">下一步</el-button>
              </div> -->
                    </div>
                </el-card>
            </div>
        </div>
    </section>
</template>

<script>
import { bindFiles } from '@/api/index.js';

export default {
    data() {
        return {
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            file5: {},
            file6: {},
            file7: {},
            creditForm: {
                //授信审核表单
                bankAccount: '',
                bankName: '',
                bankNo: '',
                swiftCode: '',
                loanPurpose: '',
                bcLegalpersonSpousePhone: '',
                bcLegalpersonSpouse: '',
                bcLegalpersonMail: '',
                bcLegalpersonPhone: '',
                bcLegalpersonAddress: '',
                bcLegalpersonIdCard: '',
                phoneHk: '',
                bcNameHk: '',
                directorHk: '',
                bcName: '',
                bcAddress: '',
                bcLegalperson: '',
                bcAddressHk: '',
                certificateNoHk: '',
                bCardIdHk: ''
            },
            formData: {},
            imgsBaseUrl: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-file/`,
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            offerName: '',
            loadingBindShopName: false,
            showAuthShops: 0,

            showDiaType: '',
            loadingAuthShopList: false, //绑店
            subIndex: 1,
            tableData: [],

            loadingA: false,
            checkStatus: false,
            imgType: ['jpg', 'png', 'jpeg'],
            checked: false,
            originOfferObj: {},
            offerIds: []
        };
    },
    mounted() { },
    created() {
        // getShopListMeta()
        //     .then(res => {
        //         res.data.forEach(item => {
        //             this.offerIds.push(item.offerId);
        //         });
        //     })
        //     .catch(err => {
        //         this.loadingAuthShopList = false;
        //         this.$message.error(err.message || "请求失败");
        //     });
        // getMetaFile().then(res => {
        //     res.data.forEach(item => {
        //         if (item.fileType == 'ID_CARD_FRONT_HK') {
        //             this.file1 = item
        //         }
        //         if (item.fileType == 'ID_CARD_BACK_HK') {
        //             this.file2 = item
        //         }
        //         if (item.fileType == 'ID_CARD_FRONT_LEGALPERSON') {
        //             this.file3 = item
        //         }
        //         if (item.fileType == 'ID_CARD_BACK_LEGALPERSON') {
        //             this.file4 = item
        //         }
        //         if (item.fileType == 'BUSINESS_REGISTRATION_CERTIFICATE') {
        //             this.file5 = item
        //         }
        //         if (item.fileType == 'CORPORATE_ACCOUNT') {
        //             this.file6 = item
        //         }
        //         if (item.fileType == 'CERTIFICATE_OF_INCORPORATION') {
        //             this.file7 = item
        //         }
        //     })
        //     console.log(this.file6);
        // })
    },

    methods: {
        changeCheck(val) {
            if (!this.file1.fileUrl || !this.file2.fileUrl) {
                this.$message.warning('请先上传完董事身份证正反面');
                return setTimeout(() => {
                    this.checked = false;
                }, 0);
            }
            if (val) {
                this.file3 = JSON.parse(JSON.stringify(this.file1));
                this.file4 = JSON.parse(JSON.stringify(this.file2));
                this.$emit('getOcrObj', { bcLegalpersonIdCard: this.creditForm.bCardIdHk, bcLegalperson: this.creditForm.directorHk });
            }
        },
        isPic() {
            if (!this.file1.fileUrl) {
                this.$message.warning('请先上传董事身份证正面');
                return false;
            }
            if (!this.file2.fileUrl) {
                this.$message.warning('请先上传董事身份证反面');
                return false;
            }
            if (!this.file3.fileUrl) {
                this.$message.warning('请先上传实际控制人身份证正面');
                return false;
            }
            if (!this.file4.fileUrl) {
                this.$message.warning('请先上传实际控制人身份证反面');
                return false;
            }
            if (!this.file5.fileUrl) {
                this.$message.warning('请先上传商业登记证');
                return false;
            }
            if (!this.file6.fileUrl) {
                this.$message.warning('请先上传开户资料证明');
                return false;
            }
            if (!this.file7.fileUrl) {
                this.$message.warning('请先上传公司注册证明书');
                return false;
            }
            return true;
        },
        submitApplication(resourceId) {
            if (!this.file1.fileUrl) {
                return this.$message.warning('请先上传董事身份证正面');
            }
            if (!this.file2.fileUrl) {
                return this.$message.warning('请先上传董事身份证反面');
            }
            if (!this.file3.fileUrl) {
                return this.$message.warning('请先上传实际控制人身份证正面');
            }
            if (!this.file4.fileUrl) {
                return this.$message.warning('请先上传实际控制人身份证反面');
            }
            if (!this.file5.fileUrl) {
                return this.$message.warning('请先上传商业登记证');
            }
            if (!this.file6.fileUrl) {
                return this.$message.warning('请先上传开户资料证明');
            }
            if (!this.file7.fileUrl) {
                return this.$message.warning('请先上传公司注册证明书');
            }
            this.loadingA = true;
            this.file3.fileType = 'ID_CARD_FRONT_LEGALPERSON';
            this.file4.fileType = 'ID_CARD_BACK_LEGALPERSON';
            this.file1.resourceId = resourceId;
            this.file2.resourceId = resourceId;
            this.file3.resourceId = resourceId;
            this.file4.resourceId = resourceId;
            this.file5.resourceId = resourceId;
            this.file6.resourceId = resourceId;
            this.file7.resourceId = resourceId;

            // 在这里调用bindFiles这个接口在每个file数据里面添加上createApplicationUsd的返回值
            bindFiles([this.file1, this.file2, this.file3, this.file4, this.file5, this.file6, this.file7])
                .then((res) => {
                    this.loadingA = false;
                    this.$emit('submitNext');
                    this.file1 = {};
                    this.file2 = {};
                    this.file3 = {};
                    this.checked = false;
                    this.file4 = {};
                    this.file7 = {};
                    this.file6 = {};
                    this.file5 = {};
                })
                .catch((err) => {
                    this.loadingA = false;
                    this.$message.error(err.message);
                });
        },
        resetForm() {
            this.loadingA = false;
            // this.$emit('submitNext');
            this.file1 = {};
            this.file2 = {};
            this.file3 = {};
            this.checked = false;
            this.file4 = {};
            this.file7 = {};
            this.file6 = {};
            this.file5 = {};
        },
        handleAvatarSuccess5(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingA = false;
                this.file5 = {
                    fileName: res.data.fileName,
                    fileType: 'BUSINESS_REGISTRATION_CERTIFICATE',
                    fileUrl: res.data.filePath,
                    fullFilePath: res.data.fullFilePath
                };
            } else {
                this.loadingA = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccess6(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingA = false;
                this.file6 = {
                    fileName: res.data.fileName,
                    fileType: 'CORPORATE_ACCOUNT',
                    fileUrl: res.data.filePath,
                    fullFilePath: res.data.fullFilePath
                };
            } else {
                this.loadingA = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccess7(res, file) {
            if (res.code === 200 && res.data) {
                this.loadingA = false;
                this.file7 = {
                    fileName: res.data.fileName,
                    fileType: 'CERTIFICATE_OF_INCORPORATION',
                    fileUrl: res.data.filePath,
                    fullFilePath: res.data.fullFilePath
                };
            } else {
                this.loadingA = false;
                this.$message.error(res.message);
            }
        },
        onPreviewBus(file) {
            window.open(file.response.data[0].fullFilePath);
        },
        showUploadLoading() {
            this.loadingA = true;
        },
        handleAvatarSuccess2(res, file) {
            this.file2 = {
                fileName: res.data.fileName,
                fileType: 'ID_CARD_BACK_HK',
                fileUrl: res.data.filePath
            };
            this.formData.idCardBackPath = res.data.filePath;
            this.loadingA = false;
        },
        handleAvatarSuccess4(res, file) {
            this.file4 = {
                fileName: res.data.fileName,
                fileType: 'ID_CARD_BACK_HK',
                fileUrl: res.data.filePath
            };
            this.formData.idCardBackPath2 = res.data.filePath;
            this.loadingA = false;
        },
        handleAvatarSuccess(res, file) {
            this.formData.companyLicensePath = res.data.filePath;

            // certificatesOrc(res.data.fullFilePath)
            //     .then((res) => {
            //         if (res.data.person == 'FailInRecognition') {
            //             this.$message.error('法定代表人识别无法识别，建议上传高清图片');
            //             this.formData.companyLicensePath = '';
            //             this.formData.bcLegalperson = '';
            //             this.loadingA = false;
            //         } else {
            //             this.formData.bcLegalperson = res.data.person;
            //             this.formData.companyName = res.data.name;
            //             this.formData.companyLicenseCode = res.data.reg_num;
            //             this.loadingA = false;
            //         }
            //     })
            //     .catch((err) => {
            //         this.loadingA = false;
            //         this.$message.error(err.message);
            //     });
        },
        handleAvatarSuccess1(res, file) {
            this.formData.idCardFrontPath = res.data.filePath;
            this.file1 = {
                fileName: res.data.fileName,
                fileType: 'ID_CARD_FRONT_HK',
                fileUrl: res.data.filePath
            };
            this.loadingA = false;
            // idcardOrc({ imageUrl: res.data.fullFilePath })
            //     .then((res) => {
            //         this.creditForm.bCardIdHk = res.data.num;
            //         this.creditForm.directorHk = res.data.name;
            //         this.$emit('getOcrObj', { bCardIdHk: res.data.num, directorHk: res.data.name });
            //         this.loadingA = false;
            //     })
            //     .catch((err) => {
            //         this.loadingA = false;
            //         this.$message.error(err.message);
            //         console.log(this.formData.idCardFrontPath);
            //     });
        },
        handleAvatarSuccess3(res, file) {
            this.formData.idCardFrontPath2 = res.data.filePath;
            this.file3 = {
                fileName: res.data.fileName,
                fileType: 'ID_CARD_FRONT_LEGALPERSON',
                fileUrl: res.data.filePath
            };
            this.loadingA = false;
            // idcardOrc({ imageUrl: res.data.fullFilePath })
            //     .then((res) => {
            //         this.creditForm.bcLegalpersonIdCard = res.data.num;
            //         this.creditForm.bcLegalperson = res.data.name;
            //         this.$emit('getOcrObj', { bcLegalpersonIdCard: res.data.num, bcLegalperson: res.data.name });
            //         this.loadingA = false;
            //     })
            //     .catch((err) => {
            //         this.loadingA = false;
            //         this.$message.error(err.message);
            //     });
        },
        beforeUpload(file) {
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1);

            const whiteList = this.imgType;

            // if (whiteList.indexOf(fileSuffix) === -1) {
            //     this.loading = false;
            //     this.$message({
            //         message: `上传文件只能是图片格式`,
            //         type: 'warning'
            //     });
            //     return false;
            // }
            const isLt5M = file.size / 1024 / 1024 < 10;
            if (!isLt5M) {
                this.loading = false;
                this.$message.error('文件大小不能超过 10MB!');
                return false;
            }
        },

        // offer绑定店铺名称
        changeShopName(obj) {
            this.originOfferObj = obj;
            this.dialogBindShopName = true;
        },
        _close() {
            this.showAuthShops = 0;
        },

        changeName(originName) {
            if (originName == 'US') {
                return '美国站';
            } else if (originName == 'DE') {
                return '德国站';
            } else {
                return '-';
            }
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.t-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    .t-btn {
        margin-top: 50px;
        width: 200px;
        font-size: 16px;
    }

    .t-tips {
        color: #a6a8aa;
        font-size: 15px;
        margin-top: 15px;
    }

    .t-icon {
        font-size: 50px;
        // background: #ED6A0C;
        border-radius: 50%;
        color: #ed6a0c;
        // padding: 15px;
    }

    .t-title {
        font-size: 18px;
        margin-top: 15px;
        font-weight: 600;
    }
}

.line {
    width: 4px;
    height: 16px;
    background: #e52d6d;
    border-radius: 2px;
    float: left;
    margin-right: 8px;
    margin-top: 3px;
}

.credit-tips {
    padding: 15px 20px;
    background: rgb(237, 242, 253);
    font-size: 15px;
    border: 1px solid #b3c8f7;
    display: flex;
    align-items: center;

    .credit-icon {
        color: #2d6ef2;
        font-size: 18px;
        padding-right: 8px;
    }
}

.box-card {
    .upload-box {
        display: flex;
    }

    .default-img {
        height: 160px;
        width: 280px;
        margin-right: 20px;
    }

    .card-title {
        padding: 0px 10px 0px 15px;
        font-weight: 600;
        font-size: 16px;
    }

    .upload-title {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 33px;
    }

    .upload-form-box {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
}

.add-icon {
    color: #e52d6d;
    width: 16px;
    height: 16px;
    border: 1px solid #323232;
    border-radius: 50%;
    line-height: 13px;
    text-align: center;
    font-size: 14px;
    font-weight: 800;
    padding-left: 1px;
    box-sizing: border-box;
    margin-right: 4px;
}

.bind {
    width: 128px;
    height: 32px;
    background: #ffffff;
    border: 1px solid rgba(229, 45, 109, 1);
    border-radius: 4px;
    margin-bottom: 30px;
    margin-top: 12px;
    margin-left: 52px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #323232;
    text-align: center;
    line-height: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
}

.up-title {
    font-size: 14px;
    color: #323232;
    letter-spacing: 0;
    font-weight: bold;
}

.in-content {
    padding-top: 20px;
    clear: both;

    img {
        float: left;
    }

    span {
        float: left;
        margin-top: 1px;
        margin-left: 10px;
    }
}

.b {
    width: 100%;
    height: 50px;
    display: flex;
    border-left: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;

    .content1 {
        width: 150px;
        height: 100%;
        line-height: 50px;
        // text-align: center;
        padding-right: 30px;
        background-color: #fafafa;
        border-right: 1px solid #e9e9e9;
        // border-bottom: 1px solid #e9e9e9;
        color: #333;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content2 {
        flex: 1;
        height: 100%;
        line-height: 50px;
        // text-align: center;
        background-color: #fff;
        border-right: 1px solid #e9e9e9;
        // border-bottom: 1px solid #e9e9e9;
        // color: #b0b0b2;
        font-size: 14px;
        // display: flex;
        padding-left: 30px;
        // align-items: center;
    }
}

.bindShopName {
    width: 400px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    position: relative;

    .name {
        font-size: 14px;
        color: #323232;
    }

    .bindShopInput {
        width: 280px;
    }

    .position-intro {
        position: absolute;
        top: -115px;
        left: 98px;
        font-size: 14px;
        color: #c8c9cc;
    }
}

.pageDown {
    float: right;
}

.inputBox {
    height: 175px;
    overflow: auto;
}

.my-input {
    margin: 15px;
}

.bindPlatform {
    .btn {
        width: 150px;
        margin: 20px;
        margin-top: 0px;
    }
}

.qrcode-tips3 {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.qrcode-tips2 {
    width: 100%;
    line-height: 22px;
    background-color: rgb(242, 242, 242);
    padding: 6px 10px;
    border-radius: 8px;
    margin-top: 25px;
}

@font-face {
    font-family: 'Noto Sans SC';
    /*这里是说明调用来的字体名字*/
    src: url('../../../assets/fonts/NotoSansSC-6.ttf');
    /*这里是字体文件路径*/
}

.qrcode-tips {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    font-family: 'PingFangSC-Regular';
}

.qrcode-img {
    background-color: red;
    width: 230px;
    height: 230px;
    margin: 0 auto;
    display: block;
}

.last {
    display: block;
    width: 128px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 20px;
}

.authshop-details-boxx {
    width: 100%;
    margin: 0px auto;
    overflow: hidden;

    .rad-sty {
        width: 900px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .radio-titlex {
        font-size: 14px;
        color: #323232;
        font-weight: normal;
    }

    .radio-cla {
        margin-top: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .tablex {
        width: 100%;
        background-color: #ffffff;
        border: none;

        .containerx {
            margin-top: -10px;
            overflow: hidden;

            .box-card {
                .upload-box {
                    display: flex;
                }

                .default-img {
                    height: 160px;
                    width: 280px;
                    margin-right: 20px;
                }

                .card-title {
                    padding: 0px 10px 0px 15px;
                    font-weight: 600;
                    font-size: 16px;
                }

                .upload-title {
                    width: 90%;
                    margin: 0 auto;
                    margin-bottom: 33px;
                }

                .upload-form-box {
                    display: flex;
                    justify-content: center;
                    margin-top: 50px;
                }
            }

            .title {
                font-size: 18px;
                font-weight: bold;
                color: #323232;
            }

            .btn-box {
                margin: 20px auto;
                float: right;

                .btn {
                    width: 150px;
                    height: 40px;
                    margin-top: 20px;
                }
            }

            .pay-title {
                margin-top: 20px;

                span {
                    display: inline-block;
                }

                .recomend {
                    width: 46px;
                    height: 22px;
                    background: #e53f6e;
                    border-radius: 3px;
                    text-align: center;
                    line-height: 22px;
                    color: white;
                    font-size: 14px;
                    margin-right: 10px;
                }

                .fast-login {
                    font-size: 16px;
                    color: #323232;
                    margin-right: 10px;
                }

                .intro {
                    font-size: 14px;
                    color: #969799;
                    line-height: 22px;
                }
            }
        }
    }

    .avatar-uploader .el-upload {
        display: block;
        width: 380px;
        margin: 0 auto;
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
        width: 380px;
        height: 200px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 380px;
        height: 200px;
        display: block;
    }

    .box-card {
        .upload-box {
            display: flex;
        }

        .default-img {
            height: 160px;
            width: 280px;
            margin-right: 20px;
        }

        .card-title {
            padding: 0px 10px 0px 15px;
            font-weight: 600;
            font-size: 16px;
        }

        .upload-title {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 33px;
        }

        .upload-form-box {
            display: flex;
            justify-content: center;
            margin-top: 50px;
        }
    }

    .title {
        font-size: 16px;
        font-weight: bold;
    }

    .el-card__header {
        // border-bottom: none;
    }

    .btn-money {
        padding-left: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .bind-shops {
            .word-box {
                position: relative;
                margin-top: 23px;

                .title {
                    display: inline-block;
                    font-size: 18px;
                    color: #323232;
                    font-weight: bold;
                    margin-right: 10px;
                }

                .intro {
                    display: inline-block;
                    font-size: 14px;
                    color: #646566;
                }

                img {
                    position: absolute;
                    top: -8px;
                    left: -55px;
                }
            }

            .down {
                width: 650px;
                margin-top: 30px;
                margin-bottom: 30px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                .left {
                    .pic-word {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;

                        img {
                            display: block;
                        }

                        span {
                            display: block;
                            margin-left: 5px;
                        }
                    }

                    .word {
                        margin-top: 11px;
                        font-size: 14px;
                        color: #969799;
                        font-weight: 400;
                    }
                }
            }
        }

        .btn-box {
            .btn {
                width: 150px;
                height: 40px;
                margin-top: 20px;
            }
        }
    }

    .table {
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0px 12px 5px -10px rgba(0, 0, 0, 0.1), 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        margin-bottom: 15px;

        .container {
            padding: 20px;
            overflow: hidden;
        }
    }
}
</style>
