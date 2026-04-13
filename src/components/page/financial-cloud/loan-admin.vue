<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
                金融云产品管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <!-- <div style="display: flex; align-items: flex-end; margin: 10px 0; width: 100%; justify-content: flex-end">
            <el-button style="float: right" type="primary" icon="el-icon-document-copy" @click="showAdd">{{ $t('loan_add_new') }}</el-button>
        </div> -->
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="height:140px">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计放款金额</span>
                                    <span class="grid-num2"> ¥ {{ numFormat(loanAmountCNY) }}</span>
                                    <span class="grid-num2"> $ {{ numFormat(loanAmountUSD) }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="height:140px">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">累计放款笔数</span>
                                    <span class="grid-num2">{{ loanCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange"
            @changeProduct="_changeProduct" />
        <el-dialog :title="isEdit ? '编辑产品' : '新增产品'" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="formData" ref="formData" label-width="140px" class="demo-formData">
                <el-form-item label="合作类型" prop="region">
                    <el-select v-model="formData.cooperationType" :placeholder="$t('loan_detail_choose')"
                        style="width: 300px">
                        <el-option v-for="item in filterOptions[2].options" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资方名称" prop="name">
                    <el-select v-model="formData.lenderId" :placeholder="$t('loan_detail_choose')" style="width: 300px"
                        @change="changeLender">
                        <el-option v-for="item in lenderList" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('loan_search_cpmc')" prop="name">
                    <el-autocomplete style="width: 300px" popper-class="my-autocomplete"
                        v-model="formData.lenderProduct" :fetch-suggestions="querySearch" placeholder="请输入">
                        <template slot-scope="{ item }">
                            <span class="addr">{{ item.label }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="最高授信额度" prop="name">
                    <el-input v-model="formData.lenderProductAmount2" style="width: 100px" placeholder="请输入"></el-input>
                    万
                </el-form-item>
                <el-form-item label="产品属性" prop="region">
                    <el-select v-model="formData.lenderProductAttribute" style="width: 300px"
                        :placeholder="$t('loan_detail_choose')">
                        <el-option label="线下产品" value="offline"></el-option>
                        <el-option label="线上产品" value="online"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="期限" prop="resource">
                    <!-- <el-radio-group v-model="dateType">
                        <el-radio label="日">日</el-radio>
                        <el-radio label="月">月</el-radio>
                        <el-radio label="年">年</el-radio>
                    </el-radio-group> -->
                    <div>
                        <el-input v-model="formData.lenderProductTenure" style="width: 300px"
                            placeholder="请输入"></el-input>
                        <!-- {{ dateType }} -->
                    </div>
                </el-form-item>
                <el-form-item label="利率范围" prop="name">
                    <el-input v-model="formData.minLenderProductInterest" placeholder="请输入"
                        style="width: 80px"></el-input> % -
                    <el-input v-model="formData.maxLenderProductInterest" placeholder="请输入"
                        style="width: 80px"></el-input> %
                </el-form-item>
                <el-form-item label="币种" prop="region">
                    <el-select v-model="formData.productCurrency" style="width: 300px"
                        :placeholder="$t('loan_detail_choose')">
                        <el-option label="美元" value="USD"></el-option>
                        <el-option label="人民币" value="CNY"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品完全名称" prop="name">
                    <el-input v-model="formData.productName" style="width: 300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="推荐码" prop="name">
                    <el-input v-model="formData.referralCode" style="width: 300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="还款方式" prop="name">
                    <el-input v-model="formData.repaymentMethod" style="width: 300px" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">{{ isEdit ? '提交编辑' : '立即创建' }}</el-button>
                    <el-button @click="clearForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getProductAll, lenderList, getLoanCloud, createProduct, getProducts, editProduct, lenderType } from '../../../api/index';
export default {
    name: 'product-admin',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dateType: '日',
            formData: {
                cooperationType: '',
                lenderId: '',
                lenderProduct: '',
                lenderProductAmount: '',
                lenderProductAmount2: '',
                lenderProductAttribute: '',
                lenderProductTenure2: '',
                lenderProductTenure: '',
                maxLenderProductInterest: '',
                minLenderProductInterest: '',
                productCurrency: '',
                productName: '',
                referralCode: '',
                repaymentMethod: ''
            },
            productList: [],
            isEdit: false,
            dialogFormVisible: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    placeholder: '资方名称',
                    filterable: true,
                    options: []
                },

                {
                    type: 'select',
                    value: '',
                    placeholder: '产品名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '状态',
                    filterable: true,
                    options: [
                        {
                            label: this.$t('status_create'),
                            value: 'CREATED'
                        },
                        {
                            label: this.$t('status_successful'),
                            value: 'DISBURSE_SUCESS'
                        },
                        {
                            label: this.$t('status_failed'),
                            value: 'DISBURSE_FAILED'
                        },
                        {
                            label: this.$t('status_past'),
                            value: 'OVERDUE'
                        },

                        {
                            label: this.$t('status_Repayment'),
                            value: 'REPAYMENT'
                        },
                        {
                            label: this.$t('status_closed'),
                            value: 'CLOSED'
                        },
                        {
                            label: this.$t('status_cleared'),
                            value: 'CLEAR'
                        }
                    ]
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '贷款单号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '借款人',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: ['', ''],
                    placeholderArr: [this.$t('loan_detail_zykssj'), this.$t('loan_detail_zyjssj')]
                }
            ],
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            payMethods: [
                'EQUAL_PRINCIPAL_AND_INTEREST',
                'EQUAL_PRINCIPAL',
                'BEFORE_INTEREST_AFTER_PRINCIPAL',
                'LOAN_AND_RETURN',
                'FLEXIBLE_REPAYMENT'
            ],
            loanAmountCNY: 0,
            loanAmountUSD: 0,
            loanCount: 0,
            payMethodsStr: ['等额本金', '等额本息', '先息后本', '随借随还', '灵活还款'],
            columns: [
                {
                    label: '贷款单号',
                    prop: 'loanCode',
                    width: 250
                },
                {
                    label: '资方名称',
                    prop: 'lenderName',
                    width: 200
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },
                {
                    label: '产品名称',
                    prop: 'lenderProduct',
                    width: 130

                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bname',
                    width: 200
                },
                {
                    label: '手机号',
                    prop: 'bphoneNumber',
                    width: 150
                },
                {
                    label: '支用金额(万)',
                    prop: 'loanAmount',
                    width: 120
                },
                {
                    label: '放款币种',
                    prop: 'productCurrency',
                    width: 110
                },
                {
                    label: '支用开始时间',
                    prop: 'loanStartDate',
                    width: 200
                },
                {
                    label: '支用结束时间',
                    prop: 'loanEndDate',
                    width: 200
                },
                {
                    label: '年利率(%)',
                    prop: 'apr',
                    width: 120
                },
                {
                    label: '服务费',
                    prop: 'guarantorFee',
                    width: 120
                },

                {
                    label: '借款期限(月)',
                    prop: 'loanPeriod',
                    width: 140
                },

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '180',
                //     operates: [
                //         // {
                //         //     event: 'changeProduct',
                //         //     text: this.$t('loan_detail_xg'),
                //         //     type: 'primary'
                //         // }
                //     ],

                //     fixed: 'right'
                // }
            ],
            lenderList: []
        };
    },
    created() {
        getProductAll().then((res) => {
            res.data.forEach((item) => {
                this.filterOptions[1].options.push({ label: item, value: item });
            });
        });
        lenderType('API锁定').then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.lenderList = JSON.parse(JSON.stringify(res.data));
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.lenderName;
            });
            this.filterOptions[0].options = res.data;
        });
    },
    methods: {
        _changeProduct(row) {
            this.formData = JSON.parse(JSON.stringify(row));
            this.$delete(this.formData, 'createTime');
            this.$delete(this.formData, 'updateTime');
            this.formData.lenderProductAmount2 = row.lenderProductAmount;
            this.dialogFormVisible = true;
            this.isEdit = true;
        },
        showAdd() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.clearForm();
        },
        changeLender(val) {
            getProducts(val || '').then((res) => {
                this.productList = res.data;
                this.formData.lenderProduct = '';
            });
        },
        clearForm() {
            for (let key in this.formData) {
                this.formData[key] = '';
            }
            this.dateType = '日';
        },
        submitForm() {
            this.$confirm('是否继续提交?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.formData.lenderProductAmount = (this.formData.lenderProductAmount2 * 10000).toFixed(0);
                //   this.formData.lenderProductTenure=this.formData.lenderProductTenure2+this.dateType

                if (this.isEdit) {
                    editProduct(this.formData).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.dialogFormVisible = false;
                        this._getList();
                    });
                } else {
                    createProduct(this.formData).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.dialogFormVisible = false;
                        this._getList();
                    });
                }
            });
        },
        querySearch(queryString, cb) {
            var restaurants = this.filterOptions[1].options;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        numFormat(num) {
            if (!num) return num
            var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return c;
        },

        _getList() {
            if (!this.filterOptions[6].value && !this.filterOptions[6].value.length) {
                this.filterOptions[6].value = ['', ''];
            }
            getLoanCloud(
                this.filterOptions[0].value,
                this.filterOptions[1].value,
                this.filterOptions[2].value,
                this.filterOptions[3].value,
                this.filterOptions[4].value,
                this.filterOptions[5].value,
                this.filterOptions[6].value[0] ? this.filterOptions[6].value[0] + ' 00:00:00' : '',
                this.filterOptions[6].value[1] ? this.filterOptions[6].value[1] + ' 23:59:59' : '',
                this.currentPage
            ).then((res) => {
                this.loanAmountCNY = res.data.loanAmountCNY
                this.loanAmountUSD = res.data.loanAmountUSD
                this.loanCount = res.data.loanCount
                // res.data.records.forEach((item) => {
                //     item.cooperationType =
                //         item.cooperationType == 'RECEIVING_ACCOUNT_LOCK'
                //             ? '收款账户锁定'
                //             : item.cooperationType == 'PAYMENT_ACCOUNT_LOCK'
                //             ? '支付账户锁定'
                //             : item.cooperationType == 'DATA_COOPERATION'
                //             ? '数据合作'
                //             : item.cooperationType == 'ACCOUNT_DOUBLE_LOCK'
                //             ? '账户双锁'
                //             : item.cooperationType == 'FULL_SERVICE'
                //             ? '全服务'
                //             : '';
                //     item.apr =
                //         item.minLenderProductInterest == item.maxLenderProductInterest
                //             ? item.maxLenderProductInterest + '%'
                //             : item.minLenderProductInterest + '%-' + item.maxLenderProductInterest + '%';
                //     // item.repaymentMethod=this.payMethods.indexOf(item.repaymentMethod)>0?this.payMethodsStr[this.payMethods.indexOf(item.repaymentMethod)]:''
                //     item.lenderProductAmount = item.lenderProductAmount / 10000;
                //     item.lenderProductAmount2 = item.lenderProductAmount;
                //     item.lenderProductAmount2 += item.productCurrency == 'USD' ? '万美元' : '万';
                //     item.productCurrency = item.productCurrency == 'USD' ? '美元' : '人民币';
                // });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }
    }
};
</script>

<style lang='less' scoped>
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
    font-size: 20px;
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
    font-size: 18px;
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