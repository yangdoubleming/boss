<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />{{
                    $t('common_dsb')
                }}
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('loan_detail_sxgl') }}</span>
        </div>

        <table-page
            :tableData="tableData"
            :showFilterRadio="false"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @quote="edit"
            @close="_creditClose"
            @conditional-query="handleColumnsFilter"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
            @viewDetails="_viewDetails"
            @creditSign="_creditSign"
        />
        <el-dialog title="授信信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="授信通过时间" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker
                        v-model="form.creditApprovalTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="授信时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker
                        v-model="dates"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="期限" style="margin-right: 30px" prop="term">
                    <el-input v-model="form.term" autocomplete="off" type="number" style="width: 200px">
                        <!-- <el-button slot="append" icon="el-icon-lx-lock">月</el-button> -->
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="dateDefaultValue" @change="changeSelectValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="合同编号" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.contractNumber" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="币种" style="margin-right: 30px" prop="currency">
                    <!-- <el-input v-model="form.currency" autocomplete="off"  style="width:200px">
                        
                    </el-input> -->
                    <el-select v-model="form.currency" :placeholder="$t('loan_detail_choose')" clearable>
                        <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授信金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.creditAmount" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">{{ currencyType }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="年利率" style="margin-right: 30px" prop="interestRate">
                    <el-input v-model="form.interestRate" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock">%</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="可提现金额" style="margin-right: 30px" prop="selfWithdrawalAmount">
                    <el-input v-model="form.selfWithdrawalAmount" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">{{ currencyType }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="可循环额度" style="margin-right: 30px; display: block" prop="openRevolvingAmount">
                    <el-radio v-model="addRadio" label="OPEN">开启</el-radio>
                    <el-radio v-model="addRadio" label="CLOSED">关闭</el-radio>
                </el-form-item>
                <el-form-item label="可用额度" style="margin-right: 30px" prop="openAvailableAmount">
                    <el-radio v-model="rateRadio" label="OPEN">开启</el-radio>
                    <el-radio v-model="rateRadio" label="CLOSED">关闭</el-radio>
                </el-form-item>
                <el-form-item label="可自主提现额度" style="margin-right: 30px; display: block" prop="openSelfWithdrawalAmount">
                    <el-radio v-model="selfRadio" label="OPEN">开启</el-radio>
                    <el-radio v-model="selfRadio" label="CLOSED">关闭</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_creditUpdate" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="签约链接" :visible.sync="dialogSignVisible" width="30%" @close="dialogSignVisible = false">
            <div v-if="signLink" style="display: flex; align-items: center; padding: 20px 0">
                <el-input v-model="signLink" disabled></el-input>
                <el-button type="primary" @click="copyLink" style="margin-left: 10px"> 复制链接 </el-button>
            </div>
            <div v-else>
                <p>链接获取失败</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { creditList, creditUpdate, lenderList, creditClose, getEsignDowfuContractUrl } from '../../../api/index';

export default {
    name: 'credit',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogSignVisible: false,
            signLink: '',
            addRadio: 'OPEN',
            rateRadio: 'OPEN',
            selfRadio: 'OPEN',
            currencyType: '万元',
            form: {
                creditAmount: '',
                selfWithdrawalAmount: '',
                interestRate: '',
                creditApprovalTime: '',
                creditStartDate: '',
                creditExpireDate: '',
                contractNumber: '',
                currency: '',
                term: '',
                id: ''
            },
            dates: [],
            dateDefaultValue: 'M',
            dateOptions: [
                {
                    value: 'D',
                    label: '日'
                },
                {
                    value: 'M',
                    label: '月'
                },
                {
                    value: 'Y',
                    label: '年'
                }
            ],
            dialogFormVisible: false,
            tableData: [],
            currencyOptions: [
                {
                    value: 'CNY',
                    label: '人民币'
                },
                {
                    value: 'USD',
                    label: '美元'
                }
            ],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_sxdh'),
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [],
                    placeholder: this.$t('home_zjffb'),
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: '已失效',
                            value: 'CLOSED'
                        },
                        {
                            label: '生效中',
                            value: 'ACTIVE'
                        }
                    ],
                    placeholder: this.$t('loan_detail_sxzt'),
                    filterable: true
                },

                {
                    type: 'daterange',
                    value: [],
                    placeholder: '',
                    filterable: true,
                    placeholderArr: [this.$t('loan_detail_sxtgks'), this.$t('loan_detail_sxtgjs')],
                    options: []
                }
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '190'
                },

                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },

                {
                    label: this.$t('loan_detail_sxzedw'),
                    prop: 'creditAmount',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_ktxzedw'),
                    prop: 'selfWithdrawalAmount',
                    width: '130'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'interestRate',
                    width: '100'
                },

                {
                    label: this.$t('loan_detail_htbh'),
                    prop: 'contractNumber',
                    width: '140'
                },
                {
                    label: this.$t('loan_detail_sxzt'),
                    prop: 'creditStatus',
                    width: '110'
                },

                {
                    label: this.$t('loan_detail_sxtgsj'),
                    prop: 'creditApprovalTime',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_sxkssj'),
                    prop: 'creditStartDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_sxjssj'),
                    prop: 'creditExpireDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_xsxkssj'),
                    prop: 'newCreditStartDate',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: '200'
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: '200'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '250',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary',
                            code: 'CREDIT_UPDATA'
                        },
                        {
                            event: 'close',
                            text: this.$t('loan_detail_wgb'),
                            type: 'primary'
                        },
                        {
                            event: 'viewDetails',
                            text: this.$t('common_see'),
                            type: 'primary'
                        },
                        {
                            event: 'creditSign',
                            text: '授信签约',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    watch: {
        'form.currency': function (newValue, oldValue) {
            if (newValue == 'USD') {
                this.currencyType = '万美元';
            } else {
                this.currencyType = '万元';
            }
        },
        deep: true
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[3].options = res.data;
        });
    },
    methods: {
        changeSelectValue(v) {
            console.log(121111, v);
        },
        // 查看详情
        _viewDetails(row) {
            this.$router.push({
                path: '/credit-detail',
                query: {
                    //携带参数
                    data: row
                }
            });
        },
        _creditSign(row) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)'
            });
            getEsignDowfuContractUrl({
                signType: 'CREDIT',
                code: row.applicationCode
            })
                .then((res) => {
                    loading.close();
                    if (!res.data.isSign) {
                        this.signLink = res.data.shortUrl;
                        this.dialogSignVisible = true;
                    } else {
                        this.$message.warning('授信签约已完成');
                    }
                })
                .catch((err) => {
                    loading.close();
                });
        },
        copyLink() {
            const textarea = document.createElement('textarea');
            textarea.value = this.signLink;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.$message.success('链接已复制到剪贴板');
        },
        _creditUpdate() {
            // 做下判断 防止取到null
            this.form.creditStartDate = this.dates && this.dates[0] ? this.dates[0] : '';
            this.form.creditExpireDate = this.dates && this.dates[0] ? this.dates[1] : '';
            let formData = new FormData();
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key]);
            });

            formData.append('termUnit', this.dateDefaultValue);
            formData.append('openRevolvingAmount', this.addRadio);
            formData.append('openAvailableAmount', this.rateRadio);
            formData.append('openSelfWithdrawalAmount', this.selfRadio);
            creditUpdate(formData).then((res) => {
                this._getList();
                this.$message.success('修改成功！');
                // 清空表单
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
                this.addRadio = 'OPEN';
                this.rateRadio = 'OPEN';
                this.selfRadio = 'OPEN';
                this.dates = [];
                this.dialogFormVisible = false;
            });
        },
        _getList() {
            if (!/^\d+$/.test(this.filterOptions[0].value) && this.filterOptions[0].value !== '') {
                this.$message.error('用户ID必须为数字');
                return;
            }
            let params = {
                current: this.currentPage,
                userId: this.filterOptions[0].value,
                applicationCode: this.filterOptions[1].value,
                creditCode: this.filterOptions[2].value,
                lenderId: this.filterOptions[3].value,
                creditStatus: this.filterOptions[4].value,
                creditApprovalTimeBegin:
                    this.filterOptions[5].value && this.filterOptions[5].value.length ? this.filterOptions[5].value[0] : '',
                creditApprovalTimeEnd:
                    this.filterOptions[5].value && this.filterOptions[5].value.length ? this.filterOptions[5].value[1] : '',
                applicationOrderType: 'JOINT_VENTURE'
            };
            creditList(params).then((res) => {
                res.data.records.forEach((item) => {
                    item.creditStatus = item.creditStatus === 'ACTIVE' ? '生效中' : item.creditStatus === 'CLOSED' ? '已失效' : '';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        edit(row) {
            console.info(row);
            this.addRadio = row.openRevolvingAmount;
            this.rateRadio = row.openAvailableAmount;
            this.selfRadio = row.openSelfWithdrawalAmount;
            this.dialogFormVisible = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
            this.dates = [];
            this.dates.push(row.creditStartDate);
            this.dates.push(row.creditExpireDate);
        },
        _creditClose(row) {
            this.$confirm('请确认是否关闭授信?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                creditClose(row.id).then(() => {
                    this.$message.success('操作成功');
                    this._getList();
                });
            });
        }
    }
};
</script>

<style lang="less">
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
