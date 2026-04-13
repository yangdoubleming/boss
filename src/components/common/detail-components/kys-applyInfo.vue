<template>
    <div style="margin-top:24px;padding-bottom:24px" v-if="showPage">
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info"
                style="display:flex;width:100%;align-items:center;justify-content: space-between;">
                <span>个人信息
                    <el-button v-if="($route.query.lenderId == 15)" type="primary" class="btn"
                        style="margin-left: 20px;" @click="_downLoad">{{ $t('loan_detail_zlxz') }}</el-button>
                </span>
                <div class="btn-box1">
                    <el-button type="primary" icon="el-icon-document-checked" class="btn" v-if="isEdit" @click="save">{{
        $t('loan_detail_save') }}</el-button>
                    <el-button type="info" icon="el-icon-document-checked" class="btn" v-if="isEdit"
                        @click="closeEditF">{{ $t('loan_detail_tcbj') }}</el-button>
                    <el-button type="primary" icon="el-icon-edit-outline" class="btn" @click="cliEdit"
                        v-if="!isEdit && $showBtn('US_EDIT_APPLY_INFO')">{{ $t('loan_detail_bj') }}</el-button>
                </div>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_search_name') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.directorHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyBorrowerVo.bName ?
        applyInfo.companyBorrowerVo.bName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_email') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcLegalpersonMail" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyBorrowerVo.bEmail ?
        applyInfo.companyBorrowerVo.bEmail : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_serch_phone') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.phoneHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyBorrowerVo.bPhoneNumber ?
        applyInfo.companyBorrowerVo.bPhoneNumber : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sfzh') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bCardIdHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyBorrowerVo.bCardId ?
        applyInfo.companyBorrowerVo.bCardId : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_dz') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcLegalpersonAddress"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyBorrowerVo.bAddress ?
        applyInfo.companyBorrowerVo.bAddress : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkmd') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.loanPurpose" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyVo.bcLoanUse ? applyInfo.companyVo.bcLoanUse :
        '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sfztp') }}</span>
                </div>
            </div>
            <div style="display:flex;align-items:center;margin-top:25px;margin-left:30px">
                <el-link type="primary" v-if="applyInfo.companyBorrowerVo.bCardFrontPath"
                    @click="openImg(applyInfo.companyBorrowerVo.bCardFrontPath)" style="margin-right:30px">{{
        $t('loan_detail_zmtp') }}</el-link>

                <el-link style="margin-right:30px" type="primary" v-if="applyInfo.companyBorrowerVo.bCardBackPath"
                    @click="openImg(applyInfo.companyBorrowerVo.bCardBackPath)">{{ $t('loan_detail_fmtp') }}</el-link>
                <el-upload v-if="isEdit" style="margin-right:30px" :action="uploadUrl" :on-success="handlePreview"
                    :show-file-list="false">
                    <el-button size="small" type="primary">{{ $t('loan_detail_scsfzzm') }}</el-button>
                </el-upload>
                <el-upload v-if="isEdit" style="margin-right:30px" :action="uploadUrl" :on-success="handlePreview2"
                    :show-file-list="false">
                    <el-button size="small" type="primary">{{ $t('loan_detail_scsfzfm') }}</el-button>
                </el-upload>
            </div>
        </el-card>
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_qyxx') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_qymc') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcNameHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyVo.bcName ? applyInfo.companyVo.bcName : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_qyfr') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.directorHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.companyVo.bcLegalperson ?
        applyInfo.companyVo.bcLegalperson : '-' }}</span>
                </div>

                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jynx') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcYear" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.bcYear ? applyInfo.bcYear : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_gsdjzsbh') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.certificateNoHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.certificateNoHk ? applyInfo.certificateNoHk : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_dz') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcAddressHk" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.bcAddressHk ? applyInfo.bcAddressHk : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_xgdjzswj') }}</span>
                </div>
            </div>
            <div style="display:flex;align-items:center;margin-top:25px;margin-left:30px">
                <el-link type="primary" v-if="applyInfo.bcBusinesslicensePath && $route.query.productId != 96"
                    @click="openImg(applyInfo.bcBusinesslicensePath)">{{ $t('loan_detail_xgdjzswjpng') }}</el-link>
                <el-upload v-if="isEdit" style="margin-left:30px" :action="uploadUrl" :on-success="handlePreview3"
                    :show-file-list="false">
                    <el-button size="small" type="primary">{{ $t('loan_detail_scxgdjzs') }}</el-button>
                </el-upload>
            </div>
        </el-card>
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_poxx') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_search_name') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcLegalpersonSpouse"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.bcLegalpersonSpouse ? applyInfo.bcLegalpersonSpouse :
        '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_serch_phone') }}</span>
                    <el-input v-if="isEdit" v-model="applyInfo.bcLegalpersonSpousePhone"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ applyInfo.bcLegalpersonSpousePhone ?
        applyInfo.bcLegalpersonSpousePhone : '-' }}</span>
                </div>


            </div>

        </el-card>
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info"
                style="display:flex;width:100%;align-items:center;justify-content: space-between;">
                <span>{{ $t('loan_detail_zfxx') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('home_zfgs') }}</span>
                    <el-select v-model="dataList.paymentCode" :placeholder="$t('loan_detail_choose')" v-if="isEdit">
                        <el-option v-for="item in options" :key="item.value" :label="item.paymentName"
                            :value="item.paymentCode"></el-option>
                    </el-select>

                    <span v-else class="item-value">{{ payCompanyLabel ? payCompanyLabel : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zfzhzt') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.bcName" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.bcName ? dataList.bcName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zfgsyhbh') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.paymentAccount" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.paymentAccount ? dataList.paymentAccount : '-' }}</span>
                </div>

            </div>
        </el-card>
        <el-card style="margin-top:24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_yinhangzhanghu') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yinhangname') }}</span>
                    <el-input v-if="isEdit && !reEditBank" v-model="dataList.bankName"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.bankName ? dataList.bankName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yinhangzhanghu') }}</span>
                    <el-input v-if="isEdit && !reEditBank" v-model="dataList.bankNo"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.bankNo ? dataList.bankNo : '-' }}</span>
                </div>

                <!-- <div class="request-item">
                    <span class="item-label">账户名称</span>
                    <el-input
                        v-if="isEdit && !reEditBank"
                        v-model="dataList.name"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>
                    <span v-else class="item-value">{{dataList.name?dataList.name:'-'}}</span>
                </div> -->
                <div class="request-item">
                    <span class="item-label">Swift Code</span>
                    <el-input v-if="isEdit && !reEditBank" v-model="dataList.swiftCode"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.swiftCode ? dataList.swiftCode : '-' }}</span>
                </div>

                <!-- <div class="request-item">
                    <span class="item-label">身份证</span>
                    <el-input
                        v-if="isEdit && !reEditBank"
                        v-model="dataList.idCard"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>
                    <span v-else class="item-value">{{dataList.idCard?dataList.idCard:'-'}}</span>
                </div> -->
                <!-- <div class="request-item">
                    <span class="item-label">手机号码</span>
                    <el-input
                        v-if="isEdit && !reEditBank"
                        v-model="dataList.phone"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>
                    <span v-else class="item-value">{{dataList.phone?dataList.phone:'-'}}</span>
                </div> -->
                <!-- <div class="request-item">
                    <span class="item-label">开户行地址</span>
                    <el-input
                        v-if="isEdit && !reEditBank"
                        v-model="dataList.bankAddress"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>
                    <span
                        v-else
                        class="item-value"
                    >{{dataList.bankAddress?dataList.bankAddress:'-'}}</span>
                </div> -->
            </div>
        </el-card>


    </div>
</template>

<script>
import { updatePaymentInfo, createBank, borrower, providerSelect } from '../../../api/index';
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
    data() {
        return {
            applyInfo: {},
            bInfoObj: {},
            options: [],
            dataList: {},
            showPage: false,
            loanUse: '',

            isEdit: false,
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL
        };
    },
    computed: {
        payCompanyLabel() {
            let str = '';
            this.options.forEach((item) => {
                str = item.paymentCode === this.dataList.paymentCode ? item.paymentName : str;
            });
            return str;
        }
    },
    methods: {
        _downLoad() {
            this.$export(`/application/zip/export?type=USD&applicationCode=${this.$route.query.loanNumber}`, '', 'zip')
        },
        closeEditF() {

            this.$emit('refreshDetail');
            setTimeout(() => {
                this.isEdit = false;
            }, 500);
        },
        cliEdit() {
            this.isEdit = true;
        },
        save() {
            updatePaymentInfo(this.dataList).then((res) => {
                try {
                    this.$delete(this.dataList, 'createTime');
                    this.$delete(this.dataList, 'updateTime');
                } catch { }

                let obj = {};

                obj.bname = this.bInfoObj.bname;
                obj.bcName = this.bInfoObj.bcName;
                obj.cobName = this.bInfoObj.cobName;
                obj.cobcName = this.bInfoObj.cobcName;
                obj.applicationId = this.$route.query.id;

                let obj2 = Object.assign(this.applyInfo, this.applyInfo);
                this.$delete(obj2, 'bcCreateTime');
                this.$delete(obj2, 'bBirthday');
                this.$delete(obj2, 'idBorrower');
                this.$delete(obj2, 'idCompany');
                obj2.applicationId = this.$route.query.id;
                borrower(obj2).then((res) => {
                    if (this.reEditBank) {
                        this.$message.success('保存修改！');
                        this.isEdit = false;
                        this.$emit('refreshDetail');
                    } else {
                        createBank(this.dataList).then((res) => {
                            this.$message.success('保存修改！');
                            this.isEdit = false;
                            this.$emit('refreshDetail');
                        });
                    }
                });
            });
        },
        openImg(url) {
            if (url.includes('http')) {
                window.open(url);
            } else {
                window.open(this.imgsBaseUrl + url);
            }
        },
        handlePreview(res, file) {

            this.applyInfo.bCardFrontPath = res.data.fullFilePath;
        },
        handlePreview2(res, file) {
            this.applyInfo.bCardBackPath = res.data.fullFilePath;
        },
        handlePreview3(res, file) {
            this.applyInfo.bcBusinesslicensePath = res.data.fullFilePath;
        }

    },
    created() {
        providerSelect().then((res) => {
            this.options = res.data;
        });
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

            }
        },
        userAndCompanyInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.applyInfo = JSON.parse(JSON.stringify(newV));

            }
        }
    }
};
</script>

<style lang='less'>
.el-upload--text {
    height: 32px;
    border: none;
}

.upload-demo {
    display: inline-block;
}

.btn-box1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .btn {
        height: 33px;
    }
}

.item-box {
    display: flex;
    flex-wrap: wrap;

    .request-item:nth-child(n + 3) {
        padding-top: 30px;
    }

    .request-item {
        width: 40%;
        display: flex;

        .item-label {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.65);
            display: inline-block;
            width: 250px;
            display: block;
            display: flex;
            flex-direction: column;
            // padding-right: 30px;
            padding-left: 30px;
        }

        .item-value {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.65);
            display: inline-block;
            width: 300px;
        }
    }
}
</style>