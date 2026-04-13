<template>
    <div class='parent'>
        <el-card class='card' shadow='hover'>
            <template #header>
                <span>品牌信息</span>
            </template>
            <el-form label-width='180px' label-position='right' inline>
                <el-form-item label='服务商类型：'>
                    <TipSpan
                        :textValue='providerInfoData.serviceType' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='品牌名称：'>
                    <TipSpan
                        :textValue='providerInfoData.brandName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='服务简介：'>
                    <TipSpan
                        :textValue='providerInfoData.serviceProfile' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='网站链接：'>
                    <TipSpan
                        :textValue='providerInfoData.websiteLink'
                        spanType='link' :hrefUrl='providerInfoData.websiteLink' class='text'></TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='card' shadow='hover' v-if='providerInfoData.enterpriseType === "大陆企业"'>
            <template #header>
                <span>大陆企业信息</span>
            </template>
            <el-form label-width='180px' label-position='right' inline>
                <el-form-item label='企业类型：'>
                    <TipSpan
                        :textValue='providerInfoData.enterpriseType' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='企业名称：'>
                    <TipSpan
                        :textValue='providerInfoData.enterpriseName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='社会统一信用代码：'>
                    <TipSpan
                        :textValue='providerInfoData.businessLicenseNumber' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='营业执照：'>
                    <TipSpan
                        textValue='营业执照'
                        spanType='link' :hrefUrl='fileBaseUrl + providerInfoData.businessLicensePath' class='text'></TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='card' shadow='hover' v-if='providerInfoData.enterpriseType === "香港企业"'>
            <template #header>
                <span>香港企业信息</span>
            </template>
            <el-form label-width='180px' label-position='right' inline>
                <el-form-item label='企业名称：'>
                    <TipSpan
                        :textValue='providerInfoData.enterpriseName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='商业登记证：'>
                    <TipSpan spanType='link' :hrefUrl='fileBaseUrl + providerInfoData.businessRegistrationCertificate' class='text'
                        textValue='商业登记证'>
                    </TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='card' shadow='hover' v-if='providerInfoData.enterpriseType === "香港企业"'>
            <template #header>
                <span>香港收款银行账户</span>
            </template>
            <el-form label-width='180px' label-position='right' inline>
                <el-form-item label='银行所在地区：'>
                    <TipSpan
                        :textValue='providerInfoData.bankArea' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='币种：'>
                    <TipSpan
                        :textValue='providerInfoData.currency' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='收款银行名称：'>
                    <TipSpan
                        :textValue='providerInfoData.bankName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='收款银行地址：'>
                    <TipSpan
                        :textValue='providerInfoData.bankAddress' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='收款人名称：'>
                    <TipSpan :textValue='providerInfoData.accountName' class='text'></TipSpan>
                </el-form-item>
                <el-form-item label='收款人银行账号：'>
                    <TipSpan :textValue='providerInfoData.accountNo' class='text'></TipSpan>
                </el-form-item>
                <el-form-item label='SWIFT编号：'>
                    <TipSpan :textValue='providerInfoData.swiftCode' class='text'></TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='card' shadow='hover' v-if='providerInfoData.enterpriseType === "大陆企业"'>
            <template #header>
                <span>大陆收款银行账户</span>
            </template>
            <el-form label-width='180px' label-position='right' inline>
                <el-form-item label='开户银行：'>
                    <TipSpan
                        :textValue='providerInfoData.bankName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='支行名称：'>
                    <TipSpan
                        :textValue='providerInfoData.bankBranchName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='账户名称：'>
                    <TipSpan
                        :textValue='providerInfoData.accountName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='开户许可证：'>
                    <TipSpan
                        textValue='开户许可证'
                        spanType='link' :hrefUrl='fileBaseUrl + providerInfoData.accountOpeningPermit' class='text'></TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='card' shadow='hover' style='margin-bottom: 40px'>
            <template #header>
                <span>联系人</span>
            </template>
            <el-form label-width='180px' :label-position='labelPosition' inline>
                <el-form-item label='联系人姓名：'>
                    <TipSpan
                        :textValue='providerInfoData.contactName' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='联系人职位：'>
                    <TipSpan
                        :textValue='providerInfoData.contactPosition' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='联系人电话：'>
                    <TipSpan
                        :textValue='providerInfoData.contactPhone' class='text'>
                    </TipSpan>
                </el-form-item>
                <el-form-item label='联系人邮箱：'>
                    <TipSpan
                        :textValue='providerInfoData.contactEmail' class='text'>
                    </TipSpan>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import TipSpan from '@/components/common/TipSpan';

export default {
    name: 'provider-info',
    components: {
        TipSpan
    },
    props:{
        providerInfoData: {
            type: Object,
            immediate: true
        }
    },
    data() {
        return {
            labelPosition: 'right',
            fileBaseUrl: process.env.VUE_APP_IMGS_BASE_URL
        };
    }
};
</script>

<style scoped lang='less'>
.text {
    width: 330px !important;
    padding-left: 15px;
}

.card {
    margin-top: 24px;
    //padding: 0 15px;
}

.item {
    width: 430px;
}

.form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form:after {
    content: "";
    flex: 1;
}
</style>