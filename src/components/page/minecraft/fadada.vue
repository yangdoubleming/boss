<template>
    <div class='parent'>
        <div style='display: flex; align-items: center; padding: 18px'>
            <div style='color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center'>
                <img src='../../../../public/img/favicon.png' style='width: 17px; height: 17px; margin-right: 5px'
                    alt />豆沙包 /
            </div>

            <span style='color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px'>{{ $route.meta.title }}</span>
        </div>
        <div style='display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px'>
            <el-button style='float:right' type='primary' icon='el-icon-document-copy' @click='onAddSigned'>新增签约
            </el-button>
        </div>
        <table-page :detailTable='true' :tableData='tableData' :filterOptions='filterOptions' :columns='columns'
            :totalSize='totalSize' :current='currentPage' @conditional-query='handleColumnsFilter'
            @conditional-reset='handleConditionalReset' @page-change='handlePageChange' @getDetail='_getDetail'>
        </table-page>
        <el-dialog title='新增签约' :visible.sync='dialogFormVisible' width='900px'>
            <el-form :inline='false' :rules='rules' :model='addForm' label-width='80px' ref='addSign'>
                <el-form-item label='资金方：' prop='lenderId'>
                    <el-select v-model='addForm.lenderId' placeholder='请选择' size='medium' style='width: 300px'>
                        <el-option v-for='item in lenderSelect' :key='item.value' :label='item.label'
                            :value='item.value' />
                    </el-select>
                </el-form-item>
                <el-form-item label='甲方：' prop='companyNameId'>
                    <el-select v-model='addForm.companyNameId' placeholder='请选择' size='medium' style='width: 300px'>
                        <el-option v-for='item in companySelect' :key='item.value' :label='item.label'
                            :value='item.value' />
                    </el-select>
                </el-form-item>
                <el-form-item label='上传合同：' prop='contractAttachment'>
                    <el-upload :action='uploadUrl' :show-file-list='true' :multiple='true' :file-list='fileList'
                        accept='.pdf' name='files' :on-change='change' :on-success='handleAvatarSuccess'
                        :on-preview='handlePreview' :before-upload='beforeAvatarUpload' :before-remove='beforeRemove'>
                        <el-button size='small' type='primary'>点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <div class='add-contract'>
                    <span style='margin-left: 11px'>签约信息：</span>
                    <el-button @click='addContractDetail' type='primary'>新增</el-button>
                    <div v-for='(item, index) in addForm.contractDetail' class='add-contract-item'>
                        <el-form-item :prop='"contractDetail." + index + ".customerType"' label='类型：' label-width='80px'
                            :rules="[{ required: true, message: '请选择公司类型', trigger: 'change' }]"
                            class='add-contract-item__form-item'>
                            <el-select v-model='item.customerType' placeholder='请选择' size='medium'>
                                <el-option v-for='item in customerTypeSelect' :key='item.value' :label='item.label'
                                    :value='item.value' />
                            </el-select>
                        </el-form-item>
                        <el-form-item :prop='"contractDetail." + index + ".contractName"' label='签约人：'
                            label-width='70px' :rules="[{ required: true, message: '请输入签约人', trigger: 'blur' }]"
                            class='add-contract-item__form-item' style='margin: 0 20px'>
                            <el-input v-model='item.contractName'></el-input>
                        </el-form-item>
                        <el-button @click='delConTractDetail(index)' type='primary'>删除</el-button>
                    </div>
                </div>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='primary' @click='_cancel'>取消</el-button>
                <el-button type='primary' @click='_submit'>确定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync='showDetailTable' width='1330px' style='padding-top: 0'>
            <div class='header'>
                <span style='line-height: 24px; font-size: 18px; color:#303133;'>签约主体信息</span>
            </div>

            <xtable :columns='detailColumnsCopy' :detailTable='true' :tableData='detailTableData' @copy='copy'
                @edit='refresh' style='padding-top: 10px; margin-bottom: 30px' />
            <div class='header'>
                <span style='line-height: 24px; font-size: 18px; color:#303133;'>合同列表</span>
            </div>
            <xtable :columns='contractColumns' :detailTable='true' :tableData='contractTableData' @edit='dowload'
                style='padding-top: 10px; margin-bottom: 30px' />

        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    getFddDetail,
    getFddLenderCompanyAuthSign,
    getFddLenderList,
    getFddPageList, getFddSignContractAttachment, refreshFddAuthUrl,
    refreshSignContractUrl,
    saveFddSign
} from '@/api/ca';
import xtable from '@/components/common/Xtable';

export default {
    name: 'loanPage',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        let validContractAttachment = (rule, value, callback) => {
            if (this.addForm.contractAttachment.length === 0) {
                callback(new Error('请上传合同'));
            } else {
                callback();
            }
        };
        return {
            dialogFormVisible: false,
            showDetailTable: false,
            showContractTable: false,
            tableData: [],
            lenderSelect: [],
            companySelect: [],
            detailTableData: [],
            contractTableData: [],
            fileList: [],
            addForm: {
                lenderId: '',
                companyNameId: '',
                contractAttachment: [],
                contractDetail: [
                    {
                        customerType: '',
                        contractName: ''
                    }
                ]
            },
            rules: {
                lenderId: [
                    { required: true, message: '请选择资金', trigger: 'change' }
                ],
                companyNameId: [
                    { required: false, message: '请选择甲方', trigger: 'change' }
                ],
                contractAttachment: [
                    {
                        trigger: 'blur',
                        validator: validContractAttachment
                    }
                ]
            },
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '合同编号'
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '签约编号'
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '乙方主体'
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '资金方'
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: '甲方主体'
                },
                {
                    // yyyy-MM-dd HH:mm:ss
                    type: 'datetimerange',
                    value: ['', ''],
                    placeholderArr: ['开始时间 ', '结束时间']
                }
            ],
            columns: [
                {
                    label: '签约编号',
                    prop: 'applicationCode',
                    // width: 130
                },
                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractCode',
                    // width: '160'
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    // width: 130
                },
                {
                    label: '甲方主体',
                    prop: 'companyName',
                    // width: 200
                },
                {
                    label: '乙方主体',
                    prop: 'contractName',
                    // width: 200
                },
                {
                    label: '签约状态',
                    prop: 'contractStatus',
                    // width: 200

                },
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'createTime',
                    // width: '165'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    // width: '100',
                    operates: [
                        {
                            event: 'getDetail',
                            text: this.$t('common_see'),
                            type: 'primary',
                            popover: true
                        }
                    ],
                    fixed: 'right'
                }
            ],
            customerTypeSelect: [
                {
                    label: '公司',
                    value: 'COMPANY'
                },
                {
                    label: '个人',
                    value: 'PERSONAL'
                }
            ],
            detailColumns: [
                {
                    label: '类型',
                    prop: 'customerType'
                },
                {
                    label: '姓名',
                    prop: 'contractName'
                },
                {
                    label: '实名状态',
                    prop: 'isAuthentication'
                },
                {
                    label: '签署状态',
                    prop: 'isSign'
                },
                {
                    label: '实名认证时间',
                    prop: 'authenticationTime',
                    width: '170'
                },
                {
                    label: '合同签署时间',
                    prop: 'signTime',
                    width: '250'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '150',
                    operates: [],
                    fixed: 'right'
                }
            ],
            detailColumnsCopy: [],
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
                        event: 'open',
                        text: '下载合同',
                        type: 'primary'
                    }
                ],
                fixed: 'right'
            }
            ],
            uploadUrl: `${process.env.VUE_APP_ACTIVITY_UPLOAD}/uploadFile/fdd`,
            currentPage: 1,
            size: 10,
            totalSize: 0
        };
    },
    watch: {
        'addForm.contractAttachment': function () {
            this.$refs['addSign'].validateField('contractAttachment');
        },
        dialogFormVisible: function () {
        }
    },
    created() {
        this.getLenderList();
        this.getCompanySign();
    },

    methods: {
        _getList() {
            let data = {
                current: this.currentPage,
                size: this.size,
                lenderId: this.filterOptions[3].value,
                companyNameId: this.filterOptions[4].value,
                contractName: this.filterOptions[2].value,
                applicationCode: this.filterOptions[1].value,
                contractCode: this.filterOptions[0].value,
                applicationTimeStart: this.filterOptions[5].value[0],
                applicationTimeEnd: this.filterOptions[5].value[1]
            };
            getFddPageList(data).then(res => {
                this.totalSize = res.data.total;
                this.tableData = res.data.records.map(x => {
                    switch (x.contractStatus) {
                        case 0:
                            x.contractStatus = '未完成';
                            break;
                        case 1:
                            x.contractStatus = '已完成';
                            break;
                    }
                    // if (x.contractName.indexOf(',') != -1) {
                    //     x.contractName = x.contractName.split(",").join('\n')
                    // }
                    console.log(x);
                    return x;
                });
            });
        },
        getLenderList() {
            getFddLenderList().then(res => {
                let option = res.data.map(x => {
                    return {
                        label: x.lenderName,
                        value: x.id
                    };
                });
                this.filterOptions[3].options = option;
                this.lenderSelect = option;
            });
        },
        getCompanySign() {
            getFddLenderCompanyAuthSign().then(res => {
                let option = res.data.map(x => {
                    return {
                        label: x.companyName,
                        value: x.id
                    };
                });
                this.filterOptions[4].options = option;
                this.companySelect = option;
            });
        },
        onAddSigned() {
            this.dialogFormVisible = true;
        },
        addContractDetail() {
            this.addForm.contractDetail.push(
                {
                    customerType: '',
                    contractName: ''
                }
            );
        },
        delConTractDetail(index) {
            if (this.addForm.contractDetail.length === 1) {
                this.$message.error('签约信息数不可少于1');
                return false;
            }
            this.addForm.contractDetail.splice(index, 1);
        },
        _getDetail(row) {
            this.detailColumnsCopy = JSON.parse(JSON.stringify(this.detailColumns));
            getFddDetail(row.applicationCode).then(res => {

                let isAuthentications = [];
                res.data.forEach(x => {
                    switch (x.customerType) {
                        case 'COMPANY':
                            x.customerType = '公司';
                            break;
                        case 'PERSONAL':
                            x.customerType = '个人';
                            break;
                    }
                    switch (x.isSign) {
                        case 0:
                            x.isSign = '未签署';
                            break;
                        case 1:
                            x.isSign = '已签署';
                            break;
                    }
                    switch (x.isAuthentication) {
                        case '0':
                            x.isAuthentication = '未实名';
                            break;
                        case '1':
                            x.isAuthentication = '已实名';
                            break;
                    }
                    if (!isAuthentications.includes(x.isAuthentication)) {
                        isAuthentications.push(x.isAuthentication);
                    }
                });
                isAuthentications.forEach(x => {
                    switch (x) {
                        case '未实名':
                            this.detailColumnsCopy.splice(this.detailColumnsCopy.length - 1, 0,
                                {
                                    event: 'copy',
                                    label: '实名认证链接',
                                    cellEdit: 'button',
                                    buttonLabel: '复制实名认证链接'
                                });
                            this.detailColumnsCopy[this.detailColumnsCopy.length - 1].operates.push({
                                event: 'refreshFddAuth',
                                text: '刷新实名认证链接',
                                type: 'primary',
                            });
                            break;
                        case '已实名':
                            this.detailColumnsCopy.splice(this.detailColumnsCopy.length - 1, 0,
                                {
                                    event: 'copy',
                                    label: '合同签署链接',
                                    cellEdit: 'button',
                                    buttonLabel: '复制合同签署链'
                                });
                            this.detailColumnsCopy[this.detailColumnsCopy.length - 1].operates.push(
                                {
                                    event: 'refreshSignContract',
                                    text: '刷新合同链接',
                                    type: 'primary'
                                });
                            break;
                    }
                });
                this.detailTableData = res.data;
                this.showDetailTable = true;
            });
            getFddSignContractAttachment(row.applicationCode).then(res => {
                this.contractTableData = res.data;
            });
        },
        copy(row) {
            let url = '';
            switch (row.isAuthentication) {
                case '未实名':
                    url = row.authenticationUrl;
                    break;
                case '已实名':
                    url = row.contractUrl;
                    break;
            }
            this.$copyText(url).then(
                (e) => {
                    this.$message.success('复制成功!');
                },
                (e) => {
                    console.log('copy arguments e:', e);
                    this.$message.warning('复制失败!');
                }
            );
        },
        dowload(event, row) {
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
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
        },
        _submit() {
            this.$refs['addSign'].validate((valid) => {
                if (valid) {
                    saveFddSign(this.addForm).then(res => {
                        this._getList();
                        this.$refs['addSign'].resetFields();
                        this.dialogFormVisible = false;
                    }).then(() => {
                        console.log(this.addForm);
                        this.fileList = []
                    });
                } else {
                    return false;
                }
            });

        },
        refresh(event, row, index, text) {
            if (event === 'refreshSignContract') {
                refreshSignContractUrl(row.id).then(res => {
                    this.$message.success('刷新成功');
                });
            } else if (event === 'refreshFddAuth') {
                refreshFddAuthUrl(row.id).then(res => {
                    this.$message.success('刷新成功');
                });
            }
        },
        _cancel() {
            this.$refs['addSign'].resetFields();
            this.dialogFormVisible = false;
            this.fileList = []
        },
        change(file, fileList) {
            this.fileList = fileList
        },
        handlePreview(file) {
            for (let index in this.addForm.contractAttachment) {
                if (this.addForm.contractAttachment[index].fileName === file.name) {
                    window.open(this.addForm.contractAttachment[index].fullFilePath);
                } else if (index === this.addForm.contractAttachment.length) {
                    this.$message.error('未找到文件');
                }
            }
        },
        handleAvatarSuccess(res, file) {
            res.data.forEach(x => {
                this.addForm.contractAttachment.push(x);
            });
        },
        beforeAvatarUpload(file) {
            if (file.type !== 'application/pdf') {
                this.$message.error('只能上传jpg,png,pdf文件');
                return false;
            }
        },
        beforeRemove(file, fileList) {
            for (let index in this.addForm.contractAttachment) {
                if (file.name === this.addForm.contractAttachment[index].fileName) {
                    this.addForm.contractAttachment.splice(index, 1);
                }
            }
        }
    }
};
</script>

<style lang='less' scope>
.parent {

    .contractDetail {
        .el-input {
            width: 100px;
        }
    }

    .header {
        padding: 0 20px 10px 20px;
    }

    .el-upload--text {
        border: 0px;
        border-radius: 0px;
        width: auto;
        height: auto;
    }

    .el-form-item__label {
        padding: 0;
    }

    .add-contract {
        .add-contract-item {
            margin-top: 10px;

            .add-contract-item__form-item {
                display: inline-block;

                .el-input {
                    width: 300px
                }
            }

        }
    }
}
</style>