<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:10px">
            <el-button style="float:right" type="primary" icon="el-icon-document-add"
                @click="dialogFormVisible = true">新增</el-button>
        </div>
        <div style="padding-top:30px;background:#fff">
            <table-page :detailTable="true" @changeTime='_changeTime' :productsOptions='productsOptions'
                @export='_export' @changeProducts='_changeProducts' :isExporting='isExporting' :isExport2='true'
                :showFilterRadio="false" :tableData="tableData" :tableOperate="tableOperate"
                :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" @page-change="changeFilter"
                :current="currentPage" :lenderOptions="lenderOptions" @changeLender="_changeLender" @edit="showEdit" />
        </div>
        <el-dialog width="35%" title="新增" :visible.sync="dialogFormVisible" direction="rtl">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item :label="$t('home_zjffb')" prop="lenderId">
                    <el-select style="width:100%" placeholder="请选择资金方" v-model="form.lenderId">
                        <el-option v-for="item in lenderOptions" :key="item.id" :label="item.lenderName"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="保证金比例（%）" prop="guaranteeRate">
                    <el-input v-model="form.guaranteeRate" placeholder="输入数字即可"></el-input>
                </el-form-item>
                <el-form-item label="缴纳时间" prop="paymentTime">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.paymentTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addItem('form')">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog width="35%" title="修改当期预缴保证金" :visible.sync="dialogFormVisible2" direction="rtl">
            <el-form label-width="150px">
                <el-form-item label="当期预缴保证金">
                    <el-input v-model="currPayGuaranteeFee"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="_edit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getProducts, guaranteeSummary, lenderList, addGuarantee, updateGuarantee } from '../../../api/index';
export default {
    name: 'day-report',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            dates: ['', ''],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            currPayGuaranteeFee: '',
            lenderOptions: [],
            productsOptions: [],
            isExporting: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [],
            productsId: '',
            form: {
                lenderId: '',
                guaranteeRate: '',
                paymentTime: '',
            },
            rules: {
                lenderId: [
                    { required: true, message: '请输入资金方', trigger: 'blur' },
                ],
                guaranteeRate: [
                    { required: true, pattern: '[^ \x22]+', message: '请输入保证金比例（%）', trigger: 'blur' },
                    { pattern: /^(?:0|[1-9][0-9]?|100)(\.[0-9]{0,2})?$/, message: '请输入0-100的比例值', trigger: 'blur' },
                ],
                paymentTime: [
                    { required: true, pattern: '[^ \x22]+', message: '请输入缴纳时间', trigger: 'blur' },
                ],
            },
            columns: [
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                },
                {
                    label: '保证金比例',
                    prop: 'guaranteeRate',
                    width: '120'
                },
                {
                    label: '期末累计放款额',
                    prop: 'currLoanAmount'
                },

                {
                    label: '期末应缴保证金',
                    prop: 'currPayableGuaranteeFee',
                    width: '140'
                },
                {
                    label: '提还借据保证金占用总额',
                    prop: 'payBackGuaranteeFee',
                    width: '200'
                },

                {
                    label: '当期预缴保证金',
                    prop: 'currPayGuaranteeFee',
                },
                {
                    label: '累计实缴保证金',
                    prop: 'payGuaranteeFee',
                },
                {
                    label: '期初缴纳保证金时间',
                    prop: 'paymentTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '200',
                    operates: [
                        {
                            event: 'edit',
                            text: '修改当期预缴保证金',
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
            this.lenderOptions = res.data;
        });
        this._getProducts()
        this.changeFilter()
    },
    methods: {
        _changeLender(val) {
            this.tableData = []
            this.lenderId = val == '全部' ? '' : val
            this._getProducts(val == '全部' ? '' : val)
            this.changeFilter()
        },
        _getProducts(val) {
            getProducts(val || '').then(res => {
                this.productsOptions = res.data
            })
        },
        _changeTime(val) {
            this.dates = val
            console.log(val);
            this.changeFilter()
        },
        _changeProducts(val) {
            this.currentPage = 1
            this.productsId = val
            this.changeFilter()
        },
        _export() {
            let fileName = '保证金汇总'
            this.isExporting = true
            let that = this
            const axios = require('axios');
            let params = {
                lenderId: this.lenderId,
                loanApplyDateBegin: this.dates[0],
                loanApplyDateEnd: this.dates[1] ? this.dates[1].replace(/00:00:00/, '23:59:59') : "",
                lenderProductId: this.productsId,
            }
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/lending/guarantee/summary/export`,
                params: params,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                var blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = `${fileName}.xlsx`;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                that.isExporting = false;

            })
                .catch(error => {
                    that.isExporting = false;
                })

        },
        changeFilter(val) {
            this.currentPage = val ? val : this.currentPage
            let params = {
                current: this.currentPage,
                lenderId: this.lenderId,
                loanApplyDateBegin: this.dates[0],
                loanApplyDateEnd: this.dates[1] ? this.dates[1].replace(/00:00:00/, '23:59:59') : "",
                lenderProductId: this.productsId,
            }
            guaranteeSummary(params).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        _getList() {

        },
        addItem(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.guaranteeRate = Number(this.form.guaranteeRate) / 100
                    addGuarantee(this.form).then((res) => {
                        this.dialogFormVisible = false
                        this.form = {
                            lenderId: '',
                            guaranteeRate: '',
                            paymentTime: '',
                        }
                        this.changeFilter()
                    });
                } else {
                    return false;
                }
            });
        },
        showEdit(val) {
            this.nowItemId = val.id
            this.dialogFormVisible = false
            this.dialogFormVisible2 = true
        },
        _edit() {
            if (!this.currPayGuaranteeFee) {
                return this.$message.warning("请输入当期预缴保证金")
            }
            if (!(/^[0-9]+(.[0-9]{1,5})?$/.test(this.currPayGuaranteeFee))) {
                return this.$message.warning("请输入正确的数字")
            }
            updateGuarantee({ currPayGuaranteeFee: this.currPayGuaranteeFee, id: this.nowItemId }).then((res) => {
                this.dialogFormVisible2 = false
                this.currPayGuaranteeFee = ''
                this.changeFilter()
            });
        }

    }
};
</script>

<style>
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