<template>
    <div class="ca">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" icon="el-icon-document-copy" @click="showCreate">新增签约
            </el-button>
        </div>
        <table-page :exportBtn="true" @onExport="_onExport" :detailTable="true" :tableData="tableData"
            :tableOperate="tableOperate" :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @quote="toDetail" :before-upload="beforeAvatarUpload"
            @getDetail="_getDetail" @getSignContractAttachment="_getSignContractAttachment">
        </table-page>
        <el-dialog title="新增签约" :visible.sync="dialogFormVisible" width="550px" center>
            <el-form :inline="false" :model="addForm" class="demo-form-inline" label-width="150px">
                <el-form-item label="资金方：">
                    <el-input v-model="addForm.lenderId" placeholder="资方名称" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="签约企业名称：">
                    <el-input v-model="addForm.companyName" placeholder="签约企业名称" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="甲方签章数量：">
                    <el-input v-model="addForm.partyAStampNumber" placeholder="甲方签章数量" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="乙方签章数量：">
                    <el-input v-model="addForm.partyBStampNumber" placeholder="乙方签章数量" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="业务单号：">
                    <el-input v-model="addForm.resourceCode" placeholder="业务单号" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="签约合同：">
                    <el-upload ref="upload" class="upload-demo" :action="uploadUrl" multiple :on-success="_upload"
                        :file-list="fileList" :on-error="_error" name="files" :before-upload="beforeUpload"
                        :on-remove="handleRemove">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="_submit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="查看明细" :visible.sync="showDetailTable" width="1530px">
            <xtable :columns="detailColumns" :detailTable="true" :tableData="detailTableData" @edit="copy" />
        </el-dialog>
        <el-dialog title="查看合同" :visible.sync="showContractTable" width="1530px">
            <xtable :columns="contractColumns" :detailTable="true" :tableData="contractTableData" @edit="copy2" />
        </el-dialog>


    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import xform from '../../common/Xform.vue';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { getList, createCA, getDetail, getSignContractAttachment } from '../../../api/ca';
import {
    lenderList,
} from '../../../api/index';
export default {
    name: 'loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable,
        xform
    },
    data() {
        return {
            contractTableData: [],
            contractColumns: [{
                label: '文件名称',
                prop: 'fileName'
            },

            {
                label: this.$t('loan_search_cz'),
                prop: '',
                width: '280',
                operates: [
                    {
                        event: 'copy',
                        text: '复制链接',
                        type: 'primary',

                    },
                    {
                        event: 'open',
                        text: '打开合同',
                        type: 'primary',

                    },


                ],
                fixed: 'right'
            }
            ],
            showContractTable: false,
            detailColumns: [
                {
                    label: '类型',
                    prop: 'contractType'
                },
                {
                    label: '姓名',
                    prop: 'contractName'
                },
                {
                    label: '身份证号码',
                    prop: 'contractIdCard'
                },
                {
                    label: '银行卡号',
                    prop: 'contractBankCardNumber'
                },
                {
                    label: '手机号码',
                    prop: 'contractPhoneNumber'
                },
                {
                    label: '签约状态',
                    prop: 'contractStatus'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: '签约时间',
                    prop: 'updateTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '140',
                    operates: [
                        {
                            event: 'copy',
                            text: '复制签约链接',
                            type: 'primary',

                        },


                    ],
                    fixed: 'right'
                }
            ],
            detailTableData: [],
            showDetailTable: false,
            uploadUrl: process.env.VUE_APP_IMGS_BASE_URL + '/file-upload/uploadFile/file',
            fileList: [],
            addForm: {
                caContractAttachment: [],
                lenderId: '',
                companyName: '',
                partyBStampNumber: '',
                partyAStampNumber: '',
                resourceCode: '',
            },
            loanAmount: '',
            loanAmountSum: '',
            loanNumberSum: '',
            dates: [],
            dialogFormVisible: false,

            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: this.$t('home_zjffb'),
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '签约企业名称',
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '签约人姓名',
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '申请单号',
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '签约单号',
                },

                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholderArr: ['开始时间 ', '结束时间']
                },



            ],

            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractCode',
                    width: '160'
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderId'
                },

                {
                    label: '签约企业名称',
                    prop: 'companyName'
                },

                {
                    label: '签约状态',
                    prop: 'contractStatus',
                },

                {
                    label: '业务单号',
                    prop: 'resourceCode',
                    width: '220'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'getDetail',
                            text: '查看明细',
                            type: 'primary',
                            popover: true,
                        },
                        {
                            event: 'getSignContractAttachment',
                            text: '查看合同',
                            type: 'primary',
                            popover: true,
                        },

                    ],
                    fixed: 'right'
                }
            ],
            productsList: [],
            row: {},
            dialogVisible2: false,
            endDate: '',
            loanStatus: '',
            repaymentAmount: 0,
            dealAmountSum: 0,
            totalMoney: 0,
            rePaymentData: [],
            chooseDatas: [],
            showAddHistory: false,
            selectRowData: []
        };
    },
    activated() {
        // console.log(this.$route);

    },
    created() {

        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[0].options = res.data;
        });
    },

    methods: {
        _error(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        },
        beforeUpload(file) {
            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

            const whiteList = ["pdf",];

            if (whiteList.indexOf(fileSuffix) === -1) {
                this.$message({ message: "上传文件只能是 PDF 格式", type: 'warning' });
                return false;

            }
        },
        _getSignContractAttachment(row) {

            getSignContractAttachment(row.applicationCode).then(res => {
                this.contractTableData = res.data
                this.showContractTable = true
            })
        },
        copy(event, row) {
            let that = this
            this.$copyText(row.path).then(
                function (e) {
                    that.$message.success('复制成功!')
                },
                function (e) {
                    console.log("copy arguments e:", e);
                    that.$message.warning('复制失败!')
                }
            );
        },
        copy2(event, row) {
            if (event == 'copy') {
                let that = this
                this.$copyText(row.fullFilePath).then(
                    function (e) {
                        that.$message.success('复制成功!')
                    },
                    function (e) {
                        console.log("copy arguments e:", e);
                        that.$message.warning('复制失败!')
                    }
                );
            } else if (event == 'open') {
                // window.open(row.fullFilePath)
                const el = document.createElement('a');
                el.style.display = 'none';
                el.setAttribute('target', '_blank');
                /**
                  * download的属性是HTML5新增的属性
                  * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
                  * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
                  * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
                  */
                el.setAttribute('download', '文件');
                el.href = row.fullFilePath;
                console.log(el);
                document.body.appendChild(el);
                el.click();
                document.body.removeChild(el);
            }
        },
        _getDetail(row) {

            getDetail(row.applicationCode).then(res => {
                res.data.forEach(item => {
                    item.contractStatus = item.contractStatus ? '已签署' : '未签署'
                    item.contractType = item.contractType == 'PartyA' ? '甲方' : '乙方'
                    item.path = `${process.env.VUE_APP_CA}/index?applicationCode=${item.applicationCode}&applicationId=${item.id}`
                })

                this.detailTableData = res.data
                this.showDetailTable = true
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'pdf';

            if (!isJPG) {
                this.$message.error('上传文件只能是 PDF 格式!');
            }

            return isJPG;
        },
        handleRemove(file, fileList) {
            this.addForm.caContractAttachment.forEach((item, index) => {
                if (item.fileName == file.name) {
                    this.addForm.caContractAttachment.splice(index, 1)
                }
            })
        },
        _submit() {
            if (!this.addForm.lenderId) return this.$message.warning('请输入资金方')
            if (!this.addForm.companyName) return this.$message.warning('请输入签约企业名称')
            if (!this.addForm.partyAStampNumber) return this.$message.warning('请输入甲方签约数量')
            if (!this.addForm.partyBStampNumber) return this.$message.warning('请输入乙方签约数量')
            if (!this.addForm.caContractAttachment.length) return this.$message.warning('请上传签约合同')
            createCA(this.addForm).then(res => {
                this.$message.success('操作成功！')
                this.dialogFormVisible = false
                this._getList()

            })
        },
        showCreate() {
            this.addForm = {
                caContractAttachment: [],
                lenderId: '',
                companyName: '',
                partyBStampNumber: '',
                partyAStampNumber: '',
            }
            this.fileList = []

            this.dialogFormVisible = true
        },
        _upload(file) {
            console.log(file);
            this.addForm.caContractAttachment.push(file.data[0])


        },
        _onExport() {
            if (!this.filterOptions[6].value && !this.filterOptions[6].value.length) {
                this.filterOptions[6].value = ['', ''];
            }
            this.$export(`/ca/export?lender_id=${this.filterOptions[0].value}&company_name=${this.filterOptions[0].value}&contract_name=${this.filterOptions[0].value}&contract_phone_number=${this.filterOptions[0].value}&application_code=${this.filterOptions[0].value}&contract_code=${this.filterOptions[0].value}&application_time_start=${this.filterOptions[0].value}&application_time_end=${this.filterOptions[0].value}`);
        },
        toDetail(val) {
            this.$router.push({
                path: '/loaned-detail',
                query: {
                    id: val.id,
                    loanNumber: val.applicationCode,
                    productName: val.productName,
                    creditAmount: val.creditAmount,
                    applicationStatus: val.applicationStatus,
                    account: val.account,
                    userId: val.userId,
                    loanCode: val.loanCode
                }
            });
        },

        _getList() {
            if (!this.filterOptions[6].value && !this.filterOptions[6].value.length) {
                this.filterOptions[6].value = ['', ''];
            }

            getList({
                current: this.currentPage,
                size: 10,
                lender_id: this.filterOptions[0].value,
                company_name: this.filterOptions[1].value,
                contract_name: this.filterOptions[2].value,
                contract_phone_number: this.filterOptions[3].value,
                application_code: this.filterOptions[4].value,
                contract_code: this.filterOptions[5].value,
                application_time_start: this.filterOptions[6].value[0],
                application_time_end: this.filterOptions[6].value[1],
            }).then((res) => {
                res.data.records.forEach(item => {
                    // item.hiddenBtn =
                    //     item.contractStatus
                    //         ? item.hiddenBtn
                    //         : (item.hiddenBtn += '查看合同')
                    item.contractStatus = item.contractStatus ? '已签署' : '未签署'
                })



                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;

            });
        }
    }
};
</script>

<style lang='less' scope>
.ca {
    .el-upload--text {
        width: 80px !important;
        height: 32px !important;
        border: none;
    }

    .el-upload-list {
        width: 80% !important;
    }

    .el-upload__tip {
        margin-top: 0 !important;
    }
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