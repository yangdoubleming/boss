<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{
                        $t('common_dsb')
                    }}
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $t('loan_detail_sxgl')
                }}</span>
        </div>

        <table-page :detailTable="true" :tableData="tableData" :showFilterRadio="false" :filterOptions="filterOptions"
            :columns="columns" @close="_creditClose" :totalSize="totalSize" @quote="edit"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @viewDetails="_viewDetails" />
        <el-dialog title="授信信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form :inline="true" :model="form" ref="form" style="padding-left: 20px" label-width="150px"
                label-position="left">
                <el-form-item label="授信通过时间" style="margin-right: 30px" prop="creditApprovalTime">
                    <el-date-picker v-model="form.creditApprovalTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="$t('loan_detail_xzrqsj')"></el-date-picker>
                </el-form-item>
                <el-form-item label="授信时间" style="margin-right: 30px" prop="dates">
                    <el-date-picker v-model="dates" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同编号" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.contractNumber" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="授信金额" style="margin-right: 30px" prop="creditAmount">
                    <el-input v-model="form.creditAmount" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">万美元</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="年利率" style="margin-right: 30px" prop="interestRate">
                    <el-select v-model="form.interestRate" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in productInfo.interestRate" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="期限" style="margin-right: 30px" prop="term">
                    <el-input v-model="form.term" autocomplete="off" type="number" style="width: 200px">
                        <el-button slot="append" icon="el-icon-lx-lock" style="width: 55px">
                            <el-select v-model="dateDefaultValue" @change="changeSelectValue" placeholder="月">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="MCA额度" style="margin-right: 30px" prop="">
                    <el-input v-model="form.mcaTotalAmount" autocomplete="off" style="width: 200px" type="number">
                        <el-button slot="append" icon="el-icon-lx-lock">万美元</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_creditUpdate" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { creditList, creditUpdate, lenderList, getProductInfo, creditClose } from '../../../api/index';
export default {
    name: 'us-credit',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                mcaTotalAmount:'',
                creditAmount: '',
                interestRate: '',
                creditApprovalTime: '',
                creditStartDate: '',
                creditExpireDate: '',
                contractNumber: '',
                // repaymentType: '',
                loanPeriod: '',
                term: '',
                termUnit: '',
                id: ''
            },
            productInfo: {},
            dates: [],
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
            dateDefaultValue: 'M',
            dialogFormVisible: false,
            tableData: [],
            filterOptions: [
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
                    type: 'daterange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: [this.$t('loan_detail_sxtgks'), this.$t('loan_detail_sxtgjs')],
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '230'
                },
                {
                    label: this.$t('loan_detail_yhid'),
                    prop: 'userId',
                    width: 230
                },
                {
                    label: this.$t('loan_detail_sxdh'),
                    prop: 'creditCode',
                    width: '220'
                },

                {
                    label: this.$t('loan_search_amount'),
                    prop: 'creditAmount',
                    width: '160'
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'interestRate',
                    width: '120'
                },

                {
                    label: this.$t('loan_detail_sxzt'),
                    prop: 'creditStatus',
                    width: '130'
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
                    width: '200',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary',
                            code: 'US_CREDIT_UPDATA'
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
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() {
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[2].options = res.data;
        });
        getProductInfo().then((res) => {
            this.productInfo = res.data;
        });
    },
    methods: {
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
        },
        changeSelectValue(v) {
            console.log(121111, v);
        },
        // 查看详情
        _viewDetails(row) {
            this.$router.push({
                path: '/us-credit-detail',
                query: {
                    //携带参数
                    data: row
                }
            });
        },
        _creditUpdate() {
            // if (!this.form.repaymentType) {
            //     return this.$message.warning('请选择还款方式');
            // }
            if (!this.form.term) {
                return this.$message.warning('请选择期限');
            }
            // 做下判断 防止取到null
            this.form.creditStartDate = this.dates && this.dates[0] ? this.dates[0] : '';
            this.form.creditExpireDate = this.dates && this.dates[0] ? this.dates[1] : '';
            this.form.termUnit = this.dateDefaultValue;
            let formData = new FormData();
            Object.keys(this.form).forEach((key) => {
                formData.append(key, this.form[key]);
            });

            console.log(2222, this.dateDefaultValue);
            creditUpdate(formData).then((res) => {
                this._getList();
                this.$message.success('修改成功！');
                // 清空表单
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
                this.dates = [];
                this.dialogFormVisible = false;
            });
        },
        _getList() {
            let params = {
                current: this.currentPage,
                applicationCode: this.filterOptions[0].value,
                creditCode: this.filterOptions[1].value,
                lenderId: this.filterOptions[2].value,
                creditApprovalTimeBegin:
                    this.filterOptions[3].value && this.filterOptions[3].value.length ? this.filterOptions[3].value[0] : '',
                creditApprovalTimeEnd:
                    this.filterOptions[3].value && this.filterOptions[3].value.length ? this.filterOptions[3].value[1] : '',
                applicationOrderType: 'SELF_SUPPORT',
                userId: this.filterOptions[4].value
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
            this.dialogFormVisible = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = row[key];
            });
            console.log(1111111, this.form.contractNumber);
            if (this.form.contractNumber === 'null') {
                console.log(1111111, this.form.contractNumber);
                this.form.contractNumber = '';
            }
            this.dates = [];
            this.dates.push(row.creditStartDate);
            this.dates.push(row.creditExpireDate);
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
