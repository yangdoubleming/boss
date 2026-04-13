<template>
    <div class="hsbc-info-box" v-if="showPage">
        <div v-if="!showZhada">
            <div slot="header" class="request-info"
                style="display: flex; width: 100%; align-items: center; justify-content: flex-end; margin-bottom: 10px">
                <el-button @click="showTag = true" type="primary" class="btn" style="margin-left: 20px; float: right">
                    选择大卖标签 </el-button>
                <el-button v-if="$route.query.lenderId == 15" type="primary" class="btn"
                    style="margin-left: 20px; float: right" @click="_downLoad">{{ $t('loan_detail_zlxz') }}</el-button>
            </div>
            <el-form :model="userApplyInfo" :rules="rules" ref="userApplyInfo" label-width="200px"
                class="demo-ruleForm">
                <!-- 董事身份证正反面 -->
                <el-row class="pic-box" v-for="(item, index) in directors" :key="index">
                    <el-upload class="avatar-uploader" style="" v-loading="loadingA" :action="uploadUrl"
                        :with-credentials="true" :headers="myHeaders" capture="camera" :show-file-list="false"
                        :on-success="handleAvatarSuccessA" :before-upload="beforeAvatarUploadA" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex(index)" style="width: 280px" class="avatar"
                            v-if="item.directorCardFrontPath" :src="`${imgsBaseUrl}` + item.directorCardFrontPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzrxm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.directorCardFrontPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.directorCardFrontPath)"
                                @click.stop="previewImage(item.directorCardFrontPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.directorCardFrontPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('directors[' + index + '].directorCardFrontPath')"></i>
                        </div>
                    </el-upload>
                    <el-upload class="avatar-uploader" style="float: left; margin-left: 20px" v-loading="loadingB"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessB" :before-upload="beforeAvatarUploadB"
                        :data="uploadParams">
                        <el-image @click="setNowDirectorIndex(index)" style="width: 280px" class="avatar"
                            v-if="item.directorCardBackPath" :src="`${imgsBaseUrl}` + item.directorCardBackPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzghm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.directorCardBackPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.directorCardBackPath)"
                                @click.stop="previewImage(item.directorCardBackPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.directorCardBackPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('directors[' + index + '].directorCardBackPath')"></i>
                        </div>
                    </el-upload>
                    <el-button icon="el-icon-delete" size="small" style="margin-bottom: 16px; margin-left: -30px"
                        @click="removeDirector(index)" v-if="index !== 0"></el-button>
                    <el-button icon="el-icon-plus" size="small" style="margin-bottom: 16px; margin-left: -90px"
                        @click="addDirector" v-else>添加董事</el-button>
                </el-row>
                <el-row class="pic-box">
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingC"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessC" :before-upload="beforeAvatarUploadC"
                        :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userApplyInfo.certificateIncorporation &&
                            (userApplyInfo.certificateIncorporation.indexOf('.pdf') > -1 ||
                                userApplyInfo.certificateIncorporation.indexOf('.zip') > -1 ||
                                userApplyInfo.certificateIncorporation.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">公司注册证书上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userApplyInfo.certificateIncorporation"
                            :src="`${imgsBaseUrl}` + userApplyInfo.certificateIncorporation" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-bs.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userApplyInfo.certificateIncorporation">
                            <i class="el-icon-zoom-in" v-if="isImage(userApplyInfo.certificateIncorporation)"
                                @click.stop="previewImage(userApplyInfo.certificateIncorporation)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userApplyInfo.certificateIncorporation)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userApplyInfo.certificateIncorporation')"></i>
                        </div>
                    </el-upload>
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingD"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessD" :before-upload="beforeAvatarUploadD"
                        :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userApplyInfo.businessRegistrationCertificate &&
                            (userApplyInfo.businessRegistrationCertificate.indexOf('.pdf') > -1 ||
                                userApplyInfo.businessRegistrationCertificate.indexOf('.zip') > -1 ||
                                userApplyInfo.businessRegistrationCertificate.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">商业登记证上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userApplyInfo.businessRegistrationCertificate"
                            :src="`${imgsBaseUrl}` + userApplyInfo.businessRegistrationCertificate"
                            :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ma.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userApplyInfo.businessRegistrationCertificate">
                            <i class="el-icon-zoom-in" v-if="isImage(userApplyInfo.businessRegistrationCertificate)"
                                @click.stop="previewImage(userApplyInfo.businessRegistrationCertificate)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userApplyInfo.businessRegistrationCertificate)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userApplyInfo.businessRegistrationCertificate')"></i>
                        </div>
                    </el-upload>
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingE"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessE" :before-upload="beforeAvatarUploadE"
                        :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userApplyInfo.memorandumAssociation &&
                            (userApplyInfo.memorandumAssociation.indexOf('.pdf') > -1 ||
                                userApplyInfo.memorandumAssociation.indexOf('.zip') > -1 ||
                                userApplyInfo.memorandumAssociation.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">公司章程上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userApplyInfo.memorandumAssociation"
                            :src="`${imgsBaseUrl}` + userApplyInfo.memorandumAssociation" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ar.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userApplyInfo.memorandumAssociation">
                            <i class="el-icon-zoom-in" v-if="isImage(userApplyInfo.memorandumAssociation)"
                                @click.stop="previewImage(userApplyInfo.memorandumAssociation)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userApplyInfo.memorandumAssociation)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userApplyInfo.memorandumAssociation')"></i>
                        </div>
                    </el-upload>
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingF"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessF" :before-upload="beforeAvatarUploadF"
                        :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userApplyInfo.annualReturns &&
                            (userApplyInfo.annualReturns.indexOf('.pdf') > -1 ||
                                userApplyInfo.annualReturns.indexOf('.zip') > -1 ||
                                userApplyInfo.annualReturns.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">周年申报表上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userApplyInfo.annualReturns"
                            :src="`${imgsBaseUrl}` + userApplyInfo.annualReturns" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/ss.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userApplyInfo.annualReturns">
                            <i class="el-icon-zoom-in" v-if="isImage(userApplyInfo.annualReturns)"
                                @click.stop="previewImage(userApplyInfo.annualReturns)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(userApplyInfo.annualReturns)"></i>
                            <i class="el-icon-delete" @click.stop="deleteImage('userApplyInfo.annualReturns')"></i>
                        </div>
                    </el-upload>
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingG"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessG1"
                        :before-upload="beforeAvatarUploadG1" :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userApplyInfo.shareholdingStructure &&
                            (userApplyInfo.shareholdingStructure.indexOf('.pdf') > -1 ||
                                userApplyInfo.shareholdingStructure.indexOf('.zip') > -1 ||
                                userApplyInfo.shareholdingStructure.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">股权架构图上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userApplyInfo.shareholdingStructure"
                            :src="`${imgsBaseUrl}` + userApplyInfo.shareholdingStructure" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/yyzz.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userApplyInfo.shareholdingStructure">
                            <i class="el-icon-zoom-in" v-if="isImage(userApplyInfo.shareholdingStructure)"
                                @click.stop="previewImage(userApplyInfo.shareholdingStructure)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userApplyInfo.shareholdingStructure)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userApplyInfo.shareholdingStructure')"></i>
                        </div>
                    </el-upload>
                </el-row>
                <el-row :gutter="60" style="margin-top: 16px">
                    <el-col :span="10">
                        <el-form-item label="董事姓名" prop="directorHk">
                            <el-input v-model="userApplyInfo.directorHk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="董事证件号码" prop="directorHkIdCard">
                            <el-input v-model="userApplyInfo.directorHkIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="香港企业名称" prop="bcNameHk">
                            <el-input v-model="userApplyInfo.bcNameHk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="香港企业注册证书编号" prop="certificateIncorporationNo">
                            <el-input v-model="userApplyInfo.certificateIncorporationNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="香港公司注册地址" prop="bcAddressHk">
                            <el-input v-model="userApplyInfo.bcAddressHk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商业登记证号码" prop="certificateNoHk">
                            <el-input v-model="userApplyInfo.certificateNoHk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item :style="{ width: '100%' }" label="实控人姓名" prop="actualController">
                            <el-input v-model="userApplyInfo.actualController"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="实控人身份证号" prop="actualControllerIdCard">
                            <el-input v-model="userApplyInfo.actualControllerIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="实控人电话号码" prop="actualControllerPhone">
                            <el-input v-model="userApplyInfo.actualControllerPhone">
                                <el-select style="width: 85px" v-model="userApplyInfo.actualControllerPhoneAreaCode"
                                    slot="prepend" placeholder="Code">
                                    <el-option label="+86" value="86"></el-option>
                                    <el-option label="+852" value="852"></el-option>
                                    <el-option label="+65" value="65"></el-option>
                                    <el-option label="+84" value="84"></el-option>
                                    <el-option label="+62" value="62"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="实控人邮箱" prop="actualControllerEmail" :style="{ width: '100%' }">
                            <el-input v-model="userApplyInfo.actualControllerEmail"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="国内经营主体" prop="domesticBusinessEntity" :style="{ width: '100%' }">
                            <el-input v-model="userApplyInfo.domesticBusinessEntity"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="实控人居住地址" prop="actualControllerAddress" :style="{ width: '100%' }">
                            <el-input v-model="userApplyInfo.actualControllerAddress"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60" style="margin-top: 16px">
                    <el-col :span="10">
                        <el-form-item label="银行账户名称" prop="accountName">
                            <el-input v-model="userApplyInfo.accountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="银行账户号码" prop="bankNo">
                            <el-input v-model="userApplyInfo.bankNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="银行名称" prop="bankName">
                            <el-input v-model="userApplyInfo.bankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="swiftCode" prop="swiftCode">
                            <el-input v-model="userApplyInfo.swiftCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="香港企业类型" prop="companyType">
                            <el-select v-model="userApplyInfo.companyType" placeholder="请选择香港公司类型" style="width: 100%;">
                                <el-option label="独资企业" value="soleProprietorship"></el-option>
                                <el-option label="合伙企业" value="partnership"></el-option>
                                <el-option label="有限公司" value="limitedCompany"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="联系人姓名" prop="companyContactName">
                            <el-input v-model="userApplyInfo.companyContactName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="联系人邮箱" prop="companyContactEmail">
                            <el-input v-model="userApplyInfo.companyContactEmail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="联系人电话" prop="bcPhone">
                            <el-input v-model="userApplyInfo.bcPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="btn-box">
                    <el-button type="primary" class="btn" @click="submitCompanyForm('userApplyInfo')"
                        name="personNextStep">确认</el-button>
                </div>
            </el-form>
            <el-card style="margin-top: 24px" shadow="hover" v-if="$route.query.lenderId == '74'">
                <div slot="header" class="request-info">
                    <span>{{ $t('loan_detail_supple') }}</span>
                </div>
                <el-descriptions title="" direction="vertical" :column="4" border>

                    <el-descriptions-item label="用户ID">{{ cmcInfoObj.userId }}</el-descriptions-item>
                    <el-descriptions-item label="申请单编码">{{ cmcInfoObj.applicationCode }}</el-descriptions-item>

                    <!-- URL 字段 -->
                    <el-descriptions-item label="公司介绍文件URL">
                        <a :href="cmcInfoObj.companyIntroUrl" target="_blank">{{ cmcInfoObj.companyIntroUrl }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="大陆企业征信URL">
                        <a :href="cmcInfoObj.enterpriseCreditUrl" target="_blank">{{ cmcInfoObj.enterpriseCreditUrl
                        }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="实控人征信URL">
                        <a :href="cmcInfoObj.controllerCreditUrl" target="_blank">{{ cmcInfoObj.controllerCreditUrl
                        }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="实控人名下房产证URL">
                        <a :href="cmcInfoObj.propertyOwnershipUrl" target="_blank">{{ cmcInfoObj.propertyOwnershipUrl
                        }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="过去三年财报URL">
                        <a :href="cmcInfoObj.threeYearFinancialUrl" target="_blank">{{ cmcInfoObj.threeYearFinancialUrl
                        }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="当年最近1期报告URL">
                        <a :href="cmcInfoObj.latestReportUrl" target="_blank">{{ cmcInfoObj.latestReportUrl }}</a>
                    </el-descriptions-item>

                    <el-descriptions-item label="主力店铺URL">
                        <a :href="cmcInfoObj.mainStoreUrl" target="_blank">{{ cmcInfoObj.mainStoreUrl }}</a>
                    </el-descriptions-item>
                    <el-descriptions-item label="大陆企业经营执照URL">
                        <a :href="cmcInfoObj.mainlandBusinessLicenseUrl" target="_blank">{{
                            cmcInfoObj.mainlandBusinessLicenseUrl }}</a>
                    </el-descriptions-item>

                    <!-- 非URL字段保留文本展示 -->
                    <el-descriptions-item label="融资金额">{{ cmcInfoObj.financingAmount }}</el-descriptions-item>
                    <el-descriptions-item label="申请期限">{{ cmcInfoObj.applicationTerm }}</el-descriptions-item>
                    <el-descriptions-item label="还款方式">{{ cmcInfoObj.repaymentMethod }}</el-descriptions-item>

                    <el-descriptions-item label="创建时间">{{ cmcInfoObj.createTime }}</el-descriptions-item>
                    <el-descriptions-item label="更新时间">{{ cmcInfoObj.updateTime }}</el-descriptions-item>
                    <el-descriptions-item label="风控预约时间">{{ cmcInfoObj.subscribeTime }}</el-descriptions-item>

                    <el-descriptions-item label="关联大陆公司法人">{{ cmcInfoObj.relatedMainlandCompanyLegal
                    }}</el-descriptions-item>
                    <el-descriptions-item label="关联大陆公司员工数">{{ cmcInfoObj.relatedMainlandCompanyEmployeesNo
                    }}</el-descriptions-item>
                    <el-descriptions-item label="关联大陆公司平均利润">{{ cmcInfoObj.relatedMainlandCompanyProfitAvg
                    }}</el-descriptions-item>

                    <el-descriptions-item label="实际工作">{{ cmcInfoObj.actualJob }}</el-descriptions-item>


                </el-descriptions>


            </el-card>
            <el-card style="margin-top: 24px" shadow="hover" v-else>
                <div slot="header" class="request-info">
                    <span>{{ $t('loan_detail_supple') }}</span>
                </div>
                <el-form :model="additionalInformation" :rules="rules" ref="additionalInformation" label-width="200px">
                    <el-form-item label="实控人近1个月征信报告:">
                        <a v-if="additionalInformation.controllerCreditReport"
                            :href="additionalInformation.controllerCreditReport"
                            :download="getFileName(additionalInformation.controllerCreditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(additionalInformation.controllerCreditReport) }}
                        </a>
                        <span v-else>{{ $t('No_file') }}</span>
                    </el-form-item>
                    <el-form-item label="借款企业近1个月征信报告:">
                        <a v-if="additionalInformation.enterpriseCreditReport"
                            :href="additionalInformation.enterpriseCreditReport"
                            :download="getFileName(additionalInformation.enterpriseCreditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(additionalInformation.enterpriseCreditReport) }}
                        </a>
                        <span v-else>{{ $t('No_file') }}</span>
                    </el-form-item>
                    <el-form-item label="借款人企业上一年度审计报告:">
                        <a v-if="additionalInformation.enterpriseAuditReport"
                            :href="additionalInformation.enterpriseAuditReport"
                            :download="getFileName(additionalInformation.enterpriseAuditReport)" target="_blank"
                            style="color: #409eff; text-decoration: underline">
                            {{ getFileName(additionalInformation.enterpriseAuditReport) }}
                        </a>
                        <span v-else>{{ $t('No_file') }}</span>
                    </el-form-item>
                    <el-form-item label="其他补充材料:">
                        <div v-if="additionalInformation.additionalMaterialsList">
                            <div v-for="(item, index) in additionalInformation.additionalMaterialsList" :key="index">
                                <a :href="item" :download="getFileName(item)" target="_blank"
                                    style="color: #409eff; text-decoration: underline">
                                    {{ getFileName(item) }}
                                </a>
                            </div>
                        </div>
                        <span v-else>{{ $t('No_file') }}</span>
                    </el-form-item>
                    <el-form-item label="入账凭证:" v-if="receiptInfo.receiptVoucher">
                        <a :href="receiptInfo.receiptVoucher" :download="getFileName(receiptInfo.receiptVoucher)"
                            target="_blank" style="color: #409eff; text-decoration: underline">
                            {{ getFileName(receiptInfo.receiptVoucher) }}
                        </a>
                    </el-form-item>
                    <el-form-item label="入账时间:" v-if="receiptInfo.receiptVoucherDate">
                        {{ receiptInfo.receiptVoucherDate }}
                    </el-form-item>
                </el-form>
            </el-card>

            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <!-- 选择大卖标签 -->
            <el-dialog title="选择大卖标签" :visible.sync="showTag" width="500px" :close-on-click-modal="false">
                <el-select v-model="tagText" multiple placeholder="请选择大卖标签">
                    <el-option v-for="item in chooseOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeTag">取 消</el-button>
                    <el-button type="primary" @click="ensureTag">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-else>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <el-form :model="userZhaDaApplyInfo" :rules="rules" ref="userZhaDaApplyInfo" label-width="200px"
                class="demo-ruleForm">

                <!-- 申请人身份证正反面 -->
                <el-row class="pic-box" v-for="(item, index) in zhaDaDirectors1" :key="index">
                    <!--                    身份证正面          -->
                    <el-upload class="avatar-uploader" style="" v-loading="loadingA1" :action="uploadUrl"
                        :with-credentials="true" :headers="myHeaders" capture="camera" :show-file-list="false"
                        :on-success="handleAvatarSuccessA1" :before-upload="beforeAvatarUploadA1" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.directorCardFrontPath" :src="`${imgsBaseUrl}` + item.directorCardFrontPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex1(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzrxm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.directorCardFrontPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.directorCardFrontPath)"
                                @click.stop="previewImage(item.directorCardFrontPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.directorCardFrontPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors1[' + index + '].directorCardFrontPath')"></i>
                        </div>
                    </el-upload>
                    <!--                     身份证反面          -->
                    <el-upload class="avatar-uploader" style="float: left; margin-left: 20px" v-loading="loadingB1"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessB1"
                        :before-upload="beforeAvatarUploadB1" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.directorCardBackPath" :src="`${imgsBaseUrl}` + item.directorCardBackPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzghm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.directorCardBackPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.directorCardBackPath)"
                                @click.stop="previewImage(item.directorCardBackPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.directorCardBackPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors1[' + index + '].directorCardBackPath')"></i>
                        </div>
                    </el-upload>
                </el-row>
                <el-row class="pic-box" v-for="(item, index) in zhaDaDirectors2" :key="index">
                    <!--                担保人正面    -->
                    <el-upload class="avatar-uploader" style="" v-loading="loadingA2" :action="uploadUrl"
                        :with-credentials="true" :headers="myHeaders" capture="camera" :show-file-list="false"
                        :on-success="handleAvatarSuccessA2" :before-upload="beforeAvatarUploadA2" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.guarantorCardFrontPath" :src="`${imgsBaseUrl}` + item.guarantorCardFrontPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex1(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzrxm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.guarantorCardFrontPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.guarantorCardFrontPath)"
                                @click.stop="previewImage(item.guarantorCardFrontPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.guarantorCardFrontPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors2[' + index + '].guarantorCardFrontPath')"></i>
                        </div>
                    </el-upload>
                    <!--                 担保人反面-->
                    <el-upload class="avatar-uploader" style="float: left; margin-left: 20px" v-loading="loadingB2"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessB2"
                        :before-upload="beforeAvatarUploadB2" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.guarantorCardBackPath" :src="`${imgsBaseUrl}` + item.guarantorCardBackPath"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex1(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/boss/sfzghm.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.guarantorCardBackPath">
                            <i class="el-icon-zoom-in" v-if="isImage(item.guarantorCardBackPath)"
                                @click.stop="previewImage(item.guarantorCardBackPath)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.guarantorCardBackPath)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors2[' + index + '].guarantorCardBackPath')"></i>
                        </div>
                    </el-upload>
                </el-row>
                <el-row class="pic-box" v-for="(item, index) in zhaDaDirectors3" :key="index">
                    <!--                申请人护照    -->
                    <el-upload class="avatar-uploader" style="" v-loading="loadingA3" :action="uploadUrl"
                        :with-credentials="true" :headers="myHeaders" capture="camera" :show-file-list="false"
                        :on-success="handleAvatarSuccessA3" :before-upload="beforeAvatarUploadA3" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.applicantPassport" :src="`${imgsBaseUrl}` + item.applicantPassport"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex1(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/common/sz_passport.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.applicantPassport">
                            <i class="el-icon-zoom-in" v-if="isImage(item.applicantPassport)"
                                @click.stop="previewImage(item.applicantPassport)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.applicantPassport)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors3[' + index + '].applicantPassport')"></i>
                        </div>
                    </el-upload>
                    <!--                 担保人护照-->
                    <el-upload class="avatar-uploader" style="float: left; margin-left: 20px" v-loading="loadingB3"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessB3"
                        :before-upload="beforeAvatarUploadB3" :data="uploadParams">
                        <el-image @click="setNowDirectorIndex1(index)" style="width: 280px" class="avatar"
                            v-if="item.guarantorPassport" :src="`${imgsBaseUrl}` + item.guarantorPassport"
                            :fit="fit"></el-image>
                        <div @click="setNowDirectorIndex1(index)" v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/common/db_passport.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="item.guarantorPassport">
                            <i class="el-icon-zoom-in" v-if="isImage(item.guarantorPassport)"
                                @click.stop="previewImage(item.guarantorPassport)"></i>
                            <i class="el-icon-download" @click.stop="downloadFile(item.guarantorPassport)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('zhaDaDirectors3[' + index + '].guarantorPassport')"></i>
                        </div>
                    </el-upload>
                </el-row>
                <!--                公司证件-->
                <el-row class="pic-box">
                    <!--   注册证书    -->
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingC1"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessC1"
                        :before-upload="beforeAvatarUploadC1" :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userZhaDaApplyInfo.certificateIncorporation &&
                            (userZhaDaApplyInfo.certificateIncorporation.indexOf('.pdf') > -1 ||
                                userZhaDaApplyInfo.certificateIncorporation.indexOf('.zip') > -1 ||
                                userZhaDaApplyInfo.certificateIncorporation.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">公司注册证书上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userZhaDaApplyInfo.certificateIncorporation"
                            :src="`${imgsBaseUrl}` + userZhaDaApplyInfo.certificateIncorporation" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-bs.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userZhaDaApplyInfo.certificateIncorporation">
                            <i class="el-icon-zoom-in" v-if="isImage(userZhaDaApplyInfo.certificateIncorporation)"
                                @click.stop="previewImage(userZhaDaApplyInfo.certificateIncorporation)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userZhaDaApplyInfo.certificateIncorporation)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userZhaDaApplyInfo.certificateIncorporation')"></i>
                        </div>
                    </el-upload>
                    <!--   商业等级证    -->
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingD1"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessD1"
                        :before-upload="beforeAvatarUploadD1" :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userZhaDaApplyInfo.businessRegistrationCertificate &&
                            (userZhaDaApplyInfo.businessRegistrationCertificate.indexOf('.pdf') > -1 ||
                                userZhaDaApplyInfo.businessRegistrationCertificate.indexOf('.zip') > -1 ||
                                userZhaDaApplyInfo.businessRegistrationCertificate.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">商业登记证上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userZhaDaApplyInfo.businessRegistrationCertificate"
                            :src="`${imgsBaseUrl}` + userZhaDaApplyInfo.businessRegistrationCertificate"
                            :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ma.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userZhaDaApplyInfo.businessRegistrationCertificate">
                            <i class="el-icon-zoom-in"
                                v-if="isImage(userZhaDaApplyInfo.businessRegistrationCertificate)"
                                @click.stop="previewImage(userZhaDaApplyInfo.businessRegistrationCertificate)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userZhaDaApplyInfo.businessRegistrationCertificate)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userZhaDaApplyInfo.businessRegistrationCertificate')"></i>
                        </div>
                    </el-upload>
                    <!--         公司章程           -->
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingE1"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessE1"
                        :before-upload="beforeAvatarUploadE1" :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userZhaDaApplyInfo.memorandumAssociation &&
                            (userZhaDaApplyInfo.memorandumAssociation.indexOf('.pdf') > -1 ||
                                userZhaDaApplyInfo.memorandumAssociation.indexOf('.zip') > -1 ||
                                userZhaDaApplyInfo.memorandumAssociation.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">公司章程上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userZhaDaApplyInfo.memorandumAssociation"
                            :src="`${imgsBaseUrl}` + userZhaDaApplyInfo.memorandumAssociation" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/company-ar.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userZhaDaApplyInfo.memorandumAssociation">
                            <i class="el-icon-zoom-in" v-if="isImage(userZhaDaApplyInfo.memorandumAssociation)"
                                @click.stop="previewImage(userZhaDaApplyInfo.memorandumAssociation)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userZhaDaApplyInfo.memorandumAssociation)"></i>
                            <i class="el-icon-delete"
                                @click.stop="deleteImage('userZhaDaApplyInfo.memorandumAssociation')"></i>
                        </div>
                    </el-upload>
                    <!--           周年申报表         -->
                    <el-upload class="avatar-uploader" style="margin-right: 24px" v-loading="loadingF"
                        :action="uploadUrl" :with-credentials="true" :headers="myHeaders" capture="camera"
                        :show-file-list="false" :on-success="handleAvatarSuccessF1"
                        :before-upload="beforeAvatarUploadF1" :data="uploadParams">
                        <el-image class="pdf-sty" v-if="
                            userZhaDaApplyInfo.annualReturns &&
                            (userZhaDaApplyInfo.annualReturns.indexOf('.pdf') > -1 ||
                                userZhaDaApplyInfo.annualReturns.indexOf('.zip') > -1 ||
                                userZhaDaApplyInfo.annualReturns.indexOf('.rar') > -1)
                        ">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-document" style="font-size: 12px">周年申报表上传成功</i>
                            </div>
                        </el-image>
                        <el-image class="avatar" v-else-if="userZhaDaApplyInfo.annualReturns"
                            :src="`${imgsBaseUrl}` + userZhaDaApplyInfo.annualReturns" :fit="fit"></el-image>
                        <div v-else>
                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/ss.png"
                                alt=""></el-image>
                        </div>
                        <div class="mask" v-if="userZhaDaApplyInfo.annualReturns">
                            <i class="el-icon-zoom-in" v-if="isImage(userZhaDaApplyInfo.annualReturns)"
                                @click.stop="previewImage(userZhaDaApplyInfo.annualReturns)"></i>
                            <i class="el-icon-download"
                                @click.stop="downloadFile(userZhaDaApplyInfo.annualReturns)"></i>
                            <i class="el-icon-delete" @click.stop="deleteImage('userZhaDaApplyInfo.annualReturns')"></i>
                        </div>
                    </el-upload>
                    <!--                    <el-upload-->
                    <!--                        class="avatar-uploader"-->
                    <!--                        style="margin-right: 24px"-->
                    <!--                        v-loading="loadingG"-->
                    <!--                        :action="uploadUrl"-->
                    <!--                        :with-credentials="true"-->
                    <!--                        :headers="myHeaders"-->
                    <!--                        capture="camera"-->
                    <!--                        :show-file-list="false"-->
                    <!--                        :on-success="handleAvatarSuccessG"-->
                    <!--                        :before-upload="beforeAvatarUploadG"-->
                    <!--                        :data="uploadParams"-->
                    <!--                    >-->
                    <!--                        <el-image-->
                    <!--                            class="pdf-sty"-->
                    <!--                            v-if="-->
                    <!--                            userZhaDaApplyInfo.shareholdingStructure &&-->
                    <!--                            (userZhaDaApplyInfo.shareholdingStructure.indexOf('.pdf') > -1 ||-->
                    <!--                                userZhaDaApplyInfo.shareholdingStructure.indexOf('.zip') > -1 ||-->
                    <!--                                userZhaDaApplyInfo.shareholdingStructure.indexOf('.rar') > -1)-->
                    <!--                        "-->
                    <!--                        >-->
                    <!--                            <div slot="error" class="image-slot">-->
                    <!--                                <i class="el-icon-document" style="font-size: 12px">股权架构图上传成功</i>-->
                    <!--                            </div>-->
                    <!--                        </el-image>-->
                    <!--                        <el-image-->
                    <!--                            class="avatar"-->
                    <!--                            v-else-if="userZhaDaApplyInfo.shareholdingStructure"-->
                    <!--                            :src="`${imgsBaseUrl}` + userZhaDaApplyInfo.shareholdingStructure"-->
                    <!--                            :fit="fit"-->
                    <!--                        ></el-image>-->
                    <!--                        <div v-else>-->
                    <!--                            <el-image src="https://dowsure.oss-cn-shanghai.aliyuncs.com/merchant/info/yyzz.png" alt=""></el-image>-->
                    <!--                        </div>-->
                    <!--                        <div class="mask" v-if="userZhaDaApplyInfo.shareholdingStructure">-->
                    <!--                            <i-->
                    <!--                                class="el-icon-zoom-in"-->
                    <!--                                v-if="isImage(userZhaDaApplyInfo.shareholdingStructure)"-->
                    <!--                                @click.stop="previewImage(userZhaDaApplyInfo.shareholdingStructure)"-->
                    <!--                            ></i>-->
                    <!--                            <i class="el-icon-download" @click.stop="downloadFile(userZhaDaApplyInfo.shareholdingStructure)"></i>-->
                    <!--                            <i class="el-icon-delete" @click.stop="deleteImage('userZhaDaApplyInfo.shareholdingStructure')"></i>-->
                    <!--                        </div>-->
                    <!--                    </el-upload>-->
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="20">
                        <el-form-item label="香港公司名称" prop="bcNameHk">
                            <el-input v-model="userZhaDaApplyInfo.bcNameHk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="香港公司类型" prop="companyType">
                            <el-select v-model="userZhaDaApplyInfo.companyType" placeholder="请选择香港公司类型">
                                <el-option label="有限公司" value="YSGS"></el-option>
                                <el-option label="独资企业" value="DZQY"></el-option>
                                <el-option label="合伙企业" value="HHQY"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="香港公司注册证明书编号" prop="certificateIncorporationNoHk">
                            <el-input v-model="userZhaDaApplyInfo.certificateIncorporationNoHk"
                                placeholder="香港公司注册证明书编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="申请人姓氏" prop="directorLastName">
                            <el-input v-model="userZhaDaApplyInfo.directorLastName" placeholder="请输入申请人姓氏"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="申请人名字" prop="directorFirstName">
                            <el-input v-model="userZhaDaApplyInfo.directorFirstName" placeholder="请输入申请人名字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="10">
                        <el-form-item label="申请人联络电话" prop="directorPhone">
                            <el-input v-model="userZhaDaApplyInfo.directorPhone" placeholder="请输入申请人联络电话">
                                <el-select style="width: 85px" v-model="userZhaDaApplyInfo.directorPhoneAreaCode"
                                    slot="prepend" placeholder="Code">
                                    <el-option label="+86" value="86"></el-option>
                                    <el-option label="+852" value="852"></el-option>
                                    <el-option label="+65" value="65"></el-option>
                                    <el-option label="+84" value="84"></el-option>
                                    <el-option label="+62" value="62"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="申请人邮箱" prop="directorEmail" :style="{ width: '100%' }">
                            <el-input v-model="userZhaDaApplyInfo.directorEmail" placeholder="请输入申请人邮箱"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="file_card">
                    <div style="padding: 20px;font-size: 18px">文件材料：</div>
                    <div class="li fileList">
                        <span>《反向问询书》</span>
                        <el-upload class="upload-demo" :action="baseUrl2" :file-list="fileList1"
                            :on-success="fileList1Success" list-type="none" :limit="1">
                            <span class="btn">上传</span>
                            <span v-if="file1.filePath" class="dl" @click.stop="downloadFile2(file1.filePath)">下载</span>
                        </el-upload>
                        <!-- 文件2列表展示 -->
                        <div class="custom-file-item" v-show="file1.filePath">
                            <i class="el-icon-document" style="color: #436dff;font-size: 18px;margin-right: 5px"></i>
                            <span class="file-name">{{ file1.fileName }}</span>
                            <i class="el-icon-error"
                                style="color: #ccd3e5;font-size: 18px;cursor: pointer;margin-left: 5px"
                                @click="removeFile(1)"></i>
                        </div>
                    </div>
                    <div class="li fileList">
                        <span>《数据采集同意书》</span>
                        <el-upload class="upload-demo" :action="baseUrl2" :file-list="fileList2"
                            :on-success="fileList2Success" list-type="none" :limit="1">
                            <span class="btn">上传</span>
                            <span v-if="file2.filePath" class="dl" @click.stop="downloadFile2(file2.filePath)">下载</span>
                        </el-upload>
                        <!-- 文件3列表展示 -->
                        <div class="custom-file-item" v-show="file2.filePath">
                            <i class="el-icon-document" style="color: #436dff;font-size: 18px;margin-right: 5px"></i>
                            <span class="file-name">{{ file2.fileName }}</span>
                            <i class="el-icon-error"
                                style="color: #ccd3e5;font-size: 18px;cursor: pointer;margin-left: 5px"
                                @click="removeFile(2)"></i>
                        </div>
                    </div>
                    <div class="li fileList">
                        <span>《银行服务转介确认书》</span>
                        <el-upload class="upload-demo" :action="baseUrl2" :file-list="fileList3"
                            :on-success="fileList3Success" list-type="none" :limit="1">
                            <span class="btn">上传</span>
                            <span v-if="file3.filePath" class="dl" @click.stop="downloadFile2(file3.filePath)">下载</span>
                        </el-upload>
                        <!-- 文件4列表展示 -->
                        <div class="custom-file-item" v-show="file3.filePath">
                            <i class="el-icon-document" style="color: #436dff;font-size: 18px;margin-right: 5px"></i>
                            <span class="file-name">{{ file3.fileName }}</span>
                            <i class="el-icon-error"
                                style="color: #ccd3e5;font-size: 18px;cursor: pointer;margin-left: 5px"
                                @click="removeFile(3)"></i>
                        </div>
                    </div>
                    <div class="li fileList">
                        <span>《贷款申请表》</span>
                        <el-upload class="upload-demo" :action="baseUrl2" :file-list="fileList4"
                            :on-success="fileList4Success" list-type="none" :limit="1">
                            <span class="btn">上传</span>
                            <span v-if="file4.filePath" class="dl" @click.stop="downloadFile2(file4.filePath)">下载</span>
                        </el-upload>
                        <!-- 文件4列表展示 -->
                        <div class="custom-file-item" v-show="file4.filePath">
                            <i class="el-icon-document" style="color: #436dff;font-size: 18px;margin-right: 5px"></i>
                            <span class="file-name">{{ file4.fileName }}</span>
                            <i class="el-icon-error"
                                style="color: #ccd3e5;font-size: 18px;cursor: pointer;margin-left: 5px"
                                @click="removeFile(4)"></i>
                        </div>
                    </div>
                    <div class="li fileList">
                        <span>《董事会决议》</span>
                        <el-upload class="upload-demo" :action="baseUrl2" :file-list="fileList5"
                            :on-success="fileList5Success" list-type="none" :limit="1">
                            <span class="btn">上传</span>
                            <span v-if="file5.filePath" class="dl" @click.stop="downloadFile2(file5.filePath)">下载</span>
                        </el-upload>
                        <!-- 文件5列表展示 -->
                        <div class="custom-file-item" v-show="file5.filePath">
                            <i class="el-icon-document" style="color: #436dff;font-size: 18px;margin-right: 5px"></i>
                            <span class="file-name">{{ file5.fileName }}</span>
                            <i class="el-icon-error"
                                style="color: #ccd3e5;font-size: 18px;cursor: pointer;margin-left: 5px"
                                @click="removeFile(5)"></i>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <el-button type="primary" class="btn" @click="submitZhaDaForm('userZhaDaApplyInfo')"
                        name="personNextStep">确认</el-button>
                    <el-button type="primary" class="btn" @click="upLoadMore" name="personNextStep">下载</el-button>

                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { updateUsdApplicationInfo, chooseTag } from '../../../api/index';
import { getZhaDaApplyMsg, updateZhaDaApplyMsg, approvalInfoCmc } from '@/api/boss1';
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
        usdApplicationInfo: {
            type: Object,
            default: function () {
                return {};
            }
        },
        reEditBank: {
            type: Boolean,
            default: false
        },
        // additionalInformation: {
        //     type: Array,
        //     default: ''
        // },
        receiptInfo: {
            type: Array,
            default: ''
        }
    },
    data() {
        return {
            additionalInformation: {
                controllerCreditReport: "https://example.com/files/controller_credit_report_2023.pdf",
                controllerCreditReportStatus: "SUCCESS",
                controllerCreditReportResult: "https://example.com/results/controller_credit_result.json",

                enterpriseCreditReport: "https://example.com/files/enterprise_credit_report_2023.pdf",
                enterpriseCreditReportStatus: "FAILED",
                enterpriseCreditReportResult: null,

                enterpriseAuditReport: "https://example.com/files/enterprise_audit_report_2022.pdf",
                enterpriseAuditReportStatus: "PARSING",
                enterpriseAuditReportResult: null,

                additionalMaterialsList: [
                    "https://example.com/files/additional_material1.pdf",
                    "https://example.com/files/additional_material2.docx"
                ]
            },
            receiptInfo: {
                receiptVoucher: "https://example.com/files/payment_receipt.jpg",
                receiptVoucherDate: "2023-05-15 14:30:22"
            },

            //授权材料
            fileList1: [],
            file1: {},
            fileList2: [],
            file2: {},
            fileList3: [],
            file3: {},
            // 贷款材料
            fileList4: [],
            file4: {},
            fileList5: [],
            file5: {},
            baseUrl2:
                process.env.VUE_APP_URL + '/dowsure-file/' + 'file-upload/upload/file',
            showZhada: null,
            userZhaDaApplyInfo: {},
            chooseOptions: [
                {
                    value: 'DM_1',
                    label: '大卖-AmazonSC'
                },
                {
                    value: 'DM_2',
                    label: '大卖-AmazonVC'
                },
                {
                    value: 'DM_3',
                    label: '大卖-本土'
                },
                {
                    value: 'DM_4',
                    label: '大卖-多平台'
                }
            ],
            tagText: [],
            showTag: false,
            showPage: false,
            nowDirectorIndex: 0,
            bindInfoShow: true,
            time: 60,
            timer: '',
            //成功弹窗
            successDialog: false,
            isShowAgreemnt: false,
            isShow: true,
            availableAmount: 0,
            normalShopCount: 0,
            dailyInterestByThousand: '0',
            interestRate: '0',
            interestRateDiscounts: '',
            isHiddenRed: true,
            select: '+86',
            active: 1,
            loadingPersonalInfo: false,
            loadingA: false,
            loadingB: false,
            loadingC: false,
            loadingD: false,
            loadingE: false,
            loadingF: false,
            loadingG: false,
            uploadUrl: `${process.env.VUE_APP_BOSS_MODULE}/dowsure-file/file-upload/upload/file`,
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            myHeaders: {
                token: '',
                'Accept-Language': 'en'
            },
            fit: 'cover',
            userApplyInfo: {
                lenderId: 15,
                subjectType: 'COMPANY', //个人还是企业申请，PERSONAL：个人。COMPANY：企业
                directorHkCardFrontPath: '', //身份证正面照片
                directorHkCardBackPath: '', //身份证反面照片
                certificateIncorporation: '', //营业执照图片
                businessRegistrationCertificate: '', //商业登记证
                memorandumAssociation: '', //公司章程
                annualReturns: '', //年报
                shareholdingStructure: '', //股权结构

                directorHk: '', // 证件姓名
                directorHkIdCard: '', // 证件号码
                bcNameHk: '', //香港企业名称
                actualController: '', //实控人姓名
                actualControllerIdCard: '', //实控人身份证号码
                actualControllerAddress: '', //实控人居住地址
                actualControllerPhoneAreaCode: '86', //实控人手机号码所在地区的区号
                actualControllerPhone: '', //实控人电话号码
                actualControllerEmail: '', //实控人邮箱
                certificateIncorporationNo: '', // 香港企业注册证书编号，
                accountName: '', //账户姓名
                bankNo: '', //银行账户号码
                bankName: '', //银行名称
                swiftCode: '', //swiftCode
                bcAddressHk: '', //香港公司注册地址
                certificateNoHk: '', //商业登记证号码
                domesticBusinessEntity: '' //国内企业名称
            },
            directors: [
                {
                    directorCardFrontPath: '', //董事正面照片路径
                    directorCardBackPath: '' //董事反面照片路径
                }
            ],

            rules: {},
            bankForm: {
                name: '',
                bankNo: '',
                bankName: ''
            },
            bankStr: '',
            bankLoading: false,
            dialogFormVisible: false,
            nowItem: {},
            areaCodeArr: [],
            fileSize: 5,
            tempDate: '',
            province: '',
            sfLegalPersonName: '',
            fileType: ['jpg', 'jpeg', 'png', 'bmp'],
            dialogImageUrl: '',
            dialogVisible: false,
            uploadParams: {
                isCompress: 'N'
            },


            //----------------------------渣打--------------------------
            nowDirectorIndex1: 0,
            zhaDaDirectors1: [
                {
                    directorCardFrontPath: '', //申请人正面照片路径
                    guarantorCardBackPath: '' //申请人反面照片路径
                }
            ],
            zhaDaDirectors2: [
                {
                    guarantorCardFrontPath: '', //担保人正面照片路径
                    directorCardBackPath: '' //担保人反面照片路径
                }
            ],
            zhaDaDirectors3: [
                {
                    applicantPassport: '', //申请人护照路径
                    guarantorPassport: '' //担保人护照路径
                }
            ],
            loadingA1: false,
            loadingA2: false,
            loadingA3: false,
            loadingB1: false,
            loadingB2: false,
            loadingB3: false,
            loadingC1: false,
            loadingD1: false,
            loadingE1: false,
            loadingF1: false,
            loadingG1: false,
            cmcInfoObj: {}
        };
    },
    methods: {
        getApprovalInfoCmc() {
            const params = {
                applicationCode: this.$route.query.loanNumber,
            }
            approvalInfoCmc(params).then(res => {
                this.cmcInfoObj = res.data || {}
            })
        },
        downloadFile2(fileUrl) {
            let baseUrl = process.env.VUE_APP_URL + '/dowsure-file/'
            fileUrl = baseUrl + fileUrl
            // 获取文件扩展名
            const fileExtension = fileUrl.split('.').pop().toLowerCase()

            // 支持的文件类型
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']
            const zipExtensions = ['zip', 'rar', 'pdf', 'doc', 'docx']

            // 检查文件类型并生成下载链接
            if (
                imageExtensions.includes(fileExtension) ||
                zipExtensions.includes(fileExtension)
            ) {
                const link = document.createElement('a')
                link.href = fileUrl
                link.target = '_blank'
                // 动态设置文件名，若后端不提供文件名，可以自定义
                if (zipExtensions.includes(fileExtension)) {
                    link.download = 'archive.' + fileExtension // 默认压缩包下载名
                } else {
                    link.download = 'image.' + fileExtension // 默认图片下载名
                }

                // 触发下载
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } else {
                // 如果文件类型不支持
                this.$message({
                    type: 'warning',
                    message: '不支持的文件类型下载!',
                })
            }
        },
        upLoadMore() {
            var axios = require('axios');
            var data = JSON.stringify({});
            const token = localStorage.getItem('token');
            var config = {
                method: 'get',
                url: `${process.env.VUE_APP_BASE_URL}/lending/application/downloadZipByApplicationCode?applicationCode=${this.$route.query.loanNumber}`,
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob',
                data: data
            };
            axios(config)
                .then(function (blob) {
                    console.log(blob);
                    const url = window.URL.createObjectURL(blob.data);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = '渣打材料.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // upLoadZhaDa({applicationCode:this.$route.query.loanNumber})
            //     .then(blob=>{
            //         const url = window.URL.createObjectURL(blob); // 创建对象 URL
            //         const a = document.createElement('a');
            //         a.href = url; // 设置 a 标签的 href 属性为对象 URL
            //         a.download = 'example.zip'; // 设置下载文件的文件名
            //         a.click(); // 触发点击事件，开始下载
            //         window.URL.revokeObjectURL(url); // 释放对象 URL
            // })
        },
        removeFile(index) {
            switch (index) {
                case 1:
                    this.file1 = {};
                    this.fileList1 = []
                    break;
                case 2:
                    this.file2 = {};
                    this.fileList2 = []
                    break;
                case 3:
                    this.file3 = {};
                    this.fileList3 = []
                    break;
                case 4:
                    this.file4 = {};
                    this.fileList4 = []
                    break;
                case 5:
                    this.file5 = {};
                    this.fileList5 = []
                    break;
                default:
                    break;
            }
        },
        fileList1Success(file, fileList) {
            this.$message.success('上传成功！')
            this.file1 = fileList.response.data
            console.log(this.file1)
        },
        fileList2Success(file, fileList) {
            this.$message.success('上传成功！')
            this.file2 = fileList.response.data
        },
        fileList3Success(file, fileList) {
            this.$message.success('上传成功！')
            this.file3 = fileList.response.data
        },
        fileList4Success(file, fileList) {
            this.$message.success('上传成功！')
            this.file4 = fileList.response.data
        },
        fileList5Success(file, fileList) {
            this.$message.success('上传成功！')
            this.file5 = fileList.response.data
        },
        getZhaDaList() {
            const params = {
                applicationCode: this.$route.query.loanNumber,
            }
            getZhaDaApplyMsg(params).then(res => {
                this.userZhaDaApplyInfo = res.data;
                this.zhaDaDirectors3[0].applicantPassport = this.userZhaDaApplyInfo.applicantPassport
                this.zhaDaDirectors3[0].guarantorPassport = this.userZhaDaApplyInfo.guarantorPassport
                this.zhaDaDirectors1[0].directorCardFrontPath = this.userZhaDaApplyInfo.directors[0].directorCardFrontPath
                this.zhaDaDirectors1[0].directorCardBackPath = this.userZhaDaApplyInfo.directors[0].directorCardBackPath
                this.zhaDaDirectors2[0].guarantorCardFrontPath = res.data.guarantorCardFrontPath
                this.zhaDaDirectors2[0].guarantorCardBackPath = res.data.guarantorCardBackPath
                this.file1.filePath = this.userZhaDaApplyInfo.reverseInquiryForm;
                this.file1.fileName = "反向问询书"
                this.file2.filePath = this.userZhaDaApplyInfo.dataCollectionConsent;
                this.file2.fileName = "数据采集同意书"
                this.file3.filePath = this.userZhaDaApplyInfo.bankServiceReferralConfirmation;
                this.file3.fileName = "银行服务转介确认书"
                this.file4.filePath = this.userZhaDaApplyInfo.loanApplicationForm;
                this.file4.fileName = "贷款申请表"
                this.file5.filePath = this.userZhaDaApplyInfo.boardMeetingMinutesSummary;
                this.file5.fileName = "董事会决议"
                // 深拷贝
                const newUserInfo = JSON.parse(JSON.stringify(this.userZhaDaApplyInfo));
                newUserInfo.directorPhone = newUserInfo.directors[0].directorPhone;
                newUserInfo.directorFirstName = newUserInfo.directors[0].directorFirstName;
                newUserInfo.directorLastName = newUserInfo.directors[0].directorLastName;
                newUserInfo.directorEmail = newUserInfo.directors[0].directorEmail;
                newUserInfo.directorPhone = newUserInfo.directors[0].directorPhone;
                newUserInfo.directorPhoneAreaCode = newUserInfo.directors[0].directorPhoneAreaCode;
                this.userZhaDaApplyInfo = newUserInfo;
            })
        },
        getFileName(url) {
            // 使用正则表达式提取 URL 中的文件名
            const match = url.match(/\/([^/]+)$/);
            return match ? match[1] : '未知文件名';
        },
        //取消选择大卖标签
        closeTag() {
            this.tagText = [];
            this.showTag = false;
        },
        //确定大卖标签
        ensureTag() {
            chooseTag({
                type: this.tagText.join(','),
                applicationCode: this.$route.query.loanNumber
            }).then((res) => {
                this.$message.success('标签选择成功');
                this.tagText = [];
                this.showTag = false;
            });
        },
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
        deleteImage(path) {
            // 删除图片逻辑
            this.$confirm('确定要删除该图片吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    _.set(this, path, '');
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
        addDirector() {
            this.directors.push({
                directorCardFrontPath: '', //董事正面照片路径
                directorCardBackPath: '' //董事反面照片路径
            });
        },
        _downLoad() {
            this.$export(`/application/zip/export?type=USD&applicationCode=${this.$route.query.loanNumber}`, '', 'zip');
        },
        save() { },
        async submitCompanyForm(formName) {
            let noHaveFront = false;
            let noHaveBack = false;
            this.directors.forEach((item, index) => {
                if (!item.directorCardFrontPath) {
                    noHaveFront = true;
                }
                if (!item.directorCardBackPath) {
                    noHaveBack = true;
                }
            });

            this.userApplyInfo.directorHkCardFrontPath = this.directors[0].directorCardFrontPath;
            this.userApplyInfo.directorHkCardBackPath = this.directors[0].directorCardBackPath;
            this.userApplyInfo.directors = this.directors;
            this.userApplyInfo.applicationCode = this.$route.query.loanNumber;
            this.userApplyInfo.subjectType = 'COMPANY';
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingPersonalInfo = true;
                    // 去掉对象属性值中的空格
                    for (let key in this.userApplyInfo) {
                        if (typeof this.userApplyInfo[key] === 'string') {
                            this.userApplyInfo[key] = this.userApplyInfo[key].trim();
                        }
                    }
                    this.userApplyInfo.type = 'HK';
                    updateUsdApplicationInfo(this.userApplyInfo)
                        .then((res) => {
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
        },
        async submitZhaDaForm(formName) {
            let noHaveFront = false;
            let noHaveBack = false;
            let noHaveFront1 = false;
            let noHaveBack1 = false;
            this.zhaDaDirectors1.forEach((item, index) => {
                if (!item.directorCardFrontPath) {
                    noHaveFront = true;
                }
                if (!item.directorCardBackPath) {
                    noHaveBack = true;
                }
            });
            this.zhaDaDirectors2.forEach((item, index) => {
                if (!item.guarantorCardFrontPath) {
                    noHaveFront1 = true;
                }
                if (!item.guarantorCardBackPath) {
                    noHaveBack1 = true;
                }
            });
            this.userZhaDaApplyInfo.reverseInquiryForm = this.file1.filePath
            this.userZhaDaApplyInfo.dataCollectionConsent = this.file2.filePath
            this.userZhaDaApplyInfo.bankServiceReferralConfirmation = this.file3.filePath
            this.userZhaDaApplyInfo.loanApplicationForm = this.file4.filePath
            this.userZhaDaApplyInfo.boardMeetingMinutesSummary = this.file5.filePath

            this.userApplyInfo.directorName = this.userApplyInfo.directorLastName + ' ' + this.userApplyInfo.directorFirstName
            this.userApplyInfo.guarantorCardFrontPath =
                this.zhaDaDirectors2[0].guarantorCardFrontPath
            this.userApplyInfo.guarantorCardBackPath =
                this.zhaDaDirectors2[0].guarantorCardBackPath
            this.userApplyInfo.directors = this.zhaDaDirectors1
            this.userApplyInfo.applicantPassport =
                this.zhaDaDirectors3[0].applicantPassport
            this.userApplyInfo.guarantorPassport =
                this.zhaDaDirectors3[0].guarantorPassport
            this.userZhaDaApplyInfo.directors[0].directorFirstName = this.userZhaDaApplyInfo.directorFirstName
            this.userZhaDaApplyInfo.directors[0].directorLastName = this.userZhaDaApplyInfo.directorLastName
            this.userZhaDaApplyInfo.directors[0].directorName = this.userZhaDaApplyInfo.directorLastName + this.userApplyInfo.directorFirstName
            this.userZhaDaApplyInfo.directors[0].directorPhoneAreaCode = this.userZhaDaApplyInfo.directorPhoneAreaCode
            this.userZhaDaApplyInfo.directors[0].directorEmail = this.userZhaDaApplyInfo.directorEmail
            this.userZhaDaApplyInfo.directors[0].directorPhone = this.userZhaDaApplyInfo.directorPhone
            this.userZhaDaApplyInfo.applicationCode = this.$route.query.loanNumber;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingPersonalInfo = true;
                    // 去掉对象属性值中的空格
                    // for (let key in this.userZhaDaApplyInfo) {
                    //     if (typeof this.userZhaDaApplyInfo[key] === 'string') {
                    //         this.userZhaDaApplyInfo[key] = this.userZhaDaApplyInfo[key].trim();
                    //     }
                    // }
                    // this.userZhaDaApplyInfo.type = 'HK';
                    // 修改接口
                    const { directorPhone, directorEmail, directorLastName, directorFirstName, directorPhoneAreaCode, directorName, ...rest } = this.userZhaDaApplyInfo;
                    updateZhaDaApplyMsg(rest)
                        .then((res) => {
                            this.loadingPersonalInfo = false;
                            this.$message.success('操作成功');
                            this.getZhaDaList()
                        })
                        .catch((err) => {
                            this.loadingPersonalInfo = false;
                            this.$message.error(err.message);
                        });
                } else {
                    return false;
                }
            });
        },
        setNowDirectorIndex(index) {
            this.nowDirectorIndex = index;
        },
        setNowDirectorIndex1(index) {
            this.nowDirectorIndex1 = index;
        },
        removeDirector(index) {
            this.directors.splice(index, 1);
        },
        beforeAvatarUploadA() {
            this.loadingA = true;
        },
        beforeAvatarUploadA1() {
            this.loadingA1 = true;
        },
        beforeAvatarUploadA2() {
            this.loadingA2 = true;
        },
        beforeAvatarUploadA3() {
            this.loadingA3 = true;
        },
        beforeAvatarUploadB() {
            this.loadingB = true;
        },
        beforeAvatarUploadB2() {
            this.loadingB2 = true;
        },
        beforeAvatarUploadB3() {
            this.loadingB3 = true;
        },
        beforeAvatarUploadB1() {
            this.loadingB1 = true;
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
        beforeAvatarUploadC1(file) {
            this.loadingC1 = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingC1 = false;
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
        beforeAvatarUploadD1(file) {
            this.loadingD1 = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingD1 = false;
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
        beforeAvatarUploadE1(file) {
            this.loadingE1 = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingE1 = false;
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
        beforeAvatarUploadF1(file) {
            this.loadingF1 = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingF1 = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        beforeAvatarUploadG(file) {
            this.loadingG = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingG = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        beforeAvatarUploadG1(file) {
            this.loadingG1 = true;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.loadingG1 = false;
                this.$message.error('文件大小不能超过50MB，请更换文件后重新上传。');
            }
            return isLt50M;
        },
        handleAvatarSuccessA(res, file) {
            if (res.code === 200 && res.data) {
                this.directors[this.nowDirectorIndex].directorCardFrontPath = res.data.filePath;
                this.loadingA = false;
            } else {
                this.loadingA = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessA1(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors1[this.nowDirectorIndex1].directorCardFrontPath = res.data.filePath;
                this.loadingA1 = false;
            } else {
                this.loadingA1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessA2(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors2[this.nowDirectorIndex1].guarantorCardFrontPath = res.data.filePath;
                this.loadingA2 = false;
            } else {
                this.loadingA2 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessA3(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors3[this.nowDirectorIndex1].applicantPassport = res.data.filePath;
                this.loadingA3 = false;
            } else {
                this.loadingA3 = false;
                this.$message.error(res.message);
            }
        },

        handleAvatarSuccessB(res, file) {
            if (res.code === 200 && res.data) {
                this.directors[this.nowDirectorIndex].directorCardBackPath = res.data.filePath;
                this.loadingB = false;
            } else {
                this.loadingB = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessB1(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors1[this.nowDirectorIndex1].directorCardBackPath = res.data.filePath;
                this.loadingB1 = false;
            } else {
                this.loadingB1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessB2(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors2[this.nowDirectorIndex1].guarantorCardBackPath = res.data.filePath;
                this.loadingB2 = false;
            } else {
                this.loadingB2 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessB3(res, file) {
            if (res.code === 200 && res.data) {
                this.zhaDaDirectors3[this.nowDirectorIndex1].guarantorPassport = res.data.filePath;
                this.loadingB3 = false;
            } else {
                this.loadingB3 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessC(res, file) {
            if (res.code === 200 && res.data) {
                this.userApplyInfo.certificateIncorporation = res.data.filePath;
                this.loadingC = false;
            } else {
                this.loadingC = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessC1(res, file) {
            if (res.code === 200 && res.data) {
                this.userZhaDaApplyInfo.certificateIncorporation = res.data.filePath;
                console.log(this.userZhaDaApplyInfo.certificateIncorporation);
                this.loadingC1 = false;
            } else {
                this.loadingC1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessD1(res, file) {
            if (res.code === 200 && res.data) {
                this.userZhaDaApplyInfo.businessRegistrationCertificate = res.data.filePath;
                this.loadingD1 = false;
            } else {
                this.loadingD1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessD(res, file) {
            if (res.code === 200 && res.data) {
                this.userApplyInfo.businessRegistrationCertificate = res.data.filePath;
                this.loadingD = false;
            } else {
                this.loadingD = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessE(res, file) {
            if (res.code === 200 && res.data) {
                this.userApplyInfo.memorandumAssociation = res.data.filePath;
                this.loadingE = false;
            } else {
                this.loadingE = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessE1(res, file) {
            if (res.code === 200 && res.data) {
                this.userZhaDaApplyInfo.memorandumAssociation = res.data.filePath;
                this.loadingE1 = false;
            } else {
                this.loadingE1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessF(res, file) {
            if (res.code === 200 && res.data) {
                this.userApplyInfo.annualReturns = res.data.filePath;
                this.loadingF = false;
            } else {
                this.loadingF = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessF1(res, file) {
            if (res.code === 200 && res.data) {
                this.userZhaDaApplyInfo.annualReturns = res.data.filePath;
                this.loadingF1 = false;
            } else {
                this.loadingF1 = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessG(res, file) {
            if (res.code === 200 && res.data) {
                this.userApplyInfo.shareholdingStructure = res.data.filePath;
                this.loadingG = false;
            } else {
                this.loadingG = false;
                this.$message.error(res.message);
            }
        },
        handleAvatarSuccessG1(res, file) {
            if (res.code === 200 && res.data) {
                this.userZhaDaApplyInfo.shareholdingStructure = res.data.filePath;
                this.loadingG1 = false;
            } else {
                this.loadingG1 = false;
                this.$message.error(res.message);
            }
        }
    },
    created() {
        if (this.$route.query.lenderId == '73') {
            this.showZhada = true
            this.getZhaDaList()
        }
        if (this.$route.query.lenderId == '74') {
            this.getApprovalInfoCmc()
        }

    },

    watch: {
        pageInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.showPage = true;
            }
        },
        usdApplicationInfo: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.userApplyInfo = JSON.parse(JSON.stringify(newV));
                if (this.usdApplicationInfo.directors.length > 0) {
                    this.directors = this.usdApplicationInfo.directors;
                }
            }
        }
    }
};
</script>
<style scoped lang="scss">
.el-upload-list__item-name {
    display: none;
}

.fileList {
    display: flex;
    margin-left: 50px;
    margin-top: 30px;

    .dl {
        margin-left: 20px;
        margin-right: 20px;
    }
}

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
    gap: 10px;
    /* 增加按钮间距 */
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
<style scoped lang="scss">
.btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
}

.box-card {
    width: 80%;
    margin: 0 auto;
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

.box-card .el-upload--text {
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

.hsbc-info-box {
    background: #fff;
    padding: 30px;
}

.hsbc-info-box .el-upload--text {
    height: auto;
    width: auto;
    border: none;
}

.file_card {
    width: 90%;
    height: 350px;
    margin: 0 auto;
    border: 1px solid #dcdfe6;

    ::v-deep .el-upload-list {
        display: none;
    }
}

::v-deep .el-select {
    width: 100%;
}
</style>
