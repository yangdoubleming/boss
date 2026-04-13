<template>
    <div class="service">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @openDetail="_openDetail" />
        <el-drawer size="980px" title="详情" :visible.sync="dialogFormVisible" direction="rtl">
            <div class="block">
                <div class="line"></div>
                服务商信息
            </div>
            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="服务商类型：" prop="bcName">
                    <span class="text">{{ chooseRow.serviceType || '-' }}</span>
                </el-form-item>
                <el-form-item label="服务商地区：">
                    <span class="text">中国大陆</span>
                </el-form-item>
                <el-form-item label="服务商名称：" prop="bcName">
                    <span class="text">{{ chooseRow.serviceProviderName || '-' }}</span>
                </el-form-item>
                <el-form-item label="备注名：">
                    <span class="text">{{ chooseRow.noteName || '-' }}</span>
                </el-form-item>
                <div class="block">
                    <div class="line"></div>
                    服务商银行账户<span class="note">申请豆花分期的金额将付款至以下银行账户</span>
                </div>
                <el-form-item label="银行所在地区：">
                    <span class="text">中国大陆</span>
                </el-form-item>
                <el-form-item label="币种：">
                    <span class="text">{{ bankInfo.currency || '-' }}</span>
                </el-form-item>
                <el-form-item label="开户银行：" prop="bcName">
                    <span class="text">{{ bankInfo.bankName || '-' }}</span>
                </el-form-item>
                <el-form-item label="支行名称：" prop="bcName">
                    <span class="text">{{ bankInfo.bankBranchName || '-' }}</span>
                </el-form-item>
                <el-form-item label="账户名称：" prop="bcName">
                    <span class="text">{{ bankInfo.accountName || '-' }}</span>
                </el-form-item>
                <el-form-item label="账户号码：" prop="bcName">
                    <span class="text">{{ bankInfo.accountNo || '-' }}</span>
                </el-form-item>
                <div class="block">
                    <div class="line"></div>
                    合作资料
                </div>

                <el-form-item label="合作协议：">
                    <div style="position: relative;display: flex;
                        align-items: center;">
                        <div class="input">
                            <div style="width:270px;text-align: left;">
                                <el-link :underline="false"
                                    style="width:270px;text-align: left;color: #ee137c;display: block;"
                                    v-for="(item) in cooperationAgreement" :key="item.fileUrl">
                                    <span @click="openFile(item.fileUrl)">{{ item.fileName }}</span>
                                </el-link>
                            </div>
                        </div>
                    </div>

                </el-form-item>
                <el-form-item label="合作流水：">
                    <div style="position: relative;display: flex;
                        align-items: center;">
                        <div class="input">
                            <div style="width:270px;text-align: left;">
                                <el-link :underline="false"
                                    style="width:270px;text-align: left;color: #ee137c;display: block;"
                                    v-for="(item) in cooperationRecord" :key="item.fileUrl">
                                    <span @click="openFile(item.fileUrl)">{{ item.fileName }}</span>
                                </el-link>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <div class="block">
                    <div class="line"></div>
                    服务商联系人
                </div>
                <el-form-item label="联系人名称：">
                    <span class="text">{{ chooseRow.contactName || '-' }}</span>
                </el-form-item>
                <el-form-item label="联系人职位：">
                    <span class="text">{{ chooseRow.contactPosition || '-' }}</span>
                </el-form-item>
                <el-form-item label="联系人电话：">
                    <span class="text">{{ chooseRow.contactPhone || '-' }}</span>
                </el-form-item>
                <el-form-item label="联系人邮箱：" prop="bcName">
                    <span class="text">{{ chooseRow.contactEmail || '-' }}</span>
                </el-form-item>
            </el-form>
            <div v-if="chooseRow.approvedStatus == '待审核'" style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 60px;
              margin-bottom: 15px;
            ">
                <el-button style="width: 120px" @click="_upstatus('REJECTED')">拒绝</el-button>
                <el-button type="primary" style="width: 120px" @click="_upstatus('ENABLED')">通过</el-button>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { serveList, upstatus, fileList, getBank } from '../../../api/dhfq'
import { lenderList } from '../../../api/index'

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            formData: {},
            fileList: [],
            dialogFormVisible: false,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '手机号码',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '资方名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '类型',
                    filterable: true,
                    options: [
                        {
                            label: '物流',
                            value: 'LOGISTICS',
                        },
                        {
                            label: '广告/推广',
                            value: 'ADVERTISING',
                        },
                        {
                            label: '货物采购',
                            value: 'PURCHASE',
                        },
                        {
                            label: '仓储',
                            value: 'STORAGE',
                        },
                        {
                            label: '代运营',
                            value: 'AGENCY_OPERATION',
                        },
                        {
                            label: '其他',
                            value: 'OTHER',
                        },
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
                            value: 'CREATED',
                        },
                        {
                            label: '审核通过',
                            value: 'ENABLED',
                        },
                        {
                            label: '审核拒绝',
                            value: 'REJECTED',
                        },
                    ]
                },],
            currentPage: 1,
            totalSize: 10,
            chooseRow: {},
            tableData: [

            ],

            value: '',
            columns: [
                {
                    label: '服务商编号',
                    prop: 'id',
                    width: 180
                },
                {
                    label: '用户编号',
                    prop: 'userId',
                    width: 120
                },
                {
                    label: '用户名称',
                    prop: 'serviceProviderName',
                    width: 250
                },
                {
                    label: '手机号码',
                    prop: 'tel',
                    width: 150
                },
                {
                    label: '产品名称',
                    prop: 'lenderProduct',
                    width: 160
                },
                {
                    label: '资方名称',
                    prop: 'lenderName',
                    width: 120
                },
                {
                    label: '服务商类型',
                    prop: 'serviceType',
                    width: 160
                },
                {
                    label: '服务商名称',
                    prop: 'serviceProviderName',
                    width: 210
                },
                {
                    label: '服务商地区',
                    prop: 'address',
                    width: 180
                },
                {
                    label: '备注名',
                    prop: 'noteName',
                    width: 200
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'approvedStatus'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'openDetail',
                            text: this.$t('common_see'),
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
            cooperationAgreement: [],
            cooperationRecord: [],
            bankInfo: {},
        };
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[1].options = res.data;
        });
    },
    methods: {
        openFile(url) {
            window.open(this.imgsBaseUrl + url)
        },
        _upstatus(status) {
            upstatus(this.chooseRow.id, status).then(res => {
                this.$message.success('操作成功！')
                this.dialogFormVisible = false
                this._getList()
            })
        },
        _openDetail(row) {
            Promise.all([fileList(row.cooperationAgreement), fileList(row.cooperationRecord), getBank(row.id)])
                .then(result => {
                    console.log(result);
                    this.chooseRow = row
                    this.dialogFormVisible = true
                    this.cooperationAgreement = result[0].data
                    this.cooperationRecord = result[1].data
                    this.bankInfo = result[2].data[0] || {}
                })

        },
        _getList() {
            serveList({
                account: this.filterOptions[0].value,
                lenderId: this.filterOptions[1].value == 28 || !this.filterOptions[1].value ? 28 : 99,
                realName: this.filterOptions[2].value,
                serviceType: this.filterOptions[3].value,
                approvedStatus: this.filterOptions[4].value,
                current: this.currentPage,
                size: 10

            }).then((res) => {
                if (res.data.records) {
                    res.data.records.forEach((item) => {
                        this.filterOptions[3].options.forEach(it => {
                            if (item.serviceType == it.value) { item.serviceType = it.label }

                        })
                        this.filterOptions[4].options.forEach(it => {
                            if (item.approvedStatus == it.value) { item.approvedStatus = it.label }
                        })
                        item.address = '中国大陆'
                    });
                }
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },


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
            background: #E52D6D;
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
