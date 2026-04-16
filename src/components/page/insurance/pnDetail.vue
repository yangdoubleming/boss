<template>
    <div class="guaranteeDetail">
        <div style="display: flex; justify-content: space-between; padding-bottom: 10px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
                订单管理 /
                <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">订单详情</span>
            </div>

            <div><i class="el-icon-close" @click="prove"></i></div>
        </div>

        <div class="top">
            <div class="left" style="line-height: 40px">
                订单编号
                <span style="margin: 0 15px; color: #409EFF">{{ key }}</span>
                保费<span style="margin: 0 15px; color: #409EFF">{{ detailData.totalPremium ? detailData.totalPremium : 0
                    }} 元</span>
                <!-- <el-button >{{ detailData.policyStatus }}</el-button> -->

                <el-button v-if="detailData.policyStatus == '已付款'" class="green">{{ detailData.policyStatus }}
                </el-button>
                <el-button v-if="detailData.policyStatus == '已生效'" class="green">{{ detailData.policyStatus }}
                </el-button>
                <el-button v-if="detailData.policyStatus == '待审核'" class="orange">{{ detailData.policyStatus }}
                </el-button>
                <el-button v-if="detailData.policyStatus == '待付款'" class="orange">{{ detailData.policyStatus }}
                </el-button>
                <el-button v-if="detailData.policyStatus == '已过期'" class="gray">{{ detailData.policyStatus }}
                </el-button>
                <el-button v-if="detailData.policyStatus == '拒保'" class="gray">{{ detailData.policyStatus }}</el-button>
                <el-button v-if="detailData.policyStatus == '退保'" class="gray">{{ detailData.policyStatus }}</el-button>
                <el-button v-if="detailData.policyStatus == '订单取消'" class="gray">{{ detailData.policyStatus }}
                </el-button>

                <!-- <el-button @click="dowLoadFile">下载投保资料</el-button> -->
                <el-button @click="people" style="border: 1px solid #409EFF; color: #409EFF; padding: 10px 20px"
                    v-if="lineShow">人工批改</el-button>
            </div>
            <div class="right">
                <el-button @click="certificate" style="border: 2px solid #409EFF; font-weight: 700">保险凭证</el-button>
                <el-button @click="ChinesePolicy">中文保单</el-button>
            </div>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#fff"
            text-color="#000" active-text-color="#409EFF">
            <el-menu-item index="1">{{ $t('loan_detail_gl') }}</el-menu-item>
        </el-menu>
        <div class="contentC">
            <div class="left">
                <div class="info" style="height: 250px">
                    <div class="title">保单信息</div>
                    <el-row>
                        <el-col :span="12">
                            <div class="a">保单号</div>
                            <div class="p" style="color: #409EFF">
                                {{ detailData.policyNumber ? detailData.policyNumber : '-' }}
                            </div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">保单状态</div>
                            <div class="p">{{ detailData.policyStatus }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="a">产品</div>
                            <div class="p" style="
                                    background-color: #e7f7ff;
                                    border: 1px solid #198ffe;
                                    color: #198ffe;
                                    padding: 2px 17px;
                                    margin-right: 20px;
                                    border-radius: 3px;
                                    font-size: 14px;
                                ">
                                商业综合责任险
                            </div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">承保公司</div>
                            <div class="p" style="height: 24px" v-if="zhongLogoShow">
                                <img :src="zhongLogo" alt="" style="width: 30%; margin-left: 30px" />
                            </div>
                            <div class="p" style="height: 24px; margin-top: -5px" v-else>
                                <img :src="insuranceCompany" alt="" style="width: 70%" />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="a">保费</div>
                            <div class="p" style="color: #409EFF">{{ detailData.totalPremium ? detailData.totalPremium :
                0 }}{{ $t('common_yuan2') }}</div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">保额</div>
                            <div class="p">{{ detailData.insuredAmount ? detailData.insuredAmount : '-' }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="a">生效时间</div>
                            <div class="p">{{ detailData.dateStart }}</div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">到期时间</div>
                            <div class="p">{{ detailData.dateEnd }}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="info" style="height: 770px">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="投保人信息" name="first">
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">公司名(中文)</div>
                                    <div class="p">
                                        {{ detailData.phName }}
                                    </div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">公司名(英文)</div>
                                    <div class="p">{{ detailData.phEName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">证件类型</div>
                                    <div class="p">{{ detailData.phIdNoType }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">证件号码</div>
                                    <div class="p">{{ detailData.phIdNo }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">所在地区</div>
                                    <div class="p">{{ detailData.phProvince }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">注册地址</div>
                                    <div class="p" style="width: 275px">
                                        {{ detailData.phAddr }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22">
                                    <div class="w">注册地址（英文）</div>
                                    <div class="p">{{ detailData.phAddrEn }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">联系人姓名</div>
                                    <div class="p">{{ detailData.contactName }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">联系人手机号</div>
                                    <div class="p">{{ detailData.contactTel }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">联系人邮箱</div>
                                    <div class="p">{{ detailData.contactMail }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20">
                                    <div class="w">营业执照/身份证</div>
                                    <a :href="imgUrl1" v-if="imgUrl1" style="margin-right: 30px" target="_blank">
                                        <img :src="imgUrl1" alt="" style="width: 200px; height: 145px" /></a>
                                    <a :href="imgUrl2" v-if="imgUrl2" style="margin-right: 30px" target="_blank">
                                        <img :src="imgUrl2" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                    <a :href="imgUrl3" v-if="imgUrl3" target="_blank">
                                        <img :src="imgUrl3" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20">
                                    <div class="w">税务信息截图</div>
                                    <a :href="imgUrl7" v-if="imgUrl7" target="_blank">
                                        <img :src="imgUrl7" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                </el-col>
                            </el-row>
                            <el-row v-if="phIsZhiJian">
                                <el-col :span="20">
                                    <div class="w">产品质检报告</div>
                                    <a :href="imgUrl9" v-if="imgUrl9" target="_blank" style="color: red">
                                        <!-- <img :src="imgUrl9" alt="" style="width: 200px; height: 145px" /> -->
                                        产品质检
                                    </a>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="被保人信息" name="second">
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">公司名(中文)</div>
                                    <div class="p">
                                        {{ detailData.insuredName }}
                                    </div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">公司名(英文)</div>
                                    <div class="p">{{ detailData.insuredEName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">证件类型</div>
                                    <div class="p">{{ detailData.insuredIdNoType }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">证件号码</div>
                                    <div class="p">{{ detailData.insuredIdNo }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">所在地区</div>
                                    <div class="p">{{ detailData.insuredProvince }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">注册地址</div>
                                    <div class="p" style="width: 275px">
                                        {{ detailData.insuredAddr }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22">
                                    <div class="w">注册地址（英文）</div>
                                    <div class="p" style="width: 275px">
                                        {{ detailData.insuredAddrEn }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">被保联系人姓名</div>
                                    <div class="p">{{ detailData.insContactName }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">被保联系人手机号</div>
                                    <div class="p">{{ detailData.insContactPhoneNumber }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">被保联系人邮箱</div>
                                    <div class="p">{{ detailData.insContactEmail }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20">
                                    <div class="w">营业执照/身份证</div>
                                    <a :href="imgUrl4" v-if="imgUrl4" style="margin-right: 30px" target="_blank">
                                        <img :src="imgUrl4" alt="" style="width: 200px; height: 145px" /></a>
                                    <a :href="imgUrl5" v-if="imgUrl5" style="margin-right: 30px" target="_blank">
                                        <img :src="imgUrl5" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                    <a :href="imgUrl6" v-if="imgUrl6" target="_blank">
                                        <img :src="imgUrl6" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20">
                                    <div class="w">税务信息截图</div>
                                    <a :href="imgUrl8" v-if="imgUrl8" target="_blank">
                                        <img :src="imgUrl8" alt="" style="width: 200px; height: 145px" />
                                    </a>
                                </el-col>
                            </el-row>
                            <el-row v-if="inIsZhiJian">
                                <el-col :span="20">
                                    <div class="w">产品质检报告</div>
                                    <a :href="imgUrl10" v-if="imgUrl10" target="_blank" style="color: red">
                                        <!-- <img :src="imgUrl10" alt="" style="width: 200px; height: 145px" /> -->
                                        产品质检
                                    </a>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="附加被保险人" name="three">
                            <!-- <el-row>
                                <el-col :span="16">
                                    <div class="w">企业名称</div>
                                    <div class="p">
                                        {{ detailData.entName }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">企业地址</div>
                                    <div class="p">{{ detailData.entAddress }}</div>
                                </el-col>
                            </el-row> -->
                            <el-row style="white-space: pre-wrap; line-height: 30px"> {{ detailData.entName }} </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="right">
                <div class="scope" style="height: 90px">
                    <div class="title" style="margin-bottom: 30px">保障范围</div>
                    <div style="text-align: center">
                        <el-button>商品故障</el-button>
                        <el-button>卖家赔偿</el-button>
                    </div>
                </div>
                <div class="shop scope" style="height: 290px">
                    <div class="title" style="margin-bottom: 30px">被保店铺</div>
                    <el-row>
                        <span>平台</span>
                        <span class="p">{{ detailData.platform }}</span>
                    </el-row>
                    <el-row>
                        <span>店铺</span>
                        <span class="p">{{ detailData.insuredStoreName }}</span>
                    </el-row>
                    <el-row>
                        <span>卖家记号</span>
                        <span class="p">{{ detailData.insuredStoreId }}</span>
                    </el-row>
                    <el-row>
                        <span>销售范围</span>
                        <span class="p">{{ detailData.salesScope }}</span>
                    </el-row>
                    <el-row>
                        <span>司法管辖</span>
                        <span class="p">{{ detailData.jurisdiction }}</span>
                    </el-row>
                </div>
                <div class="shop scope" style="height: 440px">
                    <div class="title" style="margin-bottom: 30px">被保产品</div>
                    <el-row>
                        <span>产品名称</span>
                        <span class="p">{{ detailData.productName }}</span>
                    </el-row>
                    <el-row>
                        <span>产品认证</span>
                        <span class="p">{{ detailData.productCert }}</span>
                    </el-row>
                    <el-row>
                        <span>产品型号</span>
                        <span class="p">{{ detailData.productType }}</span>
                    </el-row>
                    <el-row>
                        <span>被保险人性质</span>
                        <span class="p">{{ detailData.insuNature }}</span>
                    </el-row>
                    <el-row>
                        <span>年销售额</span>
                        <span class="p">{{ detailData.estimatedSales }}美元</span>
                    </el-row>
                    <el-row>
                        <span>产品分类</span>
                        <span class="p">{{ detailData.productClass }}
                            <span v-if="showLei">类</span>
                        </span>
                    </el-row>
                    <el-row>
                        <span>过往五年内是否有任何产品责任索赔/损失或产品召回</span>
                        <span class="p">{{ detailData.ifLossSituation }}</span>
                    </el-row>
                    <el-row v-if="!lineShow">
                        <span>免赔额</span>
                        <span class="p">{{ detailData.isDeductible }}</span>
                    </el-row>
                </div>
            </div>
        </div>

        <div class="records">
            <div class="title">被保产品清单</div>
            <el-table :data="tableData" border style="width: 90%; margin: 0 auto">
                <el-table-column prop="type" label="产品类型" align="center"> </el-table-column>
                <el-table-column prop="name" :label="$t('loan_search_cpmc')" align="center"> </el-table-column>
                <el-table-column prop="model" label="产品型号" align="center"> </el-table-column>
            </el-table>
        </div>


        <div class="records invoiceStyle" style="margin-top: 20px">
            <div class="title" style="display: flex">
                <div class="shu"></div>
                发票申请
            </div>
            <el-form style="padding: 10px 0; margin-left: 20px">
                <div v-if="isInvoice == 0">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开具发票">
                                <span class="p">否</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="isInvoice == 1 && invoice.customerType === '个人'">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开具发票">
                                <span class="p">增值税电子普通发票</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="抬头类型">
                                <span class="p">个人</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="发票抬头">
                                <span class="p">{{ invoice.invoiceHeader }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系电话">
                                <span class="p">{{ invoice.mobile }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11" :offset="1">
                            <el-form-item label="发票接收邮箱">
                                <span class="p">{{ invoice.email }}</span>
                            </el-form-item>
                        </el-col></el-row>
                </div>
                <div v-if="isInvoice == 1 && invoice.customerType === '企业'">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开具发票">
                                <span class="p">增值税电子普通发票</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="抬头类型">
                                <span class="p">企业</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="发票抬头">
                                <span class="p">{{ invoice.invoiceHeader }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="税号">
                                <span class="p">{{ invoice.taxIdNumber }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="注册地址">
                                <span class="p">{{ invoice.companyAddress }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="注册电话">
                                <span class="p">{{ invoice.companyTel }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开户银行">
                                <span class="p">{{ invoice.depositBank }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11" :offset="1">
                            <el-form-item label="银行账号">
                                <span class="p">{{ invoice.bankAccount }}</span>
                            </el-form-item>
                        </el-col></el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系电话">
                                <span class="p">{{ invoice.mobile }}</span>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11" :offset="1">
                            <el-form-item label="发票接收邮箱">
                                <span class="p">{{ invoice.email }}</span>
                            </el-form-item>
                        </el-col></el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { orderDetail } from '@/api/insur';

import amazonLogo from '@/assets/amazonLogo.png';
import pinganLogo from '@/assets/pinganLogo.png';
import piccLogo from '@/assets/piccLogo.png';
import zhongLogo from '@/assets/zhongLogo.png';
import dadiLogo from '@/assets/dadiLogo.png';

export default {
    name: 'pnDetail',
    data() {
        return {
            amazonLogo,
            pinganLogo,
            piccLogo,
            zhongLogo,
            dadiLogo,
            activeName: 'first',
            activeIndex: '1',
            tableData: [],
            key: '', // 保单号
            status: '',
            detailData: {
                insFile: ''
            },
            activeName: 'first',
            elecCUrl: '', //电子中文保单URL
            elecVUrl: '', //保单凭证URL
            insuranceCompany: '',
            params: {
                orderNo: '', //订单号
                productCode: '' //	保司编码
            },
            imgUrl1: '',
            imgUrl2: '',
            imgUrl3: '',
            imgUrl7: '',
            imgUrl4: '',
            imgUrl5: '',
            imgUrl6: '',
            imgUrl8: '',
            imgUrl9: '', // 质检报告
            imgUrl10: '', // 被保质检报告
            zhongLogoShow: false,
            showLei: true,
            file_URL: process.env.VUE_APP_FILE_URL,
            IMG_URL: process.env.VUE_APP_IMG_URL,
            NEW_IMG_URL: process.env.VUE_APP_IMG_URL,
            lineImgUrl: process.env.VUE_APP_LINE_URL,
            phIsZhiJian: '',
            inIsZhiJian: '',
            lineShow: true,
            invoice: {},
            isInvoice: ''
        };
    },
    created() {
        this.key = this.$route.query.orderNo;
        this.status = this.$route.query.policyStatus;
        this.params.orderNo = this.$route.query.orderNo;

        if (this.$route.query.comanyName === '平安') {
            this.params.productCode = 'PN';
            this.insuranceCompany = this.pinganLogo;
        } else if (this.$route.query.comanyName === '人保') {
            this.params.productCode = 'RB';
            this.insuranceCompany = this.piccLogo;
        } else if (this.$route.query.comanyName === '众安') {
            this.params.productCode = 'ZA';
            this.zhongLogoShow = true;
        } else if (this.$route.query.comanyName === '大地') {
            this.params.productCode = 'DD';
            this.insuranceCompany = this.dadiLogo;
        }
        this.getDetail();
    },

    methods: {
        getDetail() {
            orderDetail(this.params).then((res) => {
                if (res.code === 200) {
                    // console.log(res.data, res.data.policyFlag);
                    this.detailData = res.data;
                    this.tableData = res.data.product;
                    this.isInvoice = res.data.isInvoice;
                    this.invoice = res.data.invoice;
                    if (res.data.policyFlag === '线上') {
                        this.elecCUrl = res.data.elecUrl;
                        this.elecVUrl = res.data.elecVUrl;
                        this.IMG_URL = this.lineImgUrl;
                        this.lineShow = false;
                    }
                    if (this.$route.query.comanyName === '人保' || this.$route.query.comanyName === '众安') {
                        this.detailData.productClass = '-';
                        this.showLei = false;
                    }
                    res.data.attachmentList.forEach((item) => {
                        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                        if (reg.test(item.shortPath)) {
                            //alert("包含汉字！");
                            this.IMG_URL = this.NEW_IMG_URL;
                        }

                        if (item.number == 1) {
                            this.imgUrl1 = this.IMG_URL + item.shortPath;
                            // console.log(this.imgUrl1)
                        }
                        if (item.number == 2) {
                            this.imgUrl2 = this.IMG_URL + item.shortPath;
                        }
                        if (item.number == 3) {
                            this.imgUrl3 = this.IMG_URL + item.shortPath;
                        }
                        if (item.number == 7) {
                            this.imgUrl7 = this.IMG_URL + item.shortPath;
                        }
                        if (item.number == 9) {
                            if (item.uploadSource === 'supple') {
                                this.elecCUrl = this.file_URL + item.shortPath;
                            } else {
                                this.elecCUrl = this.IMG_URL + item.shortPath;
                            }
                        }
                        if (item.number == 10) {
                            // this.elecVUrl = this.file_URL + item.shortPath;
                            if (item.uploadSource === 'supple') {
                                this.elecVUrl = this.file_URL + item.shortPath;
                            } else {
                                this.elecVUrl = this.IMG_URL + item.shortPath;
                            }
                        }
                        if (item.number == 15) {
                            if (item.shortPath === undefined) {
                                this.phIsZhiJian = false;
                            } else {
                                this.phIsZhiJian = true;
                            }
                            this.imgUrl9 = this.IMG_URL + item.shortPath;
                        }
                    });
                    if (res.data.isIsured === '是') {
                        this.imgUrl4 = this.imgUrl1;
                        this.imgUrl5 = this.imgUrl2;
                        this.imgUrl6 = this.imgUrl3;
                        this.imgUrl8 = this.imgUrl7;
                        this.imgUrl10 = this.imgUrl9;
                        this.inIsZhiJian = this.phIsZhiJian;
                    } else {
                        res.data.insAttachment.forEach((item) => {
                            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                            if (reg.test(item.shortPath)) {
                                //alert("包含汉字！");
                                this.IMG_URL = this.NEW_IMG_URL;
                            }

                            if (item.number == 4) {
                                this.imgUrl4 = this.IMG_URL + item.shortPath;
                            }
                            if (item.number == 5) {
                                this.imgUrl5 = this.IMG_URL + item.shortPath;
                            }
                            if (item.number == 6) {
                                this.imgUrl6 = this.IMG_URL + item.shortPath;
                            }
                            if (item.number == 8) {
                                this.imgUrl8 = this.IMG_URL + item.shortPath;
                            }
                            if (item.number == 16) {
                                if (item.shortPath === undefined) {
                                    this.inIsZhiJian = false;
                                } else {
                                    this.inIsZhiJian = true;
                                }
                                this.imgUrl10 = this.IMG_URL + item.shortPath;
                            }
                        });
                    }
                    if (res.data.isDeductible == '是') {
                        res.data.isDeductible = '有免赔额';
                    } else {
                        res.data.isDeductible = '无免赔额';
                    }
                }
            });
        },
        prove() {
            window.history.back(-1);
        },
        //中文保单
        ChinesePolicy() {
            if (this.elecCUrl) {
                window.open(this.elecCUrl);
            } else {
                this.$message.error('暂时不可下载喔');
            }
        },
        // 人工批改
        people() {
            window.open(`${process.env.VUE_APP_JUMP_URL}/home?orderNo=${this.key}&isJump=BOSS`);
            // window.open(`http://kjbx.bigtreebroker.com/zrx/home?orderNo=${this.key}&isJump=BOSS`);
            // window.open(`http://192.168.201.43:8081/home?orderNo=${this.key}&isJump=BOSS`);
        },
        // 保单凭证S
        certificate() {
            if (this.elecVUrl) {
                window.open(this.elecVUrl);
            } else {
                this.$message.error('暂时不可下载喔');
            }
        }
        // 下载投保资料
        // dowLoadFile() {
        // }
    }
};
</script>

<style rel="stylesheet/less" lang="less" scope>
.guaranteeDetail {
    padding: 20px 0;

    .page {
        .el-breadcrumb__inner {
            font-weight: 700;
        }
    }

    .el-icon-close {
        float: right;
        font-size: 22px;
        font-weight: 700;
        color: #666;
        cursor: pointer;
    }

    .top {
        display: flex;
        margin-bottom: 15px;

        .left {
            flex: 1;
        }

        .right {
            .el-button {
                border: 1px solid #409EFF;
                color: #409EFF;
                padding: 10px 20px;
            }
        }
    }

    .el-menu-demo {
        // margin: 20px;
        padding: 0 35px;
        background-color: #fff;
    }

    .contentC {
        display: flex;
        margin-top: 20px;

        .title {
            margin-bottom: 20px;
        }

        .left {
            width: 65%;

            .info {
                padding: 20px;
                background-color: #fff;
                margin-bottom: 20px;

                .el-row {
                    font-size: 15px;
                    margin: 30px 20px 30px 35px;
                }

                .a {
                    // margin-right: 40px;
                    font-size: 15px;
                    width: 105px;
                }

                .p {
                    // margin-left: 40px;
                    font-size: 13px;
                    color: #666;
                    margin-top: 3px;
                }

                .w {
                    width: 140px;
                    font-size: 15px;
                }

                .el-col {
                    display: flex;
                }
            }

            .el-tabs--card>.el-tabs__header .el-tabs__nav {
                border: none;
            }

            .el-tabs__header {
                border-bottom: none;
                margin: 0;
            }

            .el-tabs__item {
                font-size: 16px;
            }

            .is-active {
                color: #000;
                font-weight: 700;
            }
        }

        .right {
            flex: 1;

            .scope {
                background-color: #fff;
                margin-left: 20px;
                padding: 43px 30px;
                margin-bottom: 20px;

                .el-button {
                    width: 100px;
                    padding: 10px;
                    background-color: #eee;
                }
            }

            .el-row {
                font-size: 15px;
                margin: 30px 20px 30px 35px;
            }

            .p {
                margin-left: 20px;
                color: #666;
                font-size: 13px;
                margin-top: 3px;
            }

            .w {
                width: 110px;
            }
        }
    }

    .has-gutter tr th {
        background-color: #fef3f7;
    }

    .el-menu-item .is-active:hover {
        background-color: #fff !important;
    }

    .invoiceStyle {
        .p {
            margin-left: 15px;
            color: #666;
            font-size: 13px;
        }

        .el-form-item__label {
            font-size: 16px;
            color: #000;
        }
    }

    .records {
        background-color: #fff;
        padding: 40px;
        margin-bottom: 20px;

        .title {
            margin-bottom: 20px;
        }
    }
}

.green {
    background-color: #e8f6de;
    border: 1px solid #67c23a;
    color: #67c23a;
    padding: 5px 17px;
    margin-right: 20px;
}

.orange {
    background-color: #f56c6c;
    border: 1px solid #fd0606;
    color: #fff;
    padding: 5px 17px;
    margin-right: 20px;
}

.gray {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
    padding: 5px 17px;
    margin-right: 20px;
}
</style>