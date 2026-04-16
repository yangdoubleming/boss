<template>
    <div class="guaranteeDetail">
        <div style="display: flex; justify-content: space-between; padding-bottom: 10px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
                订单管理 /
                <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">订单详情</span>
            </div>

            <div>
                <i class="el-icon-close" @click="prove"></i>
            </div>
        </div>

        <div class="top">
            <div class="left" style="line-height: 40px">
                订单编号
                <span style="margin: 0 15px; color: #409EFF">{{ key }}</span>
                保费
                <span style="margin: 0 15px; color: #409EFF">{{ detailData.totalPremiumUSD }}美元（ {{
                    detailData.totalPremium }}{{ $t('common_yuan2') }}）</span>
                <el-button v-if="status == '已付款'" class="green">{{ status }}</el-button>
                <el-button v-if="status == '已生效'" class="green">{{ status }}</el-button>
                <el-button v-if="status == '待审核'" class="orange">{{ status }}</el-button>
                <el-button v-if="status == '待付款'" class="orange">{{ status }}</el-button>
                <el-button v-if="status == '已过期'" class="gray">{{ status }}</el-button>
                <el-button v-if="status == '拒保'" class="gray">{{ status }}</el-button>
                <span v-if="detailData.declinedReason || detailData.declinedRemark">拒保原因：{{ detailData.declinedReason
                    }}{{ detailData.declinedRemark }}</span>
            </div>
            <div class="right">
                <el-button @click="certificate" style="border: 2px solid #409EFF; font-weight: 700">保险凭证</el-button>
                <el-button @click="ChinesePolicy">中文保单</el-button>
                <el-button @click="EnglishPolicy">英文保单</el-button>
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
                            <div class="p" style="color: #409EFF">{{ detailData.policyNumber ? detailData.policyNumber :
                    '-' }}</div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">保单状态</div>
                            <div class="p">{{ status }}</div>
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
                            <div class="p" style="height: 24px">
                                <img :src="insuranceCompany" alt style="width: 45%" />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="a">保费</div>
                            <div class="p" style="color: #409EFF">
                                {{ detailData.totalPremiumUSD }}美元（{{ detailData.totalPremium }}{{ $t('common_yuan2')
                                }}）
                            </div>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <div class="a">保额</div>
                            <div class="p">{{ detailData.insuredAmount }}</div>
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
                <div class="info" style="height: 430px">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="投保人信息" name="first">
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">公司名(中文)</div>
                                    <div class="p">{{ detailData.phName }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">公司名(英文)</div>
                                    <div class="p">{{ detailData.phEName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">证件类型</div>
                                    <div class="p">{{ $t('loan_detail_tyshxydm') }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">证件号码</div>
                                    <div class="p">{{ detailData.phIdNo }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">注册省份</div>
                                    <div class="p">{{ detailData.phProvince }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">注册地址</div>
                                    <div class="p" style="width: 275px">{{ detailData.phAddr }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">{{ $t('loan_detail_yyzz') }}</div>
                                    <img :src="detailData.phFile" alt style="width: 200px; height: 145px" />
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="被保人信息" name="second">
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">公司名(中文)</div>
                                    <div class="p">{{ detailData.insuredName }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">公司名(英文)</div>
                                    <div class="p">{{ detailData.insuredEName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">证件类型</div>
                                    <div class="p">{{ $t('loan_detail_tyshxydm') }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">证件号码</div>
                                    <div class="p">{{ detailData.insuredIdNo }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">注册省份</div>
                                    <div class="p">{{ detailData.insuredProvince }}</div>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <div class="w">注册地址</div>
                                    <div class="p" style="width: 275px">{{ detailData.insuredAddr }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="w">{{ $t('loan_detail_yyzz') }}</div>
                                    <img :src="detailData.insFile" alt style="width: 200px; height: 145px" />
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="w" style="width: 150px">亚马逊后台登记地址</div>
                                    <div class="p">{{ detailData.insEstablishmentAddress }}</div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="附加被保险人" name="three">
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">企业名称</div>
                                    <div class="p">{{ detailData.entName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">企业地址</div>
                                    <div class="p">{{ detailData.entAddress }}</div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="联系人信息" name="four">
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">联系人姓名</div>
                                    <div class="p">{{ detailData.contactName }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">联系人电话</div>
                                    <div class="p">{{ detailData.contactTel }}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16">
                                    <div class="w">联系人邮箱</div>
                                    <div class="p">{{ detailData.contactMail }}</div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="right">
                <div class="scope" style="height: 170px">
                    <div class="title" style="margin-bottom: 50px">保障范围</div>
                    <div style="text-align: center">
                        <el-button>商品故障</el-button>
                        <el-button>卖家赔偿</el-button>
                    </div>
                </div>
                <div class="shop scope" style="height: 417px">
                    <div class="title" style="margin-bottom: 30px">被保店铺</div>
                    <el-row>
                        <span>平台</span>
                        <span class="p">
                            <!-- <img :src="amazonLogo" alt style="width: 20%; vertical-align: middle" /> -->
                            {{ detailData.platform }}
                        </span>
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
                        <span>店铺链接</span>
                        <span class="p">{{ detailData.insuredStoreLink }}</span>
                    </el-row>
                    <el-row>
                        <span>有无免赔额</span>
                        <span class="p">{{ detailData.isDeductible }}</span>
                    </el-row>
                    <el-row>
                        <span>是否有损失记录</span>
                        <span class="p">{{ detailData.isLossRecords }}</span>
                    </el-row>
                </div>
            </div>
        </div>

        <div class="records">
            <div class="title">被保产品清单</div>
            <el-table :data="tableData" border style="width: 90%; margin: 0 auto">
                <el-table-column label="产品名称（英文）" align="center" prop="name"></el-table-column>
                <el-table-column prop="model" label="预计年销售额（USD）" align="center"></el-table-column>
                <el-table-column prop="type" label="产品类别" align="center"></el-table-column>
                <el-table-column prop="code" label="免赔额" align="center"></el-table-column>
            </el-table>
        </div>
        <div class="records" v-if="recordsShow">
            <div class="title">损失记录详情</div>
            <el-table :data="recordsData" border style="width: 90%; margin: 0 auto">
                <el-table-column prop="date" label="日期" align="center" width="300px"></el-table-column>
                <el-table-column prop="region" label="地区" align="center" width="300px"></el-table-column>
                <el-table-column prop="situation" label="损失情况" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { orderDetail } from '@/api/insur';

import amazonLogo from '@/assets/amazonLogo.png';
import starrLogo from '@/assets/starrLogo.png';

export default {
    name: 'starrDetail',
    data() {
        return {
            amazonLogo,
            starrLogo,
            activeName: 'first',
            activeIndex: '1',
            tableData: [],
            recordsData: [],
            key: '', // 保单号
            status: '',
            detailData: {
                insFile: ''
            },
            activeName: 'first',
            recordsShow: true,
            elecUrl: '', //电子中文保单URL
            elecEnUrl: '', //电子英文保单URL
            elecVUrl: '', //保单凭证URL
            insuranceCompany: '',
            params: {
                orderNo: '', //订单号
                productCode: '' //	保司编码
            }
        };
    },
    created() {
        this.key = this.$route.query.orderNo;
        this.status = this.$route.query.policyStatus;
        this.params.orderNo = this.$route.query.orderNo;
        if (this.$route.query.comanyName === '史带') {
            this.insuranceCompany = this.starrLogo;
            this.params.productCode = 'ST';
        } else if (this.$route.query.comanyName === '平安') {
            this.params.productCode = 'PN';
        }
        this.getDetail();
    },

    methods: {
        getDetail() {
            orderDetail(this.params).then((res) => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.detailData = res.data;
                    // this.detailData.insFile = res.data.insFile;
                    this.tableData = res.data.product;
                    this.recordsData = res.data.sit;
                    res.data.product.forEach((i) => {
                        console.log(i.code);
                        if (i.code == null) {
                            i.code = '-';
                        }
                    });

                    this.elecUrl = res.data.elecUrl;
                    this.elecEnUrl = res.data.elecEnUrl;
                    this.elecVUrl = res.data.elecVUrl;
                    if (res.data.sit.length === 0) {
                        this.recordsShow = false;
                    } else {
                        this.recordsShow = true;
                    }
                }
            });
        },
        prove() {
            window.history.back(-1);
        },
        //中文保单
        ChinesePolicy() {
            if (this.elecUrl) {
                window.open(this.elecUrl);
            } else {
                this.$message.error('暂时不可下载喔');
            }
        },
        // 英文保单
        EnglishPolicy() {
            if (this.elecEnUrl) {
                window.open(this.elecEnUrl);
            } else {
                this.$message.error('暂时不可下载喔');
            }
        },
        // 保单凭证
        certificate() {
            if (this.elecVUrl) {
                window.open(this.elecVUrl);
            } else {
                this.$message.error('暂时不可下载喔');
            }
        }
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
                    width: 90px;
                }

                .p {
                    // margin-left: 40px;
                    font-size: 13px;
                    color: #666;
                    margin-top: 3px;
                }

                .w {
                    width: 100px;
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