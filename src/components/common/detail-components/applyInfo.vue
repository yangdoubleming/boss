<template>
    <div style="margin-top: 24px; padding-bottom: 24px" v-if="showPage">
        <el-card style="margin-top: 24px" shadow="hover">
            <div slot="header" class="request-info"
                style="display: flex; width: 100%; align-items: center; justify-content: space-between">
                <span>
                    {{ $t('loan_detail_grxx') }}
                    <el-button v-if="$route.query.lenderId == 28" type="primary" class="btn" style="margin-left: 20px"
                        @click="_downLoad">{{
                            $t('loan_detail_zlxz')
                        }}</el-button>

                    <el-button v-if="['9', '55'].includes($route.query.lenderId)" type="primary" class="btn"
                        style="margin-left: 20px" @click="_downLoadStzf">受托支付资料下载</el-button>
                </span>
                <div class="btn-box1">
                    <el-button type="primary" icon="el-icon-document-checked" class="btn" v-if="isEdit" @click="save">{{
                        $t('loan_detail_save')
                    }}</el-button>
                    <el-button type="info" icon="el-icon-document-checked" class="btn" v-if="isEdit"
                        @click="closeEditF">{{
                            $t('loan_detail_tcbj')
                        }}</el-button>
                    <el-button type="primary" @click="showTag = true" class="btn"> 选择大卖标签 </el-button>
                    <el-button type="primary" icon="el-icon-edit-outline" class="btn" @click="cliEdit"
                        v-if="!isEdit && $showBtn('EDIT_APPLAY_INFO_ASS')">编 辑</el-button>
                    <el-button type="primary" icon="el-icon-upload2" class="btn" @click="showGfKycDialog"
                        v-if="['13', '71'].includes($route.query.lenderId)">KYC推送</el-button>
                </div>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_search_name') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyBorrowerVo.bName"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyBorrowerVo.bName ?
                        dataList.companyBorrowerVo.bName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_email') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyBorrowerVo.bEmail"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyBorrowerVo.bEmail ?
                        dataList.companyBorrowerVo.bEmail : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_serch_phone') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyBorrowerVo.bPhoneNumber"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{
                        dataList.companyBorrowerVo.bPhoneNumber ? dataList.companyBorrowerVo.bPhoneNumber : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sfzh') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyBorrowerVo.bCardId"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{
                        dataList.companyBorrowerVo.bCardId ? dataList.companyBorrowerVo.bCardId : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sfztp') }}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; margin-top: 25px; margin-left: 30px">
                <el-link type="primary" v-if="dataList.companyBorrowerVo.bCardFrontPath"
                    @click="openImg(dataList.companyBorrowerVo.bCardFrontPath)" style="margin-right: 30px">{{
                        $t('loan_detail_zmtp') }}</el-link>

                <el-link style="margin-right: 30px" type="primary" v-if="dataList.companyBorrowerVo.bCardBackPath"
                    @click="openImg(dataList.companyBorrowerVo.bCardBackPath)">{{ $t('loan_detail_fmtp') }}</el-link>
                <el-upload v-if="isEdit" style="margin-right: 30px" :action="uploadUrl" :on-success="handlePreview"
                    :show-file-list="false">
                    <el-button size="small" type="primary">{{ $t('loan_detail_scsfzzm') }}</el-button>
                </el-upload>
                <el-upload v-if="isEdit" style="margin-right: 30px" :action="uploadUrl" :on-success="handlePreview2"
                    :show-file-list="false">
                    <el-button size="small" type="primary">{{ $t('loan_detail_scsfzfm') }}</el-button>
                </el-upload>
            </div>
        </el-card>
        <el-card style="margin-top: 24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_qyxx') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_qymc') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyVo.bcName" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyVo.bcName ? dataList.companyVo.bcName : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_qyfr') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyVo.bcLegalperson"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyVo.bcLegalperson ?
                        dataList.companyVo.bcLegalperson : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jynx') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyVo.bcYear" :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyVo.bcYear ? dataList.companyVo.bcYear : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_tyshxydm') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyVo.bcCreditcode"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyVo.bcCreditcode ? dataList.companyVo.bcCreditcode
                        : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_dz') }}</span>
                    <el-input v-if="isEdit" v-model="dataList.companyVo.bcAddress"
                        :placeholder="$t('loan_detail_qsrnr')" class="item-value"></el-input>
                    <span v-else class="item-value">{{ dataList.companyVo.bcAddress ? dataList.companyVo.bcAddress : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yyzz') }}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; margin-top: 25px; margin-left: 30px">
                <el-link type="primary" v-if="dataList.companyVo.bcBusinesslicensePath"
                    @click="openImg(dataList.companyVo.bcBusinesslicensePath)">{{ $t('loan_detail_yyzzfb') }}</el-link>
                <el-upload v-if="isEdit" style="margin-left: 30px" :action="uploadUrl" :on-success="handlePreview3"
                    :show-file-list="false">
                    <el-button size="small" type="primary">上传营业执照</el-button>
                </el-upload>
            </div>
        </el-card>
        <el-card style="margin-top: 24px" shadow="hover" v-if="bankInfo.bankName || bankInfo.bankNo || bankInfo.name">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_yinhangzhanghu') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yinhangname') }}</span>

                    <span class="item-value">{{ bankInfo.bankName ? bankInfo.bankName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yinhangzhanghu') }}</span>

                    <span class="item-value">{{ bankInfo.bankNo ? bankInfo.bankNo : '-' }}</span>
                </div>

                <div class="request-item">
                    <span class="item-label">{{ $t('loan_search_name') }}</span>

                    <span class="item-value">{{ bankInfo.name ? bankInfo.name : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">身份证</span>

                    <span class="item-value">{{ bankInfo.idCard ? bankInfo.idCard : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">手机号码</span>

                    <span class="item-value">{{ bankInfo.phone ? bankInfo.phone : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">开户行地址</span>

                    <span class="item-value">{{ bankInfo.bankAddress ? bankInfo.bankAddress : '-' }}</span>
                </div>
            </div>
        </el-card>

        <el-card style="margin-top: 24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detai_dpqyqk') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_gscxqd') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcSearchChannel"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcSearchChannel ? dataList.companyVo.bcSearchChannel
                        : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sshy') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcIndustry"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcIndustry ? dataList.companyVo.bcIndustry : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrcgbl') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcProportion"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcProportion ? dataList.companyVo.bcProportion : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zcszd') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcAddress"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcAddress ? dataList.companyVo.bcAddress : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zczb') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcRegcapital"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcRegcapital ? dataList.companyVo.bcRegcapital : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_clrq') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcCreateTime"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcCreateTime ? dataList.companyVo.bcCreateTime : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_yyzzsfyx') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcBusinessLicenseexpire"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="VALID">是</el-radio-button>
                        <el-radio-button label="INVALID">否</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.companyVo.bcBusinessLicenseexpire === 'VALID'
                            ? '是'
                            : dataList.companyVo.bcBusinessLicenseexpire === 'INVALID'
                                ? '否'
                                : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_skzt') }}</span>
                    <!-- <el-radio-group
                        v-model="dataList.companyVo.bcType"
                        style="margin-right:50px"
                        v-if="isEdit"
                    >
                        <el-radio-button label="公司">公司</el-radio-button>
                        <el-radio-button label="个人">个人</el-radio-button>
                    </el-radio-group>
                    <el-radio-group v-model="dataList.companyVo.bcRegion" v-if="isEdit">
                        <el-radio-button label="香港">香港</el-radio-button>
                        <el-radio-button label="大陆">大陆</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value" style="width: 50px">{{ dataList.companyVo.bcType ?
                        dataList.companyVo.bcType : '-' }}</span>
                    <span class="item-value" style="width: 50px">{{
                        dataList.companyVo.bcRegion ? dataList.companyVo.bcRegion : '-'
                    }}</span>
                </div>
            </div>
        </el-card>

        <el-card style="margin-top: 24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_jyds') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jydsmc') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcCounterpartyName"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value" style="width: 50px">{{
                        dataList.companyVo.bcCounterpartyName ? dataList.companyVo.bcCounterpartyName : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_gscxqd') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcSearchChannelCounterparty"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyVo.bcSearchChannelCounterparty ? dataList.companyVo.bcSearchChannelCounterparty
                            : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sshy') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcIndustrycounterparty"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyVo.bcIndustrycounterparty ? dataList.companyVo.bcIndustrycounterparty : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jyfwsfybjxf') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcIsscopetransactionsame"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="SAME">是</el-radio-button>
                        <el-radio-button label="UNSAME">否</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.companyVo.bcIsscopetransactionsame === 'SAME'
                            ? '是'
                            : dataList.companyVo.bcIsscopetransactionsame === 'UNSAME'
                                ? '否'
                                : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jyhtje') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcAgreementAmount"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcAgreementAmount ?
                        dataList.companyVo.bcAgreementAmount : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_dkjebl') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcLoanAmountProportion"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyVo.bcLoanAmountProportion ? dataList.companyVo.bcLoanAmountProportion : '-'
                    }}</span>
                </div>

                <div class="request-item" style="width: 100%">
                    <span class="item-label">{{ $t('loan_detail_dkjtyt') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyVo.bcLoanUse"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="广告推广"></el-radio-button>
                        <el-radio-button label="发放工资"></el-radio-button>
                        <el-radio-button label="支付运费"></el-radio-button>
                        <el-radio-button label="采购货物"></el-radio-button>
                        <el-radio-button label="其他"></el-radio-button>
                    </el-radio-group>-->
                    <!-- <el-input
                        v-if="dataList.companyVo.bcLoanUse==='其他' &&isEdit"
                        v-model="loanUse"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyVo.bcLoanUse ? dataList.companyVo.bcLoanUse : '-'
                        }}</span>
                </div>
            </div>
        </el-card>

        <el-card style="margin-top: 24px" shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_jkr') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrnl') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bage"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bAge ? dataList.companyBorrowerVo.bAge : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrcsrq') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bBirthday"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bBirthday ?
                        dataList.companyBorrowerVo.bBirthday : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zjsfzyxq') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bCardExpDate"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="VALID">是</el-radio-button>
                        <el-radio-button label="INVALID">否</el-radio-button>
                    </el-radio-group>-->

                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bCardExpDate === 'VALID'
                            ? '是'
                            : dataList.companyBorrowerVo.bCardExpDate === 'INVALID'
                                ? '否'
                                : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_gj') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.borrowerNationatity"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.borrowerNationatity ? dataList.companyBorrowerVo.borrowerNationatity
                            : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrhj') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bResidence"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bResidence ? dataList.companyBorrowerVo.bResidence : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrzw') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bJob"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bJob ? dataList.companyBorrowerVo.bJob : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrgzdw') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bUnit"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bUnit ? dataList.companyBorrowerVo.bUnit :
                        '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrcbqk') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bInsure"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bInsure ? dataList.companyBorrowerVo.bInsure
                        : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrsfqs') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bAuthorize"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bAuthorize ? dataList.companyBorrowerVo.bAuthorize : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_ywszfc') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bHouse"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="TRUE">有</el-radio-button>
                        <el-radio-button label="FALSE">无</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bHouse === 'TRUE' ? '有' : dataList.companyBorrowerVo.bHouse ===
                            'FALSE' ? '无' : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_khxyje') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bamountLending"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bamountLending ? dataList.companyBorrowerVo.bamountLending : '-'
                    }}</span>
                </div>
            </div>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_poxx') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jkrhyqk') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bMarriage"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="UNMARRIED">未婚</el-radio-button>
                        <el-radio-button label="MARRIED">已婚</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bMarriage === 'UNMARRIED'
                            ? '未婚'
                            : dataList.companyBorrowerVo.bMarriage === 'MARRIED'
                                ? '已婚'
                                : '-'
                    }}</span>
                </div>

                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_pohj') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bsResidence"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bsResidence ? dataList.companyBorrowerVo.bsResidence : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">
                        {{ $t('loan_detail_pogzdw') }}
                        <span>{{ $t('loan_detail_tgsrzm') }}</span>
                    </span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bsUnit"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bsUnit ? dataList.companyBorrowerVo.bsUnit :
                        '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">
                        {{ $t('loan_detail_pozw') }}
                        <span>{{ $t('loan_detail_tgsrzm') }}</span>
                    </span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bsJob"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.companyBorrowerVo.bsJob ? dataList.companyBorrowerVo.bsJob :
                        '-' }}</span>
                </div>

                <div class="request-item">
                    <span class="item-label">
                        {{ $t('loan_detail_poywr') }}
                        <span>{{ $t('loan_detail_tgsrzm') }}</span>
                    </span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bsMonthRevenue"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.companyBorrowerVo.bsMonthRevenue ? dataList.companyBorrowerVo.bsMonthRevenue : '-'
                    }}</span>
                </div>
            </div>
        </el-card>
        <el-card shadow="hover">
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_dbr') }}</span>
            </div>
            <div class="item-box">
                <div class="request-item">
                    <span class="item-label">{{ $t('laon_detail_bzrxm') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gname"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gName ? dataList.guarantorVo.gName : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrzjhm') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gCardId"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gCardId ? dataList.guarantorVo.gCardId : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_dbrnl') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gAge"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gAge ? dataList.guarantorVo.gAge : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrcsrq') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gBirthday"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gBirthday ? dataList.guarantorVo.gBirthday : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_jyhtje') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gtransactionAmount"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{
                        dataList.guarantorVo.gtransactionAmount ? dataList.guarantorVo.gtransactionAmount : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_zjsfzyxq') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.bHouse"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="VALID">是</el-radio-button>
                        <el-radio-button label="INVALID">否</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.guarantorVo.gCardExpDate === 'VALID' ? '是' : dataList.guarantorVo.gCardExpDate ===
                            'INVALID' ? '否' : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrzw') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gJob"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gJob ? dataList.guarantorVo.gJob : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrhj') }}</span>
                    <!-- <el-input
                        v-if="isEdit"
                        v-model="dataList.guarantorVo.gResidence"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gResidence ? dataList.guarantorVo.gResidence : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrgzdw') }}</span>
                    <!-- <el-input
                     v-if="isEdit"
                        v-model="dataList.guarantorVo.gUnit"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gUnit ? dataList.guarantorVo.gUnit : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrysrw') }}</span>
                    <!-- <el-input
                    v-if="isEdit"
                        v-model="dataList.guarantorVo.gMonthRevenue"
                        :placeholder="$t('loan_detail_qsrnr')"
                        class="item-value"
                    ></el-input>-->
                    <span class="item-value">{{ dataList.guarantorVo.gMonthRevenue ? dataList.guarantorVo.gMonthRevenue
                        : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label"> {{ $t('loan_detail_cbqkbzsm') }} </span>

                    <span class="item-value">{{ dataList.guarantorVo.gInsureReason ? dataList.guarantorVo.gInsureReason
                        : '-' }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrcbqk') }}</span>
                    <span class="item-value">{{ dataList.guarantorVo.gInsure ? dataList.guarantorVo.gInsure : '-'
                        }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrsftgxwk') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.gBank"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="TRUE">是</el-radio-button>
                        <el-radio-button label="FALSE">否</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.guarantorVo.gBank === 'TRUE' ? '是' : dataList.guarantorVo.gBank === 'FALSE' ? '否' : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_bzrsfqssqs') }}</span>
                    <!-- <el-radio-group
                        v-if="isEdit"
                        v-model="dataList.companyBorrowerVo.gAuthorize"
                        style="margin-right:50px"
                    >
                        <el-radio-button label="TRUE">是</el-radio-button>
                        <el-radio-button label="FALSE">否</el-radio-button>
                    </el-radio-group>-->
                    <span class="item-value">{{
                        dataList.guarantorVo.gAuthorize === 'TRUE' ? '是' : dataList.guarantorVo.gAuthorize === 'FALSE' ?
                            '否' : '-'
                    }}</span>
                </div>
                <div class="request-item">
                    <span class="item-label">{{ $t('loan_detail_sfdb') }}</span>
                    <span class="item-value">{{ dataList.isGuarant ? '是' : '-' }}</span>
                </div>
            </div>
        </el-card>

        <el-card style="margin-top: 24px" shadow="hover" >
            <div slot="header" class="request-info">
                <span>{{ $t('loan_detail_supple') }}</span>
            </div>
            <el-form :model="additionalInformation" :rules="rules" ref="additionalInformation" label-width="200px">
                <el-form-item label="实控人近1个月征信报告:">
                    <a
                        v-if="additionalInformation.controllerCreditReport"
                        :href="additionalInformation.controllerCreditReport"
                        :download="getFileName(additionalInformation.controllerCreditReport)"
                        target="_blank"
                        style="color: #409eff; text-decoration: underline"
                    >
                        {{ getFileName(additionalInformation.controllerCreditReport) }}
                    </a>
                    <span v-else>{{ $t('No_file') }}</span>
                </el-form-item>
                <el-form-item label="借款企业近1个月征信报告:">
                    <a
                        v-if="additionalInformation.enterpriseCreditReport"
                        :href="additionalInformation.enterpriseCreditReport"
                        :download="getFileName(additionalInformation.enterpriseCreditReport)"
                        target="_blank"
                        style="color: #409eff; text-decoration: underline"
                    >
                        {{ getFileName(additionalInformation.enterpriseCreditReport) }}
                    </a>
                    <span v-else>{{ $t('No_file') }}</span>
                </el-form-item>
                <el-form-item label="借款人企业上一年度审计报告:">
                    <a
                        v-if="additionalInformation.enterpriseAuditReport"
                        :href="additionalInformation.enterpriseAuditReport"
                        :download="getFileName(additionalInformation.enterpriseAuditReport)"
                        target="_blank"
                        style="color: #409eff; text-decoration: underline"
                    >
                        {{ getFileName(additionalInformation.enterpriseAuditReport) }}
                    </a>
                    <span v-else>{{ $t('No_file') }}</span>
                </el-form-item>
                <el-form-item label="其他补充材料:">
                    <div v-if="additionalInformation.additionalMaterialsList">
                        <div v-for="(item, index) in additionalInformation.additionalMaterialsList" :key="index">
                            <a
                                :href="item"
                                :download="getFileName(item)"
                                target="_blank"
                                style="color: #409eff; text-decoration: underline"
                            >
                                {{ getFileName(item) }}
                            </a>
                        </div>
                    </div>
                    <span v-else>{{ $t('No_file') }}</span>
                </el-form-item>
            </el-form>
        </el-card>


        <!-- 广发kyc推送 -->
        <el-dialog title="kyc推送" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="ruleForm.companyName"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input v-model="ruleForm.creditCode"></el-input>
                </el-form-item>
                <el-form-item label="企业法人" prop="legalRepresentative">
                    <el-input v-model="ruleForm.legalRepresentative"></el-input>
                </el-form-item>
                <el-form-item label="法人手机号" prop="legalRepresentativeMobile">
                    <el-input v-model="ruleForm.legalRepresentativeMobile"></el-input>
                </el-form-item>
                <el-form-item label="* 省市区" prop="ssq">
                    <el-cascader style="width: 100%" :props="{ label: 'regionName', value: 'regionCode' }" v-model="ssq"
                        :options="options" @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="compayAdd">
                    <el-input v-model="ruleForm.compayAdd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即推送</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 选择大卖标签 -->
        <el-dialog title="选择大卖标签" :visible.sync="showTag" width="500px" :close-on-click-modal="false">
            <el-select v-model="tagText" multiple  placeholder="请选择大卖标签">
                 <el-option
                v-for="item in chooseOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeTag">取 消</el-button>
                <el-button type="primary" @click="ensureTag">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { borrower, gfStoreinfoV2, getAllRegionCode, chooseTag } from '../../../api/index';
export default {
    props: {
        pageInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        bankInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        additionalInformation: {
            type: Array,
            default: ''
        }
    },
    
    data() {
        return {
            chooseOptions: [{
           value: 'DM_1',
           label: '大卖-AmazonSC'
           }, {
           value: 'DM_2',
           label: '大卖-AmazonVC'
          }, {
           value: 'DM_3',
            label: '大卖-本土'
           }, {
          value: 'DM_4',
          label: '大卖-多平台'
          }],
            tagText: [],
            showTag: false,
            dataList: {},
            showPage: false,
            loanUse: '',
            isEdit: false,
            uploadUrl: process.env.VUE_APP_UPLOAD_URL,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            lendingUrl: process.env.VUE_APP_CENTER_URL,
            dialogVisible: false,
            rules: {
                companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
                creditCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
                legalRepresentative: [{ required: true, message: '请输入企业法人', trigger: 'blur' }],
                legalRepresentativeMobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                compayAdd: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
            },
            ruleForm: {
                applicationCode: '',
                companyName: '',
                creditCode: '',
                legalRepresentative: '',
                legalRepresentativeMobile: '',
                compayProvinceCode: '',
                compayCityCode: '',
                compayZoneCode: '',
                compayAdd: ''
            },
            options: [],
            ssq: '',
        };
    },
    methods: {
        
        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },
        //取消选择大卖标签
        closeTag() {
            this.tagText = []
            this.showTag = false;
        },
        //确定大卖标签
        ensureTag() {
            chooseTag(
                {
                    type: this.tagText.join(','),
                    applicationCode: this.$route.query.loanNumber
                }
            ).then((res) => {
                this.$message.success("标签选择成功")
                  this.tagText = []
                this.showTag = false;
            })
        },

        showGfKycDialog() {
            this.dialogVisible = true;
            this.ruleForm = {
                applicationCode: '',
                companyName: this.dataList.companyVo && this.dataList.companyVo.bcName,
                creditCode: this.dataList.companyVo && this.dataList.companyVo.bcCreditcode,
                legalRepresentative: this.dataList.companyVo && this.dataList.companyVo.bcLegalperson,
                legalRepresentativeMobile: this.dataList.companyBorrowerVo && this.dataList.companyBorrowerVo.bPhoneNumber,
                compayProvinceCode: '',
                compayCityCode: '',
                compayZoneCode: '',
                compayAdd: this.dataList.companyVo && this.dataList.companyVo.bcAddress
            };
            this.ssq = '';
            // 获取地址码
            this._getAllRegionCode();
        },
        handleClose() {
            this.dialogVisible = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.ruleForm.compayProvinceCode || !this.ruleForm.compayCityCode || !this.ruleForm.compayZoneCode) {
                        return this.$message.warning('请选择省市区');
                    }
                    this.ruleForm.applicationCode = this.$route.query.loanNumber;
                    gfStoreinfoV2(this.ruleForm).then((res) => {
                        this.handleClose();
                        this.$message.success(res.data.errorMsg);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleChange(v) {
            if (v.length > 0) {
                this.ruleForm.compayProvinceCode = v[0];
                this.ruleForm.compayCityCode = v[1];
                this.ruleForm.compayZoneCode = v[2];
            }
        },
        // 获取地址码
        _getAllRegionCode() {
            getAllRegionCode().then((res) => {
                this.options = this.removeEmptyChildren(res.data);
                console.log(res.data);
                console.log(this.removeEmptyChildren(res.data));
            });
        },
        removeEmptyChildren(nodes) {
            nodes.forEach((node) => {
                if (node.children) {
                    if (node.children.length === 0) {
                        delete node.children; // 删除空的 children 数组
                    } else {
                        this.removeEmptyChildren(node.children); // 递归处理子节点
                    }
                }
            });
            return nodes;
        },

        _downLoad() {
            this.$export(`/application/zip/export?type=CNY&applicationCode=${this.$route.query.loanNumber}`, '', 'zip');
        },
        _downLoadStzf() {
            this.$exportMerchant(this.lendingUrl + `/lending/entrusted-payment/zip/export?userId=${this.$route.query.userId}`, '', 'zip');
        },
        closeEditF() {
            this.isEdit = false;
            this.$emit('refreshDetail');
        },
        cliEdit() {
            this.isEdit = true;
        },
        save() {
            //    let formData = new FormData();
            // Object.keys(this.dataList.companyVo).forEach((key) => {
            //    if(key!=='bcCreateTime' &&key!=='bBirthday'){
            //         formData.append(key, this.dataList.companyVo[key]?this.dataList.companyVo[key]:'');
            //    }
            // });
            // Object.keys(this.dataList.companyBorrowerVo).forEach((key) => {
            //      if(key!=='bcCreateTime' &&key!=='bBirthday'){
            //         formData.append(key, this.dataList.companyBorrowerVo[key]?this.dataList.companyBorrowerVo[key]:'');
            //    }

            // });
            let obj = Object.assign(this.dataList.companyVo, this.dataList.companyBorrowerVo);
            this.$delete(obj, 'bcCreateTime');
            this.$delete(obj, 'bBirthday');
            this.$delete(obj, 'idBorrower');
            this.$delete(obj, 'idCompany');
            obj.applicationId = this.$route.query.id;
            borrower(obj).then((res) => {
                this.$message.success('保存修改！');
                this.isEdit = false;
                this.$emit('refreshDetail');
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
            this.dataList.companyBorrowerVo.bCardFrontPath = res.data.fullFilePath;
        },
        handlePreview2(res, file) {
            this.dataList.companyBorrowerVo.bCardBackPath = res.data.fullFilePath;
        },
        handlePreview3(res, file) {
            this.dataList.companyVo.bcBusinesslicensePath = res.data.fullFilePath;
        }
    },
    created() { },

    watch: {
        pageInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.dataList = newV;
                this.showPage = true;
                this.dataList.companyBorrowerVo.bAuthorize =
                    this.dataList.companyBorrowerVo.bAuthorize === 'TRUE'
                        ? '是'
                        : this.dataList.companyBorrowerVo.bAuthorize === 'FALSE'
                            ? '否'
                            : '-';
                if (
                    this.dataList.companyVo.bcLoanUse !== '广告推广' &&
                    this.dataList.companyVo.bcLoanUse !== '发放工资' &&
                    this.dataList.companyVo.bcLoanUse !== '支付运费' &&
                    this.dataList.companyVo.bcLoanUse !== '采购货物'
                ) {
                    this.loanUse = this.dataList.companyVo.bcLoanUse;
                    this.dataList.companyVo.bcLoanUse = '其他';
                }
            }
        }
    }

};
</script>

<style lang="less">
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
