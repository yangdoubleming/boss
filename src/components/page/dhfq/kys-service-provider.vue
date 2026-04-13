<template>
    <div class="service">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @openDetail="_openDetail" />
        <el-drawer size="980px" title="详情" :visible.sync="dialogFormVisible" direction="rtl">
            <div class="block">
                <div class="line"></div>
                服务商信息
            </div>
            <el-form :model="serviceInfo" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="服务商公司名称：">
                    <span class="text">{{ serviceInfo.cmpName }}</span>
                </el-form-item>
                <el-form-item label="服务商类型：">
                    <span class="text">{{ serviceInfo.serviceForm }}</span>
                </el-form-item>
                <el-form-item label="统一社会信用码：">
                    <span class="text">{{ serviceInfo.cmpLicenseNum }}</span>
                </el-form-item>

                <el-form-item label="联系人：">
                    <span class="text">{{ serviceInfo.contactName }}</span>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <span class="text">{{ serviceInfo.tel }}</span>
                </el-form-item>

                <el-form-item label="邮箱地址：">
                    <span class="text">{{ serviceInfo.email }}</span>
                </el-form-item>
                <el-form-item label="联系人职位：">
                    <span class="text">{{ serviceInfo.contactPosition }}</span>
                </el-form-item>
                <el-form-item label="通信地址：">
                    <span class="text">{{ serviceInfo.cmpCommunication }}</span>
                </el-form-item>
                <el-form-item label="银行账户户名：">
                    <span class="text">{{ serviceInfo.bankAccountName }}</span>
                </el-form-item>
                <el-form-item label="银行账户号：">
                    <span class="text">{{ serviceInfo.bankAccountNo }}</span>
                </el-form-item>
                <el-form-item label="银行名称：">
                    <span class="text">{{ serviceInfo.bankName }}</span>
                </el-form-item>
                <el-form-item label="联行号：">
                    <span class="text">{{ serviceInfo.bankNo }}</span>
                </el-form-item>
                <div class="block">
                    <div class="line"></div>
                    文件
                </div>
                <el-form-item label="合作协议：">
                    <div style="position: relative; display: flex; align-items: center">
                        <div class="input">
                            <div style="width: 270px; text-align: left">
                                <el-link :underline="false"
                                    style="width: 270px; text-align: left; color: #ee137c; display: block"
                                    v-for="item in cooperationAgreement" :key="item">
                                    <span @click="openFile(item)">查看协议</span>
                                </el-link>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div class="block">
                <div class="line"></div>
                风险数据
            </div>
            <div class="warning-data" v-if="qccRiskInfo">
                <div>
                    报告状态: <span class="answer">{{ qccRiskInfo.isNormalReport }}</span>
                </div>
                <div>
                    报告生成日期: <span class="answer">{{ qccRiskInfo.createTime }}</span>
                </div>
                <div class="bid">
                    准入建议: <span class="answer">{{ qccRiskInfo.isAdmittance }}</span>
                </div>
            </div>
            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item> </el-form-item>
                <el-form-item label="失信被执行人：">
                    <span class="text">{{ qccRiskInfo.shiXin }}</span>
                </el-form-item>
                <el-form-item label="被执行人：">
                    <span class="text">{{ qccRiskInfo.zhiXing }}</span>
                </el-form-item>
                <el-form-item label="行政处罚：">
                    <span class="text">{{ qccRiskInfo.adminPenalty }}</span>
                </el-form-item>
                <el-form-item label="经营异常：">
                    <span class="text">{{ qccRiskInfo.exception }}</span>
                </el-form-item>
                <el-form-item label="动产抵押：">
                    <span class="text">{{ qccRiskInfo.chattelMortgage }}</span>
                </el-form-item>
                <el-form-item label="股权出质：">
                    <span class="text">{{ qccRiskInfo.equityPledge }}</span>
                </el-form-item>
                <el-form-item label="严重违法：">
                    <span class="text">{{ qccRiskInfo.seriousIllegal }}</span>
                </el-form-item>
                <el-form-item label="股权冻结：">
                    <span class="text">{{ qccRiskInfo.equityFreeze }}</span>
                </el-form-item>
                <el-form-item label="司法拍卖：">
                    <span class="text">{{ qccRiskInfo.judicialSale }}</span>
                </el-form-item>
                <el-form-item label="破产重整：">
                    <span class="text">{{ qccRiskInfo.bankruptcy }}</span>
                </el-form-item>
                <el-form-item label="限制高消费：">
                    <span class="text">{{ qccRiskInfo.sumptuary }}</span>
                </el-form-item>
                <el-form-item label="环保处罚：">
                    <span class="text">{{ qccRiskInfo.envPunishment }}</span>
                </el-form-item>
                <el-form-item label="欠税公告：">
                    <span class="text">{{ qccRiskInfo.taxOweNotice }}</span>
                </el-form-item>
                <el-form-item label="税收违法：">
                    <span class="text">{{ qccRiskInfo.taxIllegal }}</span>
                </el-form-item>
            </el-form>
            <div v-if="chooseRow.valid == '待审核'"
                style="display: flex; justify-content: center; align-items: center; margin-top: 60px; margin-bottom: 15px">
                <el-button style="width: 120px" @click="_upstatus('INVALID')">拒绝</el-button>
                <el-button type="primary" style="width: 120px" @click="_upstatus('VALID')">通过</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    getdfnew,
    dowpodsServiceInfoApproval,
    dowpodsServiceInfoPage,
    getQccRiskInfo,
    dowpodsServiceInfoSelectOne,
    dowpodsServiceInfoSelectFile
} from '../../../api/kys';

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            formData: {},
            dialogFormVisible: false,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '服务商名称',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '类型',
                    filterable: true,
                    options: [
                        {
                            label: '物流',
                            value: 'LOGISTICS'
                        },
                        {
                            label: '采购',
                            value: 'PURCHASE'
                        },
                        {
                            label: '其他',
                            value: 'OTHER'
                        }
                    ]
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '状态',
                    filterable: true,
                    options: [
                        {
                            label: '待审核',
                            value: 'CREATED'
                        },
                        {
                            label: '有效',
                            value: 'ENABLED'
                        },
                        {
                            label: '无效',
                            value: 'REJECTED'
                        }
                    ]
                },
            ],
            currentPage: 1,
            totalSize: 10,
            chooseRow: {},
            tableData: [],
            cooperationAgreement: [],
            value: '',
            columns: [
                {
                     label: '申请单号',
                    prop: 'applicationCode',
                },
                  {
                    label: '客户名称',
                    prop: 'name',
                },
                {
                    label: '服务商名称',
                    prop: 'serviceProviderName',
                },
                {
                    label: '类型',
                    prop: 'serviceType',

                },
                {
                    label: '统一社会信用代码',
                    prop: 'cmpLicenseNum',
                },
                {
                    label: '联系人',
                    prop: 'contactName',
                },
                {
                    label: '联系人手机号',
                    prop: 'contactPhone',
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'approvedStatus',
                    width: 120
                },
                {
                    label: '推荐人手机号',
                    prop: 'recommenderTel',
                },

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     operates: [
                //         {
                //             event: 'openDetail',
                //             text: this.$t('common_see'),
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ],
            qccRiskInfo: {},
            serviceInfo: {}
        };
    },
    created() { },
    methods: {
        openFile(url) {
            if (url) {
                window.open(this.imgsBaseUrl + url);
            } else {
                this.$message.warning('该服务商未上传协议');
            }
        },
        _upstatus(status) {
            dowpodsServiceInfoApproval({
                id: this.chooseRow.id,
                valid: status
            }).then((res) => {
                this.$message.success('操作成功！');
                this.dialogFormVisible = false;
                this._getList();
            });
        },
        _getList() {
            getdfnew({
                serviceProviderName: this.filterOptions[0].value,
                serviceType: this.filterOptions[1].value,
                approvedStatus: this.filterOptions[2].value,
                current: this.currentPage,
                size: 10
            }).then((res) => {
                this.tableData = res.data.records.map((item) => {
                    if (item.serviceType == 'LOGISTICS') {
                        item.serviceType = '物流';
                    } else if (item.serviceType == 'PURCHASE') {
                        item.serviceType = '采购';
                    } else if (item.serviceType == 'OTHER') {
                        item.serviceType = '其他';
                    }
                    if (item.approvedStatus == 'CREATED') {
                        item.approvedStatus = '待审核';
                    } else if (item.approvedStatus == 'ENABLED') {
                        item.approvedStatus = '有效';
                    } else if (item.approvedStatus == 'REJECTED') {
                        item.approvedStatus = '无效';
                    }
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        _openDetail(row) {
            this.chooseRow = row;
            getQccRiskInfo(row.cmpLicenseNum).then((res) => {
                if (res.data.isNormalReport) {
                    if (res.data.isNormalReport == true) {
                        res.data.isNormalReport = '正常报告';
                        if (res.data.isAdmittance == true) {
                            res.data.isAdmittance = '准入';
                        } else {
                            res.data.isAdmittance = '不准入';
                        }
                    } else {
                        res.data.isAdmittance = '';
                    }
                } else {
                    res.data.isNormalReport = '非正常报告';
                    res.data.isAdmittance == '';
                }
                this.qccRiskInfo = res.data;
                this.dialogFormVisible = true;
            });
            dowpodsServiceInfoSelectOne(row.serviceId).then((res) => {
                this.serviceInfo = res.data;
                if (this.serviceInfo.serviceForm === 0) {
                    this.serviceInfo.serviceForm = '物流';
                } else if (this.serviceInfo.serviceForm === 1) {
                    this.serviceInfo.serviceForm = '广告';
                } else if (this.serviceInfo.serviceForm === -1) {
                    this.serviceInfo.serviceForm = '其他';
                }
            });
            dowpodsServiceInfoSelectFile(row.serviceId).then((res) => {
                this.cooperationAgreement = res.data;
            });
        }
    }
};
</script>

<style lang="less">
.service {
    .text {
        width: 280px;
        display: block;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .warning-data {
        padding-left: 80px;
        color: #606266;
        margin-bottom: 10px;

        .answer {
            margin-left: 20px;
        }

        .bid {
            color: red;
        }
    }

    .block {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        width: 100%;
        padding-left: 32px;
        margin: 24px 0;
        font-size: 18px;
        color: #323232;
        letter-spacing: 0;
        text-align: justify;
        line-height: 26px;
        font-weight: 500;

        .note {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #646566;
            letter-spacing: 0;
            text-align: justify;
            line-height: 26px;
            font-weight: 400;
            padding-left: 12px;
        }

        .line {
            width: 4px;
            height: 16px;
            background: #e52d6d;
            margin-right: 8px;
        }
    }
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
