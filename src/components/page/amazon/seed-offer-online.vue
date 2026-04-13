<template>
    <div style="position: relative;">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div class="send-offer-btn">
            <el-button type="primary" @click="sendBothOffer" v-if="$showBtn('SEND_BOTH')">批量发送offer</el-button>
            <el-button type="primary" @click="sendOffer">发送offer</el-button>

        </div>

        <table-page :detailTable="true" :tableData="tableData" :showFilterRadio="false" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @resend="resend" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange" />
        <el-dialog title="Offer发送" :visible.sync="dialogFormVisible2" width="500px" v-loading="loading">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="站点" prop="marketplaceCountry">
                    <el-select v-model="ruleForm.marketplaceCountry" style="width: 100%;" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SellerID" prop="sellerId">
                    <el-input v-model="ruleForm.sellerId"></el-input>
                </el-form-item>
                <!-- <el-form-item label="期限" prop="term">
                    <el-input v-model="ruleForm.term"></el-input>
                </el-form-item> -->
                <el-form-item label="近1年销售额" prop="year1SalesValue">
                    <el-input v-model="ruleForm.year1SalesValue" @input="handleInput">
                        <template slot="append">万美元</template>
                    </el-input>
                </el-form-item>
                <div style="display: flex;align-items: center; justify-content: center; margin-top: 20px">
                    <el-button type="primary" style="width: 180px" @click="submitForm('ruleForm')">确定发送</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!-- 批量发送offer -->
        <el-upload v-show="false" :headers="uploadHeaders" class="upload-demo" :data="senderObj" :action="uploadMorePdf"
            :file-list="fileListBoth" :on-success="handleBothSuccess">
            <el-button id="bothUp" size="small" type="primary" :loading="bothLoading">批量发送offer</el-button>
        </el-upload>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    creditList,
    creditUpdate,
    lenderList,
    getProductInfo,
    getSeedOnlineList,
    getOfferInfoDetail,
    handleOffer,
    sendOfferApi
} from '../../../api/index';
export default {
    name: 'us-credit',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            bothLoading: false,
            senderObj: { sender: localStorage['userName'] },
            uploadHeaders: { token: localStorage.getItem('token') },
            fileListBoth: [],
            uploadMorePdf: process.env.VUE_APP_BOTH,
            statusTxt: {
                'Y': '发送成功',
                'N': '发送失败'
            },
            marketplaceCountryTxt: {
                'US': '美国站',
                'DE': '德国站',
            },
            pageData: [],
            form: {
                status: '1',
                reason: ''
            },
            productInfo: {},
            dates: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    placeholder: '站点',
                    filterable: true,
                    options: [{
                        value: 'US',
                        label: '美国站'
                    }, {
                        value: 'DE',
                        label: '德国站'
                    },]
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: 'SellerID',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '是否发送成功',
                    filterable: true,
                    options: [{
                        value: 'Y',
                        label: '是'
                    }, {
                        value: 'N',
                        label: '否'
                    }]
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '手机号',
                    filterable: true
                },
                {
                    type: 'datetimerange',
                    value: [],
                    placeholder: '发送时间',
                    filterable: true,
                    placeholderArr: ['开始时间', '结束时间'],
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '3PAR offer',
                    filterable: true,
                    options: [{
                        value: true,
                        label: '是'
                    }, {
                        value: false,
                        label: '否'
                    }]
                },
            ],
            applicationCode: '',
            columns: [
                {
                    label: 'OfferID',
                    prop: 'offerId',
                    width: '230'
                },

                {
                    label: 'SellerID',
                    prop: 'sellerId',
                    width: 150
                },

                {
                    label: '注册手机号',
                    prop: 'phone',
                    width: 150
                },
                {
                    label: '发送时间',
                    prop: 'sendTime',
                    width: 160
                },
                {
                    label: '是否成功',
                    prop: 'status',
                    width: 140
                },
                {
                    label: '成功时间',
                    prop: 'receiveTime',
                    width: '160'
                },
                {
                    label: '失败原因',
                    prop: 'suggestion',
                    width: ''
                },
                {
                    label: 'Offer状态',
                    prop: 'offerStatus',
                    width: ''
                },
                {
                    label: '3PAR',
                    prop: 'is3Par',
                    width: 80
                },
                {
                    label: '站点',
                    prop: 'marketplaceCountry',
                    width: 80
                },
            ],
            dialogFormVisible2: false,
            loading: false,
            ruleForm: {
                term: '12',
                sellerId: '',
                year1SalesValue: '',
                marketplaceCountry: '',
                is3Par: ''
            },
            rules: {
                sellerId: [
                    { required: true, message: '请输入sellerId', trigger: 'blur' },
                ],
                // term: [
                //     { required: true, message: '请输入期限', trigger: 'blur' },
                //     { pattern: /^\d*(\.\d+)?$/, message: '请输入正确的数字', trigger: 'blur' },
                // ],
                year1SalesValue: [
                    { required: true, message: '请输入年销售额', trigger: 'blur' },
                    { pattern: /^\d*(\.\d+)?$/, message: '请输入正确的数字', trigger: 'blur' },
                ],
                marketplaceCountry: [
                    { required: true, message: '请选择站点', trigger: 'blur' },
                ],
            },
            options: [{
                value: 'US',
                label: '美国站'
            }, {
                value: 'DE',
                label: '德国站'
            },]
        };
    },
    created() {

    },
    methods: {
        handleInput(value) {
            // 使用正则表达式限制输入为整数
            this.ruleForm.year1SalesValue = value.replace(/[^\d]/g, '');
        },
        handleBothSuccess(res) {
            this.bothLoading = true
            if (res.code == 200) {
                this.$message.success('发送成功')
                this.bothLoading = false
                this.fileListBoth = []
            } else {
                this.$message.error(res.message)
                this.bothLoading = false
                this.fileListBoth = []
            }

        },
        sendBothOffer() {
            let bothUp = document.getElementById('bothUp')
            bothUp.click()
        },
        resend(v) {
            this.ruleForm = {
                term: v.term,
                sellerId: v.sellerId,
                year1SalesValue: v.year1SalesValue,
                marketplaceCountry: v.marketplaceCountry,
            }
            this.dialogFormVisible2 = true
        },
        sendOffer() {
            this.ruleForm = {
                term: '12',
                sellerId: '',
                year1SalesValue: '',
                marketplaceCountry: '',
            }
            this.dialogFormVisible2 = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.ruleForm.sender = localStorage['userName']
                    this.ruleForm.senderType = 'OPERATION'
                    sendOfferApi(this.ruleForm).then((res) => {
                        this.dialogFormVisible2 = false
                        this.loading = false
                        this._getList()
                        this.$message.success('操作成功！')
                    }).catch((err) => {
                        this.loading = false
                        this.$message.error(err.message || '系统错误！')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        _getList() {
            let params = {
                current: this.currentPage,
                size: 10,
                marketplaceCountry: this.filterOptions[0].value,
                sellerId: this.filterOptions[1].value,
                status: this.filterOptions[2].value,
                phone: this.filterOptions[3].value,
                sendTimeBegin: this.filterOptions[4].value.length ? this.filterOptions[4].value[0] : '',
                sendTimeEnd: this.filterOptions[4].value.length ? this.filterOptions[4].value[1] : '',
                is3Par: typeof this.filterOptions[5].value == 'boolean' ? this.filterOptions[5].value : null
            };

            getSeedOnlineList(params).then(res => {
                res.data.records.forEach(item => {
                    // 发送结果
                    if (item.status) {
                        item.status = this.statusTxt[item.status]
                    }
                    // 站点
                    if (item.marketplaceCountry) {
                        item.marketplaceCountry = this.marketplaceCountryTxt[item.marketplaceCountry]
                    }
                    item.suggestion = ''
                    // 失败原因
                    if (item.autoOfferMsgVoList && item.autoOfferMsgVoList.length > 0) {
                        item.autoOfferMsgVoList.forEach(item2 => {
                            item.suggestion = item.suggestion + `原因：${item2.message ? item2.message : '-'}，怎么办：${item2.howDo ? item2.howDo : '-'}。`
                        })
                    } else {
                        item.suggestion = '-'
                    }
                    item.is3Par = item.is3Par ? '是' : '否'

                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
    }
};
</script>

<style lang='less'>
.send-offer-btn {
    position: absolute;
    right: 20px;
    top: 160px;
}

/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

/* 火狐 */
input {
    -moz-appearance: textfield;
}

.avatar-uploader .el-upload {
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px;
    height: 178px;
    display: block;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
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